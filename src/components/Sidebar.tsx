import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getProfile } from "@/lib/data";
import { ICONS } from "@/components/icons";
import SidebarItem from "@/components/SidebarItem";

export default function Sidebar() {
  const profile = getProfile();

  return (
    <div className="px-6 py-8">
      {/* Avatar + name */}
      <div className="flex flex-col items-center text-center">
        <div className="relative h-36 w-36">
          <Image
            src={profile.avatar || "/avatar.jpg"}
            alt={profile.name.full}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="mt-4 text-base font-semibold">
          {profile.name.sidebar || profile.name.full}
        </div>

        {profile.bio_short && (
          <p className="mt-2 text-sm leading-relaxed">{profile.bio_short}</p>
        )}
      </div>

      {/* Divider */}
      <div
        className="mt-6 pt-6 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        {/* Location / Institution */}
        <ul className="space-y-2 text-sm">
          {profile.affiliation?.location && (
            <li className="flex items-center gap-2">
              <FontAwesomeIcon icon={ICONS.location} />
              <span>{profile.affiliation.location}</span>
            </li>
          )}

          {profile.affiliation?.institution && (
            <li className="flex items-center gap-2">
              <FontAwesomeIcon icon={ICONS.university} />
              <span>{profile.affiliation.institution}</span>
            </li>
          )}
        </ul>

        {/* Links */}
        <ul className="mt-5 space-y-3 text-sm">
          <SidebarItem
            icon={ICONS.email}
            label="Email"
            href={
              profile.contact?.email
                ? `mailto:${profile.contact.email}`
                : undefined
            }
          />

          <SidebarItem
            icon={ICONS.scholar}
            label="Google Scholar"
            href={profile.social?.google_scholar}
          />

          <SidebarItem
            icon={ICONS.orcid}
            label="ORCID"
            href={profile.social?.orcid}
            platform="orcid"
          />

          <SidebarItem
            icon={ICONS.github}
            label="GitHub"
            href={profile.social?.github}
          />
        </ul>
      </div>
    </div>
  );
}
