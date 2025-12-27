import Card from "@/components/Card";
import Tag from "@/components/Tag";
import LinkPill from "@/components/LinkPill";
import { getProjects } from "@/lib/data";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Projects</h1>

      <div className="space-y-4">
        {projects.map((p) => (
          <Card key={p.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold">{p.title}</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  {p.type.toUpperCase()}
                  {p.status ? ` · ${p.status}` : ""}
                  {p.period ? ` · ${p.period.start} – ${p.period.end}` : ""}
                </div>
              </div>
            </div>

            <p className="mt-3 leading-7 text-neutral-800 dark:text-neutral-200">
              {p.summary}
            </p>

            {p.impact?.length ? (
              <ul className="mt-3 list-disc space-y-1 pl-6">
                {p.impact.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            ) : null}

            {p.technologies?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {p.technologies.map((t) => (
                  <Tag key={t} label={t} />
                ))}
              </div>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-2">
              <LinkPill href={p.links?.github} label="GitHub" />
              <LinkPill href={p.links?.paper} label="Paper" />
              <LinkPill href={p.links?.demo} label="Demo" />
              <LinkPill href={p.links?.company} label="Company" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
