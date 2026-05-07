export const KNOWN_SOURCE_GROUPS = [
  {
    sourceKey: "company",
    label: "Company positioning",
    sourceType: "company",
    routeScope: "/",
    staleAfterDays: 30,
  },
  {
    sourceKey: "capabilities",
    label: "Capabilities and engagement model",
    sourceType: "capability",
    routeScope: "/#capabilities",
    staleAfterDays: 30,
  },
  {
    sourceKey: "products",
    label: "Product summaries",
    sourceType: "product",
    routeScope: "/products",
    staleAfterDays: 30,
  },
  {
    sourceKey: "case-studies",
    label: "Product case studies",
    sourceType: "case-study",
    routeScope: "/products",
    staleAfterDays: 30,
  },
] as const;

