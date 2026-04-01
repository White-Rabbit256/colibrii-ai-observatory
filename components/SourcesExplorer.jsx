"use client";
/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Data Sources Explorer
   Interactive catalog of 96+ data sources powering the observatory.
   Filterable by domain, phase, API type, with full-text search.
   ═══════════════════════════════════════════════════════════════ */

import { useState, useMemo } from "react";
import { Card, SH, Grid, ScrollReveal, Tag, Bx, MiniStat, Lnk } from "./ui";
import { Icon } from "./system/Icon";
import { DATA_SOURCES, SOURCES_SUMMARY } from "./sourcesData";

/* ── Domain color mapping ── */
const DOMAIN_COLORS = (t) => ({
  "Costa Rica Government":       t.cy,
  "Gobierno de Costa Rica":      t.cy,
  "International Organizations": t.vi,
  "Organizaciones Internacionales": t.vi,
  "Central Banks LATAM":         t.am,
  "Bancos Centrales LATAM":      t.am,
  "AI Governance":               t.gn,
  "Gobernanza AI":               t.gn,
  "Cybersecurity":               t.rd,
  "Ciberseguridad":              t.rd,
  "Financial":                   t.or,
  "Financiero":                  t.or,
  "Environmental":               t.pk,
  "Ambiental":                   t.pk,
  "Health":                      t.rd,
  "Salud":                       t.rd,
  "Research":                    t.vi,
  "Investigación":               t.vi,
  "Education Tools":             t.am,
  "Herramientas Educativas":     t.am,
});

/* ── API type colors ── */
const API_COLORS = (t) => ({
  REST:         t.cy,
  Download:     t.am,
  "Web scrape": t.or,
  SDMX:         t.vi,
  GraphQL:      t.pk,
  Manual:       t.rd,
});

/* ── Phase colors ── */
const PHASE_COLORS = (t) => ({
  1: t.gn,
  2: t.am,
  3: t.vi,
  4: t.cy,
});

/* ── Relevance order for sorting ── */
const REL_ORDER = { critical: 4, high: 3, medium: 2, low: 1 };

/* ── Relevance dots ── */
function RelevanceDots({ level, color }) {
  const n = REL_ORDER[level] || 1;
  return (
    <span style={{ display: "inline-flex", gap: 3, alignItems: "center" }}>
      {[1, 2, 3, 4].map(i => (
        <span key={i} style={{
          width: 6, height: 6, borderRadius: "50%",
          background: i <= n ? color : "var(--border)",
          transition: "background 0.2s"
        }} />
      ))}
      <span style={{ fontSize: 9, color: "var(--text3)", marginLeft: 3, fontFamily: "'IBM Plex Mono',monospace" }}>
        {level}
      </span>
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════ */

export function SourcesExplorer({ en, t }) {
  const [domainFilter, setDomainFilter] = useState("all");
  const [phaseFilter, setPhaseFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSource, setExpandedSource] = useState(null);

  const sources = useMemo(() => DATA_SOURCES(en), [en]);
  const summary = useMemo(() => SOURCES_SUMMARY(en), [en]);
  const domainColors = useMemo(() => DOMAIN_COLORS(t), [t]);
  const apiColors = useMemo(() => API_COLORS(t), [t]);
  const phaseColors = useMemo(() => PHASE_COLORS(t), [t]);

  /* ── Filtered + sorted sources ── */
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return sources
      .filter(s => {
        if (domainFilter !== "all" && s.domain !== domainFilter) return false;
        if (phaseFilter !== "all" && s.phase !== Number(phaseFilter)) return false;
        if (q) {
          const haystack = `${s.name} ${s.description?.[en ? "en" : "es"] || ""} ${s.domain} ${s.apiType}`.toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => (REL_ORDER[b.relevance] || 0) - (REL_ORDER[a.relevance] || 0));
  }, [sources, domainFilter, phaseFilter, searchQuery, en]);

  /* ── API type counts from filtered ── */
  const apiCounts = useMemo(() => {
    const m = {};
    filtered.forEach(s => { m[s.apiType] = (m[s.apiType] || 0) + 1; });
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [filtered]);

  /* ── Phase pill data ── */
  const phasePills = [
    { val: "all", label: en ? "All" : "Todas" },
    ...summary.phases.map(p => ({ val: String(p.phase), label: p.label, count: p.count }))
  ];

  const freeCount = sources.filter(s => s.free).length;
  const restCount = sources.filter(s => s.apiType === "REST").length;
  const integratedCount = sources.filter(s => s.phase === 1).length;

  /* ═══════════════════════════════ RENDER ═══════════════════════════════ */
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

      {/* ── 1. HEADER + SUMMARY STATS ── */}
      <section>
        <SH
          color={t.cy}
          label={en ? "Data Infrastructure" : "Infraestructura de Datos"}
          title={en ? "Data Sources Observatory" : "Observatorio de Fuentes de Datos"}
          desc={en
            ? `${summary.totalSources} data sources across ${summary.domains.length} domains powering the observatory's intelligence engine.`
            : `${summary.totalSources} fuentes de datos en ${summary.domains.length} dominios impulsando el motor de inteligencia del observatorio.`
          }
        />

        <Grid cols="repeat(auto-fit, minmax(140px, 1fr))" gap={10}>
          <MiniStat label={en ? "TOTAL SOURCES" : "FUENTES TOTALES"} value={summary.totalSources} color={t.cy} mono />
          <MiniStat label={en ? "FREE / OPEN" : "GRATIS / ABIERTO"} value={`${summary.freePercentage}%`} color={t.gn} mono />
          <MiniStat label="REST APIs" value={restCount} color={t.vi} mono />
          <MiniStat label={en ? "INTEGRATED" : "INTEGRADAS"} value={integratedCount} color={t.am} mono />
          <MiniStat label={en ? "DOMAINS" : "DOMINIOS"} value={summary.domains.length} color={t.or} mono />
        </Grid>
      </section>

      {/* ── 2. DOMAIN BREAKDOWN ── */}
      <ScrollReveal>
        <Card>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 12 }}>
            {en ? "SOURCES BY DOMAIN" : "FUENTES POR DOMINIO"}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {summary.domains.map((d, i) => {
              const active = domainFilter === d.name;
              const clr = domainColors[d.name] || t.cy;
              return (
                <button
                  key={i}
                  onClick={() => setDomainFilter(active ? "all" : d.name)}
                  style={{
                    padding: "6px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                    cursor: "pointer", transition: "all 0.2s",
                    border: `1px solid ${active ? clr : "var(--border)"}`,
                    background: active ? `${clr}18` : "var(--surface)",
                    color: active ? clr : "var(--text2)",
                    display: "inline-flex", alignItems: "center", gap: 6
                  }}
                >
                  {d.name}
                  <span style={{
                    fontSize: 10, fontWeight: 800, fontFamily: "'IBM Plex Mono',monospace",
                    padding: "1px 6px", borderRadius: 10,
                    background: active ? `${clr}30` : "var(--border)",
                    color: active ? clr : "var(--text3)"
                  }}>
                    {d.count}
                  </span>
                </button>
              );
            })}
          </div>
        </Card>
      </ScrollReveal>

      {/* ── 3. FILTER BAR ── */}
      <ScrollReveal>
        <Card style={{ padding: 16 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
            {/* Search input */}
            <div style={{ flex: "1 1 220px", position: "relative" }}>
              <Icon name="search" size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", opacity: 0.4 }} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={en ? "Search sources..." : "Buscar fuentes..."}
                style={{
                  width: "100%", padding: "8px 12px 8px 30px", fontSize: 13,
                  border: "1px solid var(--border)", borderRadius: 8,
                  background: "var(--surface)", color: "var(--text)",
                  outline: "none", fontFamily: "inherit",
                  transition: "border-color 0.2s"
                }}
                onFocus={e => e.target.style.borderColor = t.cy}
                onBlur={e => e.target.style.borderColor = "var(--border)"}
              />
            </div>

            {/* Phase pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {phasePills.map(p => {
                const active = phaseFilter === p.val;
                const clr = p.val === "all" ? t.cy : (phaseColors[Number(p.val)] || t.cy);
                return (
                  <button
                    key={p.val}
                    onClick={() => setPhaseFilter(active ? "all" : p.val)}
                    style={{
                      padding: "5px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600,
                      cursor: "pointer", transition: "all 0.2s",
                      border: `1px solid ${active ? clr : "var(--border)"}`,
                      background: active ? `${clr}18` : "transparent",
                      color: active ? clr : "var(--text3)",
                      fontFamily: "'IBM Plex Mono',monospace"
                    }}
                  >
                    {p.label}{p.count != null ? ` (${p.count})` : ""}
                  </button>
                );
              })}
            </div>

            {/* Result count */}
            <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace", whiteSpace: "nowrap" }}>
              {en ? `Showing ${filtered.length} of ${sources.length}` : `Mostrando ${filtered.length} de ${sources.length}`}
            </div>
          </div>
        </Card>
      </ScrollReveal>

      {/* ── 4. SOURCES CATALOG ── */}
      <section>
        <Grid cols="repeat(auto-fill, minmax(300px, 1fr))" gap={12}>
          {filtered.map((s, i) => {
            const isExpanded = expandedSource === s.id;
            const clr = domainColors[s.domain] || t.cy;
            const desc = s.description?.[en ? "en" : "es"] || "";
            const crNote = s.crRelevance?.[en ? "en" : "es"] || "";

            return (
              <ScrollReveal key={s.id} delay={Math.min(i * 30, 300)}>
                <Card
                  onClick={() => setExpandedSource(isExpanded ? null : s.id)}
                  style={{ cursor: "pointer", borderLeft: `3px solid ${clr}`, padding: 16 }}
                >
                  {/* Header row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", lineHeight: 1.3, flex: 1 }}>
                      {s.name}
                    </div>
                    <Icon name={isExpanded ? "chevUp" : "chevDown"} size={14} style={{ opacity: 0.4, flexShrink: 0, marginTop: 2 }} />
                  </div>

                  {/* Tags row */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 8 }}>
                    <Tag color={clr}>{s.domain}</Tag>
                    <Tag color={apiColors[s.apiType] || t.cy}>{s.apiType}</Tag>
                    <Tag color={s.free ? t.gn : t.or}>{s.free ? (en ? "Free" : "Gratis") : (en ? "Paid" : "Pago")}</Tag>
                    <Tag color={phaseColors[s.phase] || t.cy}>P{s.phase}</Tag>
                  </div>

                  {/* Relevance */}
                  <RelevanceDots level={s.relevance} color={clr} />

                  {/* Expanded content */}
                  {isExpanded && (
                    <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
                      <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6, marginBottom: 10 }}>
                        {desc}
                      </p>
                      {crNote && (
                        <Bx style={{ marginBottom: 10 }}>
                          <div style={{ fontSize: 10, color: t.am, fontWeight: 700, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
                            {en ? "CR RELEVANCE" : "RELEVANCIA CR"}
                          </div>
                          <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.5, margin: 0 }}>
                            {crNote}
                          </p>
                        </Bx>
                      )}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                        {s.url && (
                          <Lnk href={s.url}>{en ? "Visit source" : "Visitar fuente"}</Lnk>
                        )}
                        <span style={{ fontSize: 10, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace" }}>
                          {en ? "Auth:" : "Auth:"} {s.authRequired ? (en ? "Required" : "Requerido") : (en ? "None" : "Ninguno")}
                          {" | "}
                          {en ? "Complexity:" : "Complejidad:"} {s.complexity}
                        </span>
                      </div>
                    </div>
                  )}
                </Card>
              </ScrollReveal>
            );
          })}
        </Grid>

        {filtered.length === 0 && (
          <Card style={{ textAlign: "center", padding: 40 }}>
            <div style={{ fontSize: 14, color: "var(--text3)" }}>
              {en ? "No sources match your filters." : "Ninguna fuente coincide con sus filtros."}
            </div>
            <button
              onClick={() => { setDomainFilter("all"); setPhaseFilter("all"); setSearchQuery(""); }}
              style={{
                marginTop: 12, padding: "6px 14px", fontSize: 12, fontWeight: 600,
                border: `1px solid ${t.cy}`, borderRadius: 6,
                background: "transparent", color: t.cy, cursor: "pointer"
              }}
            >
              {en ? "Clear filters" : "Limpiar filtros"}
            </button>
          </Card>
        )}
      </section>

      {/* ── 5. API TYPE DISTRIBUTION ── */}
      <ScrollReveal>
        <Card>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 12 }}>
            {en ? "API TYPE DISTRIBUTION" : "DISTRIBUCIÓN POR TIPO API"}
          </div>

          {/* Segmented bar */}
          <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", height: 28, marginBottom: 14 }}>
            {Object.entries(summary.apiBreakdown).map(([type, count]) => {
              const pct = (count / summary.totalSources) * 100;
              const clr = apiColors[type] || t.cy;
              return (
                <div
                  key={type}
                  title={`${type}: ${count}`}
                  style={{
                    width: `${pct}%`, background: clr, minWidth: pct > 2 ? 0 : 4,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 9, fontWeight: 700, color: "#fff",
                    fontFamily: "'IBM Plex Mono',monospace", transition: "width 0.4s"
                  }}
                >
                  {pct > 8 ? `${type} ${count}` : ""}
                </div>
              );
            })}
          </div>

          {/* Legend pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {Object.entries(summary.apiBreakdown).map(([type, count]) => (
              <Tag key={type} color={apiColors[type] || t.cy}>
                {type}: {count}
              </Tag>
            ))}
          </div>
        </Card>
      </ScrollReveal>

      {/* ── 6. INTEGRATION PHASES ── */}
      <ScrollReveal>
        <SH
          color={t.gn}
          label={en ? "Integration Roadmap" : "Hoja de Ruta"}
          title={en ? "Integration Phases" : "Fases de Integración"}
          desc={en
            ? "How we're progressively integrating data sources into the observatory."
            : "Cómo integramos progresivamente fuentes de datos en el observatorio."
          }
        />
        <Grid cols="repeat(auto-fit, minmax(200px, 1fr))" gap={12}>
          {summary.phases.map(p => {
            const clr = phaseColors[p.phase] || t.cy;
            const icons = { 1: "shield", 2: "chart", 3: "globe", 4: "factory" };
            const descs = {
              1: en ? "Live in production. Data flows into dashboards and AI models in real-time."
                    : "En producción. Datos fluyen a dashboards y modelos AI en tiempo real.",
              2: en ? "Scheduled for integration. APIs tested, schemas mapped, awaiting pipeline build."
                    : "Programadas para integración. APIs probadas, esquemas mapeados, pendiente pipeline.",
              3: en ? "Identified for future research. Requires partnerships or new data agreements."
                    : "Identificadas para investigación futura. Requiere alianzas o nuevos acuerdos de datos.",
              4: en ? "Exploratory sources for long-term vision. May require novel data collection methods."
                    : "Fuentes exploratorias de largo plazo. Puede requerir métodos novedosos de recolección."
            };
            return (
              <Card key={p.phase} accent={clr} d={p.phase * 0.08}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                    background: `${clr}15`, color: clr
                  }}>
                    <Icon name={icons[p.phase] || "globe"} size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: clr, fontFamily: "'IBM Plex Mono',monospace" }}>
                      {en ? "PHASE" : "FASE"} {p.phase}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{p.label}</div>
                  </div>
                </div>
                <div style={{ fontSize: 26, fontWeight: 800, color: clr, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 6 }}>
                  {p.count}
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text3)", marginLeft: 4 }}>
                    {en ? "sources" : "fuentes"}
                  </span>
                </div>
                <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.5, margin: 0 }}>
                  {descs[p.phase]}
                </p>
              </Card>
            );
          })}
        </Grid>
      </ScrollReveal>

    </div>
  );
}
