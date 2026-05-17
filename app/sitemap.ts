import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { productCaseStudies } from "@/lib/products";
import { localizedRouteLocales } from "@/lib/siteLocale";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      changeFrequency: "weekly",
      priority: 1,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/privacy`,
      changeFrequency: "monthly",
      priority: 0.4,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/terms`,
      changeFrequency: "monthly",
      priority: 0.4,
      lastModified: new Date(),
    },
    ...localizedRouteLocales.map((locale) => ({
      url: `${siteConfig.url}/${locale}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      lastModified: new Date(),
    })),
    ...productCaseStudies.map((product) => ({
      url: `${siteConfig.url}/products/${product.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      lastModified: new Date(),
    })),
    ...localizedRouteLocales.flatMap((locale) => (
      productCaseStudies.map((product) => ({
        url: `${siteConfig.url}/${locale}/products/${product.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        lastModified: new Date(),
      }))
    )),
  ];
}
