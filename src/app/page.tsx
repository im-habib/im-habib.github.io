import Image from "next/image";
import Card from "@/components/Card";
import SectionHeader from "@/components/SectionHeader";
import LinkPill from "@/components/LinkPill";
import { getHome, getProfile } from "@/lib/data";

export const metadata = { title: "Home" };

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
  const profile = getProfile();
  const home = getHome();

  return (
    <div className="space-y-10">
      {/* ===== Summary ===== */}
      <section className="max-w-2xl">
        <h1 className="text-3xl font-semibold">{profile.name.full}</h1>

        {profile.name.title ? (
          <p className="mt-2 muted">{profile.name.title}</p>
        ) : null}

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
