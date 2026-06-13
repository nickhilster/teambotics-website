import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "RecruiterBuddy",
  description:
    "RecruiterBuddy is a Teambotics product in development for turning job applications, recruiter conversations, and interview prep into a structured AI-assisted workflow.",
  openGraph: {
    title: `RecruiterBuddy | ${siteConfig.name}`,
    description:
      "A candidate-side job application operating layer for sharper role analysis, tailored application packages, and recruiter-ready preparation.",
    url: `${siteConfig.url}/recruiterbuddy`,
  },
};

const workflowSteps = [
  {
    title: "Read the role properly",
    body: "Turn a job description into a clear map of responsibilities, signals, gaps, language, and likely hiring priorities.",
  },
  {
    title: "Match proof to requirements",
    body: "Connect portfolio work, shipped products, past roles, metrics, and stories to the role instead of guessing what matters.",
  },
  {
    title: "Build the application package",
    body: "Generate focused resume positioning, cover-letter direction, outreach notes, and interview preparation from one structured source of truth.",
  },
  {
    title: "Prepare the human conversation",
    body: "Support recruiter screens, hiring-manager calls, and follow-ups with clear talking points while keeping final judgment with the applicant.",
  },
];

const trustPoints = [
  "Human approval before anything is sent",
  "No auto-apply behaviour or hidden outbound actions",
  "Assumptions are surfaced instead of buried in confident copy",
  "Reusable context for role-specific positioning and interview prep",
];

const useCases = [
  "Senior candidates translating non-linear experience into role-fit evidence",
  "Career operators managing multiple active applications without losing context",
  "Founders and builders turning shipped products into credible hiring stories",
  "Recruiter-facing preparation where clarity, relevance, and restraint matter",
];

export default function RecruiterBuddyPage() {
  return (
    <>
      <section className="section section--border overflow-hidden">
        <Container>
          <div className="grid gap-12 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-16">
            <SectionReveal className="grid gap-6" delay={0.04}>
              <p className="section-eyebrow">Private build / Applied AI workflow</p>
              <h1 className="m-0 max-w-[12ch] text-[clamp(3rem,8vw,6.8rem)] font-semibold leading-[0.88] tracking-[-0.075em] text-[var(--color-text-primary)]">
                RecruiterBuddy
              </h1>
              <p className="m-0 max-w-2xl text-[clamp(1.1rem,2vw,1.35rem)] leading-8 text-[var(--color-text-secondary)]">
                A job application operating layer for people who need sharper role analysis, better evidence matching, and recruiter-ready preparation without turning hiring into blind automation.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row" aria-label="RecruiterBuddy actions">
                <a
                  className="button button--primary min-w-44"
                  href="mailto:hello@teambotics.app?subject=RecruiterBuddy%20demo"
                >
                  Request demo <ArrowRight aria-hidden="true" size={16} strokeWidth={1.6} />
                </a>
                <Link className="button button--ghost min-w-44" href="/">
                  Back to Teambotics
                </Link>
              </div>
            </SectionReveal>

            <SectionReveal
              className="rounded-[var(--radius-2xl)] border border-[var(--color-border-strong)] bg-[var(--color-bg-surface)] p-6 shadow-[0_2rem_5rem_rgba(0,0,0,0.14)] lg:p-8"
              delay={0.12}
            >
              <p className="section-eyebrow">Product thesis</p>
              <h2 className="m-0 mb-4 text-[clamp(1.8rem,4vw,3.25rem)] leading-[1] tracking-[-0.05em] text-[var(--color-text-primary)]">
                Most applications fail before the interview.
              </h2>
              <p className="m-0 mb-6 text-base leading-7 text-[var(--color-text-secondary)]">
                Not because the candidate has no value, but because the fit story is scattered across resumes, portfolios, product links, old projects, and half-remembered career moments. RecruiterBuddy is designed to organize that material into a cleaner decision-support workflow.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Role intelligence",
                  "Resume positioning",
                  "Cover-letter strategy",
                  "Interview prep",
                ].map((label) => (
                  <div
                    className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-page)] px-4 py-3 text-sm font-semibold text-[var(--color-text-primary)]"
                    key={label}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </Container>
      </section>

      <section className="section section--border">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <SectionReveal className="grid gap-4" delay={0.04}>
              <p className="section-eyebrow">Workflow</p>
              <h2 className="section-title">From job post to application package.</h2>
              <p className="section-copy">
                RecruiterBuddy is being shaped around a practical loop: understand the role, map evidence, generate materials, then prepare the human conversation.
              </p>
            </SectionReveal>

            <div className="grid gap-4 md:grid-cols-2">
              {workflowSteps.map((step, index) => (
                <SectionReveal delay={index * 0.07} key={step.title}>
                  <article className="card h-full p-5">
                    <p className="section-eyebrow">0{index + 1}</p>
                    <h3 className="m-0 mb-3 text-xl tracking-[-0.03em] text-[var(--color-text-primary)]">
                      {step.title}
                    </h3>
                    <p className="m-0 text-sm leading-6 text-[var(--color-text-secondary)]">{step.body}</p>
                  </article>
                </SectionReveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="section section--border">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <SectionReveal className="rounded-[var(--radius-2xl)] border border-[var(--color-border-strong)] bg-[var(--color-bg-surface)] p-6 lg:p-8" delay={0.04}>
              <p className="section-eyebrow">Use cases</p>
              <h2 className="m-0 mb-5 text-[clamp(1.8rem,4vw,3rem)] leading-[1.04] tracking-[-0.05em] text-[var(--color-text-primary)]">
                Built for candidates with real complexity.
              </h2>
              <ul className="m-0 grid list-none gap-4 p-0">
                {useCases.map((item) => (
                  <li className="flex gap-3 text-sm leading-6 text-[var(--color-text-secondary)]" key={item}>
                    <CheckCircle2 aria-hidden="true" className="mt-1 shrink-0 text-[var(--color-accent)]" size={18} strokeWidth={1.7} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SectionReveal>

            <SectionReveal className="rounded-[var(--radius-2xl)] border border-[var(--color-border-strong)] bg-[var(--color-bg-surface)] p-6 lg:p-8" delay={0.12}>
              <p className="section-eyebrow">Trust posture</p>
              <h2 className="m-0 mb-5 text-[clamp(1.8rem,4vw,3rem)] leading-[1.04] tracking-[-0.05em] text-[var(--color-text-primary)]">
                AI should sharpen the applicant, not replace their judgment.
              </h2>
              <ul className="m-0 grid list-none gap-4 p-0">
                {trustPoints.map((item) => (
                  <li className="flex gap-3 text-sm leading-6 text-[var(--color-text-secondary)]" key={item}>
                    <CheckCircle2 aria-hidden="true" className="mt-1 shrink-0 text-[var(--color-accent)]" size={18} strokeWidth={1.7} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SectionReveal>
          </div>
        </Container>
      </section>

      <section className="section section--border">
        <Container>
          <SectionReveal className="mx-auto grid max-w-4xl gap-6 text-center" delay={0.04}>
            <p className="section-eyebrow">Why Teambotics</p>
            <h2 className="section-title">A focused example of applied AI, not generic chatbot theatre.</h2>
            <p className="section-copy mx-auto">
              RecruiterBuddy fits the Teambotics product line because it applies the same operating principle across a different workflow: structure messy human context, keep the user in control, and turn AI into a practical execution partner.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <a
                className="button button--primary min-w-44"
                href="mailto:hello@teambotics.app?subject=RecruiterBuddy%20demo"
              >
                Discuss RecruiterBuddy <ArrowRight aria-hidden="true" size={16} strokeWidth={1.6} />
              </a>
              <Link className="button button--ghost min-w-44" href="/#contact">
                Contact Teambotics
              </Link>
            </div>
          </SectionReveal>
        </Container>
      </section>
    </>
  );
}
