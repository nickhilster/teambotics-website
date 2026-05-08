import { siteConfig } from "@/lib/config";
import { productCaseStudies } from "@/lib/products";

export type TeamboticsKnowledgeDocument = {
  id: string;
  title: string;
  content: string;
  sourceType: "company" | "product" | "case-study" | "capability";
  sourceKey: string;
  route?: string;
  metadata?: Record<string, unknown>;
};

const companyDocuments: TeamboticsKnowledgeDocument[] = [
  {
    id: "company-what-teambotics-does",
    title: "What Teambotics does",
    sourceType: "company",
    sourceKey: "company",
    route: "/",
    content:
      "What does Teambotics do? Teambotics builds intelligent workflow systems and interactive platforms. The company focuses on adoption-ready AI, workflow enablement, compliance-aware interfaces, creative technology, and narrative systems shaped for operational clarity and practical trust.",
  },
  {
    id: "company-positioning",
    title: "Teambotics positioning",
    sourceType: "company",
    sourceKey: "company",
    route: "/",
    content:
      "Teambotics builds intelligent workflow systems and interactive platforms. The company focuses on adoption-ready products for operational workflows, compliance-aware interfaces, creative technology, and narrative enablement. The standard is clarity, usability, release readiness, and practical trust.",
  },
  {
    id: "company-capabilities",
    title: "Teambotics core capabilities",
    sourceType: "capability",
    sourceKey: "capabilities",
    route: "/#capabilities",
    content:
      "Teambotics capabilities include strategic MVP architecture, workflow automation and enablement, secure AI systems, high-adoption interface design, product scoping, and systems that teams can trust and use in practice.",
  },
  {
    id: "company-engagement-model",
    title: "Teambotics engagement model",
    sourceType: "capability",
    sourceKey: "capabilities",
    route: "/#engagement",
    content:
      "The Teambotics engagement model moves through discovery and scoping, system architecture, controlled pilot, and operational rollout. The process is designed to align business objectives, workflow realities, user needs, security constraints, and release readiness.",
  },
  {
    id: "company-contact",
    title: "How to contact Teambotics",
    sourceType: "company",
    sourceKey: "company",
    route: "/#contact",
    content:
      `How do I contact Teambotics? Visitors can contact Teambotics through the homepage lead form or by email at ${siteConfig.contactEmail}. The public company LinkedIn page is https://www.linkedin.com/company/teambotics-inc.`,
  },
  {
    id: "company-private-client-boundaries",
    title: "Private client disclosure boundaries",
    sourceType: "company",
    sourceKey: "company",
    route: "/terms",
    content:
      "What private clients has Teambotics worked with? The public Teambotics site does not publish a list of private clients. The assistant should not name private clients, confidential deployments, or unpublished case studies unless that information appears in approved public source material.",
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
        sourceKey: "products",
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
      ...(product.slug === "ltb-buddy"
        ? [
            {
              id: "product-ltb-buddy-legal-boundaries",
              title: "LTB Buddy legal boundaries",
              sourceType: "product" as const,
              sourceKey: "products",
              route,
              metadata: { product: product.name },
              content:
                "Can LTB Buddy give me legal advice? No. LTB Buddy is a guided intake assistant for filing workflows. It can help structure information and support application preparation, but it is not a lawyer, a law firm, or a substitute for qualified legal advice.",
            },
          ]
        : []),
      {
        id: `case-study-${product.slug}-focus`,
        title: `${product.name} focus points`,
        sourceType: "case-study",
        sourceKey: "case-studies",
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
        sourceKey: "case-studies",
        route,
        metadata: { product: product.name },
        content: product.proofPoints.join("\n"),
      },
      {
        id: `case-study-${product.slug}-details`,
        title: `${product.name} detail sections`,
        sourceType: "case-study",
        sourceKey: "case-studies",
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
