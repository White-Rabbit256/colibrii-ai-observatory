"use client";
import { useState, useRef, useEffect } from "react";
import { Card, SH, ScrollReveal, Tag, Bx, MiniStat, Lnk, KeyInsight, FreshnessBadge, Flag } from "./ui";
import { Icon } from "./system/Icon";
import {
  ILIA_RANKINGS, CR_ILIA_PROFILE, ILIA_FINDINGS,
  CR_HIGHLIGHTS, ILIA_METHODOLOGY, ILIA_REGIONAL_STATS, ILIA_DIMENSIONS,
  ILIA_TIERS
} from "./iliaData";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — ILIA 2025 Deep Intelligence v2
   Full rewrite: resolves all {en,es} bilingual objects before render.
   Source: CEPAL + CENIA · 19 countries · 100+ subindicators
   ═══════════════════════════════════════════════════════════════ */

/* ── Resolve nested {en, es} bilingual objects ── */
function T(v, lang) {
  if (v && typeof v === "object" && !Array.isArray(v) && "en" in v && "es" in v) return lang ? v.en : v.es;
  return v;
}

/* ── Shorthand ── */
const mono = { fontFamily: "'IBM Plex Mono',monospace" };
const display = { fontFamily: "var(--font-display,'Playfair Display',serif)" };

/* ── Country ISO-2 code map for Flag component ── */
const FLAG_MAP = {
  "Chile": "CL", "Brasil": "BR", "Brazil": "BR", "Uruguay": "UY",
  "Colombia": "CO", "Costa Rica": "CR", "Argentina": "AR",
  "Perú": "PE", "Peru": "PE", "México": "MX", "Mexico": "MX",
  "Rep. Dominicana": "DO", "Dominican Republic": "DO",
  "Ecuador": "EC", "Panamá": "PA", "Panama": "PA",
  "El Salvador": "SV", "Jamaica": "JM", "Paraguay": "PY",
  "Cuba": "CU", "Guatemala": "GT", "Honduras": "HN",
  "Bolivia": "BO", "Venezuela": "VE"
};

/* ── Tier colors ── */
const TIER_COLORS = { Pionero: "#22c55e", Pioneer: "#22c55e", Adoptante: "#eab308", Adopter: "#eab308", Explorador: "#ef4444", Explorer: "#ef4444" };

/* ── Premium animated hero background with constellation, mesh gradient, and glow ── */
function HeroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    /* Particles — constellation network */
    const COLORS = ["#22d3ee", "#6366f1", "#ec4899", "#10b981", "#818cf8", "#38bdf8"];
    const N = 65;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width / dpr,
      y: Math.random() * canvas.height / dpr,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1 + Math.random() * 2.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      pulse: Math.random() * Math.PI * 2,
    }));

    function draw() {
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;
      ctx.clearRect(0, 0, W, H);

      /* Draw connections */
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      /* Draw particles with glow */
      for (const p of particles) {
        p.pulse += 0.02;
        const glow = 0.5 + Math.sin(p.pulse) * 0.5;
        const r = p.r * (0.8 + glow * 0.4);

        /* Outer glow */
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(")", `,${0.04 * glow})`).replace("rgb", "rgba").replace("#", "");
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
        grad.addColorStop(0, p.color + Math.round(glow * 25).toString(16).padStart(2, "0"));
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fill();

        /* Core */
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round((0.5 + glow * 0.5) * 255).toString(16).padStart(2, "0");
        ctx.fill();

        /* Move */
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }

      frame = requestAnimationFrame(draw);
    }

    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {/* Animated mesh gradient blobs */}
      <div style={{
        position: "absolute", width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
        top: "-15%", left: "-10%", filter: "blur(60px)",
        animation: "iliaMesh1 12s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", width: 350, height: 350, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34,211,238,0.2) 0%, transparent 70%)",
        bottom: "-20%", right: "-5%", filter: "blur(50px)",
        animation: "iliaMesh2 15s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", width: 280, height: 280, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)",
        top: "30%", right: "15%", filter: "blur(45px)",
        animation: "iliaMesh3 10s ease-in-out infinite",
      }} />

      {/* Canvas constellation */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />

      {/* Scan line effect */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
      }} />

      <style>{`
        @keyframes iliaMesh1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px, 30px) scale(1.2); } }
        @keyframes iliaMesh2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-30px, -25px) scale(1.15); } }
        @keyframes iliaMesh3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(20px, -20px) scale(0.9); } }
        @keyframes iliaBarGrow { from { width: 0%; } }
        @keyframes iliaRingGrow { from { stroke-dashoffset: 314; } }
        @keyframes iliaPulse { 0%,100% { opacity:0.6; } 50% { opacity:1; } }
        @keyframes iliaGlow { 0%,100% { box-shadow: 0 0 20px rgba(34,211,238,0.2); } 50% { box-shadow: 0 0 40px rgba(34,211,238,0.4), 0 0 80px rgba(99,102,241,0.2); } }
        @keyframes iliaFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
      `}</style>
    </div>
  );
}

/* ── Score bar for leaderboard (animated via IntersectionObserver) ── */
function ScoreBar({ score, max = 75, color, animate }) {
  const pct = Math.min((score / max) * 100, 100);
  return (
    <div style={{ flex: 1, height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden", minWidth: 60 }}>
      <div style={{
        height: "100%", borderRadius: 4,
        background: `linear-gradient(90deg, ${color}90, ${color})`,
        width: animate ? `${pct}%` : "0%",
        transition: animate ? "width 1.2s cubic-bezier(.4,0,.2,1)" : "none",
      }} />
    </div>
  );
}

/* ── Expandable dimension card for CR deep dive ── */
function DimensionCard({ dim, en, t, colors }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (open && ref.current) {
      setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 60);
    }
  }, [open]);

  const dimColor = colors[dim.id] || t.cy;

  return (
    <Card accent={dimColor} style={{ marginBottom: 10 }}>
      <button onClick={() => setOpen(!open)} style={{
        background: "none", border: "none", cursor: "pointer", width: "100%",
        textAlign: "left", padding: 0, color: "inherit",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{dim.name}</div>
            <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: dimColor, ...mono }}>{dim.score.toFixed(2)}</span>
              <Tag color={dimColor}>#{dim.position}</Tag>
            </div>
          </div>
          <span style={{ fontSize: 14, color: "var(--text3)", transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>▾</span>
        </div>
      </button>

      {open && (
        <div ref={ref} style={{ marginTop: 12 }}>
          {dim.subdimensions.map((sub, si) => (
            <div key={si} style={{ marginBottom: 12, padding: "10px 12px", background: "var(--surface)", borderRadius: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text)" }}>{sub.name}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: dimColor, ...mono }}>{sub.score.toFixed(2)}</span>
              </div>
              {sub.indicators && sub.indicators.map((ind, ii) => (
                <div key={ii} style={{ marginBottom: 8, paddingLeft: 8, borderLeft: `2px solid ${dimColor}30` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                    <span style={{ fontSize: 11, color: "var(--text2)" }}>{ind.name}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: dimColor, ...mono }}>{ind.score.toFixed(1)}</span>
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <div style={{ flex: 1, height: 5, background: "var(--border)", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${Math.min(ind.score, 100)}%`, background: dimColor, borderRadius: 3, transition: "width 0.8s ease" }} />
                    </div>
                    <span style={{ fontSize: 9, color: "var(--text3)", ...mono, whiteSpace: "nowrap" }}>avg {ind.regionalAvg.toFixed(1)}</span>
                  </div>
                  <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 3, lineHeight: 1.5 }}>{T(ind.detail, en)}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

/* ── Finding card ── */
function FindingCard({ f, en, t, idx }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (open && ref.current) {
      setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 60);
    }
  }, [open]);

  const gradients = [t.cy, t.vi, t.gn, t.or, t.pk, t.am, t.rd, "#6366f1", "#ec4899", "#14b8a6", "#f97316"];
  const color = gradients[idx % gradients.length];

  return (
    <Card accent={color} style={{ marginBottom: 8 }}>
      <button onClick={() => setOpen(!open)} style={{
        background: "none", border: "none", cursor: "pointer", width: "100%",
        textAlign: "left", padding: 0, color: "inherit",
      }}>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: `${color}18`, color, display: "flex",
            alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 800, ...mono, flexShrink: 0,
          }}>
            {f.id}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", lineHeight: 1.4 }}>{f.title}</div>
            <div style={{ fontSize: 11.5, color: "var(--text3)", marginTop: 3, lineHeight: 1.5 }}>{T(f.summary, en)}</div>
          </div>
          <span style={{ fontSize: 12, color: "var(--text3)", transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", flexShrink: 0 }}>▾</span>
        </div>
      </button>

      {open && (
        <div ref={ref} style={{ marginTop: 10, padding: "10px 12px", background: `${color}08`, borderRadius: 8, borderLeft: `3px solid ${color}` }}>
          <div style={{ fontSize: 11, fontWeight: 600, color, marginBottom: 4, ...mono }}>
            {en ? "COSTA RICA RELEVANCE" : "RELEVANCIA COSTA RICA"}
          </div>
          <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6 }}>{T(f.crRelevance, en)}</div>
          {f.countries && f.countries.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
              {f.countries.map((c, ci) => <Tag key={ci} color={color}>{c}</Tag>)}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}


/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════ */
export function ILIADeep({ en, t }) {
  const [expandedDim, setExpandedDim] = useState(null);
  const [methTab, setMethTab] = useState("dimensions");
  const [barsVisible, setBarsVisible] = useState(false);
  const leaderboardRef = useRef(null);

  // Data calls (functions that take `en`)
  const rankings = ILIA_RANKINGS(en);
  const profile = CR_ILIA_PROFILE(en);
  const findings = ILIA_FINDINGS(en);
  const highlights = CR_HIGHLIGHTS(en);
  const methodology = ILIA_METHODOLOGY(en);
  const regionalStats = ILIA_REGIONAL_STATS(en);
  const dimensions = ILIA_DIMENSIONS(en);
  const tiers = ILIA_TIERS(en);

  // Dimension colors
  const dimColors = { enabling: "#3b82f6", rda: "#8b5cf6", governance: "#f59e0b" };

  // IntersectionObserver for leaderboard bar animations
  useEffect(() => {
    const el = leaderboardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setBarsVisible(true); obs.unobserve(el); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Strengths and weaknesses from highlights
  const strengths = highlights.filter(h => {
    const cat = (h.category || "").toLowerCase();
    return !cat.includes("weakness") && !cat.includes("debilidad");
  });
  const weaknesses = highlights.filter(h => {
    const cat = (h.category || "").toLowerCase();
    return cat.includes("weakness") || cat.includes("debilidad");
  });

  const regionalAvg = 42.98;

  /* Defensive fallback theme */
  const th = t && t.cy ? t : { cy:"#2563eb", vi:"#6366f1", pk:"#ec4899", am:"#f59e0b", rd:"#ef4444", gn:"#10b981", or:"#f97316" };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>

      {/* ═══ SECTION 1: IMMERSIVE HERO ═══ */}
      <div style={{
        position: "relative", borderRadius: 24, overflow: "hidden",
        background: "linear-gradient(135deg, #030712 0%, #0f172a 30%, #1e1b4b 60%, #0c4a6e 100%)",
        padding: "64px 24px 48px", marginBottom: 28, minHeight: 340,
        boxShadow: "0 8px 60px rgba(99,102,241,0.15), 0 2px 20px rgba(0,0,0,0.5)",
      }}>
        <HeroBackground />

        {/* Glowing border effect */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 24, pointerEvents: "none",
          border: "1px solid rgba(99,102,241,0.2)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
        }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          {/* Subtitle */}
          <div style={{
            fontSize: 10, letterSpacing: 5, textTransform: "uppercase",
            color: "#22d3ee", ...mono, marginBottom: 12, opacity: 0.9,
            animation: "iliaPulse 3s ease-in-out infinite",
          }}>
            {en ? "LATIN AMERICAN AI INDEX" : "ÍNDICE LATINOAMERICANO DE IA"}
          </div>

          {/* Main title with dramatic glow */}
          <h1 style={{
            fontSize: 56, fontWeight: 900, ...display, color: "#fff",
            textShadow: "0 0 30px rgba(34,211,238,0.5), 0 0 60px rgba(99,102,241,0.3), 0 0 120px rgba(99,102,241,0.1)",
            margin: "0 0 6px", lineHeight: 1,
            background: "linear-gradient(135deg, #fff 30%, #22d3ee 70%, #6366f1 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 20px rgba(34,211,238,0.3))",
          }}>
            ILIA 2025
          </h1>

          {/* Edition tag */}
          <div style={{
            fontSize: 12, color: "rgba(255,255,255,0.5)", ...mono, marginBottom: 16,
            letterSpacing: 2,
          }}>
            3rd Edition · CEPAL + CENIA Chile
          </div>

          <p style={{
            fontSize: 14, color: "rgba(255,255,255,0.55)", maxWidth: 460, margin: "0 auto 24px",
            lineHeight: 1.7, letterSpacing: 0.3,
          }}>
            {en
              ? "Comprehensive AI readiness assessment across 19 Latin American countries — 3 dimensions, 9 subdimensions, 100+ indicators."
              : "Evaluación integral de preparación AI en 19 países latinoamericanos — 3 dimensiones, 9 subdimensiones, 100+ indicadores."}
          </p>

          {/* Premium floating stat cards */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
            {[
              { val: "19", label: en ? "Countries" : "Países", color: "#22d3ee" },
              { val: "53.83", label: "CR Score", color: "#10b981" },
              { val: "#5", label: "LATAM", color: "#f59e0b" },
              { val: "42.98", label: en ? "Reg. Avg" : "Prom. Reg.", color: "#8b5cf6" },
            ].map((p, i) => (
              <div key={i} style={{
                padding: "10px 18px", borderRadius: 14, minWidth: 100, textAlign: "center",
                background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px) saturate(150%)",
                border: `1px solid ${p.color}25`,
                boxShadow: `0 4px 20px ${p.color}10, inset 0 1px 0 rgba(255,255,255,0.05)`,
                animation: `iliaFloat ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: p.color, ...mono, lineHeight: 1.2 }}>{p.val}</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", ...mono, textTransform: "uppercase", letterSpacing: 1, marginTop: 2 }}>{p.label}</div>
              </div>
            ))}
          </div>

          {/* Costa Rica flag + overperformer badge */}
          <div style={{
            marginTop: 20, display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 16px", borderRadius: 20,
            background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)",
            animation: "iliaGlow 4s ease-in-out infinite",
          }}>
            <Flag code="CR" size={18} />
            <span style={{ fontSize: 11, fontWeight: 700, color: "#10b981", ...mono, letterSpacing: 1 }}>
              AI OVERPERFORMER
            </span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", ...mono }}>↑4 {en ? "positions" : "posiciones"}</span>
          </div>
        </div>
      </div>

      <FreshnessBadge date={en ? "March 2026" : "Marzo 2026"} en={en} />

      <KeyInsight
        icon="🌎"
        color={th.cy}
        text={en
          ? "Costa Rica jumped 4 positions to #5 in the 2025 ILIA index, scoring 10.85 points above the regional average. Described as an 'AI Overperformer,' Costa Rica leads in governance institutionality (100/100), GenAI adoption (#2), and professional AI skills (#1)."
          : "Costa Rica subió 4 posiciones al #5 en el índice ILIA 2025, con 10.85 puntos sobre el promedio regional. Descrito como un 'Sobrerendidor de AI', lidera en institucionalidad de gobernanza (100/100), adopción de IA Generativa (#2) y habilidades profesionales AI (#1)."}
      />

      {/* ═══ SECTION 2: RANKINGS LEADERBOARD ═══ */}
      <ScrollReveal>
        <SH
          color={th.cy}
          label={en ? "RANKINGS · 19 COUNTRIES" : "RANKINGS · 19 PAÍSES"}
          title={en ? "ILIA 2025 Leaderboard" : "Tabla de Posiciones ILIA 2025"}
          desc={en ? "All 19 Latin American countries ranked by composite AI readiness score." : "Los 19 países latinoamericanos clasificados por puntaje compuesto de preparación AI."}
        />

        <div ref={leaderboardRef} style={{
          borderRadius: 16, overflow: "hidden",
          background: "var(--card)", border: "1px solid var(--border)",
          marginBottom: 24,
        }}>
          {/* Header row */}
          <div style={{
            display: "grid", gridTemplateColumns: "32px 1fr 2fr 60px 80px 50px",
            gap: 8, padding: "10px 14px", fontSize: 10, fontWeight: 700,
            color: "var(--text3)", ...mono, textTransform: "uppercase",
            borderBottom: "1px solid var(--border)", background: "var(--surface)",
          }}>
            <span>#</span>
            <span>{en ? "Country" : "País"}</span>
            <span></span>
            <span style={{ textAlign: "right" }}>{en ? "Score" : "Puntaje"}</span>
            <span style={{ textAlign: "center" }}>{en ? "Tier" : "Nivel"}</span>
            <span style={{ textAlign: "center" }}>Δ</span>
          </div>

          {rankings.map((c, i) => {
            const isCR = c.country === "Costa Rica";
            const tierColor = TIER_COLORS[en ? c.tierEn : c.tier] || "#64748b";
            const flagCode = FLAG_MAP[c.country] || FLAG_MAP[c.countryEn] || "";
            const name = en ? c.countryEn : c.country;

            return (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr 2fr 60px 80px 50px",
                gap: 8, padding: "8px 14px", alignItems: "center",
                borderBottom: "1px solid var(--border)",
                background: isCR ? "rgba(34,211,238,0.06)" : "transparent",
                borderLeft: isCR ? "3px solid #22d3ee" : "3px solid transparent",
                position: "relative",
              }}>
                {/* Regional avg dashed line is drawn at 42.98 position via the bar */}
                <span style={{ fontSize: 12, fontWeight: 700, color: isCR ? th.cy : "var(--text3)", ...mono }}>{c.rank}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
                  <Flag code={flagCode} size={18} />
                  <span style={{ fontSize: 12, fontWeight: isCR ? 700 : 500, color: isCR ? th.cy : "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</span>
                </div>
                <div style={{ position: "relative" }}>
                  <ScoreBar score={c.score} max={75} color={tierColor} animate={barsVisible} />
                  {/* Regional average dashed line */}
                  <div style={{
                    position: "absolute", top: 0, bottom: 0, left: `${(regionalAvg / 75) * 100}%`,
                    borderLeft: "1.5px dashed rgba(255,255,255,0.15)", pointerEvents: "none",
                  }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: isCR ? th.cy : "var(--text)", textAlign: "right", ...mono }}>{c.score.toFixed(2)}</span>
                <span style={{
                  fontSize: 9, fontWeight: 700, textAlign: "center", padding: "2px 6px",
                  borderRadius: 6, background: `${tierColor}15`, color: tierColor, ...mono,
                }}>
                  {en ? c.tierEn : c.tier}
                </span>
                <span style={{
                  fontSize: 10, fontWeight: 700, textAlign: "center", ...mono,
                  color: c.change > 0 ? "#22c55e" : c.change < 0 ? "#ef4444" : "var(--text3)",
                }}>
                  {c.change > 0 ? `↑${c.change}` : c.change < 0 ? `↓${Math.abs(c.change)}` : "—"}
                </span>
              </div>
            );
          })}

          {/* Legend row */}
          <div style={{ padding: "8px 14px", display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
            {tiers.map((tier, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, color: "var(--text3)" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: tier.color, display: "inline-block" }} />
                {tier.name} ({tier.range})
              </span>
            ))}
            <span style={{ fontSize: 10, color: "var(--text3)", ...mono, marginLeft: "auto" }}>
              {en ? "Dashed line = regional avg (42.98)" : "Línea punteada = prom. regional (42.98)"}
            </span>
          </div>
        </div>
      </ScrollReveal>

      {/* ═══ SECTION 3: COSTA RICA DEEP DIVE ═══ */}
      <ScrollReveal>
        <SH
          color={th.gn}
          label={en ? "COSTA RICA · DEEP DIVE" : "COSTA RICA · ANÁLISIS PROFUNDO"}
          title={en ? "Costa Rica ILIA Scorecard" : "Tarjeta de Puntaje ILIA de Costa Rica"}
          desc={en ? "Complete breakdown across 3 dimensions, 9 subdimensions, and 20+ indicators." : "Desglose completo en 3 dimensiones, 9 subdimensiones y 20+ indicadores."}
        />

        {/* Score ring + overall stats */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
          {/* Circular score */}
          <div style={{ position: "relative", width: 140, height: 140, flexShrink: 0 }}>
            <svg viewBox="0 0 120 120" style={{ width: "100%", height: "100%" }}>
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border)" strokeWidth="8" />
              <circle cx="60" cy="60" r="50" fill="none" stroke={th.cy} strokeWidth="8"
                strokeDasharray={`${(profile.overall.score / 100) * 314} 314`}
                strokeLinecap="round" transform="rotate(-90 60 60)"
                style={{ animation: "iliaRingGrow 1.5s ease-out forwards" }}
              />
            </svg>
            <div style={{
              position: "absolute", inset: 0, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: th.cy, ...mono }}>{profile.overall.score}</span>
              <span style={{ fontSize: 10, color: "var(--text3)", ...mono }}>/100</span>
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 8, flex: 1, minWidth: 200 }}>
            <MiniStat label={en ? "Position" : "Posición"} value={`#${profile.overall.position}`} color={th.cy} mono />
            <MiniStat label={en ? "Tier" : "Nivel"} value={profile.overall.tier} color="#eab308" />
            <MiniStat label={en ? "Above Avg" : "Sobre Prom."} value={`+${profile.overall.aboveAvg}`} color={th.gn} mono />
            <MiniStat label={en ? "Change" : "Cambio"} value={`↑${profile.overall.change}`} color={th.gn} mono />
          </div>
        </div>

        {/* 3 Dimension cards */}
        {profile.dimensions.map((dim, i) => (
          <DimensionCard key={dim.id} dim={dim} en={en} t={th} colors={dimColors} />
        ))}

        {/* Strengths */}
        <div style={{ marginTop: 20, marginBottom: 12 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: th.gn, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
            <Icon name="TrendingUp" size={14} color={th.gn} />
            {en ? "Key Strengths" : "Fortalezas Clave"}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10 }}>
            {strengths.slice(0, 4).map((cat, ci) => (
              <Bx key={ci} style={{ borderLeft: `3px solid ${th.gn}30` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <Icon name={cat.icon} size={14} color={th.gn} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text)" }}>{cat.category}</span>
                </div>
                {cat.items.slice(0, 3).map((item, ii) => (
                  <div key={ii} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "3px 0", borderBottom: "1px solid var(--border)" }}>
                    <span style={{ fontSize: 11, color: "var(--text2)" }}>{item.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: th.gn, ...mono }}>{item.value}</span>
                  </div>
                ))}
              </Bx>
            ))}
          </div>
        </div>

        {/* Weaknesses */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: th.rd, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
            <Icon name="AlertTriangle" size={14} color={th.rd} />
            {en ? "Key Weaknesses" : "Debilidades Clave"}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10 }}>
            {weaknesses.map((cat, ci) => (
              <Bx key={ci} style={{ borderLeft: `3px solid ${th.rd}30` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <Icon name={cat.icon} size={14} color={th.rd} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text)" }}>{cat.category}</span>
                </div>
                {cat.items.map((item, ii) => (
                  <div key={ii} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "3px 0", borderBottom: "1px solid var(--border)" }}>
                    <span style={{ fontSize: 11, color: "var(--text2)" }}>{item.label}</span>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: th.rd, ...mono }}>{item.value}</span>
                      <div style={{ fontSize: 9, color: "var(--text3)" }}>{item.context}</div>
                    </div>
                  </div>
                ))}
              </Bx>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ═══ SECTION 4: KEY FINDINGS ═══ */}
      <ScrollReveal>
        <SH
          color={th.vi}
          label={en ? "KEY FINDINGS · 11 HALLAZGOS" : "HALLAZGOS CLAVE · 11 HALLAZGOS"}
          title={en ? "ILIA 2025 Key Findings" : "Hallazgos Clave ILIA 2025"}
          desc={en ? "The 11 most important findings from the 2025 Latin American AI Index, with Costa Rica context." : "Los 11 hallazgos más importantes del Índice Latinoamericano de AI 2025, con contexto de Costa Rica."}
        />

        <div style={{ marginBottom: 24 }}>
          {findings.map((f, i) => (
            <FindingCard key={f.id} f={f} en={en} t={th} idx={i} />
          ))}
        </div>
      </ScrollReveal>

      {/* ═══ SECTION 5: REGIONAL INTELLIGENCE ═══ */}
      <ScrollReveal>
        <SH
          color={th.or}
          label={en ? "REGIONAL INTELLIGENCE" : "INTELIGENCIA REGIONAL"}
          title={en ? "LATAM AI Landscape" : "Panorama AI LATAM"}
          desc={en ? "Key regional statistics illuminating the state of AI in Latin America." : "Estadísticas regionales clave que iluminan el estado de la AI en Latinoamérica."}
        />

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 10, marginBottom: 24,
        }}>
          {regionalStats.map((stat, i) => {
            const colors = [th.cy, th.vi, th.or, th.gn, th.pk, th.am, th.rd, "#6366f1", "#14b8a6", "#f97316", "#8b5cf6"];
            const color = colors[i % colors.length];
            return (
              <Card key={stat.id} d={0.03 * i}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 800, color, ...mono }}>{stat.value}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", marginTop: 2 }}>{stat.label}</div>
                    <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 3, lineHeight: 1.5 }}>{stat.context}</div>
                  </div>
                  {stat.icon && <Icon name={stat.icon} size={18} style={{ opacity: 0.35, color }} />}
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollReveal>

      {/* ═══ SECTION 6: METHODOLOGY ═══ */}
      <ScrollReveal>
        <SH
          color={th.am}
          label={en ? "METHODOLOGY" : "METODOLOGÍA"}
          title={en ? "How ILIA Measures AI Readiness" : "Cómo ILIA Mide la Preparación AI"}
          desc={en ? "Framework, dimensions, weights, and data sources behind the index." : "Marco, dimensiones, ponderaciones y fuentes de datos detrás del índice."}
        />

        {/* Tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
          {[
            { id: "dimensions", label: en ? "Dimensions" : "Dimensiones" },
            { id: "weights", label: en ? "Weights" : "Ponderaciones" },
            { id: "sources", label: en ? "Sources" : "Fuentes" },
          ].map(tab => (
            <button key={tab.id} onClick={() => setMethTab(tab.id)} style={{
              padding: "6px 14px", fontSize: 11, fontWeight: 700, borderRadius: 8,
              background: methTab === tab.id ? `${th.am}15` : "var(--surface)",
              color: methTab === tab.id ? th.am : "var(--text3)",
              border: methTab === tab.id ? `1px solid ${th.am}40` : "1px solid var(--border)",
              cursor: "pointer", ...mono,
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        <Card style={{ marginBottom: 24 }}>
          {/* Scope description */}
          <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.7, marginBottom: 14 }}>
            {T(methodology.scope.description, en)}
          </div>

          {methTab === "dimensions" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 12 }}>
              {dimensions.map((dim, i) => (
                <Bx key={dim.id} style={{ borderTop: `3px solid ${dim.color}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: dim.color }}>{dim.name}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: dim.color, ...mono }}>{(dim.weight * 100).toFixed(0)}%</span>
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 8, lineHeight: 1.5 }}>
                    {T(dim.description, en)}
                  </div>
                  {dim.subdimensions.map((sub, si) => (
                    <div key={si} style={{ marginBottom: 6, paddingLeft: 8, borderLeft: `2px solid ${dim.color}30` }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text)" }}>{sub.name}</div>
                      <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 1 }}>
                        {T(sub.description, en)}
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginTop: 3 }}>
                        {sub.indicators.map((ind, ii) => (
                          <span key={ii} style={{
                            fontSize: 9, padding: "1px 6px", borderRadius: 4,
                            background: `${dim.color}10`, color: dim.color, ...mono,
                          }}>
                            {ind}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </Bx>
              ))}
            </div>
          )}

          {methTab === "weights" && (
            <div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>
                  {en ? "Normalization" : "Normalización"}
                </div>
                <div style={{ fontSize: 11, color: "var(--text3)", lineHeight: 1.6 }}>
                  {T(methodology.normalization, en)}
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>
                  {en ? "Peer Review" : "Revisión por Pares"}
                </div>
                <div style={{ fontSize: 11, color: "var(--text3)", lineHeight: 1.6 }}>
                  {T(methodology.peerReview, en)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>
                  {en ? "New in 2025" : "Nuevo en 2025"}
                </div>
                <div style={{ fontSize: 11, color: "var(--text3)", lineHeight: 1.6 }}>
                  {T(methodology.newIn2025, en)}
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
                {dimensions.map(dim => (
                  <div key={dim.id} style={{ flex: 1, minWidth: 120, textAlign: "center", padding: "12px 8px", borderRadius: 10, background: `${dim.color}08`, border: `1px solid ${dim.color}20` }}>
                    <div style={{ fontSize: 24, fontWeight: 900, color: dim.color, ...mono }}>{(dim.weight * 100).toFixed(0)}%</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: dim.color, marginTop: 2 }}>{dim.shortName}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {methTab === "sources" && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>
                {en ? `${methodology.dataSources.length} Data Sources` : `${methodology.dataSources.length} Fuentes de Datos`}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 6 }}>
                {methodology.dataSources.map((src, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 10px", background: "var(--surface)", borderRadius: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>{src.name}</span>
                    <span style={{ fontSize: 10, color: "var(--text3)" }}>{src.type}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </ScrollReveal>

      {/* ═══ SECTION 7: ATTRIBUTION ═══ */}
      <ScrollReveal>
        <Card style={{ marginBottom: 24, borderTop: `3px solid ${th.am}` }}>
          <div style={{ textAlign: "center", padding: "12px 0" }}>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--text3)", ...mono, marginBottom: 8 }}>
              {en ? "DATA SOURCE & ATTRIBUTION" : "FUENTE DE DATOS Y ATRIBUCIÓN"}
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>
              CEPAL (ECLAC) + CENIA Chile
            </div>
            <div style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.6, maxWidth: 500, margin: "0 auto 12px" }}>
              {en
                ? "ILIA — Latin American AI Index, 3rd Edition (2025). Published by CEPAL and CENIA Chile. All data points sourced from the official ILIA 2025 report."
                : "ILIA — Índice Latinoamericano de Inteligencia Artificial, 3a Edición (2025). Publicado por CEPAL y CENIA Chile. Todos los datos provienen del informe oficial ILIA 2025."}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              <Lnk href="https://indicelatam.cl/">
                {en ? "ILIA Official Site" : "Sitio Oficial ILIA"}
              </Lnk>
              <Lnk href="https://www.cepal.org/">CEPAL</Lnk>
              <Lnk href="https://www.cenia.cl/">CENIA</Lnk>
            </div>
            <div style={{ marginTop: 12, fontSize: 10, color: "var(--text3)", ...mono }}>
              {en
                ? "Citation: CEPAL/CENIA (2025). ILIA — Latin American AI Index, 3rd Edition."
                : "Cita: CEPAL/CENIA (2025). ILIA — Índice Latinoamericano de Inteligencia Artificial, 3a Edición."}
            </div>
          </div>
        </Card>
      </ScrollReveal>

    </div>
  );
}
