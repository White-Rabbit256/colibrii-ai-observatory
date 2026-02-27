"use client";
import { useState, useMemo } from "react";
import { Card, SH, Grid, ScrollReveal, Tag, Ci, ProgressBar, MiniStat } from "./ui";
import { Icon } from "./system/Icon";
import { Flag } from "./ui";
import { GLOBAL_AI_GOVERNANCE, AI_TRAJECTORY, FIVE_PATHWAYS } from "./data";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Global AI Governance
   Regulatory Map · LATAM Tracker · Investment Comparison
   AI Trajectory · Policy Recommendations
   ═══════════════════════════════════════════════════════════════ */

/* ── Category colors/labels ── */
const CAT_CONFIG = (en) => ({
  comprehensive: { color: "#2563eb", label: en ? "Comprehensive" : "Integral" },
  enacted: { color: "#10b981", label: en ? "Law Enacted" : "Ley Promulgada" },
  framework: { color: "#6366f1", label: en ? "Framework" : "Marco" },
  investment: { color: "#f59e0b", label: en ? "Investment-Led" : "Inversión" },
  mission: { color: "#f97316", label: en ? "National Mission" : "Misión Nacional" },
  sandbox: { color: "#14b8a6", label: en ? "Sandbox" : "Sandbox" },
  developing: { color: "#94a3b8", label: en ? "Developing" : "En Desarrollo" },
  updating: { color: "#8b5cf6", label: en ? "Updating" : "Actualizando" },
  advancing: { color: "#ec4899", label: en ? "Advancing" : "Avanzando" },
  pending: { color: "#f59e0b", label: en ? "Pending" : "Pendiente" },
  guidance: { color: "#6366f1", label: en ? "Guidance" : "Guía" },
  none: { color: "#ef4444", label: en ? "No Legislation" : "Sin Legislación" },
});

/* ── Region Emoji ── */
const REGION_ICONS = { "Europe": "🇪🇺", "Europa": "🇪🇺", "Asia-Pacific": "🌏", "Americas": "🌎", "Américas": "🌎" };

export function Governance({ en, t }) {
  const [regionFilter, setRegionFilter] = useState("all");
  const [expandedCountry, setExpandedCountry] = useState(null);
  const governance = GLOBAL_AI_GOVERNANCE(en);
  const trajectory = AI_TRAJECTORY(en);
  const catConfig = CAT_CONFIG(en);

  const regions = useMemo(() => {
    const r = [...new Set(governance.map(g => g.region))];
    return ["all", ...r];
  }, [governance]);

  const filtered = regionFilter === "all" ? governance : governance.filter(g => g.region === regionFilter);
  const latam = governance.filter(g => g.region === (en ? "Americas" : "Américas"));

  /* ── Counts ── */
  const enacted = governance.filter(g => ["comprehensive", "enacted"].includes(g.category)).length;
  const developing = governance.filter(g => ["developing", "updating", "pending", "guidance"].includes(g.category)).length;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      {/* ── HEADER ── */}
      <SH
        color={t.or}
        label={en ? "REGULATORY LANDSCAPE" : "PANORAMA REGULATORIO"}
        title={en ? "Global AI Governance" : "Gobernanza Global de AI"}
        desc={en
          ? "Tracking AI regulation worldwide — from the EU AI Act to Latin America's emerging frameworks. Where does Costa Rica stand?"
          : "Rastreando regulación AI mundial — desde la Ley AI de la UE hasta los marcos emergentes de América Latina. ¿Dónde está Costa Rica?"
        }
      />

      {/* ── INTRO CONTEXT BOX ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16, background: `${t.or}06`, border: `1px solid ${t.or}20` }}>
          <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7, margin: 0 }}>
            {en
              ? "AI governance is moving fast globally. The EU AI Act became the first comprehensive binding AI law in 2024. In Latin America, Peru enacted the region's first AI law in 2023, and El Salvador followed in 2025. Costa Rica currently has zero binding AI legislation — creating both a policy gap and an opportunity to learn from global approaches."
              : "La gobernanza de AI avanza rápidamente a nivel global. La Ley AI de la UE se convirtió en la primera ley AI vinculante integral en 2024. En América Latina, Perú promulgó la primera ley AI regional en 2023, y El Salvador siguió en 2025. Costa Rica actualmente tiene cero legislación AI vinculante — creando tanto una brecha de política como una oportunidad para aprender de enfoques globales."
            }
          </p>
        </Card>
      </ScrollReveal>

      {/* ── OVERVIEW STATS ── */}
      <ScrollReveal>
        <Grid cols="repeat(auto-fit, minmax(130px, 1fr))" gap={8} className="mobile-stat-grid" style={{ marginBottom: 16 }}>
          {[
            { label: en ? "Countries Tracked" : "Países Rastreados", value: governance.length, color: t.or, icon: "globe",
              sub: en ? "across 3 global regions" : "en 3 regiones globales" },
            { label: en ? "Laws Enacted" : "Leyes Promulgadas", value: enacted, color: t.gn, icon: "legal",
              sub: en ? "binding AI legislation active" : "legislación AI vinculante activa" },
            { label: en ? "In Development" : "En Desarrollo", value: developing, color: t.am, icon: "algo",
              sub: en ? "frameworks being drafted" : "marcos en elaboración" },
            { label: en ? "LATAM Countries" : "Países LATAM", value: latam.length, color: t.vi, icon: "globe",
              sub: en ? "regional comparison set" : "conjunto comparación regional" },
          ].map((s, i) => (
            <Card key={i} d={i * 0.04} style={{ padding: 12, textAlign: "center" }}>
              <Icon name={s.icon} size={16} color={s.color} />
              <div style={{ fontSize: 20, fontWeight: 800, color: s.color, fontFamily: "'IBM Plex Mono',monospace", marginTop: 3 }}>{s.value}</div>
              <div style={{ fontSize: 10, color: t.tx3, fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontSize: 9, color: t.tx3, marginTop: 2, lineHeight: 1.3 }}>{s.sub}</div>
            </Card>
          ))}
        </Grid>
      </ScrollReveal>

      {/* ── GLOBAL REGULATORY MAP ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.or, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
            {en ? "GLOBAL VIEW" : "VISTA GLOBAL"}
          </div>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: t.tx, marginBottom: 10 }}>
            {en ? "AI Regulation by Country" : "Regulación AI por País"}
          </h3>

          {/* Region filter */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
            {regions.map(r => (
              <button
                key={r}
                onClick={() => setRegionFilter(r)}
                style={{
                  padding: "5px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                  background: regionFilter === r ? `${t.or}15` : t.sf,
                  color: regionFilter === r ? t.or : t.tx3,
                  border: `1px solid ${regionFilter === r ? t.or : t.bd}`,
                  cursor: "pointer",
                }}
              >
                {r === "all" ? (en ? "🌐 All" : "🌐 Todos") : `${REGION_ICONS[r] || ""} ${r}`}
              </button>
            ))}
          </div>

          {/* Country table — Desktop */}
          <div className="table-scroll-wrapper hide-mobile">
            <table className="data-table data-table-gov" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left" }}>{en ? "Country" : "País"}</th>
                  <th style={{ textAlign: "left" }}>{en ? "Status" : "Estado"}</th>
                  <th>{en ? "Category" : "Categoría"}</th>
                  <th>{en ? "Year" : "Año"}</th>
                  <th>{en ? "Investment" : "Inversión"}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((g, i) => {
                  const cat = catConfig[g.category] || { color: t.tx3, label: g.category };
                  const isCR = g.code === "CR";
                  return (
                    <tr key={i} style={isCR ? { background: `${t.rd}08` } : {}}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <Flag code={g.code} size={16} />
                          <span style={{ fontWeight: isCR ? 700 : 600, fontSize: 12, color: isCR ? t.rd : t.tx }}>{g.country}</span>
                        </div>
                      </td>
                      <td style={{ fontSize: 11, color: t.tx2 }}>{g.status}</td>
                      <td style={{ textAlign: "center" }}>
                        <Tag color={cat.color}>{cat.label}</Tag>
                      </td>
                      <td style={{ textAlign: "center", fontSize: 11, fontFamily: "'IBM Plex Mono',monospace", color: t.tx3 }}>{g.year}</td>
                      <td style={{ textAlign: "center", fontSize: 12, fontWeight: 600, fontFamily: "'IBM Plex Mono',monospace", color: g.investment !== "—" && g.investment !== "Minimal" ? t.gn : t.tx3 }}>
                        {g.investment}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Country cards — Mobile */}
          <div className="show-mobile">
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {filtered.map((g, i) => {
                const cat = catConfig[g.category] || { color: t.tx3, label: g.category };
                const isCR = g.code === "CR";
                return (
                  <div key={i} style={{
                    padding: 10, borderRadius: 8,
                    border: isCR ? `2px solid ${t.rd}` : `1px solid ${t.bd}`,
                    background: isCR ? `${t.rd}06` : t.sf,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <Flag code={g.code} size={24} />
                      <span style={{ fontSize: 13, fontWeight: isCR ? 700 : 600, color: isCR ? t.rd : t.tx, flex: 1 }}>{g.country}</span>
                      <Tag color={cat.color}>{cat.label}</Tag>
                    </div>
                    <div style={{ fontSize: 11, color: t.tx2, marginBottom: 4 }}>{g.status}</div>
                    <div style={{ display: "flex", gap: 12, fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace" }}>
                      <span>{g.year}</span>
                      <span style={{ color: g.investment !== "—" && g.investment !== "Minimal" ? t.gn : t.tx3, fontWeight: 600 }}>{g.investment}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Ci s="ITU — 'AI for Good Impact Report' (Jan 2026) · National AI Strategies Database" />
        </Card>
      </ScrollReveal>

      {/* ── LATAM FOCUS ── */}
      <ScrollReveal>
        <Card accent={t.vi} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.vi, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
            {en ? "LATIN AMERICA FOCUS" : "ENFOQUE AMÉRICA LATINA"}
          </div>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: t.tx, marginBottom: 10 }}>
            {en ? "AI Governance in the Region" : "Gobernanza AI en la Región"}
          </h3>
          <p style={{ fontSize: 13, color: t.tx2, marginBottom: 14, lineHeight: 1.6 }}>
            {en
              ? "Latin America is rapidly developing AI governance frameworks. Peru led with the first regional AI law in 2023, followed by El Salvador in 2025. Costa Rica remains without binding AI legislation."
              : "América Latina está desarrollando rápidamente marcos de gobernanza AI. Perú lideró con la primera ley AI regional en 2023, seguido por El Salvador en 2025. Costa Rica sigue sin legislación AI vinculante."
            }
          </p>

          {/* LATAM Timeline */}
          <div style={{ position: "relative", paddingLeft: "clamp(16px, 4vw, 30px)", marginBottom: 10 }}>
            {/* Vertical line */}
            <div style={{ position: "absolute", left: 12, top: 0, bottom: 0, width: 2, background: t.bd }} />
            {latam.sort((a, b) => a.year - b.year).map((c, i) => {
              const cat = catConfig[c.category] || { color: t.tx3, label: c.category };
              const isCR = c.code === "CR";
              return (
                <div key={i} style={{
                  position: "relative", padding: "6px 0 6px 20px", marginBottom: 3,
                  borderLeft: isCR ? `3px solid ${t.rd}` : "none",
                  marginLeft: isCR ? -31 : 0,
                  paddingLeft: isCR ? 48 : 20,
                }}>
                  {/* Timeline dot */}
                  <div style={{
                    position: "absolute", left: isCR ? 28 : -1, top: 12,
                    width: 10, height: 10, borderRadius: "50%",
                    background: cat.color, border: `2px solid ${t.cardBg}`
                  }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    <Flag code={c.code} size={14} />
                    <span style={{ fontSize: 12, fontWeight: isCR ? 700 : 600, color: isCR ? t.rd : t.tx }}>{c.country}</span>
                    <Tag color={cat.color}>{cat.label}</Tag>
                    <span style={{ fontSize: 10, fontFamily: "'IBM Plex Mono',monospace", color: t.tx3 }}>{c.year}</span>
                  </div>
                  <div style={{ fontSize: 11, color: t.tx2, marginTop: 2 }}>{c.status}</div>
                </div>
              );
            })}
          </div>
          <Ci s="ITU — 'AI for Good Impact Report' (Jan 2026) · Latin America AI Observatory" />
        </Card>
      </ScrollReveal>

      {/* ── AI INVESTMENT COMPARISON ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.am, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
            {en ? "INVESTMENT LANDSCAPE" : "PANORAMA INVERSIÓN"}
          </div>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: t.tx, marginBottom: 10 }}>
            {en ? "National AI Investment Comparison" : "Comparación Inversión AI Nacional"}
          </h3>
          {(() => {
            const investData = governance
              .filter(g => g.investment !== "—" && g.investment !== "Minimal")
              .map(g => {
                let num = 0;
                const inv = g.investment.replace(/[€£$>+,]/g, "");
                const val = parseFloat(inv);
                if (inv.includes("B")) num = val * 1000;
                else if (inv.includes("M")) num = val;
                return { ...g, numInvest: num };
              })
              .sort((a, b) => b.numInvest - a.numInvest);
            const maxInvest = investData[0]?.numInvest || 1;

            return (
              <div style={{ display: "grid", gap: 6 }}>
                {investData.map((g, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ minWidth: 70, display: "flex", alignItems: "center", gap: 4 }}>
                      <Flag code={g.code} size={14} />
                      <span style={{ fontSize: 11, fontWeight: 600, color: t.tx }}>{g.code}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <ProgressBar value={g.numInvest} max={maxInvest} color={t.am} height={10} />
                    </div>
                    <div style={{ minWidth: 55, fontSize: 11, fontWeight: 700, fontFamily: "'IBM Plex Mono',monospace", color: t.am, textAlign: "right" }}>
                      {g.investment}
                    </div>
                  </div>
                ))}
                {/* CR position */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "6px 0", borderTop: `2px dashed ${t.rd}`, marginTop: 4
                }}>
                  <div style={{ minWidth: 70, display: "flex", alignItems: "center", gap: 4 }}>
                    <Flag code="CR" size={14} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: t.rd }}>CR</span>
                  </div>
                  <div style={{ flex: 1, fontSize: 11, color: t.rd, fontStyle: "italic" }}>
                    {en ? "Minimal dedicated public AI investment" : "Inversión pública AI dedicada mínima"}
                  </div>
                  <div style={{ minWidth: 55, fontSize: 11, fontWeight: 700, fontFamily: "'IBM Plex Mono',monospace", color: t.rd, textAlign: "right" }}>
                    ~$0
                  </div>
                </div>
              </div>
            );
          })()}
          <Ci s="ITU AI for Good Impact Report 2026 · National AI Strategy Announcements" />
        </Card>
      </ScrollReveal>

      {/* ── AI TRAJECTORY TIMELINE ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.pk, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
            {en ? "AI EVOLUTION" : "EVOLUCIÓN AI"}
          </div>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: t.tx, marginBottom: 10 }}>
            {en ? "AI Trajectory: Present to Future" : "Trayectoria AI: Presente a Futuro"}
          </h3>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {trajectory.map((phase, i) => (
              <div key={i} style={{
                flex: "1 1 140px", maxWidth: 180, padding: 12, borderRadius: 10,
                border: `2px solid ${phase.color}`, background: `${phase.color}06`,
                position: "relative"
              }}>
                <Tag color={phase.color}>{phase.status}</Tag>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.tx, marginTop: 4 }}>{phase.phase}</div>
                <div style={{ fontSize: 10, fontFamily: "'IBM Plex Mono',monospace", color: phase.color, marginBottom: 4 }}>{phase.year}</div>
                <div style={{ fontSize: 11, color: t.tx2, lineHeight: 1.5 }}>{phase.desc}</div>
                {i < trajectory.length - 1 && (
                  <div className="flow-arrow" style={{ position: "absolute", right: -10, top: "50%", fontSize: 14, color: t.tx3 }}>→</div>
                )}
              </div>
            ))}
          </div>
          <Ci s="ITU — 'AI for Good Impact Report' (Jan 2026) · AI Trajectory Analysis" />
        </Card>
      </ScrollReveal>

      {/* ── POLICY RECOMMENDATIONS ── */}
      <ScrollReveal>
        <Card accent={t.gn} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.gn, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
            {en ? "RECOMMENDATIONS" : "RECOMENDACIONES"}
          </div>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: t.tx, marginBottom: 10 }}>
            {en ? "Policy Actions for Costa Rica" : "Acciones de Política para Costa Rica"}
          </h3>
          <div style={{ display: "grid", gap: 8 }}>
            {(FIVE_PATHWAYS(en)).map((p, i) => (
              <div key={i} style={{ padding: 10, borderRadius: 8, border: `1px solid ${t.bd}`, background: t.sf }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: `${p.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name={p.icon} size={13} color={p.color} />
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: p.color }}>{p.name}</div>
                </div>
                <div style={{ fontSize: 11, color: t.tx2, lineHeight: 1.6, marginBottom: 3 }}>{p.crStatus}</div>
                <div style={{ fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace" }}>🌐 {p.global}</div>
              </div>
            ))}
          </div>
          <Ci s="ITU Five Pathways Framework · Colibrii Labs Analysis" />
        </Card>
      </ScrollReveal>

      {/* ── FOOTER ── */}
      <ScrollReveal>
        <div style={{ textAlign: "center", padding: "12px 0", fontSize: 11, color: t.tx3, lineHeight: 1.6 }}>
          {en
            ? "Governance data from ITU AI for Good Impact Report (Jan 2026). Investment figures from official national announcements."
            : "Datos gobernanza del Reporte Impacto AI for Good UIT (enero 2026). Cifras inversión de anuncios nacionales oficiales."
          }
        </div>
      </ScrollReveal>
    </div>
  );
}
