"use client";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { animate } from "animejs";
import { AdditiveBlending, CanvasTexture, CatmullRomCurve3, Color, DoubleSide, EdgesGeometry, ExtrudeGeometry, MathUtils, QuadraticBezierCurve3, Shape, TubeGeometry, Vector3 } from "three";
const THREE = { AdditiveBlending, CanvasTexture, CatmullRomCurve3, Color, DoubleSide, EdgesGeometry, ExtrudeGeometry, MathUtils, QuadraticBezierCurve3, Shape, TubeGeometry, Vector3 };
import { CR_OUTLINE_GEO, CR_BBOX, PLANTS_GEO } from "./crGeo";
import { EN_ACCENT } from "../energiaData";

/* ═══════════════════════════════════════════════════════════════
   ENERGÍA — Hero3D (cinematic edition v2)
   Extruded Costa Rica in deep navy with a turquoise rim-glow over a
   luminous stage disc in a fogged void; energy streams along glowing
   tube-arcs into the GAM load core with REAL bloom; pulsing nodes,
   twin parallax particle layers. anime.js drives the intro build-on
   (country rises + assembles, nodes pop staggered); pointer-drag
   rotates the globe with inertia + spring-back. Float + auto-rotate +
   eased pointer parallax. Honours prefers-reduced-motion (one static
   lit frame) and pauses when hidden. Lazy (ssr:false), SSR-guarded.
   ═══════════════════════════════════════════════════════════════ */

/* ── Palette (harmonised with EN_ACCENT) ── */
const NAVY = EN_ACCENT.navy;            // #0A1F3F
const TURQ = EN_ACCENT.turquoise;       // #00B5A8
const GLOW = EN_ACCENT.glow;            // #22d3ee
const GOLD = EN_ACCENT.gold;            // #F2B135
const DEEP = "#0e2a52";                 // landmass body

/* Kind palette — every kind a distinguishable hue (incl. for colour-blind
   readers): hydro cyan · geo gold · wind emerald · solar orange · thermal red.
   wind moved off turquoise so plant nodes don't blend into the turquoise
   chrome; solar moved off amber so it no longer twins with geo's gold. */
const KIND = {
  hydro: GLOW, geo: GOLD, wind: EN_ACCENT.green, solar: EN_ACCENT.solar,
  thermal: EN_ACCENT.risk, load: "#ffffff",
};

/* ── Geo → scene projection (centered, aspect-corrected) ── */
const cLng = (CR_BBOX.lngMin + CR_BBOX.lngMax) / 2;
const cLat = (CR_BBOX.latMin + CR_BBOX.latMax) / 2;
const K = Math.cos((cLat * Math.PI) / 180);
const SCALE = 1.42;
const px = (lng) => (lng - cLng) * K * SCALE;
const py = (lat) => (lat - cLat) * SCALE;

const Z_TOP = 0.205;   // node / ring plane on the country's lit face
const DEPTH = 0.27;    // extrusion depth (chunkier so the 3D reads on mobile)
const BASE_TILT = -0.52; // resting pitch — shows the extruded thickness
const BASE_YAW = 0.17;   // resting 3/4 yaw — reveals depth instead of a flat face
const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);

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

/* ── Radial-gradient texture for the stage glow (SSR-safe) ── */
function makeGlowTexture() {
  if (typeof document === "undefined") return null;
  const s = 256;
  const cv = document.createElement("canvas");
  cv.width = cv.height = s;
  const ctx = cv.getContext("2d");
  if (!ctx) return null;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0.0, "rgba(34,211,238,0.55)");
  g.addColorStop(0.35, "rgba(0,181,168,0.30)");
  g.addColorStop(0.7, "rgba(10,31,63,0.10)");
  g.addColorStop(1.0, "rgba(10,31,63,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(cv);
  tex.needsUpdate = true;
  return tex;
}

/* ── Point-in-polygon (ray cast) against the CR outline, in scene coords ── */
const OUTLINE_XY = CR_OUTLINE_GEO.map(([lng, lat]) => [px(lng), py(lat)]);
function insideCR(x, y) {
  let inside = false;
  for (let i = 0, j = OUTLINE_XY.length - 1; i < OUTLINE_XY.length; j = i++) {
    const [xi, yi] = OUTLINE_XY[i], [xj, yj] = OUTLINE_XY[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/* ── Extruded country + rim-glow halo + doubled lit edge ── */
function CountryMesh() {
  const { body, halo, edges } = useMemo(() => {
    const shape = new THREE.Shape();
    CR_OUTLINE_GEO.forEach(([lng, lat], i) => {
      const x = px(lng), y = py(lat);
      if (i === 0) shape.moveTo(x, y); else shape.lineTo(x, y);
    });
    shape.closePath();
    const body = new THREE.ExtrudeGeometry(shape, {
      depth: DEPTH, bevelEnabled: true, bevelThickness: 0.022, bevelSize: 0.016, bevelSegments: 2,
    });
    const halo = new THREE.ExtrudeGeometry(shape, {
      depth: DEPTH * 0.6, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.08, bevelSegments: 1,
    });
    const edges = new THREE.EdgesGeometry(body, 22);
    return { body, halo, edges };
  }, []);

  return (
    <group>
      <mesh geometry={halo} position={[0, 0, -0.06]} scale={[1.035, 1.035, 1]}>
        <meshBasicMaterial color={TURQ} transparent opacity={0.14} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </mesh>
      {/* Device-verified: the grain roughnessMap rendered as diagonal streaks on
          extrude UVs (read as scratches on real hardware) — removed. */}
      <mesh geometry={body} castShadow receiveShadow>
        <meshStandardMaterial color="#123258" metalness={0.34} roughness={0.46} emissive={TURQ} emissiveIntensity={0.15} />
      </mesh>
      {/* doubled coast: crisp cyan line + soft wide turquoise underglow */}
      <lineSegments geometry={edges} position={[0, 0, DEPTH + 0.022]}>
        <lineBasicMaterial color={GLOW} transparent opacity={0.95} toneMapped={false} />
      </lineSegments>
      <lineSegments geometry={edges} position={[0, 0, DEPTH + 0.016]} scale={[1.006, 1.006, 1]}>
        <lineBasicMaterial color={TURQ} transparent opacity={0.35} toneMapped={false} />
      </lineSegments>
    </group>
  );
}

/* ── City-lights field — warm emissive dots scattered inside the country,
      denser around the GAM load core. ONE Points draw call. ── */
function CityLights({ paused, intro, compact }) {
  const ref = useRef();
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
    const warm = new THREE.Color("#ffe3b0");
    const cool = new THREE.Color(GLOW);
    pts.forEach(([x, y], i) => {
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Z_TOP + 0.004;
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
      <pointsMaterial vertexColors size={0.058} transparent opacity={0} sizeAttenuation depthWrite={false} toneMapped={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

/* ── SIEPAC spine — the gold transmission backbone crossing the country
      (schematic route: NI border → Cañas → GAM → PA border) with one
      traveling gold packet. Ties the hero to the section's core motif. ── */
function SiepacSpine({ paused, intro }) {
  const tubeRef = useRef();
  const packetRef = useRef();
  const scratch = useMemo(() => new THREE.Vector3(), []);
  const { tube, curve } = useMemo(() => {
    const gam = PLANTS_GEO.find((p) => p.kind === "load");
    const way = [
      [-85.62, 11.02], [-85.09, 10.43], [-84.72, 10.12],
      [gam.lng, gam.lat], [-83.86, 9.52], [-83.28, 9.05], [-82.78, 8.92],
    ].map(([lng, lat]) => new THREE.Vector3(px(lng), py(lat), Z_TOP + 0.012));
    const curve = new THREE.CatmullRomCurve3(way, false, "catmullrom", 0.35);
    // Device-verified: 0.011 radius was sub-pixel on phones — doubled.
    const tube = new THREE.TubeGeometry(curve, 72, 0.02, 8, false);
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

/* ── Orbital stage ring — thin additive halo circling the country ── */
function HorizonRing({ paused }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (paused.current || !ref.current) return;
    ref.current.rotation.z = clock.elapsedTime * 0.05;
    ref.current.material.opacity = 0.16 + Math.sin(clock.elapsedTime * 0.6) * 0.05;
  });
  return (
    <mesh ref={ref} position={[0, -0.15, -0.03]}>
      <ringGeometry args={[2.06, 2.085, 128]} />
      <meshBasicMaterial color={TURQ} transparent opacity={0.18} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

/* ── Stage glow disc beneath the country ── */
function StageGlow() {
  const tex = useMemo(makeGlowTexture, []);
  if (!tex) return null;
  return (
    <mesh position={[0.9, -0.1, -0.6]}>
      <planeGeometry args={[8.2, 6.4]} />
      <meshBasicMaterial map={tex} transparent opacity={0.45} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

/* ── Glowing plant nodes + pulsing rings (intro-staggered pop-in) ── */
function PlantNodes({ paused, intro }) {
  const sphereGrp = useRef();
  const ringGrp = useRef();
  const nodes = useMemo(() => PLANTS_GEO.map((p, i) => ({
    ...p, x: px(p.lng), y: py(p.lat), phase: i * 0.85,
    isLoad: p.kind === "load", c: new THREE.Color(KIND[p.kind] || "#ffffff"),
  })), []);

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
          <mesh key={n.id} position={[n.x, n.y, Z_TOP]} scale={0.001}>
            <sphereGeometry args={[n.isLoad ? 0.052 : 0.038, 16, 16]} />
            <meshStandardMaterial color={n.c} emissive={n.c} emissiveIntensity={n.isLoad ? 3.0 : 2.4} toneMapped={false} />
          </mesh>
        ))}
      </group>
      <group ref={ringGrp}>
        {nodes.map((n) => (
          <mesh key={n.id} position={[n.x, n.y, Z_TOP + 0.002]}>
            <ringGeometry args={[n.isLoad ? 0.075 : 0.055, n.isLoad ? 0.092 : 0.068, 40]} />
            <meshBasicMaterial color={n.isLoad ? "#ffffff" : n.c} transparent opacity={0.4} side={THREE.DoubleSide} depthWrite={false} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ── Energy tube-arcs + traveling glow packets (intro-drawn) ── */
function EnergyArcs({ paused, intro }) {
  const tubeGrp = useRef();
  const packetGrp = useRef();
  const scratch = useMemo(() => new THREE.Vector3(), []);
  const arcs = useMemo(() => {
    const gam = PLANTS_GEO.find((p) => p.kind === "load");
    const gx = px(gam.lng), gy = py(gam.lat);
    return PLANTS_GEO.filter((p) => p.kind !== "load" && !p.inGam).map((p, i) => {
      const x = px(p.lng), y = py(p.lat);
      const dist = Math.hypot(gx - x, gy - y);
      const lift = 0.42 + dist * 0.28 + (i % 3) * 0.08;
      const mid = new THREE.Vector3((x + gx) / 2, (y + gy) / 2, Z_TOP + lift);
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(x, y, Z_TOP), mid, new THREE.Vector3(gx, gy, Z_TOP));
      const tube = new THREE.TubeGeometry(curve, 48, 0.013, 8, false);
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
    if (tubes) for (let i = 0; i < tubes.children.length; i++) tubes.children[i].material.opacity = 0.5 * draw;
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
          <group key={a.key} position={[0, 0, Z_TOP]}>
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
      <pointsMaterial color={color} size={size} transparent opacity={opacity} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ── Scene root: intro build-on + float + auto-rotate + pointer parallax + drag ── */
function Scene({ reduced, drag, compact = false }) {
  const group = useRef();
  const paused = useRef(false);
  const hidden = useRef(false);
  const intro = useRef({ p: reduced ? 1 : 0 });
  const invalidate = useThree((s) => s.invalidate);
  const aim = useRef({ x: 0, y: 0 });

  // portrait/banner tuning: country centered + slightly smaller so it never clips
  const POS_X = compact ? 0 : 0.95;
  const BASE_SCALE = compact ? 0.78 : 0.9;

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
      if (group.current) { group.current.rotation.set(BASE_TILT, BASE_YAW, 0.1); group.current.position.set(POS_X, -0.05, 0); group.current.scale.setScalar(BASE_SCALE); }
      invalidate();
      return;
    }
    intro.current.p = 0;
    const anim = animate(intro.current, { p: [0, 1], duration: 1900, delay: 150, ease: "outCubic" });
    return () => { try { anim.pause(); } catch {} };
  }, [reduced, invalidate]);

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
    group.current.rotation.x = BASE_TILT + (Math.sin(t * 0.25) * 0.03 + aim.current.y * 0.7) * float + d.rx;
    group.current.rotation.y = BASE_YAW + (Math.sin(t * 0.21) * 0.05 + aim.current.x) * float + d.ry;
    group.current.rotation.z = 0.1 + Math.sin(t * 0.18) * 0.02 * float;
    group.current.position.x = POS_X;
    group.current.position.y = -0.05 + (1 - ip) * -1.0 + Math.sin(t * 0.4) * 0.045 * float;
    group.current.scale.setScalar(BASE_SCALE * (0.5 + 0.5 * ip));
  });

  return (
    <>
      <fogExp2 attach="fog" args={[NAVY, 0.085]} />
      <ambientLight intensity={0.42} />
      <directionalLight position={[3, 4.5, 6]} intensity={1.15} color="#dcefff" />
      <directionalLight position={[-3.5, 2, -4.5]} intensity={0.5} color="#7ee7f0" />
      <pointLight position={[0, -2.6, 2.2]} intensity={1.6} color={TURQ} distance={9} />
      <pointLight position={[2.4, 2.0, 3]} intensity={0.9} color={GOLD} distance={8} />

      <ParticleLayer paused={paused} count={compact ? 100 : 140} spread={11} depth={-3.4} size={0.03} opacity={0.42} color={GLOW} speed={0.008} />
      <ParticleLayer paused={paused} count={compact ? 150 : 220} spread={9} depth={-1.6} size={0.018} opacity={0.5} color={TURQ} speed={0.016} />
      <ParticleLayer paused={paused} count={compact ? 30 : 46} spread={12} depth={-2.6} size={0.045} opacity={0.22} color={GOLD} speed={-0.006} />
      <StageGlow />

      <group ref={group} scale={0.001}>
        <CountryMesh />
        <CityLights paused={paused} intro={intro} compact={compact} />
        <SiepacSpine paused={paused} intro={intro} />
        <HorizonRing paused={paused} />
        <PlantNodes paused={paused} intro={intro} />
        <EnergyArcs paused={paused} intro={intro} />
      </group>

      {/* Real cinematic bloom — only bright emissive (nodes/arcs/packets) blooms,
          not the navy country. Mobile keeps it (so the hero reads as ONE visual
          family, not a downgrade) but cheaper: higher threshold → fewer pixels
          bloom, lower intensity/radius. mipmapBlur is resolution-independent, so
          the cost stays modest. Off entirely under reduced-motion. */}
      {!reduced && (
        <EffectComposer disableNormalPass>
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
        frameloop={reduced ? "demand" : "always"}
        camera={{ position: [0, -0.4, compact ? 5.2 : 4.6], fov: 42 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ position: "absolute", inset: 0 }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <Scene reduced={reduced} drag={drag} compact={compact} />
      </Canvas>
      {/* Vignette so the 3D melts into the navy hero band */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(135% 100% at 32% 18%, transparent 38%, rgba(10,31,63,0.45) 72%, rgba(4,12,28,0.78) 100%)" }} />
    </div>
  );
}
