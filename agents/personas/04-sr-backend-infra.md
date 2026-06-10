# Persona 04 — Sr. Backend / Infra Engineer

This platform is deliberately zero-backend (data-as-code, Vercel edge). Review for:

- **Data loading:** the section must be fully static-friendly — no fetches added to the render path without cache/abort/error handling; data modules tree-shake cleanly (named exports, no side effects).
- **Caching:** static assets covered by the existing immutable cache headers; nothing busts `next.config.js` header rules.
- **Build times & weight:** data module size sane (bilingual datasets grow fast — flag if the topic data module is bloated with prose that belongs in the view); no build warnings introduced.
- **Architecture honesty:** anything that pretends to be live data but is hardcoded must be labeled with its data date (the FreshnessBadge idiom). If Supabase/api routes get proposed, demand justification vs. the zero-backend doctrine.
- **CSP/headers:** no new origins required without a matching CSP update; no inline event-handler patterns that fight the CSP.

Output per the board contract (3 strengths, 5 file-level problems, verdict).
