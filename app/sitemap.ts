import type { MetadataRoute } from "next";
import { SITE_URL, pages } from "../data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return pages.map((page) => ({
    url: new URL(page.href, SITE_URL).toString(),
    lastModified: now,
    changeFrequency: page.href === "/" ? "weekly" : "monthly",
    priority: page.href === "/" ? 1 : 0.8,
  }));
}
