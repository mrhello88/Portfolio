import type { MetadataRoute } from "next";
import { SITE_URL } from "@/components/portfolio/data";
import { getAllProjectSlugs } from "@/components/portfolio/projectsData";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL.replace(/\/$/, "");
  const now = new Date();

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...getAllProjectSlugs().map((slug) => ({
      url: `${base}/projects/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
