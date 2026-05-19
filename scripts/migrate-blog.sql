-- Blog posts table for Teambotics blog.
-- Applied automatically via lib/neon.ts createSchema() on first API call.
-- Run manually in the Neon console as a fallback or for local development.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS blog_posts (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title           text        NOT NULL,
  slug            text        NOT NULL UNIQUE,
  excerpt         text        NOT NULL DEFAULT '',
  content         text        NOT NULL DEFAULT '',
  cover_image_url text,
  author          text        NOT NULL DEFAULT 'Nikhil Khedkar',
  tags            text[]      NOT NULL DEFAULT '{}',
  status          text        NOT NULL DEFAULT 'draft'
                    CHECK (status IN ('draft', 'published')),
  published_at    timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_blog_posts_slug
  ON blog_posts (slug);

CREATE INDEX IF NOT EXISTS idx_blog_posts_status
  ON blog_posts (status);

CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at
  ON blog_posts (published_at DESC);
