export type ProductStatus = "live" | "pilot" | "build";

export type ProductFocusPoint = {
  label: string;
  value: string;
};

export type ProductDetailSection = {
  title: string;
  body: string;
};

export type ProductCaseStudy = {
  slug: string;
  name: string;
  title: string;
  label: string;
  stage: string;
  status: ProductStatus;
  statusLabel: string;
  market: string;
  tagline: string;
  description: string;
  summary: string;
  heroSummary: string;
  impact: string;
  tags: string[];
  techStack: string[];
  aiCapabilities: string[];
  focusPoints: ProductFocusPoint[];
  proofPoints: string[];
  detailSections: ProductDetailSection[];
  externalUrl: string;
  externalLabel: string;
  supportUrl: string;
  supportLabel: string;
};

export const productCaseStudies: ProductCaseStudy[] = [
  {
    "slug": "ryfine",
    "name": "RyFine",
    "title": "Prompt Refinement Workflow",
    "label": "Live Product",
    "stage": "Live Product",
    "status": "live",
    "statusLabel": "LIVE PRODUCT",
    "market": "Prompt UX / Applied AI / Workflow Enablement",
    "tagline": "A local-first prompt refinement layer that helps people turn rough instructions, project context, and operating rules into clearer AI-ready prompts.",
    "description": "A prompt refinement product for users who need clearer instructions before they hand work to ChatGPT, Claude, Gemini, Copilot, Cursor, or other AI tools.",
    "summary": "RyFine helps users move from rough intent to sharper execution. It combines prompt UX, reusable context, provider-aware workflows, and local-first control so people can improve instructions without becoming prompt engineers.",
    "heroSummary": "Shape the instruction before the AI acts on it.",
    "impact": "Fills the gap between human intent and what the model receives — making that layer structured, reusable, and team-accessible.",
    "tags": [
      "Prompt UX",
      "Context Engineering",
      "Local-First AI"
    ],
    "techStack": [
      "React",
      "Provider-Aware AI Workflows",
      "Prompt Libraries",
      "Local-First Storage"
    ],
    "aiCapabilities": [
      "Prompt refinement before execution",
      "Reusable prompt and project context",
      "Provider-aware workflow routing",
      "Local-first privacy posture"
    ],
    "focusPoints": [
      {
        "label": "The Problem",
        "value": "Most AI tools still start with a blank box. Users know what they want, but they often struggle to turn messy intent into instructions a model can execute reliably."
      },
      {
        "label": "The Workflow",
        "value": "RyFine sits before the model call. It helps users structure intent, context, rules, and output expectations so the next AI interaction starts from a stronger instruction layer."
      },
      {
        "label": "The Standard",
        "value": "The product treats prompt quality as interface design, not magic wording. The goal is repeatable clarity, user control, and better context before automation runs."
      }
    ],
    "proofPoints": [
      "Turns rough prompts into clearer instructions before users send work into AI systems.",
      "Supports reusable prompt structures, project context, and provider-aware workflows.",
      "Fits a local-first posture where user-controlled keys, local storage, and direct provider calls remain part of the trust model.",
      "Demonstrates Teambotics' ability to ship focused applied-AI tools that improve adoption at the workflow layer."
    ],
    "detailSections": [
      {
        "title": "Product Framing",
        "body": "RyFine is the prompt layer before execution. It gives users a clearer place to shape intent, context, constraints, and expectations before asking an AI system to act."
      },
      {
        "title": "Interface Approach",
        "body": "The experience is designed around refinement rather than replacement. Users stay in control while the product helps them structure better instructions, compare outputs, and reuse stronger patterns."
      },
      {
        "title": "Business Fit",
        "body": "For teams adopting AI, RyFine shows how practical enablement can start at the instruction layer: better prompts, clearer context, less guesswork, and a more teachable workflow."
      }
    ],
    "externalUrl": "https://ryfine.app/",
    "externalLabel": "Open Product",
    "supportUrl": "mailto:hello@teambotics.app?subject=RyFine%20case%20study",
    "supportLabel": "Discuss RyFine"
  },
  {
    "slug": "code2motion",
    "name": "Code2Motion",
    "title": "Interactive Generative Art Platform",
    "label": "Early Access",
    "stage": "In Early Access",
    "status": "pilot",
    "statusLabel": "EARLY ACCESS",
    "market": "Creative Tech / Experience Brands",
    "tagline": "A browser-native creative ecosystem that turns code, motion, and generative interaction into playable digital experiences.",
    "description": "A dual-sided ecosystem turning code into interactive experiences. Discover c2merses in the PlayRoom, and build progressive web apps without complex WebGL knowledge in ToyMaker.",
    "summary": "Code2Motion is the creative technology edge of Teambotics. It packages generative motion, playful interaction, and PWA-ready delivery into a platform for expressive browser experiences.",
    "heroSummary": "Motion, code, and generative atmosphere packaged into a live creative platform.",
    "impact": "Turns generative motion and code into playable, publishable browser experiences without requiring low-level graphics expertise.",
    "tags": [
      "Generative Art",
      "PWA",
      "Interactive Motion"
    ],
    "techStack": [
      "React",
      "Canvas",
      "PWA",
      "Generative Motion"
    ],
    "aiCapabilities": [
      "Creative prompt-to-experience workflows",
      "Generative interaction scaffolding",
      "Motion system iteration"
    ],
    "focusPoints": [
      {
        "label": "PlayRoom",
        "value": "A discovery layer for interactive c2merses, motion studies, and browser-native creative tools."
      },
      {
        "label": "ToyMaker",
        "value": "A creation surface for building progressive web experiences without forcing every creator into low-level graphics complexity."
      },
      {
        "label": "Platform Signal",
        "value": "The platform applies the same engineering discipline to expressive, high-atmosphere interaction design that Teambotics brings to operational systems."
      }
    ],
    "proofPoints": [
      "Built around browser-native interactive experiences rather than static gallery assets.",
      "Supports a productized creative workflow from discovery to creation.",
      "The platform direction creates reusable patterns for motion, generative visuals, and PWA delivery.",
      "Its playful surface complements Teambotics' operational products by showing range and interface ambition."
    ],
    "detailSections": [
      {
        "title": "Creative System",
        "body": "Code2Motion frames generative art as a reusable product system. The goal is to make interactive motion explorable, remixable, and deployable."
      },
      {
        "title": "Experience Design",
        "body": "The platform balances atmosphere and usability by giving visitors immediate visual feedback while keeping the creation model approachable."
      },
      {
        "title": "Strategic Role",
        "body": "Code2Motion demonstrates that the engineering discipline behind Teambotics' workflow systems extends equally to expressive brand and creative experiences."
      }
    ],
    "externalUrl": "https://code2motion.app/",
    "externalLabel": "Open Platform",
    "supportUrl": "mailto:hello@teambotics.app?subject=Code2Motion%20case%20study",
    "supportLabel": "Discuss Code2Motion"
  },
  {
    "slug": "ltb-buddy",
    "name": "LTB Buddy",
    "title": "Guided Legal Intake Assistant",
    "label": "Public Beta",
    "stage": "Public Beta",
    "status": "pilot",
    "statusLabel": "IN BETA",
    "market": "Legal Tech / Compliance / Operations",
    "tagline": "A conversational filing assistant that helps Ontario tenants move from plain-language issue description to a cleaner, more complete LTB application.",
    "description": "A voice-first conversational interface that streamlines Ontario Landlord and Tenant Board applications. Reduces filing complexity and structures sensitive data within a secure workflow.",
    "summary": "LTB Buddy turns a stressful legal workflow into a guided intake experience. It captures tenant issues in plain language, organizes the required details, and supports a more confident path toward filing without asking users to understand legal forms first.",
    "heroSummary": "From complaint to structured filing support, designed for clarity under pressure.",
    "impact": "Designed to reduce filing friction, improve application completeness, and make legal intake easier to complete for non-expert users.",
    "tags": [
      "Legal Tech",
      "Guided Intake",
      "Compliance"
    ],
    "techStack": [
      "OpenAI",
      "Vercel",
      "Structured Intake",
      "Secure Workflow Design"
    ],
    "aiCapabilities": [
      "Plain-language issue capture",
      "Conversational intake flow",
      "Structured application data extraction",
      "Workflow guidance for complex forms"
    ],
    "focusPoints": [
      {
        "label": "The Challenge",
        "value": "Ontario tenants often abandon legitimate filings because the process is technical, stressful, and difficult to complete without legal context."
      },
      {
        "label": "The System",
        "value": "The product narrows the workflow into guided questions, structured answers, and practical next steps that preserve the user's intent."
      },
      {
        "label": "The Standard",
        "value": "The experience is framed around clarity, careful boundaries, and operational trust rather than generic chatbot answers."
      }
    ],
    "proofPoints": [
      "Voice-first intake reduces the blank-page problem for users describing difficult tenant issues.",
      "Structured data capture creates a clearer bridge between conversation and form completion.",
      "Compliance-aware copy keeps the product helpful without over-claiming legal authority.",
      "The workflow is designed around sensitive, high-stakes user context where trust matters."
    ],
    "detailSections": [
      {
        "title": "Product Framing",
        "body": "LTB Buddy is not just a chat surface. It is a workflow product for turning messy user narratives into cleaner intake data while keeping the experience approachable."
      },
      {
        "title": "Experience Design",
        "body": "The interface prioritizes guided progression, plain language, and confidence-building feedback so users understand what is being captured and why."
      },
      {
        "title": "Operational Fit",
        "body": "The system is designed for a regulated, document-heavy workflow where traceability, restraint, and consistency are more valuable than novelty."
      }
    ],
    "externalUrl": "https://ltbbuddy.ca/",
    "externalLabel": "Open Beta",
    "supportUrl": "mailto:hello@teambotics.app?subject=LTB%20Buddy%20case%20study",
    "supportLabel": "Discuss LTB Buddy"
  },
  {
    "slug": "redactorbuddy",
    "name": "RedactorBuddy",
    "title": "Offline PII Redaction Assistant",
    "label": "Early Access",
    "stage": "Early Access",
    "status": "pilot",
    "statusLabel": "EARLY ACCESS",
    "market": "Compliance / Privacy / Financial Document Workflows",
    "tagline": "A privacy-first redaction workflow that strips sensitive personal data from financial documents entirely on-device.",
    "description": "An offline redaction assistant that removes names, account numbers, SSNs, and addresses from financial documents without cloud calls or subscription lock-in.",
    "summary": "RedactorBuddy is built for teams that need a safer way to prepare sensitive financial documents before sharing, reviewing, or storing them. It keeps the workflow entirely on-device so privacy posture is part of the product, not an afterthought.",
    "heroSummary": "Sensitive data removed locally before the file ever leaves the machine.",
    "impact": "Brings privacy, compliance posture, and practical document cleanup into one offline workflow for sensitive records.",
    "tags": [
      "Privacy",
      "Compliance",
      "Offline Workflow"
    ],
    "techStack": [
      "Windows",
      "Local Processing",
      "Document Parsing",
      "PII Detection"
    ],
    "aiCapabilities": [
      "PII identification",
      "Offline redaction workflow",
      "Sensitive document cleanup",
      "Compliance-aware processing"
    ],
    "focusPoints": [
      {
        "label": "Trust Model",
        "value": "The product is designed so sensitive files do not need to leave the device. That local-first posture is central to its value in privacy-sensitive workflows."
      },
      {
        "label": "Document Scope",
        "value": "RedactorBuddy focuses on financial documents where names, account numbers, SSNs, and addresses need to be removed quickly and consistently."
      },
      {
        "label": "Operational Value",
        "value": "It reduces manual cleanup work while giving teams a more controlled handoff step before files are shared with clients, partners, or internal reviewers."
      }
    ],
    "proofPoints": [
      "Processes sensitive documents entirely on-device with zero cloud calls.",
      "Supports multiple document formats for practical redaction workflows.",
      "Built around privacy and compliance posture rather than convenience-only AI usage.",
      "Shows Teambotics can apply AI and workflow design to controlled, high-trust document handling."
    ],
    "detailSections": [
      {
        "title": "Product Framing",
        "body": "RedactorBuddy is a workflow layer for preparing sensitive financial documents before they move further downstream. The priority is controlled handling, not flashy automation."
      },
      {
        "title": "Privacy Posture",
        "body": "The product is intentionally offline-first. That makes it useful in environments where cloud processing is a legal, operational, or trust concern."
      },
      {
        "title": "Business Fit",
        "body": "Teams that routinely prepare financial records, case files, or compliance-bound documents can use RedactorBuddy as a safer preprocessing step before review or distribution."
      }
    ],
    "externalUrl": "https://www.teambotics.app/RedactorBuddy",
    "externalLabel": "Request Access",
    "supportUrl": "mailto:hello@teambotics.app?subject=RedactorBuddy%20case%20study",
    "supportLabel": "Discuss RedactorBuddy"
  },
  {
    "slug": "mdownmanager",
    "name": "MDownManager",
    "title": "Markdown Knowledge Operations",
    "label": "Live Product",
    "stage": "Live Product",
    "status": "live",
    "statusLabel": "LIVE PRODUCT",
    "market": "Knowledge Ops / Documentation / AI-Ready Workflows",
    "tagline": "A document operations layer that turns markdown-heavy folders into a structured, searchable knowledge system for AI-ready work.",
    "description": "A markdown knowledge product built for SOPs, research notes, and handoff docs that need to stay organized, searchable, and usable across evolving AI workflows.",
    "summary": "MDownManager helps teams operationalize markdown-heavy documentation. Instead of scattered notes and folders, it creates a cleaner knowledge layer that supports retrieval, handoff, and local AI workflows such as Ollama-based usage.",
    "heroSummary": "Markdown turned into an operational knowledge layer instead of a folder mess.",
    "impact": "Makes documentation more reusable, searchable, and AI-ready for teams working across SOPs, research notes, and project handoffs.",
    "tags": [
      "Markdown Ops",
      "Knowledge Layer",
      "Local AI"
    ],
    "techStack": [
      "Windows",
      "Markdown",
      "Search Indexing",
      "Ollama"
    ],
    "aiCapabilities": [
      "Structured knowledge organization",
      "Local AI-ready retrieval",
      "Documentation cleanup",
      "Handoff-friendly search"
    ],
    "focusPoints": [
      {
        "label": "Knowledge Problem",
        "value": "Markdown is flexible, but growing folders of notes, SOPs, and handoff docs become hard to search, maintain, and reuse at scale."
      },
      {
        "label": "System Role",
        "value": "MDownManager adds structure to markdown-heavy work so teams can navigate knowledge faster and prepare documentation for AI-assisted retrieval."
      },
      {
        "label": "Operational Fit",
        "value": "It is designed for people who already work in markdown and want better document operations without abandoning local control or lightweight workflows."
      }
    ],
    "proofPoints": [
      "Turns markdown-heavy documentation into a structured and searchable knowledge layer.",
      "Supports SOPs, research notes, and handoff documentation workflows.",
      "Built for Windows with local AI compatibility through Ollama.",
      "Demonstrates applied AI value at the documentation and knowledge-operations layer."
    ],
    "detailSections": [
      {
        "title": "Product Framing",
        "body": "MDownManager is a document operations product for markdown-heavy teams. It treats documentation as an asset that should stay usable, not as a graveyard of folders."
      },
      {
        "title": "Interface Approach",
        "body": "The product is designed to help users keep knowledge clean, structured, and searchable while preserving the simplicity of markdown as a working format."
      },
      {
        "title": "Business Fit",
        "body": "Teams building SOP libraries, research repositories, or AI handoff systems can use MDownManager to create a more durable operational knowledge layer."
      }
    ],
    "externalUrl": "https://www.teambotics.app/MdownManager",
    "externalLabel": "Open Product",
    "supportUrl": "mailto:hello@teambotics.app?subject=MDownManager%20case%20study",
    "supportLabel": "Discuss MDownManager"
  },
  {
    "slug": "easybuddy",
    "name": "EasyBuddy",
    "title": "Conversational Enablement & Onboarding",
    "label": "Bespoke MVP",
    "stage": "Bespoke MVP, In Production",
    "status": "live",
    "statusLabel": "BESPOKE MVP",
    "market": "Auto Service / Workflow Enablement",
    "tagline": "An AI-powered practice environment for service teams that need faster onboarding, realistic customer scenarios, and confident workflow recall.",
    "description": "A purpose-built AI assistant for service centres and dealerships. Simulates live customer interactions and guides staff through operational scenarios and repair order workflows.",
    "summary": "EasyBuddy helps frontline teams prepare before live customer interactions. It combines simulations, policy-style knowledge support, and tone-aware coaching so staff can rehearse hard moments before they happen.",
    "heroSummary": "AI-powered readiness for service teams before the customer is in front of them.",
    "impact": "Built to reduce onboarding friction across customer conversation, policy recall, and repair-order workflow readiness.",
    "tags": [
      "Onboarding",
      "AI Simulation",
      "Operations"
    ],
    "techStack": [
      "OpenAI",
      "Scenario Design",
      "RAG",
      "Vercel"
    ],
    "aiCapabilities": [
      "Customer service simulations",
      "Role-play coaching",
      "Policy and process lookup",
      "Shift-readiness prompts"
    ],
    "focusPoints": [
      {
        "label": "Simulation",
        "value": "Staff can practice real customer situations, from routine service explanations to tense or ambiguous conversations."
      },
      {
        "label": "Enablement",
        "value": "The assistant surfaces operational knowledge at the moment of need instead of burying it in static onboarding material."
      },
      {
        "label": "Adoption",
        "value": "The product is shaped around confidence and repetition, making AI a practical coach rather than a replacement for frontline judgment."
      }
    ],
    "proofPoints": [
      "Scenario-based practice supports readiness before staff enter live service environments.",
      "Tone-aware feedback helps standardize customer experience without flattening human communication.",
      "Knowledge retrieval can keep policies, procedures, and service details close to the conversation.",
      "The product targets high-turnover environments where onboarding speed and consistency matter."
    ],
    "detailSections": [
      {
        "title": "Product Framing",
        "body": "EasyBuddy treats onboarding as an active practice loop. The core value is helping teams rehearse decisions, language, and workflows before the stakes are real."
      },
      {
        "title": "Interface Approach",
        "body": "The experience is conversational, but the underlying design is operational: scenarios, policies, coaching, and follow-up prompts are structured around job readiness."
      },
      {
        "title": "Business Fit",
        "body": "The system is well suited to distributed service organizations where managers need consistent training quality across many locations and shifting teams."
      }
    ],
    "externalUrl": "https://teambotics.app/easybuddy",
    "externalLabel": "Open Product",
    "supportUrl": "mailto:hello@teambotics.app?subject=EasyBuddy%20case%20study",
    "supportLabel": "Discuss EasyBuddy"
  },
  {
    "slug": "storytellr",
    "name": "Storytellr",
    "title": "Client-Facing Narrative Graph",
    "label": "Coming Soon",
    "stage": "Private previews in progress",
    "status": "build",
    "statusLabel": "COMING SOON",
    "market": "Personal Brands / Founder Positioning / Team Storytelling",
    "tagline": "A client-facing narrative graph that helps people show who they are, what they've built, and why it matters.",
    "description": "An interactive story surface that connects themes, milestones, relationships, and proof points so clients and collaborators can understand complex work faster than a static profile.",
    "summary": "Storytellr is being built as a public graph experience for work that is hard to explain in a single timeline. It connects decisions, projects, collaborators, and outcomes in one readable view so capability and credibility are easier to scan.",
    "heroSummary": "Everything you've built, connected and explained — not flattened into a timeline.",
    "impact": "Built for personal brands, founders, and teams that need a stronger narrative surface than a resume, portfolio grid, or static profile page.",
    "tags": [
      "Narrative Graph",
      "Positioning",
      "Client Enablement"
    ],
    "techStack": [
      "Interactive Graph UI",
      "Story Curation",
      "Publishing Controls",
      "Onboarding Flow"
    ],
    "aiCapabilities": [
      "Narrative structuring",
      "Relationship mapping",
      "Guided story curation",
      "Stakeholder-facing summaries"
    ],
    "focusPoints": [
      {
        "label": "Context",
        "value": "Most profile pages show a sequence of roles, but they miss how decisions, projects, collaborators, and outcomes actually connect."
      },
      {
        "label": "Narrative Graph",
        "value": "Storytellr turns that missing context into a readable graph experience organized around themes, milestones, and relationships instead of a flat timeline."
      },
      {
        "label": "Launch Focus",
        "value": "The current build is focused on client-facing positioning with cleaner onboarding, lightweight curation controls, and polished public publishing."
      }
    ],
    "proofPoints": [
      "Public graph walkthroughs are designed to make complex work easier to explain to clients and stakeholders.",
      "The story structure is organized around themes, milestones, and relationships rather than a single linear profile.",
      "Launch work is centered on smoother onboarding and easier content setup for first-time users.",
      "Publishing controls are being shaped to keep the public view polished and intentional."
    ],
    "detailSections": [
      {
        "title": "Product Framing",
        "body": "Storytellr is a client-facing narrative surface for people who need more than a static profile. The value is faster understanding: who someone is, what they have built, and why it matters."
      },
      {
        "title": "Launch Direction",
        "body": "The upcoming release centers on a clean public graph experience, lightweight controls for curating a story, and onboarding that helps first-time users publish with less friction."
      },
      {
        "title": "Why It Matters",
        "body": "Complex work loses meaning when it is flattened into disconnected roles or project cards. Storytellr keeps related work connected so clients, collaborators, and hiring teams can follow the story with context intact."
      }
    ],
    "externalUrl": "https://www.nikdesign.ca/storytellr",
    "externalLabel": "Open Preview",
    "supportUrl": "mailto:hello@teambotics.app?subject=Storytellr%20case%20study",
    "supportLabel": "Discuss Storytellr"
  }
];

const productDisplayOrder = [
  "ryfine",
  "ltb-buddy",
  "redactorbuddy",
  "mdownmanager",
  "code2motion",
  "easybuddy",
  "storytellr",
] as const;

export const products = productDisplayOrder
  .map((slug) => getProductBySlug(slug))
  .filter((product): product is ProductCaseStudy => product !== null)
  .map((product) => ({
    name: product.name,
    title: product.title,
    description: product.description,
    market: product.market,
    status: product.status,
    statusLabel: product.statusLabel,
    href: `/products/${product.slug}`,
    ctaLabel: "Read case study",
    externalUrl: product.externalUrl,
    externalLabel: product.externalLabel,
    tags: product.tags,
  }));

export function getProductBySlug(slug: string) {
  return productCaseStudies.find((product) => product.slug === slug) ?? null;
}
