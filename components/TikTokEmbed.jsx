"use client";
import { useEffect, useRef, useState } from "react";
import { Card, SH, ScrollReveal } from "./ui";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — TikTok Video Intelligence Section v20.7
   Hybrid: iframes on desktop (reliable playback),
           styled link cards on mobile (reliable on iOS Safari).
   ═══════════════════════════════════════════════════════════════ */

const TIKTOK_VIDEOS = [
  { id: "7593331161951259936", user: "worldeconomicforum", label: "WEF: AI & Jobs",
    desc: { en: "How AI is reshaping labor markets and what skills will matter most.", es: "Cómo la AI está transformando los mercados laborales y qué habilidades importarán más." } },
  { id: "7606175085619105037", user: "cnn", label: "CNN: AI Revolution",
    desc: { en: "CNN explores the rapid adoption of AI across industries and its societal impact.", es: "CNN explora la rápida adopción de AI en industrias y su impacto social." } },
  { id: "7600087754709519649", user: "worldeconomicforum", label: "WEF: Future of Work",
    desc: { en: "The World Economic Forum on how automation and AI will transform careers by 2030.", es: "El Foro Económico Mundial sobre cómo la automatización y AI transformarán carreras para 2030." } },
  { id: "7463218989410372896", user: "worldeconomicforum", label: "WEF: AI Governance",
    desc: { en: "Why global AI governance frameworks are urgently needed for responsible innovation.", es: "Por qué se necesitan urgentemente marcos de gobernanza AI global para innovación responsable." } },
  { id: "7581910079994072342", user: "cnbci", label: "CNBC: AI Investment",
    desc: { en: "Where investors are placing their bets in the AI economy and emerging opportunities.", es: "Dónde los inversionistas están apostando en la economía AI y oportunidades emergentes." } },
  { id: "7604092193418136865", user: "worldeconomicforum", label: "WEF: AI Economy",
    desc: { en: "How AI is expected to add trillions to the global economy in the coming decade.", es: "Cómo se espera que la AI agregue trillones a la economía global en la próxima década." } },
  { id: "7586998162657709344", user: "worldeconomicforum", label: "WEF: AI Workforce",
    desc: { en: "Reskilling strategies and the workforce transformation needed for the AI era.", es: "Estrategias de recapacitación y la transformación laboral necesaria para la era AI." } },
  { id: "7602952346313821472", user: "worldeconomicforum", label: "WEF: AI Future",
    desc: { en: "Key predictions for AI development and its role in shaping the next decade.", es: "Predicciones clave para el desarrollo de AI y su rol en la próxima década." } },
  { id: "7608501347855404319", user: "bloombergbusiness", label: "Bloomberg: AI Markets",
    desc: { en: "Bloomberg analysis on how AI is disrupting financial markets and trading strategies.", es: "Análisis de Bloomberg sobre cómo la AI está disrumpiendo mercados financieros y estrategias de trading." } },
  { id: "7608483684248718622", user: "bloombergbusiness", label: "Bloomberg: AI Business",
    desc: { en: "Enterprise AI adoption trends and the companies leading the transformation.", es: "Tendencias de adopción de AI empresarial y las compañías liderando la transformación." } },
  { id: "7605924619823910166", user: "financialtimes", label: "FT: AI Analysis",
    desc: { en: "Financial Times deep dive into AI regulation, risks, and global policy responses.", es: "Análisis profundo del Financial Times sobre regulación AI, riesgos y respuestas de política global." } },
];

const COLIBRII_TIKTOK = "colibrii.labs";

/* Source colors for visual distinction */
const SOURCE_COLORS = {
  worldeconomicforum: "#0072b1",
  cnn: "#cc0000",
  cnbci: "#005594",
  bloombergbusiness: "#472cce",
  financialtimes: "#FCD0A1",
};

const SOURCE_NAMES = {
  worldeconomicforum: "World Economic Forum",
  cnn: "CNN",
  cnbci: "CNBC International",
  bloombergbusiness: "Bloomberg",
  financialtimes: "Financial Times",
};

/* TikTok SVG icon */
function TikTokIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.11V9.02a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.75a8.18 8.18 0 004.76 1.51V6.82a4.83 4.83 0 01-1-.13z" />
    </svg>
  );
}

/* ── Desktop: TikTok iframe player ── */
function TikTokIframe({ v, t }) {
  return (
    <div
      className="tiktok-embed-wrapper"
      style={{
        overflow: "hidden",
        borderRadius: 12,
        background: t.sf,
        border: `1px solid ${t.bd}`,
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: t.tx3,
          padding: "10px 12px 6px",
          fontFamily: "'IBM Plex Mono',monospace",
          letterSpacing: 0.5,
        }}
      >
        {v.label}
      </div>
      <iframe
        src={`https://www.tiktok.com/embed/v2/${v.id}`}
        allowFullScreen
        allow="encrypted-media"
        style={{ width: "100%", height: 580, border: "none" }}
        title={v.label}
      />
    </div>
  );
}

/* ── Mobile: Styled link card (reliable on iOS Safari) ── */
function TikTokLinkCard({ v, t, en }) {
  const accentColor = SOURCE_COLORS[v.user] || "#ee1d52";
  const sourceName = SOURCE_NAMES[v.user] || v.user;

  return (
    <a
      href={`https://www.tiktok.com/@${v.user}/video/${v.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="tiktok-link-card"
      style={{
        display: "block",
        textDecoration: "none",
        borderRadius: 12,
        overflow: "hidden",
        background: t.sf,
        border: `1px solid ${t.bd}`,
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
    >
      {/* Accent bar */}
      <div style={{ height: 3, background: accentColor }} />
      {/* Content */}
      <div style={{ padding: "14px 16px 16px" }}>
        {/* Source badge */}
        <div style={{
          display: "inline-block",
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          color: accentColor,
          fontFamily: "'IBM Plex Mono',monospace",
          marginBottom: 8,
          padding: "2px 8px",
          borderRadius: 4,
          background: `${accentColor}12`,
          border: `1px solid ${accentColor}30`,
        }}>
          {sourceName}
        </div>
        {/* Title */}
        <div style={{
          fontSize: 14,
          fontWeight: 600,
          color: t.tx,
          marginBottom: 8,
          lineHeight: 1.4,
        }}>
          {v.label}
        </div>
        {/* Description */}
        {v.desc && (
          <div style={{
            fontSize: 12,
            color: t.tx2,
            marginBottom: 12,
            lineHeight: 1.5,
          }}>
            {en ? v.desc.en : v.desc.es}
          </div>
        )}
        {/* Watch CTA */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 12,
          fontWeight: 600,
          color: "#ee1d52",
          fontFamily: "'IBM Plex Mono',monospace",
        }}>
          <TikTokIcon size={16} color="#ee1d52" />
          {en ? "Watch on TikTok" : "Ver en TikTok"} ▸
        </div>
      </div>
    </a>
  );
}

export function TikTokSection({ en, t }) {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  /* Detect mobile vs desktop */
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768 ||
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <ScrollReveal delay={100}>
      <Card style={{ marginTop: 20 }}>
        <SH
          color={t.pk || t.vi}
          label={en ? "VIDEO INTELLIGENCE" : "INTELIGENCIA EN VIDEO"}
          title={en ? "AI Perspectives from Global Leaders" : "Perspectivas AI de Líderes Globales"}
          desc={en
            ? "Curated short-form video insights on artificial intelligence from WEF, CNN, CNBC, Bloomberg, and Financial Times."
            : "Videos curados con perspectivas sobre inteligencia artificial del WEF, CNN, CNBC, Bloomberg y Financial Times."
          }
        />

        <div className="tiktok-grid" ref={containerRef}>
          {TIKTOK_VIDEOS.map((v) =>
            isMobile
              ? <TikTokLinkCard key={v.id} v={v} t={t} en={en} />
              : <TikTokIframe key={v.id} v={v} t={t} />
          )}
        </div>

        {/* Follow CTA */}
        <div style={{ textAlign: "center", marginTop: 20, paddingTop: 16, borderTop: `1px solid ${t.bd}` }}>
          <a
            href={`https://www.tiktok.com/@${COLIBRII_TIKTOK}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 24px",
              borderRadius: 8,
              border: `1px solid ${t.bd}`,
              background: t.sf,
              color: t.tx2,
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.2s",
            }}
          >
            <TikTokIcon size={16} />
            {en ? "Follow @colibrii.labs" : "Seguir @colibrii.labs"}
          </a>
        </div>
      </Card>
    </ScrollReveal>
  );
}
