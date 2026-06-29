import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { productCaseStudies } from "@/lib/products";
import { localizedRouteLocales } from "@/lib/siteLocale";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteConfig.url,
      changeFrequency: "weekly",
      priority: 1,
      lastModified,
    },
    {
      url: siteConfig.url + "/products/redactorbuddy",
      changeFrequency: "monthly",
      priority: 0.8,
      lastModified,
    },
    {
      url: siteConfig.url + "/privacy",
      changeFrequency: "monthly",
      priority: 0.4,
      lastModified,
    },
    {
      url: siteConfig.url + "/terms",
      changeFrequency: "monthly",
      priority: 0.4,
      lastModified,
    },
    ...localizedRouteLocales.map((locale) => ({
      url: siteConfig.url + "/" + locale,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      lastModified,
    })),
    ...productCaseStudies.map((product) => ({
      url: siteConfig.url + "/products/" + product.slug,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      lastModified,
    })),
    ...localizedRouteLocales.flatMap((locale) => (
      productCaseStudies.map((product) => ({
        url: siteConfig.url + "/" + locale + "/products/" + product.slug,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        lastModified,
      }))
    )),
  ];
}
