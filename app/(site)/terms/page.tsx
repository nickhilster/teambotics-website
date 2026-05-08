import type { Metadata } from "next";
import { MarkdownDocument } from "@/components/content/MarkdownDocument";
import { getSiteDocument } from "@/lib/siteDocuments";

const termsDocument = getSiteDocument("terms");

export const metadata: Metadata = {
  title: termsDocument.title,
  description: termsDocument.description,
};

export default function TermsPage() {
  return <MarkdownDocument {...termsDocument} />;
}