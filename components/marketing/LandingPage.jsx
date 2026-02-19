"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FACTS } from "../../data/facts";
import { MarketingHeader } from "./MarketingHeader";
import { MarketingFooter } from "./MarketingFooter";
import { Icon } from "../system/Icon";

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
      color: "#0ea5e9"
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
      <MarketingHeader en={en} setEn={setEn} />

      {/* ── HERO ── */}
      <motion.section className="mkt-hero" initial="hidden" animate="visible" variants={stagger}>
        <motion.div variants={fadeUp} className="mkt-hero-label">
          AI Observatory &middot; Costa Rica
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
            ? "Real-time strategic AI intelligence for Costa Rica's positioning in the global AI transformation."
            : "Inteligencia estratégica AI en tiempo real para el posicionamiento de Costa Rica en la transformación global AI."}
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
              <Icon name={a.icon} size={22} color="#9a9aad" />
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
          <div className="mkt-highlight-label">WEF 2026 — {en ? "Key Finding" : "Hallazgo Clave"}</div>
          <p className="mkt-highlight-text">
            {en
              ? "Global experts rank AI adverse outcomes #5 long-term. Costa Rica's business leaders don't list it at all."
              : "Expertos globales posicionan resultados adversos AI en #5 largo plazo. Líderes empresariales de Costa Rica ni lo mencionan."}
          </p>
          <div className="mkt-highlight-badge">
            {en ? "PERCEPTION GAP = PREPAREDNESS GAP" : "BRECHA DE PERCEPCIÓN = BRECHA DE PREPARACIÓN"}
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
