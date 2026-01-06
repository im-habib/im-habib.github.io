"use client";

import { Link } from "lucide-react";
import { useContent } from "@/context/ContentProvider";
import SubSectionHeader from "./SubSectionHeading";

export function TypeEntryDataCard({ entry }: { entry: string | any }) {
  if (entry) {
    const { data } = useContent();

    const entryData = data
      .map((item: any) => (item.type === entry ? item : null))
      .filter(Boolean);

    // console.log("entry in TypEntryDataCard: ", entryData);

    return (
      <div className="relative flex flex-col space-y-4">
        <div className="grid gap-6">
          {entryData.map((entryItem: any, idx: number) => (
            <div key={idx} className="p-4 border-b pt-6">
              <h3 className="text-lg font-semibold">{entryItem.title}</h3>
              <SubSectionHeader
                title={entryItem.headline}
                link={`${entry}/${entryItem.id}`}
              />
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div className="text-sm muted">No entry data available.</div>;
  }
}

{
  /* HEADER SECTION
        <div className="flex flex-col space-y-1">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
              {entry.title}
            </h3>
            {entry.href && (
              <a
                href={entry.href}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-blue-500 transition-colors"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>

          {/* Sub-header: Role @ Organization or Degree @ Institution */
}
{
  /* {(entry.role || entry.degree) && (
            <p className="flex items-center gap-2 text-md font-medium text-blue-600 dark:text-blue-400">
              {entry.role || entry.degree}
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span className="text-zinc-600 dark:text-zinc-400">
                {entry.organization || entry.institution || entry.venue}
              </span>
            </p>
          )}
        </div> */
}

{
  /* METADATA BAR (Date & Location) */
}
{
  /* {(entry.start_date || entry.date || entry.location) && (
          <div className="flex flex-wrap gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            {(entry.start_date || entry.date) && (
              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                <span>
                  {entry.start_date}{" "}
                  {entry.end_date ? `— ${entry.end_date}` : entry.date}
                </span>
              </div>
            )}
            {entry.location && (
              <div className="flex items-center gap-1.5">
                <MapPin size={14} />
                <span>{entry.location}</span>
              </div>
            )}
          </div>
        )} */
}

{
  /* BODY / DESCRIPTION */
}
{
  /* {entry.headline && (
          <p className="text-sm font-medium italic text-zinc-600 dark:text-zinc-300">
            {entry.headline}
          </p>
        )}

        {entry.body && (
          <div className="space-y-2">
            {entry.body.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
              >
                {paragraph}
              </p>
            ))}
          </div>
        )} */
}

{
  /* IMAGES GRID */
}
{
  /* {entry.images && entry.images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 pt-2">
            {entry.images.map((src, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-lg border border-zinc-100 dark:border-zinc-800"
              >
                <img
                  src={src}
                  alt=""
                  className="h-32 w-full object-cover transition-transform hover:scale-105"
                />
              </div>
            ))}
          </div>
        )} */
}

{
  /* LINKS RECORD */
}
{
  /* {entry.links && Object.keys(entry.links).length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {Object.entries(entry.links).map(([label, url]) => (
              <a
                key={url}
                href={url}
                className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                <Globe size={12} />
                {label}
              </a>
            ))}
          </div>
        )}  */
}
