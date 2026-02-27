"use client";
import { useState } from "react";
import { Card, SH, Grid, ScrollReveal, Tag, Bx } from "./ui";
import { Icon } from "./system/Icon";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Infrastructure & Smart Cities AI
   AI for Good Impact Report · Digital Twins · Traffic · Disaster
   ═══════════════════════════════════════════════════════════════ */

const CASE_STUDIES = (en) => [
  {
    title: en ? "Deloitte India — Digital Twin Waste Management" : "Deloitte India — Gemelo Digital Gestión de Residuos",
    org: "Deloitte India",
    desc: en
      ? "Digital twin simulation optimizing municipal solid waste collection routes across Indian cities. Achieved 20%+ fuel savings and 36 tCO₂ annual emission reduction per city deployed. AI continuously adjusts routes based on real-time fill sensors, traffic, and weather conditions."
      : "Simulación de gemelo digital optimizando rutas de recolección de residuos sólidos municipales en ciudades de India. Logró 20%+ ahorro de combustible y 36 tCO₂ reducción anual de emisiones por ciudad. AI ajusta continuamente rutas basándose en sensores de llenado, tráfico y clima.",
    stat: en ? "20%+ fuel savings · 36 tCO₂/yr" : "20%+ ahorro combustible · 36 tCO₂/año",
    color: "#0ea5e9"
  },
  {
    title: en ? "Raleigh Traffic AI — NVIDIA Partnership" : "Raleigh Traffic AI — Alianza NVIDIA",
    org: en ? "City of Raleigh / NVIDIA" : "Ciudad de Raleigh / NVIDIA",
    desc: en
      ? "Vision Zero initiative using 100+ AI-enabled cameras for traffic management. NVIDIA-powered computer vision detects near-miss incidents, identifies dangerous intersections, and optimizes signal timing in real-time. Aims to eliminate traffic fatalities through data-driven infrastructure changes."
      : "Iniciativa Vision Zero usando 100+ cámaras habilitadas con AI para gestión de tráfico. Visión por computadora de NVIDIA detecta incidentes de casi-choque, identifica intersecciones peligrosas y optimiza semáforos en tiempo real. Busca eliminar fatalidades mediante cambios de infraestructura basados en datos.",
    stat: en ? "100+ cameras · Vision Zero" : "100+ cámaras · Vision Zero",
    color: "#8b5cf6"
  },
  {
    title: en ? "GIRI — Global Infrastructure Risk Index" : "GIRI — Índice Global de Riesgo de Infraestructura",
    org: "CDRI",
    desc: en
      ? "First-ever global probabilistic infrastructure risk assessment developed by the Coalition for Disaster Resilient Infrastructure. AI-powered analysis covering Fiji, India, Mauritius, and Nepal with plans for global expansion. Enables countries to prioritize infrastructure investments against climate and disaster risks."
      : "Primera evaluación probabilística global de riesgo de infraestructura desarrollada por la Coalición para Infraestructura Resiliente a Desastres. Análisis con AI cubriendo Fiji, India, Mauricio y Nepal con planes de expansión global.",
    stat: en ? "4 countries · Expanding" : "4 países · En expansión",
    color: "#16a34a"
  },
  {
    title: en ? "Yizhuang Beijing — Autonomous Driving" : "Yizhuang Beijing — Conducción Autónoma",
    org: en ? "Beijing Municipality" : "Municipalidad de Beijing",
    desc: en
      ? "China's first dedicated autonomous driving district with vehicle-road-cloud fusion. AI integrates autonomous vehicles with smart road infrastructure and cloud computing for real-time traffic orchestration. A glimpse of future urban mobility management."
      : "Primer distrito dedicado a conducción autónoma de China con fusión vehículo-carretera-nube. AI integra vehículos autónomos con infraestructura vial inteligente y computación en la nube para orquestación de tráfico en tiempo real.",
    stat: en ? "Vehicle-road-cloud fusion" : "Fusión vehículo-carretera-nube",
    color: "#f59e0b"
  }
];

const CR_CONNECTIONS = (en) => [
  { title: en ? "GAM Traffic Crisis" : "Crisis de Tráfico GAM", desc: en ? "The Greater Metropolitan Area loses an estimated $500M+ annually to traffic congestion. AI traffic management (camera analytics, smart signals, predictive routing) could deliver immediate returns — similar to Raleigh's NVIDIA partnership." : "El Gran Área Metropolitana pierde estimados $500M+ anuales por congestión. Gestión de tráfico AI (analítica de cámaras, semáforos inteligentes, enrutamiento predictivo) podría dar retornos inmediatos — similar a Raleigh." },
  { title: en ? "99% Renewable Grid" : "Red 99% Renovable", desc: en ? "CR's nearly 100% renewable electricity grid is a unique smart city advantage. AI can optimize this grid: predict demand, balance hydroelectric/wind/solar, and reduce the 8% transmission losses." : "La red eléctrica casi 100% renovable de CR es ventaja única para ciudades inteligentes. AI puede optimizar: predecir demanda, balancear hidro/eólica/solar y reducir 8% pérdidas de transmisión." },
  { title: en ? "SINPE as DPI Foundation" : "SINPE como Base DPI", desc: en ? "CR's SINPE payment infrastructure (interbank + SINPE Móvil) is a successful Digital Public Infrastructure. Building an AI-enabled services layer on top would advance smart government — municipal payments, transit, utilities." : "La infraestructura SINPE (interbancaria + SINPE Móvil) es Infraestructura Pública Digital exitosa. Construir una capa AI encima avanzaría gobierno inteligente — pagos municipales, tránsito, servicios." },
  { title: en ? "Disaster Vulnerability" : "Vulnerabilidad a Desastres", desc: en ? "CR faces earthquakes, volcanic eruptions, floods, and landslides. AI early warning systems (like GIRI) could save lives and billions in infrastructure damage. CNE needs AI-enhanced monitoring capacity." : "CR enfrenta terremotos, erupciones, inundaciones y deslizamientos. Sistemas de alerta temprana AI (como GIRI) podrían salvar vidas y miles de millones en daños. CNE necesita capacidad de monitoreo con AI." }
];

export function InfraSmartCities({ en, t }) {
  const [expandedCase, setExpandedCase] = useState(null);
  const cases = CASE_STUDIES(en);
  const crConn = CR_CONNECTIONS(en);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      {/* ── HEADER ── */}
      <SH
        color={t.cy}
        label={en ? "AI FOR GOOD · SECTORAL" : "AI FOR GOOD · SECTORIAL"}
        title={en ? "Infrastructure & Smart Cities" : "Infraestructura & Ciudades Inteligentes"}
        desc={en
          ? "How AI is reshaping urban planning, traffic management, and disaster resilience — from the ITU AI for Good Impact Report."
          : "Cómo AI está transformando planificación urbana, gestión de tráfico y resiliencia ante desastres — del Reporte de Impacto AI for Good de la UIT."
        }
      />

      {/* ── INTRO CONTEXT BOX ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16, background: `${t.cy}08`, border: `1px solid ${t.cy}20` }}>
          <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7, margin: 0 }}>
            <Icon name="city" size={14} color={t.cy} style={{ marginRight: 6, verticalAlign: "middle" }} />
            {en
              ? "56% of cities worldwide actively use AI, with another 35% piloting deployments. By 2050, 70% of the global population will live in urban areas, demanding smarter infrastructure. Digital twins enable cities to simulate and optimize operations before real-world deployment. Yet the AI divide between affluent and under-resourced cities threatens to deepen existing urban inequalities."
              : "56% de las ciudades del mundo usan AI activamente, con otro 35% piloteando. Para 2050, 70% de la población global vivirá en áreas urbanas, demandando infraestructura más inteligente. Gemelos digitales permiten a ciudades simular y optimizar operaciones. Sin embargo, la brecha AI entre ciudades pudientes y con pocos recursos amenaza con profundizar desigualdades urbanas."
            }
          </p>
        </Card>
      </ScrollReveal>

      {/* ── KEY STATISTICS ── */}
      <ScrollReveal>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: t.cy, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            {en ? "Smart Cities & Infrastructure AI" : "Ciudades Inteligentes & AI de Infraestructura"}
          </h3>
          <Grid cols="repeat(auto-fit,minmax(140px,1fr))" gap={10}>
            {[
              { v: "56%", l: en ? "Cities Using AI" : "Ciudades Usando AI", s: en ? "35% more piloting (2024)" : "35% más piloteando (2024)", c: t.cy, ic: "globe" },
              { v: "48%", l: en ? "Widespread AI by 3 Yrs" : "AI Generalizada en 3 Años", s: en ? "Cities expect wide adoption" : "Ciudades esperan adopción amplia", c: t.vi, ic: "chart" },
              { v: "$460B", l: en ? "Disaster Losses 2050" : "Pérdidas por Desastres 2050", s: en ? "Projected annual losses" : "Pérdidas anuales proyectadas", c: t.rd, ic: "lightning" },
              { v: "20%+", l: en ? "Waste Cost Savings" : "Ahorro en Residuos", s: en ? "Via digital twin optimization" : "Vía optimización con gemelos digitales", c: t.gn, ic: "coins" },
              { v: "70%", l: en ? "Urban by 2050" : "Urbano para 2050", s: en ? "Global population in cities" : "Población global en ciudades", c: t.am, ic: "target" }
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

      {/* ── DIGITAL TWINS ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: t.tx, marginBottom: 8 }}>
            <Icon name="algo" size={16} color={t.cy} style={{ marginRight: 8, verticalAlign: "middle" }} />
            {en ? "Digital Twins for Urban Planning" : "Gemelos Digitales para Planificación Urbana"}
          </h3>
          <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7, margin: "0 0 10px 0" }}>
            {en
              ? "Digital twins create virtual replicas of physical city systems — water networks, power grids, traffic flows, waste management — enabling simulation and optimization before real-world deployment. The EU Green Deal funds urban digital twins, and Deloitte India's waste management twin achieved 20%+ fuel savings. Cities can stress-test infrastructure against climate scenarios, optimize maintenance schedules, and plan growth without costly trial-and-error."
              : "Gemelos digitales crean réplicas virtuales de sistemas urbanos — redes de agua, redes eléctricas, flujos de tráfico, gestión de residuos — permitiendo simulación y optimización antes del despliegue real. El EU Green Deal financia gemelos digitales urbanos, y el gemelo de gestión de residuos de Deloitte India logró 20%+ ahorro de combustible. Ciudades pueden probar infraestructura contra escenarios climáticos y optimizar mantenimiento."
            }
          </p>
          <Grid cols="repeat(auto-fit,minmax(100px,1fr))" gap={8}>
            <Bx style={{ padding: 10 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: t.cy }}>36</span>
                <span style={{ fontSize: 11, color: t.tx2 }}>{en ? "tons CO₂ reduced/city/yr" : "toneladas CO₂/ciudad/año"}</span>
              </div>
            </Bx>
            <Bx style={{ padding: 10 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: t.gn }}>20%+</span>
                <span style={{ fontSize: 11, color: t.tx2 }}>{en ? "Fuel savings achieved" : "Ahorro combustible logrado"}</span>
              </div>
            </Bx>
            <Bx style={{ padding: 10 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: t.vi }}>$70B</span>
                <span style={{ fontSize: 11, color: t.tx2 }}>{en ? "Annual hazard savings by 2050" : "Ahorro anual riesgos para 2050"}</span>
              </div>
            </Bx>
          </Grid>
        </Card>
      </ScrollReveal>

      {/* ── TRAFFIC & MOBILITY ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: t.tx, marginBottom: 8 }}>
            <Icon name="compare" size={16} color={t.am} style={{ marginRight: 8, verticalAlign: "middle" }} />
            {en ? "Traffic & Mobility AI" : "AI para Tráfico y Movilidad"}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 }}>
            {[
              { t: en ? "Computer Vision Traffic" : "Visión por Computadora", d: en ? "Raleigh NC's Vision Zero uses 100+ AI cameras to detect near-misses, dangerous patterns, and signal timing issues — a data-driven approach to eliminating traffic fatalities." : "Vision Zero de Raleigh NC usa 100+ cámaras AI para detectar casi-choques, patrones peligrosos y problemas de semáforos — enfoque basado en datos para eliminar fatalidades viales." },
              { t: en ? "Autonomous Mobility" : "Movilidad Autónoma", d: en ? "Beijing's Yizhuang district deploys vehicle-road-cloud fusion: autonomous vehicles integrated with smart road infrastructure and cloud computing for city-wide traffic orchestration." : "El distrito Yizhuang de Beijing despliega fusión vehículo-carretera-nube: vehículos autónomos integrados con infraestructura vial inteligente y computación en nube." },
              { t: en ? "Predictive Maintenance" : "Mantenimiento Predictivo", d: en ? "AI sensors monitor bridge stress, road surface conditions, and utility infrastructure. Predictive models schedule maintenance before failures occur, reducing costs and preventing disruptions." : "Sensores AI monitorean estrés de puentes, condiciones de superficie y servicios. Modelos predictivos programan mantenimiento antes de fallos, reduciendo costos." },
              { t: en ? "Public Transit AI" : "AI para Transporte Público", d: en ? "AI optimizes bus routes, predicts demand patterns, and adjusts schedules in real-time. Reduces wait times, improves coverage, and increases ridership through better reliability." : "AI optimiza rutas de buses, predice patrones de demanda y ajusta horarios en tiempo real. Reduce tiempos de espera, mejora cobertura y aumenta uso por mejor confiabilidad." }
            ].map((item, i) => (
              <Card key={i} style={{ background: `${t.cy}05`, border: `1px solid ${t.cy}12` }}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: t.cy, marginBottom: 4 }}>{item.t}</h4>
                <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6, margin: 0 }}>{item.d}</p>
              </Card>
            ))}
          </div>
        </Card>
      </ScrollReveal>

      {/* ── CASE STUDIES ── */}
      <ScrollReveal>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: t.cy, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            <Icon name="star" size={14} color={t.cy} style={{ marginRight: 6, verticalAlign: "middle" }} />
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
        <Card style={{ marginBottom: 16, background: `${t.gn}06`, border: `1px solid ${t.gn}20` }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: t.gn, marginBottom: 10 }}>
            🇨🇷 {en ? "Costa Rica Connection" : "Conexión Costa Rica"}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
            {crConn.map((item, i) => (
              <div key={i} style={{ padding: 10, borderRadius: 8, background: `${t.gn}06` }}>
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
              { t: en ? "Data Quality" : "Calidad de Datos", d: en ? "Smart city AI depends on high-quality, real-time data from sensors, cameras, and IoT devices. Without reliable data infrastructure, AI outputs are unreliable." : "AI de ciudades inteligentes depende de datos de alta calidad en tiempo real de sensores, cámaras y dispositivos IoT. Sin infraestructura de datos confiable, resultados AI no son confiables." },
              { t: en ? "Ethical Surveillance" : "Vigilancia Ética", d: en ? "AI in public spaces raises privacy concerns. Clear policies must distinguish between traffic optimization (acceptable) and mass surveillance (unacceptable)." : "AI en espacios públicos plantea preocupaciones de privacidad. Políticas claras deben distinguir entre optimización de tráfico (aceptable) y vigilancia masiva (inaceptable)." },
              { t: en ? "Urban Digital Divide" : "Brecha Digital Urbana", d: en ? "Smart city investments tend to favor affluent areas. CR must ensure GAM benefits extend to peripheral communities and rural areas." : "Inversiones en ciudades inteligentes tienden a favorecer áreas pudientes. CR debe asegurar que beneficios del GAM se extiendan a comunidades periféricas y rurales." },
              { t: en ? "Community Engagement" : "Participación Comunitaria", d: en ? "Citizens must participate in smart city design — not just be subjects of data collection. Transparency, consent, and accountability are non-negotiable." : "Ciudadanos deben participar en diseño de ciudades inteligentes — no solo ser sujetos de recolección de datos. Transparencia, consentimiento y rendición de cuentas son innegociables." }
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
            <strong>{en ? "Sources" : "Fuentes"}:</strong> ITU AI for Good Impact Report 2025 · CDRI · Deloitte India · NVIDIA · UN Habitat · City of Raleigh NC
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
