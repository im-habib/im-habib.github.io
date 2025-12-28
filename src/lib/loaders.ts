import type { Metadata } from "next";
import { baseMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

import {
    getHome,
    getProfile,
    getProjects,
    getBlogPosts,
    getPublications,
    getBlogPostBySlug,
    // getProjectDetails,
    // getProjectDetailById,
} from "@/lib/data";

/** HOME */
export function loadHome(): { data: ReturnType<typeof getHome>; metadata: Metadata } {
    const home = getHome();
    const meta = baseMetadata({
        title: "Home",
        description: home.summary?.body?.[0],
        path: "/",
    });
    return { data: home, metadata: meta };
}

/** CV */
export function loadCV(): { data: any; metadata: Metadata } {
    const profile = getProfile();
    const meta = baseMetadata({
        title: "CV",
        description: profile.bio_short || profile.bio?.slice(0, 160),
        path: "/cv",
    });

    // Put whatever CV page needs here. Example:
    return {
        data: {
            profile,
            projects: getProjects(),
            publications: getPublications(),
        },
        metadata: meta,
    };
}

/** PROJECTS */
export function loadProjects() {
    const projects = getProjects();
    const meta = baseMetadata({
        title: "Projects",
        description: "Selected industry and research projects, with stacks and outcomes.",
        path: "/projects",
    });
    return { data: projects, metadata: meta };
}

/** PUBLICATIONS */
export function loadPublications() {
    const pubs = getPublications();
    const meta = baseMetadata({
        title: "Publications",
        description: "Peer-reviewed publications and research outputs.",
        path: "/publications",
    });
    return { data: pubs, metadata: meta };
}

/** BLOG INDEX */
export function loadBlogIndex() {
    const posts = getBlogPosts();
    const meta = baseMetadata({
        title: "Blog",
        description: "Notes on research, engineering, and reinforcement learning.",
        path: "/blog",
    });
    return { data: posts, metadata: meta };
}

/** BLOG POST */
export function loadBlogPost(slug: string) {
    const post = getBlogPostBySlug(slug);
    if (!post) return null;

    const meta = baseMetadata({
        title: post.title,
        description: post.summary || post.content?.find((b) => b.type === "p")?.text,
        path: `/blog/${slug}`,
    });

    return { data: post, metadata: meta };
}