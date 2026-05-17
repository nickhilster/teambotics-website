import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export function hashValue(value: unknown) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

export function toModuleLiteral(value: unknown) {
  return `${JSON.stringify(value, null, 2)} as const`;
}

export async function ensureDirForFile(filePath: string) {
  await mkdir(path.dirname(filePath), { recursive: true });
}

export async function writeTypeScriptModule(filePath: string, content: string) {
  await ensureDirForFile(filePath);
  await writeFile(filePath, `${content.trim()}\n`, "utf8");
}

export function toIdentifier(input: string) {
  return input
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, character: string) => character.toUpperCase())
    .replace(/^[^a-zA-Z_]+/, "")
    .replace(/^([A-Z])/, (match) => match.toLowerCase());
}