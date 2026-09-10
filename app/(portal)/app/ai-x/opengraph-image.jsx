import { ImageResponse } from "next/og";

export const alt = "AI-X Clock — Existential AI Risk Observatory";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#07080A",
          color: "#F7F9FB",
          fontFamily: "Arial, sans-serif",
          padding: "58px 68px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(circle at 82% 50%, rgba(244,84,84,.18), transparent 28%), radial-gradient(circle at 78% 50%, rgba(255,184,77,.08), transparent 43%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", width: "64%", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 20, letterSpacing: 3 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: 999,
                border: "2px solid #FFB84D",
                color: "#FFB84D",
                fontWeight: 700,
              }}
            >
              X
            </div>
            <span>AI-X CLOCK</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginTop: 88 }}>
            <div style={{ fontSize: 64, lineHeight: 1.02, fontWeight: 700, letterSpacing: -3 }}>
              How close are we to
            </div>
            <div style={{ fontSize: 64, lineHeight: 1.02, fontWeight: 700, letterSpacing: -3, color: "#FFB84D" }}>
              losing control?
            </div>
          </div>

          <div style={{ display: "flex", marginTop: "auto", gap: 18, alignItems: "center", fontSize: 17, color: "#98A2AE" }}>
            <span>7 gates</span><span>•</span><span>Auditable evidence</span><span>•</span><span>Colibrii Labs</span>
          </div>
        </div>

        <div style={{ display: "flex", width: "36%", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 320,
              height: 320,
              borderRadius: 999,
              border: "3px solid #FFB84D",
              alignItems: "center",
              justifyContent: "center",
              background: "#0B0D10",
              boxShadow: "0 30px 80px rgba(0,0,0,.4)",
            }}
          >
            <div style={{ fontSize: 18, letterSpacing: 3, color: "#98A2AE" }}>AI-X</div>
            <div style={{ display: "flex", fontSize: 72, lineHeight: 1, fontWeight: 700, letterSpacing: -5, marginTop: 14 }}>
              05:00
            </div>
            <div style={{ fontSize: 15, letterSpacing: 2.5, color: "#FFB84D", marginTop: 16 }}>TO MIDNIGHT</div>
            <div style={{ fontSize: 17, color: "#98A2AE", marginTop: 20 }}>58 / 100 · ELEVATED</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
