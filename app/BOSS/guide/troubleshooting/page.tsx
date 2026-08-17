import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { GuideArticle, Pager, H2, P, C } from "../_components/GuideChrome";
import { bossTheme } from "../../_lib/theme";

export const metadata: Metadata = {
  title: "Troubleshooting",
  description: "Common BOSS problems and how to fix them.",
  openGraph: {
    title: `BOSS Guide: Troubleshooting | ${siteConfig.name}`,
    url: `${siteConfig.url}/BOSS/guide/troubleshooting`,
  },
};

export default function TroubleshootingPage() {
  return (
    <GuideArticle
      eyebrow="08 — Reference"
      title="Troubleshooting"
      dek="The problems people actually hit, in order of how often they hit them."
    >
      <H2 first>&quot;boss&quot; isn&apos;t recognized as a command</H2>
      <P>
        The global npm bin directory isn&apos;t on your <C>PATH</C>. Run{" "}
        <C>npm config get prefix</C>{" "}and add that path&apos;s <C>bin</C>{" "}(or the directory
        itself, on Windows) to your shell profile.
      </P>

      <H2>MCP server doesn&apos;t show up in /mcp</H2>
      <P>
        Almost always one of two things: the config is in the wrong file (see{" "}
        <Link href="/BOSS/guide/claude-code" style={{ color: bossTheme.accentInk }}>
          Claude Code setup
        </Link>
        ), or the app hasn&apos;t restarted since you added it. MCP config is read once at
        startup.
      </P>

      <H2>boss approve says &quot;No approval item found&quot;</H2>
      <P>
        Run <C>boss status</C>{" "}first to confirm the id — a partial prefix works, but it has to
        be unambiguous. If the queue is empty, nothing has been proposed yet; run a scan and
        audit first.
      </P>

      <H2>boss init says a file already exists and skips it</H2>
      <P>
        This is expected — <C>boss init</C>{" "}never overwrites. If you want fresh seed content,
        delete the specific file first, then re-run.
      </P>

      <H2>Console opens on an unexpected port</H2>
      <P>
        Port <C>3847</C>{" "}was busy, so BOSS incremented up to 10 times. Check the terminal output
        from <C>boss console</C> for the actual URL, or <C>boss status</C> which prints it too.
      </P>

      <Pager prevSlug="cli" />
    </GuideArticle>
  );
}
