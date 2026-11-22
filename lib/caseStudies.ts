export type CaseStudyImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type CaseStudySection = {
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  label: string;
  status: string;
  summary: string;
  storyHeading?: string;
  externalUrl?: string;
  externalLabel?: string;
  sections?: CaseStudySection[];
  images?: CaseStudyImage[];
  disclaimer?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "marketing-prototype",
    title: "Marketing prototype",
    label: "Prototype case study",
    status: "Prototype",
    summary:
      "**A repeatable path from campaign planning to human review**—designed to give each new launch a useful starting template instead of rebuilding the brief from scratch.",
    storyHeading: "From campaign plan to human-reviewed handoff.",
    sections: [
      {
        eyebrow: "01 / Plan",
        title: "Give every new campaign a structured starting point.",
        body:
          "The workflow begins with a reusable campaign plan: product, campaign type, audience, channel, region, goal, offer, key feature, call to action, risk sensitivity, approval stage, required assets, and media references. **Product defaults provide a starting point, while the marketer can edit the plan before moving on.**",
        bullets: [
          "Capture the campaign brief in one place",
          "Start from product-specific defaults, then edit",
          "Keep required assets and source media in view from the beginning",
        ],
      },
      {
        eyebrow: "02 / Preflight",
        title: "Surface review issues before drafting begins.",
        body:
          "As the plan changes, a live preflight checks configured rules and separates hard stops, soft blocks, and advisory warnings. **Hard stops cannot be overridden; a soft block requires a written human justification to proceed.** The preflight supports review—it does not approve a campaign or replace legal/compliance judgment.",
        bullets: [
          "See blockers and warnings while the plan is still editable",
          "Keep hard stops distinct from issues that can be reviewed with justification",
          "Make the human decision visible in the handoff",
        ],
      },
      {
        eyebrow: "03 / Research",
        title: "Build current public-source research into the brief.",
        body:
          "Before drafting, the assembled brief directs the agent to check official product and brand pages alongside the applicable public regulatory context. **It distinguishes observed requirements from inference, asks the agent to flag uncertainty,** and carries product guardrails and selected media references forward.",
        bullets: [
          "Use official public pages as the source of truth for product details",
          "Scope regulatory research to the selected region and locality",
          "Carry the plan, guardrails, required assets, and media references into the work",
        ],
      },
      {
        eyebrow: "04 / Handoff",
        title: "Keep marketers, creative teams, and reviewers in the loop.",
        body:
          "A person explicitly starts a hosted agent run. The system is designed to return draft materials with a separate rationale, plus optional production handoff formats such as an asset checklist, media provenance, creative matrix, editable concepts, a review deck, and a structured Figma handoff specification. **People remain responsible for revisions and approval; nothing is auto-published.**",
        bullets: [
          "Keep generated material in draft status for human review",
          "Organize selected assets and source references for downstream teams",
          "The Figma export is structured JSON, not a native .fig file",
        ],
      },
    ],
    disclaimer:
      "Workflow prototype only. This page shows the planning and pre-generation journey; generated campaign copy and creative output are intentionally not shown. The preflight supports review but does not replace human legal/compliance approval. **No measured time savings or campaign outcomes are claimed.**",
  },
  {
    slug: "ikoki",
    title: "IKO Rooftop Chatbot",
    label: "IKOKI · IKO Commercial",
    status: "Prototype delivered",
    summary:
      "A document-first way to browse selected IKO commercial roofing information and **ask questions grounded in technical source material.**",
    externalUrl: "https://ikoki.teambotics.app/",
    externalLabel: "Open IKOKI prototype",
    sections: [
      {
        eyebrow: "01 / Find",
        title: "Browse by roofing category.",
        body:
          "The mobile-first interface starts with four subject areas—Roofing Solutions, Building Envelope, Bridge Deck Waterproofing, and Accessories & Components—then opens a focused list of brochures and technical documents.",
        bullets: [
          "Four entry categories for commercial roofing information",
          "Document list with brochure and technical references",
          "Selected source material about APP modified-bitumen systems",
        ],
      },
      {
        eyebrow: "02 / Ask",
        title: "Keep answers connected to their sources.",
        body:
          "The floating IKOKI assistant is implemented to retrieve passages from selected IKO PDFs, apply relevance thresholds, and expose source details with responses. **When strict grounding is enabled and relevant material is unavailable, the chat is configured to decline rather than invent an answer.**",
        bullets: [
          "Source titles, excerpts, page numbers, and PDF links",
          "Suggested questions for navigating technical references",
          "A visible prototype disclaimer in the chat welcome state",
        ],
      },
    ],
    images: [
      {
        src: "/media/case-studies/ikoki/ikoki-home.png",
        alt: "IKOKI prototype landing screen with four roofing information categories",
        caption: "The document-discovery screen starts with four roofing categories.",
        width: 1440,
        height: 1016,
      },
      {
        src: "/media/case-studies/ikoki/ikoki-document-browser.png",
        alt: "IKOKI document browser showing technical and brochure references",
        caption: "A category opens a list of technical and brochure documents.",
        width: 1440,
        height: 1663,
      },
      {
        src: "/media/case-studies/ikoki/ikoki-chat-open.png",
        alt: "IKOKI assistant open, showing its prototype notice and suggested questions",
        caption: "The assistant opens in context and labels the experience as a prototype.",
        width: 1440,
        height: 1000,
      },
    ],
    disclaimer:
      "**Prototype only. This is not an official production IKO system.**",
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug) ?? null;
}
