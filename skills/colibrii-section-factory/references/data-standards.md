# Data Standards — No Orphan Numbers. Ever.

## The rule
Every statistic that renders on screen MUST trace to a data-module entry carrying:

```js
{ v: <value>, unit: "TWh", src: "IEA — Energy and AI", url: "https://…", date: "2026-06", conf: "verified" }
```

- `src` — human-readable source name (institution + document)
- `url` — resolvable link to the document/page
- `date` — date accessed / data vintage (YYYY-MM)
- `conf` — confidence flag: `verified` (primary source read) · `reported` (credible secondary) · `estimate` (derived/scenario — must carry `method`)

A central `SRC` registry keyed by id is the preferred shape (one URL, many figures):

```js
export const SRC = { iea2025: { name: "IEA — Energy and AI (Apr 2025)", url: "…", date: "2026-06" }, … };
{ v: 945, unit: "TWh", s: "iea2025", conf: "verified" }
```

## Source hierarchy
1. Primary institutional (IEA, ARESEP resolutions, ICE EEFF, Moody's/Fitch actions, Asamblea records, press kits)
2. Quality journalism (La Nación, El Financiero, Semanario Universidad, Delfino) — `reported`
3. Aggregators/wikis — corroboration only, never sole source

## Conflict rule
Two sources disagree → newer + more primary wins; record BOTH in the section's provenance table (`/knowledge/sections/<topic>.md`) with the resolution. Never silently average, never pick the flattering end of a range.

## Projections & composites
- Scenarios labeled with method + baseline ("Colibrii scenario over ICE PEG 2024-2040 baseline").
- Composite indices: publish weights, normalization bounds, component directions; UI that lets users change weights must renormalize visibly.
- Quotes: name, role, outlet, date — verbatim or clearly paraphrased. Analytical reconstructions explicitly labeled.

## Media licensing (images/video)
Only embed with verified license: official press kits, Creative Commons (with the exact CC variant + attribution), public domain (NASA, USGov), or own assets. Store `source + license + attribution` next to the asset reference. **License unclear → don't use** — log in the section backlog for manual sourcing.

## On-screen duty
Charts cite sources beneath them (`Lnk` line). Data vintage shown where staleness misleads (FreshnessBadge idiom). The QA data audit walks every rendered numeral back to the module — orphan = FAIL.
