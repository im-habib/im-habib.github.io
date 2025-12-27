export default function LinkPill({
  href,
  label,
}: {
  href?: string;
  label: string;
}) {
  if (!href) return null;
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      data-pill="true"
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {label}
    </a>
  );
}
