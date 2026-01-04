import {
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_URL,
  SITE_TWITTER_URL,
  SITE_OG_IMAGE,
} from "@/utils/constants";

export function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    applicationCategory: "DesignApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Person",
      name: "Tayo Adedigba",
      url: SITE_TWITTER_URL,
    },
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}${SITE_OG_IMAGE}`,
      width: 1200,
      height: 630,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "1",
    },
    featureList: [
      "Generate social media thumbnails",
      "Twitter/X thumbnails",
      "LinkedIn thumbnails",
      "Open Graph images",
      "Customizable grid styles",
      "Adjustable font sizes",
      "Instant download",
      "Free to use",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function OrganizationStructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [SITE_TWITTER_URL],
    description: SITE_DESCRIPTION,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbStructuredData({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}