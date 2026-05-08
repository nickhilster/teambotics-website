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

const KNOWN_SOURCE_KEYS_BY_TYPE = new Map<string, string>(
  KNOWN_SOURCE_GROUPS.map((source) => [source.sourceType, source.sourceKey]),
);

export function getKnownSourceKeyForType(sourceType: string) {
  return KNOWN_SOURCE_KEYS_BY_TYPE.get(sourceType);
}

