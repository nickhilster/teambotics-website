import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FeedbackFish – Frontline Feedback Case Study",
  description:
    "FeedbackFish is a TeamBotics case study and prototype for capturing service feedback at the moment of highest customer recall.",
  openGraph: {
    title: "FeedbackFish – Frontline Feedback Case Study",
    description:
      "A TeamBotics case study and prototype for retail feedback capture, associate recognition, and service-design intelligence.",
    url: "https://www.teambotics.app/feedbackfish",
    siteName: "FeedbackFish by TeamBotics",
    locale: "en_CA",
    type: "website",
  },
};

export default function FeedbackFishLayout({ children }: { children: React.ReactNode }) {
  return children;
}
