"use client";

import React, { createContext, useContext } from "react";
import type { NavData, ProfileData, Entry } from "@/lib/schemas";

/* ---------- Unified Content Shape ---------- */
export type Content = {
  nav: NavData;
  data: Entry[];
  profile: ProfileData;
};

/* ---------- Context ---------- */
const ContentContext = createContext<Content | null>(null);

/* ---------- Provider ---------- */
export function ContentProvider({
  value,
  children,
}: {
  value: Content;
  children: React.ReactNode;
}) {
  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

/* ---------- Hook ---------- */
export function useContent(): Content {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error("useContent() must be used inside <ContentProvider>.");
  }
  return ctx;
}
