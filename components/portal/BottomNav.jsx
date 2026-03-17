"use client";
import { Icon } from "../system/Icon";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Mobile Bottom Navigation v3
   Premium 5-item floating dock with center "Explore" FAB
   Based on: Robinhood/Coinbase/Bloomberg patterns
   Expert panel: 5 items max (Apple HIG, Google MD3, Fitts's Law)
   ═══════════════════════════════════════════════════════════════ */

const NAV_ITEMS = [
  { id: "home",   icon: "home",   label: { en: "Home",     es: "Inicio" } },
  { id: "health", icon: "heart",  label: { en: "Health",   es: "Salud" } },
  { id: "explore", icon: "algo",  label: { en: "Explore",  es: "Explorar" }, center: true },
  { id: "banca",  icon: "bank",   label: { en: "Banking",  es: "Banca" } },
  { id: "sec",    icon: "shield", label: { en: "Security", es: "Seguridad" } },
];

export function BottomNav({ tab, setTab, en, onMoreClick }) {
  return (
    <nav className="bottom-nav" aria-label={en ? "Quick navigation" : "Navegación rápida"}>
      {NAV_ITEMS.map((item) => {
        const isCenter = item.center;
        const isActive = isCenter ? false : tab === item.id;

        return (
          <button
            key={item.id}
            className={`bottom-nav-item ${isActive ? "active" : ""} ${isCenter ? "bottom-nav-center" : ""}`}
            onClick={() => {
              if (isCenter) {
                onMoreClick?.();
              } else {
                setTab(item.id);
              }
            }}
            aria-label={en ? item.label.en : item.label.es}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon name={item.icon} size={isCenter ? 22 : 20} />
            <span className="bottom-nav-label">
              {en ? item.label.en : item.label.es}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
