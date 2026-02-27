"use client";
import { useState } from "react";
import { Card, SH, Grid, ScrollReveal, Tag, Ci, ProgressBar, MiniStat } from "./ui";
import { Icon } from "./system/Icon";
import { AWARD_WINNERS_2025, OBSERVATORY_IMPACT, SDG_ALIGNMENT, ITU_DIMENSIONS, GLOBAL_AI_GOVERNANCE, CAPI_ITU_MAPPING } from "./data";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Impact Showcase
   Observatory Impact · Awards Context · Winners Benchmarking
   Case Study · Methodology · Collaboration CTA
   ═══════════════════════════════════════════════════════════════ */

export function Showcase({ en, t }) {
  const [expandedWinner, setExpandedWinner] = useState(null);
  const winners = AWARD_WINNERS_2025(en);
  const impact = OBSERVATORY_IMPACT;
  const sdgCount = SDG_ALIGNMENT(en).length;
  const dimCount = ITU_DIMENSIONS(en).length;
  const govCount = GLOBAL_AI_GOVERNANCE(en).length;
  const mappingCount = CAPI_ITU_MAPPING(en).length;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      {/* ── HEADER ── */}
      <SH
        color={t.gd}
        label={en ? "IMPACT & RECOGNITION" : "IMPACTO Y RECONOCIMIENTO"}
        title={en ? "Impact Showcase" : "Vitrina de Impacto"}
        desc={en
          ? "The Colibrii Labs AI Observatory: quantified impact, methodology, and alignment with the AI for Good Impact Awards."
          : "El Observatorio AI de Colibrii Labs: impacto cuantificado, metodología y alineamiento con los Premios de Impacto AI for Good."
        }
      />

      {/* ── OBSERVATORY IMPACT DASHBOARD ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16, background: `linear-gradient(135deg, ${t.gd}08, ${t.cy}08)` }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.gd, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 8 }}>
            {en ? "WHAT COLIBRII LABS DELIVERS" : "LO QUE COLIBRII LABS ENTREGA"}
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: t.tx, marginBottom: 16 }}>
            {en ? "Observatory Impact Dashboard" : "Panel de Impacto del Observatorio"}
          </h3>

          <Grid cols="repeat(auto-fit, minmax(110px, 1fr))" gap={8} className="mobile-stat-grid">
            {[
              { label: en ? "Countries" : "Países", value: impact.countries, color: t.cy, icon: "globe",
                sub: en ? "peer nations monitored" : "naciones pares monitoreadas" },
              { label: en ? "Analysis Views" : "Vistas Análisis", value: impact.analysisViews, color: t.vi, icon: "chart",
                sub: en ? "interactive intelligence panels" : "paneles inteligencia interactivos" },
              { label: en ? "AI Algorithms" : "Algoritmos AI", value: impact.algorithms, color: t.pk, icon: "algo",
                sub: en ? "proprietary scoring models" : "modelos puntuación propios" },
              { label: en ? "Data Sources" : "Fuentes Datos", value: impact.dataSources, color: t.am, icon: "chart",
                sub: en ? "verified international reports" : "reportes internacionales verificados" },
              { label: en ? "Live APIs" : "APIs Vivo", value: impact.liveApis, color: t.gn, icon: "lightning",
                sub: en ? "real-time data feeds" : "feeds datos en tiempo real" },
              { label: en ? "Glossary" : "Glosario", value: impact.glossaryTerms, color: t.or, icon: "book",
                sub: en ? "AI terms defined" : "términos AI definidos" },
              { label: en ? "SDGs" : "ODS", value: impact.sdgsAligned, color: t.gn, icon: "globe",
                sub: en ? "UN goals aligned" : "objetivos ONU alineados" },
              { label: en ? "UN Agencies" : "Agencias ONU", value: impact.unAgencies, color: t.cy, icon: "info",
                sub: en ? "data partnerships" : "alianzas datos" },
              { label: en ? "Languages" : "Idiomas", value: impact.languages, color: t.vi, icon: "lang",
                sub: en ? "full bilingual coverage" : "cobertura bilingüe total" },
              { label: en ? "Risk Dims" : "Dims Riesgo", value: impact.riskDimensions, color: t.rd, icon: "shield",
                sub: en ? "WEF + EOS analysis" : "análisis WEF + EOS" },
              { label: en ? "WEF Horizons" : "Horizontes WEF", value: impact.wefRiskHorizons, color: t.am, icon: "target",
                sub: en ? "risk time horizons" : "horizontes temporales riesgo" },
              { label: en ? "Uptime" : "Disponibilidad", value: impact.uptime, color: t.gn, icon: "lightning", isText: true,
                sub: en ? "always-on platform" : "plataforma siempre activa" },
            ].map((s, i) => (
              <div key={i} style={{
                padding: 10, textAlign: "center", background: t.sf, borderRadius: 8,
                border: `1px solid ${t.bd}`,
              }}>
                <Icon name={s.icon} size={14} color={s.color} />
                <div style={{ fontSize: s.isText ? 14 : 18, fontWeight: 800, color: s.color, fontFamily: "'IBM Plex Mono',monospace", marginTop: 2 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 9, color: t.tx3, fontWeight: 600, lineHeight: 1.2 }}>{s.label}</div>
                <div style={{ fontSize: 8, color: t.tx3, marginTop: 1, lineHeight: 1.2 }}>{s.sub}</div>
              </div>
            ))}
          </Grid>
        </Card>
      </ScrollReveal>

      {/* ── AI FOR GOOD IMPACT AWARDS CONTEXT ── */}
      <ScrollReveal>
        <Card accent={t.gd} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.gd, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
            {en ? "AI FOR GOOD IMPACT AWARDS" : "PREMIOS DE IMPACTO AI FOR GOOD"}
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: t.tx, marginBottom: 8 }}>
            {en ? "Impact Criteria Aligned with AI for Good" : "Criterios de Impacto Alineados con AI for Good"}
          </h3>
          <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7, marginBottom: 16 }}>
            {en
              ? "The ITU AI for Good Impact Awards recognize AI solutions that demonstrate real-world impact on the SDGs. Winners are selected based on five criteria:"
              : "Los Premios de Impacto AI for Good de la UIT reconocen soluciones AI que demuestran impacto real en los ODS. Los ganadores se seleccionan según cinco criterios:"
            }
          </p>

          <Grid cols="repeat(auto-fit, minmax(150px, 1fr))" gap={10}>
            {[
              { criterion: en ? "Innovation" : "Innovación", icon: "lightning", color: "#2563eb",
                ours: en ? "First AI observatory for a developing economy with real-time composite index" : "Primer observatorio AI para economía en desarrollo con índice compuesto en tiempo real" },
              { criterion: en ? "Measurable Impact" : "Impacto Medible", icon: "chart", color: "#10b981",
                ours: en ? "20 countries, 25+ sources, 4 live APIs, 10 algorithms, 19 analysis views" : "20 países, 25+ fuentes, 4 APIs en vivo, 10 algoritmos, 19 vistas de análisis" },
              { criterion: en ? "Sustainability" : "Sostenibilidad", icon: "globe", color: "#14b8a6",
                ours: en ? "Zero-cost infrastructure, CC BY-NC 4.0, open methodology, bilingual" : "Infraestructura costo cero, CC BY-NC 4.0, metodología abierta, bilingüe" },
              { criterion: en ? "Ethical Alignment" : "Alineamiento Ético", icon: "shield", color: "#8b5cf6",
                ours: en ? "Zero cookies, zero tracking, transparent algorithms, privacy-first design" : "Cero cookies, cero rastreo, algoritmos transparentes, diseño privacidad primero" },
              { criterion: en ? "Category Relevance" : "Relevancia Categoría", icon: "star", color: "#f59e0b",
                ours: en ? "AI for Prosperity: economic growth, decent work, innovation for developing regions" : "AI para Prosperidad: crecimiento económico, trabajo digno, innovación para regiones en desarrollo" },
            ].map((c, i) => (
              <div key={i} style={{
                padding: 14, borderRadius: 10, border: `1px solid ${t.bd}`, background: t.sf,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <Icon name={c.icon} size={16} color={c.color} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: c.color }}>{c.criterion}</span>
                </div>
                <div style={{ fontSize: 11, color: t.tx2, lineHeight: 1.5 }}>{c.ours}</div>
              </div>
            ))}
          </Grid>
          <Ci s="ITU AI for Good Impact Awards Framework · aiforgood.itu.int" />
        </Card>
      </ScrollReveal>

      {/* ── 2025 WINNERS BENCHMARKING ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.vi, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
            {en ? "BENCHMARKING" : "BENCHMARKING"}
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: t.tx, marginBottom: 8 }}>
            {en ? "2025 Award Winners: How We Compare" : "Ganadores 2025: Cómo Nos Comparamos"}
          </h3>
          <p style={{ fontSize: 13, color: t.tx2, marginBottom: 16, lineHeight: 1.6 }}>
            {en
              ? "All 2025 winners share common traits: deployed solutions, quantifiable metrics, focus on underserved regions, and UN/SDG alignment."
              : "Todos los ganadores 2025 comparten rasgos comunes: soluciones desplegadas, métricas cuantificables, enfoque en regiones desatendidas y alineamiento ONU/ODS."
            }
          </p>

          <div style={{ display: "grid", gap: 12 }}>
            {winners.map((w, i) => {
              const isExpanded = expandedWinner === i;
              return (
                <div
                  key={i}
                  className={isExpanded ? "card-expandable expanded" : "card-expandable"}
                  onClick={() => setExpandedWinner(isExpanded ? null : i)}
                  role="button"
                  tabIndex={0}
                  style={{
                    padding: 16, borderRadius: 10, position: "relative",
                    border: `2px solid ${isExpanded ? w.color : t.bd}`,
                    background: isExpanded ? `${w.color}06` : t.sf,
                    cursor: "pointer", transition: "all 0.2s ease",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, paddingRight: 20 }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: t.tx }}>{w.name}</div>
                      <Tag color={w.color}>{w.category}</Tag>
                    </div>
                    <span style={{ fontSize: 20 }}>{i === 0 ? "🏆" : i === 1 ? "🌾" : "🐟"}</span>
                  </div>
                  {!isExpanded && (
                    <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 6, fontStyle: "italic" }}>
                      {en ? "Tap to explore" : "Toca para explorar"}
                    </div>
                  )}
                  {isExpanded && (
                    <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
                      <div style={{ padding: 10, borderRadius: 6, background: t.cardBg }}>
                        <div style={{ fontSize: 10, fontFamily: "'IBM Plex Mono',monospace", color: w.color, marginBottom: 2 }}>
                          {en ? "WHAT THEY DO" : "QUÉ HACEN"}
                        </div>
                        <div style={{ fontSize: 12, color: t.tx2 }}>{w.what}</div>
                      </div>
                      <div style={{ padding: 10, borderRadius: 6, background: t.cardBg }}>
                        <div style={{ fontSize: 10, fontFamily: "'IBM Plex Mono',monospace", color: w.color, marginBottom: 2 }}>
                          {en ? "MEASURABLE IMPACT" : "IMPACTO MEDIBLE"}
                        </div>
                        <div style={{ fontSize: 12, color: t.tx2 }}>{w.metric}</div>
                      </div>
                      <div style={{ padding: 10, borderRadius: 6, background: t.cardBg }}>
                        <div style={{ fontSize: 10, fontFamily: "'IBM Plex Mono',monospace", color: t.tx3, marginBottom: 2 }}>
                          {en ? "PARTNERS" : "ALIADOS"}
                        </div>
                        <div style={{ fontSize: 12, color: t.tx2 }}>{w.partners}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Colibrii Labs comparison */}
            <div style={{
              padding: 16, borderRadius: 10,
              border: `2px solid ${t.gd}`,
              background: `linear-gradient(135deg, ${t.gd}08, ${t.cy}08)`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: t.tx }}>Colibrii Labs AI Observatory</div>
                  <Tag color={t.gd}>{en ? "AI for Prosperity (2026)" : "AI para Prosperidad (2026)"}</Tag>
                </div>
                <span style={{ fontSize: 20 }}>🦜</span>
              </div>
              <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
                <div style={{ padding: 10, borderRadius: 6, background: t.sf }}>
                  <div style={{ fontSize: 10, fontFamily: "'IBM Plex Mono',monospace", color: t.gd, marginBottom: 2 }}>
                    {en ? "WHAT WE DO" : "QUÉ HACEMOS"}
                  </div>
                  <div style={{ fontSize: 12, color: t.tx2 }}>
                    {en
                      ? "Real-time AI Observatory providing composite readiness indices, policy analysis, and economic intelligence for Costa Rica and 19 peer nations — empowering policymakers, executives, and researchers."
                      : "Observatorio AI en tiempo real proporcionando índices compuestos de preparación, análisis de políticas e inteligencia económica para Costa Rica y 19 naciones pares — empoderando formuladores de políticas, ejecutivos e investigadores."
                    }
                  </div>
                </div>
                <div style={{ padding: 10, borderRadius: 6, background: t.sf }}>
                  <div style={{ fontSize: 10, fontFamily: "'IBM Plex Mono',monospace", color: t.gd, marginBottom: 2 }}>
                    {en ? "MEASURABLE IMPACT" : "IMPACTO MEDIBLE"}
                  </div>
                  <div style={{ fontSize: 12, color: t.tx2 }}>
                    {en
                      ? `${impact.countries} countries monitored, ${impact.dataSources}+ data sources, ${impact.liveApis} live APIs, ${impact.algorithms} AI algorithms, ${impact.analysisViews} analysis views, ${impact.sdgsAligned} SDGs aligned, ${impact.languages} languages`
                      : `${impact.countries} países monitoreados, ${impact.dataSources}+ fuentes de datos, ${impact.liveApis} APIs en vivo, ${impact.algorithms} algoritmos AI, ${impact.analysisViews} vistas de análisis, ${impact.sdgsAligned} ODS alineados, ${impact.languages} idiomas`
                    }
                  </div>
                </div>
                <div style={{ padding: 10, borderRadius: 6, background: t.sf }}>
                  <div style={{ fontSize: 10, fontFamily: "'IBM Plex Mono',monospace", color: t.tx3, marginBottom: 2 }}>
                    {en ? "DATA PARTNERS" : "SOCIOS DE DATOS"}
                  </div>
                  <div style={{ fontSize: 12, color: t.tx2 }}>
                    World Bank, IMF, ITU, UNDP, UNESCO, ILO, FAO, OECD, WEF, Oxford Insights, Stanford HAI
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Ci s={en ? "ITU AI for Good Impact Awards 2025 Winners · Colibrii Labs Analysis" : "Ganadores Premios Impacto AI for Good 2025 UIT · Análisis Colibrii Labs"} />
        </Card>
      </ScrollReveal>

      {/* ── CASE STUDY: COSTA RICA ── */}
      <ScrollReveal>
        <Card accent={t.cy} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.cy, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
            {en ? "CASE STUDY" : "CASO DE ESTUDIO"}
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: t.tx, marginBottom: 8 }}>
            {en ? "Costa Rica: The Paradox That Drives Us" : "Costa Rica: La Paradoja Que Nos Impulsa"}
          </h3>
          <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7, marginBottom: 12 }}>
            {en
              ? "Costa Rica scores 100/100 on Government AI Vision but only 0.38 on AI Readiness. It has zero binding AI laws despite being a democratic leader in Latin America with 99% renewable energy. This gap between ambition and implementation is exactly what the observatory was built to expose and help close."
              : "Costa Rica puntúa 100/100 en Visión de Gobierno AI pero solo 0.38 en Preparación AI. Tiene cero leyes AI vinculantes a pesar de ser líder democrático en América Latina con 99% energía renovable. Esta brecha entre ambición e implementación es exactamente lo que el observatorio fue construido para exponer y ayudar a cerrar."
            }
          </p>

          <Grid cols="repeat(auto-fit, minmax(200px, 1fr))" gap={12}>
            <div style={{ padding: 12, background: t.sf, borderRadius: 8 }}>
              <div style={{ fontSize: 10, fontFamily: "'IBM Plex Mono',monospace", color: t.cy, marginBottom: 6 }}>
                {en ? "WHO USES THE OBSERVATORY" : "QUIÉN USA EL OBSERVATORIO"}
              </div>
              {[
                en ? "🏛️ Policymakers — AI strategy formulation" : "🏛️ Formuladores de Políticas — formulación estrategia AI",
                en ? "💼 Executives — investment & risk intelligence" : "💼 Ejecutivos — inteligencia inversión y riesgo",
                en ? "🔬 Researchers — comparative methodology" : "🔬 Investigadores — metodología comparativa",
                en ? "📰 Journalists — data-driven AI reporting" : "📰 Periodistas — reportaje AI basado en datos",
                en ? "🎓 Students — AI literacy & education" : "🎓 Estudiantes — alfabetización AI y educación",
              ].map((u, i) => (
                <div key={i} style={{ fontSize: 12, color: t.tx2, padding: "4px 0", borderBottom: `1px solid ${t.bd}` }}>
                  {u}
                </div>
              ))}
            </div>
            <div style={{ padding: 12, background: t.sf, borderRadius: 8 }}>
              <div style={{ fontSize: 10, fontFamily: "'IBM Plex Mono',monospace", color: t.cy, marginBottom: 6 }}>
                {en ? "WHAT THE OBSERVATORY REVEALS" : "QUÉ REVELA EL OBSERVATORIO"}
              </div>
              {[
                en ? "📊 Real-time AI readiness vs 19 peers" : "📊 Preparación AI en tiempo real vs 19 pares",
                en ? "⚖️ Legislative gaps relative to LATAM" : "⚖️ Brechas legislativas relativas a LATAM",
                en ? "🏭 Free Trade Zone AI competitiveness" : "🏭 Competitividad AI Zonas Francas",
                en ? "🔐 Cybersecurity risk positioning" : "🔐 Posicionamiento riesgo ciberseguridad",
                en ? "📈 Economic scenario simulations" : "📈 Simulaciones escenarios económicos",
              ].map((u, i) => (
                <div key={i} style={{ fontSize: 12, color: t.tx2, padding: "4px 0", borderBottom: `1px solid ${t.bd}` }}>
                  {u}
                </div>
              ))}
            </div>
          </Grid>
        </Card>
      </ScrollReveal>

      {/* ── METHODOLOGY CREDIBILITY ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.gn, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
            {en ? "METHODOLOGY" : "METODOLOGÍA"}
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: t.tx, marginBottom: 12 }}>
            {en ? "Built on Credible Foundations" : "Construido sobre Bases Credibles"}
          </h3>
          <Grid cols="repeat(auto-fit, minmax(200px, 1fr))" gap={12}>
            {[
              { title: en ? "CAPI-CR Index" : "Índice CAPI-CR", color: t.cy,
                desc: en ? "Extends IMF's AIPI methodology with 6 dimensions adapted for developing economies" : "Extiende metodología AIPI del FMI con 6 dimensiones adaptadas para economías en desarrollo" },
              { title: en ? "Real-Time Data" : "Datos en Tiempo Real", color: t.gn,
                desc: en ? "4 live APIs (World Bank, GDELT, Exchange Rate, CINDE) providing current-day intelligence" : "4 APIs en vivo (Banco Mundial, GDELT, Tipo Cambio, CINDE) proporcionando inteligencia del día" },
              { title: en ? "ITU Alignment" : "Alineamiento UIT", color: t.vi,
                desc: en ? `CAPI-CR maps to ${dimCount}/13 ITU dimensions through ${mappingCount} aggregated factors` : `CAPI-CR mapea a ${dimCount}/13 dimensiones UIT mediante ${mappingCount} factores agregados` },
              { title: en ? "Open & Transparent" : "Abierto y Transparente", color: t.or,
                desc: en ? "CC BY-NC 4.0 license, zero cookies, zero tracking, transparent scoring methodology" : "Licencia CC BY-NC 4.0, cero cookies, cero rastreo, metodología de puntuación transparente" },
            ].map((m, i) => (
              <div key={i} style={{
                padding: 14, borderRadius: 10, borderTop: `3px solid ${m.color}`,
                background: t.sf, border: `1px solid ${t.bd}`, borderTopColor: m.color,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: m.color, marginBottom: 6 }}>{m.title}</div>
                <div style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6 }}>{m.desc}</div>
              </div>
            ))}
          </Grid>
          <Ci s={en ? "Colibrii Labs Technical Methodology · IMF AIPI Framework" : "Metodología Técnica Colibrii Labs · Marco AIPI FMI"} />
        </Card>
      </ScrollReveal>

      {/* ── COLLABORATION CTA ── */}
      <ScrollReveal>
        <Card style={{
          marginBottom: 16,
          background: `linear-gradient(135deg, ${t.gd}10, ${t.cy}10)`,
          textAlign: "center",
          padding: 30,
        }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🤝</div>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: t.tx, marginBottom: 8, fontFamily: "var(--font-display, 'Playfair Display', serif)" }}>
            {en ? "Partner With Us" : "Colabore Con Nosotros"}
          </h3>
          <p style={{ fontSize: 14, color: t.tx2, lineHeight: 1.7, marginBottom: 16, maxWidth: 500, margin: "0 auto 16px" }}>
            {en
              ? "We welcome institutional collaborations, media inquiries, academic citations, and partnerships to expand AI intelligence for developing economies."
              : "Damos la bienvenida a colaboraciones institucionales, consultas de medios, citas académicas y alianzas para expandir la inteligencia AI para economías en desarrollo."
            }
          </p>
          <Grid cols="repeat(auto-fit, minmax(140px, 1fr))" gap={10} style={{ maxWidth: 500, margin: "0 auto" }}>
            {[
              { label: en ? "🏛️ Institutions" : "🏛️ Instituciones", desc: en ? "Policy partnerships" : "Alianzas de política" },
              { label: en ? "📰 Media" : "📰 Medios", desc: en ? "Data & analysis access" : "Acceso datos y análisis" },
              { label: en ? "🎓 Academia" : "🎓 Academia", desc: en ? "Research collaboration" : "Colaboración investigación" },
              { label: en ? "💼 Private Sector" : "💼 Sector Privado", desc: en ? "Intelligence services" : "Servicios inteligencia" },
            ].map((p, i) => (
              <div key={i} style={{
                padding: 10, borderRadius: 8, background: t.sf, textAlign: "center",
                border: `1px solid ${t.bd}`,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.tx }}>{p.label}</div>
                <div style={{ fontSize: 10, color: t.tx3, marginTop: 2 }}>{p.desc}</div>
              </div>
            ))}
          </Grid>
          <div style={{ marginTop: 16, fontSize: 13, color: t.cy }}>
            <a href="mailto:andres@colibriilabs.com" style={{ color: t.cy, textDecoration: "none", fontWeight: 600 }}>
              andres@colibriilabs.com
            </a>
          </div>
        </Card>
      </ScrollReveal>

      {/* ── FOOTER ── */}
      <ScrollReveal>
        <div style={{ textAlign: "center", padding: "16px 0", fontSize: 11, color: t.tx3, lineHeight: 1.6 }}>
          {en
            ? "Observatory data and analysis © 2026 Colibrii Labs. CC BY-NC 4.0 International License."
            : "Datos y análisis observatorio © 2026 Colibrii Labs. Licencia CC BY-NC 4.0 Internacional."
          }
        </div>
      </ScrollReveal>
    </div>
  );
}
