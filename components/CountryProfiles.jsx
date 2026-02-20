"use client";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { CO, CC, DM, GOV, COUNTRY_PROFILES, EOS_RISKS, A3_TO_A2, AI_OVERPERFORMER_CONTEXT } from "./data";
import { Card, SH, Tag, Grid, AN, ScrollReveal, DimBadge, ScorePill, Ci, Lnk, CountryLabel, MiniStat, Flag, fadeUp } from "./ui";

/* ═══════════════════════════════════════════════════════════════
   COUNTRY PROFILES v13 — 20-country deep-dives (NEW TAB)
   Grid selector → full profile with radar, governance, strategy
   ═══════════════════════════════════════════════════════════════ */

export function Countries({ en, t, idx, board, govData, dark, selectedCountry, setSelectedCountry }) {
  const [selected, setSelected] = useState(selectedCountry || "CRI");

  useEffect(() => {
    if (selectedCountry && selectedCountry !== selected) {
      setSelected(selectedCountry);
    }
  }, [selectedCountry]);
  const profiles = COUNTRY_PROFILES(en);
  const co = CO[selected];
  const scores = idx[selected];
  const gov = govData[selected];
  const profile = profiles[selected];
  const rank = board.findIndex(b => b.code === selected) + 1;

  /* Radar data: selected country vs CR */
  const radarData = Object.entries(DM).map(([dk, d]) => ({
    dim: en ? d.e : d.l,
    [selected]: idx[selected]?.[dk] != null ? +(idx[selected][dk] * 100).toFixed(1) : 0,
    ...(selected !== "CRI" ? { CRI: idx.CRI?.[dk] != null ? +(idx.CRI[dk] * 100).toFixed(1) : 0 } : {})
  }));

  /* Region grouping for selector */
  const groups = useMemo(() => {
    const g = {};
    CC.forEach(c => {
      const r = CO[c].cont || "Other";
      if (!g[r]) g[r] = [];
      g[r].push(c);
    });
    return g;
  }, []);

  return (
    <div>
      <SH color={t.gn} label={en ? "Deep Dive" : "Análisis Profundo"} title={en ? "Country AI Profiles" : "Perfiles AI por País"} desc={en ? "Select any of the 20 peer countries for a full AI readiness profile. Governance data, strategy, and what Costa Rica can learn from each." : "Selecciona cualquiera de los 20 países pares para un perfil completo de preparación AI. Datos de gobernanza, estrategia, y qué puede aprender CR de cada uno."} />

      {/* Country grid selector */}
      <Card style={{ marginBottom: 24, padding: 16 }}>
        {Object.entries(groups).map(([region, codes]) => (
          <div key={region} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 6 }}>{region}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {codes.map(c => (
                <button key={c} onClick={() => setSelected(c)}
                  className={`country-card ${selected === c ? "selected" : ""}`}
                  style={{ padding: "6px 12px", border: `1px solid ${selected === c ? t.cy : t.bd}`, borderRadius: 8, background: selected === c ? `${t.cy}08` : t.cardBg, fontSize: 13, display: "flex", alignItems: "center", gap: 6, color: selected === c ? t.cy : t.tx2, fontWeight: selected === c ? 600 : 400 }}>
                  <Flag code={A3_TO_A2[c]} size={18} />
                  <span className="hide-xs">{en ? CO[c].e : CO[c].n}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </Card>

      {/* Profile content */}
      <AnimatePresence mode="wait">
        <motion.div key={selected} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
          {/* Country header */}
          <Card accent={t.cy} style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ marginBottom: 4 }}><Flag code={A3_TO_A2[selected]} size={40} /></div>
                <h3 style={{ fontSize: 22, fontWeight: 800, fontFamily: "var(--font-display, 'Playfair Display', serif)" }}>{en ? co.e : co.n}</h3>
                <div style={{ fontSize: 12, color: t.tx2, marginTop: 2 }}>{co.w}</div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Tag color={t.cy}>#{rank}</Tag>
                {scores?.composite != null && <ScorePill score={scores.composite} en={en} />}
              </div>
            </div>
            <Grid cols="repeat(auto-fit,minmax(100px,1fr))" gap={8} style={{ marginTop: 16 }}>
              <MiniStat label={en ? "Population" : "Población"} value={co.pop} />
              <MiniStat label="GDP" value={co.gdp} />
              <MiniStat label="CAPI-CR" value={scores?.composite != null ? (scores.composite * 100).toFixed(1) : "—"} color={t.cy} mono />
              <MiniStat label={en ? "Region" : "Región"} value={co.cont} />
              {gov && <MiniStat label="HDI" value={gov.hdi?.toFixed(3) || "—"} color={gov.hdi >= 0.8 ? t.gn : gov.hdi >= 0.7 ? t.am : t.rd} />}
              {gov && <MiniStat label="Oxford AI" value={gov.oxai ? `${gov.oxai.toFixed(1)}/10` : "—"} color={gov.oxai >= 6 ? t.gn : gov.oxai >= 4 ? t.am : t.rd} />}
            </Grid>
          </Card>

          {/* AI Overperformer explanation */}
          {selected === "CRI" && (
            <Card style={{ marginBottom: 16, borderLeft: `3px solid ${t.gn}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 18 }}>🏆</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: t.gn }}>
                    {AI_OVERPERFORMER_CONTEXT(en).title}
                  </div>
                  <div style={{ fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace" }}>
                    {AI_OVERPERFORMER_CONTEXT(en).source}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7, marginBottom: 12 }}>
                {AI_OVERPERFORMER_CONTEXT(en).explanation}
              </p>
              <div style={{ fontSize: 11, fontWeight: 600, color: t.tx, marginBottom: 6 }}>
                {en ? "Key Factors:" : "Factores Clave:"}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {AI_OVERPERFORMER_CONTEXT(en).keyFactors.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6, fontSize: 12, color: t.tx2 }}>
                    <span style={{ color: t.gn, flexShrink: 0, marginTop: 2 }}>✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 10, fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace" }}>
                {en ? "Peer overperformers: " : "Pares sobrerendimiento: "}
                {AI_OVERPERFORMER_CONTEXT(en).peers.join(", ")}
              </div>
            </Card>
          )}

          {/* Radar: selected vs CR */}
          <Card style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.vi, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
              {en ? "DIMENSION PROFILE" : "PERFIL DIMENSIONAL"}
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke={dark ? "#1e293b" : "#d1d5e0"} />
                <PolarAngleAxis dataKey="dim" tick={{ fontSize: 10, fill: dark ? "#94a3b8" : "#475569" }} />
                <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                <Radar dataKey={selected} stroke={t.cy} fill={t.cy} fillOpacity={0.15} strokeWidth={2} />
                {selected !== "CRI" && <Radar dataKey="CRI" stroke={t.or} fill={t.or} fillOpacity={0.06} strokeWidth={1.5} strokeDasharray="4 2" />}
                <Tooltip contentStyle={{ background: dark ? "#111827" : "#fff", border: `1px solid ${dark ? "#1e293b" : "#d1d5e0"}`, borderRadius: 8, fontSize: 12 }} />
              </RadarChart>
            </ResponsiveContainer>
            {selected !== "CRI" && (
              <div style={{ display: "flex", gap: 16, justifyContent: "center", fontSize: 12, marginTop: 4 }}>
                <span><span style={{ color: t.cy }}>●</span> {en ? co.e : co.n}</span>
                <span><span style={{ color: t.or }}>●</span> Costa Rica</span>
              </div>
            )}
          </Card>

          {/* Dimension scores */}
          <Grid cols="repeat(auto-fit,minmax(150px,1fr))" gap={10} style={{ marginBottom: 16 }}>
            {Object.entries(DM).map(([dk, d]) => (
              <Card key={dk} d={0.02}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <span style={{ color: d.co, fontSize: 14 }}>{d.ic}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: d.co }}>{en ? d.e : d.l}</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'IBM Plex Mono',monospace", color: scores?.[dk] >= 0.65 ? t.gn : scores?.[dk] >= 0.40 ? t.am : t.rd }}>
                  {scores?.[dk] != null ? <AN v={scores[dk] * 100} p={1} /> : "—"}
                </div>
              </Card>
            ))}
          </Grid>

          {/* Governance data */}
          {gov && (
            <Card style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.am, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
                {en ? "GOVERNANCE INDICATORS" : "INDICADORES DE GOBERNANZA"}
              </div>
              <Grid cols="repeat(auto-fit,minmax(120px,1fr))" gap={8}>
                <MiniStat label="CPI" value={gov.cpi + "/100"} color={gov.cpi >= 50 ? t.gn : t.rd} />
                <MiniStat label="Freedom House" value={gov.fh + "/100"} color={gov.fh >= 70 ? t.gn : gov.fh >= 40 ? t.am : t.rd} />
                <MiniStat label="GPI" value={gov.gpi.toFixed(2)} color={gov.gpi <= 1.6 ? t.gn : gov.gpi <= 2.0 ? t.am : t.rd} />
                <MiniStat label="Oxford AI" value={gov.oxai.toFixed(2) + "/10"} color={gov.oxai >= 6 ? t.gn : gov.oxai >= 4 ? t.am : t.rd} />
                <MiniStat label="HDI" value={gov.hdi.toFixed(3)} color={gov.hdi >= 0.8 ? t.gn : gov.hdi >= 0.7 ? t.am : t.rd} />
                <MiniStat label="V-Dem" value={gov.vdem.toFixed(2)} color={gov.vdem >= 0.7 ? t.gn : gov.vdem >= 0.4 ? t.am : t.rd} />
              </Grid>
              <Ci s="Transparency Int'l, Freedom House, IEP, Oxford Insights, UNDP, V-Dem" />
            </Card>
          )}

          {/* WEF 2026 EOS — Executive Risk Perception (if available) */}
          {EOS_RISKS[selected] && (
            <Card accent={t.or} style={{ marginBottom: 16, background: `${t.or}04` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 6 }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.or, fontFamily: "'IBM Plex Mono',monospace" }}>
                  {en ? "WEF 2026 — EXECUTIVE RISK PERCEPTION" : "WEF 2026 — PERCEPCIÓN RIESGO EJECUTIVO"}
                </div>
                {EOS_RISKS[selected].partner && (
                  <span style={{ fontSize: 9, padding: "3px 8px", borderRadius: 4, background: `${t.or}10`, color: t.or, fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>
                    {EOS_RISKS[selected].partner}
                  </span>
                )}
              </div>
              <div style={{ fontSize: 10, color: t.tx3, marginBottom: 8, fontFamily: "'IBM Plex Mono',monospace" }}>
                {en ? "Top 5 risks identified by business leaders (EOS)" : "Top 5 riesgos identificados por líderes empresariales (EOS)"}
              </div>
              {EOS_RISKS[selected].risks.map((r, i) => {
                const catColor = r.cat === "tech" ? t.vi : r.cat === "econ" ? t.am : r.cat === "env" ? t.gn : r.cat === "geo" ? t.rd : t.or;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: i < 4 ? `1px solid ${t.bd}` : "none" }}>
                    <span style={{ width: 20, fontSize: 11, fontWeight: 700, color: t.or, fontFamily: "'IBM Plex Mono',monospace", textAlign: "center" }}>#{i + 1}</span>
                    <span style={{ flex: 1, fontSize: 12, color: t.tx, fontWeight: r.risk.includes("AI") ? 700 : 400 }}>
                      {r.risk}{r.risk.includes("AI") ? " ⚡" : ""}
                    </span>
                    <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 3, background: `${catColor}10`, color: catColor, fontFamily: "'IBM Plex Mono',monospace" }}>
                      {r.cat}
                    </span>
                  </div>
                );
              })}
              {/* Highlight: AI absent from top 5 */}
              {!EOS_RISKS[selected].risks.some(r => r.risk.includes("AI")) && (
                <div style={{ marginTop: 8, padding: "6px 10px", background: `${t.rd}06`, borderRadius: 6, borderLeft: `3px solid ${t.rd}`, fontSize: 11, color: t.tx2 }}>
                  {en ? `⚠ No AI/technology risks in ${co.e}'s top 5. Compare: US ranks AI #4, South Korea #5, Vietnam #1.` : `⚠ Sin riesgos AI/tecnología en top 5 de ${co.n}. Compare: EEUU ranquea AI #4, Corea del Sur #5, Vietnam #1.`}
                </div>
              )}
              {/* Highlight: AI at #1 (Vietnam) */}
              {EOS_RISKS[selected].risks[0]?.risk.includes("AI") && (
                <div style={{ marginTop: 8, padding: "6px 10px", background: `${t.vi}06`, borderRadius: 6, borderLeft: `3px solid ${t.vi}`, fontSize: 11, color: t.tx2 }}>
                  {en ? "⚡ AI adverse outcomes ranked #1 — highest national priority among all 116 EOS economies." : "⚡ Resultados adversos AI ranqueado #1 — máxima prioridad nacional entre las 116 economías EOS."}
                </div>
              )}
              {/* Highlight: AI in top 5 but not #1 */}
              {EOS_RISKS[selected].risks.some(r => r.risk.includes("AI")) && !EOS_RISKS[selected].risks[0]?.risk.includes("AI") && (() => {
                const aiRank = EOS_RISKS[selected].risks.findIndex(r => r.risk.includes("AI")) + 1;
                return (
                  <div style={{ marginTop: 8, padding: "6px 10px", background: `${t.cy}06`, borderRadius: 6, borderLeft: `3px solid ${t.cy}`, fontSize: 11, color: t.tx2 }}>
                    {en ? `✓ AI risks recognized at #${aiRank} — business leaders are aware. CR has zero AI risks in its top 5.` : `✓ Riesgos AI reconocidos en #${aiRank} — líderes empresariales conscientes. CR tiene cero riesgos AI en su top 5.`}
                  </div>
                );
              })()}
              <Ci s="WEF Global Risks Report 2026 — Executive Opinion Survey" />
            </Card>
          )}

          {/* AI Strategy profile (if available) */}
          {profile && (
            <>
              <Card accent={t.gn} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.gn, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
                  {en ? "AI STRATEGY" : "ESTRATEGIA AI"}
                </div>
                <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7, marginBottom: 10 }}>{profile.strategy}</p>
                <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{en ? "Key Institutions" : "Instituciones Clave"}</div>
                <p style={{ fontSize: 12, color: t.tx2, marginBottom: 12 }}>{profile.institutions}</p>
                <div style={{ fontSize: 12, fontWeight: 600, color: t.cy, marginBottom: 6 }}>{en ? "What CR Can Learn" : "Qué Puede Aprender CR"}</div>
                {profile.learn.map((l, i) => (
                  <div key={i} style={{ fontSize: 13, color: t.tx, padding: "6px 0 6px 14px", borderBottom: `1px solid ${t.bd}` }}>▸ {l}</div>
                ))}
              </Card>

              {/* Strengths & Weaknesses */}
              {(profile.strengths || profile.weaknesses) && (
                <Grid cols="1fr 1fr" gap={12} style={{ marginBottom: 16 }}>
                  {profile.strengths && (
                    <Card accent={t.gn} style={{ background: `${t.gn}04` }}>
                      <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: t.gn, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 8 }}>
                        {en ? "STRENGTHS" : "FORTALEZAS"}
                      </div>
                      {profile.strengths.map((s, i) => (
                        <div key={i} style={{ display: "flex", gap: 6, alignItems: "flex-start", padding: "5px 0", borderBottom: i < profile.strengths.length - 1 ? `1px solid ${t.bd}` : "none" }}>
                          <span style={{ color: t.gn, fontSize: 12, flexShrink: 0, marginTop: 1 }}>+</span>
                          <span style={{ fontSize: 12, color: t.tx2, lineHeight: 1.5 }}>{s}</span>
                        </div>
                      ))}
                    </Card>
                  )}
                  {profile.weaknesses && (
                    <Card accent={t.rd} style={{ background: `${t.rd}04` }}>
                      <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: t.rd, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 8 }}>
                        {en ? "WEAKNESSES / GAPS" : "DEBILIDADES / BRECHAS"}
                      </div>
                      {profile.weaknesses.map((w, i) => (
                        <div key={i} style={{ display: "flex", gap: 6, alignItems: "flex-start", padding: "5px 0", borderBottom: i < profile.weaknesses.length - 1 ? `1px solid ${t.bd}` : "none" }}>
                          <span style={{ color: t.rd, fontSize: 12, flexShrink: 0, marginTop: 1 }}>−</span>
                          <span style={{ fontSize: 12, color: t.tx2, lineHeight: 1.5 }}>{w}</span>
                        </div>
                      ))}
                    </Card>
                  )}
                </Grid>
              )}
            </>
          )}

          {/* No profile available */}
          {!profile && (
            <Card style={{ marginBottom: 16, textAlign: "center", padding: "32px 20px" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>📋</div>
              <p style={{ fontSize: 14, color: t.tx2 }}>{en ? "Detailed AI strategy profile coming soon for this country." : "Perfil detallado de estrategia AI próximamente para este país."}</p>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
