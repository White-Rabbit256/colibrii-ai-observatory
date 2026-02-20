"use client";
import { Icon } from "../system/Icon";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Mobile Bottom Navigation
   Sticky bottom tab bar (56px) visible only at < 768px
   5 key sections: Home, Index, Map, Security, More
   ═══════════════════════════════════════════════════════════════ */

const NAV_ITEMS = [
  { id: "home", icon: "home", label: { en: "Home", es: "Inicio" } },
  { id: "idx", icon: "chart", label: { en: "Index", es: "Índice" } },
  { id: "countries", icon: "globe", label: { en: "Countries", es: "Países" } },
  { id: "sec", icon: "shield", label: { en: "Security", es: "Seguridad" } },
  { id: "_more", icon: "menu", label: { en: "More", es: "Más" } },
];

export function BottomNav({ tab, setTab, en, t, onMoreClick }) {
  return (
    <nav className="bottom-nav" aria-label={en ? "Quick navigation" : "Navegación rápida"}>
      {NAV_ITEMS.map((item) => {
        const isActive = item.id !== "_more" && tab === item.id;
        const handleClick = () => {
          if (item.id === "_more") {
            onMoreClick?.();
          } else {
            setTab(item.id);
          }
        };
        return (
          <button
            key={item.id}
            className={`bottom-nav-item ${isActive ? "active" : ""}`}
            onClick={handleClick}
            aria-label={en ? item.label.en : item.label.es}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon name={item.icon} size={20} />
            <span className="bottom-nav-label">
              {en ? item.label.en : item.label.es}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
