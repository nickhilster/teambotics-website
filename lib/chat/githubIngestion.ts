import { createHash, randomUUID } from "node:crypto";
import path from "node:path";
import { productCaseStudies } from "@/lib/products";
import { createEmbedding, getOpenAiRuntimeConfig } from "@/lib/chat/openai";
import { getNeonClient, toRows } from "@/lib/neon";

const MAX_FILES_PER_REPO = 40;
const MAX_FILE_BYTES = 200_000;
const DEFAULT_STALE_AFTER_DAYS = 2;

type GitHubRepoApiResponse = {
  default_branch?: string;
  name?: string;
};

type GitHubCommitApiResponse = {
  sha?: string;
};

type GitHubTreeApiResponse = {
  truncated?: boolean;
  tree?: Array<{
    path?: string;
    type?: string;
    size?: number;
  }>;
};

type GitHubContentApiResponse = {
  content?: string;
  encoding?: string;
  type?: string;
};

export type GitHubRepoTarget = {
  owner: string;
  repo: string;
  fullName: string;
  productSlug: string | null;
  route: string | null;
  label: string;
  sourceKey: string;
};

export type GitHubIngestionResult = {
  runId: string;
  status: "succeeded" | "partial" | "failed";
  triggerType: string;
  sourceCount: number;
  documentCount: number;
  embeddedCount: number;
  unchangedCount: number;
  removedCount: number;
  errorSummary: string | null;
};

type GitHubKnowledgeDocument = {
  documentKey: string;
  title: string;
  content: string;
  contentHash: string;
  metadata: Record<string, unknown>;
  sourceType: string;
};

function normalizeKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

const PRODUCT_SLUG_LOOKUP = new Map(
  productCaseStudies.flatMap((product) => [
    [normalizeKey(product.slug), product.slug],
    [normalizeKey(product.name), product.slug],
    [normalizeKey(product.name.replace(/\s+/g, "")), product.slug],
  ]),
);

function inferProductSlug(repo: string) {
  const normalized = normalizeKey(repo);
  return PRODUCT_SLUG_LOOKUP.get(normalized) ?? null;
}

function getProductLabel(productSlug: string | null, repo: string) {
  const product = productCaseStudies.find((entry) => entry.slug === productSlug);
  return product?.name ?? repo;
}

export function parseGitHubIngestRepos(value: string | undefined | null) {
  const entries = (value ?? "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

  return entries.map<GitHubRepoTarget>((entry) => {
    const [repoPart, explicitSlug] = entry.split(/[:=]/, 2).map((part) => part.trim());
    const [owner, repo] = repoPart.split("/").map((part) => part.trim());

    if (!owner || !repo) {
      throw new Error(`Invalid GITHUB_INGEST_REPOS entry: ${entry}`);
    }

    const productSlug = explicitSlug || inferProductSlug(repo);
    const label = `${getProductLabel(productSlug, repo)} GitHub knowledge`;

    return {
      owner,
      repo,
      fullName: `${owner}/${repo}`,
      productSlug,
      route: productSlug ? `/products/${productSlug}` : null,
      label,
      sourceKey: `github:${owner}/${repo}`,
    };
  });
}

function isExcludedPath(filePath: string) {
  const normalized = filePath.toLowerCase();
  return [
    "/node_modules/",
    "/dist/",
    "/build/",
    "/coverage/",
    "/.next/",
    "/vendor/",
    "/snapshots/",
    "/__snapshots__/",
    "/.git/",
  ].some((segment) => normalized.includes(segment));
}

function scoreGitHubKnowledgePath(filePath: string) {
  const normalized = filePath.toLowerCase();
  const basename = path.posix.basename(normalized);

  if (basename === "readme.md" || basename === "readme.mdx" || basename === "readme.txt") return 100;
  if (basename === "package.json") return 90;
  if (basename.startsWith("changelog")) return 80;
  if (normalized.startsWith("docs/")) return 75;
  if (normalized.includes("/docs/")) return 72;
  if (normalized.includes("spec") || normalized.includes("architecture")) return 68;
  if (normalized.includes("public") || normalized.includes("content")) return 64;
  if (/[.]mdx?$/.test(normalized) || /[.]txt$/.test(normalized) || /[.]rst$/.test(normalized)) return 56;
  if (basename === "package.json") return 50;
  return 0;
}

export function selectGitHubKnowledgeFiles(paths: Array<{ path: string; size?: number }>) {
  return paths
    .filter((entry) => {
      const normalized = entry.path.toLowerCase();
      const basename = path.posix.basename(normalized);
      const extension = path.posix.extname(normalized);

      if (!entry.path || isExcludedPath(`/${normalized}`)) {
        return false;
      }

      if ((entry.size ?? 0) > MAX_FILE_BYTES) {
        return false;
      }

      if ([".env", ".env.local", ".env.production", ".env.development"].includes(basename)) {
        return false;
      }

      if (["pnpm-lock.yaml", "package-lock.json", "yarn.lock"].includes(basename)) {
        return false;
      }

      if (basename === "package.json") {
        return true;
      }

      if ([".md", ".mdx", ".txt", ".rst", ".json"].includes(extension)) {
        return scoreGitHubKnowledgePath(entry.path) > 0;
      }

      return false;
    })
    .sort((left, right) => scoreGitHubKnowledgePath(right.path) - scoreGitHubKnowledgePath(left.path) || left.path.localeCompare(right.path))
    .slice(0, MAX_FILES_PER_REPO);
}

export function chunkGitHubKnowledgeContent(content: string, maxLength = 1800, overlap = 220) {
  const normalized = content.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  if (!normalized) {
    return [];
  }

  if (normalized.length <= maxLength) {
    return [normalized];
  }

  const chunks: string[] = [];
  let start = 0;

  while (start < normalized.length) {
    let end = Math.min(start + maxLength, normalized.length);
    if (end < normalized.length) {
      const newlineBreak = normalized.lastIndexOf("\n", end);
      const spaceBreak = normalized.lastIndexOf(" ", end);
      const candidate = Math.max(newlineBreak, spaceBreak);
      if (candidate > start + Math.floor(maxLength * 0.55)) {
        end = candidate;
      }
    }

    const chunk = normalized.slice(start, end).trim();
    if (chunk) {
      chunks.push(chunk);
    }

    if (end >= normalized.length) {
      break;
    }

    start = Math.max(end - overlap, start + 1);
  }

  return chunks;
}

function fingerprint(value: unknown) {
  return createHash("sha256").update(typeof value === "string" ? value : JSON.stringify(value)).digest("hex");
}

function normalizeGitHubFileContent(filePath: string, rawContent: string, repoTarget: GitHubRepoTarget) {
  const basename = path.posix.basename(filePath.toLowerCase());

  if (basename === "package.json") {
    try {
      const parsed = JSON.parse(rawContent) as {
        name?: string;
        description?: string;
        scripts?: Record<string, string>;
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
        keywords?: string[];
      };

      return [
        `Repository: ${repoTarget.fullName}`,
        `Package name: ${parsed.name ?? repoTarget.repo}`,
        parsed.description ? `Description: ${parsed.description}` : null,
        parsed.keywords?.length ? `Keywords: ${parsed.keywords.join(", ")}` : null,
        parsed.scripts ? `Scripts: ${Object.keys(parsed.scripts).join(", ")}` : null,
        parsed.dependencies ? `Dependencies: ${Object.keys(parsed.dependencies).slice(0, 20).join(", ")}` : null,
        parsed.devDependencies ? `Dev dependencies: ${Object.keys(parsed.devDependencies).slice(0, 20).join(", ")}` : null,
      ].filter(Boolean).join("\n");
    } catch {
      return rawContent;
    }
  }

  return rawContent;
}

async function fetchGitHubJson<T>(requestPath: string, token: string) {
  const response = await fetch(`https://api.github.com${requestPath}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "teambotics-ingestion",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`GitHub API request failed for ${requestPath}: ${response.status} ${errorText}`.trim());
  }

  return response.json() as Promise<T>;
}

async function fetchRepositoryHead(target: GitHubRepoTarget, token: string) {
  const repo = await fetchGitHubJson<GitHubRepoApiResponse>(`/repos/${target.fullName}`, token);
  const defaultBranch = repo.default_branch ?? "main";
  const commit = await fetchGitHubJson<GitHubCommitApiResponse>(`/repos/${target.fullName}/commits/${encodeURIComponent(defaultBranch)}`, token);

  if (!commit.sha) {
    throw new Error(`Unable to resolve head commit for ${target.fullName}.`);
  }

  return {
    defaultBranch,
    commitSha: commit.sha,
  };
}

async function fetchRepositoryTree(target: GitHubRepoTarget, token: string, ref: string) {
  const tree = await fetchGitHubJson<GitHubTreeApiResponse>(`/repos/${target.fullName}/git/trees/${encodeURIComponent(ref)}?recursive=1`, token);
  return tree.tree ?? [];
}

async function fetchRepositoryFileContent(target: GitHubRepoTarget, token: string, ref: string, filePath: string) {
  const response = await fetchGitHubJson<GitHubContentApiResponse>(
    `/repos/${target.fullName}/contents/${filePath.split("/").map(encodeURIComponent).join("/")}?ref=${encodeURIComponent(ref)}`,
    token,
  );

  if (response.type !== "file" || response.encoding !== "base64" || !response.content) {
    return null;
  }

  return Buffer.from(response.content.replace(/\n/g, ""), "base64").toString("utf8");
}

async function upsertGitHubSource(options: {
  sourceKey: string;
  label: string;
  sourceType: string;
  routeScope: string | null;
  documentCount: number;
  lastError: string | null;
}) {
  const sql = await getNeonClient();
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
      last_error,
      tags,
      updated_at
    ) VALUES ($1, $2, $3, $4, $5, true, $6, $7, $8, now(), $9, $10, now())
    ON CONFLICT (source_key) DO UPDATE
    SET name = excluded.name,
        label = excluded.label,
        source_type = excluded.source_type,
        route_scope = excluded.route_scope,
        document_count = excluded.document_count,
        stale_after_days = excluded.stale_after_days,
        last_ingested_at = excluded.last_ingested_at,
        last_error = excluded.last_error,
        tags = excluded.tags,
        updated_at = now()`,
    [
      options.sourceKey,
      options.sourceKey,
      options.label,
      options.label,
      options.sourceType,
      options.routeScope,
      options.documentCount,
      DEFAULT_STALE_AFTER_DAYS,
      options.lastError,
      ["github", options.sourceKey],
    ],
  );
}

function buildGitHubKnowledgeDocuments(
  target: GitHubRepoTarget,
  branch: string,
  commitSha: string,
  filePath: string,
  content: string,
) {
  const normalized = normalizeGitHubFileContent(filePath, content, target);
  const chunks = chunkGitHubKnowledgeContent(normalized);
  const sourceType = "product";

  return chunks.map<GitHubKnowledgeDocument>((chunk, index) => {
    const documentKey = `github:${target.fullName}:${filePath}#${index + 1}`;
    const titleBase = `${getProductLabel(target.productSlug, target.repo)} GitHub: ${filePath}`;
    const title = chunks.length > 1 ? `${titleBase} (chunk ${index + 1})` : titleBase;
    const metadata = {
      origin: "github",
      repo: target.fullName,
      branch,
      commitSha,
      filePath,
      title,
      route: target.route,
      sourceType,
      productSlug: target.productSlug,
      sourceKey: target.sourceKey,
    };

    return {
      documentKey,
      title,
      content: chunk,
      contentHash: fingerprint({ documentKey, chunk, metadata }),
      metadata,
      sourceType,
    };
  });
}

async function upsertGitHubDocuments(documents: GitHubKnowledgeDocument[]) {
  const sql = await getNeonClient();
  const openAiConfig = getOpenAiRuntimeConfig({});
  if (!openAiConfig.apiKey) {
    throw new Error("OPENAI_API_KEY is required for GitHub ingestion embeddings.");
  }

  let embeddedCount = 0;
  let unchangedCount = 0;

  for (const document of documents) {
    const existing = toRows<{ content_hash?: string }>(await sql.query(
      "SELECT content_hash FROM documents WHERE document_key = $1 LIMIT 1",
      [document.documentKey],
    ));

    if (existing[0]?.content_hash === document.contentHash) {
      unchangedCount += 1;
      continue;
    }

    const embedding = await createEmbedding(document.content, openAiConfig);
    if (!embedding) {
      throw new Error(`Embedding failed for ${document.documentKey}`);
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
      ) VALUES ($1, $2, $3, $4, $5::jsonb, $6::vector(1536), 'github', now())
      ON CONFLICT (document_key) DO UPDATE
      SET content = excluded.content,
          content_hash = excluded.content_hash,
          metadata = excluded.metadata,
          embedding = excluded.embedding,
          source = excluded.source,
          updated_at = now()`,
      [
        document.documentKey,
        document.documentKey,
        document.content,
        document.contentHash,
        JSON.stringify(document.metadata),
        `[${embedding.map((value) => Number(value).toFixed(8)).join(",")}]`,
      ],
    );

    embeddedCount += 1;
  }

  return { embeddedCount, unchangedCount };
}

async function removeMissingGitHubDocuments(target: GitHubRepoTarget, currentDocumentKeys: string[]) {
  const sql = await getNeonClient();
  const prefix = `github:${target.fullName}:%`;

  if (currentDocumentKeys.length === 0) {
    const rows = toRows(await sql.query(
      "DELETE FROM documents WHERE document_key LIKE $1 RETURNING document_key",
      [prefix],
    ));
    return rows.length;
  }

  const rows = toRows(await sql.query(
    "DELETE FROM documents WHERE document_key LIKE $1 AND NOT (document_key = ANY($2::text[])) RETURNING document_key",
    [prefix, currentDocumentKeys],
  ));
  return rows.length;
}

async function getExistingGitHubSnapshot(target: GitHubRepoTarget) {
  const sql = await getNeonClient();
  const rows = toRows<{ document_count?: string | number; commit_sha?: string | null }>(await sql.query(
    `SELECT COUNT(*) AS document_count, MAX(metadata->>'commitSha') AS commit_sha
     FROM documents
     WHERE document_key LIKE $1`,
    [`github:${target.fullName}:%`],
  ));

  return {
    documentCount: Number(rows[0]?.document_count ?? 0),
    commitSha: typeof rows[0]?.commit_sha === "string" ? rows[0].commit_sha : null,
  };
}

export async function runGitHubIngestion(options: { triggerType: string }) : Promise<GitHubIngestionResult> {
  const token = process.env.GITHUB_INGEST_TOKEN?.trim();
  if (!token) {
    throw new Error("GITHUB_INGEST_TOKEN is required for GitHub ingestion.");
  }

  const repos = parseGitHubIngestRepos(process.env.GITHUB_INGEST_REPOS);
  if (repos.length === 0) {
    throw new Error("GITHUB_INGEST_REPOS must list at least one owner/repo pair.");
  }

  await getNeonClient();

  const sql = await getNeonClient();
  const runId = randomUUID();
  await sql.query(
    `INSERT INTO chatbot_ingestion_runs (id, status, trigger_type, started_at)
     VALUES ($1, 'running', $2, now())`,
    [runId, options.triggerType],
  );

  let documentCount = 0;
  let embeddedCount = 0;
  let unchangedCount = 0;
  let removedCount = 0;
  const errors: string[] = [];

  for (const repo of repos) {
    try {
      const head = await fetchRepositoryHead(repo, token);
      const existingSnapshot = await getExistingGitHubSnapshot(repo);

      if (existingSnapshot.documentCount > 0 && existingSnapshot.commitSha === head.commitSha) {
        unchangedCount += existingSnapshot.documentCount;
        documentCount += existingSnapshot.documentCount;
        await upsertGitHubSource({
          sourceKey: repo.sourceKey,
          label: repo.label,
          sourceType: "product",
          routeScope: repo.route,
          documentCount: existingSnapshot.documentCount,
          lastError: null,
        });
        continue;
      }

      const tree = await fetchRepositoryTree(repo, token, head.defaultBranch);
      const selectedFiles = selectGitHubKnowledgeFiles(
        tree
          .filter((entry) => entry.type === "blob" && typeof entry.path === "string")
          .map((entry) => ({ path: String(entry.path), size: entry.size })),
      );

      const repoDocuments: GitHubKnowledgeDocument[] = [];
      for (const file of selectedFiles) {
        const content = await fetchRepositoryFileContent(repo, token, head.defaultBranch, file.path);
        if (!content) {
          continue;
        }

        repoDocuments.push(
          ...buildGitHubKnowledgeDocuments(repo, head.defaultBranch, head.commitSha, file.path, content),
        );
      }

      const upsertResult = await upsertGitHubDocuments(repoDocuments);
      const repoRemovedCount = await removeMissingGitHubDocuments(
        repo,
        repoDocuments.map((document) => document.documentKey),
      );

      embeddedCount += upsertResult.embeddedCount;
      unchangedCount += upsertResult.unchangedCount;
      removedCount += repoRemovedCount;
      documentCount += repoDocuments.length;

      await upsertGitHubSource({
        sourceKey: repo.sourceKey,
        label: repo.label,
        sourceType: "product",
        routeScope: repo.route,
        documentCount: repoDocuments.length,
        lastError: null,
      });
    } catch (error) {
      const message = `${repo.fullName}: ${error instanceof Error ? error.message : String(error)}`;
      errors.push(message);
      await upsertGitHubSource({
        sourceKey: repo.sourceKey,
        label: repo.label,
        sourceType: "product",
        routeScope: repo.route,
        documentCount: 0,
        lastError: message,
      });
    }
  }

  const status: GitHubIngestionResult["status"] = errors.length === 0
    ? "succeeded"
    : documentCount + embeddedCount + unchangedCount + removedCount > 0
      ? "partial"
      : "failed";
  const errorSummary = errors.length > 0 ? errors.join(" | ") : null;

  await sql.query(
    `UPDATE chatbot_ingestion_runs
     SET status = $2,
         completed_at = now(),
         source_count = $3,
         document_count = $4,
         embedded_count = $5,
         unchanged_count = $6,
         removed_count = $7,
         error_summary = $8
     WHERE id = $1`,
    [runId, status, repos.length, documentCount, embeddedCount, unchangedCount, removedCount, errorSummary],
  );

  return {
    runId,
    status,
    triggerType: options.triggerType,
    sourceCount: repos.length,
    documentCount,
    embeddedCount,
    unchangedCount,
    removedCount,
    errorSummary,
  };
}