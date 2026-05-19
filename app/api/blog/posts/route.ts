import { NextResponse } from 'next/server';
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

    const posts = Array.isArray(rows) ? rows : [];
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ error: 'Failed to load posts.' }, { status: 500 });
  }
}
