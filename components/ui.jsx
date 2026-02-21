"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "./system/Icon";
import { PARTNER_LOGOS } from "./data";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — UI Components v13
   Framer Motion enhanced · Dark-mode aware via CSS vars
   All v12 components preserved + new components added
   ═══════════════════════════════════════════════════════════════ */

/* ── FRAMER MOTION VARIANTS ── */
export const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } } };
export const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } };
export const scaleIn = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } } };
export const stagger = { visible: { transition: { staggerChildren: 0.06 } } };
export const slideIn = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4 } } };

/* ── TAB TRANSITION VARIANTS ── */
export const tabVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } }
};

/* ── ANIMATED NUMBER ── */
export function AN({ v, p = 0, s = "", d = 0 }) {
  const [disp, setDisp] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    if (v == null) return;
    let start = null;
    const dur = 1200;
    const ease = t => 1 - Math.pow(1 - t, 3);
    const from = ref.current ?? 0;
    const anim = ts => { if (!start) start = ts; const t = Math.min((ts - start) / dur, 1); setDisp(from + (v - from) * ease(t)); if (t < 1) requestAnimationFrame(anim); };
    const timer = setTimeout(() => requestAnimationFrame(anim), d);
    ref.current = v;
    return () => clearTimeout(timer);
  }, [v, d]);
  if (v == null) return <span style={{ color: "var(--text3)" }}>—</span>;
  return <span className="stat-number">{s}{disp.toFixed(p)}</span>;
}

/* ── SCROLL REVEAL (CSS + IntersectionObserver) ── */
export function ScrollReveal({ children, delay = 0, threshold = 0.1 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.style.transitionDelay = `${delay}ms`; el.classList.add("visible"); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, threshold]);
  return <div ref={ref} className="scroll-reveal">{children}</div>;
}

/* ── MOTION CARD (Framer Motion enhanced) ── */
export function Card({ children, d = 0, accent, style, onClick, className = "" }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: d }}
      whileHover={{ y: -2, boxShadow: "var(--shadow-lg)" }}
      className={`card ${className}`}
      style={{ padding: 20, ...style, borderTop: accent ? `3px solid ${accent}` : undefined }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </motion.div>
  );
}

/* ── BOX (lighter nested container) ── */
export function Bx({ children, style }) {
  return <div style={{ padding: "10px 14px", background: "var(--surface)", borderRadius: 10, ...style }}>{children}</div>;
}

/* ── SECTION HEADER ── */
export function SH({ color, label, title, desc }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ marginBottom: 24 }}>
      {label && <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 6 }}>{label}</div>}
      <h2 style={{ fontSize: 24, fontWeight: 800, fontFamily: "var(--font-display, 'Playfair Display', serif)", color: "var(--text)", marginBottom: 6, lineHeight: 1.3 }}>{title}</h2>
      {desc && <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7, maxWidth: 640 }}>{desc}</p>}
    </motion.div>
  );
}

/* ── STAT CARD ── */
export function Stat({ value, label, sub, color, prefix = "", precision = 2, icon, onClick }) {
  return (
    <Card d={0.05} onClick={onClick} className={onClick ? "stat-clickable" : ""}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 28, fontWeight: 800, color: color || "var(--cyan)", fontFamily: "'IBM Plex Mono',monospace" }}>
            <AN v={value} p={precision} s={prefix} />
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginTop: 2 }}>{label}</div>
          {sub && <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{sub}</div>}
          {onClick && <div style={{ fontSize: 9, color: "var(--text3)", marginTop: 4, fontFamily: "'IBM Plex Mono',monospace", opacity: 0.7, display: "flex", alignItems: "center", gap: 3 }}>▸ <span style={{ borderBottom: "1px dotted var(--text3)" }}>más info</span></div>}
        </div>
        {icon && <Icon name={icon} size={22} style={{ opacity: 0.5 }} />}
      </div>
    </Card>
  );
}

/* ── TAG / BADGE ── */
export function Tag({ children, color }) {
  return <span className="tag" style={{ background: `${color}12`, color, border: `1px solid ${color}30` }}>{children}</span>;
}

/* ── CITATION ── */
export function Ci({ s }) {
  return <div style={{ marginTop: 10, fontSize: 10, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace", letterSpacing: 0.3 }}>SOURCE: {s}</div>;
}

/* ── EXTERNAL LINK ── */
export function Lnk({ href, children }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600 }}>{children} <span style={{ fontSize: 10 }}>↗</span></a>;
}

/* ── SKELETON LOADERS ── */
export function Sk({ w = "100%", h = 16, r = 8 }) {
  return <div className="skeleton" style={{ width: w, height: h, borderRadius: r }} />;
}

export function LoadCard() {
  return <Card><Sk h={20} w="60%" /><div style={{ height: 8 }} /><Sk h={14} /><div style={{ height: 6 }} /><Sk h={14} w="80%" /></Card>;
}

/* ── CSS GRID HELPER ── */
export function Grid({ children, cols = "1fr 1fr", gap = 12, style, className = "" }) {
  return <div className={`mobile-grid-1 ${className}`} style={{ display: "grid", gridTemplateColumns: cols, gap, ...style }}>{children}</div>;
}

/* ── TRAFFIC LIGHT ── */
export function Traffic({ score }) {
  const c = score >= 0.65 ? "var(--green)" : score >= 0.40 ? "var(--amber)" : "var(--red)";
  return <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: c, boxShadow: `0 0 6px ${c}` }} />;
}

/* ── PROGRESS BAR ── */
export function ProgressBar({ value, max = 1, color = "var(--cyan)", height = 6 }) {
  return (
    <div className="progress-bar" style={{ height }}>
      <div className="progress-bar-fill" style={{ width: `${Math.min(value / max * 100, 100)}%`, background: color }} />
    </div>
  );
}

/* ── PARTNER BAR ── */
export function PartnerBar({ items, en, showLogos = true }) {
  return (
    <Card d={0.2} style={{ marginTop: 20 }}>
      <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
        {en ? "DATA PARTNERS & SOURCES" : "SOCIOS DE DATOS Y FUENTES"}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        {items.map((p, i) => {
          const domain = PARTNER_LOGOS?.[p];
          return (
            <span key={i} style={{ padding: "4px 10px", background: "var(--surface)", borderRadius: 20, fontSize: 11, color: "var(--text2)", display: "inline-flex", alignItems: "center", gap: 4 }}>
              {showLogos && domain && (
                <img
                  src={`https://logo.clearbit.com/${domain}?size=32`}
                  alt=""
                  loading="lazy"
                  style={{ width: 14, height: 14, borderRadius: 2 }}
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              )}
              {p}
            </span>
          );
        })}
      </div>
    </Card>
  );
}

/* ── MINI STAT (inline, for grids) ── */
export function MiniStat({ label, value, color, mono }) {
  return (
    <div style={{ padding: "6px 10px", background: "var(--surface)", borderRadius: 6 }}>
      <div style={{ fontSize: 9, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace" }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: color || "var(--text)", fontFamily: mono ? "'IBM Plex Mono',monospace" : "inherit" }}>{value}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NEW v13 COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

/* ── ANIMATED TAB WRAPPER ── */
export function TabContent({ id, children }) {
  return (
    <motion.div key={id} variants={tabVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}

/* ── DIMENSION BADGE (used in Index, Compare, Simulator) ── */
export function DimBadge({ dim, en }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ fontSize: 14, color: dim.co }}>{dim.ic}</span>
      <span style={{ fontSize: 12, fontWeight: 600, color: dim.co }}>{en ? dim.e : dim.l}</span>
      <span style={{ fontSize: 10, color: "var(--text3)", fontFamily: "'IBM Plex Mono',monospace" }}>{(dim.w * 100).toFixed(0)}%</span>
    </div>
  );
}

/* ── COUNTRY FLAG + NAME ── */
export function CountryLabel({ co, en, size = "sm", alpha2 }) {
  const s = size === "lg" ? { flag: 24, name: 16 } : { flag: 16, name: 13 };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      {alpha2 ? <Flag code={alpha2} size={s.flag} /> : <span style={{ fontSize: s.flag }}>{co.f}</span>}
      <span style={{ fontSize: s.name, fontWeight: 600 }}>{en ? co.e : co.n}</span>
    </span>
  );
}

/* ── EMPTY STATE ── */
export function EmptyState({ icon = "🔍", title, desc }) {
  return (
    <div style={{ textAlign: "center", padding: "48px 24px", color: "var(--text3)" }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text2)", marginBottom: 6 }}>{title}</div>
      {desc && <div style={{ fontSize: 13 }}>{desc}</div>}
    </div>
  );
}

/* ── TOOLTIP WRAPPER ── */
export function Tooltip({ children, text }) {
  return (
    <span className="tooltip-wrapper">
      {children}
      <span className="tooltip-text">{text}</span>
    </span>
  );
}

/* ── SCORE COLOR UTILITY (uses CSS vars) ── */
export function ScorePill({ score, en }) {
  const color = score >= 0.65 ? "var(--green)" : score >= 0.40 ? "var(--amber)" : "var(--red)";
  const label = score >= 0.65 ? (en ? "READY" : "PREPARADO") : score >= 0.40 ? (en ? "AT RISK" : "EN RIESGO") : (en ? "DEFICIT" : "DÉFICIT");
  return <Tag color={color}>{label}</Tag>;
}

/* ── FLAG COMPONENT (Twemoji CDN + emoji fallback) ── */
export function Flag({ code, size = 20, style }) {
  const [err, setErr] = useState(false);
  // Convert ISO Alpha-2 code to regional indicator Unicode for Twemoji
  const cp = code && code.length === 2
    ? [...code.toUpperCase()].map(c => (c.charCodeAt(0) + 0x1F1A5).toString(16)).join("-")
    : null;
  const emoji = code && code.length === 2
    ? String.fromCodePoint(...[...code.toUpperCase()].map(c => c.charCodeAt(0) + 0x1F1A5))
    : "🏳";
  if (!cp || err) return <span style={{ fontSize: size * 0.85, lineHeight: 1, ...style }}>{emoji}</span>;
  return (
    <img
      src={`https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${cp}.svg`}
      alt={code}
      width={size}
      height={size}
      style={{ display: "inline-block", verticalAlign: "middle", ...style }}
      onError={() => setErr(true)}
      loading="lazy"
    />
  );
}

/* ── DOWNLOAD / EXPORT BUTTON ── */
export function ExportBtn({ onClick, en, label }) {
  return (
    <button onClick={onClick} style={{ padding: "6px 14px", fontSize: 12, fontWeight: 600, border: "1px solid var(--border)", borderRadius: 6, background: "var(--card)", color: "var(--text2)", display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span style={{ fontSize: 14 }}>↓</span> {label || (en ? "Export" : "Exportar")}
    </button>
  );
}
