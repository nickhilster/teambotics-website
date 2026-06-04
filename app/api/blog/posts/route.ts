import { NextResponse } from 'next/server';
import { getStaticBlogPostSummaries } from '@/lib/blog/staticPosts';
import { getNeonClient } from '@/lib/neon';
import { withNeonQueryRetry } from '@/lib/neonRetry';

export async function GET() {
  try {
    const rows = await withNeonQueryRetry(async () => {
      const client = await getNeonClient();
      return client.query(
        `SELECT id, slug, title, excerpt, author, tags, cover_image_url, published_at
         FROM blog_posts
         WHERE status = 'published'
         ORDER BY published_at DESC`,
      );
    });

    const dbPosts = Array.isArray(rows) ? rows : [];
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
