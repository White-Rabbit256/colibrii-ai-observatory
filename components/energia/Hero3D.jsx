"use client";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { CR_OUTLINE_GEO, CR_BBOX, PLANTS_GEO } from "./crGeo";
import { EN_ACCENT } from "../energiaData";

/* ═══════════════════════════════════════════════════════════════
   ENERGÍA — Hero3D (holographic command-table edition)
   Extruded Costa Rica resting on a fine holo-grid table: crisp
   cyan coastline, thin low-lift energy arcs with comet packets
   converging on the GAM load core (the single gold element),
   soft contact shadow, one sparse particle layer. Framing is
   aspect-aware — top-centered stage on phones, contained right-
   side object on wide screens — and every node/arc/line size is
   computed in CSS pixels so the asset reads identically at any
   viewport. Honours prefers-reduced-motion (one static frame)
   and pauses when hidden. Lazy (ssr:false); SSR-safe.
   ═══════════════════════════════════════════════════════════════ */

/* ── Palette: navy/cyan family only; gold reserved for the GAM core ── */
const NAVY = EN_ACCENT.navy;            // #0A1F3F
const TURQ = EN_ACCENT.turquoise;       // #00B5A8
const GLOW = EN_ACCENT.glow;            // #22d3ee
const GOLD = EN_ACCENT.gold;            // #F2B135
const BODY = "#0d2547";                 // landmass body
const NODE = "#7df3ff";                 // plant nodes

/* ── Geo → scene projection (centered, aspect-corrected) ── */
const cLng = (CR_BBOX.lngMin + CR_BBOX.lngMax) / 2;
const cLat = (CR_BBOX.latMin + CR_BBOX.latMax) / 2;
const K = Math.cos((cLat * Math.PI) / 180);
const SCALE = 1.42;
const px = (lng) => (lng - cLng) * K * SCALE;
const py = (lat) => (lat - cLat) * SCALE;

const DEPTH = 0.16;            // extrusion depth
const BEVEL = 0.02;
const Z_TOP = DEPTH + BEVEL + 0.012;   // node plane on the lit face
const TILT = -0.46;            // base X rotation of the whole table
const FOV = 42;
const CAM_DIST = 4.62;

/* Country footprint in scene units (pre-scale) */
const W0 = (CR_BBOX.lngMax - CR_BBOX.lngMin) * K * SCALE;              // ≈ 4.68
const H0 = (CR_BBOX.latMax - CR_BBOX.latMin) * SCALE;                  // ≈ 4.43
const H_TILTED = H0 * Math.cos(TILT) + 0.5;  // projected height + arc headroom

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

/* ── Aspect-aware framing: scale + position of the table group.
      pxU converts a CSS-pixel target into group-local units, so
      strokes/nodes keep a constant on-screen size everywhere. ── */
function useFraming() {
  const size = useThree((s) => s.size);
  return useMemo(() => {
    const h = Math.max(1, size.height);
    const visH = 2 * Math.tan((FOV * Math.PI) / 360) * CAM_DIST;
    const visW = visH * (size.width / h);
    const u = visH / h; // scene units per CSS px
    const compact = size.width <= 720;
    let s, x, y;
    if (compact) {
      // Phones / narrow: country top-centered in its own stage band.
      const wPx = Math.min(size.width * 0.9, 560);
      s = (wPx * u) / W0;
      x = 0;
      y = visH / 2 - 52 * u - (H_TILTED * s) / 2;
    } else {
      // Wide: contained object on the right of the text column.
      s = Math.min(0.85, (visW * 0.54) / W0, (visH * 0.9) / H_TILTED);
      // 1.06: headroom for the z-sway + perspective widening the footprint
      x = Math.min(visW * 0.21, visW / 2 - (W0 * 1.06 * s) / 2 - 56 * u);
      y = -0.05;
    }
    // Mild size factor so nodes/arcs grow a little with the rendered map
    const em = THREE.MathUtils.clamp((W0 * s) / u / 620, 1, 1.5);
    return { s, x, y, pxU: (u / s) * em, visW, visH, u };
  }, [size.width, size.height]);
}

/* ── Canvas textures (SSR-safe) ── */
function makeGlowTexture() {
  if (typeof document === "undefined") return null;
  const s = 128;
  const cv = document.createElement("canvas");
  cv.width = cv.height = s;
  const ctx = cv.getContext("2d");
  if (!ctx) return null;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.5)");
  g.addColorStop(0.6, "rgba(255,255,255,0.12)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(cv);
  tex.needsUpdate = true;
  return tex;
}

/* Fine graticule fading radially — the "holo table" surface. */
function makeFloorTexture() {
  if (typeof document === "undefined") return null;
  const s = 1024;
  const cv = document.createElement("canvas");
  cv.width = cv.height = s;
  const ctx = cv.getContext("2d");
  if (!ctx) return null;
  const cell = s / 26;
  ctx.strokeStyle = "rgba(103,232,249,0.55)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 26; i++) {
    const p = Math.round(i * cell) + 0.5;
    ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, s); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(s, p); ctx.stroke();
  }
  // soft center lift so the table has a light source
  const lift = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s * 0.42);
  lift.addColorStop(0, "rgba(34,211,238,0.30)");
  lift.addColorStop(1, "rgba(34,211,238,0)");
  ctx.fillStyle = lift;
  ctx.fillRect(0, 0, s, s);
  // radial alpha mask — grid dissolves toward the edges
  ctx.globalCompositeOperation = "destination-in";
  const mask = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  mask.addColorStop(0, "rgba(0,0,0,0.85)");
  mask.addColorStop(0.55, "rgba(0,0,0,0.45)");
  mask.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = mask;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(cv);
  tex.needsUpdate = true;
  return tex;
}

/* ── Holo table: graticule plane + contact shadow under the country ── */
function HoloFloor({ shadowShape }) {
  const tex = useMemo(makeFloorTexture, []);
  return (
    <group>
      {tex && (
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[9.5, 9.5]} />
          <meshBasicMaterial
            map={tex} transparent opacity={0.5}
            blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false}
          />
        </mesh>
      )}
      {/* Contact shadow: darkened silhouette grounding the landmass */}
      <mesh geometry={shadowShape} position={[0, 0, -0.045]} scale={[1.045, 1.045, 1]}>
        <meshBasicMaterial color="#04101f" transparent opacity={0.55} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ── Extruded country: navy body, crisp coastline, faint inset line ── */
function CountryMesh() {
  const { body, coast, inset, flat } = useMemo(() => {
    const shape = new THREE.Shape();
    CR_OUTLINE_GEO.forEach(([lng, lat], i) => {
      const x = px(lng), y = py(lat);
      if (i === 0) shape.moveTo(x, y); else shape.lineTo(x, y);
    });
    shape.closePath();
    const body = new THREE.ExtrudeGeometry(shape, {
      depth: DEPTH, bevelEnabled: true,
      bevelThickness: BEVEL, bevelSize: 0.014, bevelSegments: 2,
    });
    const pts = CR_OUTLINE_GEO.map(([lng, lat]) => new THREE.Vector3(px(lng), py(lat), 0));
    const coast = new THREE.BufferGeometry().setFromPoints(pts);
    const inset = new THREE.BufferGeometry().setFromPoints(
      pts.map((p) => new THREE.Vector3(p.x * 0.955, p.y * 0.955, 0))
    );
    const flat = new THREE.ShapeGeometry(shape);
    return { body, coast, inset, flat };
  }, []);

  return (
    <group>
      <HoloFloor shadowShape={flat} />
      <mesh geometry={body}>
        {/* Physical material + scene environment → polished-obsidian body */}
        <meshPhysicalMaterial
          color={BODY} metalness={0.5} roughness={0.34}
          clearcoat={0.55} clearcoatRoughness={0.3}
          envMapIntensity={0.65}
          emissive={TURQ} emissiveIntensity={0.06}
        />
      </mesh>
      {/* Crisp coastline on the lit face */}
      <lineLoop geometry={coast} position={[0, 0, DEPTH + BEVEL + 0.004]}>
        <lineBasicMaterial color={GLOW} transparent opacity={0.85} toneMapped={false} />
      </lineLoop>
      {/* Cartographic inset echo */}
      <lineLoop geometry={inset} position={[0, 0, DEPTH + BEVEL + 0.004]}>
        <lineBasicMaterial color={TURQ} transparent opacity={0.16} toneMapped={false} />
      </lineLoop>
    </group>
  );
}

/* ── Holo scan sweep gliding across the table ── */
function ScanSweep({ paused }) {
  const ref = useRef();
  const tex = useMemo(makeGlowTexture, []);
  useFrame(({ clock }) => {
    if (paused.current || !ref.current) return;
    const k = (clock.elapsedTime % 9) / 9;
    ref.current.position.y = (0.5 - k) * H0 * 1.05;
    ref.current.material.opacity = 0.13 * Math.sin(Math.PI * k);
  });
  if (!tex) return null;
  return (
    <mesh ref={ref} position={[0, 0, Z_TOP + 0.015]}>
      <planeGeometry args={[W0 * 1.12, 0.05]} />
      <meshBasicMaterial
        map={tex} color={GLOW} transparent opacity={0}
        blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false}
      />
    </mesh>
  );
}

/* ── Plant nodes (cyan) + GAM load core (the only gold element) ── */
function PlantNodes({ paused, pxU, sWorld }) {
  const ringA = useRef();
  const ringB = useRef();
  const glowTex = useMemo(makeGlowTexture, []);
  const nodes = useMemo(() => PLANTS_GEO.map((p) => ({
    ...p, x: px(p.lng), y: py(p.lat), isLoad: p.kind === "load",
  })), []);
  const gam = nodes.find((n) => n.isLoad);

  const rCore = 4.6 * pxU;   // plant dot radius ≈ 4.6px
  const rLoad = 6.8 * pxU;
  const glowW = 26 * pxU;    // additive halo sprite ≈ 26px
  const glowL = 44 * pxU;
  const ringIn = 10 * pxU, ringOut = 11.4 * pxU;

  useFrame(({ clock }) => {
    if (paused.current) return;
    const t = clock.elapsedTime;
    [ringA.current, ringB.current].forEach((m, k) => {
      if (!m) return;
      const cyc = (t * 0.42 + k * 0.5) % 1;
      const sc = 1 + cyc * 2.6;
      m.scale.set(sc, sc, 1);
      m.material.opacity = (1 - cyc) * 0.45;
    });
  });

  return (
    <group>
      {nodes.map((n) => (
        <group key={n.id} position={[n.x, n.y, Z_TOP]}>
          <mesh>
            <sphereGeometry args={[n.isLoad ? rLoad : rCore, 16, 16]} />
            <meshBasicMaterial color={n.isLoad ? GOLD : NODE} toneMapped={false} />
          </mesh>
          {glowTex && (
            <sprite scale={[n.isLoad ? glowL : glowW, n.isLoad ? glowL : glowW, 1]}>
              <spriteMaterial
                map={glowTex} color={n.isLoad ? GOLD : GLOW}
                transparent opacity={n.isLoad ? 0.55 : 0.4}
                blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false}
              />
            </sprite>
          )}
        </group>
      ))}
      {/* Warm pool of light around the load core */}
      {gam && (
        <pointLight
          position={[gam.x, gam.y, 0.55]} color={GOLD}
          intensity={1.1} distance={2.4 * sWorld} decay={2}
        />
      )}
      {/* GAM: twin expanding rings — the scene's single focal pulse */}
      {gam && [ringA, ringB].map((r, k) => (
        <mesh key={k} ref={r} position={[gam.x, gam.y, Z_TOP + 0.002]}>
          <ringGeometry args={[ringIn, ringOut, 48]} />
          <meshBasicMaterial
            color="#ffe9b8" transparent opacity={0}
            side={THREE.DoubleSide} depthWrite={false} toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Thin low-lift arcs + comet packets (plant → GAM) ── */
function EnergyArcs({ paused, pxU }) {
  const headGrp = useRef();
  const tailGrp = useRef();
  const scratch = useMemo(() => new THREE.Vector3(), []);
  const glowTex = useMemo(makeGlowTexture, []);
  const cTurq = useMemo(() => new THREE.Color(TURQ), []);
  const cGlow = useMemo(() => new THREE.Color(GLOW), []);

  const arcs = useMemo(() => {
    const gam = PLANTS_GEO.find((p) => p.kind === "load");
    const gx = px(gam.lng), gy = py(gam.lat);
    const feeders = PLANTS_GEO.filter((p) => p.kind !== "load");
    return feeders.map((p, i) => {
      const x = px(p.lng), y = py(p.lat);
      const dist = Math.hypot(gx - x, gy - y);
      const lift = 0.14 + dist * 0.14; // hug the surface
      const mid = new THREE.Vector3((x + gx) / 2, (y + gy) / 2, Z_TOP + lift);
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(x, y, Z_TOP),
        mid,
        new THREE.Vector3(gx, gy, Z_TOP)
      );
      const tube = new THREE.TubeGeometry(curve, 48, Math.max(0.004, 1.2 * pxU), 6, false);
      return {
        key: p.id, tube, curve,
        color: cTurq.clone().lerp(cGlow, feeders.length > 1 ? i / (feeders.length - 1) : 0),
        speed: 0.11 + (i % 4) * 0.02,
        offset: (i * 0.137) % 1,
      };
    });
  }, [pxU, cTurq, cGlow]);

  useEffect(() => () => arcs.forEach((a) => a.tube.dispose()), [arcs]);

  useFrame(({ clock }) => {
    if (paused.current) return;
    const t = clock.elapsedTime;
    const heads = headGrp.current, tails = tailGrp.current;
    if (!heads || !tails) return;
    for (let i = 0; i < arcs.length; i++) {
      const a = arcs[i];
      const tt = (t * a.speed + a.offset) % 1;
      a.curve.getPointAt(tt, scratch);
      heads.children[i].position.copy(scratch);
      a.curve.getPointAt(Math.max(0, tt - 0.035), scratch);
      tails.children[i].position.copy(scratch);
    }
  });

  const headW = 18 * pxU, tailW = 11 * pxU, coreR = 2.2 * pxU;
  return (
    <group>
      {arcs.map((a) => (
        <mesh key={a.key} geometry={a.tube}>
          <meshBasicMaterial
            color={a.color} transparent opacity={0.38}
            blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false}
          />
        </mesh>
      ))}
      <group ref={headGrp}>
        {arcs.map((a) => (
          <group key={a.key}>
            <mesh>
              <sphereGeometry args={[coreR, 10, 10]} />
              <meshBasicMaterial color="#eaffff" toneMapped={false} />
            </mesh>
            {glowTex && (
              <sprite scale={[headW, headW, 1]}>
                <spriteMaterial
                  map={glowTex} color={GLOW} transparent opacity={0.8}
                  blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false}
                />
              </sprite>
            )}
          </group>
        ))}
      </group>
      <group ref={tailGrp}>
        {arcs.map((a) => (
          <group key={a.key}>
            {glowTex && (
              <sprite scale={[tailW, tailW, 1]}>
                <spriteMaterial
                  map={glowTex} color={TURQ} transparent opacity={0.3}
                  blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false}
                />
              </sprite>
            )}
          </group>
        ))}
      </group>
    </group>
  );
}

/* ── One sparse ambient particle layer, sized to the viewport ── */
function ParticleLayer({ paused, visW, visH, u }) {
  const ref = useRef();
  const spread = Math.max(visW, visH) * 1.25;
  const count = Math.max(24, Math.min(80, Math.round((visW * visH) / 0.32)));
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 2] = -0.6 - Math.random() * 2.4;
    }
    return arr;
  }, [count, spread]);
  useFrame(({ clock }) => {
    if (paused.current) return;
    if (ref.current) ref.current.rotation.z = clock.elapsedTime * 0.01;
  });
  return (
    <points ref={ref} key={`${count}-${spread.toFixed(2)}`}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color={TURQ} size={3.2 * u} transparent opacity={0.35}
        sizeAttenuation depthWrite={false}
      />
    </points>
  );
}

/* ── Scene root: framing + slow sway + eased pointer parallax ── */
function Scene({ reduced }) {
  const group = useRef();
  const paused = useRef(false);
  const hidden = useRef(false);
  const invalidate = useThree((s) => s.invalidate);
  const f = useFraming();
  const fRef = useRef(f);
  fRef.current = f;

  // Static studio environment → reflections on the physical body material
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);

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

  // Reduced motion: one static, correctly-framed frame.
  useEffect(() => {
    if (reduced && group.current) {
      group.current.rotation.set(TILT, 0, 0.05);
      group.current.position.set(f.x, f.y, 0);
      group.current.scale.setScalar(f.s);
      invalidate();
    }
  }, [reduced, invalidate, f]);

  const CAP = 0.06; // pointer-driven rotation cap (rad)

  useFrame(({ clock, pointer }) => {
    if (paused.current || hidden.current || !group.current) return;
    const t = clock.elapsedTime;
    const fr = fRef.current;
    aim.current.x += (THREE.MathUtils.clamp(pointer.x, -1, 1) * CAP - aim.current.x) * 0.04;
    aim.current.y += (THREE.MathUtils.clamp(pointer.y, -1, 1) * CAP - aim.current.y) * 0.04;
    group.current.rotation.x = TILT + Math.sin(t * 0.22) * 0.018 + aim.current.y * 0.5;
    group.current.rotation.y = Math.sin(t * 0.19) * 0.03 + aim.current.x;
    group.current.rotation.z = 0.05 + Math.sin(t * 0.16) * 0.012;
    group.current.position.set(fr.x, fr.y + Math.sin(t * 0.35) * 0.03, 0);
    group.current.scale.setScalar(fr.s);
  });

  return (
    <>
      <fogExp2 attach="fog" args={[NAVY, 0.055]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2.5, 4, 6]} intensity={1.1} color="#dceeff" />
      <directionalLight position={[-4, -1, 3]} intensity={0.4} color="#6fe0d8" />

      <ParticleLayer paused={paused} visW={f.visW} visH={f.visH} u={f.u} />

      <group ref={group} position={[f.x, f.y, 0]} scale={f.s} rotation={[TILT, 0, 0.05]}>
        <CountryMesh />
        <ScanSweep paused={paused} />
        <PlantNodes paused={paused} pxU={f.pxU} sWorld={f.s} />
        <EnergyArcs paused={paused} pxU={f.pxU} />
      </group>
    </>
  );
}

export default function Hero3D() {
  const reduced = useReducedMotion();
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", animation: "enHero3dFade 0.9s ease 0.05s both" }}>
      <style>{`@keyframes enHero3dFade { from { opacity: 0; } to { opacity: 1; } }`}</style>
      <Canvas
        dpr={reduced ? 1 : [1, 2]}
        frameloop={reduced ? "demand" : "always"}
        camera={{ position: [0, -0.35, 4.6], fov: FOV }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ position: "absolute", inset: 0 }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <Scene reduced={reduced} />
      </Canvas>
      {/* Soft vignette so the table melts into the navy hero band */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background:
            "radial-gradient(130% 100% at 50% 28%, transparent 52%, rgba(6,15,34,0.28) 80%, rgba(6,15,34,0.5) 100%)",
        }}
      />
    </div>
  );
}
