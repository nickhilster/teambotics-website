import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Symphony — An AI Product-Design Experiment",
  description:
    "A living Teambotics case study exploring how AI agents change product-development work, responsibility, handoffs, and decision-making.",
  alternates: {
    canonical: "https://symphony.teambotics.app/symphony-guide",
  },
  openGraph: {
    title: "Symphony — An AI Product-Design Experiment | Teambotics",
    description:
      "A living case study exploring how AI agents change product-development work, responsibility, handoffs, and decision-making.",
    url: "https://symphony.teambotics.app/symphony-guide",
  },
};

export default function SymphonyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
