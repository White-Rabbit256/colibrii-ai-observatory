"use client";
import { useState } from "react";
import { Card, SH, Grid, ScrollReveal, Tag, Bx } from "./ui";
import { Icon } from "./system/Icon";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Health & Healthcare AI
   AI for Good Impact Report · WHO · NHS · Diagnostics · CR
   ═══════════════════════════════════════════════════════════════ */

const CASE_STUDIES = (en) => [
  {
    title: en ? "NHS Stroke AI — United Kingdom" : "NHS Stroke AI — Reino Unido",
    org: "NHS / Brainomix",
    desc: en
      ? "AI-powered brain CT analysis deployed across 107 stroke centres nationwide. Processes brain scans in under 1 minute (vs 30+ min traditional review). Good recovery rates improved from 16% to 48%. Treatment decision time reduced from 140 to 79 minutes. The system identifies salvageable brain tissue invisible to the human eye."
      : "Análisis de tomografía cerebral con AI desplegado en 107 centros de ictus a nivel nacional. Procesa escáneres cerebrales en menos de 1 minuto (vs 30+ min revisión tradicional). Tasas de buena recuperación mejoraron de 16% a 48%. Tiempo de decisión de tratamiento reducido de 140 a 79 minutos.",
    stat: en ? "107 centres · 16%→48% recovery" : "107 centros · 16%→48% recuperación",
    color: "#e11d48"
  },
  {
    title: "MamaMate",
    org: en ? "AI for Good Winner" : "Ganador AI for Good",
    desc: en
      ? "Offline AI-powered diagnostic device for maternal healthcare in rural Africa. Solar-powered, operates in local languages, and requires no internet connectivity. Provides prenatal risk assessment and health monitoring for mothers in areas with zero medical infrastructure."
      : "Dispositivo diagnóstico AI offline para salud materna en África rural. Solar, opera en idiomas locales y no requiere conexión a internet. Proporciona evaluación de riesgo prenatal y monitoreo de salud para madres en áreas sin infraestructura médica.",
    stat: en ? "Offline · Solar-powered" : "Offline · Solar",
    color: "#ec4899"
  },
  {
    title: en ? "C2itech Organoid Platform" : "Plataforma Organoides C2itech",
    org: "C2itech",
    desc: en
      ? "Combines AI with 3D organoid tissue models for respiratory virus drug testing. Achieves 50% faster drug screening and 90% accuracy in predicting viral mutations. Reduces reliance on animal testing while accelerating pandemic preparedness."
      : "Combina AI con modelos de tejido organoide 3D para pruebas de medicamentos contra virus respiratorios. Logra screening de medicamentos 50% más rápido y 90% de precisión prediciendo mutaciones virales. Reduce dependencia de pruebas animales mientras acelera preparación pandémica.",
    stat: en ? "50% faster · 90% accuracy" : "50% más rápido · 90% precisión",
    color: "#8b5cf6"
  },
  {
    title: en ? "Cedars-Sinai Connect" : "Cedars-Sinai Connect",
    org: "Cedars-Sinai",
    desc: en
      ? "AI-powered remote patient management platform monitoring 42,000 patients. Achieves 77% optimal medication recommendations and reduces unnecessary emergency visits through predictive health monitoring and early intervention alerts."
      : "Plataforma de gestión remota de pacientes con AI monitoreando 42,000 pacientes. Logra 77% de recomendaciones óptimas de medicación y reduce visitas de emergencia innecesarias mediante monitoreo predictivo y alertas de intervención temprana.",
    stat: en ? "42K patients · 77% optimal" : "42K pacientes · 77% óptimo",
    color: "#0ea5e9"
  }
];

const CR_CONNECTIONS = (en) => [
  { title: "CCSS + EDUS", desc: en ? "Costa Rica's universal healthcare system (CCSS) has 8+ years of EDUS digital health records covering the entire population — the largest structured health dataset in Central America. A massive opportunity for AI-driven preventive medicine." : "El sistema de salud universal de CR (CCSS) tiene 8+ años de registros EDUS cubriendo toda la población — el mayor dataset de salud estructurado de Centroamérica. Oportunidad masiva para medicina preventiva con AI." },
  { title: en ? "Federated Learning" : "Aprendizaje Federado", desc: en ? "CCSS could implement federated learning: train AI models across hospitals without centralizing sensitive patient data. Each hospital trains locally, sharing only model updates — solving the privacy vs. AI utility tension." : "CCSS podría implementar aprendizaje federado: entrenar modelos AI entre hospitales sin centralizar datos sensibles. Cada hospital entrena localmente, compartiendo solo actualizaciones del modelo." },
  { title: en ? "Post-Hive Cybersecurity" : "Ciberseguridad Post-Hive", desc: en ? "The 2022 Hive ransomware attack crippled CCSS for weeks. Any health AI deployment must address cybersecurity first — medical AI on a vulnerable infrastructure is a national security risk." : "El ataque ransomware Hive de 2022 paralizó CCSS por semanas. Todo despliegue AI de salud debe abordar ciberseguridad primero — AI médica en infraestructura vulnerable es riesgo de seguridad nacional." },
  { title: en ? "CCSS Fiscal Reality" : "Realidad Fiscal CCSS", desc: en ? "CCSS carries $4.4B in state debt. AI investments must demonstrate clear ROI: reduced wait times, fewer unnecessary referrals, better preventive care to lower long-term costs." : "CCSS carga $4.4B en deuda estatal. Inversiones AI deben demostrar ROI claro: tiempos de espera reducidos, menos referencias innecesarias, mejor atención preventiva para reducir costos a largo plazo." }
];

export function HealthAI({ en, t }) {
  const [expandedCase, setExpandedCase] = useState(null);
  const cases = CASE_STUDIES(en);
  const crConn = CR_CONNECTIONS(en);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      {/* ── HEADER ── */}
      <SH
        color={t.pk}
        label={en ? "AI FOR GOOD · SECTORAL" : "AI FOR GOOD · SECTORIAL"}
        title={en ? "Health & Healthcare AI" : "Salud & AI en Salud"}
        desc={en
          ? "How AI is transforming diagnostics, drug discovery, and healthcare delivery — from the ITU AI for Good Impact Report."
          : "Cómo AI está transformando diagnósticos, descubrimiento de medicamentos y prestación de salud — del Reporte de Impacto AI for Good de la UIT."
        }
      />

      {/* ── INTRO CONTEXT BOX ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16, background: `${t.pk}08`, border: `1px solid ${t.pk}20` }}>
          <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7, margin: 0 }}>
            <Icon name="heart" size={14} color={t.pk} style={{ marginRight: 6, verticalAlign: "middle" }} />
            {en
              ? "AI in healthcare is projected to grow from $29 billion (2024) to $504 billion by 2032. Already, 94% of healthcare organizations use AI centrally, with applications ranging from breast cancer detection (97% accuracy with AI ultrasound) to stroke treatment that tripled recovery rates. Yet 90% of drug candidates still fail in clinical trials, and most AI health innovations remain concentrated in high-income countries."
              : "AI en salud se proyecta crecer de $29 mil millones (2024) a $504 mil millones para 2032. Ya, 94% de organizaciones de salud usan AI centralmente, con aplicaciones desde detección de cáncer de mama (97% precisión con ultrasonido AI) hasta tratamiento de ictus que triplicó tasas de recuperación. Sin embargo, 90% de candidatos a medicamentos fallan en ensayos clínicos, y la mayoría de innovaciones AI en salud permanecen concentradas en países de ingreso alto."
            }
          </p>
        </Card>
      </ScrollReveal>

      {/* ── KEY STATISTICS ── */}
      <ScrollReveal>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: t.pk, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            {en ? "Healthcare AI Landscape" : "Panorama AI en Salud"}
          </h3>
          <Grid cols="repeat(auto-fit,minmax(140px,1fr))" gap={10}>
            {[
              { v: "$504B", l: en ? "AI Health Market 2032" : "Mercado AI Salud 2032", s: en ? "From $29B in 2024 (17x growth)" : "Desde $29B en 2024 (17x crecimiento)", c: t.pk, ic: "coins" },
              { v: "94%", l: en ? "Orgs Using AI" : "Orgs Usando AI", s: en ? "Healthcare organizations centrally" : "Organizaciones de salud centralmente", c: t.cy, ic: "chart" },
              { v: "97%", l: en ? "Breast Cancer Detection" : "Detección Cáncer de Mama", s: en ? "With AI-assisted ultrasound" : "Con ultrasonido asistido por AI", c: t.gn, ic: "target" },
              { v: "90%", l: en ? "Drug Candidates Fail" : "Candidatos Fallan", s: en ? "In clinical trials — AI can help" : "En ensayos clínicos — AI puede ayudar", c: t.rd, ic: "lightning" },
              { v: "3x", l: en ? "Stroke Recovery" : "Recuperación Ictus", s: en ? "16%→48% with NHS AI (UK)" : "16%→48% con NHS AI (UK)", c: t.vi, ic: "diamond" }
            ].map((d, i) => (
              <Card key={i} d={0.05}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: d.c, fontFamily: "'IBM Plex Mono',monospace" }}>{d.v}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginTop: 2 }}>{d.l}</div>
                    <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{d.s}</div>
                  </div>
                  <Icon name={d.ic} size={22} style={{ opacity: 0.5 }} />
                </div>
              </Card>
            ))}
          </Grid>
        </div>
      </ScrollReveal>

      {/* ── DIAGNOSTICS & EARLY DETECTION ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: t.tx, marginBottom: 8 }}>
            <Icon name="target" size={16} color={t.pk} style={{ marginRight: 8, verticalAlign: "middle" }} />
            {en ? "Diagnostics & Early Detection" : "Diagnósticos & Detección Temprana"}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 }}>
            {[
              { t: en ? "Cancer Screening" : "Detección de Cáncer", d: en ? "AI ultrasound detects breast cancer with 97% accuracy. Computer-aided detection for colorectal cancer improves adenoma detection rates. Early detection saves lives and reduces treatment costs." : "Ultrasonido AI detecta cáncer de mama con 97% de precisión. Detección asistida por computadora para cáncer colorrectal mejora tasas de detección de adenomas. Detección temprana salva vidas." },
              { t: en ? "Medical Imaging" : "Imagenología Médica", d: en ? "AI processes X-rays, CT scans, and MRIs faster and often more accurately than human radiologists for specific conditions. Brain CT analysis in 1 minute vs 30+ minutes traditional." : "AI procesa rayos X, tomografías y resonancias más rápido y a menudo con más precisión que radiólogos humanos para condiciones específicas. Análisis CT cerebral en 1 minuto vs 30+." },
              { t: en ? "Multimodal Diagnostics" : "Diagnósticos Multimodales", d: en ? "India deploys AI diagnostics for malaria, diabetes, and tuberculosis in rural clinics using smartphone cameras and portable sensors — bringing specialist-level screening to underserved areas." : "India despliega diagnósticos AI para malaria, diabetes y tuberculosis en clínicas rurales usando cámaras de teléfono y sensores portátiles — llevando screening especializado a áreas desatendidas." },
              { t: en ? "Remote Monitoring" : "Monitoreo Remoto", d: en ? "AI-powered wearables and remote platforms (like Cedars-Sinai Connect, 42K patients) enable continuous health monitoring, predicting deterioration before emergency situations arise." : "Wearables y plataformas remotas con AI (como Cedars-Sinai Connect, 42K pacientes) permiten monitoreo continuo de salud, prediciendo deterioro antes de emergencias." }
            ].map((item, i) => (
              <Card key={i} style={{ background: `${t.pk}05`, border: `1px solid ${t.pk}12` }}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: t.pk, marginBottom: 4 }}>{item.t}</h4>
                <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6, margin: 0 }}>{item.d}</p>
              </Card>
            ))}
          </div>
        </Card>
      </ScrollReveal>

      {/* ── DRUG DISCOVERY ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: t.tx, marginBottom: 8 }}>
            <Icon name="algo" size={16} color={t.vi} style={{ marginRight: 8, verticalAlign: "middle" }} />
            {en ? "Drug Discovery & Development" : "Descubrimiento de Medicamentos"}
          </h3>
          <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7, margin: "0 0 10px 0" }}>
            {en
              ? "90% of drug candidates fail in clinical trials, costing billions. AI accelerates every stage: identifying promising compounds, predicting toxicity, modeling drug-drug interactions, and enabling personalized medicine. The C2itech organoid platform combines AI with 3D tissue models for 50% faster drug screening with 90% accuracy in viral mutation prediction."
              : "90% de candidatos a medicamentos fallan en ensayos clínicos, costando miles de millones. AI acelera cada etapa: identificación de compuestos prometedores, predicción de toxicidad, modelado de interacciones farmacológicas y medicina personalizada. La plataforma C2itech combina AI con modelos de tejido 3D para screening 50% más rápido con 90% de precisión en predicción de mutaciones virales."
            }
          </p>
          <Grid cols="repeat(auto-fit,minmax(100px,1fr))" gap={8}>
            <Bx style={{ textAlign: "center", padding: 10 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: t.rd }}>90%</div>
              <div style={{ fontSize: 11, color: t.tx2 }}>{en ? "Drug candidate failure rate" : "Tasa de fallo candidatos"}</div>
            </Bx>
            <Bx style={{ textAlign: "center", padding: 10 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: t.vi }}>50%</div>
              <div style={{ fontSize: 11, color: t.tx2 }}>{en ? "Faster screening (C2itech)" : "Screening más rápido (C2itech)"}</div>
            </Bx>
            <Bx style={{ textAlign: "center", padding: 10 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: t.gn }}>$2.6B</div>
              <div style={{ fontSize: 11, color: t.tx2 }}>{en ? "Avg. cost per new drug" : "Costo promedio por nuevo fármaco"}</div>
            </Bx>
          </Grid>
        </Card>
      </ScrollReveal>

      {/* ── CASE STUDIES ── */}
      <ScrollReveal>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: t.pk, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            <Icon name="star" size={14} color={t.pk} style={{ marginRight: 6, verticalAlign: "middle" }} />
            {en ? "Case Studies" : "Casos de Estudio"}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {cases.map((cs, i) => (
              <Card key={i} style={{ cursor: "pointer", border: expandedCase === i ? `1px solid ${cs.color}40` : undefined }} onClick={() => setExpandedCase(expandedCase === i ? null : i)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: t.tx, margin: 0 }}>{cs.title}</h4>
                    <span style={{ fontSize: 11, color: t.tx2 }}>{cs.org}</span>
                  </div>
                  <Tag color={cs.color}>{cs.stat}</Tag>
                </div>
                {expandedCase === i && (
                  <p style={{ fontSize: 12.5, color: t.tx2, lineHeight: 1.7, marginTop: 8, marginBottom: 0 }}>
                    {cs.desc}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ── CR CONNECTION ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16, background: `${t.cy}06`, border: `1px solid ${t.cy}20` }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: t.cy, marginBottom: 10 }}>
            🇨🇷 {en ? "Costa Rica Connection" : "Conexión Costa Rica"}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
            {crConn.map((item, i) => (
              <div key={i} style={{ padding: 10, borderRadius: 8, background: `${t.cy}06` }}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: t.tx, marginBottom: 4 }}>{item.title}</h4>
                <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </ScrollReveal>

      {/* ── KEY CONSIDERATIONS ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: t.tx, marginBottom: 8 }}>
            <Icon name="info" size={16} color={t.am} style={{ marginRight: 8, verticalAlign: "middle" }} />
            {en ? "Key Considerations" : "Consideraciones Clave"}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 8 }}>
            {[
              { t: en ? "Clinical Validation" : "Validación Clínica", d: en ? "Every AI diagnostic tool must undergo rigorous clinical trials before deployment. AI suggestions are decision support — never autonomous diagnosis." : "Toda herramienta diagnóstica AI debe someterse a ensayos clínicos rigurosos. Sugerencias AI son soporte de decisión — nunca diagnóstico autónomo." },
              { t: en ? "Data Privacy" : "Privacidad de Datos", d: en ? "Health data is the most sensitive category. CCSS/EDUS AI requires differential privacy, federated learning, and strict access controls." : "Datos de salud son la categoría más sensible. AI CCSS/EDUS requiere privacidad diferencial, aprendizaje federado y controles de acceso estrictos." },
              { t: en ? "Algorithmic Bias" : "Sesgo Algorítmico", d: en ? "AI trained predominantly on data from high-income countries may perform poorly on underrepresented populations. CR must validate models for local demographics." : "AI entrenada predominantemente con datos de países ricos puede funcionar mal en poblaciones subrepresentadas. CR debe validar modelos para demografía local." },
              { t: en ? "Human-in-the-Loop" : "Humano en el Circuito", d: en ? "All health AI must maintain human oversight. AI amplifies medical capacity — it does not replace clinical judgment, especially for complex or ambiguous cases." : "Toda AI de salud debe mantener supervisión humana. AI amplifica capacidad médica — no reemplaza juicio clínico, especialmente para casos complejos o ambiguos." }
            ].map((item, i) => (
              <Bx key={i}>
                <h4 style={{ fontSize: 12, fontWeight: 700, color: t.am, marginBottom: 3 }}>{item.t}</h4>
                <p style={{ fontSize: 11.5, color: t.tx2, lineHeight: 1.5, margin: 0 }}>{item.d}</p>
              </Bx>
            ))}
          </div>
        </Card>
      </ScrollReveal>

      {/* ── SOURCES ── */}
      <ScrollReveal>
        <div style={{ padding: "12px 0", borderTop: `1px solid ${t.tx}10` }}>
          <p style={{ fontSize: 11, color: t.tx2, margin: 0, lineHeight: 1.6 }}>
            <strong>{en ? "Sources" : "Fuentes"}:</strong> ITU AI for Good Impact Report 2025 · WHO · NHS England · Cedars-Sinai · C2itech · CCSS Costa Rica
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
