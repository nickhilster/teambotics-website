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
            "radial-gradient(circle at center, rgba(74,144,217,0.16), transparent 60%)",
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
            border: "1px solid rgba(74, 144, 217, 0.28)",
            borderRadius: 999,
            color: "#4A90D9",
            fontFamily: "monospace",
            fontSize: 20,
            letterSpacing: "0.18em",
            padding: "14px 24px",
          }}
        >
          APPLIED AI SYSTEMS LAB
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
          <span>Built for the</span>
          <span>environments that</span>
          <span style={{ color: "#4A90D9" }}>can&apos;t afford to fail.</span>
        </div>
      </div>
    </div>
  );
}
