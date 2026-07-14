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
import { MediaRow } from "./energia/EnergiaMedia";
import CRGridMap from "./energia/CRGridMap";
import { ReactorCutaway, EnergyBeam } from "./energia/EnergiaArt";
import { FACTS } from "../data/facts";

const GridHero = dynamic(() => import("./energia/GridHero"), { ssr: false, loading: () => null });
const Hero3D = dynamic(() => import("./energia/Hero3D"), { ssr: false, loading: () => null });

/* Charts & interactives are code-split so recharts (~350 KB) loads only
   when these below-the-fold components mount, not with the section. */
const chartFallback = () => <div className="skeleton" style={{ width: "100%", height: 220, borderRadius: 12 }} />;
const lazyPart = (loader) => dynamic(loader, { ssr: false, loading: chartFallback });
const DCDemandChart = lazyPart(() => import("./energia/EnergiaCharts").then(m => m.DCDemandChart));
const TariffChart = lazyPart(() => import("./energia/EnergiaCharts").then(m => m.TariffChart));
const MixDonut = lazyPart(() => import("./energia/EnergiaCharts").then(m => m.MixDonut));
const EcaiRadar = lazyPart(() => import("./energia/EnergiaCharts").then(m => m.EcaiRadar));
const SolarCurveChart = lazyPart(() => import("./energia/EnergiaCharts").then(m => m.SolarCurveChart));
const EcaiExplorer = lazyPart(() => import("./energia/EnergiaInteractive").then(m => m.EcaiExplorer));
const TariffComparator = lazyPart(() => import("./energia/EnergiaInteractive").then(m => m.TariffComparator));
const ScenarioExplorer = lazyPart(() => import("./energia/EnergiaInteractive").then(m => m.ScenarioExplorer));

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
        <span aria-hidden="true" style={{ flexShrink: 0, marginTop: 2, color: "var(--enTurq)" }}><Icon name="target" size={18} /></span>
        <div>
          <div style={{ ...mono, fontSize: 10.5, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--enTurq)", marginBottom: 4 }}>
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
      {/* Single quiet provenance row: sources left, brand mark right (in PNG exports too) */}
      <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <span style={{ ...mono, fontSize: 9.5, color: "var(--text3)", lineHeight: 1.8 }}>
          {sourceIds && <>
            {en ? "Sources: " : "Fuentes: "}
            {sourceIds.map((id, i) => (
              <a key={id} href={SRC[id].url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text3)" }}>
                {SRC[id].name}{i < sourceIds.length - 1 ? "  ·  " : ""}
              </a>
            ))}
          </>}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, opacity: 0.55 }}>
          <img src="/colibrii-icon-sm.png" alt="" width={12} height={12} loading="lazy" decoding="async" style={{ borderRadius: 3 }} />
          <span style={{ ...mono, fontSize: 9, color: "var(--text3)", letterSpacing: 0.5 }}>colibriilabs.ai</span>
        </span>
      </div>
    </div>
  );
}

/* ── Sticky act navigation (desktop) ── */
const ACT_IDS = [2, 3, 4, 5, 6, 7, 8];
function ActNav({ en }) {
  const [current, setCurrent] = useState(0);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 880px)");
    const sync = () => setShow(mq.matches);
    sync(); mq.addEventListener("change", sync);
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setCurrent(+e.target.dataset.act); });
    }, { rootMargin: "-30% 0px -60% 0px" });
    ACT_IDS.forEach(n => { const el = document.getElementById(`energia-act-${n}`); if (el) { el.dataset.act = n; obs.observe(el); } });
    return () => { obs.disconnect(); mq.removeEventListener("change", sync); };
  }, []);
  if (!show) return null;
  return (
    <nav aria-label={en ? "Section acts" : "Actos de la sección"} style={{ position: "sticky", top: 10, zIndex: 15, display: "flex", justifyContent: "center", gap: 6, marginBottom: -34 }}>
      <div style={{ display: "flex", gap: 4, padding: "5px 8px", borderRadius: 999, background: "color-mix(in srgb, var(--card) 80%, transparent)", backdropFilter: "blur(10px)", border: "1px solid var(--border)", boxShadow: "var(--shadow-md)" }}>
        {ACT_IDS.map(n => (
          <button key={n} onClick={() => document.getElementById(`energia-act-${n}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}
            aria-label={`${en ? "Act" : "Acto"} ${n}`} aria-current={current === n ? "true" : undefined}
            style={{ ...mono, width: 30, height: 30, borderRadius: "50%", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 800,
              background: current === n ? `linear-gradient(135deg, ${EN_ACCENT.turquoise}, ${EN_ACCENT.glow})` : "transparent",
              color: current === n ? "#06281f" : "var(--text3)", transition: "all .25s" }}>
            {n - 1}
          </button>
        ))}
      </div>
    </nav>
  );
}

/* ── Giant gradient pull-stat (emotional beat) ── */
function PullStat({ v, caption, srcId }) {
  return (
    <ScrollReveal>
      <div style={{ textAlign: "center", margin: "44px 0 40px" }}>
        <div style={{ ...display, fontSize: "clamp(56px, 11vw, 120px)", fontWeight: 800, lineHeight: 1, color: "var(--enGold)" }}>
          {v}
        </div>
        <div style={{ fontSize: 14.5, color: "var(--text2)", marginTop: 10, lineHeight: 1.6, maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>{caption}</div>
        {srcId && <div style={{ ...mono, fontSize: 10, color: "var(--text3)", marginTop: 6 }}>{SRC[srcId].name}</div>}
      </div>
    </ScrollReveal>
  );
}

/* ── Act header ── */
function Act({ n, en, label, title, desc }) {
  const num = n - 1; // hero is the unlabeled act 1 — displayed numbering starts here at 1
  return (
    <div id={`energia-act-${n}`} style={{ position: "relative", marginTop: "clamp(52px, 9vw, 88px)", marginBottom: 22, scrollMarginTop: 64 }}>
      {/* Ghost numeral — editorial rhythm marker */}
      <div aria-hidden="true" style={{ ...mono, position: "absolute", top: "clamp(-14px, -2vw, -26px)", left: -4, fontSize: "clamp(64px, 9vw, 104px)", fontWeight: 800, lineHeight: 1, color: "var(--text)", opacity: 0.055, userSelect: "none", pointerEvents: "none" }}>
        {String(num).padStart(2, "0")}
      </div>
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span aria-hidden="true" style={{ width: 26, height: 2, borderRadius: 1, background: "var(--enTurq)", display: "inline-block" }} />
        <span style={{ ...mono, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--enTurq)" }}>
          {en ? "Act" : "Acto"} {num} · {label}
        </span>
      </div>
      <h2 style={{ ...display, position: "relative", fontSize: "clamp(26px, 3.6vw, 38px)", fontWeight: 800, color: "var(--text)", lineHeight: 1.2, marginBottom: 10, maxWidth: 780 }}>{title}</h2>
      {desc && <p style={{ position: "relative", fontSize: 14, color: "var(--text2)", lineHeight: 1.7, maxWidth: 680 }}>{desc}</p>}
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
            <div style={{ ...mono, fontSize: 11.5, color: "var(--text2)", marginBottom: 2 }}>{r.date}</div>
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
  pro: { c: "var(--enTurq)", es: "A favor", en: "In favour" },
  con: { c: "var(--enViolet)", es: "En contra", en: "Against" },
  "lean-pro": { c: "var(--enGold)", es: "Inclinación a favor", en: "Leaning in favour" },
};
function VoteMath({ en }) {
  const fd = VOTE_MATH.firstDebate;
  const segs = [
    { n: fd.favor, c: "var(--enTurq)", tx: "var(--enOnAccent)", l: en ? "In favour" : "A favor" },
    { n: fd.against, c: "var(--enViolet)", tx: "var(--enOnAccent)", l: en ? "Against" : "En contra" },
    { n: fd.absent, c: "var(--border2)", tx: "var(--text)", l: en ? "Absent" : "Ausencias" },
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
          <div key={i} style={{ width: `${(s.n / VOTE_MATH.totalSeats) * 100}%`, background: s.c, display: "flex", alignItems: "center", justifyContent: "center", color: s.tx, fontSize: 13, fontWeight: 800, ...mono }}>{s.n}</div>
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
        <div style={{ position: "absolute", inset: 0, width: `${(effectivePro / VOTE_MATH.totalSeats) * 100}%`, background: "var(--enTurq)" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, left: `${(VOTE_MATH.needed / VOTE_MATH.totalSeats) * 100}%`, width: 0, borderLeft: `3px dashed ${EN_ACCENT.gold}` }} />
        <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--enOnAccent)", fontSize: 12.5, fontWeight: 800, ...mono }}>{effectivePro}</span>
      </div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 7, ...mono, fontSize: 11, color: "var(--enGold)", marginTop: 6 }}>
        <span aria-hidden="true" style={{ width: 0, height: 12, borderLeft: `3px dashed ${EN_ACCENT.gold}`, display: "inline-block" }} />
        {en ? "38 = qualified two-thirds majority required (of 57 seats)" : "38 = mayoría calificada de dos tercios requerida (de 57 escaños)"}
      </div>
      <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))", gap: 8 }}>
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
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 290px), 1fr))", gap: 12 }}>
      {STAKEHOLDERS.rows.map((p, i) => {
        const sc = STANCE[p.stance]?.c || "var(--enGold)";
        return (
          <ScrollReveal key={i} delay={(i % 3) * 60}>
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: 16, height: "100%", borderTop: `3px solid ${sc}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--text)" }}>{T(p.name, en)}</div>
                  <div style={{ fontSize: 11, color: "var(--text3)" }}>{T(p.role, en)}</div>
                </div>
                <div style={{ flexShrink: 0, alignSelf: "flex-start", display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, ...mono, color: sc, border: "1px solid var(--border2)", borderRadius: 6, padding: "2px 7px" }}>
                    {p.stance === "matiz" ? (en ? "NUANCED" : "MATIZ") : STANCE[p.stance][en ? "en" : "es"].toUpperCase()}
                  </span>
                  {p.synth && (
                    <span style={{ fontSize: 9, fontWeight: 700, ...mono, color: "var(--text3)", border: "1px dashed var(--border2)", borderRadius: 6, padding: "2px 7px" }}>
                      {en ? "SUMMARY" : "SÍNTESIS"}
                    </span>
                  )}
                </div>
              </div>
              <p style={{ fontSize: 12.5, color: "var(--text2)", lineHeight: 1.6, marginBottom: 8, maxWidth: 620 }}>{T(p.quote, en)}</p>
              <div style={{ ...mono, fontSize: 10.5, color: "var(--text3)" }}>{T(p.outlet, en)} · {p.date}</div>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}

/* ── Comparative lessons rail (Act 6) ── */
function ComparativeRail({ en }) {
  return (
    <div style={{ position: "relative" }}>
      {/* Right-edge fade — the editorial cue that the rail continues */}
      <div aria-hidden="true" style={{ position: "absolute", top: 0, bottom: 12, right: 0, width: 56, pointerEvents: "none", zIndex: 1, background: "linear-gradient(90deg, transparent, var(--bg))" }} />
      <div
        tabIndex={0}
        role="region"
        aria-label={en ? "Comparative cases — scroll horizontally" : "Casos comparados — desplace horizontalmente"}
        style={{ display: "flex", gap: 14, overflowX: "auto", scrollSnapType: "x mandatory", paddingBottom: 12, WebkitOverflowScrolling: "touch" }}
      >
        {COMPARATIVE.rows.map((c, i) => {
          const tc = c.tone === "good" ? "var(--enTurq)" : "var(--enGold)";
          return (
            <div key={i} style={{ scrollSnapAlign: "start", flex: "0 0 min(86%, 300px)", background: "var(--card)", border: "1px solid var(--border)", borderTop: `3px solid ${tc}`, borderRadius: "var(--radius-sm)", padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ ...display, fontSize: 16.5, fontWeight: 800, color: "var(--text)" }}>{T(c.country, en)}</span>
                <span style={{ ...mono, fontSize: 11, color: "var(--text3)" }}>{c.year}</span>
              </div>
              <p style={{ fontSize: 12.5, color: "var(--text2)", lineHeight: 1.6, flexGrow: 1 }}>{T(c.model, en)}</p>
              <div style={{ background: "var(--surface)", borderRadius: 8, padding: "10px 12px", borderLeft: `3px solid ${tc}` }}>
                <div style={{ ...mono, fontSize: 9.5, letterSpacing: 1.2, textTransform: "uppercase", color: tc, marginBottom: 3 }}>{en ? "Lesson for CR" : "Lección para CR"}</div>
                <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.55 }}>{T(c.lesson, en)}</div>
              </div>
            </div>
          );
        })}
      </div>
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
        <span aria-hidden="true" style={{ ...mono, flexShrink: 0, width: 30, height: 30, borderRadius: 8, background: `${EN_ACCENT.turquoise}1a`, color: "var(--enTurq)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800 }}>{a.n}</span>
        <span style={{ flexGrow: 1, minWidth: 0 }}>
          <span style={{ display: "block", fontSize: 13.5, fontWeight: 700, lineHeight: 1.4 }}>{T(a.title, en)}</span>
          {!open && (
            <span style={{ display: "block", fontSize: 11.5, color: "var(--text3)", lineHeight: 1.45, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {T(a.what, en)}
            </span>
          )}
        </span>
        <span aria-hidden="true" style={{ flexShrink: 0, color: "var(--text3)", transform: open ? "rotate(180deg)" : "none", transition: "transform .25s" }}><Icon name="chevronDown" size={16} /></span>
      </button>
      {open && (
        <div style={{ padding: "0 16px 16px 58px" }}>
          <div style={{ fontSize: 12.5, color: "var(--text2)", lineHeight: 1.65, marginBottom: 8 }}>{T(a.what, en)}</div>
          <div style={{ background: "var(--surface)", borderRadius: 8, padding: "9px 12px", fontSize: 12, color: "var(--text2)", lineHeight: 1.6, borderLeft: `3px solid ${EN_ACCENT.gold}` }}>
            <strong style={{ color: "var(--text)" }}>{en ? "Why: " : "Por qué: "}</strong>{T(a.why, en)}
          </div>
          {stage && <div style={{ ...mono, fontSize: 10, color: "var(--enGold)", marginTop: 8 }}>{T(stage.label, en)}</div>}
        </div>
      )}
    </div>
  );
}

/* ── End-of-scroll conversion block ── */
function CTABlock({ en }) {
  const [copied, setCopied] = useState(null);
  const url = "https://colibriilabs.ai/app#energia";
  const cite = en
    ? "Colibrii Labs (2026). Energy: Electricity, Energy Competitiveness & AI — independent technical input. colibriilabs.ai/app#energia. Primary sources: asamblea.go.cr, aresep.go.cr, grupoice.com, iea.org."
    : "Colibrii Labs (2026). Energía: Electricidad, Competitividad Energética e IA — insumo técnico independiente. colibriilabs.ai/app#energia. Fuentes primarias: asamblea.go.cr, aresep.go.cr, grupoice.com, iea.org.";
  const copy = async (what, text) => {
    try { await navigator.clipboard.writeText(text); setCopied(what); setTimeout(() => setCopied(null), 2200); } catch {}
  };
  const btn = {
    minHeight: 46, padding: "10px 20px", borderRadius: 12, cursor: "pointer", fontSize: 13.5, fontWeight: 700,
    display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", transition: "transform .2s, box-shadow .2s",
  };
  return (
    <section id="energia-cta" aria-label={en ? "Use this analysis" : "Use este análisis"}
      style={{ marginTop: 36, borderRadius: "var(--radius)", overflow: "hidden", position: "relative",
        background: `linear-gradient(150deg, ${EN_ACCENT.navy} 0%, ${EN_ACCENT.navy2} 60%, #0a1f33 100%)`, border: "1px solid rgba(0,181,168,0.3)", padding: "clamp(26px, 5vw, 44px)" }}>
      <div aria-hidden="true" style={{ position: "absolute", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,181,168,0.22), transparent 70%)", top: -180, right: -120, filter: "blur(50px)" }} />
      <div style={{ position: "relative" }}>
        <div style={{ ...mono, fontSize: 11, letterSpacing: 2.5, color: EN_ACCENT.turquoise, marginBottom: 10 }}>
          {en ? "INDEPENDENT TECHNICAL INPUT · FREE TO CITE" : "INSUMO TÉCNICO INDEPENDIENTE · LIBRE DE CITAR"}
        </div>
        <h2 style={{ ...display, fontSize: "clamp(22px, 3.6vw, 32px)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.25, maxWidth: 640, marginBottom: 8 }}>
          {en ? "If this analysis was useful, put it to work" : "Si este análisis le sirvió, póngalo a trabajar"}
        </h2>
        <p style={{ fontSize: 13.5, color: "rgba(241,245,249,0.75)", lineHeight: 1.65, maxWidth: 620, marginBottom: 20 }}>
          {en
            ? "Share it with whoever decides, debates or invests. Every chart exports with its sources — and the full provenance table is public. The floor regains its agenda on August 1: until a renegotiated text exists, the 8-vote gap stands while the global investment wave keeps moving."
            : "Compártalo con quien decide, debate o invierte. Cada gráfico se exporta con sus fuentes — y la tabla de procedencia completa es pública. El Plenario recupera la agenda el 1 de agosto: mientras no exista un texto renegociado, la brecha de 8 votos sigue intacta y la ola global de inversión sigue avanzando."}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <button onClick={() => copy("link", url)} style={{ ...btn, border: "none", background: `linear-gradient(135deg, ${EN_ACCENT.turquoise}, ${EN_ACCENT.glow})`, color: "#06281f", boxShadow: "0 4px 24px rgba(0,181,168,0.35)" }}>
            {copied === "link" ? (en ? "Link copied ✓" : "Enlace copiado ✓") : (en ? "Copy section link" : "Copiar enlace de la sección")}
          </button>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url + "?utm_source=linkedin&utm_medium=social&utm_campaign=energia")}`} target="_blank" rel="noopener noreferrer"
            style={{ ...btn, background: "rgba(241,245,249,0.08)", border: "1px solid rgba(241,245,249,0.25)", color: "#f1f5f9" }}>
            {en ? "Share on LinkedIn" : "Compartir en LinkedIn"} ↗
          </a>
          <button onClick={() => copy("cite", cite)} style={{ ...btn, background: "transparent", border: "1px solid rgba(0,181,168,0.45)", color: EN_ACCENT.turquoise }}>
            {copied === "cite" ? (en ? "Citation copied ✓" : "Cita copiada ✓") : (en ? "Copy citation" : "Copiar cita")}
          </button>
        </div>
        <div style={{ ...mono, fontSize: 10.5, color: "rgba(241,245,249,0.45)", marginTop: 18 }}>
          {en ? "Questions or data corrections: " : "Consultas o correcciones de datos: "}
          <a href={`mailto:${FACTS.email}`} style={{ color: "rgba(241,245,249,0.7)" }}>{FACTS.email}</a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ MAIN VIEW ═══════════════ */
export function EnergiaDeep({ en = false }) {
  const heroStat = HERO.stat;
  /* 3D hero everywhere it can run (Hero3D is aspect-aware and sizes itself
     in CSS px); 2D canvas fallback for reduced-motion or missing WebGL */
  const [use3d, setUse3d] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {}
    /* Defer the three.js chunk until the browser is idle so the editorial
       content paints first; GridHero (2D canvas) covers the gap. */
    let idleId = null, timeoutId = null;
    if (webgl && !still) {
      const start = () => setUse3d(true);
      if ("requestIdleCallback" in window) idleId = window.requestIdleCallback(start, { timeout: 2500 });
      else timeoutId = setTimeout(start, 1200);
    }
    const onFirstScroll = () => { if (window.scrollY > 90) { setScrolled(true); window.removeEventListener("scroll", onFirstScroll); } };
    window.addEventListener("scroll", onFirstScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onFirstScroll);
      if (idleId !== null && "cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      if (timeoutId !== null) clearTimeout(timeoutId);
    };
  }, []);
  return (
    <div className="energia-scope" style={{ maxWidth: 1060, margin: "0 auto" }}>
      <ScrollProgress />
      <ActNav en={en} />

      {/* ════ ACTO 1 — COLD OPEN ════ */}
      <section aria-label={en ? "Opening" : "Apertura"} style={{ position: "relative", borderRadius: "var(--radius)", overflow: "hidden", background: `linear-gradient(160deg, ${EN_ACCENT.navy} 0%, ${EN_ACCENT.navy2} 55%, #0a1830 100%)`, border: "1px solid rgba(0,181,168,0.25)", marginTop: 14 }}>
        {use3d ? <Hero3D /> : <GridHero />}
        {/* Legibility scrim — solid navy under the text column, fading to reveal the 3D on the right (near-solid on mobile, see globals.css) */}
        <div aria-hidden="true" className="energia-hero-scrim" style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "linear-gradient(0deg, rgba(6,15,34,0.7) 0%, rgba(6,15,34,0) 40%)" }} />
        <div className="energia-hero-content" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ ...mono, fontSize: 11, letterSpacing: 2.5, color: EN_ACCENT.turquoise, marginBottom: 14 }}>{T(HERO.eyebrow, en)}</div>
          <h1 style={{ ...display, fontSize: "clamp(28px, 5vw, 50px)", fontWeight: 800, lineHeight: 1.14, maxWidth: 760, marginBottom: 22,
            background: "linear-gradient(115deg, #ffffff 30%, #9beef0 68%, #F2B135 105%)",
            WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>
            {T(HERO.title, en)}
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 14, marginBottom: 10 }}>
            <span style={{ ...mono, fontSize: "clamp(44px, 8vw, 84px)", fontWeight: 800, color: EN_ACCENT.gold, lineHeight: 1, filter: "drop-shadow(0 0 24px rgba(242,177,53,0.45))" }}>
              <AN v={heroStat.v} p={0} />
            </span>
            <span style={{ ...mono, fontSize: 20, color: EN_ACCENT.gold }}>{heroStat.unit} · 2030</span>
            <span style={{ ...mono, fontSize: 13, color: "rgba(241,245,249,0.55)" }}>{heroStat.from} {heroStat.unit} · 2024</span>
          </div>
          <p style={{ fontSize: 14, color: "rgba(241,245,249,0.85)", lineHeight: 1.65, maxWidth: 640, marginBottom: 8 }}>{T(heroStat.label, en)}</p>
          <a href={SRC[heroStat.s].url} target="_blank" rel="noopener noreferrer" style={{ ...mono, display: "inline-block", fontSize: 10.5, color: "rgba(241,245,249,0.65)", textDecoration: "none", border: "1px solid rgba(241,245,249,0.25)", borderRadius: 6, padding: "2px 8px", marginBottom: 22 }}>
            {SRC[heroStat.s].name} ↗
          </a>
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
            {T(HERO.disclaimer, en)}{use3d ? (en ? " · Illustrative 3D visual (geography: Natural Earth)" : " · Visual 3D ilustrativo (geografía: Natural Earth)") : ""}
          </div>
          {/* Scroll cue */}
          <div aria-hidden="true" style={{ display: "flex", justifyContent: "center", marginTop: 26, opacity: scrolled ? 0 : 1, transition: "opacity .6s ease" }}>
            <div className="energia-scroll-cue" style={{ width: 26, height: 42, borderRadius: 14, border: "1.5px solid rgba(0,181,168,0.5)", display: "flex", justifyContent: "center", paddingTop: 7 }}>
              <div style={{ width: 4, height: 9, borderRadius: 2, background: EN_ACCENT.turquoise, animation: "energiaCue 1.8s ease-in-out infinite" }} />
            </div>
          </div>
          <style>{`
            @keyframes energiaCue { 0%,100% { transform: translateY(0); opacity: 1; } 55% { transform: translateY(12px); opacity: 0.25; } }
            @media (prefers-reduced-motion: reduce) { .energia-scroll-cue div { animation: none !important; } }
          `}</style>
        </div>
      </section>

      {/* ════ ACTO 2 — LA APUESTA GLOBAL ════ */}
      <Act n={2} en={en} label={en ? "The global stake" : "La apuesta global"}
        title={en ? "AI runs on electricity — and is buying it years in advance" : "La IA corre sobre electricidad — y la está comprando con años de anticipación"}
        desc={en ? "Data-centre demand will more than double by 2030. The world's largest companies are responding with the biggest private infrastructure bet in history — including restarting nuclear plants." : "La demanda de los centros de datos se duplicará con creces al 2030. Las empresas más grandes del mundo responden con la mayor apuesta privada de infraestructura de la historia — incluida la reapertura de plantas nucleares."} />

      <ScrollReveal>
        <MediaRow en={en} ids={["datacenter", "tmi"]} height={260} />
      </ScrollReveal>

      <ScrollReveal>
        <ShareCard en={en} filename="colibrii-energia-demanda-datacenters" sourceIds={["iea2025"]}
          title={en ? "Data-centre electricity demand, 2020-2035 (TWh)" : "Demanda eléctrica de centros de datos, 2020-2035 (TWh)"}>
          <DCDemandChart en={en} />
        </ShareCard>
      </ScrollReveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))", gap: 12, marginTop: 14 }}>
        {CAPEX.map((c, i) => (
          <ScrollReveal key={i} delay={i * 70}>
            <div className="card" style={{ padding: 18, height: "100%" }}>
              <div style={{ ...mono, fontSize: 26, fontWeight: 800, color: "var(--text)" }}>{c.v}</div>
              <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.55, marginTop: 6 }}>{T(c.unit, en)}</div>
              <div style={{ ...mono, fontSize: 10, color: "var(--text3)", marginTop: 8 }}>{SRC[c.s].name}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <PullStat
        v="$6.7T"
        caption={en ? "of global data-centre buildout by 2030 — the largest private infrastructure bet in history (T = trillion, 10¹²)" : "de construcción global de centros de datos al 2030 — la mayor apuesta privada de infraestructura de la historia (T = 6,7 billones, 10¹²)"}
        srcId="mckinsey" />

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
                <span style={{ ...mono, fontSize: 13, fontWeight: 700, color: "var(--enGold)" }}>{d.mw.toLocaleString(en ? "en-US" : "es-CR")} MW</span>
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
        <div style={{ marginTop: 14 }}><ReactorCutaway en={en} /></div>
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

      <EnergyBeam />

      {/* ════ ACTO 3 — LA REGIÓN ════ */}
      <Act n={3} en={en} label={en ? "The region" : "La región"}
        title={en ? "Latin America: clean grids, expensive megawatts" : "América Latina: redes limpias, megavatios caros"}
        desc={en ? "Costa Rica competes for the same investment as Uruguay, Panama and Mexico. Price and spare capacity — not cleanliness — are where the race is decided." : "Costa Rica compite por la misma inversión que Uruguay, Panamá y México. El precio y el margen de capacidad — no la limpieza — son donde se decide la carrera."} />

      <ScrollReveal>
        <ShareCard en={en} filename="colibrii-energia-tarifas-latam" sourceIds={["seg", "eia", "aresep", "cicr", "enerdata"]}
          title={en ? "Industrial electricity tariffs (US$/MWh, 2024-2025)" : "Tarifas eléctricas industriales (US$/MWh, 2024-2025)"}>
          <p style={{ fontSize: 11.5, color: "var(--text3)", lineHeight: 1.55, marginBottom: 8 }}>{T(TARIFFS.caveat, en)}</p>
          <TariffChart en={en} />
          <p style={{ fontSize: 11.5, color: "var(--text3)", lineHeight: 1.55, marginTop: 8 }}>{T(TARIFFS.crNote, en)}</p>
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
                <span style={{ ...mono, fontSize: 12.5, fontWeight: 700, color: r.highlight ? "var(--enTurq)" : "var(--text2)", width: 64, textAlign: "right" }}>{r.pct}% <span style={{ fontSize: 9.5, color: "var(--text3)" }}>'{String(r.year).slice(2)}</span></span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6, marginTop: 12 }}>{T(RENEW_SHARE.insight, en)}</p>
        </Card>
      </ScrollReveal>

      <PullStat
        v={en ? "0.71" : "0,71"}
        caption={en ? "Costa Rica's ECAI-CR score — Colibrii's proprietary Energy Competitiveness for AI Investment index. 2nd of 4 economies compared (Uruguay 0.78 · Panama 0.65 · Mexico 0.62). Adjust the weights yourself in Act 7." : "puntaje ECAI-CR de Costa Rica — índice propio de Colibrii de Competitividad Energética para Inversión en IA. 2º de 4 economías comparadas (Uruguay 0,78 · Panamá 0,65 · México 0,62). Ajuste los pesos usted mismo en el Acto 7."}
        srcId="colibrii" />

      {/* ════ ACTO 4 — COSTA RICA HOY ════ */}
      <Act n={4} en={en} label={en ? "Costa Rica today" : "Costa Rica hoy"}
        title={en ? "98.6% renewable, a stronger ICE — and almost no spare megawatts" : "98,6% renovable, un ICE más sólido — y casi ningún megavatio de sobra"}
        desc={en ? "The 2025 numbers contradict two popular narratives at once: ICE is not broke, and the grid is not ready for an AI-scale demand wave." : "Los números de 2025 contradicen dos narrativas populares a la vez: el ICE no está quebrado, y la red no está lista para una ola de demanda a escala IA."} />

      <ScrollReveal>
        <CRGridMap en={en} />
      </ScrollReveal>

      <ScrollReveal>
        <div style={{ marginTop: 14 }}><MediaRow en={en} ids={["cachi", "reventazon"]} height={220} /></div>
      </ScrollReveal>
      <ScrollReveal>
        <p style={{ fontSize: 13.5, color: "var(--text2)", lineHeight: 1.7, marginTop: 12, maxWidth: 680, fontStyle: "italic" }}>
          {en
            ? "These dams built Costa Rica's clean grid. But hydro is 68% of capacity in a country that must add +2,495 MW by 2040 — and the rivers are nearly spoken for. That is the squeeze."
            : "Estas represas construyeron la red limpia de Costa Rica. Pero la hidro es el 68% de la capacidad en un país que debe sumar +2.495 MW al 2040 — y los ríos están casi comprometidos. Ese es el apretón."}
        </p>
      </ScrollReveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 290px), 1fr))", gap: 14, marginTop: 14 }}>
        <ScrollReveal>
          <ShareCard en={en} filename="colibrii-energia-matriz-cr" sourceIds={["peg", "ice"]}
            title={en ? "Electric matrix: installed capacity & renewable share" : "Matriz eléctrica: capacidad instalada y participación renovable"}>
            <MixDonut en={en} />
          </ShareCard>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <Card style={{ height: "100%" }}>
            <h3 style={{ fontSize: 15.5, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{en ? "ICE financial dashboard" : "Dashboard financiero del ICE"}</h3>
            <p style={{ fontSize: 12, color: "var(--text3)", marginBottom: 12, lineHeight: 1.5 }}>
              {en ? "One-line read: solvent and improving — but not enough muscle to double the grid alone." : "Lectura en una línea: solvente y mejorando — pero sin músculo para duplicar la red por sí solo."}
            </p>
            <div style={{ display: "grid", gap: 10 }}>
              {ICE_FIN.stats.map((s, i) => (
                <div key={s.id} style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                  <span style={{ ...mono, fontSize: 19, fontWeight: 800, color: s.v < 0 ? "var(--enTurq)" : "var(--text)", minWidth: 86, textAlign: "right" }}>
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
                  <span style={{ ...mono, fontSize: 13, fontWeight: 800, color: "var(--enGold)" }}>{r.agency} {r.rating}</span>
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
            <span style={{ ...mono, fontSize: 26, fontWeight: 800, color: "var(--enTurq)" }}>{en ? "−4.93% → −16.44%" : "−4,93% → −16,44%"}</span>
            <span style={{ fontSize: 12.5, color: "var(--text2)" }}>ICE −14,92% · CNFL −14,55% · {en ? "generation cost factor" : "factor CVG"} −7,77%</span>
          </div>
          <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.65, marginTop: 8 }}>{T(ARESEP_2026.headline, en)}</p>
          <div style={{ ...mono, fontSize: 10, color: "var(--text3)", marginTop: 8 }}>{SRC.aresep.name}</div>
        </Card>
      </ScrollReveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))", gap: 12, marginTop: 14 }}>
        {PEG_TARGETS.rows.map((r, i) => (
          <ScrollReveal key={i} delay={i * 70}>
            <div className="card" style={{ padding: 18, height: "100%" }}>
              <div style={{ ...mono, fontSize: 24, fontWeight: 800, color: "var(--text)" }}>
                <AN v={r.v} p={0} /><span style={{ fontSize: 13, color: "var(--enTurq)", marginLeft: 5 }}>{typeof r.unit === "string" ? r.unit : T(r.unit, en)}</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.55, marginTop: 6 }}>{T(r.label, en)}</div>
              <div style={{ ...mono, fontSize: 10, color: "var(--text3)", marginTop: 8 }}>{SRC[r.s || PEG_TARGETS.s].name}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <CRAnchor en={en}>{T(ICE_FIN.insight, en)}</CRAnchor>

      <EnergyBeam />

      {/* ════ ACTO 5 — EXPEDIENTE 23.414 ════ */}
      <Act n={5} en={en} label="Expediente 23.414"
        title={en ? "The reform that passed one debate and stalled the next day" : "La reforma que ganó un debate y quedó varada al día siguiente"}
        desc={en ? "The most consequential electricity reform in 30 years passed first debate 27-24 on 26 May 2026 — and was withdrawn from the agenda by decree the following afternoon. What the bill does, who stands where, and the arithmetic that decides everything." : "La reforma eléctrica más importante en 30 años se aprobó en primer debate 27-24 el 26 de mayo de 2026 — y fue retirada de la agenda por decreto la tarde siguiente. Qué hace el proyecto, quién está dónde, y la aritmética que lo decide todo."} />

      <PullStat
        v="8"
        caption={en ? "opposition votes short of the 38 the Constitution requires for second debate — the whole reform now hangs on this number" : "votos opositores le faltan al oficialismo para los 38 que exige la Constitución en segundo debate — toda la reforma pende de este número"}
        srcId="asamblea" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: 12 }}>
        {BILL_CORE.rows.map((b, i) => (
          <ScrollReveal key={i} delay={i * 60}>
            <div className="card" style={{ padding: 16, height: "100%" }}>
              <div style={{ fontSize: 13.5, fontWeight: 800, color: "var(--text)", marginBottom: 6 }}>{T(b.t, en)}</div>
              <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6 }}>{T(b.d, en)}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 310px), 1fr))", gap: 14, marginTop: 14 }}>
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
      <div style={{ ...mono, fontSize: 10.5, color: "var(--text3)", marginTop: -10, marginBottom: 10 }}>{T(COMPARATIVE.asOf, en)}</div>
      <p style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.6, marginTop: 8 }}>{T(COMPARATIVE.cepalNote, en)} <Lnk href={SRC.cepal2002.url}>{SRC.cepal2002.name}</Lnk></p>
      <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7, marginTop: 16, maxWidth: 680, fontStyle: "italic" }}>
        {en
          ? "Six countries already untied this knot — two templates work for Costa Rica. What it would take to close the 8-vote gap lives in the numbers that follow."
          : "Seis países ya desataron este nudo — dos plantillas funcionan para Costa Rica. Lo que haría falta para cerrar la brecha de 8 votos vive en los números que siguen."}
      </p>

      <EnergyBeam />

      {/* ════ ACTO 7 — LOS NÚMEROS QUE IMPORTAN ════ */}
      <Act n={7} en={en} label={en ? "The numbers that matter" : "Los números que importan"}
        title={en ? "ECAI-CR: measure the race, then run your own scenarios" : "ECAI-CR: mida la carrera, y luego corra sus propios escenarios"}
        desc={en ? "Colibrii's Energy Competitiveness for AI Investment index, an adjustable-weight tool — plus a demand explorer to 2050, a tariff cost comparator, and the solar curve that changes everything." : "El índice de Competitividad Energética para Inversión en IA de Colibrii, con pesos ajustables — más un explorador de demanda al 2050, un comparador de costos tarifarios y la curva solar que lo cambia todo."} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 310px), 1fr))", gap: 14 }}>
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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 310px), 1fr))", gap: 14, marginTop: 14 }}>
        <ScrollReveal>
          <ShareCard en={en} filename="colibrii-comparador-tarifario" sourceIds={["seg", "eia", "cicr"]}
            title={en ? "What would your megawatts cost?" : "¿Cuánto costarían sus megavatios?"}>
            <TariffComparator en={en} />
          </ShareCard>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <ShareCard en={en} filename="colibrii-curva-solar" sourceIds={["owid"]}
            title={en ? "Solar learning curve (Swanson's Law, projection to 2030)" : "Curva de aprendizaje solar (Ley de Swanson, proyección a 2030)"}>
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
          <div style={{ ...mono, fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--enGold)", margin: "14px 0 10px" }}>{T(stage.label, en)}</div>
          <div style={{ display: "grid", gap: 8 }}>
            {AMENDMENTS.rows.filter(a => a.stage === stage.id).map(a => <AmendmentCard key={a.n} a={a} en={en} />)}
          </div>
        </div>
      ))}

      {/* Videos — link-out cards (D-005: no third-party iframes) */}
      <ScrollReveal>
        <div style={{ marginTop: 24 }}>
          <h3 style={{ fontSize: 15.5, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>{en ? "Watch the sources" : "Vea las fuentes"}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))", gap: 10 }}>
            {VIDEOS.map((v, i) => (
              <a key={i} href={v.url} target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none", background: `linear-gradient(150deg, ${EN_ACCENT.navy}, ${EN_ACCENT.navy2})`, borderRadius: "var(--radius-sm)", padding: 16, border: `1px solid ${EN_ACCENT.turquoise}40` }}>
                <span aria-hidden="true" style={{ display: "inline-flex", width: 34, height: 34, borderRadius: "50%", background: `${EN_ACCENT.turquoise}2e`, color: EN_ACCENT.turquoise, alignItems: "center", justifyContent: "center", marginBottom: 10 }}><Icon name="video" size={16} /></span>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9", lineHeight: 1.45, marginBottom: 4 }}>{T(v.title, en)}</div>
                <div style={{ ...mono, fontSize: 10.5, color: "rgba(241,245,249,0.7)" }}>{en ? "Watch on" : "Ver en"} {v.outlet} ↗</div>
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
            ? "Every figure in this section carries a named source, URL, access date and confidence flag. Primary documents (IEA, ARESEP resolutions, ICE financial statements, rating actions, Assembly records) prevail over press reports; scenarios and the ECAI-CR composite are Colibrii proposals, labeled as estimates with open methodology. Where a document-level permalink requires archive search, links point to the issuer's portal. Independent technical input: Colibrii Labs takes no partisan position and serves no government."
            : "Cada cifra de esta sección lleva fuente nombrada, URL, fecha de acceso y bandera de confianza. Los documentos primarios (AIE, resoluciones de ARESEP, estados financieros del ICE, acciones de calificación, registros de la Asamblea) prevalecen sobre la prensa; los escenarios y el índice ECAI-CR son propuestas de Colibrii, marcadas como estimaciones con metodología abierta. Cuando el permalink exacto requiere búsqueda en archivo, los enlaces dirigen al portal del emisor. Insumo técnico independiente: Colibrii Labs no toma posición partidista ni asesora a gobierno alguno."}
        </p>
      </div>

      <CTABlock en={en} />
    </div>
  );
}
