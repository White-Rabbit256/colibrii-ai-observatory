"use client";
import { motion } from "framer-motion";
import { TH, ALGOS, LAWS, CHECKLIST } from "./data";
import { Card, SH, Tag, Ci, Lnk, Grid, ProgressBar, ScrollReveal, MiniStat, fadeUp } from "./ui";

/* ═══════════════════════════════════════════════════════════════
   ALGORITHMS VIEW v13 — All 7 with formulas, weights, previews
   ═══════════════════════════════════════════════════════════════ */
export function Algo({ en, t }) {
  const A = ALGOS(en);
  return (
    <div>
      <SH color={t.vi} label={en ? "Proprietary Analysis" : "Análisis Propietario"} title={en ? "Colibrii Algorithms" : "Algoritmos Colibrii"} desc={en ? "7 proprietary algorithms designed for CR's context as an upper-middle-income AI Overperformer. Methodologies transparent; calibrations proprietary." : "7 algoritmos propietarios diseñados para el contexto de CR como AI Overperformer de ingreso medio-alto. Metodologías transparentes; calibraciones propietarias."} />
      {A.map((a, i) => (
        <Card key={i} d={0.06 + i * 0.04} accent={a.c} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, flexWrap: "wrap", gap: 6 }}>
            <div>
              <span style={{ fontSize: 18, fontWeight: 700, color: a.c, fontFamily: "'Fraunces',serif" }}>{a.nm}</span>
              <span style={{ fontSize: 13, color: t.tx2, marginLeft: 10 }}>{a.full}</span>
            </div>
            <Tag color={a.c}>{a.st}</Tag>
          </div>
          <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7, marginBottom: 10 }}>{a.desc}</p>
          <div style={{ padding: "8px 12px", background: t.sf, borderRadius: 8, marginBottom: 8 }}>
            <div style={{ fontSize: 9, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace" }}>FORMULA</div>
            <div style={{ fontSize: 13, color: t.cy, fontFamily: "'IBM Plex Mono',monospace" }}>{a.f}</div>
          </div>
          <Grid cols="1fr 1fr" gap={6}>
            <MiniStat label={en ? "WEIGHTS" : "PESOS"} value={a.w} />
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
    { n: "Deepfakes", r: en ? "HIGH" : "ALTO", c: t.or, d: en ? "Elections 2026. Cost <$10" : "Elecciones 2026. Costo <$10" },
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
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LEGISLATION VIEW v13 — 7 laws + 11-item CR checklist
   ═══════════════════════════════════════════════════════════════ */
export function Leg({ en, t }) {
  const L = LAWS(en);
  const CK = CHECKLIST(en);

  return (
    <div>
      <SH color={t.or} label={en ? "Legal Framework" : "Marco Legal"} title={en ? "AI Legislation — Toolkit for Legislators" : "Legislación AI — Toolkit para Legisladores"} desc={en ? "7 key laws worldwide and what Costa Rica should adopt from each. Plus 11-item CR readiness checklist." : "7 leyes clave a nivel mundial y qué debe adoptar CR de cada una. Más checklist de 11 ítems de preparación CR."} />

      {L.map((l, i) => (
        <Card key={i} d={i * 0.05} accent={l.sc} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Fraunces',serif" }}>{l.f} {l.n}</span>
            <Tag color={l.sc}>{l.st}</Tag>
          </div>
          <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7, marginBottom: 10 }}>{l.desc}</p>
          <div style={{ padding: "8px 12px", background: `${t.cy}06`, borderRadius: 8, borderLeft: `3px solid ${t.cy}`, marginBottom: 8 }}>
            <div style={{ fontSize: 10, color: t.cy, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 3 }}>{en ? "WHAT CR SHOULD ADOPT" : "QUÉ DEBE ADOPTAR CR"}</div>
            <p style={{ fontSize: 13, color: t.tx, lineHeight: 1.6 }}>{l.cr}</p>
          </div>
          {l.lk && <Lnk href={l.lk}>{en ? "Full text" : "Texto completo"}</Lnk>}
        </Card>
      ))}

      {/* CR Checklist — 11 items */}
      <Card d={0.4} accent={t.rd}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: t.rd, textTransform: "uppercase", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
          {en ? "CR READINESS CHECKLIST" : "CHECKLIST PREPARACIÓN CR"} ({CK.length} {en ? "items" : "ítems"})
        </div>
        {CK.map((c, j) => (
          <div key={j} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${t.bd}` }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span>{c.d ? "✅" : "⬜"}</span>
              <span style={{ fontSize: 13, color: c.d ? t.gn : t.tx }}>{c.i}</span>
            </div>
            <span style={{ fontSize: 10, fontFamily: "'IBM Plex Mono',monospace", color: c.p.includes("CRIT") || c.p.includes("CRÍTICA") ? t.rd : c.p.includes("URG") ? t.or : c.p.includes("HIGH") || c.p.includes("ALTA") ? t.am : t.gn }}>{c.p}</span>
          </div>
        ))}
        <Ci s={en ? "Colibrii Labs analysis of legislative gaps" : "Análisis Colibrii Labs de brechas legislativas"} />
      </Card>
    </div>
  );
}
