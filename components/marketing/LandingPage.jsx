"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
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
      {/* Floating ambient dots — pure CSS, non-blocking */}
      <div className="mkt-ambient-dots" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="mkt-dot" style={{
            left: `${5 + (i * 37 + i * i * 7) % 90}%`,
            top: `${3 + (i * 53 + i * 13) % 94}%`,
            animationDelay: `${(i * 1.7) % 8}s`,
            animationDuration: `${14 + (i % 5) * 4}s`,
            width: `${3 + (i % 4) * 2}px`,
            height: `${3 + (i % 4) * 2}px`,
            background: ["#2563eb", "#8b5cf6", "#06b6d4", "#ec4899", "#10b981"][i % 5],
          }} />
        ))}
      </div>
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
            ? "This observatory gives Costa Ricans a holistic understanding of our country's positioning in the world regarding AI adoption, literacy, risks, and legislation. 20 countries. 25+ data sources. Real-time data. Actionable intelligence. According to Oxford Insights, Costa Rica scored 100/100 in AI Vision but only 0.38 out of 1.0 in readiness — this observatory exists to close that gap with evidence, not opinion."
            : "Este observatorio entrega a los costarricenses una comprensión holística del posicionamiento de nuestro país ante el mundo en cuanto a adopción, alfabetización, riesgos y legislación de inteligencia artificial. 20 países. 25+ fuentes de datos. Datos en tiempo real. Inteligencia accionable. Según Oxford Insights, Costa Rica obtuvo 100/100 en Visión AI pero solo 0.38 de 1.0 en preparación real — este observatorio existe para cerrar esa brecha con evidencia, no opinión."}
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
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "28px 24px 20px", position: "relative", zIndex: 1 }}>
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
      <section style={{ borderTop: "1px solid var(--mkt-border)", borderBottom: "1px solid var(--mkt-border)", padding: "24px 24px", position: "relative", zIndex: 1 }}>
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
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "28px 24px 24px", position: "relative", zIndex: 1 }}>
        <div className="mkt-section-title">{en ? "The Paradox: World-Class Vision, Zero Execution" : "La Paradoja: Visión de Clase Mundial, Cero Ejecución"}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {[
            { stat: "100/100", label: en ? "Vision Score — Oxford Insights" : "Puntaje Visión — Oxford Insights", desc: en ? "Costa Rica achieved a perfect score in AI national strategy. Only a handful of countries worldwide can say this." : "Costa Rica logró puntaje perfecto en estrategia nacional AI. Solo un puñado de países en el mundo pueden decir esto.", color: "#10b981" },
            { stat: "0.38 / 1.0", label: en ? "Readiness — Same Index, Same Year" : "Preparación — Mismo Índice, Mismo Año", desc: en ? "But actual AI readiness scores bottom-third globally. The gap between ambition and execution is Costa Rica's defining challenge." : "Pero la preparación real AI está en el tercio inferior global. La brecha entre ambición y ejecución es el desafío definitorio de CR.", color: "#ef4444" },
            { stat: "0", label: en ? "Binding AI Laws" : "Leyes AI Vinculantes", desc: en ? "No AI legislation. No regulatory authority. No mandatory transparency. The EU has 400+ pages of AI law. Costa Rica has none." : "Sin legislación AI. Sin autoridad regulatoria. Sin transparencia obligatoria. La UE tiene 400+ páginas de ley AI. Costa Rica, cero.", color: "#ef4444" },
            { stat: "#30 → #5", label: en ? "AI Risk Surge — WEF 2026" : "Escalada Riesgo AI — WEF 2026", desc: en ? "AI adverse outcomes leapt from #30 to #5 in the global risk ranking in just one year. The fastest-rising risk in WEF history." : "Resultados adversos AI saltaron del #30 al #5 en el ranking de riesgos en un solo año. El riesgo de mayor ascenso en la historia del WEF.", color: "#8b5cf6" },
            { stat: "40%", label: en ? "Jobs at Risk — IMF 2024" : "Empleos en Riesgo — FMI 2024", desc: en ? "The IMF estimates 40% of global jobs will be disrupted by AI. For emerging economies without regulation, the impact is amplified." : "El FMI estima que 40% de empleos globales serán disrumpidos por AI. Para economías emergentes sin regulación, el impacto se amplifica.", color: "#f59e0b" },
            { stat: "0 vs #1", label: en ? "AI in CR Business Agenda" : "AI en Agenda Empresarial CR", desc: en ? "CR executives see zero AI risk in their top 5 concerns. Vietnam's rank it #1. This perception gap is the biggest vulnerability." : "Ejecutivos de CR ven cero riesgo AI en su top 5. Vietnam lo posiciona #1. Esta brecha de percepción es la mayor vulnerabilidad.", color: "#f97316" }
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
