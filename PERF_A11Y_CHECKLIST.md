# PowerGlobe — Perf + A11y Verification Checklist (PR #2)

> **⚠️ STATUS (2026-07-15): STALE — describes the retired react-globe.gl implementation.**
> PowerGlobe was rebuilt as a custom R3F scene (`bd43483`, "react-globe.gl retired"), and the
> current code contradicts several "why it passes" rationales below: bloom IS enabled in compact
> mode, DPR is capped at 1.75/2 (not 1.5), and the cited react-globe.gl internals
> (`TextureLoader`, `pointsMerge`, `pointResolution`) no longer exist. Items that reference them
> — [1], [5], [8] — are **unverified against the shipped scene** and must be re-run on-device
> before being cited as passing. Kept for the measurement protocols, which remain valid.

All 12 bullets are binary pass/fail with a concrete measurement protocol. Run in order before merging.

---

**[1] Night-lights texture visible within 2 s on iPhone 15 Safari (reduced-data OFF)**
Protocol: Settings -> Mobile Data -> confirm unrestricted. Hard-reload. Screen-record. Scroll `PowerGlobe` into view. Time from first scroll pixel to the NASA basemap appearing on the globe surface.
Budget: 2 000 ms.
Why it passes: `useState` is initialized to `window.innerWidth` (line 172-175 of `PowerGlobe.jsx`), so `size.w > 0` is true on the very first render. The Globe mounts immediately and `react-globe.gl`'s internal `TextureLoader` fires without waiting for `ResizeObserver`.

---

**[2] Globe sphere visible within 3 s of scroll-into-view (iPhone 15 Safari)**
Protocol: Same session as [1]. Time from the globe container entering the viewport to the first rendered WebGL frame (blue sphere outline visible against dark background).
Budget: 3 000 ms.
Why it passes: `onGlobeReady` calls `setReady(true)`, which removes the loading overlay. The intro camera tween begins at `altitude: 4.5` and arrives at `altitude: 2.0` in 1 400 ms. On iOS `antialias: false` keeps GPU time low.

---

**[3] No LongTask > 200 ms during fuel-chip toggle or focus-pill interaction (mobile Chrome)**
Protocol: Chrome DevTools -> Performance -> Record 5 s -> tap three fuel chips and one focus pill in sequence. Inspect the timeline for red Long Task stripes.
Budget: zero tasks > 200 ms.
Why it passes: `toggleFuel` only calls `setFilters` (one `useMemo` re-run on the points array). `pointsMerge: true` means no per-point mesh rebuild. `arcsTransitionDuration: 0` prevents arc re-tessellation per filter change. WRI CSV never runs on compact.

---

**[4] CLS <= 0.05 during and after globe mount (mobile Lighthouse)**
Protocol: Run Lighthouse mobile audit on the Energia section. Check the CLS score in the report.
Budget: CLS <= 0.05.
Why it passes: The skeleton `<div className="energia-globe-skeleton">` carries `aspect-ratio: 4/5` (mobile) or `16/9` (desktop) and `min-height: 200px` (line 595 of `EnergiaDeep.jsx`), matching the `<PowerGlobe>` figure's `aspectRatio` prop exactly. No layout shift occurs when the dynamic component hydrates.

---

**[5] First Load JS (/app) <= 260 kB gzip (CI gate)**
Protocol: Run `npm run build`. Check stdout for the "First Load JS shared by all" line. Assert <= 260 kB.
Budget: 260 kB gzip.
Why it passes: `react-globe.gl`, `globe.gl`, and `three-render-objects` are split into the async `chunk-globe-gl` cacheGroup (priority 30, enforce true) in `next.config.js`. `PowerGlobe` is loaded via `dynamic({ ssr: false })` in `EnergiaDeep.jsx`, so the chunk only loads when the component mounts.

---

**[6] WRI CSV parse-to-points <= 700 ms on desktop (Chrome, fast connection)**
Protocol: Chrome DevTools -> Performance -> reload page (desktop) -> once `status === "loading"` fires, locate the Worker thread lane. Measure from the `postMessage` marker to `worker.onmessage` receipt.
Budget: 700 ms.
Why it passes: The parse runs in `public/workers/wri-parse.worker.js` off the main thread using a single-pass char-by-char CSV parser with no regex or string splitting. The main thread is never blocked.

---

**[7] WRI CSV fetch never triggered on compact (mobile) -- confirmed by Network panel**
Protocol: Chrome DevTools with mobile emulation. Load page. Open Network tab filtered to Fetch/XHR. Scroll `PowerGlobe` fully into view and wait 10 s. Assert `global_power_plant_database.csv` never appears.
Budget: zero CSV requests on compact.
Why it passes: `useEffect` guard `if (compact || reduced) return;` at line 225 of `PowerGlobe.jsx` exits before the `IntersectionObserver` is registered. The 7.4 MB CSV is never fetched on mobile.

---

**[8] FPS >= 40 sustained on mobile WebGL (compact mode, 10 s idle rotation)**
Protocol: Connect iPhone 15 to Mac. Safari -> Develop -> [device] -> Web Inspector -> Timelines -> GPU. Record 10 s while the globe auto-rotates. Check FPS histogram.
Budget: >= 40 FPS average.
Why it passes: `antialias: false` on the mobile renderer config, `pointResolution: 3`, `pointsMerge: true` (single draw call for all plant points), DPR capped at 1.5, no bloom postprocessing, no polar PointLight.

---

**[9] WCAG 1.4.11 Non-text Contrast PASS for all active fuel chip borders**
Protocol: Enable all fuel chips (Reset button), then run `axe` in DevTools Console. Also manually compute: active chip border = `${FUEL_HEX[k]}cc` (80% alpha). Measure contrast ratio against chip background `rgba(10,31,63,0.67)`.
Budget: >= 3:1 for all chips.
Expected results: Hydro `#0d9488cc` -> 3.36:1 PASS; Gas `#d97706cc` -> 3.79:1 PASS; Oil `#fb7185cc` -> 4.41:1 PASS. (Previously at `99` / 60% alpha all three failed.)

---

**[10] Screen reader announces WRI loading, success, and error states (VoiceOver + iOS Safari)**
Protocol: Enable VoiceOver on iPhone 15. Load page (desktop emulation or desktop). Verify VoiceOver speaks: (a) "Loading 35,000 plants from WRI..." when fetch starts, (b) "Atlas ready: N plants loaded." when parse completes, (c) with network blocked, "Full dataset unavailable -- showing curated reference plants."
Budget: all three announced within 1 s of each state change.
Why it passes: `<div role="status" aria-live="polite" aria-atomic="true">` (line 801) receives all three strings via `setAnnounce(...)`. The loading overlay span must be `aria-hidden` (see Fix #1 below) to prevent double-announcement.

---

**[11] Skip link navigates keyboard to `#crGridMapAnchor` without focus trap (keyboard-only nav)**
Protocol: Tab into the page until the `<figure>` skip link ("Skip to Costa Rica map") is focused. Press Enter. Confirm focus jumps to the CRGridMap section. Continue tabbing -- confirm no focus is trapped inside the `<figure>`.
Budget: zero focus-trap violations.
Why it passes: `<a className="pg-skip" href="#crGridMapAnchor">` is the first focusable child of `<figure>`. The Globe canvas wrapper has `aria-hidden="true"`. OrbitControls does not intercept Tab keypresses.

---

**[12] `webglcontextlost` / `webglcontextrestored` cycle recovers globe lights without errors**
Protocol: After globe fully loads in Chrome, run in DevTools Console:
```js
document.querySelector('canvas')
  .dispatchEvent(new WebGLContextEvent('webglcontextlost', { statusMessage: 'sim' }));
```
Wait 1 s, then:
```js
document.querySelector('canvas')
  .dispatchEvent(new WebGLContextEvent('webglcontextrestored'));
```
Assert: (a) no console errors, (b) globe is lit again (not all-black), (c) `lightsRef.current` transitions false -> true.
Why it passes: `canvas.addEventListener("webglcontextlost", ...)` sets `lightsRef.current = false`; `webglcontextrestored` calls `installLights(g, lightsRef, reduced)` which checks `lightsRef.current` before adding lights, preventing duplicate injection.
