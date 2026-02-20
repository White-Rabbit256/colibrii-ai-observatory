"use client";
import { useState } from "react";
import { CO, DM } from "./data";
import { Card } from "./ui";

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

      <Card d={0.02} style={{ marginBottom: 16, padding: "14px 18px", borderLeft: `3px solid ${t.cy}` }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: t.cy, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
          {en ? "HOW TO READ THIS" : "C\u00D3MO LEER ESTO"}
        </div>
        <div style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6 }}>
          {en
            ? "Each cell shows a country's score (0-100) for that dimension. Blue = strong, green = good, amber = developing, red = weak. Countries are ranked by their weighted CAPI-CR composite score."
            : "Cada celda muestra el puntaje (0-100) de un pa\u00EDs en esa dimensi\u00F3n. Azul = fuerte, verde = bueno, \u00E1mbar = en desarrollo, rojo = d\u00E9bil. Los pa\u00EDses se ordenan por su puntaje compuesto ponderado CAPI-CR."}
        </div>
      </Card>

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

      {/* What-if Scenarios */}
      <Card style={{ marginTop: 16 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.am, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
          {en ? "WHAT-IF SCENARIOS" : "ESCENARIOS QU\u00C9-PASA-SI"}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {[
            { label: en ? "If CR passes AI Law" : "Si CR aprueba Ley AI", impact: "+8-12 pts", dim: "D5 Governance", color: t.gn },
            { label: en ? "If SOC-CR completes" : "Si SOC-CR se completa", impact: "+5-8 pts", dim: "D4 Cybersecurity", color: t.cy },
            { label: en ? "If R&D doubles" : "Si I+D se duplica", impact: "+10-15 pts", dim: "D3 Innovation", color: t.vi },
          ].map((s, i) => (
            <div key={i} style={{ padding: 14, background: `${s.color}08`, border: `1px solid ${s.color}20`, borderRadius: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: s.color, fontFamily: "'IBM Plex Mono',monospace" }}>{s.impact}</div>
              <div style={{ fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace" }}>{s.dim}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
