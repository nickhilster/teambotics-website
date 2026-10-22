import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repository = "nickhilster/muse-proposal";
const revision = "2afbdcf5786eb6221fdd4a5feb4a65c158d43ed1";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(root, "public", "muse");
const apiUrl = `https://api.github.com/repos/${repository}/git/trees/${revision}?recursive=1`;

const treeResponse = await fetch(apiUrl, {
  headers: { Accept: "application/vnd.github+json", "User-Agent": "teambotics-website-build" },
});
if (!treeResponse.ok) {
  throw new Error(`Could not read Muse source tree (${treeResponse.status} ${treeResponse.statusText})`);
}

const tree = await treeResponse.json();
if (tree.truncated || !Array.isArray(tree.tree)) {
  throw new Error("Muse source tree response was incomplete");
}

const files = tree.tree
  .filter((entry) =>
    entry.type === "blob" &&
    (entry.path === "index.html" || entry.path.startsWith("assets/") || entry.path.startsWith("docs/bob-")),
  )
  .map((entry) => entry.path)
  .sort();

if (!files.includes("index.html") || !files.some((file) => file.startsWith("assets/"))) {
  throw new Error("Muse source revision is missing its page or assets");
}

if (files.some((file) => path.posix.isAbsolute(file) || file.split("/").includes(".."))) {
  throw new Error("Muse source tree contains an unsafe file path");
}

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
const results = await Promise.all(
  files.map(async (file) => {
    const response = await fetch(`https://raw.githubusercontent.com/${repository}/${revision}/${file}`);
    if (!response.ok) {
      throw new Error(`Could not download Muse source file ${file} (${response.status})`);
    }

    const destination = path.join(outputDirectory, file);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, new Uint8Array(await response.arrayBuffer()));
    return file;
  }),
);

console.log(`Synced ${results.length} files from ${repository}@${revision.slice(0, 7)} to public/muse`);
