"use client";
import { useState } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, SH, Grid, ScrollReveal, Tag, Bx, Ci, MiniStat, KeyInsight, FreshnessBadge, RelatedInsight, Lnk, Flag } from "./ui";
import { CROSS_LINKS } from "./data";
import { Icon } from "./system/Icon";
import {
  HEALTH_RISKS, HEALTH_PII_MATRIX, HEALTH_BREACH_TS, CCSS_HIVE_CASE,
  HEALTH_GOVERNANCE, HEALTH_COMPLIANCE, HEALTH_MITIGATIONS, HEALTH_STATS,
  HEALTH_INTL_FRAMEWORKS, HEALTH_AI_TECH_CR, HEALTH_AI_RESOURCES
} from "./healthData";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Health AI: Risk Intelligence Dashboard v2
   Major UI overhaul: refined colors, mobile-first tables,
   international frameworks, real AI tech in CR
   Sources: WHO, HHS, IBM, Nature Medicine, CCSS, ITU, OECD,
   AHA, EHDS, Mayo Clinic, FDA
   ═══════════════════════════════════════════════════════════════ */

// ── Risk severity tier colors (psychology-informed) ──
// Critical: deep rose (urgency without alarm), High: warm amber, Medium: muted blue, Low: slate
const RISK_TIERS = {
  critical: { bg: "rgba(225,29,72,0.06)", border: "#e11d48", text: "#be123c", badge: "rgba(225,29,72,0.12)" },
  high:     { bg: "rgba(245,158,11,0.06)", border: "#f59e0b", text: "#d97706", badge: "rgba(245,158,11,0.12)" },
  medium:   { bg: "rgba(59,130,246,0.06)", border: "#3b82f6", text: "#2563eb", badge: "rgba(59,130,246,0.12)" },
  low:      { bg: "rgba(100,116,139,0.06)", border: "#64748b", text: "#475569", badge: "rgba(100,116,139,0.12)" },
};

function getRiskTier(severity, likelihood) {
  const score = severity * likelihood;
  if (score >= 72) return RISK_TIERS.critical;
  if (score >= 56) return RISK_TIERS.high;
  if (score >= 36) return RISK_TIERS.medium;
  return RISK_TIERS.low;
}

// ── Redesigned Risk Cell — subtle left border + clean typography ──
function RiskCell({ risk, onClick, selected }) {
  const tier = getRiskTier(risk.severity, risk.likelihood);
  const score = risk.severity * risk.likelihood;
  return (
    <button
      onClick={() => onClick(risk)}
      style={{
        display: "flex", flexDirection: "column", gap: 4, padding: "10px 12px",
        background: selected ? tier.bg : "var(--card)",
        border: selected ? `2px solid ${tier.border}` : "1px solid var(--border)",
        borderLeft: `3px solid ${tier.border}`,
        borderRadius: 10, cursor: "pointer", textAlign: "left", width: "100%",
        transition: "all .2s ease",
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text)", lineHeight: 1.3 }}>{risk.name}</div>
      <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{
          fontSize: 9, fontWeight: 700, fontFamily: "'IBM Plex Mono',monospace",
          color: tier.text, background: tier.badge, padding: "1px 6px", borderRadius: 4,
        }}>
          {score}/100
        </span>
        <Tag color={tier.border} style={{ fontSize: 9 }}>{risk.cat}</Tag>
      </div>
    </button>
  );
}

// ── PII Card (mobile-friendly alternative to table rows) ──
function PiiCard({ row, en }) {
  const isCrit = row.sensitivity === (en ? "Critical" : "Crítico");
  const color = isCrit ? "var(--red)" : "var(--amber)";
  return (
    <div style={{
      padding: "12px 14px", borderRadius: 10, background: "var(--card)",
      border: "1px solid var(--border)", borderLeft: `3px solid ${color}`,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{row.type}</div>
        <Tag color={color}>{row.sensitivity}</Tag>
      </div>
      <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>{row.system}</div>
      <div style={{ fontSize: 11.5, color: "var(--text2)", lineHeight: 1.5 }}>{row.gap}</div>
    </div>
  );
}

// ── Case Studies (preserved from v1) ──
const CASE_STUDIES = (en) => [
  { title: en ? "NHS Stroke AI — United Kingdom" : "NHS Stroke AI — Reino Unido", org: "NHS / Brainomix", desc: en ? "AI brain CT analysis across 107 stroke centres. Processes scans in <1 min (vs 30+ min). Recovery improved 16%→48%. Treatment time: 140→79 min." : "Análisis CT cerebral AI en 107 centros de ictus. Procesa en <1 min (vs 30+). Recuperación mejoró 16%→48%. Tiempo tratamiento: 140→79 min.", stat: en ? "107 centres · 16%→48%" : "107 centros · 16%→48%", color: "#e11d48" },
  { title: "MamaMate", org: en ? "AI for Good Winner" : "Ganador AI for Good", desc: en ? "Offline AI diagnostic for maternal healthcare in rural Africa. Solar-powered, local languages, no internet needed." : "Diagnóstico AI offline para salud materna en África rural. Solar, idiomas locales, sin internet.", stat: en ? "Offline · Solar" : "Offline · Solar", color: "#ec4899" },
  { title: en ? "C2itech Organoid Platform" : "Plataforma Organoides C2itech", org: "C2itech", desc: en ? "AI + 3D organoid tissue models for drug testing. 50% faster screening, 90% accuracy in viral mutation prediction." : "AI + modelos organoides 3D para pruebas de fármacos. Screening 50% más rápido, 90% precisión en mutaciones virales.", stat: en ? "50% faster · 90%" : "50% más rápido · 90%", color: "#8b5cf6" },
  { title: "Cedars-Sinai Connect", org: "Cedars-Sinai", desc: en ? "AI remote patient management: 42,000 patients, 77% optimal medication recommendations." : "Gestión remota de pacientes AI: 42,000 pacientes, 77% recomendaciones óptimas de medicación.", stat: en ? "42K · 77% optimal" : "42K · 77% óptimo", color: "#0ea5e9" }
];

// ── CR Connections (expanded) ──
const CR_CONNECTIONS = (en) => [
  { title: "CCSS + EDUS", desc: en ? "8+ years of digital health records covering 5M+ population — the largest structured health dataset in Central America. Massive opportunity for AI preventive medicine." : "8+ años de registros digitales cubriendo 5M+ población — el mayor dataset estructurado de salud en Centroamérica. Oportunidad masiva para medicina preventiva AI." },
  { title: en ? "Federated Learning" : "Aprendizaje Federado", desc: en ? "CCSS could train AI across 29 hospitals without centralizing data. Each hospital trains locally, sharing only model updates." : "CCSS podría entrenar AI entre 29 hospitales sin centralizar datos. Cada hospital entrena localmente, compartiendo solo actualizaciones del modelo." },
  { title: en ? "Post-Hive Cybersecurity" : "Ciberseguridad Post-Hive", desc: en ? "2022 Hive attack crippled CCSS for weeks. Any health AI deployment must address cybersecurity first." : "Ataque Hive 2022 paralizó CCSS por semanas. Todo despliegue AI debe abordar ciberseguridad primero." },
  { title: en ? "CCSS Fiscal Reality" : "Realidad Fiscal CCSS", desc: en ? "$4.4B state debt. AI must demonstrate ROI: reduced wait times, fewer unnecessary referrals, better preventive care." : "Deuda estatal $4.4B. AI debe demostrar ROI: tiempos reducidos, menos referencias innecesarias, mejor prevención." }
];

export function HealthAI({ en, t, dark, setTab }) {
  const [expandedCase, setExpandedCase] = useState(null);
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [showAllRisks, setShowAllRisks] = useState(false);
  const [expandedFramework, setExpandedFramework] = useState(null);

  const risks = HEALTH_RISKS(en);
  const piiMatrix = HEALTH_PII_MATRIX(en);
  const breachTS = HEALTH_BREACH_TS;
  const hiveCase = CCSS_HIVE_CASE(en);
  const governance = HEALTH_GOVERNANCE(en);
  const compliance = HEALTH_COMPLIANCE(en);
  const mitigations = HEALTH_MITIGATIONS(en);
  const stats = HEALTH_STATS(en);
  const cases = CASE_STUDIES(en);
  const crConn = CR_CONNECTIONS(en);
  const frameworks = HEALTH_INTL_FRAMEWORKS(en);
  const techCR = HEALTH_AI_TECH_CR(en);
  const resources = HEALTH_AI_RESOURCES(en);

  const gridStroke = dark ? "#1e293b" : "#d1d5e0";
  const tickFill = dark ? "#94a3b8" : "#475569";
  const tipBg = dark ? "#111827" : "#fff";
  const tipBorder = `1px solid ${dark ? "#1e293b" : "#d1d5e0"}`;

  // Sort risks by composite score
  const sortedRisks = [...risks].sort((a, b) => (b.severity * b.likelihood) - (a.severity * a.likelihood));
  const displayRisks = showAllRisks ? sortedRisks : sortedRisks.slice(0, 6);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      {/* ── KEY INSIGHT ── */}
      <KeyInsight
        icon="🏥"
        color="var(--pink)"
        text={en
          ? "Healthcare AI is a $504B opportunity — but also the highest-risk domain for data breaches ($10.93M avg cost). Costa Rica has ZERO health data protection laws, and the 2022 CCSS HIVE ransomware attack exposed 5M+ patient records. This module maps both the opportunity and the risk landscape."
          : "AI en salud es una oportunidad de $504B — pero también el dominio de mayor riesgo en brechas de datos ($10.93M costo promedio). Costa Rica tiene CERO leyes de protección de datos de salud, y el ataque ransomware HIVE a CCSS (2022) expuso 5M+ expedientes. Este módulo mapea tanto la oportunidad como el panorama de riesgo."}
      />
      <FreshnessBadge date={en ? "March 2026" : "Marzo 2026"} en={en} />

      {/* ── HEADER ── */}
      <SH
        color={t.pk}
        label={en ? "RISK INTELLIGENCE · HEALTH AI" : "INTELIGENCIA DE RIESGO · AI SALUD"}
        title={en ? "AI in Healthcare: Opportunity & Risk" : "AI en Salud: Oportunidad y Riesgo"}
        desc={en
          ? "Comprehensive analysis of health AI opportunities, data privacy risks, breach intelligence, and governance gaps for Costa Rica."
          : "Análisis integral de oportunidades AI en salud, riesgos de privacidad, inteligencia de brechas y brechas de gobernanza para Costa Rica."
        }
      />

      {/* ── KEY STATISTICS ── */}
      <ScrollReveal>
        <Grid cols="repeat(auto-fit,minmax(150px,1fr))" gap={10} style={{ marginBottom: 20 }}>
          {stats.map((d, i) => (
            <Card key={i} d={0.05}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: d.c, fontFamily: "'IBM Plex Mono',monospace" }}>{d.v}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", marginTop: 2 }}>{d.l}</div>
                  <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 2 }}>{d.s}</div>
                </div>
                <Icon name={d.ic} size={20} style={{ opacity: 0.4 }} />
              </div>
            </Card>
          ))}
        </Grid>
      </ScrollReveal>

      {/* ═══ SECTION: RISK REGISTER ═══ */}
      <ScrollReveal>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--red)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            <Icon name="shield" size={14} color="var(--red)" style={{ marginRight: 6, verticalAlign: "middle" }} />
            {en ? "Health AI Risk Register — 12 Failure Modes" : "Registro de Riesgos AI Salud — 12 Modos de Falla"}
          </h3>
          <Grid cols="repeat(auto-fit,minmax(200px,1fr))" gap={8}>
            {displayRisks.map(risk => (
              <RiskCell key={risk.id} risk={risk} onClick={setSelectedRisk} selected={selectedRisk?.id === risk.id} />
            ))}
          </Grid>
          {!showAllRisks && risks.length > 6 && (
            <button onClick={() => setShowAllRisks(true)} style={{ marginTop: 8, fontSize: 11, color: "var(--cyan)", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
              {en ? `Show all ${risks.length} risks →` : `Ver los ${risks.length} riesgos →`}
            </button>
          )}
          {/* Risk detail panel */}
          {selectedRisk && (() => {
            const tier = getRiskTier(selectedRisk.severity, selectedRisk.likelihood);
            return (
              <Card style={{ marginTop: 10, background: tier.bg, border: `1px solid ${tier.border}30` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: tier.text, margin: 0 }}>{selectedRisk.name}</h4>
                    <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
                      <Tag color={tier.border}>{en ? `Severity: ${selectedRisk.severity}/10` : `Severidad: ${selectedRisk.severity}/10`}</Tag>
                      <Tag color={tier.border}>{en ? `Likelihood: ${selectedRisk.likelihood}/10` : `Probabilidad: ${selectedRisk.likelihood}/10`}</Tag>
                      <Tag color="var(--text3)">{selectedRisk.cat}</Tag>
                    </div>
                  </div>
                  <button onClick={() => setSelectedRisk(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "var(--text3)" }}>×</button>
                </div>
                <p style={{ fontSize: 12.5, color: "var(--text2)", lineHeight: 1.7, marginTop: 8, marginBottom: 0 }}>{selectedRisk.desc}</p>
              </Card>
            );
          })()}
          <Ci s={en ? "Colibrii Labs Risk Assessment — WHO, HHS, IBM, Nature Medicine, CCSS" : "Evaluación de Riesgo Colibrii Labs — WHO, HHS, IBM, Nature Medicine, CCSS"} />
        </div>
      </ScrollReveal>

      {/* ═══ SECTION: PII EXPOSURE MATRIX — Mobile-first card layout ═══ */}
      <ScrollReveal>
        <Card style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--amber)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            <Icon name="lock" size={14} color="var(--amber)" style={{ marginRight: 6, verticalAlign: "middle" }} />
            {en ? "PII Exposure Matrix — Health Data at Risk" : "Matriz de Exposición PII — Datos de Salud en Riesgo"}
          </h3>
          {/* Desktop: table | Mobile: cards */}
          <div className="hide-mobile" style={{ overflowX: "auto" }}>
            <table className="data-table" style={{ minWidth: 520 }}>
              <thead>
                <tr>
                  <th>{en ? "Data Type" : "Tipo de Dato"}</th>
                  <th>{en ? "System" : "Sistema"}</th>
                  <th>{en ? "Sensitivity" : "Sensibilidad"}</th>
                  <th>{en ? "Current Gap" : "Brecha Actual"}</th>
                </tr>
              </thead>
              <tbody>
                {piiMatrix.map((row, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{row.type}</td>
                    <td style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11 }}>{row.system}</td>
                    <td><Tag color={row.sensitivity === (en ? "Critical" : "Crítico") ? "var(--red)" : "var(--amber)"}>{row.sensitivity}</Tag></td>
                    <td style={{ color: "var(--text3)", fontSize: 11 }}>{row.gap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile cards */}
          <div className="show-mobile" style={{ display: "none" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {piiMatrix.map((row, i) => <PiiCard key={i} row={row} en={en} />)}
            </div>
          </div>
          <Ci s={en ? "Colibrii Labs analysis — CCSS, EDUS, HIPAA framework comparison" : "Análisis Colibrii Labs — CCSS, EDUS, comparación con marco HIPAA"} />
        </Card>
      </ScrollReveal>

      {/* ═══ SECTION: CCSS HIVE CASE STUDY ═══ */}
      <ScrollReveal>
        <Card style={{ marginBottom: 20, borderLeft: "3px solid var(--red)" }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--red)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            {en ? "Case Study: CCSS HIVE Ransomware Attack (2022)" : "Caso de Estudio: Ataque Ransomware HIVE a CCSS (2022)"}
          </h3>
          <Grid cols="repeat(auto-fit,minmax(120px,1fr))" gap={8} style={{ marginBottom: 12 }}>
            {hiveCase.impact.map((item, i) => (
              <Bx key={i} style={{ padding: 10, textAlign: "center", background: "var(--surface)", borderRadius: 10 }}>
                <div style={{ fontSize: 20, marginBottom: 2 }}>{item.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "var(--red)", fontFamily: "'IBM Plex Mono',monospace" }}>{item.value}</div>
                <div style={{ fontSize: 10, color: "var(--text3)" }}>{item.metric}</div>
              </Bx>
            ))}
          </Grid>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {hiveCase.timeline(en).map((phase, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--red)", marginTop: 5, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text)" }}>{phase.phase}</div>
                  <div style={{ fontSize: 11.5, color: "var(--text2)", lineHeight: 1.5 }}>{phase.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, padding: "10px 14px", background: "var(--surface)", borderRadius: 8, borderLeft: "3px solid var(--red)" }}>
            <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>{hiveCase.lessons}</p>
          </div>
          <Ci s={en ? "CCSS Public Reports, Contraloría General 2022, La Nación, CRHoy" : "Informes Públicos CCSS, Contraloría General 2022, La Nación, CRHoy"} />
        </Card>
      </ScrollReveal>

      {/* ═══ SECTION: BREACH INTELLIGENCE ═══ */}
      <ScrollReveal>
        <Card style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--red)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            <Icon name="chart" size={14} color="var(--red)" style={{ marginRight: 6, verticalAlign: "middle" }} />
            {en ? "Healthcare Breach Intelligence (US HHS as Global Proxy)" : "Inteligencia de Brechas en Salud (HHS EE.UU. como Proxy Global)"}
          </h3>
          <p style={{ fontSize: 12, color: "var(--text3)", marginBottom: 12, lineHeight: 1.5 }}>
            {en
              ? "Costa Rica has no mandatory breach reporting. US HHS data (500+ record incidents) serves as proxy for global healthcare breach trends."
              : "Costa Rica no tiene reporte obligatorio de brechas. Datos HHS de EE.UU. (incidentes de 500+ registros) sirven como proxy de tendencias globales."}
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={breachTS} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradBreaches" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--red)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--red)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradRecords" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--amber)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--amber)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="year" tick={{ fontSize: 10, fill: tickFill }} />
              <YAxis yAxisId="left" tick={{ fontSize: 10, fill: tickFill }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: tickFill }} />
              <Tooltip contentStyle={{ background: tipBg, border: tipBorder, borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area yAxisId="left" type="monotone" dataKey="breaches" stroke="var(--red)" fill="url(#gradBreaches)" name={en ? "Breaches" : "Brechas"} strokeWidth={2} />
              <Area yAxisId="right" type="monotone" dataKey="records" stroke="var(--amber)" fill="url(#gradRecords)" name={en ? "Records (M)" : "Registros (M)"} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <Grid cols="repeat(auto-fit,minmax(100px,1fr))" gap={8} style={{ marginTop: 10 }}>
            <MiniStat label={en ? "Avg Cost/Breach" : "Costo/Brecha"} value="$10.93M" color="var(--red)" mono />
            <MiniStat label={en ? "Records 2024" : "Registros 2024"} value="168M" color="var(--amber)" mono />
            <MiniStat label={en ? "Detection Time" : "Detección"} value={en ? "194 days" : "194 días"} color="var(--text2)" mono />
          </Grid>
          <Ci s="HHS Breach Portal · IBM Cost of Data Breach Report 2024" />
        </Card>
      </ScrollReveal>

      {/* ═══ SECTION: GOVERNANCE RADAR ═══ */}
      <ScrollReveal>
        <Card style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--indigo)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            <Icon name="globe" size={14} color="var(--indigo)" style={{ marginRight: 6, verticalAlign: "middle" }} />
            {en ? "Health AI Governance Maturity — CR vs Peers" : "Madurez de Gobernanza AI Salud — CR vs Pares"}
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={governance}>
              <PolarGrid stroke={gridStroke} />
              <PolarAngleAxis dataKey="dim" tick={{ fontSize: 10, fill: tickFill }} />
              <PolarRadiusAxis angle={90} domain={[0, 1]} tick={{ fontSize: 9, fill: tickFill }} />
              <Radar name={en ? "Costa Rica" : "Costa Rica"} dataKey="cr" stroke="var(--amber)" fill="var(--amber)" fillOpacity={0.2} strokeWidth={2} />
              <Radar name={en ? "Singapore" : "Singapur"} dataKey="sg" stroke="var(--green)" fill="var(--green)" fillOpacity={0.1} strokeWidth={2} />
              <Radar name={en ? "EU" : "UE"} dataKey="eu" stroke="var(--cyan)" fill="var(--cyan)" fillOpacity={0.1} strokeWidth={2} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: tipBg, border: tipBorder, borderRadius: 8, fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
          <Ci s={en ? "Colibrii Labs governance assessment — GDPR, HIPAA, PDPA, CR regulatory inventory" : "Evaluación gobernanza Colibrii Labs — GDPR, HIPAA, PDPA, inventario regulatorio CR"} />
        </Card>
      </ScrollReveal>

      {/* ═══ SECTION: COMPLIANCE COMPARISON — Mobile-first ═══ */}
      <ScrollReveal>
        <Card style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--cyan)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            {en ? "Regulatory Compliance Gap — Health AI" : "Brecha Regulatoria — AI en Salud"}
          </h3>
          {/* Desktop table */}
          <div className="hide-mobile" style={{ overflowX: "auto" }}>
            <table className="data-table" style={{ minWidth: 520 }}>
              <thead>
                <tr>
                  <th>{en ? "Dimension" : "Dimensión"}</th>
                  <th style={{ textAlign: "center" }}><Flag code="CR" size={14} /> CR</th>
                  <th style={{ textAlign: "center" }}><Flag code="US" size={14} /> {en ? "US" : "EE.UU."}</th>
                  <th style={{ textAlign: "center" }}><Flag code="EU" size={14} /> {en ? "EU" : "UE"}</th>
                  <th style={{ textAlign: "center" }}><Flag code="SG" size={14} /> {en ? "Singapore" : "Singapur"}</th>
                </tr>
              </thead>
              <tbody>
                {compliance.map((row, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, fontSize: 11 }}>{row.dim}</td>
                    <td style={{ textAlign: "center", color: row.crScore === 0 ? "var(--red)" : "var(--amber)", fontWeight: 600, fontSize: 11 }}>{row.cr}</td>
                    <td style={{ textAlign: "center", color: "var(--text2)", fontSize: 11 }}>{row.us}</td>
                    <td style={{ textAlign: "center", color: "var(--text2)", fontSize: 11 }}>{row.eu}</td>
                    <td style={{ textAlign: "center", color: "var(--text2)", fontSize: 11 }}>{row.sg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile: stacked comparison cards */}
          <div className="show-mobile" style={{ display: "none" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {compliance.map((row, i) => (
                <div key={i} style={{ padding: "12px 14px", borderRadius: 10, background: "var(--surface)", border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>{row.dim}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                    <div style={{ padding: "6px 8px", borderRadius: 6, background: row.crScore === 0 ? "rgba(239,68,68,0.08)" : "rgba(245,158,11,0.08)", border: `1px solid ${row.crScore === 0 ? "rgba(239,68,68,0.2)" : "rgba(245,158,11,0.2)"}` }}>
                      <div style={{ fontSize: 9, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace" }}><Flag code="CR" size={10} /> CR</div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: row.crScore === 0 ? "var(--red)" : "var(--amber)" }}>{row.cr}</div>
                    </div>
                    <div style={{ padding: "6px 8px", borderRadius: 6, background: "var(--card)" }}>
                      <div style={{ fontSize: 9, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace" }}><Flag code="US" size={10} /> {en ? "US" : "EE.UU."}</div>
                      <div style={{ fontSize: 11, color: "var(--text2)" }}>{row.us}</div>
                    </div>
                    <div style={{ padding: "6px 8px", borderRadius: 6, background: "var(--card)" }}>
                      <div style={{ fontSize: 9, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace" }}><Flag code="EU" size={10} /> {en ? "EU" : "UE"}</div>
                      <div style={{ fontSize: 11, color: "var(--text2)" }}>{row.eu}</div>
                    </div>
                    <div style={{ padding: "6px 8px", borderRadius: 6, background: "var(--card)" }}>
                      <div style={{ fontSize: 9, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace" }}><Flag code="SG" size={10} /> {en ? "SG" : "Singapur"}</div>
                      <div style={{ fontSize: 11, color: "var(--text2)" }}>{row.sg}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Ci s={en ? "Colibrii Labs comparison — HIPAA, GDPR, EU AI Act, PDPA, HSA, FDA SaMD" : "Comparación Colibrii Labs — HIPAA, GDPR, EU AI Act, PDPA, HSA, FDA SaMD"} />
        </Card>
      </ScrollReveal>

      {/* ═══ NEW SECTION: INTERNATIONAL FRAMEWORKS ═══ */}
      <ScrollReveal>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--indigo)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            <Icon name="globe" size={14} color="var(--indigo)" style={{ marginRight: 6, verticalAlign: "middle" }} />
            {en ? "International Frameworks for Health AI" : "Marcos Internacionales para AI en Salud"}
          </h3>
          <p style={{ fontSize: 12, color: "var(--text3)", marginBottom: 12, lineHeight: 1.5 }}>
            {en
              ? "Key international standards and frameworks shaping health AI governance globally. Expert recommendation: Costa Rica should align with these as an OECD member."
              : "Estándares y marcos internacionales clave que moldean la gobernanza de AI en salud globalmente. Recomendación experta: Costa Rica debe alinearse con estos como miembro de la OCDE."}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {frameworks.map((fw, i) => (
              <Card key={fw.id} d={0.05} style={{ borderLeft: `3px solid ${fw.color}`, cursor: "pointer" }}
                onClick={() => setExpandedFramework(expandedFramework === i ? null : i)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", margin: 0 }}>{fw.name}</h4>
                      <Tag color={fw.color}>{fw.status}</Tag>
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>{fw.org}</div>
                    <div style={{ fontSize: 12, color: fw.color, fontWeight: 600, lineHeight: 1.5 }}>{fw.relevance}</div>
                  </div>
                  <span style={{ transform: expandedFramework === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", display: "inline-block", color: "var(--text3)" }}>▾</span>
                </div>
                {expandedFramework === i && (
                  <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--border)" }}>
                    <p style={{ fontSize: 12.5, color: "var(--text2)", lineHeight: 1.7, margin: "0 0 8px 0" }}>{fw.desc}</p>
                    {fw.link && <Lnk href={fw.link}>{en ? "Read more" : "Leer más"}</Lnk>}
                  </div>
                )}
              </Card>
            ))}
          </div>
          <Ci s={en ? "Expert recommendation — Dr. Adrián Castillo (CSIC/EHDS certified), OECD, WHO, AHA" : "Recomendación experta — Dr. Adrián Castillo (certificado CSIC/EHDS), OCDE, OMS, AHA"} />
        </div>
      </ScrollReveal>

      {/* ═══ NEW SECTION: AI HEALTH TECH IN COSTA RICA ═══ */}
      <ScrollReveal>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--green)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            <Icon name="target" size={14} color="var(--green)" style={{ marginRight: 6, verticalAlign: "middle" }} />
            {en ? "AI Health Technology Active in Costa Rica" : "Tecnología AI de Salud Activa en Costa Rica"}
          </h3>
          <p style={{ fontSize: 12, color: "var(--text3)", marginBottom: 12, lineHeight: 1.5 }}>
            {en
              ? "Real AI medical devices and platforms already operating or arriving in Costa Rica — registered with Ministerio de Salud or FDA-cleared."
              : "Dispositivos y plataformas médicas con AI reales ya operando o llegando a Costa Rica — registrados ante el Ministerio de Salud o aprobados por FDA."}
          </p>
          <Grid cols="repeat(auto-fit,minmax(260px,1fr))" gap={10}>
            {techCR.map((tech) => (
              <Card key={tech.id} d={0.05} style={{ borderLeft: `3px solid ${tech.color}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", margin: 0 }}>{tech.name}</h4>
                    <div style={{ fontSize: 10, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace" }}>{tech.company}</div>
                  </div>
                  <Tag color={tech.color}>{tech.status}</Tag>
                </div>
                <div style={{ fontSize: 11, color: tech.color, fontWeight: 600, marginBottom: 6 }}>{tech.type}</div>
                <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6, margin: "0 0 8px 0" }}>{tech.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                  <span style={{ fontSize: 10, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace" }}>{tech.approvals}</span>
                  {tech.link && <Lnk href={tech.link}>{en ? "Details" : "Detalles"}</Lnk>}
                </div>
              </Card>
            ))}
          </Grid>
          {/* Additional resource: La Nación apps article */}
          {resources.map((res, i) => (
            <div key={i} style={{ marginTop: 10, padding: "10px 14px", borderRadius: 8, background: "var(--surface)", border: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>{res.title}</div>
                <div style={{ fontSize: 10, color: "var(--text3)" }}>{res.source} — {res.desc}</div>
              </div>
              <Lnk href={res.link}>{en ? "Read" : "Leer"}</Lnk>
            </div>
          ))}
          <Ci s={en ? "Expert input — Dr. Adrián Castillo · Ministerio de Salud CR · FDA · Mayo Clinic · La Nación" : "Aporte experto — Dr. Adrián Castillo · Ministerio de Salud CR · FDA · Mayo Clinic · La Nación"} />
        </div>
      </ScrollReveal>

      {/* ═══ SECTION: DIAGNOSTICS & APPLICATIONS ═══ */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>
            <Icon name="target" size={16} color={t.pk} style={{ marginRight: 8, verticalAlign: "middle" }} />
            {en ? "Diagnostics & Early Detection" : "Diagnósticos & Detección Temprana"}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 }}>
            {[
              { t: en ? "Cancer Screening" : "Detección de Cáncer", d: en ? "AI ultrasound detects breast cancer with 97% accuracy. Computer-aided detection improves adenoma detection rates." : "Ultrasonido AI detecta cáncer de mama con 97% de precisión. Detección asistida mejora tasas de detección de adenomas." },
              { t: en ? "Medical Imaging" : "Imagenología Médica", d: en ? "AI processes X-rays, CT, MRIs faster and often more accurately. Brain CT in 1 min vs 30+ traditional." : "AI procesa rayos X, CT, resonancias más rápido. CT cerebral en 1 min vs 30+ tradicional." },
              { t: en ? "Remote Monitoring" : "Monitoreo Remoto", d: en ? "AI-powered wearables and platforms (Cedars-Sinai, 42K patients) enable continuous health monitoring." : "Wearables y plataformas AI (Cedars-Sinai, 42K pacientes) permiten monitoreo continuo de salud." },
              { t: en ? "Drug Discovery" : "Descubrimiento de Fármacos", d: en ? "90% of drugs fail trials, costing $2.6B each. AI accelerates compound identification and toxicity prediction." : "90% de fármacos fallan en ensayos, costando $2.6B cada uno. AI acelera identificación de compuestos y predicción de toxicidad." }
            ].map((item, i) => (
              <Card key={i} style={{ background: `${t.pk}05`, border: `1px solid ${t.pk}12` }}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: t.pk, marginBottom: 4 }}>{item.t}</h4>
                <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>{item.d}</p>
              </Card>
            ))}
          </div>
        </Card>
      </ScrollReveal>

      {/* ═══ SECTION: MITIGATION & GOVERNANCE PROTOCOLS ═══ */}
      <ScrollReveal>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--green)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            <Icon name="shield" size={14} color="var(--green)" style={{ marginRight: 6, verticalAlign: "middle" }} />
            {en ? "Mitigation & Governance Protocols" : "Protocolos de Mitigación y Gobernanza"}
          </h3>
          <Grid cols="repeat(auto-fit,minmax(260px,1fr))" gap={10}>
            {mitigations.map((m, i) => (
              <Card key={i} d={0.05} style={{ borderLeft: "3px solid var(--green)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 18 }}>{m.icon}</span>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", margin: 0 }}>{m.title}</h4>
                </div>
                <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6, margin: "0 0 6px 0" }}>{m.desc}</p>
                <div style={{ fontSize: 10, color: "var(--green)", fontFamily: "'IBM Plex Mono',monospace" }}>
                  {en ? "Applicability" : "Aplicabilidad"}: {m.applicability}
                </div>
              </Card>
            ))}
          </Grid>
        </div>
      </ScrollReveal>

      {/* ═══ SECTION: CR CONNECTION (expanded) ═══ */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16, borderLeft: `3px solid ${t.cy}` }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: t.cy, marginBottom: 10 }}>
            <Flag code="CR" size={18} style={{ marginRight: 6, verticalAlign: "middle" }} />
            {en ? "Costa Rica Health System AI Readiness" : "Preparación AI del Sistema de Salud de Costa Rica"}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
            {crConn.map((item, i) => (
              <div key={i} style={{ padding: 10, borderRadius: 8, background: "var(--surface)" }}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{item.title}</h4>
                <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </ScrollReveal>

      {/* ═══ SECTION: CASE STUDIES ═══ */}
      <ScrollReveal>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: t.pk, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            <Icon name="star" size={14} color={t.pk} style={{ marginRight: 6, verticalAlign: "middle" }} />
            {en ? "Global Case Studies" : "Casos de Estudio Globales"}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {cases.map((cs, i) => (
              <Card key={i} style={{ cursor: "pointer", borderLeft: `3px solid ${cs.color}`, border: expandedCase === i ? `1px solid ${cs.color}40` : undefined, borderLeftWidth: 3, borderLeftStyle: "solid", borderLeftColor: cs.color }} onClick={() => setExpandedCase(expandedCase === i ? null : i)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, paddingRight: 20 }}>
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", margin: 0 }}>{cs.title}</h4>
                    <span style={{ fontSize: 11, color: "var(--text2)" }}>{cs.org}</span>
                  </div>
                  <Tag color={cs.color}>{cs.stat}</Tag>
                </div>
                {expandedCase === i && (
                  <p style={{ fontSize: 12.5, color: "var(--text2)", lineHeight: 1.7, marginTop: 8, marginBottom: 0 }}>{cs.desc}</p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ═══ SECTION: RELATED MODULES ═══ */}
      {setTab && (
        <ScrollReveal>
          <SH t={en ? "Related Modules" : "Módulos Relacionados"} />
          <Grid cols="repeat(auto-fit,minmax(220px,1fr))">
            {CROSS_LINKS(en).health?.map((lk, i) => (
              <RelatedInsight key={i} icon="→" label={lk.label} desc={lk.desc} onClick={() => setTab(lk.tab)} />
            ))}
          </Grid>
        </ScrollReveal>
      )}

      {/* ═══ SECTION: SOURCES & METHODOLOGY ═══ */}
      <ScrollReveal>
        <div style={{ padding: "12px 0", borderTop: "1px solid var(--border)" }}>
          <p style={{ fontSize: 11, color: "var(--text2)", margin: 0, lineHeight: 1.6 }}>
            <strong>{en ? "Sources" : "Fuentes"}:</strong> ITU AI for Good Impact Report 2025 · WHO Global Health Observatory · WHO AI Ethics & Governance 2024 · HHS Breach Portal · IBM Cost of Data Breach 2024 · Nature Medicine · NHS England · Cedars-Sinai · C2itech · CCSS Costa Rica · HIPAA · GDPR · PDPA · FDA SaMD Framework · OECD AI Principles · European Health Data Space (EHDS) · AHA Scientific Statement on AI in Heart Disease · American College of AI in Medicine · Ministerio de Salud CR · Mayo Clinic · La Nación CR · Expert input: Dr. Adrián Castillo (CSIC/EHDS)
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
