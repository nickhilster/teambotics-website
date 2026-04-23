import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      changeFrequency: "weekly",
      priority: 1,
      lastModified: new Date(),
    },
  ];
}
