/**
 * Generates a new Teambotics blog post with copy and visuals authored as one piece.
 *
 * The output feels like it was developed by a single mind — the prose voice,
 * the structural rhythm, the diagrams, and the callouts are all part of the
 * same authorial act, not assembled from separate layers.
 *
 * Usage:
 *   pnpm tsx scripts/create-blog-post.ts "topic or brief"
 *   pnpm tsx scripts/create-blog-post.ts "topic" --dry-run   # print only, no DB write
 *   pnpm tsx scripts/create-blog-post.ts "topic" --draft     # save as draft instead of published
 *
 * Examples:
 *   pnpm tsx scripts/create-blog-post.ts "predictive maintenance using sensor data"
 *   pnpm tsx scripts/create-blog-post.ts "how to evaluate an LLM vendor for operational use"
 */

import Anthropic from '@anthropic-ai/sdk';
import { neon } from '@neondatabase/serverless';
import fs from 'node:fs';
import path from 'node:path';

// ── env loading ────────────────────────────────────────────────────────────────

function loadEnvFile(filename: string) {
  const filepath = path.join(process.cwd(), filename);
  if (!fs.existsSync(filepath)) return;
  for (const line of fs.readFileSync(filepath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const sep = trimmed.indexOf('=');
    if (sep < 0) continue;
    const key = trimmed.slice(0, sep).trim();
    const val = trimmed.slice(sep + 1).trim().replace(/^["']|["']$/g, '');
    if (key && !process.env[key]) process.env[key] = val;
  }
}
['.env.local', '.env.production.local', '.env'].forEach(loadEnvFile);

function getDbUrl(): string {
  for (const k of ['NEON_DB_URL', 'NEON_DATABASE_URL', 'DATABASE_URL', 'POSTGRES_URL']) {
    const v = process.env[k]?.trim();
    if (v && !v.includes('placeholder') && !v.includes('your-')) return v;
  }
  throw new Error('No Neon DB connection string. Set NEON_DB_URL in .env.local');
}

function getAnthropicKey(): string {
  const k = process.env.ANTHROPIC_API_KEY?.trim();
  if (k) return k;
  throw new Error('ANTHROPIC_API_KEY not set. Add it to .env.local');
}

// ── generation prompt ──────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are Nikhil Khedkar, founder of Teambotics — an applied AI and industrial automation company
working with operational and manufacturing teams. You write a blog that is read by plant managers,
operations leads, and engineering teams who are evaluating or deploying AI in real operational environments.

YOUR VOICE:
- Direct and confident. You state things, you do not hedge. "This works." Not "this might work."
- Operational, not academic. You write for people whose AI system failing means a line goes down.
- Zero hype. You acknowledge what AI cannot do as readily as what it can.
- Second person throughout. "Your team", "your environment", "you".
- You cite real frameworks, open-source projects, and tools by name, with enough context that a
  reader understands what they are and why they matter.
- Your examples are grounded in industrial and operational contexts: manufacturing, regulated industries,
  continuous operations, maintenance, quality, compliance.
- You respect the reader's time. Every sentence has a job.

POST STRUCTURE (follow this):
1. A lead section that states the problem or shift clearly and establishes why it matters now.
   Name the section as an H2 that captures the core tension.
2. 3–5 body sections, each as an H2, that build the argument, provide the technical depth,
   and give practical guidance. Alternate between conceptual and concrete.
3. A closing section that acknowledges what is still hard, sets realistic expectations, and
   ends with a clear starting point — not a vague call to action.

VISUAL ELEMENTS — these are native to how you write, not decorations:

\`\`\`mermaid
graph LR
  A[Step] --> B[Step] --> C[Outcome]
\`\`\`
Use when describing a multi-step process, system architecture, or agent workflow.
You write at most ONE diagram per post. Place it after the paragraph that describes the flow,
not before. Node labels are 1–4 words. Use LR for sequential flows, TD for hierarchies.

> [!KEY]
> The single most important idea from a section, as a crisp sentence under 25 words.

Use at most 2 KEY callouts per post. Place at the END of a section, before the next H2.
These are the moments you would underline if reading on paper.

> [!STAT]
> 87%
> reduction in unplanned downtime across early adopters

Use at most 1 STAT card per post. Only when a number truly earns emphasis — a metric that changes
how a reader thinks about the problem. Place immediately after the sentence containing the metric.

> [!WARNING]
> The specific thing that breaks and why.

Use at most 1 WARNING per post. For a non-obvious failure mode that most teams miss.

> [!TIP]
> The concrete next step, written as a direct instruction.

Use at most 1 TIP per post. Place in the practical/getting-started section.

TOTAL visual elements per post: 3–5. Restraint is the point. A post with 6 callouts has none.
Never place two visual elements back-to-back. At least one full paragraph between each.
Do not inject a visual inside a numbered list or bullet list.

POST METADATA to include at the very end of your response, after the post content, separated by ---:

TITLE: [the post title, punchy and specific, max 10 words]
SLUG: [kebab-case url slug]
EXCERPT: [2 sentences, the hook — what the post reveals and why it matters to an operational team]
TAGS: [4–6 tags, comma-separated, lowercase, hyphenated e.g. applied-ai, predictive-maintenance]

---

Now write a complete blog post on the topic the user provides. The post should be 1,200–1,800 words.
Write the copy and visuals as one unified act — the diagram and callouts emerge naturally from the
argument, they do not interrupt it.`;

// ── parsing ────────────────────────────────────────────────────────────────────

function parseOutput(raw: string): {
  content: string;
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
} {
  const parts = raw.split(/\n---\s*\n/);
  const content = parts[0]?.trim() ?? raw.trim();
  const meta = parts[1] ?? '';

  function extract(key: string): string {
    const match = meta.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
    return match?.[1]?.trim() ?? '';
  }

  const title = extract('TITLE').replace(/^\[|\]$/g, '');
  const slug = extract('SLUG')
    .replace(/^\[|\]$/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  const excerpt = extract('EXCERPT').replace(/^\[|\]$/g, '');
  const rawTags = extract('TAGS').replace(/^\[|\]$/g, '');
  const tags = rawTags
    .split(',')
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

  return { content, title, slug, excerpt, tags };
}

// ── main ───────────────────────────────────────────────────────────────────────

async function run() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const asDraft = args.includes('--draft');
  const topic = args.find((a) => !a.startsWith('--'));

  if (!topic) {
    console.error('Usage: pnpm tsx scripts/create-blog-post.ts "your topic or brief"');
    process.exit(1);
  }

  console.log(`\nGenerating post on: "${topic}"…`);

  const anthropic = new Anthropic({ apiKey: getAnthropicKey() });

  const response = await anthropic.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 8192,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: topic }],
  });

  const raw = response.content
    .filter((b) => b.type === 'text')
    .map((b) => (b as { type: 'text'; text: string }).text)
    .join('');

  const { content, title, slug, excerpt, tags } = parseOutput(raw);

  const counts = {
    mermaid: (content.match(/```mermaid/g) ?? []).length,
    key: (content.match(/\[!KEY\]/g) ?? []).length,
    stat: (content.match(/\[!STAT\]/g) ?? []).length,
    warning: (content.match(/\[!WARNING\]/g) ?? []).length,
    tip: (content.match(/\[!TIP\]/g) ?? []).length,
  };

  console.log(`\nTitle:   ${title}`);
  console.log(`Slug:    ${slug}`);
  console.log(`Excerpt: ${excerpt}`);
  console.log(`Tags:    ${tags.join(', ')}`);
  console.log(
    `Visuals: ${Object.entries(counts)
      .filter(([, v]) => v > 0)
      .map(([k, v]) => `${v}×${k}`)
      .join(', ') || 'none'}`,
  );
  console.log(`Words:   ~${content.split(/\s+/).length}`);

  if (dryRun) {
    console.log('\n── CONTENT PREVIEW ─────────────────────────────────────────────────\n');
    console.log(content.slice(0, 1200) + (content.length > 1200 ? '\n…[truncated]' : ''));
    console.log('\n[dry-run] No DB write.');
    return;
  }

  const sql = neon(getDbUrl());

  const existing = await sql`SELECT id FROM blog_posts WHERE slug = ${slug} LIMIT 1`;
  if (existing.length > 0) {
    console.error(`\nA post with slug "${slug}" already exists. Choose a different topic or rename manually.`);
    process.exit(1);
  }

  const status = asDraft ? 'draft' : 'published';
  const publishedAt = asDraft ? null : new Date().toISOString();

  await sql`
    INSERT INTO blog_posts (title, slug, excerpt, content, cover_image_url, author, tags, status, published_at)
    VALUES (
      ${title},
      ${slug},
      ${excerpt},
      ${content},
      ${null},
      ${'Nikhil Khedkar'},
      ${tags},
      ${status},
      ${publishedAt}
    )
  `;

  console.log(`\n✓ Post "${title}" saved as ${status}.`);
  if (status === 'published') {
    console.log(`  → blog.teambotics.app/${slug}`);
  }
}

run().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
