export default function SectionHeader({ title }: { title: string }) {
  return (
    <h2 data-section="true" className="mt-12 mb-6">
      {title}
    </h2>
  );
}
