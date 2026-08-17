import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { CodeBlock, Callout, GuideArticle, Pager, H2, P, UL, C } from "../_components/GuideChrome";

export const metadata: Metadata = {
  title: "Init & environment",
  description: "Scaffold governance docs and tell BOSS what's already in your toolbox.",
  openGraph: {
    title: `BOSS Guide: Init & environment | ${siteConfig.name}`,
    url: `${siteConfig.url}/BOSS/guide/init`,
  },
};

export default function InitPage() {
  return (
    <GuideArticle
      eyebrow="02 — Start here"
      title="Init & environment"
      dek="Run once per repo. Scaffolds governance docs and asks what's already in your toolbox so BOSS can tailor itself to it."
    >
      <H2 first>Run it</H2>
      <CodeBlock label="terminal">{"cd your-repo\nboss init"}</CodeBlock>
      <P>
        Answer five questions: which AI tool you use, and whether ryft, RepoSteward,
        llm-loadout, or Project-OPS are already part of your setup. Every question can be
        answered <C>n</C> — nothing is required.
      </P>

      <H2>What gets created</H2>
      <UL>
        <li><C>boss/</C> — governance docs (approval gates, source registry, model selection, etc.)</li>
        <li><C>boss/environment.json</C> — your answers, so future runs don&apos;t re-ask</li>
        <li><C>.claude/agents/boss-auditor.md</C> or <C>.codex/agents/boss-auditor.md</C> — an agent file matching the tool you named</li>
        <li><C>boss/manual-workflow.md</C> — a standalone workflow, only if you said you use no AI tool</li>
      </UL>

      <H2>Non-interactive</H2>
      <P>For CI or scripting, skip the questionnaire entirely — every answer defaults to no:</P>
      <CodeBlock label="terminal">boss init --yes</CodeBlock>

      <Callout tone="good">
        <strong>Safe to re-run.</strong> <C>boss init</C>{" "}never overwrites a file that already
        exists — it only fills in what&apos;s missing.
      </Callout>

      <Pager prevSlug="getting-started" nextSlug="claude-code" />
    </GuideArticle>
  );
}
