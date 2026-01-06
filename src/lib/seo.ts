import type { Metadata } from "next";

const SITE_NAME = "As Md Habibullah";
const SITE_DESCRIPTION =
  "Software Engineer and PhD researcher specializing in Deep Reinforcement Learning for financial systems and production SaaS engineering.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://qrl.habib.scholariest.com";

export function absUrl(path: string) {
  if (!path.startsWith("/")) path = `/${path}`;
  return `${SITE_URL}${path}`;
}

export function constructMetadata(input: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const description = input.description?.trim() || SITE_DESCRIPTION;
  const url = absUrl(input.path || "/");

  const image = input.image
    ? input.image.startsWith("http")
      ? input.image
      : absUrl(input.image)
    : absUrl("/og.png");

  return {
    title: `${input.title} | ${SITE_NAME}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: `${input.title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${input.title} | ${SITE_NAME}`,
      description,
      images: [image],
    },
  };
}
