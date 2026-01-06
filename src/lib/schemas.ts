import { z } from "zod";

/* =========================
   NAV (config)
   ========================= */
export const NavSchema = z.object({
  site_title: z.string(),
  dark_logo_url: z.string().optional(),
  light_logo_url: z.string().optional(),
  items: z.array(
    z.object({
      label: z.string(),
      href: z.string(),
      enabled: z.boolean().optional(),
    })
  ),
});
export type NavData = z.infer<typeof NavSchema>;

/* =========================
   PROFILE (about/person)
   ========================= */
export const ProfileSchema = z.object({
  id: z.string(),
  avatar: z.string().optional(),
  name: z.object({
    full: z.string(),
    title: z.string().optional(),
    sidebar: z.string().optional(),
  }),
  headline: z.string().optional(),
  body: z.array(z.string()).optional(),
  stories: z.array(z.any()).optional(),
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
  social: z.record(z.string()).optional(),
  cv: z.object({ pdf: z.string() }).optional(),
});
export type ProfileData = z.infer<typeof ProfileSchema>;

/* =========================
   ONE UNIFIED "ENTRIES" COLLECTION
   (home/education/experience/projects/publications/blog/etc)
   ========================= */
export const EntrySchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1),

  slug: z.string().optional(),
  title: z.string().min(1),
  headline: z.string().optional(),
  body: z.array(z.string()).optional(),

  href: z.string().optional(),
  images: z.array(z.string()).optional(),
  links: z.record(z.string()).optional(),

  date: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  location: z.string().optional(),

  institution: z.string().optional(),
  organization: z.string().optional(),
  role: z.string().optional(),
  degree: z.string().optional(),
  venue: z.string().optional(),
  year: z.number().optional(),
  draft: z.boolean().optional(),

  meta: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional(),
      image: z.string().optional(),
      canonical: z.string().optional(),
    })
    .optional(),

  data: z.record(z.any()).optional(),
});

export const EntriesSchema = z.array(EntrySchema);

export type Entry = z.infer<typeof EntrySchema>;
export type EntriesData = z.infer<typeof EntriesSchema>;
