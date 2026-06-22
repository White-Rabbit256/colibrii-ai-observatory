"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { animate, stagger } from "animejs";
import { CR_OUTLINE_GEO, CR_BBOX, PLANTS_GEO } from "./crGeo";
import { EN_ACCENT } from "../energiaData";

/* ═══════════════════════════════════════════════════════════════
   ENERGÍA — CRGridMap (Act 4) · command-center edition v2
   Premium interactive SVG map of Costa Rica (Natural Earth outline,
   public domain). Equirectangular projection, smoothed organic
   coastline (Catmull-Rom → cubic Bézier), layered luminous depth,
   animated graticule + diagonal scan sweep, glowing animated
   transmission flow into the GAM load centre, concentric pulsing
   plant nodes, and a fully keyboard-accessible HTML <button> overlay
   with edge-clamped info cards.

   WOW SEQUENCE (anime.js v4, fired once on scroll-into-view via a
   single IntersectionObserver): the coastline DRAWS ON via
   stroke-dashoffset (~1400ms easeOutCubic) → plant nodes POP IN
   staggered (anime stagger) → transmission lines DRAW/FADE in →
   energy starts FLOWING. Honours prefers-reduced-motion: the whole
   sequence is skipped and the final lit state is shown statically.
   All anime instances are tracked and paused on unmount.
   Colors derive from EN_ACCENT.
   ═══════════════════════════════════════════════════════════════ */

/* Kind palette — from EN_ACCENT (solar/load are local accents). */
const KIND = {
  hydro: EN_ACCENT.glow,       // #22d3ee
  geo: EN_ACCENT.gold,         // #F2B135
  wind: EN_ACCENT.turquoise,   // #00B5A8
  solar: "#fbbf24",
  thermal: EN_ACCENT.risk,     // #ef4444
  load: "#ffffff",
};
const KIND_LABEL = {
  hydro: ["Hidro", "Hydro"],
  geo: ["Geotérmica", "Geothermal"],
  wind: ["Eólica", "Wind"],
  solar: ["Solar", "Solar"],
  thermal: ["Térmica", "Thermal"],
  load: ["Carga", "Load"],
};
const LEGEND_ORDER = ["hydro", "geo", "wind", "solar", "thermal", "load"];
const DETAIL_EN = {
  reventazon: "305 MW · hydro",
  arenal: "ARDESA complex",
  miravalles: "geothermal",
  borinquen: "under development · 2030",
  tejona: "wind · repowering",
  guanacaste: "wind",
  sanantonio: "10.3 MW · 2026",
  moin: "thermal · backup",
  gam: "load centre",
};
/* Permanent micro-labels for the marquee nodes (the 3 biggest landmarks). */
const PERMA_LABEL = {
  reventazon: "REVENTAZÓN",
  miravalles: "MIRAVALLES",
};
const MONO = "'IBM Plex Mono',monospace";
const TURQ = EN_ACCENT.turquoise;
const GLOW = EN_ACCENT.glow;

/* ── Equirectangular projection (same idiom as Hero3D, y inverted for SVG):
      x = (lng − lngMin) · cos(meanLat) ;  y = (latMax − lat) ── */
const { lngMin, latMin, lngMax, latMax } = CR_BBOX;
const KLAT = Math.cos((((latMin + latMax) / 2) * Math.PI) / 180);
const gx = (lng) => (lng - lngMin) * KLAT;
const gy = (lat) => latMax - lat;
const LAND_W = gx(lngMax);
const LAND_H = gy(latMin);

/* 6% padding (plus extra headroom under the title chip), then the frame is
   widened to the panel's 16:10 aspect and centred — so the SVG (with
   preserveAspectRatio="none") and the HTML %-positioned overlay share the
   exact same coordinate space. */
const PAD = 0.06 * LAND_H;
const VB_Y = -(PAD + 0.07 * LAND_H);
const VB_H = LAND_H + PAD - VB_Y;
const VB_W = VB_H * 1.6;
const VB_X = (LAND_W - VB_W) / 2;
const VIEWBOX = `${VB_X.toFixed(3)} ${VB_Y.toFixed(3)} ${VB_W.toFixed(3)} ${VB_H.toFixed(3)}`;
const pctX = (x) => ((x - VB_X) / VB_W) * 100;
const pctY = (y) => ((y - VB_Y) / VB_H) * 100;

/* ── Smooth, organic coastline ───────────────────────────────────
   Convert the 133-point closed polygon into a single cubic-Bézier
   path using a cardinal (Catmull-Rom) spline at tension ~0.5. Each
   segment Pi→Pi+1 gets control points derived from neighbours
   Pi-1 and Pi+2, so the coast reads as a continuous curve while
   still passing through every real vertex (Nicoya / Osa preserved).
   The closed loop wraps neighbour indices modulo N. */
const PTS = CR_OUTLINE_GEO.map(([lng, lat]) => [gx(lng), gy(lat)]);
function smoothClosedPath(pts, tension = 0.5) {
  const n = pts.length;
  if (n < 3) return "";
  const k = (1 - tension) / 6; // cardinal scale; 0.5 → ~1/12
  let d = `M${pts[0][0].toFixed(3)} ${pts[0][1].toFixed(3)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) * k * 2;
    const c1y = p1[1] + (p2[1] - p0[1]) * k * 2;
    const c2x = p2[0] - (p3[0] - p1[0]) * k * 2;
    const c2y = p2[1] - (p3[1] - p1[1]) * k * 2;
    d += `C${c1x.toFixed(3)} ${c1y.toFixed(3)} ${c2x.toFixed(3)} ${c2y.toFixed(3)} ${p2[0].toFixed(3)} ${p2[1].toFixed(3)}`;
  }
  return d + " Z";
}
const LAND_D = smoothClosedPath(PTS, 0.5);

/* Topographic contour hints: inset copies of the smoothed coast,
   scaled toward the land centroid by small factors to suggest
   terrain bands without faking real elevation data. */
const CENT = PTS.reduce((a, p) => [a[0] + p[0] / PTS.length, a[1] + p[1] / PTS.length], [0, 0]);
const insetPath = (f) => smoothClosedPath(PTS.map((p) => [CENT[0] + (p[0] - CENT[0]) * f, CENT[1] + (p[1] - CENT[1]) * f]), 0.5);
const CONTOURS = [0.82, 0.62, 0.42].map(insetPath);

const NODES = PLANTS_GEO.map((p, i) => {
  const x = gx(p.lng);
  const y = gy(p.lat);
  return { ...p, i, x, y, px: pctX(x), py: pctY(y) };
});
const LOAD = NODES.find((n) => n.kind === "load");
const FEEDERS = NODES.filter((n) => n.kind !== "load");
const GRID_LATS = [9, 10, 11];
const GRID_LNGS = [-85, -84, -83];

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

export default function CRGridMap({ en }) {
  const [active, setActive] = useState(null);
  const reduced = useReducedMotion();

  const rootRef = useRef(null);
  const coastRef = useRef(null);       // luminous turquoise coastline (drawn on)
  const coastGlowRef = useRef(null);   // blurred halo copy (drawn on with it)
  const highlightRef = useRef(null);   // inner lit edge (drawn on with it)
  const nodeRefs = useRef([]);         // <g.crmap-core-wrap> per node (pop-in)
  const haloRefs = useRef([]);         // kind-colored glow halos (fade in)
  const lineRefs = useRef([]);         // transmission lines (draw/fade in)
  const cardRefs = useRef({});         // info card per node id (anime fade/translate)
  const anims = useRef([]);            // every anime instance, for cleanup
  const [flowing, setFlowing] = useState(false); // gates CSS energy flow + pulse

  const track = (a) => { if (a) anims.current.push(a); return a; };

  /* ── Master WOW sequence: coastline draw-on → staggered node pop-in →
        transmission draw/fade → energy flow. One IntersectionObserver,
        fires once. Reduced motion → snap to final lit state. ── */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Prepare draw-on: dash the coastline paths to their own length.
    const drawPaths = [coastRef.current, coastGlowRef.current, highlightRef.current].filter(Boolean);
    const lengths = drawPaths.map((p) => {
      let len = 0;
      try { len = p.getTotalLength() || 0; } catch { len = 0; }
      return len;
    });

    const finalState = () => {
      drawPaths.forEach((p, i) => {
        const L = lengths[i];
        if (L) { p.style.strokeDasharray = `${L}`; p.style.strokeDashoffset = "0"; }
      });
      nodeRefs.current.forEach((g) => { if (g) { g.style.opacity = "1"; g.style.transform = "scale(1)"; } });
      haloRefs.current.forEach((h) => { if (h) h.style.opacity = ""; });
      lineRefs.current.forEach((l) => { if (l) { l.style.opacity = ""; l.style.strokeDashoffset = "0"; } });
      setFlowing(true);
    };

    // Initial hidden state (only when we will animate).
    if (!reduced) {
      drawPaths.forEach((p, i) => {
        const L = lengths[i];
        if (L) { p.style.strokeDasharray = `${L}`; p.style.strokeDashoffset = `${L}`; }
      });
      nodeRefs.current.forEach((g) => { if (g) { g.style.opacity = "0"; g.style.transform = "scale(0.2)"; } });
      haloRefs.current.forEach((h) => { if (h) h.style.opacity = "0"; });
      lineRefs.current.forEach((l) => { if (l) { l.style.opacity = "0"; } });
    }

    if (reduced) { finalState(); return; }

    let fired = false;
    const runSequence = () => {
      if (fired) return;
      fired = true;

      // Phase 1 — coastline draws on.
      drawPaths.forEach((p, i) => {
        const L = lengths[i];
        if (!L) return;
        track(animate(p, {
          strokeDashoffset: [L, 0],
          duration: 1400,
          ease: "outCubic",
        }));
      });

      // Phase 2 — kind-colored halos bloom + nodes pop in, staggered.
      track(animate(haloRefs.current.filter(Boolean), {
        opacity: [0, 1],
        duration: 600,
        delay: stagger(70, { start: 1050 }),
        ease: "outQuad",
      }));
      track(animate(nodeRefs.current.filter(Boolean), {
        opacity: [0, 1],
        scale: [0.2, 1],
        duration: 620,
        delay: stagger(80, { start: 1100 }),
        ease: "outBack",
        onComplete: () => {
          // GAM load node gets one extra emphatic over-pulse.
          const loadG = nodeRefs.current[NODES.findIndex((n) => n.kind === "load")];
          if (loadG) track(animate(loadG, { scale: [1, 1.18, 1], duration: 520, ease: "inOutQuad" }));
        },
      }));

      // Phase 3 — transmission lines draw + fade in, then flow begins.
      lineRefs.current.filter(Boolean).forEach((l, i) => {
        let L = 0;
        try { L = l.getTotalLength() || 0; } catch { L = 0; }
        if (L) { l.style.strokeDasharray = `${L}`; l.style.strokeDashoffset = `${L}`; }
        track(animate(l, {
          opacity: [0, 0.95],
          strokeDashoffset: L ? [L, 0] : undefined,
          duration: 700,
          delay: 1650 + i * 60,
          ease: "outCubic",
          onComplete: i === 0 ? () => {
            // Hand the dasharray back to the CSS flow rhythm.
            lineRefs.current.filter(Boolean).forEach((ln) => { ln.style.strokeDasharray = ""; ln.style.strokeDashoffset = ""; });
            setFlowing(true);
          } : undefined,
        }));
      });
      // Safety: ensure flow turns on even if no measurable line length.
      const flowTimer = setTimeout(() => setFlowing(true), 2600);
      anims.current.push({ pause: () => clearTimeout(flowTimer) });
    };

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { runSequence(); io.unobserve(root); }
    }, { threshold: 0.25 });
    io.observe(root);

    return () => {
      io.disconnect();
      anims.current.forEach((a) => { try { a.pause(); } catch {} });
      anims.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  /* ── Info card: anime.js fade + translate on activate (reduced-motion → snap). ── */
  useEffect(() => {
    if (!active) return;
    const card = cardRefs.current[active];
    if (!card) return;
    if (reduced) { card.style.opacity = "1"; card.style.transform = card.dataset.horiz; return; }
    const a = animate(card, {
      opacity: [0, 1],
      translateY: [6, 0],
      duration: 220,
      ease: "outQuad",
    });
    return () => { try { a.pause(); } catch {} };
  }, [active, reduced]);

  const onEnter = useCallback((id) => setActive(id), []);
  const onLeave = useCallback(() => setActive(null), []);

  return (
    <div
      ref={rootRef}
      style={{
        position: "relative", aspectRatio: "16 / 10", borderRadius: 16, overflow: "hidden",
        background: `radial-gradient(120% 120% at 30% 12%, ${EN_ACCENT.navy2}, ${EN_ACCENT.navy} 60%, #050f24 100%)`,
        border: `1px solid ${TURQ}40`,
        boxShadow: `0 0 0 1px rgba(0,0,0,0.35), inset 0 0 70px rgba(0,0,0,0.5)`,
      }}
    >
      <style>{`
        @keyframes crmapFlow { to { stroke-dashoffset: -1px; } }
        @keyframes crmapSweep { 0% { transform: translateX(-60%); } 100% { transform: translateX(160%); } }
        @keyframes crmapGrid { 0%,100% { opacity: .55; } 50% { opacity: 1; } }
        @keyframes crmapPulse {
          0%, 100% { transform: scale(1); opacity: .42; }
          50% { transform: scale(1.95); opacity: .06; }
        }
        @keyframes crmapRing {
          0% { transform: scale(.3); opacity: .85; }
          75%, 100% { transform: scale(2.8); opacity: 0; }
        }
        .crmap-flow { stroke-dasharray: 0.06 0.08; }
        .crmap-flowing .crmap-flow { animation: crmapFlow 2.6s linear infinite; }
        .crmap-sweep { animation: crmapSweep 7s ease-in-out infinite; }
        .crmap-grid { animation: crmapGrid 5.5s ease-in-out infinite; }
        .crmap-halo, .crmap-ring { transform-box: fill-box; transform-origin: center; }
        .crmap-flowing .crmap-halo { animation: crmapPulse 2.6s ease-in-out infinite; }
        .crmap-flowing .crmap-ring { animation: crmapRing 3s cubic-bezier(.2,.7,.4,1) infinite; }
        .crmap-corewrap { transform-box: fill-box; transform-origin: center; }
        .crmap-node { transition: transform .18s ease; }
        .crmap-node:hover .crmap-core, .crmap-node:focus-visible .crmap-core { transform: scale(1.34); }
        .crmap-core { transform-box: fill-box; transform-origin: center; transition: transform .18s ease; }
        .crmap-btn:focus { outline: none; }
        .crmap-btn:focus-visible { outline: 2px solid ${GLOW}d9; outline-offset: 3px; border-radius: 50%; }
        @media (prefers-reduced-motion: reduce) {
          .crmap-flow { animation: none !important; }
          .crmap-sweep, .crmap-grid, .crmap-halo, .crmap-ring { animation: none !important; }
          .crmap-sweep { opacity: 0 !important; }
        }
      `}</style>

      {/* ── SVG map layer ── */}
      <svg
        viewBox={VIEWBOX}
        preserveAspectRatio="none"
        aria-hidden="true"
        className={flowing ? "crmap-flowing" : undefined}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      >
        <defs>
          {/* layered land gradient — deeper, more luminous toward the lit top edge */}
          <linearGradient id="crLand" x1="0" y1="0" x2="0.15" y2="1">
            <stop offset="0%" stopColor="#16467f" />
            <stop offset="45%" stopColor="#103663" />
            <stop offset="100%" stopColor="#0a2143" />
          </linearGradient>
          {/* subtle inner glow that sits over the land body */}
          <radialGradient id="crLandGlow" cx="0.35" cy="0.28" r="0.8">
            <stop offset="0%" stopColor={GLOW} stopOpacity="0.22" />
            <stop offset="55%" stopColor={TURQ} stopOpacity="0.06" />
            <stop offset="100%" stopColor={TURQ} stopOpacity="0" />
          </radialGradient>
          {/* transmission gradient: kind colour → turquoise (per-node, userSpaceOnUse) */}
          {FEEDERS.map((n) => (
            <linearGradient key={`g-${n.id}`} id={`crTx-${n.id}`} gradientUnits="userSpaceOnUse" x1={n.x} y1={n.y} x2={LOAD.x} y2={LOAD.y}>
              <stop offset="0%" stopColor={KIND[n.kind]} stopOpacity="0.9" />
              <stop offset="100%" stopColor={TURQ} stopOpacity="0.55" />
            </linearGradient>
          ))}
          {/* soft outer coastline glow (stronger) */}
          <filter id="crCoastGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.075" />
          </filter>
          {/* line / node glow */}
          <filter id="crSoft" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.018" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* brighter halo glow for node cores */}
          <filter id="crNodeGlow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.03" />
          </filter>
          {/* rounded panel clip so graticule + sweep stay inside */}
          <clipPath id="crPanel">
            <rect x={VB_X} y={VB_Y} width={VB_W} height={VB_H} rx={0.06} ry={0.06} />
          </clipPath>
          <linearGradient id="crSweepFade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={TURQ} stopOpacity="0" />
            <stop offset="50%" stopColor={TURQ} stopOpacity="0.12" />
            <stop offset="100%" stopColor={TURQ} stopOpacity="0" />
          </linearGradient>
        </defs>

        <g clipPath="url(#crPanel)">
          {/* faint animated graticule behind the land */}
          <g className="crmap-grid">
            {GRID_LATS.map((lat) => (
              <line key={`la${lat}`} x1={VB_X} x2={VB_X + VB_W} y1={gy(lat)} y2={gy(lat)} stroke={`${GLOW}14`} strokeWidth={0.006} />
            ))}
            {GRID_LNGS.map((lng) => (
              <line key={`lo${lng}`} x1={gx(lng)} x2={gx(lng)} y1={VB_Y} y2={VB_Y + VB_H} stroke={`${GLOW}14`} strokeWidth={0.006} />
            ))}
          </g>

          {/* diagonal scan sweep band */}
          <g className="crmap-sweep" style={{ mixBlendMode: "screen" }}>
            <rect x={VB_X - VB_W} y={VB_Y - VB_H} width={VB_W * 0.5} height={VB_H * 3} transform={`rotate(18 ${VB_X} ${VB_Y})`} fill="url(#crSweepFade)" />
          </g>

          {/* outer glow halo (blurred duplicate of the smoothed coast) — drawn on */}
          <path ref={coastGlowRef} d={LAND_D} fill="none" stroke={TURQ} strokeOpacity={0.55} strokeWidth={0.05} strokeLinejoin="round" strokeLinecap="round" filter="url(#crCoastGlow)" />

          {/* gradient land fill + inner luminous wash */}
          <path d={LAND_D} fill="url(#crLand)" strokeLinejoin="round" />
          <path d={LAND_D} fill="url(#crLandGlow)" strokeLinejoin="round" style={{ mixBlendMode: "screen" }} />

          {/* faint topographic contour bands inside the land */}
          {CONTOURS.map((d, i) => (
            <path key={`ct${i}`} d={d} fill="none" stroke={GLOW} strokeWidth={0.005} opacity={0.08 - i * 0.014} strokeLinejoin="round" />
          ))}

          {/* inner highlight stroke (reads as a lit top edge) — drawn on */}
          <path ref={highlightRef} d={LAND_D} fill="none" stroke="#ffffff" strokeOpacity={0.14} strokeWidth={0.004} strokeLinejoin="round" />

          {/* crisp luminous turquoise coastline on top — drawn on */}
          <path ref={coastRef} d={LAND_D} fill="none" stroke={TURQ} strokeWidth={0.012} strokeLinejoin="round" strokeLinecap="round" filter="url(#crSoft)" />

          {/* transmission network: every plant feeds the GAM (glowing, flowing) */}
          {FEEDERS.map((n, i) => (
            <line
              key={`tx-${n.id}`}
              ref={(el) => { lineRefs.current[i] = el; }}
              className="crmap-flow"
              x1={n.x} y1={n.y} x2={LOAD.x} y2={LOAD.y}
              stroke={`url(#crTx-${n.id})`} strokeWidth={0.009}
              strokeLinecap="round"
              filter="url(#crSoft)"
              style={{ animationDuration: `${2.2 + (n.i % 3) * 0.5}s` }}
            />
          ))}
        </g>

        {/* plant nodes — concentric premium design */}
        {NODES.map((n, idx) => {
          const c = KIND[n.kind] || "#fff";
          const isLoad = n.kind === "load";
          return (
            <g key={n.id} className="crmap-node">
              {/* kind-colored glow halo (animated bloom-in, then CSS pulse) */}
              {isLoad ? (
                <>
                  <circle className="crmap-ring" cx={n.x} cy={n.y} r={0.095} fill="none" stroke="#fff" strokeWidth={0.009} opacity={0.45} />
                  <circle ref={(el) => { haloRefs.current[idx] = el; }} className="crmap-halo" cx={n.x} cy={n.y} r={0.085} fill="#fff" opacity={0.3} filter="url(#crNodeGlow)" />
                </>
              ) : (
                <circle ref={(el) => { haloRefs.current[idx] = el; }} className="crmap-halo" cx={n.x} cy={n.y} r={0.068} fill={c} opacity={0.34} filter="url(#crNodeGlow)" style={{ animationDelay: `${n.i * 0.35}s` }} />
              )}
              {/* pop-in wrapper (anime scales opacity+scale on this <g>) */}
              <g ref={(el) => { nodeRefs.current[idx] = el; }} className="crmap-corewrap">
                {/* mid ring */}
                <circle cx={n.x} cy={n.y} r={isLoad ? 0.052 : 0.038} fill="none" stroke={c} strokeWidth={0.007} opacity={0.92} />
                {/* coloured body + white-hot core (scales on hover/focus via .crmap-core) */}
                <g className="crmap-core">
                  <circle cx={n.x} cy={n.y} r={isLoad ? 0.042 : 0.029} fill={c} opacity={0.97} filter="url(#crSoft)" />
                  <circle cx={n.x} cy={n.y} r={isLoad ? 0.02 : 0.013} fill="#fff" />
                </g>
                {active === n.id && (
                  <circle cx={n.x} cy={n.y} r={isLoad ? 0.082 : 0.063} fill="none" stroke={c} strokeWidth={0.009} opacity={0.95} />
                )}
              </g>
            </g>
          );
        })}
      </svg>

      {/* corner crosshairs / ticks — command-center vibe */}
      <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 100 100" preserveAspectRatio="none">
        {[[6, 6], [94, 6], [6, 94], [94, 94]].map(([x, y], i) => (
          <g key={i} stroke={`${TURQ}66`} strokeWidth={0.4}>
            <line x1={x - (x < 50 ? 0 : 3)} y1={y} x2={x + (x < 50 ? 3 : 0)} y2={y} vectorEffect="non-scaling-stroke" />
            <line x1={x} y1={y - (y < 50 ? 0 : 3)} x2={x} y2={y + (y < 50 ? 3 : 0)} vectorEffect="non-scaling-stroke" />
          </g>
        ))}
      </svg>

      {/* inner border glow + vignette for depth */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", borderRadius: 16, boxShadow: `inset 0 0 0 1px ${TURQ}1f, inset 0 0 44px ${TURQ}16` }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(120% 100% at 32% 18%, transparent 45%, rgba(4,12,28,0.55) 100%)" }} />

      {/* permanent micro-labels for the marquee plants */}
      {NODES.filter((n) => PERMA_LABEL[n.id]).map((n) => (
        <div
          key={`pl-${n.id}`}
          aria-hidden="true"
          style={{
            position: "absolute", left: `${Math.min(Math.max(n.px, 8), 92)}%`,
            top: `calc(${n.py}% + 16px)`, transform: "translateX(-50%)",
            fontFamily: MONO, fontSize: 8, letterSpacing: 1.2, color: `${GLOW}cc`,
            textShadow: "0 1px 5px rgba(0,0,0,0.8)", pointerEvents: "none", zIndex: 2, whiteSpace: "nowrap",
          }}
        >
          {PERMA_LABEL[n.id]}
        </div>
      ))}

      {/* GAM always-visible label */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", left: `${Math.min(Math.max(LOAD.px, 6), 94)}%`,
          top: `calc(${LOAD.py}% - 24px)`, transform: "translateX(-50%)",
          fontFamily: MONO, fontSize: 9.5, letterSpacing: 1.5, color: "#fff",
          textShadow: "0 1px 6px rgba(0,0,0,0.7)", pointerEvents: "none", zIndex: 2,
        }}
      >
        GAM
      </div>

      {/* ── Interactive overlay: one real <button> per plant ── */}
      <div role="group" aria-label={en ? "Power plants and load centre" : "Plantas de generación y centro de carga"} style={{ position: "absolute", inset: 0 }}>
        {NODES.map((n) => (
          <button
            key={`btn-${n.id}`}
            type="button"
            className="crmap-btn"
            aria-label={`${n.name} — ${en ? DETAIL_EN[n.id] : n.detail} (${KIND_LABEL[n.kind][en ? 1 : 0]})`}
            onMouseEnter={() => onEnter(n.id)}
            onMouseLeave={onLeave}
            onFocus={() => onEnter(n.id)}
            onBlur={onLeave}
            onClick={() => setActive((a) => (a === n.id ? null : n.id))}
            style={{
              position: "absolute", left: `${n.px}%`, top: `${n.py}%`,
              width: 44, height: 44, transform: "translate(-50%,-50%)", borderRadius: "50%",
              background: "transparent", border: "none", padding: 0, cursor: "pointer", zIndex: 4,
            }}
          />
        ))}

        {/* info cards (always mounted so anime can animate them in; clamped to edges) */}
        {NODES.map((n) => {
          const horiz = n.px < 26 ? "translateX(-12%)" : n.px > 74 ? "translateX(-88%)" : "translateX(-50%)";
          const vert = n.py < 30 ? { top: `calc(${n.py}% + 20px)` } : { bottom: `calc(${100 - n.py}% + 20px)` };
          const isActive = active === n.id;
          return (
            <div
              key={`card-${n.id}`}
              ref={(el) => { cardRefs.current[n.id] = el; }}
              data-horiz={horiz}
              aria-hidden={!isActive}
              style={{
                position: "absolute", left: `${Math.min(Math.max(n.px, 6), 94)}%`, ...vert, transform: horiz,
                minWidth: "min(150px, 44vw)", maxWidth: "min(220px, 62vw)",
                background: `linear-gradient(160deg, ${EN_ACCENT.navy}f2, ${EN_ACCENT.navy2}f2)`,
                backdropFilter: "blur(9px)", WebkitBackdropFilter: "blur(9px)",
                border: `1px solid ${TURQ}59`, borderRadius: 11, padding: "10px 12px", pointerEvents: "none",
                boxShadow: `0 10px 30px rgba(0,0,0,0.45), 0 0 0 1px ${TURQ}1a`,
                opacity: isActive ? 1 : 0,
                visibility: isActive ? "visible" : "hidden",
                transition: "opacity .18s ease, visibility .18s ease", zIndex: 5,
              }}
            >
              {/* connector line from card to node */}
              <span
                aria-hidden="true"
                style={{
                  position: "absolute", left: "50%", [n.py < 30 ? "top" : "bottom"]: -9,
                  width: 1, height: 9, background: `${TURQ}99`, transform: "translateX(-50%)",
                }}
              />
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: "#fff", lineHeight: 1.25 }}>{n.name}</span>
                <span style={{ width: 8, height: 8, flexShrink: 0, borderRadius: "50%", background: KIND[n.kind], boxShadow: `0 0 8px ${KIND[n.kind]}` }} />
              </div>
              <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>
                {en ? DETAIL_EN[n.id] : n.detail}
              </div>
              <span
                style={{
                  display: "inline-block", marginTop: 6, padding: "2px 7px", fontFamily: MONO,
                  fontSize: 10, letterSpacing: 1, textTransform: "uppercase",
                  color: KIND[n.kind], border: `1px solid ${KIND[n.kind]}`, borderRadius: 999,
                }}
              >
                {KIND_LABEL[n.kind][en ? 1 : 0]}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Title chip ── */}
      <div style={{ position: "absolute", top: 12, left: 14, zIndex: 3, pointerEvents: "none" }}>
        <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 2, color: GLOW }}>
          {en ? "COSTA RICA POWER GRID · INTERACTIVE" : "RED ELÉCTRICA DE COSTA RICA · INTERACTIVO"}
        </div>
        <div style={{ marginTop: 4, fontSize: 11, color: "rgba(255,255,255,0.55)", maxWidth: 420 }}>
          {en
            ? "Geography: Natural Earth (public domain) · approximate locations"
            : "Geografía: Natural Earth (dominio público) · ubicaciones aproximadas"}
        </div>
      </div>

      {/* ── Legend — horizontal pill row in a subtle container ── */}
      <div
        style={{
          position: "absolute", left: 14, bottom: 12, display: "flex", flexWrap: "wrap",
          gap: 6, alignItems: "center", maxWidth: "calc(100% - 28px)", padding: "6px 8px",
          background: `${EN_ACCENT.navy}80`, border: `1px solid ${TURQ}26`, borderRadius: 999,
          backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", zIndex: 3, pointerEvents: "none",
        }}
      >
        {LEGEND_ORDER.map((k) => (
          <span
            key={k}
            style={{
              display: "inline-flex", alignItems: "center", gap: 5, padding: "2px 8px", borderRadius: 999,
              background: "rgba(255,255,255,0.04)", fontFamily: MONO, fontSize: 10, letterSpacing: 0.3,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: KIND[k], boxShadow: `0 0 6px ${KIND[k]}` }} />
            {KIND_LABEL[k][en ? 1 : 0]}
          </span>
        ))}
      </div>
    </div>
  );
}
