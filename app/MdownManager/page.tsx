import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MDownManager — Markdown knowledge base, upgraded",
  description:
    "MDownManager indexes your .md vaults, adds AI summaries and semantic search, scans for security risks, and exposes a local HTTP API without sending files to the cloud.",
};

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>MDownManager</title>
<style>
/* --- Mobile fix preserved --- */
@media (max-width: 768px) {
  .nav-cta { display: none !important; }
}
</style>
</head>
<body>
<!-- Full HTML content inlined -->
${require('fs').readFileSync('/mnt/data/product-page(2).html','utf-8')}
</body>
</html>`;

export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
