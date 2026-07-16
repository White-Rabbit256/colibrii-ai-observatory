"use client";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "../system/Icon";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Indicator Detail Drawer
   Slide-in panel for any KPI/stat card.
   Props: { open, onClose, indicator, en, t }
   indicator: { name, nameEs, value, definition, definitionEs,
                source, lastUpdated, interpretation, interpretationEs }
   ═══════════════════════════════════════════════════════════════ */
export function IndicatorDrawer({ open, onClose, indicator, en, t }) {
  /* Modal semantics: focus in on open, trap Tab, Escape closes, focus restored on close */
  const drawerRef = useRef(null);
  const lastFocused = useRef(null);
  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement;
    const focusable = () => drawerRef.current
      ? Array.from(drawerRef.current.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])'))
      : [];
    focusable()[0]?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab") return;
      const els = focusable();
      if (!els.length) return;
      const first = els[0], last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      lastFocused.current?.focus?.();
    };
  }, [open, onClose]);

  if (!indicator) return null;

  const handleCite = () => {
    const cite = `${en ? indicator.name : (indicator.nameEs || indicator.name)}. ${indicator.source || "Colibrii Labs"}. Accessed ${new Date().toISOString().split("T")[0]}.`;
    navigator.clipboard?.writeText(cite);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="indicator-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={drawerRef}
            className="indicator-drawer"
            role="dialog"
            aria-modal="true"
            aria-label={en ? (indicator.name || "Indicator detail") : (indicator.nameEs || indicator.name || "Detalle del indicador")}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            style={{ background: t.cardBg, borderLeft: `1px solid ${t.bd}` }}
          >
            {/* Header */}
            <div className="indicator-drawer-header">
              <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: "var(--font-display, 'Playfair Display', serif)", color: t.tx }}>
                {en ? indicator.name : (indicator.nameEs || indicator.name)}
              </h3>
              <button
                onClick={onClose}
                className="indicator-drawer-close"
                aria-label={en ? "Close" : "Cerrar"}
              >
                <Icon name="x" size={18} color={t.tx3} />
              </button>
            </div>

            {/* Value */}
            {indicator.value != null && (
              <div className="indicator-drawer-section">
                <div className="indicator-drawer-label">{en ? "CURRENT VALUE" : "VALOR ACTUAL"}</div>
                <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "'IBM Plex Mono',monospace", color: indicator.color || t.cy }}>
                  {indicator.value}
                </div>
                {indicator.trend && (
                  <div style={{ fontSize: 12, color: t.tx3, marginTop: 4 }}>{indicator.trend}</div>
                )}
              </div>
            )}

            {/* Definition */}
            <div className="indicator-drawer-section">
              <div className="indicator-drawer-label">{en ? "DEFINITION" : "DEFINICIÓN"}</div>
              <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7 }}>
                {en ? indicator.definition : (indicator.definitionEs || indicator.definition)}
              </p>
            </div>

            {/* Interpretation */}
            {(indicator.interpretation || indicator.interpretationEs) && (
              <div className="indicator-drawer-section">
                <div className="indicator-drawer-label">{en ? "INTERPRETATION" : "INTERPRETACIÓN"}</div>
                <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7 }}>
                  {en ? indicator.interpretation : (indicator.interpretationEs || indicator.interpretation)}
                </p>
              </div>
            )}

            {/* Source */}
            <div className="indicator-drawer-section">
              <div className="indicator-drawer-label">{en ? "DATA SOURCE" : "FUENTE DE DATOS"}</div>
              <p style={{ fontSize: 12, color: t.tx3 }}>{indicator.source || "Colibrii Labs / World Bank"}</p>
              {indicator.lastUpdated && (
                <p style={{ fontSize: 11, color: t.tx3, marginTop: 4 }}>
                  {en ? "Last updated:" : "Última actualización:"} {indicator.lastUpdated}
                </p>
              )}
            </div>

            {/* Cite this */}
            <div className="indicator-drawer-section">
              <button
                onClick={handleCite}
                className="indicator-drawer-cite"
                style={{ background: t.sf, color: t.tx2, border: `1px solid ${t.bd}` }}
              >
                <Icon name="copy" size={14} />
                <span>{en ? "Cite this indicator" : "Citar este indicador"}</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
