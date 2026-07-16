import Link from "next/link";

export const metadata = {
  title: "404 — Página no encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 24, textAlign: "center" }}>
      <img src="/colibrii-logo-320.png" alt="Colibrii Labs" width={72} height={72} style={{ opacity: 0.9 }} />
      <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 12, letterSpacing: 3, color: "var(--text3, #64748b)" }}>ERROR 404</div>
      <h1 style={{ fontFamily: "var(--font-display, serif)", fontSize: 28, margin: 0, color: "var(--text, #0f172a)" }}>
        Página no encontrada · Page not found
      </h1>
      <p style={{ maxWidth: 480, fontSize: 14, lineHeight: 1.7, color: "var(--text2, #334155)", margin: 0 }}>
        La página que buscás no existe o fue movida. · The page you are looking for does not exist or has moved.
      </p>
      <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/" style={{ padding: "10px 20px", borderRadius: 10, background: "var(--text, #0f172a)", color: "var(--bg, #fff)", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
          Inicio · Home
        </Link>
        <Link href="/app" style={{ padding: "10px 20px", borderRadius: 10, border: "1px solid var(--border, #cbd5e1)", color: "var(--text, #0f172a)", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
          Observatorio · Observatory
        </Link>
      </div>
    </div>
  );
}
