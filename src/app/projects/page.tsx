import Card from "@/components/Card";
import LinkPill from "@/components/LinkPill";
import SectionHeader from "@/components/SectionHeader";
import { getProjects } from "@/lib/data";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  const projects = getProjects();

  if (!projects.length) {
    return (
      <div className="text-sm muted">
        No projects available.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="Projects" />

      <div className="space-y-4">
        {projects.map((p) => {
          const typeLabel = (p.type ?? "project").toUpperCase();
          const thesis = p.links?.["thesis"];

          return (
            <Card key={p.id}>
              {/* Title */}
              <div className="text-lg font-semibold">
                {p.title}
              </div>

              {/* Meta */}
              <div className="mt-1 text-sm muted">
                {typeLabel}
                {p.status ? ` · ${p.status}` : ""}
                {p.period ? ` · ${p.period.start} – ${p.period.end}` : ""}
              </div>

              {/* Summary */}
              <p className="mt-3">
                {p.summary}
              </p>

              {/* Impact */}
              {p.impact?.length ? (
                <ul className="mt-3 list-disc space-y-1 pl-6">
                  {p.impact.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              ) : null}

              {/* Links */}
              {(p.links && Object.keys(p.links).length > 0) ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.links.github ? (
                    <LinkPill href={p.links.github} label="GitHub" />
                  ) : null}

                  {p.links.paper ? (
                    <LinkPill href={p.links.paper} label="Paper" />
                  ) : null}

                  {p.links.demo ? (
                    <LinkPill href={p.links.demo} label="Demo" />
                  ) : null}

                  {thesis ? (
                    <LinkPill href={thesis} label="Thesis" />
                  ) : null}
                </div>
              ) : null}
            </Card>
          );
        })}
      </div>
    </div>
  );
}