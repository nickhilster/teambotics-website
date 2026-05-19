import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminRoute';
import { getNeonClient } from '@/lib/neon';

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const client = await getNeonClient();
    const rows = await client.query(
      `SELECT id, slug, title, excerpt, author, tags, cover_image_url, status, published_at, created_at, updated_at
       FROM blog_posts
       ORDER BY updated_at DESC`,
    );
    const posts = Array.isArray(rows) ? rows : [];
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ error: 'Failed to load posts.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const { title, slug, excerpt, content, cover_image_url, author, tags, status } = body;

    if (!title || typeof title !== 'string' || !slug || typeof slug !== 'string') {
      return NextResponse.json({ error: 'title and slug are required.' }, { status: 400 });
    }

    const safeStatus = status === 'published' ? 'published' : 'draft';
    const publishedAt = safeStatus === 'published' ? new Date().toISOString() : null;
    const safeTags = Array.isArray(tags)
      ? tags
      : typeof tags === 'string'
        ? tags
            .split(',')
            .map((t: string) => t.trim())
            .filter(Boolean)
        : [];

    const client = await getNeonClient();
    const rows = await client.query(
      `INSERT INTO blog_posts (title, slug, excerpt, content, cover_image_url, author, tags, status, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        String(title).trim(),
        String(slug).trim().toLowerCase(),
        typeof excerpt === 'string' ? excerpt.trim() : '',
        typeof content === 'string' ? content.trim() : '',
        typeof cover_image_url === 'string' && cover_image_url.trim() ? cover_image_url.trim() : null,
        typeof author === 'string' && author.trim() ? author.trim() : 'Nikhil Khedkar',
        safeTags,
        safeStatus,
        publishedAt,
      ],
    );

    const post = Array.isArray(rows) ? rows[0] : null;
    return NextResponse.json({ ok: true, post }, { status: 201 });
  } catch (err) {
    const isDuplicate = err instanceof Error && err.message.includes('unique');
    return NextResponse.json(
      { error: isDuplicate ? 'A post with this slug already exists.' : 'Failed to create post.' },
      { status: isDuplicate ? 409 : 500 },
    );
  }
}
