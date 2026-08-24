import type { Metadata } from "next";
import { PokoShell } from "@/components/poko/PokoShell";

export const metadata: Metadata = {
  title: {
    default: "Poko",
    template: "%s | Poko",
  },
  description:
    "Poko is a desktop companion for coding-agent work: real-time agent presence, clearer handoffs, and local-first Steward-style trust loops.",
  metadataBase: new URL("https://poko.teambotics.app"),
};

export default function PokoLayout({ children }: { children: React.ReactNode }) {
  return <PokoShell>{children}</PokoShell>;
}
