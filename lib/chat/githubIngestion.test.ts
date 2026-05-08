import { describe, expect, it } from "vitest";
import {
  chunkGitHubKnowledgeContent,
  parseGitHubIngestRepos,
  selectGitHubKnowledgeFiles,
} from "@/lib/chat/githubIngestion";

describe("GitHub ingestion helpers", () => {
  it("parses repo config and infers product routes", () => {
    const repos = parseGitHubIngestRepos("owner/ltb-buddy,owner/easybuddy");

    expect(repos).toHaveLength(2);
    expect(repos[0]).toMatchObject({
      fullName: "owner/ltb-buddy",
      productSlug: "ltb-buddy",
      route: "/products/ltb-buddy",
    });
    expect(repos[1]).toMatchObject({
      fullName: "owner/easybuddy",
      productSlug: "easybuddy",
      route: "/products/easybuddy",
    });
  });

  it("keeps high-signal knowledge files and excludes low-signal ones", () => {
    const selected = selectGitHubKnowledgeFiles([
      { path: "README.md", size: 1200 },
      { path: "docs/architecture.md", size: 2400 },
      { path: "package.json", size: 500 },
      { path: ".env", size: 20 },
      { path: "pnpm-lock.yaml", size: 6000 },
      { path: "dist/bundle.js", size: 12000 },
    ]);

    expect(selected.map((entry) => entry.path)).toEqual([
      "README.md",
      "package.json",
      "docs/architecture.md",
    ]);
  });

  it("chunks long content into overlapping segments", () => {
    const content = Array.from({ length: 120 }, (_, index) => `Paragraph ${index} about workflow and documentation.`).join("\n\n");
    const chunks = chunkGitHubKnowledgeContent(content, 240, 40);

    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks[0]?.length).toBeLessThanOrEqual(240);
    expect(chunks.at(-1)).toContain("Paragraph 119");
  });
});