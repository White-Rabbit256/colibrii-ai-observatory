"use client";
import { Icon } from "../system/Icon";
import { Flag } from "../ui";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Mobile Bottom Navigation
   Sticky bottom tab bar (56px) visible only at < 768px
   4 nav tabs + dark mode toggle + language toggle + more menu
   ═══════════════════════════════════════════════════════════════ */

const NAV_ITEMS = [
  { id: "home", icon: "home", label: { en: "Home", es: "Inicio" } },
  { id: "zf", icon: "factory", label: { en: "FTZ", es: "ZF" } },
  { id: "leg", icon: "legal", label: { en: "Law", es: "Ley" } },
  { id: "pymes", icon: "store", label: { en: "SMEs", es: "PYMES" } },
];

export function BottomNav({ tab, setTab, en, setEn, t, dark, setDark, onMoreClick }) {
  return (
    <nav className="bottom-nav" aria-label={en ? "Quick navigation" : "Navegación rápida"}>
      {/* Navigation items */}
      {NAV_ITEMS.map((item) => {
        const isActive = tab === item.id;
        return (
          <button
            key={item.id}
            className={`bottom-nav-item ${isActive ? "active" : ""}`}
            onClick={() => setTab(item.id)}
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

      {/* Dark mode toggle — icon only */}
      <button
        className="bottom-nav-item bottom-nav-toggle"
        onClick={() => setDark(!dark)}
        aria-label={en ? "Toggle dark mode" : "Modo oscuro"}
      >
        <Icon name={dark ? "sun" : "moon"} size={18} />
      </button>

      {/* Language toggle — icon only */}
      <button
        className="bottom-nav-item bottom-nav-toggle"
        onClick={() => setEn(!en)}
        aria-label={en ? "Switch to Spanish" : "Cambiar a inglés"}
      >
        <Flag code={en ? "CR" : "GB"} size={16} />
      </button>

      {/* More menu */}
      <button
        className="bottom-nav-item bottom-nav-toggle"
        onClick={() => onMoreClick?.()}
        aria-label={en ? "More" : "Más"}
      >
        <Icon name="menu" size={18} />
      </button>
    </nav>
  );
}
