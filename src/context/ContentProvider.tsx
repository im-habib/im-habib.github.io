"use client";

import React, { createContext, useContext } from "react";

type NavItem = { label: string; href: string; enabled?: boolean };
type NavData = {
    items: NavItem[];
    site_title: string;
    dark_logo_url?: string;
    light_logo_url?: string;
};

type Content = {
    nav: NavData;
    home?: unknown;
    profile?: unknown;
    details?: unknown;
    projects?: unknown;
    educations?: unknown;
    storyposts?: unknown;
    experiences?: unknown;
    publications?: unknown;
};

const ContentContext = createContext<Content | null>(null);

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

export function useContent() {
    const ctx = useContext(ContentContext);
    if (!ctx) {
        throw new Error("useContent() must be used inside <ContentProvider>.");
    }
    return ctx;
}