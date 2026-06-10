"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Card, ScrollReveal, KeyInsight, Lnk, ShareBtn, AN } from "./ui";
import { Icon } from "./system/Icon";
import {
  EN_ACCENT, SRC, HERO, DC_DEMAND, CAPEX, NUCLEAR_DEALS, CHINA,
  TARIFFS, RENEW_SHARE, CR_MIX, CR_RENEW_POINTS, ICE_FIN, ARESEP_2026,
  PEG_TARGETS, TIMELINE, VOTE_MATH, BILL_CORE, STAKEHOLDERS,
  COMPARATIVE, ECAI, SCENARIOS, SOLAR_CURVE, AMENDMENTS, VIDEOS,
} from "./energiaData";
import { DCDemandChart, TariffChart, MixDonut, EcaiRadar, SolarCurveChart } from "./energia/EnergiaCharts";
import { EcaiExplorer, TariffComparator, ScenarioExplorer } from "./energia/EnergiaInteractive";

const GridHero = dynamic(() => import("./energia/GridHero"), { ssr: false, loading: () => null });

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Energía · Electricidad, Competitividad & IA
   Section Factory Run #1 · 8 acts · Exp. 23.414
   Data: components/energiaData.js (no orphan numbers)
   ═══════════════════════════════════════════════════════════════ */

const T = (v, en) => (v && typeof v === "object" && !Array.isArray(v) && ("es" in v) ? (en ? v.en : v.es) : v);
const mono = { fontFamily: "'IBM Plex Mono',monospace" };
const display = { fontFamily: "var(--font-display,'Playfair Display',serif)" };

/* ── Scroll progress bar (section-local) ── */
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const total = doc.scrollHeight - window.innerHeight;
        setP(total > 0 ? Math.min(window.scrollY / total, 1) : 0);
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <div aria-hidden="true" style={{ position: "sticky", top: 0, zIndex: 20, height: 3, background: "transparent", marginBottom: -3 }}>
      <div style={{ height: "100%", width: `${p * 100}%`, background: `linear-gradient(90deg, ${EN_ACCENT.turquoise}, ${EN_ACCENT.gold})`, transition: "width .15s linear", borderRadius: 2 }} />
    </div>
  );
}

/* ── "¿Qué significa para Costa Rica?" anchor callout ── */
function CRAnchor({ en, children }) {
  return (
    <ScrollReveal>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "var(--surface)", border: "1px solid var(--border)", borderLeft: `3px solid ${EN_ACCENT.turquoise}`, borderRadius: "var(--radius-sm)", padding: "14px 16px", margin: "18px 0" }}>
        <span aria-hidden="true" style={{ flexShrink: 0, marginTop: 2, color: EN_ACCENT.turquoise }}><Icon name="target" size={18} /></span>
        <div>
          <div style={{ ...mono, fontSize: 10.5, letterSpacing: 1.5, textTransform: "uppercase", color: EN_ACCENT.turquoise, marginBottom: 4 }}>
            {en ? "What does this mean for Costa Rica?" : "¿Qué significa esto para Costa Rica?"}
          </div>
          <div style={{ fontSize: 13.5, color: "var(--text2)", lineHeight: 1.65 }}>{children}</div>
        </div>
      </div>
    </ScrollReveal>
  );
}

/* ── Shareable card wrapper (ref + ShareBtn header) ── */
function ShareCard({ en, title, filename, sourceIds, children }) {
  const ref = useRef(null);
  return (
    <div className="card" ref={ref} style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
        <h3 style={{ fontSize: 15.5, fontWeight: 700, color: "var(--text)", lineHeight: 1.4 }}>{title}</h3>
        <ShareBtn cardRef={ref} en={en} filename={filename} />
      </div>
      {children}
      {sourceIds && (
        <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
          {sourceIds.map(id => (
            <a key={id} href={SRC[id].url} target="_blank" rel="noopener noreferrer" style={{ ...mono, fontSize: 10, color: "var(--text3)", textDecoration: "none", border: "1px solid var(--border)", borderRadius: 6, padding: "2px 7px" }}>
              {SRC[id].name}
            </a>
          ))}
        </div>
      )}
      {/* Brand watermark — included in ShareBtn PNG exports */}
      <div style={{ marginTop: 10, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6, opacity: 0.75 }}>
        <img src="/colibrii-icon-sm.png" alt="" width={14} height={14} loading="lazy" decoding="async" style={{ borderRadius: 3 }} />
        <span style={{ ...mono, fontSize: 9.5, color: "var(--text3)", letterSpacing: 0.5 }}>colibriilabs.ai · {en ? "Energy & AI" : "Energía & IA"}</span>
      </div>
    </div>
  );
}

/* ── Act header ── */
function Act({ n, en, label, title, desc }) {
  return (
    <div style={{ marginTop: 56, marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <span style={{ ...mono, fontSize: 11, color: EN_ACCENT.gold, border: `1px solid ${EN_ACCENT.gold}55`, borderRadius: 6, padding: "2px 8px" }}>{en ? "ACT" : "ACTO"} {n}</span>
        <span style={{ ...mono, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: EN_ACCENT.turquoise }}>{label}</span>
      </div>
      <h2 style={{ ...display, fontSize: 26, fontWeight: 800, color: "var(--text)", lineHeight: 1.25, marginBottom: 8 }}>{title}</h2>
      {desc && <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7, maxWidth: 680 }}>{desc}</p>}
    </div>
  );
}

/* ── Timeline (Act 5) ── */
const TL_COLORS = { milestone: "#22d3ee", warning: "#F2B135", vote: "#00B5A8", decree: "#ef4444", next: "#818cf8" };
function TimelineViz({ en }) {
  return (
    <div role="list" style={{ position: "relative", paddingLeft: 26 }}>
      <div aria-hidden="true" style={{ position: "absolute", left: 7, top: 6, bottom: 6, width: 2, background: "var(--border)", borderRadius: 2 }} />
      {TIMELINE.rows.map((r, i) => (
        <ScrollReveal key={i} delay={i * 40}>
          <div role="listitem" style={{ position: "relative", paddingBottom: i === TIMELINE.rows.length - 1 ? 0 : 22 }}>
            <span aria-hidden="true" style={{ position: "absolute", left: -26, top: 4, width: 16, height: 16, borderRadius: "50%", background: "var(--card)", border: `3px solid ${TL_COLORS[r.type] || "#22d3ee"}`, boxShadow: `0 0 10px ${TL_COLORS[r.type]}44` }} />
            <div style={{ ...mono, fontSize: 11.5, color: TL_COLORS[r.type], marginBottom: 2 }}>{r.date}</div>
            <div style={{ fontSize: 14.5, fontWeight: 700, color: "var(--text)", marginBottom: 3 }}>{T(r.title, en)}</div>
            <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6, maxWidth: 640 }}>{T(r.desc, en)}</div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

/* ── 38-vote arithmetic (Act 5) ── */
const STANCE = {
  pro: { c: "#00B5A8", es: "A favor", en: "In favour" },
  con: { c: "#818cf8", es: "En contra", en: "Against" },
  "lean-pro": { c: "#F2B135", es: "Inclinación a favor", en: "Leaning in favour" },
};
function VoteMath({ en }) {
  const fd = VOTE_MATH.firstDebate;
  const segs = [
    { n: fd.favor, c: "#00B5A8", l: en ? "In favour" : "A favor" },
    { n: fd.against, c: "#818cf8", l: en ? "Against" : "En contra" },
    { n: fd.absent, c: "var(--border2)", l: en ? "Absent" : "Ausencias" },
  ];
  const effectivePro = VOTE_MATH.blocs.find(b => b.party === "PPSO").effective;
  return (
    <div>
      {/* First debate result */}
      <div style={{ ...mono, fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--text3)", marginBottom: 8 }}>
        {en ? "First debate — 26 May 2026" : "Primer debate — 26 may 2026"}
      </div>
      <div style={{ display: "flex", height: 34, borderRadius: 8, overflow: "hidden", border: "1px solid var(--border)" }} role="img"
        aria-label={en ? `First debate: ${fd.favor} in favour, ${fd.against} against, ${fd.absent} absent` : `Primer debate: ${fd.favor} a favor, ${fd.against} en contra, ${fd.absent} ausencias`}>
        {segs.map((s, i) => (
          <div key={i} style={{ width: `${(s.n / VOTE_MATH.totalSeats) * 100}%`, background: s.c, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 800, ...mono }}>{s.n}</div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 8 }}>
        {segs.map((s, i) => (
          <span key={i} style={{ fontSize: 11.5, color: "var(--text2)", display: "inline-flex", alignItems: "center", gap: 5 }}>
            <span aria-hidden="true" style={{ width: 9, height: 9, borderRadius: 3, background: s.c, display: "inline-block" }} />{s.l}
          </span>
        ))}
      </div>

      {/* Second debate arithmetic */}
      <div style={{ ...mono, fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--text3)", margin: "22px 0 8px" }}>
        {en ? "Second debate — the 38-vote wall" : "Segundo debate — el muro de los 38 votos"}
      </div>
      <div style={{ position: "relative", height: 34, borderRadius: 8, overflow: "hidden", border: "1px solid var(--border)", background: "var(--surface)" }} role="img"
        aria-label={en ? `${effectivePro} effective government votes of ${VOTE_MATH.needed} required` : `${effectivePro} votos efectivos del oficialismo de ${VOTE_MATH.needed} requeridos`}>
        <div style={{ position: "absolute", inset: 0, width: `${(effectivePro / VOTE_MATH.totalSeats) * 100}%`, background: "linear-gradient(90deg,#00B5A8,#22d3ee)" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, left: `${(VOTE_MATH.needed / VOTE_MATH.totalSeats) * 100}%`, width: 0, borderLeft: `3px dashed ${EN_ACCENT.gold}` }} />
        <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#fff", fontSize: 12.5, fontWeight: 800, ...mono }}>{effectivePro}</span>
        <span style={{ position: "absolute", left: `${(VOTE_MATH.needed / VOTE_MATH.totalSeats) * 100}%`, top: "50%", transform: "translate(8px,-50%)", color: EN_ACCENT.gold, fontSize: 12.5, fontWeight: 800, ...mono }}>38</span>
      </div>
      <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8 }}>
        {VOTE_MATH.blocs.map((b, i) => (
          <div key={i} style={{ background: "var(--surface)", borderRadius: 10, padding: "10px 12px", borderTop: `3px solid ${STANCE[b.stance].c}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--text)" }}>{b.party}</span>
              <span style={{ ...mono, fontSize: 15, fontWeight: 800, color: STANCE[b.stance].c }}>{b.seats}</span>
            </div>
            <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{T(b.name, en)}</div>
            <div style={{ fontSize: 11, color: STANCE[b.stance].c, marginTop: 3, fontWeight: 600 }}>{STANCE[b.stance][en ? "en" : "es"]}</div>
            {b.note && <div style={{ fontSize: 10.5, color: "var(--text3)", marginTop: 3, lineHeight: 1.45 }}>{T(b.note, en)}</div>}
          </div>
        ))}
      </div>
      <KeyInsight text={T(VOTE_MATH.arithmetic, en)} color={EN_ACCENT.gold} />
    </div>
  );
}

/* ── Stakeholder card (Act 5) ── */
function StakeholderGrid({ en }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 12 }}>
      {STAKEHOLDERS.rows.map((p, i) => (
        <ScrollReveal key={i} delay={(i % 3) * 60}>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: 16, height: "100%", borderTop: `3px solid ${STANCE[p.stance]?.c || "#F2B135"}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--text)" }}>{T(p.name, en)}</div>
                <div style={{ fontSize: 11, color: "var(--text3)" }}>{T(p.role, en)}</div>
              </div>
              <span style={{ flexShrink: 0, alignSelf: "flex-start", fontSize: 10, fontWeight: 700, ...mono, color: STANCE[p.stance]?.c, border: `1px solid ${STANCE[p.stance]?.c}55`, borderRadius: 6, padding: "2px 7px" }}>
                {p.stance === "matiz" ? (en ? "NUANCED" : "MATIZ") : STANCE[p.stance][en ? "en" : "es"].toUpperCase()}
              </span>
            </div>
            <p style={{ fontSize: 12.5, color: "var(--text2)", lineHeight: 1.6, marginBottom: 8 }}>{T(p.quote, en)}</p>
            <div style={{ ...mono, fontSize: 10.5, color: "var(--text3)" }}>{p.outlet} · {p.date}</div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

/* ── Comparative lessons rail (Act 6) ── */
function ComparativeRail({ en }) {
  return (
    <div
      tabIndex={0}
      role="region"
      aria-label={en ? "Comparative cases — scroll horizontally" : "Casos comparados — desplace horizontalmente"}
      style={{ display: "flex", gap: 14, overflowX: "auto", scrollSnapType: "x mandatory", paddingBottom: 12, WebkitOverflowScrolling: "touch" }}
    >
      {COMPARATIVE.rows.map((c, i) => (
        <div key={i} style={{ scrollSnapAlign: "start", flex: "0 0 min(86%, 300px)", background: "var(--card)", border: "1px solid var(--border)", borderTop: `3px solid ${c.tone === "good" ? EN_ACCENT.turquoise : EN_ACCENT.gold}`, borderRadius: "var(--radius-sm)", padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ ...display, fontSize: 16.5, fontWeight: 800, color: "var(--text)" }}>{T(c.country, en)}</span>
            <span style={{ ...mono, fontSize: 11, color: "var(--text3)" }}>{c.year}</span>
          </div>
          <p style={{ fontSize: 12.5, color: "var(--text2)", lineHeight: 1.6, flexGrow: 1 }}>{T(c.model, en)}</p>
          <div style={{ background: "var(--surface)", borderRadius: 8, padding: "10px 12px", borderLeft: `3px solid ${c.tone === "good" ? EN_ACCENT.turquoise : EN_ACCENT.gold}` }}>
            <div style={{ ...mono, fontSize: 9.5, letterSpacing: 1.2, textTransform: "uppercase", color: c.tone === "good" ? EN_ACCENT.turquoise : EN_ACCENT.gold, marginBottom: 3 }}>{en ? "Lesson for CR" : "Lección para CR"}</div>
            <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.55 }}>{T(c.lesson, en)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Amendment expandable card (Act 8) ── */
function AmendmentCard({ a, en }) {
  const [open, setOpen] = useState(false);
  const stage = AMENDMENTS.stages.find(s => s.id === a.stage);
  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left", background: "transparent", border: "none", cursor: "pointer", padding: "14px 16px", color: "var(--text)", minHeight: 48 }}
      >
        <span aria-hidden="true" style={{ ...mono, flexShrink: 0, width: 30, height: 30, borderRadius: 8, background: `${EN_ACCENT.turquoise}1a`, color: EN_ACCENT.turquoise, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800 }}>{a.n}</span>
        <span style={{ flexGrow: 1, fontSize: 13.5, fontWeight: 700, lineHeight: 1.4 }}>{T(a.title, en)}</span>
        <span aria-hidden="true" style={{ flexShrink: 0, color: "var(--text3)", transform: open ? "rotate(180deg)" : "none", transition: "transform .25s" }}><Icon name="chevronDown" size={16} /></span>
      </button>
      {open && (
        <div style={{ padding: "0 16px 16px 58px" }}>
          <div style={{ fontSize: 12.5, color: "var(--text2)", lineHeight: 1.65, marginBottom: 8 }}>{T(a.what, en)}</div>
          <div style={{ background: "var(--surface)", borderRadius: 8, padding: "9px 12px", fontSize: 12, color: "var(--text2)", lineHeight: 1.6, borderLeft: `3px solid ${EN_ACCENT.gold}` }}>
            <strong style={{ color: "var(--text)" }}>{en ? "Why: " : "Por qué: "}</strong>{T(a.why, en)}
          </div>
          {stage && <div style={{ ...mono, fontSize: 10, color: "var(--text3)", marginTop: 8 }}>{T(stage.label, en)}</div>}
        </div>
      )}
    </div>
  );
}

/* ═══════════════ MAIN VIEW ═══════════════ */
export function EnergiaDeep({ en = false }) {
  const heroStat = HERO.stat;
  return (
    <div style={{ maxWidth: 1060, margin: "0 auto" }}>
      <ScrollProgress />

      {/* ════ ACTO 1 — COLD OPEN ════ */}
      <section aria-label={en ? "Opening" : "Apertura"} style={{ position: "relative", borderRadius: "var(--radius)", overflow: "hidden", background: `linear-gradient(160deg, ${EN_ACCENT.navy} 0%, ${EN_ACCENT.navy2} 55%, #0a1830 100%)`, border: "1px solid rgba(0,181,168,0.25)", marginTop: 14 }}>
        <GridHero />
        <div style={{ position: "relative", zIndex: 2, padding: "clamp(28px, 6vw, 64px) clamp(20px, 5vw, 56px)" }}>
          <div style={{ ...mono, fontSize: 11, letterSpacing: 2.5, color: EN_ACCENT.turquoise, marginBottom: 14 }}>{T(HERO.eyebrow, en)}</div>
          <h1 style={{ ...display, fontSize: "clamp(26px, 4.6vw, 44px)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.18, maxWidth: 720, marginBottom: 22 }}>
            {T(HERO.title, en)}
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 14, marginBottom: 10 }}>
            <span style={{ ...mono, fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 800, color: EN_ACCENT.gold, lineHeight: 1 }}>
              <AN v={heroStat.v} p={0} />
            </span>
            <span style={{ ...mono, fontSize: 20, color: EN_ACCENT.gold }}>{heroStat.unit} · 2030</span>
            <span style={{ ...mono, fontSize: 13, color: "rgba(241,245,249,0.55)" }}>{heroStat.from} {heroStat.unit} · 2024</span>
          </div>
          <p style={{ fontSize: 14, color: "rgba(241,245,249,0.85)", lineHeight: 1.65, maxWidth: 640, marginBottom: 22 }}>{T(heroStat.label, en)}</p>
          <div style={{ display: "grid", gap: 10, maxWidth: 760 }}>
            {HERO.bluf.map((b, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span aria-hidden="true" style={{ ...mono, flexShrink: 0, fontSize: 11, color: EN_ACCENT.turquoise, border: "1px solid rgba(0,181,168,0.4)", borderRadius: 6, padding: "1px 7px", marginTop: 2 }}>{i + 1}</span>
                <p style={{ fontSize: 13.5, color: "rgba(241,245,249,0.92)", lineHeight: 1.6 }}>{T(b, en)}</p>
              </div>
            ))}
          </div>
          <div style={{ ...mono, fontSize: 11, color: "rgba(241,245,249,0.5)", marginTop: 22, display: "flex", alignItems: "center", gap: 8 }}>
            <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: EN_ACCENT.turquoise, display: "inline-block" }} />
            {T(HERO.disclaimer, en)}
          </div>
        </div>
      </section>

      {/* ════ ACTO 2 — LA APUESTA GLOBAL ════ */}
      <Act n={2} en={en} label={en ? "The global stake" : "La apuesta global"}
        title={en ? "AI runs on electricity — and is buying it years in advance" : "La IA corre sobre electricidad — y la está comprando con años de anticipación"}
        desc={en ? "Data-centre demand will more than double by 2030. The world's largest companies are responding with the biggest private infrastructure bet in history — including restarting nuclear plants." : "La demanda de los centros de datos se duplicará con creces al 2030. Las empresas más grandes del mundo responden con la mayor apuesta privada de infraestructura de la historia — incluida la reapertura de plantas nucleares."} />

      <ScrollReveal>
        <ShareCard en={en} filename="colibrii-energia-demanda-datacenters" sourceIds={["iea2025"]}
          title={en ? "Data-centre electricity demand, 2020-2035 (TWh)" : "Demanda eléctrica de centros de datos, 2020-2035 (TWh)"}>
          <DCDemandChart en={en} />
        </ShareCard>
      </ScrollReveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 12, marginTop: 14 }}>
        {CAPEX.map((c, i) => (
          <ScrollReveal key={i} delay={i * 70}>
            <div className="card" style={{ padding: 18, height: "100%", borderTop: `3px solid ${EN_ACCENT.turquoise}` }}>
              <div style={{ ...mono, fontSize: 26, fontWeight: 800, color: "var(--text)" }}>{c.v}</div>
              <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.55, marginTop: 6 }}>{T(c.unit, en)}</div>
              <div style={{ ...mono, fontSize: 10, color: "var(--text3)", marginTop: 8 }}>{SRC[c.s].name}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <Card style={{ marginTop: 14 }}>
          <h3 style={{ fontSize: 15.5, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>
            {en ? "Nuclear is back — bought directly by tech" : "La energía nuclear volvió — comprada directamente por las tecnológicas"}
          </h3>
          <p style={{ fontSize: 12.5, color: "var(--text3)", marginBottom: 14 }}>
            {en ? "Corporate offtake deals for 24/7 carbon-free baseload, 2024-2026." : "Contratos corporativos por energía base limpia 24/7, 2024-2026."}
          </p>
          <div style={{ display: "grid", gap: 8 }}>
            {NUCLEAR_DEALS.rows.map((d, i) => (
              <div key={i} style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px", alignItems: "baseline", background: "var(--surface)", borderRadius: 10, padding: "10px 14px" }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: "var(--text)", minWidth: 90 }}>{d.buyer}</span>
                <span style={{ ...mono, fontSize: 13, fontWeight: 700, color: EN_ACCENT.gold }}>{d.mw.toLocaleString(en ? "en-US" : "es-CR")} MW</span>
                <span style={{ fontSize: 12, color: "var(--text2)", flexBasis: "100%" }}>{T(d.plant, en)} — {T(d.deal, en)}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
            {["constellation", "talen", "google", "terrapower"].map(id => (
              <a key={id} href={SRC[id].url} target="_blank" rel="noopener noreferrer" style={{ ...mono, fontSize: 10, color: "var(--text3)", textDecoration: "none", border: "1px solid var(--border)", borderRadius: 6, padding: "2px 7px" }}>{SRC[id].name}</a>
            ))}
          </div>
        </Card>
      </ScrollReveal>

      <ScrollReveal>
        <div style={{ marginTop: 14, background: `linear-gradient(135deg, ${EN_ACCENT.navy}, ${EN_ACCENT.navy2})`, borderRadius: "var(--radius)", padding: "22px 24px", border: "1px solid rgba(0,181,168,0.2)" }}>
          <div style={{ ...mono, fontSize: 11, letterSpacing: 2, color: EN_ACCENT.turquoise, marginBottom: 12 }}>{en ? "MEANWHILE, CHINA" : "MIENTRAS TANTO, CHINA"}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 16 }}>
            {CHINA.stats.map((s, i) => (
              <div key={i}>
                <div style={{ ...mono, fontSize: 30, fontWeight: 800, color: "#f1f5f9" }}>
                  <AN v={s.v} p={0} /><span style={{ fontSize: 14, color: EN_ACCENT.turquoise, marginLeft: 5 }}>{typeof s.unit === "string" ? s.unit : T(s.unit, en)}</span>
                </div>
                <div style={{ fontSize: 12, color: "rgba(241,245,249,0.75)", lineHeight: 1.55, marginTop: 4 }}>{T(s.label, en)}</div>
              </div>
            ))}
          </div>
          <div style={{ ...mono, fontSize: 10, color: "rgba(241,245,249,0.45)", marginTop: 14 }}>{SRC.ember.name} · {SRC.cef.name}</div>
        </div>
      </ScrollReveal>

      <CRAnchor en={en}>{T(NUCLEAR_DEALS.insight, en)}</CRAnchor>

      {/* ════ ACTO 3 — LA REGIÓN ════ */}
      <Act n={3} en={en} label={en ? "The region" : "La región"}
        title={en ? "Latin America: clean grids, expensive megawatts" : "América Latina: redes limpias, megavatios caros"}
        desc={en ? "Costa Rica competes for the same investment as Uruguay, Panama and Mexico. Price and spare capacity — not cleanliness — are where the race is decided." : "Costa Rica compite por la misma inversión que Uruguay, Panamá y México. El precio y el margen de capacidad — no la limpieza — son donde se decide la carrera."} />

      <ScrollReveal>
        <ShareCard en={en} filename="colibrii-energia-tarifas-latam" sourceIds={["seg", "eia", "aresep", "cicr", "enerdata"]}
          title={en ? "Industrial electricity tariffs (US$/MWh, 2024-2025)" : "Tarifas eléctricas industriales (US$/MWh, 2024-2025)"}>
          <TariffChart en={en} />
          <p style={{ fontSize: 11.5, color: "var(--text3)", lineHeight: 1.55, marginTop: 8 }}>{T(TARIFFS.caveat, en)} {T(TARIFFS.crNote, en)}</p>
        </ShareCard>
      </ScrollReveal>

      <ScrollReveal>
        <Card style={{ marginTop: 14 }}>
          <h3 style={{ fontSize: 15.5, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>{en ? "Renewable share of generation (%)" : "Participación renovable en la generación (%)"}</h3>
          <div style={{ display: "grid", gap: 8 }}>
            {RENEW_SHARE.rows.map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ ...mono, fontSize: 11.5, width: 26, color: "var(--text3)" }}>{r.code}</span>
                <span style={{ fontSize: 12.5, color: "var(--text2)", width: 110, flexShrink: 0 }}>{T(r.country, en)}</span>
                <div style={{ flexGrow: 1, height: 10, background: "var(--surface)", borderRadius: 5, overflow: "hidden" }}>
                  <div style={{ width: `${r.pct}%`, height: "100%", borderRadius: 5, background: r.highlight ? `linear-gradient(90deg, ${EN_ACCENT.turquoise}, #22d3ee)` : "rgba(129,140,248,0.55)" }} />
                </div>
                <span style={{ ...mono, fontSize: 12.5, fontWeight: 700, color: r.highlight ? EN_ACCENT.turquoise : "var(--text2)", width: 64, textAlign: "right" }}>{r.pct}% <span style={{ fontSize: 9.5, color: "var(--text3)" }}>'{String(r.year).slice(2)}</span></span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6, marginTop: 12 }}>{T(RENEW_SHARE.insight, en)}</p>
        </Card>
      </ScrollReveal>

      {/* ════ ACTO 4 — COSTA RICA HOY ════ */}
      <Act n={4} en={en} label={en ? "Costa Rica today" : "Costa Rica hoy"}
        title={en ? "98.6% renewable, a stronger ICE — and almost no spare megawatts" : "98,6% renovable, un ICE más sólido — y casi ningún megavatio de sobra"}
        desc={en ? "The 2025 numbers contradict two popular narratives at once: ICE is not broke, and the grid is not ready for an AI-scale demand wave." : "Los números de 2025 contradicen dos narrativas populares a la vez: el ICE no está quebrado, y la red no está lista para una ola de demanda a escala IA."} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 14 }}>
        <ScrollReveal>
          <ShareCard en={en} filename="colibrii-energia-matriz-cr" sourceIds={["peg", "ice"]}
            title={en ? "Electric matrix: installed capacity & renewable share" : "Matriz eléctrica: capacidad instalada y participación renovable"}>
            <MixDonut en={en} />
          </ShareCard>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <Card style={{ height: "100%" }}>
            <h3 style={{ fontSize: 15.5, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>{en ? "ICE financial dashboard" : "Dashboard financiero del ICE"}</h3>
            <div style={{ display: "grid", gap: 10 }}>
              {ICE_FIN.stats.map((s, i) => (
                <div key={s.id} style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                  <span style={{ ...mono, fontSize: 19, fontWeight: 800, color: s.v < 0 ? EN_ACCENT.turquoise : "var(--text)", minWidth: 86, textAlign: "right" }}>
                    {s.v < 0 ? "" : ""}{s.v.toLocaleString(en ? "en-US" : "es-CR")}{typeof s.unit === "string" ? s.unit : ""}
                  </span>
                  <span style={{ fontSize: 11.5, color: "var(--text2)", lineHeight: 1.5 }}>{typeof s.unit !== "string" ? `(${T(s.unit, en)}) ` : ""}{T(s.label, en)}</span>
                </div>
              ))}
            </div>
            {/* Leverage gauge */}
            <div style={{ marginTop: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, ...mono, color: "var(--text3)", marginBottom: 4 }}>
                <span>{en ? "Law 8660 leverage" : "Apalancamiento Ley 8660"}</span><span>{en ? "cap" : "tope"} 45%</span>
              </div>
              <div style={{ position: "relative", height: 12, background: "var(--surface)", borderRadius: 6, overflow: "hidden" }} role="img" aria-label={en ? "27.8% of a 45% cap" : "27,8% de un tope de 45%"}>
                <div style={{ width: `${(27.8 / 45) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${EN_ACCENT.turquoise}, #22d3ee)`, borderRadius: 6 }} />
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
              {ICE_FIN.ratings.map((r, i) => (
                <div key={i} style={{ background: "var(--surface)", borderRadius: 10, padding: "8px 12px" }}>
                  <span style={{ ...mono, fontSize: 13, fontWeight: 800, color: EN_ACCENT.gold }}>{r.agency} {r.rating}</span>
                  <span style={{ fontSize: 11, color: "var(--text2)", marginLeft: 6 }}>{T(r.outlook, en)} · {r.date}</span>
                  <div style={{ fontSize: 10.5, color: "var(--text3)", marginTop: 2, maxWidth: 290, lineHeight: 1.45 }}>{T(r.note, en)}</div>
                </div>
              ))}
            </div>
            <div style={{ ...mono, fontSize: 10, color: "var(--text3)", marginTop: 10 }}>{SRC.ice.name}</div>
          </Card>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <Card style={{ marginTop: 14 }} accent={EN_ACCENT.gold}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 24px", alignItems: "baseline" }}>
            <span style={{ ...mono, fontSize: 26, fontWeight: 800, color: EN_ACCENT.turquoise }}>−4,93% → −16,44%</span>
            <span style={{ fontSize: 12.5, color: "var(--text2)" }}>ICE −14,92% · CNFL −14,55% · {en ? "generation cost factor" : "factor CVG"} −7,77%</span>
          </div>
          <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.65, marginTop: 8 }}>{T(ARESEP_2026.headline, en)}</p>
          <div style={{ ...mono, fontSize: 10, color: "var(--text3)", marginTop: 8 }}>{SRC.aresep.name}</div>
        </Card>
      </ScrollReveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 12, marginTop: 14 }}>
        {PEG_TARGETS.rows.map((r, i) => (
          <ScrollReveal key={i} delay={i * 70}>
            <div className="card" style={{ padding: 18, height: "100%" }}>
              <div style={{ ...mono, fontSize: 24, fontWeight: 800, color: "var(--text)" }}>
                <AN v={r.v} p={0} /><span style={{ fontSize: 13, color: EN_ACCENT.turquoise, marginLeft: 5 }}>{typeof r.unit === "string" ? r.unit : T(r.unit, en)}</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.55, marginTop: 6 }}>{T(r.label, en)}</div>
              <div style={{ ...mono, fontSize: 10, color: "var(--text3)", marginTop: 8 }}>{SRC[r.s || PEG_TARGETS.s].name}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <CRAnchor en={en}>{T(ICE_FIN.insight, en)}</CRAnchor>

      {/* ════ ACTO 5 — EXPEDIENTE 23.414 ════ */}
      <Act n={5} en={en} label="Expediente 23.414"
        title={en ? "The reform that passed one debate and stalled the next day" : "La reforma que ganó un debate y quedó varada al día siguiente"}
        desc={en ? "The most consequential electricity reform in 30 years passed first debate 27-24 on 26 May 2026 — and was withdrawn from the agenda by decree 18 hours later. What the bill does, who stands where, and the arithmetic that decides everything." : "La reforma eléctrica más importante en 30 años se aprobó en primer debate 27-24 el 26 de mayo de 2026 — y fue retirada de la agenda por decreto 18 horas después. Qué hace el proyecto, quién está dónde, y la aritmética que lo decide todo."} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 12 }}>
        {BILL_CORE.rows.map((b, i) => (
          <ScrollReveal key={i} delay={i * 60}>
            <div className="card" style={{ padding: 16, height: "100%", borderTop: `3px solid ${i < 2 ? EN_ACCENT.turquoise : EN_ACCENT.gold}` }}>
              <div style={{ fontSize: 13.5, fontWeight: 800, color: "var(--text)", marginBottom: 6 }}>{T(b.t, en)}</div>
              <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6 }}>{T(b.d, en)}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))", gap: 14, marginTop: 14 }}>
        <ScrollReveal>
          <Card style={{ height: "100%" }}>
            <h3 style={{ fontSize: 15.5, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>{en ? "Timeline of the expediente" : "Cronología del expediente"}</h3>
            <TimelineViz en={en} />
            <div style={{ ...mono, fontSize: 10, color: "var(--text3)", marginTop: 12 }}>{SRC.asamblea.name} · {SRC.nacion.name} · {SRC.presidencia.name}</div>
          </Card>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <ShareCard en={en} filename="colibrii-energia-38-votos" sourceIds={["asamblea", "semanario"]}
            title={en ? "The vote arithmetic" : "La aritmética de los votos"}>
            <VoteMath en={en} />
          </ShareCard>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <div style={{ marginTop: 18 }}>
          <h3 style={{ fontSize: 15.5, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{en ? "Who stands where" : "Quién está dónde"}</h3>
          <p style={{ fontSize: 12, color: "var(--text3)", marginBottom: 12 }}>{T(STAKEHOLDERS.note, en)}</p>
          <StakeholderGrid en={en} />
        </div>
      </ScrollReveal>

      {/* ════ ACTO 6 — LECCIONES COMPARADAS ════ */}
      <Act n={6} en={en} label={en ? "Comparative lessons" : "Lecciones comparadas"}
        title={en ? "Six countries already ran this experiment" : "Seis países ya corrieron este experimento"}
        desc={en ? "Electricity market reform has four decades of evidence. The designs that worked — and the two cautionary tales every diputado should know." : "La reforma de mercados eléctricos tiene cuatro décadas de evidencia. Los diseños que funcionaron — y las dos historias de advertencia que todo diputado debería conocer."} />

      <ScrollReveal><ComparativeRail en={en} /></ScrollReveal>
      <KeyInsight text={T(COMPARATIVE.netAssessment, en)} color={EN_ACCENT.turquoise} />
      <p style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.6, marginTop: 8 }}>{T(COMPARATIVE.cepalNote, en)} <Lnk href={SRC.cepal2002.url}>{SRC.cepal2002.name}</Lnk></p>

      {/* ════ ACTO 7 — LOS NÚMEROS QUE IMPORTAN ════ */}
      <Act n={7} en={en} label={en ? "The numbers that matter" : "Los números que importan"}
        title={en ? "ECAI-CR: measure the race, then run your own scenarios" : "ECAI-CR: mida la carrera, y luego corra sus propios escenarios"}
        desc={en ? "Colibrii's Energy Competitiveness for AI Investment index, an adjustable-weight tool — plus a demand explorer to 2050, a tariff cost comparator, and the solar curve that changes everything." : "El índice de Competitividad Energética para Inversión en IA de Colibrii, con pesos ajustables — más un explorador de demanda al 2050, un comparador de costos tarifarios y la curva solar que lo cambia todo."} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))", gap: 14 }}>
        <ScrollReveal>
          <ShareCard en={en} filename="colibrii-ecai-radar" sourceIds={["colibrii"]}
            title={en ? "ECAI-CR components (0-100)" : "Componentes ECAI-CR (0-100)"}>
            <EcaiRadar en={en} />
          </ShareCard>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <ShareCard en={en} filename="colibrii-ecai-explorer" sourceIds={["colibrii"]}
            title={en ? "ECAI-CR — adjust the weights" : "ECAI-CR — ajuste los pesos"}>
            <EcaiExplorer en={en} />
          </ShareCard>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <ShareCard en={en} filename="colibrii-escenarios-2050" sourceIds={["colibrii", "peg"]}
          title={en ? "Demand scenarios to 2050 (index, 2024 = 100)" : "Escenarios de demanda al 2050 (índice, 2024 = 100)"}>
          <div style={{ marginTop: 4 }}><ScenarioExplorer en={en} /></div>
        </ShareCard>
      </ScrollReveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))", gap: 14, marginTop: 14 }}>
        <ScrollReveal>
          <ShareCard en={en} filename="colibrii-comparador-tarifario" sourceIds={["seg", "eia", "cicr"]}
            title={en ? "What would your megawatts cost?" : "¿Cuánto costarían sus megavatios?"}>
            <TariffComparator en={en} />
          </ShareCard>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <ShareCard en={en} filename="colibrii-curva-solar" sourceIds={["owid"]}
            title={en ? "Solar learning curve (Swanson's Law)" : "Curva de aprendizaje solar (Ley de Swanson)"}>
            <SolarCurveChart en={en} />
            <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6, marginTop: 8 }}>{T(SOLAR_CURVE.law, en)}</p>
          </ShareCard>
        </ScrollReveal>
      </div>

      <CRAnchor en={en}>{T(ECAI.reading, en)}</CRAnchor>

      {/* ════ ACTO 8 — RECOMENDACIONES ════ */}
      <Act n={8} en={en} label={en ? "Recommendations" : "Recomendaciones"}
        title={en ? "Twelve technical amendments — amend, don't reject" : "Doce enmiendas técnicas — enmendar, no rechazar"}
        desc={T(AMENDMENTS.framing, en)} />

      {AMENDMENTS.stages.map(stage => (
        <div key={stage.id} style={{ marginBottom: 18 }}>
          <div style={{ ...mono, fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: EN_ACCENT.gold, margin: "14px 0 10px" }}>{T(stage.label, en)}</div>
          <div style={{ display: "grid", gap: 8 }}>
            {AMENDMENTS.rows.filter(a => a.stage === stage.id).map(a => <AmendmentCard key={a.n} a={a} en={en} />)}
          </div>
        </div>
      ))}

      {/* Videos — link-out cards (D-005: no third-party iframes) */}
      <ScrollReveal>
        <div style={{ marginTop: 24 }}>
          <h3 style={{ fontSize: 15.5, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>{en ? "Watch the sources" : "Vea las fuentes"}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 10 }}>
            {VIDEOS.map((v, i) => (
              <a key={i} href={v.url} target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none", background: `linear-gradient(150deg, ${EN_ACCENT.navy}, ${EN_ACCENT.navy2})`, borderRadius: "var(--radius-sm)", padding: 16, border: "1px solid rgba(0,181,168,0.25)" }}>
                <span aria-hidden="true" style={{ display: "inline-flex", width: 34, height: 34, borderRadius: "50%", background: "rgba(0,181,168,0.18)", color: EN_ACCENT.turquoise, alignItems: "center", justifyContent: "center", marginBottom: 10 }}><Icon name="video" size={16} /></span>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9", lineHeight: 1.45, marginBottom: 4 }}>{T(v.title, en)}</div>
                <div style={{ ...mono, fontSize: 10.5, color: "rgba(241,245,249,0.55)" }}>{v.outlet} ↗</div>
              </a>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Closing provenance note */}
      <div style={{ margin: "32px 0 10px", padding: "16px 18px", background: "var(--surface)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
        <div style={{ ...mono, fontSize: 10.5, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--text3)", marginBottom: 6 }}>{en ? "Method & provenance" : "Método y procedencia"}</div>
        <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.65 }}>
          {en
            ? "Every figure in this section carries a named source, URL, access date and confidence flag. Primary documents (IEA, ARESEP resolutions, ICE financial statements, rating actions, Assembly records) prevail over press reports; scenarios and the ECAI-CR composite are Colibrii proposals, labeled as estimates with open methodology. Independent technical input: Colibrii Labs takes no partisan position and serves no government."
            : "Cada cifra de esta sección lleva fuente nombrada, URL, fecha de acceso y bandera de confianza. Los documentos primarios (AIE, resoluciones de ARESEP, estados financieros del ICE, acciones de calificación, registros de la Asamblea) prevalecen sobre la prensa; los escenarios y el índice ECAI-CR son propuestas de Colibrii, marcadas como estimaciones con metodología abierta. Insumo técnico independiente: Colibrii Labs no toma posición partidista ni asesora a gobierno alguno."}
        </p>
      </div>
    </div>
  );
}
