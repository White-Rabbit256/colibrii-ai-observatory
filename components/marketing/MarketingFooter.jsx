"use client";
import Link from "next/link";
import { Icon } from "../system/Icon";
import { FACTS } from "../../data/facts";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Marketing Footer (Dark Editorial)
   Brand identity, portal links, social media, legal, CC BY-NC 4.0
   ═══════════════════════════════════════════════════════════════ */
export function MarketingFooter({ en }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mkt-footer">
      <div className="mkt-footer-inner">
        <div className="mkt-footer-brand">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <img src="/colibrii-logo.png" alt="Colibrii Labs" className="logo-iridescent" style={{ width: 32, height: 32 }} />
            <div className="mkt-footer-logo">Colibrii Labs</div>
          </div>
          <div className="mkt-footer-tagline">{FACTS.tagline}</div>
          <div className="mkt-footer-founder">
            {en ? "Founded by" : "Fundado por"} {FACTS.founder}
          </div>
          <a href={`mailto:${FACTS.email}`} className="mkt-footer-email">{FACTS.email}</a>
          {/* Social Media */}
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <a href="https://x.com/ColibriilLabs" target="_blank" rel="noopener noreferrer" style={{ color: "var(--mkt-text3)", transition: "color 0.2s" }} title="X (Twitter) — Coming Soon">
              <Icon name="twitter" size={16} />
            </a>
            <a href="https://instagram.com/colibriilabs" target="_blank" rel="noopener noreferrer" style={{ color: "var(--mkt-text3)", transition: "color 0.2s" }} title="Instagram — Coming Soon">
              <Icon name="instagram" size={16} />
            </a>
            <a href="https://www.tiktok.com/@colibrii.labs" target="_blank" rel="noopener noreferrer" style={{ color: "var(--mkt-text3)", transition: "color 0.2s" }} title="TikTok — @colibrii.labs">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.11V9.02a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.75a8.18 8.18 0 004.76 1.51V6.82a4.83 4.83 0 01-1-.13z"/></svg>
            </a>
            <a href={`mailto:${FACTS.email}`} style={{ color: "var(--mkt-text3)", transition: "color 0.2s" }} title={FACTS.email}>
              <Icon name="mail" size={16} />
            </a>
          </div>
        </div>

        <div className="mkt-footer-links">
          <div className="mkt-footer-col">
            <div className="mkt-footer-col-title">{en ? "Observatory" : "Observatorio"}</div>
            <Link href="/app">{en ? "AI Index" : "Índice AI"}</Link>
            <Link href="/app">{en ? "Country Profiles" : "Perfiles País"}</Link>
            <Link href="/app">{en ? "Policy Simulator" : "Simulador Política"}</Link>
          </div>
          <div className="mkt-footer-col">
            <div className="mkt-footer-col-title">{en ? "Research" : "Investigación"}</div>
            <Link href="/app">{en ? "Algorithms" : "Algoritmos"}</Link>
            <Link href="/app">{en ? "WEF 2026 Analysis" : "Análisis WEF 2026"}</Link>
            <Link href="/app">{en ? "Glossary" : "Glosario"}</Link>
          </div>
          <div className="mkt-footer-col">
            <div className="mkt-footer-col-title">{en ? "Connect" : "Conectar"}</div>
            <a href="https://x.com/ColibriilLabs" target="_blank" rel="noopener noreferrer">X / Twitter</a>
            <a href="https://instagram.com/colibriilabs" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.tiktok.com/@colibrii.labs" target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href={`mailto:${FACTS.email}`}>{FACTS.email}</a>
          </div>
        </div>

        <div className="mkt-footer-legal">
          <p>
            {en
              ? `Data and analysis \u00A9 ${FACTS.org} 2024\u2013${year}. Licensed under CC BY-NC 4.0.`
              : `Datos y an\u00E1lisis \u00A9 ${FACTS.org} 2024\u2013${year}. Licencia CC BY-NC 4.0.`}
          </p>
          <p className="mkt-footer-disclaimer">
            {en
              ? "Underlying data from World Bank, WEF, OECD, and other international sources retain their original licenses."
              : "Datos subyacentes del Banco Mundial, WEF, OCDE y otras fuentes internacionales mantienen sus licencias originales."}
          </p>
        </div>
      </div>
    </footer>
  );
}
