import { NextResponse } from 'next/server';
import { getNeonClient } from '@/lib/neon';
import { withNeonQueryRetry } from '@/lib/neonRetry';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  try {
    const rows = await withNeonQueryRetry(async () => {
      const client = await getNeonClient();
      return client.query(
        `SELECT id, slug, title, excerpt, content, author, tags, cover_image_url, published_at
         FROM blog_posts
         WHERE slug = $1 AND status = 'published'
         LIMIT 1`,
        [slug],
      );
    });

    const post = Array.isArray(rows) ? rows[0] : null;
    if (!post) {
      return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch {
    return NextResponse.json({ error: 'Failed to load post.' }, { status: 500 });
  }
}
