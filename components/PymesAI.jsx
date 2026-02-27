"use client";
import { motion } from "framer-motion";
import { Card, SH, Tag, Ci, Lnk, Grid, ScrollReveal, MiniStat } from "./ui";
import { PYMES_DEEP } from "./data";

/* ═══════════════════════════════════════════════════════════════
   PYMES & AI VIEW — Risks, opportunities, support programs
   SME intelligence for Costa Rica's 97% SME economy
   ═══════════════════════════════════════════════════════════════ */

const Src = ({ label, url, t }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" style={{
    fontSize: 9, padding: "2px 6px", borderRadius: 4, background: `${t.cy}10`,
    color: t.cy, fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600,
    textDecoration: "none", marginLeft: 4, whiteSpace: "nowrap"
  }}>{label} {"\u2197"}</a>
);

export function Pymes({ en, t, dark }) {
  const data = PYMES_DEEP(en);

  return (
    <div>
      {/* ── Section Header ── */}
      <SH
        color={t.or}
        label={en ? "SME Intelligence" : "Inteligencia PYMES"}
        title={en ? "PYMES & AI — Risks and Opportunities" : "PYMES y AI — Riesgos y Oportunidades"}
        desc={en
          ? "97% of Costa Rica's businesses are SMEs. AI is both their biggest threat and greatest opportunity."
          : "97% de los negocios de Costa Rica son PYMES. AI es tanto su mayor amenaza como su mayor oportunidad."}
      />

      {/* ── Key Stats Grid ── */}
      <ScrollReveal>
        <Grid cols="repeat(auto-fit,minmax(145px,1fr))" gap={10} style={{ marginBottom: 28 }}>
          {data.landscape.stats.map((stat, i) => (
            <Card key={i} accent={i % 2 === 0 ? t.or : t.vi} style={{ textAlign: "center", padding: "14px 10px" }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: i % 2 === 0 ? t.or : t.vi, lineHeight: 1.2 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 12, color: t.tx2, marginTop: 4, lineHeight: 1.4 }}>
                {stat.label}
              </div>
              <div style={{ fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", marginTop: 4 }}>
                {stat.source}
                {stat.source === "MEIC 2024" && <Src label="MEIC 2024" url="https://www.meic.go.cr/" t={t} />}
              </div>
            </Card>
          ))}
        </Grid>
      </ScrollReveal>

      {/* ── Risks Section ── */}
      <ScrollReveal>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.rd, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 12 }}>
            {en ? "RISKS FOR COSTA RICAN SMES" : "RIESGOS PARA PYMES COSTARRICENSES"}
          </div>
          {data.risks.map((r, i) => (
            <Card key={i} accent={r.color} style={{ marginBottom: 12, background: `${r.color}06` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: t.tx, flex: 1 }}>
                  {r.title}
                </div>
                <Tag color={r.color}>{r.severity}</Tag>
              </div>
              <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7, margin: 0 }}>
                {r.desc}
                {i === 0 && <Src label="OIT 2024" url="https://www.ilo.org/publications" t={t} />}
              </p>
            </Card>
          ))}
        </div>
      </ScrollReveal>

      {/* ── Opportunities Section ── */}
      <ScrollReveal>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.gn, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 12 }}>
            {en ? "OPPORTUNITIES FOR COSTA RICAN SMES" : "OPORTUNIDADES PARA PYMES COSTARRICENSES"}
          </div>
          <Grid cols="repeat(auto-fit,minmax(260px,1fr))" gap={12}>
            {data.opportunities.map((o, i) => (
              <Card key={i} accent={o.color}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <Tag color={o.color}>{o.impact}</Tag>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: t.tx, marginBottom: 4 }}>
                  {o.title}
                </div>
                <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7, margin: 0 }}>
                  {o.desc}
                </p>
              </Card>
            ))}
          </Grid>
        </div>
      </ScrollReveal>

      {/* ── Support Programs ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.cy, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 12 }}>
            {en ? "SUPPORT PROGRAMS & INSTITUTIONS" : "PROGRAMAS DE APOYO E INSTITUCIONES"}
          </div>
          {(data.programs.items || data.programs).map((prog, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < (data.programs.items || data.programs).length - 1 ? `1px solid ${t.bd}` : "none" }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: t.cy }}>
                  {prog.name}
                </span>
                <span style={{ fontSize: 13, color: t.tx2, marginLeft: 10 }}>
                  {prog.desc}
                </span>
              </div>
              <Lnk href={prog.url}>{en ? "Visit" : "Visitar"}</Lnk>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
            <Ci s="MEIC, PROCOMER, INA, CAMTIC, IDB" />
            <Src label="MEIC 2024" url="https://www.meic.go.cr/" t={t} />
          </div>
        </Card>
      </ScrollReveal>

      {/* ── National AI Strategy (ENIA) ── */}
      <ScrollReveal>
        <Card accent={t.pk} style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.pk, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 12 }}>
            {en ? "NATIONAL AI STRATEGY (ENIA 2024-2027)" : "ESTRATEGIA NACIONAL DE AI (ENIA 2024-2027)"}
          </div>
          <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7, marginBottom: 12 }}>
            {en
              ? "Costa Rica became the first country in Central America and the Caribbean to publish a National AI Strategy (ENIA), led by MICITT. The strategy includes reskilling programs, digital infrastructure, and the creation of an AI Center of Excellence."
              : "Costa Rica se convirtió en el primer país de Centroamérica y el Caribe en publicar una Estrategia Nacional de AI (ENIA), liderada por MICITT. La estrategia incluye programas de recapacitación, infraestructura digital y la creación de un Centro de Excelencia en AI."}
          </p>
          <Grid cols="repeat(auto-fit,minmax(200px,1fr))" gap={10} style={{ marginBottom: 12 }}>
            {[
              { icon: "🎓", t: en ? "Reskilling & Upskilling" : "Recapacitación", d: en ? "Workforce training programs for digital economy adaptation" : "Programas de capacitación laboral para adaptación a la economía digital" },
              { icon: "📡", t: en ? "Digital Infrastructure" : "Infraestructura Digital", d: en ? "5G networks and enabling technologies across all sectors" : "Redes 5G y tecnologías habilitantes en todos los sectores" },
              { icon: "🏛️", t: en ? "AI Center of Excellence" : "Centro de Excelencia AI", d: en ? "National hub for AI research, training, and SME support" : "Hub nacional para investigación, capacitación y apoyo a PYMES en AI" },
              { icon: "🌐", t: en ? "8,710 Businesses Digitized" : "8,710 Negocios Digitalizados", d: en ? "Government AI-powered initiative for free business websites" : "Iniciativa gubernamental con AI para sitios web gratuitos" },
            ].map((item, i) => (
              <Card key={i} d={0.02} style={{ padding: "12px 14px" }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.tx, marginBottom: 2 }}>{item.t}</div>
                <div style={{ fontSize: 11, color: t.tx2, lineHeight: 1.5 }}>{item.d}</div>
              </Card>
            ))}
          </Grid>
          <Ci s="MICITT ENIA 2024-2027, CEPAL ILIA 2025" />
        </Card>
      </ScrollReveal>

      {/* ── AI Use Cases for PYMES ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.am, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 12 }}>
            {en ? "HOW CR PYMES USE AI TODAY" : "CÓMO USAN AI LAS PYMES CR HOY"}
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>{en ? "Use Case" : "Caso de Uso"}</th>
                  <th>{en ? "Adoption" : "Adopción"}</th>
                  <th>{en ? "Tools" : "Herramientas"}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { use: en ? "Customer service chatbots" : "Chatbots servicio al cliente", pct: "62%", tools: "WhatsApp Business, Tidio, ChatGPT" },
                  { use: en ? "Product/solution creation" : "Creación productos/soluciones", pct: "59%", tools: "ChatGPT, Canva AI, Midjourney" },
                  { use: en ? "Employee training" : "Capacitación empleados", pct: "50%", tools: "Internal AI programs" },
                  { use: en ? "Accounting & invoicing" : "Contabilidad y facturación", pct: "~40%", tools: "Alegra.com, QuickBooks AI, Xero" },
                  { use: en ? "Marketing content" : "Contenido marketing", pct: "~35%", tools: "Canva AI, ChatGPT, Meta AI" },
                ].map((r, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{r.use}</td>
                    <td style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 700, color: parseInt(r.pct) >= 50 ? t.gn : t.am }}>{r.pct}</td>
                    <td style={{ fontSize: 11, color: t.tx2 }}>{r.tools}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Ci s="Microsoft/Ipsos SME AI Survey 2025, Alegra.com, Colibrii Labs" />
        </Card>
      </ScrollReveal>

      {/* ── Policy Recommendations ── */}
      <ScrollReveal>
        <Card accent={t.vi} style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.vi, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 12 }}>
            {en ? "POLICY RECOMMENDATIONS" : "RECOMENDACIONES DE POLITICA"}
          </div>
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            {data.recommendations.map((rec, i) => (
              <li key={i} style={{ fontSize: 13, color: t.tx2, lineHeight: 1.8, marginBottom: 6, paddingLeft: 4 }}>
                {rec}
              </li>
            ))}
          </ol>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
            <Ci s="Colibrii Labs Policy Recommendations 2025, Singapore SME Go Digital, OECD SME Policy Index" />
            <Src label="WEF 2025" url="https://www.weforum.org/publications/the-future-of-jobs-report-2025/" t={t} />
          </div>
        </Card>
      </ScrollReveal>

      {/* ── Key Metrics Summary ── */}
      <ScrollReveal>
        <Card accent={t.or} style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.or, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
            {en ? "SME AI READINESS SNAPSHOT" : "ESTADO DE PREPARACION AI PYMES"}
          </div>
          <Grid cols="1fr 1fr 1fr" gap={10} style={{ marginBottom: 10 }}>
            <MiniStat label={en ? "Use some AI" : "Usan algún AI"} value="50%" color={t.gn} />
            <MiniStat label={en ? "Plan AI investment" : "Planean invertir AI"} value="69%" color={t.cy} />
            <MiniStat label={en ? "PYME growth YoY" : "Crecimiento anual"} value="+40%" color={t.vi} />
          </Grid>
          <p style={{ fontSize: 12, color: t.tx3, lineHeight: 1.7, fontStyle: "italic" }}>
            {en
              ? "50% of Costa Rican PYMES already use some form of AI (Microsoft 2025), and 69% plan continued AI investment. However, adoption remains shallow — mainly customer service chatbots and basic automation. The window for deep integration (2025-2028) will separate competitive PYMES from those displaced by AI-powered competitors."
              : "50% de las PYMES costarricenses ya usan alguna forma de AI (Microsoft 2025), y 69% planean seguir invirtiendo en AI. Sin embargo, la adopción sigue siendo superficial — principalmente chatbots de servicio al cliente y automatización básica. La ventana para integración profunda (2025-2028) separará las PYMES competitivas de aquellas desplazadas por competidores potenciados con AI."}
          </p>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
            <Ci s="Microsoft/Ipsos 2025, MEIC, INEC, Colibrii Labs Analysis" />
          </div>
        </Card>
      </ScrollReveal>

      {/* ── Sources ── */}
      <ScrollReveal>
        <Card style={{ marginTop: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
            {en ? "PRIMARY SOURCES" : "FUENTES PRIMARIAS"}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {data.sources.map((src, i) => (
              <Lnk key={i} href={src.url}>{src.name}</Lnk>
            ))}
          </div>
        </Card>
      </ScrollReveal>
    </div>
  );
}
