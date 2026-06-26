"use client";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { DirectionalLight, AmbientLight } from "three";
import Globe from "react-globe.gl";
import { PLANTS_GEO } from "./crGeo";
import { EN_ACCENT, SRC } from "../energiaData";
import { HV_ARCS } from "./hvArcs";
import { DATACENTERS } from "./datacenters";

/* ═══════════════════════════════════════════════════════════════
   ENERGÍA — PowerGlobe (react-globe.gl edition, panel-revised)
   Reviewed by a 20-persona panel; this revision applies the ranked
   blocking fixes: honesty (planned arc differentiated, factual
   coordinate/capacity corrections, attribution hyperlinks, real CR
   capacities), a11y (figure/figcaption, aria-live, skip link, 44px
   focus-visible controls), interactivity (accessible DC buttons, arc
   hover, no silent error), visual encoding (altitude/arc/tier
   legends), error/loading honesty, mobile (Americas-centered POV,
   layer popover), and craft (scene lighting, atmosphere colour,
   capacity-proportional motion, arc altitude cap).
   ═══════════════════════════════════════════════════════════════ */

const WRI_CSV = "https://cdn.jsdelivr.net/gh/wri/global-power-plant-database@v1.3.0/output_database/global_power_plant_database.csv";
const NIGHT_TEX = "https://cdn.jsdelivr.net/gh/vasturiano/three-globe@v2.45.2/example/img/earth-night.jpg";

const MONO = "'IBM Plex Mono',monospace";

/* Technology palette — categorical, distinguishable; renewables glow, fossils recede. */
const FUEL = {
  // Wind moved off EN_ACCENT.green to a distinct pale azure so it no longer collides with the AC
  // arc emerald (R6→R9 oscillation: every other panel round flipped the AC arc color; moving the
  // FUEL token is the only fix that breaks the cycle without re-opening the HVDC adjacency complaint).
  // Pale azure is distinct from EN_ACCENT.sky atmosphere (#38bdf8) and from Nuclear violet (#818cf8).
  Hydro: EN_ACCENT.glow, Solar: EN_ACCENT.solar, Wind: "#facc15",
  Geothermal: EN_ACCENT.gold, Nuclear: EN_ACCENT.violet,
  Gas: "#d97706", Oil: "#fb7185", Coal: "#9ca3af",
  Biomass: "#84cc16", Waste: "#a3e635", Storage: "#38bdf8",
  Cogeneration: "#d97706", Petcoke: "#9ca3af", CSP: "#dc2626",
  "Wave and Tidal": "#06b6d4", Other: "#94a3b8",
};
const LEGEND = ["Hydro", "Solar", "Wind", "Geothermal", "Nuclear", "Gas", "Coal", "Oil", "Biomass", "Storage"];
const FUEL_ES = {
  Hydro: "Hidro", Solar: "Solar", Wind: "Eólica", Geothermal: "Geotérmica",
  Nuclear: "Nuclear", Gas: "Gas", Coal: "Carbón", Oil: "Petróleo",
  Biomass: "Biomasa", Storage: "Almacenamiento", CSP: "Solar térmica",
};

/* Curated landmark plants (used as the mobile layer + fallback when WRI fails). */
const CR_MARQUEE = PLANTS_GEO.filter((p) => p.kind !== "load").map((p) => ({
  lat: p.lat, lng: p.lng, name: p.name, country: "Costa Rica",
  fuel: ({ hydro: "Hydro", geo: "Geothermal", wind: "Wind", solar: "Solar", thermal: "Oil" }[p.kind] || "Other"),
  cap: p.mw || 50, cr: true,
}));
const LANDMARKS = [
  { lat: 30.823, lng: 111.003, fuel: "Hydro", name: "Three Gorges", country: "China", cap: 22500 },
  { lat: -25.408, lng: -54.589, fuel: "Hydro", name: "Itaipú", country: "Brasil/Paraguay", cap: 14000 },
  { lat: 36.016, lng: -114.737, fuel: "Hydro", name: "Hoover Dam", country: "EE. UU.", cap: 2080 },
  { lat: 40.153, lng: -76.725, fuel: "Nuclear", name: "Three Mile Island / Crane", country: "EE. UU.", cap: 837 },
  { lat: 33.143, lng: -81.76, fuel: "Nuclear", name: "Vogtle", country: "EE. UU.", cap: 4400 },
  { lat: 37.428, lng: 138.596, fuel: "Nuclear", name: "Kashiwazaki-Kariwa", country: "Japón", cap: 7965 },
  { lat: 38.79, lng: -122.75, fuel: "Geothermal", name: "The Geysers", country: "EE. UU.", cap: 1520 },
  { lat: 64.038, lng: -21.4, fuel: "Geothermal", name: "Hellisheiði", country: "Islandia", cap: 303 },
  { lat: 53.885, lng: 1.79, fuel: "Wind", name: "Hornsea (complejo)", country: "Reino Unido", cap: 2604 },
  { lat: 27.54, lng: 71.91, fuel: "Solar", name: "Bhadla", country: "India", cap: 2245 },
  { lat: 30.99, lng: -6.86, fuel: "CSP", name: "Noor Ouarzazate (CSP)", country: "Marruecos", cap: 580 },
  { lat: 24.21, lng: 120.48, fuel: "Coal", name: "Taichung", country: "Taiwán", cap: 5824 },
];
const MARQUEE = [...LANDMARKS, ...CR_MARQUEE];

/* capacity (MW) → point altitude (capped < atmosphereAltitude so no plant punches
   through the halo). altitude ≈ sqrt(MW), normalised. */
const altOf = (cap) => Math.max(0.004, Math.min(0.14, 0.004 + Math.sqrt(cap || 8) / 900));

/* Hoisted arc accessors (module scope: react-globe.gl rebuilds when callbacks
   change identity, so keep these stable). Capacity-proportional altitudes. */
const ARC_COLOR_FN = (a) => a.kind === "siepac"
  ? ["#F2B135", "#fbbf24"]
  : a.kind === "planned"
    ? ["#818cf8", "#a5b4fc"]   // EN_ACCENT.violet — no SIEPAC gold collision
    : a.kind === "ac"
      ? ["#10b981", "#34d399"]  // emerald — R7+R8 panel majority: HVDC adjacency (arc-legend) > Wind adjacency (fuel chip)
      : ["#22d3ee", "#00B5A8"];
// Differentiation by stroke width: SIEPAC (editorial anchor) > HVDC > AC > Planned (dashed).
const ARC_STROKE_FN = (a) => a.kind === "siepac" ? 1.1 : a.kind === "planned" ? 0.30 : a.kind === "ac" ? 0.48 : 0.60;
const ARC_ALT_FN = (a) => {
  const base = 0.05 + Math.min(0.17, (a.mw || 500) / 80000);
  // Kind-aware floor so editorially-central low-MW arcs (SIEPAC 300 MW, the
  // Darién planned link) don't render flush with the night-texture terrain.
  if (a.kind === "siepac") return Math.max(0.09, base);
  if (a.kind === "planned") return Math.max(0.12, base);
  return base; // capped < atmosphereAltitude 0.24
};
const ARC_DASH_LEN_FN = (a) => a.kind === "planned" ? 0.16 : 0.45;
const ARC_DASH_GAP_FN = (a) => a.kind === "planned" ? 0.5 : 0.12;
const RING_COLOR_FN = () => (t) => `rgba(34,211,238,${1 - t})`;

/* Localised arc-kind labels (no raw .toUpperCase() artifacts). */
const KIND_LABEL = {
  siepac: { es: "SIEPAC", en: "SIEPAC" },
  hvdc: { es: "HVDC", en: "HVDC" },
  ac: { es: "Enlace CA", en: "AC link" },
  planned: { es: "PLANIFICADO", en: "PLANNED" },
};

/* Minimal CSV parser (handles quoted fields). */
function parseCSV(text) {
  const rows = [];
  let field = "", row = [], inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) { if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else inQ = false; } else field += c; }
    else if (c === '"') inQ = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (c !== "\r") field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

/* ── prefers-reduced-motion (SSR-safe) ── */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(!!mq.matches);
    apply();
    mq.addEventListener ? mq.addEventListener("change", apply) : mq.addListener(apply);
    return () => { mq.removeEventListener ? mq.removeEventListener("change", apply) : mq.removeListener(apply); };
  }, []);
  return reduced;
}

/* Resolve a possibly-bilingual {es,en} field. */
const txt = (v, en) => (v && typeof v === "object" ? (en ? v.en : v.es) || v.es || v.en : v);

export default function PowerGlobe({ en = false, compact = false }) {
  const reduced = useReducedMotion();
  const wrapRef = useRef(null);
  const globeEl = useRef(null);
  const hoverCb = useRef(null);
  const lightsRef = useRef(false);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [plants, setPlants] = useState(null);     // parsed WRI {lat,lng,fuel,cap,name,country,color,alt}
  const [status, setStatus] = useState("idle");   // idle·loading·ok·error
  const [filters, setFilters] = useState(() => Object.fromEntries(LEGEND.map((k) => [k, true])));
  const [layers, setLayers] = useState({ plants: true, grid: true, hubs: true });
  const [layersOpen, setLayersOpen] = useState(false);
  const [encOpen, setEncOpen] = useState(false);
  const [focus, setFocus] = useState("global");
  const [hover, setHover] = useState(null);
  const [ready, setReady] = useState(false);
  const [announce, setAnnounce] = useState("");

  hoverCb.current = setHover;

  // Pause the globe's rAF when off-screen or when the tab is hidden (perf/battery).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const pause = () => { try { globeEl.current?.pauseAnimation?.(); } catch {} };
    const resume = () => { try { globeEl.current?.resumeAnimation?.(); } catch {} };
    const io = new IntersectionObserver(([e]) => { e.isIntersecting ? resume() : pause(); }, { threshold: 0.01 });
    io.observe(el);
    const onVis = () => { document.hidden ? pause() : resume(); };
    document.addEventListener("visibilitychange", onVis);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  /* size tracking */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    setSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  /* lazy-load WRI on scroll-into-view (desktop only). */
  useEffect(() => {
    if (compact || reduced) return;
    const el = wrapRef.current;
    if (!el) return;
    let done = false;
    const run = () => {
      if (done) return; done = true;
      setStatus("loading");
      setAnnounce(en ? "Loading 35,000 plants from WRI…" : "Cargando 35.000 plantas WRI…");
      fetch(WRI_CSV)
        .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
        .then((txt2) => {
          const rows = parseCSV(txt2);
          const head = rows[0].map((h) => h.trim());
          const iLat = head.indexOf("latitude"), iLng = head.indexOf("longitude"),
            iFuel = head.indexOf("primary_fuel"), iCap = head.indexOf("capacity_mw"),
            iName = head.indexOf("name"), iCtry = head.indexOf("country_long");
          if (iLat < 0 || iLng < 0 || iFuel < 0) throw new Error("schema");
          const out = [];
          for (let r = 1; r < rows.length; r++) {
            const row = rows[r];
            const lat = parseFloat(row[iLat]), lng = parseFloat(row[iLng]);
            if (!isFinite(lat) || !isFinite(lng)) continue;
            const fuelRaw = (row[iFuel] || "Other").trim();
            const fuel = FUEL[fuelRaw] ? fuelRaw : "Other";
            const cap = parseFloat(row[iCap]) || 8;
            out.push({ lat, lng, fuel, cap, name: row[iName] || "", country: iCtry >= 0 ? row[iCtry] : "", color: FUEL[fuel], alt: altOf(cap) });
          }
          setPlants(out);
          setStatus("ok");
          setAnnounce(en ? `Atlas ready: ${out.length.toLocaleString("en")} plants loaded.` : `Atlas listo: ${out.length.toLocaleString("es")} plantas cargadas.`);
        })
        .catch((e) => {
          if (typeof console !== "undefined") console.warn("PowerGlobe: WRI fetch failed", e);
          setStatus("error");
          setAnnounce(en ? "Full dataset unavailable — showing curated reference plants." : "Dataset completo no disponible — mostrando referencias destacadas.");
        });
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { run(); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, [compact, reduced, en]);

  /* Marquee decorated with color/alt (so the points memo only filters). */
  const decoratedMarquee = useMemo(() => MARQUEE.map((p) => ({ ...p, color: FUEL[p.fuel] || FUEL.Other, alt: altOf(p.cap) })), []);

  const points = useMemo(() => {
    const src = plants || decoratedMarquee;
    return src.filter((p) => filters[p.fuel] !== false);
  }, [plants, decoratedMarquee, filters]);

  const arcs = useMemo(() => (layers.grid ? HV_ARCS : []), [layers.grid]);
  const dcs = useMemo(() => (layers.hubs ? DATACENTERS : []), [layers.hubs]);
  // Cap ring count: focus → top 5 CR plants; global → top 3 (otherwise 8 rings overlap on the SIEPAC corridor).
  const ringsData = useMemo(() => (focus === "cr" ? CR_MARQUEE.slice(0, 5) : CR_MARQUEE.slice(0, 3)), [focus]);

  const counts = useMemo(() => {
    const c = {};
    (plants || decoratedMarquee).forEach((p) => { c[p.fuel] = (c[p.fuel] || 0) + 1; });
    return c;
  }, [plants, decoratedMarquee]);
  const total = (plants ? plants.length : decoratedMarquee.length);
  const filteredCount = points.length;
  const anyOn = LEGEND.some((k) => filters[k] !== false);

  /* globe setup once ready */
  const onReady = useCallback(() => {
    setReady(true);
    const g = globeEl.current;
    if (!g) return;
    try {
      const c = g.controls();
      c.autoRotate = !reduced;
      c.autoRotateSpeed = 0.45;
      c.enableZoom = false;
      c.enablePan = false;
      c.minDistance = 200; c.maxDistance = 500;
    } catch {}
    // Mobile (compact): open on the Americas/SIEPAC corridor, not the empty Atlantic.
    g.pointOfView(compact ? { lat: 6, lng: -80, altitude: 2.1 } : { lat: 18, lng: -55, altitude: 2.4 }, 0);
    // Cinematic scene lighting — guard against duplicate insertion on resize/breakpoint
    if (!lightsRef.current) {
      try {
        const scene = g.scene();
        const sun = new DirectionalLight(0xffffff, 0.6); sun.position.set(1, 0.4, 1);
        const amb = new AmbientLight(0x223355, 0.25);
        scene.add(sun); scene.add(amb);
        lightsRef.current = true;
      } catch {}
    }
    // DPR cap — avoids 3× fragment workload on high-DPR mobiles (Lighthouse).
    try {
      const dpr = typeof window !== "undefined" ? (window.devicePixelRatio || 1) : 1;
      g.renderer().setPixelRatio(Math.min(dpr, compact ? 1.5 : 2));
      // iOS Safari: allow vertical page scroll on top of the globe canvas (otherwise the WebGL
      // canvas hijacks the swipe-up gesture).
      g.renderer().domElement.style.touchAction = "pan-y";
    } catch {}
  }, [reduced, compact]);

  /* focus transitions */
  useEffect(() => {
    const g = globeEl.current;
    if (!g || !ready) return;
    try {
      const c = g.controls();
      if (focus === "cr") {
        c.autoRotate = false;
        g.pointOfView({ lat: 9.6, lng: -84, altitude: 1.5 }, reduced ? 0 : 1200);
        setAnnounce(en
          ? `Focus on Costa Rica: ${CR_MARQUEE.length} plants, ${HV_ARCS.filter((a) => a.kind === "siepac").length} SIEPAC interconnections.`
          : `Enfoque en Costa Rica: ${CR_MARQUEE.length} plantas, ${HV_ARCS.filter((a) => a.kind === "siepac").length} interconexiones SIEPAC.`);
      } else {
        g.pointOfView(compact ? { lat: 6, lng: -80, altitude: 2.1 } : { lat: 18, lng: -55, altitude: 2.4 }, reduced ? 0 : 1200);
        // Defer auto-rotate resume until after the camera tween settles — eliminates the axis-fighting lurch on CR↔Global.
        const t = setTimeout(() => { try { g.controls().autoRotate = !reduced; } catch {} }, reduced ? 0 : 1250);
        setAnnounce(en ? "Global view." : "Vista global.");
        return () => clearTimeout(t);
      }
    } catch {}
  }, [focus, ready, reduced, compact, en]);

  /* Accessible datacenter HTML marker (44×44 button, hover + focus + keyboard). */
  const makeDc = useCallback((d) => {
    const s = d.tier === 1 ? 14 : 9;
    const wrap = document.createElement("div");
    const nm = txt(d.name, en), ct = txt(d.country, en);
    wrap.className = "pg-dc-btn";
    // The DC markers are decorative inside the aria-hidden canvas wrapper — the visually-hidden <ul>
    // below is the SR-accessible layer (so AT users get the same info without focus traps).
    wrap.setAttribute("aria-hidden", "true");
    wrap.setAttribute("tabindex", "-1");
    wrap.title = `${nm} — ${ct}`;
    wrap.style.cssText = "width:44px;height:44px;display:flex;align-items:center;justify-content:center;cursor:pointer;background:transparent;border:none;";
    const dot = document.createElement("div");
    dot.style.cssText = `width:${s}px;height:${s}px;transform:rotate(45deg);background:rgba(255,255,255,.95);border:1px solid ${EN_ACCENT.glow};box-shadow:0 0 ${d.tier === 1 ? 12 : 7}px ${EN_ACCENT.glow};`;
    wrap.appendChild(dot);
    const show = () => hoverCb.current && hoverCb.current({ kind: "dc", name: nm, sub: ct, detail: d.tier === 1 ? (en ? "Tier 1 · AI hub" : "Tier 1 · hub IA") : (en ? "Tier 2 · regional" : "Tier 2 · regional"), mw: d.demandMw });
    const hide = () => hoverCb.current && hoverCb.current(null);
    wrap.addEventListener("pointerenter", show);
    wrap.addEventListener("pointerleave", hide);
    wrap.addEventListener("focus", show);
    wrap.addEventListener("blur", hide);
    wrap.addEventListener("keydown", (ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); show(); } });
    return wrap;
  }, [en]);

  const onArcHover = useCallback((a) => {
    if (!a) { setHover(null); return; }
    const to = txt(a.to, en);
    const label = (KIND_LABEL[a.kind] && (en ? KIND_LABEL[a.kind].en : KIND_LABEL[a.kind].es)) || a.kind;
    // Operating corridors get "coords aprox."; only planned corridors get "ilustrativo".
    const qual = a.kind === "planned"
      ? (en ? " · illustrative" : " · ilustrativo")
      : (en ? " · coords approx." : " · coords aprox.");
    setHover({ kind: "arc", name: `${a.from} → ${to}`, sub: `${(a.mw || 0).toLocaleString(en ? "en" : "es")} MW${label ? " · " + label : ""}${qual}` });
  }, [en]);

  // Touch tap on arc latches the tooltip (react-globe.gl onArcHover misses touch).
  const onArcClick = useCallback((a) => {
    if (!a) { setHover(null); return; }
    const to = txt(a.to, en);
    const showLabel = !(a.kind === "planned" && typeof a.to === "object");
    const label = showLabel ? ((KIND_LABEL[a.kind] && (en ? KIND_LABEL[a.kind].en : KIND_LABEL[a.kind].es)) || a.kind) : "";
    const qual = a.kind === "planned" ? (en ? " · illustrative" : " · ilustrativo") : (en ? " · coords approx." : " · coords aprox.");
    setHover({ kind: "arc", name: `${a.from} → ${to}`, sub: `${(a.mw || 0).toLocaleString(en ? "en" : "es")} MW${label ? " · " + label : ""}${qual}` });
  }, [en]);

  // Escape closes layer + encoding popovers; outside-pointer dismisses too.
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { setLayersOpen(false); setEncOpen(false); } };
    const onPointer = (e) => {
      if (!wrapRef.current) return;
      // Close popovers if click lands outside the globe wrapper.
      if (!wrapRef.current.contains(e.target)) { setLayersOpen(false); setEncOpen(false); }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onPointer); };
  }, []);

  const arcDashAnim = useCallback((a) => {
    if (reduced) return 0;
    if (a.kind === "planned") return 5200;
    if (a.kind === "siepac") return 2200;
    return a.mw > 5000 ? 2800 : a.mw > 1000 ? 4200 : 6000;
  }, [reduced]);

  const toggleFuel = useCallback((k) => setFilters((f) => ({ ...f, [k]: !f[k] })), []);
  const toggleLayer = useCallback((k) => setLayers((l) => ({ ...l, [k]: !l[k] })), []);
  const resetFilters = useCallback(() => setFilters(Object.fromEntries(LEGEND.map((k) => [k, true]))), []);
  // Mutual exclusivity: only one of {layers, encoding} popover open at a time.
  const openLayers = useCallback(() => { setLayersOpen((v) => !v); setEncOpen(false); }, []);
  const openEnc = useCallback(() => { setEncOpen((v) => !v); setLayersOpen(false); }, []);

  const aspect = compact ? "4 / 5" : "16 / 9";
  const titleId = "pg-title";
  const descId = "pg-desc";
  const errorBanner = status === "error" && !compact;

  return (
    <figure ref={wrapRef} role="figure" aria-labelledby={titleId} aria-describedby={descId} style={{
      position: "relative", aspectRatio: aspect, borderRadius: 16, overflow: "hidden", margin: 0,
      background: `radial-gradient(130% 120% at 50% -10%, ${EN_ACCENT.navy}, ${EN_ACCENT.navyDeep} 70%, #02070f 100%)`,
      border: `1px solid ${EN_ACCENT.turquoise}33`, boxShadow: `inset 0 0 90px rgba(0,0,0,0.6)`,
      touchAction: "pan-y",
    }}>
      <style>{`
        .pg-btn {
          font-family: ${MONO}; font-size: 11px; letter-spacing: 0.4px;
          min-height: 44px; min-width: 44px; padding: 10px 13px; border-radius: 999px; cursor: pointer;
          color: rgba(255,255,255,0.88); background: ${EN_ACCENT.navy}aa;
          border: 1px solid rgba(255,255,255,0.18); transition: border-color .15s, background .15s;
          backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
          display: inline-flex; align-items: center; justify-content: center;
        }
        .pg-btn:focus-visible { outline: 2px solid ${EN_ACCENT.glow}; outline-offset: 2px; }
        .pg-btn-on { color: ${EN_ACCENT.navy}; background: ${EN_ACCENT.glow}; border-color: ${EN_ACCENT.glow}; box-shadow: 0 0 12px ${EN_ACCENT.glow}66; }
        .pg-btn-chip { gap: 6px; }
        .pg-btn-chip[data-off="1"] { border-color: rgba(255,255,255,0.16); }
        .pg-skip {
          position: absolute; left: 10px; top: -56px; z-index: 10;
          background: ${EN_ACCENT.navy}; color: #fff; padding: 12px 16px; border-radius: 8px;
          font-family: ${MONO}; font-size: 12px; min-height: 44px;
          border: 1px solid ${EN_ACCENT.glow}; transition: top .15s;
        }
        .pg-skip:focus { top: 10px; }
        .pg-skip:focus-visible { outline: 2px solid ${EN_ACCENT.glow}; outline-offset: 2px; }
        .pg-dc-btn:focus-visible { outline: 2px solid ${EN_ACCENT.glow}; outline-offset: 3px; }
        .pg-sr {
          position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px;
          overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
        }
      `}</style>

      {/* SR-accessible DC hub list — sits OUTSIDE the aria-hidden canvas wrapper so AT
            can read what sighted users see on the globe. (The canvas markers are tabindex=-1.) */}
      <ul className="pg-sr" aria-label={en ? "AI data-centre hubs shown on the globe" : "Hubs IA / centros de datos en el globo"}>
        {dcs.map((d, i) => (
          <li key={i}>
            {txt(d.name, en)}, {txt(d.country, en)}, {d.tier === 1 ? (en ? "Tier 1 AI hub" : "Hub IA Tier 1") : (en ? "Tier 2 regional" : "Tier 2 regional")}
            {d.demandMw ? ` · ~${d.demandMw} MW (est.)` : ""}
          </li>
        ))}
      </ul>

      <figcaption id={descId} className="pg-sr">
        {en
          ? `Global generation atlas: ${total.toLocaleString("en")} power plants sized by installed capacity, ${HV_ARCS.length} major high-voltage interconnections including the SIEPAC tie-in for Costa Rica, ${DATACENTERS.length} AI / data-centre hubs. The 3D globe is decorative; the keyboard-accessible Costa Rica grid map is in Act 4 below.`
          : `Atlas global de generación: ${total.toLocaleString("es")} plantas de generación dimensionadas por capacidad instalada, ${HV_ARCS.length} interconexiones de alta tensión incluida la conexión SIEPAC para Costa Rica, ${DATACENTERS.length} hubs IA / centros de datos. El globo 3D es decorativo; el mapa accesible de la red de Costa Rica está en el Acto 4 abajo.`}
      </figcaption>

      <div className="pg-sr" role="status" aria-live="polite" aria-atomic="true">
        {!anyOn ? (en ? "All plants hidden. Activate Show all to restore." : "Todas las plantas ocultas. Active Mostrar todas para restaurar.") : announce}
      </div>

      {size.w > 0 && size.h > 0 && (
        <div aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
          <Globe
            ref={globeEl}
            width={size.w}
            height={size.h}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl={NIGHT_TEX}
            showAtmosphere
            atmosphereColor={EN_ACCENT.sky}
            atmosphereAltitude={0.24}
            onGlobeReady={onReady}
            rendererConfig={{
              antialias: !compact && (typeof window === "undefined" || window.devicePixelRatio <= 1.5),
              alpha: true, stencil: false,
              powerPreference: compact ? "default" : "high-performance",
            }}
            pointsData={layers.plants ? points : []}
            pointLat="lat" pointLng="lng"
            pointColor="color"
            pointAltitude="alt"
            pointRadius={compact ? 0.16 : 0.13}
            pointResolution={3}
            pointsMerge={true}
            arcsData={arcs}
            arcStartLat="startLat" arcStartLng="startLng" arcEndLat="endLat" arcEndLng="endLng"
            arcColor={ARC_COLOR_FN}
            arcStroke={ARC_STROKE_FN}
            arcAltitude={ARC_ALT_FN}
            arcDashLength={ARC_DASH_LEN_FN}
            arcDashGap={ARC_DASH_GAP_FN}
            arcDashAnimateTime={arcDashAnim}
            arcsTransitionDuration={0}
            onArcHover={onArcHover}
            onArcClick={onArcClick}
            htmlElementsData={dcs}
            htmlLat="lat" htmlLng="lng"
            htmlAltitude={0.04}
            htmlElement={makeDc}
            ringsData={reduced ? [] : ringsData}
            ringLat="lat" ringLng="lng"
            ringColor={RING_COLOR_FN}
            ringMaxRadius={focus === "cr" ? 4 : 3}
            ringPropagationSpeed={focus === "cr" ? 2.2 : 1.0}
            ringRepeatPeriod={focus === "cr" ? 800 : 2200}
          />
        </div>
      )}

      {!ready && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 2, color: `${EN_ACCENT.glow}cc` }}>
            {compact ? (en ? "LOADING CURATED PLANTS…" : "CARGANDO PLANTAS DESTACADAS…") : (en ? "BUILDING THE ATLAS…" : "CONSTRUYENDO EL ATLAS…")}
          </span>
        </div>
      )}

      {/* ── Title / status / hover (semantic, top-left) ── */}
      <div style={{ position: "absolute", top: 12, left: 14, zIndex: 3, maxWidth: "min(64%, 360px)", pointerEvents: "none" }}>
        <div id={titleId} style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 2, color: EN_ACCENT.glow }}>
          {en ? "GLOBAL GENERATION ATLAS" : "ATLAS GLOBAL DE GENERACIÓN"}
        </div>
        <div style={{ marginTop: 4, fontFamily: MONO, fontSize: 11, color: "#fff" }}>
          {filteredCount.toLocaleString(en ? "en" : "es")} {en ? "of" : "de"} {total.toLocaleString(en ? "en" : "es")} {en ? "plants" : "plantas"}
          <span style={{ color: "rgba(255,255,255,0.55)" }}> · {arcs.length} {en ? "interconnections" : "interconexiones"} · {dcs.length} {en ? "AI hubs" : "hubs IA"}</span>
          {status === "loading" && <span style={{ color: "rgba(255,255,255,0.55)" }}> · {en ? "loading…" : "cargando…"}</span>}
        </div>

        {errorBanner && (
          <div style={{ marginTop: 6, padding: "6px 9px", borderRadius: 9, background: `${EN_ACCENT.navy}f0`, border: `1px solid ${EN_ACCENT.risk}88`, fontFamily: MONO, fontSize: 10.5, color: "#fff", maxWidth: 340 }}>
            {en
              ? "Full dataset unavailable — showing curated reference plants. (WRI CSV could not be fetched.)"
              : "Dataset completo no disponible — mostrando referencias destacadas. (No se pudo obtener el CSV de la WRI.)"}
          </div>
        )}

        {/* Hover tooltip — always mounted (visual only; the sr-only status region above is the SR announcer). */}
        <div
          style={{ marginTop: 6, padding: hover ? "7px 10px" : 0, borderRadius: 9, background: `${EN_ACCENT.navy}e8`, border: hover ? `1px solid ${EN_ACCENT.glow}99` : "1px solid transparent", display: "inline-block", maxWidth: 340, opacity: hover ? 1 : 0, transition: "opacity .15s", pointerEvents: "none", minHeight: hover ? "auto" : 0 }}>
          {hover && <>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "#fff" }}>{hover.name}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}>{hover.sub}</div>
            {hover.detail && <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>{hover.detail}{hover.mw ? ` · ~${hover.mw.toLocaleString(en ? "en" : "es")} MW (est.)` : ""}</div>}
          </>}
        </div>
      </div>

      {/* ── Top-right: focus + layers ── */}
      <div style={{ position: "absolute", top: 12, right: 14, zIndex: 3, display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {[["global", en ? "World" : "Mundo"], ["cr", "Costa Rica"]].map(([k, label]) => (
            <button key={k} type="button" onClick={() => setFocus(k)}
              className={`pg-btn${focus === k ? " pg-btn-on" : ""}`} aria-pressed={focus === k}>
              {label}
            </button>
          ))}
        </div>

        {compact ? (
          <>
            <button type="button" onClick={openLayers} className="pg-btn" aria-expanded={layersOpen} aria-controls="pg-layers">
              {en ? "Layers" : "Capas"} ▾
            </button>
            {layersOpen && (
              <div id="pg-layers" style={{ display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-end", background: `${EN_ACCENT.navy}d0`, padding: 6, borderRadius: 10, border: `1px solid ${EN_ACCENT.turquoise}33` }}>
                {[["plants", en ? "Plants" : "Plantas"], ["grid", en ? "Grid" : "Red"], ["hubs", en ? "AI hubs" : "Hubs IA"]].map(([k, label]) => (
                  <button key={k} type="button" onClick={() => toggleLayer(k)} aria-pressed={layers[k]}
                    className={`pg-btn${layers[k] ? " pg-btn-on" : ""}`} data-off={layers[k] ? "0" : "1"}>
                    <span aria-hidden="true">{layers[k] ? "● " : "○ "}</span>{label}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-end" }}>
            {[["plants", en ? "Plants" : "Plantas"], ["grid", en ? "Grid" : "Red"], ["hubs", en ? "AI hubs" : "Hubs IA"]].map(([k, label]) => (
              <button key={k} type="button" onClick={() => toggleLayer(k)} aria-pressed={layers[k]}
                className={`pg-btn${layers[k] ? " pg-btn-on" : ""}`} data-off={layers[k] ? "0" : "1"}>
                {layers[k] ? "● " : "○ "}{label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Source caption (above legend so it never collides on narrow viewports) ── */}
      <div style={{ position: "absolute", bottom: compact ? 100 : 96, left: 14, right: 14, zIndex: 3, fontFamily: MONO, fontSize: 10, letterSpacing: 0.3, color: "rgba(255,255,255,0.78)", textShadow: "0 1px 4px rgba(0,0,0,0.85)", textAlign: "center", pointerEvents: "auto" }}>
        {en ? "Plants: " : "Plantas: "}
        <a href={SRC.wri.url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>WRI Global Power Plant Database</a>
        {" ("}<a href={SRC.cc_by_4.url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>CC-BY-4.0</a>{") · "}
        {en ? "basemap " : "base "}
        <a href={SRC.three_globe.url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>NASA night lights</a>
        {" · "}
        {en ? "interconnections illustrative (" : "interconexiones ilustrativas ("}
        <a href={SRC.entsoe.url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>ENTSO-E</a>{", "}
        <a href={SRC.iea_wgo.url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>IEA</a>{", "}
        <a href={SRC.epr.url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>SIEPAC/EPR</a>{")"}
      </div>

      {/* ── Encoding mini-legends (altitude · arc kind · DC tier) ──
            On compact, collapsed into a tappable "i" popover to free the bottom zone. */}
      {compact && (
        <button type="button" onClick={openEnc} aria-expanded={encOpen} aria-controls="pg-enc"
          aria-label={en ? "Toggle encoding legend" : "Mostrar leyenda de codificación"}
          className="pg-btn"
          style={{ position: "absolute", right: 14, bottom: 70, zIndex: 4, fontSize: 13, width: 44, height: 44 }}>
          i
        </button>
      )}
      <div id="pg-enc" style={{ position: "absolute", bottom: compact ? 122 : 56, left: 14, right: 14, zIndex: 3, display: (compact && !encOpen) ? "none" : "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", fontFamily: MONO, fontSize: 10.5, color: "rgba(255,255,255,0.92)", pointerEvents: "none", background: compact ? `${EN_ACCENT.navy}d8` : "transparent", padding: compact ? "8px 10px" : 0, borderRadius: compact ? 10 : 0 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <span style={{ display: "inline-flex", alignItems: "flex-end", gap: 2, height: 14 }}>
            {/* Bar heights derived from the actual altOf() — legend matches render. */}
            <span style={{ width: 3, height: Math.round(altOf(500) / 0.14 * 14), background: EN_ACCENT.glow }} />
            <span style={{ width: 3, height: Math.round(altOf(5000) / 0.14 * 14), background: EN_ACCENT.glow }} />
            <span style={{ width: 3, height: Math.round(altOf(20000) / 0.14 * 14), background: EN_ACCENT.glow }} />
          </span>
          {en ? "Altitude ≈ √MW (500 · 5k · ≥20k MW)" : "Altura ≈ √MW (500 · 5k · ≥20k MW)"}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 22, height: 3, background: EN_ACCENT.gold, borderRadius: 1 }} /> SIEPAC
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 22, height: 2, background: EN_ACCENT.glow, borderRadius: 1 }} /> HVDC
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 22, height: 2, background: EN_ACCENT.green, borderRadius: 1 }} /> {en ? "AC link" : "Enlace CA"}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 22, height: 2, background: "transparent", borderTop: `2px dashed ${EN_ACCENT.violet}` }} /> {en ? "Planned" : "Planificado"}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 10, height: 10, transform: "rotate(45deg)", background: "rgba(255,255,255,0.9)", border: `1px solid ${EN_ACCENT.glow}`, boxShadow: `0 0 8px ${EN_ACCENT.glow}` }} /> {en ? "AI hub T1" : "Hub IA T1"}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 7, height: 7, transform: "rotate(45deg)", background: "rgba(255,255,255,0.9)", border: `1px solid ${EN_ACCENT.glow}` }} /> T2
        </span>
      </div>

      {/* Centered empty-state overlay (when all fuel chips are off).
            ARIA: keep the live-region status SEPARATE from the interactive button. */}
      {!anyOn && (
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", zIndex: 4, textAlign: "center", padding: "16px 22px", borderRadius: 12, background: `${EN_ACCENT.navy}e0`, border: `1px solid ${EN_ACCENT.glow}77`, backdropFilter: "blur(6px)" }}>
          <div style={{ fontFamily: MONO, fontSize: 13, color: "#fff", marginBottom: 10 }}>
            {en ? "Which source powers the world?" : "¿Qué fuente mueve al mundo?"}
          </div>
          <button type="button" onClick={resetFilters} className="pg-btn pg-btn-on" aria-label={en ? "Show all technologies" : "Mostrar todas las tecnologías"}>
            {en ? "Show all" : "Mostrar todas"}
          </button>
        </div>
      )}

      {/* ── Bottom: fuel chips + reset ── */}
      <div style={{ position: "absolute", left: 14, bottom: "max(12px, env(safe-area-inset-bottom))", right: 14, zIndex: 3, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", justifyContent: "center" }}>
        {LEGEND.map((k) => {
          const on = filters[k] !== false;
          return (
            <button key={k} type="button" onClick={() => toggleFuel(k)} aria-pressed={on}
              className="pg-btn pg-btn-chip" data-off={on ? "0" : "1"}
              style={{ borderColor: on ? `${FUEL[k]}99` : "rgba(255,255,255,0.16)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: FUEL[k], boxShadow: on ? `0 0 8px ${FUEL[k]}` : "none" }} />
              {en ? k : (FUEL_ES[k] || k)}
              {counts[k] ? <span style={{ color: "rgba(255,255,255,0.5)" }}>{counts[k] > 999 ? `${(counts[k] / 1000).toFixed(0)}k` : counts[k]}</span> : null}
            </button>
          );
        })}
        <button type="button" onClick={resetFilters} className="pg-btn" aria-label={en ? "Reset filters" : "Restablecer filtros"}>
          ↺ {en ? "Reset" : "Reiniciar"}
        </button>
      </div>
    </figure>
  );
}
