import { getStaticBlogPostSummaries } from '../data/static-posts.ts';
import { getExecutiveBlogPostSummaries } from '../data/executive-overrides.ts';

export type PostSummary = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  tags: string[];
  cover_image_url: string | null;
  published_at: string | null;
};

export async function getAllPosts(apiBase: string): Promise<PostSummary[]> {
  const overridePosts = getExecutiveBlogPostSummaries();
  const staticPosts = getStaticBlogPostSummaries();
  const preferredSlugs = new Set([...overridePosts, ...staticPosts].map((post) => post.slug));

  let apiPosts: PostSummary[] = [];
  try {
    const res = await fetch(`${apiBase}/api/blog/posts`);
    if (res.ok) {
      const data = (await res.json()) as { posts: PostSummary[] };
      apiPosts = data.posts ?? [];
    }
  } catch {
    apiPosts = [];
  }

  return [...overridePosts, ...staticPosts, ...apiPosts.filter((post) => !preferredSlugs.has(post.slug))].sort(
    (a, b) => new Date(b.published_at || 0).getTime() - new Date(a.published_at || 0).getTime(),
  );
}
