import type { SiteMessages } from "@/lib/i18n/types";

export const siteMessagesEn: SiteMessages = {
  "header": {
    "navLabel": "Primary",
    "navItems": [
      {
        "href": "#systems",
        "label": "Systems"
      },
      {
        "href": "#capabilities",
        "label": "Capabilities"
      },
      {
        "href": "#engagement",
        "label": "Approach"
      },
      {
        "href": "#contact",
        "label": "Contact"
      }
    ],
    "ctaLabel": "Start a conversation",
    "openNavigationLabel": "Open navigation",
    "closeNavigationLabel": "Close navigation",
    "languageLabel": "Language"
  },
  "footer": {
    "navLabel": "Footer",
    "copyright": "© 2026 Teambotics. An independent AI lab - proprietary products and bespoke systems for selected partners.",
    "privacyLabel": "Privacy",
    "termsLabel": "Terms",
    "linkedInLabel": "LinkedIn"
  },
  "hero": {
    "pill": "Independent AI lab · Products & bespoke systems",
    "titleLines": [
      "Built for the",
      "environments that",
      "don't forgive mistakes."
    ],
    "copy": "An independent AI lab shipping proprietary products and bespoke systems for a small number of partners - operated by agents that run without a clock.",
    "primaryCta": "Review systems",
    "secondaryCta": "How we work"
  },
  "positioning": {
    "eyebrow": "WHAT WE DO",
    "title": "We start from the constraints. Not the capability.",
    "paragraphs": [
      "We don't arrive with a pre-built solution. We spend time inside the operational context first - understanding workflows, edge cases, and why things break - then build something that fits. Across compliance, workforce operations, and digital experiences, the approach stays the same.",
      "We help teams decide what should be automated, what should stay guided, and how new capability fits the work people already do. Architecture grounded in real operating conditions means adoption and long-term usability are part of the product - not an afterthought."
    ],
    "quote": "Disciplined process. Systems that last."
  },
  "liveSystems": {
    "eyebrow": "AI SYSTEMS PORTFOLIO",
    "title": "Four products. Different stages. One standard.",
    "description": "Some are ours, some are bespoke, all are built to the same bar - clarity, adoption, and systems that hold up after launch."
  },
  "capabilities": {
    "eyebrow": "CORE COMPETENCIES",
    "title": "Built to hold up in practice.",
    "description": "How we approach architecture, automation, and interface design across every engagement - consistently and without shortcuts.",
    "items": [
      {
        "title": "Scoped MVPs that ship",
        "body": "We define precise product boundaries early - identifying the highest-value workflows and the clearest path from first build to production without scope drift."
      },
      {
        "title": "Compliant workflow automation",
        "body": "We build AI systems around real handoffs, regulatory constraints, and training needs - so new workflows hold up in practice, not just in demos."
      },
      {
        "title": "Interfaces people want to use",
        "body": "We design interfaces around the people doing the work: reducing cognitive load, supporting gradual onboarding, and building confidence over time."
      }
    ]
  },
  "engagement": {
    "eyebrow": "ENGAGEMENT METHODOLOGY",
    "title": "A deliberate path to production.",
    "description": "A structured methodology from early opportunity framing to a production-ready workflow system.",
    "steps": [
      {
        "number": "01",
        "title": "Discovery & Scoping",
        "body": "We start by listening. Every engagement begins with time in the operational context - understanding constraints, failure modes, and what has already been tried."
      },
      {
        "number": "02",
        "title": "System Architecture",
        "body": "We translate what we learned into data models, enablement flows, compliant automation, and interfaces designed around how people actually work - not how they're supposed to."
      },
      {
        "number": "03",
        "title": "Controlled Pilot",
        "body": "We deploy a contained build, gather real feedback from the team using it, and refine the workflow before any broader rollout. No soft launches that quietly go unmaintained."
      },
      {
        "number": "04",
        "title": "Operational Rollout",
        "body": "We move from pilot to production with stable routines, structured enablement, and a clear roadmap - so the system grows with the team instead of aging out of it."
      }
    ]
  },
  "cta": {
    "eyebrow": "GET IN TOUCH",
    "title": "Most of our best work started with a direct conversation.",
    "copy": "Tell us what you're working on. We'll be direct about what's possible and whether we're the right team for it.",
    "reviewSystemsLabel": "Review our systems"
  },
  "leadForm": {
    "eyebrow": "Lead intake",
    "title": "Tell Teambotics what you are trying to improve.",
    "copy": "Keep it short. We use this to understand the workflow, team, or product problem you want to discuss.",
    "honeypotLabel": "Website",
    "fields": {
      "name": "Name",
      "email": "Email",
      "organization": "Organization",
      "interestArea": "Interest area",
      "message": "Message"
    },
    "chooseFocusLabel": "Choose a focus",
    "interestAreaLabels": {
      "Workflow strategy": "Workflow strategy",
      "Team enablement": "Team enablement",
      "AI chatbot or assistant": "AI chatbot or assistant",
      "Legal/compliance workflow": "Legal/compliance workflow",
      "Creative or interactive platform": "Creative or interactive platform",
      "Other": "Other"
    },
    "messageHint": "Outline the problem, timeline, or team context.",
    "privacyPrefix": "By sending this form, you agree that Teambotics may use your information to respond to your inquiry. See our ",
    "privacyLinkLabel": "Privacy Policy",
    "privacySuffix": ".",
    "submitLabel": "Start a conversation",
    "submittingLabel": "Sending...",
    "emailLabel": "Prefer email?",
    "validationErrorLabel": "Please fix the highlighted fields and try again.",
    "spamSuccessLabel": "Thanks. Your note has been received.",
    "requestErrorLabel": "Unable to send your message right now.",
    "requestEmailFallbackLabel": "Unable to send your message right now. Please try email instead.",
    "successLabel": "Thanks. Teambotics will follow up shortly."
  },
  "productPage": {
    "allProductsLabel": "All products",
    "detailEyebrow": "System Detail",
    "detailTitle": "How the product earns trust.",
    "detailDescription": "Each Teambotics product is framed as a practical system: clear user value, controlled AI behavior, and a path from prototype to operational adoption.",
    "evidenceEyebrow": "Evidence",
    "evidenceTitle": "What this work demonstrates.",
    "buildProfileEyebrow": "Build Profile",
    "technologyLabel": "Technology",
    "systemCapabilitiesLabel": "System capabilities"
  }
} as const;
