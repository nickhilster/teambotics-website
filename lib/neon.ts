import { Client } from '@neondatabase/serverless';
import { ChatbotDashboardSettings, ThemeDashboardSettings } from '../types/chatbotAdmin';

function getNeonConnectionString() {
  const url = process.env.NEON_DB_URL;
  if (!url) {
    throw new Error('NEON_DB_URL environment variable is required for Neon access.');
  }
  return url;
}

let client: Client | null = null;
let schemaReady: Promise<void> | null = null;

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
    similarityThreshold: 0.72,
    useConversationHistory: true,
    allowedSourceTypes: ['handbook', 'product', 'faq'],
    allowedRoutes: [],
  },
  prompt: {
    systemPromptTemplate: 'You are Teambotics Assistant. Help visitors with information about the company, products, and technology.',
    brandFraming: 'Focus on enterprise readiness, compliance, and frontline operations.',
    disallowedClaims: ['I am a lawyer', 'I am a doctor', 'I can access private systems'],
  },
  operations: {
    chatEnabled: true,
    rateLimitRequests: 20,
    rateLimitWindowMs: 60_000,
  },
  safety: {
    strictGrounding: false,
    minContextSimilarity: 0.72,
  },
  focus: {
    priorityTopics: ['about', 'projects', 'technology'],
    priorityRoles: ['product leader', 'operations leader', 'design leader'],
  },
};

const DEFAULT_THEME_SETTINGS: ThemeDashboardSettings = {
  defaultTheme: 'light',
  cursorScubaDiverEnabled: true,
  bubbleOverlayEnabled: true,
  heroMotionIntensity: 0.6,
  bubbleIntensity: 0.8,
  cursorReactionStrength: 0.9,
  animationEnabled: true,
};

async function createSchema() {
  const neonClient = getOrCreateNeonClient();

  await neonClient.query(`
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
    );

    CREATE TABLE IF NOT EXISTS chatbot_sources (
      id text PRIMARY KEY,
      name text NOT NULL,
      source_type text NOT NULL,
      enabled boolean NOT NULL DEFAULT true,
      tags text[] NOT NULL DEFAULT '{}',
      created_at timestamptz NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS chatbot_documents (
      id text PRIMARY KEY,
      source_type text NOT NULL,
      title text NOT NULL,
      route text,
      content text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    );

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
    );

    CREATE TABLE IF NOT EXISTS theme_settings (
      id text PRIMARY KEY,
      draft_settings jsonb NOT NULL,
      live_settings jsonb NOT NULL,
      updated_at timestamptz NOT NULL DEFAULT now()
    );
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
    client = new Client({ connectionString: getNeonConnectionString() });
  }
  return client;
}

export function getDefaultChatbotSettings() {
  return DEFAULT_CHATBOT_SETTINGS;
}

export function getDefaultThemeSettings() {
  return DEFAULT_THEME_SETTINGS;
}
