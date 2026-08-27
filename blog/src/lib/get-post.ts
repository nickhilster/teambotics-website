import { getStaticBlogPost } from '../data/static-posts.ts';
import { getExecutiveBlogPost } from '../data/executive-overrides.ts';

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  cover_image_url: string | null;
  published_at: string | null;
};

export function getApiBase(env: { SITE_API_BASE?: string; DEV: boolean }): string {
  return env.SITE_API_BASE ?? (env.DEV ? 'http://localhost:3000' : 'https://www.teambotics.app');
}

export async function resolvePostBySlug(
  slug: string,
  apiBase: string,
): Promise<{ post: Post | null; notFound: boolean; fetchError: string | null }> {
  let post: Post | null = getExecutiveBlogPost(slug) ?? getStaticBlogPost(slug);
  let fetchError: string | null = null;
  let notFound = false;

  if (!post) {
    try {
      const res = await fetch(`${apiBase}/api/blog/posts/${encodeURIComponent(slug)}`);
      if (res.status === 404) {
        notFound = true;
      } else if (!res.ok) {
        throw new Error(`API responded ${res.status}`);
      } else {
        const data = (await res.json()) as { post: Post };
        post = data.post ?? null;
        if (!post) notFound = true;
      }
    } catch (err) {
      fetchError = err instanceof Error ? err.message : 'Failed to load post.';
    }
  }

  return { post, notFound, fetchError };
}
