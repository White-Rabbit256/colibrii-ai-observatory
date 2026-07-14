"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Energía · EnergiaFlowNav (Phase 3, flows slice)
   ───────────────────────────────────────────────────────────────
   Two mounts from one file:
     - ActJumpRow  — sticky act pill-rail for <880px, where ActNav
       never renders (exactly one act nav at any width). Mounted
       right after the hero, before Act 2.
     - ExploreRail — terminal "keep exploring" retention rail with
       four whole-card jump links (3 tools + the vote-math chart),
       sessionStorage-backed visited chips, and the first in-flow
       mobile share affordance (FloatingShare hides <768px).

   Contract carried from Phases 1-2:
     - insumo técnico independiente — no advocacy verbs (allowed:
       ajuste, corra, compare, comparta, lea); usted register
     - bilingual es/en via the section's T() pattern; es-CR comma
       decimals ("CR 0,71")
     - WCAG AA both themes — text wears CSS vars only; per-act
       color arrives via the data-act cascade in globals.css
     - prefers-reduced-motion path for every animation
     - mobile-first; 44px targets; no horizontal overflow at 360px
     - sessionStorage namespace colibrii.energia.v2.* with
       try/catch guards (Safari private mode); reads in useEffect
     - no new deps: react + framer-motion only (eager bundle)
     - all figures restate on-page sourced data (ECAI 0,71 ·
       escenarios índice 2024=100 · 8 mercados tarifarios ·
       57 escaños / faltan 8) — no new numbers introduced
   ═══════════════════════════════════════════════════════════════ */

const MONO = "'IBM Plex Mono',monospace";
const DISPLAY = "var(--font-display,'Playfair Display',serif)";
const SS_PREFIX = "colibrii.energia.v2.";
const T = (v, en) => (en ? v.en : v.es);

/* sessionStorage guards — Safari private mode throws on setItem */
const ssGet = (k) => {
  try { return typeof window !== "undefined" ? window.sessionStorage.getItem(SS_PREFIX + k) : null; }
  catch { return null; }
};
const ssSet = (k, v) => {
  try { if (typeof window !== "undefined") window.sessionStorage.setItem(SS_PREFIX + k, v); }
  catch { /* private mode / quota — visited chips simply don't persist */ }
};

/* Jump + focus handoff — PeakCTA focusDest pattern: scroll, then move
   focus to the destination (tabindex -1) once the scroll settles. */
function jumpTo(id, reduced) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  window.setTimeout(() => {
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
    try { el.focus({ preventScroll: true }); } catch { /* focus best-effort */ }
  }, reduced ? 0 : 700);
}

/* ═══════════════ 1 · ActJumpRow (mobile act nav, <880px) ═══════════════ */

/* Act labels — verbatim from the <Act> headers in EnergiaDeep.jsx.
   Act 5's label is the expediente number in both languages (as shipped). */
const ACTS = [
  { n: 2, label: { es: "La apuesta global", en: "The global stake" } },
  { n: 3, label: { es: "La región", en: "The region" } },
  { n: 4, label: { es: "Costa Rica hoy", en: "Costa Rica today" } },
  { n: 5, label: { es: "Expediente 23.414", en: "Expediente 23.414" } },
  { n: 6, label: { es: "Lecciones comparadas", en: "Comparative lessons" } },
  { n: 7, label: { es: "Los números que importan", en: "The numbers that matter" } },
  { n: 8, label: { es: "Recomendaciones", en: "Recommendations" } },
];

export function ActJumpRow({ en = false }) {
  const [show, setShow] = useState(false); // SSR default hidden — ActNav owns ≥880px
  const [current, setCurrent] = useState(0);
  const railRef = useRef(null);
  const [overflowing, setOverflowing] = useState(false);
  const reduced = !!useReducedMotion();

  /* Width gate — inverse of ActNav's matchMedia("(min-width: 880px)") so
     exactly one act nav renders at any width. */
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(max-width: 879px)");
    const sync = () => setShow(mq.matches);
    sync();
    if (mq.addEventListener) mq.addEventListener("change", sync);
    else if (mq.addListener) mq.addListener(sync);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", sync);
      else if (mq.removeListener) mq.removeListener(sync);
    };
  }, []);

  /* Current-act tracking — ONE IntersectionObserver over the Act roots,
     same rootMargin band as ActNav. Attached only while shown. */
  useEffect(() => {
    if (!show || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setCurrent(+e.target.dataset.act || 0);
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    ACTS.forEach(({ n }) => {
      const el = document.getElementById(`energia-act-${n}`);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [show]);

  /* Keep the active pill in view inside the rail (rail-local scrollLeft
     only — never scrolls the page). Also re-measure overflow so the
     right-edge fade cue only shows when the rail actually overflows. */
  useEffect(() => {
    const rail = railRef.current;
    if (!show || !rail) return;
    const measure = () => setOverflowing(rail.scrollWidth > rail.clientWidth + 4);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [show]);
  useEffect(() => {
    const rail = railRef.current;
    if (!show || !rail || !current) return;
    const btn = rail.querySelector(`button[data-act="${current}"]`);
    if (!btn) return;
    const left = Math.max(0, btn.offsetLeft - rail.clientWidth / 2 + btn.offsetWidth / 2);
    try { rail.scrollTo({ left, behavior: reduced ? "auto" : "smooth" }); }
    catch { rail.scrollLeft = left; }
  }, [current, show, reduced]);

  const onJump = useCallback((n) => (e) => {
    e.preventDefault();
    jumpTo(`energia-act-${n}`, reduced);
  }, [reduced]);

  if (!show) return null;

  return (
    /* Sticky under the portal mobile header (sticky top:0, z100, ≈45px) and
       under MobileReadingBar (fixed, z21). No fixed positioning — the portal
       bottom nav owns the bottom edge, the reading bar owns the top edge. */
    <div
      className="efn-jumprow"
      style={{
        position: "sticky",
        top: 52,
        zIndex: 14,
        borderRadius: 999,
        background: "color-mix(in srgb, var(--card) 85%, transparent)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid var(--border)",
        padding: "4px 8px",
        margin: "14px 0 4px",
      }}
    >
      <nav
        ref={railRef}
        aria-label={en ? "Section acts" : "Actos de la sección"}
        className="efn-jumprail"
        style={{
          display: "flex",
          gap: 6,
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          borderRadius: 999,
          /* Right-edge fade = scroll cue; only while the rail overflows so the
             last pill is never dimmed once everything fits (≥ ~420px wide). */
          maskImage: overflowing ? "linear-gradient(90deg,#000 86%,transparent)" : "none",
          WebkitMaskImage: overflowing ? "linear-gradient(90deg,#000 86%,transparent)" : "none",
        }}
      >
        {ACTS.map(({ n, label }) => {
          const active = current === n;
          /* data-act={n} — the globals.css cascade themes each pill in its own
             act accent, both themes WCAG AA. No inline --act-accent (inline
             custom props would defeat the light-theme override). */
          return (
            <button
              key={n}
              type="button"
              data-act={n}
              className="efn-pill"
              onClick={onJump(n)}
              aria-label={`${en ? "Act" : "Acto"} ${n} — ${T(label, en)}`}
              aria-current={active ? "true" : undefined}
              style={{
                fontFamily: MONO,
                flexShrink: 0,
                minWidth: 44,
                minHeight: 44,
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: active ? "none" : "1px solid color-mix(in srgb, var(--act-accent) 27%, transparent)",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 800,
                background: active ? "linear-gradient(135deg, var(--act-accent), var(--act-accent-2))" : "transparent",
                color: active ? "var(--enOnAccent)" : "var(--act-accent)",
                boxShadow: active ? "0 0 12px color-mix(in srgb, var(--act-accent) 33%, transparent)" : "none",
                transition: "all .25s",
              }}
            >
              {n}
            </button>
          );
        })}
      </nav>
      <style>{`
        .efn-jumprail::-webkit-scrollbar { display: none; }
        .efn-pill:focus-visible { outline: 2px solid var(--enGlow); outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) {
          .efn-pill { transition: none !important; }
        }
        @media (forced-colors: active) {
          .efn-jumprow { background: Canvas !important; border: 1px solid CanvasText !important; }
          .efn-pill { border: 1px solid ButtonText !important; color: ButtonText !important; }
          .efn-pill[aria-current="true"] { background: Highlight !important; color: HighlightText !important; }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════ 2 · ExploreRail (exit retention, terminal) ═══════════════ */

/* Four whole-card jump links. Every sub-line restates on-page sourced data
   (ECAI-CR composite, scenario index base, tariff market count, vote math) —
   es-CR comma decimals in Spanish. Targets are ids the integrator anchors on
   the corresponding ShareCards; all sit ABOVE this rail, hence "↑". */
const RAIL_CARDS = [
  {
    act: 7, id: "energia-tool-ecai",
    kind: { es: "HERRAMIENTA", en: "TOOL" },
    title: { es: "Ajuste los pesos del ECAI-CR", en: "Adjust the ECAI-CR weights" },
    sub: { es: "5 componentes · CR 0,71", en: "5 components · CR 0.71" },
  },
  {
    act: 7, id: "energia-tool-escenarios",
    kind: { es: "HERRAMIENTA", en: "TOOL" },
    title: { es: "Corra los escenarios al 2050", en: "Run the 2050 scenarios" },
    sub: { es: "índice 2024 = 100", en: "index 2024 = 100" },
  },
  {
    act: 7, id: "energia-tool-tarifas",
    kind: { es: "HERRAMIENTA", en: "TOOL" },
    title: { es: "Compare el costo de sus megavatios", en: "Compare your megawatt costs" },
    sub: { es: "US$/MWh · 8 mercados", en: "US$/MWh · 8 markets" },
  },
  {
    act: 5, id: "energia-votemath",
    kind: { es: "GRÁFICO", en: "CHART" },
    title: { es: "La aritmética de los 38, escaño por escaño", en: "The 38-vote arithmetic, seat by seat" },
    sub: { es: "57 escaños · faltan 8", en: "57 seats · 8 short" },
  },
];

const RAIL_COPY = {
  navLabel: { es: "Continuar explorando: herramientas de la sección", en: "Keep exploring: section tools" },
  eyebrow: { es: "SIGA EXPLORANDO", en: "KEEP EXPLORING" },
  title: { es: "Tres herramientas siguen abiertas", en: "Three tools stay open" },
  visited: { es: "VISTO ✓", en: "SEEN ✓" },
  visitedSr: { es: "(visitado)", en: "(visited)" },
  sharePrompt: { es: "¿Le sirvió? Compártalo con quien decide.", en: "Useful? Share it with whoever decides." },
  shareBtn: { es: "Compartir esta sección", en: "Share this section" },
  shareDone: { es: "Copiado ✓", en: "Copied ✓" },
};

/* Query BEFORE the fragment; fragment exactly "#energia". */
const SHARE_URL = "https://colibriilabs.ai/app?utm_source=share&utm_medium=rail&utm_campaign=energia&utm_content=rail-continuar#energia";

/* Entry reveal — 0.4s ease [0.22,0.61,0.36,1], y 12→0; reduced-motion path is
   0.2s opacity only, no transforms, no stagger. */
function Reveal({ delay = 0, reduced, style, children }) {
  return (
    <motion.div
      style={style}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={reduced ? { duration: 0.2 } : { duration: 0.4, ease: [0.22, 0.61, 0.36, 1], delay }}
      viewport={{ once: true, margin: "-40px" }}
    >
      {children}
    </motion.div>
  );
}

export function ExploreRail({ en = false }) {
  const reduced = !!useReducedMotion();
  const [seen, setSeen] = useState({});
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef(null);

  /* Visited state — hydrate from sessionStorage (inside useEffect: SSR-safe),
     then watch the four targets with ONE IntersectionObserver. Tall targets
     (e.g. the scenario ShareCard on a 360px phone) can never reach ratio 0.4,
     so a half-viewport visibility fallback marks them too. */
  useEffect(() => {
    const initial = {};
    RAIL_CARDS.forEach((c) => { if (ssGet(`seen.${c.id}`) === "1") initial[c.id] = true; });
    setSeen((prev) => ({ ...initial, ...prev }));

    if (typeof IntersectionObserver === "undefined") return;
    const vh = () => (typeof window !== "undefined" ? window.innerHeight || 0 : 0);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const deepEnough = e.intersectionRatio >= 0.4 ||
          (e.intersectionRect && e.intersectionRect.height >= vh() * 0.55);
        if (!deepEnough) return;
        const id = e.target.id;
        ssSet(`seen.${id}`, "1");
        setSeen((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
        io.unobserve(e.target);
      });
    }, { threshold: [0, 0.15, 0.4] });

    const attached = new Set();
    const attach = () => {
      RAIL_CARDS.forEach((c) => {
        if (attached.has(c.id)) return;
        const el = document.getElementById(c.id);
        if (el) { attached.add(c.id); io.observe(el); }
      });
    };
    attach();
    /* One retry — anchor hosts may mount a beat later behind dynamic imports. */
    const retry = window.setTimeout(attach, 1500);
    return () => { window.clearTimeout(retry); io.disconnect(); };
  }, []);

  useEffect(() => () => { if (copyTimer.current) window.clearTimeout(copyTimer.current); }, []);

  const onJump = useCallback((id) => (e) => {
    e.preventDefault();
    jumpTo(id, reduced);
  }, [reduced]);

  const onShare = useCallback(async () => {
    try {
      /* No existence check on purpose: where Web Share is missing this throws
         a TypeError (≠ AbortError) and falls through to the clipboard path. */
      await navigator.share({ url: SHARE_URL });
    } catch (err) {
      if (err && err.name === "AbortError") return; // user cancelled — never show done-state
      try {
        await navigator.clipboard.writeText(SHARE_URL);
        setCopied(true);
        if (copyTimer.current) window.clearTimeout(copyTimer.current);
        copyTimer.current = window.setTimeout(() => setCopied(false), 2200);
      } catch { /* clipboard unavailable — stay quiet, no false done-state */ }
    }
  }, []);

  /* Always renders — terminal navigation is never display-gated or dismissable. */
  return (
    <div style={{ marginTop: 18 }}>
      <nav aria-label={T(RAIL_COPY.navLabel, en)}>
        <Reveal reduced={reduced}>
          <div style={{
            fontFamily: MONO, fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
            color: "var(--enGold)", marginBottom: 6,
          }}>
            {T(RAIL_COPY.eyebrow, en)}
          </div>
          <h3 style={{
            fontFamily: DISPLAY, fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 800,
            color: "var(--text)", lineHeight: 1.25, margin: 0, marginBottom: 12,
          }}>
            {T(RAIL_COPY.title, en)}
          </h3>
        </Reveal>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
          gap: 12,
        }}>
          {RAIL_CARDS.map((c, i) => (
            /* data-act on the wrapper — the globals.css cascade colors the
               card's accent (top border, arrow) per destination act. */
            <Reveal
              key={c.id}
              reduced={reduced}
              delay={Math.min(i * 0.07, 0.48)}
              style={{ minWidth: 0 }}
            >
              <div data-act={c.act} style={{ minWidth: 0, height: "100%" }}>
                <a
                  href={`#${c.id}`}
                  onClick={onJump(c.id)}
                  className="efn-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    minHeight: 96,
                    height: "100%",
                    boxSizing: "border-box",
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderTop: "3px solid var(--act-accent)",
                    borderRadius: 12,
                    padding: "14px 16px",
                    textDecoration: "none",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                    <span style={{
                      fontFamily: MONO, fontSize: 10, letterSpacing: 1.5,
                      color: "var(--text3)", minWidth: 0,
                    }}>
                      {T(c.kind, en)}
                    </span>
                    <span style={{ flex: 1 }} />
                    {seen[c.id] && (
                      <span style={{
                        fontFamily: MONO, fontSize: 9.5, color: "var(--enTurq)",
                        border: "1px solid color-mix(in srgb, var(--enTurq) 45%, transparent)",
                        borderRadius: 999, padding: "1px 7px", whiteSpace: "nowrap", flexShrink: 0,
                      }}>
                        {T(RAIL_COPY.visited, en)}
                        <span className="efn-sr"> {T(RAIL_COPY.visitedSr, en)}</span>
                      </span>
                    )}
                    {/* Honest directionality — every target sits above this rail. */}
                    <span aria-hidden="true" style={{
                      fontFamily: MONO, fontSize: 13, fontWeight: 700,
                      color: "var(--act-accent)", flexShrink: 0,
                    }}>
                      ↑
                    </span>
                  </span>
                  <span style={{
                    fontSize: 13.5, fontWeight: 700, color: "var(--text)",
                    lineHeight: 1.4, minWidth: 0,
                  }}>
                    {T(c.title, en)}
                  </span>
                  <span style={{
                    fontFamily: MONO, fontSize: 10.5, color: "var(--text3)",
                    letterSpacing: 0.4, minWidth: 0,
                  }}>
                    {T(c.sub, en)}
                  </span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </nav>

      {/* Share row — first in-flow mobile share affordance (MicroCTA recipe). */}
      <Reveal reduced={reduced} delay={reduced ? 0 : 0.28}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          marginTop: 12,
          padding: "14px 18px",
          borderRadius: 12,
          background: "var(--surface)",
          border: "1px dashed var(--border2)",
        }}>
          <span style={{ fontSize: 13, color: "var(--text2)", minWidth: 0 }}>
            {T(RAIL_COPY.sharePrompt, en)}
          </span>
          <button
            type="button"
            onClick={onShare}
            className="efn-share-btn"
            style={{
              fontFamily: MONO,
              minHeight: 44,
              padding: "12px 18px",
              borderRadius: 10,
              border: "1.5px solid var(--enTurq)",
              background: "transparent",
              color: "var(--enTurq)",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            <span role="status">
              {copied ? T(RAIL_COPY.shareDone, en) : T(RAIL_COPY.shareBtn, en)}
            </span>
          </button>
        </div>
      </Reveal>

      <style>{`
        .efn-sr {
          position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px;
          overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
        }
        .efn-card {
          transition: transform .2s ease, border-color .2s ease;
        }
        .efn-card:hover {
          transform: translateY(-2px);
          border-color: color-mix(in srgb, var(--act-accent) 60%, transparent);
          border-top-color: var(--act-accent);
        }
        .efn-card:focus-visible,
        .efn-share-btn:focus-visible {
          outline: 2px solid var(--enGlow);
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .efn-card { transition: none; }
          .efn-card:hover { transform: none; }
        }
        @media (forced-colors: active) {
          .efn-card { border: 1px solid LinkText !important; }
          .efn-share-btn { border: 1px solid ButtonText !important; color: ButtonText !important; }
        }
      `}</style>
    </div>
  );
}
