"use client";
import { useState, useMemo } from "react";
import { Card, SH, Grid, ScrollReveal, Tag, Ci, ProgressBar, MiniStat } from "./ui";
import { Icon } from "./system/Icon";
import { ITU_DIMENSIONS, ITU_FINDINGS, CAPI_ITU_MAPPING } from "./data";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — AI Readiness Assessment
   13-Dimension Radar · CAPI-CR↔ITU Mapping · Key Findings
   ═══════════════════════════════════════════════════════════════ */

/* ── FACTOR COLORS ── */
const FACTOR_COLORS = {
  Data: "#2563eb", Datos: "#2563eb",
  Infrastructure: "#6366f1", Infraestructura: "#6366f1",
  Skills: "#10b981", Habilidades: "#10b981",
  Innovation: "#f59e0b", Innovación: "#f59e0b",
  Policy: "#ef4444", Política: "#ef4444",
  Ecosystem: "#ec4899", Ecosistema: "#ec4899",
  Sustainability: "#14b8a6", Sostenibilidad: "#14b8a6",
  Inclusion: "#8b5cf6", Inclusión: "#8b5cf6",
};

/* ── DATA READINESS STAGES ── */
const DATA_STAGES = (en) => [
  { stage: 1, name: en ? "Quality" : "Calidad", desc: en ? "Data accuracy, completeness, and timeliness" : "Precisión, completitud y oportunidad de datos", color: "#2563eb" },
  { stage: 2, name: en ? "Representativeness" : "Representatividad", desc: en ? "Diverse, unbiased datasets reflecting target populations" : "Conjuntos de datos diversos, sin sesgo, reflejando poblaciones objetivo", color: "#6366f1" },
  { stage: 3, name: en ? "Processing" : "Procesamiento", desc: en ? "Capability to clean, label, and prepare data for AI" : "Capacidad para limpiar, etiquetar y preparar datos para AI", color: "#10b981" },
  { stage: 4, name: en ? "Fairness" : "Equidad", desc: en ? "Governance mechanisms to detect and mitigate bias" : "Mecanismos de gobernanza para detectar y mitigar sesgo", color: "#f59e0b" },
  { stage: 5, name: en ? "Trustworthy Deployment" : "Despliegue Confiable", desc: en ? "Ethical, transparent, accountable AI systems" : "Sistemas AI éticos, transparentes y responsables", color: "#ef4444" },
];

/* ── DIGITAL DIVIDE DATA ── */
const DIGITAL_DIVIDE = (en) => [
  { metric: en ? "5G Coverage (High Income)" : "Cobertura 5G (Altos Ingresos)", value: 84, color: "#2563eb" },
  { metric: en ? "5G Coverage (Low Income)" : "Cobertura 5G (Bajos Ingresos)", value: 4, color: "#ef4444" },
  { metric: en ? "Internet Users (Global)" : "Usuarios Internet (Global)", value: 55.6, color: "#6366f1" },
  { metric: en ? "CR Internet Penetration" : "Penetración Internet CR", value: 83, color: "#10b981" },
  { metric: en ? "People Offline (Billions)" : "Sin Conexión (Miles de Millones)", value: null, display: "2.6B", color: "#f59e0b" },
];

export function Readiness({ en, t }) {
  const [selectedFinding, setSelectedFinding] = useState(null);
  const [showBenchmark, setShowBenchmark] = useState(true);
  const dims = ITU_DIMENSIONS(en);
  const findings = ITU_FINDINGS(en);
  const mapping = CAPI_ITU_MAPPING(en);
  const stages = DATA_STAGES(en);
  const divide = DIGITAL_DIVIDE(en);

  /* ── Radar chart data ── */
  const radarData = useMemo(() =>
    dims.map(d => ({
      dimension: d.short,
      fullName: d.dimension,
      "Costa Rica": Math.round(d.crScore * 100),
      [en ? "Global Avg" : "Promedio Global"]: Math.round(d.globalAvg * 100),
    })), [dims, en]);

  /* ── CR Score averages ── */
  const crAvg = useMemo(() => {
    const scores = dims.map(d => d.crScore);
    return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);
  }, [dims]);

  const globalAvg = useMemo(() => {
    const scores = dims.map(d => d.globalAvg);
    return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);
  }, [dims]);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      {/* ── HEADER ── */}
      <SH
        color={t.cy}
        label={en ? "ITU AI READINESS FRAMEWORK" : "MARCO PREPARACIÓN AI UIT"}
        title={en ? "AI Readiness Assessment" : "Evaluación de Preparación AI"}
        desc={en
          ? "Costa Rica analyzed across the ITU's 13-dimension AI Readiness Framework. The ITU (International Telecommunication Union) is the UN agency for digital technologies."
          : "Costa Rica analizada en las 13 dimensiones del Marco de Preparación AI de la UIT (Unión Internacional de Telecomunicaciones), la agencia de la ONU para tecnologías digitales."
        }
      />

      {/* ── INTRO CONTEXT BOX ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16, background: `${t.cy}06`, border: `1px solid ${t.cy}20` }}>
          <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7, margin: 0 }}>
            {en
              ? "The ITU AI Readiness Framework evaluates countries across 13 dimensions — from data quality and digital infrastructure to governance and sustainability. Published in the 2026 'AI Ready' report, it is the most comprehensive UN assessment of a country's preparedness to adopt, develop, and govern AI responsibly."
              : "El Marco de Preparación AI de la UIT evalúa países en 13 dimensiones — desde calidad de datos e infraestructura digital hasta gobernanza y sostenibilidad. Publicado en el reporte 'AI Ready' 2026, es la evaluación más completa de la ONU sobre la preparación de un país para adoptar, desarrollar y gobernar AI responsablemente."
            }
          </p>
        </Card>
      </ScrollReveal>

      {/* ── OVERVIEW STATS ── */}
      <ScrollReveal>
        <Grid cols="repeat(auto-fit, minmax(140px, 1fr))" gap={8} className="mobile-stat-grid" style={{ marginBottom: 16 }}>
          {[
            { label: en ? "CR Average Score" : "Puntaje Promedio CR", value: crAvg, color: t.or,
              sub: en ? "across all 13 dimensions" : "en las 13 dimensiones" },
            { label: en ? "Global Average" : "Promedio Global", value: globalAvg, color: t.cy,
              sub: en ? "benchmark for comparison" : "referencia para comparación" },
            { label: en ? "Dimensions" : "Dimensiones", value: "13", color: t.vi,
              sub: en ? "from data to governance to inclusion" : "de datos a gobernanza a inclusión" },
            { label: en ? "Factors" : "Factores", value: "6", color: t.gn,
              sub: en ? "grouped analytical categories" : "categorías analíticas agrupadas" },
            { label: en ? "Key Findings" : "Hallazgos Clave", value: "13", color: t.pk,
              sub: en ? "critical insights for CR policy" : "hallazgos críticos para políticas CR" },
          ].map((s, i) => (
            <Card key={i} d={i * 0.04} style={{ padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: s.color, fontFamily: "'IBM Plex Mono',monospace" }}>{s.value}</div>
              <div style={{ fontSize: 10, color: t.tx3, fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontSize: 9, color: t.tx3, marginTop: 2, lineHeight: 1.3 }}>{s.sub}</div>
            </Card>
          ))}
        </Grid>
      </ScrollReveal>

      {/* ── 13-DIMENSION RADAR CHART ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.cy, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
                {en ? "RADAR ANALYSIS" : "ANÁLISIS RADAR"}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: t.tx }}>
                {en ? "13 AI Readiness Dimensions" : "13 Dimensiones de Preparación AI"}
              </h3>
            </div>
            <button
              onClick={() => setShowBenchmark(!showBenchmark)}
              style={{
                padding: "5px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600,
                background: showBenchmark ? `${t.cy}15` : t.sf, color: showBenchmark ? t.cy : t.tx3,
                border: `1px solid ${showBenchmark ? t.cy : t.bd}`, cursor: "pointer"
              }}
            >
              {en ? "Global Avg" : "Promedio"}: {showBenchmark ? "ON" : "OFF"}
            </button>
          </div>

          <div style={{ width: "100%", height: "min(380px, 60vw)" }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke={t.bd} />
                <PolarAngleAxis
                  dataKey="dimension"
                  tick={{ fontSize: 9, fill: t.tx2 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fontSize: 8, fill: t.tx3 }}
                  tickCount={5}
                />
                <Radar
                  name="Costa Rica"
                  dataKey="Costa Rica"
                  stroke={t.cy}
                  fill={t.cy}
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                {showBenchmark && (
                  <Radar
                    name={en ? "Global Avg" : "Promedio Global"}
                    dataKey={en ? "Global Avg" : "Promedio Global"}
                    stroke={t.am}
                    fill={t.am}
                    fillOpacity={0.1}
                    strokeWidth={1.5}
                    strokeDasharray="4 3"
                  />
                )}
                <Tooltip
                  contentStyle={{
                    background: t.cardBg,
                    border: `1px solid ${t.bd}`,
                    borderRadius: 8,
                    fontSize: 12,
                    color: t.tx
                  }}
                  formatter={(value, name) => [`${value}%`, name]}
                />
                <Legend wrapperStyle={{ fontSize: 11, color: t.tx2 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Dimension detail table — Desktop */}
          <div className="table-scroll-wrapper hide-mobile" style={{ marginTop: 10 }}>
            <table className="data-table" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left" }}>{en ? "Factor" : "Factor"}</th>
                  <th style={{ textAlign: "left" }}>{en ? "Dimension" : "Dimensión"}</th>
                  <th>🇨🇷 CR</th>
                  <th>🌐 {en ? "Global" : "Global"}</th>
                  <th>{en ? "Gap" : "Brecha"}</th>
                </tr>
              </thead>
              <tbody>
                {dims.map((d) => {
                  const gap = d.crScore - d.globalAvg;
                  const gapColor = gap >= 0 ? t.gn : t.rd;
                  return (
                    <tr key={d.id}>
                      <td>
                        <Tag color={FACTOR_COLORS[d.factor] || t.cy}>{d.factor}</Tag>
                      </td>
                      <td style={{ fontSize: 12 }}>{d.dimension}</td>
                      <td style={{ textAlign: "center", fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, fontWeight: 600 }}>
                        {(d.crScore * 100).toFixed(0)}%
                      </td>
                      <td style={{ textAlign: "center", fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: t.tx3 }}>
                        {(d.globalAvg * 100).toFixed(0)}%
                      </td>
                      <td style={{ textAlign: "center", fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, fontWeight: 600, color: gapColor }}>
                        {gap >= 0 ? "+" : ""}{(gap * 100).toFixed(0)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Dimension cards — Mobile */}
          <div className="show-mobile" style={{ marginTop: 10 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {dims.map((d) => {
                const gap = d.crScore - d.globalAvg;
                const gapColor = gap >= 0 ? t.gn : t.rd;
                return (
                  <div key={d.id} style={{ padding: 10, borderRadius: 8, border: `1px solid ${t.bd}`, background: t.sf }}>
                    <Tag color={FACTOR_COLORS[d.factor] || t.cy}>{d.factor}</Tag>
                    <div style={{ fontSize: 13, fontWeight: 600, color: t.tx, marginTop: 4 }}>{d.dimension}</div>
                    <div style={{ display: "flex", gap: 12, marginTop: 4, fontSize: 12, fontFamily: "'IBM Plex Mono',monospace" }}>
                      <span>🇨🇷 <strong style={{ color: t.tx }}>{(d.crScore * 100).toFixed(0)}%</strong></span>
                      <span style={{ color: t.tx3 }}>🌐 {(d.globalAvg * 100).toFixed(0)}%</span>
                      <span style={{ color: gapColor, fontWeight: 600 }}>{gap >= 0 ? "+" : ""}{(gap * 100).toFixed(0)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Ci s="ITU — 'AI Ready: Standardized Framework 2.0' (Jan 2026) · Scores estimated from available indicators" />
        </Card>
      </ScrollReveal>

      {/* ── STRENGTHS vs WEAKNESSES ── */}
      <ScrollReveal>
        <Grid cols="1fr 1fr" gap={10} style={{ marginBottom: 16 }}>
          <Card accent={t.gn}>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.gn, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 8 }}>
              {en ? "CR STRENGTHS" : "FORTALEZAS CR"} ▲
            </div>
            {dims.filter(d => d.crScore >= d.globalAvg).map(d => (
              <div key={d.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: `1px solid ${t.bd}`, gap: 8 }}>
                <span style={{ fontSize: 12, color: t.tx }}>{d.dimension}</span>
                <span style={{ fontSize: 11, fontFamily: "'IBM Plex Mono',monospace", color: t.gn, fontWeight: 600, whiteSpace: "nowrap" }}>
                  CR {(d.crScore * 100).toFixed(0)}% <span style={{ fontSize: 9, color: t.tx3 }}>vs {en ? "Global" : "Global"} {(d.globalAvg * 100).toFixed(0)}%</span>
                </span>
              </div>
            ))}
          </Card>
          <Card accent={t.rd}>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.rd, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 8 }}>
              {en ? "CR GAPS" : "BRECHAS CR"} ▼
            </div>
            {dims.filter(d => d.crScore < d.globalAvg).map(d => (
              <div key={d.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: `1px solid ${t.bd}`, gap: 8 }}>
                <span style={{ fontSize: 12, color: t.tx }}>{d.dimension}</span>
                <span style={{ fontSize: 11, fontFamily: "'IBM Plex Mono',monospace", color: t.rd, fontWeight: 600, whiteSpace: "nowrap" }}>
                  CR {(d.crScore * 100).toFixed(0)}% <span style={{ fontSize: 9, color: t.tx3 }}>vs {en ? "Global" : "Global"} {(d.globalAvg * 100).toFixed(0)}%</span>
                </span>
              </div>
            ))}
          </Card>
        </Grid>
      </ScrollReveal>

      {/* ── CAPI-CR ↔ ITU MAPPING ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.vi, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
            {en ? "METHODOLOGY VALIDATION" : "VALIDACIÓN METODOLOGÍA"}
          </div>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: t.tx, marginBottom: 10 }}>
            {en ? "CAPI-CR ↔ ITU Framework Mapping" : "Mapeo CAPI-CR ↔ Marco UIT"}
          </h3>
          <p style={{ fontSize: 13, color: t.tx2, marginBottom: 10, lineHeight: 1.6 }}>
            {en
              ? "Our CAPI-CR index (Colibrii AI Preparedness Index, extending the IMF AIPI methodology) maps to the ITU 13-dimension framework, validating our approach against the UN standard."
              : "Nuestro índice CAPI-CR (Índice de Preparación AI Colibrii, extendiendo metodología AIPI del FMI) mapea al marco de 13 dimensiones de la UIT, validando nuestro enfoque contra el estándar ONU."
            }
          </p>
          {/* Mapping table — Desktop */}
          <div className="table-scroll-wrapper hide-mobile">
            <table className="data-table" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left" }}>{en ? "CAPI-CR Dimension" : "Dimensión CAPI-CR"}</th>
                  <th style={{ textAlign: "left" }}>{en ? "ITU Dimensions" : "Dimensiones UIT"}</th>
                  <th style={{ textAlign: "left" }}>{en ? "Coverage" : "Cobertura"}</th>
                </tr>
              </thead>
              <tbody>
                {mapping.map((m, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, fontSize: 12 }}>{m.capiDim}</td>
                    <td style={{ fontSize: 12 }}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {m.ituDims.map(id => {
                          const dim = dims.find(d => d.id === id);
                          return dim ? <Tag key={id} color={FACTOR_COLORS[dim.factor] || t.cy}>{dim.short}</Tag> : null;
                        })}
                      </div>
                    </td>
                    <td style={{ fontSize: 11, color: t.tx2, fontFamily: "'IBM Plex Mono',monospace" }}>{m.coverage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mapping cards — Mobile */}
          <div className="show-mobile">
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {mapping.map((m, i) => (
                <div key={i} style={{ padding: 10, borderRadius: 8, border: `1px solid ${t.bd}`, background: t.sf }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.vi, marginBottom: 4 }}>{m.capiDim}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 4 }}>
                    {m.ituDims.map(id => {
                      const dim = dims.find(d => d.id === id);
                      return dim ? <Tag key={id} color={FACTOR_COLORS[dim.factor] || t.cy}>{dim.short}</Tag> : null;
                    })}
                  </div>
                  <div style={{ fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace" }}>{m.coverage}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 10, padding: 8, background: `${t.gn}08`, borderRadius: 8, fontSize: 12, color: t.gn }}>
            ✓ {en ? "CAPI-CR covers 12 of 13 ITU dimensions through 6 aggregated factors" : "CAPI-CR cubre 12 de 13 dimensiones UIT mediante 6 factores agregados"}
          </div>
          <Ci s={en ? "Colibrii Labs CAPI-CR methodology · ITU AI Readiness Framework" : "Metodología CAPI-CR Colibrii Labs · Marco Preparación AI UIT"} />
        </Card>
      </ScrollReveal>

      {/* ── 13 KEY FINDINGS ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.pk, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
            {en ? "KEY FINDINGS" : "HALLAZGOS CLAVE"}
          </div>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: t.tx, marginBottom: 10 }}>
            {en ? "13 Critical Insights for Costa Rica" : "13 Hallazgos Críticos para Costa Rica"}
          </h3>

          <div style={{ display: "grid", gap: 6 }}>
            {findings.map((f) => {
              const isOpen = selectedFinding === f.id;
              return (
                <div
                  key={f.id}
                  onClick={() => setSelectedFinding(isOpen ? null : f.id)}
                  role="button"
                  tabIndex={0}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: `1px solid ${isOpen ? t.pk : t.bd}`,
                    background: isOpen ? `${t.pk}06` : t.sf,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <span style={{
                      minWidth: 22, height: 22, borderRadius: "50%",
                      background: isOpen ? t.pk : t.cy,
                      color: "#fff",
                      fontSize: 10, fontWeight: 700,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'IBM Plex Mono',monospace"
                    }}>{f.id}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: t.tx, lineHeight: 1.5 }}>{f.finding}</div>
                      {isOpen ? (
                        <div style={{ marginTop: 6, padding: 8, borderRadius: 6, background: t.sf, border: `1px solid ${t.bd}` }}>
                          <div style={{ fontSize: 10, fontFamily: "'IBM Plex Mono',monospace", color: t.cy, marginBottom: 3 }}>
                            🇨🇷 {en ? "COSTA RICA IMPLICATION" : "IMPLICACIÓN COSTA RICA"}
                          </div>
                          <div style={{ fontSize: 11, color: t.tx2, lineHeight: 1.6 }}>{f.crNote}</div>
                        </div>
                      ) : (
                        <div style={{ fontSize: 10, color: t.tx3, marginTop: 2, fontStyle: "italic" }}>
                          {en ? "Tap to see CR implication" : "Toca para ver implicación CR"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Ci s="ITU — 'AI Ready: Standardized Framework 2.0' — 13 Key Findings (Jan 2026)" />
        </Card>
      </ScrollReveal>

      {/* ── DIGITAL DIVIDE ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.or, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
            {en ? "DIGITAL DIVIDE" : "BRECHA DIGITAL"}
          </div>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: t.tx, marginBottom: 10 }}>
            {en ? "Infrastructure Inequality" : "Desigualdad de Infraestructura"}
          </h3>
          <div style={{ display: "grid", gap: 8 }}>
            {divide.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ minWidth: 150, fontSize: 11, color: t.tx2 }}>{d.metric}</div>
                <div style={{ flex: 1 }}>
                  {d.value !== null ? (
                    <ProgressBar value={d.value} max={100} color={d.color} height={8} />
                  ) : (
                    <div style={{ fontSize: 18, fontWeight: 800, color: d.color, fontFamily: "'IBM Plex Mono',monospace" }}>{d.display}</div>
                  )}
                </div>
                {d.value !== null && (
                  <div style={{ minWidth: 40, fontSize: 12, fontWeight: 700, fontFamily: "'IBM Plex Mono',monospace", color: d.color, textAlign: "right" }}>
                    {d.value}%
                  </div>
                )}
              </div>
            ))}
          </div>
          <Ci s="ITU AI Readiness Reports 2026 · World Bank Development Indicators" />
        </Card>
      </ScrollReveal>

      {/* ── DATA READINESS STAGES ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.gn, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
            {en ? "DATA READINESS MODEL" : "MODELO PREPARACIÓN DE DATOS"}
          </div>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: t.tx, marginBottom: 10 }}>
            {en ? "5-Stage Data Readiness Pipeline" : "Pipeline de 5 Etapas de Preparación de Datos"}
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {stages.map((s, i) => (
              <div key={s.stage} style={{
                flex: "1 1 130px", maxWidth: 170, padding: 10, borderRadius: 10, textAlign: "center",
                border: `2px solid ${s.color}`, background: `${s.color}06`, position: "relative"
              }}>
                <div style={{
                  position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)",
                  width: 20, height: 20, borderRadius: "50%", background: s.color, color: "#fff",
                  fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center"
                }}>{s.stage}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginTop: 8 }}>{s.name}</div>
                <div style={{ fontSize: 10, color: t.tx3, marginTop: 3, lineHeight: 1.4 }}>{s.desc}</div>
                {i < stages.length - 1 && <div className="flow-arrow" style={{ position: "absolute", right: -12, top: "50%", fontSize: 14, color: t.tx3 }}>→</div>}
              </div>
            ))}
          </div>
          <Ci s="ITU — 'AI Ready: Standardized Framework 2.0' — Data Readiness Model" />
        </Card>
      </ScrollReveal>

      {/* ── FOOTER ── */}
      <ScrollReveal>
        <div style={{ textAlign: "center", padding: "12px 0", fontSize: 11, color: t.tx3, lineHeight: 1.6 }}>
          {en
            ? "Scores estimated from available indicators; official ITU country scores pending. Framework: ITU AI Readiness 2.0 (CC BY-NC-SA 3.0 IGO)."
            : "Puntajes estimados de indicadores disponibles; puntajes oficiales UIT por país pendientes. Marco: UIT Preparación AI 2.0 (CC BY-NC-SA 3.0 IGO)."
          }
        </div>
      </ScrollReveal>
    </div>
  );
}
