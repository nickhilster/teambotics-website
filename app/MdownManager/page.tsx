import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "MDownManager",
  description:
    "MDownManager is a Teambotics document operations product for teams that need cleaner markdown workflows, searchable knowledge, and AI-ready structure without the usual manual overhead.",
  openGraph: {
    title: `MDownManager | ${siteConfig.name}`,
    description:
      "A Teambotics document operations product for markdown-heavy teams that need cleaner structure, retrieval, and workflow support.",
    url: `${siteConfig.url}/MdownManager`,
  },
};

const proofPoints = [
  {
    title: "Commercial product direction",
    body: "Positioned as part of the Teambotics product portfolio, not as a standalone open-source utility download page.",
  },
  {
    title: "Markdown workflow focus",
    body: "Designed for teams that run on notes, documentation, internal playbooks, research logs, and markdown-based operating context.",
  },
  {
    title: "AI-ready knowledge layer",
    body: "Turns scattered markdown into cleaner structure that can support retrieval, summarization, and downstream workflow automation.",
  },
  {
    title: "Operational use cases",
    body: "Useful when documentation needs to be searched, normalized, inspected, and made more usable across teams and systems.",
  },
] as const;

const features = [
  {
    stage: "1",
    name: "Ingest markdown at the workflow layer",
    desc: "MDownManager starts with the markdown your team already produces: notes, handoff docs, process pages, research files, and internal reference material.",
    tech: [
      "Markdown collections",
      "Workspace ingest",
      "Document normalization",
    ],
  },
  {
    stage: "2",
    name: "Structure the messy middle",
    desc: "Instead of treating docs as disconnected files, the product organizes them into a more usable operating layer so teams can understand what exists and where important context lives.",
    tech: ["Metadata capture", "Relationship mapping", "Content organization"],
  },
  {
    stage: "3",
    name: "Improve retrieval and reuse",
    desc: "Once the knowledge layer is structured, teams can retrieve information faster, reduce duplicated searching, and reuse institutional knowledge with less manual effort.",
    tech: ["Search workflows", "Context retrieval", "Knowledge reuse"],
  },
  {
    stage: "4",
    name: "Support AI and automation downstream",
    desc: "The product direction aligns with the broader Teambotics thesis: better AI systems start with better inputs, better context, and clearer operational structure.",
    tech: ["AI-ready context", "Workflow support", "Operational enablement"],
  },
] as const;

function SectionIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
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
              Document operations · Markdown workflows · Product in evolution
            </div>
            <h1 className="text-5xl font-semibold tracking-[-0.07em] text-[var(--color-text-primary)] sm:text-6xl lg:text-7xl">
              MDownManager
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)] sm:text-xl">
              MDownManager is evolving into a Teambotics product for teams that
              rely on markdown as working infrastructure. The focus is no longer
              a simple desktop download page — it is a clearer commercial
              direction around document operations, knowledge usability, and
              AI-ready context.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="button button--primary"
                href="mailto:hello@teambotics.app?subject=MDownManager%20product%20inquiry"
              >
                <span>Discuss MDownManager</span>
                <ArrowRight aria-hidden="true" size={16} strokeWidth={1.6} />
              </a>
              <Link className="button button--ghost" href="/about">
                See Teambotics product direction
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="section section--border">
        <Container>
          <SectionIntro
            eyebrow="Why it matters"
            title="Markdown is often where the real operating context lives"
          >
            <p>
              Teams often run on markdown long before they run on formal
              systems: README files, SOPs, meeting notes, research logs,
              decision records, internal guides, and product context. That
              material is valuable, but it is usually fragmented,
              under-structured, and hard to operationalize.
            </p>
          </SectionIntro>

          <div className="mt-8 rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 text-base leading-8 text-[var(--color-text-secondary)] sm:p-8">
            <p>
              The current direction for MDownManager is to make markdown-heavy
              work more usable at a business level: easier to organize, easier
              to retrieve from, and easier to plug into AI-assisted workflows.
              That fits the broader Teambotics commercial model of shipping
              focused applied-AI products rather than presenting unfinished
              tooling as the end state.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {proofPoints.map((point) => (
              <article
                className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5 shadow-[0_18px_60px_var(--color-card-glow)]"
                key={point.title}
              >
                <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                  {point.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--border">
        <Container>
          <SectionIntro
            eyebrow="Product direction"
            title="From raw markdown to a more usable operating layer"
          >
            <p>
              The value is not just file indexing. It is the ability to take
              documentation that already exists inside a team and make it more
              usable for search, coordination, context transfer, and future
              automation.
            </p>
          </SectionIntro>

          <div className="mt-10 max-w-4xl">
            {features.map((step, index) => (
              <div
                className="grid grid-cols-[2.5rem_1fr] gap-5"
                key={step.stage}
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] text-sm font-semibold text-[var(--color-accent)]">
                    {step.stage}
                  </div>
                  {index < features.length - 1 ? (
                    <div className="my-2 w-px flex-1 bg-[var(--color-border)]" />
                  ) : null}
                </div>
                <article className="pb-8">
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    {step.name}
                  </h3>
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
          <SectionIntro
            eyebrow="Availability"
            title="Commercial conversations, not a public installer-first flow"
          >
            <p>
              This page now reflects the current product state more accurately:
              MDownManager is being positioned through Teambotics as a product
              direction and engagement conversation, rather than a broad public
              self-serve installer flow.
            </p>
          </SectionIntro>

          <div className="mt-10 flex flex-col justify-between gap-5 rounded-[var(--radius-2xl)] border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                Interested in the product direction?
              </h3>
              <p className="mt-1 text-sm text-[var(--color-text-tertiary)]">
                Teambotics is positioning MDownManager as part of its applied AI
                product portfolio for document-heavy workflows.
              </p>
            </div>
            <a
              className="button button--primary"
              href="mailto:hello@teambotics.app?subject=MDownManager%20commercial%20discussion"
            >
              <span>Contact Teambotics</span>
              <ArrowRight aria-hidden="true" size={16} strokeWidth={1.6} />
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
