"use client";
import { useState, useEffect, useMemo } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { CO, CC } from "./data";

/* =================================================================
   COLIBRII LABS -- World Map Mini v16 (react-simple-maps)
   Real TopoJSON world map with 20 highlighted CAPI-CR countries.
   Color by tier: green >= 0.65, amber 0.40-0.64, red < 0.40.
   Pulsing markers at country centroids. Hover tooltip.
   ================================================================= */

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

/* ISO alpha-3 to world-atlas numeric ID mapping */
const A3_TO_NUM = {
  SGP: "702", KOR: "410", JPN: "392", EST: "233", FIN: "246", IRL: "372",
  CHL: "152", URY: "858", CRI: "188", PAN: "591", BRA: "076", COL: "170",
  MEX: "484", ARG: "032", PER: "604", DOM: "214", VNM: "704", PHL: "608",
  MYS: "458", IDN: "360",
};

/* Reverse lookup: numeric ID -> alpha-3 */
const NUM_TO_A3 = Object.fromEntries(Object.entries(A3_TO_NUM).map(([a3, num]) => [num, a3]));

/* Lat/lng centroids for marker placement */
const GEO = {
  SGP: [103.8, 1.35], KOR: [127.0, 37.5], JPN: [139.7, 35.7],
  EST: [24.7, 59.4], FIN: [25.0, 61.9], IRL: [-7.6, 53.4],
  CHL: [-70.6, -33.4], URY: [-56.2, -34.9], CRI: [-84.0, 9.9],
  PAN: [-79.5, 8.5], BRA: [-47.9, -15.8], COL: [-74.1, 4.7],
  MEX: [-99.1, 19.4], ARG: [-58.4, -34.6], PER: [-77.0, -12.0],
  DOM: [-69.9, 18.5], VNM: [105.8, 21.0], PHL: [121.0, 14.6],
  MYS: [101.7, 3.1], IDN: [106.8, -6.2],
};

/* Tier color helpers */
const tierColor = (score) =>
  score >= 0.65 ? "#10b981" : score >= 0.40 ? "#f59e0b" : "#ef4444";

const tierLabel = (score, en) =>
  score >= 0.65
    ? (en ? "Ready" : "Preparado")
    : score >= 0.40
      ? (en ? "At Risk" : "En Riesgo")
      : (en ? "Deficit" : "Deficit");

export function WorldMapMini({ idx, en, t, dark, onCountryClick }) {
  const [topoData, setTopoData] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  /* Fetch TopoJSON */
  useEffect(() => {
    fetch(GEO_URL)
      .then((r) => r.json())
      .then(setTopoData)
      .catch(() => {});
  }, []);

  /* Build ranked country list */
  const countries = useMemo(() => {
    return CC.map((c) => {
      const score = idx[c]?.composite ?? 0;
      return { code: c, ...CO[c], score };
    })
      .sort((a, b) => b.score - a.score)
      .map((c, i) => ({ ...c, rank: i + 1 }));
  }, [idx]);

  /* Quick lookup by code */
  const countryMap = useMemo(
    () => Object.fromEntries(countries.map((c) => [c.code, c])),
    [countries],
  );

  /* Set of tracked numeric IDs for fast Geography fill */
  const trackedNums = useMemo(() => new Set(Object.values(A3_TO_NUM)), []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  if (!topoData) {
    /* Loading skeleton */
    return (
      <div className="world-map-wrapper">
        <div style={{ background: dark ? "rgba(30,41,59,0.3)" : "rgba(238,241,248,0.5)", borderRadius: 10, height: 320, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, letterSpacing: 1 }}>
            {en ? "Loading map..." : "Cargando mapa..."}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="world-map-wrapper"
      onMouseMove={handleMouseMove}
      style={{ position: "relative" }}
    >
      {/* Header */}
      <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
        {en ? "GLOBAL COVERAGE" : "COBERTURA GLOBAL"}
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "var(--font-display, 'Playfair Display', serif)", marginBottom: 12, color: t.tx }}>
        {en ? "20 Countries Tracked" : "20 Paises Monitoreados"}
      </div>

      {/* Map */}
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 160, center: [10, 5] }}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={topoData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const numId = geo.id;
              const a3 = NUM_TO_A3[numId];
              const isTracked = trackedNums.has(numId);
              const cData = a3 ? countryMap[a3] : null;

              let fill = dark ? "#1e293b" : "#e2e8f0";
              if (isTracked && cData) {
                fill = tierColor(cData.score);
              }

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fill}
                  stroke={dark ? "#334155" : "#d1d5e0"}
                  strokeWidth={0.5}
                  onClick={() => {
                    if (numId && NUM_TO_A3[numId] && onCountryClick) {
                      onCountryClick(NUM_TO_A3[numId]);
                    }
                  }}
                  style={{
                    default: { fill, stroke: dark ? "#334155" : "#d1d5e0", strokeWidth: 0.5, outline: "none", cursor: isTracked ? "pointer" : "default" },
                    hover: {
                      outline: "none",
                      fill: isTracked && cData ? `${tierColor(cData.score)}dd` : (dark ? "#334155" : "#cbd5e1"),
                      stroke: dark ? "#334155" : "#d1d5e0",
                      strokeWidth: isTracked ? 1 : 0.5,
                      cursor: isTracked ? "pointer" : "default",
                    },
                    pressed: { fill, outline: "none" },
                  }}
                  onMouseEnter={() => {
                    if (isTracked && cData) {
                      setTooltip(cData);
                    }
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              );
            })
          }
        </Geographies>

        {/* Pulsing markers */}
        {countries.map((c) => {
          const coords = GEO[c.code];
          if (!coords) return null;
          const isCR = c.code === "CRI";
          const color = isCR ? (t.cy || "#2563eb") : tierColor(c.score);
          const r = isCR ? 5 : 3.5;

          return (
            <Marker
              key={c.code}
              coordinates={coords}
              onMouseEnter={() => setTooltip(c)}
              onMouseLeave={() => setTooltip(null)}
              onClick={() => onCountryClick && onCountryClick(c.code)}
              style={{ cursor: "pointer" }}
            >
              {/* Pulse ring */}
              <circle
                r={r + 2}
                fill={color}
                fillOpacity={0.3}
                className="map-marker-pulse"
              />
              {/* Solid dot */}
              <circle
                r={r}
                fill={color}
                stroke="#fff"
                strokeWidth={1}
                style={{ cursor: "pointer" }}
              />
            </Marker>
          );
        })}
      </ComposableMap>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="world-map-tooltip"
          style={{
            left: mousePos.x,
            top: mousePos.y,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: 16 }}>{tooltip.f}</span>
            <span style={{ fontWeight: 700, fontSize: 13 }}>{en ? tooltip.e : tooltip.n}</span>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 700, fontSize: 14, color: tierColor(tooltip.score) }}>
              {(tooltip.score * 100).toFixed(1)}
            </span>
            <span style={{ fontSize: 11, color: dark ? "#94a3b8" : "#64748b" }}>
              CAPI-CR
            </span>
            <span style={{ fontSize: 11, fontFamily: "'IBM Plex Mono',monospace", color: dark ? "#94a3b8" : "#64748b" }}>
              #{tooltip.rank}
            </span>
            <span style={{
              fontSize: 10,
              fontWeight: 600,
              padding: "1px 6px",
              borderRadius: 4,
              background: `${tierColor(tooltip.score)}18`,
              color: tierColor(tooltip.score),
            }}>
              {tierLabel(tooltip.score, en)}
            </span>
          </div>
          {onCountryClick && (
            <div style={{ fontSize: 9, color: t.tx3, marginTop: 4, fontStyle: "italic" }}>
              {en ? "Click to explore" : "Click para explorar"}
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 8, fontSize: 11, color: t.tx3 }}>
        <span>
          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#10b981", marginRight: 4 }} />
          {en ? "Ready" : "Preparado"} ({"\u2265"}65)
        </span>
        <span>
          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", marginRight: 4 }} />
          {en ? "At Risk" : "En Riesgo"} (40-64)
        </span>
        <span>
          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#ef4444", marginRight: 4 }} />
          {en ? "Deficit" : "Deficit"} (&lt;40)
        </span>
      </div>
    </div>
  );
}
