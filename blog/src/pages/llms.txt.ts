import type { APIRoute } from 'astro';
import { getApiBase } from '../lib/get-post.ts';
import { getAllPosts } from '../lib/get-all-posts.ts';

export const GET: APIRoute = async () => {
  const apiBase = getApiBase(import.meta.env);
  const posts = await getAllPosts(apiBase);

  const lines = [
    '# Teambotics Blog',
    '',
    '> Operational insight for teams turning AI into dependable work: field notes, implementation',
    '> patterns, and pragmatic guidance for automation programs that need to survive contact with',
    '> real operations.',
    '',
    '## Pages',
    '',
    '- [Teambotics Values](https://blog.teambotics.app/values.md): The values evidenced across the Teambotics blog archive, with agent guidance for evaluating product changes.',
    '',
    '## Posts',
    '',
    ...posts.map(
      (post) => `- [${post.title}](https://blog.teambotics.app/${post.slug}.md): ${post.excerpt}`,
    ),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
