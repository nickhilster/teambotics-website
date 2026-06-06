import { NextResponse } from 'next/server';
import { getStaticBlogPostSummaries } from '@/lib/blog/staticPosts';
import { getNeonClient, toRows } from '@/lib/neon';
import { withNeonQueryRetry } from '@/lib/neonRetry';

type DbBlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  tags: string[];
  cover_image_url: string | null;
  published_at: string;
};

export async function GET() {
  try {
    const result = await withNeonQueryRetry(async () => {
      const client = await getNeonClient();
      return client.query(
        `SELECT id, slug, title, excerpt, author, tags, cover_image_url, published_at
         FROM blog_posts
         WHERE status = 'published'
         ORDER BY published_at DESC`,
      );
    });

    const dbPosts = toRows<DbBlogPost>(result);
    const posts = [...getStaticBlogPostSummaries(), ...dbPosts].sort((a, b) => {
      const aDate = a.published_at ? Date.parse(a.published_at) : 0;
      const bDate = b.published_at ? Date.parse(b.published_at) : 0;
      return bDate - aDate;
    });

    return NextResponse.json({ posts });
  } catch {
    const posts = getStaticBlogPostSummaries();
    return NextResponse.json({ posts });
  }
}
