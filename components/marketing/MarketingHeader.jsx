"use client";
import { useState } from "react";
import Link from "next/link";
import { Icon } from "../system/Icon";
import { Flag } from "../ui";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Marketing Header (Dark Editorial)
   Minimal dark header with bilingual toggle + CTA
   ═══════════════════════════════════════════════════════════════ */
export function MarketingHeader({ en, setEn }) {
  return (
    <header className="mkt-header">
      <div className="mkt-header-inner">
        <div className="mkt-wordmark" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/colibrii-logo.png" alt="Colibrii Labs" className="logo-iridescent" style={{ width: 56, height: 56 }} />
          <span className="mkt-wordmark-text">Colibrii Labs</span>
        </div>
        <div className="mkt-header-actions">
          <button
            className="mkt-lang-toggle"
            onClick={() => setEn(!en)}
            aria-label={en ? "Cambiar a español" : "Switch to English"}
          >
            <Flag code={en ? "CR" : "GB"} size={16} />
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
