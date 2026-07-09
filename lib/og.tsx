export function buildOgImage(logoSrc: string) {
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
          INDEPENDENT AI LAB
        </div>
        <div
          style={{
            alignItems: "center",
            background: "rgba(255,255,255,0.78)",
            border: "1px solid rgba(121, 184, 255, 0.18)",
            borderRadius: 40,
            boxShadow: "0 24px 60px rgba(15, 17, 23, 0.08)",
            display: "flex",
            height: 220,
            justifyContent: "center",
            padding: 28,
            width: 220,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" height={164} src={logoSrc} width={164} />
        </div>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-0.06em",
            lineHeight: 1,
            textAlign: "center",
          }}
        >
          <span>Built for the</span>
          <span>environments that</span>
          <span style={{ color: "#79b8ff" }}>don&apos;t forgive mistakes.</span>
        </div>
      </div>
    </div>
  );
}
