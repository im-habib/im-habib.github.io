import Card from "@/components/Card";
import LinkPill from "@/components/LinkPill";
import { getPublications } from "@/lib/data";

export const metadata = { title: "Publications" };

export default function PublicationsPage() {
  const pubs = getPublications();
  const years = Array.from(new Set(pubs.map((p) => p.year))).sort(
    (a, b) => b - a
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Publications</h1>

      <div className="flex flex-wrap gap-2">
        {years.map((y) => (
          <a
            key={y}
            href={`#y-${y}`}
            className="rounded-full border px-3 py-1 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800"
          >
            {y}
          </a>
        ))}
      </div>

      <div className="space-y-8">
        {years.map((y) => (
          <section key={y} id={`y-${y}`} className="space-y-4">
            <h2 className="text-xl font-semibold">{y}</h2>

            <div className="space-y-4">
              {pubs
                .filter((p) => p.year === y)
                .map((p) => (
                  <Card key={p.id}>
                    <div className="text-lg font-semibold">{p.title}</div>
                    <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                      {p.authors.join(", ")}
                    </div>
                    <div className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">
                      {p.venue.name}
                      {p.venue.tier ? ` · ${p.venue.tier}` : ""}
                      {p.status ? ` · ${p.status.replaceAll("_", " ")}` : ""}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <LinkPill href={p.links?.pdf} label="PDF" />
                      <LinkPill href={p.links?.arxiv} label="arXiv" />
                      <LinkPill href={p.links?.code} label="Code" />
                      <LinkPill href={p.links?.bibtex} label="BibTeX" />
                      <LinkPill href={p.links?.doi} label="DOI" />
                    </div>
                  </Card>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
