"use client";
import { motion } from "framer-motion";
import { Card, SH, Tag, Ci, Lnk, Grid, ScrollReveal, MiniStat } from "./ui";
import { PYMES_DEEP } from "./data";

/* ═══════════════════════════════════════════════════════════════
   PYMES & AI VIEW — Risks, opportunities, support programs
   SME intelligence for Costa Rica's 97% SME economy
   ═══════════════════════════════════════════════════════════════ */

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
          <Ci s="MEIC, PROCOMER, INA, CAMTIC, IDB" />
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
          <Ci s="Colibrii Labs Policy Recommendations 2025, Singapore SME Go Digital, OECD SME Policy Index" />
        </Card>
      </ScrollReveal>

      {/* ── Key Metrics Summary ── */}
      <ScrollReveal>
        <Card accent={t.or} style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.or, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
            {en ? "SME AI READINESS SNAPSHOT" : "ESTADO DE PREPARACION AI PYMES"}
          </div>
          <Grid cols="1fr 1fr 1fr" gap={10} style={{ marginBottom: 10 }}>
            <MiniStat label={en ? "AI adoption rate" : "Tasa adopción AI"} value="12%" color={t.rd} />
            <MiniStat label={en ? "No digital strategy" : "Sin estrategia digital"} value="72%" color={t.or} />
            <MiniStat label={en ? "SME GDP share" : "PYMES % PIB"} value="33%" color={t.gn} />
          </Grid>
          <p style={{ fontSize: 12, color: t.tx3, lineHeight: 1.7, fontStyle: "italic" }}>
            {en
              ? "Costa Rica's SME sector faces a critical AI adoption gap. With 72% lacking any digital strategy and only 12% using AI tools, the window for proactive transition is 2025-2028 before larger AI-powered competitors permanently capture market share."
              : "El sector PYME de Costa Rica enfrenta una brecha critica de adopcion AI. Con 72% sin estrategia digital y solo 12% usando herramientas AI, la ventana para transicion proactiva es 2025-2028 antes de que competidores mas grandes potenciados con AI capturen permanentemente cuota de mercado."}
          </p>
          <Ci s="CAMTIC, IDB/Deloitte, MEIC, Colibrii Labs Analysis" />
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
