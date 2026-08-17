import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { CodeBlock, Callout, GuideArticle, Pager, H2, P, UL, C } from "./_components/GuideChrome";

export const metadata: Metadata = {
  title: "Getting started",
  description: "Install BOSS and verify it's working.",
  openGraph: {
    title: `BOSS Guide: Getting started | ${siteConfig.name}`,
    url: `${siteConfig.url}/BOSS/guide`,
  },
};

export default function GettingStartedPage() {
  return (
    <GuideArticle
      eyebrow="01 — Start here"
      title="Getting started"
      dek="BOSS is a globally-installed MCP server. Your IDE's AI does the reasoning; BOSS holds every proposed change until you approve it."
    >
      <H2 first>Requirements</H2>
      <UL>
        <li>Node.js 18 or later</li>
        <li>An MCP-capable AI tool — Claude Code, Codex, or Cursor</li>
      </UL>

      <H2>Install</H2>
      <CodeBlock label="terminal">npm install -g boss-md</CodeBlock>
      <P>
        This installs the <C>boss</C>{" "}command and a pre-built Console UI — no separate build
        step, no API keys, no account.
      </P>

      <H2>Verify</H2>
      <CodeBlock label="terminal">{"boss --version\nboss --help"}</CodeBlock>
      <P>
        You should see the current version and a list of eight commands: <C>serve</C>,{" "}
        <C>init</C>, <C>scan</C>, <C>console</C>, <C>approve</C>, <C>apply</C>, <C>status</C>,{" "}
        <C>help</C>.
      </P>

      <Callout>
        <strong>Next:</strong> run <C>boss init</C>{" "}in the repo you want BOSS to govern — that's
        page 02.
      </Callout>

      <Pager nextSlug="init" />
    </GuideArticle>
  );
}
