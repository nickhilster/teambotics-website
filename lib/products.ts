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
    slug: "code2motion",
    name: "Code2Motion",
    title: "Interactive Generative Art Platform",
    label: "Early Access",
    stage: "In Early Access",
    status: "pilot",
    statusLabel: "EARLY ACCESS",
    market: "Creative Tech / Experience Brands",
    tagline:
      "A browser-native creative ecosystem that turns code, motion, and generative interaction into playable digital experiences.",
    description:
      "A dual-sided ecosystem turning code into interactive experiences. Discover c2merses in the PlayRoom, and build progressive web apps without complex WebGL knowledge in ToyMaker.",
    summary:
      "Code2Motion is the creative technology edge of Teambotics. It packages generative motion, playful interaction, and PWA-ready delivery into a platform for expressive browser experiences.",
    heroSummary:
      "Motion, code, and generative atmosphere packaged into a live creative platform.",
    impact:
      "Demonstrates Teambotics' ability to ship expressive, browser-native interactive systems beyond conventional internal tools and dashboards.",
    tags: ["Generative Art", "PWA", "Interactive Motion"],
    techStack: ["React", "Canvas", "PWA", "Generative Motion"],
    aiCapabilities: [
      "Creative prompt-to-experience workflows",
      "Generative interaction scaffolding",
      "Motion system iteration",
    ],
    focusPoints: [
      {
        label: "PlayRoom",
        value:
          "A discovery layer for interactive c2merses, motion studies, and browser-native creative tools.",
      },
      {
        label: "ToyMaker",
        value:
          "A creation surface for building progressive web experiences without forcing every creator into low-level graphics complexity.",
      },
      {
        label: "Platform Signal",
        value:
          "The project proves Teambotics can combine rigorous product thinking with expressive, high-atmosphere interaction design.",
      },
    ],
    proofPoints: [
      "Built around browser-native interactive experiences rather than static gallery assets.",
      "Supports a productized creative workflow from discovery to creation.",
      "The platform direction creates reusable patterns for motion, generative visuals, and PWA delivery.",
      "Its playful surface complements Teambotics' operational products by showing range and interface ambition.",
    ],
    detailSections: [
      {
        title: "Creative System",
        body:
          "Code2Motion frames generative art as a reusable product system. The goal is to make interactive motion explorable, remixable, and deployable.",
      },
      {
        title: "Experience Design",
        body:
          "The platform balances atmosphere and usability by giving visitors immediate visual feedback while keeping the creation model approachable.",
      },
      {
        title: "Strategic Role",
        body:
          "For Teambotics, Code2Motion shows that the same engineering discipline used for workflow systems can also power memorable brand and creative experiences.",
      },
    ],
    externalUrl: "https://code2motion.app/",
    externalLabel: "Open Platform",
    supportUrl: "mailto:hello@teambotics.app?subject=Code2Motion%20case%20study",
    supportLabel: "Discuss Code2Motion",
  },
  {
    slug: "ltb-buddy",
    name: "LTB Buddy",
    title: "Guided Legal Intake Assistant",
    label: "Public Beta",
    stage: "Public Beta",
    status: "pilot",
    statusLabel: "IN BETA",
    market: "Legal Tech / Compliance / Operations",
    tagline:
      "A conversational filing assistant that helps Ontario tenants move from plain-language issue description to a cleaner, more complete LTB application.",
    description:
      "A voice-first conversational interface that streamlines Ontario Landlord and Tenant Board applications. Reduces filing complexity and structures sensitive data within a secure workflow.",
    summary:
      "LTB Buddy turns a stressful legal workflow into a guided intake experience. It captures tenant issues in plain language, organizes the required details, and supports a more confident path toward filing without asking users to understand legal forms first.",
    heroSummary:
      "From complaint to structured filing support, designed for clarity under pressure.",
    impact:
      "Designed to reduce filing friction, improve application completeness, and make legal intake easier to complete for non-expert users.",
    tags: ["Legal Tech", "Guided Intake", "Compliance"],
    techStack: ["OpenAI", "Vercel", "Structured Intake", "Secure Workflow Design"],
    aiCapabilities: [
      "Plain-language issue capture",
      "Conversational intake flow",
      "Structured application data extraction",
      "Workflow guidance for complex forms",
    ],
    focusPoints: [
      {
        label: "The Challenge",
        value:
          "Ontario tenants often abandon legitimate filings because the process is technical, stressful, and difficult to complete without legal context.",
      },
      {
        label: "The System",
        value:
          "The product narrows the workflow into guided questions, structured answers, and practical next steps that preserve the user's intent.",
      },
      {
        label: "The Standard",
        value:
          "The experience is framed around clarity, careful boundaries, and operational trust rather than generic chatbot answers.",
      },
    ],
    proofPoints: [
      "Voice-first intake reduces the blank-page problem for users describing difficult tenant issues.",
      "Structured data capture creates a clearer bridge between conversation and form completion.",
      "Compliance-aware copy keeps the product helpful without over-claiming legal authority.",
      "The workflow is designed around sensitive, high-stakes user context where trust matters.",
    ],
    detailSections: [
      {
        title: "Product Framing",
        body:
          "LTB Buddy is not just a chat surface. It is a workflow product for turning messy user narratives into cleaner intake data while keeping the experience approachable.",
      },
      {
        title: "Experience Design",
        body:
          "The interface prioritizes guided progression, plain language, and confidence-building feedback so users understand what is being captured and why.",
      },
      {
        title: "Operational Fit",
        body:
          "The system is designed for a regulated, document-heavy workflow where traceability, restraint, and consistency are more valuable than novelty.",
      },
    ],
    externalUrl: "https://ltbbuddy.ca/",
    externalLabel: "Open Beta",
    supportUrl: "mailto:hello@teambotics.app?subject=LTB%20Buddy%20case%20study",
    supportLabel: "Discuss LTB Buddy",
  },
  {
    slug: "easybuddy",
    name: "EasyBuddy",
    title: "Conversational Enablement & Onboarding",
    label: "Bespoke MVP",
    stage: "Bespoke MVP, In Production",
    status: "live",
    statusLabel: "BESPOKE MVP",
    market: "Auto Service / Workflow Enablement",
    tagline:
      "An AI-powered practice environment for service teams that need faster onboarding, realistic customer scenarios, and confident workflow recall.",
    description:
      "A purpose-built AI assistant for service centres and dealerships. Simulates live customer interactions and guides staff through operational scenarios and repair order workflows.",
    summary:
      "EasyBuddy helps frontline teams prepare before live customer interactions. It combines simulations, policy-style knowledge support, and tone-aware coaching so staff can rehearse hard moments before they happen.",
    heroSummary:
      "AI-powered readiness for service teams before the customer is in front of them.",
    impact:
      "Built to reduce onboarding friction across customer conversation, policy recall, and repair-order workflow readiness.",
    tags: ["Onboarding", "AI Simulation", "Operations"],
    techStack: ["OpenAI", "Scenario Design", "RAG", "Vercel"],
    aiCapabilities: [
      "Customer service simulations",
      "Role-play coaching",
      "Policy and process lookup",
      "Shift-readiness prompts",
    ],
    focusPoints: [
      {
        label: "Simulation",
        value:
          "Staff can practice real customer situations, from routine service explanations to tense or ambiguous conversations.",
      },
      {
        label: "Enablement",
        value:
          "The assistant surfaces operational knowledge at the moment of need instead of burying it in static onboarding material.",
      },
      {
        label: "Adoption",
        value:
          "The product is shaped around confidence and repetition, making AI a practical coach rather than a replacement for frontline judgment.",
      },
    ],
    proofPoints: [
      "Scenario-based practice supports readiness before staff enter live service environments.",
      "Tone-aware feedback helps standardize customer experience without flattening human communication.",
      "Knowledge retrieval can keep policies, procedures, and service details close to the conversation.",
      "The product targets high-turnover environments where onboarding speed and consistency matter.",
    ],
    detailSections: [
      {
        title: "Product Framing",
        body:
          "EasyBuddy treats onboarding as an active practice loop. The core value is helping teams rehearse decisions, language, and workflows before the stakes are real.",
      },
      {
        title: "Interface Approach",
        body:
          "The experience is conversational, but the underlying design is operational: scenarios, policies, coaching, and follow-up prompts are structured around job readiness.",
      },
      {
        title: "Business Fit",
        body:
          "The system is well suited to distributed service organizations where managers need consistent training quality across many locations and shifting teams.",
      },
    ],
    externalUrl: "https://easybuddy.teambotics.app/",
    externalLabel: "Open Product",
    supportUrl: "mailto:hello@teambotics.app?subject=EasyBuddy%20case%20study",
    supportLabel: "Discuss EasyBuddy",
  },
  {
    slug: "storytellr",
    name: "Storytellr",
    title: "Workflow & AI Enablement Systems",
    label: "In Build",
    stage: "Prototype, Heading to MVP",
    status: "build",
    statusLabel: "IN BUILD",
    market: "Workflow Strategy / Systems Design / Enablement",
    tagline:
      "A narrative systems layer for turning projects, decisions, collaborators, and outcomes into a clearer story surface.",
    description:
      "Workflow systems, automation, and enablement programs designed for multi-stakeholder environments where adoption, trust, and operational fit determine outcomes.",
    summary:
      "Storytellr focuses on the gap between what teams build and what stakeholders can understand. It frames work as a connected narrative system so capability, proof, and context become easier to navigate.",
    heroSummary:
      "A clearer way to show how work, decisions, systems, and outcomes connect.",
    impact:
      "Designed for founders, teams, and operators who need a stronger narrative surface around complex work.",
    tags: ["Workflow Systems", "Automation", "Enablement"],
    techStack: ["Narrative Systems", "Graph Thinking", "AI-Assisted Content", "Interactive UI"],
    aiCapabilities: [
      "Narrative synthesis",
      "Content structuring",
      "Stakeholder-facing explanation",
      "Context-aware storytelling",
    ],
    focusPoints: [
      {
        label: "Context",
        value:
          "Traditional profile and project pages flatten the relationships between decisions, constraints, collaborators, and outcomes.",
      },
      {
        label: "Narrative Graph",
        value:
          "Storytellr is shaped around showing those relationships as a readable system rather than a disconnected list of artifacts.",
      },
      {
        label: "Enablement",
        value:
          "The product direction helps teams explain complex work faster to buyers, partners, hiring teams, and internal stakeholders.",
      },
    ],
    proofPoints: [
      "Creates a structured narrative surface for complex work that does not fit neatly into a static case-study format.",
      "Connects projects, proof, outcomes, and stakeholder needs into one clearer explanation layer.",
      "Supports Teambotics' larger focus on adoption: people need to understand a system before they can trust it.",
      "Can become a reusable enablement layer for founders, product teams, and service organizations.",
    ],
    detailSections: [
      {
        title: "Product Framing",
        body:
          "Storytellr is about making capability legible. It gives complex work a shape that stakeholders can scan, understand, and remember.",
      },
      {
        title: "System Design",
        body:
          "The concept uses graph-like relationships, curated narrative layers, and AI-assisted synthesis to connect proof points without overwhelming the reader.",
      },
      {
        title: "Why It Matters",
        body:
          "For teams selling complex services or products, the story around the work is part of the product. Storytellr makes that story operational.",
      },
    ],
    externalUrl: "https://www.nikdesign.ca/storytellr",
    externalLabel: "Open Current Preview",
    supportUrl: "mailto:hello@teambotics.app?subject=Storytellr%20case%20study",
    supportLabel: "Discuss Storytellr",
  },
];

export const products = productCaseStudies.map((product) => ({
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
