"use client";
import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { CO, CC, DM, A3_TO_A2 } from "./data";
import { Card, SH, Tag, Grid, AN, ScrollReveal, DimBadge, ScorePill, Ci, MiniStat, Flag, fadeUp, stagger, ExportBtn } from "./ui";
import { WorldMapMini } from "./WorldMapMini";
import { RiskHeatmap } from "./RiskHeatmap";

/* ═══════════════════════════════════════════════════════════════
   INDEX VIEW v13 — Full CAPI-CR leaderboard + dimension breakdown
   ═══════════════════════════════════════════════════════════════ */

export function Idx({ en, t, idx, board, dark, setTab, setSelectedCountry }) {
  const [region, setRegion] = useState("all");
  const [openDim, setOpenDim] = useState(null);
  const regions = ["all", "latam", "asia", "eu"];
  const regionLabel = { all: en ? "All" : "Todos", latam: "LATAM", asia: "Asia", eu: "Europe" };

  const filtered = useMemo(() => {
    if (region === "all") return board;
    return board.filter(c => CO[c.code]?.r === region);
  }, [board, region]);

  /* Bar chart data for dimension stacked view */
  const barData = filtered.slice(0, 15).map(c => ({
    name: c.f + " " + (en ? c.e : c.n).slice(0, 12),
    code: c.code,
    ...Object.fromEntries(Object.keys(DM).map(dk => [dk, idx[c.code]?.[dk] != null ? +(idx[c.code][dk] * DM[dk].w * 100).toFixed(1) : 0])),
    total: c.composite != null ? +(c.composite * 100).toFixed(1) : 0
  }));

  return (
    <div>
      <SH color={t.cy} label="CAPI-CR" title={en ? "Colibrii AI Preparedness Index" : "Índice de Preparación AI Colibrii"} desc={en ? "Extends IMF AIPI from 4→6 dimensions. 20 countries, 11 live World Bank indicators + 2 curated dimensions. Min-max normalization." : "Extiende AIPI del FMI de 4→6 dimensiones. 20 países, 11 indicadores BM en vivo + 2 dimensiones curadas. Normalización min-max."} />

      {/* Dimension cards with expandable descriptions */}
      <Grid cols="repeat(auto-fit,minmax(160px,1fr))" gap={10} style={{ marginBottom: 24 }}>
        {Object.entries(DM).map(([dk, d]) => (
          <Card key={dk} d={0.02} accent={d.co}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{d.ic}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: d.co }}>{en ? d.e : d.l}</div>
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 2 }}>
              <span style={{ fontSize: 11, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace" }}>{(d.w * 100).toFixed(0)}%</span>
              {d.indicators && <span style={{ fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace" }}>· {d.indicators.length} {en ? "ind." : "ind."}</span>}
            </div>
            {idx.CRI?.[dk] != null && (
              <div style={{ fontSize: 18, fontWeight: 800, fontFamily: "'IBM Plex Mono',monospace", color: d.co, marginTop: 4 }}>
                <AN v={idx.CRI[dk] * 100} p={1} />
              </div>
            )}
            {d.desc && (
              <div style={{ marginTop: 8, fontSize: 11 }}>
                <div
                  onClick={() => setOpenDim(openDim === dk ? null : dk)}
                  style={{ color: d.co, cursor: "pointer", fontWeight: 600, fontSize: 10, fontFamily: "'IBM Plex Mono',monospace", display: "flex", alignItems: "center", gap: 4, userSelect: "none" }}
                >
                  <span style={{ fontSize: 8, transition: "transform 0.2s", transform: openDim === dk ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
                  {en ? "What does this measure?" : "¿Qué mide esto?"}
                </div>
                {openDim === dk && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div style={{ marginTop: 6, color: t.tx2, lineHeight: 1.6, fontSize: 11 }}>
                      {en ? d.descEn : d.desc}
                    </div>
                    {d.indicators && (
                      <div style={{ marginTop: 6, padding: "4px 8px", background: `${d.co}08`, borderRadius: 4 }}>
                        <div style={{ fontSize: 9, color: d.co, fontFamily: "'IBM Plex Mono',monospace", letterSpacing: 1, marginBottom: 2 }}>{en ? "INDICATORS" : "INDICADORES"}</div>
                        {d.indicators.map((ind, ii) => (
                          <div key={ii} style={{ fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace" }}>{ind}</div>
                        ))}
                      </div>
                    )}
                    {d.interp && (
                      <div style={{ marginTop: 6, fontSize: 10, color: t.tx3, fontStyle: "italic", borderLeft: `2px solid ${d.co}40`, paddingLeft: 8 }}>
                        {en ? d.interpEn : d.interp}
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            )}
          </Card>
        ))}
      </Grid>

      {/* Methodology */}
      <Card d={0.1} style={{ marginBottom: 24, textAlign: "center", padding: "16px 20px" }}>
        <div style={{ fontSize: 11, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 6 }}>{en ? "METHODOLOGY" : "METODOLOGÍA"}</div>
        <div style={{ fontSize: 14, color: t.cy, fontFamily: "'IBM Plex Mono',monospace", fontWeight: 700 }}>{en ? "Weighted composite across 6 dimensions" : "Compuesto ponderado de 6 dimensiones"}</div>
        <div style={{ fontSize: 11, color: t.tx2, marginTop: 4 }}>{en ? "11 World Bank indicators + 2 curated dimensions · Min-max normalization · Benchmarked vs IMF AIPI" : "11 indicadores Banco Mundial + 2 dimensiones curadas · Normalización min-max · Comparado con IMF AIPI"}</div>
      </Card>

      {/* World Map */}
      <ScrollReveal>
        <div style={{ marginBottom: 24 }}>
          <WorldMapMini idx={idx} en={en} t={t} dark={dark} onCountryClick={(code) => {
            if (setSelectedCountry) setSelectedCountry(code);
            if (setTab) setTab("countries");
          }} />
        </div>
      </ScrollReveal>

      {/* Risk Heatmap */}
      <ScrollReveal>
        <div style={{ marginBottom: 24 }}>
          <RiskHeatmap idx={idx} board={board} en={en} t={t} />
        </div>
      </ScrollReveal>

      {/* Region filter */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {regions.map(r => (
          <button key={r} onClick={() => setRegion(r)} style={{ padding: "5px 12px", fontSize: 11, fontWeight: 600, border: `1px solid ${region === r ? t.cy : t.bd}`, borderRadius: 6, background: region === r ? `${t.cy}10` : "transparent", color: region === r ? t.cy : t.tx3, fontFamily: "'IBM Plex Mono',monospace" }}>
            {regionLabel[r]}
          </button>
        ))}
      </div>

      {/* Stacked bar chart */}
      <ScrollReveal>
        <Card style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.vi, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
            {en ? "DIMENSION CONTRIBUTIONS" : "CONTRIBUCIONES POR DIMENSIÓN"}
          </div>
          <ResponsiveContainer width="100%" height={Math.max(filtered.slice(0, 15).length * 32, 200)}>
            <BarChart data={barData} layout="vertical" margin={{ left: 0, right: 20, top: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#1e293b" : "#d1d5e0"} horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: dark ? "#94a3b8" : "#475569" }} />
              <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 10, fill: dark ? "#94a3b8" : "#475569" }} />
              <Tooltip contentStyle={{ background: dark ? "#111827" : "#fff", border: `1px solid ${dark ? "#1e293b" : "#d1d5e0"}`, borderRadius: 8, fontSize: 11 }} />
              {Object.entries(DM).map(([dk, d]) => (
                <Bar key={dk} dataKey={dk} stackId="dims" fill={d.co} name={en ? d.e : d.l} radius={dk === "D6" ? [0, 4, 4, 0] : undefined} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </ScrollReveal>

      {/* Leaderboard table */}
      <Card>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table data-table-idx">
            <thead>
              <tr>
                <th>#</th>
                <th></th>
                {Object.entries(DM).map(([dk, d]) => <th key={dk} style={{ color: d.co, textAlign: "center" }}>{dk}</th>)}
                <th style={{ textAlign: "center" }}>CAPI</th>
                <th>{en ? "Status" : "Estado"}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={c.code} className={c.code === "CRI" ? "highlight" : ""}>
                  <td style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 700, fontSize: 11, color: t.tx3, textAlign: "center" }}>{board.indexOf(c) + 1}</td>
                  <td style={{ whiteSpace: "nowrap" }} title={en ? c.e : c.n}><Flag code={A3_TO_A2[c.code]} size={16} /></td>
                  {Object.keys(DM).map(dk => (
                    <td key={dk} style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, textAlign: "center", color: idx[c.code]?.[dk] >= 0.65 ? t.gn : idx[c.code]?.[dk] >= 0.40 ? t.am : t.rd }}>
                      {idx[c.code]?.[dk] != null ? (idx[c.code][dk] * 100).toFixed(1) : "—"}
                    </td>
                  ))}
                  <td style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 700, fontSize: 13, textAlign: "center" }}>
                    {c.composite != null ? (c.composite * 100).toFixed(1) : "—"}
                  </td>
                  <td><ScorePill score={c.composite} en={en} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Ci s={en ? "World Bank API (live), Oxford Insights, IMF AIPI, OWASP" : "API Banco Mundial (vivo), Oxford Insights, IMF AIPI, OWASP"} />
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COMPARE VIEW v13 — 3-country radar overlay + dimension table
   ═══════════════════════════════════════════════════════════════ */

export function Compare({ en, t, idx, board, dark }) {
  const [sel, setSel] = useState(["CRI", "CHL", "SGP"]);
  const colors = [t.cy, t.am, t.vi];

  const handleChange = (i, val) => {
    const next = [...sel];
    next[i] = val;
    setSel(next);
  };

  const radarData = Object.entries(DM).map(([dk, d]) => {
    const row = { dim: en ? d.e : d.l };
    sel.forEach((c, i) => { row[c] = idx[c]?.[dk] != null ? +(idx[c][dk] * 100).toFixed(1) : 0; });
    return row;
  });

  return (
    <div>
      <SH color={t.pk} label={en ? "Compare" : "Comparar"} title={en ? "Country Comparison" : "Comparación de Países"} desc={en ? "Select up to 3 countries to compare across all 6 CAPI-CR dimensions. Radar overlay + dimension table." : "Selecciona hasta 3 países para comparar en las 6 dimensiones CAPI-CR. Radar + tabla de dimensiones."} />

      {/* Country Selectors — Flag Buttons */}
      <Grid cols="repeat(3,1fr)" gap={10} style={{ marginBottom: 24 }}>
        {sel.map((s, i) => (
          <Card key={i} d={0.02} style={{ padding: 16, borderTop: `3px solid ${colors[i]}` }}>
            <div style={{ fontSize: 10, color: colors[i], fontFamily: "'IBM Plex Mono',monospace", marginBottom: 8 }}>{en ? "COUNTRY" : "PAÍS"} {i + 1}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <Flag code={A3_TO_A2[s]} size={28} />
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: t.tx }}>{en ? CO[s].e : CO[s].n}</div>
                <div style={{ fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace" }}>{CO[s].cont} · {CO[s].pop}</div>
              </div>
            </div>
            <div className="flag-selector">
              {CC.map(c => (
                <button key={c} className={`flag-btn ${s === c ? "selected" : ""}`} onClick={() => handleChange(i, c)} title={en ? CO[c].e : CO[c].n} style={s === c ? { borderColor: colors[i], color: colors[i], background: `${colors[i]}10` } : {}}>
                  <Flag code={A3_TO_A2[c]} size={18} />
                </button>
              ))}
            </div>
          </Card>
        ))}
      </Grid>

      {/* Radar */}
      <Card style={{ marginBottom: 24 }}>
        <ResponsiveContainer width="100%" height={320}>
          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke={dark ? "#1e293b" : "#d1d5e0"} />
            <PolarAngleAxis dataKey="dim" tick={{ fontSize: 10, fill: dark ? "#94a3b8" : "#475569" }} />
            <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
            {sel.map((c, i) => (
              <Radar key={c} name={`${CO[c].f} ${en ? CO[c].e : CO[c].n}`} dataKey={c} stroke={colors[i]} fill={colors[i]} fillOpacity={i === 0 ? 0.15 : 0.06} strokeWidth={i === 0 ? 2.5 : 1.5} strokeDasharray={i > 0 ? "4 2" : undefined} />
            ))}
            <Tooltip contentStyle={{ background: dark ? "#111827" : "#fff", border: `1px solid ${dark ? "#1e293b" : "#d1d5e0"}`, borderRadius: 8, fontSize: 12 }} />
          </RadarChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", fontSize: 12 }}>
          {sel.map((c, i) => <span key={c} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><span style={{ color: colors[i] }}>●</span> <Flag code={A3_TO_A2[c]} size={14} /> {en ? CO[c].e : CO[c].n}</span>)}
        </div>
      </Card>

      {/* Dimension comparison table */}
      <Card>
        <div className="scroll-hint">
          <span>{en ? "Swipe to see full table" : "Desliza para ver tabla completa"}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </div>
        <div className="table-scroll-wrapper">
          <table className="data-table data-table-compare">
            <thead>
              <tr>
                <th>{en ? "Dimension" : "Dimensión"}</th>
                {sel.map((c, i) => <th key={c} style={{ color: colors[i], textAlign: "center", whiteSpace: "nowrap" }}><Flag code={A3_TO_A2[c]} size={16} style={{ marginRight: 3, verticalAlign: "middle" }} />{en ? CO[c].e : CO[c].n}</th>)}
              </tr>
            </thead>
            <tbody>
              {Object.entries(DM).map(([dk, d]) => (
                <tr key={dk}>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <span style={{ fontSize: 13, marginRight: 4 }}>{d.ic}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: d.co }}>{en ? d.e : d.l}</span>
                  </td>
                  {sel.map((c, i) => (
                    <td key={c} style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 700, textAlign: "center", color: idx[c]?.[dk] >= 0.65 ? t.gn : idx[c]?.[dk] >= 0.40 ? t.am : t.rd }}>
                      {idx[c]?.[dk] != null ? (idx[c][dk] * 100).toFixed(1) : "—"}
                    </td>
                  ))}
                </tr>
              ))}
              <tr style={{ fontWeight: 700, borderTop: `2px solid ${t.bd}` }}>
                <td style={{ whiteSpace: "nowrap", fontWeight: 700, fontSize: 11 }}>CAPI-CR Index</td>
                {sel.map((c, i) => (
                  <td key={c} style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 800, fontSize: 13, textAlign: "center", color: colors[i] }}>
                    {idx[c]?.composite != null ? (idx[c].composite * 100).toFixed(1) : "—"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <Ci s={en ? "World Bank API, Oxford Insights, OWASP" : "API Banco Mundial, Oxford Insights, OWASP"} />
      </Card>
    </div>
  );
}
