"use client";
import { useEffect, useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   Energía frameloop gate — single arbiter for every WebGL canvas
   in the section (Hero3D, PowerGlobe, HydroDamCutaway).

   iOS Safari evicts WebGL contexts under GPU memory pressure; an
   evicted canvas paints solid black until the context is restored
   (owner device photo IMG_1379: black globe, HTML labels alive).
   With two canvases running frameloop="always" — each with its own
   bloom composer — the section kept 2-3 hot contexts and Safari
   churned them, which is the "flicker".

   Contract (panel v2 spec): never two Energía canvases "always"
   simultaneously.
   · The most-visible registered canvas runs "always".
   · Other on-screen canvases hold "demand" (frozen frame, valid
     context, resumes instantly).
   · Off-screen or hidden-tab canvases hold "never" (zero GPU work;
     the browser keeps the last presented frame).
   · Reduced motion never exceeds "demand".
   ═══════════════════════════════════════════════════════════════ */

const registry = new Map(); // id → { ratio, tabVisible, reduced, apply }
let idSeq = 0;

function arbitrate() {
  let winner = null;
  let best = 0;
  registry.forEach((entry, id) => {
    if (!entry.tabVisible || entry.ratio <= 0 || entry.reduced) return;
    if (entry.ratio > best) { best = entry.ratio; winner = id; }
  });
  registry.forEach((entry, id) => {
    let mode;
    if (!entry.tabVisible || entry.ratio <= 0) mode = "never";
    else if (entry.reduced) mode = "demand";
    else mode = id === winner ? "always" : "demand";
    entry.apply(mode);
  });
}

export default function useFrameloopGate(wrapRef, reduced = false) {
  // Start "always" so the first frame paints before the observer fires;
  // the arbiter corrects within a tick. No-IO browsers keep legacy behaviour.
  const [frameloop, setFrameloop] = useState(reduced ? "demand" : "always");

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const id = ++idSeq;
    const entry = {
      ratio: 0,
      tabVisible: typeof document === "undefined" ? true : !document.hidden,
      reduced,
      apply: (mode) => setFrameloop((m) => (m === mode ? m : mode)),
    };
    registry.set(id, entry);
    const io = new IntersectionObserver(
      (records) => {
        // Records arrive oldest → newest; a fast flick-scroll on a busy main
        // thread batches several per callback. Only the LAST reflects the
        // element's current state — reading records[0] can pin an off-screen
        // canvas at "always" (stale ratio) until the next threshold crossing.
        const e = records[records.length - 1];
        entry.ratio = e.isIntersecting ? Math.max(e.intersectionRatio, 0.001) : 0;
        arbitrate();
      },
      { threshold: [0, 0.05, 0.15, 0.3, 0.5, 0.75, 1] },
    );
    io.observe(el);
    const onVis = () => { entry.tabVisible = !document.hidden; arbitrate(); };
    document.addEventListener("visibilitychange", onVis);
    arbitrate();
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      registry.delete(id);
      arbitrate();
    };
  }, [wrapRef, reduced]);

  return frameloop;
}

/* Context-loss recovery: Safari may still evict a context in extremis.
   three's renderer prevents default and re-inits on restore; this hook adds
   the missing piece for gated canvases — a kick so a "demand"/"never" frame
   actually repaints once the context returns. */
export function armContextRecovery(gl, invalidate) {
  const el = gl.domElement;
  const onRestored = () => { try { invalidate(); } catch {} };
  el.addEventListener("webglcontextrestored", onRestored, false);
  return () => el.removeEventListener("webglcontextrestored", onRestored, false);
}
