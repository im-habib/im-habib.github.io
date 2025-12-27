import { z } from "zod";

/** ---------- Profile (OBJECT) ---------- */
export const ProfileSchema = z.object({
  id: z.string(),
  avatar: z.string().optional(),
  name: z.object({
    full: z.string(),
    sidebar: z.string().optional(),
    title: z.string().optional(),
  }),
  bio: z.string(),
  bio_short: z.string().optional(),
  affiliation: z
    .object({
      institution: z.string(),
      department: z.string().optional(),
      location: z.string().optional(),
    })
    .optional(),
  contact: z
    .object({
      email: z.string().optional(),
    })
    .optional(),
  social: z
    .object({
      github: z.string().optional(),
      linkedin: z.string().optional(),
      google_scholar: z.string().optional(),
      orcid: z.string().optional(),
      pubmed: z.string().optional(),
      twitter: z.string().optional(),
      bluesky: z.string().optional(),
    })
    .optional(),
  cv: z
    .object({
      pdf: z.string().optional(),
    })
    .optional(),
  research_interests: z.array(z.string()).optional(),
});

/** ---------- Home (OBJECT) ---------- */
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
      institution: z.string().optional(),
    })
    .optional(),
});
export const EducationSchema = z.array(EducationItemSchema);

/** ---------- Experience (ARRAY) ---------- */
export const ExperienceItemSchema = z.object({
  id: z.string(),
  type: z.enum(["industry", "academic"]).or(z.string()),
  role: z.string(),
  organization: z.string(),
  location: z.string().optional(),
  start_date: z.string(),
  end_date: z.string(),
  description: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  links: z
    .object({
      company: z.string().optional(),
      lab: z.string().optional(),
    })
    .optional(),
});
export const ExperienceSchema = z.array(ExperienceItemSchema);

/** ---------- Projects (ARRAY) ---------- */
export const ProjectSchema = z.object({
  id: z.string(),
  type: z.string(),
  title: z.string(),
  summary: z.string(),
  status: z.string().optional(),
  period: z
    .object({
      start: z.string(),
      end: z.string(),
    })
    .optional(),
  impact: z.array(z.string()).optional(),
  links: z
    .object({
      github: z.string().optional(),
      paper: z.string().optional(),
      demo: z.string().optional(),
      doi: z.string().optional(),
    })
    .optional(),
});
export const ProjectsSchema = z.array(ProjectSchema);

/** ---------- Publications (ARRAY) ---------- */
export const PublicationSchema = z.object({
  id: z.string(),
  title: z.string(),
  authors: z.array(z.string()),
  venue: z.string().optional(),
  year: z.number().optional(),
  links: z
    .object({
      paper: z.string().optional(),
      doi: z.string().optional(),
    })
    .optional(),
});
export const PublicationsSchema = z.array(PublicationSchema);

export type Profile = z.infer<typeof ProfileSchema>;
export type Home = z.infer<typeof HomeSchema>;
export type EducationItem = z.infer<typeof EducationItemSchema>;
export type ExperienceItem = z.infer<typeof ExperienceItemSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Publication = z.infer<typeof PublicationSchema>;