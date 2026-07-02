"use client";
import { useRef, useState, useEffect, useMemo, useCallback, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping } from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { AnimatePresence, motion } from "framer-motion";
import { PLANTS_GEO } from "./crGeo";
import { EN_ACCENT, SRC } from "../energiaData";
import { HV_ARCS } from "./hvArcs";
import { DATACENTERS } from "./datacenters";
import GlobeScene from "./GlobeScene";
import {
  FUEL_HEX, altOf, FUEL_LEGEND, FUEL_ES, ARC_LEGEND_ORDER, ARC_KIND, KIND_LABEL,
} from "./globeEncoding";

/* ═══════════════════════════════════════════════════════════════
   ENERGÍA — PowerGlobe (custom R3F engine)
   The render layer is our own @react-three/fiber scene (GlobeScene):
   one WebGL coordinate system, instanced glyphs, shader arcs, and
   self-projected labels — replacing react-globe.gl after its DOM
   marker layer misprojected on real devices (owner photos: NoVA in
   the mid-Atlantic, Cañas in the Pacific) and its texture-gated
   visibility black-holed the canvas. All chrome (pills, chips,
   popovers, CR panel, captions, SR layer) is preserved.
   ═══════════════════════════════════════════════════════════════ */

const MONO = "'IBM Plex Mono',monospace";
const WRI_CSV = "https://cdn.jsdelivr.net/gh/wri/global-power-plant-database@v1.3.0/output_database/global_power_plant_database.csv";

// ── Curated marquee (mobile + WRI fallback) ──
const CR_MARQUEE = PLANTS_GEO.filter((p) => p.kind !== "load").map((p) => ({
  lat: p.lat, lng: p.lng, name: p.name, country: "Costa Rica",
  fuel: ({ hydro: "Hydro", geo: "Geothermal", wind: "Wind", solar: "Solar", thermal: "Oil" }[p.kind] || "Other"),
  cap: p.mw || 50, cr: true,
}));

const LANDMARKS = [
  { lat: 30.823,  lng: 111.003, fuel: "Hydro",      name: "Three Gorges",           country: "China",           cap: 22500 },
  { lat: -25.408, lng: -54.589, fuel: "Hydro",       name: "Itaipú",                 country: "Brasil/Paraguay", cap: 14000 },
  { lat: 36.016,  lng: -114.737,fuel: "Hydro",       name: "Hoover Dam",             country: "EE. UU.",         cap: 2080  },
  { lat: 40.153,  lng: -76.725, fuel: "Nuclear",     name: "Three Mile Island / Crane",country:"EE. UU.",        cap: 837   },
  { lat: 33.143,  lng: -81.76,  fuel: "Nuclear",     name: "Vogtle",                 country: "EE. UU.",         cap: 4400  },
  { lat: 37.428,  lng: 138.596, fuel: "Nuclear",     name: "Kashiwazaki-Kariwa",     country: "Japón",           cap: 7965  },
  { lat: 38.79,   lng: -122.75, fuel: "Geothermal",  name: "The Geysers",            country: "EE. UU.",         cap: 1520  },
  { lat: 64.038,  lng: -21.4,   fuel: "Geothermal",  name: "Hellisheiði",            country: "Islandia",        cap: 303   },
  { lat: 53.885,  lng: 1.79,    fuel: "Wind",        name: "Hornsea (complejo)",     country: "Reino Unido",     cap: 2604  },
  { lat: 27.54,   lng: 71.91,   fuel: "Solar",       name: "Bhadla",                 country: "India",           cap: 2245  },
  { lat: 30.99,   lng: -6.86,   fuel: "CSP",         name: "Noor Ouarzazate (CSP)",  country: "Marruecos",       cap: 580   },
  { lat: 24.21,   lng: 120.48,  fuel: "Coal",        name: "Taichung",               country: "Taiwán",          cap: 5824  },
];
const MARQUEE = [...LANDMARKS, ...CR_MARQUEE];

// ── Projected label anchors (rendered by US — same math as the sphere) ──
const LABEL_ANCHORS = [
  { id: "canas",   lat: 10.43, lng: -85.09, alt: 0.05, gold: true,
    text: { es: "CAÑAS · NODO SIEPAC", en: "CAÑAS · SIEPAC HUB" }, sub: "Exp. 23.414" },
  { id: "nova",    lat: 39.04, lng: -77.49, alt: 0.045,
    text: { es: "NoVA · 4,5 GW · est.", en: "NoVA · 4.5 GW · est." } },
  { id: "phoenix", lat: 33.45, lng: -112.07, alt: 0.045,
    text: { es: "Phoenix · 1,2 GW · est.", en: "Phoenix · 1.2 GW · est." } },
];

// ── prefers-reduced-motion (SSR-safe) ──
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(!!mq.matches);
    apply();
    if (mq.addEventListener) mq.addEventListener("change", apply);
    else mq.addListener(apply);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", apply);
      else mq.removeListener(apply);
    };
  }, []);
  return reduced;
}

const txt = (v, en) => {
  if (!v) return "";
  if (typeof v === "object") return (en ? v.en : v.es) || v.es || v.en || "";
  return v;
};

function fmtCount(n, en = false) {
  if (n >= 10000) return `${Math.round(n / 1000)}k`;
  if (n >= 1000)  return `${(n / 1000).toFixed(1).replace(".", en ? "." : ",")}k`;
  return String(n);
}

export default function PowerGlobe({ en = false, compact = false }) {
  const reduced = useReducedMotion();
  const wrapRef = useRef(null);
  const layerTriggerRef = useRef(null);
  const encTriggerRef = useRef(null);
  const pausedRef = useRef(false);
  const labelRefs = useRef(LABEL_ANCHORS.map((a) => ({ ...a, el: null })));

  const [plants,     setPlants]     = useState(null);
  const [status,     setStatus]     = useState("idle");
  const [filters,    setFilters]    = useState(() => Object.fromEntries(FUEL_LEGEND.map((k) => [k, true])));
  const [layers,     setLayers]     = useState({ plants: true, grid: true, hubs: true, storage: true });
  const [layersOpen, setLayersOpen] = useState(false);
  const [encOpen,    setEncOpen]    = useState(false);
  const [focus,      setFocus]      = useState("global");
  const [hover,      setHover]      = useState(null);
  const [ready,      setReady]      = useState(false);
  const [announce,   setAnnounce]   = useState("");
  const [arcsLive,   setArcsLive]   = useState(false);

  const locale = en ? "en" : "es";

  // ── Pause the R3F frame work when off-screen or tab hidden ──
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { pausedRef.current = !e.isIntersecting; }, { threshold: 0.01 });
    io.observe(el);
    const onVis = () => { pausedRef.current = document.hidden; };
    document.addEventListener("visibilitychange", onVis);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  // ── Ready + intro staging (no texture dependency — the scene is local) ──
  useEffect(() => {
    const t1 = setTimeout(() => setReady(true), 120);
    const t2 = setTimeout(() => setArcsLive(true), reduced ? 0 : 650);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [reduced]);

  // ── WRI Web Worker fetch (desktop only, lazy) ──
  useEffect(() => {
    if (compact || reduced) return;
    const el = wrapRef.current;
    if (!el) return;
    let done = false;
    let worker = null;

    const handleErr = (err) => {
      console.warn("PowerGlobe: WRI load failed", err);
      setStatus("error");
      setAnnounce(
        en ? "Full dataset unavailable — showing curated reference plants."
           : "Dataset completo no disponible — mostrando referencias destacadas.",
      );
    };

    const run = () => {
      if (done) return;
      done = true;
      setStatus("loading");
      setAnnounce(en ? "Loading 35,000 plants from WRI…" : "Cargando 35.000 plantas WRI…");
      try {
        worker = new Worker("/workers/wri-parse.worker.js");
      } catch {
        handleErr(new Error("worker"));
        return;
      }
      fetch(WRI_CSV)
        .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
        .then((text) => worker.postMessage({ text, fuelKeys: Object.keys(FUEL_HEX) }))
        .catch(handleErr);
      worker.onmessage = (e) => {
        worker.terminate();
        if (e.data.error) { handleErr(new Error("schema")); return; }
        setPlants(e.data.plants);
        setStatus("ok");
        setAnnounce(
          en ? `Atlas ready: ${e.data.plants.length.toLocaleString("en")} plants loaded.`
             : `Atlas listo: ${e.data.plants.length.toLocaleString("es")} plantas cargadas.`,
        );
      };
      worker.onerror = () => { worker.terminate(); handleErr(new Error("worker")); };
    };

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { run(); io.disconnect(); }
    }, { threshold: 0.1 });
    io.observe(el);
    return () => { io.disconnect(); if (worker) try { worker.terminate(); } catch {} };
  }, [compact, reduced, en]);

  // ── Derived display data ──
  const decoratedMarquee = useMemo(
    () => MARQUEE.map((p) => ({ ...p, color: FUEL_HEX[p.fuel] || FUEL_HEX.Other, alt: altOf(p.cap) })),
    [],
  );
  const points = useMemo(() => {
    const src = plants || decoratedMarquee;
    return src.filter((p) => filters[p.fuel] !== false);
  }, [plants, decoratedMarquee, filters]);

  const counts = useMemo(() => {
    const c = {};
    (plants || decoratedMarquee).forEach((p) => { c[p.fuel] = (c[p.fuel] || 0) + 1; });
    return c;
  }, [plants, decoratedMarquee]);

  const total         = plants ? plants.length : decoratedMarquee.length;
  const filteredCount = points.length;
  const anyOn         = FUEL_LEGEND.some((k) => filters[k] !== false);

  // ── Focus announce ──
  useEffect(() => {
    if (!ready) return;
    if (focus === "cr") {
      const siepacCount = HV_ARCS.filter((a) => a.kind === "siepac").length;
      setAnnounce(
        en ? `Focus on Costa Rica: ${CR_MARQUEE.length} plants, ${siepacCount} SIEPAC interconnections.`
           : `Enfoque en Costa Rica: ${CR_MARQUEE.length} plantas, ${siepacCount} interconexiones SIEPAC.`,
      );
    } else {
      setAnnounce(en ? "Global view." : "Vista global.");
    }
  }, [focus, ready, en]);

  // ── Keyboard / pointer dismissal of popovers ──
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (layersOpen) { setLayersOpen(false); layerTriggerRef.current?.focus(); }
        else if (encOpen) { setEncOpen(false); encTriggerRef.current?.focus(); }
        else if (hover) setHover(null);
      }
    };
    const onPointer = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) { setLayersOpen(false); setEncOpen(false); }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [layersOpen, encOpen, hover]);

  const layersPopRef = useRef(null);
  useEffect(() => {
    if (layersOpen && layersPopRef.current) {
      const first = layersPopRef.current.querySelector("button");
      if (first) first.focus();
    }
  }, [layersOpen]);

  // ── Hover bridge from the scene (hubs + arcs) ──
  const onSceneHover = useCallback((h) => {
    if (!h) { setHover(null); return; }
    if (h.kind === "arc") {
      const a = h.d;
      const to    = txt(a.to, en);
      const label = KIND_LABEL[a.kind]?.[locale] ?? a.kind;
      const qual  = a.kind === "planned"
        ? (en ? " · illustrative" : " · ilustrativo")
        : (en ? " · coords approx." : " · coords aprox.");
      setAnnounce(`${a.from} → ${to}, ${(a.mw || 0).toLocaleString(locale)} MW, ${label}`);
      setHover({
        kind: "arc",
        name: `${a.from} → ${to}`,
        sub:  `${(a.mw || 0).toLocaleString(locale)} MW · ${label}${qual}`,
      });
    } else if (h.kind === "dc") {
      const d = h.d;
      setHover({
        kind: "dc",
        name: txt(d.name, en),
        sub:  txt(d.country, en),
        detail: d.tier === 1 ? (en ? "Tier 1 · AI hub" : "Tier 1 · hub IA") : (en ? "Tier 2 · regional" : "Tier 2 · regional"),
        mw: d.demandMw,
      });
    }
  }, [en, locale]);

  const toggleFuel   = useCallback((k) => setFilters((f) => ({ ...f, [k]: !f[k] })), []);
  const toggleLayer  = useCallback((k) => setLayers((l) => ({ ...l, [k]: !l[k] })), []);
  const resetFilters = useCallback(() => setFilters(Object.fromEntries(FUEL_LEGEND.map((k) => [k, true]))), []);
  const openLayers   = useCallback(() => { setLayersOpen((v) => !v); setEncOpen(false); }, []);
  const openEnc      = useCallback(() => { setEncOpen((v) => !v); setLayersOpen(false); }, []);

  const aspect  = compact ? "4 / 5" : "16 / 9";
  const titleId = "pg-title";
  const descId  = "pg-desc";
  const liveMsg = !anyOn
    ? (en
        ? "All plants hidden. Activate Show all to restore."
        : "Todas las plantas ocultas. Pulse «Mostrar todas» para restaurar.")
    : announce;

  return (
    <figure
      ref={wrapRef}
      role="figure"
      lang={en ? "en" : "es"}
      aria-labelledby={titleId}
      aria-describedby={descId}
      style={{
        position:     "relative",
        aspectRatio:  aspect,
        borderRadius: 16,
        overflow:     "hidden",
        margin:       0,
        background:   `radial-gradient(130% 120% at 50% -10%, ${EN_ACCENT.navy}, ${EN_ACCENT.navyDeep} 70%, #02070f 100%)`,
        border:       `1px solid ${EN_ACCENT.turquoise}33`,
        boxShadow:    "inset 0 0 90px rgba(0,0,0,0.55), inset 0 0 40px rgba(0,181,168,0.04)",
        touchAction:  "pan-y",
      }}
    >
      <style>{`
        .pg-btn {
          font-family: ${MONO}; font-size: 11px; letter-spacing: 0.4px;
          min-height: 44px; min-width: 44px; padding: 10px 13px;
          border-radius: 999px; cursor: pointer;
          color: rgba(255,255,255,0.88); background: rgba(10,31,63,0.67);
          border: 1px solid rgba(255,255,255,0.18);
          transition: border-color 150ms ease, background 150ms ease, box-shadow 150ms ease;
          backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
          display: inline-flex; align-items: center; justify-content: center; gap: 6px;
          user-select: none; -webkit-tap-highlight-color: transparent;
        }
        .pg-btn:hover   { background: #10294f; border-color: rgba(255,255,255,0.32); }
        .pg-btn:active  { transform: scale(0.97); transition-duration: 60ms; }
        .pg-btn:focus-visible { outline: 2px solid #22d3ee; outline-offset: 2px; }
        .pg-btn-on {
          color: #0A1F3F; background: #22d3ee; border-color: #22d3ee;
          box-shadow: 0 0 12px rgba(34,211,238,0.4);
        }
        .pg-btn-on:hover { background: #00B5A8; border-color: #00B5A8; box-shadow: 0 0 16px rgba(0,181,168,0.6); }
        .pg-btn-chip { gap: 6px; flex-shrink: 0; }
        .pg-btn-chip[data-off="1"] { border-color: rgba(255,255,255,0.18); }
        .pg-skip {
          position: absolute; left: 10px; top: 10px; z-index: 10;
          background: #0A1F3F; color: #fff; padding: 12px 16px; border-radius: 8px;
          font-family: ${MONO}; font-size: 12px; min-height: 44px;
          border: 1px solid #22d3ee; text-decoration: none;
          display: inline-flex; align-items: center;
          opacity: 0; pointer-events: none;
        }
        .pg-skip:focus-visible { opacity: 1; pointer-events: auto; outline: 2px solid #22d3ee; outline-offset: 2px; }
        .pg-chips-rail { scrollbar-width: none; -ms-overflow-style: none;
          mask-image: linear-gradient(90deg, transparent 0, #000 14px, #000 calc(100% - 14px), transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 14px, #000 calc(100% - 14px), transparent 100%); }
        .pg-chips-rail::-webkit-scrollbar { display: none; }
        .pg-chips-rail > button { flex-shrink: 0; white-space: nowrap; }
        .pg-sr {
          position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px;
          overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
        }
        @media (max-width: 639px) {
          .pg-btn-compact-chip {
            min-height: 36px !important; padding: 7px 10px !important; font-size: 10px !important;
          }
        }
        .pg-anchor-label {
          position: absolute; left: 0; top: 0; z-index: 2; pointer-events: none;
          font-family: ${MONO}; font-size: 9px; letter-spacing: 0.6px; line-height: 1.25;
          color: #fff; text-align: center; white-space: nowrap;
          background: rgba(6,21,46,0.66); border-radius: 4px; padding: 2px 6px;
          border: 1px solid rgba(34,211,238,0.4);
          text-shadow: 0 1px 4px rgba(0,0,0,0.95);
          transition: opacity 200ms ease; will-change: transform;
        }
        .pg-anchor-label[data-gold="1"] { border-color: rgba(242,177,53,0.55); }
        .pg-anchor-label b { color: ${EN_ACCENT.gold}; font-weight: 700; }
      `}</style>

      {/* ── Skip link (first focusable child) ── */}
      <a className="pg-skip" href="#crGridMapAnchor">
        {en ? "Skip to Costa Rica map" : "Saltar al mapa de Costa Rica"}
      </a>

      {/* ── SR: DC hub list ── */}
      <ul
        id="pg-data"
        className="pg-sr"
        aria-label={en ? "AI data-centre hubs shown on the globe" : "Hubs IA / centros de datos en el globo"}
      >
        {DATACENTERS.map((d, i) => (
          <li key={i}>
            {txt(d.name, en)}, {txt(d.country, en)},
            {d.tier === 1 ? (en ? " Tier 1 AI hub" : " Hub IA Tier 1") : (en ? " Tier 2 regional" : " Tier 2 regional")}
            {d.demandMw ? ` · ~${d.demandMw.toLocaleString(locale)} MW (est.)` : ""}
          </li>
        ))}
        <li>
          {en
            ? "Cañas, Costa Rica — SIEPAC hub, ICE–MER coupling point, 230 kV, 300 MW per segment, 5 active segments to PA/NI/HN/SV/GT."
            : "Cañas, Costa Rica — nodo SIEPAC, punto de acoplamiento ICE–MER, 230 kV, 300 MW por segmento, 5 segmentos activos hacia PA/NI/HN/SV/GT."}
        </li>
      </ul>

      {/* ── SR: Curated landmark plants list ── */}
      <ul
        className="pg-sr"
        aria-label={en ? "Curated landmark power plants shown on the globe" : "Plantas destacadas en el globo"}
      >
        {MARQUEE.map((p, i) => (
          <li key={i}>
            {p.name}, {p.country}, {en ? p.fuel : (FUEL_ES[p.fuel] ?? p.fuel)},
            {` ${p.cap.toLocaleString(locale)} MW`}
            {p.cr ? (en ? " · CR reference plant" : " · planta de referencia CR") : ""}
          </li>
        ))}
      </ul>

      {/* ── figcaption (SR only) ── */}
      <figcaption id={descId} className="pg-sr">
        {en
          ? `Global generation atlas: ${total.toLocaleString("en")} power plants as light columns sized by installed capacity, ${HV_ARCS.length} major high-voltage interconnections including the SIEPAC tie-in for Costa Rica (ENTSO-E, IEA, SIEPAC EOR/EPR — illustrative), ${DATACENTERS.length} AI / data-centre hubs (Synergy Research, Dell'Oro — estimate), and utility-scale storage sites (Global Energy Monitor CC-BY-4.0, IEA Energy Storage Tracker under IEA Terms of Use, US EIA Form 860). Basemap: NASA night lights (public domain). The 3D globe is decorative; the keyboard-accessible Costa Rica grid map is in Act 4 below.`
          : `Atlas global de generación: ${total.toLocaleString("es")} plantas de generación como columnas de luz dimensionadas por capacidad instalada, ${HV_ARCS.length} interconexiones de alta tensión incluida la conexión SIEPAC para Costa Rica (ENTSO-E, IEA, SIEPAC EOR/EPR — ilustrativo), ${DATACENTERS.length} hubs IA / centros de datos (Synergy Research, Dell'Oro — estimado), y sitios de almacenamiento utility-scale (Global Energy Monitor CC-BY-4.0, IEA Energy Storage Tracker bajo IEA Terms of Use, US EIA Form 860). Base: NASA night lights (dominio público). El globo 3D es decorativo; el mapa accesible de la red de Costa Rica está en el Acto 4 abajo.`}
      </figcaption>

      {/* ── Live region (SR only) ── */}
      <div className="pg-sr" role="status" aria-live="polite" aria-atomic="true">
        {liveMsg}
      </div>

      {/* ── Globe canvas (aria-hidden — all SR content is above) ── */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
        <Canvas
          dpr={[1, 2]}
          camera={{ fov: compact ? 34 : 26, position: [0, 0, 5.6], near: 0.1, far: 60 }}
          gl={{
            antialias: false,
            alpha: true,
            stencil: false,
            powerPreference: compact ? undefined : "high-performance",
          }}
          style={{ position: "absolute", inset: 0, touchAction: "pan-y" }}
          onCreated={({ gl }) => { gl.setClearColor(0x000000, 0); gl.toneMapping = ACESFilmicToneMapping; gl.toneMappingExposure = 1.15; gl.domElement.style.touchAction = "pan-y"; }}
        >
          <Suspense fallback={null}>
            <GlobeScene
              compact={compact}
              reduced={reduced}
              focus={focus}
              layers={layers}
              points={points}
              arcsLive={arcsLive}
              onHover={onSceneHover}
              labelRefs={labelRefs}
              pausedRef={pausedRef}
            />
            {!reduced && (
              <EffectComposer disableNormalPass>
                <Bloom
                  intensity={compact ? 0.75 : 0.85}
                  luminanceThreshold={0.5}
                  luminanceSmoothing={0.3}
                  mipmapBlur
                  radius={compact ? 0.55 : 0.65}
                />
              </EffectComposer>
            )}
          </Suspense>
        </Canvas>

        {/* Anchor labels — projected each frame by GlobeScene (same math as the sphere) */}
        {LABEL_ANCHORS.map((a, i) => (
          <div
            key={a.id}
            ref={(el) => { labelRefs.current[i].el = el; }}
            className="pg-anchor-label"
            data-gold={a.gold ? "1" : "0"}
            style={{ opacity: 0 }}
          >
            {a.gold
              ? (<><b>{txt(a.text, en)}</b><br />{a.sub}</>)
              : txt(a.text, en)}
          </div>
        ))}
      </div>

      {/* ── Loading shimmer until first frame staged ── */}
      {!ready && (
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 2, color: `${EN_ACCENT.glow}cc` }}>
            {en ? "BUILDING THE ATLAS…" : "CONSTRUYENDO EL ATLAS…"}
          </span>
        </div>
      )}

      {/* ═══════════════════════════
          ZONE A — Top-left: title, counter, error, hover tooltip
          ═══════════════════════════ */}
      <div style={{
        position: "absolute", top: 12, left: 14, zIndex: 3,
        maxWidth: compact ? "calc(100% - 200px)" : "min(64%, 360px)",
        pointerEvents: "none",
      }}>
        <div id={titleId} style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 2, color: EN_ACCENT.glow }}>
          {en ? "GLOBAL GENERATION ATLAS" : "ATLAS GLOBAL DE GENERACIÓN"}
        </div>
        <div style={{ marginTop: 4, fontFamily: MONO, fontSize: 11, color: "#fff" }}>
          {plants
            ? <>{filteredCount.toLocaleString(locale)} {en ? "of" : "de"} {total.toLocaleString(locale)} {en ? "plants" : "plantas"}</>
            : <>{en ? "Curated highlights" : "Destacados seleccionados"} · {filteredCount.toLocaleString(locale)} {en ? "plants" : "plantas"}</>}
          <span style={{ color: "rgba(255,255,255,0.55)" }}>
            {" · "}{HV_ARCS.length} {en ? "interconnections" : "interconexiones"}
            {!compact && <> · {DATACENTERS.length} {en ? "AI hubs" : "hubs IA"}</>}
          </span>
          {status === "loading" && <span style={{ color: "rgba(255,255,255,0.55)" }}> · {en ? "loading…" : "cargando…"}</span>}
          {status === "error" && <span style={{ color: "rgba(169,187,217,0.75)" }}> · {en ? "curated set" : "referencias curadas"}</span>}
        </div>


        {/* Desktop hover tooltip (top-left; compact uses the bottom card) */}
        {!compact && (
          <div style={{
            marginTop: 6, padding: hover ? "7px 10px" : 0, borderRadius: 9,
            background: "rgba(10,31,63,0.91)",
            border: hover ? `1px solid ${EN_ACCENT.glow}99` : "1px solid transparent",
            display: "inline-block", maxWidth: 340,
            opacity: hover ? 1 : 0, transition: "opacity 150ms ease", pointerEvents: "none",
          }}>
            {hover && (
              <>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "#fff" }}>{hover.name}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}>{hover.sub}</div>
                {hover.detail && (
                  <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>
                    {hover.detail}{hover.mw ? ` · ~${hover.mw.toLocaleString(locale)} MW (est.)` : ""}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* ═══════════════════════════
          ZONE B — Top-right: focus pills + layer toggles
          ═══════════════════════════ */}
      <div style={{ position: "absolute", top: 12, right: 14, zIndex: 4, display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
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
            <button ref={layerTriggerRef} type="button" onClick={openLayers} className="pg-btn"
              aria-expanded={layersOpen} aria-controls="pg-layers">
              {en ? "Layers" : "Capas"} <span aria-hidden="true">▾</span>
            </button>
            {layersOpen && (
              <div id="pg-layers" ref={layersPopRef} style={{
                position: "absolute", top: "calc(100% + 6px)", right: 0,
                display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-end",
                background: "rgba(10,31,63,0.82)", padding: 6, borderRadius: 10,
                border: `1px solid ${EN_ACCENT.turquoise}33`,
                maxHeight: "min(60vh, 240px)", overflowY: "auto",
              }}>
                {[["plants", en ? "Plants" : "Plantas"], ["grid", en ? "Grid" : "Red"], ["hubs", en ? "AI hubs" : "Hubs IA"], ["storage", en ? "Storage" : "Almacenamiento"]].map(([k, label]) => (
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
            {[["plants", en ? "Plants" : "Plantas"], ["grid", en ? "Grid" : "Red"], ["hubs", en ? "AI hubs" : "Hubs IA"], ["storage", en ? "Storage" : "Almacenamiento"]].map(([k, label]) => (
              <button key={k} type="button" onClick={() => toggleLayer(k)} aria-pressed={layers[k]}
                className={`pg-btn${layers[k] ? " pg-btn-on" : ""}`} data-off={layers[k] ? "0" : "1"}>
                <span aria-hidden="true">{layers[k] ? "● " : "○ "}</span>{label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Compact hover card (bottom, above teaser) ── */}
      {compact && hover && (
        <div style={{
          position: "absolute", left: 14, right: 66, bottom: 116, zIndex: 5,
          background: "rgba(6,21,46,0.92)", border: `1px solid ${EN_ACCENT.glow}88`,
          borderRadius: 10, padding: "8px 30px 8px 10px", pointerEvents: "auto",
        }}>
          <button
            type="button"
            onClick={() => setHover(null)}
            aria-label={en ? "Dismiss" : "Cerrar"}
            style={{ position: "absolute", right: 2, top: 2, width: 26, height: 26, background: "transparent", border: "none", color: "rgba(255,255,255,0.75)", fontSize: 14, cursor: "pointer" }}
          >
            ×
          </button>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: "#fff", fontFamily: MONO }}>{hover.name}</div>
          <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>{hover.sub}</div>
          {hover.detail && (
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>
              {hover.detail}{hover.mw ? ` · ~${hover.mw.toLocaleString(locale)} MW (est.)` : ""}
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════
          CR Teaser strip — always-visible path into the CR story
          ═══════════════════════════ */}
      {focus !== "cr" && (
        <button
          type="button"
          onClick={() => setFocus("cr")}
          aria-label={en ? "Expand Costa Rica panel — 5 SIEPAC segments, Bill 23.414" : "Expandir panel de Costa Rica — 5 segmentos SIEPAC, Exp. 23.414"}
          style={{
            position: "absolute",
            bottom: compact ? 64 : 150,
            left: 14,
            right: compact ? 66 : "auto",
            maxWidth: compact ? "none" : "min(320px, 60%)",
            zIndex: 3,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(6,21,46,0.85)",
            border: `1px solid ${EN_ACCENT.gold}88`,
            borderRadius: 999,
            padding: "8px 12px",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            boxShadow: `0 4px 14px rgba(0,0,0,0.32), 0 0 12px ${EN_ACCENT.gold}33`,
            color: "rgba(255,255,255,0.96)",
            fontFamily: MONO,
            fontSize: 10.5,
            letterSpacing: 0.6,
            minHeight: 36,
          }}
        >
          <span aria-hidden="true" style={{ width: 10, height: 10, transform: "rotate(45deg)", background: EN_ACCENT.gold, boxShadow: `0 0 8px ${EN_ACCENT.gold}`, flexShrink: 0 }} />
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            COSTA RICA · 5 SIEPAC · EXP. 23.414
          </span>
          <span aria-hidden="true" style={{ color: EN_ACCENT.gold, flexShrink: 0 }}>→</span>
        </button>
      )}

      {/* ═══════════════════════════
          CR Info Panel (focus = cr)
          ═══════════════════════════ */}
      <AnimatePresence>
        {focus === "cr" && (
          <motion.div
            key="cr-panel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.22, ease: "easeOut" } }}
            exit={{ opacity: 0, y: 4, transition: { duration: reduced ? 0 : 0.16, ease: "easeIn" } }}
            style={{
              position: "absolute",
              bottom: compact ? 64 : 150,
              left: 14,
              width: "min(340px, calc(100% - 28px))",
              maxHeight: compact ? "min(58%, 320px)" : "none",
              overflowY: compact ? "auto" : "visible",
              zIndex: 5,
              background: "rgba(6,21,46,0.91)",
              border: `1px solid ${EN_ACCENT.gold}55`,
              borderRadius: 12,
              padding: "10px 12px",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              pointerEvents: "auto",
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 2, color: EN_ACCENT.gold, marginBottom: 8 }}>
              {en ? "COSTA RICA · SIEPAC ANCHOR" : "COSTA RICA · NODO SIEPAC"}
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 8px", display: "flex", flexDirection: "column", gap: 4 }}>
              {HV_ARCS.filter((a) => a.kind === "siepac").map((a, i) => (
                <li key={a.id ?? i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ display: "inline-block", width: 16, height: 2, background: EN_ACCENT.gold, flexShrink: 0 }} aria-hidden="true" />
                  <span style={{ fontFamily: MONO, fontSize: 10.5, color: "rgba(255,255,255,0.9)" }}>
                    {txt(a.label, en) || `${a.from} → ${txt(a.to, en)}`}
                  </span>
                </li>
              ))}
            </ul>
            <div style={{
              display: "inline-block", fontFamily: MONO, fontSize: 10, color: "#06152e",
              background: EN_ACCENT.gold, borderRadius: 5, padding: "2px 7px", fontWeight: 700, marginBottom: 6,
            }}>
              EXP. 23.414
            </div>
            <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.5, margin: "0 0 8px" }}>
              {en
                ? "Costa Rica couples to the regional market (MER) at Cañas. The 23.414 reform decides how this grid buys, sells and expands."
                : "Costa Rica se acopla al mercado regional (MER) en Cañas. La reforma 23.414 decide cómo esta red compra, vende y se expande."}
            </p>
            <a
              href="#energia-act-5"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6, minHeight: 34,
                fontFamily: MONO, fontSize: 10.5, color: EN_ACCENT.glow,
                textDecoration: "underline", marginBottom: 6,
              }}
            >
              {en ? "Full 23.414 analysis ↓" : "Análisis completo 23.414 ↓"}
            </a>
            <div style={{ fontFamily: MONO, fontSize: 9.5, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>
              {en ? "Source: " : "Fuente: "}
              <a href={SRC.epr.url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}>EPR/SIEPAC</a>
              {" · "}
              <a href={SRC.asamblea.url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}>Asamblea</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════
          ZONE D — Source attribution (DESKTOP ONLY; mobile citation lives
          in the always-visible caption below the globe in EnergiaDeep)
          ═══════════════════════════ */}
      <div style={{
        position: "absolute",
        bottom: 118,
        left: 14, right: 14, zIndex: 3,
        display: compact ? "none" : "block",
        fontFamily: MONO, fontSize: 10, letterSpacing: 0.3,
        color: "rgba(255,255,255,0.78)",
        textShadow: "0 1px 4px rgba(0,0,0,0.85)",
        textAlign: "center",
        pointerEvents: "auto",
      }}>
        {en ? "Plants: " : "Plantas: "}
        <a href={SRC.wri.url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>
          WRI Global Power Plant Database
        </a>
        {" ("}
        <a href={SRC.cc_by_4.url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>CC-BY-4.0</a>
        {") · "}
        {en ? "basemap " : "base "}
        <a href={SRC.three_globe.url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>
          NASA night lights
        </a>
        {" · "}
        {en ? "interconnections illustrative (" : "interconexiones ilustrativas ("}
        <a href={SRC.entsoe.url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>ENTSO-E</a>
        {", "}
        <a href={SRC.iea_wgo.url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>IEA</a>
        {", "}
        <a href={SRC.eor.url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>SIEPAC EOR</a>
        {"/"}
        <a href={SRC.epr.url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>EPR</a>
        {")"}
        {layers.hubs && (
          <>
            {en ? " · AI hubs " : " · hubs IA "}
            <a href={SRC.synergy.url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>Synergy</a>
            {", "}
            <a href={SRC.delloro.url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>Dell'Oro</a>
            {en ? " — est." : " — est."}
          </>
        )}
        {layers.storage && (
          <>
            {en ? " · storage " : " · almacenamiento "}
            <a href={SRC.gem_gipt.url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>GEM</a>
            {" ("}
            <a href={SRC.cc_by_4.url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>CC-BY-4.0</a>
            {"), "}
            <a href={SRC.iea_storage.url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>IEA</a>
            {" ("}
            <a href={SRC.iea_terms.url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>Terms of Use</a>
            {"), "}
            <a href={SRC.eia860.url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>EIA 860</a>
          </>
        )}
      </div>

      {/* ═══════════════════════════
          ZONE E — Encoding legend ("i" popover on compact)
          ═══════════════════════════ */}
      {compact && (
        <button
          ref={encTriggerRef}
          type="button"
          onClick={openEnc}
          aria-expanded={encOpen}
          aria-controls="pg-enc"
          aria-label={en ? "Toggle encoding legend" : "Mostrar leyenda de codificación"}
          className="pg-btn"
          style={{ position: "absolute", right: 14, bottom: 64, zIndex: 4, fontSize: 13, width: 44, height: 44 }}
        >
          i
        </button>
      )}
      <div
        id="pg-enc"
        aria-hidden={compact && !encOpen ? true : undefined}
        style={{
          position:        "absolute",
          bottom:          compact ? 116 : 76,
          left:            14, right: 14, zIndex: 3,
          display:         (compact && !encOpen) ? "none" : "flex",
          flexWrap:        "wrap",
          gap:             14,
          justifyContent:  "center",
          fontFamily:      MONO,
          fontSize:        10.5,
          color:           "rgba(255,255,255,0.92)",
          pointerEvents:   "none",
          background:      compact ? "rgba(6,21,46,0.9)" : "transparent",
          padding:         compact ? "8px 10px" : 0,
          borderRadius:    compact ? 10 : 0,
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <span style={{ display: "inline-flex", alignItems: "flex-end", gap: 2, height: 14 }}>
            {[500, 5000, 15000].map((mw) => (
              <span key={mw} style={{ width: 3, height: Math.round((altOf(mw) / 0.14) * 14), background: EN_ACCENT.glow }} />
            ))}
          </span>
          {en ? "Column ≈ √MW (500 · 5k · ≥15k)" : "Columna ≈ √MW (500 · 5k · ≥15k)"}
        </span>
        {ARC_LEGEND_ORDER.map((k) => (
          <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            {ARC_KIND[k].legendSwatch.style === "dashed" ? (
              <span style={{ width: 22, height: 1, background: "transparent", borderTop: `1.5px dashed ${ARC_KIND[k].legendSwatch.color}` }} />
            ) : (
              <span style={{ width: ARC_KIND[k].legendSwatch.width, height: ARC_KIND[k].legendSwatch.height, background: ARC_KIND[k].legendSwatch.color, borderRadius: 1 }} />
            )}
            {KIND_LABEL[k][locale]}
          </span>
        ))}
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 9, height: 9, transform: "rotate(45deg)", background: "rgba(255,255,255,0.9)", border: `1px solid ${EN_ACCENT.glow}` }} />
          {en ? "AI hub (≈100–500 MW)" : "Hub IA (≈100–500 MW)"}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <span style={{ position: "relative", width: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `1.5px solid ${EN_ACCENT.gold}`, boxShadow: `0 0 6px ${EN_ACCENT.gold}88` }} />
            <span style={{ width: 10, height: 10, transform: "rotate(45deg)", background: "rgba(255,255,255,0.95)", border: `1px solid ${EN_ACCENT.glow}` }} />
          </span>
          {en ? "AI-scale (≥700 MW)" : "Escala IA (≥700 MW)"}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
            <circle cx="6" cy="6" r="5" fill="none" stroke="#7cb8ff" strokeWidth="1.5" />
            <circle cx="6" cy="6" r="2.5" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
          </svg>
          {en ? "Storage" : "Almacenamiento"}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 10, height: 10, transform: "rotate(45deg)", background: EN_ACCENT.gold, boxShadow: `0 0 6px ${EN_ACCENT.gold}` }} />
          {en ? "Cañas · SIEPAC beacon" : "Cañas · faro SIEPAC"}
        </span>
      </div>

      {/* ── Empty state (all fuel chips off) ── */}
      {!anyOn && (
        <div style={{
          position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)",
          zIndex: 4, textAlign: "center", padding: "16px 22px", borderRadius: 12,
          background: "rgba(10,31,63,0.88)", border: `1px solid ${EN_ACCENT.glow}77`,
          backdropFilter: "blur(6px)", pointerEvents: "none",
        }}>
          <div style={{ fontFamily: MONO, fontSize: 13, color: "#fff", marginBottom: 10 }}>
            {en ? "Which source powers the world?" : "¿Qué fuente mueve al mundo?"}
          </div>
          <button
            type="button"
            onClick={resetFilters}
            className="pg-btn pg-btn-on"
            aria-label={en ? `Show all technologies (${total.toLocaleString("en")} plants)` : `Mostrar todas las tecnologías (${total.toLocaleString("es")} plantas)`}
            style={{ pointerEvents: "auto" }}
          >
            {en ? "Show all" : "Mostrar todas"}
          </button>
        </div>
      )}

      {/* ═══════════════════════════
          ZONE F — Fuel chip rail (bottom)
          ═══════════════════════════ */}
      <div className={compact ? "pg-chips-rail" : undefined} style={{
        position:       "absolute",
        left:           compact ? 0 : 14,
        bottom:         "max(10px, env(safe-area-inset-bottom))",
        right:          compact ? 0 : 14,
        zIndex:         3,
        display:        "flex",
        flexWrap:       compact ? "nowrap" : "wrap",
        overflowX:      compact ? "auto" : "visible",
        WebkitOverflowScrolling: "touch",
        padding:        compact ? "0 14px" : 0,
        gap:            6,
        alignItems:     "center",
        justifyContent: compact ? "flex-start" : "center",
      }}>
        {FUEL_LEGEND.map((k) => {
          const on = filters[k] !== false;
          return (
            <button
              key={k}
              type="button"
              onClick={() => toggleFuel(k)}
              aria-pressed={on}
              className={`pg-btn pg-btn-chip${compact ? " pg-btn-compact-chip" : ""}`}
              data-off={on ? "0" : "1"}
              style={{ borderColor: on ? `${FUEL_HEX[k]}cc` : "rgba(255,255,255,0.18)" }}
            >
              <span style={{
                width: 8, height: 8, borderRadius: "50%",
                background: FUEL_HEX[k],
                boxShadow: on ? `0 0 8px ${FUEL_HEX[k]}` : "none",
                flexShrink: 0,
              }} aria-hidden="true" />
              {en ? k : (FUEL_ES[k] ?? k)}
              {counts[k] ? (
                <span style={{ color: "rgba(255,255,255,0.5)" }}>
                  {fmtCount(counts[k], en)}
                </span>
              ) : null}
            </button>
          );
        })}
        <button
          type="button"
          onClick={resetFilters}
          className={`pg-btn${compact ? " pg-btn-compact-chip" : ""}`}
          aria-label={en ? "Reset filters" : "Restablecer filtros"}
        >
          <span aria-hidden="true">↺</span>
          {" "}{en ? "Reset" : "Reiniciar"}
        </button>
      </div>
    </figure>
  );
}
