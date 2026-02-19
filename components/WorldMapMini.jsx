"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CO, CC } from "./data";

/* =================================================================
   COLIBRII LABS — World Map Mini v14
   Dot-based world map showing 20 CAPI-CR countries.
   Dot size = composite score, color = tier (green/amber/red).
   Zero npm dependencies — pure SVG + CSS positioning.
   ================================================================= */

// Approximate lat/lng → percentage positions on a simplified world map
const POS = {
  SGP: { x: 77.5, y: 52 }, KOR: { x: 81, y: 33 }, JPN: { x: 85, y: 33 },
  EST: { x: 55, y: 22 }, FIN: { x: 55, y: 18 }, IRL: { x: 44, y: 26 },
  CHL: { x: 26, y: 74 }, URY: { x: 30, y: 70 }, CRI: { x: 22, y: 50 },
  PAN: { x: 23, y: 51.5 }, BRA: { x: 32, y: 62 }, COL: { x: 24, y: 54 },
  MEX: { x: 18, y: 43 }, ARG: { x: 28, y: 72 }, PER: { x: 24, y: 61 },
  DOM: { x: 25, y: 44 }, VNM: { x: 77, y: 46 }, PHL: { x: 82, y: 47 },
  MYS: { x: 77, y: 52.5 }, IDN: { x: 79, y: 56 }
};

export function WorldMapMini({ idx, en, t, dark }) {
  const [hover, setHover] = useState(null);

  const countries = CC.map((c, i) => {
    const score = idx[c]?.composite ?? 0;
    const tier = score >= 0.65 ? "ready" : score >= 0.40 ? "risk" : "deficit";
    const color = tier === "ready" ? t.gn : tier === "risk" ? t.am : t.rd;
    const size = 6 + score * 14; // 6-20px range
    const pos = POS[c] || { x: 50, y: 50 };
    const rank = i + 1;
    return { code: c, ...CO[c], score, tier, color, size, pos, rank };
  }).sort((a, b) => (b.score) - (a.score));

  return (
    <div className="world-map-container" style={{ background: t.cardBg, border: `1px solid ${t.bd}` }}>
      <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
        {en ? "GLOBAL COVERAGE" : "COBERTURA GLOBAL"}
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Fraunces',serif", marginBottom: 16, color: t.tx }}>
        {en ? "20 Countries Tracked" : "20 Paises Monitoreados"}
      </div>

      {/* Map area */}
      <div style={{ position: "relative", width: "100%", paddingBottom: "50%", background: dark ? "rgba(30,41,59,0.3)" : "rgba(238,241,248,0.5)", borderRadius: 10, overflow: "hidden" }}>
        {/* Simplified continent outlines — very subtle */}
        <svg viewBox="0 0 100 50" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }}>
          {/* North America */}
          <path d="M10,15 Q15,10 22,12 L25,18 Q22,25 18,28 L12,32 Q8,28 10,20 Z" fill={t.tx3} />
          {/* South America */}
          <path d="M22,35 Q28,32 32,38 L30,48 Q26,50 24,48 L22,42 Z" fill={t.tx3} />
          {/* Europe */}
          <path d="M44,14 Q48,12 55,14 L58,20 Q55,24 50,25 L44,22 Z" fill={t.tx3} />
          {/* Africa */}
          <path d="M48,26 Q54,25 56,30 L55,40 Q50,45 48,40 L46,34 Z" fill={t.tx3} />
          {/* Asia */}
          <path d="M60,12 Q72,10 85,15 L88,28 Q82,35 75,32 L65,28 Q58,24 60,18 Z" fill={t.tx3} />
          {/* Southeast Asia / Oceania */}
          <path d="M75,38 Q82,36 86,40 L84,48 Q78,50 75,46 Z" fill={t.tx3} />
        </svg>

        {/* Country dots */}
        {countries.map((c, i) => (
          <motion.div
            key={c.code}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="world-map-dot"
            style={{
              left: `${c.pos.x}%`,
              top: `${c.pos.y}%`,
              width: c.size,
              height: c.size,
              background: c.color,
              transform: "translate(-50%, -50%)",
              borderColor: t.cardBg,
              boxShadow: `0 0 ${c.size / 2}px ${c.color}40`
            }}
            onMouseEnter={() => setHover(c.code)}
            onMouseLeave={() => setHover(null)}
          >
            {hover === c.code && (
              <div className="world-map-tooltip" style={{ background: t.tx, color: t.cardBg }}>
                {c.f} {en ? c.e : c.n} · {(c.score * 100).toFixed(1)} · #{c.rank}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 12, fontSize: 11, color: t.tx3 }}>
        <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: t.gn, marginRight: 4 }} />{en ? "Ready" : "Preparado"} (&ge;65)</span>
        <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: t.am, marginRight: 4 }} />{en ? "At Risk" : "En Riesgo"} (40-64)</span>
        <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: t.rd, marginRight: 4 }} />{en ? "Deficit" : "Deficit"} (&lt;40)</span>
      </div>
    </div>
  );
}
