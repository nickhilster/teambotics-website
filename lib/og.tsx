export function buildOgImage() {
  return (
    <div
      style={{
        alignItems: "center",
        background: "#ffffff",
        color: "#0f1117",
        display: "flex",
        fontFamily: "sans-serif",
        height: "100%",
        justifyContent: "center",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          background:
            "radial-gradient(circle at center, rgba(74,144,217,0.22), transparent 60%)",
          borderRadius: "999px",
          height: 420,
          position: "absolute",
          top: 60,
          width: 620,
        }}
      />
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: 28,
          textAlign: "center",
          width: 920,
        }}
      >
        <div
          style={{
            border: "1px solid rgba(121, 184, 255, 0.24)",
            borderRadius: 999,
            color: "#79b8ff",
            fontFamily: "monospace",
            fontSize: 20,
            letterSpacing: "0.18em",
            padding: "14px 24px",
          }}
        >
          APPLIED AI PRODUCT STUDIO
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-0.06em",
            lineHeight: 1,
          }}
        >
          <span>Building applied</span>
          <span>AI products for</span>
          <span>operations, creativity,</span>
          <span style={{ color: "#79b8ff" }}>and narrative.</span>
        </div>
      </div>
    </div>
  );
}
