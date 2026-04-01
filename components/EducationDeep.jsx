"use client";
import { useState, useRef, useEffect } from "react";
import { Card, SH, Grid, ScrollReveal, Tag, Bx, MiniStat, Lnk, ProgressBar, KeyInsight, FreshnessBadge, PartnerBar } from "./ui";
import { Icon } from "./system/Icon";
import { EDU_FRAMEWORKS, EDU_TOOLS, EDU_CURRICULA, EDU_STATS } from "./educationData";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Education Deep Intelligence
   UNESCO AI Competency Frameworks, AI literacy tools,
   curricula programs, and education metrics dashboard.
   Sources: UNESCO, AI4K12, Code.org, MIT, CONARE, MEP, INTEF
   ═══════════════════════════════════════════════════════════════ */

// ── Area color mapping ──
const AREA_COLORS = {
  "AI Mindset": "#8b5cf6", "Mentalidad AI": "#8b5cf6",
  "AI Use": "#3b82f6", "Uso de AI": "#3b82f6",
  "AI Ethics": "#ef4444", "Ética AI": "#ef4444",
  "AI Creation": "#10b981", "Creación con AI": "#10b981",
  "AI Pedagogy": "#0ea5e9", "Pedagogía AI": "#0ea5e9",
  "AI Knowledge": "#f59e0b", "Conocimiento AI": "#f59e0b",
  "Professional AI": "#6366f1", "AI Profesional": "#6366f1",
};

// ── Group competencies by area ──
function groupByArea(competencies) {
  const groups = {};
  competencies.forEach(c => {
    if (!groups[c.area]) groups[c.area] = [];
    groups[c.area].push(c);
  });
  return groups;
}

// ── Tab pill button ──
function TabPill({ active, label, count, color, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "7px 16px", fontSize: 12, fontWeight: active ? 700 : 500,
        border: active ? `1.5px solid ${color}` : "1px solid var(--border)",
        borderRadius: 20, cursor: "pointer", transition: "all .2s ease",
        background: active ? `${color}15` : "var(--card)",
        color: active ? color : "var(--text2)",
        display: "inline-flex", alignItems: "center", gap: 6,
        whiteSpace: "nowrap",
      }}
    >
      {label}
      {count != null && (
        <span style={{
          fontSize: 10, fontWeight: 700, fontFamily: "'IBM Plex Mono',monospace",
          background: active ? `${color}20` : "var(--surface)",
          color: active ? color : "var(--text3)",
          padding: "1px 6px", borderRadius: 10,
        }}>
          {count}
        </span>
      )}
    </button>
  );
}

// ── Filter toggle button ──
function FilterBtn({ active, label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "5px 12px", fontSize: 11, fontWeight: active ? 700 : 500,
        border: active ? "1.5px solid var(--cyan)" : "1px solid var(--border)",
        borderRadius: 16, cursor: "pointer", transition: "all .2s ease",
        background: active ? "rgba(6,182,212,0.1)" : "var(--card)",
        color: active ? "var(--cyan)" : "var(--text3)",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

// ── Competency card ──
function CompetencyCard({ comp, delay = 0 }) {
  const areaColor = AREA_COLORS[comp.area] || "var(--cyan)";
  return (
    <Card d={delay * 0.04} style={{ padding: 16 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <span style={{
          fontSize: 11, fontWeight: 700, fontFamily: "'IBM Plex Mono',monospace",
          color: areaColor, background: `${areaColor}12`, border: `1px solid ${areaColor}25`,
          padding: "2px 8px", borderRadius: 6, flexShrink: 0,
        }}>
          {comp.id}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4, flexWrap: "wrap" }}>
            <Tag color={areaColor}>{comp.area}</Tag>
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 4, lineHeight: 1.3 }}>
            {comp.name}
          </div>
          <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6 }}>
            {comp.description}
          </div>
        </div>
      </div>
    </Card>
  );
}

// ── Big Idea card (AI4K12) ──
function BigIdeaCard({ idea, en }) {
  return (
    <Card d={idea.id * 0.06} accent={idea.color} style={{ padding: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{
          width: 32, height: 32, borderRadius: "50%", display: "flex",
          alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800,
          fontFamily: "'IBM Plex Mono',monospace", color: "#fff",
          background: idea.color, flexShrink: 0,
        }}>
          {idea.id}
        </span>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>{idea.name}</div>
        </div>
      </div>
      <div style={{ fontSize: 12.5, color: "var(--text2)", lineHeight: 1.6, marginBottom: 10 }}>
        {idea.subtitle}
      </div>
      <Bx style={{ marginTop: 6 }}>
        <div style={{ fontSize: 10, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 3, textTransform: "uppercase", letterSpacing: 0.5 }}>
          {en ? "Examples" : "Ejemplos"}
        </div>
        <div style={{ fontSize: 11.5, color: "var(--text2)", lineHeight: 1.5 }}>{idea.examples}</div>
      </Bx>
    </Card>
  );
}

// ── Tool card ──
function ToolCard({ tool, en }) {
  const desc = typeof tool.description === "object" ? (en ? tool.description.en : tool.description.es) : tool.description;
  const pedUse = typeof tool.pedagogicalUse === "object" ? (en ? tool.pedagogicalUse.en : tool.pedagogicalUse.es) : tool.pedagogicalUse;

  return (
    <Card d={0.05} style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", lineHeight: 1.3, flex: 1 }}>
          {tool.name}
        </div>
        <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
          {tool.free && (
            <span style={{
              fontSize: 9, fontWeight: 700, color: "#10b981", background: "rgba(16,185,129,0.12)",
              border: "1px solid rgba(16,185,129,0.25)", padding: "2px 6px", borderRadius: 4,
              fontFamily: "'IBM Plex Mono',monospace",
            }}>
              FREE
            </span>
          )}
          {tool.spanishSupport && (
            <span style={{ fontSize: 12 }} title={en ? "Spanish support" : "Soporte en español"}>
              🇪🇸
            </span>
          )}
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
        <Tag color="var(--cyan)">{tool.category}</Tag>
        <span style={{ fontSize: 10, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace" }}>
          {en ? "Ages" : "Edades"} {tool.ageRange}
        </span>
      </div>

      <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6, flex: 1 }}>
        {desc}
      </div>

      <Bx style={{ marginTop: "auto" }}>
        <div style={{ fontSize: 10, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 3, textTransform: "uppercase", letterSpacing: 0.5 }}>
          {en ? "Pedagogical Use" : "Uso Pedagógico"}
        </div>
        <div style={{ fontSize: 11, color: "var(--text2)", lineHeight: 1.5 }}>{pedUse}</div>
      </Bx>

      <div style={{ marginTop: 4 }}>
        <Lnk href={tool.url}>{en ? "Open Tool" : "Abrir Herramienta"}</Lnk>
      </div>
    </Card>
  );
}

// ── Curriculum card with expand ──
function CurriculumCard({ curr, en, expanded, onToggle }) {
  const ref = useRef(null);
  const desc = typeof curr.description === "object" ? (en ? curr.description.en : curr.description.es) : curr.description;
  const crRel = typeof curr.crRelevance === "object" ? (en ? curr.crRelevance.en : curr.crRelevance.es) : curr.crRelevance;

  useEffect(() => {
    if (expanded && ref.current) {
      setTimeout(() => {
        ref.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }
  }, [expanded]);

  return (
    <div ref={ref}>
      <Card d={0.05} onClick={onToggle} style={{ padding: 16, cursor: "pointer" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", lineHeight: 1.3, marginBottom: 6 }}>
              {curr.name}
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6, alignItems: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text2)" }}>{curr.org}</span>
              {curr.free && (
                <span style={{
                  fontSize: 9, fontWeight: 700, color: "#10b981", background: "rgba(16,185,129,0.12)",
                  border: "1px solid rgba(16,185,129,0.25)", padding: "1px 5px", borderRadius: 4,
                  fontFamily: "'IBM Plex Mono',monospace",
                }}>
                  FREE
                </span>
              )}
              {curr.spanishSupport && <span style={{ fontSize: 11 }}>🇪🇸</span>}
            </div>
            <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace" }}>
              {curr.targetAudience}
            </div>
          </div>
          <span style={{
            fontSize: 14, color: "var(--text3)", transition: "transform 0.2s",
            transform: expanded ? "rotate(180deg)" : "rotate(0)",
          }}>
            ▾
          </span>
        </div>

        <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6, marginTop: 8 }}>
          {desc}
        </div>

        {expanded && (
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
            <Bx>
              <div style={{ fontSize: 10, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>
                {en ? "CR Relevance" : "Relevancia CR"}
              </div>
              <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6, fontStyle: "italic" }}>
                {crRel}
              </div>
            </Bx>
            <div style={{ marginTop: 10 }}>
              <Lnk href={curr.url}>{en ? "Visit Program" : "Visitar Programa"}</Lnk>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

// ── Metric card with benchmark progress ──
function MetricCard({ m, en }) {
  // Try to extract numeric value for progress bar
  const numValue = parseFloat(m.value.replace(/[^0-9.]/g, ""));
  const benchStr = m.benchmark || "";
  const benchNum = parseFloat(benchStr.replace(/[^0-9.]/g, ""));
  const hasProgress = !isNaN(numValue) && !isNaN(benchNum) && benchNum > 0;

  // Determine a color based on whether CR exceeds benchmark
  const ratio = hasProgress ? numValue / benchNum : 0;
  const barColor = ratio >= 1 ? "var(--green)" : ratio >= 0.7 ? "var(--amber)" : "var(--red)";

  return (
    <Card d={0.04} style={{ padding: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", marginBottom: 8, lineHeight: 1.3 }}>
        {m.metric}
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, color: "var(--cyan)", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
        {m.value}
      </div>

      {hasProgress && (
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--text3)", marginBottom: 3, fontFamily: "'IBM Plex Mono',monospace" }}>
            <span>CR</span>
            <span>{en ? "Benchmark" : "Referencia"}</span>
          </div>
          <div style={{ position: "relative", height: 6, background: "var(--surface)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{
              position: "absolute", top: 0, left: 0, height: "100%",
              width: `${Math.min(ratio * 100, 100)}%`,
              background: barColor, borderRadius: 3, transition: "width 0.6s ease",
            }} />
          </div>
        </div>
      )}

      <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 4 }}>{m.benchmark}</div>
      <div style={{ fontSize: 10, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace", opacity: 0.7 }}>
        {m.source} ({m.year})
      </div>
    </Card>
  );
}

// ── Gap severity card ──
function GapCard({ gap }) {
  return (
    <Card d={0.05} accent={gap.color} style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{gap.area}</div>
        <span style={{
          fontSize: 10, fontWeight: 700, fontFamily: "'IBM Plex Mono',monospace",
          color: gap.color, background: `${gap.color}15`, border: `1px solid ${gap.color}30`,
          padding: "2px 8px", borderRadius: 6,
        }}>
          {gap.status}
        </span>
      </div>
      <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6 }}>
        {typeof gap.detail === "object" ? (gap.detail.en || gap.detail.es) : gap.detail}
      </div>
    </Card>
  );
}

// ── Localized gap detail helper ──
function gapDetail(gap, en) {
  if (typeof gap.detail === "object") return en ? gap.detail.en : gap.detail.es;
  return gap.detail;
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export function EducationDeep({ en, t }) {
  const [frameworkTab, setFrameworkTab] = useState("students");
  const [toolFilter, setToolFilter] = useState("all");
  const [expandedCurr, setExpandedCurr] = useState(null);

  const frameworks = EDU_FRAMEWORKS(en);
  const tools = EDU_TOOLS(en);
  const curricula = EDU_CURRICULA(en);
  const stats = EDU_STATS(en);

  // Filter tools
  const filteredTools = tools.filter(tool => {
    if (toolFilter === "all") return true;
    if (toolFilter === "free") return tool.free;
    if (toolFilter === "interactive") return tool.embeddable;
    if (toolFilter === "spanish") return tool.spanishSupport;
    return true;
  });

  // Framework data for current tab
  const fwStudents = frameworks.students;
  const fwTeachers = frameworks.teachers;
  const fwAi4k12 = frameworks.ai4k12;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

      {/* ── SECTION 1: Header + Key Stats ── */}
      <section>
        <FreshnessBadge date="2025-03" en={en} />
        <SH
          color={t.cy}
          label={en ? "PREMIUM INTELLIGENCE" : "INTELIGENCIA PREMIUM"}
          title={en ? "AI Education Intelligence" : "Inteligencia de Educacion AI"}
          desc={en
            ? "UNESCO competency frameworks, AI literacy tools, curricula programs, and education metrics for Costa Rica."
            : "Marcos de competencias UNESCO, herramientas de alfabetizacion AI, programas de curricula y metricas de educacion para Costa Rica."
          }
        />

        <KeyInsight
          icon="🎓"
          color={t.cy}
          text={en
            ? "Costa Rica has no dedicated AI/ML degree programs at public universities. AI is taught only as elective modules — a critical gap as STEM demand accelerates."
            : "Costa Rica no tiene programas de grado dedicados a AI/ML en universidades publicas. AI se ensena solo como modulos electivos — una brecha critica mientras la demanda STEM acelera."
          }
        />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 10, marginTop: 16,
        }}>
          <MiniStat label={en ? "Student Competencies" : "Competencias Estudiantes"} value="12" color={t.vi} mono />
          <MiniStat label={en ? "Teacher Competencies" : "Competencias Docentes"} value="15" color={t.cy} mono />
          <MiniStat label={en ? "AI Literacy Tools" : "Herramientas AI"} value="15" color={t.gn} mono />
          <MiniStat label={en ? "Curricula Programs" : "Programas Curricula"} value="7" color={t.am} mono />
        </div>
      </section>

      {/* ── SECTION 2: UNESCO Competency Frameworks ── */}
      <section>
        <SH
          color={t.vi}
          label="UNESCO / AI4K12"
          title={en ? "AI Competency Frameworks" : "Marcos de Competencias AI"}
          desc={en
            ? "Global standards for AI education — what students and teachers should know and be able to do."
            : "Estandares globales para educacion AI — lo que estudiantes y docentes deben saber y poder hacer."
          }
        />

        {/* Tab pills */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          <TabPill
            active={frameworkTab === "students"}
            label={en ? "Students" : "Estudiantes"}
            count={12}
            color={t.vi}
            onClick={() => setFrameworkTab("students")}
          />
          <TabPill
            active={frameworkTab === "teachers"}
            label={en ? "Teachers" : "Docentes"}
            count={15}
            color={t.cy}
            onClick={() => setFrameworkTab("teachers")}
          />
          <TabPill
            active={frameworkTab === "ai4k12"}
            label="AI4K12"
            count={5}
            color={t.gn}
            onClick={() => setFrameworkTab("ai4k12")}
          />
        </div>

        {/* Students tab */}
        {frameworkTab === "students" && (
          <ScrollReveal>
            <Bx style={{ marginBottom: 16, padding: "12px 16px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>
                {fwStudents.title}
              </div>
              <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 6 }}>
                {fwStudents.year} · {fwStudents.totalCompetencies} {en ? "competencies" : "competencias"} · 3 {en ? "levels" : "niveles"}
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {fwStudents.levels.map((l, i) => (
                  <Tag key={i} color={t.vi}>{l}</Tag>
                ))}
              </div>
              <div style={{ marginTop: 8 }}>
                <Lnk href={fwStudents.url}>{en ? "UNESCO Source" : "Fuente UNESCO"}</Lnk>
              </div>
            </Bx>

            {Object.entries(groupByArea(fwStudents.competencies)).map(([area, comps]) => (
              <div key={area} style={{ marginBottom: 16 }}>
                <div style={{
                  fontSize: 12, fontWeight: 700, color: AREA_COLORS[area] || "var(--text)",
                  fontFamily: "'IBM Plex Mono',monospace", letterSpacing: 0.5,
                  textTransform: "uppercase", marginBottom: 10, paddingLeft: 2,
                }}>
                  {area}
                </div>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 10,
                }}>
                  {comps.map((c, i) => <CompetencyCard key={c.id} comp={c} delay={i} />)}
                </div>
              </div>
            ))}
          </ScrollReveal>
        )}

        {/* Teachers tab */}
        {frameworkTab === "teachers" && (
          <ScrollReveal>
            <Bx style={{ marginBottom: 16, padding: "12px 16px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>
                {fwTeachers.title}
              </div>
              <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 6 }}>
                {fwTeachers.year} · {fwTeachers.totalCompetencies} {en ? "competencies" : "competencias"} · 3 {en ? "levels" : "niveles"}
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {fwTeachers.levels.map((l, i) => (
                  <Tag key={i} color={t.cy}>{l}</Tag>
                ))}
              </div>
              <div style={{ marginTop: 8 }}>
                <Lnk href={fwTeachers.url}>{en ? "UNESCO Source" : "Fuente UNESCO"}</Lnk>
              </div>
            </Bx>

            {Object.entries(groupByArea(fwTeachers.competencies)).map(([area, comps]) => (
              <div key={area} style={{ marginBottom: 16 }}>
                <div style={{
                  fontSize: 12, fontWeight: 700, color: AREA_COLORS[area] || "var(--text)",
                  fontFamily: "'IBM Plex Mono',monospace", letterSpacing: 0.5,
                  textTransform: "uppercase", marginBottom: 10, paddingLeft: 2,
                }}>
                  {area}
                </div>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 10,
                }}>
                  {comps.map((c, i) => <CompetencyCard key={c.id} comp={c} delay={i} />)}
                </div>
              </div>
            ))}
          </ScrollReveal>
        )}

        {/* AI4K12 tab */}
        {frameworkTab === "ai4k12" && (
          <ScrollReveal>
            <Bx style={{ marginBottom: 16, padding: "12px 16px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>
                {fwAi4k12.title}
              </div>
              <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
                {fwAi4k12.org} · {fwAi4k12.year}
              </div>
              <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6, marginBottom: 8 }}>
                {en ? fwAi4k12.description.en : fwAi4k12.description.es}
              </div>
              <Lnk href={fwAi4k12.url}>{en ? "AI4K12 Website" : "Sitio Web AI4K12"}</Lnk>
            </Bx>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 12,
            }}>
              {fwAi4k12.bigIdeas.map(idea => (
                <BigIdeaCard key={idea.id} idea={idea} en={en} />
              ))}
            </div>
          </ScrollReveal>
        )}
      </section>

      {/* ── SECTION 3: AI Literacy Tools Gallery ── */}
      <section>
        <SH
          color={t.gn}
          label={en ? "TOOLS & PLATFORMS" : "HERRAMIENTAS Y PLATAFORMAS"}
          title={en ? "AI Literacy Tools Gallery" : "Galeria de Herramientas de Alfabetizacion AI"}
          desc={en
            ? "15 curated tools for teaching AI concepts — from age 6 to university level. All free and web-based."
            : "15 herramientas curadas para ensenar conceptos AI — desde los 6 anos hasta nivel universitario. Todas gratuitas y basadas en web."
          }
        />

        {/* Filter bar */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
          <FilterBtn active={toolFilter === "all"} label={en ? `All (${tools.length})` : `Todos (${tools.length})`} onClick={() => setToolFilter("all")} />
          <FilterBtn active={toolFilter === "free"} label={en ? "Free" : "Gratuitos"} onClick={() => setToolFilter("free")} />
          <FilterBtn active={toolFilter === "interactive"} label={en ? "Interactive / Embeddable" : "Interactivos / Integrables"} onClick={() => setToolFilter("interactive")} />
          <FilterBtn active={toolFilter === "spanish"} label={en ? "Spanish Support 🇪🇸" : "Soporte Espanol 🇪🇸"} onClick={() => setToolFilter("spanish")} />
        </div>

        {/* Tool count feedback */}
        <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 12 }}>
          {en ? `Showing ${filteredTools.length} of ${tools.length} tools` : `Mostrando ${filteredTools.length} de ${tools.length} herramientas`}
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 12,
        }}>
          {filteredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} en={en} />
          ))}
        </div>

        {filteredTools.length === 0 && (
          <Bx style={{ textAlign: "center", padding: 32, color: "var(--text3)" }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>🔍</div>
            <div style={{ fontSize: 13 }}>
              {en ? "No tools match this filter." : "Ninguna herramienta coincide con este filtro."}
            </div>
          </Bx>
        )}
      </section>

      {/* ── SECTION 4: Curricula Programs ── */}
      <section>
        <SH
          color={t.am}
          label={en ? "CURRICULA & PROGRAMS" : "CURRICULA Y PROGRAMAS"}
          title={en ? "AI Education Programs" : "Programas de Educacion AI"}
          desc={en
            ? "7 proven curricula and programs for integrating AI literacy into education systems — with Costa Rica relevance analysis."
            : "7 curricula y programas probados para integrar alfabetizacion AI en sistemas educativos — con analisis de relevancia para Costa Rica."
          }
        />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 12,
        }}>
          {curricula.map(curr => (
            <CurriculumCard
              key={curr.id}
              curr={curr}
              en={en}
              expanded={expandedCurr === curr.id}
              onToggle={() => setExpandedCurr(expandedCurr === curr.id ? null : curr.id)}
            />
          ))}
        </div>
      </section>

      {/* ── SECTION 5: Education Metrics Dashboard ── */}
      <section>
        <SH
          color={t.or}
          label={en ? "METRICS & DATA" : "METRICAS Y DATOS"}
          title={en ? "Education & STEM Metrics" : "Metricas de Educacion y STEM"}
          desc={en
            ? "Key education and STEM statistics for Costa Rica — benchmarked against LATAM and OECD averages."
            : "Estadisticas clave de educacion y STEM para Costa Rica — comparadas con promedios de LATAM y OCDE."
          }
        />

        {/* STEM graduates highlight */}
        <Card d={0.05} accent={t.cy} style={{ padding: 18, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Icon name="edu" size={28} color={t.cy} />
            <div>
              <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace", textTransform: "uppercase", letterSpacing: 0.5 }}>
                {stats.stemGraduates.label}
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: t.cy, fontFamily: "'IBM Plex Mono',monospace" }}>
                {stats.stemGraduates.value}
              </div>
              <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.5, marginTop: 4 }}>
                {en ? stats.stemGraduates.context.en : stats.stemGraduates.context.es}
              </div>
              <div style={{ fontSize: 10, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace", marginTop: 4 }}>
                {stats.stemGraduates.source} ({stats.stemGraduates.year})
              </div>
            </div>
          </div>
        </Card>

        {/* Key metrics grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 10,
        }}>
          {stats.keyMetrics.map((m, i) => (
            <MetricCard key={i} m={m} en={en} />
          ))}
        </div>

        {/* Gap analysis */}
        <div style={{ marginTop: 28 }}>
          <div style={{
            fontSize: 12, fontWeight: 700, color: "var(--red)",
            fontFamily: "'IBM Plex Mono',monospace", letterSpacing: 1,
            textTransform: "uppercase", marginBottom: 14, paddingLeft: 2,
          }}>
            {en ? "Gap Analysis" : "Analisis de Brechas"}
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 10,
          }}>
            {stats.gaps.map((gap, i) => (
              <Card key={i} d={i * 0.06} accent={gap.color} style={{ padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{gap.area}</div>
                  <span style={{
                    fontSize: 10, fontWeight: 700, fontFamily: "'IBM Plex Mono',monospace",
                    color: gap.color, background: `${gap.color}15`, border: `1px solid ${gap.color}30`,
                    padding: "2px 8px", borderRadius: 6,
                  }}>
                    {gap.status}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6 }}>
                  {gapDetail(gap, en)}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Data sources footer ── */}
      <PartnerBar
        items={["UNESCO", "AI4K12", "Code.org", "MIT", "CONARE", "MEP", "OECD", "INTEF"]}
        en={en}
        showLogos={true}
      />
    </div>
  );
}
