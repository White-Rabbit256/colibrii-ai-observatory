"use client";
import { useState } from "react";
import { Card, SH, Grid, ScrollReveal, Tag, Bx } from "./ui";
import { Icon } from "./system/Icon";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Environmental Sustainability & AI
   AI for Good Impact Report · Climate · Biodiversity · Energy
   ═══════════════════════════════════════════════════════════════ */

const CASE_STUDIES = (en) => [
  {
    title: "DeepINDRA",
    org: en ? "AI for Good / India" : "AI for Good / India",
    desc: en
      ? "AI combined with citizen science for flood resilience in India. With 40 million hectares of flood-prone land and $28.1 billion in annual flood losses, DeepINDRA uses machine learning to predict flood patterns, optimize evacuation routes, and coordinate community-level response. Integrates satellite data, weather forecasts, and ground-level citizen reports."
      : "AI combinada con ciencia ciudadana para resiliencia ante inundaciones en India. Con 40 millones de hectáreas propensas a inundaciones y $28.1 mil millones en pérdidas anuales, DeepINDRA usa machine learning para predecir patrones de inundación, optimizar rutas de evacuación y coordinar respuesta comunitaria.",
    stat: en ? "40M ha · $28.1B/yr losses" : "40M ha · $28.1B/año pérdidas",
    color: "#0ea5e9"
  },
  {
    title: en ? "Dominican Republic Climate Simulator" : "Simulador Climático Rep. Dominicana",
    org: "CDRI",
    desc: en
      ? "AI-powered climate risk decision-making tool developed by the Coalition for Disaster Resilient Infrastructure (CDRI). Enables Dominican Republic policymakers to simulate infrastructure scenarios under different climate projections, prioritize investments, and assess adaptation strategies."
      : "Herramienta de toma de decisiones de riesgo climático con AI desarrollada por la Coalición para Infraestructura Resiliente. Permite a tomadores de decisiones de Rep. Dominicana simular escenarios de infraestructura bajo diferentes proyecciones climáticas.",
    stat: en ? "Climate decision-making" : "Toma de decisiones climáticas",
    color: "#16a34a"
  },
  {
    title: en ? "Danish EPA — AI Permitting" : "EPA Danesa — Permisos con AI",
    org: en ? "Danish Environmental Protection Agency" : "Agencia de Protección Ambiental de Dinamarca",
    desc: en
      ? "Digital and AI-assisted environmental permitting system that accelerates review processes while improving compliance assessment. Automates document analysis, identifies environmental risks, and cross-references regulatory requirements — reducing permit processing time significantly."
      : "Sistema de permisos ambientales asistido por AI que acelera procesos de revisión mientras mejora evaluación de cumplimiento. Automatiza análisis de documentos, identifica riesgos ambientales y cruza referencias con requisitos regulatorios.",
    stat: en ? "Faster permitting" : "Permisos más rápidos",
    color: "#8b5cf6"
  },
  {
    title: "Overstory",
    org: en ? "AI for Good / Global" : "AI for Good / Global",
    desc: en
      ? "Satellite-based AI for vegetation management and wildfire prevention. Monitors tree growth near power lines, assesses forest health, and predicts wildfire risk using multi-spectral satellite imagery and machine learning. Utilities use it to prioritize vegetation clearing, preventing the spark-to-wildfire chain."
      : "AI basada en satélites para gestión de vegetación y prevención de incendios forestales. Monitorea crecimiento de árboles cerca de líneas eléctricas, evalúa salud forestal y predice riesgo de incendio usando imágenes multiespectrales y machine learning.",
    stat: en ? "Satellite-based wildfire AI" : "AI incendios vía satélite",
    color: "#f59e0b"
  }
];

const CR_CONNECTIONS = (en) => [
  { title: en ? "99% Renewable Energy" : "99% Energía Renovable", desc: en ? "CR's near-total renewable electricity grid positions it uniquely for the AI-green synergy. AI can optimize hydroelectric dispatch, predict solar/wind output, and reduce 8% transmission losses — making the grid smarter without adding emissions." : "La red eléctrica casi 100% renovable de CR lo posiciona únicamente para la sinergia AI-verde. AI puede optimizar despacho hidroeléctrico, predecir producción solar/eólica y reducir 8% pérdidas de transmisión." },
  { title: en ? "Biodiversity Hotspot" : "Hotspot de Biodiversidad", desc: en ? "CR contains 5% of the world's species on just 0.03% of its land area. AI-powered acoustic monitoring, camera traps, and eDNA analysis could revolutionize conservation — tracking species, detecting poaching, and monitoring ecosystem health." : "CR contiene 5% de las especies del mundo en solo 0.03% de su área terrestre. Monitoreo acústico, cámaras trampa y análisis eDNA con AI podrían revolucionar la conservación — rastrear especies, detectar caza furtiva y monitorear salud ecosistémica." },
  { title: en ? "Climate Vulnerability" : "Vulnerabilidad Climática", desc: en ? "CR faces increasing floods, landslides, volcanic activity, and extreme weather events. AI early warning systems (like DeepINDRA) combined with CNE's network could save lives and reduce the growing economic impact of natural disasters." : "CR enfrenta crecientes inundaciones, deslizamientos, actividad volcánica y eventos climáticos extremos. Sistemas de alerta temprana AI combinados con la red de CNE podrían salvar vidas y reducir impacto económico creciente." },
  { title: en ? "Carbon Neutrality Goals" : "Metas de Carbono Neutro", desc: en ? "CR committed to carbon neutrality by 2050 (Decarbonization Plan). AI can monitor emissions, optimize carbon sinks (forests), track compliance, and model the most cost-effective decarbonization pathways." : "CR se comprometió a carbono neutralidad para 2050 (Plan de Descarbonización). AI puede monitorear emisiones, optimizar sumideros (bosques), rastrear cumplimiento y modelar las rutas de descarbonización más costo-efectivas." }
];

export function EnvironmentalAI({ en, t }) {
  const [expandedCase, setExpandedCase] = useState(null);
  const cases = CASE_STUDIES(en);
  const crConn = CR_CONNECTIONS(en);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      {/* ── HEADER ── */}
      <SH
        color={t.gn}
        label={en ? "AI FOR GOOD · SECTORAL" : "AI FOR GOOD · SECTORIAL"}
        title={en ? "Environmental Sustainability" : "Sostenibilidad Ambiental"}
        desc={en
          ? "How AI is advancing climate action, biodiversity conservation, and early warning systems — from the ITU AI for Good Impact Report."
          : "Cómo AI está avanzando acción climática, conservación de biodiversidad y sistemas de alerta temprana — del Reporte de Impacto AI for Good de la UIT."
        }
      />

      {/* ── INTRO CONTEXT BOX ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16, background: `${t.gn}08`, border: `1px solid ${t.gn}20` }}>
          <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7, margin: 0 }}>
            <Icon name="leaf" size={14} color={t.gn} style={{ marginRight: 6, verticalAlign: "middle" }} />
            {en
              ? "Climate action requires $4 trillion annually by 2030. AI could reduce CO₂ emissions by 1.8 GtCO₂/year in renewable energy alone, and 3.2-5.4 GtCO₂ across power, food, and mobility by 2035. Yet only 1% of energy patents reference AI, and AI's own growing energy footprint creates a complex balance. Meanwhile, 1 million species face extinction and 75% of land ecosystems have been significantly altered — AI-powered monitoring is increasingly essential for conservation."
              : "La acción climática requiere $4 billones anuales para 2030. AI podría reducir emisiones CO₂ en 1.8 GtCO₂/año solo en energía renovable, y 3.2-5.4 GtCO₂ en electricidad, alimentación y movilidad para 2035. Sin embargo, solo 1% de patentes energéticas referencian AI, y la propia huella energética creciente de AI crea un balance complejo. Mientras tanto, 1 millón de especies enfrentan extinción y 75% de ecosistemas terrestres han sido alterados — monitoreo con AI es cada vez más esencial."
            }
          </p>
        </Card>
      </ScrollReveal>

      {/* ── KEY STATISTICS ── */}
      <ScrollReveal>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: t.gn, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            {en ? "Climate & Environment AI" : "Clima & Medio Ambiente AI"}
          </h3>
          <Grid cols="repeat(auto-fit,minmax(140px,1fr))" gap={10}>
            {[
              { v: "$4T", l: en ? "Needed Annually" : "Necesarios Anualmente", s: en ? "Climate investment by 2030" : "Inversión climática para 2030", c: t.gn, ic: "coins" },
              { v: "1.8", l: en ? "Gt CO₂ Reducible" : "Gt CO₂ Reducibles", s: en ? "Gigatons of CO₂ via AI in renewables" : "Gigatoneladas de CO₂ vía AI renovable", c: t.cy, ic: "lightning" },
              { v: "5.4", l: en ? "Gt CO₂ by 2035" : "Gt CO₂ para 2035", s: en ? "Gigatons via power+food+mobility" : "Gigatoneladas vía energía+comida+movilidad", c: t.vi, ic: "chart" },
              { v: "$70B", l: en ? "AI Hazard Savings" : "Ahorros Mitigación AI", s: en ? "Projected annual savings by 2050" : "Ahorro anual proyectado para 2050", c: t.am, ic: "shield" },
              { v: "1M", l: en ? "Species at Risk" : "Especies en Riesgo", s: en ? "Facing extinction globally" : "Enfrentando extinción global", c: t.rd, ic: "globe" },
              { v: "1%", l: en ? "Energy Patents + AI" : "Patentes Energía + AI", s: en ? "Only 1% of energy patents reference AI" : "Solo 1% de patentes energéticas referencian AI", c: t.pk, ic: "target" }
            ].map((d, i) => (
              <Card key={i} d={0.05}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: d.c, fontFamily: "'IBM Plex Mono',monospace" }}>{d.v}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginTop: 2 }}>{d.l}</div>
                    <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{d.s}</div>
                  </div>
                  <Icon name={d.ic} size={22} style={{ opacity: 0.5 }} />
                </div>
              </Card>
            ))}
          </Grid>
        </div>
      </ScrollReveal>

      {/* ── BIODIVERSITY MONITORING ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: t.tx, marginBottom: 8 }}>
            <Icon name="globe" size={16} color={t.gn} style={{ marginRight: 8, verticalAlign: "middle" }} />
            {en ? "Biodiversity Monitoring" : "Monitoreo de Biodiversidad"}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 }}>
            {[
              { t: en ? "Camera Traps + AI" : "Cámaras Trampa + AI", d: en ? "AI processes millions of wildlife camera trap images automatically, identifying species, counting populations, and tracking movement patterns — work that would take researchers years done in hours." : "AI procesa millones de imágenes de cámaras trampa automáticamente, identificando especies, contando poblaciones y rastreando patrones de movimiento — trabajo que tomaría años hecho en horas." },
              { t: en ? "Acoustic Monitoring" : "Monitoreo Acústico", d: en ? "AI analyzes soundscapes from rainforests and oceans to detect species by their calls, assess biodiversity health, and identify illegal logging or poaching activity in real-time." : "AI analiza paisajes sonoros de selvas y océanos para detectar especies por sus llamados, evaluar salud de biodiversidad e identificar tala ilegal o caza furtiva en tiempo real." },
              { t: en ? "Satellite + eDNA" : "Satélite + eDNA", d: en ? "Environmental DNA (eDNA) combined with satellite imagery enables rapid biodiversity assessment without physical capture. AI identifies species from water/soil DNA traces and maps habitat change from space." : "ADN ambiental (eDNA) combinado con imágenes satelitales permite evaluación rápida de biodiversidad sin captura física. AI identifica especies desde trazas de ADN en agua/suelo." },
              { t: en ? "Anti-Poaching AI" : "AI Anti-Caza Furtiva", d: en ? "Predictive models analyze patrol data, poaching incidents, and environmental factors to optimize ranger deployment and predict where poaching is most likely to occur next." : "Modelos predictivos analizan datos de patrullas, incidentes de caza furtiva y factores ambientales para optimizar despliegue de guardaparques y predecir dónde ocurrirá la caza furtiva." }
            ].map((item, i) => (
              <Card key={i} style={{ background: `${t.gn}05`, border: `1px solid ${t.gn}12` }}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: t.gn, marginBottom: 4 }}>{item.t}</h4>
                <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6, margin: 0 }}>{item.d}</p>
              </Card>
            ))}
          </div>
        </Card>
      </ScrollReveal>

      {/* ── ENERGY AI ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: t.tx, marginBottom: 8 }}>
            <Icon name="lightning" size={16} color={t.am} style={{ marginRight: 8, verticalAlign: "middle" }} />
            {en ? "Energy & Grid Optimization" : "Energía & Optimización de Red"}
          </h3>
          <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7, margin: "0 0 10px 0" }}>
            {en
              ? "AI can improve solar and wind load factors by 20%, potentially saving $110 billion through optimized power plant operations. Yet only 1% of energy patents reference AI — a vast untapped opportunity. Grid optimization, demand forecasting, and renewable energy storage management are immediate applications. AI could unlock 175 GW of additional renewable capacity through smarter grid management alone."
              : "AI puede mejorar factores de carga solar y eólica en 20%, potencialmente ahorrando $110 mil millones mediante operaciones optimizadas. Sin embargo, solo 1% de patentes energéticas referencian AI — oportunidad inexplorada. Optimización de red, pronóstico de demanda y gestión de almacenamiento renovable son aplicaciones inmediatas. AI podría desbloquear 175 GW de capacidad renovable adicional."
            }
          </p>
          <Grid cols="repeat(auto-fit,minmax(100px,1fr))" gap={8}>
            <Bx style={{ padding: 10 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: t.gn }}>20%</span>
                <span style={{ fontSize: 11, color: t.tx2 }}>{en ? "Load factor improvement" : "Mejora factor de carga"}</span>
              </div>
            </Bx>
            <Bx style={{ padding: 10 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: t.am }}>$110B</span>
                <span style={{ fontSize: 11, color: t.tx2 }}>{en ? "Potential savings" : "Ahorros potenciales"}</span>
              </div>
            </Bx>
            <Bx style={{ padding: 10 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: t.cy }}>175 GW</span>
                <span style={{ fontSize: 11, color: t.tx2 }}>{en ? "Unlockable capacity" : "Capacidad desbloqueable"}</span>
              </div>
            </Bx>
          </Grid>
        </Card>
      </ScrollReveal>

      {/* ── EARLY WARNING SYSTEMS ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: t.tx, marginBottom: 8 }}>
            <Icon name="shield" size={16} color={t.rd} style={{ marginRight: 8, verticalAlign: "middle" }} />
            {en ? "Early Warning Systems" : "Sistemas de Alerta Temprana"}
          </h3>
          <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7, margin: 0 }}>
            {en
              ? "The UN's Early Warnings for All initiative targets universal coverage by 2027. AI enhances prediction of floods, wildfires, hurricanes, and volcanic activity by processing satellite data, weather models, and sensor networks in real-time. The Global Initiative on Resilience to Natural Hazards through AI connects over 30 partners worldwide. AI-driven hazard mitigation could save $70 billion annually by 2050."
              : "La iniciativa Alertas Tempranas para Todos de la ONU busca cobertura universal para 2027. AI mejora predicción de inundaciones, incendios, huracanes y actividad volcánica procesando datos satelitales, modelos climáticos y redes de sensores en tiempo real. La Iniciativa Global de Resiliencia a Riesgos Naturales conecta más de 30 socios mundialmente. La mitigación de riesgos con AI podría ahorrar $70 mil millones anuales para 2050."
            }
          </p>
        </Card>
      </ScrollReveal>

      {/* ── CASE STUDIES ── */}
      <ScrollReveal>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: t.gn, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            <Icon name="star" size={14} color={t.gn} style={{ marginRight: 6, verticalAlign: "middle" }} />
            {en ? "Case Studies" : "Casos de Estudio"}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {cases.map((cs, i) => (
              <Card key={i} className={expandedCase === i ? "card-expandable expanded" : "card-expandable"} style={{ cursor: "pointer", position: "relative", border: expandedCase === i ? `1px solid ${cs.color}40` : undefined }} onClick={() => setExpandedCase(expandedCase === i ? null : i)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, paddingRight: 20 }}>
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: t.tx, margin: 0 }}>{cs.title}</h4>
                    <span style={{ fontSize: 11, color: t.tx2 }}>{cs.org}</span>
                  </div>
                  <Tag color={cs.color}>{cs.stat}</Tag>
                </div>
                {expandedCase === i ? (
                  <p style={{ fontSize: 12.5, color: t.tx2, lineHeight: 1.7, marginTop: 8, marginBottom: 0 }}>
                    {cs.desc}
                  </p>
                ) : (
                  <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 6, fontStyle: "italic" }}>
                    {en ? "Tap to explore" : "Toca para explorar"}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ── CR CONNECTION ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16, background: `${t.cy}06`, border: `1px solid ${t.cy}20` }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: t.cy, marginBottom: 10 }}>
            🇨🇷 {en ? "Costa Rica Connection" : "Conexión Costa Rica"}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
            {crConn.map((item, i) => (
              <div key={i} style={{ padding: 10, borderRadius: 8, background: `${t.cy}06` }}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: t.tx, marginBottom: 4 }}>{item.title}</h4>
                <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </ScrollReveal>

      {/* ── KEY CONSIDERATIONS ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: t.tx, marginBottom: 8 }}>
            <Icon name="info" size={16} color={t.am} style={{ marginRight: 8, verticalAlign: "middle" }} />
            {en ? "Key Considerations" : "Consideraciones Clave"}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 8 }}>
            {[
              { t: en ? "AI's Energy Footprint" : "Huella Energética de AI", d: en ? "Training a large AI model can emit 626K lbs of CO₂. The net environmental impact of AI depends on whether its efficiency gains exceed its own growing energy consumption." : "Entrenar un modelo AI grande puede emitir 626K libras de CO₂. El impacto ambiental neto de AI depende de si sus ganancias en eficiencia superan su propio consumo energético creciente." },
              { t: en ? "Digital Divide" : "Brecha Digital", d: en ? "Countries most vulnerable to climate change often have the least capacity to deploy AI solutions. International cooperation and technology transfer are essential." : "Los países más vulnerables al cambio climático a menudo tienen la menor capacidad para desplegar soluciones AI. Cooperación internacional y transferencia tecnológica son esenciales." },
              { t: en ? "Data Accessibility" : "Accesibilidad de Datos", d: en ? "Environmental monitoring generates massive data that must be open, standardized, and accessible. Proprietary data silos undermine collective climate action." : "Monitoreo ambiental genera datos masivos que deben ser abiertos, estandarizados y accesibles. Silos de datos propietarios socavan acción climática colectiva." },
              { t: en ? "Inclusive Governance" : "Gobernanza Inclusiva", d: en ? "Environmental AI governance must include indigenous communities, local stakeholders, and the populations most affected by climate change — not just tech companies and governments." : "La gobernanza AI ambiental debe incluir comunidades indígenas, actores locales y poblaciones más afectadas por cambio climático — no solo empresas tech y gobiernos." }
            ].map((item, i) => (
              <Bx key={i}>
                <h4 style={{ fontSize: 12, fontWeight: 700, color: t.am, marginBottom: 3 }}>{item.t}</h4>
                <p style={{ fontSize: 11.5, color: t.tx2, lineHeight: 1.5, margin: 0 }}>{item.d}</p>
              </Bx>
            ))}
          </div>
        </Card>
      </ScrollReveal>

      {/* ── SOURCES ── */}
      <ScrollReveal>
        <div style={{ padding: "12px 0", borderTop: `1px solid ${t.tx}10` }}>
          <p style={{ fontSize: 11, color: t.tx2, margin: 0, lineHeight: 1.6 }}>
            <strong>{en ? "Sources" : "Fuentes"}:</strong> ITU AI for Good Impact Report 2025 · CDRI · UNEP · IEA · IUCN · Overstory · SINAC Costa Rica
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
