"use client";
import { useState, useRef, useEffect } from "react";
import { Card, SH, Grid, ScrollReveal, Tag, Bx, MiniStat, Lnk, Flag, KeyInsight, FreshnessBadge, ProgressBar } from "./ui";
import { Icon } from "./system/Icon";
import { GOV_INDICES, LATAM_AI_POLICY, OAS_FRAMEWORK, GOV_RESOURCES } from "./governanceData";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Governance Intelligence Deep Dive
   Deep governance data: 10 indices, LATAM AI policy landscape,
   OAS framework, governance resources & tools
   Sources: V-Dem, Freedom House, WGI, WJP, TI, RSF, OECD, OAS,
   UNESCO, CSET, IDB, NIST, Singapore IMDA
   ═══════════════════════════════════════════════════════════════ */

// ── Color helpers ──
const scoreColor = (ratio) =>
  ratio >= 0.7 ? "#10b981" : ratio >= 0.45 ? "#f59e0b" : "#ef4444";

const statusColor = (status) => {
  if (!status) return "#64748b";
  const s = status.toLowerCase();
  if (s.includes("advanced")) return "#10b981";
  if (s.includes("avanzado")) return "#10b981";
  if (s.includes("moderate")) return "#3b82f6";
  if (s.includes("moderado")) return "#3b82f6";
  if (s.includes("developing") || s.includes("desarrollo")) return "#f59e0b";
  if (s.includes("emerging") || s.includes("emergente")) return "#f59e0b";
  return "#ef4444";
};

// ── Format score display ──
function fmtScore(score, max) {
  if (score == null) return "—";
  if (max === 1.0 || max === 1) return score.toFixed(2);
  return String(score);
}

// ── Expandable Index Card ──
function IndexCard({ idx, en, expanded, onToggle, cardRef }) {
  const ratio = idx.crScore != null && idx.maxScore != null ? idx.crScore / idx.maxScore : null;
  const color = ratio != null ? scoreColor(ratio) : "#64748b";

  return (
    <div ref={expanded ? cardRef : undefined}>
      <button
        onClick={onToggle}
        style={{
          display: "flex", flexDirection: "column", gap: 8, padding: "14px 16px",
          background: expanded ? `${color}08` : "var(--card)",
          border: expanded ? `2px solid ${color}30` : "1px solid var(--border)",
          borderLeft: `4px solid ${color}`,
          borderRadius: 12, cursor: "pointer", textAlign: "left", width: "100%",
          transition: "all .2s ease",
          boxShadow: expanded ? `0 2px 12px ${color}15` : "0 1px 3px rgba(0,0,0,0.04)",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
      >
        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", lineHeight: 1.3 }}>{idx.name}</div>
            <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace", marginTop: 2 }}>
              {idx.org} · {idx.year}
            </div>
          </div>
          <span style={{ fontSize: 12, color, opacity: 0.6, transform: expanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", flexShrink: 0, marginLeft: 8 }}>▾</span>
        </div>

        {/* Score row */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          {idx.crScore != null && (
            <span style={{
              fontSize: 11, fontWeight: 700, fontFamily: "'IBM Plex Mono',monospace",
              color, background: `${color}12`, padding: "2px 8px", borderRadius: 6,
            }}>
              CR: {fmtScore(idx.crScore, idx.maxScore)}{idx.maxScore != null ? `/${fmtScore(idx.maxScore, idx.maxScore)}` : ""}
            </span>
          )}
          {idx.crRank != null && (
            <Tag color={color}>#{idx.crRank} / {idx.countries}</Tag>
          )}
          <span style={{ fontSize: 10, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace" }}>
            {idx.frequency} · {idx.countries} {en ? "countries" : "países"}
          </span>
        </div>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div style={{
          padding: "16px 18px", marginTop: -2,
          background: "var(--card)", border: "1px solid var(--border)",
          borderTop: "none", borderRadius: "0 0 12px 12px",
        }}>
          {/* Description */}
          <p style={{ fontSize: 12.5, color: "var(--text2)", lineHeight: 1.65, marginBottom: 14 }}>
            {en ? idx.description.en : idx.description.es}
          </p>

          {/* Dimensional breakdown */}
          {idx.dimensions.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 8 }}>
                {en ? "DIMENSIONAL BREAKDOWN" : "DESGLOSE DIMENSIONAL"}
              </div>
              {idx.dimensions.map((dim, i) => {
                const dMax = dim.max || idx.maxScore || 1;
                const dRatio = dim.score / dMax;
                const dColor = scoreColor(dRatio);
                return (
                  <div key={i} style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                      <span style={{ fontSize: 11.5, color: "var(--text2)" }}>{dim.name}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "'IBM Plex Mono',monospace", color: dColor }}>
                        {fmtScore(dim.score, dMax)}{dMax !== 1 && dMax !== idx.maxScore ? "" : ""}
                      </span>
                    </div>
                    <div style={{ height: 6, background: "var(--surface)", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{
                        height: "100%", borderRadius: 3,
                        width: `${Math.min(dRatio * 100, 100)}%`,
                        background: `linear-gradient(90deg, ${dColor}cc, ${dColor})`,
                        transition: "width 0.6s ease",
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* CR Context insight */}
          <div style={{
            padding: "10px 14px", background: `${color}06`,
            border: `1px solid ${color}18`, borderRadius: 10,
            borderLeft: `3px solid ${color}`,
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
              {en ? "CR INSIGHT" : "CONTEXTO CR"}
            </div>
            <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6, fontStyle: "italic", margin: 0 }}>
              {en ? idx.crContext.en : idx.crContext.es}
            </p>
          </div>

          {/* External link */}
          <div style={{ marginTop: 10 }}>
            <Lnk href={idx.url}>{en ? "View Full Index" : "Ver Índice Completo"}</Lnk>
          </div>
        </div>
      )}
    </div>
  );
}

// ── LATAM Country Card ──
function CountryCard({ country, en, expanded, onToggle, isCR, cardRef }) {
  const color = statusColor(country.status);

  return (
    <div ref={expanded ? cardRef : undefined}>
      <button
        onClick={onToggle}
        style={{
          display: "flex", flexDirection: "column", gap: 6, padding: "12px 14px",
          background: expanded ? `${color}06` : "var(--card)",
          border: isCR ? `2px solid var(--cyan)` : expanded ? `1.5px solid ${color}40` : "1px solid var(--border)",
          borderRadius: 12, cursor: "pointer", textAlign: "left", width: "100%",
          transition: "all .2s ease",
          boxShadow: isCR ? "0 0 12px rgba(34,211,238,0.08)" : "0 1px 3px rgba(0,0,0,0.04)",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
      >
        {/* Country header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 20 }}>{country.flag}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{country.country}</div>
              {isCR && <span style={{ fontSize: 9, fontWeight: 700, color: "var(--cyan)", fontFamily: "'IBM Plex Mono',monospace" }}>FOCUS</span>}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Tag color={color}>{country.status}</Tag>
            <span style={{ fontSize: 12, color, opacity: 0.6, transform: expanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>▾</span>
          </div>
        </div>

        {/* Strategy */}
        <div style={{ fontSize: 11, color: "var(--text2)", lineHeight: 1.4, marginTop: 2 }}>{country.strategy}</div>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div style={{
          padding: "14px 16px", marginTop: -2,
          background: "var(--card)", border: "1px solid var(--border)",
          borderTop: "none", borderRadius: "0 0 12px 12px",
        }}>
          {/* Legislation */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
              {en ? "AI LEGISLATION" : "LEGISLACIÓN AI"}
            </div>
            <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.5, margin: 0 }}>{country.legislation}</p>
          </div>

          {/* Institution */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
              {en ? "KEY INSTITUTION" : "INSTITUCIÓN CLAVE"}
            </div>
            <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.5, margin: 0 }}>{country.institution}</p>
          </div>

          {/* Key Facts */}
          {country.keyFacts && country.keyFacts.length > 0 && (
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 6 }}>
                {en ? "KEY FACTS" : "DATOS CLAVE"}
              </div>
              <ul style={{ margin: 0, paddingLeft: 16, listStyle: "none" }}>
                {country.keyFacts.map((fact, i) => (
                  <li key={i} style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6, marginBottom: 4, position: "relative", paddingLeft: 4 }}>
                    <span style={{ position: "absolute", left: -14, color }}>▸</span>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export function GovernanceDeep({ en, t }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [expandedCountry, setExpandedCountry] = useState(null);
  const [expandedPrinciple, setExpandedPrinciple] = useState(null);
  const indexDetailRef = useRef(null);
  const countryDetailRef = useRef(null);
  const principleDetailRef = useRef(null);

  // Auto-scroll expanded panels into view on mobile
  useEffect(() => {
    if (expandedIndex !== null && indexDetailRef.current) {
      setTimeout(() => {
        indexDetailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 50);
    }
  }, [expandedIndex]);

  useEffect(() => {
    if (expandedCountry !== null && countryDetailRef.current) {
      setTimeout(() => {
        countryDetailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 50);
    }
  }, [expandedCountry]);

  useEffect(() => {
    if (expandedPrinciple !== null && principleDetailRef.current) {
      setTimeout(() => {
        principleDetailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 50);
    }
  }, [expandedPrinciple]);

  const indices = GOV_INDICES(en);
  const latamPolicy = LATAM_AI_POLICY(en);
  const oasFramework = OAS_FRAMEWORK(en);
  const resources = GOV_RESOURCES(en);

  // Sort LATAM countries: CR first, then by status tier
  const statusOrder = { Advanced: 0, Avanzado: 0, "Moderate-Advanced": 1, "Moderado-Avanzado": 1, Moderate: 2, Moderado: 2, Developing: 3, "En Desarrollo": 3, Emerging: 4, Emergente: 4, Early: 5, Temprano: 5 };
  const sortedLatam = [...latamPolicy].sort((a, b) => {
    if (a.country === "Costa Rica") return -1;
    if (b.country === "Costa Rica") return 1;
    return (statusOrder[a.status] ?? 9) - (statusOrder[b.status] ?? 9);
  });

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>

      {/* ── KEY INSIGHT ── */}
      <KeyInsight
        icon="⚖️"
        color={t.vi}
        text={en
          ? "Costa Rica ranks among the world's top 25 democracies (V-Dem 0.87, Freedom House 91/100) — but this democratic strength hasn't yet translated into AI-specific governance. While Chile and Brazil lead LATAM with dedicated AI strategies and legislation, CR's ANIA remains a draft. This module maps 10 governance indices, 10 LATAM AI policy landscapes, and the OAS hemispheric framework."
          : "Costa Rica se posiciona entre las 25 democracias principales del mundo (V-Dem 0.87, Freedom House 91/100) — pero esta fortaleza democrática aún no se ha traducido en gobernanza específica de AI. Mientras Chile y Brasil lideran LATAM con estrategias y legislación AI dedicadas, la ANIA de CR sigue siendo borrador. Este módulo mapea 10 índices de gobernanza, 10 paisajes de política AI en LATAM y el marco hemisférico de la OEA."}
      />
      <FreshnessBadge date={en ? "March 2026" : "Marzo 2026"} en={en} />

      {/* ════════════════════════════════════════════════════════════
         §1 — HEADER + KEY STATS
         ════════════════════════════════════════════════════════════ */}
      <SH
        color={t.vi}
        label={en ? "GOVERNANCE INTELLIGENCE" : "INTELIGENCIA DE GOBERNANZA"}
        title={en ? "Governance Intelligence Deep Dive" : "Inteligencia de Gobernanza Profunda"}
        desc={en
          ? "Comprehensive governance index analysis, LATAM AI policy tracking, and hemispheric framework mapping for Costa Rica's AI readiness."
          : "Análisis comprensivo de índices de gobernanza, seguimiento de políticas AI en LATAM y mapeo de marcos hemisféricos para la preparación AI de Costa Rica."}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginBottom: 28 }}>
        <MiniStat
          label={en ? "Indices Tracked" : "Índices Rastreados"}
          value="10"
          color={t.vi}
          mono
        />
        <MiniStat
          label={en ? "CR Democracy (V-Dem)" : "Democracia CR (V-Dem)"}
          value="0.87"
          color={t.gn}
          mono
        />
        <MiniStat
          label={en ? "Freedom House" : "Freedom House"}
          value="91/100"
          color={t.cy}
          mono
        />
        <MiniStat
          label={en ? "7th LATAM AI Ready" : "7o LATAM AI Preparado"}
          value="#7"
          color={t.am}
          mono
        />
      </div>

      {/* ════════════════════════════════════════════════════════════
         §2 — GOVERNANCE INDEX EXPLORER
         ════════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <SH
          color={t.cy}
          label={en ? "INDEX EXPLORER" : "EXPLORADOR DE ÍNDICES"}
          title={en ? "Governance Index Deep Dive" : "Explorador Profundo de Índices"}
          desc={en
            ? "10 international indices measuring democracy, rule of law, transparency, digital government, and data governance — with Costa Rica's scores."
            : "10 índices internacionales midiendo democracia, estado de derecho, transparencia, gobierno digital y gobernanza de datos — con puntajes de Costa Rica."}
        />
      </ScrollReveal>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 36 }}>
        {indices.map((idx, i) => (
          <ScrollReveal key={idx.id} delay={i * 30}>
            <IndexCard
              idx={idx}
              en={en}
              expanded={expandedIndex === idx.id}
              onToggle={() => setExpandedIndex(expandedIndex === idx.id ? null : idx.id)}
              cardRef={indexDetailRef}
            />
          </ScrollReveal>
        ))}
      </div>

      {/* ════════════════════════════════════════════════════════════
         §3 — LATAM AI POLICY LANDSCAPE
         ════════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <SH
          color={t.gn}
          label={en ? "LATAM AI POLICY" : "POLÍTICA AI LATAM"}
          title={en ? "LATAM AI Policy Landscape" : "Panorama de Política AI en LATAM"}
          desc={en
            ? "10 Latin American countries assessed on AI strategy maturity, legislation status, and institutional capacity."
            : "10 países latinoamericanos evaluados en madurez de estrategia AI, estado de legislación y capacidad institucional."}
        />
      </ScrollReveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 10, marginBottom: 36 }}>
        {sortedLatam.map((country, i) => {
          const isCR = country.country === "Costa Rica";
          return (
            <ScrollReveal key={country.country} delay={i * 30}>
              <CountryCard
                country={country}
                en={en}
                expanded={expandedCountry === country.country}
                onToggle={() => setExpandedCountry(expandedCountry === country.country ? null : country.country)}
                isCR={isCR}
                cardRef={countryDetailRef}
              />
            </ScrollReveal>
          );
        })}
      </div>

      {/* ════════════════════════════════════════════════════════════
         §4 — OAS AI PRINCIPLES FRAMEWORK
         ════════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <SH
          color={t.or}
          label={en ? "HEMISPHERIC FRAMEWORK" : "MARCO HEMISFÉRICO"}
          title={en ? "OAS AI Governance Framework" : "Marco de Gobernanza AI de la OEA"}
          desc={en
            ? "The Inter-American Principles on AI — adopted November 2023 by 35 OAS member states."
            : "Los Principios Interamericanos sobre AI — adoptados noviembre 2023 por 35 estados miembros de la OEA."}
        />
      </ScrollReveal>

      <Card style={{ marginBottom: 16 }} accent={t.or}>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: "var(--text)", fontFamily: "var(--font-display, 'Playfair Display', serif)", marginBottom: 4 }}>
            {oasFramework.title}
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
            <span style={{ fontSize: 10, fontFamily: "'IBM Plex Mono',monospace", color: "var(--text3)" }}>
              {en ? "Adopted" : "Adoptado"}: {oasFramework.adoptedDate}
            </span>
            <span style={{ fontSize: 10, fontFamily: "'IBM Plex Mono',monospace", color: "var(--text3)" }}>
              {oasFramework.scope}
            </span>
          </div>
          <p style={{ fontSize: 12.5, color: "var(--text2)", lineHeight: 1.65, margin: 0 }}>
            {en ? oasFramework.overview.en : oasFramework.overview.es}
          </p>
        </div>
      </Card>

      {/* Principles grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10, marginBottom: 16 }}>
        {oasFramework.principles.map((p, i) => {
          const isExpanded = expandedPrinciple === i;
          const pColors = [t.cy, t.vi, t.gn, t.or, t.pk, t.am, "#8b5cf6"];
          const pColor = pColors[i % pColors.length];

          return (
            <ScrollReveal key={i} delay={i * 40}>
              <div ref={isExpanded ? principleDetailRef : undefined}>
                <button
                  onClick={() => setExpandedPrinciple(isExpanded ? null : i)}
                  style={{
                    display: "flex", flexDirection: "column", gap: 6,
                    padding: "14px 16px", width: "100%", textAlign: "left",
                    background: isExpanded ? `${pColor}06` : "var(--card)",
                    border: `1px solid ${isExpanded ? `${pColor}30` : "var(--border)"}`,
                    borderLeft: `4px solid ${pColor}`,
                    borderRadius: isExpanded ? "12px 12px 0 0" : 12,
                    cursor: "pointer", transition: "all .2s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{
                        width: 24, height: 24, borderRadius: 6,
                        background: `${pColor}15`, color: pColor,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 12, fontWeight: 800, fontFamily: "'IBM Plex Mono',monospace", flexShrink: 0,
                      }}>
                        {i + 1}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", lineHeight: 1.3 }}>{p.name}</span>
                    </div>
                    <span style={{ fontSize: 12, color: pColor, opacity: 0.6, transform: isExpanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", flexShrink: 0 }}>▾</span>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.5, margin: 0, marginTop: 2 }}>{p.description}</p>
                </button>

                {isExpanded && (
                  <div style={{
                    padding: "12px 16px",
                    background: "var(--card)", border: "1px solid var(--border)",
                    borderTop: "none", borderRadius: "0 0 12px 12px",
                  }}>
                    <div style={{
                      padding: "10px 14px", background: `${pColor}06`,
                      border: `1px solid ${pColor}18`, borderRadius: 10,
                      borderLeft: `3px solid ${pColor}`,
                    }}>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: pColor, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
                        {en ? "CR IMPLICATION" : "IMPLICACIÓN CR"}
                      </div>
                      <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6, fontStyle: "italic", margin: 0 }}>
                        {p.crImplication}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* CR OAS Status */}
      <Card style={{ marginBottom: 36 }}>
        <Bx style={{ borderLeft: `3px solid ${t.am}` }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: t.am, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
            {en ? "CR IMPLEMENTATION STATUS" : "ESTADO DE IMPLEMENTACIÓN CR"}
          </div>
          <p style={{ fontSize: 12.5, color: "var(--text2)", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>
            {en ? oasFramework.crStatus.en : oasFramework.crStatus.es}
          </p>
        </Bx>
        <div style={{ marginTop: 10 }}>
          <Lnk href={oasFramework.url}>{en ? "OAS AI Governance Portal" : "Portal Gobernanza AI OEA"}</Lnk>
        </div>
      </Card>

      {/* ════════════════════════════════════════════════════════════
         §5 — GOVERNANCE RESOURCES & TOOLS
         ════════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <SH
          color={t.pk}
          label={en ? "RESOURCES & TOOLS" : "RECURSOS Y HERRAMIENTAS"}
          title={en ? "Governance Resources & Tools" : "Recursos y Herramientas de Gobernanza"}
          desc={en
            ? "Key databases, frameworks, and tools for AI governance assessment — curated for Costa Rica's policy context."
            : "Bases de datos, marcos y herramientas clave para evaluación de gobernanza AI — curadas para el contexto de política de Costa Rica."}
        />
      </ScrollReveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12, marginBottom: 28 }}>
        {resources.map((res, i) => {
          const resColors = [t.cy, t.vi, t.gn, t.or, t.pk, t.am, "#8b5cf6"];
          const resColor = resColors[i % resColors.length];

          return (
            <ScrollReveal key={res.id} delay={i * 40}>
              <Card style={{ height: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", lineHeight: 1.3, marginBottom: 2 }}>{res.name}</div>
                    <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace" }}>{res.org}</div>
                  </div>
                  <Tag color={resColor}>{res.type}</Tag>
                </div>
                <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6, marginBottom: 10 }}>
                  {en ? res.description.en : res.description.es}
                </p>
                <Bx style={{ marginBottom: 10, borderLeft: `3px solid ${resColor}` }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: resColor, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 3 }}>
                    {en ? "CR USE CASE" : "CASO DE USO CR"}
                  </div>
                  <p style={{ fontSize: 11.5, color: "var(--text2)", lineHeight: 1.5, margin: 0 }}>
                    {en ? res.useCase.en : res.useCase.es}
                  </p>
                </Bx>
                <Lnk href={res.url}>{en ? "Open Resource" : "Abrir Recurso"}</Lnk>
              </Card>
            </ScrollReveal>
          );
        })}
      </div>

    </div>
  );
}
