import Card from "@/components/Card";
import LinkPill from "@/components/LinkPill";
import SectionHeader from "@/components/SectionHeader";
import { getPublications } from "@/lib/data";

export const metadata = { title: "Publications" };

export default function PublicationsPage() {
  const publications = getPublications();

  if (!publications.length) {
    return <div className="text-sm muted">No publications available.</div>;
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="Publications" />

      <div className="space-y-4">

        {publications.map((p) => {
          const yearLabel = p.year ? p.year.toString() : null;

          const venue =
            typeof p.venue === "string"
              ? { name: p.venue }
              : p.venue;

          const venueName = venue?.name;
          const venueTier = venue?.tier;
          const venueLocation = venue?.location;

          return (
            <Card key={p.id}>
              <div className="text-lg font-semibold">{p.title}</div>

              <div className="mt-1 text-sm muted">
                {p.authors.join(", ")}
              </div>

              {(venueName || yearLabel) ? (
                <div className="mt-1 text-sm muted">
                  {venueName ?? ""}
                  {venueTier ? ` · ${venueTier}` : ""}
                  {venueLocation ? ` · ${venueLocation}` : ""}
                  {yearLabel ? ` · ${yearLabel}` : ""}
                </div>
              ) : null}

              {p.abstract ? <p className="mt-3">{p.abstract}</p> : null}

              {(p.links && Object.keys(p.links).length > 0) ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.links.paper ? <LinkPill href={p.links.paper} label="Paper" /> : null}
                  {p.links.doi ? <LinkPill href={p.links.doi} label="DOI" /> : null}
                  {p.links.code ? <LinkPill href={p.links.code} label="Code" /> : null}
                </div>
              ) : null}
            </Card>
          );
        })}

      </div>
    </div>
  );
}