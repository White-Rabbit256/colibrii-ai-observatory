"use client";
import { useState, useRef, useCallback } from "react";
import { Card, SH, ScrollReveal, Flag } from "./ui";
import { VIP_QUOTES, NEWS_CATEGORIES, CURATED_NEWS, CR_FALLBACK_NEWS } from "./data";
import { TikTokSection } from "./TikTokEmbed";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Media Intelligence Hub v20
   Combined: TikTok Videos + News Feed + Global Leader Voices
   ═══════════════════════════════════════════════════════════════ */

/* ── Source logo: Clearbit → Google Favicon → letter circle ── */
const LETTER_COLORS = ["#06b6d4", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#14b8a6"];
function letterColor(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
  return LETTER_COLORS[Math.abs(h) % LETTER_COLORS.length];
}

function SourceLogo({ domain, sourceName, size = 32 }) {
  const [step, setStep] = useState(0);
  const letter = (sourceName || domain || "?").charAt(0).toUpperCase();
  const bg = letterColor(domain || "x");

  if (step >= 2 || !domain) {
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

  const src = step === 0
    ? `https://logo.clearbit.com/${domain}?size=64`
    : `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  return (
    <img
      src={src}
      alt=""
      style={{ width: size, height: size, borderRadius: 4, objectFit: "contain" }}
      onError={() => setStep(prev => prev + 1)}
    />
  );
}

/* ── Detect news category ── */
function detectCategory(title) {
  const t = (title || "").toLowerCase();
  if (t.includes("security") || t.includes("cyber") || t.includes("hack") || t.includes("breach")) return "security";
  if (t.includes("regulat") || t.includes("law") || t.includes("policy") || t.includes("govern") || t.includes("legislat")) return "policy";
  if (t.includes("econom") || t.includes("invest") || t.includes("market") || t.includes("fund")) return "economy";
  if (t.includes("educat") || t.includes("universit") || t.includes("school") || t.includes("train")) return "education";
  return "tech";
}

function extractDomain(url) {
  try { return new URL(url).hostname.replace("www.", ""); } catch { return ""; }
}

/* ── VIP Quotes Reel ── */
function VipQuotesReel({ en, t }) {
  const reelRef = useRef(null);
  const scroll = useCallback((dir) => {
    const el = reelRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  }, []);
  const quotes = VIP_QUOTES(en);
  return (
    <Card style={{ marginTop: 20, overflow: "visible" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.vi, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
            {en ? "VOICES ON AI" : "VOCES SOBRE AI"}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "var(--font-display, 'Playfair Display', serif)" }}>
            {en ? "What Global Leaders Are Saying" : "Qué Dicen los Líderes Globales"}
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={() => scroll("left")} className="vip-nav-btn" aria-label="Previous" style={{ width: 32, height: 32, borderRadius: "50%", border: `1px solid ${t.bd}`, background: t.sf, color: t.tx2, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>←</button>
          <button onClick={() => scroll("right")} className="vip-nav-btn" aria-label="Next" style={{ width: 32, height: 32, borderRadius: "50%", border: `1px solid ${t.bd}`, background: t.sf, color: t.tx2, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>→</button>
        </div>
      </div>
      <div className="vip-reel" ref={reelRef}>
        {quotes.map((q, i) => (
          <div key={i} className="vip-card">
            {q.photo ? (
              <img
                src={q.photo}
                alt={q.name}
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                loading="lazy"
                className="vip-avatar-img"
                style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", border: `2px solid ${t.bd}`, flexShrink: 0 }}
                onError={(e) => {
                  e.target.style.display = "none";
                  if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div className="vip-avatar" style={{ background: q.gradient, display: q.photo ? "none" : "flex" }}>{q.initials}</div>
            <div className="vip-quote">{q.quote}</div>
            <div className="vip-name">{q.name}</div>
            <div className="vip-title">{q.title}</div>
            {q.src && (
              <a href={q.src} target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, color: t.cy, marginTop: 6, display: "inline-block" }}>
                {en ? "Source" : "Fuente"} ↗
              </a>
            )}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 10, color: t.tx3, textAlign: "center", marginTop: 8, fontFamily: "'IBM Plex Mono',monospace" }}>
        {quotes.length} {en ? "voices" : "voces"} · {en ? "scroll or use arrows" : "desplazar o usar flechas"}
      </div>
    </Card>
  );
}

/* ── News Feed with Trending + GDELT + CR Fallback ── */
function NewsFeed({ news, en, t }) {
  const [feed, setFeed] = useState("all");

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

  const renderArticle = (n, i, isTrending) => {
    const cat = detectCategory(n.title);
    const nc = NEWS_CATEGORIES[cat] || NEWS_CATEGORIES.tech;
    const domain = n.domain || extractDomain(n.url || "");
    return (
      <a key={`${isTrending ? "t" : "g"}-${i}`} href={n.url} target="_blank" rel="noopener noreferrer" className="news-card" style={isTrending ? { borderLeft: `3px solid ${t.am}` } : {}}>
        <div className="news-thumb" style={{
          background: `linear-gradient(135deg, ${nc.color}08, ${nc.color}18)`,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, position: "relative",
        }}>
          <SourceLogo domain={domain} sourceName={n.sourcecountry || domain} size={36} />
        </div>
        <div className="news-body">
          <div className="news-title">{n.title}</div>
          <div className="news-meta">
            {domain}
            {(n.seendate || n.date) && ` \u00b7 ${(n.seendate || n.date).slice(0, 10)}`}
          </div>
          <div className="news-impact" style={{ background: `${nc.color}10`, color: nc.color }}>
            <span>{nc.icon}</span>
            <span>{en ? nc.label?.en || cat : nc.label?.es || cat}</span>
            {isTrending && <span style={{ marginLeft: 4, fontSize: 9, fontWeight: 700, color: t.am }}>LANDMARK</span>}
          </div>
        </div>
      </a>
    );
  };

  return (
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
          {en ? "Live feed + curated landmarks" : "Feed en vivo + hitos curados"}
        </div>
      </div>

      {/* Feed tabs */}
      <div className="news-tabs" style={{ marginBottom: 16 }}>
        <button className={`news-tab ${feed === "all" ? "active" : ""}`} onClick={() => setFeed("all")}>
          {en ? "All" : "Todos"} ({news.length})
        </button>
        <button className={`news-tab ${feed === "cr" ? "active" : ""}`} onClick={() => setFeed("cr")} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          <Flag code="CR" size={14} /> Costa Rica
        </button>
        <button className={`news-tab ${feed === "global" ? "active" : ""}`} onClick={() => setFeed("global")}>
          {en ? "International" : "Internacional"}
        </button>
      </div>

      {/* Trending / Landmark section (only in "all" feed) */}
      {feed === "all" && CURATED_NEWS.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: t.am, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 8 }}>
            {en ? "LANDMARK ARTICLES" : "ARTÍCULOS HISTÓRICOS"}
          </div>
          <div className="news-grid">
            {CURATED_NEWS.map((n, i) => renderArticle(n, i, true))}
          </div>
        </div>
      )}

      {/* Live GDELT feed */}
      {filtered.length > 0 ? (
        <>
          {feed === "all" && (
            <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: t.cy, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 8, marginTop: 8 }}>
              {en ? "LIVE FEED — LAST 72 HOURS" : "FEED EN VIVO — ÚLTIMAS 72 HORAS"}
            </div>
          )}
          <div className="news-grid">
            {filtered.map((n, i) => renderArticle(n, i, false))}
          </div>
        </>
      ) : feed === "cr" ? (
        <div style={{ marginTop: 8 }}>
          <div style={{ textAlign: "center", padding: "16px 0", color: t.tx3, fontSize: 13, marginBottom: 12 }}>
            {en ? "No Costa Rica AI articles in the last 72 hours. Here are recent highlights:" : "Sin artículos de Costa Rica sobre AI en las últimas 72 horas. Aquí hay destacados recientes:"}
          </div>
          <div className="news-grid">
            {CR_FALLBACK_NEWS.map((n, i) => renderArticle(n, i, false))}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: 40, color: t.tx3, fontSize: 13 }}>
          {en ? "No articles found for this filter." : "No se encontraron artículos para este filtro."}
        </div>
      )}

      <div style={{ marginTop: 12, fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", textAlign: "center" }}>
        {en ? "Sources: GDELT Project API (72h live) + Colibrii Labs curated archive" : "Fuentes: GDELT Project API (72h en vivo) + archivo curado Colibrii Labs"}
      </div>
    </Card>
  );
}

/* ── Main Export ── */
export function MediaIntelligence({ en, t, news, dark }) {
  return (
    <div>
      {/* 1. VIDEO INTELLIGENCE — Most prominent */}
      <ScrollReveal delay={50}>
        <TikTokSection en={en} t={t} />
      </ScrollReveal>

      {/* 2. NEWS INTELLIGENCE */}
      <ScrollReveal delay={100}>
        <NewsFeed news={news || []} en={en} t={t} />
      </ScrollReveal>

      {/* 3. GLOBAL LEADER VOICES */}
      <ScrollReveal delay={150}>
        <VipQuotesReel en={en} t={t} />
      </ScrollReveal>
    </div>
  );
}
