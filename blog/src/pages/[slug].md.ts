import type { APIRoute } from 'astro';
import { getApiBase, resolvePostBySlug } from '../lib/get-post.ts';

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;
  if (!slug) {
    return new Response('Not found', { status: 404 });
  }

  const apiBase = getApiBase(import.meta.env);
  const { post, notFound } = await resolvePostBySlug(slug, apiBase);

  if (notFound || !post) {
    return new Response('Not found', { status: 404 });
  }

  const publishedDate = post.published_at
    ? new Date(post.published_at).toISOString().slice(0, 10)
    : 'unknown';

  const frontmatter = [
    `# ${post.title}`,
    '',
    `> ${post.excerpt}`,
    '',
    `**Author:** ${post.author}  `,
    `**Published:** ${publishedDate}  `,
    `**Tags:** ${post.tags.join(', ')}  `,
    `**Canonical URL:** https://blog.teambotics.app/${post.slug}`,
    '',
    '---',
    '',
  ].join('\n');

  const body = `${frontmatter}${post.content}\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
};
