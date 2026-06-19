import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Download } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "MDownManager",
  description:
    "MDownManager helps teams turn markdown-heavy documentation into a searchable, structured knowledge layer that supports faster work, cleaner handoffs, and better AI-assisted workflows.",
  openGraph: {
    title: `MDownManager | ${siteConfig.name}`,
    description:
      "A Teambotics product for teams that need markdown documentation to be easier to search, organize, reuse, and operationalize.",
    url: `${siteConfig.url}/MdownManager`,
  },
};

const DOWNLOAD_VERSION = "0.3.1";
const DOWNLOAD_BASE = `https://github.com/nickhilster/MDownManager/releases/download/v${DOWNLOAD_VERSION}`;

const pricingTiers = [
  {
    name: "Free",
    price: null,
    priceNote: "No credit card required",
    highlight: false,
    features: [
      "1 vault",
      "Full-text search",
      "Security scanner",
      "Explorer & categories",
      "Local AI (Ollama)",
    ],
    cta: {
      label: "Download for Windows",
      href: `${DOWNLOAD_BASE}/MDownManager_${DOWNLOAD_VERSION}_x64-setup.exe`,
      icon: true,
    },
  },
  {
    name: "Individual",
    price: "$20",
    priceNote: "per year",
    highlight: true,
    features: [
      "Unlimited vaults",
      "Everything in Free",
      "Priority support",
      "All future updates",
    ],
    cta: {
      label: "Buy Individual",
      href: "https://teambotics.lemonsqueezy.com/buy/individual",
      icon: false,
    },
  },
  {
    name: "Commercial",
    price: "$149",
    priceNote: "per year · up to 10 seats",
    highlight: false,
    features: [
      "Unlimited vaults",
      "Everything in Free",
      "10 seat license",
      "Commercial use rights",
      "Priority support",
    ],
    cta: {
      label: "Buy Commercial",
      href: "https://teambotics.lemonsqueezy.com/buy/commercial",
      icon: false,
    },
  },
  {
    name: "Non-profit",
    price: "Free",
    priceNote: "on application",
    highlight: false,
    features: [
      "Unlimited vaults",
      "Everything in Free",
      "Up to 10 seats",
      "Commercial license terms",
    ],
    cta: {
      label: "Apply for access",
      href: "/nonprofit-application",
      icon: false,
    },
  },
] as const;

const heroOutcomes = [
  "Faster search across internal documentation",
  "Cleaner handoffs across teams and projects",
  "Stronger context for AI-assisted workflows",
] as const;

const proofPoints = [
  {
    title: "Designed for documentation-heavy workflows",
    body: "Well suited to teams working across SOPs, research notes, internal guides, handoff docs, and markdown-based operating knowledge.",
  },
  {
    title: "Faster access to critical context",
    body: "Help teams find the right information faster instead of searching through disconnected files and folders.",
  },
  {
    title: "Stronger handoffs and reuse",
    body: "Make internal knowledge easier to carry forward across projects, people, and recurring workflows.",
  },
  {
    title: "Better inputs for AI-assisted work",
    body: "Create a cleaner documentation layer for retrieval, summarization, and downstream automation use cases.",
  },
] as const;

const features = [
  {
    stage: "1",
    name: "Centralize markdown knowledge",
    desc: "Start with the documentation your team already produces: process docs, research notes, handoff files, reference material, and day-to-day operating knowledge stored in markdown.",
    tech: [
      "Markdown collections",
      "Workspace ingest",
      "Document normalization",
    ],
  },
  {
    stage: "2",
    name: "Organize what matters",
    desc: "MDownManager helps turn disconnected files into a more structured knowledge layer so teams can see what exists, where context lives, and what should be easier to access.",
    tech: ["Metadata capture", "Relationship mapping", "Content organization"],
  },
  {
    stage: "3",
    name: "Improve retrieval and continuity",
    desc: "Better structure makes it easier to retrieve information quickly, reduce duplicate effort, and preserve useful context across teams and workflows.",
    tech: ["Search workflows", "Context retrieval", "Knowledge reuse"],
  },
  {
    stage: "4",
    name: "Enable AI-ready operations",
    desc: "A cleaner documentation layer gives AI systems stronger inputs for summarization, retrieval, and automation, helping teams get more reliable value from AI-assisted work.",
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
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-surface)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)] shadow-[0_18px_70px_var(--color-card-glow)]">
                <span aria-hidden="true">📚</span>
                Document operations · Markdown knowledge · AI-ready workflows
              </div>
              <div className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-2 py-2 shadow-[0_18px_60px_var(--color-card-glow)]">
                <span className="px-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-tertiary)]">
                  Theme
                </span>
                <ThemeToggle />
              </div>
            </div>
            <h1 className="text-5xl font-semibold tracking-[-0.07em] text-[var(--color-text-primary)] sm:text-6xl lg:text-7xl">
              MDownManager
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)] sm:text-xl">
              Turn markdown-heavy documentation into a structured knowledge
              layer your team can actually use. MDownManager helps teams make
              internal context easier to search, easier to reuse, and better
              suited for AI-assisted workflows.
            </p>
            <ul
              className="mt-6 grid max-w-2xl gap-3 text-sm leading-6 text-[var(--color-text-secondary)] sm:grid-cols-3 sm:text-base"
              aria-label="MDownManager outcomes"
            >
              {heroOutcomes.map((item) => (
                <li
                  className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 py-3"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="button button--primary"
                href="mailto:hello@teambotics.app?subject=MDownManager%20product%20inquiry"
              >
                <span>Schedule a demo</span>
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
            eyebrow="Why it matters"
            title="Documentation creates value when teams can actually work from it"
          >
            <p>
              Many teams already have valuable operating knowledge in markdown:
              SOPs, research notes, internal guides, handoff docs, decision
              records, and working documentation. The problem is rarely a lack
              of content. It is that useful knowledge is hard to search, hard to
              reuse, and easy to lose inside disconnected files.
            </p>
          </SectionIntro>

          <div className="mt-8 rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 text-base leading-8 text-[var(--color-text-secondary)] sm:p-8">
            <p>
              MDownManager helps teams turn scattered markdown into a more
              usable knowledge system. The result is faster search, clearer
              handoffs, and a stronger foundation for AI-assisted work built on
              real internal context.
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
            title="From scattered markdown to operationally useful knowledge"
          >
            <p>
              MDownManager helps teams get more value from the documentation
              they already maintain. It creates a knowledge layer that is easier
              to navigate now and better prepared for future AI and automation
              use cases.
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
            eyebrow="Pricing"
            title="Start free. Upgrade when you’re ready."
          >
            <p>
              MDownManager is free for personal use with no time limit.
              Individual and team licenses unlock unlimited vaults and
              commercial use rights.
            </p>
          </SectionIntro>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pricingTiers.map((tier) => (
              <article
                key={tier.name}
                className={[
                  "relative flex flex-col rounded-[var(--radius-xl)] border p-6",
                  tier.highlight
                    ? "border-[var(--color-accent)] bg-[var(--color-bg-elevated)] shadow-[0_0_0_1px_var(--color-accent),0_18px_60px_var(--color-card-glow)]"
                    : "border-[var(--color-border)] bg-[var(--color-bg-surface)]",
                ].join(" ")}
              >
                {tier.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-[var(--color-accent)] bg-[var(--color-bg-base)] px-3 py-0.5 text-xs font-semibold text-[var(--color-accent)]">
                    Most popular
                  </span>
                )}
                <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                  {tier.name}
                </h3>
                <div className="mt-3">
                  {tier.price ? (
                    <span className="text-3xl font-semibold tracking-tight text-[var(--color-text-primary)]">
                      {tier.price}
                    </span>
                  ) : (
                    <span className="text-3xl font-semibold tracking-tight text-[var(--color-text-primary)]">
                      $0
                    </span>
                  )}
                  <span className="ml-1.5 text-xs text-[var(--color-text-tertiary)]">
                    {tier.priceNote}
                  </span>
                </div>

                <ul className="mt-5 flex flex-1 flex-col gap-2">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
                    >
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0 text-[var(--color-accent)]"
                        aria-hidden
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={tier.cta.href}
                  target={
                    tier.cta.href.startsWith("http") ? "_blank" : undefined
                  }
                  rel={
                    tier.cta.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={[
                    "button mt-6 w-full justify-center",
                    tier.highlight ? "button--primary" : "button--ghost",
                  ].join(" ")}
                >
                  {tier.cta.icon && <Download size={14} aria-hidden />}
                  <span>{tier.cta.label}</span>
                  {!tier.cta.icon && <ArrowRight size={14} aria-hidden />}
                </a>
              </article>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-[var(--color-text-tertiary)]">
            Windows 10+ · Local-first · No account required to use the free tier
            ·{" "}
            <a
              href="mailto:hello@teambotics.app"
              className="text-[var(--color-accent)] hover:underline"
            >
              hello@teambotics.app
            </a>
          </p>
        </Container>
      </section>
    </>
  );
}
