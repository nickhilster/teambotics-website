/**
 * Seed a Teambotics blog post on AI platform data usage, training exclusions,
 * and the product-learning gap that remains for business users.
 *
 * Usage: pnpm tsx scripts/seed-blog-post-ai-data-usage.ts
 */
import { neon } from "@neondatabase/serverless";
import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();

function loadEnvFile(filename: string) {
  const filepath = path.join(repoRoot, filename);
  if (!fs.existsSync(filepath)) return;
  const content = fs.readFileSync(filepath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const sep = trimmed.indexOf("=");
    if (sep < 0) continue;
    const key = trimmed.slice(0, sep).trim();
    const value = trimmed.slice(sep + 1).trim().replace(/^["']|["']$/g, "");
    if (key && !process.env[key]) process.env[key] = value;
  }
}

[".env.local", ".env.production.local", ".env"].forEach(loadEnvFile);

function getConnectionString() {
  for (const key of ["NEON_DB_URL", "NEON_DATABASE_URL", "DATABASE_URL", "POSTGRES_URL"]) {
    const val = process.env[key]?.trim();
    if (val && !val.includes("placeholder") && !val.includes("your-")) return val;
  }
  throw new Error(
    "No Neon database connection string found. Set NEON_DB_URL or DATABASE_URL in .env.local"
  );
}

const POST = {
  title: "Training Exclusion Is Not Data Protection",
  slug: "training-exclusion-is-not-data-protection",
  excerpt:
    "Business AI plans often promise that customer data is not used for model training. That matters, but it does not answer the harder question: how much can a platform still learn from your work without training on it?",
  content: `## The Promise Is Narrower Than It Sounds

When an AI vendor says your business data is not used to train models, that is a meaningful promise. It reduces one important risk: your prompts, files, outputs, and internal work should not become part of the next general-purpose model by default.

But that sentence is not the same as saying your data is invisible, unprocessed, unlogged, or incapable of informing the product.

This distinction matters because operational teams are starting to move serious work into hosted AI platforms. They are not only asking generic questions. They are bringing product architecture, customer research, legal reasoning, sales strategy, workflow design, code context, procurement plans, internal documents, and emerging business ideas.

That material is not just content. It is operating signal.

A team using AI well exposes how it thinks. It shows what documents matter, where workflows break, what decisions require context, what features are missing, and which parts of work are painful enough that people keep trying to automate them.

Model training is only one way a platform can learn from that signal.

> [!KEY]
> A training exclusion limits model learning. It does not automatically eliminate product learning, safety processing, logging, or human access.

## There Are Multiple Kinds of Learning

Most AI privacy conversations collapse everything into one question: is the vendor training on my data?

That is too blunt. It misses the real architecture of modern AI platforms.

There are at least four different channels:

1. **Model training** — user content is used to train, fine-tune, or improve model weights.
2. **Safety and abuse monitoring** — content or metadata is processed to detect policy violations, fraud, misuse, security threats, or harmful behaviour.
3. **Product analytics** — usage patterns are analysed to understand what people do, where they fail, what they request, and what features are valuable.
4. **Human review and support access** — authorized personnel or contractors may access data for support, incident response, legal compliance, or abuse investigation.

These are not morally or legally identical. They carry different risks. They may be governed by different terms. They may use different technical systems. But for the customer, they can all feel like exposure.

OpenAI's enterprise privacy page, for example, states that business data is not used for model training by default, while also saying business data may be run through automated content classifiers and safety tools, including to better understand how services are used. It also describes limited human access for engineering support, abuse investigation, legal compliance, and specialized abuse-review contractors.

Anthropic's commercial terms say Anthropic may not train models on Customer Content from its commercial services and define Customer Content as the customer's confidential information. The same terms also say feedback may be used by Anthropic without obligation to the customer.

Those commitments matter. They are stronger than consumer defaults. But they still leave a practical question for builders: what can a platform learn from usage without technically training on customer content?

\`\`\`mermaid
graph LR
  A[User Work] --> B[Service Processing]
  B --> C[Safety Signals]
  B --> D[Usage Patterns]
  B --> E[Support Access]
  D --> F[Product Roadmap]
\`\`\`

The diagram is simple because the issue is simple. Your work can be excluded from model training and still generate operational signal.

## Feature Convergence Is Not Always Theft

There is a dangerous mistake on both sides of this debate.

The first mistake is assuming every new AI feature is evidence that a company copied a specific user. That is usually impossible to prove from the outside. Thousands of advanced users often discover the same needs at the same time because they are pushing against the same platform limits.

Projects, memory, connectors, agents, code execution, file retrieval, persistent instructions, workspace sharing, and admin controls were all predictable once people started using AI for real work instead of isolated prompts. Any serious product team watching usage patterns would see those needs.

The second mistake is pretending aggregate product learning is neutral just because it is not direct copying. It is not neutral. A platform with millions of users can observe unpaid experimentation at enormous scale. Power users invent workflows. Businesses test edge cases. Founders expose product opportunities. The platform turns recurring patterns into native features.

That may be legitimate product development. It may also create an asymmetry.

The user pays for the tool, does the experimentation, reveals the workflow, and receives no attribution when the platform turns the pattern into a feature. The company can say it did not copy any one customer. In many cases, that will be true. But the platform still captured the learning.

> [!WARNING]
> If your competitive advantage lives in your workflow design, not just your documents, raw chat privacy is not enough.

This is especially important for teams building AI products on top of AI platforms. If your internal conversations describe how to turn a generic model into a specialized operating system, you are not only sharing text. You are sharing product strategy.

## The Business Account Is Better, Not Magical

Business AI accounts are still the right move for serious work.

They usually provide stronger contractual terms, clearer admin controls, better data retention settings, stronger access governance, and training exclusions by default. They create a cleaner boundary between personal exploration and company operations.

That matters.

But a business account should not be treated as a zero-exposure vault. It is a hosted productivity platform. It processes data to provide the service. It may retain data depending on settings and legal obligations. It may generate safety metadata. Admins may have workspace-level access. Vendor personnel may have limited access under defined circumstances.

The right mental model is not paranoia. It is data minimization.

Use hosted AI for the work where the leverage is worth the exposure. Do not paste secrets, credentials, private keys, unpublished crown-jewel architecture, sensitive client data, or legally privileged material unless the contract, controls, and use case justify it.

The real governance question is not "Can we trust the vendor?" That question is too vague. The useful question is:

What level of processing, retention, access, and product-learning exposure are we willing to accept for this category of work?

## Build a Three-Layer AI Data Policy

Every operating team needs a simple internal classification system for AI use.

**Layer 1: Public and low-risk material.**
This includes website copy, public positioning, generic market research, published documentation, public product descriptions, and non-sensitive drafts. Hosted AI is appropriate here.

**Layer 2: Business working material.**
This includes strategy drafts, product specs, research synthesis, process documentation, proposals, customer-neutral workflow design, and internal operating notes. Use business workspaces, not personal accounts. Keep admin controls tight. Do not enable unnecessary external sharing.

**Layer 3: Crown jewels.**
This includes unpublished architecture, unique agent workflows, proprietary datasets, confidential client material, source-code secrets, legal-sensitive documents, acquisition plans, pricing strategy, and invention records before they are timestamped elsewhere. Keep this material in private repositories, controlled document systems, encrypted storage, or local environments. Bring only sanitized excerpts into hosted AI.

> [!TIP]
> Before using AI on a sensitive topic, classify the work first: public, business-working, or crown-jewel.

This is not bureaucracy. It is how you prevent convenience from becoming leakage.

The rule should be practical enough that people actually follow it. If the policy requires a legal review before every prompt, people will ignore it. If the policy says "use your judgment," people will overshare. Three layers is enough to create discipline without killing velocity.

## Feedback Is a Separate Risk Surface

There is one small behaviour teams often overlook: feedback.

Thumbs-up, thumbs-down, bug reports, support tickets, shared examples, and screenshots can fall into different handling categories from ordinary workspace content. Some vendor policies treat feedback as something the company can use more freely than customer content.

That makes sense from a product-development standpoint. Feedback exists to improve the product. But it also means teams should be careful when sending feedback from proprietary conversations.

If the model fails on a confidential architecture diagram, do not casually submit the whole exchange as feedback. If a prompt reveals your internal operating method, do not turn it into a support example unless you are comfortable with that disclosure.

Feedback should be treated like publication to the vendor.

## The Starting Point Is Governance, Not Withdrawal

The answer is not to stop using AI platforms. That would be a weak response to a powerful tool.

The answer is to use them with a sharper operating model.

Business accounts are the baseline. Personal accounts are not where serious company work belongs. Admin settings should be reviewed. Retention should be configured deliberately. Workspace access should be limited. Proprietary material should be summarized before being uploaded. Crown-jewel workflows should be documented in systems the company controls before being discussed inside hosted AI.

The goal is not perfect secrecy. Perfect secrecy kills collaboration and slows execution. The goal is controlled exposure.

AI platforms are becoming the workbench for modern knowledge work. That workbench will keep getting better because users keep revealing what they need. The teams that win will not be the ones that avoid the workbench. They will be the ones that understand what belongs on it, what belongs near it, and what should never leave the locked cabinet.

Start there. Create the three-layer policy. Move serious work into business accounts. Keep the crown jewels under your own control. Then use the platforms aggressively where the leverage is real and the exposure is acceptable.`,
  cover_image_url: null,
  author: "Nikhil Khedkar",
  tags: ["ai-governance", "data-privacy", "enterprise-ai", "product-strategy", "ai-ethics", "workflow-intelligence"],
  status: "published" as const,
  published_at: new Date("2026-07-03T23:30:00Z").toISOString(),
};

async function run() {
  const connectionString = getConnectionString();
  const sql = neon(connectionString);

  console.log(`Seeding blog post: ${POST.title}`);

  const existing = await sql`
    SELECT id FROM blog_posts WHERE slug = ${POST.slug} LIMIT 1
  `;

  if (existing.length > 0) {
    console.log(`  ⏭  Skipping "${POST.title}" (slug already exists)`);
    return;
  }

  await sql`
    INSERT INTO blog_posts (title, slug, excerpt, content, cover_image_url, author, tags, status, published_at)
    VALUES (
      ${POST.title},
      ${POST.slug},
      ${POST.excerpt},
      ${POST.content},
      ${POST.cover_image_url},
      ${POST.author},
      ${POST.tags},
      ${POST.status},
      ${POST.published_at}
    )
  `;

  console.log(`  ✓  Created "${POST.title}"`);
}

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
