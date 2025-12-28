import { notFound } from "next/navigation";

import Card from "@/components/Card";
import LinkPill from "@/components/LinkPill";
import details from "@/content/details.json";

type Detail = {
    slug: string;
    title: string;
    summary: string[];
    links?: Record<string, string>;
};

export function generateStaticParams() {
    return (details as Detail[]).map((d) => ({ slug: d.slug }));
}

export default function DetailPage({ params }: { params: { slug: string } }) {
    const d = (details as Detail[]).find((x) => x.slug === params.slug);
    if (!d) return notFound();

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
                    {d.links?.explain ? <LinkPill href={d.links.explain} label="Simple explanation" /> : null}
                </div>
            </Card>
        </div>
    );
}