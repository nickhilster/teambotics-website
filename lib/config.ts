export const siteConfig = {
  name: "Teambotics",
  description:
    "Applied AI systems lab for regulated, operational, and frontline environments.",
  url: "https://teambotics.app",
  socials: {
    x: "@teambotics",
    github: "/github-placeholder",
    linkedin: "/linkedin-placeholder",
  },
  contactEmail: "hello@teambotics.app",
};

export const products = [
  {
    name: "LTB BUDDY",
    title: "AI-Assisted Leave Tracking",
    description:
      "Streamlines FMLA, ADA, and STD administration for clinical HR teams. Reduces compliance risk through automation.",
    domain: "Healthcare / Regulated",
    status: "live" as const,
    statusLabel: "LIVE",
    href: "/products/ltb-buddy-placeholder",
  },
  {
    name: "EASYBUDDY",
    title: "Intelligent Shift Coverage",
    description:
      "Real-time matching of open shifts to qualified, compliant frontline staff. Eliminates manual outreach loops.",
    domain: "Workforce / Operations",
    status: "pilot" as const,
    statusLabel: "ENTERPRISE PILOT",
    href: "/products/easybuddy-placeholder",
  },
];

export const footerLinks = [
  { label: "Privacy", href: "/privacy-placeholder" },
  { label: "Terms", href: "/terms-placeholder" },
];
