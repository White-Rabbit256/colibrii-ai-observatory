"use client";
import {
  useRef, useState, useEffect, useMemo, useCallback,
} from "react";
import { DirectionalLight, AmbientLight } from "three";
import Globe from "react-globe.gl";
import { AnimatePresence, motion } from "framer-motion";
import { animate } from "animejs";
import { PLANTS_GEO } from "./crGeo";
import { EN_ACCENT, SRC } from "../energiaData";
import { HV_ARCS } from "./hvArcs";
import { DATACENTERS } from "./datacenters";
import {
  FUEL_HEX, ARC_COLOR_FN, ARC_STROKE_FN, ARC_ALT_FN,
  ARC_DASH_LEN_FN, ARC_DASH_GAP_FN, ARC_DASH_ANIM_FN,
  altOf, RING, DC_GLYPH, CR_HUB_GLYPH, DC_ALTITUDE, DC_SCALE,
  SCENE, TIMING, FUEL_LEGEND, FUEL_ES, ARC_LEGEND_ORDER,
  ARC_KIND, KIND_LABEL,
} from "./globeEncoding";

/* ═══════════════════════════════════════════════════════════════
   ENERGÍA — PowerGlobe (visual rebuild, Phase 1)
   Spec: BUILD SPEC v1 — 20-persona panel synthesis.
   Fixes: iOS black canvas (size init), cinematic 3-light rig,
   atmosphere 0.22, CR Info Panel, Cañas marker, arc corrections,
   web-worker WRI parse, chip border alpha cc, a11y pass.
   ═══════════════════════════════════════════════════════════════ */

const MONO = "'IBM Plex Mono',monospace";
const WRI_CSV = "https://cdn.jsdelivr.net/gh/wri/global-power-plant-database@v1.3.0/output_database/global_power_plant_database.csv";

// ── Renderer configs (module-scope objects — stable identity, never triggers
//    react-globe.gl renderer remount).
// iOS black-canvas root cause: powerPreference on mobile prevents the GPU
// from initialising on some iOS Safari versions. OMIT it on compact.
const RENDERER_MOBILE = {
  antialias: false,  // MSAA off on mobile — GPU budget
  alpha:     true,
  stencil:   false,
  // powerPreference INTENTIONALLY OMITTED on mobile
};
const RENDERER_DESKTOP = {
  antialias:        true,
  alpha:            true,
  stencil:          false,
  powerPreference:  "high-performance",
};

// ── Motion constants (mirrors TIMING from globeEncoding, but adds ramp values)
const MT = {
  introCameraMs:      TIMING.introCameraMs,      // 1400
  introArcsDelayMs:   TIMING.introArcsDelayMs,   // 700
  introRingsDelayMs:  TIMING.introRingsDelayMs,  // 1200
  introPointsDelayMs: TIMING.introPointsDelayMs, // 350
  focusTweenMs:       TIMING.focusTweenMs,       // 1200
  rotResumeDelayMs:   TIMING.rotResumeDelayMs,   // 1250
  hoverSlowMs:        600,
  hoverRestoreMs:     900,
  rotSpeedNormal:     0.45,
  rotSpeedHover:      0.12,
  cameraStartAlt:     TIMING.cameraStartAlt,     // 4.5
};

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

// ── Cañas SIEPAC hub marker (separate from DATACENTERS — dispatched via kind)
const CANAS_HUB = {
  kind: "siepac-hub",
  lat: 10.27, lng: -85.07,
  name: { es: "Cañas · Nodo SIEPAC", en: "Cañas · SIEPAC Hub" },
  sub:  { es: "Punto de acoplamiento ICE–MER · 230 kV · 300 MW/seg.", en: "ICE–MER coupling point · 230 kV · 300 MW/seg." },
  detail: { es: "Expediente 23.414 — la reforma en juego", en: "Expediente 23.414 — the reform at stake" },
};

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

// ── Resolve bilingual {es, en} field ──
const txt = (v, en) => {
  if (!v) return "";
  if (typeof v === "object") return (en ? v.en : v.es) || v.es || v.en || "";
  return v;
};

// ── installLights helper (extracted so context-restore can re-run it) ──
function installLights(g, reduced, lightsRef) {
  if (lightsRef.current) return;
  const scene = g.scene();
  if (reduced) {
    // Reduced motion: single bright ambient for legibility
    const amb = new AmbientLight(0x1a2f50, 0.45);
    scene.add(amb);
  } else {
    // 1) Warm key sun — illuminates Americas-facing hemisphere
    const sun = new DirectionalLight(0xfff4e0, 1.05);
    sun.position.set(1.2, 0.6, 0.8);
    // 2) Cool navy ambient — preserves night-side without going full black
    const amb = new AmbientLight(0x0d1f3c, 0.18);
    // 3) Teal rim — silhouette separation, brand bridge
    const rim = new DirectionalLight(0x00b5a8, 0.28);
    rim.position.set(-1.0, -0.2, -0.8);
    scene.add(sun);
    scene.add(amb);
    scene.add(rim);
  }
  lightsRef.current = true;
}

// ── Count badge formatter ──
function fmtCount(n) {
  if (n >= 10000) return `${Math.round(n / 1000)}k`;
  if (n >= 1000)  return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export default function PowerGlobe({ en = false, compact = false }) {
  const reduced     = useReducedMotion();
  const wrapRef     = useRef(null);
  const globeEl     = useRef(null);
  const hoverCb     = useRef(null);
  const lightsRef   = useRef(false);
  const introTimers = useRef([]);
  const rotAnim     = useRef(null);
  const layerTriggerRef = useRef(null);
  const encTriggerRef   = useRef(null);

  // CRITICAL FIX for iOS black canvas: initialize with real window dimensions so
  // size.w > 0 && size.h > 0 on first render — the Globe mount gate was previously
  // deferred until ResizeObserver fired (too late on iOS Safari).
  const [size, setSize] = useState(() => ({
    w: typeof window !== "undefined" ? Math.min(window.innerWidth, 1200) : 360,
    h: 400,
  }));

  const [plants,              setPlants]              = useState(null);
  const [status,              setStatus]              = useState("idle");
  const [filters,             setFilters]             = useState(() => Object.fromEntries(FUEL_LEGEND.map((k) => [k, true])));
  const [layers,              setLayers]              = useState({ plants: true, grid: true, hubs: true });
  const [layersOpen,          setLayersOpen]          = useState(false);
  const [encOpen,             setEncOpen]             = useState(false);
  const [focus,               setFocus]               = useState("global");
  const [hover,               setHover]               = useState(null);
  const [ready,               setReady]               = useState(false);
  const [announce,            setAnnounce]            = useState("");
  const [arcsLive,            setArcsLive]            = useState(false);
  const [ringsLive,           setRingsLive]           = useState(false);
  const [pointsTransDuration, setPointsTransDuration] = useState(0);

  // Keep hoverCb ref always up-to-date so DOM event listeners in makeDc / makeCRHub
  // don't capture stale closures.
  hoverCb.current = setHover;

  const locale = en ? "en" : "es";

  // ── Pause / resume rAF when off-screen or tab hidden ──
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const pause  = () => { try { globeEl.current?.pauseAnimation?.();  } catch {} };
    const resume = () => { try { globeEl.current?.resumeAnimation?.(); } catch {} };
    const io = new IntersectionObserver(([e]) => { e.isIntersecting ? resume() : pause(); }, { threshold: 0.01 });
    io.observe(el);
    const onVis = () => { document.hidden ? pause() : resume(); };
    document.addEventListener("visibilitychange", onVis);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  // ── Size tracking (ResizeObserver, but now initial state is non-zero) ──
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    // Force a synchronous read on mount (catches cases where the container is
    // already sized before the observer fires).
    const { clientWidth: w, clientHeight: h } = el;
    if (w > 0 && h > 0) setSize({ w, h });
    return () => ro.disconnect();
  }, []);

  // ── Intro timer cleanup on unmount ──
  useEffect(() => () => { introTimers.current.forEach(clearTimeout); }, []);

  // ── WRI Web Worker fetch (desktop only, lazy) ──
  useEffect(() => {
    if (compact || reduced) return;
    const el = wrapRef.current;
    if (!el) return;
    let done   = false;
    let worker = null;

    const handleErr = (err) => {
      console.warn("PowerGlobe: WRI load failed", err);
      setStatus("error");
      setAnnounce(
        en ? "Full dataset unavailable — showing curated reference plants."
           : "Dataset completo no disponible — mostrando referencias destacadas.",
      );
    };

    // Main-thread fallback parse (if Worker unavailable)
    const parseMainThread = (text) => {
      const rows = [];
      let field = "", row = [], inQ = false;
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (inQ) {
          if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else inQ = false; }
          else field += c;
        } else if (c === '"') inQ = true;
        else if (c === ",") { row.push(field); field = ""; }
        else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
        else if (c !== "\r") field += c;
      }
      if (field.length || row.length) { row.push(field); rows.push(row); }
      const head  = rows[0].map((h) => h.trim());
      const iLat  = head.indexOf("latitude"), iLng = head.indexOf("longitude");
      const iFuel = head.indexOf("primary_fuel"), iCap = head.indexOf("capacity_mw");
      const iName = head.indexOf("name"), iCtry = head.indexOf("country_long");
      if (iLat < 0 || iLng < 0 || iFuel < 0) { handleErr(new Error("schema")); return; }
      const out = [];
      for (let r = 1; r < rows.length; r++) {
        const rw  = rows[r];
        const lat = parseFloat(rw[iLat]), lng = parseFloat(rw[iLng]);
        if (!isFinite(lat) || !isFinite(lng)) continue;
        const fuelRaw = (rw[iFuel] || "Other").trim();
        const fuel    = FUEL_HEX[fuelRaw] ? fuelRaw : "Other";
        const cap     = parseFloat(rw[iCap]) || 8;
        out.push({
          lat, lng, fuel, cap, alt: altOf(cap),
          name: rw[iName] || "", country: iCtry >= 0 ? rw[iCtry] : "",
          color: FUEL_HEX[fuel],
        });
      }
      setPlants(out);
      setStatus("ok");
      setAnnounce(
        en ? `Atlas ready: ${out.length.toLocaleString("en")} plants loaded.`
           : `Atlas listo: ${out.length.toLocaleString("es")} plantas cargadas.`,
      );
    };

    const run = () => {
      if (done) return;
      done = true;
      setStatus("loading");
      setAnnounce(
        en ? "Loading 35,000 plants from WRI…"
           : "Cargando 35.000 plantas WRI…",
      );

      try {
        worker = new Worker("/workers/wri-parse.worker.js");
      } catch {
        // Worker unavailable (edge runtime or CSP) — fall back to main thread
        fetch(WRI_CSV)
          .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
          .then(parseMainThread)
          .catch(handleErr);
        return;
      }

      fetch(WRI_CSV)
        .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
        .then((text) => worker.postMessage({ text, fuelKeys: Object.keys(FUEL_HEX) }))
        .catch(handleErr);

      worker.onmessage = (e) => {
        worker.terminate();
        if (e.data.error) { handleErr(new Error("schema")); return; }
        const out = e.data.plants.map((p) => ({
          ...p,
          color: FUEL_HEX[p.fuel] || FUEL_HEX.Other,
        }));
        setPlants(out);
        setStatus("ok");
        setAnnounce(
          en ? `Atlas ready: ${out.length.toLocaleString("en")} plants loaded.`
             : `Atlas listo: ${out.length.toLocaleString("es")} plantas cargadas.`,
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

  // ── Decorated marquee (stable — only depends on static MARQUEE) ──
  const decoratedMarquee = useMemo(
    () => MARQUEE.map((p) => ({ ...p, color: FUEL_HEX[p.fuel] || FUEL_HEX.Other, alt: altOf(p.cap) })),
    [],
  );

  // ── Derived display data ──
  const points = useMemo(() => {
    const src = plants || decoratedMarquee;
    return src.filter((p) => filters[p.fuel] !== false);
  }, [plants, decoratedMarquee, filters]);

  const arcs    = useMemo(() => (layers.grid  ? HV_ARCS    : []), [layers.grid]);
  const dcsBase = useMemo(() => (layers.hubs  ? DATACENTERS: []), [layers.hubs]);
  // Inject Cañas hub into the HTML-elements layer (it renders as a SIEPAC gold diamond)
  const htmlData = useMemo(() => (layers.hubs ? [...dcsBase, CANAS_HUB] : [CANAS_HUB]), [dcsBase, layers.hubs]);

  const ringCfg = RING.focus[focus] ?? RING.focus.global;
  const ringsData = useMemo(() => {
    if (reduced || !ringsLive) return [];
    return CR_MARQUEE.slice(0, ringCfg.count);
  }, [reduced, ringsLive, ringCfg.count]);

  const counts = useMemo(() => {
    const c = {};
    (plants || decoratedMarquee).forEach((p) => { c[p.fuel] = (c[p.fuel] || 0) + 1; });
    return c;
  }, [plants, decoratedMarquee]);

  const total         = plants ? plants.length : decoratedMarquee.length;
  const filteredCount = points.length;
  const anyOn         = FUEL_LEGEND.some((k) => filters[k] !== false);

  // ── Hover slow-rotation (desktop only) ──
  const slowRotation = useCallback(() => {
    if (!globeEl.current || reduced || compact) return;
    const ctrl = globeEl.current.controls();
    if (rotAnim.current) rotAnim.current.pause();
    const proxy = { v: ctrl.autoRotateSpeed };
    rotAnim.current = animate(proxy, {
      v: MT.rotSpeedHover, duration: MT.hoverSlowMs, ease: "outQuad",
      onUpdate: () => { ctrl.autoRotateSpeed = proxy.v; },
    });
  }, [reduced, compact]);

  const restoreRotation = useCallback(() => {
    if (!globeEl.current || reduced || compact) return;
    const ctrl = globeEl.current.controls();
    if (rotAnim.current) rotAnim.current.pause();
    const proxy = { v: ctrl.autoRotateSpeed };
    rotAnim.current = animate(proxy, {
      v: MT.rotSpeedNormal, duration: MT.hoverRestoreMs, ease: "inOutQuad",
      onUpdate: () => { ctrl.autoRotateSpeed = proxy.v; },
    });
  }, [reduced, compact]);

  // ── Globe onReady callback ──
  const onReady = useCallback(() => {
    setReady(true);
    const g = globeEl.current;
    if (!g) return;

    // Camera FOV override (must run before pointOfView to match visual spec)
    try {
      const cam = g.camera();
      cam.fov = compact ? 50 : 45;
      cam.updateProjectionMatrix();
    } catch {}

    // OrbitControls (locked spec values)
    try {
      const c = g.controls();
      c.autoRotate       = !reduced;
      c.autoRotateSpeed  = MT.rotSpeedNormal;
      c.enableZoom       = false;
      c.enablePan        = false;
      c.enableDamping    = true;
      c.dampingFactor    = 0.08;
      c.minDistance      = 200;
      c.maxDistance      = 500;
      c.minPolarAngle    = Math.PI * 0.18;
      c.maxPolarAngle    = Math.PI * 0.82;
    } catch {}

    // DPR cap
    try {
      const rawDpr = typeof window !== "undefined" ? (window.devicePixelRatio || 1) : 1;
      // Low-mem device hint (Chrome only; silent no-op on Safari)
      const memHint = typeof navigator !== "undefined" && navigator.deviceMemory < 4;
      const dprCap  = memHint ? 1.0 : (compact ? SCENE.dprCap.compact : SCENE.dprCap.full);
      g.renderer().setPixelRatio(Math.min(rawDpr, dprCap));
      // iOS Safari: allow vertical page scroll over the canvas
      g.renderer().domElement.style.touchAction = "pan-y";
    } catch {}

    // Lights
    try { installLights(g, reduced, lightsRef); } catch {}

    // iOS context recovery
    try {
      const canvas = g.renderer().domElement;
      canvas.addEventListener("webglcontextlost", (e) => {
        e.preventDefault();
        lightsRef.current = false;
      });
      canvas.addEventListener("webglcontextrestored", () => {
        try { installLights(g, reduced, lightsRef); } catch {};
      });
    } catch {}

    // Intro build-on choreography
    const initialPOV = compact
      ? { lat: 6,  lng: -80, altitude: 2.0 }
      : { lat: 18, lng: -55, altitude: 2.2 };

    if (reduced) {
      g.pointOfView(initialPOV, 0);
      setArcsLive(true);
      setRingsLive(false);
      setPointsTransDuration(0);
    } else {
      // Start zoomed out, ease in via animejs proxy
      g.pointOfView({ ...initialPOV, altitude: MT.cameraStartAlt }, 0);
      const proxy = { t: 0 };
      animate(proxy, {
        t: 1, duration: MT.introCameraMs, ease: "outCubic",
        onUpdate: () => {
          const a = MT.cameraStartAlt - (MT.cameraStartAlt - initialPOV.altitude) * proxy.t;
          try { g.pointOfView({ ...initialPOV, altitude: a }, 0); } catch {}
        },
      });
      introTimers.current.push(
        setTimeout(() => setPointsTransDuration(700), TIMING.introPointsDelayMs),
        setTimeout(() => setArcsLive(true),           TIMING.introArcsDelayMs),
        setTimeout(() => setRingsLive(true),           TIMING.introRingsDelayMs),
      );
    }
  }, [reduced, compact]);

  // ── Focus transitions ──
  useEffect(() => {
    const g = globeEl.current;
    if (!g || !ready) return;
    const initialPOV = compact
      ? { lat: 6,  lng: -80, altitude: 2.0 }
      : { lat: 18, lng: -55, altitude: 2.2 };
    const tweenMs = reduced ? 0 : MT.focusTweenMs;
    try {
      const c = g.controls();
      if (focus === "cr") {
        c.autoRotate = false;
        g.pointOfView({ lat: 10.0, lng: -86.5, altitude: 1.8 }, tweenMs);
        const siepacCount = HV_ARCS.filter((a) => a.kind === "siepac").length;
        setAnnounce(
          en ? `Focus on Costa Rica: ${CR_MARQUEE.length} plants, ${siepacCount} SIEPAC interconnections.`
             : `Enfoque en Costa Rica: ${CR_MARQUEE.length} plantas, ${siepacCount} interconexiones SIEPAC.`,
        );
      } else {
        g.pointOfView(initialPOV, tweenMs);
        const t = setTimeout(() => {
          try { g.controls().autoRotate = !reduced; } catch {}
        }, reduced ? 0 : MT.rotResumeDelayMs);
        setAnnounce(en ? "Global view." : "Vista global.");
        return () => clearTimeout(t);
      }
    } catch {}
  }, [focus, ready, reduced, compact, en]);

  // ── Keyboard / pointer dismissal of popovers ──
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (layersOpen) {
          setLayersOpen(false);
          layerTriggerRef.current?.focus();
        } else if (encOpen) {
          setEncOpen(false);
          encTriggerRef.current?.focus();
        } else if (hover) {
          setHover(null);
        }
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

  // ── Focus the first layer button when popover opens ──
  const layersPopRef = useRef(null);
  useEffect(() => {
    if (layersOpen && layersPopRef.current) {
      const first = layersPopRef.current.querySelector("button");
      if (first) first.focus();
    }
  }, [layersOpen]);

  // ── Arc hover / click callbacks ──
  const onArcHover = useCallback((a) => {
    if (!a) { setHover(null); return; }
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
  }, [en, locale]);

  const onArcClick = useCallback((a) => {
    if (!a) { setHover(null); return; }
    const to   = txt(a.to, en);
    const label= KIND_LABEL[a.kind]?.[locale] ?? a.kind;
    const qual = a.kind === "planned"
      ? (en ? " · illustrative" : " · ilustrativo")
      : (en ? " · coords approx." : " · coords aprox.");
    setHover({
      kind: "arc",
      name: `${a.from} → ${to}`,
      sub:  `${(a.mw || 0).toLocaleString(locale)} MW · ${label}${qual}`,
    });
  }, [en, locale]);

  // ── Arc dash animation callback (stable) ──
  const arcDashAnim = useCallback((a) => ARC_DASH_ANIM_FN(a, reduced), [reduced]);

  // ── HTML element factories ──
  // makeCRHub declared first so makeDc can reference it safely
  /* Phase 2 — dual-core diamond (gold outer + cyan inner) with a permanent
     mono caption beneath. Only marker on the globe that carries its identity
     visibly without focus=cr. */
  const makeCRHub = useCallback((d) => {
    const g   = CR_HUB_GLYPH;
    const nm  = txt(d.name,   en);
    const sub = txt(d.sub,    en);
    const det = txt(d.detail, en);
    const wrap = document.createElement("div");
    wrap.className = "pg-dc-btn pg-cr-hub";
    wrap.setAttribute("aria-hidden", "true");
    wrap.setAttribute("tabindex", "-1");
    wrap.title = nm;
    wrap.style.cssText = "width:64px;height:64px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;background:transparent;border:none;position:relative;";

    const outer = document.createElement("div");
    outer.style.cssText = `width:${g.outerSize}px;height:${g.outerSize}px;transform:${g.rotation};background:${g.outerBg};border:${g.border};box-shadow:${g.boxShadow};transition:transform 120ms ease,box-shadow 120ms ease;display:flex;align-items:center;justify-content:center;`;
    const inner = document.createElement("div");
    inner.style.cssText = `width:${g.innerSize}px;height:${g.innerSize}px;background:${g.innerBg};border-radius:50%;transform:rotate(-45deg);box-shadow:0 0 4px ${g.innerBg};`;
    outer.appendChild(inner);
    wrap.appendChild(outer);

    const cap = document.createElement("div");
    cap.style.cssText = `font-family:${MONO};font-size:9.5px;color:#fff;letter-spacing:0.8px;margin-top:6px;text-shadow:0 1px 4px rgba(0,0,0,0.95);white-space:nowrap;background:rgba(6,21,46,0.55);padding:2px 6px;border-radius:4px;border:1px solid ${EN_ACCENT.gold}66;text-align:center;line-height:1.2;`;
    const capMain = en ? g.caption.en : g.caption.es;
    const capSub  = en ? g.captionSub.en : g.captionSub.es;
    cap.innerHTML = `<span>${capMain}</span><br><span style="color:rgba(255,255,255,0.7);font-size:8.5px;letter-spacing:0.6px;">${capSub}</span>`;
    wrap.appendChild(cap);

    const show = () => hoverCb.current && hoverCb.current({ kind: "dc", name: nm, sub, detail: det });
    const hide = () => hoverCb.current && hoverCb.current(null);
    const over = () => { outer.style.boxShadow = g.boxShadowHover; outer.style.transform = `${g.rotation} scale(1.20)`; show(); };
    const out  = () => { outer.style.boxShadow = g.boxShadow; outer.style.transform = g.rotation; hide(); };
    wrap.addEventListener("pointerenter", over);
    wrap.addEventListener("pointerleave", out);
    wrap.addEventListener("focus", show);
    wrap.addEventListener("blur",  hide);
    wrap.addEventListener("click", () => {
      document.getElementById("energia-act-5")?.scrollIntoView({
        behavior: reduced ? "instant" : "smooth",
        block: "start",
      });
    });
    return wrap;
  }, [en, reduced]);

  /* Phase 2 — continuous MW-scaled DC glyph: radius √(demandMw)/4 clamped 8–24px,
     soft halo opacity scaled with MW, AI-scale gold ring at >=700 MW, top-5
     hubs get an always-on MW badge (NoVA · 4.5 GW · est.). Addresses
     Audit #3 "data exists, encoding is binary". */
  const makeDc = useCallback((d) => {
    if (d.kind === "siepac-hub") return makeCRHub(d);
    const mw      = d.demandMw || 100;
    const size    = DC_SCALE.size(mw);
    const halo    = DC_SCALE.halo(mw);
    const haloA   = DC_SCALE.haloA(mw);
    const aiScale = DC_SCALE.aiScale(mw);
    const nm      = txt(d.name, en);
    const ct      = txt(d.country, en);
    const enName  = typeof d.name === "object" ? (d.name.en || d.name.es) : d.name;
    const isTop5  = DC_SCALE.topNames.has(enName);
    const wrapW   = Math.max(44, halo + 8);

    const wrap = document.createElement("div");
    wrap.className = "pg-dc-btn";
    wrap.setAttribute("aria-hidden", "true");
    wrap.setAttribute("tabindex", "-1");
    wrap.title = `${nm} — ${ct} · ~${mw.toLocaleString(en ? "en" : "es")} MW (est.)`;
    wrap.style.cssText = `width:${wrapW}px;height:${wrapW}px;display:flex;align-items:center;justify-content:center;cursor:pointer;background:transparent;border:none;position:relative;`;

    const haloEl = document.createElement("div");
    haloEl.style.cssText = `position:absolute;width:${halo}px;height:${halo}px;border-radius:50%;background:radial-gradient(circle, rgba(34,211,238,${haloA.toFixed(2)}) 0%, rgba(34,211,238,0) 70%);pointer-events:none;`;
    wrap.appendChild(haloEl);

    if (aiScale) {
      const ring = document.createElement("div");
      ring.style.cssText = `position:absolute;width:${size + 8}px;height:${size + 8}px;border-radius:50%;border:1.5px solid ${EN_ACCENT.gold};box-shadow:0 0 10px ${EN_ACCENT.gold}88;pointer-events:none;`;
      wrap.appendChild(ring);
    }

    const dot = document.createElement("div");
    dot.style.cssText = `width:${size}px;height:${size}px;transform:rotate(45deg);background:rgba(255,255,255,0.95);border:1px solid ${EN_ACCENT.glow};box-shadow:0 0 ${Math.round(halo / 2)}px ${EN_ACCENT.glow};transition:transform 120ms ease,box-shadow 120ms ease;`;
    wrap.appendChild(dot);

    if (isTop5 && !compact) {
      const tag = document.createElement("div");
      tag.style.cssText = `position:absolute;left:${(halo / 2) + 8}px;top:50%;transform:translateY(-50%);font-family:${MONO};font-size:9.5px;letter-spacing:0.3px;color:rgba(255,255,255,0.95);background:rgba(10,31,63,0.78);padding:2px 6px;border-radius:4px;border:1px solid ${EN_ACCENT.glow}66;white-space:nowrap;pointer-events:none;text-shadow:0 1px 4px rgba(0,0,0,0.85);`;
      const mwTxt = mw >= 1000 ? `${(mw / 1000).toFixed(1)} GW` : `${mw} MW`;
      const displayName = typeof d.name === "object" ? (en ? d.name.en : d.name.es) : d.name;
      const shortName = DC_SCALE.topNameShort[displayName] || displayName;
      tag.textContent = `${shortName} · ${mwTxt} · est.`;
      wrap.appendChild(tag);
    }

    const show = () => hoverCb.current && hoverCb.current({
      kind: "dc",
      name: nm,
      sub: ct,
      detail: aiScale
        ? (en ? "AI-scale buyer" : "Hub a escala IA")
        : (en ? "Regional hub" : "Hub regional"),
      mw,
    });
    const hide = () => hoverCb.current && hoverCb.current(null);
    const over = () => {
      dot.style.transform = "rotate(45deg) scale(1.25)";
      dot.style.boxShadow = `0 0 ${halo}px ${EN_ACCENT.glow}`;
      show();
    };
    const out = () => {
      dot.style.transform = "rotate(45deg)";
      dot.style.boxShadow = `0 0 ${Math.round(halo / 2)}px ${EN_ACCENT.glow}`;
      hide();
    };
    wrap.addEventListener("pointerenter", over);
    wrap.addEventListener("pointerleave", out);
    wrap.addEventListener("focus", show);
    wrap.addEventListener("blur",  hide);
    return wrap;
  }, [en, compact, makeCRHub]);

  // ── Toggle helpers ──
  const toggleFuel  = useCallback((k) => setFilters((f) => ({ ...f, [k]: !f[k] })), []);
  const toggleLayer = useCallback((k) => setLayers((l) => ({ ...l, [k]: !l[k] })), []);
  const resetFilters= useCallback(() => setFilters(Object.fromEntries(FUEL_LEGEND.map((k) => [k, true]))), []);
  const openLayers  = useCallback(() => { setLayersOpen((v) => !v); setEncOpen(false); }, []);
  const openEnc     = useCallback(() => { setEncOpen((v) => !v); setLayersOpen(false); }, []);

  const aspect      = compact ? "4 / 5" : "16 / 9";
  const titleId     = "pg-title";
  const descId      = "pg-desc";
  const errorBanner = status === "error" && !compact;

  // ── CR info panel data ──
  const siepacArcs = HV_ARCS.filter((a) => a.kind === "siepac");

  // ── Live-region content (empty state takes precedence) ──
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
      onPointerEnter={slowRotation}
      onPointerLeave={restoreRotation}
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
      {/* ── CSS (scoped to figure; no postcss dependency) ── */}
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
          position: absolute; left: 10px; top: -56px; z-index: 10;
          background: #0A1F3F; color: #fff; padding: 12px 16px; border-radius: 8px;
          font-family: ${MONO}; font-size: 12px; min-height: 44px;
          border: 1px solid #22d3ee; transition: top 150ms ease; text-decoration: none;
          display: inline-flex; align-items: center;
        }
        .pg-skip:focus { top: 10px; }
        .pg-skip:focus-visible { outline: 2px solid #22d3ee; outline-offset: 2px; }
        .pg-dc-btn:focus-visible { outline: 2px solid #22d3ee; outline-offset: 3px; }
        .pg-sr {
          position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px;
          overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
        }
        @media (max-width: 639px) {
          .pg-btn-compact-chip {
            min-height: 36px !important; padding: 7px 10px !important; font-size: 10px !important;
          }
        }
      `}</style>

      {/* ── Skip link (first focusable child) ── */}
      <a className="pg-skip" href="#crGridMapAnchor">
        {en ? "Skip to Costa Rica map" : "Saltar al mapa de Costa Rica"}
      </a>

      {/* ── SR: DC hub list (semantic alternative to aria-hidden canvas markers) ── */}
      <ul
        id="pg-data"
        className="pg-sr"
        aria-label={en ? "AI data-centre hubs shown on the globe" : "Hubs IA / centros de datos en el globo"}
      >
        {dcsBase.map((d, i) => (
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
          ? `Global generation atlas: ${total.toLocaleString("en")} power plants sized by installed capacity, ${HV_ARCS.length} major high-voltage interconnections including the SIEPAC tie-in for Costa Rica (ENTSO-E, IEA, SIEPAC/EPR — illustrative), ${DATACENTERS.length} AI / data-centre hubs (Synergy Research, Dell'Oro — estimate). Globe engine: react-globe.gl (MIT). Basemap: NASA night lights (public domain). The 3D globe is decorative; the keyboard-accessible Costa Rica grid map is in Act 4 below.`
          : `Atlas global de generación: ${total.toLocaleString("es")} plantas de generación dimensionadas por capacidad instalada, ${HV_ARCS.length} interconexiones de alta tensión incluida la conexión SIEPAC para Costa Rica (ENTSO-E, IEA, SIEPAC/EPR — ilustrativo), ${DATACENTERS.length} hubs IA / centros de datos (Synergy Research, Dell'Oro — estimado). Motor de globo: react-globe.gl (MIT). Base: NASA night lights (dominio público). El globo 3D es decorativo; el mapa accesible de la red de Costa Rica está en el Acto 4 abajo.`}
      </figcaption>

      {/* ── Live region (SR only) ── */}
      <div className="pg-sr" role="status" aria-live="polite" aria-atomic="true">
        {liveMsg}
      </div>

      {/* ── Phase 2 · CSS-only bloom + warm-cool fringe overlay ──
           The WebGL renderer is owned by react-globe.gl (no UnrealBloomPass
           without conflicting with its rAF loop). Instead, a radial-gradient
           ring fakes a soft inner bloom around the planet rim, and a warm
           lower-third tint breaks the navy-on-navy block the audit called
           out. Both layers are pointer-events:none so they don't intercept
           drag/zoom. */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        background: `radial-gradient(circle at 50% 50%, transparent 36%, rgba(34,211,238,0.04) 52%, transparent 62%), linear-gradient(180deg, transparent 60%, rgba(242,177,53,0.04) 100%)`,
        mixBlendMode: "screen",
      }} />

      {/* ── Globe canvas (aria-hidden — all SR content is above) ── */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
        {size.w > 0 && size.h > 0 && (
          <Globe
            ref={globeEl}
            width={size.w}
            height={size.h}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl={SCENE.globeImageUrl}
            showAtmosphere
            atmosphereColor={SCENE.atmosphereColor}
            atmosphereAltitude={SCENE.atmosphereAltitude}
            onGlobeReady={onReady}
            rendererConfig={compact ? RENDERER_MOBILE : RENDERER_DESKTOP}
            // ── Points ──
            pointsData={layers.plants ? points : []}
            pointLat="lat"
            pointLng="lng"
            pointColor="color"
            pointAltitude="alt"
            pointRadius={compact ? SCENE.pointRadius.compact : SCENE.pointRadius.full}
            pointResolution={SCENE.pointResolution}
            pointsMerge={SCENE.pointsMerge}
            pointsTransitionDuration={pointsTransDuration}
            // ── Arcs ──
            arcsData={arcsLive ? arcs : []}
            arcStartLat="startLat"
            arcStartLng="startLng"
            arcEndLat="endLat"
            arcEndLng="endLng"
            arcColor={ARC_COLOR_FN}
            arcStroke={ARC_STROKE_FN}
            arcAltitude={ARC_ALT_FN}
            arcDashLength={ARC_DASH_LEN_FN}
            arcDashGap={ARC_DASH_GAP_FN}
            arcDashAnimateTime={arcDashAnim}
            arcsTransitionDuration={0}
            onArcHover={onArcHover}
            onArcClick={onArcClick}
            // ── HTML markers ──
            htmlElementsData={htmlData}
            htmlLat="lat"
            htmlLng="lng"
            htmlAltitude={DC_ALTITUDE}
            htmlElement={makeDc}
            // ── Rings ──
            ringsData={ringsData}
            ringLat="lat"
            ringLng="lng"
            ringColor={RING.colorFn()}
            ringMaxRadius={ringCfg.maxRadius}
            ringPropagationSpeed={ringCfg.propagationSpeed}
            ringRepeatPeriod={ringCfg.repeatPeriod}
            // ── Globe click: dismiss tooltip on tap ──
            onGlobeClick={() => setHover(null)}
          />
        )}
      </div>

      {/* ── Loading overlay (while WebGL initializes) ──
           aria-hidden: the same message is already announced via the live region. */}
      {!ready && (
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 2, color: `${EN_ACCENT.glow}cc` }}>
            {compact
              ? (en ? "LOADING CURATED PLANTS…" : "CARGANDO PLANTAS DESTACADAS…")
              : (en ? "BUILDING THE ATLAS…"    : "CONSTRUYENDO EL ATLAS…")}
          </span>
        </div>
      )}

      {/* ═══════════════════════════
          ZONE A — Top-left: title, counter, error, hover tooltip
          ═══════════════════════════ */}
      <div style={{
        position: "absolute", top: 12, left: 14, zIndex: 3,
        maxWidth: "min(64%, 360px)", pointerEvents: "none",
      }}>
        <div
          id={titleId}
          style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 2, color: EN_ACCENT.glow }}
        >
          {en ? "GLOBAL GENERATION ATLAS" : "ATLAS GLOBAL DE GENERACIÓN"}
        </div>

        <div style={{ marginTop: 4, fontFamily: MONO, fontSize: 11, color: "#fff" }}>
          {compact && status === "idle" && !plants ? (
            <>
              <span style={{ color: "rgba(255,255,255,0.75)" }}>
                {en ? "Curated highlights" : "Destacados seleccionados"}
              </span>
              <span style={{ color: "rgba(255,255,255,0.55)" }}>
                {" · "}{decoratedMarquee.length} {en ? "plants" : "plantas"}
                {" · "}{arcs.length} {en ? "interconnections" : "interconexiones"}
              </span>
            </>
          ) : (
            <>
              {filteredCount.toLocaleString(locale)}
              {" "}{en ? "of" : "de"}{" "}
              {total.toLocaleString(locale)}
              {" "}{en ? "plants" : "plantas"}
              <span style={{ color: "rgba(255,255,255,0.55)" }}>
                {" · "}{arcs.length} {en ? "interconnections" : "interconexiones"}
                {" · "}{dcsBase.length} {en ? "AI hubs" : "hubs IA"}
              </span>
              {status === "loading" && (
                <span style={{ color: "rgba(255,255,255,0.55)" }}>
                  {en ? " · loading WRI…" : " · cargando WRI…"}
                </span>
              )}
            </>
          )}
        </div>

        {/* Error banner (desktop only; role=alert for assertive ARIA) */}
        {errorBanner && (
          <div
            role="alert"
            style={{
              marginTop: 6, padding: "6px 9px", borderRadius: 9,
              background: `${EN_ACCENT.navy}f0`, border: `1px solid ${EN_ACCENT.risk}88`,
              fontFamily: MONO, fontSize: 10.5, color: "#fff", maxWidth: 340,
            }}
          >
            {en
              ? "Full dataset unavailable — showing curated reference plants. (WRI CSV could not be fetched.)"
              : "Dataset completo no disponible — mostrando referencias destacadas. (No se pudo obtener el CSV de la WRI.)"}
          </div>
        )}

        {/* Desktop hover tooltip (top-left, pointer-events none) */}
        {!compact && (
          <div
            style={{
              marginTop: 6,
              padding: hover ? "7px 10px" : 0,
              borderRadius: 9,
              background: `${EN_ACCENT.navy}e8`,
              border: hover ? `1px solid ${EN_ACCENT.glow}99` : "1px solid transparent",
              display: "inline-block",
              maxWidth: 340,
              opacity: hover ? 1 : 0,
              transition: "opacity 150ms ease",
              pointerEvents: "none",
              minHeight: hover ? "auto" : 0,
            }}
          >
            {hover && (
              <>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "#fff" }}>{hover.name}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}>{hover.sub}</div>
                {hover.detail && (
                  <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>
                    {hover.detail}
                    {hover.mw ? ` · ~${hover.mw.toLocaleString(locale)} MW (est.)` : ""}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* ═══════════════════════════
          ZONE B — Top-right: focus pills + layer controls
          ═══════════════════════════ */}
      <div style={{
        position: "absolute", top: 12, right: 14, zIndex: 3,
        display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end",
      }}>
        {/* Focus pills */}
        <div style={{ display: "flex", gap: 6 }}>
          {[ ["global", en ? "World" : "Mundo"], ["cr", "Costa Rica"] ].map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => setFocus(k)}
              className={`pg-btn${focus === k ? " pg-btn-on" : ""}`}
              aria-pressed={focus === k}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Layer controls */}
        {compact ? (
          <div style={{ position: "relative" }}>
            <button
              ref={layerTriggerRef}
              type="button"
              onClick={openLayers}
              className="pg-btn"
              aria-expanded={layersOpen}
              aria-controls="pg-layers"
            >
              {en ? "Layers ▾" : "Capas ▾"}
            </button>
            {layersOpen && (
              <div
                id="pg-layers"
                ref={layersPopRef}
                style={{
                  position: "absolute", bottom: "calc(100% + 6px)", right: 0,
                  display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-end",
                  background: `${EN_ACCENT.navy}d0`, padding: 6, borderRadius: 10,
                  border: `1px solid ${EN_ACCENT.turquoise}33`,
                }}
              >
                {[ ["plants", en ? "Plants" : "Plantas"], ["grid", en ? "Grid" : "Red"], ["hubs", en ? "AI hubs" : "Hubs IA"] ].map(([k, label]) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => toggleLayer(k)}
                    aria-pressed={layers[k]}
                    className={`pg-btn${layers[k] ? " pg-btn-on" : ""}`}
                    data-off={layers[k] ? "0" : "1"}
                  >
                    <span aria-hidden="true">{layers[k] ? "● " : "○ "}</span>
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-end" }}>
            {[ ["plants", en ? "Plants" : "Plantas"], ["grid", en ? "Grid" : "Red"], ["hubs", en ? "AI hubs" : "Hubs IA"] ].map(([k, label]) => (
              <button
                key={k}
                type="button"
                onClick={() => toggleLayer(k)}
                aria-pressed={layers[k]}
                className={`pg-btn${layers[k] ? " pg-btn-on" : ""}`}
                data-off={layers[k] ? "0" : "1"}
              >
                <span aria-hidden="true">{layers[k] ? "● " : "○ "}</span>
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ═══════════════════════════
          Compact tooltip (bottom, above chip rail)
          ═══════════════════════════ */}
      {compact && hover && (
        <div style={{
          position: "absolute", bottom: 56, left: 14, right: 14, zIndex: 4,
          padding: "7px 10px", borderRadius: 9,
          background: `${EN_ACCENT.navy}e8`,
          border: `1px solid ${EN_ACCENT.glow}99`,
          pointerEvents: "auto",
        }}>
          <button
            type="button"
            onClick={() => setHover(null)}
            aria-label={en ? "Close tooltip" : "Cerrar"}
            style={{
              position: "absolute", top: 4, right: 6, background: "none", border: "none",
              color: "rgba(255,255,255,0.7)", cursor: "pointer", fontSize: 14, lineHeight: 1,
              padding: "2px 4px", minHeight: 24,
            }}
          >
            ×
          </button>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: "#fff", paddingRight: 24 }}>{hover.name}</div>
          <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>{hover.sub}</div>
          {hover.detail && (
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>
              {hover.detail}
              {hover.mw ? ` · ~${hover.mw.toLocaleString(locale)} MW (est.)` : ""}
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════
          CR Info Panel (focus === "cr")
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
              bottom: compact ? 130 : 108,
              left: 14,
              width: "min(340px, calc(100% - 28px))",
              zIndex: 3,
              background: `${EN_ACCENT.navyDeep}e8`,
              border: `1px solid ${EN_ACCENT.gold}55`,
              borderRadius: 12,
              padding: "10px 12px",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              pointerEvents: "auto",
            }}
          >
            <div style={{
              fontFamily: MONO, fontSize: 10, letterSpacing: 2,
              color: EN_ACCENT.gold, marginBottom: 8,
            }}>
              {en ? "COSTA RICA · SIEPAC ANCHOR" : "COSTA RICA · NODO SIEPAC"}
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 8px", display: "flex", flexDirection: "column", gap: 4 }}>
              {siepacArcs.map((a, i) => (
                <li key={a.id ?? i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ display: "inline-block", width: 16, height: 2, background: EN_ACCENT.gold, flexShrink: 0 }} aria-hidden="true" />
                  <span style={{ fontFamily: MONO, fontSize: 10.5, color: "rgba(255,255,255,0.92)", textTransform: "uppercase", letterSpacing: 0.3 }}>
                    {txt(a.label, en)}
                  </span>
                </li>
              ))}
            </ul>
            {/* Expediente 23.414 chip */}
            <div style={{
              display: "inline-block",
              background: `${EN_ACCENT.gold}22`,
              border: `1px solid ${EN_ACCENT.gold}77`,
              borderRadius: 6, padding: "3px 8px", marginBottom: 6,
              fontFamily: MONO, fontSize: 10, color: EN_ACCENT.gold, letterSpacing: 1,
            }}>
              EXP. 23.414
            </div>
            <div style={{ fontFamily: MONO, fontSize: 10.5, color: "rgba(255,255,255,0.85)", marginBottom: 8 }}>
              {en
                ? "Electricity reform (27-24 first debate, withdrawn May 27 2026 — 8 votes short of 38)"
                : "Reforma eléctrica (27-24 en primer debate, desconvocada 27 may 2026 — faltan 8 votos de 38)"}
            </div>
            {/* CTA link */}
            <a
              href="#energia-act-5"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("energia-act-5")?.scrollIntoView({
                  behavior: reduced ? "instant" : "smooth",
                  block: "start",
                });
              }}
              style={{
                display: "inline-block",
                fontFamily: MONO, fontSize: 10.5, color: EN_ACCENT.glow,
                textDecoration: "underline", marginBottom: 6,
              }}
            >
              {en ? "Full 23.414 analysis ↓" : "Análisis completo 23.414 ↓"}
            </a>
            {/* Sources */}
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
          ZONE D — Source attribution
          ═══════════════════════════ */}
      <div style={{
        position: "absolute",
        bottom: compact ? 100 : 96,
        left: 14, right: 14, zIndex: 3,
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
        <a href={SRC.cc_by_4.url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>
          CC-BY-4.0
        </a>
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
        <a href={SRC.epr.url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>SIEPAC/EPR</a>
        {")"}
      </div>

      {/* ═══════════════════════════
          ZONE E — Encoding legend
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
          style={{ position: "absolute", right: 14, bottom: 70, zIndex: 4, fontSize: 13, width: 44, height: 44 }}
        >
          i
        </button>
      )}
      <div
        id="pg-enc"
        aria-hidden={compact && !encOpen ? true : undefined}
        style={{
          position:        "absolute",
          bottom:          compact ? 122 : 56,
          left:            14, right: 14, zIndex: 3,
          display:         (compact && !encOpen) ? "none" : "flex",
          flexWrap:        "wrap",
          gap:             14,
          justifyContent:  "center",
          fontFamily:      MONO,
          fontSize:        10.5,
          color:           "rgba(255,255,255,0.92)",
          pointerEvents:   "none",
          background:      compact ? `${EN_ACCENT.navy}d8` : "transparent",
          padding:         compact ? "8px 10px" : 0,
          borderRadius:    compact ? 10 : 0,
        }}
      >
        {/* Altitude legend */}
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <span style={{ display: "inline-flex", alignItems: "flex-end", gap: 2, height: 14 }}>
            <span style={{ width: 3, height: Math.round(altOf(500)   / 0.14 * 14), background: EN_ACCENT.glow }} />
            <span style={{ width: 3, height: Math.round(altOf(5000)  / 0.14 * 14), background: EN_ACCENT.glow }} />
            <span style={{ width: 3, height: Math.round(altOf(20000) / 0.14 * 14), background: EN_ACCENT.glow }} />
          </span>
          {en ? "Altitude ≈ √MW (500 · 5k · ≥15k MW)" : "Altura ≈ √MW (500 · 5k · ≥15k MW)"}
        </span>
        {/* Arc kind swatches */}
        {ARC_LEGEND_ORDER.map((kind) => {
          const k = ARC_KIND[kind];
          return (
            <span key={kind} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              {k.legendSwatch.style === "dashed" ? (
                <span style={{ width: k.legendSwatch.width, height: k.legendSwatch.height, background: "transparent", borderTop: `1.5px dashed ${k.legendSwatch.color}` }} />
              ) : (
                <span style={{ width: k.legendSwatch.width, height: k.legendSwatch.height, background: k.legendSwatch.color, borderRadius: 1 }} />
              )}
              {k.label[locale]}
            </span>
          );
        })}
        {/* DC tier swatches */}
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: DC_GLYPH[1].size, height: DC_GLYPH[1].size, transform: "rotate(45deg)", background: DC_GLYPH[1].background, border: DC_GLYPH[1].border, boxShadow: DC_GLYPH[1].boxShadow }} />
          {DC_GLYPH[1].label[locale]}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: DC_GLYPH[2].size, height: DC_GLYPH[2].size, transform: "rotate(45deg)", background: DC_GLYPH[2].background, border: DC_GLYPH[2].border }} />
          {DC_GLYPH[2].label[locale]}
        </span>
      </div>

      {/* ═══════════════════════════
          Empty-state overlay (when all fuel chips off)
          ═══════════════════════════ */}
      {!anyOn && (
        <div style={{
          position: "absolute", left: "50%", top: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: 4, textAlign: "center",
          padding: "16px 22px", borderRadius: 12,
          background: `${EN_ACCENT.navy}e0`,
          border: `1px solid ${EN_ACCENT.glow}77`,
          backdropFilter: "blur(6px)",
          pointerEvents: "none",
        }}>
          <div style={{ fontFamily: MONO, fontSize: 13, color: "#fff", marginBottom: 10 }}>
            {en ? "Which source powers the world?" : "¿Qué fuente mueve al mundo?"}
          </div>
          <button
            type="button"
            onClick={resetFilters}
            className="pg-btn pg-btn-on"
            aria-label={en ? `Show all ${total.toLocaleString("en")} plants` : `Mostrar todas las ${total.toLocaleString("es")} plantas`}
            style={{ pointerEvents: "auto" }}
          >
            {en ? "Show all" : "Mostrar todas"}
          </button>
        </div>
      )}

      {/* ═══════════════════════════
          ZONE F — Fuel chip rail (bottom)
          ═══════════════════════════ */}
      <div style={{
        position:       "absolute",
        left:           14,
        bottom:         "max(12px, env(safe-area-inset-bottom))",
        right:          14,
        zIndex:         3,
        display:        "flex",
        flexWrap:       "wrap",
        gap:            6,
        alignItems:     "center",
        justifyContent: "center",
      }}>
        {FUEL_LEGEND.map((k) => {
          const on = filters[k] !== false;
          return (
            <button
              key={k}
              type="button"
              onClick={() => toggleFuel(k)}
              aria-pressed={on}
              // Spec: active border alpha cc (80%) for WCAG 1.4.11 compliance
              // (Hydro/Gas/Oil at 60% failed contrast threshold)
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
                  {fmtCount(counts[k])}
                </span>
              ) : null}
            </button>
          );
        })}
        <button
          type="button"
          onClick={resetFilters}
          className="pg-btn"
          aria-label={en ? "Reset filters" : "Restablecer filtros"}
        >
          <span aria-hidden="true">↺</span>
          {" "}{en ? "Reset" : "Reiniciar"}
        </button>
      </div>
    </figure>
  );
}
