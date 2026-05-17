import { spawn } from "node:child_process";
import { watch } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const watchedPaths = [
  path.join(repoRoot, "lib", "i18n", "siteMessages.source.ts"),
  path.join(repoRoot, "lib", "products.ts"),
];

let running = false;
let queued = false;

function runSync() {
  if (running) {
    queued = true;
    return;
  }

  running = true;
  const child = spawn("pnpm", ["translations:sync"], {
    cwd: repoRoot,
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  child.on("exit", (code) => {
    running = false;

    if (code !== 0) {
      console.error(`translations:sync exited with code ${code ?? 1}`);
    }

    if (queued) {
      queued = false;
      runSync();
    }
  });
}

for (const filePath of watchedPaths) {
  watch(filePath, { persistent: true }, () => {
    console.log(`Detected change in ${path.relative(repoRoot, filePath)}. Syncing translations...`);
    runSync();
  });
}

console.log("Watching English copy sources for translation sync:");
for (const filePath of watchedPaths) {
  console.log(`- ${path.relative(repoRoot, filePath)}`);
}
