"use client";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { PLANTS_GEO, CR_OUTLINE_GEO } from "./crGeo";
import { EN_ACCENT } from "../energiaData";

/* ═══════════════════════════════════════════════════════════════
   ENERGÍA — TerrainHero (satellite + real elevation, spotlit)
   Costa Rica as real satellite imagery over the Mapbox terrain DEM.

   The composition rule, learned from the reference the owner sent:
   the country must read as an OBJECT, not as a screenshot of a
   region. Three things make that happen and all three are load-
   bearing —
     1. satellite-v9, NOT satellite-streets: no country labels, no
        admin borders, no road furniture. Only imagery + our data.
     2. A spotlight mask: a world-sized navy polygon with Costa Rica
        punched out as a hole. Neighbours recede, CR is lit.
     3. Markers sized to be seen over terrain — bright cores with
        white keylines, names always on. Our plant labels replace
        the basemap labels we removed.

   Requires NEXT_PUBLIC_MAPBOX_TOKEN. Without it this renders
   nothing and EnergiaDeep falls back to Hero3D.

   Mapbox ToS: attribution control stays mounted (restyled only).
   Page scroll always wins (scrollZoom off; compact kills drag).
   Honours prefers-reduced-motion.
   ═══════════════════════════════════════════════════════════════ */

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const NAVY = EN_ACCENT.navy;       // #0A1F3F
const NAVY2 = EN_ACCENT.navy2 || "#10294f";
const TURQ = EN_ACCENT.turquoise;  // #00B5A8
const GLOW = EN_ACCENT.glow;       // #22d3ee
const GOLD = EN_ACCENT.gold;       // #F2B135

const GAM = PLANTS_GEO.find((p) => p.kind === "load");
const FEEDERS = PLANTS_GEO.filter((p) => p.kind !== "load");

/* Camera. Padding keeps the country clear of the desktop text column. */
const POSE = {
  wide:    { center: [-84.0, 9.75], zoom: 6.7, pitch: 58, bearing: 18, padding: { top: 0, bottom: 0, left: 400, right: 20 } },
  compact: { center: [-84.1, 9.85], zoom: 6.35, pitch: 52, bearing: 14, padding: { top: 0, bottom: 0, left: 0, right: 0 } },
};

/* Spotlight: whole world, with Costa Rica as a hole. Everything
   outside the coastline sinks into navy so the country is the subject. */
const spotlightGeoJSON = () => ({
  type: "Feature",
  properties: {},
  geometry: {
    type: "Polygon",
    coordinates: [
      [[-180, -85], [180, -85], [180, 85], [-180, 85], [-180, -85]],
      CR_OUTLINE_GEO,
    ],
  },
});

const coastGeoJSON = () => ({
  type: "Feature",
  properties: {},
  geometry: { type: "LineString", coordinates: CR_OUTLINE_GEO },
});

/* Transmission lines: every generator feeds the GAM load centre. */
const gridGeoJSON = () => ({
  type: "FeatureCollection",
  features: FEEDERS.map((p) => ({
    type: "Feature",
    properties: { id: p.id },
    geometry: { type: "LineString", coordinates: [[p.lng, p.lat], [GAM.lng, GAM.lat]] },
  })),
});

/* Marker: bright core + white keyline so it survives over green terrain,
   with the plant name always visible (these replace the basemap labels). */
function makeMarkerEl(plant) {
  const isLoad = plant.kind === "load";
  const c = isLoad ? GOLD : GLOW;
  const el = document.createElement("div");
  el.className = "en-th-marker" + (isLoad ? " is-load" : "");
  el.setAttribute("role", "img");
  el.setAttribute("aria-label", `${plant.name} — ${plant.detail || ""}`);
  el.innerHTML =
    `<span class="en-th-ring" style="border-color:${c}"></span>` +
    `<span class="en-th-core" style="background:${c}"></span>` +
    `<span class="en-th-label">${plant.name}</span>`;
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
      /* Pure imagery — no labels, borders or roads. Critical: the streets
         variant made this read as a generic map screenshot. */
      style: "mapbox://styles/mapbox/satellite-v9",
      center: pose.center,
      zoom: reduced ? pose.zoom : pose.zoom - 0.3,
      pitch: pose.pitch,
      bearing: pose.bearing,
      padding: pose.padding,
      scrollZoom: false,
      boxZoom: false,
      doubleClickZoom: false,
      dragPan: !compact,
      dragRotate: !compact,
      touchZoomRotate: false,
      touchPitch: false,
      keyboard: false,
      attributionControl: true,
      antialias: true,
      fadeDuration: 200,
    });
    mapRef.current = map;

    const markers = [];

    map.on("style.load", () => {
      /* Real elevation, pushed hard enough that the cordillera reads */
      if (!map.getSource("mapbox-dem")) {
        map.addSource("mapbox-dem", {
          type: "raster-dem",
          url: "mapbox://mapbox.mapbox-terrain-dem-v1",
          tileSize: 512,
          maxzoom: 14,
        });
      }
      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.8 });

      map.setFog({
        color: NAVY,
        "high-color": NAVY2,
        "horizon-blend": 0.2,
        "space-color": "#060f22",
        "star-intensity": 0.05,
      });

      /* ── Spotlight mask: everything but Costa Rica sinks into navy ── */
      map.addSource("th-spot", { type: "geojson", data: spotlightGeoJSON() });
      map.addLayer({
        id: "th-spot", type: "fill", source: "th-spot",
        paint: { "fill-color": NAVY, "fill-opacity": 0.86 },
      });

      /* Coastline rim so the lit country has a crisp edge */
      map.addSource("th-coast", { type: "geojson", data: coastGeoJSON() });
      map.addLayer({
        id: "th-coast-glow", type: "line", source: "th-coast",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": GLOW, "line-width": 5, "line-opacity": 0.18, "line-blur": 4 },
      });
      map.addLayer({
        id: "th-coast", type: "line", source: "th-coast",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": GLOW, "line-width": 1.2, "line-opacity": 0.7 },
      });

      /* Transmission network — thick enough to read over imagery */
      map.addSource("th-grid", { type: "geojson", data: gridGeoJSON() });
      map.addLayer({
        id: "th-grid-glow", type: "line", source: "th-grid",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": TURQ, "line-width": 5, "line-opacity": 0.25, "line-blur": 3 },
      });
      map.addLayer({
        id: "th-grid-core", type: "line", source: "th-grid",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": GLOW, "line-width": 1.8, "line-opacity": 0.9, "line-dasharray": [2, 2] },
      });

      PLANTS_GEO.forEach((p) => {
        markers.push(
          new mapboxgl.Marker({ element: makeMarkerEl(p), anchor: "center" })
            .setLngLat([p.lng, p.lat])
            .addTo(map)
        );
      });

      setReady(true);

      if (!reduced) {
        map.easeTo({ zoom: pose.zoom, duration: 2600, easing: (t) => 1 - Math.pow(1 - t, 3) });
      }
    });

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

      {/* Edge vignette so the map melts into the hero band */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(125% 95% at 55% 42%, transparent 52%, rgba(6,15,34,0.38) 84%, rgba(6,15,34,0.66) 100%)",
      }} />
      {/* Fade-in over the navy base — no flash of half-loaded tiles */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `linear-gradient(160deg, ${NAVY} 0%, ${NAVY2} 55%, #0a1830 100%)`,
        opacity: ready ? 0 : 1, transition: "opacity .9s ease",
      }} />

      <style>{`
        .en-th-marker {
          position: relative; width: 22px; height: 22px;
          display: flex; align-items: center; justify-content: center;
          pointer-events: none;
        }
        .en-th-marker.is-load { width: 32px; height: 32px; }
        .en-th-core {
          position: absolute; width: 8px; height: 8px; border-radius: 50%;
          box-shadow: 0 0 0 1.5px rgba(255,255,255,0.9), 0 0 10px currentColor;
        }
        .en-th-marker.is-load .en-th-core {
          width: 12px; height: 12px;
          box-shadow: 0 0 0 2px rgba(255,255,255,0.95), 0 0 16px ${GOLD};
        }
        .en-th-ring {
          position: absolute; inset: 0; border-radius: 50%;
          border: 1.5px solid; opacity: 0.75;
        }
        .en-th-marker.is-load .en-th-ring {
          border-width: 2px; opacity: 0.9; animation: enThPulse 3s ease-out infinite;
        }
        .en-th-label {
          position: absolute; top: 100%; left: 50%; transform: translateX(-50%);
          margin-top: 4px; white-space: nowrap;
          font-family: 'IBM Plex Mono', monospace; font-size: 9.5px; letter-spacing: 0.8px;
          text-transform: uppercase; color: #fff;
          text-shadow: 0 1px 3px #000, 0 0 8px rgba(0,0,0,0.9);
        }
        .en-th-marker.is-load .en-th-label {
          color: ${GOLD}; font-size: 11px; font-weight: 700; letter-spacing: 1.4px;
        }
        @keyframes enThPulse {
          0% { transform: scale(1); opacity: .9; }
          70%, 100% { transform: scale(2.2); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .en-th-marker.is-load .en-th-ring { animation: none; }
        }
        /* Mapbox chrome: attribution stays (ToS), restyled to fit */
        .mapboxgl-ctrl-bottom-right, .mapboxgl-ctrl-bottom-left { z-index: 2; }
        .mapboxgl-ctrl-attrib {
          background: rgba(6,15,34,0.55) !important;
          border-radius: 5px 0 0 0;
          font-family: 'IBM Plex Mono', monospace; font-size: 9px;
        }
        .mapboxgl-ctrl-attrib a { color: rgba(255,255,255,0.62) !important; }
        .mapboxgl-ctrl-logo { opacity: 0.5; transform: scale(0.8); transform-origin: bottom left; }
        .mapboxgl-canvas:focus { outline: none; }
      `}</style>
    </div>
  );
}
