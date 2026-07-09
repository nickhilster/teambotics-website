import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "DyKnow — Knowledge That Stays Aligned With Its Source",
  description:
    "DyKnow keeps your most important knowledge pages aligned with the source material they describe — code, docs, tickets, and specs. Source-backed updates, human-in-the-loop review, and a full audit trail. Cloud and repo-native Local.",
  openGraph: {
    title: "DyKnow by Teambotics",
    description:
      "Source-aligned knowledge maintenance for humans, teams, and AI agents. Detect drift, draft source-backed updates, review, and publish with a full audit trail.",
    url: "https://teambotics.app/dyknow",
    images: [{ url: "/brand/teambotics-logo-250.png" }],
  },
};

const GREEN = "#35d6a4";
const GREEN_DIM = "rgba(53,214,164,0.10)";
const GREEN_BORDER = "rgba(53,214,164,0.28)";
const BG = "#0b0f0e";
const BG2 = "#121a17";
const CARD = "#161f1b";
const BORDER = "#26312c";
const TEXT = "#dde7e2";
const MUTED = "#7d9089";

const stats = [
  { value: "2", label: "Cloud + Local modes" },
  { value: "3", label: "Local surfaces: CLI · MCP · IDE" },
  { value: "MIT", label: "Open-source core" },
  { value: "0", label: "Unreviewed changes" },
];

const steps = [
  {
    n: "01",
    title: "Scan your sources",
    body: "DyKnow builds a structured map of your repo and source material — code, Markdown, config, API routes, and dependency manifests — so it knows what your knowledge is built on.",
  },
  {
    n: "02",
    title: "Detect drift",
    body: "A structured diff compares the latest scan against the last snapshot and flags exactly which knowledge pages are affected by matched source changes.",
  },
  {
    n: "03",
    title: "Draft and review",
    body: "DyKnow drafts source-backed update proposals, each graded by risk level. You approve, edit, reject, or regenerate — nothing publishes on its own.",
  },
  {
    n: "04",
    title: "Publish with a trail",
    body: "Approved updates land as a single git commit or a reviewable pull request. Every scan, review, and publish is recorded in an append-only audit log.",
  },
];

const features = [
  {
    icon: "🔗",
    title: "Source-aligned pages",
    body: "Knowledge pages stay tied to the code, docs, tickets, and specs they describe — so they update when the source does, not months later.",
  },
  {
    icon: "🧑‍⚖️",
    title: "Human-in-the-loop review",
    body: "Every proposed change is reviewed before it lands. High-risk edits are gated and require an explicit override before they can publish.",
  },
  {
    icon: "🖥️",
    title: "Repo-native Local",
    body: "A CLI, a stdio MCP server, and an optional VS Code extension run inside your own environment — no source ever has to leave it.",
  },
  {
    icon: "☁️",
    title: "Cloud control plane",
    body: "DyKnow Cloud is a hosted system that monitors approved internal and external sources and syncs with Local through a single config block.",
  },
  {
    icon: "📊",
    title: "Risk and confidence scoring",
    body: "Each proposal carries a risk level and rationale. Low-risk updates flow quickly; high-risk ones stop for a human until explicitly approved.",
  },
  {
    icon: "🧾",
    title: "Append-only audit trail",
    body: "Scans, reviews, and publishes are logged newest-last and never rewritten — traceable governance for teams that need to prove what changed and why.",
  },
];

const useCases = [
  {
    icon: "🛠️",
    who: "Engineering teams",
    what: "Keep architecture docs, runbooks, and API references aligned with the codebase instead of drifting out of date between releases.",
  },
  {
    icon: "📚",
    who: "Support & knowledge teams",
    what: "Keep help articles and internal wikis current as the product changes, with every edit tied back to the source that prompted it.",
  },
  {
    icon: "🤖",
    who: "AI & agent builders",
    what: "Give agents a source-aligned knowledge layer through the MCP server, so IDE and desktop clients read from pages that stay true to the code.",
  },
  {
    icon: "⚖️",
    who: "Regulated & compliance orgs",
    what: "Provable, reviewed, auditable knowledge updates — with risk gating and an append-only trail that satisfies internal controls.",
  },
];

const faqs = [
  {
    q: "How does DyKnow decide what to update?",
    a: "It scans your sources, diffs against the last snapshot, and drafts proposals only for the knowledge pages affected by matched source patterns — not a blanket rewrite.",
  },
  {
    q: "Does it change my docs automatically?",
    a: "No. Every proposal is reviewed. Approved changes publish as a single commit or a pull request, and high-risk changes require an explicit override before they can land.",
  },
  {
    q: "What is the difference between Cloud and Local?",
    a: "DyKnow Local is a repo-native CLI, MCP server, and optional VS Code extension that runs inside your environment. DyKnow Cloud is a hosted control plane that monitors approved sources and syncs with Local.",
  },
  {
    q: "Which models does it use?",
    a: "DyKnow Local can run a built-in generator or a bring-your-own-key provider (such as OpenAI) in connected mode. Your keys and source stay in your environment.",
  },
  {
    q: "How is it licensed?",
    a: "DyKnow's core is open source under the MIT license. Reach out to talk about DyKnow Cloud for your team or organisation.",
  },
];

export default function DyKnowPage() {
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
        aria-label="DyKnow navigation"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(11,15,14,0.9)",
          backdropFilter: "blur(14px)",
          borderBottom: `1px solid ${GREEN_BORDER}`,
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
          <span style={{ fontWeight: 700, fontSize: "1rem", color: GREEN, letterSpacing: "-0.02em" }}>
            DyKnow
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
            href="mailto:hello@teambotics.app?subject=DyKnow early access"
            style={{
              background: GREEN,
              color: "#04120d",
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
        {/* animated source-sync graph SVG */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <svg
            width="76"
            height="76"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <line x1="20" y1="20" x2="7" y2="9" stroke={GREEN} strokeWidth="1.2" opacity="0.5" />
            <line x1="20" y1="20" x2="33" y2="9" stroke={GREEN} strokeWidth="1.2" opacity="0.5" />
            <line x1="20" y1="20" x2="8" y2="31" stroke={GREEN} strokeWidth="1.2" opacity="0.5" />
            <line x1="20" y1="20" x2="32" y2="31" stroke={GREEN} strokeWidth="1.2" opacity="0.5" />
            <circle cx="20" cy="20" r="11" fill="none" stroke={GREEN} strokeWidth="1">
              <animate attributeName="r" values="11;18;11" dur="3.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values=".5;0;.5" dur="3.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="20" cy="20" r="5.5" fill={GREEN} />
            <path d="M17.6 20.2l1.8 1.8 3.4-3.6" fill="none" stroke="#04120d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="7" cy="9" r="2.4" fill={GREEN}>
              <animate attributeName="opacity" values="1;.25;1" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="33" cy="9" r="2.4" fill={GREEN}>
              <animate attributeName="opacity" values=".25;1;.25" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="8" cy="31" r="2.4" fill={GREEN}>
              <animate attributeName="opacity" values="1;.25;1" dur="2.4s" begin=".6s" repeatCount="indefinite" />
            </circle>
            <circle cx="32" cy="31" r="2.4" fill={GREEN}>
              <animate attributeName="opacity" values=".25;1;.25" dur="2.4s" begin=".9s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {["Source-backed", "Human-reviewed", "Cloud + Local", "Audit trail"].map((tag) => (
            <span
              key={tag}
              style={{
                background: GREEN_DIM,
                border: `1px solid ${GREEN_BORDER}`,
                color: GREEN,
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
            background: `linear-gradient(135deg, #fff 30%, ${GREEN})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Knowledge that stays<br />aligned with its source.
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
          DyKnow keeps your most important knowledge pages aligned with the material
          they describe — code, docs, websites, support tickets, and product specs.
          It detects drift, drafts source-backed updates, and lets a human approve
          every change before it lands.
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
          Source-aligned knowledge maintenance for humans, teams, and AI agents — available as hosted Cloud and repo-native Local.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "3.5rem" }}>
          <a
            href="mailto:hello@teambotics.app?subject=DyKnow early access"
            style={{
              display: "inline-block",
              background: GREEN,
              color: "#04120d",
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
            maxWidth: "42rem",
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
                  fontSize: "1.6rem",
                  fontWeight: 800,
                  color: GREEN,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: "0.66rem", color: MUTED, marginTop: "0.3rem", letterSpacing: "0.02em" }}>
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
              color: GREEN,
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
            Documentation rots the moment the code moves on.
          </h2>
          <p style={{ color: MUTED, lineHeight: 1.75, fontSize: "0.95rem" }}>
            Every team has knowledge that quietly falls out of date — architecture docs, runbooks,
            help articles, API references. The source changes; the page does not. DyKnow closes that
            gap by treating knowledge the way it should be treated: raw sources stay immutable, the
            synthesized page is source-backed, and every update is proposed, reviewed, and logged.
          </p>
        </section>

        {/* ── HOW IT WORKS ────────────────────────────────── */}
        <section id="how-it-works" style={{ marginBottom: "6rem" }}>
          <p
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: GREEN,
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
            Scan, diff, review, publish
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
                    color: GREEN,
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
              color: GREEN,
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
            Built so knowledge can be trusted
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
              color: GREEN,
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
            For teams whose knowledge has to keep up
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
            background: GREEN_DIM,
            border: `1px solid ${GREEN_BORDER}`,
            borderRadius: "14px",
            padding: "2.5rem",
            marginBottom: "6rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))",
            gap: "2rem",
          }}
        >
          {[
            { icon: "🔒", title: "Runs in your environment", body: "DyKnow Local scans and drafts inside your own repo and environment — source stays with you." },
            { icon: "✋", title: "Nothing publishes unreviewed", body: "Every proposal waits for approval; high-risk changes require an explicit override." },
            { icon: "🧾", title: "Everything is logged", body: "An append-only audit trail records each scan, review, and publish for governance." },
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
            Ready to keep your knowledge honest?
          </h2>
          <p style={{ color: MUTED, fontSize: "0.9rem", marginBottom: "2rem", lineHeight: 1.7, maxWidth: "36rem", margin: "0 auto 2rem" }}>
            DyKnow is in early access. We&apos;re working with engineering, support, and
            compliance teams who need their documentation to stay aligned with the source
            it describes. Reach out and we&apos;ll get you set up.
          </p>
          <a
            href="mailto:hello@teambotics.app?subject=DyKnow early access"
            style={{
              display: "inline-block",
              background: GREEN,
              color: "#04120d",
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
        <span>DyKnow by </span>
        <a href="https://teambotics.app" style={{ color: GREEN, textDecoration: "none" }}>
          Teambotics
        </a>
        <span> · Source-aligned · Human-reviewed · MIT core</span>
      </footer>
    </div>
  );
}
