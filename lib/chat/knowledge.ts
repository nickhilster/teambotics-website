import { productCaseStudies } from "@/lib/products";

export type TeamboticsKnowledgeDocument = {
  id: string;
  title: string;
  content: string;
  sourceType: "company" | "product" | "case-study" | "capability";
  route?: string;
  metadata?: Record<string, unknown>;
};

const companyDocuments: TeamboticsKnowledgeDocument[] = [
  {
    id: "company-positioning",
    title: "Teambotics positioning",
    sourceType: "company",
    route: "/",
    content:
      "Teambotics builds intelligent workflow systems and interactive platforms. The company focuses on adoption-ready products for operational workflows, compliance-aware interfaces, creative technology, and narrative enablement. The standard is clarity, usability, release readiness, and practical trust.",
  },
  {
    id: "company-capabilities",
    title: "Teambotics core capabilities",
    sourceType: "capability",
    route: "/#capabilities",
    content:
      "Teambotics capabilities include strategic MVP architecture, workflow automation and enablement, secure AI systems, high-adoption interface design, product scoping, and systems that teams can trust and use in practice.",
  },
  {
    id: "company-engagement-model",
    title: "Teambotics engagement model",
    sourceType: "capability",
    route: "/#engagement",
    content:
      "The Teambotics engagement model moves through discovery and scoping, system architecture, controlled pilot, and operational rollout. The process is designed to align business objectives, workflow realities, user needs, security constraints, and release readiness.",
  },
];

export function buildTeamboticsKnowledgeDocuments(): TeamboticsKnowledgeDocument[] {
  const productDocuments = productCaseStudies.flatMap<TeamboticsKnowledgeDocument>((product) => {
    const route = `/products/${product.slug}`;

    return [
      {
        id: `product-${product.slug}-summary`,
        title: `${product.name} summary`,
        sourceType: "product",
        route,
        metadata: { product: product.name },
        content: [
          product.name,
          product.title,
          product.label,
          product.stage,
          product.market,
          product.tagline,
          product.summary,
          product.impact,
          `Tags: ${product.tags.join(", ")}`,
          `Technology: ${product.techStack.join(", ")}`,
          `AI capabilities: ${product.aiCapabilities.join(", ")}`,
        ].join("\n"),
      },
      {
        id: `case-study-${product.slug}-focus`,
        title: `${product.name} focus points`,
        sourceType: "case-study",
        route,
        metadata: { product: product.name },
        content: product.focusPoints
          .map((point) => `${point.label}: ${point.value}`)
          .join("\n"),
      },
      {
        id: `case-study-${product.slug}-proof`,
        title: `${product.name} proof points`,
        sourceType: "case-study",
        route,
        metadata: { product: product.name },
        content: product.proofPoints.join("\n"),
      },
      {
        id: `case-study-${product.slug}-details`,
        title: `${product.name} detail sections`,
        sourceType: "case-study",
        route,
        metadata: { product: product.name },
        content: product.detailSections
          .map((section) => `${section.title}: ${section.body}`)
          .join("\n"),
      },
    ];
  });

  return [...companyDocuments, ...productDocuments];
}
