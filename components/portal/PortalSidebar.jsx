"use client";
import { AnimatePresence, motion } from "framer-motion";
import { TABS } from "../data";
import { Icon } from "../system/Icon";
import { Flag } from "../ui";
import { FACTS } from "../../data/facts";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Portal Sidebar Navigation
   Fixed sidebar (desktop 220px) · Slide-over drawer (mobile)
   Grouped by category · SVG icons · Theme + lang toggles
   ═══════════════════════════════════════════════════════════════ */

const GROUPS = [
  { label: { es: "INTELIGENCIA", en: "INTELLIGENCE" }, ids: ["home", "zf", "pai", "pymes"] },
  { label: { es: "POLÍTICAS", en: "POLICY" }, ids: ["leg", "sec"] },
  { label: { es: "FORMACIÓN", en: "TRAINING" }, ids: ["edu", "glos"] },
  { label: { es: "HERRAMIENTAS", en: "TOOLS" }, ids: ["idx", "countries", "cmp", "algo", "sim"] },
  { label: { es: "ACERCA", en: "ABOUT" }, ids: ["about"] },
];

export function PortalSidebar({ tab, setTab, en, setEn, dark, setDark, t, mobileOpen, setMobileOpen }) {
  const navContent = (
    <div className="portal-sidebar-content">
      {/* Logo */}
      <div className="portal-sidebar-logo" onClick={() => { setTab("home"); setMobileOpen?.(false); }}>
        <img src="/colibrii-logo.png" alt="Colibrii Labs" className="logo-iridescent" style={{ width: 40, height: 40, flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, fontFamily: "var(--font-display, 'Playfair Display', serif)", color: t.tx }}>Colibrii Labs</div>
          <div style={{ fontSize: 8, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", letterSpacing: 1.5 }}>
            {FACTS.tagline.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Navigation Groups */}
      <nav className="portal-sidebar-nav" aria-label="Portal navigation">
        {GROUPS.map((g, gi) => (
          <div key={gi} className="portal-sidebar-group">
            <div className="portal-sidebar-group-label">{en ? g.label.en : g.label.es}</div>
            {g.ids.map(id => {
              const tabDef = TABS.find(t2 => t2.id === id);
              if (!tabDef) return null;
              const active = tab === id;
              return (
                <button
                  key={id}
                  className={`portal-sidebar-item ${active ? "active" : ""}`}
                  style={active ? { borderLeftColor: tabDef.c, color: tabDef.c, background: `${tabDef.c}10` } : {}}
                  onClick={() => { setTab(id); setMobileOpen?.(false); }}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon name={tabDef.ic} size={16} color={active ? tabDef.c : undefined} />
                  <span>{en ? tabDef.le : tabDef.l}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom Controls */}
      <div className="portal-sidebar-controls">
        <button
          className="portal-sidebar-toggle-btn"
          onClick={() => setDark(!dark)}
          aria-label={en ? "Toggle dark mode" : "Modo oscuro"}
        >
          <Icon name={dark ? "sun" : "moon"} size={14} />
          <span>{dark ? (en ? "Light" : "Claro") : (en ? "Dark" : "Oscuro")}</span>
        </button>
        <button
          className="portal-sidebar-toggle-btn"
          onClick={() => setEn(!en)}
          aria-label={en ? "Switch to Spanish" : "Cambiar a inglés"}
        >
          <Flag code={en ? "CR" : "GB"} size={16} />
          <span>{en ? "ES" : "EN"}</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="portal-sidebar portal-sidebar-desktop">
        {navContent}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="portal-sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="portal-sidebar portal-sidebar-mobile"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="portal-sidebar-mobile-close">
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <Icon name="x" size={20} />
                </button>
              </div>
              {navContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
