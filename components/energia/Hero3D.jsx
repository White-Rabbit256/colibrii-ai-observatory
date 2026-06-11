"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CR_OUTLINE_GEO, CR_BBOX, PLANTS_GEO } from "./crGeo";

/* ═══════════════════════════════════════════════════════════════
   ENERGÍA — Hero3D
   Real three.js hero: extruded Costa Rica (accurate Natural Earth
   geometry) floating in a navy void, plant nodes glowing by source,
   animated energy arcs feeding the GAM load centre, particle field,
   pointer parallax. Lazy-mounted (ssr:false); EnergiaDeep falls back
   to the 2D GridHero on mobile / prefers-reduced-motion.
   ═══════════════════════════════════════════════════════════════ */

const KIND = {
  hydro: "#22d3ee",
  geo: "#F2B135",
  wind: "#00B5A8",
  solar: "#fbbf24",
  thermal: "#ef4444",
  load: "#ffffff",
};

/* ── Geo → scene projection (centered, aspect-corrected) ── */
const cLng = (CR_BBOX.lngMin + CR_BBOX.lngMax) / 2;
const cLat = (CR_BBOX.latMin + CR_BBOX.latMax) / 2;
const K = Math.cos((cLat * Math.PI) / 180);
const SCALE = 1.42;
const px = (lng) => (lng - cLng) * K * SCALE;
const py = (lat) => (lat - cLat) * SCALE;

function CountryMesh() {
  const { geom, edges } = useMemo(() => {
    const shape = new THREE.Shape();
    CR_OUTLINE_GEO.forEach(([lng, lat], i) => {
      const x = px(lng), y = py(lat);
      if (i === 0) shape.moveTo(x, y); else shape.lineTo(x, y);
    });
    shape.closePath();
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: 0.16, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.015, bevelSegments: 2,
    });
    const edges = new THREE.EdgesGeometry(geom, 18);
    return { geom, edges };
  }, []);
  return (
    <group>
      <mesh geometry={geom} castShadow receiveShadow>
        <meshStandardMaterial color="#0e2a52" metalness={0.35} roughness={0.45} emissive="#06302e" emissiveIntensity={0.55} />
      </mesh>
      <lineSegments geometry={edges} position={[0, 0, 0.165]}>
        <lineBasicMaterial color="#00B5A8" transparent opacity={0.9} />
      </lineSegments>
    </group>
  );
}

/* ── Glowing plant nodes ── */
function PlantNodes() {
  const ref = useRef();
  const nodes = useMemo(() => PLANTS_GEO.map((p, i) => ({
    ...p, x: px(p.lng), y: py(p.lat), phase: i * 0.85, c: new THREE.Color(KIND[p.kind] || "#fff"),
  })), []);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.children.forEach((m, i) => {
      const n = nodes[i];
      const s = 1 + Math.sin(t * 2 + n.phase) * 0.25;
      m.scale.setScalar(n.kind === "load" ? s * 1.25 : s);
    });
  });
  return (
    <group ref={ref}>
      {nodes.map((n) => (
        <mesh key={n.id} position={[n.x, n.y, 0.22]}>
          <sphereGeometry args={[n.kind === "load" ? 0.05 : 0.038, 16, 16]} />
          <meshStandardMaterial color={n.c} emissive={n.c} emissiveIntensity={2.2} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Animated energy arcs: every plant feeds the GAM ── */
function EnergyArcs() {
  const matRefs = useRef([]);
  const arcs = useMemo(() => {
    const gam = PLANTS_GEO.find((p) => p.kind === "load");
    const gx = px(gam.lng), gy = py(gam.lat);
    return PLANTS_GEO.filter((p) => p.kind !== "load").map((p, i) => {
      const x = px(p.lng), y = py(p.lat);
      const mid = new THREE.Vector3((x + gx) / 2, (y + gy) / 2, 0.55 + (i % 3) * 0.12);
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(x, y, 0.22), mid, new THREE.Vector3(gx, gy, 0.22)
      );
      const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(48));
      return { geo, color: KIND[p.kind] || "#22d3ee", key: p.id };
    });
  }, []);
  useFrame(({ clock }) => {
    matRefs.current.forEach((m, i) => {
      if (m) m.dashOffset = -clock.elapsedTime * (0.5 + (i % 3) * 0.12);
    });
  });
  return (
    <group>
      {arcs.map((a, i) => (
        <line key={a.key} geometry={a.geo} onUpdate={(l) => l.computeLineDistances()}>
          <lineDashedMaterial
            ref={(el) => (matRefs.current[i] = el)}
            color={a.color} transparent opacity={0.55}
            dashSize={0.09} gapSize={0.14} toneMapped={false}
          />
        </line>
      ))}
    </group>
  );
}

/* ── Ambient particle field ── */
function Particles({ count = 320 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = -1.2 - Math.random() * 3.5;
    }
    return arr;
  }, [count]);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = clock.elapsedTime * 0.012;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#22d3ee" size={0.018} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

/* ── Scene root: slow float + pointer parallax ── */
function Scene() {
  const group = useRef();
  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.rotation.x = -0.42 + Math.sin(t * 0.25) * 0.03 + pointer.y * 0.06;
    group.current.rotation.z = 0.10 + Math.sin(t * 0.18) * 0.02;
    group.current.rotation.y = Math.sin(t * 0.21) * 0.05 + pointer.x * 0.10;
    group.current.position.y = Math.sin(t * 0.4) * 0.04;
  });
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 4, 6]} intensity={1.1} color="#cde9ff" />
      <pointLight position={[0, -2.4, 2]} intensity={1.4} color="#00B5A8" distance={9} />
      <pointLight position={[2.2, 1.8, 3]} intensity={0.8} color="#F2B135" distance={8} />
      <group ref={group}>
        <CountryMesh />
        <PlantNodes />
        <EnergyArcs />
      </group>
      <Particles />
    </>
  );
}

export default function Hero3D() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, -0.4, 4.6], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ position: "absolute", inset: 0 }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
      >
        <Scene />
      </Canvas>
      {/* Vignette + depth glow so the 3D sits inside the navy band */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 30% 20%, transparent 40%, rgba(4,12,28,0.55) 100%)" }} />
    </div>
  );
}
