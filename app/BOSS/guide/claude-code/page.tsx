import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { CodeBlock, Callout, GuideArticle, Pager, H2, P, C } from "../_components/GuideChrome";

export const metadata: Metadata = {
  title: "Claude Code setup",
  description: "Connect BOSS to Claude Code via a project-level .mcp.json.",
  openGraph: {
    title: `BOSS Guide: Claude Code setup | ${siteConfig.name}`,
    url: `${siteConfig.url}/BOSS/guide/claude-code`,
  },
};

export default function ClaudeCodePage() {
  return (
    <GuideArticle
      eyebrow="03 — Connect your IDE"
      title="Claude Code"
      dek={
        <>
          Claude Code reads MCP server config from a project-level <C>.mcp.json</C> — not{" "}
          <C>settings.json</C>, which rejects the <C>mcpServers</C> field entirely.
        </>
      }
    >
      <H2 first>Add the server</H2>
      <P>
        In the root of the repo you ran <C>boss init</C> in, create <C>.mcp.json</C>:
      </P>
      <CodeBlock label=".mcp.json">{`{
  "mcpServers": {
    "boss": {
      "command": "boss",
      "args": ["serve"]
    }
  }
}`}</CodeBlock>

      <H2>Trust it</H2>
      <P>
        Open (or restart) Claude Code in that repo. It should prompt{" "}
        <strong>&quot;Trust .mcp.json in this project?&quot;</strong> — allow it. Then check the
        connection:
      </P>
      <CodeBlock label="claude code">/mcp</CodeBlock>
      <P>
        <C>boss</C>{" "}should appear as a connected server. If it doesn&apos;t, restart the app —
        Claude Code only reads <C>.mcp.json</C> at startup.
      </P>

      <Callout tone="risk">
        <strong>Common mistake:</strong> adding <C>mcpServers</C> to{" "}
        <C>~/.claude/settings.json</C>. That file&apos;s schema doesn&apos;t include it and
        Claude Code will reject the whole file. Use a project-level <C>.mcp.json</C> instead.
      </Callout>

      <Pager prevSlug="init" nextSlug="codex" />
    </GuideArticle>
  );
}
