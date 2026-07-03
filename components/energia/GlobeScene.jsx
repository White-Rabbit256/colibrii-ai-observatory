"use client";
import { useRef, useMemo, useEffect, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  AdditiveBlending, BackSide, BufferAttribute, BufferGeometry, CatmullRomCurve3,
  CircleGeometry, Color, CylinderGeometry, DoubleSide, Group, InstancedMesh, LineBasicMaterial,
  LineSegments, MathUtils, Matrix4, MeshBasicMaterial, MeshStandardMaterial,
  Object3D, OctahedronGeometry, Quaternion, RingGeometry, ShaderMaterial,
  SphereGeometry, SRGBColorSpace, TextureLoader, TorusGeometry, TubeGeometry,
  Vector3,
} from "three";
import { EN_ACCENT } from "../energiaData";
import { FUEL_HEX, altOf, DC_SCALE, SCENE } from "./globeEncoding";
import { HV_ARCS } from "./hvArcs";
import { DATACENTERS } from "./datacenters";
import { STORAGE_SITES } from "./storage";

/* ═══════════════════════════════════════════════════════════════
   ENERGÍA — GlobeScene (custom R3F rebuild)
   Replaces react-globe.gl's render layer entirely. Everything is
   WebGL in ONE coordinate system — no DOM marker layer, so markers
   can never misproject (the device-photo bug that motivated this).
   Glyph language:
     plants  → instanced light-columns (height=√MW, color=fuel)
     hubs    → instanced octahedra (size=√GW) + gold AI-ring ≥700 MW
     storage → instanced twin rings (blue outer, cyan core)
     Cañas   → gold beacon: octahedron + light beam + expanding pulse
     arcs    → tube geometry + animated energy-dash shader
   Labels for the 3 anchors are projected by US each frame into an
   HTML overlay (same math as the sphere — cannot drift).
   ═══════════════════════════════════════════════════════════════ */

const R = 1; // globe radius (world units)

const toVec = (lat, lng, alt = 0, out = new Vector3()) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const r = R * (1 + alt);
  out.set(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
  return out;
};

/* ── Fresnel atmosphere (backside shell) ── */
const ATMO_VERT = `
varying vec3 vNormal;
varying vec3 vView;
void main() {
  vNormal = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;
const ATMO_FRAG = `
uniform vec3 uInner;
uniform vec3 uOuter;
varying vec3 vNormal;
varying vec3 vView;
void main() {
  float rim = pow(1.0 - abs(dot(vNormal, vView)), 4.2);
  vec3 col = mix(uInner, uOuter, rim);
  gl_FragColor = vec4(col, rim * 0.9);
}`;

/* ── Animated energy-dash arc shader ── */
const ARC_VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;
const ARC_FRAG = `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uTime;
uniform float uSpeed;
uniform float uDashes;
uniform float uBase;
varying vec2 vUv;
void main() {
  float t = fract(vUv.x * uDashes - uTime * uSpeed);
  // bright comet head with a fading tail, over a faint constant core
  float head = smoothstep(0.0, 0.08, t) * smoothstep(0.45, 0.12, t);
  float glow = uBase + head * 1.6;
  vec3 col = mix(uColorA, uColorB, vUv.x);
  gl_FragColor = vec4(col * glow, glow * 0.85);
}`;


/* ── Earth surface shader (panel v2 grade): indigo ocean fresnel ramp,
      Natural-Earth land tint, wrap-lambert key, amber city-light ramp,
      in-surface cyan rim. One material, one draw call. ── */
const EARTH_VERT = `
varying vec3 vNormal;
varying vec3 vView;
varying vec2 vUv;
void main() {
  vNormal = normalize(normalMatrix * normal);
  vUv = uv;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;
const EARTH_FRAG = `
uniform sampler2D tNight;
uniform sampler2D tLand;
uniform float uHasNight;
uniform float uHasLand;
varying vec3 vNormal;
varying vec3 vView;
varying vec2 vUv;
void main() {
  // The postprocessing composer gamma-encodes at the end of the chain, so all
  // palette constants here are pre-converted to LINEAR (pow 2.2 of the spec sRGB).
  float F = clamp(dot(vNormal, vView), 0.0, 1.0);
  vec3 oceanLimb   = pow(vec3(0.118,0.298,0.541), vec3(2.2)); // #1E4C8A
  vec3 oceanFacing = pow(vec3(0.027,0.102,0.200), vec3(2.2)); // #071A33
  vec3 landTint    = pow(vec3(0.082,0.200,0.353), vec3(2.2)); // #15335A
  vec3 ocean = mix(oceanLimb, oceanFacing, smoothstep(0.10, 0.70, F));
  // faint land shadow under the dot-matrix (grounds the dots without competing)
  float land = uHasLand > 0.5 ? texture2D(tLand, vUv).r : 0.0;
  vec3 col = mix(ocean, landTint * 0.55, smoothstep(0.30, 0.62, land) * 0.6);
  // wrap-lambert key (upper-left)
  float ndl = dot(vNormal, normalize(vec3(-1.5, 1.2, 2.0)));
  float k = pow(ndl * 0.5 + 0.5, 1.4);
  col *= mix(1.0, k * 1.6, 0.30);
  // in-surface cyan rim
  col += pow(vec3(0.133,0.827,0.933), vec3(2.2)) * pow(1.0 - F, 3.0) * 0.5;
  gl_FragColor = vec4(col, 1.0);
}`;

/* ── Expanding ground-pulse shader (Cañas) ── */
const PULSE_FRAG = `
uniform float uTime;
uniform vec3 uColor;
varying vec2 vUv;
void main() {
  float d = length(vUv - 0.5) * 2.0;      // 0 centre → 1 edge
  float w = fract(uTime * 0.5);           // expanding front
  float ring = smoothstep(w - 0.09, w, d) * smoothstep(w + 0.09, w, d);
  float fade = (1.0 - w) * (1.0 - smoothstep(0.92, 1.0, d));
  gl_FragColor = vec4(uColor, ring * fade * 0.9);
}`;
const PULSE_VERT = `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

/* ── starfield ── */
function buildStars(n = 340) {
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const v = new Vector3().randomDirection().multiplyScalar(5.2 + Math.random() * 2.4);
    arr[i * 3] = v.x; arr[i * 3 + 1] = v.y; arr[i * 3 + 2] = v.z;
  }
  const g = new BufferGeometry();
  g.setAttribute("position", new BufferAttribute(arr, 3));
  return g;
}


/* ── Dot-matrix landmass (GitHub-globe technique, maker-documented) ──
   Latitude-row sampling: for each latitude row, dots are spaced evenly along
   the row's circumference and kept only where the Natural-Earth land mask has
   land. Each kept dot is tinted by real NASA night-light luminance at its
   coordinate (steel-blue land → amber civilization). ONE InstancedMesh,
   five-sided circles, flat colors — the premium dark-globe grammar. */
function DotEarth({ compact, onReady }) {
  const ref = useRef();
  const built = useRef(false);
  useEffect(() => {
    if (built.current) return;
    let dead = false;
    const maskImg = new Image();
    const nightImg = new Image();
    let loaded = 0;
    const tryBuild = () => {
      if (dead || ++loaded < 2) return;
      const mc = document.createElement("canvas");
      mc.width = 512; mc.height = 256;
      const mctx = mc.getContext("2d", { willReadFrequently: true });
      mctx.drawImage(maskImg, 0, 0, 512, 256);
      const mask = mctx.getImageData(0, 0, 512, 256).data;
      const nc = document.createElement("canvas");
      nc.width = 256; nc.height = 128;
      const nctx = nc.getContext("2d", { willReadFrequently: true });
      nctx.drawImage(nightImg, 0, 0, 256, 128);
      const night = nctx.getImageData(0, 0, 256, 128).data;

      const isLand = (lat, lng) => {
        const x = Math.min(511, Math.max(0, Math.round(((lng + 180) / 360) * 512)));
        const y = Math.min(255, Math.max(0, Math.round(((90 - lat) / 180) * 256)));
        return mask[(y * 512 + x) * 4] >= 110;
      };
      const cityLum = (lat, lng) => {
        const x = Math.min(255, Math.max(0, Math.round(((lng + 180) / 360) * 256)));
        const y = Math.min(127, Math.max(0, Math.round(((90 - lat) / 180) * 128)));
        const i = (y * 256 + x) * 4;
        return (night[i] + night[i + 1] + night[i + 2]) / 765;
      };

      const rows = compact ? 130 : 170;          // GitHub tiering: ~0.65× density on weak GPUs
      const density = compact ? 15 : 19;         // dots per world-unit of circumference
      const step = 180 / rows;
      const positions = [];
      const lums = [];
      for (let lat = -90 + step / 2; lat < 90; lat += step) {
        const rowR = Math.cos(Math.abs(lat) * (Math.PI / 180)) * R;
        const circ = 2 * Math.PI * rowR;
        const n = Math.max(1, Math.floor(circ * density));
        for (let j = 0; j < n; j++) {
          const lng = -180 + (j / n) * 360;
          if (!isLand(lat, lng)) continue;
          positions.push([lat, lng]);
          lums.push(cityLum(lat, lng));
        }
      }
      const mesh = ref.current;
      if (!mesh) return;
      const count = Math.min(positions.length, mesh.instanceMatrix.count);
      const d = new Object3D();
      const v = new Vector3();
      const base = new Color("#54749E").convertSRGBToLinear();
      const city = new Color("#FFD9A0").convertSRGBToLinear();
      const cTmp = new Color();
      for (let i = 0; i < count; i++) {
        const [lat, lng] = positions[i];
        toVec(lat, lng, 0.0045, v);
        d.position.copy(v);
        d.quaternion.setFromUnitVectors(new Vector3(0, 0, 1), v.clone().normalize());
        d.scale.setScalar(1);
        d.updateMatrix();
        mesh.setMatrixAt(i, d.matrix);
        const t = Math.min(1, Math.pow(lums[i], 0.9) * 1.75);
        cTmp.copy(base).lerp(city, t);
        mesh.setColorAt(i, cTmp);
      }
      mesh.count = count;
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      built.current = true;
      onReady?.();
    };
    maskImg.onload = tryBuild;
    nightImg.onload = tryBuild;
    maskImg.src = "/textures/land-mask-2k.png";
    nightImg.src = SCENE.globeImageUrl;
    return () => { dead = true; };
  }, [compact, onReady]);

  const geo = useMemo(() => {
    return new CircleGeometry(0.0056 * R, 5); // five-sided, per the GitHub recipe
  }, []);
  const mat = useMemo(() => new MeshBasicMaterial({ toneMapped: false }), []);
  useEffect(() => () => { geo.dispose(); mat.dispose(); }, [geo, mat]);

  return (
    <instancedMesh ref={ref} args={[geo, mat, 16000]} frustumCulled={false} raycast={() => null} />
  );
}

const CANAS = { lat: 10.43, lng: -85.09 };

export default function GlobeScene({
  compact, reduced, focus, layers, points, arcsLive, hover, onHover, labelRefs, pausedRef,
}) {
  const globeGrp = useRef();
  const texRef = useRef(null);
  const sphereMat = useRef();
  const { camera, gl, invalidate } = useThree();
  const drag = useRef({ down: false, lx: 0, ly: 0, vx: 0, resume: 0 });
  // Rest pose aims lat 16°N lon −76°W (panel framing: Cañas in the protagonist box)
  const REST_Y = -((-76 + 90) * Math.PI) / 180;
  const REST_X = (16 * Math.PI) / 180 * 0.9 - 0.12;
  const spin = useRef({ y: -0.2443, x: 0.1313 });
  const zoom = useRef({ v: 5.6, target: compact ? 4.75 : 5.4 });
  const scratch = useMemo(() => new Vector3(), []);
  const scratch2 = useMemo(() => new Vector3(), []);
  const mtx = useMemo(() => new Matrix4(), []);
  const dummy = useMemo(() => new Object3D(), []);
  const quatTarget = useMemo(() => new Quaternion(), []);
  const quatScratch = useMemo(() => new Quaternion(), []);

  /* ── static geometries/materials (built once, disposed on unmount) ── */
  const statics = useMemo(() => {
    const stars = buildStars();
    const earthMat = new ShaderMaterial({
      vertexShader: EARTH_VERT, fragmentShader: EARTH_FRAG,
      uniforms: {
        tNight: { value: null }, tLand: { value: null },
        uHasNight: { value: 0 }, uHasLand: { value: 0 },
      },
    });
    const atmoMat = new ShaderMaterial({
      vertexShader: ATMO_VERT, fragmentShader: ATMO_FRAG, transparent: true,
      blending: AdditiveBlending, side: BackSide, depthWrite: false,
      uniforms: {
        uInner: { value: new Color(EN_ACCENT.sky) },
        uOuter: { value: new Color(EN_ACCENT.turquoise) },
      },
    });
    // arc tubes: one merged-per-kind material with shared uTime
    const kindMat = {};
    const KIND_STYLE = {
      siepac:  { a: "#F2B135", b: "#ffd984", dashes: 5,  speed: 0.55, base: 0.42, rad: 0.007 },
      hvdc:    { a: "#22d3ee", b: "#00B5A8", dashes: 7,  speed: 0.45, base: 0.30, rad: 0.0048 },
      ac:      { a: "#10b981", b: "#5eead4", dashes: 7,  speed: 0.40, base: 0.28, rad: 0.0040 },
      planned: { a: "#818cf8", b: "#c7d2fe", dashes: 11, speed: 0.22, base: 0.16, rad: 0.0032 },
    };
    for (const k of Object.keys(KIND_STYLE)) {
      const s = KIND_STYLE[k];
      kindMat[k] = new ShaderMaterial({
        vertexShader: ARC_VERT, fragmentShader: ARC_FRAG, transparent: true,
        blending: AdditiveBlending, depthWrite: false,
        uniforms: {
          uColorA: { value: new Color(s.a) }, uColorB: { value: new Color(s.b) },
          uTime: { value: 0 }, uSpeed: { value: s.speed },
          uDashes: { value: s.dashes }, uBase: { value: s.base },
        },
      });
    }
    const arcs = HV_ARCS.map((a) => {
      const st = KIND_STYLE[a.kind] || KIND_STYLE.hvdc;
      const A = toVec(a.startLat, a.startLng, 0.004, new Vector3());
      const B = toVec(a.endLat, a.endLng, 0.004, new Vector3());
      const dist = A.distanceTo(B);
      const liftV = Math.max(0.07, Math.min(0.24, dist * 0.36 + (a.kind === "planned" ? 0.05 : 0)));
      const M1 = A.clone().lerp(B, 0.35).normalize().multiplyScalar(R * (1 + liftV));
      const M2 = A.clone().lerp(B, 0.65).normalize().multiplyScalar(R * (1 + liftV));
      const curve = new CatmullRomCurve3([A, M1, M2, B]);
      const geo = new TubeGeometry(curve, 44, st.rad * (a.kind === "siepac" ? 1.25 : 1), 6, false);
      return { key: a.id || `${a.from}-${a.to}`, geo, kind: a.kind, data: a };
    });
    const pulseMat = new ShaderMaterial({
      vertexShader: PULSE_VERT, fragmentShader: PULSE_FRAG, transparent: true,
      blending: AdditiveBlending, depthWrite: false, side: DoubleSide,
      uniforms: { uTime: { value: 0 }, uColor: { value: new Color(EN_ACCENT.gold) } },
    });
    return { stars, atmoMat, kindMat, arcs, pulseMat, earthMat };
  }, []);
  useEffect(() => () => {
    statics.stars.dispose(); statics.atmoMat.dispose(); statics.earthMat.dispose();
    Object.values(statics.kindMat).forEach((m) => m.dispose());
    statics.arcs.forEach((a) => a.geo.dispose());
    statics.pulseMat.dispose();
  }, [statics]);

  /* ── load night texture ourselves (local, deterministic) ── */
  useEffect(() => {
    let dead = false;
    new TextureLoader().load(SCENE.globeImageUrl, (tex) => {
      if (dead) { tex.dispose(); return; }
      tex.colorSpace = SRGBColorSpace;
      tex.anisotropy = Math.min(4, gl.capabilities.getMaxAnisotropy?.() || 1);
      texRef.current = tex;
      statics.earthMat.uniforms.tNight.value = tex;
      statics.earthMat.uniforms.uHasNight.value = 1;
      invalidate();
    });
    new TextureLoader().load("/textures/land-mask-2k.png", (tex) => {
      if (dead) { tex.dispose(); return; }
      statics.earthMat.uniforms.tLand.value = tex;
      statics.earthMat.uniforms.uHasLand.value = 1;
      invalidate();
    });
    return () => { dead = true; texRef.current?.dispose?.(); };
  }, [gl, invalidate, statics]);


  /* ── instanced plants (light columns) ── */
  const plantMesh = useRef();
  const plantGeo = useMemo(() => new CylinderGeometry(0.5, 0.5, 1, 5, 1, true), []);
  const plantMat = useMemo(() => new MeshBasicMaterial({ transparent: true, opacity: 0.92, toneMapped: false, blending: AdditiveBlending, depthWrite: false }), []);
  useEffect(() => () => { plantGeo.dispose(); plantMat.dispose(); }, [plantGeo, plantMat]);
  useEffect(() => {
    const mesh = plantMesh.current;
    if (!mesh || !points) return;
    const n = Math.min(points.length, 24000);
    const col = new Color();
    for (let i = 0; i < n; i++) {
      const p = points[i];
      const h = Math.max(0.012, altOf(p.cap) * 1.15);
      toVec(p.lat, p.lng, 0, scratch);
      scratch2.copy(scratch).normalize();
      dummy.position.copy(scratch).addScaledVector(scratch2, h / 2);
      dummy.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), scratch2);
      const w = compact ? 0.006 : 0.0045;
      dummy.scale.set(w, h, w);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      col.set(FUEL_HEX[p.fuel] || FUEL_HEX.Other);
      mesh.setColorAt(i, col);
    }
    mesh.count = n;
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    invalidate();
  }, [points, compact, dummy, scratch, scratch2, invalidate]);

  /* ── instanced hubs (octahedra) + AI rings ── */
  const hubMesh = useRef();
  const hubRing = useRef();
  const hubGeo = useMemo(() => new OctahedronGeometry(1, 0), []);
  const hubMat = useMemo(() => new MeshStandardMaterial({ color: "#eaf6ff", emissive: "#9bd8ff", emissiveIntensity: 0.9, metalness: 0.2, roughness: 0.25 }), []);
  const ringGeo = useMemo(() => new TorusGeometry(1, 0.09, 8, 40), []);
  const ringMat = useMemo(() => new MeshBasicMaterial({ color: "#F472B6", transparent: true, opacity: 0.85, toneMapped: false, blending: AdditiveBlending, depthWrite: false }), []);
  const hubData = useMemo(() => DATACENTERS.map((d) => ({
    ...d, size: 0.012 + Math.sqrt((d.demandMw || 100) / 4500) * 0.02,
    ai: (d.demandMw || 0) >= 700, phase: Math.random() * Math.PI * 2,
  })), []);
  useEffect(() => () => { hubGeo.dispose(); hubMat.dispose(); ringGeo.dispose(); ringMat.dispose(); }, [hubGeo, hubMat, ringGeo, ringMat]);

  /* ── instanced storage (twin rings) ── */
  const stoMesh = useRef();
  const stoGeo = useMemo(() => new TorusGeometry(1, 0.14, 6, 26), []);
  const stoMat = useMemo(() => new MeshBasicMaterial({ color: "#7cb8ff", transparent: true, opacity: 0.9, toneMapped: false, blending: AdditiveBlending, depthWrite: false }), []);
  const stoData = useMemo(() => STORAGE_SITES.slice(0, compact ? 22 : STORAGE_SITES.length).map((s) => ({
    ...s, size: 0.007 + Math.sqrt((s.mw || 50) / 900) * 0.012,
  })), [compact]);
  useEffect(() => () => { stoGeo.dispose(); stoMat.dispose(); }, [stoGeo, stoMat]);
  useEffect(() => {
    const mesh = stoMesh.current;
    if (!mesh) return;
    for (let i = 0; i < stoData.length; i++) {
      const s = stoData[i];
      toVec(s.lat, s.lng, 0.014, scratch);
      scratch2.copy(scratch).normalize();
      dummy.position.copy(scratch);
      dummy.quaternion.setFromUnitVectors(new Vector3(0, 0, 1), scratch2);
      dummy.scale.setScalar(s.size);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.count = stoData.length;
    mesh.instanceMatrix.needsUpdate = true;
    invalidate();
  }, [stoData, dummy, scratch, scratch2, invalidate]);

  /* ── Cañas beacon pieces ── */
  const beaconGrp = useRef();
  const beaconPos = useMemo(() => toVec(CANAS.lat, CANAS.lng, 0.012, new Vector3()), []);
  const beaconQuat = useMemo(() => {
    const n = beaconPos.clone().normalize();
    return new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), n);
  }, [beaconPos]);

  /* ── pointer drag (rotate) ── */
  useEffect(() => {
    const el = gl.domElement;
    const down = (e) => { drag.current.down = true; drag.current.lx = e.clientX; drag.current.ly = e.clientY; drag.current.vx = 0; };
    const move = (e) => {
      const d = drag.current;
      if (!d.down) return;
      const dx = e.clientX - d.lx, dy = e.clientY - d.ly;
      d.lx = e.clientX; d.ly = e.clientY;
      spin.current.y += dx * 0.005;
      spin.current.x = MathUtils.clamp(spin.current.x + dy * 0.003, -0.9, 0.9);
      d.vx = dx * 0.005;
      d.resume = 2.2; // seconds until autorotate resumes
    };
    const up = () => { drag.current.down = false; };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [gl]);

  /* ── focus targets ── */
  useEffect(() => {
    zoom.current.target = focus === "cr" ? (compact ? 3.2 : 3.6) : (compact ? 4.75 : 5.4);
    if (focus === "cr") {
      // rotate so Cañas faces the camera: yaw = -(lng+90°), pitch ≈ lat
      spin.current.targetY = -((CANAS.lng + 90) * Math.PI) / 180;
      spin.current.targetX = (CANAS.lat * Math.PI) / 180 * 0.9 - 0.12;
      spin.current.locked = true;
    } else {
      spin.current.locked = false;
    }
  }, [focus, compact]);

  /* ── per-frame ── */
  useFrame(({ clock }, dt) => {
    if (pausedRef?.current) return;
    const t = reduced ? 0 : clock.elapsedTime;
    const g = globeGrp.current;
    if (!g) return;

    // time uniforms
    Object.values(statics.kindMat).forEach((m) => { m.uniforms.uTime.value = t; });
    statics.pulseMat.uniforms.uTime.value = t;

    // spin dynamics
    const s = spin.current;
    const d = drag.current;
    if (s.locked) {
      s.y += ((s.targetY - s.y + Math.PI * 3) % (Math.PI * 2) - Math.PI) * Math.min(1, dt * 3.2);
      s.x += (s.targetX - s.x) * Math.min(1, dt * 3.2);
    } else if (!d.down) {
      if (d.resume > 0) { d.resume -= dt; s.y += d.vx; d.vx *= 0.94; }
      else if (!reduced) {
        // pendulum idle: ±6° over 44 s around the rest pose; self-restores
        const osc = Math.sin(t * (Math.PI * 2 / 44)) * 0.1047;
        s.y += (REST_Y + osc - s.y) * Math.min(1, dt * 0.5);
        s.x += (REST_X - s.x) * Math.min(1, dt * 0.4);
      }
    }
    g.rotation.set(s.x, s.y, 0);

    // zoom
    zoom.current.v += (zoom.current.target - zoom.current.v) * Math.min(1, dt * 2.6);
    camera.position.set(0, 0, zoom.current.v);
    camera.lookAt(0, 0, 0);

    // hub pulse
    const hm = hubMesh.current;
    if (hm) {
      for (let i = 0; i < hubData.length; i++) {
        const h = hubData[i];
        toVec(h.lat, h.lng, 0.012, scratch);
        dummy.position.copy(scratch);
        dummy.quaternion.identity();
        const pulse = 1 + Math.sin(t * 1.8 + h.phase) * 0.13;
        dummy.scale.setScalar(h.size * pulse);
        dummy.rotation.y = t * 0.6 + h.phase;
        dummy.updateMatrix();
        hm.setMatrixAt(i, dummy.matrix);
      }
      hm.instanceMatrix.needsUpdate = true;
    }
    const hr = hubRing.current;
    if (hr) {
      let j = 0;
      for (let i = 0; i < hubData.length; i++) {
        const h = hubData[i];
        if (!h.ai) continue;
        toVec(h.lat, h.lng, 0.012, scratch);
        scratch2.copy(scratch).normalize();
        dummy.position.copy(scratch);
        dummy.quaternion.setFromUnitVectors(new Vector3(0, 0, 1), scratch2);
        dummy.scale.setScalar(h.size * (1.7 + Math.sin(t * 1.8 + h.phase) * 0.12));
        dummy.updateMatrix();
        hr.setMatrixAt(j++, dummy.matrix);
      }
      hr.count = j;
      hr.instanceMatrix.needsUpdate = true;
    }

    // beacon breathing
    if (beaconGrp.current) {
      const k = 1 + Math.sin(t * 2.1) * 0.12;
      beaconGrp.current.scale.setScalar(k);
    }

    // label projection (anchors → screen space, same math as the sphere)
    if (labelRefs?.current) {
      const rect = gl.domElement.getBoundingClientRect();
      for (const L of labelRefs.current) {
        if (!L.el) continue;
        if (L.id !== "canas" && !layers.hubs) { L.el.style.opacity = "0"; continue; }
        toVec(L.lat, L.lng, L.alt ?? 0.03, scratch);
        scratch.applyMatrix4(g.matrixWorld);
        const facing = scratch.clone().normalize().dot(camera.position.clone().normalize());
        scratch.project(camera);
        const x = Math.min(rect.width - 84, Math.max(84, (scratch.x * 0.5 + 0.5) * rect.width));
        const y = (-scratch.y * 0.5 + 0.5) * rect.height;
        const visible = facing > 0.18 && scratch.z < 1;
        L.el.style.opacity = visible ? "1" : "0";
        L.el.style.transform = `translate(-50%, 0) translate(${x.toFixed(1)}px, ${(y + 10).toFixed(1)}px)`;
      }
    }
  });

  /* ── hub picking → tooltip ── */
  const onHubMove = useCallback((e) => {
    e.stopPropagation();
    const i = e.instanceId;
    if (i == null || !hubData[i]) return;
    const h = hubData[i];
    onHover?.({ kind: "dc", d: h });
  }, [hubData, onHover]);
  const onArcOver = useCallback((a) => (e) => { e.stopPropagation(); onHover?.({ kind: "arc", d: a }); }, [onHover]);
  const clearHover = useCallback(() => onHover?.(null), [onHover]);

  return (
    <>
      <ambientLight intensity={0.3} color="#cfe4ff" />
      <directionalLight position={[2.5, 1.2, 2]} intensity={0.42} color="#ffeeda" />
      <directionalLight position={[-2.5, -0.6, -1.5]} intensity={0.3} color={EN_ACCENT.turquoise} />

      {/* starfield (world-fixed) */}
      <points geometry={statics.stars}>
        <pointsMaterial size={0.02} color="#9fc7e8" transparent opacity={0.7} sizeAttenuation depthWrite={false} />
      </points>

      <group ref={globeGrp}>
        {/* Earth */}
        <mesh onPointerMissed={clearHover} material={statics.earthMat}>
          <sphereGeometry args={[R, 96, 64]} />
        </mesh>
        <DotEarth compact={compact} />
        {/* atmosphere */}
        <mesh scale={1.075} material={statics.atmoMat}>
          <sphereGeometry args={[R, 48, 32]} />
        </mesh>

        {/* HV arcs */}
        {layers.grid && arcsLive && statics.arcs.map((a) => (
          <mesh key={a.key} geometry={a.geo} material={statics.kindMat[a.kind] || statics.kindMat.hvdc}
            onPointerOver={onArcOver(a.data)} onPointerOut={clearHover} />
        ))}

        {/* plants */}
        {layers.plants && (
          <instancedMesh ref={plantMesh} args={[plantGeo, plantMat, 24000]} frustumCulled={false} raycast={() => null} />
        )}

        {/* hubs */}
        {layers.hubs && (
          <>
            <instancedMesh ref={hubMesh} args={[hubGeo, hubMat, DATACENTERS.length]} frustumCulled={false}
              onPointerMove={onHubMove} onPointerOut={clearHover} />
            <instancedMesh ref={hubRing} args={[ringGeo, ringMat, DATACENTERS.length]} frustumCulled={false} raycast={() => null} />
          </>
        )}

        {/* storage */}
        {layers.storage && (
          <instancedMesh ref={stoMesh} args={[stoGeo, stoMat, stoData.length]} frustumCulled={false} raycast={() => null} />
        )}

        {/* Cañas beacon */}
        <group position={beaconPos} quaternion={beaconQuat}>
          <group ref={beaconGrp}>
            <mesh>
              <octahedronGeometry args={[0.028, 0]} />
              <meshStandardMaterial color="#ffd984" emissive={EN_ACCENT.gold} emissiveIntensity={1.6} metalness={0.3} roughness={0.2} toneMapped={false} />
            </mesh>
            <mesh position={[0, 0.09, 0]}>
              <cylinderGeometry args={[0.004, 0.011, 0.18, 8, 1, true]} />
              <meshBasicMaterial color={EN_ACCENT.gold} transparent opacity={0.35} blending={AdditiveBlending} depthWrite={false} toneMapped={false} side={DoubleSide} />
            </mesh>
          </group>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0]} material={statics.pulseMat}>
            <planeGeometry args={[0.34, 0.34]} />
          </mesh>
        </group>
      </group>
    </>
  );
}
