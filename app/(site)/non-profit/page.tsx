import type { Metadata } from "next";
import Link from "next/link";
import { FlowText } from "@/components/content/FlowText";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/config";
import styles from "./non-profit.module.css";

export const metadata: Metadata = {
  title: "AI and workflow systems for nonprofits",
  description:
    "Practical, human-led workflow design for nonprofits. Start with the work, use the tools that fit, and keep people in control.",
  alternates: { canonical: `${siteConfig.url}/non-profit` },
  robots: { index: false, follow: false },
};

const workflowExamples = [
  {
    number: "01",
    title: "Program intake and follow-up",
    text: "Make requests easier to capture, route, and track while **keeping eligibility, safeguarding, and service decisions with your team.**",
  },
  {
    number: "02",
    title: "Grant and program reporting",
    text: "Bring approved source material into a clear reporting workflow. AI can help organize or draft; **people verify facts, interpretation, and final submissions.**",
  },
  {
    number: "03",
    title: "Volunteer and staff knowledge",
    text: "Make procedures, onboarding materials, and handoffs easier to find and maintain—without creating another knowledge silo.",
  },
  {
    number: "04",
    title: "Routine administration",
    text: "Identify repetitive coordination and document work that can be simplified, routed, or partially automated **with visible review points.**",
  },
];

const principles = [
  {
    title: "People stay responsible",
    text: "Automation should give staff more room for judgment, care, and relationships—**not quietly remove them from consequential decisions.**",
  },
  {
    title: "Use what you already have",
    text: "We begin with your existing records, procedures, and tools. **We look for the smallest useful connection before proposing new platforms or data collection.**",
  },
  {
    title: "Choose tools after the workflow",
    text: "**The workflow comes first.** We do not assume one model, AI company, or software vendor is right for every task; options depend on your privacy, governance, budget, and operational needs.",
  },
  {
    title: "Make work inspectable",
    text: "People should be able to see what a system used, what it produced, **where uncertainty remains, and when a human needs to review or take over.**",
  },
];

export default function NonProfitPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="nonprofit-title">
        <Container>
          <p className={styles.eyebrow}>Teambotics · nonprofit workflows</p>
          <h1 id="nonprofit-title">Give your team more time for the work only people can do.</h1>
          <p className={styles.lede}>
            We help nonprofits make everyday operations easier to run—with thoughtful workflow
            design, practical automation, and AI where it genuinely helps. Start with your mission
            and <strong className="flowwrite-anchor">your existing tools, not a model or vendor.</strong>
          </p>
          <div className={styles.actions}>
            <a className={styles.primary} href={`mailto:${siteConfig.contactEmail}?subject=Nonprofit%20workflow%20conversation`}>
              Talk through a workflow <span aria-hidden="true">↗</span>
            </a>
            <a className={styles.secondary} href="#approach">How we work <span aria-hidden="true">↓</span></a>
          </div>
          <p className={styles.note}>We start with a focused conversation.</p>
        </Container>
      </section>

      <section className={styles.section} aria-labelledby="work-title">
        <Container>
          <p className={styles.eyebrow}>Where we can help / 01</p>
          <div className={styles.sectionHead}>
            <h2 id="work-title">Start with a real point of friction.</h2>
            <p>Examples of workflows we can help your team improve.</p>
          </div>
          <div className={styles.grid}>
            {workflowExamples.map((item) => (
              <article className={styles.card} key={item.number}>
                <span className={styles.number}>{item.number}</span>
                <h3>{item.title}</h3>
                <p><FlowText text={item.text} /></p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className={`${styles.section} ${styles.tinted}`} aria-labelledby="adoption-title">
        <Container>
          <p className={styles.eyebrow}>Work with the systems you have / 02</p>
          <div className={styles.sectionHead}>
            <h2 id="adoption-title">The next step may be helping people use what they already have.</h2>
            <p>If your organization already works in Salesforce, Microsoft 365, Google Workspace, or another established platform, <strong className="flowwrite-anchor">we start with the tools your team already uses.</strong></p>
          </div>
          <div className={styles.adoptionCopy}>
            <p>
              AI is arriving inside familiar platforms: Salesforce offers{" "}
              <a href="https://www.salesforce.com/nonprofit/artificial-intelligence/" target="_blank" rel="noopener noreferrer">Agentforce for Nonprofits</a>, Microsoft offers{" "}
              <a href="https://www.microsoft.com/en-us/microsoft-365-copilot/business" target="_blank" rel="noopener noreferrer">Microsoft 365 Copilot</a>, and Google offers{" "}
              <a href="https://workspace.google.com/lp/solutions/ai" target="_blank" rel="noopener noreferrer">Gemini in Google Workspace</a>.
            </p>
            <p>A new feature—or a generic AI course—doesn’t automatically change day-to-day work. We help staff learn in context: find a useful task, practice with approved information, understand limitations, and know when to verify or take over. <strong className="flowwrite-anchor">The goal is confident use of the tools already available, not another layer of software by default.</strong></p>
          </div>
          <div className={styles.enablementGrid}>
            <article>
              <span className={styles.number}>A</span>
              <h3>Train around real work</h3>
              <p>Give people practical, role-specific learning tied to their actual tasks—<strong className="flowwrite-anchor">not a generic AI course detached from their responsibilities.</strong></p>
            </article>
            <article>
              <span className={styles.number}>B</span>
              <h3>Practice with boundaries</h3>
              <p>Make clear what information is appropriate, what the AI can help with, and <strong className="flowwrite-anchor">what still needs human judgment.</strong></p>
            </article>
            <article>
              <span className={styles.number}>C</span>
              <h3>Leave usable guidance</h3>
              <p>Document the workflow and review points so the learning can be shared, repeated, and improved by the team.</p>
            </article>
          </div>
          <p className={styles.note}>We review your current tools, licences and policies before recommending changes.</p>
        </Container>
      </section>

      <section className={styles.section} id="approach" aria-labelledby="approach-title">
        <Container>
          <p className={styles.eyebrow}>Our approach / 03</p>
          <div className={styles.sectionHead}>
            <h2 id="approach-title">The workflow is the product. The model is one choice.</h2>
            <p><strong className="flowwrite-anchor">We map the people, information, decisions, and handoffs first.</strong> Then we decide whether to improve the process, connect existing tools, add automation, or use an AI capability.</p>
          </div>
          <ol className={styles.steps}>
            <li><span>01</span><strong>Understand the work</strong><p>Review the current process, pain points, constraints, and tools and AI features already available.</p></li>
            <li><span>02</span><strong>Agree on a small scope</strong><p>Define the intended outcome, data boundaries, human owners, and <strong className="flowwrite-anchor">what must not be automated.</strong></p></li>
            <li><span>03</span><strong>Practice and prototype</strong><p>Help the people doing the work try a contained workflow, <strong className="flowwrite-anchor">with review points and guidance built in.</strong></p></li>
            <li><span>04</span><strong>Verify before expanding</strong><p>Check the result against agreed criteria. <strong className="flowwrite-anchor">Document operation, limits, and support before any wider rollout.</strong></p></li>
          </ol>
          <div className={styles.callout}>
            <strong>Model- and company-agnostic by design</strong>
            <p>We don’t lead with a preferred AI provider. When AI is appropriate, provider and deployment choices are evaluated against the workflow and your requirements.</p>
          </div>
        </Container>
      </section>

      <section className={styles.section} aria-labelledby="principles-title">
        <Container>
          <p className={styles.eyebrow}>The standard / 04</p>
          <div className={styles.sectionHead}>
            <h2 id="principles-title">Useful, accountable, and respectful of people’s time.</h2>
            <p>Our design principles reflect Teambotics’ values: augmentation over replacement, evidence over speculation, and trust built into the workflow.</p>
          </div>
          <div className={styles.principles}>
            {principles.map((item) => (
              <article className={styles.principle} key={item.title}>
                <h3>{item.title}</h3>
                <p><FlowText text={item.text} /></p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className={`${styles.section} ${styles.tinted}`} aria-labelledby="tools-title">
        <Container>
          <p className={styles.eyebrow}>Relevant Teambotics products / 05</p>
          <div className={styles.sectionHead}>
            <h2 id="tools-title">Useful building blocks—not a bundled platform.</h2>
            <p>Some existing products may fit part of a nonprofit workflow. <strong className="flowwrite-anchor">We’ll assess fit honestly and won’t recommend a product just because it is ours.</strong></p>
          </div>
          <div className={styles.productGrid}>
            <article className={styles.productCard}>
              <span className={styles.status}>Live product</span>
              <h3>MDownManager</h3>
              <p>Organize and search markdown-based procedures, research notes, and handoff documentation. <strong className="flowwrite-anchor">Potentially useful where teams already maintain operational knowledge in markdown.</strong></p>
              <Link href="/products/mdownmanager">Product overview <span aria-hidden="true">↗</span></Link>
            </article>
            <article className={styles.productCard}>
              <span className={styles.status}>Early access</span>
              <h3>RedactorBuddy</h3>
              <p>An on-device document redaction workflow for sensitive personal information. <strong className="flowwrite-anchor">Its fit, supported document types, and readiness should be confirmed for each use case.</strong></p>
              <Link href="/products/redactorbuddy">Product overview <span aria-hidden="true">↗</span></Link>
            </article>
          </div>
          <p className={styles.productNote}>These products are not represented as a nonprofit-specific suite, and their inclusion does not imply a particular integration or compliance certification.</p>
        </Container>
      </section>

      <section className={styles.contact} id="contact" aria-labelledby="contact-title">
        <Container>
          <p className={styles.eyebrow}>Start with a conversation / 06</p>
          <div className={styles.contactInner}>
            <div>
              <h2 id="contact-title">What would you give your team more time to do?</h2>
              <p>Tell us what feels repetitive, where a handoff breaks down, and what tools you already rely on. <strong className="flowwrite-anchor">We’ll explore whether a small, human-led workflow improvement makes sense.</strong></p>
            </div>
            <a className={styles.primary} href={`mailto:${siteConfig.contactEmail}?subject=Nonprofit%20workflow%20conversation`}>
              Email Teambotics <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className={styles.disclaimer}>We design workflows and do not provide professional advice. <strong className="flowwrite-anchor">Regulated work requires qualified oversight.</strong></p>
        </Container>
      </section>
    </div>
  );
}
