"use client";
import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { DM, SIM_PRESETS } from "./data";
import { Card, SH, Tag, Grid, AN, ScrollReveal, DimBadge, Ci, MiniStat, fadeUp } from "./ui";

/* ═══════════════════════════════════════════════════════════════
   POLICY SIMULATOR v13 — What-if sliders for CR (NEW TAB)
   6 dimension sliders, presets, real-time score recalculation
   ═══════════════════════════════════════════════════════════════ */

export function Simulator({ en, t, idx, dark }) {
  const crScores = idx?.CRI || {};
  const presets = SIM_PRESETS(en);

  /* ── Slider state: overrides per dimension ── */
  const [overrides, setOverrides] = useState(() => {
    const o = {};
    Object.keys(DM).forEach(dk => { o[dk] = crScores[dk] != null ? crScores[dk] : 0.38; });
    return o;
  });

  /* Reset when CR data arrives */
  const resetToActual = useCallback(() => {
    const o = {};
    Object.keys(DM).forEach(dk => { o[dk] = crScores[dk] != null ? crScores[dk] : 0.38; });
    setOverrides(o);
  }, [crScores]);

  /* Apply a preset */
  const applyPreset = (preset) => {
    const next = { ...overrides };
    // Absolute changes: set dimension to exact value
    if (preset.changes) {
      Object.entries(preset.changes).forEach(([dk, val]) => {
        next[dk] = Math.min(1, Math.max(0, val));
      });
    }
    // Relative deltas: add to current dimension value
    if (preset.deltas) {
      Object.entries(preset.deltas).forEach(([dk, val]) => {
        next[dk] = Math.min(1, Math.max(0, (next[dk] || 0) + val));
      });
    }
    setOverrides(next);
  };

  /* Compute simulated composite */
  const simComposite = useMemo(() => Object.entries(DM).reduce((s, [dk, { w }]) => s + (overrides[dk] ?? 0) * w, 0), [overrides]);
  const actualComposite = useMemo(() => Object.entries(DM).reduce((s, [dk, { w }]) => s + (crScores[dk] ?? 0) * w, 0), [crScores]);
  const delta = simComposite - actualComposite;

  /* Radar data: actual vs simulated */
  const radarData = Object.entries(DM).map(([dk, d]) => ({
    dim: en ? d.e : d.l,
    actual: crScores[dk] != null ? +(crScores[dk] * 100).toFixed(1) : 0,
    simulated: +(overrides[dk] * 100).toFixed(1)
  }));

  /* Rank simulation: where would CR rank with simulated score */
  const simRank = useMemo(() => {
    if (!idx || !Object.keys(idx).length) return null;
    const others = Object.entries(idx).filter(([c]) => c !== "CRI").map(([c, s]) => s.composite ?? 0);
    const rank = others.filter(v => v > simComposite).length + 1;
    return rank;
  }, [idx, simComposite]);

  return (
    <div>
      <SH color={t.am} label={en ? "What-if Analysis" : "Análisis What-if"} title={en ? "Policy Simulator" : "Simulador de Políticas"} desc={en ? "Adjust CR's 6 CAPI-CR dimensions to model the impact of policy interventions. See how passing an AI law, completing SOC-CR, or doubling R&D would change CR's score and rank." : "Ajusta las 6 dimensiones CAPI-CR de Costa Rica para modelar el impacto de intervenciones de política. Ve cómo aprobar una ley AI, completar SOC-CR, o duplicar I+D cambiarían el score y ranking."} />

      {/* Presets */}
      <Card style={{ marginBottom: 20, padding: 16 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.am, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
          {en ? "POLICY PRESETS" : "PRESETS DE POLÍTICA"}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          {presets.map((p, i) => (
            <button key={i} onClick={() => applyPreset(p)} style={{ padding: "8px 14px", border: `1px solid ${t.bd}`, borderRadius: 8, background: t.sf, color: t.tx, fontSize: 12, fontWeight: 600, textAlign: "left" }}>
              <div>{p.nm}</div>
              <div style={{ fontSize: 10, color: t.tx3, fontWeight: 400, marginTop: 2 }}>{p.desc}</div>
            </button>
          ))}
          <button onClick={resetToActual} style={{ padding: "8px 14px", border: `1px solid ${t.rd}30`, borderRadius: 8, background: `${t.rd}08`, color: t.rd, fontSize: 12, fontWeight: 600 }}>
            ↺ {en ? "Reset" : "Restablecer"}
          </button>
        </div>
      </Card>

      <Grid cols="1fr 1fr" gap={16} style={{ marginBottom: 20 }}>
        {/* Left: Sliders */}
        <Card style={{ padding: 20 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.vi, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 16 }}>
            {en ? "DIMENSION CONTROLS" : "CONTROLES DIMENSIONALES"}
          </div>
          {Object.entries(DM).map(([dk, d]) => (
            <div key={dk} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <DimBadge dim={d} en={en} />
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace" }}>
                    {crScores[dk] != null ? (crScores[dk] * 100).toFixed(0) : "—"}
                  </span>
                  <span style={{ fontSize: 10, color: t.tx3 }}>→</span>
                  <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "'IBM Plex Mono',monospace", color: d.co }}>
                    {(overrides[dk] * 100).toFixed(0)}
                  </span>
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(overrides[dk] * 100)}
                onChange={e => setOverrides({ ...overrides, [dk]: e.target.value / 100 })}
                style={{ accentColor: d.co }}
                aria-label={`${en ? d.e : d.l} score`}
              />
            </div>
          ))}
        </Card>

        {/* Right: Results */}
        <div>
          {/* Score summary */}
          <Card accent={delta > 0 ? t.gn : delta < 0 ? t.rd : t.cy} style={{ marginBottom: 12 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.cy, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 8 }}>
                {en ? "SIMULATED CAPI-CR" : "CAPI-CR SIMULADO"}
              </div>
              <div style={{ fontSize: 40, fontWeight: 900, fontFamily: "'IBM Plex Mono',monospace", color: t.cy }}>
                <AN v={simComposite * 100} p={1} />
              </div>
              <div style={{ fontSize: 14, color: delta > 0 ? t.gn : delta < 0 ? t.rd : t.tx3, fontWeight: 700, marginTop: 4 }}>
                {delta > 0 ? "▲" : delta < 0 ? "▼" : "—"} {Math.abs(delta * 100).toFixed(1)} {en ? "pts from actual" : "pts del actual"}
              </div>
              <Grid cols="1fr 1fr" gap={8} style={{ marginTop: 12 }}>
                <MiniStat label={en ? "Actual" : "Actual"} value={(actualComposite * 100).toFixed(1)} color={t.tx2} mono />
                <MiniStat label={en ? "Sim. Rank" : "Ranking Sim."} value={simRank ? `#${simRank}` : "—"} color={t.vi} mono />
              </Grid>
            </div>
          </Card>

          {/* Radar overlay */}
          <Card>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.vi, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 10 }}>
              {en ? "ACTUAL vs SIMULATED" : "ACTUAL vs SIMULADO"}
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke={dark ? "#1e293b" : "#d1d5e0"} />
                <PolarAngleAxis dataKey="dim" tick={{ fontSize: 9, fill: dark ? "#94a3b8" : "#475569" }} />
                <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                <Radar name={en ? "Actual" : "Actual"} dataKey="actual" stroke={t.tx3} fill={t.tx3} fillOpacity={0.05} strokeWidth={1.5} strokeDasharray="4 2" />
                <Radar name={en ? "Simulated" : "Simulado"} dataKey="simulated" stroke={t.cy} fill={t.cy} fillOpacity={0.15} strokeWidth={2.5} />
                <Tooltip contentStyle={{ background: dark ? "#111827" : "#fff", border: `1px solid ${dark ? "#1e293b" : "#d1d5e0"}`, borderRadius: 8, fontSize: 11 }} />
              </RadarChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", fontSize: 12 }}>
              <span><span style={{ color: t.tx3 }}>- -</span> {en ? "Actual" : "Actual"}</span>
              <span><span style={{ color: t.cy }}>●</span> {en ? "Simulated" : "Simulado"}</span>
            </div>
          </Card>
        </div>
      </Grid>

      {/* Interpretation */}
      <Card style={{ background: `${t.am}06` }}>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.am, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 8 }}>
          {en ? "INTERPRETATION" : "INTERPRETACIÓN"}
        </div>
        <p style={{ fontSize: 13, color: t.tx2, lineHeight: 1.7 }}>
          {en
            ? `With these adjustments, Costa Rica would score ${(simComposite * 100).toFixed(1)}/100 (${delta > 0 ? "+" : ""}${(delta * 100).toFixed(1)} pts), ranking #${simRank ?? "—"} among 20 peers. Key insight: AI regulation (D4) and digital security (D6) are CR's largest policy levers — moving either from current levels to 0.65+ would have the highest marginal impact.`
            : `Con estos ajustes, Costa Rica obtendría ${(simComposite * 100).toFixed(1)}/100 (${delta > 0 ? "+" : ""}${(delta * 100).toFixed(1)} pts), ranking #${simRank ?? "—"} entre 20 pares. Insight clave: regulación AI (D4) y seguridad digital (D6) son las mayores palancas de política — mover cualquiera del nivel actual a 0.65+ tendría el mayor impacto marginal.`
          }
        </p>
        <Ci s={en ? "Model: CAPI-CR composite with slider overrides. For illustrative purposes." : "Modelo: compuesto CAPI-CR con ajustes manuales. Con fines ilustrativos."} />
      </Card>
    </div>
  );
}
