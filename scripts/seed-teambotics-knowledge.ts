import fs from "node:fs";
import path from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { buildTeamboticsKnowledgeDocuments } from "../lib/chat/knowledge";
import { createEmbedding, getOpenAiRuntimeConfig } from "../lib/chat/openai";
import { KNOWN_SOURCE_GROUPS } from "../lib/chat/sources";
import { getNeonClient, toRows } from "../lib/neon";

const repoRoot = process.cwd();
const isDryRun = process.argv.includes("--dry-run");

function loadEnvFile(filename: string) {
  const filepath = path.join(repoRoot, filename);
  if (!fs.existsSync(filepath)) {
    return;
  }

  const content = fs.readFileSync(filepath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separator = trimmed.indexOf("=");
    if (separator < 0) {
      continue;
    }

    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
}

[".env.local", ".env.production.local", ".env"].forEach(loadEnvFile);

function readRequiredEnvAny(...names: string[]) {
  for (const name of names) {
    const value = process.env[name]?.trim();
    if (value && !value.includes("placeholder") && !value.includes("your-")) {
      return value;
    }
  }

  throw new Error(`${names.join(" or ")} is required before seeding the knowledge base.`);
}

function fingerprint(value: unknown) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

async function main() {
  const documents = buildTeamboticsKnowledgeDocuments();

  if (isDryRun) {
    console.log(`Knowledge base dry run: ${documents.length} documents ready.`);
    console.log(documents.map((document) => `- ${document.id}: ${document.title}`).join("\n"));
    return;
  }

  readRequiredEnvAny("NEON_DB_URL", "NEON_DATABASE_URL", "DATABASE_URL", "POSTGRES_URL");
  const openAiConfig = getOpenAiRuntimeConfig({
    chatModel: process.env.OPENAI_CHAT_MODEL,
    embeddingModel: process.env.OPENAI_EMBEDDING_MODEL,
  });

  if (!openAiConfig.apiKey) {
    throw new Error("OPENAI_API_KEY is required before seeding embeddings.");
  }

  const sql = await getNeonClient();
  const runId = randomUUID();
  await sql.query(
    `INSERT INTO chatbot_ingestion_runs (id, status, trigger_type, started_at)
     VALUES ($1, 'running', 'seed', now())`,
    [runId],
  );

  let embeddedCount = 0;
  let unchangedCount = 0;

  try {
    for (const document of documents) {
      const contentHash = fingerprint(document);
      const existing = toRows<{ content_hash?: string }>(await sql.query(
        "SELECT content_hash FROM documents WHERE document_key = $1 LIMIT 1",
        [document.id],
      ));

      if (existing[0]?.content_hash === contentHash) {
        unchangedCount += 1;
        console.log(`SKIP  ${document.id}`);
        continue;
      }

      console.log(`EMBED ${document.id}`);
      const embedding = await createEmbedding(document.content, openAiConfig);
      if (!embedding) {
        throw new Error(`Embedding failed for ${document.id}`);
      }

      await sql.query(
        `INSERT INTO documents (
          id,
          document_key,
          content,
          content_hash,
          metadata,
          embedding,
          source,
          updated_at
        ) VALUES ($1, $2, $3, $4, $5::jsonb, $6::vector(1536), $7, now())
        ON CONFLICT (document_key) DO UPDATE
        SET content = excluded.content,
            content_hash = excluded.content_hash,
            metadata = excluded.metadata,
            embedding = excluded.embedding,
            source = excluded.source,
            updated_at = now()`,
        [
          document.id,
          document.id,
          document.content,
          contentHash,
          JSON.stringify({
            ...document.metadata,
            title: document.title,
            route: document.route ?? null,
            sourceKey: document.sourceKey,
            sourceType: document.sourceType,
          }),
          `[${embedding.map((value) => Number(value).toFixed(8)).join(",")}]`,
          document.sourceType,
        ],
      );
      embeddedCount += 1;
    }

    for (const source of KNOWN_SOURCE_GROUPS) {
      const documentCount = documents.filter((document) => document.sourceType === source.sourceType).length;
      await sql.query(
        `INSERT INTO chatbot_sources (
          id,
          source_key,
          name,
          label,
          source_type,
          enabled,
          route_scope,
          document_count,
          stale_after_days,
          last_ingested_at,
          updated_at
        ) VALUES ($1, $2, $3, $4, $5, true, $6, $7, $8, now(), now())
        ON CONFLICT (source_key) DO UPDATE
        SET label = excluded.label,
            name = excluded.name,
            source_type = excluded.source_type,
            route_scope = excluded.route_scope,
            document_count = excluded.document_count,
            stale_after_days = excluded.stale_after_days,
            last_ingested_at = now(),
            updated_at = now(),
            last_error = null`,
        [
          source.sourceKey,
          source.sourceKey,
          source.label,
          source.label,
          source.sourceType,
          source.routeScope,
          documentCount,
          source.staleAfterDays,
        ],
      );
    }

    await sql.query(
      `UPDATE chatbot_ingestion_runs
       SET status = 'succeeded',
           completed_at = now(),
           source_count = $2,
           document_count = $3,
           embedded_count = $4,
           unchanged_count = $5,
           removed_count = 0
       WHERE id = $1`,
      [runId, KNOWN_SOURCE_GROUPS.length, documents.length, embeddedCount, unchangedCount],
    );

    console.log(`Seeded ${documents.length} Teambotics documents. ${embeddedCount} embedded, ${unchangedCount} unchanged.`);
  } catch (error) {
    await sql.query(
      `UPDATE chatbot_ingestion_runs
       SET status = 'failed',
           completed_at = now(),
           error_summary = $2
       WHERE id = $1`,
      [runId, error instanceof Error ? error.message : String(error)],
    );
    throw error;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
