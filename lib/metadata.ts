import { Metadata } from "next";
import {
  SITE_NAME,
  SITE_URL,
  SITE_OG_IMAGE,
  SITE_TWITTER_HANDLE,
} from "@/utils/constants";

export interface FeatureMetadata {
  title: string;
  description: string;
  author: string;
  date: string;
  readingTime: string;
  slug: string;
  image?: string;
  keywords?: string[];
}

export function generateFeatureMetadata(feature: FeatureMetadata): Metadata {
  const {
    title,
    description,
    author,
    date,
    readingTime,
    slug,
    image,
    keywords = [],
  } = feature;

  const url = `${SITE_URL}/features/${slug}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  const ogImageUrl = image || `${SITE_URL}/api/og/${slug}`;

  const publishedTime = new Date(date).toISOString();

  return {
    title,
    description,
    keywords: [
      ...keywords,
      "editorial",
      "feature",
      "magazine",
      author,
      SITE_NAME,
    ],
    authors: [{ name: author }],
    creator: author,
    publisher: SITE_NAME,
    openGraph: {
      type: "article",
      url,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: SITE_NAME,
      publishedTime,
      authors: [author],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE_TWITTER_HANDLE,
      creator: SITE_TWITTER_HANDLE,
      title: fullTitle,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateFeatureJsonLd(feature: FeatureMetadata) {
  const { title, description, author, date, slug, image = SITE_OG_IMAGE } = feature;
  const url = `${SITE_URL}/features/${slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: image.startsWith("/") ? `${SITE_URL}${image}` : image,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    datePublished: new Date(date).toISOString(),
    dateModified: new Date(date).toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}