import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "RedactorBuddy — Share Financial Documents Without Exposing Client Data",
  description:
    "RedactorBuddy removes names, account numbers, SSNs and other PII from financial documents — entirely on your machine. No cloud. No subscription. Works offline.",
  openGraph: {
    title: "RedactorBuddy by Teambotics",
    description:
      "Share financial documents with AI tools without exposing client data. Runs 100% locally on Windows — no internet required.",
    images: [{ url: "/brand/teambotics-logo-250.png" }],
  },
};

const BLUE = "#4F8EF7";
const BLUE_DIM = "rgba(79,142,247,0.10)";
const BLUE_BORDER = "rgba(79,142,247,0.28)";
const BG = "#0d0f12";
const BG2 = "#161b22";
const CARD = "#1c2128";
const BORDER = "#2d333b";
const TEXT = "#dde3ec";
const MUTED = "#7a8899";

const stats = [
  { value: "0", label: "Cloud calls — ever" },
  { value: "6", label: "File formats" },
  { value: "<4s", label: "App startup" },
  { value: "100%", label: "Offline capable" },
];

const steps = [
  {
    n: "01",
    title: "Drop your document",
    body: "Drag and drop any financial document — bank statements, pay stubs, invoices, tax forms, CSV exports — or point RedactorBuddy at a whole folder.",
  },
  {
    n: "02",
    title: "PII is stripped automatically",
    body: "A dual-layer engine (compiled rules + AI) finds and removes names, account numbers, SSNs, emails, phone numbers, and addresses. You see a risk score before anything is exported.",
  },
  {
    n: "03",
    title: "Export clean, structured data",
    body: "Download redacted output as JSON, CSV, or Markdown. Safe to paste into ChatGPT, Claude, or any other AI assistant — or share with a third-party processor.",
  },
];

const features = [
  {
    icon: "🔒",
    title: "Zero cloud",
    body: "No data ever leaves your machine. No SaaS account, no upload, no server. RedactorBuddy runs entirely on your Windows PC.",
  },
  {
    icon: "🤖",
    title: "Dual-layer AI redaction",
    body: "Compiled regex rules catch patterns instantly. Presidio NLP catches context-dependent PII that rules alone miss. Both run locally.",
  },
  {
    icon: "📁",
    title: "Any document format",
    body: "PDF, Excel (.xlsx / .xls), CSV, JSON, plain text, Markdown. Drag a file or point to a folder — RedactorBuddy handles the rest.",
  },
  {
    icon: "📊",
    title: "Risk scoring before export",
    body: "Every document gets a LOW / MEDIUM / HIGH remaining-PII grade. HIGH-risk exports are blocked until you explicitly approve them.",
  },
  {
    icon: "📂",
    title: "Watch folders",
    body: "Drop files into a watched folder and they process automatically in the background. Ideal for accounting departments handling daily document volume.",
  },
  {
    icon: "🗂️",
    title: "Compliance audit trail",
    body: "Every redaction is logged — what was removed, when, and the resulting risk level. Export the log as CSV for compliance review.",
  },
];

const useCases = [
  {
    icon: "🏦",
    who: "Accounting firms",
    what: "Anonymise client bank statements and tax returns before analysing them with AI tools. Keep client data off third-party servers.",
  },
  {
    icon: "🏠",
    who: "Mortgage brokers",
    what: "Strip borrower PII from income verification and bank statements before sharing with processors or underwriters.",
  },
  {
    icon: "⚖️",
    who: "Compliance & legal teams",
    what: "Redact identifying information from documents before external review. The audit trail satisfies internal controls.",
  },
  {
    icon: "👔",
    who: "HR departments",
    what: "Share payroll and benefits data internally without exposing employee SSNs, account numbers, or home addresses.",
  },
];

const faqs = [
  {
    q: "Does it need internet access?",
    a: "Never. RedactorBuddy runs 100% offline. There is no server component, no telemetry, and no cloud dependency of any kind.",
  },
  {
    q: "What operating systems are supported?",
    a: "Windows 10 and Windows 11 (64-bit). A Mac build is on the roadmap.",
  },
  {
    q: "Does it work on scanned PDFs?",
    a: "Text-based PDFs are fully supported today. OCR for scanned documents is on the near-term roadmap.",
  },
  {
    q: "How is it licensed?",
    a: "RedactorBuddy is in early access. Reach out to discuss pricing for your team or organisation.",
  },
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
          background: "rgba(13,15,18,0.9)",
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
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <a href="#how-it-works" style={{ fontSize: "0.8rem", color: MUTED, textDecoration: "none" }}>
            How it works
          </a>
          <a href="#features" style={{ fontSize: "0.8rem", color: MUTED, textDecoration: "none" }}>
            Features
          </a>
          <a
            href="mailto:hello@teambotics.app?subject=RedactorBuddy early access"
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
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────── */}
      <header
        style={{
          maxWidth: "64rem",
          margin: "0 auto",
          padding: "5.5rem 1.5rem 4rem",
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
          {["No cloud", "Offline-ready", "Windows app", "Compliance-ready"].map((tag) => (
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
          Share financial documents<br />without exposing client data.
        </h1>

        <p
          style={{
            fontSize: "1.15rem",
            color: MUTED,
            maxWidth: "44rem",
            margin: "0 auto 1rem",
            lineHeight: 1.75,
          }}
        >
          RedactorBuddy strips names, account numbers, SSNs, emails and addresses
          from financial documents in seconds — then exports clean, structured data
          safe for AI tools, processors, or team sharing.
        </p>
        <p
          style={{
            fontSize: "0.9rem",
            color: MUTED,
            maxWidth: "36rem",
            margin: "0 auto 2.75rem",
            lineHeight: 1.6,
            opacity: 0.75,
          }}
        >
          Everything runs on your Windows PC. No internet. No subscription. No data ever leaves your machine.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "3.5rem" }}>
          <a
            href="mailto:hello@teambotics.app?subject=RedactorBuddy early access"
            style={{
              display: "inline-block",
              background: BLUE,
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.95rem",
              padding: "0.75rem 2rem",
              borderRadius: "8px",
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            Request early access
          </a>
          <a
            href="#how-it-works"
            style={{
              display: "inline-block",
              background: "transparent",
              color: TEXT,
              fontWeight: 600,
              fontSize: "0.95rem",
              padding: "0.75rem 2rem",
              borderRadius: "8px",
              textDecoration: "none",
              border: `1px solid ${BORDER}`,
              letterSpacing: "-0.01em",
            }}
          >
            See how it works
          </a>
        </div>

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
            maxWidth: "38rem",
            margin: "0 auto",
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{ background: CARD, padding: "1.25rem 0.5rem", textAlign: "center" }}
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

      <main style={{ maxWidth: "60rem", margin: "0 auto", padding: "0 1.5rem 6rem" }}>

        {/* ── PROBLEM ─────────────────────────────────────── */}
        <section style={{ maxWidth: "44rem", margin: "0 auto 6rem", textAlign: "center" }}>
          <p
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: BLUE,
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            The problem
          </p>
          <h2
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#fff",
              lineHeight: 1.25,
              marginBottom: "1rem",
            }}
          >
            AI tools are transforming financial work — but they require your client&apos;s data.
          </h2>
          <p style={{ color: MUTED, lineHeight: 1.75, fontSize: "0.95rem" }}>
            Accounting firms, mortgage brokers, and compliance teams are under pressure to use AI for
            analysis, summarisation, and review. But pasting a client bank statement into ChatGPT means
            that statement — with names, account numbers, and SSNs — just left your firm&apos;s control.
            RedactorBuddy solves this before the data moves.
          </p>
        </section>

        {/* ── HOW IT WORKS ────────────────────────────────── */}
        <section id="how-it-works" style={{ marginBottom: "6rem" }}>
          <p
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: BLUE,
              textTransform: "uppercase",
              marginBottom: "0.75rem",
              textAlign: "center",
            }}
          >
            How it works
          </p>
          <h2
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#fff",
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            Three steps to share-safe data
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
              gap: "1rem",
            }}
          >
            {steps.map((s) => (
              <div
                key={s.n}
                style={{
                  background: CARD,
                  border: `1px solid ${BORDER}`,
                  borderRadius: "12px",
                  padding: "1.75rem 1.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    color: BLUE,
                    letterSpacing: "0.1em",
                    marginBottom: "0.75rem",
                  }}
                >
                  {s.n}
                </div>
                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "#fff",
                    letterSpacing: "-0.02em",
                    marginBottom: "0.6rem",
                  }}
                >
                  {s.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: MUTED, lineHeight: 1.7, margin: 0 }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ────────────────────────────────────── */}
        <section id="features" style={{ marginBottom: "6rem" }}>
          <p
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: BLUE,
              textTransform: "uppercase",
              marginBottom: "0.75rem",
              textAlign: "center",
            }}
          >
            Features
          </p>
          <h2
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#fff",
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            Everything a compliance-conscious team needs
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(17rem, 1fr))",
              gap: "1rem",
            }}
          >
            {features.map((f) => (
              <div
                key={f.title}
                style={{
                  background: CARD,
                  border: `1px solid ${BORDER}`,
                  borderRadius: "12px",
                  padding: "1.5rem",
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>{f.icon}</div>
                <h3
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "0.4rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ fontSize: "0.83rem", color: MUTED, lineHeight: 1.65, margin: 0 }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHO IT'S FOR ────────────────────────────────── */}
        <section style={{ marginBottom: "6rem" }}>
          <p
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: BLUE,
              textTransform: "uppercase",
              marginBottom: "0.75rem",
              textAlign: "center",
            }}
          >
            Who it&apos;s for
          </p>
          <h2
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#fff",
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            Built for teams that handle sensitive documents daily
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
              gap: "1rem",
            }}
          >
            {useCases.map((u) => (
              <div
                key={u.who}
                style={{
                  background: BG2,
                  border: `1px solid ${BORDER}`,
                  borderRadius: "12px",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{ fontSize: "1.4rem" }}>{u.icon}</span>
                  <span style={{ fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}>{u.who}</span>
                </div>
                <p style={{ fontSize: "0.83rem", color: MUTED, lineHeight: 1.65, margin: 0 }}>
                  {u.what}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── TRUST BANNER ────────────────────────────────── */}
        <section
          style={{
            background: BLUE_DIM,
            border: `1px solid ${BLUE_BORDER}`,
            borderRadius: "14px",
            padding: "2.5rem",
            marginBottom: "6rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))",
            gap: "2rem",
          }}
        >
          {[
            { icon: "🔐", title: "No data leaves your machine", body: "The app runs entirely offline. No network calls, ever." },
            { icon: "🖥️", title: "One-click Windows installer", body: "No Python, no dependencies. Download, install, open." },
            { icon: "📋", title: "Audit trail included", body: "Every redaction is logged. Export as CSV for compliance review." },
          ].map((t) => (
            <div key={t.title} style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              <div style={{ fontSize: "1.4rem" }}>{t.icon}</div>
              <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.9rem" }}>{t.title}</div>
              <div style={{ fontSize: "0.82rem", color: MUTED, lineHeight: 1.6 }}>{t.body}</div>
            </div>
          ))}
        </section>

        {/* ── FAQ ─────────────────────────────────────────── */}
        <section style={{ marginBottom: "6rem" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#fff",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            Common questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {faqs.map((f) => (
              <div
                key={f.q}
                style={{
                  background: CARD,
                  border: `1px solid ${BORDER}`,
                  borderRadius: "10px",
                  padding: "1.25rem 1.5rem",
                }}
              >
                <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.9rem", marginBottom: "0.4rem" }}>
                  {f.q}
                </div>
                <div style={{ fontSize: "0.83rem", color: MUTED, lineHeight: 1.65 }}>
                  {f.a}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────── */}
        <section
          style={{
            textAlign: "center",
            padding: "3rem 2rem",
            background: CARD,
            border: `1px solid ${BORDER}`,
            borderRadius: "16px",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              marginBottom: "0.75rem",
              color: "#fff",
            }}
          >
            Ready to keep client data off the cloud?
          </h2>
          <p style={{ color: MUTED, fontSize: "0.9rem", marginBottom: "2rem", lineHeight: 1.7, maxWidth: "36rem", margin: "0 auto 2rem" }}>
            RedactorBuddy is in early access. We&apos;re onboarding accounting firms,
            mortgage brokers, and compliance teams who process financial documents at volume.
            Reach out and we&apos;ll get you set up.
          </p>
          <a
            href="mailto:hello@teambotics.app?subject=RedactorBuddy early access"
            style={{
              display: "inline-block",
              background: BLUE,
              color: "#fff",
              fontWeight: 700,
              fontSize: "1rem",
              padding: "0.85rem 2.25rem",
              borderRadius: "8px",
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            hello@teambotics.app
          </a>
          <p style={{ fontSize: "0.75rem", color: MUTED, marginTop: "1rem" }}>
            We typically respond within one business day.
          </p>
        </section>
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
