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

function readJSON(relFromSrc: string) {
  const p = path.join(process.cwd(), "src", relFromSrc);

  if (!fs.existsSync(p)) {
    throw new Error(`Missing data file: ${p}`);
  }

  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

export function getNav() {
  return NavSchema.parse(readJSON("content/nav.json"));
}

export function getHome() {
  return HomeSchema.parse(readJSON("content/home.json"));
}

export function getEducation() {
  return EducationSchema.parse(readJSON("content/education.json")).education;
}

export function getProfile() {
  return ProfileSchema.parse(readJSON("content/profile.json"));
}

export function getExperience() {
  return ExperienceSchema.parse(readJSON("content/experience.json")).experience;
}

export function getProjects() {
  return ProjectsSchema.parse(readJSON("content/projects.json")).projects;
}

export function getPublications() {
  return PublicationsSchema.parse(readJSON("content/publications.json"))
    .publications.slice()
    .sort((a, b) => b.year - a.year);
}

export function getBlogPosts() {
  return BlogPostsSchema.parse(readJSON("content/blogposts.json"))
    .posts.filter((p) => !p.draft)
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPostBySlug(slug: string) {
  const posts = BlogPostsSchema.parse(readJSON("content/blogposts.json")).posts;
  return posts.find((p) => p.slug === slug && !p.draft) ?? null;
}
