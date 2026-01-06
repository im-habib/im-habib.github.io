"use client";

import SectionHeader from "@/components/SectionHeader";
import { useContent } from "@/context/ContentProvider";
import SubSectionHeader from "@/components/SubSectionHeading";

export default function HomeComponnet() {
  const { profile } = useContent();
  return (
    <div className="space-y-10">
      {/* ===== Summary ===== */}
      <section className="max-w-2xl">
        <h2 className="mt-6 text-xl font-semibold">{profile.headline}</h2>

        <div className="mt-4 space-y-4">
          {profile?.body?.map((p) => (
            <p key={p} className="leading-7">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ===== Stories ===== */}
      <SectionHeader title={"Ongoing Work →"} />
      {profile?.stories?.map((s) => (
        <section key={s?.id!} className="m-1">
          <SubSectionHeader title={s?.title} link={s?.href} />
        </section>
      ))}
    </div>
  );
}
