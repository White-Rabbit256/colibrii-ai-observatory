"use client";

export default function PortalError({ error, reset }) {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg, #f8f9fc)",
      fontFamily: "Inter, system-ui, sans-serif",
      padding: 24
    }}>
      <div style={{
        maxWidth: 520,
        textAlign: "center",
        background: "var(--card, #fff)",
        borderRadius: 16,
        padding: "48px 32px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        border: "1px solid var(--border, #e2e8f0)"
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔬</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--text, #0f172a)", marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>
          Observatory Temporarily Unavailable
        </h1>
        <p style={{ fontSize: 14, color: "var(--text2, #64748b)", lineHeight: 1.6, marginBottom: 12 }}>
          A data source or component encountered an error. This is usually temporary.
        </p>
        <div style={{
          padding: "12px 16px",
          background: "rgba(239, 68, 68, 0.06)",
          borderRadius: 8,
          border: "1px solid rgba(239, 68, 68, 0.15)",
          marginBottom: 24,
          fontSize: 11,
          fontFamily: "'IBM Plex Mono', monospace",
          color: "#ef4444",
          textAlign: "left",
          wordBreak: "break-word"
        }}>
          {error?.message || "Unknown error"}
        </div>
        <button
          onClick={() => reset()}
          style={{
            padding: "12px 28px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.15s"
          }}
          onMouseOver={(e) => e.target.style.background = "#1d4ed8"}
          onMouseOut={(e) => e.target.style.background = "#2563eb"}
        >
          Reload Observatory
        </button>
        <div style={{ marginTop: 16 }}>
          <a href="/" style={{ fontSize: 12, color: "#2563eb", textDecoration: "none" }}>
            Return to Home
          </a>
        </div>
        <div style={{ marginTop: 24, fontSize: 10, color: "#94a3b8", fontFamily: "'IBM Plex Mono', monospace" }}>
          Colibrii Labs AI Observatory &middot; If the issue persists, try refreshing the page
        </div>
      </div>
    </div>
  );
}
