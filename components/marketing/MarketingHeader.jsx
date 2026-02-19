"use client";
import { useState } from "react";
import Link from "next/link";
import { Icon } from "../system/Icon";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Marketing Header (Dark Editorial)
   Minimal dark header with bilingual toggle + CTA
   ═══════════════════════════════════════════════════════════════ */
export function MarketingHeader({ en, setEn }) {
  return (
    <header className="mkt-header">
      <div className="mkt-header-inner">
        <div className="mkt-wordmark" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/favicon.svg" alt="Colibrii Labs" className="logo-iridescent" style={{ width: 24, height: 24 }} />
          <span className="mkt-wordmark-text">Colibrii Labs</span>
        </div>
        <div className="mkt-header-actions">
          <button
            className="mkt-lang-toggle"
            onClick={() => setEn(!en)}
            aria-label={en ? "Cambiar a español" : "Switch to English"}
          >
            <Icon name="lang" size={14} />
            <span>{en ? "ES" : "EN"}</span>
          </button>
          <Link href="/app" className="mkt-cta-button">
            {en ? "Enter Portal" : "Entrar al Portal"}
            <Icon name="arrowRight" size={14} />
          </Link>
        </div>
      </div>
    </header>
  );
}
