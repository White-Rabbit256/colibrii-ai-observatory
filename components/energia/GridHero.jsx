"use client";
import { useRef, useEffect } from "react";
import { GRID_NODES } from "../energiaData";

/* ═══════════════════════════════════════════════════════════════
   ENERGÍA — GridHero
   Hero canvas background: stylized night view of Costa Rica's
   electric grid. Follows the flagship 2D-canvas idiom
   (HeroBackground in ILIADeep.jsx): RAF loop, DPR capped at 2,
   pauses on tab hide, single static frame under
   prefers-reduced-motion. Zero new dependencies.
   ═══════════════════════════════════════════════════════════════ */

/* ── Node palette by generation kind ── */
const KIND_COLORS = {
  hydro: "#22d3ee",
  geo: "#F2B135",
  wind: "#00B5A8",
  solar: "#fbbf24",
  thermal: "#ef4444",
  load: "#ffffff",
};

/* ── Stylized Costa Rica silhouette — hand-tuned points normalized
      to the shape's own 0..1 bbox (x: W→E, y: N→S). Nicoya and Osa
      peninsulas hinted on the Pacific side, smoother Caribbean side,
      wide in the northwest, narrowing southeast. ── */
const CR_OUTLINE = [
  [0.07, 0.06], // Bahía Salinas — NW corner, Nicaragua border
  [0.18, 0.00], // Lake Nicaragua shoreline
  [0.36, 0.04], // northern plains
  [0.54, 0.10], // Río San Juan bend
  [0.71, 0.08], // Barra del Colorado — Caribbean NE corner
  [0.81, 0.24], // Tortuguero coast
  [0.88, 0.40], // Limón
  [1.00, 0.55], // Sixaola — Panama border, Caribbean side
  [0.92, 0.74], // border cuts inland to the SW
  [0.90, 1.00], // Punta Burica — southernmost tip
  [0.80, 0.85], // Golfo Dulce (inner)
  [0.71, 0.96], // Osa Peninsula tip
  [0.63, 0.79], // Drake Bay
  [0.59, 0.66], // Dominical coast
  [0.44, 0.55], // Quepos / Herradura
  [0.36, 0.45], // Gulf of Nicoya (inner, Puntarenas)
  [0.29, 0.57], // Nicoya Peninsula east shore
  [0.21, 0.61], // Cabo Blanco — Nicoya tip
  [0.09, 0.42], // Nicoya west coast
  [0.00, 0.16], // Cabo Santa Elena / Papagayo
];

const hexRgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

export default function GridHero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let running = false;
    let last = 0;
    let dpr = 1, W = 0, H = 0;
    let map = { x: 0, y: 0, w: 0, h: 0 }; // silhouette bbox on canvas
    let particles = [];

    /* Offscreen layer: silhouette + transmission lines (static, rebuilt on resize) */
    const base = document.createElement("canvas");
    const bctx = base.getContext("2d");

    const nodes = GRID_NODES.map((n, i) => ({
      ...n,
      rgb: hexRgb(KIND_COLORS[n.kind] || "#ffffff"),
      phase: i * 0.9,
    }));
    const load = nodes.find((n) => n.kind === "load") || nodes[nodes.length - 1];
    const feeders = nodes.filter((n) => n !== load);

    /* Node positions live inside the silhouette's bbox, not the raw canvas */
    const px = (n) => map.x + n.x * map.w;
    const py = (n) => map.y + n.y * map.h;

    /* ── Pre-render silhouette + lines (keeps shadowBlur off the hot path) ── */
    const buildBase = () => {
      base.width = Math.max(1, Math.round(W * dpr));
      base.height = Math.max(1, Math.round(H * dpr));
      bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bctx.clearRect(0, 0, W, H);

      bctx.beginPath();
      CR_OUTLINE.forEach(([ox, oy], i) => {
        const x = map.x + ox * map.w, y = map.y + oy * map.h;
        if (i === 0) bctx.moveTo(x, y); else bctx.lineTo(x, y);
      });
      bctx.closePath();
      bctx.lineJoin = "round";
      bctx.fillStyle = "rgba(13,38,76,0.55)";
      bctx.fill();

      /* Soft inner glow: blurred re-stroke under the crisp coastline */
      bctx.save();
      bctx.shadowBlur = 12;
      bctx.shadowColor = "rgba(0,181,168,0.55)";
      bctx.strokeStyle = "rgba(0,181,168,0.20)";
      bctx.lineWidth = 2;
      bctx.stroke();
      bctx.restore();
      bctx.strokeStyle = "rgba(0,181,168,0.35)";
      bctx.lineWidth = 1.5;
      bctx.stroke();

      /* Transmission lines: every generator feeds the GAM load center */
      bctx.strokeStyle = "rgba(0,181,168,0.25)";
      bctx.lineWidth = 1;
      feeders.forEach((n) => {
        bctx.beginPath();
        bctx.moveTo(px(n), py(n));
        bctx.lineTo(px(load), py(load));
        bctx.stroke();
      });
    };

    /* ── Per-frame painters ── */
    const drawParticles = (dt) => {
      for (const p of particles) {
        p.x += p.vx * dt; p.y += p.vy * dt;
        if (p.x < -4) p.x = W + 4; else if (p.x > W + 4) p.x = -4;
        if (p.y < -4) p.y = H + 4; else if (p.y > H + 4) p.y = -4;
        ctx.fillStyle = `rgba(${p.rgb[0]},${p.rgb[1]},${p.rgb[2]},${p.a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawNode = (n, glow) => {
      const x = px(n), y = py(n);
      const [r, g, b] = n.rgb;
      const core = (n.kind === "load" ? 3.6 : 2.6) * (0.85 + glow * 0.3);
      const R = core * 5;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, R);
      grad.addColorStop(0, `rgba(${r},${g},${b},${0.32 * glow})`);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(x, y, R, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = `rgba(${r},${g},${b},${0.55 + glow * 0.45})`;
      ctx.beginPath(); ctx.arc(x, y, core, 0, Math.PI * 2); ctx.fill();
    };

    const drawPackets = (t) => {
      feeders.forEach((n, i) => {
        const dur = 3000 + (i % 3) * 800; /* 3–4.6s loop, staggered start */
        const k = ((t + i * 700) % dur) / dur;
        const x = px(n) + (px(load) - px(n)) * k;
        const y = py(n) + (py(load) - py(n)) * k;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 7);
        grad.addColorStop(0, "rgba(125,255,242,0.5)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "rgba(206,255,250,0.95)";
        ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI * 2); ctx.fill();
      });
    };

    const drawLoadRing = (t) => {
      const k = (t % 2600) / 2600;
      ctx.strokeStyle = `rgba(255,255,255,${0.28 * (1 - k)})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(px(load), py(load), 6 + k * 22, 0, Math.PI * 2);
      ctx.stroke();
    };

    const drawScene = (t, dt) => {
      ctx.clearRect(0, 0, W, H);
      drawParticles(dt);
      ctx.drawImage(base, 0, 0, W, H);
      if (W >= 640) drawPackets(t);
      drawLoadRing(t);
      nodes.forEach((n) => drawNode(n, 0.5 + 0.5 * Math.sin(t * 0.0019 + n.phase)));
    };

    /* Reduced motion: one fixed frame, no loop */
    const drawStatic = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(base, 0, 0, W, H);
      nodes.forEach((n) => drawNode(n, 0.8));
    };

    /* ── RAF loop, paused while the tab is hidden ── */
    const loop = (ts) => {
      const dt = Math.min((ts - last) / 1000, 0.05);
      last = ts;
      drawScene(ts, dt);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width; H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0); /* reset before scaling — no compounding */
      ctx.scale(dpr, dpr);

      /* Silhouette bbox: ~70% of width, height-capped, centered */
      const aspect = 0.88;
      let mw = W * 0.7, mh = mw * aspect;
      if (mh > H * 0.84) { mh = H * 0.84; mw = mh / aspect; }
      map = { x: (W - mw) / 2, y: (H - mh) / 2, w: mw, h: mh };

      /* Ambient drift particles — fewer on small screens */
      const colors = ["#00B5A8", "#22d3ee", "#ffffff"];
      particles = Array.from({ length: W < 640 ? 12 : 25 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 9, /* px per second */
        vy: (Math.random() - 0.5) * 9,
        r: 0.6 + Math.random() * 1.1,
        a: 0.15 + Math.random() * 0.2,
        rgb: hexRgb(colors[Math.floor(Math.random() * colors.length)]),
      }));

      buildBase();
      if (reduced) drawStatic();
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduced) {
      document.addEventListener("visibilitychange", onVisibility);
      start();
    }
    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {/* Deep navy base — radial/linear mix */}
      <div style={{
        position: "absolute", inset: 0,
        background:
          "radial-gradient(110% 80% at 50% 22%, rgba(16,41,79,0.95) 0%, rgba(16,41,79,0) 62%)," +
          "linear-gradient(180deg, #0A1F3F 0%, #10294f 55%, #0A1F3F 100%)",
      }} />

      {/* Animated glow blobs */}
      <div className="enGridBlob" style={{
        position: "absolute", width: 440, height: 440, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,181,168,0.18) 0%, transparent 70%)",
        top: "-18%", left: "-8%", filter: "blur(60px)",
        animation: "enGridMesh1 14s ease-in-out infinite",
      }} />
      <div className="enGridBlob" style={{
        position: "absolute", width: 360, height: 360, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(242,177,53,0.10) 0%, transparent 70%)",
        bottom: "-22%", right: "-6%", filter: "blur(55px)",
        animation: "enGridMesh2 18s ease-in-out infinite",
      }} />
      <div className="enGridBlob" style={{
        position: "absolute", width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)",
        top: "26%", right: "12%", filter: "blur(48px)",
        animation: "enGridMesh3 11s ease-in-out infinite",
      }} />

      {/* Canvas: silhouette + grid nodes + transmission pulses */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />

      {/* Scan line effect */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
      }} />

      <style>{`
        @keyframes enGridMesh1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(42px, 28px) scale(1.18); } }
        @keyframes enGridMesh2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-34px, -22px) scale(1.12); } }
        @keyframes enGridMesh3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(24px, -18px) scale(0.92); } }
        @media (prefers-reduced-motion: reduce) { .enGridBlob { animation: none !important; } }
      `}</style>
    </div>
  );
}
