"use client";
/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — SVG Icon System
   Replaces emoji in nav pills and stat badges.
   Usage: <Icon name="home" size={16} color="#2563eb" />
   ═══════════════════════════════════════════════════════════════ */

const P = (d) => <path d={d} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />;

const ICONS = {
  home: (
    <>
      <path d="M3 10.5L12 3l9 7.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  chart: (
    <>
      {P("M3 3v18h18")}
      {P("M9 17V9")}
      {P("M13 17V5")}
      {P("M17 17v-4")}
    </>
  ),
  compare: (
    <>
      {P("M6 3l-3 3 3 3")}
      {P("M3 6h18")}
      {P("M18 21l3-3-3-3")}
      {P("M21 18H3")}
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth={1.8} />
      {P("M3.6 9h16.8")}
      {P("M3.6 15h16.8")}
      <ellipse cx="12" cy="12" rx="4" ry="9" fill="none" stroke="currentColor" strokeWidth={1.8} />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth={1.8} />
      <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth={1.8} />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  factory: (
    <>
      {P("M4 20V6h4v4l5-3v3l5-3v13H4z")}
      {P("M8 16v4")}
      {P("M12 16v4")}
    </>
  ),
  store: (
    <>
      {P("M3 9l9-5 9 5")}
      <rect x="3" y="9" width="18" height="12" rx="1" fill="none" stroke="currentColor" strokeWidth={1.8} />
      {P("M9 21v-6h6v6")}
    </>
  ),
  robot: (
    <>
      <rect x="4" y="6" width="16" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth={1.8} />
      <circle cx="9" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="1.5" fill="currentColor" stroke="none" />
      {P("M12 2v4")}
      {P("M2 12h2")}
      {P("M20 12h2")}
    </>
  ),
  algo: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth={1.8} />
      <rect x="14" y="3" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth={1.8} />
      <rect x="3" y="14" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth={1.8} />
      <rect x="14" y="14" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth={1.8} />
    </>
  ),
  shield: (
    <>
      <path d="M12 2l8 4v5c0 5.25-3.5 10.1-8 11.5C7.5 21.1 4 16.25 4 11V6l8-4z" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" />
      {P("M9 12l2 2 4-4")}
    </>
  ),
  legal: (
    <>
      {P("M12 2L4 6v2h16V6L12 2z")}
      {P("M6 8v8")}
      {P("M10 8v8")}
      {P("M14 8v8")}
      {P("M18 8v8")}
      {P("M3 16h18v2H3z")}
    </>
  ),
  edu: (
    <>
      {P("M2 10l10-5 10 5-10 5-10-5z")}
      {P("M6 12v5c0 2 3 3 6 3s6-1 6-3v-5")}
      {P("M22 10v6")}
    </>
  ),
  book: (
    <>
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth={1.8} />
      {P("M12 16v-4")}
      <circle cx="12" cy="8" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  /* ── Extra icons for stat badges ── */
  diamond: (
    <>
      {P("M12 2l8 10-8 10-8-10L12 2z")}
    </>
  ),
  lightning: (
    <>
      {P("M13 2L3 14h9l-1 8 10-12h-9l1-8z")}
    </>
  ),
  coins: (
    <>
      <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth={1.8} />
      {P("M14.5 9.5a6 6 0 110 5")}
    </>
  ),
  menu: (
    <>
      {P("M3 6h18")}
      {P("M3 12h18")}
      {P("M3 18h18")}
    </>
  ),
  x: (
    <>
      {P("M18 6L6 18")}
      {P("M6 6l12 12")}
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth={1.8} />
      {P("M12 2v2")}
      {P("M12 20v2")}
      {P("M4.93 4.93l1.41 1.41")}
      {P("M17.66 17.66l1.41 1.41")}
      {P("M2 12h2")}
      {P("M20 12h2")}
      {P("M6.34 17.66l-1.41 1.41")}
      {P("M19.07 4.93l-1.41 1.41")}
    </>
  ),
  moon: (
    <>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="none" stroke="currentColor" strokeWidth={1.8} />
    </>
  ),
  lang: (
    <>
      {P("M5 8l6 13")}
      {P("M19 8l-6 13")}
      {P("M3 18h18")}
      {P("M7 13h10")}
    </>
  ),
  copy: (
    <>
      <rect x="9" y="9" width="10" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth={1.8} />
      {P("M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1")}
    </>
  ),
  arrowRight: (
    <>
      {P("M5 12h14")}
      {P("M12 5l7 7-7 7")}
    </>
  ),
  twitter: (
    <>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor" stroke="none" />
    </>
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth={1.8} />
      <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth={1.8} />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth={1.8} />
      {P("M22 6l-10 7L2 6")}
    </>
  ),
  chevronDown: (
    <>
      {P("M6 9l6 6 6-6")}
    </>
  ),
  externalLink: (
    <>
      {P("M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6")}
      {P("M15 3h6v6")}
      {P("M10 14L21 3")}
    </>
  ),
};

export function Icon({ name, size = 16, color = "currentColor", style = {} }) {
  const icon = ICONS[name];
  if (!icon) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ color, flexShrink: 0, ...style }}
      aria-hidden="true"
    >
      {icon}
    </svg>
  );
}
