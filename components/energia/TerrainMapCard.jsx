"use client";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { PLANTS_GEO, CR_OUTLINE_GEO } from "./crGeo";
import { EN_ACCENT } from "../energiaData";

/* ═══════════════════════════════════════════════════════════════
   ENERGÍA — TerrainMapCard (interactive satellite grid map)
   The in-flow "Red eléctrica de Costa Rica" card on real satellite
   imagery + terrain DEM: the subaxa-style photographic register with
   the section's data on top. Plant markers keep the KIND legend
   colors, every feeder links to the GAM load core, and tapping a
   marker (or a chip on small screens) opens the same info card
   pattern as the SVG CRGridMap.

   Token-gated: without NEXT_PUBLIC_MAPBOX_TOKEN, EnergiaDeep keeps
   rendering the SVG CRGridMap — never a broken section. Scroll-zoom
   off (page scroll wins); drag on desktop only. Attribution kept.
   ═══════════════════════════════════════════════════════════════ */

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const NAVY = EN_ACCENT.navy;
const NAVY2 = EN_ACCENT.navy2 || "#10294f";
const TURQ = EN_ACCENT.turquoise;
const GLOW = EN_ACCENT.glow;
const GOLD = EN_ACCENT.gold;

/* Legend palette — matches CRGridMap/globe categories; red = thermal only */
const KIND = {
  hydro: "#10B981", geo: "#D97706", wind: "#38BDF8",
  solar: "#FB923C", thermal: "#F87171", load: "#FFFFFF",
};
const KIND_LABEL = {
  hydro: ["Hidro", "Hydro"], geo: ["Geotérmica", "Geothermal"], wind: ["Eólica", "Wind"],
  solar: ["Solar", "Solar"], thermal: ["Térmica", "Thermal"], load: ["Carga", "Load"],
};
const DETAIL_EN = {
  reventazon: "305 MW · hydro", arenal: "Arenal + Corobicí + Sandillal · ~363 MW (ICE PEG)",
  miravalles: "geothermal", borinquen: "phase 1 · 2030 (PEG 2024-2040)",
  tejona: "20 MW · repowering to 42 MW · returns 2026", guanacaste: "wind · 49.5 MW",
  sanantonio: "10.3 MW · La Uruca (San José) · 2026", moin: "thermal · backup · Moín II+III ≈108 MW",
  gam: "load centre",
};

const GAM = PLANTS_GEO.find((p) => p.kind === "load");

const gridGeoJSON = () => ({
  type: "FeatureCollection",
  features: PLANTS_GEO.filter((p) => p.kind !== "load").map((p) => ({
    type: "Feature",
    properties: { id: p.id },
    geometry: { type: "LineString", coordinates: [[p.lng, p.lat], [GAM.lng, GAM.lat]] },
  })),
});

function markerEl(plant, onPick) {
  const isLoad = plant.kind === "load";
  const c = KIND[plant.kind] || "#fff";
  const el = document.createElement("button");
  el.type = "button";
  el.className = "tmc-marker" + (isLoad ? " is-load" : "");
  el.setAttribute("aria-label", `${plant.name} — ${plant.detail || ""}`);
  el.innerHTML =
    `<span class="tmc-ring" style="border-color:${c}"></span>` +
    `<span class="tmc-core" style="background:${c}"></span>`;
  el.addEventListener("click", (e) => { e.stopPropagation(); onPick(plant.id); });
  return el;
}

export default function TerrainMapCard({ en = false }) {
  const holder = useRef(null);
  const mapRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!TOKEN || !holder.current || typeof window === "undefined") return;
    const isTouch = window.matchMedia?.("(pointer: coarse)").matches;

    mapboxgl.accessToken = TOKEN;
    const map = new mapboxgl.Map({
      container: holder.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      bounds: [[-86.0, 8.0], [-82.4, 11.3]],
      fitBoundsOptions: { padding: { top: 46, bottom: 60, left: 24, right: 24 } },
      pitch: 34,
      bearing: 10,
      scrollZoom: false,
      boxZoom: false,
      doubleClickZoom: false,
      dragPan: !isTouch,
      dragRotate: false,
      touchZoomRotate: false,
      touchPitch: false,
      keyboard: false,
      attributionControl: { compact: true },
      antialias: true,
    });
    mapRef.current = map;
    const markers = [];

    map.on("style.load", () => {
      /* NO setTerrain here, deliberately. Terrain displaces the imagery in
         3D while DOM markers stay at sea level, so marks drift off their
         true coordinates (GAM and Moín landed in the ocean). On a planar
         map the projection is exact at any pitch, and the satellite
         imagery carries its own relief shading anyway. */
      map.setFog({ color: NAVY, "high-color": NAVY2, "horizon-blend": 0.16, "space-color": "#060f22", "star-intensity": 0 });

      map.addSource("tmc-coast", {
        type: "geojson",
        data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: CR_OUTLINE_GEO } },
      });
      map.addLayer({
        id: "tmc-coast", type: "line", source: "tmc-coast",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": "#8fd8e8", "line-width": 0.7, "line-opacity": 0.28 },
      });

      map.addSource("tmc-grid", { type: "geojson", data: gridGeoJSON() });
      map.addLayer({
        id: "tmc-grid-core", type: "line", source: "tmc-grid",
        layout: { "line-cap": "round" },
        paint: { "line-color": "#bfe9f5", "line-width": 0.8, "line-opacity": 0.4 },
      });

      PLANTS_GEO.forEach((p) => {
        markers.push(
          new mapboxgl.Marker({ element: markerEl(p, (id) => setActive((a) => (a === id ? null : id))), anchor: "center" })
            .setLngLat([p.lng, p.lat])
            .addTo(map)
        );
      });

      map.on("click", () => setActive(null));
      setReady(true);
    });

    const ro = new ResizeObserver(() => map.resize());
    ro.observe(holder.current);
    return () => {
      ro.disconnect();
      markers.forEach((m) => m.remove());
      map.remove();
      mapRef.current = null;
    };
  }, []);

  if (!TOKEN) return null;

  const sel = PLANTS_GEO.find((p) => p.id === active) || null;

  return (
    <div>
      <div style={{ position: "relative", aspectRatio: "16 / 10", borderRadius: 16, overflow: "hidden", background: `linear-gradient(150deg, ${NAVY}, ${NAVY2})`, border: `1px solid ${TURQ}40`, boxShadow: "0 0 0 1px rgba(0,0,0,0.35), inset 0 0 60px rgba(0,0,0,0.25)" }}>
        <div ref={holder} style={{ position: "absolute", inset: 0 }} />

        {/* Loading veil */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `linear-gradient(150deg, ${NAVY}, ${NAVY2})`, opacity: ready ? 0 : 1, transition: "opacity .9s ease" }} />

        {/* Title */}
        <div style={{ position: "absolute", top: 12, left: 14, zIndex: 3, pointerEvents: "none" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 2, color: GLOW }}>
            {en ? "Costa Rica — electric grid · satellite" : "Costa Rica — red eléctrica · satélite"}
          </div>
          <div style={{ marginTop: 4, fontSize: 11, color: "rgba(255,255,255,0.55)", maxWidth: 420 }}>
            {en ? "Real imagery + elevation (Mapbox/Maxar) · approximate plant locations" : "Imagen y relieve reales (Mapbox/Maxar) · ubicaciones aproximadas"}
          </div>
        </div>

        {/* Info card for the selected plant */}
        {sel && (
          <div role="status" style={{
            position: "absolute", left: 14, bottom: 52, zIndex: 4, maxWidth: 260,
            background: "rgba(6,21,46,0.92)", backdropFilter: "blur(9px)", WebkitBackdropFilter: "blur(9px)",
            border: `1px solid ${TURQ}59`, borderRadius: 11, padding: "10px 12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
          }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#fff", lineHeight: 1.25 }}>{sel.name}</div>
            <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>
              {en ? DETAIL_EN[sel.id] || sel.detail : sel.detail}
            </div>
            <span style={{ display: "inline-block", marginTop: 6, padding: "2px 7px", fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: KIND[sel.kind], border: `1px solid ${KIND[sel.kind]}`, borderRadius: 999 }}>
              {KIND_LABEL[sel.kind][en ? 1 : 0]}
            </span>
          </div>
        )}

        {/* Legend */}
        <div style={{ position: "absolute", left: 12, right: 12, bottom: 10, zIndex: 3, display: "flex", flexWrap: "wrap", gap: "4px 10px", alignItems: "center", pointerEvents: "none" }}>
          {Object.keys(KIND).map((k) => (
            <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "2px 8px", fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.8)" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: KIND[k], boxShadow: `0 0 6px ${KIND[k]}` }} />
              {KIND_LABEL[k][en ? 1 : 0]}
            </span>
          ))}
        </div>
      </div>

      {/* Small screens: chip picker — markers cluster too tightly to tap */}
      <div className="tmc-picker" role="group" aria-label={en ? "Select a plant" : "Seleccione una planta"}>
        {PLANTS_GEO.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActive((a) => (a === p.id ? null : p.id))}
            aria-pressed={active === p.id}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6, flexShrink: 0,
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, letterSpacing: 0.5, minHeight: 34,
              padding: "4px 10px", borderRadius: 6, cursor: "pointer",
              color: active === p.id ? "var(--text)" : "var(--text2)",
              background: active === p.id ? "var(--surface)" : "transparent",
              border: `1px solid ${active === p.id ? KIND[p.kind] : "var(--border)"}`,
            }}
          >
            <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: KIND[p.kind], display: "inline-block" }} />
            {p.name}
          </button>
        ))}
      </div>

      <style>{`
        .tmc-marker { position: relative; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; background: transparent; border: none; padding: 0; cursor: pointer; }
        .tmc-core { position: absolute; width: 5px; height: 5px; border-radius: 50%; box-shadow: 0 0 3px rgba(0,0,0,0.7); }
        .tmc-ring { position: absolute; width: 15px; height: 15px; border-radius: 50%; border: 1px solid; opacity: 0.75; transition: transform .2s ease; }
        .tmc-marker:hover .tmc-ring, .tmc-marker:focus-visible .tmc-ring { transform: scale(1.35); opacity: 0.9; }
        .tmc-marker.is-load .tmc-core { width: 7px; height: 7px; box-shadow: 0 0 6px rgba(242,177,53,0.8); }
        .tmc-marker.is-load .tmc-ring { width: 19px; height: 19px; border-width: 1.2px; border-color: ${GOLD} !important; animation: tmcPulse 3.2s ease-out infinite; }
        .tmc-marker:focus { outline: none; }
        .tmc-marker:focus-visible { outline: 2px solid ${GLOW}; outline-offset: 2px; border-radius: 50%; }
        @keyframes tmcPulse { 0% { transform: scale(1); opacity: .8; } 70%, 100% { transform: scale(2); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .tmc-marker.is-load .tmc-ring { animation: none; } }
        .tmc-picker { display: none; }
        @media (max-width: 640px) {
          .tmc-picker { display: flex; gap: 6px; overflow-x: auto; padding: 10px 2px 2px; -webkit-overflow-scrolling: touch; }
        }
        .mapboxgl-ctrl-attrib { background: rgba(6,15,34,0.55) !important; border-radius: 5px 0 0 0; font-family: 'IBM Plex Mono', monospace; font-size: 9px; }
        .mapboxgl-ctrl-attrib a { color: rgba(255,255,255,0.62) !important; }
        .mapboxgl-ctrl-logo { opacity: 0.35; transform: scale(0.62); transform-origin: bottom left; }
        .mapboxgl-ctrl-attrib-button { opacity: 0.4; transform: scale(0.8); }
        .mapboxgl-canvas:focus { outline: none; }
      `}</style>
    </div>
  );
}
