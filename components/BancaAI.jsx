"use client";
import { useState } from "react";
import { AreaChart, Area, BarChart, Bar, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, SH, Grid, ScrollReveal, Tag, Bx, Ci, MiniStat } from "./ui";
import { Icon } from "./system/Icon";
import {
  BANCA_FRAUD_TS, BANCA_THREATS, BANCA_REG_GAP, BANCA_COSTS,
  BANCA_IFRABA, BANCA_OIJ, BANCA_CASES, BANCA_CR, BANCA_RECS,
  BANCA_STATS, BANCA_PYME, BANCA_SOURCES,
  BANCA_LEGAL_DEFENSE, BANCA_CISO, BANCA_DECISIONS, BANCA_COST_UNIT, BANCA_FRAUD_OPS
} from "./bancaData";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Banca & AI Section
   AI Agents & Banking Fraud Analysis for Costa Rica
   IFRABA Index: 78/100 (CRITICAL)
   ═══════════════════════════════════════════════════════════════ */

// ── IFRABA Semi-Circular Gauge SVG ──
function IFRABAGauge({ score }) {
  const cx = 120, cy = 100, r = 80, sw = 16;
  const getColor = (s) => s >= 80 ? "#dc2626" : s >= 60 ? "#ef4444" : s >= 40 ? "#f59e0b" : "#10b981";
  const scoreColor = getColor(score);
  const halfCirc = Math.PI * r;
  const filled = halfCirc * (score / 100);
  const arcPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
  return (
    <svg viewBox="0 0 240 130" style={{ width: "100%", maxWidth: 280, display: "block", margin: "0 auto" }}>
      <path d={arcPath} fill="none" stroke="var(--surface)" strokeWidth={sw} />
      <path d={arcPath} fill="none" stroke={scoreColor} strokeWidth={sw} strokeDasharray={`${filled} ${halfCirc}`} strokeLinecap="round" opacity={0.85} style={{ filter: `drop-shadow(0 0 8px ${scoreColor}60)` }} />
      <text x={cx} y={cy - 18} textAnchor="middle" fontSize={36} fontWeight={900} fill={scoreColor} fontFamily="'IBM Plex Mono', monospace">{score}</text>
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize={11} fill="var(--text2)" fontFamily="'IBM Plex Mono', monospace">/100</text>
      <text x={cx} y={cy + 22} textAnchor="middle" fontSize={10} fontWeight={700} fill={scoreColor} letterSpacing={2} fontFamily="'IBM Plex Mono', monospace">CRITICAL</text>
      <text x={cx - r - 4} y={cy + 16} textAnchor="end" fontSize={8} fill="var(--text3)">0</text>
      <text x={cx + r + 4} y={cy + 16} textAnchor="start" fontSize={8} fill="var(--text3)">100</text>
    </svg>
  );
}

export function BancaAI({ en, t, dark }) {
  const [expandedCase, setExpandedCase] = useState(null);
  const [expandedThreat, setExpandedThreat] = useState(null);

  const fraudTS = BANCA_FRAUD_TS(en);
  const threats = BANCA_THREATS(en);
  const regGap = BANCA_REG_GAP(en);
  const costs = BANCA_COSTS(en);
  const ifraba = BANCA_IFRABA;
  const ifrabaLabels = ifraba.labels(en);
  const ifrabaDescs = ifraba.descs(en);
  const oij = BANCA_OIJ(en);
  const cases = BANCA_CASES(en);
  const crCards = BANCA_CR(en);
  const recs = BANCA_RECS(en);
  const stats = BANCA_STATS(en);
  const pyme = BANCA_PYME(en);
  const legalDefense = BANCA_LEGAL_DEFENSE(en);
  const cisoChecklist = BANCA_CISO(en);
  const decisions = BANCA_DECISIONS(en);
  const costUnit = BANCA_COST_UNIT(en);
  const fraudOps = BANCA_FRAUD_OPS(en);

  const gridStroke = dark ? "#1e293b" : "#d1d5e0";
  const tickFill = dark ? "#94a3b8" : "#475569";
  const tipBg = dark ? "#111827" : "#fff";
  const tipBorder = `1px solid ${dark ? "#1e293b" : "#d1d5e0"}`;

  return (
    <div>
      {/* ── 1. SECTION HEADER ── */}
      <SH
        color={t.am}
        label={en ? "BANKING & AI AGENTS" : "BANCA & AGENTES AI"}
        title={en ? "The ₡6,000 Million Blind Spot" : "El Punto Ciego de ₡6,000 Millones"}
        desc={en
          ? "How AI agents, escalating fraud, and a regulatory vacuum are converging into Costa Rica's largest unpriced banking risk. IFRABA Index: 78/100 (Critical)."
          : "Cómo agentes AI, fraude en escalada y un vacío regulatorio convergen en el mayor riesgo bancario no valorado de Costa Rica. Índice IFRABA: 78/100 (Crítico)."}
      />

      {/* ── 2. IFRABA SCORE — HERO ANCHOR ── */}
      <ScrollReveal>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: t.am, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            {en ? "IFRABA — AI Banking Fraud Index" : "IFRABA — Índice de Fraude Bancario por AI"}
          </h3>
          <div className="hero-bg" style={{ borderRadius: 16, padding: "28px 20px 20px", position: "relative", overflow: "hidden" }}>
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />
            <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
              <IFRABAGauge score={ifraba.total} t={t} />
              <p style={{ fontSize: 11, color: "var(--text2)", margin: "10px 0 12px", fontStyle: "italic" }}>
                {en
                  ? "IFRABA: Índice de Fraude por Agentes de IA en Banca — Colibrii Labs proprietary index"
                  : "IFRABA: Índice de Fraude por Agentes de IA en Banca — índice propietario de Colibrii Labs"}
              </p>
              <Grid cols="repeat(auto-fit,minmax(140px,1fr))" gap={8}>
                {ifraba.components.map((c) => (
                  <Bx key={c.id} style={{ padding: 10, background: "var(--card)", borderRadius: 10 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                      <span style={{ fontSize: 18, fontWeight: 700, color: c.score >= 20 ? t.rd : t.am, fontFamily: "'IBM Plex Mono', monospace" }}>{c.score}</span>
                      <span style={{ fontSize: 10, color: t.tx3 }}>/{c.max}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: t.tx, marginLeft: 4 }}>{ifrabaLabels[c.id]}</span>
                    </div>
                    <div style={{ fontSize: 10, color: t.tx2, marginTop: 4, lineHeight: 1.4 }}>{ifrabaDescs[c.id]}</div>
                  </Bx>
                ))}
              </Grid>
            </div>
          </div>
          <Ci s="Colibrii Labs IFRABA Algorithm — OIJ, SUGEF, Sumsub, OWASP, GAFILAT" />
        </div>
      </ScrollReveal>

      {/* ── 3. CONVERGENCE CONTEXT + EXECUTIVE IMPACT (merged) ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16, background: `${t.am}08`, border: `1px solid ${t.am}20` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <Icon name="bank" size={20} color={t.am} />
            <span style={{ fontSize: 13, fontWeight: 700, color: t.am, textTransform: "uppercase", letterSpacing: 1 }}>
              {en ? "Three forces converging — March 2026" : "Tres fuerzas convergiendo — Marzo 2026"}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { n: "1", c: t.rd, txt: en ? "Bill Exp. 23.908 reverses burden of proof — banks must reimburse fraud victims (responsabilidad objetiva solidaria)." : "Exp. 23.908 invierte la carga de la prueba — los bancos deben reembolsar a víctimas de fraude (responsabilidad objetiva solidaria)." },
              { n: "2", c: t.am, txt: en ? "Digital fraud grew 668% since 2020 — 10,027 cases in 2025, affecting thousands of Costa Rican families." : "El fraude digital creció 668% desde 2020 — 10,027 casos en 2025, afectando a miles de familias costarricenses." },
              { n: "3", c: "#8b5cf6", txt: en ? "AI agents enter production (57% of enterprises) with zero binding regulation in Costa Rica. Attack cost: $0.50-5/hour." : "Agentes AI entran en producción (57% de empresas) con cero regulación vinculante en Costa Rica. Costo de ataque: $0.50-5/hora." },
            ].map((f) => (
              <div key={f.n} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: f.c, fontFamily: "'IBM Plex Mono', monospace", minWidth: 16 }}>{f.n}</span>
                <span style={{ fontSize: 12.5, color: t.tx2, lineHeight: 1.6 }}>{f.txt}</span>
              </div>
            ))}
          </div>
        </Card>
      </ScrollReveal>

      <ScrollReveal>
        <Card style={{ marginBottom: 16, background: `${t.rd}06`, border: `1px solid ${t.rd}15` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Icon name="bank" size={18} color={t.rd} />
            <span style={{ fontSize: 13, fontWeight: 700, color: t.rd, textTransform: "uppercase", letterSpacing: 1 }}>
              {en ? "For banking executives" : "Para ejecutivos bancarios"}
            </span>
          </div>
          <p style={{ fontSize: 12.5, color: t.tx2, lineHeight: 1.7, margin: 0 }}>
            {en
              ? "Under Exp. 23.908, your institution bears strict liability for every unresolved fraud case. The OIJ can only process 14% of cases — the remaining 86% become your balance sheet. Every month of inaction adds ~₡2,250MM in base-case liability exposure. The question is not whether to act, but whether your provisioning model reflects this reality."
              : "Bajo el Exp. 23.908, su institución asume responsabilidad solidaria por cada caso de fraude no resuelto. El OIJ solo puede procesar el 14% de los casos — el 86% restante es su balance. Cada mes de inacción agrega ~₡2,250MM en exposición base de responsabilidad. La pregunta no es si actuar, sino si su modelo de provisión refleja esta realidad."}
          </p>
        </Card>
      </ScrollReveal>

      {/* ── 4. KEY STATISTICS GRID ── */}
      <ScrollReveal>
        <Grid cols="repeat(auto-fit,minmax(145px,1fr))" gap={10} className="mobile-grid-2" style={{ marginBottom: 4 }}>
          {stats.map((s, i) => (
            <Card key={i} accent={s.color} style={{ textAlign: "center", padding: "18px 12px", background: `radial-gradient(ellipse at top, ${s.color}12, transparent 70%)` }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.color, lineHeight: 1.2, fontFamily: "'IBM Plex Mono', monospace" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: t.tx2, marginTop: 6, lineHeight: 1.4 }}>{s.label}</div>
            </Card>
          ))}
        </Grid>
        <div style={{ fontSize: 10, color: t.tx3, textAlign: "right", marginBottom: 20, fontFamily: "'IBM Plex Mono',monospace" }}>
          {en ? "MM = millions of colones (₡)" : "MM = millones de colones (₡)"}
        </div>
      </ScrollReveal>

      {/* ── 5. FRAUD TREND CHART ── */}
      <ScrollReveal>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: t.am, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            {en ? "The Curve That Doubles Every 18 Months" : "La Curva Que Se Duplica Cada 18 Meses"}
          </h3>
          <Card style={{ padding: "16px 8px" }}>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={fraudTS} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradCases" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gradLosses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis dataKey="year" tick={{ fontSize: 10, fill: tickFill }} />
                <YAxis yAxisId="left" tick={{ fontSize: 10, fill: tickFill }} tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: tickFill }} tickFormatter={v => `₡${(v / 1000).toFixed(0)}B`} />
                <Tooltip contentStyle={{ background: tipBg, border: tipBorder, borderRadius: 8, fontSize: 11 }} />
                <Area yAxisId="left" type="monotone" dataKey="cases" name={en ? "Cases" : "Casos"} stroke="#2563eb" fill="url(#gradCases)" strokeWidth={2} strokeDasharray={(d) => d?.type?.includes("Proj") ? "5 5" : "0"} />
                <Area yAxisId="right" type="monotone" dataKey="losses" name={en ? "Losses ₡MM" : "Pérdidas ₡MM"} stroke="#f59e0b" fill="url(#gradLosses)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 8 }}>
              <span style={{ fontSize: 10, color: t.tx3 }}>● <span style={{ color: "#2563eb" }}>{en ? "Cases" : "Casos"}</span></span>
              <span style={{ fontSize: 10, color: t.tx3 }}>● <span style={{ color: "#f59e0b" }}>{en ? "Losses (₡MM)" : "Pérdidas (₡MM)"}</span></span>
              <span style={{ fontSize: 10, color: t.tx3 }}>--- {en ? "Projections (47.3% CAGR)" : "Proyecciones (47.3% CAGR)"}</span>
            </div>
          </Card>
          <div style={{ fontSize: 9.5, color: t.tx3, marginTop: 6, fontStyle: "italic", lineHeight: 1.4 }}>
            {en
              ? "CAGR robustness: 2020-25 = 50.4%, 2021-25 = 47.7%, 2022-25 = 47.3% (used, excluding COVID anomaly). We use the most conservative period — projections are conservative by design."
              : "Robustez del CAGR: 2020-25 = 50.4%, 2021-25 = 47.7%, 2022-25 = 47.3% (usado, excluyendo anomalía COVID). Usamos el período más conservador — las proyecciones son conservadoras por diseño."}
          </div>
          <Ci s="OIJ 2020-2025 (historical), Colibrii Labs projections (47.3% CAGR)" />
        </div>
      </ScrollReveal>

      {/* ── 6. AI THREAT VECTORS ── */}
      <ScrollReveal>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: t.rd, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            {en ? "8 AI Threat Vectors" : "8 Vectores de Amenaza AI"}
          </h3>
          {/* Labeled Threat Bars */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
            {threats.map((th) => (
              <div key={th.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 10, color: t.tx2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{th.name}</div>
                  <div style={{ background: "var(--surface)", borderRadius: 4, height: 14, overflow: "hidden", marginTop: 2 }}>
                    <div style={{ width: `${th.severity}%`, height: "100%", background: th.color, borderRadius: 4, opacity: 0.8 }} />
                  </div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: th.color, fontFamily: "'IBM Plex Mono', monospace", minWidth: 32, textAlign: "right" }}>{th.severity}</span>
              </div>
            ))}
          </div>
          {/* Expandable Threat Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {threats.map((th, i) => (
              <Card
                key={th.id}
                className={expandedThreat === i ? "card-expandable expanded" : "card-expandable"}
                style={{ cursor: "pointer", position: "relative", border: expandedThreat === i ? `1px solid ${th.color}40` : undefined }}
                onClick={() => setExpandedThreat(expandedThreat === i ? null : i)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, paddingRight: 20 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: t.tx, margin: 0 }}>{th.name}</h4>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    <Tag color={th.color}>{th.severity}/100</Tag>
                    <Tag color={th.growth === "NEW" ? "#8b5cf6" : "#f59e0b"}>{th.growth}</Tag>
                  </div>
                </div>
                {expandedThreat === i ? (
                  <div style={{ marginTop: 8 }}>
                    <p style={{ fontSize: 12.5, color: t.tx2, lineHeight: 1.7, margin: "0 0 6px" }}>{th.desc}</p>
                    <div style={{ fontSize: 11, color: t.gn, fontWeight: 600 }}>
                      {en ? "Defense: " : "Defensa: "}{th.defense}
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 6, fontStyle: "italic" }}>
                    {en ? "View details + defense" : "Ver detalles + defensa"}
                  </div>
                )}
              </Card>
            ))}
          </div>
          <Ci s="OWASP AI Security 2025, Sumsub Identity Fraud Report 2025, Anthropic MCP Spec, Google A2A Spec" />
        </div>
      </ScrollReveal>

      {/* ── 6b. SOLUTION BREAKER — Defenses exist ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16, background: `${t.gn}08`, border: `1px solid ${t.gn}20` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Icon name="shield" size={18} color={t.gn} />
            <span style={{ fontSize: 13, fontWeight: 700, color: t.gn, textTransform: "uppercase", letterSpacing: 1 }}>
              {en ? "Defenses exist — but the window is closing" : "Las defensas existen — pero la ventana se cierra"}
            </span>
          </div>
          <p style={{ fontSize: 12.5, color: t.tx2, lineHeight: 1.7, margin: 0 }}>
            {en
              ? "Behavioral biometrics, AI-powered anomaly detection, MCP/A2A protocol hardening, and deepfake liveness checks can neutralize these vectors. Banks that deploy these defenses before Exp. 23.908 takes effect will define the compliance baseline — and reduce liability exposure by an estimated 60-80%."
              : "Biometría conductual, detección de anomalías con AI, endurecimiento de protocolos MCP/A2A y verificación de deepfakes pueden neutralizar estos vectores. Los bancos que desplieguen estas defensas antes de que el Exp. 23.908 entre en vigor definirán la línea base de cumplimiento — y reducirán la exposición de responsabilidad en un estimado de 60-80%."}
          </p>
        </Card>
      </ScrollReveal>

      {/* ── 6c. FEATURED CASE — Arup $25.6M ── */}
      <ScrollReveal>
        <Card accent="#ef4444" style={{ marginBottom: 16, background: `${t.rd}06`, border: `1px solid ${t.rd}15` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: t.rd, textTransform: "uppercase", letterSpacing: 1 }}>
              {en ? "Real-world impact" : "Impacto en el mundo real"}
            </span>
            <Tag color="#ef4444">$25.6M</Tag>
          </div>
          <p style={{ fontSize: 12.5, color: t.tx2, lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: t.tx }}>Arup (UK):</strong>{" "}
            {en
              ? "An employee authorized $25.6M in wire transfers after a deepfake video call impersonating the CFO and other executives. The AI-generated video was indistinguishable from real participants. This is not theoretical — it happened with today's technology."
              : "Un empleado autorizó $25.6M en transferencias tras una videollamada deepfake suplantando al CFO y otros ejecutivos. El video generado por AI era indistinguible de participantes reales. Esto no es teórico — sucedió con la tecnología de hoy."}
          </p>
        </Card>
      </ScrollReveal>

      {/* ── 7. REGULATORY GAP COMPARISON ── */}
      <ScrollReveal>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: t.am, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            {en ? "No Rules, No Safe Harbor" : "Sin Reglas, Sin Puerto Seguro"}
          </h3>
          <Card style={{ marginBottom: 10, background: `${t.am}06`, border: `1px solid ${t.am}15` }}>
            <p style={{ fontSize: 12.5, color: t.tx2, lineHeight: 1.7, margin: 0 }}>
              {en
                ? "While the UK (DRCF), EU (AI Act), and Singapore (MAS) have deployed AI-specific financial regulation, Costa Rica operates in a regulatory vacuum. For bank executives, this gap means: no established compliance framework to reduce liability, no safe harbor provisions for AI-related fraud, and no regulatory guidance on AI agent oversight — leaving each institution to define its own risk posture."
                : "Mientras UK (DRCF), la UE (AI Act) y Singapur (MAS) han desplegado regulación financiera específica para AI, Costa Rica opera en un vacío regulatorio. Para ejecutivos bancarios, esta brecha significa: ningún marco de cumplimiento para reducir responsabilidad, ninguna provisión de puerto seguro para fraude relacionado con AI, y ninguna guía regulatoria sobre supervisión de agentes AI — dejando a cada institución definir su propia postura de riesgo."}
            </p>
          </Card>
          <Card style={{ padding: "16px 8px" }}>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={regGap}>
                <PolarGrid stroke={gridStroke} />
                <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 9, fill: tickFill }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 8, fill: dark ? "#64748b" : "#94a3b8" }} />
                <Radar name="Costa Rica" dataKey="CR" stroke="#ef4444" fill="#ef4444" fillOpacity={0.25} strokeWidth={2} />
                <Radar name="UK" dataKey="UK" stroke="#2563eb" fill="#2563eb" fillOpacity={0.1} />
                <Radar name="EU" dataKey="EU" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} />
                <Radar name={en ? "Singapore" : "Singapur"} dataKey="SG" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                <Tooltip contentStyle={{ background: tipBg, border: tipBorder, borderRadius: 8, fontSize: 11 }} />
              </RadarChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 6 }}>
              <span style={{ fontSize: 10 }}>● <span style={{ color: "#ef4444" }}>CR</span></span>
              <span style={{ fontSize: 10 }}>● <span style={{ color: "#2563eb" }}>UK</span></span>
              <span style={{ fontSize: 10 }}>● <span style={{ color: "#8b5cf6" }}>EU</span></span>
              <span style={{ fontSize: 10 }}>● <span style={{ color: "#10b981" }}>{en ? "Singapore" : "Singapur"}</span></span>
            </div>
          </Card>
          <Card style={{ marginTop: 8, background: `${t.rd}06`, border: `1px solid ${t.rd}15` }}>
            <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6, margin: 0 }}>
              <strong style={{ color: t.rd }}>{en ? "Critical gap: " : "Brecha crítica: "}</strong>
              {en
                ? "Multi-Agent Governance — CR scores 0/100 vs UK (25), EU (30), Singapore (35). Costa Rica has zero framework for overseeing AI agent interactions in financial services. GAFILAT has flagged CR for increased monitoring — a sovereign reputation risk."
                : "Gobernanza Multi-Agente — CR obtiene 0/100 vs UK (25), EU (30), Singapur (35). Costa Rica no tiene marco para supervisar interacciones de agentes AI en servicios financieros. GAFILAT ha señalado a CR para monitoreo aumentado — un riesgo de reputación soberana."}
            </p>
          </Card>
          <Ci s="SUGEF, EU AI Act 2024, UK DRCF Framework 2025, MAS Singapore AI Guidelines 2025, GAFILAT" />
        </div>
      </ScrollReveal>

      {/* ── 7b. LEGAL DEFENSE ANALYSIS — Exp. 23.908 + AI Agents ── */}
      <ScrollReveal>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "#8b5cf6", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            {en ? "What Happens When an AI Agent Is Compromised?" : "¿Qué Pasa Cuando un Agente AI Es Comprometido?"}
          </h3>
          <Card style={{ marginBottom: 10, background: `${"#8b5cf6"}06`, border: `1px solid ${"#8b5cf6"}15` }}>
            <p style={{ fontSize: 12.5, color: t.tx2, lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: "#8b5cf6" }}>{en ? "Scenario: " : "Escenario: "}</strong>
              {en
                ? "AI agent connected to a bank account via MCP is compromised by prompt injection. Authorizes fraudulent transfer to an unknown third party. Under Exp. 23.908, what defenses can the bank invoke?"
                : "Un agente AI conectado a una cuenta bancaria vía MCP es comprometido por inyección de prompt. Autoriza transferencia fraudulenta a un tercero desconocido. Bajo el Exp. 23.908, ¿qué defensas puede invocar el banco?"}
            </p>
          </Card>
          {/* Defense analysis table */}
          <Card style={{ padding: "12px 8px" }}>
            {/* Header row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 2fr", gap: 8, padding: "6px 8px", background: "#8b5cf620", borderRadius: 4, marginBottom: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#8b5cf6" }}>{en ? "DEFENSE" : "DEFENSA"}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#8b5cf6", textAlign: "center" }}>{en ? "APPLIES?" : "¿APLICA?"}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#8b5cf6" }}>{en ? "REASONING" : "RAZONAMIENTO"}</span>
            </div>
            {legalDefense.map((d, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 70px 2fr", gap: 8, padding: "8px 8px", borderBottom: i < legalDefense.length - 1 ? "1px solid var(--surface)" : "none", alignItems: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: t.tx }}>{d.defense}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: d.color, textAlign: "center", fontFamily: "'IBM Plex Mono', monospace" }}>{d.applies}</span>
                <span style={{ fontSize: 10.5, color: t.tx2, lineHeight: 1.4 }}>{d.reason}</span>
              </div>
            ))}
            {/* Result row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 2fr", gap: 8, padding: "10px 8px", background: `${t.rd}10`, borderRadius: 4, marginTop: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: t.rd }}>{en ? "RESULT" : "RESULTADO"}</span>
              <span style={{ fontSize: 10, fontWeight: 800, color: t.rd, textAlign: "center", fontFamily: "'IBM Plex Mono', monospace" }}>—</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: t.rd }}>{en ? "BANK ASSUMES LIABILITY" : "EL BANCO ASUME RESPONSABILIDAD"}</span>
            </div>
          </Card>
          <div style={{ fontSize: 10, color: t.tx3, marginTop: 6, fontStyle: "italic", lineHeight: 1.4 }}>
            {en
              ? "Note: Equating algorithmic delegation with informed consent is unresolved legal territory in all jurisdictions."
              : "Nota: Equiparar la delegación algorítmica con el consentimiento informado es un terreno jurídico no resuelto en ninguna jurisdicción."}
          </div>
          <Ci s="Exp. 23.908 — Asamblea Legislativa de Costa Rica" />
        </div>
      </ScrollReveal>

      {/* ── 8. COST PROJECTIONS ── */}
      <ScrollReveal>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: t.am, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            {en ? "Liability Exposure 2025-2030" : "Exposición de Responsabilidad 2025-2030"}
          </h3>
          <Card style={{ marginBottom: 10, background: `${t.rd}06`, border: `1px solid ${t.rd}15` }}>
            <p style={{ fontSize: 12.5, color: t.tx2, lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: t.rd }}>{en ? "Board-level question: " : "Pregunta de junta directiva: "}</strong>
              {en
                ? "With Exp. 23.908 and the 4.5× LexisNexis cost multiplier (investigation + legal + trust erosion + reduced adoption), every month of legislative and institutional delay adds ~₡2,250MM in base-case liability. What does your 2027 balance sheet look like under these three scenarios?"
                : "Con el Exp. 23.908 y el multiplicador 4.5× de LexisNexis (investigación + legal + erosión de confianza + reducción de adopción), cada mes de demora legislativa e institucional agrega ~₡2,250MM en responsabilidad base. ¿Cómo se ve su balance 2027 bajo estos tres escenarios?"}
            </p>
          </Card>
          {/* Cost per case breakdown */}
          <Card style={{ marginBottom: 10, padding: "10px 8px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: t.am, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
              {en ? "Cost per case breakdown" : "Desglose de costo por caso"}
            </div>
            {costUnit.map((cu, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 80px 60px 1fr", gap: 6, padding: "6px 4px", borderBottom: i < costUnit.length - 1 ? "1px solid var(--surface)" : "none", alignItems: "center" }}>
                <span style={{ fontSize: 10.5, color: t.tx }}>{cu.type}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: cu.color, fontFamily: "'IBM Plex Mono', monospace" }}>{cu.cost}</span>
                <span style={{ fontSize: 10, color: t.tx3 }}>{cu.pct}</span>
                <span style={{ fontSize: 9, color: t.tx3 }}>{cu.source}</span>
              </div>
            ))}
            <div style={{ fontSize: 9.5, color: t.tx3, marginTop: 6, fontStyle: "italic" }}>
              {en
                ? "OPEX for claim handling (not included above): $5.2-$10.4M estimated for 2026."
                : "OPEX por manejo de reclamos (no incluido arriba): $5.2-$10.4M estimado para 2026."}
            </div>
          </Card>
          <Card style={{ padding: "16px 8px" }}>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={costs} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis dataKey="year" tick={{ fontSize: 10, fill: tickFill }} />
                <YAxis tick={{ fontSize: 10, fill: tickFill }} tickFormatter={v => `₡${(v / 1000).toFixed(0)}B`} />
                <Tooltip contentStyle={{ background: tipBg, border: tipBorder, borderRadius: 8, fontSize: 11 }} formatter={v => `₡${v.toLocaleString()}MM`} />
                <Area type="monotone" dataKey="aggressive" name={en ? "Aggressive (9×)" : "Agresivo (9×)"} stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 4" />
                <Area type="monotone" dataKey="base" name={en ? "Base (4.5×)" : "Base (4.5×)"} stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.15} strokeWidth={2} />
                <Area type="monotone" dataKey="conservative" name={en ? "Conservative (1×)" : "Conservador (1×)"} stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
          <Grid cols="repeat(auto-fit,minmax(145px,1fr))" gap={8} style={{ marginTop: 8 }}>
            {[
              { label: en ? "Conservative (1×)" : "Conservador (1×)", value: "₡52,000MM", color: "#10b981", desc: en ? "Direct losses only" : "Solo pérdidas directas" },
              { label: en ? "Base (4.5×)" : "Base (4.5×)", value: "₡235,000MM", color: "#f59e0b", desc: en ? "LexisNexis multiplier" : "Multiplicador LexisNexis" },
              { label: en ? "Aggressive (9×)" : "Agresivo (9×)", value: "₡626,000MM", color: "#ef4444", desc: en ? "Full systemic cost" : "Costo sistémico total" },
            ].map((s, i) => (
              <Card key={i} accent={s.color} style={{ padding: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: s.color, textTransform: "uppercase", marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: t.tx, fontFamily: "'IBM Plex Mono', monospace" }}>{s.value}</div>
                <div style={{ fontSize: 10, color: t.tx2 }}>{s.desc} · {en ? "by 2030" : "al 2030"}</div>
              </Card>
            ))}
          </Grid>
          {/* Bank absorption scenarios */}
          <Card style={{ marginTop: 10, padding: "10px 8px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: t.am, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
              {en ? "What percentage falls on banks?" : "¿Qué porcentaje recae en los bancos?"}
            </div>
            <Grid cols="repeat(auto-fit,minmax(140px,1fr))" gap={8}>
              {[
                { label: en ? "Without Exp. 23.908" : "Sin Exp. 23.908", pct: "15-25%", color: "#10b981", desc: en ? "Current liability regime" : "Régimen de responsabilidad actual" },
                { label: en ? "With Exp. 23.908 (base)" : "Con Exp. 23.908 (base)", pct: "50-75%", color: "#f59e0b", desc: en ? "Reversed burden of proof" : "Inversión carga de la prueba" },
                { label: en ? "Pro-consumer reading" : "Lectura pro-consumidor", pct: "75-90%", color: "#ef4444", desc: en ? "Broad liability interpretation" : "Interpretación amplia de resp." },
              ].map((a, i) => (
                <Bx key={i} style={{ padding: 8 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: a.color, textTransform: "uppercase", marginBottom: 2 }}>{a.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: a.color, fontFamily: "'IBM Plex Mono', monospace" }}>{a.pct}</div>
                  <div style={{ fontSize: 9, color: t.tx3, marginTop: 2 }}>{a.desc}</div>
                </Bx>
              ))}
            </Grid>
          </Card>
          <Ci s="LexisNexis True Cost of Fraud 2024, Deloitte AI Financial Services 2025, ACFE LATAM 2024" />
        </div>
      </ScrollReveal>

      {/* ── 8b. WINDOW OF ACTION breaker ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16, background: `${t.gn}06`, border: `1px solid ${t.gn}20` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Icon name="lightning" size={18} color={t.gn} />
            <span style={{ fontSize: 13, fontWeight: 700, color: t.gn, textTransform: "uppercase", letterSpacing: 1 }}>
              {en ? "The window of action" : "La ventana de acción"}
            </span>
          </div>
          <p style={{ fontSize: 12.5, color: t.tx2, lineHeight: 1.7, margin: 0 }}>
            {en
              ? "These projections assume inaction. With coordinated intervention — AI-powered fraud detection, regulatory frameworks, and investigative capacity investment — the curve can flatten. The UK reduced APP fraud losses by 17% in the first year after implementing mandatory reimbursement. Costa Rica can learn from this playbook, but the window narrows with every quarter of delay."
              : "Estas proyecciones asumen inacción. Con intervención coordinada — detección de fraude con AI, marcos regulatorios e inversión en capacidad investigativa — la curva se puede aplanar. El UK redujo pérdidas por fraude APP en 17% el primer año tras implementar reembolso obligatorio. Costa Rica puede aprender de este modelo, pero la ventana se estrecha con cada trimestre de retraso."}
          </p>
        </Card>
      </ScrollReveal>

      {/* ── 9. OIJ INVESTIGATIVE CAPACITY ── */}
      <ScrollReveal>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: t.rd, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            {en ? "Who Investigates When the System Is Overwhelmed?" : "¿Quién Investiga Cuando el Sistema Está Desbordado?"}
          </h3>
          <Card style={{ background: `${t.rd}06`, border: `1px solid ${t.rd}15` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: t.rd }}>OIJ — {en ? "Digital Fraud Unit" : "Unidad de Fraude Digital"}</span>
            </div>
            {/* Progress bar */}
            <div style={{ background: "var(--surface)", borderRadius: 8, height: 20, overflow: "hidden", marginBottom: 8 }}>
              <div style={{ width: `${oij.ratio}%`, height: "100%", background: `linear-gradient(90deg, ${t.rd}, #f59e0b)`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: "#fff" }}>{oij.ratio}%</span>
              </div>
            </div>
            <Grid cols="1fr 1fr 1fr" gap={8} style={{ marginBottom: 10 }}>
              <Bx style={{ padding: 8, textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: t.rd, fontFamily: "'IBM Plex Mono', monospace" }}>{oij.current}</div>
                <div style={{ fontSize: 9, color: t.tx2 }}>{en ? "Current" : "Actuales"}</div>
              </Bx>
              <Bx style={{ padding: 8, textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: t.am, fontFamily: "'IBM Plex Mono', monospace" }}>{oij.needed.toLocaleString()}</div>
                <div style={{ fontSize: 9, color: t.tx2 }}>{en ? "Needed" : "Necesarios"}</div>
              </Bx>
              <Bx style={{ padding: 8, textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: t.tx, fontFamily: "'IBM Plex Mono', monospace" }}>{oij.collapse}</div>
                <div style={{ fontSize: 9, color: t.tx2 }}>{en ? "Collapse" : "Colapso"}</div>
              </Bx>
            </Grid>
            <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6, margin: 0 }}>{oij.desc}</p>
            <div style={{ fontSize: 10.5, color: t.am, fontWeight: 600, marginTop: 8, fontStyle: "italic" }}>{oij.sensitivityNote}</div>
          </Card>

          {/* Bank Fraud Ops mirror */}
          <Card style={{ marginTop: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <Icon name="bank" size={18} color={t.am} />
              <span style={{ fontSize: 13, fontWeight: 700, color: t.am }}>
                {en ? "Your Bank's Fraud Operations" : "Fraud Operations de Su Banco"}
              </span>
            </div>
            <div style={{ fontSize: 10, color: t.tx3, marginBottom: 8, fontFamily: "'IBM Plex Mono', monospace" }}>
              {fraudOps.note}
            </div>
            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 55px 70px 70px", gap: 6, padding: "6px 4px", background: `${t.am}15`, borderRadius: 4, marginBottom: 4 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: t.am }}>{en ? "SCENARIO" : "ESCENARIO"}</span>
              <span style={{ fontSize: 9, fontWeight: 700, color: t.am, textAlign: "center" }}>μ</span>
              <span style={{ fontSize: 9, fontWeight: 700, color: t.am, textAlign: "center" }}>2026</span>
              <span style={{ fontSize: 9, fontWeight: 700, color: t.am, textAlign: "center" }}>2027</span>
            </div>
            {fraudOps.scenarios.map((s, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 55px 70px 70px", gap: 6, padding: "6px 4px", borderBottom: i < fraudOps.scenarios.length - 1 ? "1px solid var(--surface)" : "none", alignItems: "center" }}>
                <span style={{ fontSize: 10.5, fontWeight: 600, color: s.color }}>{s.type}</span>
                <span style={{ fontSize: 10, color: t.tx3, textAlign: "center", fontFamily: "'IBM Plex Mono', monospace" }}>{s.mu}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: s.color, textAlign: "center", fontFamily: "'IBM Plex Mono', monospace" }}>{s.a2026}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: s.color, textAlign: "center", fontFamily: "'IBM Plex Mono', monospace" }}>{s.a2027}</span>
              </div>
            ))}
            <Card style={{ marginTop: 8, background: `${t.rd}06`, border: `1px solid ${t.rd}15`, padding: "8px 10px" }}>
              <p style={{ fontSize: 11, color: t.tx2, lineHeight: 1.5, margin: 0 }}>
                <strong style={{ color: t.rd }}>SLA: </strong>
                {en
                  ? "For P(wait ≤ 30d) ≥ 90%, ρ must be ≤ 0.85. With 2026 mixed-complexity load, a large bank needs ~35-70 dedicated fraud analysts. When ρ ≥ 1, the 30-day SLA is mathematically unachievable."
                  : "Para P(espera ≤ 30d) ≥ 90%, ρ debe ser ≤ 0.85. Con carga mixta 2026, un banco grande necesita ~35-70 analistas dedicados de fraude. Cuando ρ ≥ 1, el SLA de 30 días es matemáticamente inalcanzable."}
              </p>
            </Card>
          </Card>
          <Ci s="OIJ, Colibrii Labs Erlang-C Queuing Model, ACFE Report to the Nations 2024" />
        </div>
      </ScrollReveal>

      {/* ── 10. PYME STRESS TEST ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 20, background: `${t.am}08`, border: `1px solid ${t.am}20` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Icon name="store" size={18} color={t.am} />
            <span style={{ fontSize: 13, fontWeight: 700, color: t.am, textTransform: "uppercase", letterSpacing: 1 }}>
              {en ? "PYME Stress Test" : "Prueba de Estrés PYME"}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: t.tx2 }}>{pyme.scenario}</span>
            <span style={{ fontSize: 9, color: t.tx3 }}>→</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: t.rd, fontFamily: "'IBM Plex Mono', monospace" }}>{pyme.directCost}</span>
          </div>
          <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6, margin: "0 0 6px" }}>{pyme.cascadeDesc}</p>
          <div style={{ fontSize: 11, fontWeight: 600, color: t.rd, fontStyle: "italic" }}>{pyme.oijShock}</div>
          <Ci s="SUGEF, BCCR, Colibrii Labs Stress Model" />
        </Card>
      </ScrollReveal>

      {/* ── 11. CASE STUDIES ── */}
      <ScrollReveal>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: t.am, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            {en ? "Case Studies" : "Casos de Estudio"}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {cases.map((cs, i) => (
              <Card
                key={i}
                className={expandedCase === i ? "card-expandable expanded" : "card-expandable"}
                style={{ cursor: "pointer", position: "relative", border: expandedCase === i ? `1px solid ${cs.color}40` : undefined }}
                onClick={() => setExpandedCase(expandedCase === i ? null : i)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, paddingRight: 20 }}>
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: t.tx, margin: 0 }}>{cs.title}</h4>
                    <span style={{ fontSize: 11, color: t.tx2 }}>{cs.org}</span>
                  </div>
                  <Tag color={cs.color}>{cs.stat}</Tag>
                </div>
                {expandedCase === i ? (
                  <p style={{ fontSize: 12.5, color: t.tx2, lineHeight: 1.7, marginTop: 8, marginBottom: 0 }}>{cs.desc}</p>
                ) : (
                  <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 6, fontStyle: "italic" }}>
                    {en ? "View details + defense" : "Ver detalles + defensa"}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ── 12. CR CONNECTION ── */}
      <ScrollReveal>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: t.cy, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            {en ? "Costa Rica Connection" : "Conexión Costa Rica"}
          </h3>
          <Grid cols="repeat(auto-fit,minmax(260px,1fr))" gap={10}>
            {crCards.map((cr, i) => (
              <Card key={i} accent={cr.color} style={{ background: `${cr.color}06` }}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: cr.color, margin: "0 0 6px" }}>{cr.title}</h4>
                <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6, margin: 0 }}>{cr.desc}</p>
              </Card>
            ))}
          </Grid>
        </div>
      </ScrollReveal>

      {/* ── 13. BOARD DECISIONS + CISO CHECKLIST ── */}
      <ScrollReveal>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: t.rd, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            {en ? "Board Decisions Required" : "Decisiones de Junta Directiva Requeridas"}
          </h3>
          {decisions.map((dec) => (
            <Card key={dec.num} accent={dec.color} style={{ marginBottom: 10, background: `${dec.color}06`, border: `1px solid ${dec.color}15` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: 4, background: dec.color, color: "#fff", fontSize: 11, fontWeight: 800, fontFamily: "'IBM Plex Mono', monospace" }}>{dec.num}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: t.tx, flex: 1 }}>{dec.title}</span>
              </div>
              <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6, margin: "0 0 8px" }}>{dec.desc}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Tag color={dec.color}>{dec.deadline}</Tag>
                <Tag color={t.tx3}>{dec.owner}</Tag>
              </div>
            </Card>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: t.am, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            <Icon name="shield" size={16} color={t.am} style={{ marginRight: 6, verticalAlign: "middle" }} />
            {en ? "CISO Immediate Controls" : "Controles Inmediatos del CISO"}
          </h3>
          <Card>
            {cisoChecklist.map((ctrl, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "7px 0", borderBottom: i < cisoChecklist.length - 1 ? "1px solid var(--surface)" : "none" }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: t.am, fontFamily: "'IBM Plex Mono', monospace", minWidth: 18 }}>{i + 1}.</span>
                <span style={{ fontSize: 11.5, color: t.tx2, lineHeight: 1.5 }}>{ctrl}</span>
              </div>
            ))}
          </Card>
        </div>
      </ScrollReveal>

      {/* ── 14. KEY CONSIDERATIONS ── */}
      <ScrollReveal>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: t.tx2, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            {en ? "Key Considerations" : "Consideraciones Clave"}
          </h3>
          <Grid cols="repeat(auto-fit,minmax(220px,1fr))" gap={8}>
            {[
              { t: en ? "Data Caveats" : "Advertencias de Datos", d: en ? "Fraud statistics from OIJ may undercount due to unreported cases. True fraud incidence is estimated 2-3× reported figures." : "Estadísticas de fraude del OIJ pueden subestimar por casos no reportados. La incidencia real se estima 2-3× las cifras reportadas." },
              { t: en ? "Projection Uncertainty" : "Incertidumbre de Proyecciones", d: en ? "47.3% CAGR projections assume continuation of current trends. Policy interventions, technology changes, or economic shifts could alter trajectory." : "Proyecciones de 47.3% CAGR asumen continuación de tendencias actuales. Intervenciones de política, cambios tecnológicos o económicos podrían alterar la trayectoria." },
              { t: en ? "Cost Multiplier" : "Multiplicador de Costos", d: en ? "The 4.5× LexisNexis multiplier includes investigation, legal, trust erosion, and reduced digital adoption costs. The 9× aggressive scenario adds systemic financial stability risks." : "El multiplicador 4.5× de LexisNexis incluye investigación, legal, erosión de confianza y reducción de adopción digital. El escenario agresivo 9× agrega riesgos de estabilidad financiera sistémica." },
              { t: en ? "International Comparability" : "Comparabilidad Internacional", d: en ? "Regulatory gap scores are estimated based on published frameworks and expert assessment. Direct numerical comparison across jurisdictions has inherent limitations." : "Puntuaciones de brecha regulatoria son estimadas basándose en marcos publicados y evaluación experta. La comparación numérica directa entre jurisdicciones tiene limitaciones inherentes." },
              { t: en ? "CAGR Robustness" : "Robustez del CAGR", d: en ? "We use 47.3% (2022-2025, excluding COVID anomaly). Full period 2020-2025 yields 50.4%. Our projections use the most conservative value — they do not incorporate additional acceleration from AI agents, which would push these numbers higher." : "Usamos 47.3% (2022-2025, excluyendo anomalía COVID). El período completo 2020-2025 arroja 50.4%. Nuestras proyecciones usan el valor más conservador — no incorporan aceleración adicional por agentes AI, lo cual empujaría estos números hacia arriba." },
            ].map((item, i) => (
              <Bx key={i} style={{ padding: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: t.tx, marginBottom: 4 }}>{item.t}</div>
                <div style={{ fontSize: 11, color: t.tx2, lineHeight: 1.5 }}>{item.d}</div>
              </Bx>
            ))}
          </Grid>
        </div>
      </ScrollReveal>

      {/* ── 15. SOURCES ── */}
      <Ci s={BANCA_SOURCES} />
    </div>
  );
}
