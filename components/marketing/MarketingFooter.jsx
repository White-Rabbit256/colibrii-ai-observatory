"use client";
import Link from "next/link";
import { FACTS } from "../../data/facts";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Marketing Footer (Dark Editorial)
   Brand identity, portal links, legal, CC BY-NC 4.0
   ═══════════════════════════════════════════════════════════════ */
export function MarketingFooter({ en }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mkt-footer">
      <div className="mkt-footer-inner">
        <div className="mkt-footer-brand">
          <div className="mkt-footer-logo">Colibrii Labs</div>
          <div className="mkt-footer-tagline">{FACTS.tagline}</div>
          <div className="mkt-footer-founder">
            {en ? "Founded by" : "Fundado por"} {FACTS.founder}
          </div>
          <a href={`mailto:${FACTS.email}`} className="mkt-footer-email">{FACTS.email}</a>
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
        </div>

        <div className="mkt-footer-legal">
          <p>
            {en
              ? `Data and analysis © ${FACTS.org} 2024–${year}. Licensed under CC BY-NC 4.0.`
              : `Datos y análisis © ${FACTS.org} 2024–${year}. Licencia CC BY-NC 4.0.`}
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
