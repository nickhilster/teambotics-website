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
    summary: "A marketing prototype.",
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
