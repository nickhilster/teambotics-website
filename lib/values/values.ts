import siteValues from "./values.json";

export type SiteValueItem = {
  slug: string;
  title: string;
  principle: string;
  description: string;
  agentGuidance: string;
  evidencePostSlugs: string[];
};

export type SiteValuesDoc = {
  generatedAt: string;
  sourcePostCount: number;
  sourcePostSlugs: string[];
  intro: string;
  agentPlaybook: string[];
  items: SiteValueItem[];
};

/**
 * lib/values/values.json is the source of truth, hand-maintained: whenever a post is
 * published (via scripts/create-blog-post.ts or a seed script), re-scan the archive against
 * it and update it in the same change if the new post evidences a value not yet captured. No
 * LLM API call, no cron, no DB — the agent doing the publishing already has the context.
 *
 * This intentionally does not cover blog posts published directly through the /admin/blog
 * self-serve UI without an agent in the loop — this page can go stale after one of those
 * until the next time an agent touches the blog. If that publishing path becomes the norm
 * rather than the exception, revisit this design (e.g. trigger synthesis from the admin
 * publish action itself instead of relying on an agent noticing).
 */
export function getSiteValues(): SiteValuesDoc {
  return siteValues as SiteValuesDoc;
}
