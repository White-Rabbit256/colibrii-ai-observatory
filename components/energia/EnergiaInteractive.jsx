"use client";
/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Energía · Interactives
   EcaiExplorer · TariffComparator · ScenarioExplorer
   Built by the Section Factory (Run #1) — viz-engineer stage.
   Data contract: ../energiaData.js (frozen). Honest math only:
   renormalization is visible, no hidden clamps, sources cited.
   ═══════════════════════════════════════════════════════════════ */
import { useMemo, useState } from "react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import { ECAI, TARIFFS, SCENARIOS, EN_ACCENT } from "../energiaData";

/* ── Shared helpers ── */
const T = (v, en) => (v && typeof v === "object" && !Array.isArray(v) && ("es" in v) ? (en ? v.en : v.es) : v);
const MONO = "'IBM Plex Mono',monospace";
const fmtScore = (s, en) => (en ? s.toFixed(2) : s.toFixed(2).replace(".", ","));
const fmtMoney = (v, en) => "$" + v.toLocaleString(en ? "en-US" : "es-CR", { maximumFractionDigits: 0 });

const codeChip = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  minWidth: 36, padding: "3px 6px", borderRadius: 6,
  background: "var(--surface)", border: "1px solid var(--border)",
  fontFamily: MONO, fontSize: 10.5, fontWeight: 700, letterSpacing: 1, color: "var(--text2)",
};

/* ═══════════════════════════════════════════════════════════════
   1 · ECAI EXPLORER — composite index with reader-adjustable weights
   ═══════════════════════════════════════════════════════════════ */

/* Defaults stored as integer percentages (0-50): 30 / 25 / 20 / 15 / 10 */
const ECAI_DEFAULTS = Object.fromEntries(ECAI.weights.map((w) => [w.id, Math.round(w.w * 100)]));

/* Short chip names for the normalized-weights row ("Tarifa 30% · Limpia 25% · …") */
const ECAI_SHORT = {
  tariff: { es: "Tarifa", en: "Tariff" },
  clean: { es: "Limpia", en: "Clean" },
  saidi: { es: "SAIDI", en: "SAIDI" },
  headroom: { es: "Margen", en: "Headroom" },
  mer: { es: "MER", en: "MER" },
};

export function EcaiExplorer({ en }) {
  const [vals, setVals] = useState({ ...ECAI_DEFAULTS });

  /* ── Honest renormalization: effective weight = value / Σvalues (Σ=1) ── */
  const sum = useMemo(() => ECAI.weights.reduce((s, w) => s + (vals[w.id] || 0), 0), [vals]);
  const eff = useMemo(() => {
    const o = {};
    ECAI.weights.forEach((w) => { o[w.id] = sum === 0 ? w.w : (vals[w.id] || 0) / sum; });
    return o; /* all-zero → published weights, stated in the method note */
  }, [vals, sum]);
  const dirty = useMemo(() => ECAI.weights.some((w) => vals[w.id] !== ECAI_DEFAULTS[w.id]), [vals]);

  /* ── Composite score per country, sorted DESC ── */
  const ranked = useMemo(
    () => ECAI.countries
      .map((c) => ({ ...c, score: ECAI.weights.reduce((s, w) => s + eff[w.id] * c.comp[w.id], 0) }))
      .sort((a, b) => b.score - a.score),
    [eff]
  );

  return (
    <div>
      {/* ── Weight sliders ── */}
      <div style={{ marginBottom: 6 }}>
        {ECAI.weights.map((w) => {
          const label = T(w.label, en);
          return (
            <div key={w.id} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                <label htmlFor={`ecai-w-${w.id}`} style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text2)" }}>
                  {label}
                </label>
                <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 700, color: EN_ACCENT.turquoise }}>
                  {vals[w.id]}%
                </span>
              </div>
              <input
                id={`ecai-w-${w.id}`}
                type="range"
                min={0}
                max={50}
                step={1}
                value={vals[w.id]}
                onChange={(e) => setVals((v) => ({ ...v, [w.id]: +e.target.value }))}
                aria-label={label}
                aria-valuetext={`${vals[w.id]}%`}
                style={{ display: "block", width: "100%", height: 40, margin: 0, accentColor: "#00B5A8", cursor: "pointer" }}
              />
              <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 1 }}>{T(w.hint, en)}</div>
            </div>
          );
        })}
      </div>

      {/* ── Normalized weights chips + reset ── */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6, marginBottom: 18 }}>
        <span style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--text3)", fontFamily: MONO, marginRight: 2 }}>
          {en ? "Effective weights (Σ=1)" : "Pesos efectivos (Σ=1)"}
        </span>
        {ECAI.weights.map((w) => (
          <span
            key={w.id}
            style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 999, background: "var(--surface)", border: "1px solid var(--border)", fontSize: 11, color: "var(--text2)" }}
          >
            {T(ECAI_SHORT[w.id], en)}
            <b style={{ fontFamily: MONO, fontWeight: 700 }}>{Math.round(eff[w.id] * 100)}%</b>
          </span>
        ))}
        {dirty && (
          <span style={{ fontSize: 10.5, fontStyle: "italic", color: "var(--text3)" }}>
            ({en ? "reader-adjusted weights" : "pesos ajustados por el lector"})
          </span>
        )}
        <button
          type="button"
          onClick={() => setVals({ ...ECAI_DEFAULTS })}
          aria-label={en ? "Reset weights to published values" : "Restablecer pesos publicados"}
          style={{ marginLeft: "auto", minHeight: 40, padding: "6px 14px", border: "1px solid var(--border)", borderRadius: 8, background: "var(--card)", color: "var(--text2)", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
        >
          ↺ {en ? "Reset" : "Restablecer"}
        </button>
      </div>

      {/* ── Ranked horizontal bars (scale 0→1, bars start at zero) ── */}
      <div style={{ marginBottom: 14 }}>
        {ranked.map((c) => {
          const cr = !!c.highlight;
          return (
            <div key={c.code} style={{ display: "grid", gridTemplateColumns: "40px minmax(84px, 118px) 1fr 52px", gap: 10, alignItems: "center", marginBottom: 8 }}>
              <span style={{ ...codeChip, ...(cr ? { borderColor: EN_ACCENT.turquoise, color: EN_ACCENT.turquoise } : {}) }}>{c.code}</span>
              <span style={{ fontSize: 12.5, fontWeight: cr ? 700 : 500, color: cr ? "var(--text)" : "var(--text2)" }}>
                {T(c.name, en)}
              </span>
              <div style={{ height: 14, borderRadius: 7, background: "var(--surface)", border: "1px solid var(--border)", overflow: "hidden" }} aria-hidden="true">
                <div
                  style={{
                    height: "100%",
                    width: `${(c.score * 100).toFixed(1)}%`,
                    borderRadius: 7,
                    background: cr ? EN_ACCENT.turquoise : "rgba(129,140,248,0.65)",
                    transition: "width .6s ease",
                  }}
                />
              </div>
              <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 700, color: cr ? EN_ACCENT.turquoise : "var(--text2)", textAlign: "right" }}>
                {fmtScore(c.score, en)}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Method + reading ── */}
      <p style={{ fontSize: 11.5, color: "var(--text3)", lineHeight: 1.55, margin: "0 0 8px" }}>{T(ECAI.method, en)}</p>
      <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>{T(ECAI.reading, en)}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   2 · TARIFF COMPARATOR — MWh/month → annual cost across 8 countries
   ═══════════════════════════════════════════════════════════════ */

const TARIFF_PRESETS = [
  { v: 100, tag: null },
  { v: 400, tag: { es: "industria mediana", en: "mid-size industry" } },
  { v: 5000, tag: { es: "data center pequeño", en: "small data centre" } },
];

export function TariffComparator({ en }) {
  const [raw, setRaw] = useState("400");

  /* NaN / empty / negative guard → 0 → costs render as "—" */
  const mwh = useMemo(() => {
    const n = parseFloat(raw);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }, [raw]);

  const rows = useMemo(() => [...TARIFFS.rows].sort((a, b) => a.lo - b.lo), []);
  const usRate = useMemo(() => {
    const us = TARIFFS.rows.find((r) => r.benchmark);
    return us ? us.lo : 81.3;
  }, []);

  const annual = (rate) => mwh * 12 * rate; /* US$/MWh × MWh/month × 12 */
  const costLabel = (r) => {
    if (mwh === 0) return "—";
    return r.lo === r.hi
      ? fmtMoney(annual(r.lo), en)
      : `${fmtMoney(annual(r.lo), en)} – ${fmtMoney(annual(r.hi), en)}`;
  };

  /* CR vs US-benchmark delta at current consumption (lo–hi band) */
  const crDelta = useMemo(() => {
    const cr = TARIFFS.rows.find((r) => r.highlight);
    if (!cr || mwh === 0) return null;
    return { lo: (cr.lo - usRate) * mwh * 12, hi: (cr.hi - usRate) * mwh * 12 };
  }, [mwh, usRate]);

  const unitMo = en ? "MWh/mo" : "MWh·mes";

  return (
    <div>
      {/* ── Consumption input + presets ── */}
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="tariff-mwh" style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "var(--text2)", marginBottom: 6 }}>
          {en ? "Monthly consumption (MWh)" : "Consumo mensual (MWh)"}
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
          <input
            id="tariff-mwh"
            type="number"
            min={1}
            max={100000}
            step={1}
            inputMode="decimal"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            style={{ width: 130, minHeight: 40, padding: "6px 10px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--card)", color: "var(--text)", fontFamily: MONO, fontSize: 14, fontWeight: 600 }}
          />
          {TARIFF_PRESETS.map((p) => {
            const on = mwh === p.v;
            return (
              <button
                key={p.v}
                type="button"
                onClick={() => setRaw(String(p.v))}
                aria-pressed={on}
                style={{
                  minHeight: 40, padding: "5px 12px", borderRadius: 999, cursor: "pointer", textAlign: "left",
                  border: on ? `1.5px solid ${EN_ACCENT.turquoise}` : "1.5px solid var(--border)",
                  background: on ? "rgba(0,181,168,0.12)" : "var(--surface)",
                  color: on ? "var(--text)" : "var(--text2)", fontSize: 12, fontWeight: on ? 700 : 500,
                }}
              >
                <span style={{ fontFamily: MONO }}>{p.v.toLocaleString(en ? "en-US" : "es-CR")} {unitMo}</span>
                {p.tag && <span style={{ display: "block", fontSize: 10, color: "var(--text3)", fontWeight: 400 }}>{T(p.tag, en)}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Column header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "0 12px", marginBottom: 6, fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--text3)", fontFamily: MONO }}>
        <span>{en ? "Country · basis" : "País · base"}</span>
        <span>{en ? "Annual cost (US$)" : "Costo anual (US$)"}</span>
      </div>

      {/* ── Country rows, sorted by lo ASC ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
        {rows.map((r) => {
          const cr = !!r.highlight;
          const us = !!r.benchmark;
          return (
            <div
              key={r.code}
              style={{
                padding: "10px 12px", borderRadius: 8,
                background: us ? "rgba(242,177,53,0.10)" : "var(--card)",
                border: "1px solid var(--border)",
                borderLeft: cr ? `3px solid ${EN_ACCENT.turquoise}` : "3px solid transparent",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                  <span style={{ ...codeChip, ...(cr ? { borderColor: EN_ACCENT.turquoise, color: EN_ACCENT.turquoise } : us ? { borderColor: EN_ACCENT.gold, color: EN_ACCENT.gold } : {}) }}>{r.code}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: cr ? 800 : 600, color: "var(--text)" }}>{T(r.country, en)}</div>
                    <div style={{ fontSize: 10.5, color: "var(--text3)" }}>
                      <span style={{ fontFamily: MONO }}>{r.lo === r.hi ? r.lo : `${r.lo}–${r.hi}`} US$/MWh</span> · {T(r.basis, en)}
                    </div>
                  </div>
                </div>
                <div style={{ fontFamily: MONO, fontSize: 13.5, fontWeight: cr ? 800 : 700, color: cr ? EN_ACCENT.turquoise : us ? EN_ACCENT.gold : "var(--text)", whiteSpace: "nowrap" }}>
                  {costLabel(r)}
                </div>
              </div>
              {cr && (
                <div style={{ marginTop: 6, fontSize: 11.5, color: "var(--text2)" }}>
                  {en ? "vs. US average: " : "vs. promedio EE. UU.: "}
                  {crDelta ? (
                    <b style={{ fontFamily: MONO }}>
                      {crDelta.lo >= 0 ? "+" : "−"}{fmtMoney(Math.abs(crDelta.lo), en)}–{fmtMoney(Math.abs(crDelta.hi), en)}{en ? "/yr" : "/año"}
                    </b>
                  ) : "—"}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Caveat + sources ── */}
      <p style={{ fontSize: 11.5, color: "var(--text3)", lineHeight: 1.55, margin: "0 0 6px" }}>{T(TARIFFS.caveat, en)}</p>
      <p style={{ fontSize: 10.5, color: "var(--text3)", fontFamily: MONO, margin: 0 }}>
        {en ? "Sources" : "Fuentes"}: SEG Ingeniería · EIA · ARESEP/ICE · CICR · Enerdata
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   3 · SCENARIO EXPLORER — demand index to 2050 (published points only)
   ═══════════════════════════════════════════════════════════════ */

function ScenTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 10px", boxShadow: "0 4px 14px rgba(0,0,0,0.18)" }}>
      <div style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{label}</div>
      {payload.map((p) => {
        if (p.value == null) return null;
        const d = Math.round(p.value - 100);
        return (
          <div key={p.dataKey} style={{ display: "flex", alignItems: "baseline", gap: 6, fontSize: 11.5, color: p.color || p.stroke, marginBottom: 2 }}>
            <span>{p.name}</span>
            <span style={{ fontFamily: MONO, fontWeight: 700 }}>
              {p.value} ({d >= 0 ? "+" : ""}{d}% vs 2024)
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function ScenarioExplorer({ en }) {
  const [active, setActive] = useState(() => Object.fromEntries(SCENARIOS.rows.map((r) => [r.id, true])));

  /* At least one scenario stays on: ignore the click that would zero them out */
  const toggle = (id) =>
    setActive((a) => {
      if (a[id] && Object.values(a).filter(Boolean).length === 1) return a;
      return { ...a, [id]: !a[id] };
    });

  /* Merge published points by year — no invented inter-year data */
  const chartData = useMemo(() => {
    const years = [...new Set(SCENARIOS.rows.flatMap((r) => r.points.map((p) => p.year)))].sort((a, b) => a - b);
    return years.map((year) => {
      const row = { year };
      SCENARIOS.rows.forEach((r) => {
        const p = r.points.find((pt) => pt.year === year);
        row[r.id] = p ? p.idx : null;
      });
      return row;
    });
  }, []);

  const activeRows = useMemo(() => SCENARIOS.rows.filter((r) => active[r.id]), [active]);

  return (
    <div>
      {/* ── Scenario toggle chips ── */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
        {SCENARIOS.rows.map((r) => {
          const on = !!active[r.id];
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => toggle(r.id)}
              aria-pressed={on}
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                minHeight: 40, padding: "8px 14px", borderRadius: 999, cursor: "pointer",
                background: on ? `${r.color}2E` : "var(--surface)",
                border: on ? `1.5px solid ${r.color}` : "1.5px solid var(--border)",
                color: on ? "var(--text)" : "var(--text2)",
                fontSize: 12.5, fontWeight: on ? 700 : 500,
              }}
            >
              <span aria-hidden="true" style={{ width: 9, height: 9, borderRadius: "50%", background: r.color, opacity: on ? 1 : 0.45 }} />
              {T(r.label, en)}
            </button>
          );
        })}
      </div>

      {/* ── Chart: 3 published points per scenario, dots emphasized ── */}
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 14, right: 22, bottom: 4, left: 10 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" />
            <XAxis
              dataKey="year"
              type="number"
              domain={[2024, 2050]}
              ticks={[2024, 2035, 2050]}
              tick={{ fill: "var(--text3)", fontSize: 11, fontFamily: MONO }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={{ stroke: "var(--border)" }}
            />
            <YAxis
              domain={[80, 340]}
              ticks={[100, 170, 230, 320]}
              tick={{ fill: "var(--text3)", fontSize: 11, fontFamily: MONO }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={{ stroke: "var(--border)" }}
              label={{ value: en ? "Index (2024=100)" : "Índice (2024=100)", angle: -90, position: "insideLeft", offset: 4, style: { fill: "var(--text3)", fontSize: 11 } }}
            />
            <Tooltip content={<ScenTooltip />} />
            {activeRows.map((r) => (
              <Line
                key={r.id}
                dataKey={r.id}
                name={T(r.label, en)}
                type="linear"
                stroke={r.color}
                strokeWidth={2.5}
                dot={{ r: 4, fill: r.color, strokeWidth: 0 }}
                activeDot={{ r: 5 }}
                connectNulls
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ── Per-scenario summary chips ── */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
        {activeRows.map((r) => {
          const end = r.points[r.points.length - 1];
          return (
            <span
              key={r.id}
              style={{ padding: "6px 10px", borderRadius: 8, background: "var(--surface)", border: "1px solid var(--border)", borderLeft: `3px solid ${r.color}`, fontSize: 11.5, color: "var(--text2)" }}
            >
              {T(r.label, en)} · <b>{r.growth}</b> ·{" "}
              <span style={{ fontFamily: MONO, fontWeight: 700, color: "var(--text)" }}>2050: +{end.idx - 100}%</span>
            </span>
          );
        })}
      </div>

      {/* ── Method note + implication callout ── */}
      <p style={{ fontSize: 11.5, color: "var(--text3)", lineHeight: 1.55, margin: "12px 0 10px" }}>{T(SCENARIOS.method, en)}</p>
      <div style={{ borderLeft: `3px solid ${EN_ACCENT.gold}`, background: "var(--surface)", padding: "12px 14px", borderRadius: 10 }}>
        <div style={{ fontSize: 13.5, color: "var(--text)", lineHeight: 1.6 }}>{T(SCENARIOS.implication, en)}</div>
      </div>
    </div>
  );
}
