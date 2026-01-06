"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

import ThemeToggle from "@/components/ThemeToggle";

type NavItem = {
  label: string;
  href: string;
  enabled?: boolean;
};

type NavData = {
  site_title: string;
  light_logo_url?: string;
  dark_logo_url?: string;
  items: NavItem[];
};

export default function Header({ nav }: { nav: NavData }) {
  const items = nav.items.filter((i) => i.enabled !== false);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const logoSrc = useMemo(() => {
    // Avoid hydration mismatch: before mounted, pick light as safe default
    if (!mounted) return nav.light_logo_url ?? nav.dark_logo_url;

    return resolvedTheme === "dark"
      ? nav.dark_logo_url ?? nav.light_logo_url
      : nav.light_logo_url ?? nav.dark_logo_url;
  }, [mounted, resolvedTheme, nav.light_logo_url, nav.dark_logo_url]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b">
      <div className="mx-auto max-w-6xl px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            {logoSrc ? (
              <Image
                src={logoSrc}
                alt={nav.site_title}
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
                priority
              />
            ) : (
              <span className="font-semibold text-lg tracking-tight">
                {nav.site_title}
              </span>
            )}
          </Link>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-7 text-sm font-medium">
              {items.map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    className="hover:text-primary transition-colors"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
