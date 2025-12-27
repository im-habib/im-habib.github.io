import Card from "@/components/Card";
import LinkPill from "@/components/LinkPill";
import SectionHeader from "@/components/SectionHeader";
import { getProfile, getProjects, getEducation, getExperience } from "@/lib/data";

export const metadata = { title: "CV" };

export default function CVPage() {
  const profile = getProfile();
  const education = getEducation();
  const experience = getExperience();
  const projects = getProjects();

  const jobExp = experience.filter((e) => e.type === "industry");
  const researchExp = experience.filter((e) => e.type === "academic");
  const researchProjects = projects.filter((p) => p.type === "research");

  const aff = profile.affiliation;

  return (
    <div className="space-y-6">
      {/* Header block (NOT summary bio) */}
      <Card>
        <h1 className="text-3xl font-semibold">{profile.name.full}</h1>

        {profile.name.title ? <p className="mt-1 muted">{profile.name.title}</p> : null}

        {aff ? (
          <div className="mt-3 text-sm muted">
            {aff.institution}
            {aff.department ? ` · ${aff.department}` : ""}
            {aff.location ? ` · ${aff.location}` : ""}
          </div>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2">
          {profile.cv?.pdf ? <LinkPill href={profile.cv.pdf} label="CV (PDF)" /> : null}
          {profile.social?.github ? <LinkPill href={profile.social.github} label="GitHub" /> : null}
          {profile.social?.google_scholar ? (
            <LinkPill href={profile.social.google_scholar} label="Scholar" />
          ) : null}
          {profile.social?.linkedin ? <LinkPill href={profile.social.linkedin} label="LinkedIn" /> : null}
          {profile.social?.orcid ? <LinkPill href={profile.social.orcid} label="ORCID" /> : null}
          {profile.social?.pubmed ? <LinkPill href={profile.social.pubmed} label="PubMed" /> : null}
        </div>
      </Card>

      {/* Education */}
      {education.length ? (
        <>
          <SectionHeader title="Education" />
          <div className="space-y-4">
            {education.map((ed) => (
              <Card key={ed.id}>
                <div className="text-lg font-semibold">{ed.degree}</div>

                <div className="mt-1 text-sm muted">
                  {ed.institution}
                  {ed.location ? ` · ${ed.location}` : ""}
                  {" · "}
                  {ed.start_date} – {ed.end_date}
                </div>

                {ed.details?.length ? (
                  <ul className="mt-3 list-disc space-y-1 pl-6">
                    {ed.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                ) : null}

                {ed.links?.institution ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <LinkPill href={ed.links.institution} label="Institution" />
                  </div>
                ) : null}
              </Card>
            ))}
          </div>
        </>
      ) : null}

      {/* Job Experience */}
      {jobExp.length ? (
        <>
          <SectionHeader title="Job Experience" />
          <div className="space-y-4">
            {jobExp.map((e) => (
              <Card key={e.id}>
                <div className="text-lg font-semibold">
                  {e.role} · {e.organization}
                </div>

                <div className="mt-1 text-sm muted">
                  {e.start_date} – {e.end_date}
                  {e.location ? ` · ${e.location}` : ""}
                </div>

                {e.description ? <p className="mt-3">{e.description}</p> : null}

                {e.highlights?.length ? (
                  <ul className="mt-3 list-disc space-y-1 pl-6">
                    {e.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-4 flex flex-wrap gap-2">
                  {e.links?.company ? <LinkPill href={e.links.company} label="Company" /> : null}
                </div>
              </Card>
            ))}
          </div>
        </>
      ) : null}

      {/* Project Experience */}
      {projects.length ? (
        <>
          <SectionHeader title="Project Experience" />
          <div className="space-y-4">
            {projects.map((p) => {
              const thesis = p.links?.["thesis"]; // safe custom link key

              return (
                <Card key={p.id}>
                  <div className="text-lg font-semibold">{p.title}</div>

                  <div className="mt-1 text-sm muted">
                    {(p.type ?? "project").toUpperCase()}
                    {p.status ? ` · ${p.status}` : ""}
                    {p.period ? ` · ${p.period.start} – ${p.period.end}` : ""}
                  </div>

                  <p className="mt-3">{p.summary}</p>

                  {p.impact?.length ? (
                    <ul className="mt-3 list-disc space-y-1 pl-6">
                      {p.impact.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.links?.github ? <LinkPill href={p.links.github} label="GitHub" /> : null}
                    {p.links?.paper ? <LinkPill href={p.links.paper} label="Paper" /> : null}
                    {p.links?.demo ? <LinkPill href={p.links.demo} label="Demo" /> : null}
                    {thesis ? <LinkPill href={thesis} label="Thesis" /> : null}
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      ) : null}

      {/* Research Experience */}
      {researchExp.length || researchProjects.length ? (
        <>
          <SectionHeader title="Research Experience" />

          <div className="space-y-4">
            {researchExp.map((e) => (
              <Card key={e.id}>
                <div className="text-lg font-semibold">
                  {e.role} · {e.organization}
                </div>

                <div className="mt-1 text-sm muted">
                  {e.start_date} – {e.end_date}
                  {e.location ? ` · ${e.location}` : ""}
                </div>

                {e.description ? <p className="mt-3">{e.description}</p> : null}

                {e.highlights?.length ? (
                  <ul className="mt-3 list-disc space-y-1 pl-6">
                    {e.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-4 flex flex-wrap gap-2">
                  {e.links?.lab ? <LinkPill href={e.links.lab} label="Lab" /> : null}
                </div>
              </Card>
            ))}

            {researchProjects.map((p) => (
              <Card key={`rp-${p.id}`}>
                <div className="text-lg font-semibold">{p.title}</div>

                <div className="mt-1 text-sm muted">
                  Research Project
                  {p.period ? ` · ${p.period.start} – ${p.period.end}` : ""}
                </div>

                <p className="mt-3">{p.summary}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.links?.paper ? <LinkPill href={p.links.paper} label="Paper" /> : null}
                  {p.links?.github ? <LinkPill href={p.links.github} label="GitHub" /> : null}
                </div>
              </Card>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}