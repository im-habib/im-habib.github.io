import LinkPill from "./LinkPill";

export default function SubSectionHeader({
  title,
  link,
}: {
  title: string;
  link: string;
}) {
  return (
    <h4 data-section="true">
      {title} <LinkPill href={link} label="Read more →" />
    </h4>
  );
}
