import Card from "@/components/Card";
import Tag from "@/components/Tag";
import LinkPill from "@/components/LinkPill";
import { getExperience } from "@/lib/data";

export const metadata = { title: "Experience" };

export default function ExperiencePage() {
  const items = getExperience();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Experience</h1>

      <div className="space-y-4">
        {items.map((e) => (
          <Card key={e.id}>
            <div className="flex flex-col gap-1">
              <div className="text-lg font-semibold">
                {e.role} · {e.organization}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {e.start_date} – {e.end_date}
                {e.location ? ` · ${e.location}` : ""}
              </div>
            </div>

            {e.description ? (
              <p className="mt-3 leading-7 text-neutral-800 dark:text-neutral-200">
                {e.description}
              </p>
            ) : null}

            {e.highlights?.length ? (
              <ul className="mt-3 list-disc space-y-1 pl-6">
                {e.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            ) : null}

            {e.technologies?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {e.technologies.map((t) => (
                  <Tag key={t} label={t} />
                ))}
              </div>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-2">
              <LinkPill href={e.links?.company} label="Company" />
              <LinkPill href={e.links?.lab} label="Lab" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
