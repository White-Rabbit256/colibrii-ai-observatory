"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EN_ACCENT } from "../energiaData";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Energía · PeakCTA (Phase 2)
   Engagement Builder slice — Peak CTA + Dwell Beacons
   ───────────────────────────────────────────────────────────────
   What it is:
     - PeakCTA: a once-per-session, gold-bordered prompt that fires
       at three editorial peaks (after the globe, after CRGridMap,
       after the ECAI radar) and routes the reader to Act 5.
     - DwellBeacon: a small wrapper that pulses a child target after
       N ms of continuous viewport dwell, fires once per session,
       respects prefers-reduced-motion.

   Hard constraints carried from Phase 1:
     - insumo técnico independiente (no advocacy verbs in copy)
     - mobile-first; WCAG AA contrast & 44px hit targets
     - reduced-motion safe (motion gated, fallback fade)
     - no new npm deps (framer-motion already in bundle)
     - all strings bilingual (es/en) via the existing T() pattern
     - sessionStorage gates use the colibrii.energia.v2.* namespace
       so a single Phase 2 version bump can flush all session flags
   ═══════════════════════════════════════════════════════════════ */

const MONO = "'IBM Plex Mono',monospace";
const DISPLAY = "var(--font-display, 'Playfair Display', serif)";
const SS_PREFIX = "colibrii.energia.v2.";

/* ── useFireOnce — sessionStorage-backed boolean (SSR-safe) ── */
export function useFireOnce(rawKey) {
  const key = SS_PREFIX + rawKey;
  const [fired, setFired] = useState(true); // assume fired during SSR — no flash
  useEffect(() => {
    try {
      setFired(typeof window !== "undefined" && sessionStorage.getItem(key) === "1");
    } catch {
      setFired(false);
    }
  }, [key]);
  const mark = useCallback(() => {
    try {
      if (typeof window !== "undefined") sessionStorage.setItem(key, "1");
    } catch {}
    setFired(true);
  }, [key]);
  return [fired, mark];
}

/* ── usePrefersReducedMotion (SSR-safe) ── */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(!!mq.matches);
    apply();
    if (mq.addEventListener) mq.addEventListener("change", apply);
    else if (mq.addListener) mq.addListener(apply);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", apply);
      else if (mq.removeListener) mq.removeListener(apply);
    };
  }, []);
  return reduced;
}

/* ── COPY — three variants, bilingual.
       Verbs picked from Colibrii voice contract: "muestra", "ve",
       "explica", "lea" — no imperatives that read as advocacy
       ("debe", "tiene que", "must"). ─────────────────────────── */
const COPY = {
  globe: {
    kicker: { es: "QUÉ SIGNIFICA PARA COSTA RICA", en: "WHAT THIS MEANS FOR COSTA RICA" },
    title: {
      es: "El mundo está comprando electricidad con años de anticipación.",
      en: "The world is buying electricity years in advance.",
    },
    body: {
      es: "Costa Rica entra a esa carrera con poco margen de capacidad y una reforma frenada. La aritmética del Expediente 23.414 — 8 votos para los 38 — explica por qué.",
      en: "Costa Rica enters that race with little spare capacity and a stalled reform. Bill 23.414 — 8 votes short of 38 — is the arithmetic that explains why.",
    },
    cta: { es: "Leer el Acto 5 ↓", en: "Read Act 5 ↓" },
    src: { es: "AIE · Dell'Oro · Asamblea Legislativa", en: "IEA · Dell'Oro · Asamblea Legislativa" },
  },
  crgrid: {
    kicker: { es: "EL APRETÓN ES REAL", en: "THE SQUEEZE IS REAL" },
    title: {
      es: "98,6 % renovable — y casi ningún megavatio de sobra.",
      en: "98.6% renewable — and almost no spare megawatts.",
    },
    body: {
      es: "El ICE necesita sumar +2.495 MW al 2040 con los ríos casi comprometidos. El Expediente 23.414 fija quién paga, quién construye y quién despacha esos megavatios.",
      en: "ICE must add +2,495 MW by 2040 with the rivers nearly spoken for. Bill 23.414 sets who pays, who builds and who dispatches those megawatts.",
    },
    cta: { es: "Ver la aritmética de los 38 votos ↓", en: "See the 38-vote arithmetic ↓" },
    src: { es: "ICE · ARESEP · Asamblea Legislativa", en: "ICE · ARESEP · Asamblea Legislativa" },
  },
  ecai: {
    kicker: { es: "USTED VIO EL ÍNDICE — AHORA LA DECISIÓN", en: "YOU SAW THE INDEX — NOW THE DECISION" },
    title: {
      es: "El 0,71 de ECAI-CR no cambia sin reforma.",
      en: "The 0.71 ECAI-CR score doesn't change without reform.",
    },
    body: {
      es: "Subir a Uruguay (0,78) o caer a Panamá (0,65) depende de tres palancas técnicas dentro del 23.414. La brecha de 8 votos las activa o las congela.",
      en: "Climbing toward Uruguay (0.78) or slipping to Panama (0.65) hinges on three technical levers inside Bill 23.414. The 8-vote gap either unlocks or freezes them.",
    },
    cta: { es: "Las 12 enmiendas técnicas ↓", en: "The 12 technical amendments ↓" },
    src: { es: "ECAI-CR · 12 enmiendas (Colibrii Labs)", en: "ECAI-CR · 12 amendments (Colibrii Labs)" },
  },
};

/* Default scroll targets per variant — match existing Act ids in EnergiaDeep. */
const DEFAULT_TARGET = {
  globe: "#energia-act-5",
  crgrid: "#energia-act-5",
  ecai: "#energia-act-8",
};

/* ── PeakCTA ─────────────────────────────────────────────────────
   Props:
     variant   — "globe" | "crgrid" | "ecai" (default "globe")
     en        — locale flag (matches the section's T() pattern)
     target    — CSS selector to smooth-scroll to (overrides default)
     id        — sessionStorage key suffix (defaults to variant)

   Behavior:
     - Renders nothing if useFireOnce already fired this session.
     - Becomes visible when the panel enters the viewport (whileInView).
     - User clicking the CTA: marks fired, prevents default, smooth-scrolls
       to target, then focuses the destination heading after the scroll
       lands (keyboard accessibility).
     - User clicking dismiss (×): marks fired, returns focus to the prior
       focused element on close.
     - Honors prefers-reduced-motion (no slide, just opacity fade).
   ──────────────────────────────────────────────────────────────── */
export default function PeakCTA({
  variant = "globe",
  en = false,
  target,
  id,
}) {
  const fireKey = `peakcta.${id || variant}`;
  const [fired, markFired] = useFireOnce(fireKey);
  const reduced = usePrefersReducedMotion();
  const c = COPY[variant] || COPY.globe;
  const scrollTarget = target || DEFAULT_TARGET[variant] || "#energia-act-5";
  const returnFocusRef = useRef(null);

  // Capture the element that was focused when the panel first appears,
  // so we can restore focus on dismiss.
  useEffect(() => {
    if (fired) return;
    if (typeof document !== "undefined") {
      returnFocusRef.current = document.activeElement;
    }
  }, [fired]);

  const t = (v) => (en ? v.en : v.es);

  const focusDest = useCallback(() => {
    if (typeof document === "undefined") return;
    const el = document.querySelector(scrollTarget);
    if (!el) return;
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
    try {
      el.focus({ preventScroll: true });
    } catch {}
  }, [scrollTarget]);

  const onPrimary = useCallback(
    (e) => {
      e.preventDefault();
      markFired();
      if (typeof document === "undefined") return;
      const el = document.querySelector(scrollTarget);
      if (!el) return;
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      // After scroll settles, move focus to the destination so keyboard users land there.
      window.setTimeout(focusDest, reduced ? 0 : 700);
    },
    [markFired, scrollTarget, reduced, focusDest]
  );

  const onDismiss = useCallback(() => {
    markFired();
    const ret = returnFocusRef.current;
    if (ret && typeof ret.focus === "function") {
      try { ret.focus({ preventScroll: true }); } catch {}
    }
  }, [markFired]);

  // Reduced motion: skip transform entirely
  const initial = reduced ? { opacity: 0 } : { opacity: 0, y: 16 };
  const animate = reduced
    ? { opacity: 1, transition: { duration: 0.2 } }
    : { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 0.61, 0.36, 1] } };
  const exit = reduced
    ? { opacity: 0, transition: { duration: 0.15 } }
    : { opacity: 0, y: -8, transition: { duration: 0.2 } };

  const headingId = `peakcta-${variant}-title`;
  const descId = `peakcta-${variant}-desc`;

  return (
    <AnimatePresence>
      {!fired && (
        <motion.aside
          role="complementary"
          aria-labelledby={headingId}
          aria-describedby={descId}
          initial={initial}
          whileInView={animate}
          exit={exit}
          viewport={{ once: true, margin: "-10% 0px" }}
          data-peak-cta={variant}
          className="energia-peak-cta"
          style={{
            position: "relative",
            margin: "22px 0 14px",
            padding: "16px 18px",
            borderRadius: 14,
            background: `linear-gradient(150deg, ${EN_ACCENT.navy} 0%, ${EN_ACCENT.navy2} 60%, ${EN_ACCENT.navyDeep} 100%)`,
            border: `1px solid ${EN_ACCENT.gold}77`,
            borderLeft: `4px solid ${EN_ACCENT.gold}`,
            boxShadow: `0 0 32px ${EN_ACCENT.gold}1a, 0 4px 18px rgba(0,0,0,0.35)`,
            overflow: "hidden",
          }}
        >
          {/* Soft warm glow — decorative; suppressed under reduced motion via CSS */}
          <span
            aria-hidden="true"
            className="energia-peak-cta-glow"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: `radial-gradient(80% 60% at 100% 0%, ${EN_ACCENT.gold}26, transparent 60%)`,
            }}
          />

          {/* Dismiss button — 44×44 hit target, top-right */}
          <button
            type="button"
            onClick={onDismiss}
            aria-label={en ? "Dismiss this prompt" : "Cerrar este aviso"}
            className="energia-peak-cta-dismiss"
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              minWidth: 44,
              minHeight: 44,
              width: 44,
              height: 44,
              border: "none",
              borderRadius: 10,
              background: "transparent",
              color: "rgba(241,245,249,0.62)",
              cursor: "pointer",
              fontSize: 20,
              lineHeight: 1,
              fontFamily: MONO,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color .15s ease, background .15s ease",
            }}
          >
            <span aria-hidden="true">×</span>
          </button>

          {/* Kicker — 10.5px mono, gold; visually leads the eye */}
          <div
            aria-hidden="true"
            style={{
              position: "relative",
              fontFamily: MONO,
              fontSize: 10.5,
              letterSpacing: 2,
              color: EN_ACCENT.gold,
              marginBottom: 8,
              paddingRight: 48,
            }}
          >
            {t(c.kicker)}
          </div>

          {/* Headline — Playfair Display, the editorial beat */}
          <h3
            id={headingId}
            style={{
              position: "relative",
              fontFamily: DISPLAY,
              fontSize: "clamp(17px, 2.4vw, 22px)",
              fontWeight: 800,
              lineHeight: 1.3,
              color: "#f1f5f9",
              margin: 0,
              marginBottom: 8,
              paddingRight: 12,
            }}
          >
            {t(c.title)}
          </h3>

          {/* Body — 13.5px sans, reads in one breath */}
          <p
            id={descId}
            style={{
              position: "relative",
              fontSize: 13.5,
              color: "rgba(241,245,249,0.84)",
              lineHeight: 1.6,
              margin: 0,
              marginBottom: 14,
              maxWidth: 600,
            }}
          >
            {t(c.body)}
          </p>

          {/* Primary CTA — gold pill, 44px hit target, AAA contrast (9.1:1) */}
          <a
            href={scrollTarget}
            onClick={onPrimary}
            className="energia-peak-cta-primary"
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              minHeight: 44,
              padding: "10px 18px",
              borderRadius: 10,
              fontFamily: MONO,
              fontSize: 12.5,
              fontWeight: 700,
              textDecoration: "none",
              color: "#06281f",
              background: `linear-gradient(135deg, ${EN_ACCENT.gold}, #f7c66c)`,
              boxShadow: `0 4px 20px ${EN_ACCENT.gold}44`,
              border: "none",
              cursor: "pointer",
            }}
          >
            {t(c.cta)}
          </a>

          {/* Source line — kept honest, small, mono */}
          <div
            style={{
              position: "relative",
              fontFamily: MONO,
              fontSize: 10,
              color: "rgba(241,245,249,0.48)",
              marginTop: 12,
              letterSpacing: 0.4,
            }}
          >
            {t(c.src)}
          </div>

          {/* Scoped CSS — keyframes, hover/focus, reduced motion, forced colors */}
          <style>{`
            .energia-peak-cta-glow {
              animation: peakCtaBreath 2400ms cubic-bezier(0.45, 0, 0.55, 1) infinite alternate;
            }
            @keyframes peakCtaBreath {
              0%   { opacity: 0.55; }
              100% { opacity: 1; }
            }
            .energia-peak-cta-primary {
              transition: transform .15s ease, box-shadow .15s ease, filter .15s ease;
            }
            .energia-peak-cta-primary:hover {
              transform: translateY(-1px);
              box-shadow: 0 6px 26px ${EN_ACCENT.gold}66;
              filter: brightness(1.04);
            }
            .energia-peak-cta-primary:focus-visible {
              outline: 2px solid ${EN_ACCENT.glow};
              outline-offset: 3px;
            }
            .energia-peak-cta-dismiss:hover {
              color: #f1f5f9;
              background: rgba(255,255,255,0.06);
            }
            .energia-peak-cta-dismiss:focus-visible {
              outline: 2px solid ${EN_ACCENT.glow};
              outline-offset: 2px;
              color: #f1f5f9;
            }
            @media (prefers-reduced-motion: reduce) {
              .energia-peak-cta-glow { animation: none; opacity: 0.6; }
              .energia-peak-cta-primary { transition: none; }
              .energia-peak-cta-primary:hover { transform: none; filter: none; }
            }
            @media (forced-colors: active) {
              .energia-peak-cta {
                background: Canvas !important;
                color: CanvasText !important;
                border: 2px solid CanvasText !important;
              }
              .energia-peak-cta-primary {
                background: Highlight !important;
                color: HighlightText !important;
                box-shadow: none !important;
              }
              .energia-peak-cta-glow { display: none; }
            }
          `}</style>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

/* ── DwellBeacon ────────────────────────────────────────────────
   Wrap a child target (a button, a chip, a card). After `delayMs` of
   continuous intersection (≥ threshold), fires a single ringed pulse
   + optional caption. Marks fired in sessionStorage so it never
   reappears that session. Honors prefers-reduced-motion (no pulse,
   static border-alpha emphasis instead).

   Props:
     id        — unique session key suffix (required)
     delayMs   — dwell time before firing (default 4000)
     threshold — IO threshold (default 0.55)
     caption   — { es, en } small tooltip below the target (optional)
     en        — locale flag
     accent    — hex color for ring + caption border (default gold)
     children  — single React element (the target)
   ──────────────────────────────────────────────────────────────── */
export function DwellBeacon({
  id,
  delayMs = 4000,
  threshold = 0.55,
  caption,
  en = false,
  accent = EN_ACCENT.gold,
  children,
}) {
  const wrapRef = useRef(null);
  const timerRef = useRef(null);
  const [pulsing, setPulsing] = useState(false);
  const [fired, markFired] = useFireOnce(`dwell.${id}`);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (fired) return;
    if (typeof window === "undefined") return;
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const start = () => {
      if (timerRef.current) return;
      timerRef.current = window.setTimeout(() => {
        timerRef.current = null;
        setPulsing(true);
        markFired();
        // Auto-stop the pulse after one full cycle (3 pulses × ~1100ms).
        window.setTimeout(() => setPulsing(false), reduced ? 1200 : 4200);
      }, delayMs);
    };
    const stop = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) start();
        else stop();
      },
      { threshold: [0, threshold, 1] }
    );
    io.observe(el);

    // Any user interaction within the wrapper cancels and consumes the beacon.
    const onInteract = () => {
      stop();
      setPulsing(false);
      markFired();
    };
    el.addEventListener("pointerdown", onInteract, { once: true });
    el.addEventListener("focusin", onInteract, { once: true });

    return () => {
      io.disconnect();
      stop();
      el.removeEventListener("pointerdown", onInteract);
      el.removeEventListener("focusin", onInteract);
    };
  }, [fired, delayMs, threshold, markFired, reduced]);

  const cap = caption ? (en ? caption.en : caption.es) : null;

  return (
    <span
      ref={wrapRef}
      className={`energia-dwell-host${pulsing ? " is-pulsing" : ""}`}
      style={{
        position: "relative",
        display: "inline-block",
        // Local accent token so :host CSS in the <style> below picks the right hue
        "--dwell-accent": accent,
      }}
    >
      {children}
      {cap && pulsing && (
        <span
          role="status"
          aria-live="polite"
          className="energia-dwell-caption"
          style={{
            position: "absolute",
            left: "50%",
            top: "calc(100% + 10px)",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            padding: "5px 10px",
            borderRadius: 999,
            background: `${EN_ACCENT.navyDeep}f0`,
            border: `1px solid ${accent}`,
            color: accent,
            fontFamily: MONO,
            fontSize: 10.5,
            letterSpacing: 0.5,
            pointerEvents: "none",
            zIndex: 5,
          }}
        >
          {cap}
        </span>
      )}
      <style>{`
        .energia-dwell-host.is-pulsing > *:first-child {
          animation: energiaDwellPulse 1100ms cubic-bezier(0.22, 0.61, 0.36, 1) 0s 3 both;
          border-radius: inherit;
        }
        @keyframes energiaDwellPulse {
          0%   { box-shadow: 0 0 0 0 ${accent}aa; }
          60%  { box-shadow: 0 0 0 12px ${accent}00; }
          100% { box-shadow: 0 0 0 0 ${accent}00; }
        }
        .energia-dwell-caption {
          animation: energiaDwellCaption 4200ms ease-out forwards;
        }
        @keyframes energiaDwellCaption {
          0%   { opacity: 0; transform: translate(-50%, -4px); }
          12%  { opacity: 1; transform: translate(-50%, 0); }
          85%  { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, 2px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .energia-dwell-host.is-pulsing > *:first-child {
            animation: none !important;
            box-shadow: 0 0 0 2px ${accent} !important;
            transition: box-shadow 600ms ease;
          }
          .energia-dwell-caption {
            animation: none !important;
            opacity: 0.95;
          }
        }
      `}</style>
    </span>
  );
}
