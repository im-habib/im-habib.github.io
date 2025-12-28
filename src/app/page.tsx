import Image from "next/image";
import { Metadata } from "next";

import { getHome } from "@/lib/data";
import Card from "@/components/Card";
import LinkPill from "@/components/LinkPill";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Software Engineer & DRL Researcher | Accademic Profile - As Md Habibullah",
  description:
    "Software Engineer and PhD researcher specializing in Deep Reinforcement Learning, financial systems, and production SaaS engineering.",
};


function StoryImages({ images, title }: { images?: string[]; title: string }) {
  if (!images?.length) return null;
  return (
    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
      {images.slice(0, 3).map((q) => (
        <div
          key={q}
          className="relative aspect-video overflow-hidden rounded-xl"
        >
          <Image
            src="/placeholders/16x9.png"
            alt={`${title} — ${q}`}
            fill
            className="object-cover"
            priority={false}
          />
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const home = getHome();

  // const { home } = useContent();
  return (
    <div className="space-y-10">
      {/* ===== Summary ===== */}
      <section className="max-w-2xl">
        {/* <h1 className="text-3xl font-semibold">{profile.name.full}</h1> */}

        {/* {profile.name.title ? (
          <p className="mt-2 muted">{profile.name.title}</p>
        ) : null} */}

        <h2 className="mt-6 text-xl font-semibold">{home.summary.headline}</h2>

        <div className="mt-4 space-y-4">
          {home.summary.body.map((p) => (
            <p key={p} className="leading-7">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ===== Stories ===== */}
      {home.stories.map((s) => (
        <section key={s.id}>
          <SectionHeader title={s.title} />

          <Card>
            <div className="space-y-4">
              {s.body.map((p) => (
                <p key={p} className="leading-7">
                  {p}
                </p>
              ))}
            </div>

            <StoryImages images={s.images} title={s.title} />

            <div className="mt-5">
              <LinkPill href={s.href} label="Read more →" />
            </div>
          </Card>
        </section>
      ))}
    </div>
  );
}
