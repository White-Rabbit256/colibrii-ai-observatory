"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { CO, DM, TIMELINE, PARTNERS, WEF_2026_RISKS, EOS_RISKS, INDICATOR_META, VIP_QUOTES, NEWS_CATEGORIES } from "./data";
import { Card, SH, Stat, Tag, Ci, Lnk, Grid, AN, ScrollReveal, PartnerBar, MiniStat, fadeUp, stagger } from "./ui";

/* ═══════════════════════════════════════════════════════════════
   HOME VIEW v13 — Hero + Stats + Timeline + Radar + News
   ═══════════════════════════════════════════════════════════════ */

const WEF_HORIZONS = [
  { id: "imm", label: { en: "2026 Immediate", es: "2026 Inmediato" }, sub: { en: "2-year crisis likelihood", es: "Probabilidad crisis 2 años" } },
  { id: "short", label: { en: "2028 Short-term", es: "2028 Corto plazo" }, sub: { en: "Severity ranking by 2028", es: "Ranking severidad para 2028" } },
  { id: "long", label: { en: "2036 Long-term", es: "2036 Largo plazo" }, sub: { en: "Severity ranking by 2036", es: "Ranking severidad para 2036" } }
];

function WefDashboard({ en, t, dark }) {
  const [hz, setHz] = useState("imm");
  const kf = WEF_2026_RISKS.keyFindings;
  const catLabel = { geo: en ? "Geopolitical" : "Geopolítico", tech: en ? "Technological" : "Tecnológico", env: en ? "Environmental" : "Ambiental", social: en ? "Societal" : "Social" };

  return (
    <ScrollReveal delay={100}>
      <Card accent={t.rd} style={{ marginBottom: 28, background: `${t.rd}04` }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6, flexWrap: "wrap", gap: 8 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.rd, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
              WEF GLOBAL RISKS 2026
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Fraunces',serif" }}>
              {en ? "Risk Landscape — 3 Time Horizons" : "Panorama de Riesgos — 3 Horizontes"}
            </div>
          </div>
          <a href="https://www.weforum.org/publications/global-risks-report-2026/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, padding: "5px 12px", border: `1px solid ${t.rd}33`, borderRadius: 6, color: t.rd, fontWeight: 600, fontFamily: "'IBM Plex Mono',monospace", textDecoration: "none" }}>
            {en ? "Full Report ↗" : "Reporte Completo ↗"}
          </a>
        </div>

        {/* Horizon Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 16, overflowX: "auto", paddingBottom: 2 }}>
          {WEF_HORIZONS.map(h => (
            <button key={h.id} onClick={() => setHz(h.id)} style={{
              padding: "7px 14px", border: `1px solid ${hz === h.id ? t.rd : t.bd}`,
              borderRadius: 8, fontSize: 12, fontWeight: hz === h.id ? 700 : 400,
              background: hz === h.id ? `${t.rd}12` : "transparent",
              color: hz === h.id ? t.rd : t.tx2, fontFamily: "'IBM Plex Mono',monospace",
              whiteSpace: "nowrap", transition: "all .2s ease"
            }}>
              {en ? h.label.en : h.label.es}
            </button>
          ))}
        </div>

        {/* Subtitle for active tab */}
        <div style={{ fontSize: 11, color: t.tx3, marginBottom: 10, fontFamily: "'IBM Plex Mono',monospace" }}>
          {WEF_HORIZONS.find(h => h.id === hz)?.[en ? "sub" : "sub"]?.[en ? "en" : "es"] || ""}
        </div>

        {/* ── Immediate 2026 ── */}
        <AnimatePresence mode="wait">
          {hz === "imm" && (
            <motion.div key="imm" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              {WEF_2026_RISKS.immediate.slice(0, 10).map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{ width: 18, fontSize: 11, fontWeight: 700, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", textAlign: "center" }}>{i + 1}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                      <span style={{ fontSize: 12, color: t.tx, fontWeight: r.risk.includes("AI") ? 700 : 400 }}>
                        {r.risk}{r.risk.includes("AI") ? " ⚡" : ""}
                      </span>
                      <span style={{ fontSize: 11, fontFamily: "'IBM Plex Mono',monospace", color: r.c, fontWeight: 700 }}>{r.pct}%</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 2, background: `${r.c}15` }}>
                      <div style={{ height: "100%", borderRadius: 2, background: r.c, width: `${(r.pct / 18) * 100}%`, transition: "width 1s ease" }} />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* ── Short-term 2028 ── */}
          {hz === "short" && (
            <motion.div key="short" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              {WEF_2026_RISKS.shortTerm2028.map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
                  <span style={{ width: 18, fontSize: 11, fontWeight: 700, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", textAlign: "center" }}>{r.rank}</span>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: r.c, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 12, color: t.tx, fontWeight: r.risk.includes("AI") || r.risk.includes("Cyber") ? 700 : 400 }}>
                    {r.risk}{r.risk.includes("AI") ? " ⚡" : ""}
                  </span>
                  <span style={{ fontSize: 10, fontFamily: "'IBM Plex Mono',monospace", color: r.delta.startsWith("+") ? t.rd : r.delta.startsWith("-") ? t.gn : t.tx3, fontWeight: 600 }}>
                    {r.delta !== "—" ? r.delta : ""}
                  </span>
                  <span style={{ fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", minWidth: 58, textAlign: "right" }}>{catLabel[r.cat]}</span>
                </div>
              ))}
              <div style={{ fontSize: 10, color: t.tx3, marginTop: 8, fontFamily: "'IBM Plex Mono',monospace" }}>
                {en ? "Delta: change in rank vs. 2026 immediate" : "Delta: cambio en posición vs. 2026 inmediato"}
              </div>
            </motion.div>
          )}

          {/* ── Long-term 2036 ── */}
          {hz === "long" && (
            <motion.div key="long" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              {WEF_2026_RISKS.longTerm2036.map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
                  <span style={{ width: 18, fontSize: 11, fontWeight: 700, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", textAlign: "center" }}>{r.rank}</span>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: r.c, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 12, color: t.tx, fontWeight: r.risk.includes("AI") ? 700 : 400 }}>
                    {r.risk}{r.risk.includes("AI") ? " ⚡ FASTEST RISING" : ""}
                  </span>
                  <span style={{ fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", minWidth: 58, textAlign: "right" }}>{catLabel[r.cat]}</span>
                </div>
              ))}
              <div style={{ marginTop: 10, padding: "8px 12px", background: `${t.vi}08`, borderRadius: 8, border: `1px solid ${t.vi}20` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: t.vi, marginBottom: 2 }}>{en ? "AI adverse outcomes: #30 → #5" : "Resultados adversos AI: #30 → #5"}</div>
                <div style={{ fontSize: 11, color: t.tx2 }}>{en ? "Fastest-rising risk in WEF survey history — jumped 25 positions" : "Riesgo de mayor ascenso en historia WEF — subió 25 posiciones"}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Key Insights Row ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 8, marginTop: 16, padding: 12, background: `${t.rd}06`, borderRadius: 10, border: `1px solid ${t.rd}15` }}>
          <div>
            <div style={{ fontSize: 10, color: t.rd, fontFamily: "'IBM Plex Mono',monospace", letterSpacing: 1 }}>{en ? "FASTEST RISING" : "MAYOR ASCENSO"}</div>
            <div style={{ fontSize: 13, fontWeight: 700, marginTop: 2 }}>{en ? "AI adverse outcomes" : "Resultados adversos AI"}</div>
            <div style={{ fontSize: 11, color: t.tx2 }}>{kf.aiJump} {en ? "long-term" : "largo plazo"}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: t.vi, fontFamily: "'IBM Plex Mono',monospace", letterSpacing: 1 }}>{en ? "ALL HORIZONS" : "TODOS HORIZONTES"}</div>
            <div style={{ fontSize: 13, fontWeight: 700, marginTop: 2 }}>{en ? "Misinfo/Disinfo" : "Desinfo/Misinfo"}</div>
            <div style={{ fontSize: 11, color: t.tx2 }}>{en ? "Top 5 across ALL timeframes" : "Top 5 en TODOS los marcos"}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: t.am, fontFamily: "'IBM Plex Mono',monospace", letterSpacing: 1 }}>{en ? "EXPERT OUTLOOK" : "PERSPECTIVA EXPERTOS"}</div>
            <div style={{ fontSize: 13, fontWeight: 700, marginTop: 2 }}>{kf.outlook}</div>
            <div style={{ fontSize: 11, color: t.tx2 }}>{en ? "'Turbulent' or 'stormy'" : "'Turbulenta' o 'tormentosa'"}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: t.cy, fontFamily: "'IBM Plex Mono',monospace", letterSpacing: 1 }}>{en ? "AI MARKET" : "MERCADO AI"}</div>
            <div style={{ fontSize: 13, fontWeight: 700, marginTop: 2 }}>${kf.aiMarket2024}B → ${kf.aiMarket2033}B</div>
            <div style={{ fontSize: 11, color: t.tx2 }}>2024 → 2033</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: t.pk, fontFamily: "'IBM Plex Mono',monospace", letterSpacing: 1 }}>{en ? "SEVERITY GAP" : "BRECHA SEVERIDAD"}</div>
            <div style={{ fontSize: 13, fontWeight: 700, marginTop: 2 }}>{kf.severityScores.aiAdverse.twoYr} → {kf.severityScores.aiAdverse.tenYr}</div>
            <div style={{ fontSize: 11, color: t.tx2 }}>{en ? "AI: 2yr vs 10yr (largest)" : "AI: 2 vs 10 años (mayor)"}</div>
          </div>
        </div>

        {/* ── AI Economy Strip ── */}
        <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 4, background: `${t.vi}10`, color: t.vi, fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>
            {kf.companiesTransform}% {en ? "companies transforming" : "empresas transformando"}
          </span>
          <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 4, background: `${t.gn}10`, color: t.gn, fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>
            +{kf.jobsNet}M {en ? "net jobs by 2030" : "empleos netos para 2030"}
          </span>
          <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 4, background: `${t.am}10`, color: t.am, fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>
            {kf.entryLevelRisk}% {en ? "entry-level at risk" : "entry-level en riesgo"}
          </span>
          <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 4, background: `${t.rd}10`, color: t.rd, fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>
            {kf.aiEnergy} GWh {en ? "AI energy 2026" : "energía AI 2026"}
          </span>
        </div>

        {/* ── Expert Outlook Distribution ── */}
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 10, letterSpacing: 1, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 8 }}>
            {en ? "EXPERT OUTLOOK DISTRIBUTION" : "DISTRIBUCIÓN PERSPECTIVA EXPERTOS"}
          </div>
          {[
            { label: en ? "2-year" : "2 años", data: kf.outlookShortTerm },
            { label: en ? "10-year" : "10 años", data: kf.outlookLongTerm }
          ].map((row, ri) => (
            <div key={ri} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", minWidth: 44 }}>{row.label}</span>
              <div style={{ flex: 1, display: "flex", height: 14, borderRadius: 7, overflow: "hidden" }}>
                {[
                  { pct: row.data.calm, color: t.gn },
                  { pct: row.data.stable, color: t.cy },
                  { pct: row.data.unsettled, color: t.am },
                  { pct: row.data.turbulent, color: t.or || "#f97316" },
                  { pct: row.data.stormy, color: t.rd }
                ].map((s, i) => (
                  <div key={i} style={{ width: `${s.pct}%`, background: s.color, transition: "width 1s ease", minWidth: s.pct > 0 ? 2 : 0 }} title={`${["Calm","Stable","Unsettled","Turbulent","Stormy"][i]}: ${s.pct}%`} />
                ))}
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: t.rd, fontFamily: "'IBM Plex Mono',monospace", minWidth: 28 }}>
                {row.data.turbulent + row.data.stormy}%
              </span>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
            {[
              { l: en ? "Calm" : "Calma", c: t.gn },
              { l: en ? "Stable" : "Estable", c: t.cy },
              { l: en ? "Unsettled" : "Inestable", c: t.am },
              { l: en ? "Turbulent" : "Turbulento", c: t.or || "#f97316" },
              { l: en ? "Stormy" : "Tormentoso", c: t.rd }
            ].map((item, i) => (
              <span key={i} style={{ fontSize: 9, color: t.tx3, display: "flex", alignItems: "center", gap: 3 }}>
                <span style={{ width: 6, height: 6, borderRadius: 2, background: item.c, display: "inline-block" }} />{item.l}
              </span>
            ))}
          </div>
        </div>

        <Ci s={`WEF Global Risks Report 2026 — ${(kf.eosRespondents / 1000).toFixed(0)}k+ respondents across ${kf.economies} economies`} />
      </Card>
    </ScrollReveal>
  );
}

export function Home({ en, t, idx, crS, crR, board, news, xr, govData, dark, setTab, onIndicatorClick }) {
  const TL = TIMELINE(en);
  const [tlOpen, setTlOpen] = useState(null);
  const [newsFeed, setNewsFeed] = useState("cr");

  /* Radar data: CR vs Chile vs Singapore */
  const radarData = Object.entries(DM).map(([dk, d]) => ({
    dim: en ? d.e : d.l,
    CR: idx?.CRI?.[dk] != null ? +(idx.CRI[dk] * 100).toFixed(1) : 0,
    CHL: idx?.CHL?.[dk] != null ? +(idx.CHL[dk] * 100).toFixed(1) : 0,
    SGP: idx?.SGP?.[dk] != null ? +(idx.SGP[dk] * 100).toFixed(1) : 0
  }));

  return (
    <div>
      {/* ═══════ HERO ═══════ */}
      <section className="hero-bg" style={{ borderRadius: 20, padding: "48px 32px 40px", marginBottom: 28, position: "relative" }}>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div style={{ position: "relative", zIndex: 10 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span className="live-dot" />
              <span style={{ fontSize: 11, fontFamily: "'IBM Plex Mono',monospace", color: t.gn, letterSpacing: 1 }}>
                {en ? "LIVE DATA" : "DATOS EN VIVO"}
              </span>
            </div>
            <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 900, fontFamily: "'Fraunces',serif", lineHeight: 1.15, marginBottom: 12 }}>
              <span className="gradient-text">{en ? "AI Observatory" : "Observatorio AI"}</span>
              <br />
              <span style={{ color: t.tx }}>Costa Rica</span>
            </h1>
            <p style={{ fontSize: 15, color: t.tx2, maxWidth: 540, lineHeight: 1.7, marginBottom: 16 }}>
              {en
                ? "Real-time strategic intelligence for Costa Rica's positioning in the global AI transformation. 20-country composite index, 20+ data sources, 10 proprietary algorithms."
                : "Inteligencia estratégica en tiempo real para el posicionamiento de Costa Rica en la transformación global de AI. Índice compuesto de 20 países, 20+ fuentes, 10 algoritmos propietarios."}
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button onClick={() => setTab("idx")} style={{ padding: "10px 20px", border: "none", borderRadius: 8, background: t.grad1, color: "#fff", fontWeight: 700, fontSize: 14 }}>
                {en ? "Explore Index" : "Explorar Índice"} →
              </button>
              <button onClick={() => setTab("sim")} style={{ padding: "10px 20px", border: `1px solid ${t.bd}`, borderRadius: 8, background: t.cardBg, color: t.tx2, fontWeight: 600, fontSize: 14 }}>
                {en ? "Policy Simulator" : "Simulador"} 🎯
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ KEY STATS ═══════ */}
      <motion.div variants={stagger} initial="hidden" animate="visible">
        <Grid cols="repeat(auto-fit,minmax(155px,1fr))" gap={12} style={{ marginBottom: 28 }}>
          <Stat value={crS} label={en ? "Colibrii Index" : "Índice Colibrii"} sub="CAPI-CR" color={t.cy} icon="diamond" onClick={() => onIndicatorClick({...INDICATOR_META.colibrii_index, value: crS != null ? (crS * 100).toFixed(1) : null, color: t.cy})} />
          <Stat value={crR} label={en ? "Global Rank" : "Ranking Global"} sub={en ? "of 20 countries" : "de 20 países"} color={t.vi} precision={0} prefix="#" icon="chart" onClick={() => onIndicatorClick({...INDICATOR_META.global_rank, value: crR != null ? `#${crR}` : null, color: t.vi})} />
          <Stat value={40} label={en ? "AI Job Exposure" : "Exposición Laboral AI"} sub="IMF 2024" color={t.or} precision={0} prefix="" icon="lightning" onClick={() => onIndicatorClick({...INDICATOR_META.ai_exposure, value: "40%", color: t.or})} />
          <Stat value={5} label={en ? "AI Risk (WEF)" : "Riesgo AI (WEF)"} sub="5.28 sev · #30→#5" color={t.rd} precision={0} prefix="#" icon="shield" onClick={() => onIndicatorClick({...INDICATOR_META.ai_risk, value: "#5 (5.28/7.0)", color: t.rd})} />
          <Stat value={626} label={en ? "FZ Companies" : "Empresas ZF"} sub="PROCOMER 2024" color={t.am} precision={0} icon="factory" onClick={() => onIndicatorClick({...INDICATOR_META.fz_companies, value: "626", color: t.am})} />
          <Stat value={4.3} label={en ? "FDI (B USD)" : "IED (B USD)"} sub="CINDE 2024" color={t.gn} prefix="$" icon="coins" onClick={() => onIndicatorClick({...INDICATOR_META.fdi, value: "$4.3B", color: t.gn})} />
        </Grid>
      </motion.div>

      {/* ═══════ WEF 2026 RISK DASHBOARD — 3 HORIZONS ═══════ */}
      <WefDashboard en={en} t={t} dark={dark} />

      {/* ═══════ CR EOS: EXECUTIVE BLIND SPOT ═══════ */}
      <ScrollReveal delay={150}>
        <Card accent={t.or} style={{ marginBottom: 28, background: `${t.or}04` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.or, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
                {en ? "COSTA RICA — EXECUTIVE VIEW" : "COSTA RICA — VISIÓN EJECUTIVA"}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Fraunces',serif" }}>
                {en ? "What Business Leaders See vs. Global Experts" : "Qué Ven Líderes Empresariales vs. Expertos Globales"}
              </div>
            </div>
            <span style={{ fontSize: 10, padding: "4px 10px", borderRadius: 5, background: `${t.or}12`, color: t.or, fontFamily: "'IBM Plex Mono',monospace", fontWeight: 700 }}>
              EOS × INCAE
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* CR EOS Top 5 */}
            <div>
              <div style={{ fontSize: 10, color: t.or, marginBottom: 6, fontFamily: "'IBM Plex Mono',monospace", letterSpacing: 1 }}>
                {en ? "CR TOP 5 (BUSINESS LEADERS)" : "CR TOP 5 (LÍDERES EMPRESARIALES)"}
              </div>
              {EOS_RISKS.CRI.risks.map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 6, padding: "5px 0", borderBottom: i < 4 ? `1px solid ${t.bd}` : "none" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: t.or, fontFamily: "'IBM Plex Mono',monospace", minWidth: 18 }}>#{i + 1}</span>
                  <span style={{ fontSize: 12, color: t.tx2 }}>{en ? r.risk : r.risk}</span>
                </div>
              ))}
            </div>
            {/* Global Expert Top 5 Long-term */}
            <div>
              <div style={{ fontSize: 10, color: t.rd, marginBottom: 6, fontFamily: "'IBM Plex Mono',monospace", letterSpacing: 1 }}>
                {en ? "GLOBAL TOP 5 (EXPERTS, 10YR)" : "GLOBAL TOP 5 (EXPERTOS, 10 AÑOS)"}
              </div>
              {WEF_2026_RISKS.longTerm2036.slice(0, 5).map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 6, padding: "5px 0", borderBottom: i < 4 ? `1px solid ${t.bd}` : "none" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: t.rd, fontFamily: "'IBM Plex Mono',monospace", minWidth: 18 }}>#{i + 1}</span>
                  <span style={{ fontSize: 12, color: t.tx, fontWeight: r.risk.includes("AI") ? 700 : 400 }}>
                    {r.risk}{r.risk.includes("AI") ? " ⚡" : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Strategic callout */}
          <div style={{ marginTop: 14, padding: "10px 14px", background: `${t.rd}06`, borderRadius: 8, borderLeft: `3px solid ${t.rd}` }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.rd, marginBottom: 3 }}>
              {en ? "⚠ BLIND SPOT: AI absent from CR's executive risk radar" : "⚠ PUNTO CIEGO: AI ausente del radar de riesgos ejecutivos de CR"}
            </div>
            <div style={{ fontSize: 11, color: t.tx2, lineHeight: 1.6 }}>
              {en
                ? "CR's EOS shows zero AI/technology risks in top 5. The US ranks AI #4, South Korea #5, Indonesia #3, Philippines #4, Malaysia #4. Vietnam ranks AI #1 globally. CR and Chile share the same blind spot — no AI in sight."
                : "EOS de CR muestra cero riesgos AI/tecnología en top 5. EEUU ranquea AI #4, Corea del Sur #5, Indonesia #3, Filipinas #4, Malasia #4. Vietnam ranquea AI #1 globalmente. CR y Chile comparten el mismo punto ciego — sin AI a la vista."}
            </div>
          </div>
          <Ci s={`WEF 2026 Executive Opinion Survey — via INCAE Business School (${(WEF_2026_RISKS.keyFindings.eosRespondents / 1000).toFixed(0)}k+ respondents, ${WEF_2026_RISKS.keyFindings.eosEconomies} economies)`} />
        </Card>
      </ScrollReveal>

      {/* ═══════ VIP QUOTES REEL ═══════ */}
      <ScrollReveal delay={100}>
        <Card style={{ marginBottom: 28, overflow: "visible" }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.vi, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
            {en ? "VOICES ON AI" : "VOCES SOBRE AI"}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Fraunces',serif", marginBottom: 16 }}>
            {en ? "What Global Leaders Are Saying" : "Qué Dicen los Líderes Globales"}
          </div>
          <div className="vip-reel">
            {VIP_QUOTES(en).map((q, i) => (
              <div key={i} className="vip-card">
                <div className="vip-avatar" style={{ background: q.gradient }}>{q.initials}</div>
                <div className="vip-quote">{q.quote}</div>
                <div className="vip-name">{q.name}</div>
                <div className="vip-title">{q.title}</div>
                {q.src && (
                  <a href={q.src} target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, color: t.cy, marginTop: 6, display: "inline-block" }}>
                    {en ? "Source" : "Fuente"} ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        </Card>
      </ScrollReveal>

      {/* ═══════ RADAR CHART ═══════ */}
      <ScrollReveal delay={150}>
        <Card style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.vi, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
            CAPI-CR COMPOSITE
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Fraunces',serif", marginBottom: 16 }}>
            🇨🇷 Costa Rica vs 🇨🇱 Chile vs 🇸🇬 Singapore
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke={dark ? "#1e293b" : "#d1d5e0"} />
              <PolarAngleAxis dataKey="dim" tick={{ fontSize: 10, fill: dark ? "#94a3b8" : "#475569" }} />
              <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
              <Radar name="Costa Rica" dataKey="CR" stroke={t.cy} fill={t.cy} fillOpacity={0.15} strokeWidth={2} />
              <Radar name="Chile" dataKey="CHL" stroke={t.am} fill={t.am} fillOpacity={0.08} strokeWidth={1.5} strokeDasharray="4 2" />
              <Radar name="Singapore" dataKey="SGP" stroke={t.vi} fill={t.vi} fillOpacity={0.08} strokeWidth={1.5} strokeDasharray="4 2" />
              <Tooltip contentStyle={{ background: dark ? "#111827" : "#fff", border: `1px solid ${dark ? "#1e293b" : "#d1d5e0"}`, borderRadius: 8, fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 8, fontSize: 12 }}>
            <span><span style={{ color: t.cy }}>●</span> Costa Rica</span>
            <span><span style={{ color: t.am }}>●</span> Chile</span>
            <span><span style={{ color: t.vi }}>●</span> Singapore</span>
          </div>
        </Card>
      </ScrollReveal>

      {/* ═══════ KEY FINDINGS ═══════ */}
      <Grid cols="repeat(auto-fit,minmax(240px,1fr))" gap={12} style={{ marginBottom: 28 }}>
        <Card accent={t.gn}>
          <Tag color={t.gn}>{en ? "STRENGTH" : "FORTALEZA"}</Tag>
          <div style={{ fontSize: 15, fontWeight: 700, marginTop: 8, marginBottom: 4 }}>{en ? "AI Overperformer" : "AI Overperformer"}</div>
          <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7 }}>{en ? "World Bank: CR outperforms income peers on AI readiness. 99% renewable energy, OECD member, CAFTA-DR, same timezone as US." : "Banco Mundial: CR supera a pares de ingreso en preparación AI. 99% energía renovable, miembro OCDE, CAFTA-DR, mismo huso horario que EEUU."}</p>
          <Ci s="World Bank Digital Progress 2025" />
        </Card>
        <Card accent={t.rd}>
          <Tag color={t.rd}>{en ? "CRITICAL GAP" : "BRECHA CRÍTICA"}</Tag>
          <div style={{ fontSize: 15, fontWeight: 700, marginTop: 8, marginBottom: 4 }}>{en ? "Zero AI Law" : "Cero Ley AI"}</div>
          <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7 }}>{en ? "Oxford: 100/100 AI Vision but 0.38/1.0 overall. No binding AI law, no authority, no mandatory transparency. The gap between strategy and law is CR's #1 vulnerability." : "Oxford: 100/100 Visión AI pero 0.38/1.0 general. Sin ley AI vinculante, sin autoridad, sin transparencia obligatoria. La brecha entre estrategia y ley es vulnerabilidad #1."}</p>
          <Ci s="Oxford Insights AI Readiness 2024" />
        </Card>
        <Card accent={t.am}>
          <Tag color={t.am}>{en ? "WINDOW" : "VENTANA"}</Tag>
          <div style={{ fontSize: 15, fontWeight: 700, marginTop: 8, marginBottom: 4 }}>2025-2027</div>
          <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7 }}>{en ? "12-18 months to legislate before global AI regulation hardens. First Central American AI law = FDI advantage. South Korea model: regulate + promote in one law." : "12-18 meses para legislar antes que regulación AI global se endurezca. Primera ley AI centroamericana = ventaja IED. Modelo Corea del Sur: regular + promover en una ley."}</p>
          <Ci s="OECD, EU AI Act, KOR AI Framework 2026" />
        </Card>
      </Grid>

      {/* ═══════ MINI LEADERBOARD ═══════ */}
      <ScrollReveal delay={100}>
        <Card style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.cy, fontFamily: "'IBM Plex Mono',monospace" }}>
                {en ? "LEADERBOARD" : "CLASIFICACIÓN"}
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Fraunces',serif" }}>Top 10</div>
            </div>
            <button onClick={() => setTab("idx")} style={{ fontSize: 12, border: `1px solid ${t.bd}`, borderRadius: 6, padding: "4px 12px", background: t.sf, color: t.cy, fontWeight: 600 }}>
              {en ? "Full Index" : "Índice Completo"} →
            </button>
          </div>
          {board.slice(0, 10).map((c, i) => (
            <div key={c.code} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 9 ? `1px solid ${t.bd}` : "none", background: c.code === "CRI" ? `${t.cy}06` : "transparent", borderRadius: c.code === "CRI" ? 6 : 0, padding: c.code === "CRI" ? "8px 10px" : "8px 0" }}>
              <span style={{ width: 22, fontSize: 12, fontWeight: 700, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", textAlign: "center" }}>{i + 1}</span>
              <span style={{ fontSize: 16 }}>{c.f}</span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: c.code === "CRI" ? 700 : 400, color: c.code === "CRI" ? t.cy : t.tx }}>{en ? c.e : c.n}</span>
              <span style={{ fontSize: 14, fontWeight: 700, fontFamily: "'IBM Plex Mono',monospace", color: c.composite >= 0.65 ? t.gn : c.composite >= 0.40 ? t.am : t.rd }}>
                {c.composite != null ? (c.composite * 100).toFixed(1) : "—"}
              </span>
            </div>
          ))}
        </Card>
      </ScrollReveal>

      {/* ═══════ AI GLOBAL TIMELINE — INTERACTIVE ═══════ */}
      <ScrollReveal delay={100}>
        <Card style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.vi, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
            {en ? "AI GLOBAL TIMELINE" : "CRONOLOGÍA AI GLOBAL"}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Fraunces',serif", marginBottom: 16 }}>
            {en ? "From ChatGPT to La Encrucijada" : "De ChatGPT a La Encrucijada"}
          </div>
          <div className="timeline-interactive">
            {TL.map((m, i) => (
              <div key={i} className={`timeline-node ${tlOpen === i ? "active" : ""}`} onClick={() => setTlOpen(tlOpen === i ? null : i)}>
                <div className="timeline-node-dot" style={{ borderColor: m.c }} />
                <div className="timeline-node-header">
                  <span style={{ fontSize: 10, fontFamily: "'IBM Plex Mono',monospace", color: m.c, fontWeight: 700, minWidth: 70 }}>{m.date}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: t.tx, flex: 1 }}>{m.t}</span>
                  <span style={{ fontSize: 12, color: t.tx3, transform: tlOpen === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>▾</span>
                </div>
                <AnimatePresence>
                  {tlOpen === i && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="timeline-node-content">
                      <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.7, marginBottom: 8 }}>{m.d}</p>
                      <div style={{ fontSize: 11, color: m.c, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 6, padding: "6px 10px", background: `${m.c}08`, borderRadius: 6, borderLeft: `2px solid ${m.c}` }}>
                        🇨🇷 CR: {m.cr}
                      </div>
                      {m.src && (
                        <a href={m.src} target="_blank" rel="noopener noreferrer" className="timeline-source-btn">
                          {en ? "View Source" : "Ver Fuente"} ↗
                        </a>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Card>
      </ScrollReveal>

      {/* ═══════ DATA PARTNERS ═══════ */}
      <PartnerBar items={PARTNERS} en={en} />

      {/* ═══════ AI NEWS — DUAL FEED ═══════ */}
      {news.length > 0 && (
        <ScrollReveal delay={150}>
          <Card style={{ marginTop: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4, flexWrap: "wrap", gap: 8 }}>
              <div>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.pk, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
                  {en ? "AI NEWS FEED (72H)" : "FEED NOTICIAS AI (72H)"}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Fraunces',serif" }}>
                  {en ? "Latest Intelligence" : "Inteligencia Reciente"}
                </div>
              </div>
            </div>
            <div className="news-tabs">
              <button className={`news-tab ${newsFeed === "cr" ? "active" : ""}`} onClick={() => setNewsFeed("cr")}>{en ? "Costa Rica" : "Costa Rica"} 🇨🇷</button>
              <button className={`news-tab ${newsFeed === "global" ? "active" : ""}`} onClick={() => setNewsFeed("global")}>{en ? "Global" : "Global"} 🌎</button>
            </div>
            <div className="news-grid">
              {news.map((n, i) => {
                const cat = n.title?.toLowerCase().includes("security") || n.title?.toLowerCase().includes("cyber") ? "security"
                  : n.title?.toLowerCase().includes("regulat") || n.title?.toLowerCase().includes("law") || n.title?.toLowerCase().includes("policy") ? "policy"
                  : n.title?.toLowerCase().includes("econom") || n.title?.toLowerCase().includes("invest") ? "economy"
                  : n.title?.toLowerCase().includes("educat") || n.title?.toLowerCase().includes("universit") ? "education"
                  : "tech";
                const nc = NEWS_CATEGORIES[cat];
                return (
                  <a key={i} href={n.url} target="_blank" rel="noopener noreferrer" className="news-card">
                    <div className="news-thumb" style={{ background: `linear-gradient(135deg, ${nc.color}20, ${nc.color}40)` }}>
                      <span>{nc.icon}</span>
                    </div>
                    <div className="news-body">
                      <div className="news-title">{n.title}</div>
                      <div className="news-meta">{n.domain} · {n.seendate?.slice(0, 10)}</div>
                      <div className="news-impact" style={{ background: `${t.cy}10`, color: t.cy }}>
                        🇨🇷 {en ? "CR Impact" : "Impacto CR"}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
            <Ci s="GDELT Project API — 72h window" />
          </Card>
        </ScrollReveal>
      )}
    </div>
  );
}
