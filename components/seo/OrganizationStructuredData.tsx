import { siteConfig } from "@/lib/config";

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description:
    "Agents for Humans. Teambotics is an AI lab building agents for humans, with an operating standard grounded in love, empathy, care, accountability, and responsible agent behavior.",
  sameAs: [
    siteConfig.socials.linkedin,
    `https://x.com/${siteConfig.socials.x.replace(/^@/, "")}`,
  ],
  slogan: "Made with love, empathy, and care.",
  knowsAbout: [
    "Purpose-built products",
    "Workflow systems",
    "Responsible AI agents",
    "Agentic care",
    "Human-centered AI adoption",
  ],
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Agent operating principle",
      value:
        "Our agents are aligned with Teambotics values: love, empathy, care, accountability, and responsible support.",
    },
  ],
};

export function OrganizationStructuredData() {
  return (
    <script type="application/ld+json">
      {JSON.stringify(organizationStructuredData)}
    </script>
  );
}
