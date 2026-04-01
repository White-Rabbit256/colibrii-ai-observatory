"use client";
import { useState, useRef, useEffect } from "react";
import { Card, SH, Grid, ScrollReveal, Tag, Bx, MiniStat, Lnk } from "./ui";
import { Icon } from "./system/Icon";
import { CLIMATE_SOURCES, CR_ENERGY, CLIMATE_AI_NEXUS, CLIMATE_STATS } from "./climateData";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Climate & AI Deep Intelligence
   Premium deep-dive into climate data, energy profile,
   AI carbon footprint, monitoring tools, and statistics.
   ═══════════════════════════════════════════════════════════════ */

/* ── auto-scroll helper ── */
function useAutoScroll(dep) {
  const ref = useRef(null);
  useEffect(() => {
    if (dep != null && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [dep]);
  return ref;
}

/* ── category colors ── */
const CAT_COLORS = {
  "Emissions": "#ef4444", "Emisiones": "#ef4444",
  "Forest & Biodiversity": "#10b981", "Bosque y Biodiversidad": "#10b981",
  "AI Compute Emissions": "#8b5cf6", "Emisiones de Computación AI": "#8b5cf6",
  "Green AI Advantage": "#06b6d4", "Ventaja AI Verde": "#06b6d4",
};

/* ── section icon map ── */
const SECTION_ICONS = {
  footprint: "lightning",
  monitoring: "globe",
  tracking: "chart",
};

export function ClimateDeep({ en, t }) {
  const [expandedSource, setExpandedSource] = useState(null);
  const [expandedFootprint, setExpandedFootprint] = useState(null);
  const sourceScrollRef = useAutoScroll(expandedSource);
  const footprintScrollRef = useAutoScroll(expandedFootprint);

  const sources = CLIMATE_SOURCES(en);
  const energy = CR_ENERGY(en);
  const nexus = CLIMATE_AI_NEXUS(en);
  const stats = CLIMATE_STATS(en);

  const footprintSection = nexus.sections.find(s => s.id === "footprint");
  const monitoringSection = nexus.sections.find(s => s.id === "monitoring");
  const trackingSection = nexus.sections.find(s => s.id === "tracking");

  /* find max training value for relative bars */
  const maxTraining = footprintSection
    ? Math.max(...footprintSection.stats.map(s => {
        const num = parseFloat(s.value.replace(/[^0-9.]/g, ""));
        return isNaN(num) ? 0 : num;
      }))
    : 1;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>

      {/* ═══════ 1. HEADER + KEY STATS ═══════ */}
      <SH
        color={t.gn}
        label={en ? "DEEP INTELLIGENCE · CLIMATE" : "INTELIGENCIA PROFUNDA · CLIMA"}
        title={en ? "Climate & AI Intelligence" : "Clima e Inteligencia AI"}
        desc={en
          ? "Deep analysis of Costa Rica's renewable energy advantage, AI carbon footprint, climate monitoring tools, and sustainability data sources."
          : "Analisis profundo de la ventaja de energia renovable de Costa Rica, huella de carbono de AI, herramientas de monitoreo climatico y fuentes de datos de sostenibilidad."
        }
      />

      <ScrollReveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 24 }}>
          <MiniStat label={en ? "RENEWABLE GRID" : "RED RENOVABLE"} value="98.6%" color={t.gn} mono />
          <MiniStat label={en ? "DATA SOURCES" : "FUENTES DE DATOS"} value="7" color={t.cy} mono />
          <MiniStat label={en ? "MONITORING TOOLS" : "HERRAMIENTAS MONITOREO"} value="3" color={t.vi} mono />
          <MiniStat label={en ? "GOAL" : "META"} value={en ? "Carbon Neutral 2050" : "Carbono Neutro 2050"} color={t.am} />
        </div>
      </ScrollReveal>

      {/* ═══════ 2. CR ENERGY PROFILE ═══════ */}
      <ScrollReveal>
        <SH
          color={t.cy}
          label={en ? "ENERGY PROFILE" : "PERFIL ENERGETICO"}
          title={energy.title}
          desc={energy.headline[en ? "en" : "es"]}
        />
      </ScrollReveal>

      {/* Energy mix stacked bar */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: t.tx2, marginBottom: 10, fontFamily: "'IBM Plex Mono',monospace", letterSpacing: 1, textTransform: "uppercase" }}>
            {en ? "Electricity Generation Mix" : "Mezcla de Generacion Electrica"}
          </div>

          {/* Stacked bar */}
          <div style={{ display: "flex", height: 32, borderRadius: 8, overflow: "hidden", marginBottom: 14 }}>
            {energy.energyMix.map((e, i) => (
              <div
                key={i}
                title={`${e.source}: ${e.percentage}%`}
                style={{
                  width: `${e.percentage}%`,
                  background: e.color,
                  minWidth: e.percentage > 2 ? undefined : 4,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 700, color: "#fff",
                  fontFamily: "'IBM Plex Mono',monospace",
                  transition: "all .3s ease",
                }}
              >
                {e.percentage >= 8 ? `${e.percentage}%` : ""}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {energy.energyMix.map((e, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: t.tx2 }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: e.color, flexShrink: 0 }} />
                <span style={{ fontWeight: 600 }}>{e.source}</span>
                <span style={{ fontFamily: "'IBM Plex Mono',monospace", color: t.tx3, fontSize: 10 }}>{e.percentage}% · {e.capacity}</span>
              </div>
            ))}
          </div>
        </Card>
      </ScrollReveal>

      {/* Key energy stats grid */}
      <ScrollReveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10, marginBottom: 16 }}>
          {energy.keyStats.map((s, i) => (
            <Card key={i} style={{ padding: 16 }}>
              <div style={{ fontSize: 11, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>
                {s.metric}
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: t.cy, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
                {s.value}
              </div>
              <div style={{ fontSize: 11, color: t.tx3, lineHeight: 1.5 }}>{s.context}</div>
            </Card>
          ))}
        </div>
      </ScrollReveal>

      {/* Data Center Strengths & Challenges */}
      <ScrollReveal>
        <Card style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.tx, marginBottom: 14 }}>
            {en ? "Data Center Potential" : "Potencial para Centros de Datos"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {/* Strengths */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.gn, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8, fontFamily: "'IBM Plex Mono',monospace" }}>
                {en ? "Strengths" : "Fortalezas"}
              </div>
              {energy.dataCenterPotential.strengths.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-start" }}>
                  <span style={{ color: t.gn, fontSize: 14, flexShrink: 0, marginTop: 1 }}>&#10003;</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: t.tx }}>{s.point}</div>
                    <div style={{ fontSize: 11, color: t.tx3, lineHeight: 1.5, marginTop: 2 }}>{s.detail}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Challenges */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.am, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8, fontFamily: "'IBM Plex Mono',monospace" }}>
                {en ? "Challenges" : "Desafios"}
              </div>
              {energy.dataCenterPotential.challenges.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-start" }}>
                  <span style={{ color: t.am, fontSize: 14, flexShrink: 0, marginTop: 1 }}>&#9888;</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: t.tx }}>{s.point}</div>
                    <div style={{ fontSize: 11, color: t.tx3, lineHeight: 1.5, marginTop: 2 }}>{s.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </ScrollReveal>

      {/* ═══════ 3. AI CARBON FOOTPRINT ANALYSIS ═══════ */}
      <ScrollReveal>
        <SH
          color={t.rd}
          label={footprintSection.icon + " " + (en ? "AI FOOTPRINT" : "HUELLA AI")}
          title={footprintSection.title}
          desc={en
            ? "The dual relationship: AI consumes massive energy, but also enables climate solutions."
            : "La relacion dual: AI consume energia masiva, pero tambien habilita soluciones climaticas."
          }
        />
      </ScrollReveal>

      <ScrollReveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12, marginBottom: 24 }}>
          {footprintSection.stats.map((s, i) => {
            const isExpanded = expandedFootprint === i;
            const numVal = parseFloat(s.value.replace(/[^0-9.]/g, ""));
            const barWidth = isNaN(numVal) ? 50 : Math.max((numVal / maxTraining) * 100, 8);

            return (
              <div key={i} ref={isExpanded ? footprintScrollRef : null}>
                <Card
                  accent={footprintSection.color}
                  onClick={() => setExpandedFootprint(isExpanded ? null : i)}
                  style={{ cursor: "pointer" }}
                >
                  <div style={{ fontSize: 11, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
                    {s.metric}
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: footprintSection.color, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 6 }}>
                    {s.value}
                  </div>
                  {/* Relative bar */}
                  <div style={{ height: 6, background: "var(--surface)", borderRadius: 3, overflow: "hidden", marginBottom: 6 }}>
                    <div style={{
                      width: `${barWidth}%`,
                      height: "100%",
                      background: footprintSection.color,
                      borderRadius: 3,
                      transition: "width .5s ease"
                    }} />
                  </div>
                  <div style={{ fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace" }}>
                    {s.source}
                  </div>
                  {isExpanded && (
                    <Bx style={{ marginTop: 10 }}>
                      <div style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6 }}>
                        {s.detail[en ? "en" : "es"]}
                      </div>
                    </Bx>
                  )}
                  <div style={{ fontSize: 9, color: t.tx3, marginTop: 6, fontFamily: "'IBM Plex Mono',monospace", opacity: 0.7 }}>
                    {isExpanded ? "▾" : "▸"} {en ? "details" : "detalles"}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </ScrollReveal>

      {/* CR Opportunity callout */}
      <ScrollReveal>
        <Card style={{ marginBottom: 24, background: `${t.gn}08`, border: `1px solid ${t.gn}20`, borderLeft: `3px solid ${t.gn}` }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: t.gn, marginBottom: 6, fontFamily: "'IBM Plex Mono',monospace" }}>
            {en ? "CR GREEN AI OPPORTUNITY" : "OPORTUNIDAD AI VERDE CR"}
          </div>
          <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7, margin: 0 }}>
            {nexus.crOpportunity[en ? "en" : "es"]}
          </p>
        </Card>
      </ScrollReveal>

      {/* ═══════ 4. AI FOR CLIMATE MONITORING ═══════ */}
      <ScrollReveal>
        <SH
          color={t.gn}
          label={monitoringSection.icon + " " + (en ? "MONITORING" : "MONITOREO")}
          title={monitoringSection.title}
        />
      </ScrollReveal>

      <ScrollReveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12, marginBottom: 24 }}>
          {monitoringSection.applications.map((app, i) => {
            const colors = [t.gn, t.cy, t.vi, t.am, t.or];
            const color = colors[i % colors.length];
            return (
              <Card key={i} accent={color} style={{ padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <Icon name="globe" size={16} color={color} />
                  <div style={{ fontSize: 13, fontWeight: 700, color: t.tx }}>{app.name}</div>
                </div>
                <Tag color={color}>{app.tool}</Tag>
                <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6, marginTop: 8, marginBottom: 0 }}>
                  {app.detail[en ? "en" : "es"]}
                </p>
              </Card>
            );
          })}
        </div>
      </ScrollReveal>

      {/* ═══════ 5. CARBON TRACKING TOOLS ═══════ */}
      <ScrollReveal>
        <SH
          color={t.cy}
          label={trackingSection.icon + " " + (en ? "TOOLS" : "HERRAMIENTAS")}
          title={trackingSection.title}
        />
      </ScrollReveal>

      <ScrollReveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12, marginBottom: 24 }}>
          {trackingSection.tools.map((tool, i) => (
            <Card key={i} style={{ padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.tx }}>{tool.name}</div>
                <Tag color={t.cy}>{tool.type}</Tag>
              </div>
              <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6, marginTop: 4, marginBottom: 10 }}>
                {tool.detail[en ? "en" : "es"]}
              </p>
              <Lnk href={tool.url}>
                <span style={{ color: t.cy }}>{en ? "Open Tool" : "Abrir Herramienta"}</span>
              </Lnk>
            </Card>
          ))}
        </div>
      </ScrollReveal>

      {/* ═══════ 6. CLIMATE DATA SOURCES CATALOG ═══════ */}
      <ScrollReveal>
        <SH
          color={t.vi}
          label={en ? "DATA SOURCES" : "FUENTES DE DATOS"}
          title={en ? "Climate Data Sources Catalog" : "Catalogo de Fuentes de Datos Climaticos"}
          desc={en
            ? "Seven key data sources for climate intelligence, emissions tracking, and renewable energy assessment."
            : "Siete fuentes clave de datos para inteligencia climatica, seguimiento de emisiones y evaluacion de energia renovable."
          }
        />
      </ScrollReveal>

      <ScrollReveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {sources.map((src, i) => {
            const isExpanded = expandedSource === i;
            return (
              <div key={src.id} ref={isExpanded ? sourceScrollRef : null}>
                <Card
                  onClick={() => setExpandedSource(isExpanded ? null : i)}
                  style={{ cursor: "pointer", padding: 16 }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Icon name="chart" size={16} color={t.vi} />
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: t.tx }}>{src.name}</div>
                        <div style={{ fontSize: 11, color: t.tx3 }}>{src.org}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Tag color={t.vi}>{src.apiType}</Tag>
                      {src.free && <Tag color={t.gn}>{en ? "Free" : "Gratis"}</Tag>}
                      <span style={{ fontSize: 14, color: t.tx3, transition: "transform .2s", transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }}>
                        &#9662;
                      </span>
                    </div>
                  </div>

                  {isExpanded && (
                    <div style={{ marginTop: 12 }}>
                      <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6, marginBottom: 12 }}>
                        {src.description[en ? "en" : "es"]}
                      </p>

                      <div style={{ fontSize: 11, fontWeight: 700, color: t.tx2, marginBottom: 6, fontFamily: "'IBM Plex Mono',monospace", textTransform: "uppercase", letterSpacing: 0.5 }}>
                        {en ? "Datasets" : "Conjuntos de Datos"}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 12 }}>
                        {src.datasets.map((ds, j) => (
                          <div key={j} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: t.tx2 }}>
                            <span style={{ width: 4, height: 4, borderRadius: "50%", background: t.vi, flexShrink: 0 }} />
                            {ds}
                          </div>
                        ))}
                      </div>

                      <Bx style={{ borderLeft: `3px solid ${t.gn}` }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: t.gn, marginBottom: 4, fontFamily: "'IBM Plex Mono',monospace", textTransform: "uppercase" }}>
                          {en ? "CR Application" : "Aplicacion CR"}
                        </div>
                        <div style={{ fontSize: 12, color: t.tx2, lineHeight: 1.5 }}>
                          {src.crApplication[en ? "en" : "es"]}
                        </div>
                      </Bx>

                      <div style={{ marginTop: 10 }}>
                        <Lnk href={src.url}>
                          <span style={{ color: t.vi }}>{src.name}</span>
                        </Lnk>
                      </div>
                    </div>
                  )}

                  {!isExpanded && (
                    <div style={{ fontSize: 9, color: t.tx3, marginTop: 6, fontFamily: "'IBM Plex Mono',monospace", opacity: 0.7 }}>
                      ▸ {en ? "expand for details" : "expandir para detalles"}
                    </div>
                  )}
                </Card>
              </div>
            );
          })}
        </div>
      </ScrollReveal>

      {/* ═══════ 7. CLIMATE STATISTICS DASHBOARD ═══════ */}
      <ScrollReveal>
        <SH
          color={t.or}
          label={en ? "STATISTICS" : "ESTADISTICAS"}
          title={en ? "Climate Statistics Dashboard" : "Panel de Estadisticas Climaticas"}
          desc={en
            ? "Key metrics across emissions, biodiversity, AI compute, and Costa Rica's green advantage."
            : "Metricas clave en emisiones, biodiversidad, computacion AI y la ventaja verde de Costa Rica."
          }
        />
      </ScrollReveal>

      {stats.map((cat, ci) => {
        const catColor = CAT_COLORS[cat.category] || t.cy;
        return (
          <ScrollReveal key={ci}>
            <div style={{ marginBottom: 20 }}>
              {/* Category separator */}
              <div style={{
                display: "flex", alignItems: "center", gap: 10, marginBottom: 12,
                fontSize: 11, fontWeight: 700, color: catColor,
                fontFamily: "'IBM Plex Mono',monospace", textTransform: "uppercase", letterSpacing: 1.5,
              }}>
                <span style={{ width: 12, height: 3, borderRadius: 2, background: catColor }} />
                {cat.category}
                <span style={{ flex: 1, height: 1, background: `${catColor}25` }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10 }}>
                {cat.stats.map((s, si) => (
                  <Card key={si} style={{ padding: 16, borderLeft: `3px solid ${catColor}` }}>
                    <div style={{ fontSize: 11, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
                      {s.metric}
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
                      <span style={{ fontSize: 22, fontWeight: 800, color: catColor, fontFamily: "'IBM Plex Mono',monospace" }}>
                        {s.value}
                      </span>
                      {s.year && (
                        <span style={{ fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace" }}>
                          ({s.year})
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 11, color: t.tx3, lineHeight: 1.5 }}>{s.context}</div>
                    <div style={{ fontSize: 9, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", marginTop: 6, opacity: 0.6 }}>
                      {s.source}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollReveal>
        );
      })}

      {/* ── Sources footer ── */}
      <ScrollReveal>
        <Card style={{ marginTop: 8 }}>
          <div style={{ fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", letterSpacing: 0.3, lineHeight: 1.7 }}>
            {en ? "SOURCES" : "FUENTES"}: Climate TRACE, NASA POWER, Global Forest Watch, Electricity Maps, CodeCarbon, Our World in Data, Copernicus CDS, ICE, MINAE, SINAC, IEA, IRENA, Epoch AI, Stanford HAI, Google Environmental Report 2024
          </div>
        </Card>
      </ScrollReveal>
    </div>
  );
}
