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
    "ctaLabel": "Contact Teambotics",
    "openNavigationLabel": "Open navigation",
    "closeNavigationLabel": "Close navigation",
    "languageLabel": "Language"
  },
  "footer": {
    "navLabel": "Footer",
    "copyright": "© 2026 Teambotics. Purpose-built products, workflow systems, and full-cycle delivery for organizations that need software built for them.",
    "privacyLabel": "Privacy",
    "termsLabel": "Terms",
    "linkedInLabel": "LinkedIn",
    "madeWith": "Made with love, empathy, and care. Our agents are aligned with the same values."
  },
  "hero": {
    "pill": "Purpose-built products · Workflow systems · Full-cycle delivery",
    "titleLines": [
      "Software built for your workflow.",
      "Not the other way around."
    ],
    "copy": "Teambotics designs and builds purpose-built products for organizations that have outgrown off-the-shelf tools. We run the full cycle — discovery, design, build, deployment — and deliver software your team actually owns.",
    "primaryCta": "View systems",
    "secondaryCta": "Review approach"
  },
  "positioning": {
    "eyebrow": "WHAT WE DO",
    "title": "We build the product your business actually needs.",
    "paragraphs": [
      "Most organizations are running on a patchwork of SaaS subscriptions, manual workarounds, and tools that weren't designed for their workflow. The alternative isn't another tool — it's a product built for the way you actually operate.",
      "We work from discovery through to a deployed, maintained system. That means understanding your processes, constraints, and team before writing a line of code — and delivering something built to last, not handed off and forgotten."
    ],
    "quote": "Built for your problem. Owned by your team."
  },
  "liveSystems": {
    "eyebrow": "OUR WORK",
    "title": "Deployed products and purpose-built systems.",
    "description": "A growing portfolio built to one delivery standard."
  },
  "capabilities": {
    "eyebrow": "CORE CAPABILITIES",
    "title": "Full-cycle delivery from discovery to deployment.",
    "description": "Teambotics combines product strategy, workflow design, and interface development to take initiatives from concept to working, owned software.",
    "items": [
      {
        "title": "Scoped product delivery",
        "body": "We define focused product boundaries, prioritize high-value workflows, and build toward production without unnecessary scope expansion."
      },
      {
        "title": "Workflow design and automation",
        "body": "We design systems around real operational handoffs, compliance requirements, and team constraints — not generic process templates."
      },
      {
        "title": "Adoption-focused interfaces",
        "body": "We design interfaces that reduce cognitive load, support role-based use, and help teams build confidence through repeated, practical use."
      }
    ]
  },
  "engagement": {
    "eyebrow": "HOW WE WORK",
    "title": "A structured path from discovery to deployed product.",
    "description": "From scoping the right problem to shipping something that holds up in production.",
    "steps": [
      {
        "number": "01",
        "title": "Discovery & Scope",
        "body": "We map your operating context, define what success looks like, and identify where a purpose-built product creates real value."
      },
      {
        "number": "02",
        "title": "System Design",
        "body": "We translate requirements into data models, workflow boundaries, user flows, governance rules, and interface architecture."
      },
      {
        "number": "03",
        "title": "Pilot Deployment",
        "body": "We release a contained build to validate behavior with real users, gather feedback, and confirm the product fits before full rollout."
      },
      {
        "number": "04",
        "title": "Production Rollout",
        "body": "We support production adoption with documentation, enablement routines, iteration cycles, and a roadmap for system maturity."
      }
    ]
  },
  "cta": {
    "eyebrow": "CONTACT",
    "title": "A well-scoped problem is the first deliverable.",
    "copy": "Tell us about the workflow gap, team problem, or product opportunity. We'll assess whether a purpose-built product is the right answer and recommend a practical first step.",
    "reviewSystemsLabel": "View systems"
  },
  "leadForm": {
    "eyebrow": "INQUIRE",
    "title": "Contact Teambotics.",
    "copy": "Tell us about the workflow, product gap, or operational problem you want to solve.",
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
    "submitLabel": "Send inquiry",
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
    "detailEyebrow": "SYSTEM OVERVIEW",
    "detailTitle": "System architecture, governance, and user value.",
    "detailDescription": "Each Teambotics product is built as a governed system: defined user value, controlled AI behavior, and a measured path to production deployment.",
    "evidenceEyebrow": "OUTCOMES",
    "evidenceTitle": "Capability delivered. Outcomes on record.",
    "buildProfileEyebrow": "Build Profile",
    "technologyLabel": "Technology",
    "systemCapabilitiesLabel": "System capabilities"
  }
} as const;
