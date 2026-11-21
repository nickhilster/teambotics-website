import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyContent } from "@/components/case-studies/CaseStudyContent";
import { caseStudies, getCaseStudyBySlug } from "@/lib/caseStudies";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return { robots: { index: false, follow: false } };
  }

  return {
    title: study.title,
    description: study.summary,
    robots: { index: false, follow: false },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return <CaseStudyContent slug={study.slug} />;
}
