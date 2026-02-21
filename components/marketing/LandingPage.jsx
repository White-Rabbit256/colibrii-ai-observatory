"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { FACTS } from "../../data/facts";
import { MarketingHeader } from "./MarketingHeader";
import { MarketingFooter } from "./MarketingFooter";
import { Icon } from "../system/Icon";
import { Flag } from "../ui";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Marketing Landing Page (Dark Editorial)
   Premium dark theme, journalist-friendly, conversion-focused
   ═══════════════════════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
};

const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export function LandingPage() {
  const [en, setEn] = useState(false);

  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("clb_lang");
    if (saved === "en") setEn(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("clb_lang", en ? "en" : "es");
  }, [en]);

  const [particlesReady, setParticlesReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setParticlesReady(true));
  }, []);

  const particlesOptions = {
    fullScreen: false,
    fpsLimit: 60,
    particles: {
      number: { value: 90, density: { enable: true, area: 900 } },
      color: { value: ["#2563eb", "#8b5cf6", "#06b6d4", "#ec4899", "#10b981"] },
      opacity: { value: { min: 0.2, max: 0.5 } },
      size: { value: { min: 2, max: 5 } },
      move: {
        enable: true,
        speed: 1.2,
        direction: "none",
        outModes: "bounce",
      },
      links: {
        enable: true,
        distance: 140,
        color: "#2563eb",
        opacity: 0.12,
        width: 1,
      },
    },
    interactivity: {
      events: {
        onHover: { enable: false },
        onClick: { enable: false },
      },
    },
    detectRetina: true,
  };

  const pillars = [
    {
      icon: "chart",
      title: en ? "CAPI-CR Index" : "Índice CAPI-CR",
      desc: en
        ? "6-dimension composite index extending IMF AIPI. 20 peer countries evaluated in real-time using 11 World Bank indicators."
        : "Índice compuesto de 6 dimensiones que extiende el AIPI del FMI. 20 países pares evaluados en tiempo real con 11 indicadores del Banco Mundial.",
      color: "#2563eb"
    },
    {
      icon: "shield",
      title: en ? "Risk Intelligence" : "Inteligencia de Riesgo",
      desc: en
        ? "WEF 2026 analysis: 3 time horizons, severity scores, EOS per-country risk perceptions. Identifies blind spots."
        : "Análisis WEF 2026: 3 horizontes temporales, scores de severidad, percepciones de riesgo EOS por país. Identifica puntos ciegos.",
      color: "#8b5cf6"
    },
    {
      icon: "target",
      title: en ? "Policy Simulator" : "Simulador de Políticas",
      desc: en
        ? "What-if analysis for policy decisions. Model the impact of regulatory choices on Costa Rica's AI positioning."
        : "Análisis what-if para decisiones de política. Modele el impacto de decisiones regulatorias en el posicionamiento AI de CR.",
      color: "#ec4899"
    }
  ];

  const audiences = [
    {
      title: en ? "Policymakers" : "Legisladores",
      desc: en ? "Data-driven evidence for AI legislation" : "Evidencia basada en datos para legislación AI",
      icon: "legal"
    },
    {
      title: en ? "Executives" : "Ejecutivos",
      desc: en ? "Strategic risk assessment for FZ operations" : "Evaluación estratégica de riesgo para operaciones ZF",
      icon: "factory"
    },
    {
      title: en ? "Researchers" : "Investigadores",
      desc: en ? "55-term glossary, 25+ data sources" : "Glosario de 55 términos, 25+ fuentes de datos",
      icon: "book"
    },
    {
      title: en ? "Journalists" : "Periodistas",
      desc: en ? "Cite-ready data, transparent methodology" : "Datos citables, metodología transparente",
      icon: "info"
    }
  ];

  return (
    <div className="mkt-page">
      {/* tsParticles — fixed overlay across entire page */}
      {particlesReady && (
        <Particles
          id="hero-particles"
          options={particlesOptions}
          style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", width: "100vw", height: "100vh" }}
        />
      )}
      <MarketingHeader en={en} setEn={setEn} />

      {/* ── HERO ── */}
      <motion.section className="mkt-hero" initial="hidden" animate="visible" variants={stagger}>
        <motion.div variants={fadeUp} style={{ marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <img src="/colibrii-logo.png" alt="Colibrii Labs" className="logo-iridescent" style={{ width: 160, height: 160 }} />
          <img src="/costa-rica-hero.jpg" alt="Costa Rica" style={{ width: 80, height: 56, borderRadius: 8, objectFit: "cover", boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }} />
        </motion.div>
        <motion.div variants={fadeUp} style={{ fontSize: 20, fontFamily: "var(--font-display, 'Playfair Display', serif)", fontStyle: "italic", color: "var(--mkt-text2)", marginBottom: 8, letterSpacing: 0.3 }}>
          {en ? "Costa Rica is my beloved homeland." : "Costa Rica es mi patria querida."}
        </motion.div>
        <motion.div variants={fadeUp} className="mkt-hero-label">
          <Flag code="CR" size={18} style={{ marginRight: 6 }} /> AI Observatory &middot; Costa Rica
        </motion.div>
        <motion.h1 variants={fadeUp} className="mkt-hero-title">
          Colibrii Labs
        </motion.h1>
        <motion.div variants={fadeUp} className="mkt-hero-tagline">
          {FACTS.tagline}
        </motion.div>
        <motion.div variants={fadeUp} className="mkt-hero-accent" />
        <motion.p variants={fadeUp} className="mkt-hero-desc">
          {en
            ? "This observatory gives Costa Ricans a holistic understanding of our country's positioning in the world regarding AI adoption, literacy, risks, and legislation. 20 countries. 25+ data sources. Real-time data. Actionable intelligence. Costa Rica scored 100/100 in AI Vision but only 0.38 in readiness — this observatory exists to close that gap with evidence, not opinion."
            : "Este observatorio entrega a los costarricenses una comprensión holística del posicionamiento de nuestro país ante el mundo en cuanto a adopción, alfabetización, riesgos y legislación de inteligencia artificial. 20 países. 25+ fuentes de datos. Datos en tiempo real. Inteligencia accionable. Costa Rica obtuvo 100/100 en Visión AI pero solo 0.38 en preparación — este observatorio existe para cerrar esa brecha con evidencia, no opinión."}
        </motion.p>
        <motion.div variants={fadeUp}>
          <Link href="/app" className="mkt-hero-cta">
            {en ? "Enter the Observatory" : "Entrar al Observatorio"}
            <Icon name="arrowRight" size={18} />
          </Link>
        </motion.div>
      </motion.section>

      {/* ── CREDIBILITY BAR ── */}
      <motion.section
        className="mkt-credibility"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        {[
          { v: FACTS.countries, l: en ? "Countries" : "Países" },
          { v: FACTS.algorithms, l: en ? "Algorithms" : "Algoritmos" },
          { v: FACTS.glossaryTerms, l: en ? "Glossary Terms" : "Términos Glosario" },
          { v: `${FACTS.partners}+`, l: en ? "Data Sources" : "Fuentes de Datos" },
        ].map((s, i) => (
          <motion.div key={i} variants={fadeUp} className="mkt-cred-item">
            <span className="mkt-cred-num">{s.v}</span>
            <span className="mkt-cred-label">{s.l}</span>
          </motion.div>
        ))}
      </motion.section>

      {/* ── What is an AI Observatory? ── */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "28px 24px 20px", position: "relative", zIndex: 2 }}>
        <div className="mkt-section-title">{en ? "What is an AI Observatory?" : "¿Qué es un Observatorio AI?"}</div>
        <p style={{ textAlign: "center", fontSize: 15, color: "var(--mkt-text2)", lineHeight: 1.8, maxWidth: 640, margin: "0 auto 24px" }}>
          {en
            ? "A real-time intelligence platform that collects, analyzes, and visualizes data from 25+ international sources to inform Costa Rica's AI strategy."
            : "Una plataforma de inteligencia en tiempo real que recopila, analiza y visualiza datos de 25+ fuentes internacionales para informar la estrategia AI de Costa Rica."}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, textAlign: "center" }}>
          {[
            { num: "25+", label: en ? "Data Sources" : "Fuentes de Datos", desc: en ? "World Bank, WEF, IMF, OECD, Stanford HAI, Oxford Insights" : "Banco Mundial, WEF, FMI, OCDE, Stanford HAI, Oxford Insights" },
            { num: "4", label: en ? "Live APIs" : "APIs en Vivo", desc: en ? "Real-time data from World Bank, GDELT, Exchange Rates, REST Countries" : "Datos en tiempo real del Banco Mundial, GDELT, Tipos de Cambio, REST Countries" },
            { num: "10", label: en ? "Algorithms" : "Algoritmos", desc: en ? "Proprietary analytical models including CAPI-CR composite index" : "Modelos analíticos propietarios incluyendo índice compuesto CAPI-CR" },
            { num: "14", label: en ? "Analysis Views" : "Vistas de Análisis", desc: en ? "From country profiles to policy simulators to risk dashboards" : "Desde perfiles país hasta simuladores de política y dashboards de riesgo" }
          ].map((item, i) => (
            <div key={i} style={{ padding: 24, background: "var(--mkt-surface)", borderRadius: 12, border: "1px solid var(--mkt-border)" }}>
              <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)", color: "#2563eb", marginBottom: 8 }}>{item.num}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--mkt-text)", marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: "var(--mkt-text3)", lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Referenced Institutions ── */}
      <section style={{ borderTop: "1px solid var(--mkt-border)", borderBottom: "1px solid var(--mkt-border)", padding: "24px 24px", position: "relative", zIndex: 2 }}>
        <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "var(--mkt-text3)", fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)", textAlign: "center", marginBottom: 16 }}>
          {en ? "DATA REFERENCED FROM" : "DATOS REFERENCIADOS DE"}
        </div>
        <div className="institution-bar">
          {[
            { name: "World Bank", domain: "worldbank.org" },
            { name: "WEF", domain: "weforum.org" },
            { name: "IMF", domain: "imf.org" },
            { name: "OECD", domain: "oecd.org" },
            { name: "Oxford Insights", domain: "oxfordinsights.com" },
            { name: "Stanford HAI", domain: "stanford.edu" },
            { name: "OWASP", domain: "owasp.org" },
            { name: "ILO", domain: "ilo.org" },
            { name: "UNDP", domain: "undp.org" },
          ].map((inst, i, arr) => (
            <React.Fragment key={i}>
              <span className="institution-name" style={{ color: "var(--mkt-text3)", display: "inline-flex", alignItems: "center", gap: 6 }}>
                <img
                  src={`https://logo.clearbit.com/${inst.domain}?size=64`}
                  alt=""
                  style={{ height: 20, width: "auto", opacity: 0.7 }}
                  onError={(e) => { e.target.style.display = "none"; }}
                />
                {inst.name}
              </span>
              {i < arr.length - 1 && <span className="institution-sep" style={{ background: "var(--mkt-border)" }} />}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ── Why Costa Rica Needs This Now ── */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "28px 24px 24px", position: "relative", zIndex: 2 }}>
        <div className="mkt-section-title">{en ? "Why Costa Rica Needs This Now" : "Por Qué Costa Rica Necesita Esto Ahora"}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {[
            { stat: "100/100", label: en ? "AI Vision Score" : "Puntaje Visión AI", desc: en ? "Oxford Insights: Perfect strategy score, but..." : "Oxford Insights: Puntaje perfecto de estrategia, pero...", color: "#10b981" },
            { stat: "0.38", label: en ? "Readiness Score" : "Puntaje Preparación", desc: en ? "Overall AI readiness is only 0.38/1.0 — the gap is in execution" : "Preparación AI general es solo 0.38/1.0 — la brecha está en ejecución", color: "#ef4444" },
            { stat: "40%", label: en ? "Workforce Exposed" : "Fuerza Laboral Expuesta", desc: en ? "IMF: 40% of global jobs exposed to AI disruption" : "FMI: 40% de empleos globales expuestos a disrupción AI", color: "#f59e0b" },
            { stat: "0", label: en ? "AI Laws" : "Leyes AI", desc: en ? "Zero binding AI legislation. No AI authority. No mandatory transparency." : "Cero legislación AI vinculante. Sin autoridad AI. Sin transparencia obligatoria.", color: "#ef4444" },
            { stat: "#5", label: en ? "AI Risk (WEF)" : "Riesgo AI (WEF)", desc: en ? "AI adverse outcomes jumped from #30→#5 in one year" : "Resultados adversos AI saltaron de #30→#5 en un año", color: "#8b5cf6" },
            { stat: "0", label: en ? "AI in CR's EOS" : "AI en EOS de CR", desc: en ? "Business leaders see ZERO AI risks in top 5. Vietnam sees it as #1." : "Líderes empresariales ven CERO riesgos AI en top 5. Vietnam lo ve como #1.", color: "#f97316" }
          ].map((item, i) => (
            <div key={i} style={{ padding: 24, background: "var(--mkt-surface)", border: "1px solid var(--mkt-border)", borderRadius: 12, borderLeft: `3px solid ${item.color}` }}>
              <div style={{ fontSize: 32, fontWeight: 800, fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)", color: item.color, marginBottom: 4 }}>{item.stat}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--mkt-text)", marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: "var(--mkt-text3)", lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── THREE PILLARS ── */}
      <motion.section
        className="mkt-pillars"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp} className="mkt-section-title">
          {en ? "Three Pillars of Intelligence" : "Tres Pilares de Inteligencia"}
        </motion.h2>
        <div className="mkt-pillars-grid">
          {pillars.map((p, i) => (
            <motion.div key={i} variants={fadeUp} className="mkt-pillar-card">
              <div className="mkt-pillar-icon" style={{ color: p.color }}>
                <Icon name={p.icon} size={28} color={p.color} />
              </div>
              <h3 className="mkt-pillar-title" style={{ color: p.color }}>{p.title}</h3>
              <p className="mkt-pillar-desc">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── FOR WHOM ── */}
      <motion.section
        className="mkt-audience"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp} className="mkt-section-title">
          {en ? "Built For" : "Diseñado Para"}
        </motion.h2>
        <div className="mkt-audience-grid">
          {audiences.map((a, i) => (
            <motion.div key={i} variants={fadeUp} className="mkt-audience-card">
              <Icon name={a.icon} size={22} color="#94a3b8" />
              <div>
                <div className="mkt-audience-title">{a.title}</div>
                <div className="mkt-audience-desc">{a.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── WEF BLIND SPOT HIGHLIGHT ── */}
      <motion.section
        className="mkt-highlight"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="mkt-highlight-card">
          <div className="mkt-highlight-label">WEF 2026 — {en ? "Awareness Opportunity" : "Oportunidad de Concientización"}</div>
          <p className="mkt-highlight-text">
            {en
              ? "Global experts rank AI adverse outcomes #5 long-term — the fastest-rising risk in WEF history. Costa Rica's business leaders have not yet identified it as a top concern, creating a perception gap that this observatory helps close."
              : "Expertos globales posicionan resultados adversos AI en #5 largo plazo — el riesgo de mayor ascenso en la historia del WEF. Líderes empresariales de Costa Rica aún no lo identifican como preocupación principal, creando una brecha de percepción que este observatorio ayuda a cerrar."}
          </p>
          <div className="mkt-highlight-badge">
            {en ? "PERCEPTION GAP = AWARENESS OPPORTUNITY" : "BRECHA DE PERCEPCIÓN = OPORTUNIDAD DE CONCIENTIZACIÓN"}
          </div>
        </motion.div>
      </motion.section>

      {/* ── FINAL CTA ── */}
      <motion.section
        className="mkt-final-cta"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp} className="mkt-section-title">
          {en ? "Access the Observatory" : "Acceder al Observatorio"}
        </motion.h2>
        <motion.p variants={fadeUp} className="mkt-final-desc">
          {en
            ? `${FACTS.algorithms} proprietary algorithms. ${FACTS.countries} peer countries. ${FACTS.glossaryTerms}-term glossary. Real-time data.`
            : `${FACTS.algorithms} algoritmos propietarios. ${FACTS.countries} países pares. Glosario de ${FACTS.glossaryTerms} términos. Datos en tiempo real.`}
        </motion.p>
        <motion.div variants={fadeUp}>
          <Link href="/app" className="mkt-hero-cta">
            {en ? "Enter Portal" : "Entrar al Portal"}
            <Icon name="arrowRight" size={18} />
          </Link>
        </motion.div>
      </motion.section>

      <MarketingFooter en={en} />
    </div>
  );
}
