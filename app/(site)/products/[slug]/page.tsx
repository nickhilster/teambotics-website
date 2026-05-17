import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCaseStudyContent } from "@/components/products/ProductCaseStudyContent";
import { getProductBySlug, productCaseStudies } from "@/lib/products";
import { siteConfig } from "@/lib/config";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return productCaseStudies.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description: product.heroSummary,
    openGraph: {
      title: `${product.name} | ${siteConfig.name}`,
      description: product.heroSummary,
      url: `${siteConfig.url}/products/${product.slug}`,
    },
  };
}

export default async function ProductCaseStudyPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductCaseStudyContent slug={product.slug} />;
}

