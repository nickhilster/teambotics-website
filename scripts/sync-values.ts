import fs from "node:fs";
import path from "node:path";
import { runValuesSync } from "../lib/values/synthesize";

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

runValuesSync()
  .then((result) => {
    if (result.status === "failed") {
      console.error(`Values sync failed: ${result.error}`);
      process.exitCode = 1;
      return;
    }

    console.log(
      `Values sync succeeded: ${result.itemCount} values from ${result.sourcePostCount} posts using ${result.model}.`,
    );
  })
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
