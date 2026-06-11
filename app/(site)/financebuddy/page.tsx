import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/config";

const githubUrl = "https://github.com/nickhilster/local-financial-redactor";

export const metadata: Metadata = {
  title: "Local Financial Redactor — Teambotics",
  description:
    "Redact PII from financial documents locally before passing sanitized data to AI. Privacy-first. No cloud calls.",
  openGraph: {
    title: "Local Financial Redactor — Teambotics",
    description:
      "Redact PII from financial documents locally before passing sanitized data to AI. Privacy-first. No cloud calls.",
    url: `${siteConfig.url}/financebuddy`,
  },
};

const proofPoints = [
  {
    title: "Zero data egress",
    body: "All processing runs on the user’s machine. Nothing is sent anywhere.",
  },
  {
    title: "Multi-format support",
    body: "PDF, DOCX, XLSX, CSV, and TXT files are handled through one pipeline.",
  },
  {
    title: "Built for small teams",
    body: "Packaged as a Windows installer so firms can share one .exe internally.",
  },
  {
    title: "Clean AI-ready exports",
    body: "Redacted JSON, CSV, and Markdown outputs are safe to paste into AI tools.",
  },
] as const;

const pipeline = [
  {
    stage: "1",
    name: "Extraction",
    desc: "Text is pulled from the file using format-specific parsers. PDFs use PyMuPDF, spreadsheets use openpyxl, and Word docs use python-docx.",
    tech: ["PyMuPDF", "openpyxl", "python-docx"],
  },
  {
    stage: "2",
    name: "Regex redaction",
    desc: "Deterministic patterns catch high-confidence PII: SSNs/SINs, credit cards, phone numbers, and email addresses.",
    tech: ["SSN / SIN", "Credit cards", "Phone numbers", "Emails"],
  },
  {
    stage: "3",
    name: "NLP entity recognition",
    desc: "spaCy and Microsoft Presidio identify names, organizations, and locations that regex cannot reliably catch on context alone.",
    tech: ["spaCy", "Presidio", "PERSON · ORG · GPE"],
  },
  {
    stage: "4",
    name: "LLM pass (optional)",
    desc: "If Ollama is running locally, an open-source model reviews the redacted text for contextual misses without leaving the machine.",
    tech: ["Ollama", "Llama 3.1", "Qwen", "Mistral"],
  },
  {
    stage: "5",
    name: "Validation and export gate",
    desc: "The sanitized document is scored LOW / MEDIUM / HIGH for residual PII risk. HIGH blocks export; MEDIUM requires explicit approval.",
    tech: ["Risk scoring", "Export gate", "Audit ledger"],
  },
] as const;

const architecture = [
  {
    title: "Electron shell",
    body: "Chromium window with no browser chrome. Spawns and kills the Python backend automatically.",
  },
  {
    title: "PyInstaller bundle",
    body: "Python 3.11, spaCy, Presidio, and Streamlit are bundled. No Python install required.",
  },
  {
    title: "NSIS installer",
    body: "A standard Windows setup wizard. One .exe can be shared with the team.",
  },
] as const;

function SectionIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="max-w-3xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text-primary)] sm:text-4xl">
        {title}
      </h2>
      {children ? (
        <div className="mt-5 text-base leading-8 text-[var(--color-text-secondary)] sm:text-lg">
          {children}
        </div>
      ) : null}
    </div>
  );
}

export default function FinanceBuddyPage() {
  return (
    <>
      <section className="pt-[calc(var(--site-header-height)+4rem)] pb-14 sm:pb-20">
        <Container>
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-surface)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)] shadow-[0_18px_70px_var(--color-card-glow)]">
              <span aria-hidden="true">🔒</span>
              Privacy-first · Local only · No cloud calls
            </div>
            <h1 className="text-5xl font-semibold tracking-[-0.07em] text-[var(--color-text-primary)] sm:text-6xl lg:text-7xl">
              Local Financial Redactor
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)] sm:text-xl">
              A desktop tool for redacting PII from financial documents — built for teams that handle sensitive data but cannot afford to send it to the cloud.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="button button--primary"
                href={githubUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>View on GitHub</span>
                <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.5} />
              </a>
              <Link className="button button--ghost" href="/#contact">
                Discuss a privacy-first workflow
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="section section--border">
        <Container>
          <SectionIntro eyebrow="Why we built it" title="The problem with cloud AI and financial data">
            <p>
              Financial documents are full of PII: names, SINs or SSNs, account numbers, credit card details, and dates of birth. Modern AI tools can help analyze that data, but most require uploading documents to third-party servers.
            </p>
          </SectionIntro>

          <div className="mt-8 rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 text-base leading-8 text-[var(--color-text-secondary)] sm:p-8">
            <p>
              If you are a small accounting firm, freelance CFO, or finance team, you may handle client documents that legally and ethically cannot leave your control. The thesis is simple: strip the PII first, locally, then hand only the sanitized data to an LLM.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {proofPoints.map((point) => (
              <article
                className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5 shadow-[0_18px_60px_var(--color-card-glow)]"
                key={point.title}
              >
                <h3 className="text-base font-semibold text-[var(--color-text-primary)]">{point.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">{point.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--border">
        <Container>
          <SectionIntro eyebrow="How it works" title="A five-stage redaction pipeline">
            <p>
              Every document passes through layered controls. Regex catches deterministic patterns, NLP catches contextual entities, and an optional local LLM pass reviews anything subtle before export.
            </p>
          </SectionIntro>

          <div className="mt-10 max-w-4xl">
            {pipeline.map((step, index) => (
              <div className="grid grid-cols-[2.5rem_1fr] gap-5" key={step.stage}>
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] text-sm font-semibold text-[var(--color-accent)]">
                    {step.stage}
                  </div>
                  {index < pipeline.length - 1 ? (
                    <div className="my-2 w-px flex-1 bg-[var(--color-border)]" />
                  ) : null}
                </div>
                <article className="pb-8">
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{step.name}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base">{step.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {step.tech.map((item) => (
                      <span
                        className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-3 py-1 text-xs font-medium text-[var(--color-text-secondary)]"
                        key={item}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--border">
        <Container>
          <SectionIntro eyebrow="Under the hood" title="Architecture: Electron + PyInstaller">
            <p>
              The Python backend is bundled by PyInstaller into a self-contained executable. Electron wraps it in a native window, spawns the backend as a hidden subprocess, waits until it is ready, then displays the interface in a chromeless browser window.
            </p>
          </SectionIntro>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {architecture.map((item) => (
              <article
                className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6"
                key={item.title}
              >
                <h3 className="text-base font-semibold text-[var(--color-text-primary)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col justify-between gap-5 rounded-[var(--radius-2xl)] border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Open source on GitHub</h3>
              <p className="mt-1 text-sm text-[var(--color-text-tertiary)]">
                MIT licensed · Windows · Python 3.11 · Electron 31
              </p>
            </div>
            <a
              className="button button--ghost"
              href={githubUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>nickhilster/local-financial-redactor</span>
              <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.5} />
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
