"use client";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import Globe from "react-globe.gl";
import { PLANTS_GEO } from "./crGeo";
import { EN_ACCENT } from "../energiaData";
import { HV_ARCS } from "./hvArcs";
import { DATACENTERS } from "./datacenters";

/* ═══════════════════════════════════════════════════════════════
   ENERGÍA — PowerGlobe (react-globe.gl edition)
   A cinematic, interactive 3D Earth of the world's power generation
   in the opengridworks genre, in Colibrii's brand (NOT a clone).
   Built on react-globe.gl (vasturiano, MIT) over three.js:
   - NASA night-lights basemap (satellite "alive" look)
   - turquoise atmosphere + auto-rotate + smooth orbit controls
   - PLANT points sized by installed capacity (MW), coloured by fuel
     (real WRI Global Power Plant Database, CC-BY-4.0, ~35k plants)
   - animated HV interconnection ARCS (incl. SIEPAC, the Costa Rica
     tie-in) and AI/data-centre hub diamonds (the AI↔power story)
   - "World / Costa Rica" focus, technology filters, layer toggles
   DATA is honest + cited; the canvas is the wow layer and the HTML
   panel carries the semantic/interactive content; the keyboard-
   accessible SVG CR map remains the accessible counterpart.
   ═══════════════════════════════════════════════════════════════ */

const WRI_CSV = "https://cdn.jsdelivr.net/gh/wri/global-power-plant-database@v1.3.0/output_database/global_power_plant_database.csv";
const NIGHT_TEX = "https://cdn.jsdelivr.net/gh/vasturiano/three-globe@master/example/img/earth-night.jpg";

const MONO = "'IBM Plex Mono',monospace";

/* Technology palette (categorical; renewables glow, fossils recede). */
const FUEL = {
  Hydro: EN_ACCENT.glow, Solar: EN_ACCENT.solar, Wind: EN_ACCENT.green,
  Geothermal: EN_ACCENT.gold, Nuclear: EN_ACCENT.violet,
  Gas: "#f59e0b", Oil: "#fb7185", Coal: "#9ca3af",
  Biomass: "#84cc16", Waste: "#a3e635", Storage: "#38bdf8",
  Cogeneration: "#f59e0b", Petcoke: "#9ca3af", "Wave and Tidal": "#22d3ee", Other: "#94a3b8",
};
const LEGEND = ["Hydro", "Solar", "Wind", "Geothermal", "Nuclear", "Gas", "Coal", "Oil"];
const FUEL_ES = {
  Hydro: "Hidro", Solar: "Solar", Wind: "Eólica", Geothermal: "Geotérmica",
  Nuclear: "Nuclear", Gas: "Gas", Coal: "Carbón", Oil: "Petróleo",
};

/* Curated landmark plants (used as the mobile layer + fallback). */
const CR = PLANTS_GEO.filter((p) => p.kind !== "load").map((p) => ({
  lat: p.lat, lng: p.lng, name: p.name, country: "Costa Rica",
  fuel: ({ hydro: "Hydro", geo: "Geothermal", wind: "Wind", solar: "Solar", thermal: "Oil" }[p.kind] || "Other"),
  cap: 150, cr: true,
}));
const LANDMARKS = [
  { lat: 30.823, lng: 111.003, fuel: "Hydro", name: "Three Gorges", country: "China", cap: 22500 },
  { lat: -25.408, lng: -54.589, fuel: "Hydro", name: "Itaipú", country: "Brasil/Paraguay", cap: 14000 },
  { lat: 36.016, lng: -114.737, fuel: "Hydro", name: "Hoover Dam", country: "EE. UU.", cap: 2080 },
  { lat: 40.153, lng: -76.725, fuel: "Nuclear", name: "Three Mile Island / Crane", country: "EE. UU.", cap: 837 },
  { lat: 33.143, lng: -81.76, fuel: "Nuclear", name: "Vogtle", country: "EE. UU.", cap: 4536 },
  { lat: 37.428, lng: 138.596, fuel: "Nuclear", name: "Kashiwazaki-Kariwa", country: "Japón", cap: 7965 },
  { lat: 38.79, lng: -122.75, fuel: "Geothermal", name: "The Geysers", country: "EE. UU.", cap: 1520 },
  { lat: 64.038, lng: -21.4, fuel: "Geothermal", name: "Hellisheiði", country: "Islandia", cap: 303 },
  { lat: 53.885, lng: 1.79, fuel: "Wind", name: "Hornsea", country: "Reino Unido", cap: 3600 },
  { lat: 27.54, lng: 71.91, fuel: "Solar", name: "Bhadla", country: "India", cap: 2245 },
  { lat: 30.99, lng: -6.86, fuel: "Solar", name: "Noor Ouarzazate", country: "Marruecos", cap: 580 },
  { lat: 24.21, lng: 120.48, fuel: "Coal", name: "Taichung", country: "Taiwán", cap: 5500 },
];
const MARQUEE = [...LANDMARKS, ...CR];

/* capacity (MW) → point altitude (fraction of globe radius). */
const altOf = (cap) => Math.max(0.004, Math.min(0.5, 0.004 + Math.sqrt(cap || 8) / 700));

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

export default function PowerGlobe({ en = false, compact = false }) {
  const reduced = useReducedMotion();
  const wrapRef = useRef(null);
  const globeEl = useRef(null);
  const hoverCb = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [plants, setPlants] = useState(null);   // parsed WRI {lat,lng,fuel,cap,...}
  const [status, setStatus] = useState("idle"); // idle·loading·ok·error
  const [filters, setFilters] = useState({});   // fuel -> false hides
  const [layers, setLayers] = useState({ plants: true, grid: true, hubs: true });
  const [focus, setFocus] = useState("global");
  const [hover, setHover] = useState(null);
  const [ready, setReady] = useState(false);

  hoverCb.current = setHover;

  /* size tracking */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    setSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  /* lazy-load the WRI dataset on scroll-into-view (desktop only; mobile uses
     the curated marquee + the night-lights basemap to avoid a ~10 MB parse). */
  useEffect(() => {
    if (compact || reduced) return;
    const el = wrapRef.current;
    if (!el) return;
    let done = false;
    const run = () => {
      if (done) return; done = true;
      setStatus("loading");
      fetch(WRI_CSV)
        .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
        .then((txt) => {
          const rows = parseCSV(txt);
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
            const fuel = (row[iFuel] || "Other").trim();
            out.push({ lat, lng, fuel: FUEL[fuel] ? fuel : "Other", cap: parseFloat(row[iCap]) || 8, name: row[iName] || "", country: iCtry >= 0 ? row[iCtry] : "" });
          }
          setPlants(out);
          setStatus("ok");
        })
        .catch(() => setStatus("error"));
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { run(); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, [compact, reduced]);

  /* points = (WRI plants OR curated marquee), filtered by active fuels, decorated */
  const points = useMemo(() => {
    const src = plants || MARQUEE;
    return src.filter((p) => filters[p.fuel] !== false).map((p) => ({ ...p, color: FUEL[p.fuel] || FUEL.Other, alt: altOf(p.cap) }));
  }, [plants, filters]);

  const arcs = useMemo(() => (layers.grid ? HV_ARCS.filter(Boolean) : []), [layers.grid]);
  const dcs = useMemo(() => (layers.hubs ? DATACENTERS : []), [layers.hubs]);
  const rings = useMemo(() => CR.map((p) => ({ lat: p.lat, lng: p.lng })), []);

  const counts = useMemo(() => {
    const c = {};
    (plants || MARQUEE).forEach((p) => { c[p.fuel] = (c[p.fuel] || 0) + 1; });
    return c;
  }, [plants]);
  const total = (plants ? plants.length : MARQUEE.length);

  /* globe setup once ready */
  const onReady = useCallback(() => {
    setReady(true);
    const g = globeEl.current;
    if (!g) return;
    try {
      const c = g.controls();
      c.autoRotate = !reduced;
      c.autoRotateSpeed = 0.45;
      c.enableZoom = false;          // keep page scroll usable
      c.enablePan = false;
      c.minDistance = 200; c.maxDistance = 500;
    } catch {}
    g.pointOfView({ lat: 18, lng: -55, altitude: compact ? 2.7 : 2.4 }, 0);
  }, [reduced, compact]);

  /* focus transitions */
  useEffect(() => {
    const g = globeEl.current;
    if (!g || !ready) return;
    try {
      const c = g.controls();
      if (focus === "cr") {
        c.autoRotate = false;
        g.pointOfView({ lat: 9.6, lng: -84, altitude: 1.5 }, 1200);
      } else {
        g.pointOfView({ lat: 18, lng: -55, altitude: compact ? 2.7 : 2.4 }, 1200);
        c.autoRotate = !reduced;
      }
    } catch {}
  }, [focus, ready, reduced, compact]);

  /* datacenter html marker (white diamond) */
  const makeDc = useCallback((d) => {
    const s = d.tier === 1 ? 11 : 8;
    const el = document.createElement("div");
    el.style.cssText = `width:${s}px;height:${s}px;transform:rotate(45deg);background:rgba(255,255,255,.92);border:1px solid ${EN_ACCENT.glow};box-shadow:0 0 9px ${EN_ACCENT.glow};cursor:pointer;`;
    el.title = `${d.name} — ${d.country}`;
    el.onmouseenter = () => hoverCb.current && hoverCb.current({ kind: "dc", name: d.name, sub: d.country });
    el.onmouseleave = () => hoverCb.current && hoverCb.current(null);
    return el;
  }, []);

  const toggleFuel = useCallback((k) => setFilters((f) => ({ ...f, [k]: f[k] === false })), []);
  const toggleLayer = useCallback((k) => setLayers((l) => ({ ...l, [k]: !l[k] })), []);

  const aspect = compact ? "4 / 5" : "16 / 9";

  return (
    <div ref={wrapRef} style={{
      position: "relative", aspectRatio: aspect, borderRadius: 16, overflow: "hidden",
      background: `radial-gradient(130% 120% at 50% -10%, ${EN_ACCENT.navy}, ${EN_ACCENT.navyDeep} 70%, #02070f 100%)`,
      border: `1px solid ${EN_ACCENT.turquoise}33`, boxShadow: `inset 0 0 90px rgba(0,0,0,0.6)`,
      touchAction: "pan-y",
    }}>
      {size.w > 0 && size.h > 0 && (
        <Globe
          ref={globeEl}
          width={size.w}
          height={size.h}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl={NIGHT_TEX}
          showAtmosphere
          atmosphereColor={EN_ACCENT.turquoise}
          atmosphereAltitude={0.2}
          onGlobeReady={onReady}
          rendererConfig={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          pointsData={layers.plants ? points : []}
          pointLat="lat" pointLng="lng"
          pointColor="color"
          pointAltitude="alt"
          pointRadius={compact ? 0.16 : 0.13}
          pointResolution={3}
          pointsMerge={true}
          arcsData={arcs}
          arcStartLat="startLat" arcStartLng="startLng" arcEndLat="endLat" arcEndLng="endLng"
          arcColor={(a) => (a.kind === "siepac" ? ["#F2B135", "#fbbf24"] : ["#22d3ee", "#00B5A8"])}
          arcStroke={(a) => (a.kind === "siepac" ? 0.55 : 0.32)}
          arcAltitudeAutoScale={0.42}
          arcDashLength={0.45}
          arcDashGap={0.12}
          arcDashAnimateTime={reduced ? 0 : 4200}
          arcsTransitionDuration={0}
          htmlElementsData={dcs}
          htmlLat="lat" htmlLng="lng"
          htmlAltitude={0.012}
          htmlElement={makeDc}
          ringsData={reduced ? [] : rings}
          ringLat="lat" ringLng="lng"
          ringColor={() => (t) => `rgba(34,211,238,${1 - t})`}
          ringMaxRadius={3}
          ringPropagationSpeed={1.4}
          ringRepeatPeriod={1400}
        />
      )}

      {/* loading / building shimmer */}
      {!ready && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 2, color: `${EN_ACCENT.glow}cc` }}>
            {en ? "BUILDING THE ATLAS…" : "CONSTRUYENDO EL ATLAS…"}
          </span>
        </div>
      )}

      {/* ── Title + status + hover (semantic layer) ── */}
      <div style={{ position: "absolute", top: 12, left: 14, zIndex: 3, maxWidth: "min(64%, 340px)", pointerEvents: "none" }}>
        <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 2, color: EN_ACCENT.glow }}>
          {en ? "GLOBAL GENERATION ATLAS" : "ATLAS GLOBAL DE GENERACIÓN"}
        </div>
        <div style={{ marginTop: 4, fontFamily: MONO, fontSize: 11, color: "#fff" }}>
          {total.toLocaleString(en ? "en" : "es")} {en ? "plants" : "plantas"}
          <span style={{ color: "rgba(255,255,255,0.5)" }}> · {HV_ARCS.length} {en ? "interconnections" : "interconexiones"} · {DATACENTERS.length} {en ? "AI hubs" : "hubs IA"}</span>
          {status === "loading" && <span style={{ color: "rgba(255,255,255,0.5)" }}> · {en ? "loading…" : "cargando…"}</span>}
        </div>
        {hover && (
          <div style={{ marginTop: 6, padding: "6px 9px", borderRadius: 9, background: `${EN_ACCENT.navy}e0`, border: `1px solid ${EN_ACCENT.glow}88`, display: "inline-block" }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "#fff" }}>{hover.name}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>{hover.kind === "dc" ? (en ? "AI / data-centre hub · " : "Hub IA / datacenter · ") : ""}{hover.sub}</div>
          </div>
        )}
      </div>

      {/* ── Focus toggle ── */}
      <div style={{ position: "absolute", top: 12, right: 14, zIndex: 3, display: "flex", gap: 6 }}>
        {[["global", en ? "World" : "Mundo"], ["cr", "Costa Rica"]].map(([k, label]) => (
          <button key={k} type="button" onClick={() => setFocus(k)}
            style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 0.5, padding: "5px 10px", borderRadius: 999, cursor: "pointer",
              color: focus === k ? EN_ACCENT.navy : "rgba(255,255,255,0.85)",
              background: focus === k ? EN_ACCENT.glow : "rgba(255,255,255,0.06)",
              border: `1px solid ${focus === k ? EN_ACCENT.glow : "rgba(255,255,255,0.18)"}` }}>
            {label}
          </button>
        ))}
      </div>

      {/* ── Layer toggles ── */}
      <div style={{ position: "absolute", top: 50, right: 14, zIndex: 3, display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-end" }}>
        {[["plants", en ? "Plants" : "Plantas"], ["grid", en ? "Grid" : "Red"], ["hubs", en ? "AI hubs" : "Hubs IA"]].map(([k, label]) => (
          <button key={k} type="button" onClick={() => toggleLayer(k)} aria-pressed={layers[k]}
            style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: 0.3, padding: "3px 8px", borderRadius: 999, cursor: "pointer",
              opacity: layers[k] ? 1 : 0.45, color: "rgba(255,255,255,0.85)", background: `${EN_ACCENT.navy}aa`,
              border: `1px solid ${layers[k] ? `${EN_ACCENT.turquoise}99` : "rgba(255,255,255,0.16)"}` }}>
            {layers[k] ? "● " : "○ "}{label}
          </button>
        ))}
      </div>

      {/* ── Technology filter / legend ── */}
      <div style={{ position: "absolute", left: 14, bottom: 30, right: 14, zIndex: 3, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", justifyContent: "center" }}>
        {LEGEND.map((k) => {
          const on = filters[k] !== false;
          return (
            <button key={k} type="button" onClick={() => toggleFuel(k)} aria-pressed={on}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 9px", borderRadius: 999, cursor: "pointer",
                fontFamily: MONO, fontSize: 10, letterSpacing: 0.3, opacity: on ? 1 : 0.4,
                color: "rgba(255,255,255,0.85)", background: `${EN_ACCENT.navy}aa`,
                border: `1px solid ${on ? `${FUEL[k]}99` : "rgba(255,255,255,0.15)"}`,
                backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: FUEL[k], boxShadow: `0 0 8px ${FUEL[k]}` }} />
              {en ? k : (FUEL_ES[k] || k)}
              {counts[k] ? <span style={{ color: "rgba(255,255,255,0.45)" }}>{counts[k] > 999 ? `${(counts[k] / 1000).toFixed(0)}k` : counts[k]}</span> : null}
            </button>
          );
        })}
      </div>

      {/* ── Source caption ── */}
      <div style={{ position: "absolute", bottom: 9, left: 14, right: 14, zIndex: 3, fontFamily: MONO, fontSize: 8.5, letterSpacing: 0.3, color: "rgba(255,255,255,0.42)", pointerEvents: "none", textAlign: "center" }}>
        {en
          ? "Plants: WRI Global Power Plant Database (CC-BY-4.0) · basemap NASA night lights · interconnections illustrative (ENTSO-E/IEA/SIEPAC) · independent technical visual"
          : "Plantas: WRI Global Power Plant Database (CC-BY-4.0) · base NASA luces nocturnas · interconexiones ilustrativas (ENTSO-E/IEA/SIEPAC) · visual técnico independiente"}
      </div>
    </div>
  );
}
