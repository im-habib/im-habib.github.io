import { notFound } from "next/navigation";

import Card from "@/components/Card";
import LinkPill from "@/components/LinkPill";
import { getDetails, getDetailBySlug } from "@/lib/data";

export function generateStaticParams() {
    return getDetails().map((d: any) => ({ slug: d.slug }));
}

export default function DetailPage({ params }: { params: { slug: string } }) {
    const d = getDetailBySlug(params.slug);
    if (!d) notFound();

    return (
        <div className="space-y-6">
            <Card>
                <h1 className="text-2xl font-semibold">{d.title}</h1>

                {d.summary?.length ? (
                    <ul className="mt-4 list-disc space-y-1 pl-6">
                        {d.summary.map((s) => (
                            <li key={s}>{s}</li>
                        ))}
                    </ul>
                ) : null}

                <div className="mt-4 flex flex-wrap gap-2">
                    {d.links?.paper ? <LinkPill href={d.links.paper} label="Paper" /> : null}
                    {d.links?.code ? <LinkPill href={d.links.code} label="Code" /> : null}
                    {d.links?.explain ? (
                        <LinkPill href={d.links.explain} label="Simple explanation" />
                    ) : null}
                </div>
            </Card>
        </div>
    );
}