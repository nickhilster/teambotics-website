import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Symphony Field Guide",
  description:
    "A public field guide from Teambotics for adopting a multi-agent operating layer with clarity, evidence, and deliberate execution.",
  alternates: {
    canonical: "https://symphony.teambotics.app",
  },
  openGraph: {
    title: "Symphony Field Guide | Teambotics",
    description:
      "A public field guide for adopting a multi-agent operating layer with clarity, evidence, and deliberate execution.",
    url: "https://symphony.teambotics.app",
  },
};

export default function SymphonyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
