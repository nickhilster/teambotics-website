import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Teambotics Manifesto – Private, Practical AI Systems",
  description:
    "The Teambotics manifesto: local-first, agent-native, data-sovereign AI products for organizations that want capability, privacy, and control.",
  alternates: {
    canonical: "https://www.teambotics.app/manifesto",
  },
  openGraph: {
    title: "The Teambotics Manifesto",
    description:
      "Some work needs the ocean. Most work needs the right flow. Teambotics builds private, practical, agent-native AI systems for teams.",
    url: "https://www.teambotics.app/manifesto",
    siteName: "Teambotics Inc.",
    locale: "en_CA",
    type: "website",
  },
};

// Route-level metadata wrapper for the public company manifesto page.
export default function ManifestoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
