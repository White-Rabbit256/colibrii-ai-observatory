"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TH, GLOSSARY, ALGOS, PARTNERS, API_SOURCES, ANNUAL_SOURCES, WEF_RESOURCES } from "./data";
import { Card, SH, Tag, Ci, Lnk, Grid, ScrollReveal, MiniStat, fadeUp } from "./ui";
import { Icon } from "./system/Icon";
import { FACTS } from "../data/facts";

/* ═══════════════════════════════════════════════════════════════
   EDUCATION VIEW v13 — 8 CR programs + WEF skills
   ═══════════════════════════════════════════════════════════════ */
export function Edu({ en, t }) {
  const programs = [
    { ic: "🎓", nm: "Intel AI For Youth", org: "MEP + Intel", desc: en ? "3-year AI specialization in 14+ CTP technical schools. Hands-on projects. Students aged 15-17. Free. Teacher certification included." : "Especialización AI 3 años en 14+ CTP. Proyectos prácticos. Estudiantes 15-17 años. Gratis. Certificación docente incluida.", c: t.cy, tg: "🇨🇷", lk: "https://www.intel.com/content/www/us/en/corporate-responsibility/ai-for-youth.html" },
    { ic: "📡", nm: en ? "MICITT AI Courses" : "Cursos AI MICITT", org: "MICITT + Cisco + U. Latina", desc: en ? "Free virtual. Ages 14+. 4,000 enrolled month 1. Intro to AI, data science, cybersecurity. Government-backed credential." : "Virtual gratis. Desde 14 años. 4,000 inscritos mes 1. Intro a AI, ciencia datos, ciberseguridad. Credencial gobierno.", c: t.vi, tg: "🇨🇷", lk: "https://www.micit.go.cr/" },
    { ic: "🌍", nm: "Elements of AI", org: "U. Helsinki 🇫🇮 / MinnaLearn", desc: en ? "30+ languages. 2M+ enrolled. #1 gateway. University-quality AI intro. 6 chapters. Free forever. CR should mandate for all public servants." : "30+ idiomas. 2M+ inscritos. #1 introductorio. Intro AI calidad universitaria. 6 capítulos. Gratis siempre. CR debería exigir para funcionarios.", c: t.am, tg: en ? "RECOMMENDED" : "RECOMENDADO", lk: "https://www.elementsofai.com/" },
    { ic: "☁️", nm: "AWS Academy", org: "Amazon / U. Latina", desc: en ? "Cloud, GenAI, ML. Free via U. Latina. 50% off certification. AWS Certified Cloud Practitioner prep. Industry-recognized." : "Cloud, GenAI, ML. Gratis via U. Latina. 50% desc. certificación. Preparación AWS CCP. Reconocida industria.", c: t.or, tg: "🇨🇷", lk: "https://aws.amazon.com/training/awsacademy/" },
    { ic: "📱", nm: "Samsung Innovation Campus", org: "FUNDESTEAM + Samsung", desc: en ? "200+ hrs. Python, AI, IoT. Ages 15-22. 50/50 gender parity. Certificate + portfolio. Free. 3-month intensive." : "200+ hrs. Python, AI, IoT. Edades 15-22. 50/50 paridad género. Certificado + portafolio. Gratis. Intensivo 3 meses.", c: t.gn, tg: "LATAM", lk: "https://www.samsung.com/latin/sustainability/corporate-citizenship/innovation-campus/" },
    { ic: "🔍", nm: "Google AI Essentials", org: "Google / Coursera", desc: en ? "Available in Spanish. Prompt engineering, responsible AI use, automation. 10 hours. Free certificates." : "Disponible en español. Prompt engineering, uso responsable AI, automatización. 10 horas. Certificados gratis.", c: t.cy, tg: en ? "SPANISH" : "ESPAÑOL", lk: "https://grow.google/intl/es/ai-opportunity/" },
    { ic: "🔧", nm: "INA", org: en ? "National Learning Institute" : "Inst. Nac. Aprendizaje", desc: en ? "Free: coding, Google Cloud, Cisco. Scholarships. NO AI track yet. 13,000 annual IT grads, zero AI certification. #1 gap in CR pipeline." : "Gratis: programación, Google Cloud, Cisco. Becas. SIN track AI aún. 13,000 graduados IT/año, cero certificación AI. Brecha #1.", c: t.rd, tg: en ? "NEEDS AI" : "NECESITA AI", lk: "https://www.ina.ac.cr/" },
    { ic: "🎯", nm: en ? "CENFOTEC AI Scholarships" : "Becas AI CENFOTEC", org: "CENFOTEC + PRONAE", desc: en ? "8-week 'AI for Business'. Women 17-35, men 17-24. PRONAE co-funded. Focus on applied ML for industry. ~200 annual graduates." : "8 semanas 'AI para Negocios'. Mujeres 17-35, hombres 17-24. Co-financiado PRONAE. ML aplicado para industria. ~200 graduados/año.", c: t.pk, tg: en ? "SUBSIDIZED" : "SUBSIDIADO", lk: "https://www.cenfotec.ac.cr/" }
  ];

  return (
    <div>
      <SH color={t.gn} label={en ? "Training" : "Capacitación"} title={en ? "AI Education — What's Available Now" : "Educación AI — Qué Hay Disponible"} desc={en ? "Minister: this is what exists. Student: these are free. CEO: these upskill your team. The gap is visibility and scale, not existence." : "Ministro: esto es lo que existe. Estudiante: estos son gratis. CEO: estos capacitan su equipo. La brecha es visibilidad y escala, no existencia."} />

      {/* First in CA highlight */}
      <ScrollReveal delay={50}>
        <div style={{ marginBottom: 20, padding: 18, borderRadius: 12, background: `${t.gn}06`, border: `1px solid ${t.gn}22`, textAlign: "center" }}>
          <div style={{ fontSize: 18, marginBottom: 4 }}>🏆</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.gn, fontFamily: "var(--font-display, 'Playfair Display', serif)" }}>
            {en ? "FIRST IN CENTRAL AMERICA" : "PRIMERO EN CENTROAMÉRICA"}
          </div>
          <p style={{ fontSize: 13, color: t.tx2, marginTop: 6 }}>{en ? "CR formalized AI as a secondary school specialization (MEP-Intel, 2022). Now 14+ schools. MICITT + Cisco + U. Latina free AI courses: 4,000 enrolled month 1. WEF: 59% of workers need reskilling by 2030." : "CR formalizó AI como especialidad secundaria (MEP-Intel, 2022). Ahora 14+ escuelas. MICITT + Cisco + U. Latina cursos AI gratis: 4,000 inscritos mes 1. WEF: 59% trabajadores necesitan recapacitación para 2030."}</p>
        </div>
      </ScrollReveal>

      {/* 8 Programs */}
      <Grid cols="repeat(auto-fit,minmax(260px,1fr))" gap={10} style={{ marginBottom: 20 }}>
        {programs.map((p, i) => (
          <Card key={i} d={0.05 + i * 0.03} accent={p.c}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
              <span style={{ fontSize: 16 }}>{p.ic}</span>
              {p.tg && <Tag color={p.c}>{p.tg}</Tag>}
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>{p.nm}</div>
            <div style={{ fontSize: 11, color: p.c, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 6 }}>{p.org}</div>
            <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6, marginBottom: 8 }}>{p.desc}</p>
            {p.lk && <Lnk href={p.lk}>{en ? "Access" : "Acceder"}</Lnk>}
          </Card>
        ))}
      </Grid>

      {/* International Benchmarks */}
      <div style={{ fontSize: 13, fontWeight: 700, color: t.vi, marginTop: 28, marginBottom: 12, fontFamily: "'IBM Plex Mono',monospace", letterSpacing: 1 }}>
        {en ? "\u{1F30E} INTERNATIONAL BENCHMARKS" : "\u{1F30E} REFERENTES INTERNACIONALES"}
      </div>
      <Grid cols="repeat(auto-fit,minmax(260px,1fr))" gap={10} style={{ marginBottom: 20 }}>
        <Card d={0.35} accent={t.cy}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
            <span style={{ fontSize: 16 }}>{"\u{1F1F8}\u{1F1EC}"}</span>
            <Tag color={t.cy}>IMDA</Tag>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>{en ? "Singapore AI Apprenticeship" : "Aprendizaje AI Singapur"}</div>
          <div style={{ fontSize: 11, color: t.cy, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 6 }}>IMDA + AI Singapore</div>
          <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6, marginBottom: 8 }}>
            {en ? "9-month program with industry placement. 100+ graduates/year. Free for Singaporean citizens. Bridges academic AI knowledge with real-world deployment." : "Programa de 9 meses con colocación industrial. 100+ graduados/año. Gratis para ciudadanos singapurenses. Conecta conocimiento académico AI con despliegue real."}
          </p>
          <Lnk href="https://www.imda.gov.sg/">{en ? "Access" : "Acceder"}</Lnk>
        </Card>

        <Card d={0.38} accent={t.vi}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
            <span style={{ fontSize: 16 }}>{"\u{1F1EA}\u{1F1EA}"}</span>
            <Tag color={t.vi}>K-12</Tag>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>{en ? "Estonia AI Education" : "Educación AI Estonia"}</div>
          <div style={{ fontSize: 11, color: t.vi, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 6 }}>{en ? "\"Kratt\" Initiative" : "Iniciativa \"Kratt\""}</div>
          <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6, marginBottom: 8 }}>
            {en ? "AI integrated across all school levels K-12. \"Kratt\" initiative mandates data-literate workforce. First European country to integrate AI across entire curriculum." : "AI integrado en todos los niveles escolares K-12. Iniciativa \"Kratt\" exige fuerza laboral alfabetizada en datos. Primer país europeo en integrar AI en todo el currículo."}
          </p>
          <Lnk href="https://e-estonia.com/">{en ? "Access" : "Acceder"}</Lnk>
        </Card>

        <Card d={0.41} accent={t.or}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
            <span style={{ fontSize: 16 }}>{"\u{1F1F0}\u{1F1F7}"}</span>
            <Tag color={t.or}>2025</Tag>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>{en ? "South Korea AI Education Mandate" : "Mandato Educación AI Corea del Sur"}</div>
          <div style={{ fontSize: 11, color: t.or, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 6 }}>{en ? "Ministry of Education" : "Ministerio de Educación"}</div>
          <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6, marginBottom: 8 }}>
            {en ? "2025 mandate: all schools must offer AI classes. 20K AI teachers trained. Largest national AI education investment at $2.4B." : "Mandato 2025: todas las escuelas deben ofrecer clases AI. 20K profesores AI capacitados. Mayor inversión nacional en educación AI: $2.4B."}
          </p>
          <Lnk href="https://www.moe.go.kr/">{en ? "Access" : "Acceder"}</Lnk>
        </Card>

        <Card d={0.44} accent={t.gn}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
            <span style={{ fontSize: 16 }}>{"\u{1F1EC}\u{1F1E7}"}</span>
            <Tag color={t.gn}>2030</Tag>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>{en ? "UK AI Masters Programme" : "Programa Maestría AI Reino Unido"}</div>
          <div style={{ fontSize: 11, color: t.gn, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 6 }}>{en ? "Office for AI / DSIT" : "Oficina para AI / DSIT"}</div>
          <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6, marginBottom: 8 }}>
            {en ? "2,500 AI Masters scholarships by 2030. 16 universities. Focus on underrepresented groups. Includes industry placement component." : "2,500 becas de Maestría AI para 2030. 16 universidades. Enfoque en grupos subrepresentados. Incluye componente de colocación industrial."}
          </p>
          <Lnk href="https://www.gov.uk/government/organisations/office-for-artificial-intelligence">{en ? "Access" : "Acceder"}</Lnk>
        </Card>
      </Grid>

      {/* WEF Top Skills */}
      <Card d={0.5} accent={t.am}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: t.am, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>WEF TOP SKILLS 2025-2030</div>
        <Grid cols="1fr 1fr" gap={6}>
          {["AI & Big Data", en ? "Cybersecurity" : "Ciberseguridad", en ? "Tech Literacy" : "Alfabetización Tech", en ? "Creative Thinking" : "Pensamiento Creativo", en ? "Resilience" : "Resiliencia", en ? "Analytical" : "Analítico"].map((s, i) => (
            <div key={i} style={{ padding: "6px 10px", background: t.sf, borderRadius: 6, fontSize: 12, color: t.tx2 }}>
              <span style={{ color: t.am, fontWeight: 700, fontFamily: "'IBM Plex Mono',monospace", marginRight: 6 }}>#{i + 1}</span>{s}
            </div>
          ))}
        </Grid>
        <Ci s="WEF Future of Jobs Report 2025" />
      </Card>
    </div>
  );
}

/* ── Deep Detail expandable sub-section for glossary entries ── */
function DeepDetail({ en, t, deep }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: 8 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: `1px solid ${t.vi}33`, borderRadius: 6, padding: "4px 10px", fontSize: 11, color: t.vi, cursor: "pointer", fontFamily: "'IBM Plex Mono',monospace" }}
      >
        {en ? "Technical Detail" : "Detalle Técnico"}
        <span style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", display: "inline-block" }}>▾</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ marginTop: 8, padding: "8px 12px", background: `${t.vi}06`, borderRadius: 8, borderLeft: `3px solid ${t.vi}` }}>
              <div style={{ fontSize: 10, color: t.vi, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 3 }}>{en ? "TECHNICAL DETAIL" : "DETALLE TÉCNICO"}</div>
              <p style={{ fontSize: 12, color: t.tx, lineHeight: 1.6 }}>{deep}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GLOSSARY VIEW v13 — 34 terms with search + filter + accordion
   ═══════════════════════════════════════════════════════════════ */
export function Glos({ en, t }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [exp, setExp] = useState(null);
  const G = GLOSSARY(en);
  const cats = ["all", ...new Set(G.map(g => g.c))];
  const filtered = useMemo(() => G.filter(g => (cat === "all" || g.c === cat) && (!q || g.t.toLowerCase().includes(q.toLowerCase()) || g.def.toLowerCase().includes(q.toLowerCase()))), [q, cat, en]);

  return (
    <div>
      <SH color={t.cy} label={en ? "Reference" : "Referencia"} title={en ? "AI Glossary — With Costa Rica Context" : "Glosario AI — Con Contexto de Costa Rica"} desc={en ? `${G.length} terms. Each includes a definition AND what it means specifically for Costa Rica. Search or filter by category. Sources: NIST AI 100-3, EU AI Act Art. 3, Google ML Glossary.` : `${G.length} términos. Cada uno incluye definición Y qué significa específicamente para Costa Rica. Busca o filtra por categoría. Fuentes: NIST AI 100-3, EU AI Act Art. 3, Google ML Glossary.`} />

      {/* Search + Filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder={en ? "Search terms..." : "Buscar..."} style={{ flex: 1, minWidth: 200, padding: "8px 14px", borderRadius: 8, fontSize: 13 }} aria-label={en ? "Search glossary" : "Buscar glosario"} />
        {cats.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{ padding: "5px 10px", fontSize: 10, border: `1px solid ${cat === c ? t.cy : t.bd}`, borderRadius: 4, background: cat === c ? `${t.cy}10` : "transparent", color: cat === c ? t.cy : t.tx3, fontFamily: "'IBM Plex Mono',monospace" }}>
            {c === "all" ? (en ? "All" : "Todos") : c}
          </button>
        ))}
      </div>

      <div style={{ fontSize: 11, color: t.tx3, marginBottom: 10, fontFamily: "'IBM Plex Mono',monospace" }}>{filtered.length} {en ? "terms" : "términos"}</div>

      {/* Term Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {filtered.map((g, i) => {
          const catColor = g.c === "Colibrii" ? t.vi : g.c === (en ? "Security" : "Seguridad") ? t.rd : g.c === (en ? "Legislation" : "Legislación") ? t.or : g.c === (en ? "Economy" : "Economía") ? t.am : g.c === (en ? "Trend" : "Tendencia") ? t.pk : g.c === (en ? "Ethics" : "Ética") ? t.gn : g.c === (en ? "Institution" : "Institución") ? t.vi : g.c === (en ? "Standards" : "Estándares") ? t.cy : t.cy;
          return (
          <motion.div key={g.t} layout style={{ background: t.cardBg, borderRadius: 10, border: `1px solid ${t.bd}`, borderLeft: `3px solid ${catColor}`, overflow: "hidden" }}>
            <div onClick={() => setExp(exp === i ? null : i)} className="accordion-header" role="button" tabIndex={0} aria-expanded={exp === i} onKeyDown={e => e.key === "Enter" && setExp(exp === i ? null : i)}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: t.tx }}>{g.t}</span>
                <Tag color={catColor}>{g.c}</Tag>
              </div>
              <span className={`accordion-chevron ${exp === i ? "open" : ""}`}>▾</span>
            </div>
            <AnimatePresence>
              {exp === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                  <div style={{ padding: "4px 14px 14px", borderTop: `1px solid ${t.bd}` }}>
                    <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7, marginBottom: 10 }}>{g.def}</p>
                    <div style={{ padding: "8px 12px", background: `${t.cy}06`, borderRadius: 8, borderLeft: `3px solid ${t.cy}` }}>
                      <div style={{ fontSize: 10, color: t.cy, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 3 }}>{en ? "COSTA RICA CONTEXT" : "CONTEXTO COSTA RICA"}</div>
                      <p style={{ fontSize: 12, color: t.tx, lineHeight: 1.6 }}>{g.ctx}</p>
                    </div>
                    {g.deep && (
                      <DeepDetail en={en} t={t} deep={g.deep} />
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          );
        })}
      </div>
      <Ci s={en ? "Sources: NIST AI 100-3 (~500 terms), EU AI Act Art. 3 (68 definitions), Google ML Glossary (460+ terms)" : "Fuentes: NIST AI 100-3 (~500 términos), EU AI Act Art. 3 (68 definiciones), Google ML Glossary (460+ términos)"} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT VIEW v13 — Data sources, 7 algorithms, methodology
   Enhanced with 10+ API sources and 24 annual sources
   ═══════════════════════════════════════════════════════════════ */
export function Abt({ en, t }) {
  const A = ALGOS(en);
  const APIs = API_SOURCES(en);

  return (
    <div>
      <SH color={t.vi} label={en ? "About" : "Información"} title={en ? "About Colibrii Labs" : "Sobre Colibrii Labs"} desc={en ? "An AI-powered observatory providing strategic intelligence for Costa Rica's positioning in the global AI transformation. Designed for legislators, ministers, executives, and citizens." : "Un observatorio potenciado por AI que provee inteligencia estratégica para el posicionamiento de Costa Rica en la transformación global de AI. Diseñado para legisladores, ministros, ejecutivos y ciudadanos."} />

      {/* ── 1. What is an AI Observatory? ── */}
      <Card d={0.03} accent={t.cy} style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: t.cy, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
          {en ? "WHAT IS AN AI OBSERVATORY?" : "¿QUÉ ES UN OBSERVATORIO AI?"}
        </div>
        <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.8, marginBottom: 16 }}>
          {en
            ? "An AI Observatory is a systematic, data-driven platform that continuously monitors the global artificial intelligence landscape — tracking policy, investment, risk, talent, and adoption — to provide actionable strategic intelligence for national decision-makers."
            : "Un Observatorio AI es una plataforma sistemática basada en datos que monitorea continuamente el panorama global de inteligencia artificial — rastreando política, inversión, riesgo, talento y adopción — para proveer inteligencia estratégica accionable a tomadores de decisiones nacionales."}
        </p>
        {/* Data flow visual */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, textAlign: "center", marginBottom: 12 }}>
          {[
            { icon: "database", num: "25+", label: en ? "Sources" : "Fuentes", color: t.gn },
            { icon: "refresh", num: "4", label: en ? "Live APIs" : "APIs en Vivo", color: t.cy },
            { icon: "chart", num: "10", label: en ? "Algorithms" : "Algoritmos", color: t.vi },
            { icon: "target", num: "13", label: en ? "Views" : "Vistas", color: t.pk }
          ].map((step, i) => (
            <div key={i} style={{ padding: "14px 8px", background: t.sf, borderRadius: 10, border: `1px solid ${t.bd}`, position: "relative" }}>
              <div style={{ marginBottom: 6 }}>
                <Icon name={step.icon} size={22} color={step.color} />
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'IBM Plex Mono',monospace", color: step.color, marginBottom: 2 }}>{step.num}</div>
              <div style={{ fontSize: 11, color: t.tx2, fontWeight: 600 }}>{step.label}</div>
              {i < 3 && (
                <div className="flow-arrow" style={{ position: "absolute", right: -12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: t.tx3, zIndex: 1 }}>→</div>
              )}
            </div>
          ))}
        </div>
        <div style={{ padding: "8px 12px", background: `${t.cy}06`, borderRadius: 8, borderLeft: `3px solid ${t.cy}`, fontSize: 12, color: t.tx2, lineHeight: 1.6 }}>
          {en
            ? "Data flows from 25+ international sources through 4 real-time APIs, is processed by 10 proprietary algorithms, and rendered across 13 analytical views — from country profiles to policy simulators to risk dashboards."
            : "Los datos fluyen de 25+ fuentes internacionales a través de 4 APIs en tiempo real, son procesados por 10 algoritmos propietarios y se presentan en 13 vistas analíticas — desde perfiles país hasta simuladores de política y dashboards de riesgo."}
        </div>
      </Card>

      {/* ── 2. Expanded Founder Card ── */}
      <Card d={0.05} accent={t.cy} style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "var(--font-display, 'Playfair Display', serif)", marginBottom: 4 }}>Andrés Alpízar</div>
        <div style={{ fontSize: 12, color: t.vi, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>Founder · Colibrii Labs · Agile Intelligence</div>
        <div style={{ fontSize: 13, color: t.tx2, marginBottom: 10, lineHeight: 1.8 }}>
          {en
            ? "This observatory was built because Costa Rica has the vision but lacks the intelligence infrastructure. Our country scored 100/100 on AI strategic vision (Oxford Insights 2023) — yet overall readiness is only 0.38/1.0. The gap isn't ambition; it's execution data. Legislators draft policy without comparative benchmarks. Ministers allocate budgets without risk quantification. Executives make AI investments without understanding where Costa Rica stands relative to peers."
            : "Este observatorio se construyó porque Costa Rica tiene la visión pero carece de la infraestructura de inteligencia. Nuestro país obtuvo 100/100 en visión estratégica AI (Oxford Insights 2023) — pero la preparación general es solo 0.38/1.0. La brecha no es ambición; son datos de ejecución. Legisladores elaboran política sin benchmarks comparativos. Ministros asignan presupuestos sin cuantificación de riesgo. Ejecutivos hacen inversiones AI sin entender dónde está Costa Rica frente a sus pares."}
        </div>
        <div style={{ fontSize: 13, color: t.tx2, marginBottom: 12, lineHeight: 1.8 }}>
          {en
            ? "My background is in strategic intelligence and agile advisory. Colibrii Labs exists to close the gap between Costa Rica's AI ambition and its decision-making data. Every algorithm, every visualization, every data point in this observatory answers one question: 'What should Costa Rica do next?'"
            : "Mi experiencia es en inteligencia estratégica y asesoría ágil. Colibrii Labs existe para cerrar la brecha entre la ambición AI de Costa Rica y sus datos de toma de decisiones. Cada algoritmo, cada visualización, cada dato en este observatorio responde una pregunta: '¿Qué debe hacer Costa Rica ahora?'"}
        </div>
        {/* Contact & Social */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <a href={`mailto:${FACTS.email}`} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: t.cy, textDecoration: "none", fontFamily: "'IBM Plex Mono',monospace" }}>
            <Icon name="mail" size={14} color={t.cy} />
            {FACTS.email}
          </a>
          <a href={FACTS.founderX} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: t.cy, textDecoration: "none", fontFamily: "'IBM Plex Mono',monospace" }}>
            <Icon name="twitter" size={14} color={t.cy} />
            @ColibriiLabs
          </a>
          <a href={FACTS.founderLinkedin} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: t.cy, textDecoration: "none", fontFamily: "'IBM Plex Mono',monospace" }}>
            <Icon name="linkedin" size={14} color={t.cy} />
            LinkedIn
          </a>
        </div>
      </Card>

      {/* ── 3. Mission & Vision Card ── */}
      <Card d={0.08} accent={t.gn} style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: t.gn, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 12 }}>
          {en ? "MISSION & VISION" : "MISIÓN Y VISIÓN"}
        </div>
        <Grid cols="1fr 1fr" gap={12}>
          <div style={{ padding: "14px 16px", background: t.sf, borderRadius: 10, borderLeft: `3px solid ${t.gn}` }}>
            <div style={{ fontSize: 10, letterSpacing: 1.5, color: t.gn, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 6 }}>
              {en ? "MISSION" : "MISIÓN"}
            </div>
            <p style={{ fontSize: 13, color: t.tx, lineHeight: 1.7, fontWeight: 600 }}>
              {en
                ? "Democratize access to strategic AI intelligence for Costa Rica."
                : "Democratizar el acceso a inteligencia AI estratégica para Costa Rica."}
            </p>
          </div>
          <div style={{ padding: "14px 16px", background: t.sf, borderRadius: 10, borderLeft: `3px solid ${t.vi}` }}>
            <div style={{ fontSize: 10, letterSpacing: 1.5, color: t.vi, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 6 }}>
              {en ? "VISION" : "VISIÓN"}
            </div>
            <p style={{ fontSize: 13, color: t.tx, lineHeight: 1.7, fontWeight: 600 }}>
              {en
                ? "An informed nation navigating the AI transformation."
                : "Una nación informada navegando la transformación AI."}
            </p>
          </div>
        </Grid>
      </Card>

      {/* ── 4. Existing sections preserved below ── */}

      {/* 10+ API Data Sources */}
      <Card d={0.1} style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: t.gn, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
          {en ? `API DATA SOURCES (${APIs.length})` : `FUENTES API (${APIs.length})`}
        </div>
        {APIs.map((s, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 80px", gap: 8, padding: "6px 0", borderBottom: `1px solid ${t.bd}`, alignItems: "center" }}>
            <a href={s.u} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: t.cy, textDecoration: "none", fontWeight: 600 }}>{s.n}</a>
            <span style={{ fontSize: 11, color: t.tx2 }}>{s.d}</span>
            <span style={{ fontSize: 10, color: s.c, fontFamily: "'IBM Plex Mono',monospace", textAlign: "right" }}>{s.st}</span>
          </div>
        ))}
      </Card>

      {/* 24 Annual Data Sources */}
      <Card d={0.2} style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: t.vi, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
          {en ? `ANNUAL DATA SOURCES (${ANNUAL_SOURCES.length})` : `FUENTES ANUALES (${ANNUAL_SOURCES.length})`}
        </div>
        <Grid cols="repeat(auto-fill,minmax(180px,1fr))" gap={4}>
          {ANNUAL_SOURCES.map((s, i) => (
            <div key={i} style={{ padding: "4px 8px", background: t.sf, borderRadius: 4, fontSize: 11, color: t.tx2, textAlign: "center" }}>{s}</div>
          ))}
        </Grid>
      </Card>

      {/* 7 Algorithms Summary */}
      <Card d={0.3} style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: t.pk, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
          {A.length} {en ? "PROPRIETARY ALGORITHMS" : "ALGORITMOS PROPIETARIOS"}
        </div>
        <Grid cols="repeat(auto-fit,minmax(160px,1fr))" gap={6}>
          {A.map((a, i) => (
            <div key={i} style={{ padding: "10px 12px", background: t.sf, borderRadius: 8, borderLeft: `3px solid ${a.c}` }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: a.c, fontFamily: "'IBM Plex Mono',monospace" }}>{a.nm}</div>
              <div style={{ fontSize: 11, color: t.tx2, marginTop: 2, lineHeight: 1.4 }}>{a.full}</div>
              <div style={{ fontSize: 10, color: t.tx3, marginTop: 2 }}>{a.st}</div>
            </div>
          ))}
        </Grid>
      </Card>

      {/* Key Reports & Downloads */}
      <Card d={0.35} accent={t.gn} style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: t.gn, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
          {en ? "KEY REPORTS & DOWNLOADS" : "REPORTES CLAVE Y DESCARGAS"}
        </div>
        <Grid cols="repeat(auto-fit,minmax(260px,1fr))" gap={8}>
          {WEF_RESOURCES(en).map((r, i) => (
            <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 12px", background: t.sf, borderRadius: 8, border: `1px solid ${t.bd}`, textDecoration: "none", transition: "all .2s" }}>
              <span style={{ fontSize: 16, marginTop: 1 }}>{r.cat === "risk" ? "⚠️" : r.cat === "security" ? "🛡" : r.cat === "labor" ? "👥" : r.cat === "index" ? "📊" : "📄"}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.tx, lineHeight: 1.4 }}>{r.title}</div>
                <div style={{ fontSize: 11, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", marginTop: 2 }}>{r.org} · {r.year}</div>
              </div>
              <span style={{ fontSize: 12, color: t.cy, marginLeft: "auto", flexShrink: 0 }}>↗</span>
            </a>
          ))}
        </Grid>
      </Card>

      {/* Data Attribution & Licensing */}
      <Card d={0.4} accent={t.or} style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: t.or, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>{en ? "DATA ATTRIBUTION & LICENSING" : "ATRIBUCIÓN DE DATOS Y LICENCIAS"}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            { src: "World Bank Open Data", lic: en ? "CC BY 4.0 — Open License" : "CC BY 4.0 — Licencia Abierta", c: t.cy },
            { src: "WEF Global Risks Report 2026", lic: en ? "Data points used for non-commercial research" : "Datos usados para investigación no comercial", c: t.rd },
            { src: "Oxford Insights AI Readiness Index", lic: en ? "Published scores, citation-based use" : "Scores publicados, uso basado en citación", c: t.vi },
            { src: "UNDP Human Development Index", lic: en ? "Open Data" : "Datos Abiertos", c: t.gn },
            { src: "Transparency International CPI", lic: en ? "Public data with attribution" : "Datos públicos con atribución", c: t.am },
            { src: "Freedom House / V-Dem / IEP", lic: en ? "Public indices with attribution" : "Índices públicos con atribución", c: t.am },
            { src: "GDELT Project", lic: en ? "Open data, free API" : "Datos abiertos, API gratuita", c: t.pk },
            { src: "Stanford HAI / IMF AIPI", lic: en ? "Published methodology, extended by Colibrii (4→6 dimensions)" : "Metodología publicada, extendida por Colibrii (4→6 dimensiones)", c: t.vi },
            { src: en ? "Colibrii Labs original analysis" : "Análisis original Colibrii Labs", lic: "CC BY-NC 4.0", c: t.cy }
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: i < 8 ? `1px solid ${t.bd}` : "none", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: t.tx }}>{s.src}</span>
              <span style={{ fontSize: 10, color: s.c, fontFamily: "'IBM Plex Mono',monospace" }}>{s.lic}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, padding: "8px 12px", background: `${t.or}06`, borderRadius: 6, borderLeft: `3px solid ${t.or}`, fontSize: 11, color: t.tx2, lineHeight: 1.6 }}>
          {en ? "This observatory uses factual data points (rankings, scores, percentages) from public international sources — not reproduced text. All sources cited. Observatory analysis, algorithms, and original content © 2026 Colibrii Labs under CC BY-NC 4.0." : "Este observatorio usa datos factuales (rankings, scores, porcentajes) de fuentes internacionales públicas — no texto reproducido. Todas las fuentes citadas. Análisis del observatorio, algoritmos y contenido original © 2026 Colibrii Labs bajo CC BY-NC 4.0."}
        </div>
      </Card>

      {/* Methodology */}
      <Card d={0.45} accent={t.vi}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: t.vi, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>{en ? "METHODOLOGY & TRANSPARENCY" : "METODOLOGÍA Y TRANSPARENCIA"}</div>
        <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.8 }}>
          {en ? "All data displayed in this observatory is sourced from verifiable, institutional databases. World Bank indicators are fetched in real-time via their open API. Curated scores (Regulation, Security) are based on published reports from Oxford Insights, OWASP, ITU, and IAPP. Algorithm formulas, dimension structures, and data sources are fully transparent. Specific normalization parameters, weighting rationale, and threshold calibrations are proprietary trade secrets. Users see results and methodology — not raw competitive advantage. No user data is collected, no cookies are set, no tracking is deployed. Academic partnerships and methodology reviews are welcome. Copyright © 2026 Colibrii Labs." : "Todos los datos mostrados en este observatorio provienen de bases de datos institucionales verificables. Los indicadores del Banco Mundial se obtienen en tiempo real via su API abierta. Los scores curados (Regulación, Seguridad) se basan en reportes publicados de Oxford Insights, OWASP, ITU, e IAPP. Las fórmulas de algoritmos, estructuras de dimensiones y fuentes de datos son completamente transparentes. Los parámetros específicos de normalización, justificación de pesos y calibraciones de umbrales son secretos comerciales propietarios. Los usuarios ven resultados y metodología — no la ventaja competitiva en bruto. No se recopilan datos de usuario, no se colocan cookies, no se despliega rastreo. Se aceptan alianzas académicas y revisiones de metodología. Copyright © 2026 Colibrii Labs."}
        </p>
        <Ci s={en ? "Zero cookies · Zero tracking · Zero user data" : "Cero cookies · Cero rastreo · Cero datos usuario"} />
      </Card>
    </div>
  );
}
