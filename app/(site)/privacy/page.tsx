import type { Metadata } from "next";
import { MarkdownDocument } from "@/components/content/MarkdownDocument";
import { getSiteDocument } from "@/lib/siteDocuments";

const privacyDocument = getSiteDocument("privacy");

export const metadata: Metadata = {
  title: privacyDocument.title,
  description: privacyDocument.description,
};

export default function PrivacyPage() {
  return <MarkdownDocument {...privacyDocument} />;
}