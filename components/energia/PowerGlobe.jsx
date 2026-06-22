"use client";
import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { animate } from "animejs";
import * as THREE from "three";
import { PLANTS_GEO } from "./crGeo";
import { EN_ACCENT } from "../energiaData";

/* ═══════════════════════════════════════════════════════════════
   ENERGÍA — PowerGlobe
   A cinematic, interactive 3D Earth of the world's power generation,
   in Colibrii's brand (inspired by the opengridworks genre, NOT a
   clone). Night-lights Earth + turquoise atmosphere + real bloom;
   auto-rotate + drag-to-rotate (mobile-safe, horizontal-gesture
   gated); a "Focus Costa Rica" view; glowing generation points
   coloured by technology.

   DATA (honest): on desktop, lazily fetches the WRI Global Power
   Plant Database (CC-BY-4.0) via the already-allowlisted jsDelivr
   CDN for genuine global density; a curated set of real landmark
   plants + Costa Rica's grid is the guaranteed fallback so the globe
   is never empty (and is what mobile shows, to avoid a 10 MB parse).

   A11Y (per UI/UX Pro Max chart guidance — 3D spatial data is grade
   D and must NOT be the sole representation): the canvas is
   decorative/aria-hidden; the semantic + interactive layer is the
   HTML panel (counts, technology filters, hovered-plant readout),
   and the keyboard-accessible SVG CRGridMap remains the accessible
   counterpart elsewhere in the section.
   ═══════════════════════════════════════════════════════════════ */

const R = 1.6;                              // globe radius
/* world-atlas land outlines — same pinned, CSP-allowed CDN that the
   production WorldMapMini already fetches from (reliable, ~100 KB). */
const LAND_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json";
const WRI_CSV = "https://cdn.jsdelivr.net/gh/wri/global-power-plant-database@master/output_database/global_power_plant_database.csv";

/* Technology palette — categorical, distinguishable; renewables glow,
   fossils recede (intentional energy-transition editorial choice). */
const FUEL = {
  Hydro: EN_ACCENT.glow,        // cyan
  Solar: EN_ACCENT.solar,       // orange
  Wind: EN_ACCENT.green,        // emerald
  Geothermal: EN_ACCENT.gold,   // gold
  Nuclear: EN_ACCENT.violet,    // violet
  Gas: "#f59e0b",
  Oil: "#fb7185",
  Coal: "#9ca3af",              // grey — fossils recede under bloom
  Biomass: "#84cc16",
  Waste: "#a3e635",
  Storage: "#38bdf8",
  Cogeneration: "#f59e0b",
  Petcoke: "#9ca3af",
  "Wave and Tidal": "#22d3ee",
  Other: "#94a3b8",
};
const FUEL_KEYS = Object.keys(FUEL);
const FUEL_INDEX = Object.fromEntries(FUEL_KEYS.map((k, i) => [k, i]));
/* Legend / filter order — the technologies that carry the story. */
const LEGEND = ["Hydro", "Solar", "Wind", "Geothermal", "Nuclear", "Gas", "Coal", "Oil"];
const FUEL_ES = {
  Hydro: "Hidro", Solar: "Solar", Wind: "Eólica", Geothermal: "Geotérmica",
  Nuclear: "Nuclear", Gas: "Gas", Coal: "Carbón", Oil: "Petróleo",
  Biomass: "Biomasa", Waste: "Residuos", Storage: "Almac.", Other: "Otra",
};

const MONO = "'IBM Plex Mono',monospace";

/* lat/lng → point on the sphere (standard equirectangular convention;
   marker positions are illustrative/approximate). */
const LNG_OFFSET = 0;
function llToVec3(lat, lng, r) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180 + LNG_OFFSET) * Math.PI) / 180;
  return [-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta)];
}

/* Curated, real landmark facilities (illustrative locations) + Costa Rica's
   grid. Guaranteed baseline so the globe is never empty; mobile uses only
   this set. name + technology + country only (no capacity claims). */
const CR = PLANTS_GEO.filter((p) => p.kind !== "load").map((p) => ({
  lat: p.lat, lng: p.lng, fuel: ({ hydro: "Hydro", geo: "Geothermal", wind: "Wind", solar: "Solar", thermal: "Oil" }[p.kind] || "Other"),
  name: p.name, country: "Costa Rica", cr: true,
}));
const LANDMARKS = [
  { lat: 30.823, lng: 111.003, fuel: "Hydro", name: "Three Gorges", country: "China" },
  { lat: -25.408, lng: -54.589, fuel: "Hydro", name: "Itaipú", country: "Brasil/Paraguay" },
  { lat: 36.016, lng: -114.737, fuel: "Hydro", name: "Hoover Dam", country: "EE. UU." },
  { lat: 47.957, lng: -118.978, fuel: "Hydro", name: "Grand Coulee", country: "EE. UU." },
  { lat: 23.97, lng: 32.88, fuel: "Hydro", name: "Aswan High Dam", country: "Egipto" },
  { lat: 40.153, lng: -76.725, fuel: "Nuclear", name: "Three Mile Island / Crane", country: "EE. UU." },
  { lat: 33.143, lng: -81.76, fuel: "Nuclear", name: "Vogtle", country: "EE. UU." },
  { lat: 37.428, lng: 138.596, fuel: "Nuclear", name: "Kashiwazaki-Kariwa", country: "Japón" },
  { lat: 44.325, lng: -81.599, fuel: "Nuclear", name: "Bruce", country: "Canadá" },
  { lat: 38.79, lng: -122.75, fuel: "Geothermal", name: "The Geysers", country: "EE. UU." },
  { lat: 64.038, lng: -21.4, fuel: "Geothermal", name: "Hellisheiði", country: "Islandia" },
  { lat: 53.885, lng: 1.79, fuel: "Wind", name: "Hornsea", country: "Reino Unido" },
  { lat: 39.7, lng: 98.5, fuel: "Wind", name: "Gansu", country: "China" },
  { lat: 27.54, lng: 71.91, fuel: "Solar", name: "Bhadla", country: "India" },
  { lat: 30.99, lng: -6.86, fuel: "Solar", name: "Noor Ouarzazate", country: "Marruecos" },
  { lat: 37.56, lng: 105.05, fuel: "Solar", name: "Tengger Desert", country: "China" },
  { lat: 53.736, lng: -0.998, fuel: "Biomass", name: "Drax", country: "Reino Unido" },
  { lat: 24.21, lng: 120.48, fuel: "Coal", name: "Taichung", country: "Taiwán" },
];
const MARQUEE = [...LANDMARKS, ...CR];

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

/* Soft circular sprite for glowing points. */
function makeDotTexture() {
  if (typeof document === "undefined") return null;
  const s = 64;
  const cv = document.createElement("canvas");
  cv.width = cv.height = s;
  const ctx = cv.getContext("2d");
  if (!ctx) return null;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.85)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const t = new THREE.CanvasTexture(cv);
  t.needsUpdate = true;
  return t;
}

/* Minimal CSV parser (handles quoted fields with embedded commas). */
function parseCSV(text) {
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
  return rows;
}

/* Decode a (quantized) TopoJSON land file → flat Float32Array of line
   segments on the sphere. Every arc in a land topology is a coastline,
   so drawing all arcs gives the continents' outlines (no external
   texture, deterministic). */
function landToSegments(topo) {
  if (!topo || !topo.arcs) return null;
  const tr = topo.transform || { scale: [1, 1], translate: [0, 0] };
  const [sx, sy] = tr.scale, [tx, ty] = tr.translate;
  const seg = [];
  for (const arc of topo.arcs) {
    let x = 0, y = 0; const pts = [];
    for (let i = 0; i < arc.length; i++) { x += arc[i][0]; y += arc[i][1]; pts.push([x * sx + tx, y * sy + ty]); }
    for (let i = 0; i < pts.length - 1; i++) {
      const a = llToVec3(pts[i][1], pts[i][0], R * 1.004);
      const b = llToVec3(pts[i + 1][1], pts[i + 1][0], R * 1.004);
      seg.push(a[0], a[1], a[2], b[0], b[1], b[2]);
    }
  }
  return new Float32Array(seg);
}

/* ── Earth: a clean dark-navy sphere; directional light gives it a lit
      crescent so it reads as a globe. (No external texture — the glowing
      coastlines + plant points carry the visualisation.) ── */
function Earth() {
  return (
    <mesh>
      <sphereGeometry args={[R, 64, 64]} />
      <meshStandardMaterial color="#0a1d39" emissive={EN_ACCENT.navy} emissiveIntensity={0.28} metalness={0.25} roughness={0.92} />
    </mesh>
  );
}

/* ── Coastlines: continents as glowing turquoise lines (from world-atlas). ── */
function Coastlines({ positions }) {
  const geo = useMemo(() => {
    if (!positions || !positions.length) return null;
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);
  if (!geo) return null;
  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color={EN_ACCENT.turquoise} transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
    </lineSegments>
  );
}

/* ── Atmosphere: fresnel rim glow (back-side sphere, additive). ── */
function Atmosphere() {
  const mat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { glowColor: { value: new THREE.Color(EN_ACCENT.turquoise) } },
    vertexShader: `varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `varying vec3 vN; uniform vec3 glowColor; void main(){ float i = pow(0.62 - dot(vN, vec3(0.0,0.0,1.0)), 2.6); gl_FragColor = vec4(glowColor, 1.0) * clamp(i,0.0,1.0); }`,
    side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
  }), []);
  return <mesh material={mat} scale={1.18}><sphereGeometry args={[R, 48, 48]} /></mesh>;
}

/* ── Faint graticule shell ── */
function Graticule() {
  const geo = useMemo(() => {
    const pts = [];
    for (let lat = -60; lat <= 60; lat += 30)
      for (let lng = -180; lng < 180; lng += 4) {
        pts.push(...llToVec3(lat, lng, R * 1.002), ...llToVec3(lat, lng + 4, R * 1.002));
      }
    for (let lng = -180; lng < 180; lng += 30)
      for (let lat = -88; lat < 88; lat += 4) {
        pts.push(...llToVec3(lat, lng, R * 1.002), ...llToVec3(lat + 4, lng, R * 1.002));
      }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, []);
  return <lineSegments geometry={geo}><lineBasicMaterial color={EN_ACCENT.turquoise} transparent opacity={0.07} /></lineSegments>;
}

/* ── Dense layer: the WRI dataset as a single glowing points cloud
      (filtered by active technologies). Non-interactive (ambient). ── */
function DensePoints({ parsed, filters, dot }) {
  const geom = useMemo(() => {
    if (!parsed) return null;
    const { pos, fuelIdx, count } = parsed;
    const P = [], C = [];
    const col = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const key = FUEL_KEYS[fuelIdx[i]];
      if (filters[key] === false) continue;
      P.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
      col.set(FUEL[key] || FUEL.Other);
      C.push(col.r, col.g, col.b);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
    g.setAttribute("color", new THREE.Float32BufferAttribute(C, 3));
    return g;
  }, [parsed, filters]);
  if (!geom) return null;
  return (
    <points geometry={geom}>
      <pointsMaterial size={0.045} map={dot || undefined} vertexColors transparent opacity={0.92}
        sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} alphaTest={0.02} />
    </points>
  );
}

/* ── Marquee layer: curated landmarks + Costa Rica as bright,
      hoverable nodes. ── */
function Marquee({ filters, onHover, dot }) {
  const list = useMemo(() => MARQUEE.filter((m) => filters[m.fuel] !== false), [filters]);
  return (
    <group>
      {list.map((m, i) => {
        const p = llToVec3(m.lat, m.lng, R * 1.012);
        const c = FUEL[m.fuel] || FUEL.Other;
        const rad = m.cr ? 0.05 : 0.034;
        return (
          <group key={`${m.name}-${i}`} position={p}>
            {/* hit target (slightly larger, invisible) */}
            <mesh
              onPointerOver={(e) => { e.stopPropagation(); onHover(m); }}
              onPointerOut={() => onHover(null)}
            >
              <sphereGeometry args={[rad * 2.4, 8, 8]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>
            <sprite scale={[rad * 3.2, rad * 3.2, 1]}>
              <spriteMaterial map={dot || undefined} color={c} transparent opacity={0.9}
                blending={THREE.AdditiveBlending} depthWrite={false} />
            </sprite>
            <mesh>
              <sphereGeometry args={[rad, 14, 14]} />
              <meshBasicMaterial color={m.cr ? "#ffffff" : c} toneMapped={false} />
            </mesh>
            {m.cr && (
              <mesh>
                <sphereGeometry args={[rad * 1.7, 16, 16]} />
                <meshBasicMaterial color={c} transparent opacity={0.28} blending={THREE.AdditiveBlending} depthWrite={false} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

/* ── Scene root ── */
function Scene({ reduced, compact, drag, focus, parsed, filters, onHover, coast }) {
  const group = useRef();
  const spin = useRef(THREE.MathUtils.degToRad(-90 - (-80))); // Americas-forward
  const tilt = useRef(0.14);
  const locked = useRef(false); // true while a focus animation is playing
  const paused = useRef(false);
  const hidden = useRef(false);
  const dot = useMemo(makeDotTexture, []);
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    paused.current = reduced;
    if (typeof document === "undefined") return;
    const onVis = () => { hidden.current = document.hidden; if (!document.hidden && !reduced) invalidate(); };
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [reduced, invalidate]);

  // Focus Costa Rica / global — animate toward the pose by the SHORTEST path,
  // and ignore auto-rotate/drag while the animation plays (single source of truth).
  useEffect(() => {
    const cr = PLANTS_GEO.find((p) => p.kind === "load") || { lat: 10, lng: -84 };
    const tx = focus === "cr" ? THREE.MathUtils.degToRad(cr.lat * 0.7) : THREE.MathUtils.degToRad(8);
    let ty;
    if (focus === "cr") {
      ty = THREE.MathUtils.degToRad(-90 - cr.lng);
      let delta = (ty - spin.current) % (Math.PI * 2);
      if (delta > Math.PI) delta -= Math.PI * 2; else if (delta < -Math.PI) delta += Math.PI * 2;
      ty = spin.current + delta;
    } else {
      ty = spin.current; // resume auto-rotate from wherever we are; just re-tilt
    }
    if (reduced) { spin.current = ty; tilt.current = tx; invalidate(); return; }
    locked.current = true;
    const o = { y: spin.current, x: tilt.current };
    const a = animate(o, {
      y: ty, x: tx, duration: 1000, ease: "inOutCubic",
      onUpdate: () => { spin.current = o.y; tilt.current = o.x; },
      onComplete: () => { locked.current = false; },
    });
    return () => { try { a.pause(); } catch {} locked.current = false; };
  }, [focus, reduced, invalidate]);

  useFrame((_, dt) => {
    if (paused.current || hidden.current || !group.current) return;
    const d = drag.current;
    if (locked.current) { d.ry = 0; d.rx = 0; d.vy = 0; }
    else {
      if (focus === "global" && !d.down) spin.current += Math.min(dt, 0.05) * 0.06; // gentle auto-rotate
      spin.current += d.ry; d.ry = 0;                       // consume manual horizontal drag
      if (!d.down) { spin.current += d.vy; d.vy *= 0.92; }  // inertia
      tilt.current = THREE.MathUtils.clamp(tilt.current + d.rx, -1.0, 1.0); d.rx = 0; // persistent tilt
    }
    group.current.rotation.y = spin.current;
    group.current.rotation.x = tilt.current;
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 2, 5]} intensity={1.1} color="#dcefff" />
      <directionalLight position={[-5, -1, -3]} intensity={0.4} color={EN_ACCENT.turquoise} />
      <Atmosphere />
      <group ref={group}>
        <Earth />
        <Graticule />
        <Coastlines positions={coast} />
        <DensePoints parsed={parsed} filters={filters} dot={dot} />
        <Marquee filters={filters} onHover={onHover} dot={dot} />
      </group>
      {!reduced && (
        <EffectComposer disableNormalPass>
          <Bloom intensity={compact ? 0.7 : 1.0} luminanceThreshold={0.28} luminanceSmoothing={0.3} mipmapBlur radius={compact ? 0.55 : 0.75} />
        </EffectComposer>
      )}
    </>
  );
}

export default function PowerGlobe({ en = false, compact = false }) {
  const reduced = useReducedMotion();
  const wrapRef = useRef(null);
  const drag = useRef({ down: false, lx: 0, ly: 0, sx: 0, sy: 0, ry: 0, rx: 0, vy: 0, axis: 1 });
  const [grabbing, setGrabbing] = useState(false);
  const [focus, setFocus] = useState("global");
  const [filters, setFilters] = useState({});
  const [hover, setHover] = useState(null);
  const [parsed, setParsed] = useState(null);
  const [coast, setCoast] = useState(null);
  const [status, setStatus] = useState("idle"); // idle · loading · ok · error
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setWebgl(!!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl"))));
    } catch { setWebgl(false); }
  }, []);

  // Continents — fetched once from world-atlas (the same reliable CDN the
  // production WorldMapMini uses). Desktop + mobile; cheap (~100 KB).
  useEffect(() => {
    let alive = true;
    fetch(LAND_URL)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("land"))))
      .then((topo) => { if (alive) { const s = landToSegments(topo); if (s && s.length) setCoast(s); } })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  // Lazy-fetch the WRI dataset when the globe scrolls into view (desktop only;
  // mobile relies on the continents + curated marquee to avoid a ~10 MB parse).
  // Curated marquee is always present regardless.
  useEffect(() => {
    if (compact || reduced) return;
    const el = wrapRef.current;
    if (!el) return;
    let done = false;
    const run = () => {
      if (done) return; done = true;
      setStatus("loading");
      fetch(WRI_CSV)
        .then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.text(); })
        .then((txt) => {
          const rows = parseCSV(txt);
          const head = rows[0].map((h) => h.trim());
          const iLat = head.indexOf("latitude"), iLng = head.indexOf("longitude"), iFuel = head.indexOf("primary_fuel");
          if (iLat < 0 || iLng < 0 || iFuel < 0) throw new Error("schema");
          const cap = Math.min(rows.length - 1, 40000);
          const pos = new Float32Array(cap * 3);
          const fuelIdx = new Uint8Array(cap);
          let n = 0;
          for (let r = 1; r < rows.length && n < cap; r++) {
            const row = rows[r];
            const lat = parseFloat(row[iLat]), lng = parseFloat(row[iLng]);
            if (!isFinite(lat) || !isFinite(lng)) continue;
            const v = llToVec3(lat, lng, R * 1.008);
            pos[n * 3] = v[0]; pos[n * 3 + 1] = v[1]; pos[n * 3 + 2] = v[2];
            const fk = (row[iFuel] || "Other").trim();
            fuelIdx[n] = FUEL_INDEX[fk] != null ? FUEL_INDEX[fk] : FUEL_INDEX.Other;
            n++;
          }
          setParsed({ pos, fuelIdx, count: n });
          setStatus("ok");
        })
        .catch(() => setStatus("error"));
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { run(); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [compact, reduced]);

  // Counts for the panel (dense if available, else curated marquee).
  const counts = useMemo(() => {
    const c = {};
    if (parsed) for (let i = 0; i < parsed.count; i++) { const k = FUEL_KEYS[parsed.fuelIdx[i]]; c[k] = (c[k] || 0) + 1; }
    else MARQUEE.forEach((m) => { c[m.fuel] = (c[m.fuel] || 0) + 1; });
    return c;
  }, [parsed]);
  const total = useMemo(() => Object.values(counts).reduce((a, b) => a + b, 0), [counts]);

  const dragOff = reduced;
  const onDown = (e) => {
    const d = drag.current;
    d.down = true; d.lx = d.sx = e.clientX; d.ly = d.sy = e.clientY; d.vy = 0;
    d.axis = compact ? 0 : 1; if (!compact) setGrabbing(true);
  };
  const onMove = (e) => {
    const d = drag.current;
    if (!d.down) return;
    if (d.axis === 0) {
      const adx = Math.abs(e.clientX - d.sx), ady = Math.abs(e.clientY - d.sy);
      if (adx < 6 && ady < 6) return;
      d.axis = adx > ady ? 1 : -1; if (d.axis === 1) setGrabbing(true);
    }
    if (d.axis !== 1) return;
    if (e.cancelable) e.preventDefault();
    const dx = e.clientX - d.lx, dy = e.clientY - d.ly;
    d.lx = e.clientX; d.ly = e.clientY;
    d.ry += dx * 0.006; if (!compact) d.rx += dy * 0.004; d.vy = dx * 0.006;
  };
  const onUp = () => { const d = drag.current; d.down = false; d.axis = compact ? 0 : 1; d.rx = 0; setGrabbing(false); };

  const toggleFuel = useCallback((k) => setFilters((f) => ({ ...f, [k]: f[k] === false })), []);

  if (!webgl) {
    return (
      <div style={{ position: "relative", aspectRatio: compact ? "4 / 5" : "16 / 9", borderRadius: 16, overflow: "hidden",
        background: `radial-gradient(120% 120% at 50% 0%, ${EN_ACCENT.navy2}, ${EN_ACCENT.navyDeep} 90%)`,
        border: `1px solid ${EN_ACCENT.turquoise}40`, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ textAlign: "center", color: "rgba(255,255,255,0.7)", maxWidth: 360 }}>
          <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 2, color: EN_ACCENT.glow, marginBottom: 8 }}>
            {en ? "GLOBAL GENERATION ATLAS" : "ATLAS GLOBAL DE GENERACIÓN"}
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.6 }}>
            {en ? "The 3D atlas needs WebGL. The accessible Costa Rica grid map is below."
              : "El atlas 3D requiere WebGL. El mapa accesible de la red de Costa Rica está más abajo."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapRef} style={{ position: "relative", aspectRatio: compact ? "4 / 5" : "16 / 9", borderRadius: 16, overflow: "hidden",
      background: `radial-gradient(130% 120% at 50% -10%, ${EN_ACCENT.navy}, ${EN_ACCENT.navyDeep} 70%, #02070f 100%)`,
      border: `1px solid ${EN_ACCENT.turquoise}33`, boxShadow: `inset 0 0 90px rgba(0,0,0,0.6)` }}>
      <div
        aria-hidden="true"
        onPointerDown={dragOff ? undefined : onDown}
        onPointerMove={dragOff ? undefined : onMove}
        onPointerUp={dragOff ? undefined : onUp}
        onPointerCancel={dragOff ? undefined : onUp}
        onPointerLeave={dragOff ? undefined : onUp}
        style={{ position: "absolute", inset: 0, pointerEvents: dragOff ? "none" : "auto",
          cursor: dragOff ? "default" : grabbing ? "grabbing" : "grab", touchAction: dragOff ? "auto" : "pan-y" }}
      >
        <Canvas
          dpr={reduced ? 1 : compact ? [1, 1.5] : [1, 2]}
          frameloop={reduced ? "demand" : "always"}
          camera={{ position: [0, 0, compact ? 4.9 : 4.2], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <Scene reduced={reduced} compact={compact} drag={drag} focus={focus} parsed={parsed} filters={filters} onHover={setHover} coast={coast} />
        </Canvas>
      </div>

      {/* ── Title + status panel (semantic/interactive layer) ── */}
      <div style={{ position: "absolute", top: 12, left: 14, zIndex: 3, maxWidth: "min(62%, 320px)" }}>
        <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 2, color: EN_ACCENT.glow }}>
          {en ? "GLOBAL GENERATION ATLAS" : "ATLAS GLOBAL DE GENERACIÓN"}
        </div>
        <div style={{ marginTop: 4, fontFamily: MONO, fontSize: 11, color: "#fff" }}>
          {total.toLocaleString(en ? "en" : "es")} {en ? "plants mapped" : "plantas mapeadas"}
          {status === "loading" && <span style={{ color: "rgba(255,255,255,0.5)" }}> · {en ? "loading…" : "cargando…"}</span>}
        </div>
        {hover && (
          <div style={{ marginTop: 6, padding: "6px 9px", borderRadius: 9, background: `${EN_ACCENT.navy}d9`,
            border: `1px solid ${FUEL[hover.fuel] || FUEL.Other}88`, backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "#fff" }}>{hover.name}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>
              {(en ? hover.fuel : (FUEL_ES[hover.fuel] || hover.fuel))} · {hover.country}
            </div>
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

      {/* ── Technology filter / legend ── */}
      <div style={{ position: "absolute", left: 14, bottom: 12, right: 14, zIndex: 3, display: "flex", flexWrap: "wrap", gap: 6,
        alignItems: "center", justifyContent: "center" }}>
        {LEGEND.map((k) => {
          const on = filters[k] !== false;
          return (
            <button key={k} type="button" onClick={() => toggleFuel(k)}
              aria-pressed={on}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 9px", borderRadius: 999, cursor: "pointer",
                fontFamily: MONO, fontSize: 10, letterSpacing: 0.3, opacity: on ? 1 : 0.4,
                color: "rgba(255,255,255,0.85)", background: `${EN_ACCENT.navy}99`,
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
      <div style={{ position: "absolute", bottom: 44, left: 14, zIndex: 3, fontFamily: MONO, fontSize: 8.5,
        letterSpacing: 0.4, color: "rgba(255,255,255,0.4)", maxWidth: "70%", pointerEvents: "none" }}>
        {status === "ok"
          ? (en ? "Data: WRI Global Power Plant Database (CC-BY-4.0) · approximate" : "Datos: WRI Global Power Plant Database (CC-BY-4.0) · aproximado")
          : (en ? "Selected major facilities + Costa Rica · illustrative" : "Instalaciones seleccionadas + Costa Rica · ilustrativo")}
      </div>
    </div>
  );
}
