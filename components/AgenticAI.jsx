"use client";
import { useState, useRef, useEffect } from "react";
import { Card, SH, ScrollReveal, Tag, Bx, MiniStat, KeyInsight, FreshnessBadge, Flag } from "./ui";
import { Icon } from "./system/Icon";
import {
  AGENTIC_HERO_STATS, AI_EVOLUTION, AI_TAXONOMY, CAPABILITIES,
  AUTONOMY_LEVELS, PROTOCOLS, SECTOR_IMPACT, USE_CASES,
  CR_IMPACT, TIMELINE_EVENTS, SOURCES
} from "./agenticData";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Agentic AI Deep Intelligence
   The impact of autonomous AI agents on jobs and the world
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

/* ── Premium animated hero background with constellation ── */
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
      `}</style>
    </div>
  );
}

/* ── Risk color helper ── */
function riskColor(v) { return v >= 0.85 ? "#dc2626" : v >= 0.7 ? "#ef4444" : v >= 0.5 ? "#f59e0b" : v >= 0.3 ? "#eab308" : "#10b981"; }
function riskLabel(v, en) { return v >= 0.85 ? (en ? "CRITICAL" : "CRÍTICO") : v >= 0.7 ? (en ? "HIGH" : "ALTO") : v >= 0.5 ? (en ? "MODERATE" : "MODERADO") : (en ? "LOW" : "BAJO"); }

/* ═══════════════ MAIN EXPORT ═══════════════ */
export function AgenticAI({ en, t }) {
  const th = t && t.cy ? t : { cy: "#2563eb", vi: "#6366f1", pk: "#ec4899", am: "#f59e0b", rd: "#ef4444", gn: "#10b981", or: "#f97316" };
  const heroStats = AGENTIC_HERO_STATS(en);
  const evolution = AI_EVOLUTION(en);
  const taxonomy = AI_TAXONOMY(en);
  const capabilities = CAPABILITIES(en);
  const levels = AUTONOMY_LEVELS(en);
  const protocols = PROTOCOLS(en);
  const sectors = SECTOR_IMPACT(en);
  const useCases = USE_CASES(en);
  const cr = CR_IMPACT(en);
  const timeline = TIMELINE_EVENTS(en);
  const [expandedSector, setExpandedSector] = useState(null);
  const sectorRef = useRef(null);

  useEffect(() => {
    if (expandedSector !== null && sectorRef.current) {
      sectorRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [expandedSector]);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>

      {/* ═══ 1. IMMERSIVE HERO ═══ */}
      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", marginBottom: 32, background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)", padding: "48px 24px 36px" }}>
        <HeroBackground />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          {/* Live badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 14px", background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.25)", borderRadius: 20, marginBottom: 16, animation: "agPulse 2s ease-in-out infinite" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22d3ee", display: "inline-block", boxShadow: "0 0 8px #22d3ee" }} />
            <span style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#22d3ee", ...mono }}>LIVE INTELLIGENCE</span>
          </div>
          {/* Title */}
          <h1 style={{ fontSize: "clamp(32px,6vw,52px)", fontWeight: 900, ...display, lineHeight: 1.1, marginBottom: 12, background: "linear-gradient(135deg, #22d3ee, #6366f1, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Agentic AI
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", maxWidth: 560, margin: "0 auto 28px", lineHeight: 1.7 }}>
            {en ? "Autonomous AI agents are reshaping how work gets done. From 170 million new jobs to 92 million displaced \u2014 the most significant workforce transformation in human history is underway." : "Los agentes de IA aut\u00f3nomos est\u00e1n transformando el trabajo. De 170 millones de nuevos empleos a 92 millones desplazados \u2014 la transformaci\u00f3n laboral m\u00e1s significativa de la historia est\u00e1 en marcha."}
          </p>
          {/* Floating stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, maxWidth: 640, margin: "0 auto" }}>
            {heroStats.map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "14px 12px", animation: `agFloat ${3 + i * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#22d3ee", ...mono }}>
                  {s.prefix || ""}{s.value}{s.suffix || ""}
                </div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", marginTop: 2, ...mono }}>{s.label}</div>
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
        <KeyInsight icon="\u{1F4A1}" color={th.cy} text={en ? "While generative AI creates content, agentic AI creates outcomes. It doesn\u2019t just respond to prompts; it develops strategies, executes plans, and adapts to changing circumstances." : "Mientras la IA generativa crea contenido, la IA ag\u00e9ntica crea resultados. No solo responde a prompts; desarrolla estrategias, ejecuta planes y se adapta."} />
      </ScrollReveal>

      {/* Evolution Timeline */}
      <ScrollReveal>
        <Card accent={th.vi} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>{en ? "AI Evolution Timeline" : "L\u00ednea de Tiempo de IA"}</div>
          <div style={{ position: "relative", paddingLeft: 28 }}>
            <div style={{ position: "absolute", left: 9, top: 4, bottom: 4, width: 2, background: "linear-gradient(180deg, #6366f1, #22d3ee, #10b981)" }} />
            {evolution.map((e, i) => (
              <div key={i} style={{ position: "relative", marginBottom: 16, paddingBottom: i < evolution.length - 1 ? 0 : 0 }}>
                <div style={{ position: "absolute", left: -22, top: 4, width: 12, height: 12, borderRadius: "50%", background: e.active ? e.color : "var(--card)", border: `2px solid ${e.color}`, boxShadow: e.active ? `0 0 12px ${e.color}` : "none" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <Tag color={e.color}>{e.era}</Tag>
                  <span style={{ fontSize: 13, fontWeight: 700, color: e.active ? e.color : "var(--text)" }}>{e.type}</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.6 }}>{e.desc}</div>
              </div>
            ))}
          </div>
        </Card>
      </ScrollReveal>

      {/* The Key Shift callout */}
      <ScrollReveal>
        <div style={{ marginBottom: 24, padding: "20px 24px", borderRadius: 14, background: `linear-gradient(135deg, ${th.vi}10, ${th.cy}10)`, border: `1px solid ${th.vi}25`, textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: th.vi, ...mono, marginBottom: 8 }}>{en ? "THE KEY SHIFT" : "EL CAMBIO CLAVE"}</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "var(--text)", lineHeight: 1.4 }}>
            {en ? "Generative AI creates " : "La IA Generativa crea "}<span style={{ color: th.vi }}>{en ? "content" : "contenido"}</span>.{" "}
            {en ? "Agentic AI creates " : "La IA Ag\u00e9ntica crea "}<span style={{ color: th.cy }}>{en ? "outcomes" : "resultados"}</span>.
          </div>
        </div>
      </ScrollReveal>

      {/* ═══ 3. AI TAXONOMY ═══ */}
      <ScrollReveal>
        <SH color={th.vi} label={en ? "TAXONOMY" : "TAXONOM\u00cdA"} title={en ? "AI Classification Spectrum" : "Espectro de Clasificaci\u00f3n de IA"} desc={en ? "From narrow pattern matching to aspirational general intelligence." : "Desde reconocimiento de patrones estrecho hasta inteligencia general aspiracional."} />
      </ScrollReveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10, marginBottom: 28 }}>
        {taxonomy.map((t2, i) => (
          <ScrollReveal key={i} delay={i * 60}>
            <Card accent={t2.color} style={{ height: "100%", position: "relative", overflow: "hidden" }}>
              {t2.highlight && <div style={{ position: "absolute", top: 0, right: 0, padding: "2px 8px", background: t2.color, borderRadius: "0 0 0 8px", fontSize: 9, fontWeight: 700, color: "#fff", ...mono }}>{en ? "NOW" : "AHORA"}</div>}
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <Icon name={t2.icon} size={16} style={{ color: t2.color }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: t2.color }}>{t2.type}</span>
              </div>
              <div style={{ fontSize: 10, color: "var(--text3)", ...mono, marginBottom: 4 }}>{t2.era}</div>
              <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 6 }}>{t2.approach}</div>
              <div style={{ fontSize: 10, color: "var(--text3)", lineHeight: 1.5 }}>{t2.examples}</div>
              <Tag color={t2.color}>{t2.status}</Tag>
            </Card>
          </ScrollReveal>
        ))}
      </div>

      {/* ═══ 4. CAPABILITIES ═══ */}
      <ScrollReveal>
        <SH color={th.cy} label={en ? "CAPABILITIES" : "CAPACIDADES"} title={en ? "7 Core Capabilities" : "7 Capacidades Fundamentales"} desc={en ? "What makes an AI system truly agentic." : "Lo que hace a un sistema de IA verdaderamente ag\u00e9ntico."} />
      </ScrollReveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 28 }}>
        {capabilities.map((c, i) => (
          <ScrollReveal key={i} delay={i * 50}>
            <Card accent={c.color} style={{ height: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: `${c.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={c.icon} size={16} style={{ color: c.color }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700 }}>{c.name}</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.6 }}>{c.desc}</div>
            </Card>
          </ScrollReveal>
        ))}
      </div>

      {/* ═══ 5. AUTONOMY LEVELS ═══ */}
      <ScrollReveal>
        <SH color={th.am} label={en ? "AUTONOMY" : "AUTONOM\u00cdA"} title={en ? "5 Levels of AI Autonomy" : "5 Niveles de Autonom\u00eda IA"} desc={en ? "From human-directed to fully autonomous \u2014 echoing SAE self-driving levels." : "Desde dirigido por humanos hasta totalmente aut\u00f3nomo \u2014 similar a niveles SAE de conducci\u00f3n."} />
      </ScrollReveal>

      <ScrollReveal>
        <Card style={{ marginBottom: 28, overflow: "hidden" }}>
          {/* Horizontal stepper bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, padding: "0 4px", overflowX: "auto" }}>
            {levels.map((l, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: l.current ? l.color : `${l.color}20`, border: `2px solid ${l.color}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px", boxShadow: l.current ? `0 0 16px ${l.color}50` : "none" }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: l.current ? "#fff" : l.color, ...mono }}>{l.level}</span>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: l.current ? l.color : "var(--text)" }}>{l.name}</div>
                  <div style={{ fontSize: 9, color: "var(--text3)", marginTop: 2, ...mono }}>{l.human}</div>
                </div>
                {i < levels.length - 1 && <div style={{ height: 2, flex: 1, background: `linear-gradient(90deg, ${l.color}50, ${levels[i + 1].color}50)`, minWidth: 12 }} />}
              </div>
            ))}
          </div>
          {/* Detail row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 8 }}>
            {levels.map((l, i) => (
              <Bx key={i} style={{ borderLeft: `3px solid ${l.color}`, background: l.current ? `${l.color}08` : undefined }}>
                <div style={{ fontSize: 10, color: "var(--text3)", lineHeight: 1.6 }}>{l.desc}</div>
                {l.current && <Tag color={l.color}>{en ? "CURRENT" : "ACTUAL"}</Tag>}
              </Bx>
            ))}
          </div>
        </Card>
      </ScrollReveal>

      {/* ═══ 6. PROTOCOLS & STANDARDS ═══ */}
      <ScrollReveal>
        <SH color={th.gn} label={en ? "STANDARDS" : "EST\u00c1NDARES"} title={en ? "Protocols & Interoperability" : "Protocolos e Interoperabilidad"} desc={en ? "The open standards making the agentic ecosystem possible." : "Los est\u00e1ndares abiertos que hacen posible el ecosistema ag\u00e9ntico."} />
      </ScrollReveal>

      <ScrollReveal>
        <KeyInsight icon="\u{1F517}" color={th.gn} text={en ? "Without common standards, AI agents from different vendors cannot communicate. The AAIF ensures an agent built on Claude can work with tools built for GPT \u2014 mirroring the role of HTTP/TCP-IP in creating the open web." : "Sin est\u00e1ndares comunes, los agentes IA de distintos proveedores no pueden comunicarse. La AAIF garantiza que un agente de Claude funcione con herramientas de GPT \u2014 similar al rol de HTTP/TCP-IP en la web abierta."} />
      </ScrollReveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 28 }}>
        {protocols.map((p, i) => (
          <ScrollReveal key={i} delay={i * 60}>
            <Card accent={p.color} style={{ height: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${p.color}12`, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${p.color}25` }}>
                  <Icon name={p.icon} size={18} style={{ color: p.color }} />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: p.color, ...mono }}>{p.name}</div>
                  <div style={{ fontSize: 10, color: "var(--text3)" }}>{p.org}</div>
                </div>
              </div>
              <div style={{ fontSize: 11, color: "var(--text3)", lineHeight: 1.6, marginBottom: 10 }}>{p.desc}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: p.color, ...mono }}>{p.stat}</span>
                <span style={{ fontSize: 10, color: "var(--text3)", ...mono }}>{p.statLabel}</span>
              </div>
            </Card>
          </ScrollReveal>
        ))}
      </div>

      {/* ═══ 7. WORKFORCE IMPACT — THE SHOWPIECE ═══ */}
      <ScrollReveal>
        <SH color={th.rd} label={en ? "WORKFORCE IMPACT" : "IMPACTO LABORAL"} title={en ? "The Great Workforce Transformation" : "La Gran Transformaci\u00f3n Laboral"} desc={en ? "The most significant shift in employment since the Industrial Revolution." : "El cambio m\u00e1s significativo en empleo desde la Revoluci\u00f3n Industrial."} />
      </ScrollReveal>

      {/* Big animated numbers */}
      <ScrollReveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 20 }}>
          <Card style={{ textAlign: "center", background: "linear-gradient(135deg, rgba(16,185,129,0.06), transparent)", border: "1px solid rgba(16,185,129,0.15)" }}>
            <AnimNum value={170} prefix="+" suffix="M" color={th.gn} />
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text2)", marginTop: 4 }}>{en ? "Jobs Created by 2030" : "Empleos Creados para 2030"}</div>
            <div style={{ fontSize: 10, color: "var(--text3)", ...mono }}>WEF</div>
          </Card>
          <Card style={{ textAlign: "center", background: "linear-gradient(135deg, rgba(239,68,68,0.06), transparent)", border: "1px solid rgba(239,68,68,0.15)" }}>
            <AnimNum value={92} prefix="-" suffix="M" color={th.rd} />
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text2)", marginTop: 4 }}>{en ? "Jobs Displaced by 2030" : "Empleos Desplazados para 2030"}</div>
            <div style={{ fontSize: 10, color: "var(--text3)", ...mono }}>WEF</div>
          </Card>
          <Card style={{ textAlign: "center", background: "linear-gradient(135deg, rgba(34,211,238,0.06), transparent)", border: "1px solid rgba(34,211,238,0.15)", animation: "agGlow 4s ease-in-out infinite" }}>
            <AnimNum value={78} prefix="+" suffix="M" color={th.cy} size={42} />
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginTop: 4 }}>{en ? "NET NEW JOBS" : "EMPLEOS NETOS NUEVOS"}</div>
            <div style={{ fontSize: 10, color: "var(--text3)", ...mono }}>{en ? "World Economic Forum 2025" : "Foro Econ\u00f3mico Mundial 2025"}</div>
          </Card>
        </div>
      </ScrollReveal>

      {/* Additional stats bar */}
      <ScrollReveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 8, marginBottom: 20 }}>
          <MiniStat label={en ? "GLOBAL EXPOSURE" : "EXPOSICI\u00d3N GLOBAL"} value="40%" color={th.am} mono />
          <MiniStat label={en ? "US VULNERABLE" : "EE.UU. VULNERABLE"} value="9.3M" color={th.rd} mono />
          <MiniStat label={en ? "SKILLS CHANGE" : "CAMBIO SKILLS"} value="39%" color={th.vi} mono />
          <MiniStat label={en ? "HOURS SAVED/WK" : "HORAS AHORR./SEM"} value="78M" color={th.gn} mono />
        </div>
      </ScrollReveal>

      {/* Sector impact cards with risk meters */}
      <ScrollReveal>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>{en ? "Sector Impact Analysis" : "An\u00e1lisis de Impacto por Sector"}</div>
      </ScrollReveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12, marginBottom: 20 }} ref={sectorRef}>
        {sectors.map((s, i) => {
          const rc = riskColor(s.risk);
          return (
            <ScrollReveal key={i} delay={i * 50}>
              <Card accent={rc} style={{ cursor: "pointer" }} onClick={() => setExpandedSector(expandedSector === i ? null : i)}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Icon name={s.icon} size={18} style={{ color: s.color }} />
                    <span style={{ fontSize: 14, fontWeight: 700 }}>{s.sector}</span>
                  </div>
                  <Tag color={rc}>{riskLabel(s.risk, en)}</Tag>
                </div>
                {/* Risk meter */}
                <div style={{ marginBottom: 8 }}>
                  <div style={{ height: 6, background: "var(--surface)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${s.risk * 100}%`, background: `linear-gradient(90deg, ${th.gn}, ${th.am}, ${th.rd})`, borderRadius: 3, transition: "width 1s ease" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
                    <span style={{ fontSize: 9, color: "var(--text3)", ...mono }}>{en ? "LOW" : "BAJO"}</span>
                    <span style={{ fontSize: 9, color: "var(--text3)", ...mono }}>{(s.risk * 100).toFixed(0)}%</span>
                    <span style={{ fontSize: 9, color: "var(--text3)", ...mono }}>{en ? "CRITICAL" : "CR\u00cdTICO"}</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontSize: 20, fontWeight: 800, color: s.color, ...mono }}>{s.stat}</span>
                  <span style={{ fontSize: 10, color: "var(--text3)" }}>{s.statDesc}</span>
                </div>
                <div style={{ fontSize: 10, color: "var(--text3)", ...mono, marginTop: 6 }}>{s.riskLabel}</div>
                <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 4, display: "flex", alignItems: "center", gap: 3 }}>
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
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 12, ...mono, color: th.am }}>{en ? "PREDICTION TIMELINE" : "L\u00cdNEA DE PREDICCIONES"}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
            {[
              { year: "2026", stat: "40%", desc: en ? "enterprise apps embed agents" : "apps empresariales con agentes", src: "Gartner" },
              { year: "2028", stat: "15%", desc: en ? "workplace decisions by AI" : "decisiones laborales por IA", src: "Gartner" },
              { year: "2030", stat: "+78M", desc: en ? "net new jobs worldwide" : "empleos netos nuevos mundial", src: "WEF" },
            ].map((p, i) => (
              <Bx key={i} style={{ textAlign: "center", borderTop: `2px solid ${th.am}` }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: th.am, ...mono }}>{p.year}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", ...mono }}>{p.stat}</div>
                <div style={{ fontSize: 10, color: "var(--text3)", lineHeight: 1.5 }}>{p.desc}</div>
                <div style={{ fontSize: 9, color: "var(--text3)", ...mono, marginTop: 4 }}>{p.src}</div>
              </Bx>
            ))}
          </div>
        </Card>
      </ScrollReveal>

      {/* ═══ 8. USE CASES ═══ */}
      <ScrollReveal>
        <SH color={th.pk} label={en ? "USE CASES" : "CASOS DE USO"} title={en ? "Real-World Applications" : "Aplicaciones del Mundo Real"} desc={en ? "Agentic AI deployed in production today." : "IA Ag\u00e9ntica desplegada en producci\u00f3n hoy."} />
      </ScrollReveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginBottom: 28 }}>
        {useCases.map((u, i) => (
          <ScrollReveal key={i} delay={i * 40}>
            <Card accent={u.color} style={{ height: "100%" }}>
              <Tag color={u.color}>{u.sector}</Tag>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 8, marginBottom: 6 }}>{u.title}</div>
              <div style={{ fontSize: 11, color: "var(--text3)", lineHeight: 1.6, marginBottom: 10 }}>{u.desc}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: "auto" }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: u.color, ...mono }}>{u.metric}</span>
              </div>
            </Card>
          </ScrollReveal>
        ))}
      </div>

      {/* ═══ 9. COSTA RICA IMPACT ═══ */}
      <ScrollReveal>
        <SH color={th.or} label={en ? "COSTA RICA" : "COSTA RICA"} title={en ? "Costa Rica Impact Analysis" : "An\u00e1lisis de Impacto Costa Rica"} desc={en ? "40% of emerging market jobs exposed \u2014 including Costa Rica." : "40% de empleos en mercados emergentes expuestos \u2014 incluyendo Costa Rica."} />
      </ScrollReveal>

      {/* CR exposure stat */}
      <ScrollReveal>
        <Card style={{ marginBottom: 16, background: "linear-gradient(135deg, rgba(249,115,22,0.06), transparent)", border: "1px solid rgba(249,115,22,0.15)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div style={{ textAlign: "center" }}>
              <Flag code="CR" size={32} />
              <div style={{ marginTop: 8 }}>
                <AnimNum value={40} suffix="%" color={th.or} size={42} />
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text2)", marginTop: 4, ...mono }}>{en ? "JOB EXPOSURE" : "EXPOSICI\u00d3N LABORAL"}</div>
              <div style={{ fontSize: 9, color: "var(--text3)", ...mono }}>IMF 2024</div>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>{en ? "BPO & Nearshoring Risk" : "Riesgo BPO y Nearshoring"}</div>
              <Bx>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 20, fontWeight: 800, color: th.rd, ...mono }}>{cr.bpoGdp}</span>
                  <span style={{ fontSize: 11, color: "var(--text3)" }}>{en ? "of GDP from business services" : "del PIB en servicios empresariales"}</span>
                </div>
                <div style={{ fontSize: 11, color: "var(--text3)", lineHeight: 1.6 }}>{cr.bpoRisk}</div>
              </Bx>
              <div style={{ fontSize: 12, fontWeight: 600, marginTop: 10, color: th.am, ...mono }}>
                {en ? `CRITICAL WINDOW: ${cr.window}` : `VENTANA CR\u00cdTICA: ${cr.window}`}
              </div>
            </div>
          </div>
        </Card>
      </ScrollReveal>

      {/* Opportunities */}
      <ScrollReveal>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>{en ? "Strategic Opportunities" : "Oportunidades Estrat\u00e9gicas"}</div>
      </ScrollReveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, marginBottom: 16 }}>
        {cr.opportunities.map((o, i) => (
          <ScrollReveal key={i} delay={i * 50}>
            <Card accent={th.gn} style={{ height: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <Icon name={o.icon} size={16} style={{ color: th.gn }} />
                <span style={{ fontSize: 12, fontWeight: 700 }}>{o.title}</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--text3)", lineHeight: 1.6 }}>{o.desc}</div>
            </Card>
          </ScrollReveal>
        ))}
      </div>

      {/* ENIA Gaps */}
      <ScrollReveal>
        <Card accent={th.rd} style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>{en ? "ENIA-CR Gaps Identified" : "Brechas Identificadas en ENIA-CR"}</div>
          {cr.eniaGaps.map((g, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: th.rd, flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: "var(--text3)" }}>{g}</span>
            </div>
          ))}
        </Card>
      </ScrollReveal>

      {/* ═══ 10. TIMELINE ═══ */}
      <ScrollReveal>
        <SH color={th.vi} label={en ? "TIMELINE" : "L\u00cdNEA DE TIEMPO"} title={en ? "Agentic AI Timeline" : "L\u00ednea de Tiempo de IA Ag\u00e9ntica"} desc={en ? "Key milestones from the spark to the horizon." : "Hitos clave desde la chispa hasta el horizonte."} />
      </ScrollReveal>

      <ScrollReveal>
        <Card style={{ marginBottom: 28, position: "relative", paddingLeft: 32 }}>
          <div style={{ position: "absolute", left: 18, top: 20, bottom: 20, width: 2, background: "linear-gradient(180deg, #6366f1, #22d3ee, #ec4899, #f59e0b, #10b981, #64748b)" }} />
          {timeline.map((t2, i) => (
            <div key={i} style={{ position: "relative", marginBottom: 24 }}>
              <div style={{ position: "absolute", left: -22, top: 2, width: 14, height: 14, borderRadius: "50%", background: t2.current ? t2.color : "var(--card)", border: `2px solid ${t2.color}`, boxShadow: t2.current ? `0 0 14px ${t2.color}50` : "none" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: t2.color, ...mono }}>{t2.year}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{t2.title}</span>
                {t2.current && <Tag color={t2.color}>{en ? "NOW" : "AHORA"}</Tag>}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {t2.events.map((e, j) => (
                  <div key={j} style={{ fontSize: 11, color: "var(--text3)", lineHeight: 1.5, display: "flex", alignItems: "flex-start", gap: 6 }}>
                    <span style={{ color: t2.color, flexShrink: 0, marginTop: 2 }}>\u25B8</span> {e}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Card>
      </ScrollReveal>

      {/* ═══ 11. ATTRIBUTION ═══ */}
      <ScrollReveal>
        <Card style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--text3)", ...mono, marginBottom: 10 }}>
            {en ? "SOURCES & ATTRIBUTION" : "FUENTES Y ATRIBUCI\u00d3N"}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {SOURCES.map((s, i) => (
              <span key={i} style={{ padding: "3px 10px", background: "var(--surface)", borderRadius: 16, fontSize: 10, color: "var(--text3)", ...mono }}>
                {s}
              </span>
            ))}
          </div>
          <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 12, ...mono }}>
            {en ? "85+ sources compiled | Last updated: March 31, 2026" : "85+ fuentes compiladas | \u00daltima actualizaci\u00f3n: 31 de marzo, 2026"}
          </div>
        </Card>
      </ScrollReveal>

    </div>
  );
}

export default AgenticAI;
