import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "MDownManager",
  description:
    "MDownManager helps teams turn markdown-heavy documentation into a cleaner, searchable, AI-ready knowledge layer for faster work and better retrieval.",
  openGraph: {
    title: `MDownManager | ${siteConfig.name}`,
    description:
      "A Teambotics product for teams that want markdown documentation to be easier to search, organize, and use across AI-assisted workflows.",
    url: `${siteConfig.url}/MdownManager`,
  },
};

const proofPoints = [
  {
    title: "Built for markdown-heavy teams",
    body: "Ideal for teams that work across notes, SOPs, research files, internal docs, and process knowledge stored in markdown.",
  },
  {
    title: "Faster retrieval",
    body: "Make important context easier to find so teams spend less time digging through folders and disconnected files.",
  },
  {
    title: "AI-ready structure",
    body: "Prepare documentation for better summarization, retrieval, and downstream AI-assisted workflows.",
  },
  {
    title: "More usable team knowledge",
    body: "Turn scattered documentation into a clearer operating layer that is easier to search, reuse, and maintain.",
  },
] as const;

const features = [
  {
    stage: "1",
    name: "Bring your markdown together",
    desc: "Start with the documentation your team already has: process docs, research notes, handoff files, reference material, and working knowledge captured in markdown.",
    tech: [
      "Markdown collections",
      "Workspace ingest",
      "Document normalization",
    ],
  },
  {
    stage: "2",
    name: "Create clearer structure",
    desc: "MDownManager helps organize disconnected files into a more understandable knowledge layer so teams can see what exists, what matters, and where context lives.",
    tech: ["Metadata capture", "Relationship mapping", "Content organization"],
  },
  {
    stage: "3",
    name: "Improve search and reuse",
    desc: "With better structure, teams can retrieve information faster, reduce repeated searching, and reuse internal knowledge more confidently across projects and workflows.",
    tech: ["Search workflows", "Context retrieval", "Knowledge reuse"],
  },
  {
    stage: "4",
    name: "Support AI-assisted work",
    desc: "A cleaner documentation layer creates better inputs for summarization, retrieval, and automation, helping AI systems work from stronger context.",
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
              Document operations · Markdown knowledge · AI-ready workflows
            </div>
            <h1 className="text-5xl font-semibold tracking-[-0.07em] text-[var(--color-text-primary)] sm:text-6xl lg:text-7xl">
              MDownManager
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)] sm:text-xl">
              Turn markdown-heavy documentation into a cleaner, searchable
              knowledge layer your team can actually use. MDownManager helps
              teams organize internal context, improve retrieval, and prepare
              documentation for AI-assisted workflows.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="button button--primary"
                href="mailto:hello@teambotics.app?subject=MDownManager%20product%20inquiry"
              >
                <span>Request a demo</span>
                <ArrowRight aria-hidden="true" size={16} strokeWidth={1.6} />
              </a>
              <Link className="button button--ghost" href="/about">
                About Teambotics
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="section section--border">
        <Container>
          <SectionIntro
            eyebrow="Why teams need it"
            title="Your best documentation is only valuable if people can use it"
          >
            <p>
              Many teams already have valuable operating knowledge in markdown:
              SOPs, research notes, internal guides, handoff docs, decision
              records, and working documentation. The challenge is not creating
              more content — it is making the content you already have easier to
              find, understand, and reuse.
            </p>
          </SectionIntro>

          <div className="mt-8 rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 text-base leading-8 text-[var(--color-text-secondary)] sm:p-8">
            <p>
              MDownManager is designed for teams that rely on markdown as part
              of how they operate. It helps transform scattered documentation
              into a more usable knowledge layer — one that supports faster
              search, clearer handoffs, and better inputs for AI-assisted work.
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
            eyebrow="How it works"
            title="From scattered files to usable team knowledge"
          >
            <p>
              MDownManager is built to help teams get more value from the
              documentation they already maintain. The result is a knowledge
              layer that is easier to navigate today and better suited for
              future AI and automation use cases.
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
            eyebrow="Get started"
            title="See whether MDownManager fits your workflow"
          >
            <p>
              If your team runs on markdown-heavy documentation and needs better
              structure, search, and AI-ready context, MDownManager may be a
              strong fit. The best next step is a quick conversation about your
              workflow and documentation environment.
            </p>
          </SectionIntro>

          <div className="mt-10 flex flex-col justify-between gap-5 rounded-[var(--radius-2xl)] border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                Want to see MDownManager in context?
              </h3>
              <p className="mt-1 text-sm text-[var(--color-text-tertiary)]">
                We can walk through the workflow, the product direction, and
                where it may fit inside your team’s documentation stack.
              </p>
            </div>
            <a
              className="button button--primary"
              href="mailto:hello@teambotics.app?subject=MDownManager%20commercial%20discussion"
            >
              <span>Talk to Teambotics</span>
              <ArrowRight aria-hidden="true" size={16} strokeWidth={1.6} />
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
