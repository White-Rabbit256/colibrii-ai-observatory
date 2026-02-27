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
  linkedin: (
    <>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor" stroke="none" />
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
  video: (
    <>
      {P("M23 7l-7 5 7 5V7z")}
      {P("M14 5H3a2 2 0 00-2 2v10a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2z")}
    </>
  ),
  star: (
    <>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" />
    </>
  ),
  radar: (
    <>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth={1.2} opacity={0.3} />
      <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth={1.2} opacity={0.3} />
      {P("M12 3v18")}
      {P("M3 12h18")}
      {P("M5.64 5.64l12.73 12.73")}
      {P("M18.36 5.64L5.64 18.36")}
    </>
  ),
  /* ── Sectoral IMPACT icons (AI for Good) ── */
  leaf: (
    <>
      {P("M17 8C8 10 5.9 16.09 3.82 21.18")}
      {P("M3.82 21.18L12 13")}
      <path d="M17 8c4-1 6-4 6-4s-3-1-6 1-7.5 5.5-9.18 13.18" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  heart: (
    <>
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" />
    </>
  ),
  city: (
    <>
      {P("M3 21h18")}
      <rect x="5" y="7" width="6" height="14" rx="1" fill="none" stroke="currentColor" strokeWidth={1.8} />
      <rect x="13" y="3" width="6" height="18" rx="1" fill="none" stroke="currentColor" strokeWidth={1.8} />
      {P("M7 10h2")}
      {P("M7 13h2")}
      {P("M7 16h2")}
      {P("M15 6h2")}
      {P("M15 9h2")}
      {P("M15 12h2")}
      {P("M15 15h2")}
    </>
  ),
  wheat: (
    <>
      {P("M12 21V10")}
      {P("M12 10C9 7 4 6 4 6s2 4 5 6")}
      {P("M12 10c3-3 8-4 8-4s-2 4-5 6")}
      {P("M12 14C9 11 4 10 4 10s2 4 5 6")}
      {P("M12 14c3-3 8-4 8-4s-2 4-5 6")}
      {P("M12 18C9 15 4 14 4 14s2 4 5 6")}
      {P("M12 18c3-3 8-4 8-4s-2 4-5 6")}
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
