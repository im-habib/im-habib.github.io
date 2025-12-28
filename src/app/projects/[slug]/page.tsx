import { notFound } from "next/navigation";

import Tag from "@/components/Tag";
import Card from "@/components/Card";
import LinkPill from "@/components/LinkPill";
import SectionHeader from "@/components/SectionHeader";

import { getProjectDetails, getProjectDetailById } from "@/lib/data";

type Params = { params: { slug: string } };

export function generateStaticParams() {
    return getProjectDetails().map((p) => ({ slug: p.project_id }));
}

function KV({ k, v }: { k: string; v?: string | null }) {
    if (!v) return null;
    return (
        <div className="text-sm">
            <span className="font-medium">{k}: </span>
            <span className="muted">{v}</span>
        </div>
    );
}

export default function ProjectDetail({ params }: Params) {

    console.log("params.slug: ", params.slug);


    const p = getProjectDetailById(params.slug);
    if (!p) notFound();

    const s = p.project_summary;
    const spec = p.detailed_specification;

    return (
        <div className="space-y-8">
            {/* Title block */}
            <Card>
                <h1 className="text-3xl font-semibold">{humanizeId(p.project_id)}</h1>

                <div className="mt-3 space-y-2">
                    <KV k="Vision" v={s?.vision} />
                    <KV k="Problem" v={s?.problem_statement} />
                    <KV k="Solution" v={s?.solution} />
                    <KV k="Key innovation" v={s?.key_innovation} />
                </div>

                {/* Optional link pills (if you later add links in JSON) */}
                {"links" in (p as any) ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                        <LinkPill href={(p as any).links?.paper} label="Paper" />
                        <LinkPill href={(p as any).links?.code} label="Code" />
                        <LinkPill href={(p as any).links?.demo} label="Demo" />
                    </div>
                ) : null}
            </Card>

            {/* Workflow */}
            {spec?.workflow?.length ? (
                <div className="space-y-4">
                    <SectionHeader title="Workflow" />
                    <Card>
                        <ol className="space-y-4">
                            {spec.workflow
                                .slice()
                                .sort((a, b) => a.step - b.step)
                                .map((w) => (
                                    <li key={w.step} className="space-y-1">
                                        <div className="flex flex-wrap items-baseline gap-x-2">
                                            <span className="font-semibold">Step {w.step}</span>
                                            <span className="muted">·</span>
                                            <span className="font-medium">{w.phase}</span>
                                        </div>
                                        <p className="muted">{w.description}</p>
                                    </li>
                                ))}
                        </ol>
                    </Card>
                </div>
            ) : null}

            {/* DRL Framework */}
            {spec?.drl_framework ? (
                <div className="space-y-4">
                    <SectionHeader title="DRL Framework" />
                    <Card>
                        <div className="space-y-3">
                            <KV k="Algorithm" v={spec.drl_framework.algorithm} />
                            <KV k="State space" v={spec.drl_framework.state_space} />
                            <KV k="Action space" v={spec.drl_framework.action_space} />
                            <KV k="Reward function" v={spec.drl_framework.reward_function} />
                        </div>
                    </Card>
                </div>
            ) : null}

            {/* Expected Results */}
            {spec?.expected_results ? (
                <div className="space-y-4">
                    <SectionHeader title="Expected Results" />
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <div className="font-semibold">Technical</div>
                            {spec.expected_results.technical?.length ? (
                                <ul className="mt-3 list-disc space-y-1 pl-6">
                                    {spec.expected_results.technical.map((x) => (
                                        <li key={x}>{x}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="mt-2 muted">No items.</p>
                            )}
                        </Card>

                        <Card>
                            <div className="font-semibold">Neural</div>
                            {spec.expected_results.neural?.length ? (
                                <ul className="mt-3 list-disc space-y-1 pl-6">
                                    {spec.expected_results.neural.map((x) => (
                                        <li key={x}>{x}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="mt-2 muted">No items.</p>
                            )}
                        </Card>

                        <Card>
                            <div className="font-semibold">Behavioral</div>
                            {spec.expected_results.behavioral?.length ? (
                                <ul className="mt-3 list-disc space-y-1 pl-6">
                                    {spec.expected_results.behavioral.map((x) => (
                                        <li key={x}>{x}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="mt-2 muted">No items.</p>
                            )}
                        </Card>
                    </div>
                </div>
            ) : null}

            {/* Technical Stack */}
            {spec?.technical_stack ? (
                <div className="space-y-4">
                    <SectionHeader title="Technical Stack" />
                    <Card>
                        <div className="space-y-5">
                            {spec.technical_stack.languages?.length ? (
                                <div>
                                    <div className="font-semibold">Languages</div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {spec.technical_stack.languages.map((t) => (
                                            <Tag key={t} label={t} />
                                        ))}
                                    </div>
                                </div>
                            ) : null}

                            {spec.technical_stack.libraries?.length ? (
                                <div>
                                    <div className="font-semibold">Libraries</div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {spec.technical_stack.libraries.map((t) => (
                                            <Tag key={t} label={t} />
                                        ))}
                                    </div>
                                </div>
                            ) : null}

                            {spec.technical_stack.hardware_integration?.length ? (
                                <div>
                                    <div className="font-semibold">Hardware Integration</div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {spec.technical_stack.hardware_integration.map((t) => (
                                            <Tag key={t} label={t} />
                                        ))}
                                    </div>
                                </div>
                            ) : null}

                            {spec.technical_stack.feedback_interface?.length ? (
                                <div>
                                    <div className="font-semibold">Feedback Interface</div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {spec.technical_stack.feedback_interface.map((t) => (
                                            <Tag key={t} label={t} />
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </Card>
                </div>
            ) : null}
        </div>
    );
}

function humanizeId(id: string) {
    // "neurasynk" -> "Neurasynk"
    // "fin_drl" -> "Fin Drl"
    return id
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}