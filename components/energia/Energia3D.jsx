"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  AdditiveBlending, BoxGeometry, BufferAttribute, BufferGeometry, CanvasTexture,
  CylinderGeometry, DynamicDrawUsage, EdgesGeometry, ExtrudeGeometry,
  LineBasicMaterial, Matrix4, MeshBasicMaterial, MeshStandardMaterial,
  QuadraticBezierCurve3, Shape, TubeGeometry, Vector3,
} from "three";
import { EN_ACCENT, CR_MIX, PEG_TARGETS, SRC } from "../energiaData";
import useFrameloopGate from "./useFrameloopGate";

/* ═══════════════════════════════════════════════════════════════
   ENERGÍA — Energia3D · HydroDamCutaway (Act 4 vignette)
   Schematic 3D cutaway of a GENERIC reservoir hydro plant (no real
   site): canyon walls, gravity-dam cross-section, reservoir vs
   tailwater head, glowing penstock with flow packets, gold turbine,
   step-up transformer and a catenary to a mini pylon. Hero3D visual
   dialect (navy body + teal emissive edges + gold accents, fogged
   void, stage-glow disc) with NO postprocessing — glow comes from
   emissive toneMapped:false + additive sprites. Perf shell: WebGL
   probe, IO mount-once + IO ticking + visibilitychange, frameloop
   demand/always/never, DPR cap, dispose contract, ≤22 draw calls.
   Reduced motion: one static lit frame; chips apply instantly.
   Lazy (ssr:false) from EnergiaDeep. Canvas aria-hidden + SR text.
   ═══════════════════════════════════════════════════════════════ */

const NAVY = EN_ACCENT.navy;       // #0A1F3F
const TURQ = EN_ACCENT.turquoise;  // #00B5A8
const GLOW = EN_ACCENT.glow;       // #22d3ee
const GOLD = EN_ACCENT.gold;       // #F2B135
const MONO = "'IBM Plex Mono',monospace";

const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

/* Spotlight groups: [0] water path (waterline + penstock) · [1] turbine · [2] catenary */
const SPOT_BASE = [0.9, 1.6, 1.3]; // base emissiveIntensity per group
const FLOW_MULT = [1.4, 1.8, 2.0]; // packet/turbine speed multiplier per active chip

const PH_POS = [0.62, -0.43, 0.62];   // powerhouse at the dam toe
const TR_POS = [0.15, -0.55, 0.85];   // step-up transformer
const TURBINE_POS = [0.62, -0.4, 0.88];

/* ── prefers-reduced-motion (SSR-safe, Hero3D pattern) ── */
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

/* ── Radial-gradient stage-glow texture (Hero3D pattern, SSR-guarded, 256²) ── */
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
  const tex = new CanvasTexture(cv);
  tex.needsUpdate = true;
  return tex;
}

/* ── Merge indexed geometries (position+normal+index) → 1 draw call ── */
function mergeGeoms(geoms) {
  let vCount = 0, iCount = 0;
  geoms.forEach((g) => { vCount += g.attributes.position.count; iCount += g.index.count; });
  const pos = new Float32Array(vCount * 3);
  const nor = new Float32Array(vCount * 3);
  const idx = new Uint16Array(iCount);
  let vo = 0, io = 0;
  geoms.forEach((g) => {
    pos.set(g.attributes.position.array, vo * 3);
    nor.set(g.attributes.normal.array, vo * 3);
    const gi = g.index.array;
    for (let i = 0; i < gi.length; i++) idx[io + i] = gi[i] + vo;
    vo += g.attributes.position.count;
    io += gi.length;
    g.dispose();
  });
  const out = new BufferGeometry();
  out.setAttribute("position", new BufferAttribute(pos, 3));
  out.setAttribute("normal", new BufferAttribute(nor, 3));
  out.setIndex(new BufferAttribute(idx, 1));
  return out;
}

/* ── EdgesGeometry of one base geometry replicated under N transforms → 1 lineSegments ── */
function transformedEdges(baseGeo, matrices) {
  const e = new EdgesGeometry(baseGeo);
  const src = e.attributes.position.array;
  const out = new Float32Array(src.length * matrices.length);
  const v = new Vector3();
  matrices.forEach((m, k) => {
    for (let i = 0; i < src.length; i += 3) {
      v.set(src[i], src[i + 1], src[i + 2]).applyMatrix4(m);
      const o = k * src.length + i;
      out[o] = v.x; out[o + 1] = v.y; out[o + 2] = v.z;
    }
  });
  e.dispose();
  const g = new BufferGeometry();
  g.setAttribute("position", new BufferAttribute(out, 3));
  return g;
}

/* ═══ Scene (runs inside Canvas only) ═══ */
function DamScene({ reduced, active, hidden, spot }) {
  const invalidate = useThree((s) => s.invalidate);
  const group = useRef();
  const blades = useRef();
  const cores = useRef();
  const halos = useRef();
  const gold = useRef();
  const pausedRef = useRef(true);
  const armed = useRef(false);
  const introP = useRef(0);
  const phase = useRef(0);       // penstock packet phase accumulator (no jump on speed change)
  const goldPhase = useRef(0.45);
  const flow = useRef(1);
  const spotRef = useRef(spot);
  spotRef.current = spot;

  const scratch = useMemo(() => ({ v: new Vector3(), m: new Matrix4() }), []);

  /* ── All imperative assets in one memo; disposed on unmount below ── */
  const A = useMemo(() => {
    /* 4 unique standard materials (shared) + cheap basic/line materials */
    const bodyMat = new MeshStandardMaterial({ color: "#0e2a52", metalness: 0.42, roughness: 0.4, emissive: TURQ, emissiveIntensity: 0.12 });
    const flowMat = new MeshStandardMaterial({ color: "#0b2540", emissive: GLOW, emissiveIntensity: SPOT_BASE[0], transparent: true, opacity: 0.85, toneMapped: false });
    const turbineMat = new MeshStandardMaterial({ color: GOLD, emissive: GOLD, emissiveIntensity: SPOT_BASE[1], toneMapped: false });
    const catMat = new MeshStandardMaterial({ color: "#3a2c07", emissive: GOLD, emissiveIntensity: SPOT_BASE[2], toneMapped: false });
    const edgeMat = new LineBasicMaterial({ color: GLOW, transparent: true, opacity: 0.9, toneMapped: false });
    const pylonMat = new MeshBasicMaterial({ color: "#6e87ab" });

    /* Dam: trapezoid cross-section (crest 0.18 · base 0.52 · h 1.5, upstream face
       near-vertical) extruded 1.2 across the valley, centered → spans x ±0.6, y ±0.75 */
    const profile = new Shape();
    profile.moveTo(0, 0);
    profile.lineTo(0.52, 0);
    profile.lineTo(0.2, 1.5);
    profile.lineTo(0.02, 1.5);
    profile.closePath();
    const damGeo = new ExtrudeGeometry(profile, { depth: 1.2, bevelEnabled: false });
    damGeo.center();
    damGeo.rotateY(-Math.PI / 2); // upstream face → −z (reservoir side)
    const damEdges = new EdgesGeometry(damGeo, 20);

    /* Canyon walls: one shared box, two meshes; edge lines merged → 1 draw call */
    const canyonGeo = new BoxGeometry(1.3, 1.1, 2.4);
    const canyonEdges = transformedEdges(canyonGeo, [
      new Matrix4().makeRotationY(0.15).setPosition(-1.85, -0.2, 0),
      new Matrix4().makeRotationY(-0.15).setPosition(1.85, -0.2, 0),
    ]);

    /* Powerhouse + step-up transformer */
    const phGeo = new BoxGeometry(0.55, 0.38, 0.5);
    const phEdges = new EdgesGeometry(phGeo);
    const trGeo = new BoxGeometry(0.16, 0.14, 0.12);
    const trEdges = new EdgesGeometry(trGeo);

    /* Penstock: intake below the reservoir surface, down to the powerhouse */
    const penCurve = new QuadraticBezierCurve3(
      new Vector3(0.72, 0.18, -0.55),
      new Vector3(0.9, -0.5, -0.05),
      new Vector3(0.68, -0.4, 0.4),
    );
    const penGeo = new TubeGeometry(penCurve, 48, 0.05, 8, false);

    /* Catenary: transformer → mini pylon (sagging control point below the chord) */
    const catCurve = new QuadraticBezierCurve3(
      new Vector3(0.15, -0.46, 0.85),
      new Vector3(-0.32, -0.52, 1.15),
      new Vector3(-0.75, -0.16, 1.43),
    );
    const catGeo = new TubeGeometry(catCurve, 24, 0.008, 8, false);

    /* Turbine: 4 radial blade boxes merged → 1 draw call (spins with flowMult) */
    const bladesGeo = mergeGeoms(
      [0, 1, 2, 3].map((i) => {
        const b = new BoxGeometry(0.1, 0.026, 0.016);
        b.applyMatrix4(new Matrix4().makeRotationZ((i * Math.PI) / 2).multiply(new Matrix4().makeTranslation(0.062, 0, 0)));
        return b;
      }),
    );

    /* Mini pylon: 2 splayed legs (±6°) + crossarm, merged → 1 draw call */
    const legL = new CylinderGeometry(0.012, 0.012, 0.7, 6);
    legL.applyMatrix4(new Matrix4().makeRotationZ(-0.105).setPosition(-0.79, -0.42, 1.45));
    const legR = new CylinderGeometry(0.012, 0.012, 0.7, 6);
    legR.applyMatrix4(new Matrix4().makeRotationZ(0.105).setPosition(-0.71, -0.42, 1.45));
    const arm = new BoxGeometry(0.3, 0.024, 0.024);
    arm.applyMatrix4(new Matrix4().makeTranslation(-0.75, -0.14, 1.45));
    const pylonGeo = mergeGeoms([legL, legR, arm]);

    const glowTex = makeGlowTexture();
    const spotMats = [flowMat, turbineMat, catMat];
    return {
      bodyMat, flowMat, turbineMat, catMat, edgeMat, pylonMat,
      damGeo, damEdges, canyonGeo, canyonEdges, phGeo, phEdges, trGeo, trEdges,
      penCurve, penGeo, catCurve, catGeo, bladesGeo, pylonGeo, glowTex, spotMats,
    };
  }, []);

  /* Dispose contract: every memo-created geometry/material/texture */
  useEffect(() => () => {
    Object.values(A).forEach((x) => { if (x && typeof x.dispose === "function") x.dispose(); });
  }, [A]);

  useEffect(() => { pausedRef.current = reduced || !active || hidden; }, [reduced, active, hidden]);
  useEffect(() => { if (active) armed.current = true; }, [active]); // intro arms on first activation

  /* Place the 4 penstock packets — one shared scratch Vector3/Matrix4, zero per-frame allocs */
  const placePackets = useCallback((ph) => {
    const c = cores.current, h = halos.current;
    if (!c || !h) return;
    for (let i = 0; i < 4; i++) {
      const tt = (ph + i / 4) % 1;
      A.penCurve.getPointAt(tt, scratch.v);
      scratch.m.makeTranslation(scratch.v.x, scratch.v.y, scratch.v.z);
      c.setMatrixAt(i, scratch.m);
      h.setMatrixAt(i, scratch.m);
    }
    c.instanceMatrix.needsUpdate = true;
    h.instanceMatrix.needsUpdate = true;
  }, [A, scratch]);

  /* Initial placement (packets are hidden until intro p > 0.6) */
  useEffect(() => {
    if (cores.current) cores.current.instanceMatrix.setUsage(DynamicDrawUsage);
    if (halos.current) halos.current.instanceMatrix.setUsage(DynamicDrawUsage);
    placePackets(0);
    if (gold.current) A.catCurve.getPointAt(0.45, gold.current.position);
  }, [A, placePackets]);

  /* Reduced motion: one static lit frame — final pose + instant chip spotlight */
  useEffect(() => {
    if (!reduced) return;
    introP.current = 1;
    const g = group.current;
    if (g) { g.position.set(0, 0, 0); g.scale.setScalar(1); g.rotation.set(-0.02, 0, 0); }
    for (let i = 0; i < 3; i++) {
      A.spotMats[i].emissiveIntensity = SPOT_BASE[i] * (spot === i ? 1.8 : spot !== -1 ? 0.55 : 1);
    }
    placePackets(0.1);
    if (cores.current) cores.current.visible = true;
    if (halos.current) halos.current.visible = true;
    if (gold.current) gold.current.visible = true;
    invalidate();
  }, [reduced, spot, A, placePackets, invalidate]);

  useFrame((state, delta) => {
    if (pausedRef.current || (typeof document !== "undefined" && document.hidden) || !group.current) return;
    const t = state.clock.elapsedTime;
    const dt = Math.min(delta, 0.05);

    /* Hand-rolled intro: rise + scale, eased */
    if (armed.current) introP.current = Math.min(1, introP.current + dt / 1.1);
    const p = easeOutCubic(introP.current);
    const g = group.current;
    g.position.y = -0.5 + 0.5 * p;
    g.scale.setScalar(0.84 + 0.16 * p);
    g.rotation.y = Math.sin(t * 0.21) * 0.05 * p;
    g.rotation.x = -0.02 + Math.sin(t * 0.25) * 0.02 * p;

    /* Stage-spotlight: lerp each part-group's emissiveIntensity (factor 0.08/frame) */
    const sp = spotRef.current;
    for (let i = 0; i < 3; i++) {
      const m = A.spotMats[i];
      const target = SPOT_BASE[i] * (sp === i ? 1.8 : sp !== -1 ? 0.55 : 1);
      m.emissiveIntensity += (target - m.emissiveIntensity) * 0.08;
    }
    flow.current += ((sp === -1 ? 1 : FLOW_MULT[sp]) - flow.current) * 0.08;

    /* Flow packets down the penstock */
    phase.current += dt * 0.22 * flow.current;
    placePackets(phase.current);
    const vis = p > 0.6;
    if (cores.current) cores.current.visible = vis;
    if (halos.current) halos.current.visible = vis;

    /* Turbine spin */
    if (blades.current) blades.current.rotation.z -= dt * 1.0 * flow.current;

    /* Gold packet along the catenary (period 3.2 s) */
    goldPhase.current = (goldPhase.current + (dt / 3.2) * flow.current) % 1;
    if (gold.current) {
      A.catCurve.getPointAt(goldPhase.current, gold.current.position);
      gold.current.visible = vis;
    }
  });

  return (
    <>
      <fogExp2 attach="fog" args={[NAVY, 0.085]} />
      <ambientLight intensity={0.42} />
      <directionalLight position={[3, 4.5, 6]} intensity={1.15} color="#dcefff" />
      <directionalLight position={[-3.5, 2, -4.5]} intensity={0.5} color="#7ee7f0" />
      <pointLight position={[0, -2.6, 2.2]} intensity={1.6} color={TURQ} distance={9} />
      <pointLight position={[2.4, 2, 3]} intensity={0.9} color={GOLD} distance={8} />

      {/* Stage-glow disc (static, outside the rising group) */}
      {A.glowTex && (
        <mesh position={[0, -0.75, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[6.5, 4.5]} />
          <meshBasicMaterial map={A.glowTex} transparent opacity={0.35} blending={AdditiveBlending} depthWrite={false} toneMapped={false} />
        </mesh>
      )}

      <group ref={group} position={[0, -0.5, 0]} scale={0.84} rotation={[-0.02, 0, 0]}>
        {/* Canyon walls */}
        <mesh geometry={A.canyonGeo} material={A.bodyMat} position={[-1.85, -0.2, 0]} rotation={[0, 0.15, 0]} />
        <mesh geometry={A.canyonGeo} material={A.bodyMat} position={[1.85, -0.2, 0]} rotation={[0, -0.15, 0]} />
        <lineSegments geometry={A.canyonEdges} material={A.edgeMat} />

        {/* Gravity dam (schematic cross-section) */}
        <mesh geometry={A.damGeo} material={A.bodyMat} />
        <lineSegments geometry={A.damEdges} material={A.edgeMat} />

        {/* Reservoir (upstream, high) vs tailwater (downstream, low) — the head is the story */}
        <mesh position={[0, 0.55, -1.26]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.4, 2.0]} />
          <meshBasicMaterial color="#0d9488" transparent opacity={0.35} depthWrite={false} />
        </mesh>
        <mesh position={[0, -0.62, 0.82]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.0, 1.1]} />
          <meshBasicMaterial color="#0d9488" transparent opacity={0.25} depthWrite={false} />
        </mesh>

        {/* Emissive waterline strip along the dam's upstream face (glow line) */}
        <mesh material={A.flowMat} position={[0, 0.55, -0.25]}>
          <boxGeometry args={[1.2, 0.024, 0.035]} />
        </mesh>

        {/* Penstock + 4 instanced flow packets (core + additive halo → 2 draw calls) */}
        <mesh geometry={A.penGeo} material={A.flowMat} />
        {/* Packet color = the shipped hero-pill glow (rgb form of the hero
            recipe) — lives only inside this fixed-dark canvas, never as text. */}
        <instancedMesh ref={cores} args={[undefined, undefined, 4]} frustumCulled={false} visible={false}>
          <sphereGeometry args={[0.045, 12, 10]} />
          <meshBasicMaterial color="rgb(155,238,240)" toneMapped={false} />
        </instancedMesh>
        <instancedMesh ref={halos} args={[undefined, undefined, 4]} frustumCulled={false} visible={false}>
          <sphereGeometry args={[0.09, 10, 8]} />
          <meshBasicMaterial color="rgb(155,238,240)" transparent opacity={0.3} blending={AdditiveBlending} depthWrite={false} toneMapped={false} />
        </instancedMesh>

        {/* Powerhouse at the toe */}
        <mesh geometry={A.phGeo} material={A.bodyMat} position={PH_POS} />
        <lineSegments geometry={A.phEdges} material={A.edgeMat} position={PH_POS} />

        {/* Turbine-generator: gold torus + 4 radial blades */}
        <mesh material={A.turbineMat} position={TURBINE_POS}>
          <torusGeometry args={[0.13, 0.02, 12, 28]} />
        </mesh>
        <mesh ref={blades} geometry={A.bladesGeo} material={A.turbineMat} position={TURBINE_POS} />

        {/* Step-up transformer */}
        <mesh geometry={A.trGeo} material={A.bodyMat} position={TR_POS} />
        <lineSegments geometry={A.trEdges} material={A.edgeMat} position={TR_POS} />

        {/* Catenary to the mini pylon + one gold packet */}
        <mesh geometry={A.catGeo} material={A.catMat} />
        <mesh ref={gold} frustumCulled={false} visible={false}>
          <sphereGeometry args={[0.035, 10, 8]} />
          <meshBasicMaterial color={GOLD} toneMapped={false} />
        </mesh>
        <mesh geometry={A.pylonGeo} material={A.pylonMat} />
      </group>
    </>
  );
}

/* ═══ Panel: chrome + perf shell + chips + captions ═══ */
export default function HydroDamCutaway({ en = false, compact = false }) {
  const reduced = useReducedMotion();
  const wrapRef = useRef(null);
  /* Section-wide arbiter (useFrameloopGate): only the most-visible Energía
     canvas runs "always" — replaces the local active/hidden frameloop wiring
     so this canvas can't render concurrently with the hero or the globe. */
  const gateLoop = useFrameloopGate(wrapRef, reduced);
  const [webgl, setWebgl] = useState(false);   // probed on mount; on fail Canvas never mounts
  const [mounted, setMounted] = useState(false); // IO-A: mount-once, 200px early
  const [active, setActive] = useState(false);   // IO-B: ticking at ≥5% visible
  const [hidden, setHidden] = useState(false);
  const [spot, setSpot] = useState(-1);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    /* WebGL probe (EnergiaDeep pattern) — on fail keep the gradient box + DOM captions */
    let gl = false;
    try {
      const c = document.createElement("canvas");
      gl = !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
    } catch { gl = false; }
    setWebgl(gl);
    if (!gl) return undefined;

    const onVis = () => setHidden(!!document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);

    if (typeof IntersectionObserver === "undefined") {
      setMounted(true);
      setActive(true);
      return () => document.removeEventListener("visibilitychange", onVis);
    }
    const ioA = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setMounted(true); ioA.disconnect(); }
    }, { rootMargin: "200px 0px", threshold: 0 });
    const ioB = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.05 });
    ioA.observe(el);
    ioB.observe(el);
    return () => {
      ioA.disconnect();
      ioB.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  /* Values COMPUTED from existing sourced exports — no orphan numbers */
  const hydroPct = (CR_MIX.rows.find((r) => r.id === "hydro") || CR_MIX.rows[0]).pct; // 68
  const pegMW = PEG_TARGETS.rows[0].v; // 5995
  /* ICU groups es-CR thousands with a (narrow) space ("5 995"); the section's
     editorial convention is dot grouping ("3.499 MW" — HERO, CR_MIX), so
     spaces are normalized to dots (EnergiaChartsV2 num() precedent). */
  const nf = (v) => {
    const s = v.toLocaleString(en ? "en-US" : "es-CR");
    return en ? s : s.replace(/[\u00A0\u202F ]/g, ".");
  };

  const chips = [
    { es: `EMBALSE · HIDRO ${nf(hydroPct)}%`, en: `RESERVOIR · HYDRO ${nf(hydroPct)}%` },
    { es: "TURBINA · CASA DE MÁQUINAS", en: "TURBINE · POWERHOUSE" },
    { es: `A LA RED · META 2040: ${nf(pegMW)} MW`, en: `TO THE GRID · 2040 TARGET: ${nf(pegMW)} MW` },
  ];

  const chipStyle = (on) => ({
    minHeight: 44,
    fontFamily: MONO,
    fontSize: 10.5,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    borderRadius: 999,
    padding: "10px 14px",
    cursor: "pointer",
    background: "rgba(6,15,34,0.55)",
    color: on ? GOLD : "rgba(155,238,240,0.92)",
    border: `1px solid ${on ? "rgba(242,177,53,0.6)" : "rgba(0,181,168,0.4)"}`,
    boxShadow: on ? "0 0 12px rgba(242,177,53,0.35)" : "none",
    transition: "color .25s ease, border-color .25s ease, box-shadow .25s ease",
  });

  const srcChip = {
    fontFamily: MONO,
    fontSize: 10,
    color: "rgba(255,255,255,0.6)",
    border: "1px solid rgba(255,255,255,0.22)",
    borderRadius: 6,
    padding: "2px 7px",
    textDecoration: "none",
    whiteSpace: "nowrap",
  };

  return (
    <div
      className="e3d-scope"
      style={{
        background: "linear-gradient(165deg, #0A1F3F 0%, #0d2240 100%)",
        borderRadius: 14,
        border: "1px solid rgba(0,181,168,0.25)",
        padding: 18,
      }}
    >
      <style>{`
.e3d-stage{position:relative;width:100%;aspect-ratio:16/9;min-height:220px;border-radius:12px;overflow:hidden;background:radial-gradient(130% 120% at 50% 8%, #0d2643 0%, #071831 72%)}
@media (max-width:639px){.e3d-stage{aspect-ratio:4/3}}
.e3d-chip:focus-visible{outline:2px solid #22d3ee;outline-offset:3px}
.e3d-sr{position:absolute !important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
`}</style>

      {/* Gold badge pill */}
      <div
        style={{
          display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 12,
          fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
          textTransform: "uppercase", color: GOLD,
          border: "1px solid rgba(242,177,53,0.35)", borderRadius: 999, padding: "4px 11px",
        }}
      >
        <span style={{ width: 5, height: 5, borderRadius: 99, background: GOLD, display: "inline-block" }} />
        {en ? "DAM CUTAWAY · COLIBRII 3D ILLUSTRATION" : "CORTE DE REPRESA · ILUSTRACIÓN 3D COLIBRII"}
      </div>

      {/* Canvas stage — box reserved before/after mount (CLS 0); decorative for SR */}
      <div ref={wrapRef} className="e3d-stage" aria-hidden="true" style={{ pointerEvents: "none" }}>
        {webgl && mounted && (
          <Canvas
            dpr={reduced ? 1 : compact ? [1, 1.5] : [1, 2]}
            frameloop={gateLoop}
            camera={{ position: [2.6, 1.05, 4.2], fov: 40 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            style={{ position: "absolute", inset: 0 }}
            onCreated={({ gl: renderer, camera }) => {
              renderer.setClearColor(0x000000, 0);
              camera.lookAt(0.1, -0.05, -0.3);
            }}
          >
            <DamScene reduced={reduced} active={active} hidden={hidden} spot={spot} />
          </Canvas>
        )}
      </div>

      {/* Stage-spotlight chips (DOM — work even without WebGL captions-wise) */}
      <div
        role="group"
        aria-label={en ? "Highlight a part of the model" : "Resaltar una parte del modelo"}
        style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}
      >
        {chips.map((c, i) => (
          <button
            key={c.en}
            type="button"
            className="e3d-chip"
            aria-pressed={spot === i}
            onClick={() => setSpot((s) => (s === i ? -1 : i))}
            style={chipStyle(spot === i)}
          >
            {en ? c.en : c.es}
          </button>
        ))}
      </div>

      {/* Visible caption (fixed-dark panel → fixed light text, ReactorCutaway precedent) */}
      <div style={{ marginTop: 12, fontSize: 11.5, lineHeight: 1.5, color: "rgba(255,255,255,0.65)" }}>
        {en
          ? `Schematic cutaway of a reservoir hydro plant — depicts no real facility. Hydro is ${nf(hydroPct)}% of installed capacity (Dec 2023); the PEG 2040 target is ${nf(pegMW)} MW.`
          : `Corte esquemático de una central hidroeléctrica de embalse — no representa ninguna planta real. La hidro aporta el ${nf(hydroPct)}% de la capacidad instalada (dic 2023); la meta del PEG al 2040 es ${nf(pegMW)} MW.`}
      </div>

      {/* Sources + credit */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
          <span style={{ fontFamily: MONO, fontSize: 10, color: "rgba(255,255,255,0.5)" }}>
            {en ? "Sources:" : "Fuentes:"}
          </span>
          <a href={SRC.peg.url} target="_blank" rel="noopener noreferrer" style={srcChip}>
            ICE · PEG 2024-2040 ↗
          </a>
          <a href={SRC.ice.url} target="_blank" rel="noopener noreferrer" style={srcChip}>
            Grupo ICE ↗
          </a>
        </div>
        <div style={{ fontFamily: MONO, fontSize: 10, color: "rgba(255,255,255,0.6)" }}>
          {en
            ? "Schematic · not to scale · original artwork by Colibrii Labs"
            : "Esquemático · no a escala · obra original Colibrii Labs"}
        </div>
      </div>

      {/* SR text alternative for the aria-hidden canvas */}
      <p className="e3d-sr">
        {en
          ? "Schematic 3D model of a dam: water flows down from the reservoir through the penstock, spins the turbine and the generator, and the power exits through a transformer toward a high-voltage line. Not to scale; it does not depict any Costa Rican plant."
          : "Modelo 3D esquemático de una represa: el agua baja del embalse por la tubería forzada, hace girar la turbina y el generador, y la energía sale por un transformador hacia una línea de alta tensión. No a escala; no representa ninguna planta costarricense."}
      </p>
    </div>
  );
}
