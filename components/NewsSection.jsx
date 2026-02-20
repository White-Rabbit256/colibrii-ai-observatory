"use client";
import { useState } from "react";
import { Card, SH, ScrollReveal, Flag } from "./ui";
import { NEWS_CATEGORIES } from "./data";
import { TikTokSection } from "./TikTokEmbed";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — News + Video Intelligence Section v19
   Dual-mode: News feed (CR + International) + Video (TikTok)
   Source logos via Clearbit API primary, letter-circle fallback
   ═══════════════════════════════════════════════════════════════ */

/* Detect news category from title keywords */
function detectCategory(title) {
  const t = (title || "").toLowerCase();
  if (t.includes("security") || t.includes("cyber") || t.includes("hack") || t.includes("breach")) return "security";
  if (t.includes("regulat") || t.includes("law") || t.includes("policy") || t.includes("govern") || t.includes("legislat")) return "policy";
  if (t.includes("econom") || t.includes("invest") || t.includes("market") || t.includes("fund")) return "economy";
  if (t.includes("educat") || t.includes("universit") || t.includes("school") || t.includes("train")) return "education";
  return "tech";
}

/* Extract domain for logo lookup */
function extractDomain(url) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "";
  }
}

/* Color hash for fallback letter circles */
const LETTER_COLORS = ["#06b6d4", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#14b8a6"];
function letterColor(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
  return LETTER_COLORS[Math.abs(h) % LETTER_COLORS.length];
}

/* Source logo component: Clearbit primary, colored letter-circle fallback */
function SourceLogo({ domain, sourceName, size = 32 }) {
  const [failed, setFailed] = useState(false);
  const letter = (sourceName || domain || "?").charAt(0).toUpperCase();
  const bg = letterColor(domain || "x");

  if (failed || !domain) {
    return (
      <div style={{
        width: size, height: size, borderRadius: "50%", background: bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontWeight: 700, fontSize: size * 0.45,
        fontFamily: "'IBM Plex Mono',monospace", flexShrink: 0
      }}>
        {letter}
      </div>
    );
  }

  return (
    <img
      src={`https://logo.clearbit.com/${domain}?size=64`}
      alt=""
      style={{ width: size, height: size, borderRadius: 4, objectFit: "contain" }}
      onError={() => setFailed(true)}
    />
  );
}

export function NewsSection({ news, en, t }) {
  const [feed, setFeed] = useState("all");
  const [mode, setMode] = useState("news");

  /* Filter news by tab */
  const filtered = feed === "all"
    ? news
    : feed === "cr"
      ? news.filter(n => {
          const d = (n.domain || extractDomain(n.url || "")).toLowerCase();
          return d.includes("costa") || d.includes("tico") || d.includes("crhoy") || d.includes("nacion") || d.includes("financier") || d.includes("amelia");
        })
      : news.filter(n => {
          const d = (n.domain || extractDomain(n.url || "")).toLowerCase();
          return !d.includes("costa") && !d.includes("tico") && !d.includes("crhoy") && !d.includes("nacion");
        });

  return (
    <ScrollReveal delay={150}>
      <Card style={{ marginTop: 20 }}>
        {/* ── Mode toggle: News / Video ── */}
        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          <button onClick={() => setMode("news")} style={{
            padding: "7px 16px", fontSize: 12, fontWeight: mode === "news" ? 700 : 400,
            border: `1px solid ${mode === "news" ? (t.cy || "#06b6d4") : (t.bd || "#e2e8f0")}`,
            borderRadius: 8, background: mode === "news" ? `${t.cy || "#06b6d4"}12` : "transparent",
            color: mode === "news" ? (t.cy || "#06b6d4") : (t.tx3 || "#94a3b8"),
            fontFamily: "'IBM Plex Mono',monospace", cursor: "pointer"
          }}>
            {en ? "News" : "Noticias"}
          </button>
          <button onClick={() => setMode("video")} style={{
            padding: "7px 16px", fontSize: 12, fontWeight: mode === "video" ? 700 : 400,
            border: `1px solid ${mode === "video" ? (t.pk || "#ec4899") : (t.bd || "#e2e8f0")}`,
            borderRadius: 8, background: mode === "video" ? `${t.pk || "#ec4899"}12` : "transparent",
            color: mode === "video" ? (t.pk || "#ec4899") : (t.tx3 || "#94a3b8"),
            fontFamily: "'IBM Plex Mono',monospace", cursor: "pointer"
          }}>
            {en ? "Video" : "Video"}
          </button>
        </div>

        {/* ── NEWS MODE ── */}
        {mode === "news" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4, flexWrap: "wrap", gap: 8 }}>
              <div>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.pk || t.vi, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
                  {en ? "AI NEWS INTELLIGENCE" : "INTELIGENCIA DE NOTICIAS AI"}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "var(--font-display, 'Playfair Display', serif)" }}>
                  {en ? "Latest from the AI Ecosystem" : "Lo Ultimo del Ecosistema AI"}
                </div>
              </div>
              <div style={{ fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace" }}>
                {en ? "Updated every 72h" : "Actualizado cada 72h"}
              </div>
            </div>

            {/* Feed tabs */}
            <div className="news-tabs" style={{ marginBottom: 16 }}>
              <button
                className={`news-tab ${feed === "all" ? "active" : ""}`}
                onClick={() => setFeed("all")}
              >
                {en ? "All" : "Todos"} ({news.length})
              </button>
              <button
                className={`news-tab ${feed === "cr" ? "active" : ""}`}
                onClick={() => setFeed("cr")}
                style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
              >
                <Flag code="CR" size={14} /> Costa Rica
              </button>
              <button
                className={`news-tab ${feed === "global" ? "active" : ""}`}
                onClick={() => setFeed("global")}
              >
                {en ? "International" : "Internacional"}
              </button>
            </div>

            {/* News grid */}
            {filtered.length > 0 ? (
              <div className="news-grid">
                {filtered.map((n, i) => {
                  const cat = detectCategory(n.title);
                  const nc = NEWS_CATEGORIES[cat] || NEWS_CATEGORIES.tech;
                  const domain = n.domain || extractDomain(n.url || "");

                  return (
                    <a key={i} href={n.url} target="_blank" rel="noopener noreferrer" className="news-card">
                      {/* Thumbnail with source logo */}
                      <div className="news-thumb" style={{
                        background: `linear-gradient(135deg, ${nc.color}08, ${nc.color}18)`,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 4,
                        position: "relative",
                      }}>
                        <SourceLogo domain={domain} sourceName={n.sourcecountry || domain} size={36} />
                      </div>

                      {/* News body */}
                      <div className="news-body">
                        <div className="news-title">{n.title}</div>
                        <div className="news-meta">
                          {domain}
                          {n.seendate && ` \u00b7 ${n.seendate.slice(0, 10)}`}
                        </div>
                        {/* Category badge */}
                        <div className="news-impact" style={{ background: `${nc.color}10`, color: nc.color }}>
                          <span>{nc.icon}</span>
                          <span>{en ? nc.label?.en || cat : nc.label?.es || cat}</span>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: 40, color: t.tx3, fontSize: 13 }}>
                {en ? "No articles found for this filter." : "No se encontraron articulos para este filtro."}
              </div>
            )}

            {/* Source citation */}
            <div style={{ marginTop: 12, fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", textAlign: "center" }}>
              {en ? "Source: GDELT Project API \u2014 72-hour monitoring window" : "Fuente: GDELT Project API \u2014 ventana de monitoreo de 72 horas"}
            </div>
          </>
        )}

        {/* ── VIDEO MODE ── */}
        {mode === "video" && <TikTokSection en={en} t={t} />}
      </Card>
    </ScrollReveal>
  );
}
