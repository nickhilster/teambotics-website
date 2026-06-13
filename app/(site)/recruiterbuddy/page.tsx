import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "RecruiterBuddy",
  description:
    "RecruiterBuddy is a Teambotics candidate research and briefing product that helps recruiters prepare faster before the first conversation.",
  openGraph: {
    title: `RecruiterBuddy | ${siteConfig.name}`,
    description:
      "A recruiter-side candidate intelligence brief for profile research, claim verification, dossier review, and role-fit analysis.",
    url: `${siteConfig.url}/recruiterbuddy`,
  },
};

const workflowSteps = [
  {
    title: "Add candidate context",
    body: "Start with a LinkedIn URL, LinkedIn PDF export, or manual candidate details. Add a job description when role-fit analysis is needed.",
  },
  {
    title: "Run structured research",
    body: "The product moves through profile parsing, surface scan, claim verification, digital-depth review, consistency checks, absence analysis, and synthesis.",
  },
  {
    title: "Review the briefing",
    body: "Recruiters get a two-minute briefing note with candidate summary, standout signal, probe areas, and suggested first-call questions.",
  },
  {
    title: "Align the hiring conversation",
    body: "The dossier and fit analysis give teams a shared reference point before screens, hiring-manager calls, shortlist reviews, or final-round discussions.",
  },
];

const outputTabs = [
  "Briefing Note — fast candidate summary and first-call prompts",
  "Dossier — timeline, skills inventory, online presence, claim verification, and flags",
  "Fit Analysis — role fit, candidate reality, AI-world fit, gaps, dealbreaker risk, and bottom line",
];

const trustPoints = [
  "Designed for recruiter preparation, not automated hiring decisions",
  "Surfaces verified, plausible, unverifiable, and contradictory signals separately",
  "Makes uncertainty explicit so recruiters know what to ask rather than assuming fit",
  "Supports faster team alignment before interviews without replacing human judgment",
];

const useCases = [
  "Recruiters preparing before an initial candidate screen",
  "Agency teams moving across multiple roles and candidate profiles",
  "Hiring managers who need a concise candidate brief before a call",
  "Interview teams comparing candidates with more consistent notes and signals",
];

export default function RecruiterBuddyPage() {
  return (
    <>
      <section className="section section--border overflow-hidden">
        <Container>
          <div className="grid gap-12 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-16">
            <SectionReveal className="grid gap-6" delay={0.04}>
              <p className="section-eyebrow">Candidate research / Recruiter briefing</p>
              <h1 className="m-0 max-w-[12ch] text-[clamp(3rem,8vw,6.8rem)] font-semibold leading-[0.88] tracking-[-0.075em] text-[var(--color-text-primary)]">
                RecruiterBuddy
              </h1>
              <p className="m-0 max-w-2xl text-[clamp(1.1rem,2vw,1.35rem)] leading-8 text-[var(--color-text-secondary)]">
                Know your candidate before the first call. RecruiterBuddy turns scattered candidate signals into a structured briefing so recruiters can move faster, ask sharper questions, and align teams with less manual research.
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
                Screening is slower when the signal is scattered.
              </h2>
              <p className="m-0 mb-6 text-base leading-7 text-[var(--color-text-secondary)]">
                Recruiters often have to jump between LinkedIn, resumes, portfolios, GitHub, articles, search results, and internal notes before a first conversation. RecruiterBuddy organizes that research into a clearer briefing layer for early-stage candidate review.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Candidate briefing",
                  "Claim verification",
                  "Digital footprint",
                  "Role-fit analysis",
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
              <h2 className="section-title">From profile input to recruiter-ready brief.</h2>
              <p className="section-copy">
                The product is built around speed with organization: enter candidate context, let the system structure the research, then review the briefing before the conversation.
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
              <p className="section-eyebrow">Product outputs</p>
              <h2 className="m-0 mb-5 text-[clamp(1.8rem,4vw,3rem)] leading-[1.04] tracking-[-0.05em] text-[var(--color-text-primary)]">
                Three views for faster hiring preparation.
              </h2>
              <ul className="m-0 grid list-none gap-4 p-0">
                {outputTabs.map((item) => (
                  <li className="flex gap-3 text-sm leading-6 text-[var(--color-text-secondary)]" key={item}>
                    <CheckCircle2 aria-hidden="true" className="mt-1 shrink-0 text-[var(--color-accent)]" size={18} strokeWidth={1.7} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SectionReveal>

            <SectionReveal className="rounded-[var(--radius-2xl)] border border-[var(--color-border-strong)] bg-[var(--color-bg-surface)] p-6 lg:p-8" delay={0.12}>
              <p className="section-eyebrow">Use cases</p>
              <h2 className="m-0 mb-5 text-[clamp(1.8rem,4vw,3rem)] leading-[1.04] tracking-[-0.05em] text-[var(--color-text-primary)]">
                Built for busy hiring workflows.
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
          </div>
        </Container>
      </section>

      <section className="section section--border">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <SectionReveal className="grid gap-4" delay={0.04}>
              <p className="section-eyebrow">Trust posture</p>
              <h2 className="section-title">Sharper preparation, not automated judgment.</h2>
              <p className="section-copy">
                RecruiterBuddy is positioned as a preparation and alignment tool. It helps recruiters understand what is known, what is plausible, and what needs a direct question before the team makes a hiring judgment.
              </p>
            </SectionReveal>

            <SectionReveal className="rounded-[var(--radius-2xl)] border border-[var(--color-border-strong)] bg-[var(--color-bg-surface)] p-6 lg:p-8" delay={0.12}>
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
            <h2 className="section-title">A focused applied-AI product for decision support under time pressure.</h2>
            <p className="section-copy mx-auto">
              RecruiterBuddy fits the Teambotics product line because it applies our core operating model to talent work: organize messy public context, make signals easier to inspect, and keep the human responsible for the final call.
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
