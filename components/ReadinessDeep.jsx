"use client";
import { useState, useRef, useEffect } from "react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell
} from "recharts";
import { Card, SH, Grid, ScrollReveal, Tag, Bx, MiniStat, Lnk, Flag } from "./ui";
import { Icon } from "./system/Icon";
import { READINESS_INDICES, ILIA_RANKINGS, INDEX_METHODOLOGY, CR_READINESS_PROFILE } from "./readinessData";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — AI Readiness Deep Dive
   Multi-index analysis, ILIA leaderboard, methodology, SWOT
   ═══════════════════════════════════════════════════════════════ */

const TIER_COLORS = { Leader: "#10b981", Líder: "#10b981", Advanced: "#3b82f6", Avanzado: "#3b82f6", Developing: "#f59e0b", "En Desarrollo": "#f59e0b", Emerging: "#f97316", Emergente: "#f97316", Early: "#ef4444", Temprano: "#ef4444" };
const CR_BAR = "#06b6d4";

const mono = { fontFamily: "'IBM Plex Mono',monospace" };
const display = { fontFamily: "var(--font-display,'Playfair Display',serif)" };

export function ReadinessDeep({ en, t }) {
  const indices = READINESS_INDICES(en);
  const ilia = ILIA_RANKINGS(en);
  const methodology = INDEX_METHODOLOGY(en);
  const profile = CR_READINESS_PROFILE(en);

  const [expandedIdx, setExpandedIdx] = useState(null);
  const cardRefs = useRef({});

  /* auto-scroll on expand */
  useEffect(() => {
    if (expandedIdx != null && cardRefs.current[expandedIdx]) {
      setTimeout(() => {
        cardRefs.current[expandedIdx]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  }, [expandedIdx]);

  const toggleIdx = (id) => setExpandedIdx((p) => (p === id ? null : id));

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>

      {/* ════════════════════════════════════════════════════════
         1. HEADER + KEY STATS
         ════════════════════════════════════════════════════════ */}
      <SH
        color={t.cy}
        label={en ? "PREMIUM · DEEP ANALYSIS" : "PREMIUM · ANÁLISIS PROFUNDO"}
        title={en ? "AI Readiness Deep Dive" : "Preparación AI — Análisis Profundo"}
        desc={en
          ? "Multi-index benchmarking, dimensional radar analysis, ILIA leaderboard, index methodology, and Costa Rica's strategic readiness profile."
          : "Benchmarking multi-índice, análisis radar dimensional, tabla ILIA, metodología de índices y perfil estratégico de preparación de Costa Rica."}
      />

      <ScrollReveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 10, marginBottom: 24 }}>
          <MiniStat label={en ? "INDICES TRACKED" : "ÍNDICES RASTREADOS"} value={en ? "5 Major Indices" : "5 Índices Principales"} color={t.cy} mono />
          <MiniStat label={en ? "GLOBAL RANK" : "RANKING GLOBAL"} value={en ? "56th Globally (Oxford)" : "56o Global (Oxford)"} color={t.vi} mono />
          <MiniStat label={en ? "LATAM RANK" : "RANKING LATAM"} value={en ? "7th in LATAM (ILIA)" : "7o en LATAM (ILIA)"} color={t.am} mono />
          <MiniStat label={en ? "IMF CATEGORY" : "CATEGORÍA FMI"} value={en ? "AI Overperformer" : "AI Sobreperformer"} color={t.gn} mono />
        </div>
      </ScrollReveal>

      {/* ════════════════════════════════════════════════════════
         2. MULTI-INDEX COMPARISON
         ════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <SH
          color={t.vi}
          label={en ? "BENCHMARKING" : "BENCHMARKING"}
          title={en ? "Multi-Index Comparison" : "Comparación Multi-Índice"}
          desc={en
            ? "Five major AI readiness indices tracking Costa Rica's position — tap any index to explore dimensional analysis."
            : "Cinco índices principales de preparación AI rastreando la posición de Costa Rica — toca cualquier índice para explorar análisis dimensional."}
        />
      </ScrollReveal>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
        {indices.map((idx, i) => {
          const isOpen = expandedIdx === idx.id;
          const radarData = idx.dimensions.map((d) => ({
            dim: d.name.length > 18 ? d.name.slice(0, 16) + "…" : d.name,
            cr: d.crScore ?? 0,
            top: d.topScore ?? 0
          }));

          return (
            <ScrollReveal key={idx.id} delay={i * 60}>
              <div ref={(el) => { cardRefs.current[idx.id] = el; }}>
                <Card
                  accent={isOpen ? t.vi : undefined}
                  onClick={() => toggleIdx(idx.id)}
                  style={{ cursor: "pointer" }}
                >
                  {/* ── collapsed header ── */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>{idx.name}</div>
                      <div style={{ fontSize: 11, color: "var(--text3)", ...mono }}>{idx.org} · {idx.year} ({idx.edition})</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <Tag color={idx.scope.includes("LATAM") ? t.am : t.cy}>{idx.scope}</Tag>
                      <Tag color={t.vi}>{idx.countries} {en ? "countries" : "países"}</Tag>
                      {idx.crRank != null && (
                        <span style={{ fontSize: 16, fontWeight: 800, color: t.cy, ...mono }}>
                          #{idx.crRank}
                        </span>
                      )}
                      {idx.crScore != null && (
                        <span style={{ fontSize: 13, color: "var(--text2)", ...mono }}>{idx.crScore}</span>
                      )}
                      {idx.crRank == null && idx.crClassification && (
                        <Tag color={t.gn}>{idx.crClassification}</Tag>
                      )}
                      <span style={{ fontSize: 12, color: "var(--text3)", transition: "transform .2s", transform: isOpen ? "rotate(180deg)" : "none" }}>▼</span>
                    </div>
                  </div>

                  {/* ── expanded detail ── */}
                  {isOpen && (
                    <div style={{ marginTop: 16, borderTop: "1px solid var(--border)", paddingTop: 16 }}>
                      {/* methodology */}
                      <Bx style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: "var(--text3)", ...mono, marginBottom: 4 }}>
                          {en ? "METHODOLOGY" : "METODOLOGÍA"}
                        </div>
                        <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.7, margin: 0 }}>
                          {en ? idx.methodology.en : idx.methodology.es}
                        </p>
                      </Bx>

                      {/* radar chart */}
                      {idx.dimensions.length >= 3 && (
                        <div style={{ marginBottom: 14 }}>
                          <div style={{ fontSize: 11, color: "var(--text3)", ...mono, marginBottom: 6 }}>
                            {en ? "DIMENSIONAL ANALYSIS" : "ANÁLISIS DIMENSIONAL"}
                          </div>
                          <div style={{ width: "100%", height: 280 }}>
                            <ResponsiveContainer>
                              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                                <PolarGrid stroke="var(--border)" />
                                <PolarAngleAxis dataKey="dim" tick={{ fontSize: 10, fill: "var(--text3)" }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9, fill: "var(--text3)" }} />
                                <Radar name={en ? "Costa Rica" : "Costa Rica"} dataKey="cr" stroke={t.cy} fill={t.cy} fillOpacity={0.25} strokeWidth={2} />
                                <Radar name={en ? "Top Country" : "País Líder"} dataKey="top" stroke={t.vi} fill={t.vi} fillOpacity={0.1} strokeWidth={2} strokeDasharray="4 4" />
                                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12, ...mono }} />
                                <Legend wrapperStyle={{ fontSize: 11 }} />
                              </RadarChart>
                            </ResponsiveContainer>
                          </div>
                          {/* dimension detail list */}
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 8, marginTop: 8 }}>
                            {idx.dimensions.map((d, di) => (
                              <Bx key={di} style={{ padding: "8px 12px" }}>
                                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{d.name}</div>
                                <div style={{ fontSize: 10, color: "var(--text3)", marginBottom: 4 }}>{d.description}</div>
                                <div style={{ display: "flex", gap: 10, ...mono, fontSize: 11 }}>
                                  <span style={{ color: t.cy }}>CR: {d.crScore ?? "N/A"}</span>
                                  <span style={{ color: t.vi }}>{en ? "Top" : "Líder"}: {d.topScore} ({d.topCountry})</span>
                                </div>
                              </Bx>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* classification if present */}
                      {idx.classification && (
                        <Bx style={{ marginBottom: 14 }}>
                          <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: "var(--text3)", ...mono, marginBottom: 4 }}>
                            {en ? "CLASSIFICATION" : "CLASIFICACIÓN"}
                          </div>
                          <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.7, margin: 0 }}>
                            {en ? idx.classification.en : idx.classification.es}
                          </p>
                        </Bx>
                      )}

                      {/* CR insight */}
                      <div style={{ padding: "12px 16px", background: `${t.cy}08`, border: `1px solid ${t.cy}20`, borderRadius: 10, borderLeft: `3px solid ${t.cy}` }}>
                        <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: t.cy, ...mono, marginBottom: 4 }}>
                          {en ? "CR INSIGHT" : "PERSPECTIVA CR"}
                        </div>
                        <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
                          {en ? idx.crInsight.en : idx.crInsight.es}
                        </p>
                      </div>

                      {/* link */}
                      <div style={{ marginTop: 10 }}>
                        <Lnk href={idx.url}>{idx.org}</Lnk>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* ════════════════════════════════════════════════════════
         3. ILIA 2025 FULL LEADERBOARD
         ════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <SH
          color={t.am}
          label={en ? "ILIA 2025 · LEADERBOARD" : "ILIA 2025 · TABLA DE POSICIONES"}
          title={en ? "Latin American AI Index Rankings" : "Rankings del Índice Latinoamericano AI"}
          desc={en
            ? "All 19 LATAM countries ranked by composite AI readiness score. Costa Rica highlighted."
            : "Los 19 países LATAM clasificados por puntaje compuesto de preparación AI. Costa Rica destacado."}
        />
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <Card style={{ marginBottom: 16 }}>
          <div style={{ width: "100%", height: Math.max(440, ilia.rankings.length * 26) }}>
            <ResponsiveContainer>
              <BarChart
                data={[...ilia.rankings].reverse()}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" domain={[0, 80]} tick={{ fontSize: 10, fill: "var(--text3)", ...mono }} />
                <YAxis
                  type="category"
                  dataKey="country"
                  width={120}
                  tick={{ fontSize: 11, fill: "var(--text2)" }}
                />
                <Tooltip
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12, ...mono }}
                  formatter={(val) => [`${val.toFixed(2)}`, en ? "Score" : "Puntaje"]}
                />
                <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={16}>
                  {[...ilia.rankings].reverse().map((entry, i) => (
                    <Cell
                      key={i}
                      fill={entry.country === "Costa Rica" ? CR_BAR : (TIER_COLORS[entry.tier] || "#64748b")}
                      stroke={entry.country === "Costa Rica" ? "#fff" : "none"}
                      strokeWidth={entry.country === "Costa Rica" ? 2 : 0}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10, justifyContent: "center" }}>
            {[
              { label: en ? "Leader" : "Líder", color: "#10b981" },
              { label: en ? "Advanced" : "Avanzado", color: "#3b82f6" },
              { label: en ? "Developing" : "En Desarrollo", color: "#f59e0b" },
              { label: en ? "Emerging" : "Emergente", color: "#f97316" },
              { label: en ? "Early" : "Temprano", color: "#ef4444" },
              { label: "Costa Rica", color: CR_BAR }
            ].map((l) => (
              <span key={l.label} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, color: "var(--text3)", ...mono }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: l.color, display: "inline-block" }} />
                {l.label}
              </span>
            ))}
          </div>
        </Card>
      </ScrollReveal>

      {/* CR Highlights from ILIA */}
      <ScrollReveal delay={150}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text)", marginBottom: 8, ...mono }}>
          {en ? "CR DIMENSIONAL HIGHLIGHTS" : "DESTACADOS DIMENSIONALES CR"}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 10, marginBottom: 32 }}>
          {ilia.crHighlights.map((h, i) => (
            <Card key={i} accent={i === 0 ? t.gn : i === ilia.crHighlights.length - 1 ? t.rd : undefined}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{h.dimension}</span>
                <Tag color={h.rank <= 5 ? t.gn : h.rank <= 7 ? t.am : t.rd}>#{h.rank}</Tag>
              </div>
              <p style={{ fontSize: 11, color: "var(--text2)", lineHeight: 1.65, margin: 0 }}>{h.insight}</p>
            </Card>
          ))}
        </div>
      </ScrollReveal>

      {/* ════════════════════════════════════════════════════════
         4. INDEX CONSTRUCTION METHODOLOGY
         ════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <SH
          color={t.or}
          label={en ? "METHODOLOGY" : "METODOLOGÍA"}
          title={en ? "Composite Index Construction" : "Construcción de Índice Compuesto"}
          desc={en ? methodology.description.en : methodology.description.es}
        />
      </ScrollReveal>

      {/* 8-step process */}
      <ScrollReveal delay={80}>
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "var(--text3)", ...mono, marginBottom: 14 }}>
            {en ? "8-STEP PROCESS" : "PROCESO DE 8 PASOS"}
          </div>
          <div style={{ position: "relative", paddingLeft: 36 }}>
            {/* vertical line */}
            <div style={{ position: "absolute", left: 14, top: 4, bottom: 4, width: 2, background: `linear-gradient(to bottom, ${t.or}, ${t.vi})`, borderRadius: 1 }} />
            {methodology.methodologySteps.map((s, i) => (
              <div key={s.step} style={{ position: "relative", marginBottom: i < methodology.methodologySteps.length - 1 ? 20 : 0 }}>
                {/* number circle */}
                <div style={{
                  position: "absolute", left: -36, top: 0,
                  width: 28, height: 28, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${t.or}, ${t.vi})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 800, color: "#fff", ...mono,
                  boxShadow: `0 0 8px ${t.or}40`
                }}>
                  {s.step}
                </div>
                <div style={{ paddingTop: 2 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text2)", lineHeight: 1.65 }}>{s.description}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </ScrollReveal>

      {/* methodology tools */}
      <ScrollReveal delay={120}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "var(--text3)", ...mono, marginBottom: 10 }}>
          {en ? "METHODOLOGY TOOLS" : "HERRAMIENTAS METODOLÓGICAS"}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 10, marginBottom: 32 }}>
          {methodology.tools.map((tool, i) => {
            const tc = [t.cy, t.vi, t.or][i] || t.cy;
            return (
              <Card key={tool.name} accent={tc}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: tc, ...mono }}>{tool.name}</div>
                    <div style={{ fontSize: 10, color: "var(--text3)" }}>{tool.fullName}</div>
                  </div>
                  <Tag color={tc}>{tool.language}</Tag>
                </div>
                <p style={{ fontSize: 11, color: "var(--text2)", lineHeight: 1.65, margin: "0 0 8px 0" }}>
                  {en ? tool.description.en : tool.description.es}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
                  {tool.capabilities.map((c, ci) => (
                    <span key={ci} style={{ fontSize: 9, padding: "2px 8px", background: `${tc}10`, color: tc, borderRadius: 10, ...mono }}>{c}</span>
                  ))}
                </div>
                <Lnk href={tool.url}>{tool.name} {en ? "docs" : "docs"}</Lnk>
              </Card>
            );
          })}
        </div>
      </ScrollReveal>

      {/* ════════════════════════════════════════════════════════
         5. CR READINESS SWOT PROFILE
         ════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <SH
          color={t.gn}
          label={en ? "STRATEGIC PROFILE" : "PERFIL ESTRATÉGICO"}
          title={en ? "Costa Rica — Strengths & Weaknesses" : "Costa Rica — Fortalezas y Debilidades"}
          desc={en ? profile.overallAssessment.en : profile.overallAssessment.es}
        />
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <Grid cols="1fr 1fr" gap={14} style={{ marginBottom: 32 }}>
          {/* Strengths column */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.gn, marginBottom: 8, ...mono, display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="check-circle" size={14} color={t.gn} />
              {en ? "STRENGTHS" : "FORTALEZAS"}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {profile.strengths.map((s, i) => (
                <Card key={i} style={{ borderLeft: `3px solid ${t.gn}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{s.area}</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: t.gn, ...mono }}>{s.score}/{s.maxScore}</span>
                  </div>
                  {/* score bar */}
                  <div style={{ width: "100%", height: 6, background: "var(--surface)", borderRadius: 3, marginBottom: 6, overflow: "hidden" }}>
                    <div style={{
                      width: `${(s.score / s.maxScore) * 100}%`, height: "100%",
                      background: `linear-gradient(90deg, ${t.gn}80, ${t.gn})`,
                      borderRadius: 3, transition: "width .6s ease"
                    }} />
                  </div>
                  <p style={{ fontSize: 11, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>
                    {en ? s.detail.en : s.detail.es}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Weaknesses column */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.rd, marginBottom: 8, ...mono, display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="alert-triangle" size={14} color={t.rd} />
              {en ? "WEAKNESSES" : "DEBILIDADES"}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {profile.weaknesses.map((w, i) => (
                <Card key={i} style={{ borderLeft: `3px solid ${t.rd}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{w.area}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Tag color={t.rd}>{w.gap}</Tag>
                      <span style={{ fontSize: 12, fontWeight: 800, color: t.rd, ...mono }}>{w.score}/{w.maxScore}</span>
                    </div>
                  </div>
                  {/* score bar */}
                  <div style={{ width: "100%", height: 6, background: "var(--surface)", borderRadius: 3, marginBottom: 6, overflow: "hidden" }}>
                    <div style={{
                      width: `${(w.score / w.maxScore) * 100}%`, height: "100%",
                      background: `linear-gradient(90deg, ${t.rd}80, ${t.rd})`,
                      borderRadius: 3, transition: "width .6s ease"
                    }} />
                  </div>
                  <p style={{ fontSize: 11, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>
                    {en ? w.detail.en : w.detail.es}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </Grid>
      </ScrollReveal>

      {/* ════════════════════════════════════════════════════════
         6. STRATEGIC PRIORITIES
         ════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <SH
          color={t.pk}
          label={en ? "ROADMAP" : "HOJA DE RUTA"}
          title={en ? "Strategic Priorities" : "Prioridades Estratégicas"}
          desc={en
            ? "Five actionable priorities for advancing Costa Rica's AI readiness, organized by timeline."
            : "Cinco prioridades accionables para avanzar la preparación AI de Costa Rica, organizadas por línea de tiempo."}
        />
      </ScrollReveal>

      <div style={{ position: "relative", paddingLeft: 20, marginBottom: 32 }}>
        {/* timeline line */}
        <div style={{ position: "absolute", left: 8, top: 10, bottom: 10, width: 2, background: `linear-gradient(to bottom, ${t.pk}, ${t.cy})`, borderRadius: 1 }} />

        {profile.strategicPriorities.map((p, i) => {
          const isShort = p.timeline.includes("2026") || p.timeline.includes("2025-2026");
          const isMed = p.timeline.includes("2027");
          const isLong = p.timeline.includes("2028") || p.timeline.includes("2029") || p.timeline.includes("2030");
          const timeColor = isShort ? t.gn : isMed ? t.am : t.or;
          const timeLabel = isShort
            ? (en ? "Short-term" : "Corto plazo")
            : isMed
              ? (en ? "Medium-term" : "Mediano plazo")
              : (en ? "Long-term" : "Largo plazo");

          return (
            <ScrollReveal key={p.priority} delay={i * 80}>
              <div style={{ position: "relative", marginBottom: 14 }}>
                {/* dot on timeline */}
                <div style={{
                  position: "absolute", left: -20, top: 14,
                  width: 14, height: 14, borderRadius: "50%",
                  background: timeColor, border: "2px solid var(--card)",
                  boxShadow: `0 0 6px ${timeColor}60`
                }} />

                <Card style={{ marginLeft: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 6, marginBottom: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 18, fontWeight: 800, color: t.pk, ...mono }}>P{p.priority}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", ...display }}>{p.action}</span>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <Tag color={timeColor}>{timeLabel}</Tag>
                      <Tag color="var(--text3)">{p.timeline}</Tag>
                    </div>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.7, margin: 0 }}>
                    {en ? p.detail.en : p.detail.es}
                  </p>
                </Card>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* ── Index Positions Summary ── */}
      <ScrollReveal delay={100}>
        <Card style={{ marginBottom: 20, background: `${t.cy}06`, border: `1px solid ${t.cy}15` }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: t.cy, ...mono, marginBottom: 10 }}>
            {en ? "INDEX POSITIONS SUMMARY" : "RESUMEN DE POSICIONES EN ÍNDICES"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 8 }}>
            {profile.indexPositions.map((ip, i) => (
              <Bx key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text)" }}>{ip.index}</div>
                  <div style={{ fontSize: 10, color: "var(--text3)", ...mono }}>{ip.score}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: t.cy, ...mono }}>{ip.rank}</span>
                  <span style={{ fontSize: 12, color: ip.trend === "up" ? t.gn : "var(--text3)" }}>
                    {ip.trend === "up" ? "↑" : ip.trend === "down" ? "↓" : "→"}
                  </span>
                </div>
              </Bx>
            ))}
          </div>
        </Card>
      </ScrollReveal>

      {/* ── Source attribution ── */}
      <div style={{ fontSize: 10, color: "var(--text3)", ...mono, textAlign: "center", padding: "8px 0 16px" }}>
        {en
          ? "Sources: ILIA/CENIA 2025, Oxford Insights 2024, Portulans NRI 2024, IESE CIMI 2024, World Bank AIPI 2024, COINr, SALib, PyMC"
          : "Fuentes: ILIA/CENIA 2025, Oxford Insights 2024, Portulans NRI 2024, IESE CIMI 2024, Banco Mundial AIPI 2024, COINr, SALib, PyMC"}
      </div>
    </div>
  );
}
