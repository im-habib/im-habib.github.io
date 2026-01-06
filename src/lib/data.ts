import fs from "fs";
import path from "path";
import { z } from "zod";
import { NavSchema, ProfileSchema, EntriesSchema } from "./schemas";

type Entries = z.infer<typeof EntriesSchema>;
type Entry = Entries[number];

/** Read JSON relative to /src */
function readJSON(relFromSrc: string) {
  const p = path.join(process.cwd(), "src", relFromSrc);

  if (!fs.existsSync(p)) {
    throw new Error(`Missing data file: ${p}`);
  }

  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

/** ---- simple in-memory cache (build/runtime safe) ---- */
let _nav: unknown | null = null;
let _profile: unknown | null = null;
let _entries: unknown | null = null;

/* =========================
   CONFIG LOADERS
   ========================= */

export function getNav() {
  if (!_nav) _nav = readJSON("content/nav.json");
  return NavSchema.parse(_nav);
}

export function getProfile() {
  if (!_profile) _profile = readJSON("content/profile.json");
  return ProfileSchema.parse(_profile);
}

/* =========================
   ONE UNIFIED ENTRIES LOADER
   ========================= */

export function getEntries(): Entries {
  if (!_entries) _entries = readJSON("content/data.json");
  return EntriesSchema.parse(_entries);
}

type Content = {
  data: Entries;
  nav: z.infer<typeof NavSchema>;
  profile: z.infer<typeof ProfileSchema>;
};

/** Fetch all content (nav, data, profile) */

export async function getContent(): Promise<Content> {
  return {
    nav: getNav(),
    data: getEntries(),
    profile: getProfile(),
  };
}

/* =========================
   ENTRY HELPERS (filtering)
   ========================= */

export function getEntriesByType(type: string): Entry[] {
  return getEntries().filter((e) => {
    if (e.type === type) {
      return true;
    }
    return false;
  });
}

export function getEntryById(id: string): Entry | null {
  return getEntries().find((e) => e.id === id) ?? null;
}

export function getEntryBySlug(type: string, slug: string): Entry | null {
  return getEntries().find((e) => e.type === type && e.slug === slug) ?? null;
}

/* =========================
   COMMON HELPERS
   ========================= */

export function getPublicEntries(): Entry[] {
  // If draft === true, hide it. If draft is missing, treat it as public.
  return getEntries().filter((e) => e.draft !== true);
}

/** Sort newest first using: date > year > start_date (best-effort) */
export function sortEntriesNewestFirst(list: Entry[]): Entry[] {
  return list.slice().sort((a, b) => {
    const aKey =
      (a.date ? Date.parse(a.date) : NaN) ||
      (typeof a.year === "number" ? Date.parse(`${a.year}-01-01`) : NaN) ||
      (a.start_date ? Date.parse(`01 ${a.start_date}`) : NaN) ||
      0;

    const bKey =
      (b.date ? Date.parse(b.date) : NaN) ||
      (typeof b.year === "number" ? Date.parse(`${b.year}-01-01`) : NaN) ||
      (b.start_date ? Date.parse(`01 ${b.start_date}`) : NaN) ||
      0;

    return bKey - aKey;
  });
}

/* =========================
   OPTIONAL: typed known types
   ========================= */

const KnownTypesSchema = z.enum([
  "story",
  "project",
  "education",
  "experience",
  "publication",
]);

export type KnownType = z.infer<typeof KnownTypesSchema>;

export function getTypedEntries(type: KnownType): Entry[] {
  return getEntriesByType(type);
}
