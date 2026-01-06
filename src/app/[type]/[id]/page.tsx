import { getContent } from "@/lib/data";

export async function generateStaticParams() {
  const { data } = await getContent();

  return data.map((item) => ({
    type: item.type,
    id: item.id,
  }));
}

export const dynamicParams = false;

export default function DataByID() {
  return <div className="text-sm muted">No data available for this ID.</div>;
}
