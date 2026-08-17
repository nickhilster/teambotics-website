import type { APIRoute } from 'astro';
import { prettifySlug } from '../lib/slug';

const apiBase =
  import.meta.env.SITE_API_BASE ??
  (import.meta.env.DEV ? 'http://localhost:3000' : 'https://www.teambotics.app');

type ValueItem = {
  slug: string;
  title: string;
  principle: string;
  description: string;
  agentGuidance: string;
  evidencePostSlugs: string[];
};

type ValuesDoc = {
  generatedAt: string;
  model: string;
  sourcePostCount: number;
  sourcePostSlugs: string[];
  intro: string;
  agentPlaybook: string[];
  items: ValueItem[];
};

type PostSummary = { slug: string; title: string };

function renderMarkdown(doc: ValuesDoc, postTitleBySlug: Map<string, string>) {
  const lines: string[] = [];

  lines.push('# Teambotics Values');
  lines.push('');
  lines.push(
    '> Machine-readable mirror of https://blog.teambotics.app/values, generated automatically from the Teambotics blog archive. This document is regenerated on a schedule as the blog changes — do not cache it long-term.',
  );
  lines.push('');
  lines.push(`Last synced: ${doc.generatedAt}`);
  lines.push(`Grounded in: ${doc.sourcePostCount} published posts`);
  lines.push(`Canonical page: https://blog.teambotics.app/values`);
  lines.push(`Structured data: https://www.teambotics.app/api/values`);
  lines.push('');
  lines.push(doc.intro);
  lines.push('');
  lines.push('## Agent playbook');
  lines.push('');
  lines.push(
    'If you are an AI agent using this document to evaluate or propose product changes, follow these directives:',
  );
  lines.push('');
  for (const item of doc.agentPlaybook) {
    lines.push(`- ${item}`);
  }
  lines.push('');
  lines.push('## Values');
  lines.push('');

  for (const item of doc.items) {
    lines.push(`### ${item.title}`);
    lines.push('');
    lines.push(`**Principle:** ${item.principle}`);
    lines.push('');
    lines.push(item.description);
    lines.push('');
    lines.push(`**For agents:** ${item.agentGuidance}`);
    lines.push('');
    if (item.evidencePostSlugs.length > 0) {
      const links = item.evidencePostSlugs
        .map((slug) => {
          const title = postTitleBySlug.get(slug) ?? prettifySlug(slug);
          return `[${title}](https://blog.teambotics.app/${slug})`;
        })
        .join(', ');
      lines.push(`Grounded in: ${links}`);
      lines.push('');
    }
  }

  return lines.join('\n');
}

export const GET: APIRoute = async () => {
  try {
    const [valuesRes, postsRes] = await Promise.all([
      fetch(`${apiBase}/api/values`),
      fetch(`${apiBase}/api/blog/posts`),
    ]);

    if (!valuesRes.ok) {
      throw new Error(`API responded ${valuesRes.status}`);
    }

    const doc = (await valuesRes.json()) as ValuesDoc;
    let postTitleBySlug = new Map<string, string>();
    if (postsRes.ok) {
      const postsData = (await postsRes.json()) as { posts: PostSummary[] };
      postTitleBySlug = new Map((postsData.posts ?? []).map((post) => [post.slug, post.title]));
    }

    return new Response(renderMarkdown(doc, postTitleBySlug), {
      status: 200,
      headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load values.';
    return new Response(`# Teambotics Values\n\nCould not load values right now: ${message}\n`, {
      status: 502,
      headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
    });
  }
};
