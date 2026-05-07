import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { productCaseStudies } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      changeFrequency: "weekly",
      priority: 1,
      lastModified: new Date(),
    },
    ...productCaseStudies.map((product) => ({
      url: `${siteConfig.url}/products/${product.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      lastModified: new Date(),
    })),
  ];
}
