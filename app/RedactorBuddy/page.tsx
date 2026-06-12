import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "RedactorBuddy — Local-First Financial Document Redaction",
  description:
    "RedactorBuddy strips names, account numbers, SSNs and other PII from financial documents — entirely on your machine. No cloud. No uploads. Compliance-ready.",
  openGraph: {
    title: "RedactorBuddy by Teambotics",
    description:
      "Privacy-first PII redaction for financial documents. Runs locally, works offline, built for business.",
    images: [{ url: "/brand/teambotics-logo-250.png" }],
  },
};

const BLUE = "#4F8EF7";
const BLUE_DIM = "rgba(79,142,247,0.12)";
const BLUE_BORDER = "rgba(79,142,247,0.3)";
const BG = "#0d0f12";
const BG2 = "#161b22";
const CARD = "#1c2128";
const BORDER = "#2d333b";
const TEXT = "#dde3ec";
const MUTED = "#7a8899";

const milestones = [
  {
    label: "Phase 1",
    title: "Core Redaction Engine",
    date: "May 2026",
    color: BLUE,
    summary:
      "Built the foundational pipeline that turns raw financial documents into clean, privacy-safe exports — entirely on the local machine.",
    items: [
      "Multi-format ingestion: PDF, Excel, CSV, JSON, plain text",
      "Dual-layer redaction: compiled regex rules + Presidio NLP",
      "Document classification (bank statement, payroll, invoice…)",
      "Risk scoring: LOW / MEDIUM / HIGH remaining-PII grade",
      "Structured export to JSON, CSV, and Markdown",
      "Zero cloud calls — no data ever leaves the machine",
    ],
  },
  {
    label: "Phase 2",
    title: "Desktop Application",
    date: "May 2026",
    color: "#a78bfa",
    summary:
      "Packaged the pipeline into a one-click Windows desktop app powered by Electron + PyInstaller — fully offline, no Python install required.",
    items: [
      "One-click Windows installer (.exe) with auto-update ready",
      "Streamlit UI embedded inside Electron — native feel, web power",
      "Animated loading screen showing live PII being redacted",
      "Audio completion signal (ding) when a batch finishes",
      "File drag-and-drop and folder upload support",
      "Startup in under 4 seconds on modern hardware",
    ],
  },
  {
    label: "Phase 3",
    title: "Business Batch Operations",
    date: "May 2026",
    color: "#4ade80",
    summary:
      "Turned a single-file tool into a department-ready system with persistent queues, watch folders, and a compliance audit trail.",
    items: [
      "Watch folders: drop a file, it processes automatically",
      "SQLite-backed queue — survives restarts, tracks every job",
      "Approval workflow: MEDIUM-risk exports require sign-off",
      "Exportable audit log for compliance review (CSV)",
      "Dashboard: monthly throughput, blocked items, folder status",
      "Background processing — UI stays responsive during long batches",
    ],
  },
  {
    label: "Phase 4",
    title: "Identity & Experience",
    date: "June 2026",
    color: "#f472b6",
    summary:
      "Gave the product a distinct visual identity: 9 handcrafted themes, an animated circuit-lock logo, and a loading screen that shows the product doing its job.",
    items: [
      "9 curated themes: 5 dark (Obsidian, Midnight, Terminal, Cinder, Void) + 4 light",
      "Animated circuit-lock logo — lock body with pulsing local-machine traces",
      "Animated loading screen: real PII being redacted word-by-word",
      "Theme picker in the sidebar — instant live preview, no restart",
      "Scrollbar, card, button, and input styling per-theme",
    ],
  },
  {
    label: "Phase 5",
    title: "Intelligence Tools",
    date: "June 2026",
    color: BLUE,
    summary:
      "Surfaced the smarts already in the pipeline — and gave non-technical users controls they actually need for day-to-day workflows.",
    items: [
      "Redaction profiles: save named option presets, load in one click",
      "Custom regex patterns: add business-specific PII via the Settings UI",
      "Confidence scoring overlay: 🟢🟡🔴 per-entity detection quality",
      "Profiles live in the local SQLite DB alongside the queue & audit log",
      "Pattern validation before save — bad regex is caught at the UI",
    ],
  },
];

const upNext = [
  { icon: "🔍", text: "OCR for scanned PDFs and image uploads" },
  { icon: "📋", text: "Batch summary report PDF for compliance" },
  { icon: "🌐", text: "LAN server mode — process files from any machine on the network" },
  { icon: "📊", text: "Redaction confidence tuning — set per-entity score thresholds" },
  { icon: "📧", text: "Outlook / local mail folder watch" },
];

const stats = [
  { value: "0", label: "Cloud calls made" },
  { value: "6", label: "Export formats" },
  { value: "9", label: "UI themes" },
  { value: "5", label: "Pipeline stages" },
];

export default function RedactorBuddyPage() {
  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
        background: BG,
        color: TEXT,
        minHeight: "100vh",
      }}
    >
      {/* ── NAV ─────────────────────────────────────────── */}
      <nav
        aria-label="RedactorBuddy navigation"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(13,15,18,0.88)",
          backdropFilter: "blur(14px)",
          borderBottom: `1px solid ${BLUE_BORDER}`,
          padding: "0 1.5rem",
          height: "3.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <Image
            src="/brand/teambotics-logo-250.png"
            alt="Teambotics"
            width={28}
            height={28}
            style={{ borderRadius: "6px" }}
          />
          <span style={{ fontWeight: 700, fontSize: "1rem", color: BLUE, letterSpacing: "-0.02em" }}>
            RedactorBuddy
          </span>
          <span style={{ fontSize: "0.7rem", color: MUTED, marginLeft: "0.25rem" }}>
            by Teambotics
          </span>
        </div>
        <a
          href="mailto:hello@teambotics.app"
          style={{
            background: BLUE,
            color: "#fff",
            fontWeight: 700,
            fontSize: "0.78rem",
            padding: "0.4rem 1rem",
            borderRadius: "6px",
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          Get early access
        </a>
      </nav>

      {/* ── HERO ────────────────────────────────────────── */}
      <header
        style={{
          maxWidth: "64rem",
          margin: "0 auto",
          padding: "5rem 1.5rem 4rem",
          textAlign: "center",
        }}
      >
        {/* animated circuit-lock SVG */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <svg
            width="72"
            height="72"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <style>{`
                @keyframes rb-node-a{0%,100%{opacity:1}50%{opacity:.2}}
                @keyframes rb-node-b{0%,100%{opacity:.2}50%{opacity:1}}
                @keyframes rb-pulse{0%,100%{r:10;opacity:.5}60%{r:19;opacity:0}}
              `}</style>
            </defs>
            <circle cx="20" cy="26" r="10" fill="none" stroke={BLUE} strokeWidth="1">
              <animate attributeName="r" values="10;19;10" dur="3.2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values=".5;0;.5" dur="3.2s" repeatCount="indefinite"/>
            </circle>
            <rect x="9" y="19" width="22" height="15" rx="4" fill={BLUE}/>
            <path d="M14 19V14Q14 7 20 7Q26 7 26 14V19" fill="none" stroke={BLUE} strokeWidth="4" strokeLinecap="round"/>
            <circle cx="20" cy="26" r="3" fill="rgba(0,0,0,0.35)"/>
            <rect x="18.5" y="27.5" width="3" height="4.5" rx="1.5" fill="rgba(0,0,0,0.35)"/>
            <polyline points="9,23 4,23 4,31" fill="none" stroke={BLUE} strokeWidth="1.4" opacity=".6"/>
            <circle cx="4" cy="31" r="2.2" fill={BLUE}>
              <animate attributeName="opacity" values="1;.2;1" dur="1.8s" repeatCount="indefinite"/>
            </circle>
            <polyline points="31,25 36,25 36,31" fill="none" stroke={BLUE} strokeWidth="1.4" opacity=".6"/>
            <circle cx="36" cy="31" r="2.2" fill={BLUE}>
              <animate attributeName="opacity" values=".2;1;.2" dur="1.8s" repeatCount="indefinite"/>
            </circle>
            <polyline points="20,19 20,12 26,12" fill="none" stroke={BLUE} strokeWidth="1.4" opacity=".5"/>
            <circle cx="26" cy="12" r="2" fill={BLUE}>
              <animate attributeName="opacity" values="1;.2;1" dur="2.4s" begin=".8s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {["Local only", "No cloud", "Offline-ready", "Compliance-ready"].map((tag) => (
            <span
              key={tag}
              style={{
                background: BLUE_DIM,
                border: `1px solid ${BLUE_BORDER}`,
                color: BLUE,
                fontSize: "0.7rem",
                fontWeight: 600,
                padding: "0.2rem 0.65rem",
                borderRadius: "999px",
                letterSpacing: "0.03em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            marginBottom: "1.25rem",
            background: `linear-gradient(135deg, #fff 30%, ${BLUE})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Redact financial PII.<br />Entirely on your machine.
        </h1>

        <p
          style={{
            fontSize: "1.125rem",
            color: MUTED,
            maxWidth: "42rem",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
          }}
        >
          RedactorBuddy strips names, account numbers, SSNs, emails, phone numbers and other
          sensitive identifiers from financial documents — then structures what remains into
          clean, exportable data. No internet required. Ever.
        </p>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            background: BORDER,
            border: `1px solid ${BORDER}`,
            borderRadius: "12px",
            overflow: "hidden",
            maxWidth: "36rem",
            margin: "0 auto",
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                background: CARD,
                padding: "1.25rem 0.5rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  color: BLUE,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: "0.68rem", color: MUTED, marginTop: "0.3rem", letterSpacing: "0.02em" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* ── TIMELINE ────────────────────────────────────── */}
      <main id="rb-main" style={{ maxWidth: "52rem", margin: "0 auto", padding: "0 1.5rem 6rem" }}>
        <h2
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: MUTED,
            textTransform: "uppercase",
            marginBottom: "3rem",
            textAlign: "center",
          }}
        >
          Development timeline
        </h2>

        <div style={{ position: "relative" }}>
          {/* vertical spine */}
          <div
            style={{
              position: "absolute",
              left: "1.35rem",
              top: "2rem",
              bottom: "2rem",
              width: "2px",
              background: `linear-gradient(to bottom, ${BLUE}, rgba(79,142,247,0.1))`,
            }}
            aria-hidden="true"
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {milestones.map((m, i) => (
              <div key={m.title} style={{ display: "flex", gap: "1.75rem" }}>
                {/* node */}
                <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    style={{
                      width: "2.75rem",
                      height: "2.75rem",
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${m.color}22, ${m.color}44)`,
                      border: `2px solid ${m.color}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.65rem",
                      fontWeight: 800,
                      color: m.color,
                      letterSpacing: "0.04em",
                      zIndex: 1,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* card */}
                <div
                  style={{
                    flex: 1,
                    background: CARD,
                    border: `1px solid ${BORDER}`,
                    borderRadius: "12px",
                    padding: "1.5rem",
                    marginTop: "0.25rem",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.6rem", gap: "1rem", flexWrap: "wrap" }}>
                    <div>
                      <span
                        style={{
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          color: m.color,
                          textTransform: "uppercase",
                          display: "block",
                          marginBottom: "0.2rem",
                        }}
                      >
                        {m.label}
                      </span>
                      <h3
                        style={{
                          fontSize: "1.15rem",
                          fontWeight: 700,
                          letterSpacing: "-0.02em",
                          color: "#fff",
                          margin: 0,
                        }}
                      >
                        {m.title}
                      </h3>
                    </div>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: MUTED,
                        background: BG2,
                        border: `1px solid ${BORDER}`,
                        padding: "0.2rem 0.6rem",
                        borderRadius: "999px",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {m.date}
                    </span>
                  </div>

                  <p style={{ fontSize: "0.88rem", color: MUTED, lineHeight: 1.65, marginBottom: "1rem" }}>
                    {m.summary}
                  </p>

                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {m.items.map((item) => (
                      <li
                        key={item}
                        style={{
                          fontSize: "0.82rem",
                          color: TEXT,
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.5rem",
                          lineHeight: 1.5,
                        }}
                      >
                        <span style={{ color: m.color, marginTop: "0.15rem", flexShrink: 0 }}>▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── UP NEXT ───────────────────────────────────── */}
        <div
          style={{
            marginTop: "5rem",
            background: BLUE_DIM,
            border: `1px solid ${BLUE_BORDER}`,
            borderRadius: "14px",
            padding: "2rem",
          }}
        >
          <h2
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: BLUE,
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}
          >
            Coming next
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {upNext.map((u) => (
              <div key={u.text} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ fontSize: "1.1rem" }}>{u.icon}</span>
                <span style={{ fontSize: "0.88rem", color: TEXT }}>{u.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ───────────────────────────────────────── */}
        <div
          style={{
            marginTop: "3.5rem",
            textAlign: "center",
            padding: "2.5rem",
            background: CARD,
            border: `1px solid ${BORDER}`,
            borderRadius: "14px",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              marginBottom: "0.75rem",
              color: "#fff",
            }}
          >
            Want early access?
          </h2>
          <p style={{ color: MUTED, fontSize: "0.9rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
            RedactorBuddy is in active development. We&apos;re onboarding accounting firms,
            mortgage brokers, and compliance teams who process financial documents at volume.
          </p>
          <a
            href="mailto:hello@teambotics.app?subject=RedactorBuddy early access"
            style={{
              display: "inline-block",
              background: BLUE,
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.9rem",
              padding: "0.75rem 2rem",
              borderRadius: "8px",
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            hello@teambotics.app
          </a>
        </div>
      </main>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: `1px solid ${BORDER}`,
          padding: "1.5rem",
          textAlign: "center",
          fontSize: "0.75rem",
          color: MUTED,
        }}
      >
        <span>RedactorBuddy by </span>
        <a href="https://teambotics.app" style={{ color: BLUE, textDecoration: "none" }}>
          Teambotics
        </a>
        <span> · Privacy-first · Local only · No cloud</span>
      </footer>
    </div>
  );
}
