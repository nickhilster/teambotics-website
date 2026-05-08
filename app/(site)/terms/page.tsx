import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/config";

const termsSections = [
  {
    title: "Use of the site",
    body:
      "You may use the Teambotics website to learn about the company, its products, and its services, and to contact the team about legitimate business interest. You agree not to misuse the site, disrupt its operation, or attempt to bypass security or access controls.",
  },
  {
    title: "Informational content",
    body:
      "Site content is provided for general informational purposes. It is meant to help visitors understand Teambotics' products, workflow approach, and engagement model. Public content and assistant responses should not be treated as legal, financial, medical, or other professional advice.",
  },
  {
    title: "Chat assistant boundaries",
    body:
      "The on-site assistant is designed to stay grounded in Teambotics material and may refuse questions that require unsupported claims or professional advice. Assistant responses are informational and do not create a client, advisory, or professional-services relationship.",
  },
  {
    title: "Intellectual property",
    body:
      "Unless stated otherwise, the Teambotics name, site content, written materials, branding, and interface elements remain the property of Teambotics or its licensors. You may not copy, republish, or reuse substantial portions of the site for commercial purposes without permission.",
  },
  {
    title: "External services and links",
    body:
      "The site may link to third-party services such as LinkedIn or product experiences. Teambotics is not responsible for the content, privacy practices, or uptime of third-party destinations outside this domain.",
  },
  {
    title: "Changes and contact",
    body:
      `Teambotics may update this site and these terms as the company, products, and public workflows evolve. Questions about site use or business engagement can be sent to ${siteConfig.contactEmail}.`,
  },
];

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms governing the use of the Teambotics public website and assistant experience.",
};

export default function TermsPage() {
  return (
    <>
      <section className="section section--border">
        <Container>
          <p className="section-eyebrow">Terms</p>
          <h1 className="section-title">Terms of Use</h1>
          <p className="section-copy">
            These terms describe the basic rules for using the public Teambotics site and its
            interactive assistant. They are written to keep the site usable, clear, and aligned with
            the limits of a public-facing product and company experience.
          </p>
        </Container>
      </section>

      <section className="section section--border">
        <Container>
          <div className="product-detail-grid">
            {termsSections.map((section) => (
              <article className="product-detail-card" key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}