"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TH, ALGOS, LAWS, CHECKLIST, SEC_DEEP, LEG_JARGON, ENIA_ANALYSIS } from "./data";
import { Card, SH, Tag, Ci, Lnk, Grid, ProgressBar, ScrollReveal, MiniStat, fadeUp } from "./ui";
import { FACTS } from "../data/facts";

/* ═══════════════════════════════════════════════════════════════
   ALGORITHMS VIEW v13 — All 10 with methodology, inputs, validation
   Trade secrets protected: formulas and weights removed.
   ═══════════════════════════════════════════════════════════════ */
export function Algo({ en, t }) {
  const A = ALGOS(en);
  return (
    <div>
      <SH color={t.vi} label={en ? "Proprietary Analysis" : "Análisis Propietario"} title={en ? "Colibrii Algorithms" : "Algoritmos Colibrii"} desc={en ? `${FACTS.algorithms} proprietary algorithms designed for CR's context as an upper-middle-income AI Overperformer. Methodologies transparent; calibrations proprietary.` : `${FACTS.algorithms} algoritmos propietarios diseñados para el contexto de CR como AI Overperformer de ingreso medio-alto. Metodologías transparentes; calibraciones propietarias.`} />
      {A.map((a, i) => (
        <Card key={i} d={0.06 + i * 0.04} accent={a.c} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, flexWrap: "wrap", gap: 6 }}>
            <div>
              <span style={{ fontSize: 18, fontWeight: 700, color: a.c, fontFamily: "var(--font-display, 'Playfair Display', serif)" }}>{a.nm}</span>
              <span style={{ fontSize: 13, color: t.tx2, marginLeft: 10 }}>{a.full}</span>
            </div>
            <Tag color={a.c}>{a.st}</Tag>
          </div>
          <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7, marginBottom: 10 }}>{a.desc}</p>
          <div style={{ padding: "8px 12px", background: t.sf, borderRadius: 8, marginBottom: 8 }}>
            <div style={{ fontSize: 9, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace" }}>{en ? "METHODOLOGY" : "METODOLOGÍA"}</div>
            <div style={{ fontSize: 13, color: t.tx2, lineHeight: 1.6 }}>{a.method}</div>
          </div>
          <Grid cols="1fr 1fr" gap={6}>
            <MiniStat label={en ? "INPUTS" : "INSUMOS"} value={a.inputs} />
            <MiniStat label={en ? "VALIDATION" : "VALIDACIÓN"} value={a.validation} />
          </Grid>
          <Grid cols="1fr" gap={6} style={{ marginTop: 6 }}>
            <MiniStat label={en ? "SOURCES" : "FUENTES"} value={a.sr} />
          </Grid>
          {a.pv && (
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 9, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 6 }}>PREVIEW</div>
              {a.pv.map((p, j) => (
                <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: t.tx2, width: 140 }}>{p.s}</span>
                  <div style={{ flex: 1, height: 8, borderRadius: 4, background: t.sf }}>
                    <div style={{ height: "100%", borderRadius: 4, width: `${p.v}%`, background: p.c, transition: "width 0.8s ease" }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "'IBM Plex Mono',monospace", color: p.c, width: 30, textAlign: "right" }}>{p.v}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECURITY VIEW v13 — 4 domains, 6 AI threats, priority actions
   Enhanced with risk dashboard
   ═══════════════════════════════════════════════════════════════ */
export function SecTab({ en, t }) {
  const secDomains = [
    { icon: "🛡", nm: en ? "National Security" : "Seguridad Nacional", c: t.rd, st: [{ v: "340", l: en ? "Criminal orgs" : "Orgs criminales" }, { v: "17.2", l: en ? "Homicides/100K" : "Homicidios/100K" }, { v: "88t", l: en ? "Cocaine EU ports" : "Cocaína puertos UE" }], desc: en ? "Drug groups grew 10x in a decade. US Treasury: CR is 'key cocaine transshipment hub' (2025). 70% homicides linked to trafficking. AI: container scanning, maritime patterns, OSINT." : "Grupos criminales crecieron 10x en una década. Tesoro EEUU: CR es 'hub clave transbordo cocaína' (2025). 70% homicidios vinculados a narcotráfico. Oportunidades AI: escaneo contenedores, patrones marítimos, OSINT." },
    { icon: "🔒", nm: en ? "Cybersecurity" : "Ciberseguridad", c: t.or, st: [{ v: "$25M", l: en ? "US investment" : "Inversión EEUU" }, { v: "672GB", l: en ? "Exfiltrated 2022" : "Exfiltrados 2022" }, { v: "2K+", l: en ? "Cyber workers" : "Trabajadores ciber" }], desc: en ? "Conti 2022: 30 institutions, national emergency, ~$30M/day losses. SOC-CR ($9.8M) by 2026. IBM 24/7 security center from CR (320+ staff, 130 countries). AI detects threats 1000x faster." : "Conti 2022: 30 instituciones, emergencia nacional, ~$30M/día pérdidas. SOC-CR ($9.8M) para 2026. Centro seguridad IBM 24/7 desde CR (320+ personas, 130 países). AI detecta amenazas 1000x más rápido." },
    { icon: "🌾", nm: en ? "Food Security" : "Seguridad Alimentaria", c: t.am, st: [{ v: "55%", l: en ? "Imported food" : "Alimentos import." }, { v: "-44%", l: en ? "Coffee decade" : "Café década" }, { v: "-67K", l: en ? "Ag. jobs 8yr" : "Empleos ag. 8 años" }], desc: en ? "Coffee production -44% in a decade. Emergency bean imports Oct 2024. By 2050: 50% of coffee areas unsuitable. AI: PineSORT drones (50x processing), CNN rust detection (95%+)." : "Producción café -44% en década. Importación emergencia frijoles Oct 2024. Para 2050: 50% áreas café inaptadas. AI: drones PineSORT (50x procesamiento), CNN detección roya (95%+)." },
    { icon: "🏥", nm: en ? "Social Security" : "Seguridad Social", c: t.vi, st: [{ v: "$4.4B", l: en ? "CCSS debt" : "Deuda CCSS" }, { v: "8yr", l: "EDUS" }, { v: "51.8%", l: en ? "Female labor" : "Participación mujer" }], desc: en ? "CCSS fiscal crisis. 8 years of EDUS digital health records — massive AI opportunity for predictive medicine, but data protection law restricts use." : "CCSS crisis fiscal. 8 años de EDUS — oportunidad masiva para medicina predictiva, pero ley protección datos restringe uso." }
  ];

  const threats = [
    { n: "Prompt Injection", r: en ? "CRITICAL" : "CRÍTICO", c: t.rd, d: "OWASP LLM #1" },
    { n: "Shadow AI", r: en ? "CRITICAL" : "CRÍTICO", c: t.rd, d: en ? "ChatGPT without policies" : "ChatGPT sin políticas" },
    { n: "MCP Exploits", r: en ? "EMERGING" : "EMERGENTE", c: t.or, d: "CVSS 10/10 · Feb 2026" },
    { n: "Deepfakes", r: en ? "HIGH" : "ALTO", c: t.or, d: en ? "Post-elections 2026. Cost <$10" : "Post-elecciones 2026. Costo <$10" },
    { n: "AI Supply Chain", r: en ? "HIGH" : "ALTO", c: t.am, d: en ? "Unverified models" : "Modelos sin verificar" },
    { n: "AI Bioweapons", r: en ? "EMERGING" : "EMERGENTE", c: t.pk, d: en ? "WEF: 40K compounds 6hrs" : "WEF: 40K compuestos 6hrs" }
  ];

  return (
    <div>
      <SH color={t.rd} label={en ? "Multi-dimensional Security" : "Seguridad Multidimensional"} title={en ? "Security in the AI Era" : "Seguridad en la Era AI"} desc={en ? "National (340 criminal orgs), cyber (post-Conti), food (55% imported), social (CCSS crisis). AI is both tool and threat." : "Nacional (340 orgs criminales), ciber (post-Conti), alimentaria (55% importado), social (crisis CCSS). AI es herramienta y amenaza."} />

      {/* 4 Security Domains */}
      <Grid cols="repeat(auto-fit,minmax(260px,1fr))" gap={10} style={{ marginBottom: 20 }}>
        {secDomains.map((sec, i) => (
          <Card key={i} d={0.1 + i * 0.04} accent={sec.c}>
            <div style={{ fontSize: 16, marginBottom: 6 }}>{sec.icon} <strong style={{ fontSize: 14 }}>{sec.nm}</strong></div>
            <Grid cols="1fr 1fr 1fr" gap={4} style={{ marginBottom: 8 }}>
              {sec.st.map((s, j) => (
                <div key={j} style={{ padding: 4, background: t.sf, borderRadius: 4, textAlign: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'IBM Plex Mono',monospace", color: sec.c }}>{s.v}</div>
                  <div style={{ fontSize: 8, color: t.tx3 }}>{s.l}</div>
                </div>
              ))}
            </Grid>
            <p style={{ fontSize: 11, color: t.tx2, lineHeight: 1.6 }}>{sec.desc}</p>
          </Card>
        ))}
      </Grid>

      {/* 6 AI-Specific Threats */}
      <Card d={0.4} style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: t.rd, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>{en ? "AI-SPECIFIC THREATS" : "AMENAZAS AI"}</div>
        <Grid cols="repeat(auto-fit,minmax(200px,1fr))" gap={8}>
          {threats.map((th, i) => (
            <div key={i} style={{ padding: "10px 12px", background: t.sf, borderRadius: 8, borderLeft: `3px solid ${th.c}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{th.n}</span>
                <Tag color={th.c}>{th.r}</Tag>
              </div>
              <p style={{ fontSize: 10, color: t.tx3 }}>{th.d}</p>
            </div>
          ))}
        </Grid>
      </Card>

      {/* Priority Actions */}
      <Card d={0.5} accent={t.gn}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: t.gn, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>{en ? "PRIORITY ACTIONS" : "ACCIONES PRIORITARIAS"}</div>
        {[
          en ? "AI container scanning at Moín/Caldera ports" : "Escaneo AI contenedores puertos Moín/Caldera",
          en ? "Cybersecurity AI in SOC-CR" : "AI ciberseguridad en SOC-CR",
          en ? "Mandatory Shadow AI policy for government" : "Política Shadow AI obligatoria para gobierno",
          en ? "Anti-misinformation framework for elections 2026" : "Marco anti-desinformación elecciones 2026",
          en ? "Agricultural AI early warning systems" : "Sistemas alerta temprana agrícola AI",
          en ? "Maritime domain awareness AI for Coast Guard" : "AI vigilancia marítima para Guardacostas"
        ].map((a, i) => (
          <div key={i} style={{ fontSize: 13, color: t.tx2, padding: "6px 0 6px 14px", borderBottom: `1px solid ${t.bd}` }}>▸ {a}</div>
        ))}
        <Ci s="WEF 2025, US Embassy, OWASP, InSight Crime, Tico Times" />
      </Card>

      {/* ── A. Threat Deep Dives ── */}
      <Card d={0.55} style={{ marginTop: 20 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: t.rd, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 12 }}>{en ? "THREAT DEEP DIVES" : "AMENAZAS EN PROFUNDIDAD"}</div>
        {SEC_DEEP(en).threats.map((th, i) => (
          <details key={i} style={{ marginBottom: 10, background: t.sf, borderRadius: 8, borderLeft: `3px solid ${th.severity === "CRITICAL" || th.severity === "CRÍTICO" ? t.rd : th.severity === "EMERGING" || th.severity === "EMERGENTE" ? t.pk : t.or}`, overflow: "hidden" }}>
            <summary style={{ padding: "10px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: t.tx, listStyle: "none" }}>
              <span style={{ fontSize: 18 }}>{th.icon}</span>
              <span style={{ flex: 1 }}>{th.name}</span>
              <Tag color={th.severity === "CRITICAL" || th.severity === "CRÍTICO" ? t.rd : th.severity === "EMERGING" || th.severity === "EMERGENTE" ? t.pk : th.severity === "MEDIUM" || th.severity === "MEDIO" ? t.am : t.or}>{th.severity}</Tag>
            </summary>
            <div style={{ padding: "0 14px 12px" }}>
              <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.7, marginBottom: 8 }}>{th.desc}</p>
              <div style={{ padding: "6px 10px", background: `${t.rd}08`, borderRadius: 6, marginBottom: 6 }}>
                <div style={{ fontSize: 9, color: t.rd, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 2 }}>{en ? "CR IMPLICATION" : "IMPLICACIÓN CR"}</div>
                <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6 }}>{th.crImplication}</p>
              </div>
              <div style={{ padding: "6px 10px", background: `${t.gn}08`, borderRadius: 6 }}>
                <div style={{ fontSize: 9, color: t.gn, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 2 }}>{en ? "MITIGATION" : "MITIGACIÓN"}</div>
                <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6 }}>{th.mitigation}</p>
              </div>
            </div>
          </details>
        ))}
      </Card>

      {/* ── B. AI Use Cases by Sector ── */}
      <Card d={0.6} style={{ marginTop: 20 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: t.cy, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 12 }}>{en ? "AI USE CASES BY SECTOR" : "CASOS DE USO AI POR SECTOR"}</div>
        <Grid cols="repeat(auto-fit,minmax(240px,1fr))" gap={10}>
          {SEC_DEEP(en).useCases.map((uc, i) => (
            <div key={i} style={{ padding: 14, background: t.sf, borderRadius: 8, borderTop: `3px solid ${t.cy}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.tx, marginBottom: 8, fontFamily: "var(--font-display, 'Playfair Display', serif)" }}>{uc.sector}</div>
              {uc.examples.map((ex, j) => (
                <div key={j} style={{ fontSize: 12, color: t.tx2, padding: "4px 0 4px 12px", borderLeft: `2px solid ${t.bd}`, marginBottom: 4, lineHeight: 1.6 }}>{ex}</div>
              ))}
            </div>
          ))}
        </Grid>
      </Card>

      {/* ── C. Food Security AI ── */}
      <Card d={0.65} accent={t.am} style={{ marginTop: 20 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: t.am, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 12 }}>{SEC_DEEP(en).foodSecurity.title}</div>
        <Grid cols="repeat(auto-fit,minmax(220px,1fr))" gap={10}>
          {SEC_DEEP(en).foodSecurity.useCases.map((fc, i) => (
            <div key={i} style={{ padding: 12, background: t.sf, borderRadius: 8, borderLeft: `3px solid ${t.am}` }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: t.tx, marginBottom: 6 }}>{fc.name}</div>
              <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6 }}>{fc.desc}</p>
            </div>
          ))}
        </Grid>
      </Card>

      {/* ── D. Social Security AI ── */}
      <Card d={0.7} accent={t.vi} style={{ marginTop: 20 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: t.vi, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 12 }}>{SEC_DEEP(en).socialSecurity.title}</div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10, color: t.gn, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 6 }}>{en ? "OPPORTUNITIES" : "OPORTUNIDADES"}</div>
          {SEC_DEEP(en).socialSecurity.opportunities.map((op, i) => (
            <div key={i} style={{ fontSize: 12, color: t.tx2, padding: "5px 0 5px 14px", borderBottom: `1px solid ${t.bd}`, lineHeight: 1.6 }}>▸ {op}</div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 10, color: t.rd, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 6 }}>{en ? "RISKS" : "RIESGOS"}</div>
          {SEC_DEEP(en).socialSecurity.risks.map((rk, i) => (
            <div key={i} style={{ fontSize: 12, color: t.tx2, padding: "5px 0 5px 14px", borderBottom: `1px solid ${t.bd}`, lineHeight: 1.6, background: `${t.rd}05`, borderRadius: 4, marginBottom: 4 }}>⚠ {rk}</div>
          ))}
        </div>
      </Card>

      {/* ── E. Cybersecurity for SMEs ── */}
      <Card d={0.75} accent={t.or} style={{ marginTop: 20 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: t.or, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 12 }}>{SEC_DEEP(en).cyberSME.title}</div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10, color: t.or, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 6 }}>{en ? "CHALLENGES" : "DESAFÍOS"}</div>
          {SEC_DEEP(en).cyberSME.challenges.map((ch, i) => (
            <div key={i} style={{ fontSize: 12, color: t.tx2, padding: "5px 0 5px 14px", borderBottom: `1px solid ${t.bd}`, lineHeight: 1.6 }}>▸ {ch}</div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 10, color: t.gn, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 6 }}>{en ? "RECOMMENDATIONS" : "RECOMENDACIONES"}</div>
          {SEC_DEEP(en).cyberSME.recommendations.map((rc, i) => (
            <div key={i} style={{ fontSize: 12, color: t.tx2, padding: "5px 0 5px 14px", borderBottom: `1px solid ${t.bd}`, lineHeight: 1.6 }}>✓ {rc}</div>
          ))}
        </div>
      </Card>

      {/* ── F. Priority Actions (Expanded) ── */}
      <Card d={0.8} accent={t.gn} style={{ marginTop: 20 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: t.gn, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 12 }}>{en ? "PRIORITY ACTIONS — EXPANDED" : "ACCIONES PRIORITARIAS — EXPANDIDO"}</div>
        {SEC_DEEP(en).priorityActions.map((pa, i) => (
          <details key={i} style={{ marginBottom: 10, background: t.sf, borderRadius: 8, borderLeft: `3px solid ${t.gn}`, overflow: "hidden" }}>
            <summary style={{ padding: "10px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600, color: t.tx, listStyle: "none" }}>
              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: t.gn, marginRight: 8 }}>{String(i + 1).padStart(2, "0")}</span>
              {pa.action}
            </summary>
            <div style={{ padding: "0 14px 12px" }}>
              <div style={{ padding: "6px 10px", background: `${t.cy}08`, borderRadius: 6, marginBottom: 6 }}>
                <div style={{ fontSize: 9, color: t.cy, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 2 }}>{en ? "WHY" : "POR QUÉ"}</div>
                <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6 }}>{pa.why}</p>
              </div>
              <div style={{ padding: "6px 10px", background: `${t.vi}08`, borderRadius: 6 }}>
                <div style={{ fontSize: 9, color: t.vi, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 2 }}>{en ? "INTERNATIONAL COMPARISON" : "COMPARACIÓN INTERNACIONAL"}</div>
                <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6 }}>{pa.comparison}</p>
              </div>
            </div>
          </details>
        ))}
      </Card>

      {/* ── G. Future Outlook ── */}
      <Card d={0.85} style={{ marginTop: 20 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: t.vi, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 12 }}>{en ? "FUTURE OUTLOOK" : "PERSPECTIVA FUTURA"}</div>
        <div style={{ position: "relative", paddingLeft: 20 }}>
          <div style={{ position: "absolute", left: 6, top: 0, bottom: 0, width: 2, background: `${t.vi}30` }} />
          {SEC_DEEP(en).futureOutlook.map((fo, i) => (
            <div key={i} style={{ position: "relative", marginBottom: 14, paddingLeft: 16 }}>
              <div style={{ position: "absolute", left: -17, top: 4, width: 10, height: 10, borderRadius: "50%", background: t.vi, border: `2px solid ${t.bg}` }} />
              <div style={{ fontSize: 12, fontWeight: 700, fontFamily: "'IBM Plex Mono',monospace", color: t.vi, marginBottom: 2 }}>{fo.year}</div>
              <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6 }}>{fo.event}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* ── H. News & Cases ── */}
      <Card d={0.9} style={{ marginTop: 20 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: t.or, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 12 }}>{en ? "NEWS & CASES" : "NOTICIAS Y CASOS"}</div>
        {SEC_DEEP(en).news.map((nw, i) => (
          <div key={i} style={{ padding: "10px 12px", background: t.sf, borderRadius: 8, marginBottom: 8, borderLeft: `3px solid ${t.or}` }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: t.tx, marginBottom: 4 }}>{nw.headline}</div>
            <p style={{ fontSize: 11, color: t.tx3, lineHeight: 1.6, marginBottom: 6 }}>{nw.significance}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 10, fontFamily: "'IBM Plex Mono',monospace", color: t.tx3 }}>{nw.source}</span>
              <Lnk href={nw.url}>{en ? "Source" : "Fuente"}</Lnk>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LEGISLATION VIEW v13 — 7 laws + 11-item CR checklist
   ═══════════════════════════════════════════════════════════════ */
export function Leg({ en, t }) {
  const L = LAWS(en);
  const CK = CHECKLIST(en);
  const [expandedLaw, setExpandedLaw] = useState(null);
  const [openCheck, setOpenCheck] = useState(null);

  return (
    <div>
      <SH color={t.or} label={en ? "Legal Framework" : "Marco Legal"} title={en ? "AI Legislation — Toolkit for Legislators" : "Legislación AI — Toolkit para Legisladores"} desc={en ? "7 key laws worldwide and what Costa Rica should adopt from each. Plus 11-item CR readiness checklist." : "7 leyes clave a nivel mundial y qué debe adoptar CR de cada una. Más checklist de 11 ítems de preparación CR."} />

      {L.map((l, i) => (
        <Card key={i} d={i * 0.05} accent={l.sc} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 700, fontFamily: "var(--font-display, 'Playfair Display', serif)" }}>{l.f} {l.n}</span>
            <Tag color={l.sc}>{l.st}</Tag>
          </div>
          <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7, marginBottom: 10 }}>{l.desc}</p>
          <div style={{ padding: "8px 12px", background: `${t.cy}06`, borderRadius: 8, borderLeft: `3px solid ${t.cy}`, marginBottom: 8 }}>
            <div style={{ fontSize: 10, color: t.cy, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 3 }}>{en ? "WHAT CR SHOULD ADOPT" : "QUÉ DEBE ADOPTAR CR"}</div>
            <p style={{ fontSize: 13, color: t.tx, lineHeight: 1.6 }}>{l.cr}</p>
          </div>
          {l.lk && <Lnk href={l.lk}>{en ? "Full text" : "Texto completo"}</Lnk>}
          {/* Expandable detail */}
          {(l.timeline || l.crActions) && (
            <>
              <button
                className="law-expand-btn"
                onClick={() => setExpandedLaw(expandedLaw === i ? null : i)}
                style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, background: "none", border: `1px solid ${t.bd}`, borderRadius: 6, padding: "5px 12px", fontSize: 11, color: t.tx2, cursor: "pointer", fontFamily: "'IBM Plex Mono',monospace" }}
              >
                {expandedLaw === i ? (en ? "Less" : "Menos") : (en ? "Details & CR Actions" : "Detalles y Acciones CR")}
                <span style={{ transform: expandedLaw === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", display: "inline-block" }}>▾</span>
              </button>
              <AnimatePresence>
                {expandedLaw === i && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="law-detail" style={{ overflow: "hidden", marginTop: 10 }}>
                    {l.timeline && (
                      <div style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: 10, letterSpacing: 1.5, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 6 }}>
                          {en ? "KEY DATES" : "FECHAS CLAVE"}
                        </div>
                        {l.timeline.map((tl, j) => (
                          <div key={j} className="law-timeline-item" style={{ display: "flex", gap: 10, alignItems: "baseline", padding: "3px 0", borderBottom: `1px solid ${t.bd}` }}>
                            <span className="law-timeline-date" style={{ fontSize: 11, fontWeight: 700, fontFamily: "'IBM Plex Mono',monospace", color: t.vi, minWidth: 80 }}>{tl.date}</span>
                            <span style={{ fontSize: 12, color: t.tx2 }}>{tl.event}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {l.crActions && (
                      <div>
                        <div style={{ fontSize: 10, letterSpacing: 1.5, color: t.cy, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 6 }}>
                          {en ? "CR RECOMMENDATIONS" : "RECOMENDACIONES CR"}
                        </div>
                        {(typeof l.crActions === 'function' ? l.crActions(en) : l.crActions).map((action, j) => (
                          <div key={j} className="law-cr-action" style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "4px 0" }}>
                            <span className="law-cr-action-num" style={{ fontSize: 10, fontWeight: 700, fontFamily: "'IBM Plex Mono',monospace", color: t.cy, minWidth: 18, textAlign: "center", background: `${t.cy}10`, borderRadius: 4, padding: "1px 4px" }}>{j + 1}</span>
                            <span style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6 }}>{action}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </Card>
      ))}

      {/* ── A. Key Terms Explained (LEG_JARGON) ── */}
      <Card d={0.35} style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: t.vi, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 12 }}>{en ? "KEY TERMS EXPLAINED" : "TÉRMINOS CLAVE EXPLICADOS"}</div>
        {(() => {
          const jargon = LEG_JARGON(en);
          const keys = ["ley_vinculante", "marco_antidesinfo", "sandbox_regulatorio", "autoridad_ai"];
          return keys.map((k, i) => {
            const j = jargon[k];
            if (!j) return null;
            return (
              <details key={i} style={{ marginBottom: 10, background: t.sf, borderRadius: 8, borderLeft: `3px solid ${t.vi}`, overflow: "hidden" }}>
                <summary style={{ padding: "10px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600, color: t.tx, listStyle: "none" }}>{j.term}</summary>
                <div style={{ padding: "0 14px 12px" }}>
                  <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.7, marginBottom: 8 }}>{j.what}</p>
                  {j.whoHasDone && (
                    <div style={{ marginBottom: 8 }}>
                      <div style={{ fontSize: 9, color: t.cy, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>{en ? "WHO HAS DONE IT" : "QUIÉN LO HA HECHO"}</div>
                      {Array.isArray(j.whoHasDone) && typeof j.whoHasDone[0] === "object" ? (
                        j.whoHasDone.map((w, wi) => (
                          <div key={wi} style={{ fontSize: 11, color: t.tx2, padding: "4px 0 4px 12px", borderLeft: `2px solid ${t.cy}`, marginBottom: 4, lineHeight: 1.6 }}>
                            <strong>{w.country}</strong> — {w.law} ({w.year}){w.detail ? `: ${w.detail}` : ""}
                          </div>
                        ))
                      ) : Array.isArray(j.whoHasDone) ? (
                        j.whoHasDone.map((w, wi) => (
                          <div key={wi} style={{ fontSize: 11, color: t.tx2, padding: "3px 0 3px 12px", borderLeft: `2px solid ${t.cy}`, marginBottom: 3, lineHeight: 1.6 }}>{w}</div>
                        ))
                      ) : null}
                    </div>
                  )}
                  {j.examples && (
                    <div style={{ marginBottom: 8 }}>
                      <div style={{ fontSize: 9, color: t.cy, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>{en ? "EXAMPLES" : "EJEMPLOS"}</div>
                      {j.examples.map((ex, ei) => (
                        <div key={ei} style={{ fontSize: 11, color: t.tx2, padding: "4px 0 4px 12px", borderLeft: `2px solid ${t.cy}`, marginBottom: 4, lineHeight: 1.6 }}>
                          <strong>{ex.country}</strong>: {ex.approach}
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{ padding: "6px 10px", background: `${t.gn}08`, borderRadius: 6 }}>
                    <div style={{ fontSize: 9, color: t.gn, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 2 }}>{en ? "CR RECOMMENDATION" : "RECOMENDACIÓN CR"}</div>
                    <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6 }}>{j.crRecommendation}</p>
                  </div>
                </div>
              </details>
            );
          });
        })()}
      </Card>

      {/* CR Checklist — 11 items */}
      <Card d={0.4} accent={t.rd}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: t.rd, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
          {en ? "CR READINESS CHECKLIST" : "CHECKLIST PREPARACIÓN CR"} ({CK.length} {en ? "items" : "ítems"})
        </div>
        {CK.map((c, j) => (
          <div key={j} style={{ borderBottom: `1px solid ${t.bd}` }}>
            <div
              onClick={() => setOpenCheck(openCheck === j ? null : j)}
              style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", cursor: "pointer", userSelect: "none" }}
            >
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span>{c.d ? "✅" : "⬜"}</span>
                <span style={{ fontSize: 13, color: c.d ? t.gn : t.tx }}>{c.i}</span>
                <motion.span
                  animate={{ rotate: openCheck === j ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ fontSize: 11, color: t.tx3, lineHeight: 1 }}
                >
                  ▾
                </motion.span>
              </div>
              <span style={{ fontSize: 10, fontFamily: "'IBM Plex Mono',monospace", color: c.p.includes("CRIT") || c.p.includes("CRÍTICA") ? t.rd : c.p.includes("URG") ? t.or : c.p.includes("HIGH") || c.p.includes("ALTA") ? t.am : t.gn }}>{c.p}</span>
            </div>
            <AnimatePresence>
              {openCheck === j && c.desc && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.65, margin: "0 0 8px 30px", paddingRight: 8 }}>{c.desc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
        <Ci s={en ? "Colibrii Labs analysis of legislative gaps" : "Análisis Colibrii Labs de brechas legislativas"} />
      </Card>

      {/* ── B. ENIA Gap Analysis ── */}
      {(() => {
        const enia = ENIA_ANALYSIS(en);
        return (
          <>
            <Card d={0.5} style={{ marginTop: 20 }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: t.gn, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 12 }}>{en ? "ENIA GAP ANALYSIS — STRENGTHS" : "ANÁLISIS BRECHAS ENIA — FORTALEZAS"}</div>
              <Grid cols="repeat(auto-fit,minmax(240px,1fr))" gap={10}>
                {enia.strengths.map((s, i) => (
                  <div key={i} style={{ padding: 12, background: t.sf, borderRadius: 8, borderLeft: `3px solid ${t.gn}` }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: t.gn, marginBottom: 6, fontFamily: "var(--font-display, 'Playfair Display', serif)" }}>{s.pillar}</div>
                    <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6 }}>{s.detail}</p>
                  </div>
                ))}
              </Grid>
            </Card>

            <Card d={0.55} style={{ marginTop: 14 }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: t.rd, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 12 }}>{en ? "ENIA GAP ANALYSIS — DEFICIENCIES" : "ANÁLISIS BRECHAS ENIA — DEFICIENCIAS"}</div>
              {enia.deficiencies.map((d, i) => (
                <div key={i} style={{ padding: "10px 12px", background: t.sf, borderRadius: 8, borderLeft: `3px solid ${d.severity === "CRITICAL" || d.severity === "CRÍTICO" ? t.rd : d.severity === "HIGH" || d.severity === "ALTO" ? t.or : t.am}`, marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: t.tx, fontFamily: "var(--font-display, 'Playfair Display', serif)" }}>{d.pillar}</span>
                    <Tag color={d.severity === "CRITICAL" || d.severity === "CRÍTICO" ? t.rd : d.severity === "HIGH" || d.severity === "ALTO" ? t.or : t.am}>{d.severity}</Tag>
                  </div>
                  <p style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6 }}>{d.detail}</p>
                </div>
              ))}
            </Card>

            <Card d={0.6} style={{ marginTop: 14 }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: t.cy, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 12 }}>{en ? "RECOMMENDED IMPROVEMENTS" : "MEJORAS RECOMENDADAS"}</div>
              {enia.improvements.map((imp, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "6px 0", borderBottom: `1px solid ${t.bd}` }}>
                  <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "'IBM Plex Mono',monospace", color: t.cy, minWidth: 22, textAlign: "center", background: `${t.cy}10`, borderRadius: 4, padding: "2px 4px" }}>{i + 1}</span>
                  <span style={{ fontSize: 12, color: t.tx2, lineHeight: 1.6 }}>{imp}</span>
                </div>
              ))}
            </Card>

            <Card d={0.65} style={{ marginTop: 14 }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: t.vi, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 12 }}>{en ? "COUNTRY COMPARISON" : "COMPARACIÓN POR PAÍS"}</div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", padding: "8px 10px", borderBottom: `2px solid ${t.vi}`, fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: t.vi }}>{en ? "COUNTRY" : "PAÍS"}</th>
                      <th style={{ textAlign: "left", padding: "8px 10px", borderBottom: `2px solid ${t.vi}`, fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: t.vi }}>{en ? "STATUS" : "ESTADO"}</th>
                      <th style={{ textAlign: "left", padding: "8px 10px", borderBottom: `2px solid ${t.vi}`, fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: t.vi }}>{en ? "CR GAP" : "BRECHA CR"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enia.comparison.map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : t.sf }}>
                        <td style={{ padding: "8px 10px", fontWeight: 600, color: t.tx, borderBottom: `1px solid ${t.bd}` }}>{row.country}</td>
                        <td style={{ padding: "8px 10px", color: t.tx2, borderBottom: `1px solid ${t.bd}`, lineHeight: 1.5 }}>{row.status}</td>
                        <td style={{ padding: "8px 10px", color: t.rd, borderBottom: `1px solid ${t.bd}`, lineHeight: 1.5 }}>{row.gap}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Ci s={en ? "Colibrii Labs ENIA Gap Analysis 2026" : "Análisis Brechas ENIA Colibrii Labs 2026"} />
            </Card>
          </>
        );
      })()}
    </div>
  );
}
