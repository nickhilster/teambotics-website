import { getNeonClient, toRows } from "@/lib/neon";
import { withNeonQueryRetry } from "@/lib/neonRetry";
import { staticBlogPosts } from "@/lib/blog/staticPosts";
import { createChatCompletion, getOpenAiRuntimeConfig } from "@/lib/chat/openai";

const MAX_POSTS_IN_CORPUS = 60;
const MAX_CHARS_PER_POST = 4000;

export type CorpusPost = {
  slug: string;
  title: string;
  tags: string[];
  content: string;
  publishedAt: string | null;
};

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
  model: string;
  sourcePostCount: number;
  sourcePostSlugs: string[];
  intro: string;
  agentPlaybook: string[];
  items: SiteValueItem[];
};

/**
 * Hand-authored seed grounded in the blog archive as it existed when this page
 * shipped. Serves the page before the first sync job has run, and as a safe
 * fallback if a sync run fails and no prior result exists yet.
 */
export const FALLBACK_SITE_VALUES: SiteValuesDoc = {
  generatedAt: "2026-08-17T00:00:00.000Z",
  model: "seed",
  sourcePostCount: 21,
  sourcePostSlugs: [
    "chatbots-should-ask-better-questions",
    "software-should-give-your-team-more-time-with-people",
    "context-recovery-agentic-work",
    "git-branches-and-the-things-we-leave-behind",
    "training-exclusion-is-not-data-protection",
    "trust-architecture-enterprise-ai-adoption",
    "corporate-ai-adoption-operating-model",
    "ai-adoption-personalized-learning",
    "static-documentation-living-knowledge-systems",
    "ai-should-not-replace-care",
    "workflows-are-becoming-products",
    "designing-human-ai-teams",
    "llms-structured-automation-workflows",
    "prompt-engineering-operational-skill",
    "sops-to-ai-agents",
    "ai-value-existing-data",
    "applied-ai-regulated-environments",
    "ai-augmentation-frontline-operations",
    "multi-agent-systems-workflow",
    "operational-data-ai-value",
    "agentic-ai-beyond-chatbots",
  ],
  intro:
    "Teambotics doesn't keep a values poster on a wall — it keeps a blog. These principles are pulled from what the team has actually argued, in public, across the Teambotics blog. This page is regenerated on a schedule by rereading the full archive, so it should track what the company is saying now, not just what it said when this page was first written. It is written for two audiences at once: people evaluating whether to work with Teambotics, and AI agents that have been pointed here and asked to bring these values into their own product decisions.",
  agentPlaybook: [
    "Before proposing a feature, ask whether it redistributes work toward human judgment or quietly removes it. In any customer-facing or care-adjacent workflow, prefer the former.",
    "Ground proposals in the product's actual operational data and logs before recommending new data collection or a green-field rebuild.",
    "Any AI-driven decision or output should be traceable: show sources, confidence, and an audit trail — not just an answer.",
    "Treat the workflow, not the model, as the unit of design. Define states, owners, and a success metric before picking a model or a prompt.",
    "Default to structured outputs, tool use, and multi-step orchestration over a single freeform chat box when the task has more than one step.",
    "Don't assume users are already AI-literate. Pair new AI capability with in-context guidance on how to use it well.",
    "Flag regulatory or compliance-sensitive surfaces explicitly. Don't treat every environment as equally low-risk.",
    "If a suggestion would remove a human review or escalation path, say so explicitly and justify why.",
  ],
  items: [
    {
      slug: "augmentation-over-automation",
      title: "Augmentation Over Automation",
      principle:
        "Redistribute work between humans and AI so both get better at what they're good at — don't default to replacing the human.",
      description:
        "The most durable AI deployments aren't the ones that eliminate a person from the loop, they're the ones that hand the AI the repetitive, high-volume, or memory-dependent parts of a job so the person can spend more time on judgment, care, and relationships.",
      agentGuidance:
        "When you're suggesting a product change, name what a human still owns after the change ships. If the answer is 'nothing,' reconsider the design.",
      evidencePostSlugs: [
        "designing-human-ai-teams",
        "ai-augmentation-frontline-operations",
        "software-should-give-your-team-more-time-with-people",
        "ai-should-not-replace-care",
      ],
    },
    {
      slug: "ground-every-claim-in-real-data",
      title: "Ground Every Claim in Real Data",
      principle:
        "The highest-value AI is built on the operational data and history an organization already has, not on speculation or a fresh data-collection project.",
      description:
        "Most organizations already own the maintenance notes, tickets, SOPs, and logs that would make an AI system genuinely useful. The job is usually retrieval and connection, not new instrumentation.",
      agentGuidance:
        "Before recommending new data collection, check what the product already logs or stores. Propose retrieval over collection whenever the data already exists somewhere.",
      evidencePostSlugs: [
        "ai-value-existing-data",
        "operational-data-ai-value",
        "static-documentation-living-knowledge-systems",
        "context-recovery-agentic-work",
      ],
    },
    {
      slug: "design-trust-dont-assume-it",
      title: "Design Trust, Don't Assume It",
      principle:
        "Trust in an AI system comes from permissions, provenance, auditability, and clear accountability — not from a disclaimer in the footer.",
      description:
        "A privacy policy or a 'we don't train on your data' claim answers a narrow question. It doesn't answer who can see what, why the system produced an answer, or who is accountable when it's wrong.",
      agentGuidance:
        "For any feature that touches user data or produces a consequential output, specify who can access it, how a human can trace a decision back to its source, and who is accountable if it's wrong.",
      evidencePostSlugs: [
        "trust-architecture-enterprise-ai-adoption",
        "training-exclusion-is-not-data-protection",
      ],
    },
    {
      slug: "treat-the-workflow-as-the-product",
      title: "Treat the Workflow as the Product",
      principle:
        "AI creates value by changing how work actually gets done, so the workflow — its states, owners, and feedback loops — is the thing being designed, not the model.",
      description:
        "SOPs, approval chains, and handoffs are the closest thing most organizations have to a formal spec. Good AI products translate that spec faithfully instead of bolting a chatbot onto the side of it.",
      agentGuidance:
        "Map the workflow states and owners before proposing a model or a prompt. If a regulated or compliance-sensitive step is involved, call out what can't be compromised.",
      evidencePostSlugs: [
        "workflows-are-becoming-products",
        "sops-to-ai-agents",
        "corporate-ai-adoption-operating-model",
        "applied-ai-regulated-environments",
      ],
    },
    {
      slug: "ai-literacy-is-everyones-job",
      title: "AI Literacy Is Everyone's Job",
      principle:
        "Communicating precisely with AI systems is now an operational skill for the whole team, not a specialist trick, and it has to be taught inside real work, not a generic course.",
      description:
        "Adoption programs fail more often on training than on technology. Role-agnostic courses don't transfer; workflow-integrated, personalized learning does.",
      agentGuidance:
        "Don't assume the end user is AI-literate. Pair any new AI-facing capability with in-context guidance, examples, or defaults that work without prompting expertise.",
      evidencePostSlugs: ["prompt-engineering-operational-skill", "ai-adoption-personalized-learning"],
    },
    {
      slug: "build-real-systems-not-chat-theatre",
      title: "Build Real Systems, Not Chat Theatre",
      principle:
        "A chat box is not the ceiling of what AI can do. Structured outputs, tool use, and multi-agent orchestration are what make it dependable.",
      description:
        "The chatbot era is a starting point, not an end state. Serious automation composes specialized agents and structured tool calls instead of hoping a single freeform conversation gets it right.",
      agentGuidance:
        "For any task with more than one step or a verifiable output, prefer structured outputs and tool calls over a single open-ended chat turn.",
      evidencePostSlugs: [
        "agentic-ai-beyond-chatbots",
        "llms-structured-automation-workflows",
        "multi-agent-systems-workflow",
        "chatbots-should-ask-better-questions",
      ],
    },
    {
      slug: "protect-dignity-in-every-interaction",
      title: "Protect Dignity in Every Interaction",
      principle:
        "In any service the AI touches, empathy comes before judgment, and the goal is to operationalize access, not automate for its own sake.",
      description:
        "For people navigating care, benefits, or support systems, the hardest part usually isn't the paperwork, it's not knowing where to start or feeling like a burden for asking. AI should reduce that friction, not add another layer of it.",
      agentGuidance:
        "For any feature touching a vulnerable or first-time user, evaluate it by whether it reduces confusion and shame, not only by whether it completes the task.",
      evidencePostSlugs: ["ai-should-not-replace-care", "chatbots-should-ask-better-questions"],
    },
    {
      slug: "honor-what-you-inherit",
      title: "Honor What You Inherit, Build for What's Next",
      principle:
        "The tools we build with were handed down by people who came before us, so we maintain, document, and hand off work as carefully as we build it.",
      description:
        "Open-source software runs on inheritance. Treating documentation, commit history, and code as a courtesy to future maintainers — including other AI agents — is part of doing the work well, not an afterthought.",
      agentGuidance:
        "Leave the codebase and its docs clearer than you found them. Write for the next agent or engineer who has none of your current context.",
      evidencePostSlugs: ["git-branches-and-the-things-we-leave-behind"],
    },
  ],
};

async function loadDbCorpusPosts(): Promise<CorpusPost[]> {
  try {
    const rows = await withNeonQueryRetry(async () => {
      const client = await getNeonClient();
      return client.query(
        `SELECT slug, title, tags, content, published_at
         FROM blog_posts
         WHERE status = 'published'
         ORDER BY published_at DESC
         LIMIT $1`,
        [MAX_POSTS_IN_CORPUS],
      );
    });

    return toRows<{ slug: string; title: string; tags: string[]; content: string; published_at: string | null }>(rows).map(
      (row) => ({
        slug: row.slug,
        title: row.title,
        tags: Array.isArray(row.tags) ? row.tags : [],
        content: row.content ?? "",
        publishedAt: row.published_at,
      }),
    );
  } catch {
    return [];
  }
}

export async function loadBlogCorpus(): Promise<CorpusPost[]> {
  const staticCorpus: CorpusPost[] = staticBlogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    tags: post.tags,
    content: post.content,
    publishedAt: post.published_at,
  }));

  const dbCorpus = await loadDbCorpusPosts();
  const staticSlugs = new Set(staticCorpus.map((post) => post.slug));
  const merged = [...staticCorpus, ...dbCorpus.filter((post) => !staticSlugs.has(post.slug))];

  return merged
    .sort((a, b) => (Date.parse(b.publishedAt ?? "") || 0) - (Date.parse(a.publishedAt ?? "") || 0))
    .slice(0, MAX_POSTS_IN_CORPUS);
}

function buildCorpusPromptText(posts: CorpusPost[]) {
  return posts
    .map((post) => {
      const truncated =
        post.content.length > MAX_CHARS_PER_POST ? `${post.content.slice(0, MAX_CHARS_PER_POST)}…` : post.content;
      return `### ${post.title}\nslug: ${post.slug}\ntags: ${post.tags.join(", ")}\n\n${truncated}`;
    })
    .join("\n\n---\n\n");
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function parseAndValidateSiteValues(raw: string, validSlugs: Set<string>): Omit<SiteValuesDoc, "generatedAt" | "model" | "sourcePostCount" | "sourcePostSlugs"> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("Values synthesis returned invalid JSON.");
  }

  const doc = parsed as Partial<SiteValuesDoc>;

  if (!isNonEmptyString(doc.intro)) {
    throw new Error("Values synthesis is missing a valid intro.");
  }

  if (!Array.isArray(doc.agentPlaybook) || doc.agentPlaybook.length < 3) {
    throw new Error("Values synthesis is missing a valid agentPlaybook.");
  }
  const agentPlaybook = doc.agentPlaybook.filter(isNonEmptyString);
  if (agentPlaybook.length < 3) {
    throw new Error("Values synthesis agentPlaybook has too few valid entries.");
  }

  if (!Array.isArray(doc.items) || doc.items.length < 4) {
    throw new Error("Values synthesis is missing a valid items list.");
  }

  const items: SiteValueItem[] = doc.items.map((rawItem, index) => {
    const item = rawItem as Partial<SiteValueItem>;
    if (
      !isNonEmptyString(item.slug) ||
      !isNonEmptyString(item.title) ||
      !isNonEmptyString(item.principle) ||
      !isNonEmptyString(item.description) ||
      !isNonEmptyString(item.agentGuidance)
    ) {
      throw new Error(`Values synthesis item at index ${index} is missing required fields.`);
    }

    const evidencePostSlugs = Array.isArray(item.evidencePostSlugs)
      ? item.evidencePostSlugs.filter((slug): slug is string => isNonEmptyString(slug) && validSlugs.has(slug))
      : [];

    return {
      slug: item.slug,
      title: item.title,
      principle: item.principle,
      description: item.description,
      agentGuidance: item.agentGuidance,
      evidencePostSlugs,
    };
  });

  return { intro: doc.intro, agentPlaybook, items };
}

async function synthesizeSiteValuesFromCorpus(posts: CorpusPost[]) {
  const openAiConfig = getOpenAiRuntimeConfig({ maxTokens: 3500, temperature: 0.4 });
  if (!openAiConfig.apiKey) {
    throw new Error("OPENAI_API_KEY is required to synthesize site values.");
  }

  const validSlugs = new Set(posts.map((post) => post.slug));
  const corpusText = buildCorpusPromptText(posts);

  const systemPrompt = `You are analyzing a company's public blog archive to extract the operating values the company actually demonstrates in its writing. Only surface values that are genuinely evidenced by repeated themes across multiple posts — do not invent generic corporate values ("innovation", "excellence") that aren't grounded in the text.

Write for two audiences at once: a human evaluating the company, and an autonomous AI coding agent that has been pointed at this content and asked to bring these values into its own product decisions.

Respond with strict JSON matching this shape and nothing else:
{
  "intro": "2-4 sentences introducing the page to both a human and an AI agent reader",
  "agentPlaybook": ["6 to 10 short imperative directives an AI agent should follow when using these values to evaluate or propose product changes"],
  "items": [
    {
      "slug": "kebab-case-id",
      "title": "2-5 word value name",
      "principle": "one crisp sentence stating the value as an operating principle",
      "description": "2-4 sentences explaining what this means in practice",
      "agentGuidance": "1-2 sentences of concrete instruction for an AI agent applying this value when proposing product or feature changes",
      "evidencePostSlugs": ["slug-from-the-provided-list", "..."]
    }
  ]
}

Produce 6 to 9 items. Only use slugs from the posts provided below in evidencePostSlugs — never invent a slug.`;

  const userPrompt = `Here is the current Teambotics blog archive (title, slug, tags, and post content):\n\n${corpusText}`;

  const response = await createChatCompletion(
    [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    openAiConfig,
    { responseFormat: "json_object" },
  );

  if (!response) {
    throw new Error("Values synthesis received an empty response from OpenAI.");
  }

  const parsed = parseAndValidateSiteValues(response, validSlugs);

  return {
    ...parsed,
    model: openAiConfig.chatModel,
  };
}

async function upsertSiteValues(doc: SiteValuesDoc) {
  const client = await getNeonClient();
  await client.query(
    `INSERT INTO site_values (
      id, generated_at, model, source_post_count, source_post_slugs, intro, agent_playbook, items, updated_at
    ) VALUES ('live', now(), $1, $2, $3, $4, $5::jsonb, $6::jsonb, now())
    ON CONFLICT (id) DO UPDATE
    SET generated_at = excluded.generated_at,
        model = excluded.model,
        source_post_count = excluded.source_post_count,
        source_post_slugs = excluded.source_post_slugs,
        intro = excluded.intro,
        agent_playbook = excluded.agent_playbook,
        items = excluded.items,
        updated_at = now()`,
    [
      doc.model,
      doc.sourcePostCount,
      doc.sourcePostSlugs,
      doc.intro,
      JSON.stringify(doc.agentPlaybook),
      JSON.stringify(doc.items),
    ],
  );
}

type SiteValuesRow = {
  generated_at: string;
  model: string;
  source_post_count: number;
  source_post_slugs: string[];
  intro: string;
  agent_playbook: unknown;
  items: unknown;
};

function parseJsonColumn<T>(value: unknown, fallback: T): T {
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }
  return (value as T) ?? fallback;
}

export async function getLatestSiteValues(): Promise<SiteValuesDoc | null> {
  try {
    const rows = await withNeonQueryRetry(async () => {
      const client = await getNeonClient();
      return client.query("SELECT * FROM site_values WHERE id = 'live' LIMIT 1");
    });

    const row = toRows<SiteValuesRow>(rows)[0];
    if (!row) {
      return null;
    }

    return {
      generatedAt: row.generated_at,
      model: row.model,
      sourcePostCount: row.source_post_count,
      sourcePostSlugs: Array.isArray(row.source_post_slugs) ? row.source_post_slugs : [],
      intro: row.intro,
      agentPlaybook: parseJsonColumn<string[]>(row.agent_playbook, []),
      items: parseJsonColumn<SiteValueItem[]>(row.items, []),
    };
  } catch {
    return null;
  }
}

export type ValuesSyncResult = {
  status: "succeeded" | "failed";
  sourcePostCount: number;
  itemCount: number;
  model: string | null;
  error: string | null;
};

export async function runValuesSync(): Promise<ValuesSyncResult> {
  try {
    const posts = await loadBlogCorpus();
    if (posts.length === 0) {
      throw new Error("No blog posts were available to synthesize values from.");
    }

    const synthesized = await synthesizeSiteValuesFromCorpus(posts);
    const doc: SiteValuesDoc = {
      ...synthesized,
      generatedAt: new Date().toISOString(),
      sourcePostCount: posts.length,
      sourcePostSlugs: posts.map((post) => post.slug),
    };

    await upsertSiteValues(doc);

    return {
      status: "succeeded",
      sourcePostCount: doc.sourcePostCount,
      itemCount: doc.items.length,
      model: doc.model,
      error: null,
    };
  } catch (error) {
    return {
      status: "failed",
      sourcePostCount: 0,
      itemCount: 0,
      model: null,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
