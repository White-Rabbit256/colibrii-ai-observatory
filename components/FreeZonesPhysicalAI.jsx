"use client";
import { motion } from "framer-motion";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line, Treemap } from "recharts";
import { Card, SH, Tag, Ci, Lnk, Grid, AN, ScrollReveal, Stat, MiniStat, Flag, fadeUp, stagger } from "./ui";
import { FZ_DEEP, PAI_NEWS } from "./data";

/* ═══════════════════════════════════════════════════════════════
   FREE ZONES VIEW v13 — Sectors, employment, investment signals
   Enhanced with Treemap visualization
   ═══════════════════════════════════════════════════════════════ */

export function ZF({ en, t, dark }) {
  /* Sector treemap data */
  const treemapData = [
    { name: en ? "Medical Devices" : "Dispositivos Médicos", size: 35, fill: "#10b981" },
    { name: en ? "Digital Services" : "Servicios Digitales", size: 28, fill: "#2563eb" },
    { name: en ? "Electronics" : "Electrónica", size: 15, fill: "#8b5cf6" },
    { name: en ? "Semiconductors" : "Semiconductores", size: 10, fill: "#ec4899" },
    { name: en ? "Manufacturing" : "Manufactura", size: 8, fill: "#f59e0b" },
    { name: en ? "Other" : "Otros", size: 4, fill: "#6b7280" }
  ];

  return (
    <div>
      <SH color={t.am} label={en ? "Economic Engine" : "Motor Económico"} title={en ? "Free Zones — AI Impact Analysis" : "Zonas Francas — Análisis de Impacto AI"} desc={en ? "626 companies, 15% of GDP, 265K jobs, $4.3B FDI. Each $1 in tax exemptions generates $2.90 in value. But AI threatens 28K BPO jobs." : "626 empresas, 15% del PIB, 265K empleos, $4.3B IED. Cada $1 en exenciones genera $2.90 en valor. Pero AI amenaza 28K empleos BPO."} />

      {/* Key stats */}
      <motion.div variants={stagger} initial="hidden" animate="visible">
        <Grid cols="repeat(auto-fit,minmax(145px,1fr))" gap={10} style={{ marginBottom: 20 }}>
          <Stat value={626} label={en ? "Companies" : "Empresas"} sub="PROCOMER 2024" color={t.cy} precision={0} />
          <Stat value={265000} label={en ? "Direct Jobs" : "Empleos Directos"} sub={en ? "15% of GDP" : "15% del PIB"} color={t.gn} precision={0} />
          <Stat value={4.3} label={en ? "FDI (B USD)" : "IED (B USD)"} sub="CINDE 2024" color={t.vi} prefix="$" />
          <Stat value={28000} label={en ? "BPO Jobs at Risk" : "Empleos BPO en Riesgo"} sub="WEF / IMF" color={t.rd} precision={0} />
          <Stat value={2.90} label={en ? "ROI per $1 exempt" : "ROI por $1 exento"} sub="PROCOMER" color={t.am} prefix="$" />
          <Stat value={99} label={en ? "Renewable Energy %" : "% Energía Renovable"} sub="ICE 2024" color={t.gn} precision={0} />
        </Grid>
      </motion.div>

      {/* WEF Displacement Alert */}
      <ScrollReveal>
        <Card accent={t.rd} style={{ marginBottom: 20, background: `${t.rd}06` }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ fontSize: 20, lineHeight: 1, marginTop: 2, flexShrink: 0 }}>⚠️</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: t.rd, marginBottom: 4 }}>
                {en ? "WEF: 41% of Employers Plan Workforce Reductions by 2030" : "WEF: 41% de Empleadores Planean Reducir Fuerza Laboral para 2030"}
              </div>
              <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7 }}>
                {en ? "Call centers (85/100 vulnerability), digital services (78/100), and back-office operations face highest AI displacement risk. CR's 28K BPO workers could form an 'AI Precariat' without transition programs." : "Call centers (85/100 vulnerabilidad), servicios digitales (78/100), y operaciones back-office enfrentan mayor riesgo de desplazamiento AI. Los 28K trabajadores BPO de CR podrían formar un 'Precariado AI' sin programas de transición."}
              </p>
              <Ci s="WEF Future of Jobs 2025, IMF AI and Jobs 2024, IVAS Algorithm (Colibrii)" />
            </div>
          </div>
        </Card>
      </ScrollReveal>

      {/* Sector Treemap */}
      <ScrollReveal>
        <Card style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.vi, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
            {en ? "FREE ZONE SECTOR BREAKDOWN" : "DISTRIBUCIÓN SECTORES ZF"}
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <Treemap data={treemapData} dataKey="size" nameKey="name" stroke={dark ? "#1e293b" : "#fff"} content={({ x, y, width, height, name, fill }) => (
              width > 40 && height > 30 ? (
                <g>
                  <rect x={x} y={y} width={width} height={height} fill={fill} rx={4} opacity={0.85} />
                  <text x={x + width / 2} y={y + height / 2} textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize={width > 80 ? 11 : 9} fontWeight={600}>{name}</text>
                </g>
              ) : <rect x={x} y={y} width={width} height={height} fill={fill} rx={4} opacity={0.85} />
            )} />
          </ResponsiveContainer>
        </Card>
      </ScrollReveal>

      {/* 3 Sector cards */}
      <Grid cols="repeat(auto-fit,minmax(260px,1fr))" gap={12} style={{ marginBottom: 20 }}>
        <Card accent={t.gn}>
          <Tag color={t.gn}>{en ? "LOW AI RISK" : "RIESGO AI BAJO"}</Tag>
          <div style={{ fontSize: 16, fontWeight: 700, marginTop: 8, marginBottom: 4 }}>{en ? "Medical Devices" : "Dispositivos Médicos"}</div>
          <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7 }}>{en ? "35% of FZ exports. Regulatory-intensive, tactile precision required. AI augments (quality control, regulatory compliance) rather than replaces. FDA approval creates moat." : "35% de exportaciones ZF. Regulación intensiva, precisión táctil requerida. AI aumenta (control calidad, cumplimiento regulatorio) en vez de reemplazar. Aprobación FDA crea foso."}</p>
          <Ci s="PROCOMER, CINDE, Abbott, Establishment Labs" />
        </Card>
        <Card accent={t.am}>
          <Tag color={t.am}>{en ? "TRANSITION" : "TRANSICIÓN"}</Tag>
          <div style={{ fontSize: 16, fontWeight: 700, marginTop: 8, marginBottom: 4 }}>{en ? "Digital Services" : "Servicios Digitales"}</div>
          <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7 }}>{en ? "28% of FZ output. 28K BPO workers face 78/100 vulnerability. But AI-augmented services (AI + human) could INCREASE value if CR upskills. Window: 2-4 years." : "28% de producción ZF. 28K trabajadores BPO con 78/100 vulnerabilidad. Pero servicios AI-aumentados (AI + humano) podrían INCREMENTAR valor si CR capacita. Ventana: 2-4 años."}</p>
          <Ci s="WEF, IMF, IVAS Algorithm" />
        </Card>
        <Card accent={t.pk}>
          <Tag color={t.pk}>{en ? "STRATEGIC" : "ESTRATÉGICO"}</Tag>
          <div style={{ fontSize: 16, fontWeight: 700, marginTop: 8, marginBottom: 4 }}>{en ? "Semiconductors" : "Semiconductores"}</div>
          <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7 }}>{en ? "Intel's $1.2B investment. Essential for AI hardware supply chain. CHIPS Act benefits. CR's entry into AI infrastructure layer. Very high AI alignment score." : "Inversión de Intel $1.2B. Esencial para cadena suministro hardware AI. Beneficios CHIPS Act. Entrada de CR a capa infraestructura AI. Score alineación AI muy alto."}</p>
          <Ci s="Intel, CINDE, CHIPS Act 2022" />
        </Card>
      </Grid>

      {/* Investment signals */}
      <Card>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.gn, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>{en ? "INVESTMENT SIGNALS" : "SEÑALES DE INVERSIÓN"}</div>
        {[
          { s: en ? "CINDE: 67 FDI projects in 2025 (19 new + 48 reinvestments)" : "CINDE: 67 proyectos IED en 2025 (19 nuevos + 48 reinversiones)", y: "2025", c: t.cy },
          { s: en ? "IBM 24/7 security center from CR (320+ staff, 130 countries)" : "Centro seguridad IBM 24/7 desde CR (320+ personas, 130 países)", y: "2024", c: t.vi },
          { s: en ? "3M Global Service Center: 1,400 employees, AI & automation hub" : "3M Centro Servicios Global: 1,400 empleados, hub AI y automatización", y: "2025", c: t.gn },
          { s: en ? "HPE: 40 patents developed in CR — global innovation hub" : "HPE: 40 patentes desarrolladas en CR — hub innovación global", y: "2025", c: t.pk },
          { s: en ? "Microsoft $1B LATAM AI investment (potential CR benefit)" : "Microsoft $1B inversión AI LATAM (beneficio potencial CR)", y: "2025", c: t.am },
          { s: en ? "Establishment Labs: AI-powered medical device quality control" : "Establishment Labs: control calidad dispositivos médicos con AI", y: "2025", c: t.gn }
        ].map((sig, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "8px 0", borderBottom: i < 5 ? `1px solid ${t.bd}` : "none" }}>
            <span style={{ fontSize: 13, color: t.tx, flex: 1 }}>{sig.s}</span>
            <Tag color={sig.c}>{sig.y}</Tag>
          </div>
        ))}
        <Ci s="CINDE 2025, PROCOMER, HPE, 3M, Company Reports" />
      </Card>

      {/* ── FDI Projections Chart ── */}
      <ScrollReveal>
        <Card style={{ marginTop: 20 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.cy, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
            {FZ_DEEP(en).projections.title}
          </div>
          <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.7, marginBottom: 12 }}>
            {FZ_DEEP(en).projections.narrative}
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={FZ_DEEP(en).projections.data} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#1e293b" : "#d1d5e0"} />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: dark ? "#94a3b8" : "#475569" }} />
              <YAxis tick={{ fontSize: 10, fill: dark ? "#94a3b8" : "#475569" }} tickFormatter={v => `$${v}B`} domain={[3.5, 7.5]} />
              <Tooltip contentStyle={{ background: dark ? "#111827" : "#fff", border: `1px solid ${dark ? "#1e293b" : "#d1d5e0"}`, borderRadius: 8, fontSize: 11 }} formatter={v => `$${v}B`} />
              <Area type="monotone" dataKey="fdi" name="FDI" stroke={t.cy} fill={t.cy} fillOpacity={0.15} strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
          <Ci s="CINDE, PROCOMER, Colibrii Labs Projections" />
        </Card>
      </ScrollReveal>

      {/* ── AI Impact on FZ Regime ── */}
      <ScrollReveal>
        <Card style={{ marginTop: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.vi, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
            {en ? "AI IMPACT ON FREE ZONE REGIME" : "IMPACTO AI EN REGIMEN ZONA FRANCA"}
          </div>
          {FZ_DEEP(en).aiImpact.map((item, i) => (
            <details key={i} style={{ marginBottom: 8, border: `1px solid ${t.bd}`, borderRadius: 8, padding: "10px 14px" }}>
              <summary style={{ cursor: "pointer", fontWeight: 700, fontSize: 14, color: t.tx, listStyle: "none", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: t.vi, fontSize: 16, fontWeight: 700 }}>+</span> {item.title}
              </summary>
              <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7, marginTop: 8, paddingLeft: 24 }}>{item.desc}</p>
            </details>
          ))}
        </Card>
      </ScrollReveal>

      {/* ── Labor Profile Changes ── */}
      <ScrollReveal>
        <Card style={{ marginTop: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.am, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
            {en ? "LABOR PROFILE — CURRENT vs 2030" : "PERFIL LABORAL — ACTUAL vs 2030"}
          </div>
          <Grid cols="1fr 1fr" gap={16}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: t.tx, marginBottom: 6, fontFamily: "'IBM Plex Mono',monospace" }}>
                {en ? "CURRENT (2024)" : "ACTUAL (2024)"}
              </div>
              {FZ_DEEP(en).laborProfile.current.map((item, i) => (
                <div key={i} style={{ fontSize: 12, color: t.tx2, lineHeight: 1.8, paddingLeft: 12, borderLeft: `2px solid ${t.cy}` }}>
                  {item}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: t.tx, marginBottom: 6, fontFamily: "'IBM Plex Mono',monospace" }}>
                {en ? "EXPECTED (2030)" : "ESPERADO (2030)"}
              </div>
              {FZ_DEEP(en).laborProfile.expected2030.map((item, i) => (
                <div key={i} style={{ fontSize: 12, color: item.includes("RISK") || item.includes("RIESGO") ? t.rd : t.gn, lineHeight: 1.8, paddingLeft: 12, borderLeft: `2px solid ${item.includes("RISK") || item.includes("RIESGO") ? t.rd : t.gn}` }}>
                  {item}
                </div>
              ))}
            </div>
          </Grid>
          <Ci s="WEF Future of Jobs 2025, CINDE, INA, Colibrii Labs Projections" />
        </Card>
      </ScrollReveal>

      {/* ── Competitiveness Comparison ── */}
      <ScrollReveal>
        <Card style={{ marginTop: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.pk, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
            {en ? "FZ COMPETITIVENESS — CR vs COMPETITORS" : "COMPETITIVIDAD ZF — CR vs COMPETIDORES"}
          </div>
          <details open style={{ marginBottom: 0 }}>
            <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: 13, color: t.tx2, marginBottom: 10 }}>
              {en ? "Expand comparison table" : "Expandir tabla comparativa"}
            </summary>
            <div className="scroll-hint">
              <span>{en ? "Swipe to see full table" : "Desliza para ver tabla completa"}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
            </div>
            <div className="table-scroll-wrapper">
              <table className="data-table data-table-fz">
                <thead>
                  <tr>
                    <th>{en ? "Country" : "País"}</th>
                    <th>{en ? "Cost" : "Costo"}</th>
                    <th>{en ? "Talent" : "Talento"}</th>
                    <th>Infra</th>
                    <th>{en ? "Stability" : "Estabilidad"}</th>
                    <th>{en ? "Green Energy" : "Energía Verde"}</th>
                    <th>{en ? "AI Ready" : "AI Listo"}</th>
                  </tr>
                </thead>
                <tbody>
                  {FZ_DEEP(en).competitiveness.map((row, i) => (
                    <tr key={i} style={i === 0 ? { background: `${t.cy}10` } : {}}>
                      <td style={{ whiteSpace: "nowrap", fontWeight: i === 0 ? 700 : 400, color: i === 0 ? t.cy : t.tx }}>
                        <Flag code={row.flag} size={16} style={{ marginRight: 4, verticalAlign: "middle" }} />{row.country}
                      </td>
                      <td style={{ whiteSpace: "nowrap" }}>{row.cost}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{row.talent}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{row.infra}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{row.stability}</td>
                      <td style={{ whiteSpace: "nowrap", fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>{row.energy}</td>
                      <td style={{ whiteSpace: "nowrap", fontWeight: 700, color: row.aiReady.includes("Low") || row.aiReady.includes("Bajo") ? t.rd : row.aiReady.includes("Med") || row.aiReady.includes("Medio") ? t.am : t.gn }}>{row.aiReady}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
          <Ci s="CINDE, fDi Markets, EF EPI, ICE, UNCTAD, Colibrii IVAS" />
        </Card>
      </ScrollReveal>

      {/* ── Risks & Opportunities ── */}
      <ScrollReveal>
        <Card style={{ marginTop: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.am, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
            {en ? "RISKS & OPPORTUNITIES" : "RIESGOS Y OPORTUNIDADES"}
          </div>
          <Grid cols="1fr 1fr" gap={16}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: t.rd, marginBottom: 8, fontFamily: "'IBM Plex Mono',monospace" }}>
                {en ? "RISKS" : "RIESGOS"}
              </div>
              {FZ_DEEP(en).risksAndOpps.risks.map((r, i) => (
                <div key={i} style={{ fontSize: 12, color: t.tx2, lineHeight: 1.8, padding: "6px 10px", marginBottom: 6, borderRadius: 6, background: `${t.rd}08`, borderLeft: `3px solid ${t.rd}` }}>
                  {r}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: t.gn, marginBottom: 8, fontFamily: "'IBM Plex Mono',monospace" }}>
                {en ? "OPPORTUNITIES" : "OPORTUNIDADES"}
              </div>
              {FZ_DEEP(en).risksAndOpps.opportunities.map((o, i) => (
                <div key={i} style={{ fontSize: 12, color: t.tx2, lineHeight: 1.8, padding: "6px 10px", marginBottom: 6, borderRadius: 6, background: `${t.gn}08`, borderLeft: `3px solid ${t.gn}` }}>
                  {o}
                </div>
              ))}
            </div>
          </Grid>
        </Card>
      </ScrollReveal>

      {/* ── Why Invest in CR ── */}
      <ScrollReveal>
        <Card style={{ marginTop: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.gn, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
            {en ? "WHY INVEST IN COSTA RICA" : "POR QUE INVERTIR EN COSTA RICA"}
          </div>
          <details open>
            <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: 13, color: t.tx2, marginBottom: 8 }}>
              {en ? "8 competitive advantages" : "8 ventajas competitivas"}
            </summary>
            {FZ_DEEP(en).whyInvest.map((item, i) => (
              <div key={i} style={{ padding: "8px 0", borderBottom: i < FZ_DEEP(en).whyInvest.length - 1 ? `1px solid ${t.bd}` : "none" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: t.gn, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 2 }}>{item.reason}</div>
                <span style={{ fontSize: 13, color: t.tx2, lineHeight: 1.6 }}>{item.desc}</span>
              </div>
            ))}
          </details>
          <Ci s="CINDE, OECD, Freedom House, EF EPI, fDi Markets, World Bank" />
        </Card>
      </ScrollReveal>

      {/* ── Government Preparation ── */}
      <ScrollReveal>
        <Card style={{ marginTop: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.vi, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
            {en ? "RECOMMENDED GOVERNMENT ACTIONS" : "ACCIONES GUBERNAMENTALES RECOMENDADAS"}
          </div>
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            {FZ_DEEP(en).govPreparation.map((step, i) => (
              <li key={i} style={{ fontSize: 13, color: t.tx2, lineHeight: 1.8, marginBottom: 6, paddingLeft: 4 }}>
                {step}
              </li>
            ))}
          </ol>
          <Ci s="Colibrii Labs Policy Recommendations 2025" />
        </Card>
      </ScrollReveal>

      {/* ── Challenges — Current vs Future ── */}
      <ScrollReveal>
        <Card style={{ marginTop: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.rd, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
            {en ? "KEY CHALLENGES" : "DESAFIOS CLAVE"}
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>{en ? "Current Situation" : "Situacion Actual"}</th>
                  <th>{en ? "Future Impact" : "Impacto Futuro"}</th>
                </tr>
              </thead>
              <tbody>
                {FZ_DEEP(en).challenges.map((ch, i) => (
                  <tr key={i}>
                    <td style={{ fontSize: 12, color: t.am }}>{ch.current}</td>
                    <td style={{ fontSize: 12, color: t.rd }}>{ch.future}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Ci s="INA, EU AI Act Timeline, McKinsey Global Institute" />
        </Card>
      </ScrollReveal>

      {/* ── Sources ── */}
      <ScrollReveal>
        <Card style={{ marginTop: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
            {en ? "PRIMARY SOURCES" : "FUENTES PRIMARIAS"}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {FZ_DEEP(en).sources.map((src, i) => (
              <Lnk key={i} href={src.url}>{src.name}</Lnk>
            ))}
          </div>
        </Card>
      </ScrollReveal>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PHYSICAL AI VIEW v13 — Humanoid economics, deployments, labor
   Enhanced with cost curve chart and robot shipments
   ═══════════════════════════════════════════════════════════════ */

export function PAI({ en, t, dark }) {
  /* Humanoid cost trajectory data */
  const costData = [
    { year: "2024", cost: 150000, crWage: 27000 },
    { year: "2025", cost: 80000, crWage: 27500 },
    { year: "2026", cost: 50000, crWage: 28000 },
    { year: "2027", cost: 30000, crWage: 28500 },
    { year: "2028", cost: 15000, crWage: 29000 },
    { year: "2029", cost: 10000, crWage: 29500 },
    { year: "2030", cost: 8000, crWage: 30000 }
  ];

  /* Global robot shipments (industrial) */
  const shipmentData = [
    { year: "2019", units: 373 },
    { year: "2020", units: 384 },
    { year: "2021", units: 517 },
    { year: "2022", units: 531 },
    { year: "2023", units: 541 },
    { year: "2024", units: 590 },
    { year: "2025E", units: 640 }
  ];

  return (
    <div>
      <SH color={t.pk} label="Physical AI" title={en ? "Humanoids, Robots & Labor" : "Humanoides, Robots y Trabajo"} desc={en ? "From software AI (LLMs, agents) to physical AI (robots that see, learn, manipulate). Humanoid costs dropping from $150K→$15K by 2028. CR labor crossover: 2028-2030." : "De AI software (LLMs, agentes) a AI física (robots que ven, aprenden, manipulan). Costos humanoides bajando de $150K→$15K para 2028. Cruce laboral CR: 2028-2030."} />

      {/* Key stats */}
      <Grid cols="repeat(auto-fit,minmax(160px,1fr))" gap={10} style={{ marginBottom: 20 }}>
        <Stat value={150} label={en ? "Humanoid Cost 2024" : "Costo Humanoide 2024"} sub="$K USD" color={t.rd} precision={0} prefix="$" />
        <Stat value={15} label={en ? "Target 2028" : "Meta 2028"} sub="$K USD (-90%)" color={t.gn} precision={0} prefix="$" />
        <Stat value={590} label={en ? "Robot Shipments 2024" : "Envíos Robots 2024"} sub={en ? "K units (IFR)" : "K unidades (IFR)"} color={t.vi} precision={0} />
      </Grid>

      {/* Humanoid cost curve */}
      <ScrollReveal>
        <Card style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.pk, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
            {en ? "HUMANOID COST vs CR ANNUAL WAGE" : "COSTO HUMANOIDE vs SALARIO ANUAL CR"}
          </div>
          <div style={{ fontSize: 10, color: t.tx3, marginBottom: 10 }}>
            {en ? "When lines cross = economic crossover point" : "Cuando las líneas se cruzan = punto de cruce económico"}
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={costData} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#1e293b" : "#d1d5e0"} />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: dark ? "#94a3b8" : "#475569" }} />
              <YAxis tick={{ fontSize: 10, fill: dark ? "#94a3b8" : "#475569" }} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ background: dark ? "#111827" : "#fff", border: `1px solid ${dark ? "#1e293b" : "#d1d5e0"}`, borderRadius: 8, fontSize: 11 }} formatter={v => `$${v.toLocaleString()}`} />
              <Area type="monotone" dataKey="cost" name={en ? "Humanoid Cost" : "Costo Humanoide"} stroke={t.pk} fill={t.pk} fillOpacity={0.1} strokeWidth={2.5} />
              <Area type="monotone" dataKey="crWage" name={en ? "CR Annual Wage" : "Salario Anual CR"} stroke={t.am} fill={t.am} fillOpacity={0.05} strokeWidth={2} strokeDasharray="4 2" />
            </AreaChart>
          </ResponsiveContainer>
          <Ci s="Goldman Sachs Humanoid Report 2024, BCCR Wage Data, Bank of America" />
        </Card>
      </ScrollReveal>

      {/* Robot shipments chart */}
      <ScrollReveal>
        <Card style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.vi, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
            {en ? "GLOBAL INDUSTRIAL ROBOT SHIPMENTS (K UNITS)" : "ENVÍOS GLOBALES ROBOTS INDUSTRIALES (K UNIDADES)"}
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={shipmentData} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#1e293b" : "#d1d5e0"} />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: dark ? "#94a3b8" : "#475569" }} />
              <YAxis tick={{ fontSize: 10, fill: dark ? "#94a3b8" : "#475569" }} domain={[300, 700]} />
              <Tooltip contentStyle={{ background: dark ? "#111827" : "#fff", border: `1px solid ${dark ? "#1e293b" : "#d1d5e0"}`, borderRadius: 8, fontSize: 11 }} />
              <Line type="monotone" dataKey="units" stroke={t.vi} strokeWidth={2.5} dot={{ fill: t.vi, r: 4 }} name={en ? "K units" : "K unidades"} />
            </LineChart>
          </ResponsiveContainer>
          <Ci s="IFR World Robotics 2024" />
        </Card>
      </ScrollReveal>

      {/* Real deployments */}
      <Card style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.am, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
          {en ? "REAL HUMANOID DEPLOYMENTS" : "DESPLIEGUES HUMANOIDES REALES"}
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table data-table-humanoid">
            <thead>
              <tr>
                <th>{en ? "Robot" : "Robot"}</th>
                <th>{en ? "Company" : "Empresa"}</th>
                <th>{en ? "Sector" : "Sector"}</th>
                <th>{en ? "Scale" : "Escala"}</th>
              </tr>
            </thead>
            <tbody>
              {[
                { r: "Optimus", co: "Tesla", s: en ? "Manuf." : "Manuf.", sc: en ? "12 at Fremont" : "12 en Fremont" },
                { r: "Figure 02", co: "Figure AI", s: en ? "Warehouse" : "Almacén", sc: "BMW" },
                { r: "Atlas", co: "Boston D.", s: en ? "Industrial" : "Industrial", sc: "Hyundai" },
                { r: "Digit", co: "Agility", s: en ? "Logistics" : "Logística", sc: "Amazon" },
                { r: "1X NEO", co: "1X Tech", s: en ? "Home" : "Hogar", sc: en ? "2026 pilot" : "Piloto 2026" },
                { r: "Phoenix", co: "Sanctuary", s: "Retail", sc: "Magna" },
              ].map((d, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, whiteSpace: "nowrap" }}>{d.r}</td>
                  <td style={{ color: t.tx2, whiteSpace: "nowrap" }}>{d.co}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{d.s}</td>
                  <td style={{ whiteSpace: "nowrap", color: t.vi, fontWeight: 600 }}>{d.sc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Ci s="Goldman Sachs, Bank of America, Company Reports 2024-2025" />
      </Card>

      {/* Labor transition scenarios */}
      <Card accent={t.or}>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.or, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
          {en ? "LABOR TRANSITION SCENARIOS (CR)" : "ESCENARIOS TRANSICIÓN LABORAL (CR)"}
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table data-table-labor">
            <thead>
              <tr>
                <th>{en ? "Sector" : "Sector"}</th>
                <th>IVAS</th>
                <th>{en ? "Risk" : "Riesgo"}</th>
                <th>{en ? "When" : "Cuándo"}</th>
                <th>{en ? "Transition" : "Transición"}</th>
              </tr>
            </thead>
            <tbody>
              {[
                { s: "Call centers", v: "85", j: "~12K", tl: "25-27", tr: en ? "AI-augmented agents" : "Agentes AI-aumentados" },
                { s: en ? "Digital svcs" : "Svcs digitales", v: "78", j: "~16K", tl: "25-28", tr: en ? "AI+human hybrid" : "Híbrido AI+humano" },
                { s: "Back office", v: "72", j: "~8K", tl: "26-29", tr: en ? "Automation supervisors" : "Supervisores autom." },
                { s: en ? "Electronics" : "Electrónica", v: "62", j: "~5K", tl: "27-30", tr: en ? "Robot-human collab" : "Colab. robot-humano" },
                { s: en ? "Med. devices" : "Disp. médicos", v: "45", j: "~3K", tl: "28-32", tr: en ? "AI quality/regulatory" : "AI calidad/regulat." }
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, whiteSpace: "nowrap" }}>{r.s}</td>
                  <td style={{ fontFamily: "'IBM Plex Mono',monospace", color: parseInt(r.v) >= 70 ? t.rd : parseInt(r.v) >= 50 ? t.am : t.gn, fontWeight: 700 }}>{r.v}</td>
                  <td style={{ color: t.rd, whiteSpace: "nowrap" }}>{r.j}</td>
                  <td style={{ fontFamily: "'IBM Plex Mono',monospace", whiteSpace: "nowrap" }}>{r.tl}</td>
                  <td style={{ color: t.tx2, whiteSpace: "nowrap" }}>{r.tr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Ci s="IVAS Algorithm (Colibrii), WEF Future of Jobs 2025, IMF" />
      </Card>

      {/* ── Striking Physical AI News ── */}
      <ScrollReveal>
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.pk, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 12 }}>
            {en ? "STRIKING NEWS — PHYSICAL AI" : "NOTICIAS IMPACTANTES — AI FISICA"}
          </div>
          <Grid cols="repeat(auto-fit,minmax(280px,1fr))" gap={12}>
            {PAI_NEWS(en).map((news, i) => (
              <Card key={i} style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 48, background: `linear-gradient(135deg, ${[t.pk, t.vi, t.cy, t.am, t.gn, t.rd, t.or, t.pk][i % 8]}22, transparent)`, borderRadius: "12px 12px 0 0" }} />
                <div style={{ position: "relative", paddingTop: 4 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 28 }}>{news.icon}</span>
                    <Tag color={[t.pk, t.vi, t.cy, t.am, t.gn, t.rd, t.or, t.pk][i % 8]}>{news.date}</Tag>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: t.tx, lineHeight: 1.4, marginBottom: 6 }}>
                    {news.headline}
                  </div>
                  <details>
                    <summary style={{ cursor: "pointer", fontSize: 11, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace" }}>
                      {en ? "Significance" : "Significancia"}
                    </summary>
                    <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.7, marginTop: 6 }}>{news.significance}</p>
                  </details>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, paddingTop: 8, borderTop: `1px solid ${t.bd}` }}>
                    <span style={{ fontSize: 11, color: t.tx3 }}>{news.source}</span>
                    <Lnk href={news.url}>{en ? "Source" : "Fuente"}</Lnk>
                  </div>
                </div>
              </Card>
            ))}
          </Grid>
        </div>
      </ScrollReveal>

      {/* ── Regional Context: Physical AI in LATAM/CR ── */}
      <ScrollReveal>
        <Card accent={t.am} style={{ marginTop: 20 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.am, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 8 }}>
            {en ? "REGIONAL CONTEXT — PHYSICAL AI IN LATAM/CR" : "CONTEXTO REGIONAL — AI FISICA EN LATAM/CR"}
          </div>
          <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.8, marginBottom: 10 }}>
            {en
              ? "Latin America accounts for less than 2% of global industrial robot installations (IFR 2025). Costa Rica's Free Zone manufacturing sector — particularly medical devices and electronics — faces a dual-edged reality: humanoid robots priced below $20K (Unitree G1) are already cheaper than the average FZ annual wage ($27K). By 2028, multi-shift humanoid operations (20-22 hrs/day) could deliver 3-4x the output of a human shift at lower total cost."
              : "America Latina representa menos del 2% de instalaciones globales de robots industriales (IFR 2025). El sector manufacturero de Zonas Francas de Costa Rica — particularmente dispositivos medicos y electronica — enfrenta una realidad de doble filo: robots humanoides con precio menor a $20K (Unitree G1) ya son mas baratos que el salario promedio anual ZF ($27K). Para 2028, operaciones humanoides multi-turno (20-22 hrs/dia) podrian entregar 3-4x la produccion de un turno humano a menor costo total."}
          </p>
          <Grid cols="1fr 1fr 1fr" gap={10} style={{ marginBottom: 10 }}>
            <MiniStat label={en ? "LATAM robot share" : "Cuota robots LATAM"} value="<2%" color={t.rd} />
            <MiniStat label={en ? "CR FZ avg wage/yr" : "Salario prom ZF CR/ano"} value="$27K" color={t.am} />
            <MiniStat label={en ? "Humanoid crossover" : "Cruce humanoide"} value="2028" color={t.pk} mono />
          </Grid>
          <p style={{ fontSize: 12, color: t.tx3, lineHeight: 1.7, fontStyle: "italic" }}>
            {en
              ? "However, CR's advantage lies in regulatory stability, bilingual talent, and the potential to position FZ workers as robot supervisors and AI-augmented operators rather than direct competitors. The window for proactive transition: 2025-2028."
              : "Sin embargo, la ventaja de CR reside en estabilidad regulatoria, talento bilingue, y el potencial de posicionar trabajadores ZF como supervisores de robots y operadores aumentados con AI en lugar de competidores directos. La ventana para transicion proactiva: 2025-2028."}
          </p>
          <Ci s="IFR 2025, Goldman Sachs, Bank of America, CINDE, Colibrii Labs" />
        </Card>
      </ScrollReveal>
    </div>
  );
}
