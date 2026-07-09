import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EasyBuddy – Human-First AI for Frontline Teams",
  description:
    "EasyBuddy is an AI-powered training assistant that transforms employee onboarding and real-time support for retail and frontline teams.",
  openGraph: {
    title: "EasyBuddy – Human-First AI for Frontline Teams",
    description:
      "Voice-guided onboarding, scenario coaching, and instant policy lookups — built for the floor, not the boardroom.",
    url: "https://www.teambotics.app/easybuddy",
    siteName: "EasyBuddy by TeamBotics",
    images: [
      {
        url: "https://cdn.gamma.app/sogu61n3buhmo0y/generated-images/g1jKH497VJC3Umhe2xVUp.png",
        width: 1280,
        height: 768,
        alt: "EasyBuddy – Human-First AI for Frontline Teams",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
};

export default function EasyBuddyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
