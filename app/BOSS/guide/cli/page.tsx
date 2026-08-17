import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { GuideArticle, Pager, Table, P, C } from "../_components/GuideChrome";

export const metadata: Metadata = {
  title: "CLI reference",
  description: "Every BOSS command, run from inside the repo it governs.",
  openGraph: {
    title: `BOSS Guide: CLI reference | ${siteConfig.name}`,
    url: `${siteConfig.url}/BOSS/guide/cli`,
  },
};

export default function CliPage() {
  return (
    <GuideArticle
      eyebrow="07 — Day to day"
      title="CLI reference"
      dek="Every command, run from inside the repo BOSS governs."
    >
      <Table
        head={["Command", "What it does"]}
        rows={[
          [<C key="c">boss serve</C>, "Starts the MCP server on stdio — how your IDE talks to BOSS"],
          [<C key="c">boss init</C>, "Scaffolds /boss/ and asks the environment questionnaire"],
          [<C key="c">boss scan [path]</C>, "Reads trusted files and prints what's missing"],
          [<C key="c">boss console</C>, "Opens the approval queue UI in your browser"],
          [<C key="c">boss approve &lt;id&gt;</C>, "Approves one item by its id or a unique prefix"],
          [<C key="c">boss apply</C>, "Writes every approved item to disk"],
          [<C key="c">boss status</C>, "Prints the current queue and Console URL, if running"],
        ]}
      />

      <P>
        Commands like <C>approve</C>, <C>apply</C>, and <C>status</C> read and write{" "}
        <C>boss/state.json</C> in the current directory — always run them from your repo root.
      </P>

      <Pager prevSlug="console" nextSlug="troubleshooting" />
    </GuideArticle>
  );
}
