import { siteConfig } from "@/lib/config";

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description:
    "Teambotics builds purpose-built products and workflow systems with an operating standard grounded in love, empathy, care, accountability, and responsible agent behavior.",
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
