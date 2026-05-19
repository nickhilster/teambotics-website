import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminRoute';
import { getNeonClient } from '@/lib/neon';

type PostRow = {
  status: string;
  published_at: string | null;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  author: string;
};

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const { title, slug, excerpt, content, cover_image_url, author, tags, status } = body;

    const safeStatus = status === 'published' ? 'published' : 'draft';
    const safeTags = Array.isArray(tags)
      ? tags
      : typeof tags === 'string'
        ? tags
            .split(',')
            .map((t: string) => t.trim())
            .filter(Boolean)
        : [];

    const client = await getNeonClient();

    const existing = await client.query(
      `SELECT status, published_at, title, slug, excerpt, content, cover_image_url, author
       FROM blog_posts WHERE id = $1 LIMIT 1`,
      [id],
    );
    const current = (Array.isArray(existing) ? existing[0] : null) as PostRow | null;
    if (!current) {
      return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
    }

    // Preserve published_at when re-publishing; clear it when reverting to draft
    let publishedAt: string | null = current.published_at ?? null;
    if (safeStatus === 'published' && !publishedAt) {
      publishedAt = new Date().toISOString();
    } else if (safeStatus === 'draft') {
      publishedAt = null;
    }

    const rows = await client.query(
      `UPDATE blog_posts
       SET title = $1, slug = $2, excerpt = $3, content = $4,
           cover_image_url = $5, author = $6, tags = $7, status = $8,
           published_at = $9, updated_at = now()
       WHERE id = $10
       RETURNING *`,
      [
        title ? String(title).trim() : current.title,
        slug ? String(slug).trim().toLowerCase() : current.slug,
        excerpt !== undefined ? String(excerpt).trim() : current.excerpt,
        content !== undefined ? String(content).trim() : current.content,
        typeof cover_image_url === 'string' && cover_image_url.trim()
          ? cover_image_url.trim()
          : null,
        typeof author === 'string' && author.trim() ? author.trim() : current.author,
        safeTags,
        safeStatus,
        publishedAt,
        id,
      ],
    );

    const post = Array.isArray(rows) ? rows[0] : null;
    return NextResponse.json({ ok: true, post });
  } catch (err) {
    const isDuplicate = err instanceof Error && err.message.includes('unique');
    return NextResponse.json(
      { error: isDuplicate ? 'A post with this slug already exists.' : 'Failed to update post.' },
      { status: isDuplicate ? 409 : 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;

  try {
    const client = await getNeonClient();
    await client.query(`DELETE FROM blog_posts WHERE id = $1`, [id]);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete post.' }, { status: 500 });
  }
}
