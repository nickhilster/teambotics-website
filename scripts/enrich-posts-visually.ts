/**
 * Retroactively enriches existing blog posts with visual storytelling elements.
 *
 * Uses OpenAI to inject Mermaid diagrams, callout blocks, and stat cards into
 * the post markdown without rewriting the author's prose. The goal is for the
 * visuals to feel like they were authored alongside the copy, not bolted on.
 *
 * Usage:
 *   pnpm tsx scripts/enrich-posts-visually.ts            # all published posts
 *   pnpm tsx scripts/enrich-posts-visually.ts --slug agentic-ai-beyond-chatbots
 *   pnpm tsx scripts/enrich-posts-visually.ts --dry-run  # preview only, no DB writes
 */

import OpenAI from 'openai';
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
  throw new Error('No Neon DB connection string found. Set NEON_DB_URL in .env.local');
}

function getOpenAiKey(): string {
  const k = process.env.OPENAI_API_KEY?.trim();
  if (k) return k;
  throw new Error('OPENAI_API_KEY not set. Add it to .env.local');
}

// ── system prompt ──────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a senior editor at Teambotics — an applied AI and industrial automation company.
Your task is to enrich existing blog posts by weaving in visual markdown elements that make the narrative
more powerful and memorable. You are NOT rewriting, summarising, or improving the prose. Every word of the
original post must remain exactly as written. You are only inserting new visual elements at precisely chosen
moments.

TEAMBOTICS BRAND VOICE (what you are preserving):
- Direct, operational, zero hype. Writes for plant managers and engineering leads, not tech journalists.
- Confident assertions. Uses "is" not "might be". Second person ("your team", "you").
- Cites real frameworks and open-source projects with context.
- Acknowledges limits honestly. Does not oversell AI.
- Structured: clear H2 headers, numbered steps for sequences, bullets for parallel items.
- Examples are grounded in industrial/operational contexts.

VISUAL ELEMENTS AVAILABLE:

1. Mermaid flow diagram — for multi-step processes, system architectures, or agent workflows:
\`\`\`mermaid
graph LR
  A[Input] --> B[Process] --> C[Output]
\`\`\`
Use TD (top-down) for hierarchies, LR (left-right) for flows and pipelines.
Node labels should be short (1-4 words). Use square brackets for steps, round for decisions.

2. Key insight callout — for the ONE most important idea in a section (the "if you remember one thing" moment):
> [!KEY]
> The insight, written as a single crisp sentence. Max 25 words.

3. Stat card — when a compelling number exists in the prose, make it land harder:
> [!STAT]
> 2.5–4 hours
> of skilled time per submission cycle, replaced by minutes

4. Warning callout — for genuine failure modes or non-obvious risks:
> [!WARNING]
> What specifically breaks or fails and why.

5. Tip callout — for the single most actionable piece of practical advice in the post:
> [!TIP]
> The concrete next step, written as an instruction.

INJECTION RULES (strict):
- Max 1 Mermaid diagram per post
- Max 2 [!KEY] callouts per post
- Max 1 [!STAT] card per post
- Max 1 [!WARNING] callout per post
- Max 1 [!TIP] callout per post
- Total visual elements: 3–5. Do not inject more. Restraint is the point.
- Never place two visual elements back-to-back. At least one full paragraph between them.
- Diagrams: insert AFTER the paragraph that describes the process, not before.
- [!KEY] callouts: insert at the END of the section they summarise, before the next H2.
- [!STAT] cards: insert immediately AFTER the sentence containing the metric.
- [!WARNING]: insert after the paragraph describing the failure mode.
- [!TIP]: insert at the end of the practical/getting-started section.
- Do not inject a visual inside a numbered list or bullet list.
- If a section has no natural visual moment, leave it alone.

OUTPUT: Return ONLY the enriched markdown. No preamble, no explanation, no commentary.
The first character of your response must be the first character of the original post content.`;

// ── enrichment ─────────────────────────────────────────────────────────────────

async function enrichPost(
  client: OpenAI,
  post: { id: string; title: string; slug: string; content: string },
  dryRun: boolean,
  sql: ReturnType<typeof neon>,
) {
  console.log(`\n  Processing: "${post.title}" (${post.slug})`);

  const response = await client.chat.completions.create({
    model: 'gpt-4o',
    max_tokens: 8192,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Enrich this blog post with visual elements. Remember: preserve every word of the original prose exactly.\n\n---\n\n${post.content}`,
      },
    ],
  });

  const enriched = response.choices[0]?.message?.content ?? '';

  // Count injected elements for transparency
  const counts = {
    mermaid: (enriched.match(/```mermaid/g) ?? []).length,
    key: (enriched.match(/\[!KEY\]/g) ?? []).length,
    stat: (enriched.match(/\[!STAT\]/g) ?? []).length,
    warning: (enriched.match(/\[!WARNING\]/g) ?? []).length,
    tip: (enriched.match(/\[!TIP\]/g) ?? []).length,
  };

  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  console.log(
    `    Injected ${total} element(s):`,
    Object.entries(counts)
      .filter(([, v]) => v > 0)
      .map(([k, v]) => `${v}×${k}`)
      .join(', '),
  );

  if (dryRun) {
    console.log('    [dry-run] Skipping DB write.');
    return;
  }

  await sql`
    UPDATE blog_posts
    SET content = ${enriched}, updated_at = now()
    WHERE id = ${post.id}
  `;
  console.log('    ✓ Updated in DB.');
}

// ── main ───────────────────────────────────────────────────────────────────────

async function run() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const slugArg = args.find((_, i) => args[i - 1] === '--slug') ?? args.find((a) => !a.startsWith('--'));

  const sql = neon(getDbUrl());
  const anthropic = new OpenAI({ apiKey: getOpenAiKey() });

  let posts: Array<{ id: string; title: string; slug: string; content: string }>;

  if (slugArg && !slugArg.startsWith('--')) {
    posts = await sql`
      SELECT id, title, slug, content FROM blog_posts
      WHERE slug = ${slugArg} AND status = 'published'
    ` as typeof posts;
    if (posts.length === 0) {
      console.error(`No published post found with slug: ${slugArg}`);
      process.exit(1);
    }
  } else {
    posts = await sql`
      SELECT id, title, slug, content FROM blog_posts
      WHERE status = 'published'
      ORDER BY published_at ASC
    ` as typeof posts;
  }

  console.log(`\nEnriching ${posts.length} post(s)${dryRun ? ' [DRY RUN]' : ''}…`);

  for (const post of posts) {
    try {
      await enrichPost(anthropic, post, dryRun, sql);
      // Brief pause between posts to be respectful of rate limits
      await new Promise((r) => setTimeout(r, 1000));
    } catch (err) {
      console.error(`  ✗ Failed "${post.title}":`, err instanceof Error ? err.message : err);
    }
  }

  console.log('\nDone.');
}

run().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
