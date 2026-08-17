import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { CodeBlock, GuideArticle, Pager, Table, H2, P, UL, C } from "../_components/GuideChrome";

export const metadata: Metadata = {
  title: "The Console",
  description: "A local browser UI for reviewing what's in the BOSS approval queue.",
  openGraph: {
    title: `BOSS Guide: The Console | ${siteConfig.name}`,
    url: `${siteConfig.url}/BOSS/guide/console`,
  },
};

export default function ConsolePage() {
  return (
    <GuideArticle
      eyebrow="06 — Day to day"
      title="The Console"
      dek="A local browser UI for reviewing what's in the queue — nothing leaves your machine."
    >
      <H2 first>Open it</H2>
      <CodeBlock label="terminal">boss console</CodeBlock>
      <P>
        Starts a local server (default port <C>3847</C>, auto-incrementing if busy) and opens it
        in your default browser.
      </P>

      <H2>What you can do</H2>
      <UL>
        <li><strong>Approve</strong> — marks the item ready for <C>boss_apply_approved</C></li>
        <li><strong>View diff</strong> — see the exact proposed file content before deciding</li>
        <li><strong>Defer</strong> — leave it pending, decide later</li>
        <li><strong>Reject</strong> — discards it; nothing is ever written</li>
      </UL>

      <H2>Three tabs</H2>
      <Table
        head={["Tab", "Shows"]}
        rows={[
          ["Approval queue", "Everything pending, approved, or rejected right now"],
          ["Risk register", "Items flagged high or critical risk"],
          ["Execution log", "What's already been written, and when"],
        ]}
      />

      <Pager prevSlug="audit" nextSlug="cli" />
    </GuideArticle>
  );
}
