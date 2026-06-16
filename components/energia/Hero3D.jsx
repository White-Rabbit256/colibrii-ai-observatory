"use client";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CR_OUTLINE_GEO, CR_BBOX, PLANTS_GEO } from "./crGeo";
import { EN_ACCENT } from "../energiaData";

/* ═══════════════════════════════════════════════════════════════
   ENERGÍA — Hero3D (cinematic command-center edition)
   Extruded Costa Rica in deep navy with a turquoise rim-glow
   silhouette over a luminous stage disc in a fogged void; energy
   streams along glowing tube-arcs from every plant into the GAM
   load core, pulsing rings mark each node, twin parallax particle
   layers add depth. Float + auto-rotate + eased pointer parallax.
   Honours prefers-reduced-motion (one static lit frame) and pauses
   when hidden. Lazy (ssr:false); guards all window/document use.
   ═══════════════════════════════════════════════════════════════ */

/* ── Palette (harmonised with EN_ACCENT) ── */
const NAVY = EN_ACCENT.navy;            // #0A1F3F
const TURQ = EN_ACCENT.turquoise;       // #00B5A8
const GLOW = EN_ACCENT.glow;            // #22d3ee
const GOLD = EN_ACCENT.gold;            // #F2B135
const DEEP = "#0e2a52";                 // landmass body

const KIND = {
  hydro: GLOW,
  geo: GOLD,
  wind: TURQ,
  solar: "#fbbf24",
  thermal: EN_ACCENT.risk,
  load: "#ffffff",
};

/* ── Geo → scene projection (centered, aspect-corrected) ── */
const cLng = (CR_BBOX.lngMin + CR_BBOX.lngMax) / 2;
const cLat = (CR_BBOX.latMin + CR_BBOX.latMax) / 2;
const K = Math.cos((cLat * Math.PI) / 180);
const SCALE = 1.42;
const px = (lng) => (lng - cLng) * K * SCALE;
const py = (lat) => (lat - cLat) * SCALE;

const Z_MAP = 0.0;     // map plane (top of extrusion sits a hair above)
const Z_TOP = 0.205;   // node / ring plane on the country's lit face
const DEPTH = 0.18;    // extrusion depth

/* ── prefers-reduced-motion (SSR-safe) ── */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(!!mq.matches);
    apply();
    mq.addEventListener ? mq.addEventListener("change", apply)
                        : mq.addListener(apply);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", apply)
                            : mq.removeListener(apply);
    };
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

/* ── Extruded country + rim-glow halo + lit top edge ── */
function CountryMesh() {
  const { body, halo, edges } = useMemo(() => {
    const shape = new THREE.Shape();
    CR_OUTLINE_GEO.forEach(([lng, lat], i) => {
      const x = px(lng), y = py(lat);
      if (i === 0) shape.moveTo(x, y); else shape.lineTo(x, y);
    });
    shape.closePath();
    const body = new THREE.ExtrudeGeometry(shape, {
      depth: DEPTH, bevelEnabled: true,
      bevelThickness: 0.022, bevelSize: 0.016, bevelSegments: 2,
    });
    // Slightly inflated silhouette for the rim glow behind the body.
    const halo = new THREE.ExtrudeGeometry(shape, {
      depth: DEPTH * 0.6, bevelEnabled: true,
      bevelThickness: 0.05, bevelSize: 0.08, bevelSegments: 1,
    });
    const edges = new THREE.EdgesGeometry(body, 22);
    return { body, halo, edges };
  }, []);

  return (
    <group>
      {/* Rim-glow silhouette (additive, behind & beneath the body) */}
      <mesh geometry={halo} position={[0, 0, -0.06]} scale={[1.035, 1.035, 1]}>
        <meshBasicMaterial
          color={TURQ} transparent opacity={0.14}
          blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false}
        />
      </mesh>
      {/* The landmass body */}
      <mesh geometry={body} castShadow receiveShadow>
        <meshStandardMaterial
          color={DEEP} metalness={0.42} roughness={0.4}
          emissive={TURQ} emissiveIntensity={0.34}
        />
      </mesh>
      {/* Bright beveled top edge */}
      <lineSegments geometry={edges} position={[0, 0, DEPTH + 0.022]}>
        <lineBasicMaterial color={GLOW} transparent opacity={0.92} toneMapped={false} />
      </lineSegments>
    </group>
  );
}

/* ── Stage glow disc beneath the country ── */
function StageGlow() {
  const tex = useMemo(makeGlowTexture, []);
  if (!tex) return null;
  return (
    <mesh position={[0.1, -0.15, -0.55]} rotation={[0, 0, 0]}>
      <planeGeometry args={[8.2, 6.4]} />
      <meshBasicMaterial
        map={tex} transparent opacity={0.85}
        blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false}
      />
    </mesh>
  );
}

/* ── Glowing plant nodes + pulsing rings ── */
function PlantNodes({ paused }) {
  const sphereGrp = useRef();
  const ringGrp = useRef();
  const nodes = useMemo(() => PLANTS_GEO.map((p, i) => ({
    ...p,
    x: px(p.lng), y: py(p.lat),
    phase: i * 0.85,
    isLoad: p.kind === "load",
    c: new THREE.Color(KIND[p.kind] || "#ffffff"),
  })), []);

  useFrame(({ clock }) => {
    if (paused.current) return;
    const t = clock.elapsedTime;
    const spheres = sphereGrp.current;
    const rings = ringGrp.current;
    if (spheres) {
      for (let i = 0; i < spheres.children.length; i++) {
        const n = nodes[i];
        const s = 1 + Math.sin(t * 2 + n.phase) * 0.22;
        spheres.children[i].scale.setScalar(n.isLoad ? s * 1.2 : s);
      }
    }
    if (rings) {
      for (let i = 0; i < rings.children.length; i++) {
        const n = nodes[i];
        const m = rings.children[i];
        if (n.isLoad) {
          // GAM: larger expanding-and-fading pulse
          const cyc = (t * 0.7 + 0.0) % 1;
          const sc = 1 + cyc * 3.4;
          m.scale.set(sc, sc, sc);
          m.material.opacity = (1 - cyc) * 0.7;
        } else {
          const sc = 1 + (Math.sin(t * 2.2 + n.phase) * 0.5 + 0.5) * 0.9;
          m.scale.set(sc, sc, sc);
          m.material.opacity = 0.28 + Math.sin(t * 2.2 + n.phase) * 0.18;
        }
      }
    }
  });

  return (
    <group>
      <group ref={sphereGrp}>
        {nodes.map((n) => (
          <mesh key={n.id} position={[n.x, n.y, Z_TOP]}>
            <sphereGeometry args={[n.isLoad ? 0.052 : 0.038, 16, 16]} />
            <meshStandardMaterial
              color={n.c} emissive={n.c}
              emissiveIntensity={n.isLoad ? 3.0 : 2.4} toneMapped={false}
            />
          </mesh>
        ))}
      </group>
      <group ref={ringGrp}>
        {nodes.map((n) => (
          <mesh key={n.id} position={[n.x, n.y, Z_TOP + 0.002]}>
            <ringGeometry args={[n.isLoad ? 0.075 : 0.055, n.isLoad ? 0.092 : 0.068, 40]} />
            <meshBasicMaterial
              color={n.isLoad ? "#ffffff" : n.c} transparent opacity={0.4}
              side={THREE.DoubleSide} depthWrite={false} toneMapped={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ── Energy tube-arcs + traveling glow packets (plant → GAM) ── */
function EnergyArcs({ paused }) {
  const packetGrp = useRef();
  const scratch = useMemo(() => new THREE.Vector3(), []);
  const arcs = useMemo(() => {
    const gam = PLANTS_GEO.find((p) => p.kind === "load");
    const gx = px(gam.lng), gy = py(gam.lat);
    return PLANTS_GEO.filter((p) => p.kind !== "load").map((p, i) => {
      const x = px(p.lng), y = py(p.lat);
      const dist = Math.hypot(gx - x, gy - y);
      const lift = 0.42 + dist * 0.28 + (i % 3) * 0.08;
      const mid = new THREE.Vector3((x + gx) / 2, (y + gy) / 2, Z_TOP + lift);
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(x, y, Z_TOP),
        mid,
        new THREE.Vector3(gx, gy, Z_TOP)
      );
      const tube = new THREE.TubeGeometry(curve, 44, 0.012, 8, false);
      return {
        key: p.id,
        tube,
        curve,
        color: new THREE.Color(KIND[p.kind] || GLOW),
        speed: 0.18 + (i % 4) * 0.035,
        offset: (i * 0.137) % 1,
      };
    });
  }, []);

  useFrame(({ clock }) => {
    if (paused.current) return;
    const t = clock.elapsedTime;
    const grp = packetGrp.current;
    if (!grp) return;
    for (let i = 0; i < arcs.length; i++) {
      const a = arcs[i];
      const tt = (t * a.speed + a.offset) % 1;
      a.curve.getPointAt(tt, scratch);
      const m = grp.children[i];
      m.position.copy(scratch);
      // brighten as the packet nears the capital
      m.scale.setScalar(0.7 + tt * 0.8);
    }
  });

  return (
    <group>
      {arcs.map((a) => (
        <mesh key={a.key} geometry={a.tube}>
          <meshStandardMaterial
            color={a.color} emissive={a.color} emissiveIntensity={1.1}
            transparent opacity={0.5} toneMapped={false}
            depthWrite={false}
          />
        </mesh>
      ))}
      <group ref={packetGrp}>
        {arcs.map((a) => (
          <mesh key={a.key} position={[0, 0, Z_TOP]}>
            <sphereGeometry args={[0.026, 12, 12]} />
            <meshBasicMaterial color={a.color} toneMapped={false} />
          </mesh>
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
  useFrame(({ clock }) => {
    if (paused.current) return;
    if (ref.current) ref.current.rotation.z = clock.elapsedTime * speed;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color={color} size={size} transparent opacity={opacity}
        sizeAttenuation depthWrite={false}
      />
    </points>
  );
}

/* ── Scene root: float + auto-rotate + eased pointer parallax ── */
function Scene({ reduced }) {
  const group = useRef();
  const paused = useRef(false);
  const hidden = useRef(false);
  const invalidate = useThree((s) => s.invalidate);

  // Eased pointer targets (no per-frame allocation; capped amplitude).
  const aim = useRef({ x: 0, y: 0 });

  useEffect(() => {
    paused.current = reduced;
    if (typeof document === "undefined") return;
    const onVis = () => {
      hidden.current = document.hidden;
      if (!document.hidden && !reduced) invalidate();
    };
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [reduced, invalidate]);

  // Render exactly one lit, motionless frame when reduced-motion is on.
  useEffect(() => {
    if (reduced) {
      if (group.current) {
        group.current.rotation.set(-0.42, 0.0, 0.1);
        group.current.position.set(0, 0, 0);
      }
      invalidate();
    }
  }, [reduced, invalidate]);

  const CAP = 0.09; // hard cap on pointer-driven rotation (rad)

  useFrame(({ clock, pointer }) => {
    if (paused.current || hidden.current || !group.current) return;
    const t = clock.elapsedTime;
    // ease toward capped pointer target
    aim.current.x += (THREE.MathUtils.clamp(pointer.x, -1, 1) * CAP - aim.current.x) * 0.045;
    aim.current.y += (THREE.MathUtils.clamp(pointer.y, -1, 1) * CAP - aim.current.y) * 0.045;
    group.current.rotation.x = -0.42 + Math.sin(t * 0.25) * 0.03 + aim.current.y * 0.7;
    group.current.rotation.y = Math.sin(t * 0.21) * 0.05 + aim.current.x;
    group.current.rotation.z = 0.1 + Math.sin(t * 0.18) * 0.02;
    group.current.position.y = Math.sin(t * 0.4) * 0.045;
  });

  return (
    <>
      <fogExp2 attach="fog" args={[NAVY, 0.085]} />
      {/* key + rim + accents for dramatic edge separation */}
      <ambientLight intensity={0.42} />
      <directionalLight position={[3, 4.5, 6]} intensity={1.15} color="#dcefff" />
      <directionalLight position={[-3.5, 2, -4.5]} intensity={0.7} color="#7ee7f0" />
      <pointLight position={[0, -2.6, 2.2]} intensity={1.6} color={TURQ} distance={9} />
      <pointLight position={[2.4, 2.0, 3]} intensity={0.9} color={GOLD} distance={8} />

      <ParticleLayer paused={paused} count={140} spread={11} depth={-3.4} size={0.03} opacity={0.42} color={GLOW} speed={0.008} />
      <ParticleLayer paused={paused} count={220} spread={9} depth={-1.6} size={0.018} opacity={0.5} color={TURQ} speed={0.016} />
      <StageGlow />

      <group ref={group}>
        <CountryMesh />
        <PlantNodes paused={paused} />
        <EnergyArcs paused={paused} />
      </group>
    </>
  );
}

export default function Hero3D() {
  const reduced = useReducedMotion();
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <Canvas
        dpr={[1, 2]}
        frameloop={reduced ? "demand" : "always"}
        camera={{ position: [0, -0.4, 4.6], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ position: "absolute", inset: 0 }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <Scene reduced={reduced} />
      </Canvas>
      {/* Vignette + depth glow so the 3D melts into the navy hero band */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background:
            "radial-gradient(135% 100% at 32% 18%, transparent 38%, rgba(10,31,63,0.45) 72%, rgba(4,12,28,0.78) 100%)",
        }}
      />
    </div>
  );
}
