import fs from "node:fs";
import path from "node:path";
import { runGitHubIngestion } from "../lib/chat/githubIngestion";

const repoRoot = process.cwd();

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

runGitHubIngestion({ triggerType: "manual" })
  .then((result) => {
    console.log(
      `GitHub ingestion ${result.status}: ${result.documentCount} docs, ${result.embeddedCount} embedded, ${result.unchangedCount} unchanged, ${result.removedCount} removed.`,
    );
    if (result.errorSummary) {
      console.log(result.errorSummary);
    }
  })
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });