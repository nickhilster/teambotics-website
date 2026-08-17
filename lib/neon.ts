import { neon } from '@neondatabase/serverless';
import { ChatbotDashboardSettings, ThemeDashboardSettings } from '../types/chatbotAdmin';

function getNeonConnectionString() {
  const url =
    process.env.NEON_DB_URL ??
    process.env.NEON_DATABASE_URL ??
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL;
  if (!url) {
    throw new Error('NEON_DB_URL, NEON_DATABASE_URL, DATABASE_URL, or POSTGRES_URL is required for Neon access.');
  }
  return url;
}

type NeonClient = ReturnType<typeof neon>;

let client: NeonClient | null = null;
let schemaReady: Promise<void> | null = null;

export function toRows<T extends Record<string, unknown> = Record<string, unknown>>(result: unknown): T[] {
  if (Array.isArray(result)) {
    return result as T[];
  }

  const maybeRows = (result as { rows?: unknown } | null)?.rows;
  return Array.isArray(maybeRows) ? maybeRows as T[] : [];
}

const DEFAULT_CHATBOT_SETTINGS: ChatbotDashboardSettings = {
  behavior: {
    assistantLabel: 'Teambotics Helper',
    personaLabel: 'Systems Lab Assistant',
    tone: 'professional',
    verbosity: 'balanced',
    voiceMode: 'assistant',
    ctaStyle: 'soft',
    uncertaintyStyle: 'soft',
  },
  model: {
    chatModel: 'gpt-4o-mini',
    embeddingModel: 'text-embedding-3-large',
    temperature: 0.4,
    maxTokens: 1000,
    fallbackModel: null,
  },
  retrieval: {
    enabled: true,
    topK: 4,
    similarityThreshold: 0.22,
    useConversationHistory: true,
    allowedSourceTypes: ['company', 'product', 'case-study', 'capability'],
    allowedRoutes: [],
  },
  prompt: {
    systemPromptTemplate: 'You are Teambotics Assistant. Answer only from approved Teambotics public source material and clearly say when the retrieved context is insufficient.',
    brandFraming: 'Focus on workflow strategy, compliance awareness, enablement, and frontline operations. Keep answers concise, sourced, and operationally clear.',
    disallowedClaims: ['I am a lawyer', 'I am a doctor', 'I can access private systems', 'I can confirm private client relationships'],
  },
  operations: {
    chatEnabled: true,
    rateLimitRequests: 20,
    rateLimitWindowMs: 60_000,
  },
  safety: {
    strictGrounding: true,
    minContextSimilarity: 0.28,
  },
  focus: {
    priorityTopics: ['about', 'projects', 'technology'],
    priorityRoles: ['product leader', 'operations leader', 'design leader'],
  },
};

const DEFAULT_THEME_SETTINGS: ThemeDashboardSettings = {
  defaultTheme: 'light',
  cursorScubaDiverEnabled: false,
  bubbleOverlayEnabled: false,
  heroMotionIntensity: 0.6,
  bubbleIntensity: 0.8,
  cursorReactionStrength: 0.9,
  animationEnabled: true,
};

async function createSchema() {
  const neonClient = getOrCreateNeonClient();

  await neonClient.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');
  await neonClient.query('CREATE EXTENSION IF NOT EXISTS vector');

  const schemaStatements = [
    `
    CREATE TABLE IF NOT EXISTS chatbot_config_versions (
      id text PRIMARY KEY,
      version_number integer NOT NULL,
      status text NOT NULL,
      label text NOT NULL,
      notes text,
      publish_note text,
      created_by text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now(),
      published_at timestamptz,
      settings jsonb NOT NULL
    )
    `,
    `
    CREATE UNIQUE INDEX IF NOT EXISTS idx_chatbot_single_draft
      ON chatbot_config_versions ((status))
      WHERE status = 'draft'
    `,
    `
    CREATE UNIQUE INDEX IF NOT EXISTS idx_chatbot_single_live
      ON chatbot_config_versions ((status))
      WHERE status = 'live'
    `,
    `
    CREATE TABLE IF NOT EXISTS documents (
      id text PRIMARY KEY,
      document_key text NOT NULL UNIQUE,
      content text NOT NULL,
      content_hash text,
      metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
      embedding vector(1536),
      source text,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    )
    `,
    `
    CREATE INDEX IF NOT EXISTS idx_documents_content_hash
      ON documents (content_hash)
    `,
    `
    CREATE INDEX IF NOT EXISTS idx_documents_source
      ON documents (source)
    `,
    `
    CREATE TABLE IF NOT EXISTS chatbot_sources (
      id text PRIMARY KEY,
      source_key text UNIQUE,
      name text,
      label text,
      source_type text NOT NULL,
      enabled boolean NOT NULL DEFAULT true,
      route_scope text,
      document_count integer,
      stale_after_days integer NOT NULL DEFAULT 30,
      last_ingested_at timestamptz,
      last_error text,
      tags text[] NOT NULL DEFAULT '{}',
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    )
    `,
    `
    CREATE INDEX IF NOT EXISTS idx_chatbot_sources_source_key
      ON chatbot_sources (source_key)
    `,
    `
    CREATE INDEX IF NOT EXISTS idx_chatbot_sources_enabled
      ON chatbot_sources (enabled)
    `,
    `
    CREATE TABLE IF NOT EXISTS tig_github_repos (
      id text PRIMARY KEY,
      repo_key text NOT NULL UNIQUE,
      owner text NOT NULL,
      repo text NOT NULL,
      full_name text NOT NULL UNIQUE,
      label text NOT NULL,
      enabled boolean NOT NULL DEFAULT true,
      notes text,
      last_synced_at timestamptz,
      last_error text,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    )
    `,
    `
    CREATE INDEX IF NOT EXISTS idx_tig_github_repos_enabled
      ON tig_github_repos (enabled)
    `,
    `
    CREATE TABLE IF NOT EXISTS chatbot_documents (
      id text PRIMARY KEY,
      source_type text NOT NULL,
      title text NOT NULL,
      route text,
      content text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    )
    `,
    `
    CREATE TABLE IF NOT EXISTS chatbot_ingestion_runs (
      id text PRIMARY KEY,
      started_at timestamptz NOT NULL DEFAULT now(),
      completed_at timestamptz,
      status text NOT NULL,
      trigger_type text NOT NULL,
      source_count integer,
      document_count integer,
      embedded_count integer,
      unchanged_count integer,
      removed_count integer,
      error_summary text
    )
    `,
    `
    CREATE TABLE IF NOT EXISTS chatbot_test_runs (
      id text PRIMARY KEY,
      config_version_id text,
      prompt text NOT NULL,
      response text NOT NULL,
      mode text NOT NULL,
      model text,
      latency_ms integer,
      sources jsonb NOT NULL DEFAULT '[]',
      created_at timestamptz NOT NULL DEFAULT now()
    )
    `,
    `
    CREATE TABLE IF NOT EXISTS chatbot_logs (
      id text PRIMARY KEY,
      conversation_id text NOT NULL,
      role text NOT NULL,
      content text NOT NULL,
      mode text NOT NULL,
      model text,
      retrieval_enabled boolean NOT NULL DEFAULT false,
      matched_sources jsonb NOT NULL DEFAULT '[]',
      latency_ms integer,
      error_code text,
      error_message text,
      created_at timestamptz NOT NULL DEFAULT now()
    )
    `,
    `
    CREATE TABLE IF NOT EXISTS leads (
      id text PRIMARY KEY,
      name text NOT NULL,
      email text NOT NULL,
      organization text,
      interest_area text,
      message text NOT NULL,
      page_path text,
      user_agent text,
      created_at timestamptz NOT NULL DEFAULT now()
    )
    `,
    `
    CREATE TABLE IF NOT EXISTS theme_settings (
      id text PRIMARY KEY,
      draft_settings jsonb NOT NULL,
      live_settings jsonb NOT NULL,
      updated_at timestamptz NOT NULL DEFAULT now()
    )
    `,
    `
    CREATE INDEX IF NOT EXISTS idx_chatbot_logs_created_at
      ON chatbot_logs (created_at DESC)
    `,
    `
    CREATE INDEX IF NOT EXISTS idx_chatbot_logs_error_code
      ON chatbot_logs (error_code)
    `,
    `
    CREATE INDEX IF NOT EXISTS idx_chatbot_ingestion_started_at
      ON chatbot_ingestion_runs (started_at DESC)
    `,
    `
    CREATE INDEX IF NOT EXISTS idx_leads_created_at
      ON leads (created_at DESC)
    `,
    `
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
    )
    `,
    `
    CREATE UNIQUE INDEX IF NOT EXISTS idx_blog_posts_slug
      ON blog_posts (slug)
    `,
    `
    CREATE INDEX IF NOT EXISTS idx_blog_posts_status
      ON blog_posts (status)
    `,
    `
    CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at
      ON blog_posts (published_at DESC)
    `,
    `
    CREATE TABLE IF NOT EXISTS site_values (
      id                  text        PRIMARY KEY,
      generated_at        timestamptz NOT NULL DEFAULT now(),
      model               text        NOT NULL,
      source_post_count   integer     NOT NULL DEFAULT 0,
      source_post_slugs   text[]      NOT NULL DEFAULT '{}',
      intro               text        NOT NULL DEFAULT '',
      agent_playbook      jsonb       NOT NULL DEFAULT '[]'::jsonb,
      items               jsonb       NOT NULL DEFAULT '[]'::jsonb,
      updated_at          timestamptz NOT NULL DEFAULT now()
    )
    `,
  ];

  for (const statement of schemaStatements) {
    await neonClient.query(statement);
  }

  await neonClient.query(`
    CREATE OR REPLACE FUNCTION public.match_documents(
      query_embedding vector(1536),
      match_threshold float,
      match_count int
    )
    RETURNS TABLE (
      id text,
      document_key text,
      content text,
      metadata jsonb,
      source text,
      similarity float
    )
    LANGUAGE sql
    STABLE
    AS $$
      SELECT
        documents.id,
        documents.document_key,
        documents.content,
        documents.metadata,
        documents.source,
        1 - (documents.embedding <=> query_embedding) AS similarity
      FROM documents
      WHERE documents.embedding IS NOT NULL
        AND 1 - (documents.embedding <=> query_embedding) > match_threshold
      ORDER BY documents.embedding <=> query_embedding
      LIMIT match_count;
    $$;
  `);
}

export async function getNeonClient() {
  const neonClient = getOrCreateNeonClient();
  if (!schemaReady) {
    schemaReady = createSchema();
  }
  await schemaReady;
  return neonClient;
}

function getOrCreateNeonClient() {
  if (!client) {
    client = neon(getNeonConnectionString());
  }
  return client;
}

export function getDefaultChatbotSettings() {
  return DEFAULT_CHATBOT_SETTINGS;
}

export function getDefaultThemeSettings() {
  return DEFAULT_THEME_SETTINGS;
}
