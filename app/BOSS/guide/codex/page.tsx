import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { CodeBlock, GuideArticle, Pager, H2, P, C } from "../_components/GuideChrome";

export const metadata: Metadata = {
  title: "Codex setup",
  description: "Connect BOSS to Codex via ~/.codex/mcp_servers.json.",
  openGraph: {
    title: `BOSS Guide: Codex setup | ${siteConfig.name}`,
    url: `${siteConfig.url}/BOSS/guide/codex`,
  },
};

export default function CodexPage() {
  return (
    <GuideArticle
      eyebrow="04 — Connect your IDE"
      title="Codex"
      dek="Codex reads MCP config once, machine-wide — not per project."
    >
      <H2 first>Add the server</H2>
      <P>
        Create <C>~/.codex/mcp_servers.json</C> (once, for all repos):
      </P>
      <CodeBlock label="~/.codex/mcp_servers.json">{`{
  "mcpServers": {
    "boss": {
      "command": "boss",
      "args": ["serve"]
    }
  }
}`}</CodeBlock>

      <H2>Run it</H2>
      <CodeBlock label="terminal">{"cd your-repo\ncodex"}</CodeBlock>
      <P>
        Ask it to run a BOSS audit. If you ran <C>boss init</C>{" "}and picked Codex as your tool, it
        already has <C>.codex/agents/boss-auditor.md</C> telling it the exact tool-call sequence
        to follow.
      </P>

      <Pager prevSlug="claude-code" nextSlug="audit" />
    </GuideArticle>
  );
}
