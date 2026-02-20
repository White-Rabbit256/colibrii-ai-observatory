"use client";
import { useState } from "react";
import { CO, DM } from "./data";

/* =================================================================
   COLIBRII LABS — Risk Heatmap Grid v14
   CSS Grid: rows = top 10 countries, cols = 6 CAPI-CR dimensions.
   Cell intensity = score (blue for high, red for low).
   Goldman-style subtle borders and shadows.
   Zero npm dependencies.
   ================================================================= */

function cellColor(score, t) {
  if (score == null) return { bg: `${t.tx3}10`, text: t.tx3 };
  if (score >= 0.75) return { bg: `${t.cy}25`, text: t.cy };
  if (score >= 0.65) return { bg: `${t.gn}20`, text: t.gn };
  if (score >= 0.50) return { bg: `${t.am}15`, text: t.am };
  if (score >= 0.35) return { bg: `${t.or}15`, text: t.or };
  return { bg: `${t.rd}15`, text: t.rd };
}

export function RiskHeatmap({ idx, board, en, t }) {
  const [hover, setHover] = useState(null);
  const top = board.slice(0, 12);
  const dims = Object.entries(DM);
  const cols = dims.length + 2; // rank + country + 6 dims

  return (
    <div style={{ background: t.cardBg, border: `1px solid ${t.bd}`, borderRadius: 14, padding: 24, boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
      <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.vi, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
        {en ? "RISK HEATMAP" : "MAPA DE CALOR DE RIESGO"}
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "var(--font-display, 'Playfair Display', serif)", marginBottom: 16, color: t.tx }}>
        {en ? "Dimension Scores by Country" : "Puntajes por Dimensión y País"}
      </div>

      <div style={{ overflowX: "auto" }}>
        <div className="heatmap-grid" style={{ gridTemplateColumns: `32px 120px repeat(${dims.length}, 1fr)`, minWidth: 500 }}>
          {/* Header row */}
          <div className="heatmap-header" />
          <div className="heatmap-header">{en ? "Country" : "País"}</div>
          {dims.map(([dk, d]) => (
            <div key={dk} className="heatmap-header" style={{ color: d.co, textAlign: "center" }}>
              <span style={{ fontSize: 12 }}>{d.ic}</span> {dk}
            </div>
          ))}

          {/* Data rows */}
          {top.map((c, i) => {
            const isHover = hover === c.code;
            const isCR = c.code === "CRI";
            return dims.map((_, di) => di).reduce((acc, di) => {
              if (di === 0) {
                acc.push(
                  <div key={`r-${c.code}`} style={{ fontSize: 11, fontWeight: 700, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</div>,
                  <div key={`n-${c.code}`} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: isCR ? 700 : 400, color: isCR ? t.cy : t.tx, padding: "4px 0" }}
                    onMouseEnter={() => setHover(c.code)} onMouseLeave={() => setHover(null)}>
                    <span style={{ fontSize: 14 }}>{c.f}</span>
                    <span className="truncate">{en ? c.e : c.n}</span>
                  </div>
                );
              }
              const dk = dims[di][0];
              const score = idx[c.code]?.[dk];
              const { bg, text } = cellColor(score, t);
              acc.push(
                <div key={`${c.code}-${dk}`} className="heatmap-cell"
                  style={{ background: isHover ? `${text}25` : bg, color: text, fontWeight: isCR ? 700 : 600, opacity: isHover ? 1 : 0.9 }}
                  onMouseEnter={() => setHover(c.code)} onMouseLeave={() => setHover(null)}>
                  {score != null ? (score * 100).toFixed(0) : "\u2014"}
                </div>
              );
              return acc;
            }, []);
          }).flat()}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 16, fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 12, height: 12, borderRadius: 3, background: `${t.rd}20` }} />{en ? "Low" : "Bajo"}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 12, height: 12, borderRadius: 3, background: `${t.am}20` }} />{en ? "Medium" : "Medio"}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 12, height: 12, borderRadius: 3, background: `${t.gn}20` }} />{en ? "Good" : "Bueno"}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 12, height: 12, borderRadius: 3, background: `${t.cy}25` }} />{en ? "Strong" : "Fuerte"}
        </span>
      </div>
    </div>
  );
}
