"use client";
import { motion } from "framer-motion";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line, Treemap } from "recharts";
import { Card, SH, Tag, Ci, Lnk, Grid, AN, ScrollReveal, Stat, MiniStat, fadeUp, stagger } from "./ui";

/* ═══════════════════════════════════════════════════════════════
   FREE ZONES VIEW v13 — Sectors, employment, investment signals
   Enhanced with Treemap visualization
   ═══════════════════════════════════════════════════════════════ */

export function ZF({ en, t, dark }) {
  /* Sector treemap data */
  const treemapData = [
    { name: en ? "Medical Devices" : "Dispositivos Médicos", size: 35, fill: "#10b981" },
    { name: en ? "Digital Services" : "Servicios Digitales", size: 28, fill: "#0ea5e9" },
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
            <span style={{ fontSize: 20 }}>⚠️</span>
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
            <Treemap data={treemapData} dataKey="size" nameKey="name" stroke={dark ? "#1e1e2d" : "#fff"} content={({ x, y, width, height, name, fill }) => (
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
          { s: en ? "Intel $1.2B back-end semiconductor expansion" : "Intel $1.2B expansión semiconductores back-end", y: "2024", c: t.cy },
          { s: en ? "IBM 24/7 security center from CR (320+ staff, 130 countries)" : "Centro seguridad IBM 24/7 desde CR (320+ personas, 130 países)", y: "2024", c: t.vi },
          { s: en ? "Establishment Labs: AI-powered breast implant quality control" : "Establishment Labs: control calidad implantes con AI", y: "2025", c: t.gn },
          { s: en ? "Microsoft $1B LATAM AI investment (potential CR benefit)" : "Microsoft $1B inversión AI LATAM (beneficio potencial CR)", y: "2025", c: t.pk },
          { s: en ? "Amazon AWS CR data center expansion" : "Amazon AWS expansión data center CR", y: "2024-25", c: t.am }
        ].map((sig, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < 4 ? `1px solid ${t.bd}` : "none" }}>
            <span style={{ fontSize: 13, color: t.tx }}>{sig.s}</span>
            <Tag color={sig.c}>{sig.y}</Tag>
          </div>
        ))}
        <Ci s="CINDE, PROCOMER, Company Reports" />
      </Card>
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
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#1e1e2d" : "#e2e4ea"} />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: dark ? "#9a9aad" : "#4a4a6a" }} />
              <YAxis tick={{ fontSize: 10, fill: dark ? "#9a9aad" : "#4a4a6a" }} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ background: dark ? "#0a0a0f" : "#fff", border: `1px solid ${dark ? "#1e1e2d" : "#e2e4ea"}`, borderRadius: 8, fontSize: 11 }} formatter={v => `$${v.toLocaleString()}`} />
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
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#1e1e2d" : "#e2e4ea"} />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: dark ? "#9a9aad" : "#4a4a6a" }} />
              <YAxis tick={{ fontSize: 10, fill: dark ? "#9a9aad" : "#4a4a6a" }} domain={[300, 700]} />
              <Tooltip contentStyle={{ background: dark ? "#0a0a0f" : "#fff", border: `1px solid ${dark ? "#1e1e2d" : "#e2e4ea"}`, borderRadius: 8, fontSize: 11 }} />
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
          <table className="data-table">
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
                { r: "Optimus", co: "Tesla", s: en ? "Manufacturing" : "Manufactura", sc: en ? "12 at Fremont" : "12 en Fremont" },
                { r: "Figure 02", co: "Figure AI", s: en ? "Warehouse" : "Almacén", sc: "BMW" },
                { r: "Atlas", co: "Boston Dynamics", s: en ? "Industrial" : "Industrial", sc: "Hyundai" },
                { r: "Digit", co: "Agility", s: en ? "Logistics" : "Logística", sc: "Amazon" },
                { r: "1X NEO", co: "1X Technologies", s: en ? "Home/Office" : "Hogar/Oficina", sc: en ? "2026 pilot" : "Piloto 2026" },
                { r: "Phoenix", co: "Sanctuary AI", s: en ? "Retail" : "Retail", sc: "Magna" },
              ].map((d, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{d.r}</td>
                  <td style={{ color: t.tx2 }}>{d.co}</td>
                  <td>{d.s}</td>
                  <td><Tag color={t.vi}>{d.sc}</Tag></td>
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
          <table className="data-table">
            <thead>
              <tr>
                <th>{en ? "Sector" : "Sector"}</th>
                <th>IVAS</th>
                <th>{en ? "Jobs at Risk" : "Empleos en Riesgo"}</th>
                <th>{en ? "Timeline" : "Horizonte"}</th>
                <th>{en ? "Transition" : "Transición"}</th>
              </tr>
            </thead>
            <tbody>
              {[
                { s: "Call centers", v: "85/100", j: "~12K", tl: "2025-27", tr: en ? "AI-augmented agents, QA roles" : "Agentes AI-aumentados, roles QA" },
                { s: en ? "Digital services" : "Servicios digitales", v: "78/100", j: "~16K", tl: "2025-28", tr: en ? "AI + human hybrid services" : "Servicios híbridos AI + humano" },
                { s: en ? "Back office" : "Back office", v: "72/100", j: "~8K", tl: "2026-29", tr: en ? "Process automation supervisors" : "Supervisores automatización procesos" },
                { s: en ? "Electronics" : "Electrónica", v: "62/100", j: "~5K", tl: "2027-30", tr: en ? "Robot-human collaboration" : "Colaboración robot-humano" },
                { s: en ? "Medical devices" : "Disp. médicos", v: "45/100", j: "~3K", tl: "2028-32", tr: en ? "AI quality, regulatory AI" : "AI calidad, AI regulatorio" }
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{r.s}</td>
                  <td style={{ fontFamily: "'IBM Plex Mono',monospace", color: parseInt(r.v) >= 70 ? t.rd : parseInt(r.v) >= 50 ? t.am : t.gn, fontWeight: 700 }}>{r.v}</td>
                  <td style={{ color: t.rd }}>{r.j}</td>
                  <td style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12 }}>{r.tl}</td>
                  <td style={{ fontSize: 12, color: t.tx2 }}>{r.tr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Ci s="IVAS Algorithm (Colibrii), WEF Future of Jobs 2025, IMF" />
      </Card>
    </div>
  );
}
