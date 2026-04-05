"use client";
import { useState, useRef, useEffect } from "react";
import { Card, SH, ScrollReveal, Tag, Bx, MiniStat, KeyInsight, FreshnessBadge, Flag } from "./ui";
import { Icon } from "./system/Icon";
import {
  AGENTIC_KEY_STATS, AI_EVOLUTION, AI_TAXONOMY, AGENT_CAPABILITIES,
  AUTONOMY_LEVELS, AGENTIC_PROTOCOLS, WORKFORCE_IMPACT, AGENTIC_USE_CASES,
  CR_AGENTIC_IMPACT, AGENTIC_TIMELINE, VIP_QUOTES, COMPANY_DEPLOYMENTS, COST_CALCULUS
} from "./agenticData";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Agentic AI Deep Intelligence v3
   Visually stunning rewrite — immersive hero, animated numbers,
   color-coded sections, glassmorphism, gradient timelines
   85+ sources · WEF, IMF, McKinsey, Gartner, Stanford, BCG
   ═══════════════════════════════════════════════════════════════ */

/* ── Resolve nested {en, es} bilingual objects ── */
function T(v, lang) {
  if (v && typeof v === "object" && !Array.isArray(v) && "en" in v && "es" in v) return lang ? v.en : v.es;
  return v;
}

const mono = { fontFamily: "'IBM Plex Mono',monospace" };
const display = { fontFamily: "var(--font-display,'Playfair Display',serif)" };

/* ── Animated number with IntersectionObserver trigger ── */
function AnimNum({ value, prefix = "", suffix = "", precision = 0, color, size = 36 }) {
  const [disp, setDisp] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold: 0.3 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!visible) return;
    let start = null; const dur = 1400;
    const ease = t => 1 - Math.pow(1 - t, 3);
    const anim = ts => { if (!start) start = ts; const p = Math.min((ts - start) / dur, 1); setDisp(value * ease(p)); if (p < 1) requestAnimationFrame(anim); };
    requestAnimationFrame(anim);
  }, [visible, value]);
  return <span ref={ref} style={{ fontSize: size, fontWeight: 800, color, ...mono }}>{prefix}{disp.toFixed(precision)}{suffix}</span>;
}

/* ── Premium animated hero background with constellation, mesh gradient, and glow ── */
function HeroBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => { const r = canvas.getBoundingClientRect(); canvas.width = r.width * dpr; canvas.height = r.height * dpr; ctx.scale(dpr, dpr); };
    resize();
    const COLORS = ["#22d3ee", "#6366f1", "#ec4899", "#10b981", "#818cf8", "#38bdf8"];
    const N = 70;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width / dpr, y: Math.random() * canvas.height / dpr,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: 1 + Math.random() * 2.5, color: COLORS[Math.floor(Math.random() * COLORS.length)],
      pulse: Math.random() * Math.PI * 2,
    }));
    function draw() {
      const W = canvas.width / dpr, H = canvas.height / dpr;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${(1 - dist / 130) * 0.15})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        p.pulse += 0.02; const glow = 0.5 + Math.sin(p.pulse) * 0.5; const r = p.r * (0.8 + glow * 0.4);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
        grad.addColorStop(0, p.color + Math.round(glow * 25).toString(16).padStart(2, "0"));
        grad.addColorStop(1, "transparent"); ctx.beginPath(); ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2); ctx.fillStyle = grad; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round((0.5 + glow * 0.5) * 255).toString(16).padStart(2, "0"); ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
      }
      frame = requestAnimationFrame(draw);
    }
    draw(); window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{ position: "absolute", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)", top: "-15%", left: "-10%", filter: "blur(60px)", animation: "agMesh1 12s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.2) 0%, transparent 70%)", bottom: "-20%", right: "-5%", filter: "blur(50px)", animation: "agMesh2 15s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)", top: "30%", right: "15%", filter: "blur(45px)", animation: "agMesh3 10s ease-in-out infinite" }} />
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)" }} />
      <style>{`
        @keyframes agMesh1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,30px) scale(1.2); } }
        @keyframes agMesh2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-30px,-25px) scale(1.15); } }
        @keyframes agMesh3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(20px,-20px) scale(0.9); } }
        @keyframes agPulse { 0%,100% { opacity:0.6; } 50% { opacity:1; } }
        @keyframes agFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes agGlow { 0%,100% { box-shadow: 0 0 20px rgba(34,211,238,0.2); } 50% { box-shadow: 0 0 40px rgba(34,211,238,0.4), 0 0 80px rgba(99,102,241,0.2); } }
        @keyframes agDotPulse { 0%,100% { box-shadow: 0 0 6px currentColor; } 50% { box-shadow: 0 0 18px currentColor, 0 0 30px currentColor; } }
        @keyframes agCountUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

/* ── Risk color helper ── */
function riskColor(v) { return v >= 0.85 ? "#dc2626" : v >= 0.7 ? "#ef4444" : v >= 0.5 ? "#f59e0b" : v >= 0.3 ? "#eab308" : "#10b981"; }
function riskLabel(v, en) { return v >= 0.85 ? (en ? "CRITICAL" : "CRITICO") : v >= 0.7 ? (en ? "HIGH" : "ALTO") : v >= 0.5 ? (en ? "MODERATE" : "MODERADO") : (en ? "LOW" : "BAJO"); }

/* ═══════════════ MAIN EXPORT ═══════════════ */
export function AgenticAI({ en, t }) {
  const th = t && t.cy ? t : { cy: "#2563eb", vi: "#6366f1", pk: "#ec4899", am: "#f59e0b", rd: "#ef4444", gn: "#10b981", or: "#f97316" };
  const heroStats = AGENTIC_KEY_STATS(en);
  const evolution = AI_EVOLUTION(en);
  const taxonomy = AI_TAXONOMY(en);
  const capabilities = AGENT_CAPABILITIES(en);
  const levels = AUTONOMY_LEVELS(en);
  const protocols = AGENTIC_PROTOCOLS(en);
  const workforce = WORKFORCE_IMPACT(en);
  const sectors = (workforce?.bySector || []).map((s, i) => {
    const riskMap = { "VERY HIGH": 0.9, "HIGH": 0.8, "MODERATE": 0.55, "LOW": 0.25 };
    const riskLevel = Object.keys(riskMap).find(k => (s.risk || "").toUpperCase().includes(k)) || "MODERATE";
    return { ...s, riskNum: riskMap[riskLevel] };
  });
  const useCases = AGENTIC_USE_CASES(en);
  const cr = CR_AGENTIC_IMPACT(en);
  const timeline = AGENTIC_TIMELINE(en);
  const [expandedSector, setExpandedSector] = useState(null);
  const sectorRef = useRef(null);
  const capColors = [th.cy, th.vi, th.pk, th.gn, th.am, th.or, th.rd];
  const evoColors = ["#64748b", "#3b82f6", "#8b5cf6", "#ec4899", "#22d3ee", "#10b981", "#f59e0b"];

  useEffect(() => {
    if (expandedSector !== null && sectorRef.current) {
      sectorRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [expandedSector]);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>

      {/* ═══ 1. IMMERSIVE HERO ═══ */}
      <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", marginBottom: 32, background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)", padding: "52px 24px 40px" }}>
        <HeroBackground />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          {/* Live badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 14px", background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.25)", borderRadius: 20, marginBottom: 18, animation: "agPulse 2s ease-in-out infinite" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22d3ee", display: "inline-block", boxShadow: "0 0 8px #22d3ee" }} />
            <span style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#22d3ee", ...mono }}>LIVE INTELLIGENCE</span>
          </div>
          {/* Title */}
          <h1 style={{ fontSize: "clamp(36px,7vw,56px)", fontWeight: 900, ...display, lineHeight: 1.05, marginBottom: 14, background: "linear-gradient(135deg, #22d3ee, #6366f1, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Agentic AI
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", maxWidth: 580, margin: "0 auto 30px", lineHeight: 1.7 }}>
            {en ? "Autonomous AI agents are reshaping how work gets done. From 170 million new jobs to 92 million displaced \u2014 the most significant workforce transformation in human history is underway." : "Los agentes de IA aut\u00f3nomos est\u00e1n transformando el trabajo. De 170 millones de nuevos empleos a 92 millones desplazados \u2014 la transformaci\u00f3n laboral m\u00e1s significativa de la historia est\u00e1 en marcha."}
          </p>
          {/* Glassmorphic stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, maxWidth: 660, margin: "0 auto" }}>
            {heroStats.slice(0, 4).map((s, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.06)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "16px 14px",
                animation: `agFloat ${3 + i * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.2}s`,
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
              }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: ["#22d3ee", "#6366f1", "#ec4899", "#10b981"][i], ...mono, lineHeight: 1.2 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 4, ...mono, lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FreshnessBadge date="March 31, 2026" en={en} />

      {/* ═══ 2. WHAT IS AGENTIC AI? ═══ */}
      <ScrollReveal>
        <SH color={th.cy} label={en ? "DEFINITION" : "DEFINICI\u00d3N"} title={en ? "What Is Agentic AI?" : "\u00bfQu\u00e9 es la IA Ag\u00e9ntica?"} desc={en ? "AI that doesn\u2019t just respond \u2014 it plans, acts, and adapts autonomously." : "IA que no solo responde \u2014 planifica, act\u00faa y se adapta aut\u00f3nomamente."} />
      </ScrollReveal>

      <ScrollReveal>
        <KeyInsight icon={"\ud83e\udd16"} color={th.cy} text={en ? "Agentic AI describes artificial intelligence systems that act as autonomous agents \u2014 capable of perceiving their environment, reasoning over complex goals, and taking purposeful action without constant human supervision." : "La IA Ag\u00e9ntica describe sistemas de IA que act\u00faan como agentes aut\u00f3nomos \u2014 capaces de percibir su entorno, razonar sobre objetivos complejos y tomar acci\u00f3n con prop\u00f3sito sin supervisi\u00f3n humana constante."} />
      </ScrollReveal>

      {/* The Key Shift callout */}
      <ScrollReveal>
        <div style={{ marginBottom: 24, padding: "24px 28px", borderRadius: 16, background: "linear-gradient(135deg, #0f172a, #1e1b4b)", border: "1px solid rgba(99,102,241,0.2)", textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: th.vi, ...mono, marginBottom: 10 }}>{en ? "THE KEY SHIFT" : "EL CAMBIO CLAVE"}</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", lineHeight: 1.5 }}>
            {en ? "Generative AI creates " : "La IA Generativa crea "}<span style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{en ? "content" : "contenido"}</span>.{" "}
            {en ? "Agentic AI creates " : "La IA Ag\u00e9ntica crea "}<span style={{ background: "linear-gradient(90deg, #22d3ee, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{en ? "outcomes" : "resultados"}</span>.
          </div>
        </div>
      </ScrollReveal>

      {/* Evolution Timeline */}
      <ScrollReveal>
        <Card accent={th.vi} style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="git-commit" size={16} style={{ color: th.vi }} />
            {en ? "AI Evolution Timeline" : "L\u00ednea de Tiempo de IA"}
          </div>
          <div style={{ position: "relative", paddingLeft: 32 }}>
            <div style={{ position: "absolute", left: 10, top: 4, bottom: 4, width: 3, borderRadius: 2, background: "linear-gradient(180deg, #64748b, #3b82f6, #8b5cf6, #ec4899, #22d3ee, #10b981, #f59e0b)" }} />
            {evolution.map((e, i) => {
              const c = evoColors[i] || th.vi;
              const isCurrent = (e.era || "").includes("2024") || (e.era || "").includes("Present") || (e.era || "").includes("Presente");
              return (
                <div key={i} style={{ position: "relative", marginBottom: i < evolution.length - 1 ? 18 : 0 }}>
                  <div style={{
                    position: "absolute", left: -26, top: 3, width: 14, height: 14, borderRadius: "50%",
                    background: isCurrent ? c : "var(--card)", border: `2.5px solid ${c}`,
                    boxShadow: isCurrent ? `0 0 14px ${c}` : "none",
                    animation: isCurrent ? "agDotPulse 2s ease-in-out infinite" : "none", color: c,
                  }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: c, ...mono, padding: "2px 8px", background: `${c}15`, borderRadius: 10 }}>{e.era}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: isCurrent ? c : "var(--text)" }}>{e.type}</span>
                    {isCurrent && <span style={{ fontSize: 8, fontWeight: 700, color: "#fff", background: c, padding: "1px 6px", borderRadius: 6, ...mono }}>NOW</span>}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.6 }}>{e.description}</div>
                </div>
              );
            })}
          </div>
        </Card>
      </ScrollReveal>

      {/* ═══ 3. AI TAXONOMY ═══ */}
      <ScrollReveal>
        <SH color={th.vi} label={en ? "TAXONOMY" : "TAXONOM\u00cdA"} title={en ? "AI Classification Spectrum" : "Espectro de Clasificaci\u00f3n de IA"} desc={en ? "From narrow pattern matching to aspirational general intelligence." : "Desde reconocimiento de patrones estrecho hasta inteligencia general aspiracional."} />
      </ScrollReveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))", gap: 10, marginBottom: 28 }}>
        {taxonomy.map((tx, i) => {
          const taxColors = ["#3b82f6", "#8b5cf6", "#22d3ee", "#10b981", "#64748b"];
          const c = taxColors[i] || th.vi;
          const isAgent = i === 2;
          return (
            <ScrollReveal key={i} delay={i * 60}>
              <Card accent={c} style={{ height: "100%", position: "relative", overflow: "hidden", border: isAgent ? `2px solid ${c}40` : undefined, background: isAgent ? `linear-gradient(135deg, ${c}08, transparent)` : undefined }}>
                {isAgent && <div style={{ position: "absolute", top: 0, right: 0, padding: "3px 10px", background: `linear-gradient(135deg, ${c}, ${th.vi})`, borderRadius: "0 0 0 10px", fontSize: 9, fontWeight: 800, color: "#fff", ...mono, letterSpacing: 1 }}>CURRENT</div>}
                <div style={{ fontSize: 14, fontWeight: 800, color: c, marginBottom: 6 }}>{tx.type}</div>
                <div style={{ fontSize: 10, color: c, ...mono, marginBottom: 8, padding: "2px 8px", background: `${c}12`, borderRadius: 10, display: "inline-block" }}>{tx.era}</div>
                <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 8, lineHeight: 1.5 }}>{tx.approach}</div>
                <div style={{ fontSize: 10, color: "var(--text3)", fontStyle: "italic", lineHeight: 1.5, marginBottom: 8 }}>{tx.examples}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: c, flexShrink: 0, boxShadow: isAgent ? `0 0 8px ${c}` : "none" }} />
                  <span style={{ fontSize: 10, color: "var(--text3)", lineHeight: 1.4 }}>{tx.status}</span>
                </div>
              </Card>
            </ScrollReveal>
          );
        })}
      </div>

      {/* ═══ 4. CAPABILITIES ═══ */}
      <ScrollReveal>
        <SH color={th.cy} label={en ? "CAPABILITIES" : "CAPACIDADES"} title={en ? "7 Core Capabilities" : "7 Capacidades Fundamentales"} desc={en ? "What makes an AI system truly agentic." : "Lo que hace a un sistema de IA verdaderamente ag\u00e9ntico."} />
      </ScrollReveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 28 }}>
        {capabilities.map((cap, i) => {
          const c = capColors[i % capColors.length];
          return (
            <ScrollReveal key={i} delay={i * 50}>
              <Card style={{ height: "100%", borderTop: `3px solid ${c}`, position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${c}20, ${c}08)`, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${c}25` }}>
                    <Icon name={cap.icon} size={18} style={{ color: c }} />
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{cap.name}</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.65 }}>{cap.description}</div>
              </Card>
            </ScrollReveal>
          );
        })}
      </div>

      {/* ═══ 5. AUTONOMY LEVELS ═══ */}
      <ScrollReveal>
        <SH color={th.am} label={en ? "AUTONOMY" : "AUTONOM\u00cdA"} title={en ? "5 Levels of AI Autonomy" : "5 Niveles de Autonom\u00eda IA"} desc={en ? "From human-directed to fully autonomous \u2014 echoing SAE self-driving levels." : "Desde dirigido por humanos hasta totalmente aut\u00f3nomo \u2014 similar a niveles SAE de conducci\u00f3n."} />
      </ScrollReveal>

      <ScrollReveal>
        <Card style={{ marginBottom: 28, overflow: "hidden" }}>
          {/* Horizontal stepper */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, padding: "0 4px", overflowX: "auto" }}>
            {levels.map((l, i) => {
              const stepColors = ["#64748b", "#3b82f6", "#f59e0b", "#22d3ee", "#10b981"];
              const c = stepColors[i];
              const isHigh = i >= 3;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                  <div style={{ textAlign: "center", flex: 1 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: "50%",
                      background: isHigh ? `linear-gradient(135deg, ${c}, ${c}cc)` : `${c}15`,
                      border: `2.5px solid ${c}`, display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 6px", boxShadow: isHigh ? `0 0 20px ${c}50` : "none",
                      animation: isHigh ? "agDotPulse 3s ease-in-out infinite" : "none", color: c,
                    }}>
                      <span style={{ fontSize: 12, fontWeight: 800, color: isHigh ? "#fff" : c, ...mono }}>{l.level}</span>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: isHigh ? c : "var(--text)" }}>{l.name}</div>
                    <div style={{ fontSize: 9, color: "var(--text3)", marginTop: 2, ...mono }}>{l.humanRole}</div>
                  </div>
                  {i < levels.length - 1 && <div style={{ height: 2, flex: 1, background: `linear-gradient(90deg, ${c}60, ${stepColors[i + 1]}60)`, minWidth: 12 }} />}
                </div>
              );
            })}
          </div>
          {/* Detail grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 8 }}>
            {levels.map((l, i) => {
              const stepColors = ["#64748b", "#3b82f6", "#f59e0b", "#22d3ee", "#10b981"];
              const c = stepColors[i];
              const isHigh = i >= 3;
              return (
                <Bx key={i} style={{ borderLeft: `3px solid ${c}`, background: isHigh ? `${c}08` : undefined }}>
                  <div style={{ fontSize: 10, color: "var(--text3)", lineHeight: 1.6 }}>{l.role}</div>
                  {isHigh && <Tag color={c}>{en ? "CURRENT AGENTS" : "AGENTES ACTUALES"}</Tag>}
                </Bx>
              );
            })}
          </div>
        </Card>
      </ScrollReveal>

      {/* ═══ 6. PROTOCOLS & STANDARDS ═══ */}
      <ScrollReveal>
        <SH color={th.gn} label={en ? "STANDARDS" : "EST\u00c1NDARES"} title={en ? "Protocols & Interoperability" : "Protocolos e Interoperabilidad"} desc={en ? "The open standards making the agentic ecosystem possible." : "Los est\u00e1ndares abiertos que hacen posible el ecosistema ag\u00e9ntico."} />
      </ScrollReveal>

      <ScrollReveal>
        <KeyInsight icon={"\ud83d\udd17"} color={th.gn} text={en ? "Without common standards, AI agents from different vendors cannot communicate. The AAIF ensures an agent built on Claude can work with tools built for GPT \u2014 mirroring the role of HTTP/TCP-IP in creating the open web." : "Sin est\u00e1ndares comunes, los agentes IA de distintos proveedores no pueden comunicarse. La AAIF garantiza que un agente de Claude funcione con herramientas de GPT \u2014 similar al rol de HTTP/TCP-IP en la web abierta."} />
      </ScrollReveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 12, marginBottom: 28 }}>
        {protocols.map((p, i) => {
          const pColors = [th.cy, th.gn, th.vi, th.pk, th.am];
          const c = pColors[i % pColors.length];
          return (
            <ScrollReveal key={i} delay={i * 60}>
              <Card accent={c} style={{ height: "100%" }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: c, ...mono, marginBottom: 2 }}>{p.name}</div>
                <div style={{ fontSize: 10, color: "var(--text3)", marginBottom: 10, ...mono }}>{p.org}</div>
                <div style={{ fontSize: 11, color: "var(--text3)", lineHeight: 1.6, marginBottom: 10 }}>{p.description}</div>
                <div style={{ fontSize: 11, color: "var(--text2)", lineHeight: 1.5, padding: "8px 10px", background: `${c}08`, borderRadius: 8, borderLeft: `3px solid ${c}` }}>
                  {p.stats}
                </div>
              </Card>
            </ScrollReveal>
          );
        })}
      </div>

      {/* ═══ 7. WORKFORCE IMPACT — THE SHOWPIECE ═══ */}
      <ScrollReveal>
        <SH color={th.rd} label={en ? "WORKFORCE IMPACT" : "IMPACTO LABORAL"} title={en ? "The Great Workforce Transformation" : "La Gran Transformaci\u00f3n Laboral"} desc={en ? "The most significant shift in employment since the Industrial Revolution." : "El cambio m\u00e1s significativo en empleo desde la Revoluci\u00f3n Industrial."} />
      </ScrollReveal>

      {/* Big animated numbers — THE HOOK */}
      <ScrollReveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 20 }}>
          <div style={{
            textAlign: "center", padding: "28px 16px", borderRadius: 16,
            background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(16,185,129,0.02))",
            border: "1px solid rgba(16,185,129,0.2)", position: "relative", overflow: "hidden"
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${th.gn}, transparent)` }} />
            <AnimNum value={170} prefix="+" suffix="M" color={th.gn} size={44} />
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginTop: 8 }}>{en ? "Jobs Created" : "Empleos Creados"}</div>
            <div style={{ fontSize: 10, color: "var(--text3)", ...mono, marginTop: 2 }}>{en ? "by 2030" : "para 2030"}</div>
            <div style={{ fontSize: 9, color: "var(--text3)", ...mono, marginTop: 4 }}>WEF 2025</div>
          </div>
          <div style={{
            textAlign: "center", padding: "28px 16px", borderRadius: 16,
            background: "linear-gradient(135deg, rgba(239,68,68,0.08), rgba(239,68,68,0.02))",
            border: "1px solid rgba(239,68,68,0.2)", position: "relative", overflow: "hidden"
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${th.rd}, transparent)` }} />
            <AnimNum value={92} prefix="-" suffix="M" color={th.rd} size={44} />
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginTop: 8 }}>{en ? "Jobs Displaced" : "Empleos Desplazados"}</div>
            <div style={{ fontSize: 10, color: "var(--text3)", ...mono, marginTop: 2 }}>{en ? "by 2030" : "para 2030"}</div>
            <div style={{ fontSize: 9, color: "var(--text3)", ...mono, marginTop: 4 }}>WEF 2025</div>
          </div>
          <div style={{
            textAlign: "center", padding: "28px 16px", borderRadius: 16,
            background: "linear-gradient(135deg, rgba(34,211,238,0.08), rgba(34,211,238,0.02))",
            border: "2px solid rgba(34,211,238,0.3)", position: "relative", overflow: "hidden",
            animation: "agGlow 4s ease-in-out infinite"
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${th.gn}, ${th.cy}, ${th.vi})` }} />
            <AnimNum value={78} prefix="+" suffix="M" color="#22d3ee" size={52} />
            <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text)", marginTop: 8, letterSpacing: 1 }}>{en ? "NET NEW JOBS" : "EMPLEOS NETOS NUEVOS"}</div>
            <div style={{ fontSize: 10, color: "var(--text3)", ...mono, marginTop: 4 }}>{en ? "World Economic Forum 2025" : "Foro Econ\u00f3mico Mundial 2025"}</div>
          </div>
        </div>
      </ScrollReveal>

      {/* Caveat */}
      <ScrollReveal>
        <div style={{ marginBottom: 20, padding: "12px 16px", borderRadius: 10, background: `${th.am}10`, border: `1px solid ${th.am}25`, display: "flex", alignItems: "center", gap: 10 }}>
          <Icon name="alert-triangle" size={16} style={{ color: th.am, flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: "var(--text2)", lineHeight: 1.5 }}>
            {workforce?.headline?.caveat || (en ? "Jobs being destroyed and created are NOT the same jobs." : "Los empleos que se destruyen y crean NO son los mismos empleos.")}
          </span>
        </div>
      </ScrollReveal>

      {/* Sector impact cards */}
      <ScrollReveal>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="bar-chart" size={16} style={{ color: th.rd }} />
          {en ? "Sector Impact Analysis" : "An\u00e1lisis de Impacto por Sector"}
        </div>
      </ScrollReveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12, marginBottom: 20 }} ref={sectorRef}>
        {sectors.map((s, i) => {
          const sectorColors = [th.cy, th.pk, th.or, th.vi, th.rd, th.am, th.gn];
          const c = sectorColors[i % sectorColors.length];
          const rc = riskColor(s.riskNum);
          return (
            <ScrollReveal key={i} delay={i * 50}>
              <Card accent={rc} style={{ cursor: "pointer" }} onClick={() => setExpandedSector(expandedSector === i ? null : i)}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Icon name={s.icon || "briefcase"} size={18} style={{ color: c }} />
                    <span style={{ fontSize: 14, fontWeight: 700 }}>{s.sector}</span>
                  </div>
                  <Tag color={rc}>{riskLabel(s.riskNum, en)}</Tag>
                </div>
                {/* Risk meter */}
                <div style={{ marginBottom: 10 }}>
                  <div style={{ height: 6, background: "var(--surface)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${s.riskNum * 100}%`, background: `linear-gradient(90deg, ${th.gn}, ${th.am}, ${th.rd})`, borderRadius: 3, transition: "width 1s ease" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
                    <span style={{ fontSize: 9, color: "var(--text3)", ...mono }}>{en ? "LOW" : "BAJO"}</span>
                    <span style={{ fontSize: 9, fontWeight: 700, color: rc, ...mono }}>{(s.riskNum * 100).toFixed(0)}%</span>
                    <span style={{ fontSize: 9, color: "var(--text3)", ...mono }}>{en ? "CRITICAL" : "CR\u00cdTICO"}</span>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: "var(--text3)", lineHeight: 1.5 }}>{s.jobsAffected}</div>
                {expandedSector === i && (
                  <div style={{ marginTop: 10, padding: "10px 12px", background: `${c}08`, borderRadius: 8, borderLeft: `3px solid ${c}`, fontSize: 11, color: "var(--text2)", lineHeight: 1.6 }}>
                    {s.impact}
                  </div>
                )}
                <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 6, display: "flex", alignItems: "center", gap: 4 }}>
                  {expandedSector === i ? "\u25BE" : "\u25B8"} <span style={{ borderBottom: "1px dotted var(--text3)" }}>{en ? "details" : "detalles"}</span>
                </div>
              </Card>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Prediction timeline row */}
      <ScrollReveal>
        <Card style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 14, ...mono, color: th.am, display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="calendar" size={14} style={{ color: th.am }} />
            {en ? "PREDICTION TIMELINE" : "L\u00cdNEA DE PREDICCIONES"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
            {(workforce?.byTimeframe || []).slice(0, 3).map((tf, i) => {
              const predColors = [th.am, th.or, th.cy];
              const c = predColors[i] || th.am;
              return (
                <Bx key={i} style={{ textAlign: "center", borderTop: `3px solid ${c}`, position: "relative" }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: c, ...mono }}>{tf.period}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text)", marginTop: 4 }}>{tf.title}</div>
                  <div style={{ fontSize: 10, color: "var(--text3)", lineHeight: 1.5, marginTop: 6 }}>{(tf.predictions || "").substring(0, 120)}{(tf.predictions || "").length > 120 ? "..." : ""}</div>
                </Bx>
              );
            })}
          </div>
        </Card>
      </ScrollReveal>

      {/* ═══ 8. USE CASES ═══ */}
      <ScrollReveal>
        <SH color={th.pk} label={en ? "USE CASES" : "CASOS DE USO"} title={en ? "Real-World Applications" : "Aplicaciones del Mundo Real"} desc={en ? "Agentic AI deployed in production today." : "IA Ag\u00e9ntica desplegada en producci\u00f3n hoy."} />
      </ScrollReveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginBottom: 28 }}>
        {useCases.map((u, i) => {
          const ucColors = [th.cy, th.gn, th.pk, th.vi, th.am, th.pk, th.or, th.gn, th.cy];
          const c = ucColors[i % ucColors.length];
          return (
            <ScrollReveal key={i} delay={i * 40}>
              <Card accent={c} style={{ height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <span style={{ padding: "2px 8px", background: `${c}15`, color: c, borderRadius: 8, fontSize: 10, fontWeight: 700, ...mono }}>{u.sector}</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>{u.title}</div>
                <div style={{ fontSize: 11, color: "var(--text3)", lineHeight: 1.6, marginBottom: 10 }}>{u.description}</div>
                <div style={{ padding: "8px 10px", background: `${c}08`, borderRadius: 8, borderLeft: `3px solid ${c}` }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: c, ...mono, marginBottom: 2 }}>{en ? "IMPACT" : "IMPACTO"}</div>
                  <div style={{ fontSize: 10, color: "var(--text2)", lineHeight: 1.5 }}>{u.impact}</div>
                </div>
                <div style={{ fontSize: 9, color: "var(--text3)", ...mono, marginTop: 6 }}>{u.source}</div>
              </Card>
            </ScrollReveal>
          );
        })}
      </div>

      {/* ═══ 9. COSTA RICA IMPACT ═══ */}
      <ScrollReveal>
        <SH color={th.or} label="COSTA RICA" title={en ? "Costa Rica Impact Analysis" : "An\u00e1lisis de Impacto Costa Rica"} desc={en ? "40% of emerging market jobs exposed \u2014 including Costa Rica." : "40% de empleos en mercados emergentes expuestos \u2014 incluyendo Costa Rica."} />
      </ScrollReveal>

      {/* CR exposure stat */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16, background: "linear-gradient(135deg, rgba(249,115,22,0.08), transparent)", border: "1px solid rgba(249,115,22,0.18)", borderRadius: 16, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${th.or}, ${th.am}, ${th.rd})` }} />
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", padding: "4px 0" }}>
            <div style={{ textAlign: "center", minWidth: 100 }}>
              <Flag code="CR" size={36} />
              <div style={{ marginTop: 10 }}>
                <AnimNum value={40} suffix="%" color={th.or} size={48} />
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text)", marginTop: 4, ...mono }}>{en ? "JOB EXPOSURE" : "EXPOSICI\u00d3N LABORAL"}</div>
              <div style={{ fontSize: 9, color: "var(--text3)", ...mono }}>IMF 2024</div>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              {/* Risk cards */}
              {(cr?.risks || []).slice(0, 2).map((r, i) => (
                <div key={i} style={{ marginBottom: 10, padding: "10px 12px", borderRadius: 10, border: `1px solid ${th.rd}25`, borderLeft: `3px solid ${th.rd}`, background: `${th.rd}06` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <Icon name={r.icon || "alert-circle"} size={14} style={{ color: th.rd }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: th.rd }}>{r.area}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text3)", lineHeight: 1.5 }}>{r.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </ScrollReveal>

      {/* Opportunities */}
      <ScrollReveal>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="trending-up" size={16} style={{ color: th.gn }} />
          {en ? "Strategic Opportunities" : "Oportunidades Estrat\u00e9gicas"}
        </div>
      </ScrollReveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, marginBottom: 16 }}>
        {(cr?.opportunities || []).map((o, i) => (
          <ScrollReveal key={i} delay={i * 50}>
            <Card style={{ height: "100%", borderLeft: `3px solid ${th.gn}`, background: `${th.gn}06` }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: th.gn }}>{o.title}</div>
              <div style={{ fontSize: 11, color: "var(--text3)", lineHeight: 1.6 }}>{o.detail}</div>
            </Card>
          </ScrollReveal>
        ))}
      </div>

      {/* ENIA Gaps */}
      <ScrollReveal>
        <Card accent={th.am} style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="alert-triangle" size={14} style={{ color: th.am }} />
            {en ? "ENIA-CR Strategy Gaps" : "Brechas de Estrategia ENIA-CR"}
          </div>
          {(cr?.eniaGaps || []).map((g, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7, padding: "6px 10px", borderRadius: 8, background: `${th.am}08` }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: th.am, flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: "var(--text2)", lineHeight: 1.4 }}>{g}</span>
            </div>
          ))}
        </Card>
      </ScrollReveal>

      {/* ═══ 10. TIMELINE ═══ */}
      <ScrollReveal>
        <SH color={th.vi} label={en ? "TIMELINE" : "L\u00cdNEA DE TIEMPO"} title={en ? "Agentic AI Timeline" : "L\u00ednea de Tiempo de IA Ag\u00e9ntica"} desc={en ? "Key milestones from the spark to the horizon." : "Hitos clave desde la chispa hasta el horizonte."} />
      </ScrollReveal>

      <ScrollReveal>
        <Card style={{ marginBottom: 28, position: "relative", paddingLeft: 34 }}>
          <div style={{ position: "absolute", left: 18, top: 20, bottom: 20, width: 3, borderRadius: 2, background: "linear-gradient(180deg, #6366f1, #22d3ee, #ec4899, #f59e0b, #10b981, #64748b)" }} />
          {timeline.slice(0, 15).map((t2, i) => {
            const tlColors = [th.vi, th.cy, th.pk, th.am, th.gn, th.or, th.rd];
            const c = tlColors[i % tlColors.length];
            const is2026 = String(t2.date || "").includes("2026");
            return (
              <div key={i} style={{ position: "relative", marginBottom: 18 }}>
                <div style={{
                  position: "absolute", left: -23, top: 2, width: 14, height: 14, borderRadius: "50%",
                  background: is2026 ? c : "var(--card)", border: `2.5px solid ${c}`,
                  boxShadow: is2026 ? `0 0 14px ${c}` : "none",
                  animation: is2026 ? "agDotPulse 2.5s ease-in-out infinite" : "none", color: c,
                }} />
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: c, ...mono, whiteSpace: "nowrap" }}>{t2.date}</span>
                  {is2026 && <span style={{ fontSize: 8, fontWeight: 800, color: "#fff", background: `linear-gradient(135deg, ${c}, ${th.vi})`, padding: "1px 7px", borderRadius: 6, ...mono, letterSpacing: 1 }}>NOW</span>}
                </div>
                <div style={{ fontSize: 12, color: "var(--text)", fontWeight: 600, lineHeight: 1.4 }}>{T(t2.event, en)}</div>
                <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 2 }}>{T(t2.significance, en)}</div>
                <div style={{ fontSize: 9, color: "var(--text3)", ...mono, marginTop: 2 }}>{t2.source}</div>
              </div>
            );
          })}
        </Card>
      </ScrollReveal>

      {/* ═══ 11. ATTRIBUTION ═══ */}
      <ScrollReveal>
        <Card style={{ marginBottom: 20, borderTop: "3px solid var(--border)" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--text3)", ...mono, marginBottom: 12 }}>
            {en ? "SOURCES & ATTRIBUTION" : "FUENTES Y ATRIBUCI\u00d3N"}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {["WEF Future of Jobs 2025", "McKinsey Nov 2025", "IMF AI & Jobs 2024", "Stanford HAI 2025", "Gartner 2025-2026", "Anthropic Agentic Trends", "BCG AI Agents 2026", "ILO GenAI Impact 2025", "PwC AI Jobs Barometer", "Deloitte State of AI 2025", "Tufts AI Jobs Risk 2026", "Linux Foundation AAIF"].map((s, i) => {
              const pillColors = [th.cy, th.vi, th.pk, th.am, th.gn, th.or, th.rd];
              const c = pillColors[i % pillColors.length];
              return (
                <span key={i} style={{ padding: "3px 10px", background: `${c}10`, border: `1px solid ${c}20`, borderRadius: 16, fontSize: 10, color: "var(--text3)", ...mono }}>
                  {s}
                </span>
              );
            })}
          </div>
          <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 14, ...mono, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: th.gn, display: "inline-block" }} />
            {en ? "85+ sources compiled | Last updated: March 31, 2026" : "85+ fuentes compiladas | \u00daltima actualizaci\u00f3n: 31 de marzo, 2026"}
          </div>
        </Card>
      </ScrollReveal>

    </div>
  );
}

export default AgenticAI;
