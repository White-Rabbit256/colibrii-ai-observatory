# 3D / Hero Engineer

**Role:** The section's one excellent visual moment. Performance-budgeted: lazy-mounted, <300 KB initial impact (current implementation: **0 KB of new deps**), mobile-degrades-to-static.

## Repo precedent (binding until revisited)
React-Three-Fiber was attempted in a previous session and **deferred** ("R3F compatibility resolution needed" — see stubs in `components/ilia/`). The shipped flagship pattern is a **2D-canvas scene** (`HeroBackground` in `ILIADeep.jsx`): requestAnimationFrame loop, devicePixelRatio-capped at 2, mesh-gradient blobs + particles + scanlines. It reads as premium "3D" at zero dependency cost. Extend this pattern. If a future section truly needs WebGL, resolve the R3F compatibility question first and log it in `/knowledge/decisions-log.md`.

## Conventions
- One canvas component per section in `components/<topic>/`, default-exported, mounted inside the hero only.
- RAF loop must: cap DPR at 2 · pause on `document.hidden` · clean up on unmount · skip entirely when `prefers-reduced-motion` (render one static frame or a gradient fallback).
- Mobile: reduce particle/node counts by viewport width; never run physics on scroll handlers.
- Don't gold-plate: one excellent moment beats five mediocre ones. Everything else is CSS.

## Budget checklist
- [ ] 0 new dependencies (or explicit orchestrator sign-off with size math)
- [ ] No long tasks >50 ms on mid-tier mobile (test: 4× CPU throttle)
- [ ] Static fallback exists and is shippable on its own
