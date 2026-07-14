/* ═══════════════════════════════════════════════════════════════
   three.js singleton shim for react-globe.gl
   ───────────────────────────────────────────────────────────────
   Webpack chunking produced two live copies of three.js ("Multiple
   instances of Three.js being imported"). globe.gl's setPointOfView
   does `camera instanceof THREE.Camera`; with dual copies the check
   fails, the CAMERA OBJECT (instead of camera.position) enters the
   position math, Object3D.applyMatrix4 returns void, and the
   per-frame visibility pass dies on `undefined.length()` — killing
   the render loop the moment any HTML marker exists. That was the
   permanent black-canvas root cause on every device.

   three-globe, globe.gl and three-render-objects all "prefer
   consumption from global THREE, if exists" AT MODULE-EVAL TIME, so
   assigning window.THREE before react-globe.gl evaluates pins the
   camera constructor and every instanceof to ONE instance.

   The global must cover the full surface those libraries take from
   it (union of their fallback objects): three core + Timer +
   TextGeometry + CSS2DObject, all from OUR single three copy.

   This module MUST be imported before `react-globe.gl`
   (import order in PowerGlobe.jsx guarantees it).
   ═══════════════════════════════════════════════════════════════ */
import * as THREE from "three"; // three ≥0.170 ships Timer in core
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";

if (typeof window !== "undefined" && !window.THREE) {
  window.THREE = { ...THREE, TextGeometry, CSS2DObject };
}

export default THREE;
