"use client";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { animate } from "animejs";
import { AdditiveBlending, BufferAttribute, BufferGeometry, CanvasTexture, CatmullRomCurve3, Color, DoubleSide, ExtrudeGeometry, MathUtils, QuadraticBezierCurve3, Shape, TubeGeometry, Vector3 } from "three";
const THREE = { AdditiveBlending, BufferAttribute, BufferGeometry, CanvasTexture, CatmullRomCurve3, Color, DoubleSide, ExtrudeGeometry, MathUtils, QuadraticBezierCurve3, Shape, TubeGeometry, Vector3 };
import { CR_OUTLINE_GEO, CR_BBOX, PLANTS_GEO } from "./crGeo";
import { EN_ACCENT } from "../energiaData";
import useFrameloopGate, { armContextRecovery } from "./useFrameloopGate";

/* ═══════════════════════════════════════════════════════════════
   ENERGÍA — Hero3D (relief edition)
   Sculpted Costa Rica: the extruded coastline carries a faceted
   cordillera relief cap (Guanacaste → Central → Talamanca ranges,
   stylized heightfield anchored at real summit coordinates), with
   city lights, the gold SIEPAC spine, plant nodes and energy arcs
   riding the terrain. anime.js intro build-on; drag with inertia;
   float + pointer parallax. Honours prefers-reduced-motion and the
   section-wide frameloop gate (one live canvas at a time).

   Device-verified fix: the old flat version placed every surface
   element at z=0.205 while the extrude's front face (depth 0.27 +
   bevel 0.022) is at z=0.292 — nodes, city lights and the spine
   were buried INSIDE the landmass and never rendered on hardware
   (owner photo IMG_1377: bare slab + arcs). All surface z now
   derives from TOP_Z = the measured face height.
   ═══════════════════════════════════════════════════════════════ */

/* ── Palette (harmonised with EN_ACCENT) ── */
const NAVY = EN_ACCENT.navy;            // #0A1F3F
const TURQ = EN_ACCENT.turquoise;       // #00B5A8
const GLOW = EN_ACCENT.glow;            // #22d3ee
const GOLD = EN_ACCENT.gold;            // #F2B135

/* Panel v2 fuel ramp — red is reserved for risk data, never fuels; gold is
   the protagonist channel (GAM destination + SIEPAC only). */
const KIND = {
  hydro: "#10B981", geo: "#D97706", wind: "#38BDF8", solar: "#FB923C",
  thermal: "#94A3B8", load: GOLD,
};

/* ── Geo → scene projection (centered, aspect-corrected) ── */
const cLng = (CR_BBOX.lngMin + CR_BBOX.lngMax) / 2;
const cLat = (CR_BBOX.latMin + CR_BBOX.latMax) / 2;
const K = Math.cos((cLat * Math.PI) / 180);
const SCALE = 1.42;
const px = (lng) => (lng - cLng) * K * SCALE;
const py = (lat) => (lat - cLat) * SCALE;

const DEPTH = 0.27;             // extrusion depth
const BEVEL = 0.022;            // bevelThickness (front face = DEPTH + BEVEL)
const TOP_Z = DEPTH + BEVEL;    // measured front-face height — the ground plane
/* LA PLACA VIVA pose: crop a monument, don't float a trinket. */
const BASE_TILT = -0.52;
const BASE_YAW  = 0.06;
const BASE_ROLL = 0.2;
const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);

/* ═══ Cordillera heightfield ═══
   Stylized relief anchored at real summit locations (IGN/Smithsonian GVP,
   approx. coords): Guanacaste range NW, Tilarán, Cordillera Central and the
   Talamanca massif SE. Amplitudes are art-directed (~4.5× vertical
   exaggeration — true Chirripó 3 821 m would be ~0.06 wu); this is an
   illustrative relief, not survey data. [lng, lat, crest wu, radius °] */
const PEAKS = [
  [-85.324, 10.830, 0.13, 0.170], // Rincón de la Vieja
  [-85.153, 10.748, 0.14, 0.150], // Miravalles
  [-85.015, 10.673, 0.12, 0.130], // Tenorio
  [-84.703, 10.463, 0.15, 0.100], // Arenal (steep young cone)
  [-84.800, 10.300, 0.10, 0.160], // Tilarán / Monteverde ridge
  [-84.233, 10.198, 0.15, 0.150], // Poás
  [-84.100, 10.135, 0.13, 0.140], // Barva
  [-83.852, 9.979,  0.16, 0.155], // Irazú
  [-83.767, 10.017, 0.14, 0.125], // Turrialba
  [-83.755, 9.556,  0.18, 0.190], // Cerro de la Muerte (Talamanca W)
  [-83.489, 9.484,  0.24, 0.210], // Chirripó — highest summit
  [-83.060, 9.280,  0.20, 0.210], // Kámuk / Talamanca E
  [-82.830, 9.120,  0.15, 0.190], // Talamanca toward the PA border
].map(([lng, lat, h, sd]) => [px(lng), py(lat), h, sd * SCALE]);
const PEAK_MAX = 0.26;

/* ── Point-in-polygon + distance-to-coast against the CR outline ── */
const OUTLINE_XY = CR_OUTLINE_GEO.map(([lng, lat]) => [px(lng), py(lat)]);
function insideCR(x, y) {
  let inside = false;
  for (let i = 0, j = OUTLINE_XY.length - 1; i < OUTLINE_XY.length; j = i++) {
    const [xi, yi] = OUTLINE_XY[i], [xj, yj] = OUTLINE_XY[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
function distToCoast(x, y) {
  let best = Infinity;
  for (let i = 0, j = OUTLINE_XY.length - 1; i < OUTLINE_XY.length; j = i++) {
    const [x1, y1] = OUTLINE_XY[j], [x2, y2] = OUTLINE_XY[i];
    const dx = x2 - x1, dy = y2 - y1;
    const L2 = dx * dx + dy * dy || 1e-9;
    let t = ((x - x1) * dx + (y - y1) * dy) / L2;
    t = t < 0 ? 0 : t > 1 ? 1 : t;
    const ex = x - (x1 + t * dx), ey = y - (y1 + t * dy);
    const d2 = ex * ex + ey * ey;
    if (d2 < best) best = d2;
  }
  return Math.sqrt(best);
}
const smooth = (a, b, x) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
/* Terrain height above TOP_Z at scene (x, y): gaussian summit field,
   soft-saturated where ranges overlap, feathered flat toward the coast. */
export function heightAt(x, y) {
  let sum = 0;
  for (let i = 0; i < PEAKS.length; i++) {
    const [pxk, pyk, h, s] = PEAKS[i];
    const dx = x - pxk, dy = y - pyk;
    sum += h * Math.exp(-(dx * dx + dy * dy) / (2 * s * s));
  }
  const h = PEAK_MAX * (1 - Math.exp(-sum / PEAK_MAX));
  return h * smooth(0.03, 0.42, distToCoast(x, y));
}

/* ── "Ocean chart" backdrop texture: nautical-blueprint plane — base #071B3A,
      1° graticule, three coast-offset contours, contact shadow, horizon band,
      gold counter-glow. ── */
function makeChartTexture() {
  if (typeof document === "undefined") return null;
  const W = 1024, Hh = 768;
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = Hh;
  const ctx = cv.getContext("2d");
  if (!ctx) return null;
  ctx.fillStyle = "#071B3A";
  ctx.fillRect(0, 0, W, Hh);
  const wuPerPxX = 10 / W, wuPerPxY = 7.5 / Hh;
  const stepX = (K * SCALE) / wuPerPxX, stepY = SCALE / wuPerPxY;
  ctx.strokeStyle = "rgba(56,189,248,0.16)";
  ctx.lineWidth = 3;
  for (let x = (W / 2) % stepX; x < W; x += stepX) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, Hh); ctx.stroke(); }
  for (let y = (Hh / 2) % stepY; y < Hh; y += stepY) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  const cx = W / 2, cy = Hh / 2;
  const toPx = ([X, Y]) => [cx + X / wuPerPxX, cy - Y / wuPerPxY];
  const centroid = OUTLINE_XY.reduce((a, p) => [a[0] + p[0], a[1] + p[1]], [0, 0]).map((v) => v / OUTLINE_XY.length);
  const contours = [[0.12, "rgba(0,181,168,0.34)"], [0.26, "rgba(0,181,168,0.22)"], [0.44, "rgba(0,181,168,0.12)"]];
  for (const [off, col] of contours) {
    ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath();
    OUTLINE_XY.forEach((pt, i) => {
      const dx = pt[0] - centroid[0], dy = pt[1] - centroid[1];
      const d = Math.hypot(dx, dy) || 1;
      const [px2, py2] = toPx([pt[0] + (dx / d) * off, pt[1] + (dy / d) * off]);
      if (i === 0) ctx.moveTo(px2, py2); else ctx.lineTo(px2, py2);
    });
    ctx.closePath(); ctx.stroke();
  }
  const sh = ctx.createRadialGradient(cx, cy + 40, 40, cx, cy + 40, 330);
  sh.addColorStop(0, "rgba(0,0,0,0.5)"); sh.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = sh; ctx.fillRect(0, 0, W, Hh);
  const hb = ctx.createLinearGradient(0, 0, 0, Hh * 0.15);
  hb.addColorStop(0, "rgba(34,211,238,0.20)"); hb.addColorStop(1, "rgba(34,211,238,0)");
  ctx.fillStyle = hb; ctx.fillRect(0, 0, W, Hh * 0.15);
  const gg = ctx.createRadialGradient(W * 0.85, Hh * 0.9, 10, W * 0.85, Hh * 0.9, 420);
  gg.addColorStop(0, "rgba(242,177,53,0.12)"); gg.addColorStop(1, "rgba(242,177,53,0)");
  ctx.fillStyle = gg; ctx.fillRect(0, 0, W, Hh);
  const tex = new THREE.CanvasTexture(cv);
  tex.needsUpdate = true;
  return tex;
}

/* ── Faceted relief cap: grid clipped to the outline, vertex-colored by
      elevation, flat-shaded so the raking key light sculpts the facets. ── */
function buildRelief(compact) {
  const pad = 0.02;
  const x0 = px(CR_BBOX.lngMin) - pad, x1 = px(CR_BBOX.lngMax) + pad;
  const y0 = py(CR_BBOX.latMin) - pad, y1 = py(CR_BBOX.latMax) + pad;
  const nx = compact ? 120 : 168;
  const ny = Math.max(24, Math.round(nx * ((y1 - y0) / (x1 - x0))));
  const vx = nx + 1, vy = ny + 1;
  const positions = new Float32Array(vx * vy * 3);
  const colors = new Float32Array(vx * vy * 3);
  const ok = new Uint8Array(vx * vy);
  const stops = [
    [0.00, new THREE.Color("#14325A")], // lowlands ≈ extrude body tone
    [0.28, new THREE.Color("#1B4A74")],
    [0.60, new THREE.Color("#2E7690")],
    [1.00, new THREE.Color("#7BD4C9")], // crests: cold teal light
  ];
  const cTmp = new THREE.Color();
  const ramp = (t) => {
    for (let i = 1; i < stops.length; i++) {
      if (t <= stops[i][0]) {
        const f = (t - stops[i - 1][0]) / (stops[i][0] - stops[i - 1][0]);
        return cTmp.copy(stops[i - 1][1]).lerp(stops[i][1], f);
      }
    }
    return cTmp.copy(stops[stops.length - 1][1]);
  };
  for (let j = 0; j < vy; j++) {
    for (let i = 0; i < vx; i++) {
      const x = x0 + ((x1 - x0) * i) / nx;
      const y = y0 + ((y1 - y0) * j) / ny;
      const idx = j * vx + i;
      const inside = insideCR(x, y) && distToCoast(x, y) > 0.015;
      ok[idx] = inside ? 1 : 0;
      const h = inside ? heightAt(x, y) : 0;
      positions[idx * 3] = x;
      positions[idx * 3 + 1] = y;
      positions[idx * 3 + 2] = TOP_Z + 0.004 + h;
      const c = ramp(clamp01(h / PEAK_MAX));
      colors[idx * 3] = c.r; colors[idx * 3 + 1] = c.g; colors[idx * 3 + 2] = c.b;
    }
  }
  const indices = [];
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const a = j * vx + i, b = a + 1, c = a + vx, d = c + 1;
      if (ok[a] && ok[b] && ok[c] && ok[d]) indices.push(a, b, d, a, d, c);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  g.setIndex(indices);
  g.computeVertexNormals();
  return g;
}

/* ── Landmass: extruded silhouette + relief cap + ONE crisp coast line
      (the old EdgesGeometry drew both caps' outlines and every wall seam —
      it read as unfinished wireframe on device; the halo ghost-copy is gone
      for the same reason). ── */
function Landmass({ compact }) {
  const { body, relief, coast } = useMemo(() => {
    const shape = new THREE.Shape();
    CR_OUTLINE_GEO.forEach(([lng, lat], i) => {
      const x = px(lng), y = py(lat);
      if (i === 0) shape.moveTo(x, y); else shape.lineTo(x, y);
    });
    shape.closePath();
    const body = new THREE.ExtrudeGeometry(shape, {
      depth: DEPTH, bevelEnabled: true, bevelThickness: BEVEL, bevelSize: 0.016, bevelSegments: 2,
    });
    const relief = buildRelief(compact);
    const pos = new Float32Array(OUTLINE_XY.length * 3);
    OUTLINE_XY.forEach(([x, y], i) => {
      pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = TOP_Z + 0.006;
    });
    const coast = new THREE.BufferGeometry();
    coast.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return { body, relief, coast };
  }, [compact]);
  useEffect(() => () => { body.dispose(); relief.dispose(); coast.dispose(); }, [body, relief, coast]);

  return (
    <group>
      <mesh geometry={body}>
        <meshStandardMaterial color="#122C4F" metalness={0.05} roughness={0.9} emissive={TURQ} emissiveIntensity={0.05} />
      </mesh>
      <mesh geometry={relief}>
        <meshStandardMaterial vertexColors flatShading metalness={0.05} roughness={0.72} emissive={TURQ} emissiveIntensity={0.05} />
      </mesh>
      <lineLoop geometry={coast}>
        <lineBasicMaterial color={GLOW} transparent opacity={0.85} toneMapped={false} />
      </lineLoop>
    </group>
  );
}

/* ── Round-sprite texture for Points (raw gl_Points are squares — the old
      city dots read as pixel confetti on device). White radial falloff;
      multiplied by vertex color under additive blending. ── */
let dotSprite = null;
function getDotSprite() {
  if (dotSprite || typeof document === "undefined") return dotSprite;
  const s = 64;
  const cv = document.createElement("canvas");
  cv.width = cv.height = s;
  const ctx = cv.getContext("2d");
  if (!ctx) return null;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.45, "rgba(255,255,255,0.85)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  dotSprite = new THREE.CanvasTexture(cv);
  dotSprite.needsUpdate = true;
  return dotSprite;
}

/* ── City-lights field — warm emissive dots draped over the relief,
      denser around the GAM load core. ONE Points draw call. ── */
function CityLights({ paused, intro, compact }) {
  const ref = useRef();
  const sprite = useMemo(getDotSprite, []);
  const { positions, colors, count } = useMemo(() => {
    const gam = PLANTS_GEO.find((p) => p.kind === "load");
    const gx = px(gam.lng), gy = py(gam.lat);
    const xs = OUTLINE_XY.map((p) => p[0]), ys = OUTLINE_XY.map((p) => p[1]);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const target = compact ? 300 : 430;
    const pts = [];
    let guard = 0;
    while (pts.length < target && guard++ < target * 30) {
      const x = minX + Math.random() * (maxX - minX);
      const y = minY + Math.random() * (maxY - minY);
      if (insideCR(x, y)) pts.push([x, y]);
    }
    // GAM metropolitan cluster — brighter, denser
    const cluster = compact ? 90 : 130;
    for (let i = 0; i < cluster; i++) {
      const r = Math.abs(Math.random() + Math.random() - 1) * 0.34;
      const th = Math.random() * Math.PI * 2;
      const x = gx + Math.cos(th) * r, y = gy + Math.sin(th) * r * 0.7;
      if (insideCR(x, y)) pts.push([x, y]);
    }
    const positions = new Float32Array(pts.length * 3);
    const colors = new Float32Array(pts.length * 3);
    const warm = new THREE.Color("#FFB65C");
    const cool = new THREE.Color(GLOW);
    pts.forEach(([x, y], i) => {
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = TOP_Z + heightAt(x, y) + 0.012;
      const c = Math.random() < 0.16 ? cool : warm;
      const dim = 0.55 + Math.random() * 0.45;
      colors[i * 3] = c.r * dim; colors[i * 3 + 1] = c.g * dim; colors[i * 3 + 2] = c.b * dim;
    });
    return { positions, colors, count: pts.length };
  }, [compact]);

  useFrame(({ clock }) => {
    if (paused.current || !ref.current) return;
    const ip = clamp01((intro.current.p - 0.25) / 0.5);
    ref.current.material.opacity = ip * (0.82 + Math.sin(clock.elapsedTime * 1.1) * 0.1);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      {/* Device-verified: 0.03 non-additive points were ~1px and invisible on a
          DPR-3 phone — bigger + additive so bloom catches them. */}
      <pointsMaterial vertexColors map={sprite} size={0.062} transparent opacity={0} sizeAttenuation depthWrite={false} toneMapped={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

/* ── SIEPAC spine — the gold transmission backbone crossing the country
      (schematic route: NI border → Cañas → GAM → PA border), clearing the
      cordillera relief, with one traveling gold packet. ── */
function SiepacSpine({ paused, intro }) {
  const tubeRef = useRef();
  const packetRef = useRef();
  const scratch = useMemo(() => new THREE.Vector3(), []);
  const { tube, curve } = useMemo(() => {
    const gam = PLANTS_GEO.find((p) => p.kind === "load");
    const wayXY = [
      [-85.62, 11.02], [-85.09, 10.43], [-84.72, 10.12],
      [gam.lng, gam.lat], [-83.86, 9.52], [-83.28, 9.05], [-82.78, 8.92],
    ].map(([lng, lat]) => [px(lng), py(lat)]);
    // sample the XY path, then drape each sample over the relief (+ clearance)
    const flat = new THREE.CatmullRomCurve3(
      wayXY.map(([x, y]) => new THREE.Vector3(x, y, 0)), false, "catmullrom", 0.35);
    const draped = flat.getPoints(56).map((p) =>
      new THREE.Vector3(p.x, p.y, TOP_Z + heightAt(p.x, p.y) + 0.035));
    const curve = new THREE.CatmullRomCurve3(draped, false, "catmullrom", 0.2);
    const tube = new THREE.TubeGeometry(curve, 96, 0.02, 8, false);
    return { tube, curve };
  }, []);

  useFrame(({ clock }) => {
    if (paused.current) return;
    const draw = clamp01((intro.current.p - 0.3) / 0.5);
    if (tubeRef.current) tubeRef.current.material.opacity = 0.85 * draw;
    if (packetRef.current) {
      packetRef.current.visible = draw > 0.7;
      const tt = (clock.elapsedTime * 0.09) % 1;
      curve.getPointAt(tt, scratch);
      packetRef.current.position.copy(scratch);
    }
  });

  return (
    <group>
      <mesh ref={tubeRef} geometry={tube}>
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.7} transparent opacity={0} toneMapped={false} depthWrite={false} />
      </mesh>
      <group ref={packetRef} visible={false}>
        <mesh><sphereGeometry args={[0.045, 12, 12]} /><meshBasicMaterial color="#ffe9c0" toneMapped={false} /></mesh>
        <mesh><sphereGeometry args={[0.1, 10, 10]} /><meshBasicMaterial color={GOLD} transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} /></mesh>
      </group>
    </group>
  );
}

/* ── Ocean-chart backdrop plane ── */
function OceanChart() {
  const tex = useMemo(makeChartTexture, []);
  if (!tex) return null;
  return (
    <mesh position={[0, 0, -0.15]}>
      <planeGeometry args={[10, 7.5]} />
      <meshBasicMaterial map={tex} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

/* ── Glowing plant nodes + pulsing rings, seated on the relief ── */
function PlantNodes({ paused, intro }) {
  const sphereGrp = useRef();
  const ringGrp = useRef();
  const nodes = useMemo(() => PLANTS_GEO.map((p, i) => {
    const x = px(p.lng), y = py(p.lat);
    return {
      ...p, x, y, z: TOP_Z + heightAt(x, y) + 0.03, phase: i * 0.85,
      isLoad: p.kind === "load", c: new THREE.Color(KIND[p.kind] || "#ffffff"),
    };
  }), []);

  useFrame(({ clock }) => {
    if (paused.current) return;
    const t = clock.elapsedTime;
    const ip = intro.current.p;
    const spheres = sphereGrp.current;
    const rings = ringGrp.current;
    if (spheres) {
      for (let i = 0; i < spheres.children.length; i++) {
        const n = nodes[i];
        const pop = easeOutCubic(clamp01((ip - i * 0.05) / 0.24)); // staggered build-on
        const s = (1 + Math.sin(t * 2 + n.phase) * 0.22) * (n.isLoad ? 1.2 : 1) * pop;
        spheres.children[i].scale.setScalar(s);
      }
    }
    if (rings) {
      for (let i = 0; i < rings.children.length; i++) {
        const n = nodes[i];
        const m = rings.children[i];
        const pop = clamp01((ip - i * 0.05) / 0.24);
        if (n.isLoad) {
          const cyc = (t * 0.7) % 1;
          const sc = 1 + cyc * 3.4;
          m.scale.set(sc, sc, sc);
          m.material.opacity = (1 - cyc) * 0.7 * pop;
        } else {
          const sc = 1 + (Math.sin(t * 2.2 + n.phase) * 0.5 + 0.5) * 0.9;
          m.scale.set(sc, sc, sc);
          m.material.opacity = (0.28 + Math.sin(t * 2.2 + n.phase) * 0.18) * pop;
        }
      }
    }
  });

  return (
    <group>
      <group ref={sphereGrp}>
        {nodes.map((n) => (
          <mesh key={n.id} position={[n.x, n.y, n.z]} scale={0.001} rotation={n.isLoad ? [0, 0, Math.PI / 4] : [0, 0, 0]}>
            {n.isLoad
              ? <octahedronGeometry args={[0.075, 0]} />
              : <sphereGeometry args={[0.038, 16, 16]} />}
            <meshStandardMaterial color={n.c} emissive={n.c} emissiveIntensity={n.isLoad ? 2.6 : 2.4} toneMapped={false} />
          </mesh>
        ))}
      </group>
      <group ref={ringGrp}>
        {nodes.map((n) => (
          <mesh key={n.id} position={[n.x, n.y, n.z + 0.004]}>
            <ringGeometry args={[n.isLoad ? 0.075 : 0.055, n.isLoad ? 0.092 : 0.068, 40]} />
            <meshBasicMaterial color={n.isLoad ? GOLD : n.c} transparent opacity={0.4} side={THREE.DoubleSide} depthWrite={false} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ── Energy tube-arcs + traveling glow packets (relief-aware endpoints) ── */
function EnergyArcs({ paused, intro }) {
  const tubeGrp = useRef();
  const packetGrp = useRef();
  const scratch = useMemo(() => new THREE.Vector3(), []);
  const arcs = useMemo(() => {
    const gam = PLANTS_GEO.find((p) => p.kind === "load");
    const gx = px(gam.lng), gy = py(gam.lat);
    const gz = TOP_Z + heightAt(gx, gy) + 0.03;
    return PLANTS_GEO.filter((p) => p.kind !== "load" && !p.inGam).map((p, i) => {
      const x = px(p.lng), y = py(p.lat);
      const z = TOP_Z + heightAt(x, y) + 0.03;
      const dist = Math.hypot(gx - x, gy - y);
      const lift = 0.55 + dist * 0.3 + (i % 3) * 0.05;
      const mid = new THREE.Vector3((x + gx) / 2, (y + gy) / 2, TOP_Z + lift);
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(x, y, z), mid, new THREE.Vector3(gx, gy, gz));
      const tube = new THREE.TubeGeometry(curve, 48, 0.03, 8, false);
      return { key: p.id, tube, curve, color: new THREE.Color(KIND[p.kind] || GLOW),
        speed: 0.18 + (i % 4) * 0.035, offset: (i * 0.137) % 1 };
    });
  }, []);

  useFrame(({ clock }) => {
    if (paused.current) return;
    const t = clock.elapsedTime;
    const ip = intro.current.p;
    const draw = clamp01((ip - 0.4) / 0.45); // arcs fade in after country/nodes
    const tubes = tubeGrp.current;
    if (tubes) for (let i = 0; i < tubes.children.length; i++) tubes.children[i].material.opacity = 0.85 * draw;
    const grp = packetGrp.current;
    if (grp) {
      grp.visible = draw > 0.6;
      for (let i = 0; i < arcs.length; i++) {
        const a = arcs[i];
        const tt = (t * a.speed + a.offset) % 1;
        a.curve.getPointAt(tt, scratch);
        const m = grp.children[i];
        m.position.copy(scratch);
        m.scale.setScalar((0.7 + tt * 0.8) * draw);
      }
    }
  });

  return (
    <group>
      <group ref={tubeGrp}>
        {arcs.map((a) => (
          <mesh key={a.key} geometry={a.tube}>
            <meshStandardMaterial color={a.color} emissive={a.color} emissiveIntensity={1.4} transparent opacity={0} toneMapped={false} depthWrite={false} />
          </mesh>
        ))}
      </group>
      <group ref={packetGrp}>
        {arcs.map((a) => (
          <group key={a.key} position={[0, 0, TOP_Z]}>
            <mesh><sphereGeometry args={[0.05, 14, 14]} /><meshBasicMaterial color={a.color} toneMapped={false} /></mesh>
            <mesh><sphereGeometry args={[0.11, 12, 12]} /><meshBasicMaterial color={a.color} transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} /></mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

/* ── Parallax particle layer ── */
function ParticleLayer({ count, spread, depth, size, opacity, color, speed, paused }) {
  const ref = useRef();
  const sprite = useMemo(getDotSprite, []);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.68;
      arr[i * 3 + 2] = depth - Math.random() * 2.2;
    }
    return arr;
  }, [count, spread, depth]);
  useFrame(({ clock }) => { if (!paused.current && ref.current) ref.current.rotation.z = clock.elapsedTime * speed; });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} /></bufferGeometry>
      <pointsMaterial color={color} map={sprite} size={size} transparent opacity={opacity} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ── Scene root: intro build-on + float + pointer parallax + drag ── */
function Scene({ reduced, drag, compact = false }) {
  const group = useRef();
  const paused = useRef(false);
  const hidden = useRef(false);
  const intro = useRef({ p: reduced ? 1 : 0 });
  const invalidate = useThree((s) => s.invalidate);
  const aim = useRef({ x: 0, y: 0 });

  // Mobile shows the whole sculpted country; desktop keeps the monumental
  // right-of-text crop.
  const POS_X = compact ? 0 : 0.6;
  const POS_Y = compact ? -0.02 : 0.05;
  const BASE_SCALE = compact ? 0.78 : 0.9;
  const TILT = compact ? -0.58 : BASE_TILT;

  useEffect(() => {
    paused.current = reduced;
    if (typeof document === "undefined") return;
    const onVis = () => { hidden.current = document.hidden; if (!document.hidden && !reduced) invalidate(); };
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [reduced, invalidate]);

  // anime.js intro build-on (skipped under reduced-motion)
  useEffect(() => {
    if (reduced) {
      intro.current.p = 1;
      if (group.current) { group.current.rotation.set(TILT, BASE_YAW, BASE_ROLL); group.current.position.set(POS_X, POS_Y, 0); group.current.scale.setScalar(BASE_SCALE); }
      invalidate();
      return;
    }
    intro.current.p = 0;
    const anim = animate(intro.current, { p: [0, 1], duration: 1900, delay: 150, ease: "outCubic" });
    return () => { try { anim.pause(); } catch {} };
  }, [reduced, invalidate, TILT, POS_X, POS_Y, BASE_SCALE]);

  const CAP = 0.09;
  useFrame(({ clock, pointer }) => {
    if (paused.current || hidden.current || !group.current) return;
    const t = clock.elapsedTime;
    const ip = easeOutCubic(intro.current.p);

    // drag inertia + spring-back toward the designed pose
    const d = drag.current;
    if (!d.down) { d.ry += d.vy; d.vy *= 0.92; d.ry *= 0.96; d.rx *= 0.96; }
    d.rx = THREE.MathUtils.clamp(d.rx, -0.5, 0.5);

    aim.current.x += (THREE.MathUtils.clamp(pointer.x, -1, 1) * CAP - aim.current.x) * 0.045;
    aim.current.y += (THREE.MathUtils.clamp(pointer.y, -1, 1) * CAP - aim.current.y) * 0.045;

    const float = ip; // motion eases in with the build-on
    group.current.rotation.x = TILT + (Math.sin(t * 0.25) * 0.02 + aim.current.y * 0.55) * float + d.rx;
    group.current.rotation.y = BASE_YAW + (Math.sin(t * 0.21) * 0.035 + aim.current.x * 0.8) * float + d.ry;
    group.current.rotation.z = BASE_ROLL + Math.sin(t * 0.18) * 0.015 * float;
    group.current.position.x = POS_X;
    group.current.position.y = POS_Y + (1 - ip) * -0.9 + Math.sin(t * 0.4) * 0.035 * float;
    group.current.scale.setScalar(BASE_SCALE * (0.5 + 0.5 * ip));
  });

  return (
    <>
      <fogExp2 attach="fog" args={[NAVY, 0.07]} />
      {/* Grazing key from the NW sculpts the relief facets (low elevation →
          long facet shadows); turquoise point works as the back rim. */}
      <directionalLight position={[-3.4, 2.0, 1.7]} intensity={1.6} color="#CFE4FF" />
      <hemisphereLight args={["#38BDF8", "#06152E", 0.25]} />
      <pointLight position={[2.6, 1.4, -2.2]} intensity={1.15} color={TURQ} distance={6} />

      <ParticleLayer paused={paused} count={compact ? 100 : 140} spread={11} depth={-3.4} size={0.03} opacity={0.42} color={GLOW} speed={0.008} />
      <ParticleLayer paused={paused} count={compact ? 150 : 220} spread={9} depth={-1.6} size={0.018} opacity={0.5} color={TURQ} speed={0.016} />
      <ParticleLayer paused={paused} count={compact ? 30 : 46} spread={12} depth={-2.6} size={0.045} opacity={0.22} color={GOLD} speed={-0.006} />
      <OceanChart />

      <group ref={group} scale={0.001}>
        <Landmass compact={compact} />
        <CityLights paused={paused} intro={intro} compact={compact} />
        <SiepacSpine paused={paused} intro={intro} />
        <PlantNodes paused={paused} intro={intro} />
        <EnergyArcs paused={paused} intro={intro} />
      </group>

      {/* Bloom on bright emissives only. multisampling=0: the default 8×MSAA
          composer buffers were the main GPU-memory driver behind iOS context
          eviction (device flicker / black canvas). */}
      {!reduced && (
        <EffectComposer disableNormalPass multisampling={0}>
          <Bloom
            intensity={0.85}
            luminanceThreshold={0.75}
            luminanceSmoothing={0.32}
            mipmapBlur
            radius={0.6}
          />
        </EffectComposer>
      )}
    </>
  );
}

export default function Hero3D({ compact = false }) {
  const reduced = useReducedMotion();
  const wrapRef = useRef(null);
  const frameloop = useFrameloopGate(wrapRef, reduced);
  // axis: 0 undecided · 1 horizontal (rotate) · -1 vertical (let the page scroll)
  const drag = useRef({ down: false, lx: 0, ly: 0, sx: 0, sy: 0, ry: 0, rx: 0, vy: 0, axis: 1 });
  const [grabbing, setGrabbing] = useState(false);

  // Only fully disabled under reduced-motion. On mobile we KEEP drag, but gate it
  // to horizontal gestures so vertical swipes still scroll the page.
  const dragOff = reduced;

  const onDown = (e) => {
    const d = drag.current;
    d.down = true; d.lx = d.sx = e.clientX; d.ly = d.sy = e.clientY; d.vy = 0;
    d.axis = compact ? 0 : 1;            // desktop: rotate immediately; mobile: decide on first move
    if (!compact) setGrabbing(true);     // grab cursor is desktop-only
  };
  const onMove = (e) => {
    const d = drag.current;
    if (!d.down) return;
    if (d.axis === 0) {                   // mobile: wait for a clear intent, then lock the axis
      const adx = Math.abs(e.clientX - d.sx), ady = Math.abs(e.clientY - d.sy);
      if (adx < 6 && ady < 6) return;
      d.axis = adx > ady ? 1 : -1;
      if (d.axis === 1) setGrabbing(true);
    }
    if (d.axis !== 1) return;             // vertical → hand the gesture back to the scroller
    if (e.cancelable) e.preventDefault();
    const dx = e.clientX - d.lx, dy = e.clientY - d.ly;
    d.lx = e.clientX; d.ly = e.clientY;
    d.ry += dx * 0.006;
    if (!compact) d.rx += dy * 0.004;    // vertical tilt only on desktop
    d.vy = dx * 0.006;
  };
  const onUp = () => { const d = drag.current; d.down = false; d.axis = compact ? 0 : 1; setGrabbing(false); };

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      onPointerDown={dragOff ? undefined : onDown}
      onPointerMove={dragOff ? undefined : onMove}
      onPointerUp={dragOff ? undefined : onUp}
      onPointerCancel={dragOff ? undefined : onUp}
      onPointerLeave={dragOff ? undefined : onUp}
      style={{ position: "absolute", inset: 0, pointerEvents: dragOff ? "none" : "auto", cursor: dragOff ? "default" : grabbing ? "grabbing" : "grab", touchAction: dragOff ? "auto" : "pan-y" }}
    >
      <Canvas
        dpr={reduced ? 1 : [1, 2]}
        frameloop={frameloop}
        camera={{ position: compact ? [0, -0.5, 4.35] : [0, -0.5, 4.55], fov: 36 }}
        gl={{ antialias: false, alpha: true, stencil: false, powerPreference: "high-performance" }}
        style={{ position: "absolute", inset: 0 }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
        onCreated={({ gl, invalidate }) => { gl.setClearColor(0x000000, 0); armContextRecovery(gl, invalidate); }}
      >
        <Scene reduced={reduced} drag={drag} compact={compact} />
      </Canvas>
      {/* Vignette so the 3D melts into the navy hero band — kept light in the
          south so the Talamanca relief (the sculpted payoff) stays readable */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(140% 105% at 32% 22%, transparent 44%, rgba(10,31,63,0.30) 74%, rgba(4,12,28,0.58) 100%)" }} />
    </div>
  );
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
