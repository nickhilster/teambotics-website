import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/config";

const privacySections = [
  {
    title: "What this page covers",
    body:
      "This policy explains how Teambotics handles information collected through the public website, direct outreach, and the on-site assistant experience. It is intended to give visitors a clear operational view of the site while formal legal review is completed.",
  },
  {
    title: "Information you choose to share",
    body:
      "If you contact Teambotics by email, submit information through an on-site form, or chat with the assistant, we may receive the details you provide, including your name, organization, email address, and message content.",
  },
  {
    title: "Operational data we may collect",
    body:
      "Like most modern websites, Teambotics may collect technical and usage information needed to operate, secure, and improve the site. This can include IP address, browser and device details, page views, timing information, referring pages, and similar diagnostic telemetry.",
  },
  {
    title: "How Teambotics uses information",
    body:
      "We use information to respond to inquiries, operate and improve the website, monitor reliability and abuse, understand which services visitors are exploring, and support grounded chatbot interactions. We do not use this site as an advertising network or to sell visitor data.",
  },
  {
    title: "Service providers",
    body:
      "Teambotics may rely on infrastructure and operational providers to host the site, store application data, support analytics, and run assistant features. Those providers process data only as needed to deliver the service and maintain security and reliability.",
  },
  {
    title: "Chatbot and product inquiries",
    body:
      "Messages sent to the Teambotics assistant may be processed to generate a response, retrieve grounded knowledge, and maintain service logs. Please avoid sharing confidential, regulated, or highly sensitive information through the public chatbot unless Teambotics has explicitly approved that workflow.",
  },
  {
    title: "Retention and requests",
    body:
      `Teambotics keeps information for as long as it is reasonably needed to operate the site, respond to inquiries, maintain records, and support security. To ask about access, correction, or deletion requests, contact ${siteConfig.contactEmail}.`,
  },
];

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Teambotics handles visitor, contact, and chatbot information on the public site.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="section section--border">
        <Container>
          <p className="section-eyebrow">Policy</p>
          <h1 className="section-title">Privacy Policy</h1>
          <p className="section-copy">
            Teambotics is building workflow systems and assistant experiences for real operational use.
            This page explains, in plain language, how the public site handles visitor information today.
          </p>
        </Container>
      </section>

      <section className="section section--border">
        <Container>
          <div className="product-detail-grid">
            {privacySections.map((section) => (
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