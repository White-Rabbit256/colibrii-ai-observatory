"use client";
import { useEffect, useRef } from "react";
import { Card, SH, ScrollReveal } from "./ui";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — TikTok Video Intelligence Section v18
   Embeds curated TikTok videos about AI from WEF, CNN, CNBC
   Uses TikTok blockquote embed + async script loader
   ═══════════════════════════════════════════════════════════════ */

const TIKTOK_VIDEOS = [
  { id: "7593331161951259936", user: "worldeconomicforum", label: "WEF: AI & Jobs" },
  { id: "7606175085619105037", user: "cnn", label: "CNN: AI Revolution" },
  { id: "7600087754709519649", user: "worldeconomicforum", label: "WEF: Future of Work" },
  { id: "7463218989410372896", user: "worldeconomicforum", label: "WEF: AI Governance" },
  { id: "7581910079994072342", user: "cnbci", label: "CNBC: AI Investment" },
];

const COLIBRII_TIKTOK = "colibrii.labs";

export function TikTokSection({ en, t }) {
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      try { document.body.removeChild(script); } catch {}
    };
  }, []);

  /* Re-process embeds when component re-renders */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && window.tiktok?.embed?.lib?.render) {
        window.tiktok.embed.lib.render(document.body);
      }
    }, 500);
    return () => clearTimeout(timer);
  });

  return (
    <ScrollReveal delay={100}>
      <Card style={{ marginTop: 20 }}>
        <SH
          color={t.pk || t.vi}
          label={en ? "VIDEO INTELLIGENCE" : "INTELIGENCIA EN VIDEO"}
          title={en ? "AI Perspectives from Global Leaders" : "Perspectivas AI de Líderes Globales"}
          desc={en
            ? "Curated short-form video insights on artificial intelligence from the World Economic Forum, CNN, and CNBC."
            : "Videos curados con perspectivas sobre inteligencia artificial del Foro Económico Mundial, CNN y CNBC."
          }
        />

        <div className="tiktok-grid">
          {TIKTOK_VIDEOS.map((v, i) => (
            <div key={v.id} className="tiktok-embed-wrapper">
              <div style={{ fontSize: 11, fontWeight: 600, color: t.tx3, marginBottom: 8, fontFamily: "'IBM Plex Mono',monospace", letterSpacing: 0.5 }}>
                {v.label}
              </div>
              <blockquote
                className="tiktok-embed"
                cite={`https://www.tiktok.com/@${v.user}/video/${v.id}`}
                data-video-id={v.id}
                style={{ maxWidth: 325, minWidth: 280 }}
              >
                <section>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.tiktok.com/@${v.user}/video/${v.id}`}
                    style={{ fontSize: 12, color: t.cy, textDecoration: "none" }}
                  >
                    {en ? "Watch on TikTok →" : "Ver en TikTok →"}
                  </a>
                </section>
              </blockquote>
            </div>
          ))}
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.11V9.02a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.75a8.18 8.18 0 004.76 1.51V6.82a4.83 4.83 0 01-1-.13z"/>
            </svg>
            {en ? "Follow @colibrii.labs" : "Seguir @colibrii.labs"}
          </a>
        </div>
      </Card>
    </ScrollReveal>
  );
}
