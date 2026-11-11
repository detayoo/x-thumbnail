const PRODUCTION_URL = "https://x-thumbnail.adedigba.online";

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.NODE_ENV === "production") return PRODUCTION_URL;
  return "http://localhost:3218";
}

export const site = {
  name: "x-thumbnail",
  url: resolveSiteUrl(),
  title: "x-thumbnail — Open Graph and X share images by Tayo Adedigba",
  description:
    "Design Open Graph and X (Twitter) share images in seconds. Pick from 21 templates, type your title, choose from 35+ typefaces and export a crisp 1200 × 630 PNG. Free, no login.",
  keywords: [
    "og image generator",
    "open graph image",
    "twitter card generator",
    "x thumbnail",
    "social share image",
    "linkedin thumbnail",
    "blog cover generator",
    "changelog image",
    "thumbnail maker",
    "Tayo Adedigba",
  ],
  ogImage: "/x-thumbnail-open-graph.png",
  twitterImage: "/x-thumbnail-x.png",
  twitterHandle: "@adedigggba",
  author: {
    name: "Tayo Adedigba",
    jobTitle: "Frontend & Design Engineer",
    url: "https://adedigba.online",
    sameAs: ["https://adedigba.online", "https://github.com/detayoo", "https://x.com/adedigggba"],
  },
} as const;

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: site.name,
  url: site.url,
  description: site.description,
  applicationCategory: "DesignApplication",
  operatingSystem: "Web browser (desktop)",
  image: `${site.url}${site.ogImage}`,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: {
    "@type": "Person",
    name: site.author.name,
    jobTitle: site.author.jobTitle,
    url: site.author.url,
    sameAs: site.author.sameAs,
  },
  creator: { "@type": "Person", name: site.author.name, url: site.author.url },
};
