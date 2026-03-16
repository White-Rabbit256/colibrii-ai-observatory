"use client";
import { Icon } from "../system/Icon";
import { Flag } from "../ui";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Mobile Bottom Navigation v2
   Cleaner icon-based dock with 7 items, center highlight
   Visible only at < 768px
   ═══════════════════════════════════════════════════════════════ */

const NAV_ITEMS = [
  { id: "home",   icon: "home",    label: { en: "Home",    es: "Inicio" } },
  { id: "banca",  icon: "coins",   label: { en: "Banking", es: "Banca" } },
  { id: "health", icon: "heart",   label: { en: "Health",  es: "Salud" } },
  { id: "edu",    icon: "edu",     label: { en: "Edu",     es: "Edu" }, center: true },
  { id: "zf",     icon: "factory", label: { en: "FTZ",     es: "ZF" } },
  { id: "leg",    icon: "legal",   label: { en: "Law",     es: "Ley" } },
  { id: "pymes",  icon: "store",   label: { en: "SMEs",    es: "PYMES" } },
];

export function BottomNav({ tab, setTab, en, setEn, t, dark, setDark, onMoreClick }) {
  return (
    <nav className="bottom-nav bottom-nav-v2" aria-label={en ? "Quick navigation" : "Navegación rápida"}>
      {/* Main navigation items */}
      {NAV_ITEMS.map((item) => {
        const isActive = tab === item.id;
        return (
          <button
            key={item.id}
            className={`bottom-nav-item ${isActive ? "active" : ""} ${item.center ? "bottom-nav-center" : ""}`}
            onClick={() => setTab(item.id)}
            aria-label={en ? item.label.en : item.label.es}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon name={item.icon} size={item.center ? 22 : 20} />
            <span className="bottom-nav-label">
              {en ? item.label.en : item.label.es}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
