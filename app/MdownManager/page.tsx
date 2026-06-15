import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MDownManager — Markdown knowledge base, upgraded",
  description:
    "MDownManager indexes your .md vaults, adds AI summaries and semantic search, scans for security risks, and exposes a local HTTP API without sending files to the cloud.",
};

const html = `REPLACE_WITH_HTML`;

export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
