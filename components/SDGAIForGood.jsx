"use client";
import { useState } from "react";
import { Card, SH, Grid, ScrollReveal, Tag, Ci, ProgressBar, MiniStat } from "./ui";
import { Icon } from "./system/Icon";
import { Flag } from "./ui";
import { SDG_ALIGNMENT, FIVE_PATHWAYS, OBSERVATORY_IMPACT } from "./data";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Sustainable Development Goals & AI for Good
   SDG Alignment Matrix · Five Pathways · UN Partnership · Impact
   ═══════════════════════════════════════════════════════════════ */

/* ── Official SDG Emoji/Unicode icons (fallback) ── */
const SDG_ICONS = { 4: "📚", 8: "💼", 9: "🏭", 10: "⚖️", 11: "🏙️", 13: "🌍", 16: "🕊️", 17: "🤝" };

/* ── UN Agencies used by the observatory ── */
const UN_AGENCIES = (en) => [
  { name: "World Bank", role: en ? "Real-time economic indicators, AI readiness data" : "Indicadores económicos en tiempo real, datos preparación AI", domain: "worldbank.org" },
  { name: "UNESCO", role: en ? "Education metrics, AI ethics frameworks" : "Métricas educativas, marcos éticos AI", domain: "unesco.org" },
  { name: "UNDP", role: en ? "Human development indices, digital inclusion" : "Índices desarrollo humano, inclusión digital", domain: "undp.org" },
  { name: "ILO", role: en ? "Labor market data, employment transition analysis" : "Datos mercado laboral, análisis transición empleo", domain: "ilo.org" },
  { name: "FAO", role: en ? "Agricultural AI applications, food security" : "Aplicaciones AI agrícolas, seguridad alimentaria", domain: "fao.org" },
  { name: "ITU", role: en ? "AI Readiness Framework, digital infrastructure metrics" : "Marco Preparación AI, métricas infraestructura digital", domain: "itu.int" },
];

export function SDG({ en, t }) {
  const [expandedSDG, setExpandedSDG] = useState(null);
  const [expandedPathway, setExpandedPathway] = useState(null);
  const sdgs = SDG_ALIGNMENT(en);
  const pathways = FIVE_PATHWAYS(en);
  const agencies = UN_AGENCIES(en);
  const impact = OBSERVATORY_IMPACT;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      {/* ── HEADER ── */}
      <SH
        color={t.gn}
        label={en ? "UNITED NATIONS ALIGNMENT" : "ALINEAMIENTO NACIONES UNIDAS"}
        title={en ? "Sustainable Development Goals" : "Objetivos de Desarrollo Sostenible"}
        desc={en
          ? "How the Colibrii Labs AI Observatory advances the UN Sustainable Development Goals and aligns with the ITU AI for Good initiative."
          : "Cómo el Observatorio AI de Colibrii Labs avanza los Objetivos de Desarrollo Sostenible de la ONU y se alinea con la iniciativa AI for Good de la UIT."
        }
      />

      {/* ── INTRO CONTEXT BOX ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16, background: `${t.gn}06`, border: `1px solid ${t.gn}20` }}>
          <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7, margin: 0 }}>
            {en
              ? "The United Nations has 17 Sustainable Development Goals (SDGs) — a universal blueprint for peace, prosperity, and environmental stewardship by 2030. The ITU (International Telecommunication Union), the UN's tech agency, leads the AI for Good initiative connecting AI innovators with the UN system. This section shows how Colibrii Labs contributes to these global goals."
              : "Las Naciones Unidas tienen 17 Objetivos de Desarrollo Sostenible (ODS) — un plan universal para la paz, prosperidad y gestión ambiental para 2030. La UIT (Unión Internacional de Telecomunicaciones), la agencia tecnológica de la ONU, lidera la iniciativa AI for Good conectando innovadores de AI con el sistema ONU. Esta sección muestra cómo Colibrii Labs contribuye a estos objetivos globales."
            }
          </p>
        </Card>
      </ScrollReveal>

      {/* ── AI FOR GOOD INITIATIVE CONTEXT ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16, background: `linear-gradient(135deg, ${t.gn}08, ${t.cy}08)` }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.gn, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 8 }}>
            {en ? "AI FOR GOOD INITIATIVE" : "INICIATIVA AI FOR GOOD"}
          </div>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: t.tx, marginBottom: 8 }}>
            {en ? "What is AI for Good?" : "¿Qué es AI for Good?"}
          </h3>
          <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7, marginBottom: 12 }}>
            {en
              ? "AI for Good is the United Nations platform for AI innovation, hosted by the ITU in partnership with 40+ UN agencies. It identifies practical AI applications that advance the SDGs, connecting innovators with decision-makers to scale solutions globally."
              : "AI for Good es la plataforma de Naciones Unidas para innovación AI, organizada por la UIT en alianza con 40+ agencias ONU. Identifica aplicaciones AI prácticas que avanzan los ODS, conectando innovadores con tomadores de decisiones para escalar soluciones globalmente."
            }
          </p>
          <Grid cols="repeat(auto-fit, minmax(140px, 1fr))" gap={8}>
            {[
              { label: en ? "AI for People" : "AI para Personas", icon: "🧑", color: "#2563eb",
                desc: en ? "Health, education, humanitarian" : "Salud, educación, humanitario" },
              { label: en ? "AI for Planet" : "AI para el Planeta", icon: "🌍", color: "#10b981",
                desc: en ? "Climate, environment, sustainability" : "Clima, ambiente, sostenibilidad" },
              { label: en ? "AI for Prosperity" : "AI para Prosperidad", icon: "📈", color: "#f59e0b",
                desc: en ? "Economic growth, decent work, innovation" : "Crecimiento económico, trabajo, innovación" },
            ].map((cat, i) => (
              <div key={i} style={{
                padding: 10, borderRadius: 8, background: t.sf,
                border: cat.label.includes("Prosperity") || cat.label.includes("Prosperidad") ? `2px solid ${cat.color}` : `1px solid ${t.bd}`,
              }}>
                <div style={{ fontSize: 18, marginBottom: 2 }}>{cat.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: cat.color }}>{cat.label}</div>
                <div style={{ fontSize: 10, color: t.tx3, marginTop: 2 }}>{cat.desc}</div>
                {(cat.label.includes("Prosperity") || cat.label.includes("Prosperidad")) && (
                  <Tag color={cat.color}>{en ? "Our Category" : "Nuestra Categoría"}</Tag>
                )}
              </div>
            ))}
          </Grid>
          <Ci s="ITU — AI for Good Global Summit · aiforgood.itu.int" />
        </Card>
      </ScrollReveal>

      {/* ── IMPACT STATS BAR ── */}
      <ScrollReveal>
        <Grid cols="repeat(auto-fit, minmax(130px, 1fr))" gap={8} className="mobile-stat-grid" style={{ marginBottom: 16 }}>
          {[
            { label: en ? "SDGs Aligned" : "ODS Alineados", value: impact.sdgsAligned, color: t.gn, icon: "globe",
              sub: en ? "of 17 UN goals directly advanced" : "de 17 objetivos ONU avanzados directamente" },
            { label: en ? "UN Agencies" : "Agencias ONU", value: impact.unAgencies, color: t.cy, icon: "info",
              sub: en ? "World Bank, UNESCO, UNDP, ILO, FAO, ITU" : "Banco Mundial, UNESCO, PNUD, OIT, FAO, UIT" },
            { label: en ? "Countries" : "Países", value: impact.countries, color: t.vi, icon: "globe",
              sub: en ? "peer nations tracked in real-time" : "naciones pares rastreadas en tiempo real" },
            { label: en ? "Data Sources" : "Fuentes Datos", value: impact.dataSources, color: t.am, icon: "chart",
              sub: en ? "international verified reports" : "reportes internacionales verificados" },
            { label: en ? "Live APIs" : "APIs en Vivo", value: impact.liveApis, color: t.pk, icon: "lightning",
              sub: en ? "real-time data feeds active" : "feeds de datos en tiempo real activos" },
            { label: en ? "Analysis Views" : "Vistas Análisis", value: impact.analysisViews, color: t.or, icon: "algo",
              sub: en ? "interactive intelligence panels" : "paneles de inteligencia interactivos" },
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

      {/* ── SDG ALIGNMENT MATRIX ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.gn, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
            {en ? "SDG ALIGNMENT MATRIX" : "MATRIZ ALINEAMIENTO ODS"}
          </div>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: t.tx, marginBottom: 4 }}>
            {en ? "8 Sustainable Development Goals" : "8 Objetivos de Desarrollo Sostenible"}
          </h3>
          <p style={{ fontSize: 13, color: t.tx2, marginBottom: 14, lineHeight: 1.6 }}>
            {en
              ? "The observatory directly contributes to 8 of the 17 UN SDGs through transparent AI measurement, policy analysis, and open data access."
              : "El observatorio contribuye directamente a 8 de los 17 ODS de la ONU mediante medición transparente de AI, análisis de políticas y acceso abierto a datos."
            }
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
            {sdgs.map((sdg) => {
              const isExpanded = expandedSDG === sdg.id;
              return (
                <div
                  key={sdg.id}
                  onClick={() => setExpandedSDG(isExpanded ? null : sdg.id)}
                  role="button"
                  tabIndex={0}
                  style={{
                    padding: 12,
                    borderRadius: 10,
                    border: `1px solid ${isExpanded ? sdg.color : t.bd}`,
                    background: isExpanded ? `${sdg.color}08` : t.sf,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 18 }}>{SDG_ICONS[sdg.id]}</span>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: sdg.color, fontFamily: "'IBM Plex Mono',monospace" }}>
                        {en ? "SDG" : "ODS"} {sdg.id}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: t.tx }}>{sdg.name}</div>
                    </div>
                  </div>
                  {isExpanded && (
                    <div style={{ marginTop: 6 }}>
                      <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6, marginBottom: 6 }}>{sdg.contribution}</p>
                      <div style={{ fontSize: 11, color: sdg.color, fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>{sdg.metric}</div>
                    </div>
                  )}
                  {!isExpanded && (
                    <div style={{ fontSize: 11, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace" }}>
                      {en ? "tap to expand" : "toque para expandir"} ▸
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <Ci s="United Nations SDG Framework · ITU AI for Good Reports 2026" />
        </Card>
      </ScrollReveal>

      {/* ── FIVE PATHWAYS (ITU Framework) ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.cy, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
            {en ? "ITU FRAMEWORK" : "MARCO UIT"}
          </div>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: t.tx, marginBottom: 4 }}>
            {en ? "Five Pathways to AI Readiness" : "Cinco Vías hacia la Preparación AI"}
          </h3>
          <p style={{ fontSize: 13, color: t.tx2, marginBottom: 14, lineHeight: 1.6 }}>
            {en
              ? "From the ITU report 'Unlocking AI's Potential to Serve Humanity' (Jan 2026). The ITU (International Telecommunication Union) is the UN's technology agency. Each pathway shows Costa Rica's current status."
              : "Del reporte de la UIT (Unión Internacional de Telecomunicaciones, agencia tecnológica de la ONU) 'Desbloqueando el Potencial de AI para Servir a la Humanidad' (enero 2026). Cada vía muestra el estado actual de Costa Rica."
            }
          </p>

          {/* Pathway flow diagram */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14, justifyContent: "center" }}>
            {pathways.map((p, i) => (
              <div
                key={p.id}
                onClick={() => setExpandedPathway(expandedPathway === p.id ? null : p.id)}
                role="button"
                tabIndex={0}
                style={{
                  flex: "1 1 150px",
                  maxWidth: 190,
                  padding: 10,
                  borderRadius: 10,
                  border: `2px solid ${expandedPathway === p.id ? p.color : t.bd}`,
                  background: expandedPathway === p.id ? `${p.color}08` : t.sf,
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.2s ease",
                  position: "relative",
                }}
              >
                {/* Step number */}
                <div style={{
                  position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)",
                  width: 20, height: 20, borderRadius: "50%", background: p.color, color: "#fff",
                  fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center"
                }}>{i + 1}</div>
                <Icon name={p.icon} size={20} color={p.color} style={{ marginTop: 4, marginBottom: 4 }} />
                <div style={{ fontSize: 12, fontWeight: 700, color: t.tx, marginBottom: 4 }}>{p.name}</div>
                {expandedPathway === p.id ? (
                  <div style={{ marginTop: 6, textAlign: "left" }}>
                    <p style={{ fontSize: 11, color: t.tx2, lineHeight: 1.5, marginBottom: 6 }}>{p.desc}</p>
                    <div style={{ fontSize: 10, padding: "4px 8px", borderRadius: 6, background: `${p.color}15`, color: p.color, fontFamily: "'IBM Plex Mono',monospace" }}>
                      🇨🇷 {p.crStatus}
                    </div>
                    <div style={{ fontSize: 10, color: t.tx3, marginTop: 4, fontFamily: "'IBM Plex Mono',monospace" }}>
                      🌐 {p.global}
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize: 9, color: t.tx3, marginTop: 2, fontStyle: "italic" }}>
                    {en ? "Tap to explore" : "Toca para explorar"}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Connection arrows */}
          <div style={{ textAlign: "center", fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace" }}>
            {en ? "Each pathway reinforces the others → holistic approach required" : "Cada vía refuerza las demás → enfoque holístico requerido"}
          </div>
          <Ci s="ITU — 'Unlocking AI's Potential to Serve Humanity' (Jan 2026)" />
        </Card>
      </ScrollReveal>

      {/* ── COSTA RICA SDG-AI GAP ── */}
      <ScrollReveal>
        <Card accent={t.or} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.or, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
            {en ? "THE PARADOX" : "LA PARADOJA"}
          </div>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: t.tx, marginBottom: 10 }}>
            {en ? "Costa Rica: High Vision, Low Readiness" : "Costa Rica: Alta Visión, Baja Preparación"}
          </h3>
          <Grid cols="repeat(auto-fit, minmax(200px, 1fr))" gap={10} className="mobile-stat-grid">
            {[
              { label: en ? "Government AI Vision" : "Visión AI Gobierno", value: "100/100", color: t.gn, bar: 1.0,
                sub: en ? "Oxford Insights — highest possible vision score" : "Oxford Insights — puntaje visión más alto posible" },
              { label: en ? "AI Readiness Index" : "Índice Preparación AI", value: "0.38", color: t.rd, bar: 0.38,
                sub: en ? "Implementation gap vs 0.61 global average" : "Brecha implementación vs 0.61 promedio global" },
              { label: en ? "Binding AI Laws" : "Leyes AI Vinculantes", value: "0", color: t.rd, bar: 0.0,
                sub: en ? "vs Peru, El Salvador, EU already enacted" : "vs Perú, El Salvador, UE ya promulgadas" },
              { label: en ? "Renewable Energy Grid" : "Red Energía Renovable", value: "99%", color: t.gn, bar: 0.99,
                sub: en ? "Unique sustainability advantage for green AI" : "Ventaja sostenibilidad única para AI verde" },
            ].map((item, i) => (
              <div key={i} style={{ padding: 10, background: t.sf, borderRadius: 8 }}>
                <div style={{ fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 3 }}>{item.label}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: item.color, fontFamily: "'IBM Plex Mono',monospace" }}>{item.value}</div>
                <ProgressBar value={item.bar} color={item.color} height={4} />
                <div style={{ fontSize: 10, color: t.tx3, marginTop: 3 }}>{item.sub}</div>
              </div>
            ))}
          </Grid>
          <Ci s="Oxford Insights Gov AI Readiness Index 2024 · ITU AI Readiness Framework 2025" />
        </Card>
      </ScrollReveal>

      {/* ── UN PARTNERSHIP ALIGNMENT ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.vi, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
            {en ? "UN ECOSYSTEM ALIGNMENT" : "ALINEAMIENTO ECOSISTEMA ONU"}
          </div>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: t.tx, marginBottom: 10 }}>
            {en ? "Data from 6+ UN Agencies" : "Datos de 6+ Agencias ONU"}
          </h3>

          <div className="table-scroll-wrapper">
            <table className="data-table data-table-humanoid" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left" }}>{en ? "Agency" : "Agencia"}</th>
                  <th style={{ textAlign: "left" }}>{en ? "Data Contribution" : "Contribución de Datos"}</th>
                </tr>
              </thead>
              <tbody>
                {agencies.map((a, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <img
                          src={`https://logo.clearbit.com/${a.domain}?size=32`}
                          alt=""
                          style={{ width: 18, height: 18, borderRadius: 3 }}
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                        <span style={{ fontWeight: 600, fontSize: 12 }}>{a.name}</span>
                      </div>
                    </td>
                    <td style={{ fontSize: 11, color: t.tx2 }}>{a.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Ci s={en ? "Colibrii Labs data integration manifest" : "Manifiesto integración datos Colibrii Labs"} />
        </Card>
      </ScrollReveal>

      {/* ── FOOTER NOTE ── */}
      <ScrollReveal>
        <div style={{ textAlign: "center", padding: "12px 0", fontSize: 11, color: t.tx3, lineHeight: 1.6 }}>
          {en
            ? "All data sourced from official UN/ITU publications (CC BY-NC-SA 3.0 IGO). Observatory analysis © 2026 Colibrii Labs."
            : "Todos los datos provienen de publicaciones oficiales ONU/UIT (CC BY-NC-SA 3.0 IGO). Análisis observatorio © 2026 Colibrii Labs."
          }
        </div>
      </ScrollReveal>
    </div>
  );
}
