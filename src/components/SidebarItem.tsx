import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export default function SidebarItem({
  icon,
  label,
  href,
  platform,
}: {
  icon: IconDefinition;
  label: string;
  href?: string;
  platform?: string;
}) {
  if (!href) return null;

  return (
    <li>
      <Link
        href={href}
        className="flex items-center gap-2"
        target={href.startsWith("http") ? "_blank" : undefined}
        data-platform={platform}
      >
        <FontAwesomeIcon icon={icon} />
        <span>{label}</span>
      </Link>
    </li>
  );
}
