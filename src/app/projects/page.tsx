import { Metadata } from "next";

import Card from "@/components/Card";
import LinkPill from "@/components/LinkPill";
import SectionHeader from "@/components/SectionHeader";
// import { useContent } from "@/context/ContentProvider";

export const metadata: Metadata = {
  title:
    "Projects | Software Engineer & DRL Researcher | Accademic Profile - As Md Habibullah",
  description:
    "Selected research and industry projects by As Md Habibullah, spanning Deep Reinforcement Learning, neuroadaptive systems, financial modeling, and production-scale SaaS and software engineering.",
};
export default function ProjectsPage() {
  // const { data } = useContent();

  // if (!projects.length) {
  return <div className="text-sm muted">No projects available.</div>;
  // }

  // return (
  //   <div className="space-y-6">
  //     <SectionHeader title="Projects" />

  //     <div className="space-y-4">
  //       {projects.map((p) => {
  //         // console.log(p);

  //         const typeLabel = (p.type ?? "project").toUpperCase();

  //         return (
  //           <Card key={p.id}>
  //             {/* Title */}
  //             <div className="text-lg font-semibold">
  //               {p.title}
  //             </div>

  //             {/* Meta */}
  //             <div className="mt-1 text-sm muted">
  //               {typeLabel}
  //               {p.status ? ` · ${p.status}` : ""}
  //               {p.period ? ` · ${p.period.start} – ${p.period.end}` : ""}
  //             </div>

  //             {/* Summary */}
  //             <p className="mt-3">
  //               {p.summary}
  //             </p>

  //             {/* Impact */}
  //             {p.impact?.length ? (
  //               <ul className="mt-3 list-disc space-y-1 pl-6">
  //                 {p.impact.map((i) => (
  //                   <li key={i}>{i}</li>
  //                 ))}
  //               </ul>
  //             ) : null}

  //             {/* Links */}
  //             {(p.links && Object.keys(p.links).length > 0) ? (
  //               <div className="mt-4 flex flex-wrap gap-2">
  //                 {p.links.more ? (
  //                   <LinkPill href={p.links.more} label="Read More" />
  //                 ) : null}

  //                 {p.links.web ? (
  //                   <LinkPill href={p.links.web} label="Web" />
  //                 ) : null}

  //                 {p.links.github ? (
  //                   <LinkPill href={p.links.github} label="GitHub" />
  //                 ) : null}

  //                 {p.links.paper ? (
  //                   <LinkPill href={p.links.paper} label="Paper" />
  //                 ) : null}

  //                 {p.links.demo ? (
  //                   <LinkPill href={p.links.demo} label="Demo" />
  //                 ) : null}

  //                 {p.links.thesis ? (
  //                   <LinkPill href={p.links.thesis} label="Thesis" />
  //                 ) : null}

  //               </div>
  //             ) : null}
  //           </Card>
  //         );
  //       })}
  //     </div>
  //   </div>
  // );
}
