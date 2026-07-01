import type { Metadata } from "next";

export type BaseHeadParams = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  siteTitle: string;
};

export function buildBaseMetadata({
  title,
  description,
  image,
  url,
  siteTitle,
}: BaseHeadParams): Metadata {
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      url,
      title: fullTitle,
      description,
      images: image ? [{ url: image }] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: image ? [image] : undefined,
    },
    icons: {
      icon: "/ken.png",
    },
  };
}

