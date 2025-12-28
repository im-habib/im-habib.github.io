import { getNav } from "@/lib/data";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";
import Link from "next/link"; // Use Link for internal navigation

export default function Header() {
  const nav = getNav();
  const items = nav.items.filter((i) => i.enabled !== false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="mx-auto max-w-6xl px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* LOGO SECTION */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            {nav.logo_url ? (
              <Image
                src={nav.logo_url}
                alt={nav.site_title}
                width={120} // Desired width
                height={40} // Desired height
                className="h-8 w-auto object-contain" // "h-8" fixes the visual height
                priority // Loads logo immediately
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
