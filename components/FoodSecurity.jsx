"use client";
import { useState } from "react";
import { Card, SH, Grid, ScrollReveal, Tag, Bx } from "./ui";
import { Icon } from "./system/Icon";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Food Security & Agriculture AI
   AI for Good Impact Report · FAO · Precision Agriculture · CR
   ═══════════════════════════════════════════════════════════════ */

const CASE_STUDIES = (en) => [
  {
    title: en ? "FAO LEAP Navigator" : "FAO LEAP Navigator",
    org: "FAO",
    desc: en
      ? "AI-powered platform for sustainable livestock management. Uses machine learning to monitor emissions, optimize feeding, and assess environmental impact across livestock supply chains. Pilot launched 2024 covering multiple countries."
      : "Plataforma impulsada por AI para gestión ganadera sostenible. Usa machine learning para monitorear emisiones, optimizar alimentación y evaluar impacto ambiental en cadenas de suministro ganaderas. Piloto lanzado 2024.",
    stat: en ? "Pilot: 2024" : "Piloto: 2024",
    color: "#16a34a"
  },
  {
    title: en ? "Farmer.Chat — Digital Green" : "Farmer.Chat — Digital Green",
    org: en ? "Digital Green / AI for Good Winner" : "Digital Green / Ganador AI for Good",
    desc: en
      ? "AI chatbot providing agricultural advice to smallholder farmers in local languages. Uses retrieval-augmented generation (RAG) to deliver context-specific guidance on soil health, pest management, and market prices."
      : "Chatbot AI que brinda asesoramiento agrícola a pequeños agricultores en idiomas locales. Usa generación aumentada por recuperación (RAG) para ofrecer orientación contextual sobre salud del suelo, manejo de plagas y precios de mercado.",
    stat: en ? "250K+ farmers · 4 countries" : "250K+ agricultores · 4 países",
    color: "#16a34a"
  },
  {
    title: en ? "FAO Hand-in-Hand Platform" : "Plataforma Mano a Mano FAO",
    org: "FAO",
    desc: en
      ? "Geospatial analytics platform combining AI with satellite imagery, climate data, and socioeconomic indicators to target agricultural investments where they are needed most."
      : "Plataforma de analítica geoespacial que combina AI con imágenes satelitales, datos climáticos e indicadores socioeconómicos para dirigir inversiones agrícolas donde más se necesitan.",
    stat: en ? "65+ countries" : "65+ países",
    color: "#16a34a"
  },
  {
    title: en ? "SmartCatch — WorldFish" : "SmartCatch — WorldFish",
    org: en ? "WorldFish / AI for Good Winner" : "WorldFish / Ganador AI for Good",
    desc: en
      ? "AI-powered fish species recognition system enabling sustainable fisheries management. Uses computer vision to identify fish species, measure sizes, and assess catch composition in real-time."
      : "Sistema de reconocimiento de especies de peces impulsado por AI para gestión pesquera sostenible. Usa visión por computadora para identificar especies, medir tamaños y evaluar composición de capturas en tiempo real.",
    stat: en ? "Real-time species ID" : "ID de especies en tiempo real",
    color: "#0ea5e9"
  }
];

const CR_CONNECTIONS = (en) => [
  { title: en ? "MAG & Coffee AI" : "MAG & AI para Café", desc: en ? "Ministry of Agriculture could deploy AI for coffee leaf rust detection, yield prediction, and precision irrigation across 93K hectares of coffee farms." : "Ministerio de Agricultura podría desplegar AI para detección de roya del café, predicción de rendimiento e irrigación de precisión en 93K hectáreas de fincas cafetaleras." },
  { title: en ? "Banana & Pineapple Export AI" : "AI para Exportación de Banano y Piña", desc: en ? "CR is world's #1 pineapple exporter and #2 banana exporter. AI quality sorting, disease detection, and supply chain optimization could add $200M+ annually." : "CR es exportador #1 de piña y #2 de banano mundial. AI en clasificación de calidad, detección de enfermedades y optimización de cadena podría añadir $200M+ anuales." },
  { title: en ? "Edge AI for Rural Areas" : "Edge AI para Áreas Rurales", desc: en ? "Many CR farms lack reliable internet. Edge AI devices (running on-device, no cloud needed) enable pest detection, soil analysis, and weather alerts offline." : "Muchas fincas CR carecen de internet confiable. Dispositivos Edge AI (procesamiento local, sin nube) permiten detección de plagas, análisis de suelo y alertas climáticas offline." },
  { title: en ? "SENASA Food Safety" : "Seguridad Alimentaria SENASA", desc: en ? "National Animal Health Service could integrate AI for livestock disease surveillance, food safety inspection automation, and traceability across the supply chain." : "Servicio Nacional de Salud Animal podría integrar AI para vigilancia de enfermedades animales, automatización de inspecciones y trazabilidad en la cadena de suministro." }
];

export function FoodSecurity({ en, t }) {
  const [expandedCase, setExpandedCase] = useState(null);
  const cases = CASE_STUDIES(en);
  const crConn = CR_CONNECTIONS(en);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      {/* ── HEADER ── */}
      <SH
        color={t.gn}
        label={en ? "AI FOR GOOD · SECTORAL" : "AI FOR GOOD · SECTORIAL"}
        title={en ? "Food Security & Agriculture" : "Seguridad Alimentaria & Agricultura"}
        desc={en
          ? "How AI is transforming food systems, precision agriculture, and livestock management — from the ITU AI for Good Impact Report."
          : "Cómo AI está transformando sistemas alimentarios, agricultura de precisión y gestión ganadera — del Reporte de Impacto AI for Good de la UIT."
        }
      />

      {/* ── INTRO CONTEXT BOX ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16, background: `${t.gn}08`, border: `1px solid ${t.gn}20` }}>
          <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7, margin: 0 }}>
            <Icon name="wheat" size={14} color={t.gn} style={{ marginRight: 6, verticalAlign: "middle" }} />
            {en
              ? "The global food system faces converging crises: 2.3 billion people are food insecure, $400 billion in food is wasted annually, and 40% of crops are lost to pests and diseases. AI offers transformative solutions — from satellite-powered precision agriculture to AI chatbots advising smallholder farmers in local languages. Yet 84% of the world's 540 million farms are smallholder operations with limited technology access."
              : "El sistema alimentario global enfrenta crisis convergentes: 2.3 mil millones de personas son inseguras alimentariamente, $400 mil millones en alimentos se desperdician anualmente, y 40% de cultivos se pierden por plagas y enfermedades. AI ofrece soluciones transformadoras — desde agricultura de precisión con satélites hasta chatbots AI asesorando a pequeños agricultores en idiomas locales. Sin embargo, 84% de las 540 millones de fincas del mundo son operaciones pequeñas con acceso tecnológico limitado."
            }
          </p>
        </Card>
      </ScrollReveal>

      {/* ── KEY STATISTICS ── */}
      <ScrollReveal>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: t.gn, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
            {en ? "Global Food System & AI" : "Sistema Alimentario Global & AI"}
          </h3>
          <Grid cols="repeat(auto-fit,minmax(140px,1fr))" gap={10}>
            {[
              { v: "2.3B", l: en ? "Food Insecure" : "Inseguridad Alimentaria", s: en ? "28% of global population (2024)" : "28% de población global (2024)", c: t.rd, ic: "lightning" },
              { v: "$400B", l: en ? "Food Wasted / Year" : "Desperdicio Anual", s: en ? "14% of global food production" : "14% de producción global", c: t.am, ic: "coins" },
              { v: "40%", l: en ? "Crops Lost to Pests" : "Cultivos Perdidos por Plagas", s: en ? "Annual losses to diseases & pests" : "Pérdidas anuales por plagas y enfermedades", c: t.rd, ic: "shield" },
              { v: "84%", l: en ? "Smallholder Farms" : "Fincas Pequeñas", s: en ? "Of 540M farms globally" : "De 540M fincas globalmente", c: t.gn, ic: "globe" },
              { v: "10B", l: en ? "Population by 2050" : "Población para 2050", s: en ? "Requiring 50% more food" : "Requiriendo 50% más alimentos", c: t.cy, ic: "chart" }
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

      {/* ── PRECISION AGRICULTURE ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: t.tx, marginBottom: 8 }}>
            <Icon name="target" size={16} color={t.gn} style={{ marginRight: 8, verticalAlign: "middle" }} />
            {en ? "AI for Precision Agriculture" : "AI para Agricultura de Precisión"}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 }}>
            {[
              { t: en ? "Crop Monitoring" : "Monitoreo de Cultivos", d: en ? "Satellite imagery + drones detect crop stress, nutrient deficiencies, and water needs at field level. AI processes multispectral data to create actionable farm maps." : "Imágenes satelitales + drones detectan estrés de cultivos, deficiencias de nutrientes y necesidades de agua. AI procesa datos multiespectrales para crear mapas accionables." },
              { t: en ? "Pest & Disease Detection" : "Detección de Plagas y Enfermedades", d: en ? "Computer vision identifies pests and diseases from smartphone photos. Models trained on millions of images achieve >95% accuracy, enabling early intervention before crop loss." : "Visión por computadora identifica plagas y enfermedades desde fotos de teléfono. Modelos entrenados en millones de imágenes logran >95% precisión, permitiendo intervención temprana." },
              { t: en ? "Smart Irrigation" : "Irrigación Inteligente", d: en ? "IoT sensors + AI optimize water usage based on soil moisture, weather forecasts, and crop needs. Reduces water consumption by 20-30% while maintaining or improving yields." : "Sensores IoT + AI optimizan uso de agua basado en humedad del suelo, pronósticos climáticos y necesidades del cultivo. Reduce consumo de agua 20-30%." },
              { t: en ? "Yield Prediction" : "Predicción de Rendimiento", d: en ? "Machine learning models analyze historical yields, weather patterns, soil data, and satellite imagery to forecast crop production with increasing accuracy months in advance." : "Modelos de machine learning analizan rendimientos históricos, patrones climáticos, datos de suelo e imágenes satelitales para pronosticar producción con meses de anticipación." }
            ].map((item, i) => (
              <Card key={i} style={{ background: `${t.gn}05`, border: `1px solid ${t.gn}12` }}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: t.gn, marginBottom: 4 }}>{item.t}</h4>
                <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6, margin: 0 }}>{item.d}</p>
              </Card>
            ))}
          </div>
        </Card>
      </ScrollReveal>

      {/* ── LIVESTOCK AI ── */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: t.tx, marginBottom: 8 }}>
            <Icon name="chart" size={16} color={t.am} style={{ marginRight: 8, verticalAlign: "middle" }} />
            {en ? "Livestock & Aquaculture AI" : "AI para Ganadería y Acuacultura"}
          </h3>
          <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7, margin: "0 0 10px 0" }}>
            {en
              ? "AI is transforming livestock management through real-time health monitoring, automated feeding systems, and emissions tracking. The FAO LEAP Navigator uses AI to help countries measure and reduce livestock's environmental footprint. Individual animal recognition via facial/body recognition enables precision health tracking across herds."
              : "AI transforma la gestión ganadera a través de monitoreo de salud en tiempo real, sistemas de alimentación automatizados y seguimiento de emisiones. El FAO LEAP Navigator usa AI para ayudar a países a medir y reducir la huella ambiental ganadera. El reconocimiento individual de animales permite seguimiento de salud de precisión en rebaños."
            }
          </p>
          <Grid cols="repeat(auto-fit,minmax(100px,1fr))" gap={8}>
            <Bx style={{ textAlign: "center", padding: 10 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: t.gn }}>14.5%</div>
              <div style={{ fontSize: 11, color: t.tx2 }}>{en ? "Global GHG from livestock" : "GEI global de ganadería"}</div>
            </Bx>
            <Bx style={{ textAlign: "center", padding: 10 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: t.am }}>$1.4T</div>
              <div style={{ fontSize: 11, color: t.tx2 }}>{en ? "Global livestock sector" : "Sector ganadero global"}</div>
            </Bx>
            <Bx style={{ textAlign: "center", padding: 10 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: t.cy }}>1B+</div>
              <div style={{ fontSize: 11, color: t.tx2 }}>{en ? "Livelihoods depend on it" : "Medios de vida dependen"}</div>
            </Bx>
          </Grid>
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
              <Card key={i} style={{ cursor: "pointer", border: expandedCase === i ? `1px solid ${cs.color}40` : undefined }} onClick={() => setExpandedCase(expandedCase === i ? null : i)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: t.tx, margin: 0 }}>{cs.title}</h4>
                    <span style={{ fontSize: 11, color: t.tx2 }}>{cs.org}</span>
                  </div>
                  <Tag color={cs.color}>{cs.stat}</Tag>
                </div>
                {expandedCase === i && (
                  <p style={{ fontSize: 12.5, color: t.tx2, lineHeight: 1.7, marginTop: 8, marginBottom: 0 }}>
                    {cs.desc}
                  </p>
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
              { t: en ? "Co-design with Farmers" : "Co-diseño con Agricultores", d: en ? "AI tools must be developed WITH farming communities, not imposed on them. Local knowledge + AI = better outcomes." : "Herramientas AI deben desarrollarse CON comunidades agrícolas. Conocimiento local + AI = mejores resultados." },
              { t: en ? "Data Interoperability" : "Interoperabilidad de Datos", d: en ? "Agricultural data is fragmented across agencies (MAG, SENASA, INEC). Common standards enable AI insights." : "Datos agrícolas fragmentados entre agencias (MAG, SENASA, INEC). Estándares comunes habilitan insights AI." },
              { t: en ? "Fair Access" : "Acceso Equitativo", d: en ? "AI must not widen the gap between industrial and smallholder farms. Open-source models and edge devices are key." : "AI no debe ampliar la brecha entre fincas industriales y pequeñas. Modelos open-source y dispositivos edge son clave." },
              { t: en ? "Climate Resilience" : "Resiliencia Climática", d: en ? "AI-powered early warning systems and adaptive farming recommendations help farmers respond to increasingly unpredictable weather." : "Sistemas de alerta temprana AI y recomendaciones de agricultura adaptativa ayudan a agricultores a responder al clima impredecible." }
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
            <strong>{en ? "Sources" : "Fuentes"}:</strong> ITU AI for Good Impact Report 2025 · FAO · World Bank Digital Progress & Trends 2025 · UN Population Division · PROCOMER
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
