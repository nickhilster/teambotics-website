import fs from "node:fs";
import path from "node:path";

const SITE_DOCUMENTS = {
  privacy: {
    filePath: "docs/privacy-policy-draft.md",
    title: "Privacy Policy",
    eyebrow: "Policy",
    description: "How Teambotics handles visitor, contact, and chatbot information on the public site.",
    route: "/privacy",
  },
  terms: {
    filePath: "docs/terms-of-use-draft.md",
    title: "Terms of Use",
    eyebrow: "Terms",
    description: "Terms governing the use of the Teambotics public website and assistant experience.",
    route: "/terms",
  },
} as const;

export type SiteDocumentId = keyof typeof SITE_DOCUMENTS;

export type SiteDocument = {
  id: SiteDocumentId;
  title: string;
  eyebrow: string;
  description: string;
  route: string;
  markdown: string;
  plainText: string;
  lastUpdated: string;
};

const documentCache = new Map<SiteDocumentId, SiteDocument>();

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function sanitizeMarkdown(markdown: string, lastUpdated: string) {
  const cleaned = markdown
    .replace(/\r\n/g, "\n")
    .replace(/^# .+\n+/m, "")
    .replace(/^>.*$/gm, "")
    .replace(/^\*Last updated:\s*\[DATE[^\n]*\*$/m, `*Last updated: ${lastUpdated}*`)
    .replace(/\[Privacy Policy\]\(\.\/privacy-policy-draft\.md\)/g, "[Privacy Policy](/privacy)")
    .replace(/\[Terms of Use\]\(\.\/terms-of-use-draft\.md\)/g, "[Terms of Use](/terms)")
    .replace(/\[Chatbot Disclaimer\]\(\.\/chatbot-disclaimer\.md\)/g, "chatbot disclaimer")
    .split("\n")
    .filter((line) => !line.includes("TODO("))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return cleaned;
}

function toPlainText(markdown: string) {
  return markdown
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\|/gm, "")
    .replace(/\|$/gm, "")
    .replace(/\|/g, " | ")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/[>*_`]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function readSiteDocument(id: SiteDocumentId): SiteDocument {
  const cached = documentCache.get(id);
  if (cached) {
    return cached;
  }

  const config = SITE_DOCUMENTS[id];
  const absolutePath = path.join(process.cwd(), config.filePath);
  const stats = fs.statSync(absolutePath);
  const lastUpdated = formatDate(stats.mtime);
  const rawMarkdown = fs.readFileSync(absolutePath, "utf8");
  const markdown = sanitizeMarkdown(rawMarkdown, lastUpdated);

  const document = {
    id,
    title: config.title,
    eyebrow: config.eyebrow,
    description: config.description,
    route: config.route,
    markdown,
    plainText: toPlainText(markdown),
    lastUpdated,
  } satisfies SiteDocument;

  documentCache.set(id, document);
  return document;
}

export function getSiteDocument(id: SiteDocumentId) {
  return readSiteDocument(id);
}

export function getPublicSiteDocuments() {
  return Object.keys(SITE_DOCUMENTS).map((id) => readSiteDocument(id as SiteDocumentId));
}