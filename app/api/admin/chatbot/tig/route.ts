import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminRoute";
import { getNeonClient, toRows } from "@/lib/neon";
import type { TigGithubRepo } from "@/types/chatbotAdmin";

type TigRepoRow = {
  id: string;
  repo_key: string;
  owner: string;
  repo: string;
  full_name: string;
  label: string;
  enabled: boolean;
  notes: string | null;
  last_synced_at: string | null;
  last_error: string | null;
};

function mapRepo(row: Record<string, unknown>): TigGithubRepo {
  return {
    id: String(row.id),
    repoKey: String(row.repo_key ?? row.id),
    owner: String(row.owner ?? ""),
    repo: String(row.repo ?? ""),
    fullName: String(row.full_name ?? `${row.owner}/${row.repo}`),
    label: String(row.label ?? row.full_name ?? "GitHub repo"),
    enabled: Boolean(row.enabled),
    notes: row.notes ? String(row.notes) : null,
    lastSyncedAt: row.last_synced_at ? String(row.last_synced_at) : null,
    lastError: row.last_error ? String(row.last_error) : null,
  };
}

async function ensureSeedRepos() {
  const client = await getNeonClient();
  const defaults = [
    "headroomlabs-ai/headroom",
    "Graphify-Labs/graphify",
    "Leonxlnx/agentic-ai-prompt-research",
    "msitarzewski/agency-agents",
  ];

  for (const fullName of defaults) {
    const [owner, repo] = fullName.split("/");
    await client.query(
      `INSERT INTO tig_github_repos (
        id, repo_key, owner, repo, full_name, label, enabled, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, true, now())
      ON CONFLICT (repo_key) DO NOTHING`,
      [
        `tig:${fullName}`,
        `tig:${fullName}`,
        owner,
        repo,
        fullName,
        `${repo} GitHub knowledge`,
      ],
    );
  }
}

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  await ensureSeedRepos();
  const client = await getNeonClient();
  const rows = toRows<TigRepoRow>(await client.query("SELECT * FROM tig_github_repos ORDER BY created_at ASC"));

  return NextResponse.json({
    repos: rows.map((row) => mapRepo(row as Record<string, unknown>)),
  });
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);
  const fullName = typeof body?.fullName === "string" ? body.fullName.trim() : "";
  const notes = typeof body?.notes === "string" ? body.notes.trim() : null;

  if (!fullName || !fullName.includes("/")) {
    return NextResponse.json({ ok: false, error: "fullName is required." }, { status: 400 });
  }

  const [owner, repo] = fullName.split("/").map((part: string) => part.trim());
  if (!owner || !repo) {
    return NextResponse.json({ ok: false, error: "fullName must use owner/repo." }, { status: 400 });
  }

  const client = await getNeonClient();
  const id = `tig:${fullName}`;
  await client.query(
    `INSERT INTO tig_github_repos (
      id, repo_key, owner, repo, full_name, label, enabled, notes, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, true, $7, now())
    ON CONFLICT (repo_key) DO UPDATE
    SET owner = excluded.owner,
        repo = excluded.repo,
        full_name = excluded.full_name,
        label = excluded.label,
        notes = excluded.notes,
        enabled = true,
        updated_at = now()
    RETURNING *`,
    [id, id, owner, repo, fullName, `${repo} GitHub knowledge`, notes],
  );

  const rows = toRows<TigRepoRow>(await client.query("SELECT * FROM tig_github_repos WHERE repo_key = $1 LIMIT 1", [id]));
  return NextResponse.json({ ok: true, repo: rows[0] ? mapRepo(rows[0] as Record<string, unknown>) : null });
}

export async function PATCH(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);
  const repoKey = typeof body?.repoKey === "string" ? body.repoKey.trim() : "";
  const enabled = typeof body?.enabled === "boolean" ? body.enabled : null;

  if (!repoKey || enabled === null) {
    return NextResponse.json({ ok: false, error: "repoKey and enabled are required." }, { status: 400 });
  }

  const client = await getNeonClient();
  const rows = toRows<TigRepoRow>(await client.query(
    `UPDATE tig_github_repos
     SET enabled = $1, updated_at = now()
     WHERE repo_key = $2
     RETURNING *`,
    [enabled, repoKey],
  ));

  return NextResponse.json({ ok: true, repo: rows[0] ? mapRepo(rows[0] as Record<string, unknown>) : null });
}

export async function DELETE(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);
  const repoKey = typeof body?.repoKey === "string" ? body.repoKey.trim() : "";
  if (!repoKey) {
    return NextResponse.json({ ok: false, error: "repoKey is required." }, { status: 400 });
  }

  const client = await getNeonClient();
  await client.query("DELETE FROM tig_github_repos WHERE repo_key = $1", [repoKey]);
  return NextResponse.json({ ok: true });
}
