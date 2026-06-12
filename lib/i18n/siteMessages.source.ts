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
    "copyright": "© 2026 Teambotics. Independent AI systems practice for applied products, workflow automation, and operational enablement.",
    "privacyLabel": "Privacy",
    "termsLabel": "Terms",
    "linkedInLabel": "LinkedIn",
    "madeWith": "Made with love, empathy, and care. Our agents are aligned with the same values."
  },
  "hero": {
    "pill": "Applied AI systems · Product strategy · Workflow automation",
    "titleLines": [
      "AI systems for",
      "operational teams,",
      "built to deploy."
    ],
    "copy": "Teambotics builds AI-enabled products and workflow systems for organizations that need practical deployment — not just a prototype.",
    "primaryCta": "View systems",
    "secondaryCta": "Review approach"
  },
  "positioning": {
    "eyebrow": "WHAT WE DO",
    "title": "We convert operational problems into deployable AI systems.",
    "paragraphs": [
      "Our work begins with the operating environment: process gaps, compliance needs, user behavior, handoffs, and measurable business constraints. We define the system around the work before selecting the technology.",
      "We help organizations determine where AI should assist, automate, guide, or stay out of the way. The result is practical infrastructure: clear interfaces, controlled workflows, and systems designed for adoption beyond the prototype stage."
    ],
    "quote": "Operational clarity. Controlled execution. Sustainable adoption."
  },
  "liveSystems": {
    "eyebrow": "AI SYSTEMS PORTFOLIO",
    "title": "Products and prototypes under active development.",
    "description": "A growing portfolio built to one operating standard."
  },
  "capabilities": {
    "eyebrow": "CORE CAPABILITIES",
    "title": "Built for execution, governance, and adoption.",
    "description": "Teambotics combines product strategy, systems design, automation, and interface development to move AI initiatives from concept to working deployment.",
    "items": [
      {
        "title": "Scoped MVP delivery",
        "body": "We define focused product boundaries, prioritize high-value workflows, and build toward a production path without unnecessary scope expansion."
      },
      {
        "title": "Governed workflow automation",
        "body": "We design AI workflows around operational handoffs, compliance requirements, documentation needs, and controlled user outcomes."
      },
      {
        "title": "Adoption-focused interfaces",
        "body": "We design interfaces that reduce cognitive load, support role-based use, and help teams build confidence through repeated, practical use."
      }
    ]
  },
  "engagement": {
    "eyebrow": "ENGAGEMENT MODEL",
    "title": "A structured path from assessment to deployment.",
    "description": "A concise operating model for scoping, building, piloting, and improving AI-enabled workflow systems.",
    "steps": [
      {
        "number": "01",
        "title": "Assessment & Scope",
        "body": "We map the operating context, identify constraints, define success criteria, and isolate the workflow where AI can create practical value."
      },
      {
        "number": "02",
        "title": "System Design",
        "body": "We translate requirements into data models, automation boundaries, user flows, governance rules, and interface architecture."
      },
      {
        "number": "03",
        "title": "Pilot Deployment",
        "body": "We release a contained build to validate behavior, gather user feedback, and confirm operational fit before broader rollout."
      },
      {
        "number": "04",
        "title": "Operational Rollout",
        "body": "We support production adoption with documentation, enablement routines, iteration cycles, and a roadmap for system maturity."
      }
    ]
  },
  "cta": {
    "eyebrow": "CONTACT",
    "title": "A well-scoped problem is the first deliverable.",
    "copy": "Share the operational problem, product opportunity, or deployment context. We will assess fit and recommend a practical next step.",
    "reviewSystemsLabel": "View systems"
  },
  "leadForm": {
    "eyebrow": "Lead intake",
    "title": "Contact Teambotics.",
    "copy": "Provide a brief overview of the workflow, team, or product problem you want to discuss.",
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
