export default function AppLoading() {
  return (
    <div className="portal-layout" style={{ minHeight: "100vh" }}>
      {/* Sidebar skeleton (desktop only) */}
      <div className="portal-sidebar-desktop" style={{ padding: "16px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <div className="skeleton" style={{ width: 40, height: 40, borderRadius: "50%" }} />
          <div>
            <div className="skeleton" style={{ width: 100, height: 14, marginBottom: 4 }} />
            <div className="skeleton" style={{ width: 70, height: 8 }} />
          </div>
        </div>
        {[1, 2, 3, 4].map(g => (
          <div key={g} style={{ marginBottom: 20 }}>
            <div className="skeleton" style={{ width: 60, height: 8, marginBottom: 8 }} />
            {[1, 2, 3].map(i => (
              <div key={i} className="skeleton" style={{ width: "90%", height: 12, marginBottom: 6, borderRadius: 4 }} />
            ))}
          </div>
        ))}
      </div>
      {/* Main content skeleton */}
      <div className="portal-main" style={{ padding: "32px 24px" }}>
        <div style={{ maxWidth: 900 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
            <div className="skeleton" style={{ width: 32, height: 32, borderRadius: "50%" }} />
            <div className="skeleton" style={{ width: 200, height: 20 }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="card" style={{ padding: 20 }}>
                <div className="skeleton" style={{ width: "60%", height: 20, marginBottom: 8 }} />
                <div className="skeleton" style={{ width: "100%", height: 14, marginBottom: 6 }} />
                <div className="skeleton" style={{ width: "80%", height: 14 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
