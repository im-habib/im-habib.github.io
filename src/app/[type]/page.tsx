import SectionHeader from "@/components/SectionHeader";
import { TypeEntryDataCard } from "@/components/TypEntryData";
import { getContent } from "@/lib/data";
import { constructMetadata, SITE_URL } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  // 2. Await the param
  const { type } = await params;

  // Now you can pass it to your helper without errors
  // const data = getTypedEntries(validType);
  // console.log("data in [type]: ", data);

  const title =
    type.toLocaleLowerCase() !== "cv"
      ? `All ${
          type.charAt(0).toUpperCase() + type.slice(1)
        }s | Accademic Profile - As Md Habibullah`
      : `Curriculum Vitae (CV) | Accademic Profile - As Md Habibullah`;

  const description = `Explore a curated collection of ${type} by As Md Habibullah, showcasing expertise in Deep Reinforcement Learning, neuroadaptive systems, financial modeling, and software engineering.`;

  return constructMetadata({
    title: title,
    description: description,
    path: `${SITE_URL}/${type}`,
  });
}

export async function generateStaticParams() {
  const { data } = await getContent();

  // Get unique types (story, project, etc.)
  const types = [...new Set(data.map((item) => item.type))];

  return types.map((type) => ({
    type: type,
  }));
}

export const dynamicParams = false;

export default async function TypeOfData({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <SectionHeader
        title={`${type.charAt(0).toUpperCase() + type.slice(1)} →`}
      />

      {<TypeEntryDataCard entry={type} />}
    </div>
  );
}
