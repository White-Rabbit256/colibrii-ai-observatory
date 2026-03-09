"use client";
import { useState } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, SH, Grid, ScrollReveal, Tag, Bx, Ci, MiniStat, KeyInsight, FreshnessBadge, RelatedInsight } from "./ui";
import { CROSS_LINKS } from "./data";
import { Icon } from "./system/Icon";
import {
  HEALTH_RISKS, HEALTH_PII_MATRIX, HEALTH_BREACH_TS, CCSS_HIVE_CASE,
  HEALTH_GOVERNANCE, HEALTH_COMPLIANCE, HEALTH_MITIGATIONS, HEALTH_STATS
} from "./healthData";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Health AI: Risk Intelligence Dashboard
   From marketing brochure → comprehensive risk & opportunity module
   Sources: WHO, HHS, IBM, Nature Medicine, CCSS, ITU, OECD
   ═══════════════════════════════════════════════════════════════ */

// ── Risk Heatmap Cell ──
function RiskCell({ risk, onClick, selected }) {
  const bgOpacity = Math.round((risk.severity * risk.likelihood) / 100 * 255).toString(16).padStart(2, "0");
  return (
    <button
      onClick={() => onClick(risk)}
      style={{
        display: "flex", flexDirection: "column", gap: 2, padding: "8px 10px",
        background: selected ? `${risk.color}20` : `${risk.color}${bgOpacity.slice(0, 2)}`,
        border: selected ? `2px solid ${risk.color}` : "1px solid var(--border)",
        borderRadius: 8, cursor: "pointer", textAlign: "left", width: "100%",
        transition: "all .2s ease",
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 700, color: risk.color }}>{risk.name}</div>
      <div style={{ display: "flex", gap: 6, fontSize: 9, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace" }}>
        <span>S:{risk.severity}</span>
        <span>L:{risk.likelihood}</span>
        <Tag color={risk.color}>{risk.cat}</Tag>
      </div>
    </button>
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

  const gridStroke = dark ? "#1e293b" : "#d1d5e0";
  const tickFill = dark ? "#94a3b8" : "#475569";
  const tipBg = dark ? "#111827" : "#fff";
  const tipBorder = `1px solid ${dark ? "#1e293b" : "#d1d5e0"}`;

  // Sort risks by composite score (severity × likelihood) for display
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
          {selectedRisk && (
            <Card style={{ marginTop: 10, background: `${selectedRisk.color}08`, border: `1px solid ${selectedRisk.color}20` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: selectedRisk.color, margin: 0 }}>{selectedRisk.name}</h4>
                  <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                    <Tag color={selectedRisk.color}>{en ? `Severity: ${selectedRisk.severity}/10` : `Severidad: ${selectedRisk.severity}/10`}</Tag>
                    <Tag color={selectedRisk.color}>{en ? `Likelihood: ${selectedRisk.likelihood}/10` : `Probabilidad: ${selectedRisk.likelihood}/10`}</Tag>
                    <Tag color="var(--text3)">{selectedRisk.cat}</Tag>
                  </div>
                </div>
                <button onClick={() => setSelectedRisk(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "var(--text3)" }}>×</button>
              </div>
              <p style={{ fontSize: 12.5, color: "var(--text2)", lineHeight: 1.7, marginTop: 8, marginBottom: 0 }}>{selectedRisk.desc}</p>
            </Card>
          )}
          <Ci s={en ? "Colibrii Labs Risk Assessment — WHO, HHS, IBM, Nature Medicine, CCSS" : "Evaluación de Riesgo Colibrii Labs — WHO, HHS, IBM, Nature Medicine, CCSS"} />
        </div>
      </ScrollReveal>

      {/* ═══ SECTION: PII EXPOSURE MATRIX ═══ */}
      <ScrollReveal>
        <Card style={{ marginBottom: 20, overflowX: "auto" }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--amber)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            <Icon name="lock" size={14} color="var(--amber)" style={{ marginRight: 6, verticalAlign: "middle" }} />
            {en ? "PII Exposure Matrix — Health Data at Risk" : "Matriz de Exposición PII — Datos de Salud en Riesgo"}
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: `2px solid var(--border)` }}>
                  <th style={{ textAlign: "left", padding: "8px 10px", color: "var(--text2)", fontWeight: 700, fontSize: 11 }}>{en ? "Data Type" : "Tipo de Dato"}</th>
                  <th style={{ textAlign: "left", padding: "8px 10px", color: "var(--text2)", fontWeight: 700, fontSize: 11 }}>{en ? "System" : "Sistema"}</th>
                  <th style={{ textAlign: "left", padding: "8px 10px", color: "var(--text2)", fontWeight: 700, fontSize: 11 }}>{en ? "Sensitivity" : "Sensibilidad"}</th>
                  <th style={{ textAlign: "left", padding: "8px 10px", color: "var(--text2)", fontWeight: 700, fontSize: 11 }}>{en ? "Current Gap" : "Brecha Actual"}</th>
                </tr>
              </thead>
              <tbody>
                {piiMatrix.map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "8px 10px", fontWeight: 600, color: "var(--text)" }}>{row.type}</td>
                    <td style={{ padding: "8px 10px", color: "var(--text2)", fontFamily: "'IBM Plex Mono',monospace", fontSize: 11 }}>{row.system}</td>
                    <td style={{ padding: "8px 10px" }}>
                      <Tag color={row.sensitivity === (en ? "Critical" : "Crítico") ? "var(--red)" : "var(--amber)"}>{row.sensitivity}</Tag>
                    </td>
                    <td style={{ padding: "8px 10px", color: "var(--text3)", fontSize: 11 }}>{row.gap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Ci s={en ? "Colibrii Labs analysis — CCSS, EDUS, HIPAA framework comparison" : "Análisis Colibrii Labs — CCSS, EDUS, comparación con marco HIPAA"} />
        </Card>
      </ScrollReveal>

      {/* ═══ SECTION: CCSS HIVE CASE STUDY ═══ */}
      <ScrollReveal>
        <Card style={{ marginBottom: 20, background: `var(--red)08`, border: "1px solid var(--red)20" }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--red)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            🔴 {en ? "Case Study: CCSS HIVE Ransomware Attack (2022)" : "Caso de Estudio: Ataque Ransomware HIVE a CCSS (2022)"}
          </h3>
          <Grid cols="repeat(auto-fit,minmax(120px,1fr))" gap={8} style={{ marginBottom: 12 }}>
            {hiveCase.impact.map((item, i) => (
              <Bx key={i} style={{ padding: 10, textAlign: "center", background: "var(--card)" }}>
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
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--violet)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            <Icon name="globe" size={14} color="var(--violet)" style={{ marginRight: 6, verticalAlign: "middle" }} />
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

      {/* ═══ SECTION: COMPLIANCE COMPARISON TABLE ═══ */}
      <ScrollReveal>
        <Card style={{ marginBottom: 20, overflowX: "auto" }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--cyan)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            {en ? "Regulatory Compliance Gap — Health AI" : "Brecha Regulatoria — AI en Salud"}
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, minWidth: 500 }}>
              <thead>
                <tr style={{ borderBottom: `2px solid var(--border)` }}>
                  <th style={{ textAlign: "left", padding: "6px 8px", color: "var(--text2)", fontWeight: 700 }}>{en ? "Dimension" : "Dimensión"}</th>
                  <th style={{ textAlign: "center", padding: "6px 8px", color: "var(--amber)", fontWeight: 700 }}>🇨🇷 CR</th>
                  <th style={{ textAlign: "center", padding: "6px 8px", color: "var(--text2)", fontWeight: 700 }}>🇺🇸 {en ? "US" : "EE.UU."}</th>
                  <th style={{ textAlign: "center", padding: "6px 8px", color: "var(--cyan)", fontWeight: 700 }}>🇪🇺 {en ? "EU" : "UE"}</th>
                  <th style={{ textAlign: "center", padding: "6px 8px", color: "var(--green)", fontWeight: 700 }}>🇸🇬 {en ? "Singapore" : "Singapur"}</th>
                </tr>
              </thead>
              <tbody>
                {compliance.map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "6px 8px", fontWeight: 600, color: "var(--text)", fontSize: 11 }}>{row.dim}</td>
                    <td style={{ padding: "6px 8px", textAlign: "center", color: row.crScore === 0 ? "var(--red)" : "var(--amber)", fontWeight: 600 }}>{row.cr}</td>
                    <td style={{ padding: "6px 8px", textAlign: "center", color: "var(--text2)" }}>{row.us}</td>
                    <td style={{ padding: "6px 8px", textAlign: "center", color: "var(--text2)" }}>{row.eu}</td>
                    <td style={{ padding: "6px 8px", textAlign: "center", color: "var(--text2)" }}>{row.sg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Ci s={en ? "Colibrii Labs comparison — HIPAA, GDPR, EU AI Act, PDPA, HSA, FDA SaMD" : "Comparación Colibrii Labs — HIPAA, GDPR, EU AI Act, PDPA, HSA, FDA SaMD"} />
        </Card>
      </ScrollReveal>

      {/* ═══ SECTION: DIAGNOSTICS & APPLICATIONS (preserved) ═══ */}
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
        <Card style={{ marginBottom: 16, background: `${t.cy}06`, border: `1px solid ${t.cy}20` }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: t.cy, marginBottom: 10 }}>
            🇨🇷 {en ? "Costa Rica Health System AI Readiness" : "Preparación AI del Sistema de Salud de Costa Rica"}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
            {crConn.map((item, i) => (
              <div key={i} style={{ padding: 10, borderRadius: 8, background: `${t.cy}06` }}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{item.title}</h4>
                <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </ScrollReveal>

      {/* ═══ SECTION: CASE STUDIES (preserved) ═══ */}
      <ScrollReveal>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: t.pk, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            <Icon name="star" size={14} color={t.pk} style={{ marginRight: 6, verticalAlign: "middle" }} />
            {en ? "Global Case Studies" : "Casos de Estudio Globales"}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {cases.map((cs, i) => (
              <Card key={i} style={{ cursor: "pointer", border: expandedCase === i ? `1px solid ${cs.color}40` : undefined }} onClick={() => setExpandedCase(expandedCase === i ? null : i)}>
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
          <Grid cols={3}>
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
            <strong>{en ? "Sources" : "Fuentes"}:</strong> ITU AI for Good Impact Report 2025 · WHO Global Health Observatory · HHS Breach Portal · IBM Cost of Data Breach 2024 · Nature Medicine · NHS England · Cedars-Sinai · C2itech · CCSS Costa Rica · HIPAA · GDPR · PDPA · FDA SaMD Framework
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
