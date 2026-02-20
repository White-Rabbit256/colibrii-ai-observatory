"use client";
import { useState } from "react";
import { Card, SH, ScrollReveal, Flag } from "./ui";
import { NEWS_CATEGORIES } from "./data";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — News Intelligence Section v18
   Dedicated news feed with CR + International tabs
   Source logos via Clearbit API, favicon thumbnails, category badges
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

export function NewsSection({ news, en, t }) {
  const [feed, setFeed] = useState("all");

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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4, flexWrap: "wrap", gap: 8 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.pk || t.vi, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
              {en ? "AI NEWS INTELLIGENCE" : "INTELIGENCIA DE NOTICIAS AI"}
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "var(--font-display, 'Playfair Display', serif)" }}>
              {en ? "Latest from the AI Ecosystem" : "Lo Último del Ecosistema AI"}
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
            🌎 {en ? "International" : "Internacional"}
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
                    {/* Source favicon */}
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
                      alt=""
                      style={{ width: 32, height: 32, borderRadius: 4 }}
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                    {/* Source logo (Clearbit) */}
                    <img
                      src={`https://logo.clearbit.com/${domain}?size=48`}
                      alt=""
                      style={{ width: 40, height: 16, objectFit: "contain", opacity: 0.6 }}
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  </div>

                  {/* News body */}
                  <div className="news-body">
                    <div className="news-title">{n.title}</div>
                    <div className="news-meta">
                      {domain}
                      {n.seendate && ` · ${n.seendate.slice(0, 10)}`}
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
            {en ? "No articles found for this filter." : "No se encontraron artículos para este filtro."}
          </div>
        )}

        {/* Source citation */}
        <div style={{ marginTop: 12, fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", textAlign: "center" }}>
          {en ? "Source: GDELT Project API — 72-hour monitoring window" : "Fuente: GDELT Project API — ventana de monitoreo de 72 horas"}
        </div>
      </Card>
    </ScrollReveal>
  );
}
