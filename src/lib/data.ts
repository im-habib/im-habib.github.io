import fs from "fs";
import path from "path";
import {
  NavSchema,
  HomeSchema,
  ProfileSchema,
  ProjectsSchema,
  EducationSchema,
  BlogPostsSchema,
  ExperienceSchema,
  PublicationsSchema,
} from "./schemas";

/** Read JSON relative to /src */
function readJSON(relFromSrc: string) {
  const p = path.join(process.cwd(), "src", relFromSrc);

  if (!fs.existsSync(p)) {
    throw new Error(`Missing data file: ${p}`);
  }

  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

/* ---------------- Navigation ---------------- */

export function getNav() {
  return NavSchema.parse(readJSON("content/nav.json"));
}

/* ---------------- Home ---------------- */

export function getHome() {
  return HomeSchema.parse(readJSON("content/home.json"));
}

/* ---------------- Profile ---------------- */

export function getProfile() {
  return ProfileSchema.parse(readJSON("content/profile.json"));
}

/* ---------------- Education (ARRAY) ---------------- */

export function getEducation() {
  return EducationSchema.parse(readJSON("content/education.json"));
}

/* ---------------- Experience (ARRAY) ---------------- */

export function getExperience() {
  return ExperienceSchema.parse(readJSON("content/experience.json"));
}

/* ---------------- Projects (ARRAY) ---------------- */

export function getProjects() {
  return ProjectsSchema.parse(readJSON("content/projects.json"));
}

/* ---------------- Publications (ARRAY) ---------------- */

export function getPublications() {
  return PublicationsSchema.parse(readJSON("content/publications.json"))
    .slice()
    .sort((a: any, b: any) => (b.year ?? 0) - (a.year ?? 0));
}

/* ---------------- Blog ---------------- */

export function getBlogPosts() {
  return BlogPostsSchema.parse(readJSON("content/blogposts.json"))
    .filter((p: any) => !p.draft)
    .slice()
    .sort((a: any, b: any) => (a.date < b.date ? 1 : -1));
}

export function getBlogPostBySlug(slug: string) {
  const posts = BlogPostsSchema.parse(
    readJSON("content/blogposts.json")
  );

  return posts.find((p: any) => p.slug === slug && !p.draft) ?? null;
}