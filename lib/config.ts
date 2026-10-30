import { products } from "@/lib/products";

export const siteConfig = {
  name: "Teambotics",
  tagline: "Learn, Commit, Push...",
  // The three dots (and only the dots) link to a page on the saying that inspired the line.
  taglineHref: "https://www.saada.org/tides/article/educate-agitate-organize",
  description:
    "Teambotics works with teams to make AI useful in real workflows, from mapping the work to building the missing piece.",
  url: "https://www.teambotics.app",
  socials: {
    x: "@teambotics",
    linkedin: "https://www.linkedin.com/company/teambotics-inc",
  },
  contactEmail: "hello@teambotics.app",
};

export { products };

export const footerLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
