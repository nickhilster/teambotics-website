import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/config";

const githubUrl = "https://github.com/nickhilster/MDownManager";
const downloadUrl =
  "https://github.com/nickhilster/MDownManager/releases/download/v0.1.0/MdownManager_0.1.0_x64_en-US.msi";

export const metadata: Metadata = {
  title: "MDownManager — Markdown knowledge base, upgraded",
  description:
    "MDownManager indexes your .md vaults, adds AI summaries and semantic search, scans for security risks, and exposes a local HTTP API without sending files to the cloud.",
  openGraph: {
    title: "MDownManager — Markdown knowledge base, upgraded",
    description:
      "MDownManager indexes your .md vaults, adds AI summaries and semantic search, scans for security risks, and exposes a local HTTP API without sending files to the cloud.",
    url: `${siteConfig.url}/MdownManager`,
  },
};

const proofPoints = [
  {
    title: "Local indexing",
    body: "Scan markdown vaults without uploading. All processing stays on your machine.",
  },
  {
    title: "AI-powered summaries",
    body: "Automatic abstract generation and key-point extraction from markdown files.",
  },
  {
    title: "Semantic search",
    body: "Find content by meaning, not just keywords. Understand relationships across your vault.",
  },
  {
    title: "Security scanning",
    body: "Detect exposed secrets, credentials, and sensitive patterns in your documentation.",
  },
  {
    title: "HTTP API",
    body: "Query your indexed knowledge base programmatically. Build on top of it.",
  },
  {
    title: "Privacy-first",
    body: "Your data never leaves your machine. No cloud dependency, no telemetry.",
  },
] as const;

const features = [
  {
    stage: "1",
    name: "Vault Discovery",
    desc: "Point MdownManager at any folder. It recursively scans and indexes all .md files, building a searchable knowledge map.",
    tech: ["Recursive scan", "Metadata extraction", "Index building"],
  },
  {
    stage: "2",
    name: "AI Summarization",
    desc: "Each document is automatically summarized with key points, context, and linked references extracted.",
    tech: ["LLM processing", "Abstract generation", "Relationship mapping"],
  },
  {
    stage: "3",
    name: "Semantic Search",
    desc: "Search by meaning, not keywords. Find related documents even if they use different terminology.",
    tech: ["Vector embeddings", "Similarity scoring", "Relevance ranking"],
  },
  {
    stage: "4",
    name: "Security Audit",
    desc: "Scan for exposed credentials, API keys, secrets, and PII that shouldn't be in docs.",
    tech: ["Pattern detection", "Risk scoring", "Audit reports"],
  },
  {
    stage: "5",
    name: "HTTP API",
    desc: "Expose your indexed knowledge via a local HTTP server. Query, retrieve, and build integrations.",
    tech: ["REST API", "JSON responses", "Custom endpoints"],
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

export default function MdownManagerPage() {
  return (
    <>
      <section className="pt-[calc(var(--site-header-height)+4rem)] pb-14 sm:pb-20">
        <Container>
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-surface)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)] shadow-[0_18px_70px_var(--color-card-glow)]">
              <span aria-hidden="true">📚</span>
              AI-powered · Local-first · Semantic search
            </div>
            <h1 className="text-5xl font-semibold tracking-[-0.07em] text-[var(--color-text-primary)] sm:text-6xl lg:text-7xl">
              MDownManager
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)] sm:text-xl">
              Transform your markdown vault into an intelligent, searchable knowledge base. Index, summarize, search semantically, and expose via API — all locally.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="btn-primary button"
                href={downloadUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>Download v0.1.0</span>
                <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.5} />
              </a>
              <a
                className="btn-secondary button"
                href={githubUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>View on GitHub</span>
                <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="section section--border">
        <Container>
          <SectionIntro eyebrow="Why we built it" title="Markdown vaults need intelligence">
            <p>
              Most teams have scattered markdown documentation: README files, decision logs, wiki pages, knowledge bases. They are useful, but they lack structure, searchability, and intelligence.
            </p>
          </SectionIntro>

          <div className="mt-8 rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 text-base leading-8 text-[var(--color-text-secondary)] sm:p-8">
            <p>
              MdownManager turns your vault into a living knowledge system. It indexes everything, creates semantic understanding, scans for security risks, and exposes a queryable API — without sending any of your data to the cloud.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
          <SectionIntro eyebrow="How it works" title="Five-stage knowledge pipeline">
            <p>
              Every markdown file passes through discovery, summarization, indexing, security scanning, and API exposure. Your vault becomes queryable, intelligent, and safe.
            </p>
          </SectionIntro>

          <div className="mt-10 max-w-4xl">
            {features.map((step, index) => (
              <div className="grid grid-cols-[2.5rem_1fr] gap-5" key={step.stage}>
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] text-sm font-semibold text-[var(--color-accent)]">
                    {step.stage}
                  </div>
                  {index < features.length - 1 ? (
                    <div className="my-2 w-px flex-1 bg-[var(--color-border)]" />
                  ) : null}
                </div>
                <article className="pb-8">
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{step.name}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base">
                    {step.desc}
                  </p>
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
          <SectionIntro eyebrow="Get started" title="Download and index">
            <p>
              MdownManager is a Windows desktop application. Download the installer, point it at your markdown folder, and let it build your knowledge base.
            </p>
          </SectionIntro>

          <div className="mt-10 flex flex-col justify-between gap-5 rounded-[var(--radius-2xl)] border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Open source on GitHub</h3>
              <p className="mt-1 text-sm text-[var(--color-text-tertiary)]">
                MIT licensed · Windows 10+ · Python backend · Electron UI
              </p>
            </div>
            <a
              className="btn-secondary button"
              href={githubUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>nickhilster/MDownManager</span>
              <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.5} />
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
