import { z } from "zod";

export const NavSchema = z.object({
  site_title: z.string(),
  items: z.array(
    z.object({
      label: z.string(),
      href: z.string().min(1),
      enabled: z.boolean().optional(),
    })
  ),
});

export const HomeSchema = z.object({
  summary: z.object({
    headline: z.string(),
    body: z.array(z.string()),
  }),
  stories: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      body: z.array(z.string()),
      href: z.string(),
      images: z.array(z.string()).optional(),
    })
  ),
});

/** ---------- Education (ARRAY) ---------- */
export const EducationItemSchema = z.object({
  id: z.string(),
  degree: z.string(),
  institution: z.string(),
  location: z.string().optional(),
  start_date: z.string(),
  end_date: z.string(),
  details: z.array(z.string()).optional(),
  links: z
    .object({
      institution: z.string().min(1).optional(),
    })
    .optional(),
});
export const EducationSchema = z.array(EducationItemSchema);

/** links: allow empty object or missing */
export const LinksSchema = z.record(z.string().min(1)).optional();

/** ---------- Profile (OBJECT) ---------- */
export const ProfileSchema = z.object({
  id: z.string(),
  name: z.object({
    full: z.string(),
    title: z.string().optional(),
    sidebar: z.string().optional(),
  }),
  avatar: z.string().optional(),
  bio: z.string(),
  bio_short: z.string().optional(),
  affiliation: z
    .object({
      institution: z.string(),
      department: z.string().optional(),
      location: z.string().optional(),
    })
    .optional(),
  research_interests: z.array(z.string()).optional(),
  contact: z
    .object({
      email: z.string().optional(),
      website: z.string().optional(),
      location: z.string().optional(),
    })
    .optional(),
  social: z.record(z.string().min(1)).optional(),
  cv: z.object({ pdf: z.string().min(1) }).optional(),
});

/** ---------- Experience (ARRAY) ---------- */
export const ExperienceItemSchema = z.object({
  id: z.string(),
  role: z.string(),
  organization: z.string(),
  type: z.enum(["academic", "industry"]).optional(),
  location: z.string().optional(),
  start_date: z.string(),
  end_date: z.string(),
  description: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
  links: LinksSchema,
});
export const ExperienceSchema = z.array(ExperienceItemSchema);

/** ---------- Publications (ARRAY) ---------- */
export const PublicationSchema = z.object({
  id: z.string(),
  title: z.string(),
  authors: z.array(z.string()),
  year: z.number().optional(), // HTML didn't always include year; don't crash builds
  type: z.enum(["conference", "journal", "workshop", "preprint"]).optional(),
  venue: z
    .object({
      name: z.string(),
      tier: z.string().optional(),
      location: z.string().optional(),
    })
    .optional(),
  status: z
    .enum(["published", "under_review", "preprint", "in_preparation"])
    .optional(),
  abstract: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  links: LinksSchema,
});
export const PublicationsSchema = z.array(PublicationSchema);

/** ---------- Projects (ARRAY) ---------- */
export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.enum(["research", "industry", "engineering"]),
  status: z.enum(["active", "ongoing", "completed"]).optional(),
  period: z
    .object({
      start: z.string(),
      end: z.string(),
    })
    .optional(),
  summary: z.string(),
  problem: z.string().optional(),
  solution: z.string().optional(),
  impact: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
  links: LinksSchema,
});
export const ProjectsSchema = z.array(ProjectSchema);

/** JSON-only blog blocks (safe rendering; no raw HTML) */
export const BlogBlockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("h2"), text: z.string() }),
  z.object({ type: z.literal("h3"), text: z.string() }),
  z.object({ type: z.literal("p"), text: z.string() }),
  z.object({ type: z.literal("ul"), items: z.array(z.string()) }),
  z.object({ type: z.literal("ol"), items: z.array(z.string()) }),
  z.object({
    type: z.literal("quote"),
    text: z.string(),
    cite: z.string().optional(),
  }),
  z.object({
    type: z.literal("code"),
    language: z.string().optional(),
    code: z.string(),
  }),
]);

export const BlogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  summary: z.string().optional(),
  tags: z.array(z.string()).optional(),
  draft: z.boolean().optional(),
  links: LinksSchema,
  content: z.array(BlogBlockSchema),
});
export const BlogPostsSchema = z.array(BlogPostSchema);

