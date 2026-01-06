import { MetadataRoute } from "next";
import { getEntries } from "@/lib/data";

export const dynamic = "force-static";

const SITE_URL = "https://qrl.habib.scholariest.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = getEntries();

  let sitemapData: MetadataRoute.Sitemap = [];

  entries.map((entry) => {
    sitemapData.push({
      url: `${SITE_URL}/${entry.type}`,
      lastModified: entry.date ? new Date(entry.date) : new Date(),
    });

    sitemapData.push({
      url: `${SITE_URL}/${entry.type}/${entry.id}`,
      lastModified: entry.date ? new Date(entry.date) : new Date(),
    });
  });

  return [...sitemapData];
}
