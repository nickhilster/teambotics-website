import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { CodeBlock, Callout, GuideArticle, Pager, H2, P, OL, C } from "../_components/GuideChrome";

export const metadata: Metadata = {
  title: "Running an audit",
  description: "The full loop, from scan to written file.",
  openGraph: {
    title: `BOSS Guide: Running an audit | ${siteConfig.name}`,
    url: `${siteConfig.url}/BOSS/guide/audit`,
  },
};

export default function AuditPage() {
  return (
    <GuideArticle
      eyebrow="05 — Day to day"
      title="Running an audit"
      dek="The full loop, from scan to written file."
    >
      <H2 first>With an AI assistant connected</H2>
      <P>
        Say: <strong>&quot;Run a BOSS audit on this repo.&quot;</strong> A connected assistant
        follows this sequence:
      </P>
      <OL>
        <li><C>boss_scan_repo</C> — reads every trusted file</li>
        <li><C>boss_add_approval_item</C> — queues each proposed change, one call per change</li>
        <li><C>boss_get_approval_queue</C> — confirms everything queued correctly</li>
        <li><C>boss_open_console</C> — opens the review UI in your browser</li>
        <li>waits for you to approve, reject, or defer each item</li>
        <li><C>boss_apply_approved</C> — writes only what you approved</li>
        <li><C>boss_log_decision</C> — records the outcome permanently</li>
      </OL>

      <H2>Without an AI assistant</H2>
      <P>Scan directly from the terminal — this only reports findings, it doesn&apos;t propose anything:</P>
      <CodeBlock label="terminal">boss scan</CodeBlock>
      <P>
        To actually queue and apply changes without an AI assistant, you&apos;ll need to add
        items through the Console UI or the MCP API directly — see{" "}
        <C>boss/manual-workflow.md</C> in your repo.
      </P>

      <Callout>
        The queue lives at <C>boss/state.json</C>{" "}and survives across terminal sessions — you
        can <C>boss scan</C> now, close the terminal, and <C>boss approve</C> tomorrow.
      </Callout>

      <Pager prevSlug="codex" nextSlug="console" />
    </GuideArticle>
  );
}
