import type { Metadata } from "next";
import { c22Entries, c22NextSteps, c22Status } from "@/lib/c22-timeline";

export const metadata: Metadata = {
  title: "Bill C-22 Tracker — Canada's Lawful Access Act, in plain language",
  description:
    "What Canada's Bill C-22 (the Lawful Access Act, 2026) would do, where it stands in Parliament right now, and what happens next — a simple, sourced timeline, newest first, updated daily.",
  alternates: {
    canonical: "https://www.teambotics.app/c22",
  },
  openGraph: {
    title: "Bill C-22 Tracker — Lawful Access Act, 2026",
    description:
      "Not law yet: a Senate committee is studying it. A plain-language, fully sourced timeline of Canada's lawful-access bill, newest first.",
    url: "https://www.teambotics.app/c22",
    siteName: "Teambotics",
    locale: "en_CA",
    type: "website",
  },
};

export default function C22Page() {
  return (
    <main className="c22-page">
      <style>{`
        .c22-page {
          margin: -5rem 0 0;
          min-height: 100vh;
          background:
            radial-gradient(circle at 12% 8%, rgba(45, 212, 191, 0.14), transparent 32rem),
            linear-gradient(180deg, #06131f 0%, #07111d 48%, #030712 100%);
          color: #f8fbff;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .c22-wrap { width: min(900px, calc(100% - 2rem)); margin: 0 auto; }
        .c22-hero { padding: clamp(8rem, 14vw, 10rem) 0 2.5rem; }
        .c22-eyebrow {
          display: inline-flex; padding: 0.42rem 0.8rem; margin-bottom: 1.2rem;
          border: 1px solid rgba(103, 232, 249, 0.32); border-radius: 999px;
          background: rgba(103, 232, 249, 0.08); color: #67e8f9;
          font-size: 0.76rem; font-weight: 850; letter-spacing: 0.14em; text-transform: uppercase;
        }
        .c22-hero h1 { margin: 0; font-size: clamp(2.6rem, 7vw, 4.6rem); line-height: 0.95; letter-spacing: -0.05em; max-width: 800px; }
        .c22-dek { margin: 1.6rem 0 0; max-width: 760px; color: rgba(218,232,242,0.8); font-size: clamp(1.08rem, 2vw, 1.3rem); line-height: 1.55; }
        .c22-status {
          margin-top: 2.2rem; border: 1px solid rgba(121, 242, 184, 0.35); border-radius: 1.25rem;
          background: rgba(121, 242, 184, 0.07); padding: 1.4rem 1.5rem;
        }
        .c22-status h2 { margin: 0 0 0.6rem; font-size: 1.35rem; letter-spacing: -0.02em; color: #79f2b8; }
        .c22-status p { margin: 0; line-height: 1.6; color: rgba(240,248,255,0.88); }
        .c22-meta { margin-top: 0.9rem !important; font-size: 0.88rem; color: rgba(218,232,242,0.62) !important; }
        .c22-meta a, .c22-src a { color: #67e8f9; text-decoration: underline; text-underline-offset: 3px; }
        .c22-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem; margin: 2.2rem 0 0; }
        @media (max-width: 720px) { .c22-grid { grid-template-columns: 1fr; } }
        .c22-card {
          border: 1px solid rgba(148,190,220,0.18); border-radius: 1.25rem;
          background: rgba(255,255,255,0.05); padding: 1.3rem 1.4rem;
        }
        .c22-card span { color: #67e8f9; font-size: 0.74rem; font-weight: 850; letter-spacing: 0.13em; text-transform: uppercase; }
        .c22-card h3 { margin: 0.55rem 0 0; font-size: 1.18rem; letter-spacing: -0.02em; }
        .c22-card p { margin: 0.55rem 0 0; color: rgba(218,232,242,0.75); line-height: 1.55; font-size: 0.97rem; }
        .c22-h2 { margin: 3.4rem 0 0.4rem; font-size: clamp(1.7rem, 4vw, 2.3rem); letter-spacing: -0.04em; }
        .c22-sub { margin: 0 0 1.6rem; color: rgba(218,232,242,0.65); line-height: 1.5; }
        .c22-timeline { position: relative; margin: 0; padding: 0 0 0 1.4rem; list-style: none; border-left: 2px solid rgba(103,232,249,0.25); }
        .c22-item { position: relative; padding: 0 0 2.1rem 0.6rem; }
        .c22-item::before {
          content: ""; position: absolute; left: -1.83rem; top: 0.42rem; width: 0.72rem; height: 0.72rem;
          border-radius: 999px; background: #67e8f9; box-shadow: 0 0 0 4px rgba(103,232,249,0.15);
        }
        .c22-date { color: #67e8f9; font-size: 0.8rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; }
        .c22-item h3 { margin: 0.4rem 0 0; font-size: 1.28rem; letter-spacing: -0.02em; line-height: 1.25; }
        .c22-item p { margin: 0.6rem 0 0; color: rgba(218,232,242,0.78); line-height: 1.62; }
        .c22-src { margin-top: 0.65rem !important; font-size: 0.86rem; color: rgba(218,232,242,0.55) !important; }
        .c22-next { margin: 0; padding-left: 1.2rem; color: rgba(218,232,242,0.8); line-height: 1.7; }
        .c22-foot { border-top: 1px solid rgba(148,190,220,0.18); margin-top: 3.6rem; padding: 1.6rem 0 5rem; color: rgba(218,232,242,0.55); font-size: 0.9rem; line-height: 1.6; }
        .c22-foot a { color: #67e8f9; }
      `}</style>

      <div className="c22-wrap">
        <section className="c22-hero">
          <span className="c22-eyebrow">Teambotics Tracker · Canada</span>
          <h1>Bill C-22, in plain language.</h1>
          <p className="c22-dek">
            Bill C-22 — the <em>Lawful Access Act, 2026</em> — would give police and CSIS new ways to
            get information about people from phone, internet and app companies, and could require
            those companies to build systems that make handing information over easier. This page
            tracks where the bill actually stands, in simple terms, with a source for every step.
          </p>

          <div className="c22-status">
            <h2>Where it stands now: {c22Status.headline}</h2>
            <p>{c22Status.body}</p>
            <p className="c22-meta">
              Last checked: {c22Status.lastChecked} · Status source:{" "}
              <a href={c22Status.sourceUrl} target="_blank" rel="noreferrer">
                {c22Status.sourceLabel}
              </a>
            </p>
          </div>

          <div className="c22-grid">
            <div className="c22-card">
              <span>Part 1</span>
              <h3>Getting information</h3>
              <p>
                Police could ask a telecom provider — without a judge — only to confirm whether
                someone is its subscriber. For fuller subscriber information, they would need a
                judge&apos;s production order, granted on the lower test of “reasonable grounds to
                suspect” an offence, instead of the usual “reasonable grounds to believe.”
              </p>
            </div>
            <div className="c22-card">
              <span>Part 2</span>
              <h3>Building the capability</h3>
              <p>
                A new law (the Supporting Authorized Access to Information Act) would let the
                Public Safety minister order electronic service providers to build and maintain
                the technical ability to provide information, and regulations could require core
                providers to keep certain metadata for up to six months. This is the part the
                encryption debate is about.
              </p>
            </div>
          </div>
        </section>

        <h2 className="c22-h2">Timeline — newest first</h2>
        <p className="c22-sub">Every entry links to the source it is based on. Check the source; don&apos;t take our word for it.</p>
        <ol className="c22-timeline">
          {c22Entries.map((entry) => (
            <li className="c22-item" key={entry.date + entry.title}>
              <div className="c22-date">{entry.dateLabel}</div>
              <h3>{entry.title}</h3>
              <p>{entry.body}</p>
              <p className="c22-src">
                Source:{" "}
                <a href={entry.sourceUrl} target="_blank" rel="noreferrer">
                  {entry.sourceLabel}
                </a>
              </p>
            </li>
          ))}
        </ol>

        <h2 className="c22-h2">What happens next</h2>
        <ol className="c22-next">
          {c22NextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>

        <div className="c22-foot">
          <p>
            This is an explainer, not legal advice. Bill numbers are reused between Parliaments —
            this page is only about Bill C-22 of the 45th Parliament (the Lawful Access Act, 2026),
            not the earlier Bill C-22 that created the Canada Disability Benefit. The official
            record for this bill is{" "}
            <a href="https://www.parl.ca/legisinfo/en/bill/45-1/c-22" target="_blank" rel="noreferrer">
              LEGISinfo
            </a>
            . This page is checked daily and updated when the bill actually moves.
          </p>
        </div>
      </div>
    </main>
  );
}
