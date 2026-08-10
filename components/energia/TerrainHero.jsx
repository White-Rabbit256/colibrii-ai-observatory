"use client";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { PLANTS_GEO } from "./crGeo";
import { EN_ACCENT } from "../energiaData";

/* ═══════════════════════════════════════════════════════════════
   ENERGÍA — TerrainHero (satellite + real elevation)
   Costa Rica as real Maxar/NASA satellite imagery draped over the
   Mapbox terrain DEM, tilted — the photographic register the
   stylized Hero3D relief can't reach by construction. Plant nodes,
   transmission lines and the GAM load core ride on top in the
   section palette; brand fog carries the navy atmosphere.

   Requires NEXT_PUBLIC_MAPBOX_TOKEN. Without it this component
   renders nothing and EnergiaDeep falls back to Hero3D, so the
   section is never broken by a missing key.

   Mapbox ToS: the attribution control stays mounted (restyled,
   never removed). Scroll-zoom is off so the page still scrolls;
   on compact/mobile all drag+touch interaction is off for the
   same reason. Honours prefers-reduced-motion (no intro fly-in).
   ═══════════════════════════════════════════════════════════════ */

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const NAVY = EN_ACCENT.navy;       // #0A1F3F
const NAVY2 = EN_ACCENT.navy2 || "#10294f";
const TURQ = EN_ACCENT.turquoise;  // #00B5A8
const GLOW = EN_ACCENT.glow;       // #22d3ee
const GOLD = EN_ACCENT.gold;       // #F2B135

const GAM = PLANTS_GEO.find((p) => p.kind === "load");
const FEEDERS = PLANTS_GEO.filter((p) => p.kind !== "load");

/* Camera poses. Padding pushes the country clear of the desktop text column. */
const POSE = {
  wide:    { center: [-84.05, 9.72], zoom: 6.45, pitch: 54, bearing: 16, padding: { top: 0, bottom: 0, left: 420, right: 20 } },
  compact: { center: [-84.15, 9.88], zoom: 5.95, pitch: 46, bearing: 10, padding: { top: 10, bottom: 10, left: 0, right: 0 } },
};

/* Transmission lines: every generator feeds the GAM load centre. */
const gridGeoJSON = () => ({
  type: "FeatureCollection",
  features: FEEDERS.map((p) => ({
    type: "Feature",
    properties: { id: p.id },
    geometry: { type: "LineString", coordinates: [[p.lng, p.lat], [GAM.lng, GAM.lat]] },
  })),
});

/* Small, crisp DOM marker — bright core + tight ring. No fat blobs. */
function makeMarkerEl(plant) {
  const isLoad = plant.kind === "load";
  const c = isLoad ? GOLD : GLOW;
  const el = document.createElement("div");
  el.className = "en-terrain-marker" + (isLoad ? " is-load" : "");
  el.setAttribute("role", "img");
  el.setAttribute("aria-label", `${plant.name} — ${plant.detail || ""}`);
  el.innerHTML =
    `<span class="en-tm-ring" style="border-color:${c}"></span>` +
    `<span class="en-tm-core" style="background:${c}; box-shadow:0 0 ${isLoad ? 10 : 7}px ${c}"></span>` +
    `<span class="en-tm-label">${plant.name}</span>`;
  return el;
}

export default function TerrainHero({ compact = false }) {
  const holder = useRef(null);
  const mapRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!TOKEN || !holder.current || typeof window === "undefined") return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const pose = compact ? POSE.compact : POSE.wide;

    mapboxgl.accessToken = TOKEN;
    const map = new mapboxgl.Map({
      container: holder.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: pose.center,
      zoom: reduced ? pose.zoom : pose.zoom - 0.35,
      pitch: pose.pitch,
      bearing: pose.bearing,
      padding: pose.padding,
      /* Page scroll must always win; mobile gets no drag at all. */
      scrollZoom: false,
      boxZoom: false,
      doubleClickZoom: false,
      dragPan: !compact,
      dragRotate: !compact,
      touchZoomRotate: false,
      touchPitch: false,
      keyboard: false,
      attributionControl: true,
      cooperativeGestures: false,
      antialias: true,
      fadeDuration: 200,
    });
    mapRef.current = map;

    const markers = [];

    map.on("style.load", () => {
      /* Real elevation — the whole point of this hero. */
      if (!map.getSource("mapbox-dem")) {
        map.addSource("mapbox-dem", {
          type: "raster-dem",
          url: "mapbox://mapbox.mapbox-terrain-dem-v1",
          tileSize: 512,
          maxzoom: 14,
        });
      }
      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.45 });

      /* Brand atmosphere: navy haze at the horizon instead of Mapbox blue. */
      map.setFog({
        color: NAVY,
        "high-color": NAVY2,
        "horizon-blend": 0.18,
        "space-color": "#060f22",
        "star-intensity": 0.05,
      });

      /* Transmission network + the GAM anchor, drawn over the terrain. */
      if (!map.getSource("en-grid")) {
        map.addSource("en-grid", { type: "geojson", data: gridGeoJSON() });
        map.addLayer({
          id: "en-grid-glow",
          type: "line",
          source: "en-grid",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: { "line-color": TURQ, "line-width": 3.2, "line-opacity": 0.22, "line-blur": 2.5 },
        });
        map.addLayer({
          id: "en-grid-core",
          type: "line",
          source: "en-grid",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: { "line-color": GLOW, "line-width": 1.1, "line-opacity": 0.75, "line-dasharray": [2, 2.4] },
        });
      }

      PLANTS_GEO.forEach((p) => {
        const m = new mapboxgl.Marker({ element: makeMarkerEl(p), anchor: "center" })
          .setLngLat([p.lng, p.lat])
          .addTo(map);
        markers.push(m);
      });

      setReady(true);

      /* Cinematic settle — one gentle push in, then the camera rests. */
      if (!reduced) {
        map.easeTo({ zoom: pose.zoom, duration: 2600, easing: (t) => 1 - Math.pow(1 - t, 3) });
      }
    });

    /* Keep the country framed when the hero box resizes. */
    const ro = new ResizeObserver(() => map.resize());
    ro.observe(holder.current);

    return () => {
      ro.disconnect();
      markers.forEach((m) => m.remove());
      map.remove();
      mapRef.current = null;
    };
  }, [compact]);

  if (!TOKEN) return null;

  return (
    <div
      aria-label="Costa Rica — terreno satelital y red eléctrica"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      <div ref={holder} style={{ position: "absolute", inset: 0 }} />

      {/* Navy unifier — light enough that the imagery still reads as real. */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `linear-gradient(160deg, rgba(10,31,63,0.30), rgba(6,15,34,0.16) 55%, rgba(10,31,63,0.34))`,
        mixBlendMode: "multiply",
      }} />
      {/* Edge vignette so the map melts into the hero band */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(125% 95% at 55% 42%, transparent 48%, rgba(6,15,34,0.42) 82%, rgba(6,15,34,0.68) 100%)",
      }} />
      {/* Fade-in over the navy base — no flash of half-loaded tiles */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `linear-gradient(160deg, ${NAVY} 0%, ${NAVY2} 55%, #0a1830 100%)`,
        opacity: ready ? 0 : 1, transition: "opacity .9s ease",
      }} />

      <style>{`
        .en-terrain-marker {
          position: relative; width: 14px; height: 14px;
          display: flex; align-items: center; justify-content: center;
          pointer-events: none;
        }
        .en-terrain-marker.is-load { width: 20px; height: 20px; }
        .en-tm-core {
          position: absolute; width: 5px; height: 5px; border-radius: 50%;
        }
        .en-terrain-marker.is-load .en-tm-core { width: 7px; height: 7px; }
        .en-tm-ring {
          position: absolute; inset: 0; border-radius: 50%;
          border: 1px solid; opacity: 0.55;
        }
        .en-terrain-marker.is-load .en-tm-ring {
          opacity: 0.75; animation: enTmPulse 3.2s ease-out infinite;
        }
        .en-tm-label {
          position: absolute; top: 100%; left: 50%; transform: translateX(-50%);
          margin-top: 3px; white-space: nowrap;
          font-family: 'IBM Plex Mono', monospace; font-size: 8.5px; letter-spacing: 1px;
          text-transform: uppercase; color: rgba(255,255,255,0.82);
          text-shadow: 0 1px 4px rgba(0,0,0,0.9); opacity: 0;
          transition: opacity .3s ease;
        }
        .en-terrain-marker.is-load .en-tm-label {
          opacity: 1; color: ${GOLD}; font-size: 9.5px;
        }
        @media (min-width: 768px) { .en-tm-label { opacity: 0.7; } }
        @keyframes enTmPulse {
          0% { transform: scale(1); opacity: .75; }
          70%, 100% { transform: scale(2.3); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .en-terrain-marker.is-load .en-tm-ring { animation: none; }
        }
        /* Mapbox chrome: keep attribution (ToS) but make it section-native */
        .mapboxgl-ctrl-bottom-right, .mapboxgl-ctrl-bottom-left { z-index: 2; }
        .mapboxgl-ctrl-attrib {
          background: rgba(6,15,34,0.55) !important;
          border-radius: 5px 0 0 0;
          font-family: 'IBM Plex Mono', monospace; font-size: 9px;
        }
        .mapboxgl-ctrl-attrib a { color: rgba(255,255,255,0.62) !important; }
        .mapboxgl-ctrl-logo { opacity: 0.55; transform: scale(0.85); transform-origin: bottom left; }
        .mapboxgl-canvas:focus { outline: none; }
      `}</style>
    </div>
  );
}
