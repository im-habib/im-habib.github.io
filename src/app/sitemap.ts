import { MetadataRoute } from "next";
import {
    getBlogPosts,
    getProjects,
    getPublications,
} from "@/lib/data";

const SITE_URL = "https://im-habib.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: `${SITE_URL}/`, lastModified: new Date() },
        { url: `${SITE_URL}/cv`, lastModified: new Date() },
        { url: `${SITE_URL}/projects`, lastModified: new Date() },
        { url: `${SITE_URL}/publications`, lastModified: new Date() },
        { url: `${SITE_URL}/blog`, lastModified: new Date() },
    ];

    const blogRoutes: MetadataRoute.Sitemap =
        getBlogPosts().map((post) => ({
            url: `${SITE_URL}/blog/${post.slug}`,
            lastModified: new Date(post.date),
        }));

    const projectRoutes: MetadataRoute.Sitemap =
        getProjects().map((p: any) => ({
            url: `${SITE_URL}/projects#${p.id}`,
            lastModified: new Date(),
        }));

    const publicationRoutes: MetadataRoute.Sitemap =
        getPublications().map((p) => ({
            url: `${SITE_URL}/publications#${p.id}`,
            lastModified: new Date(p.year, 0, 1),
        }));

    return [
        ...staticRoutes,
        ...blogRoutes,
        ...projectRoutes,
        ...publicationRoutes,
    ];
}