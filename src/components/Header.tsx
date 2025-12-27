import { getNav } from "@/lib/data";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const nav = getNav();
  const items = nav.items.filter((i) => i.enabled !== false);

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          <a href="/" className="font-semibold">
            {nav.site_title}
          </a>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-7 text-sm">
              {items.map((i) => (
                <li key={i.href}>
                  <a href={i.href}>{i.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
