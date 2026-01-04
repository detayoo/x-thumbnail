import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import {
  StructuredData,
  OrganizationStructuredData,
} from "@/components/structured-data";

import {
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_TWITTER_IMAGE,
  SITE_OG_IMAGE,
  SITE_URL,
  SITE_TWITTER_HANDLE,
  SITE_TWITTER_URL,
} from "@/utils/constants";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME + " — " + "thumbnails made easy",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "thumbnail generator",
    "twitter thumbnail",
    "x thumbnail",
    "social media thumbnail",
    "og image generator",
    "open graph image",
    "linkedin thumbnail",
    "thumbnail maker",
    "free thumbnail generator",
    "thumbnail creator online",
    "social media image generator",
    "twitter card generator",
    "custom thumbnail",
    "thumbnail design tool",
  ],
  authors: [{ name: "Tayo Adedigba", url: SITE_TWITTER_URL }],
  creator: "Tayo Adedigba",
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME + " — " + "thumbnails made easy",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "x-thumbnail - Generate beautiful social media thumbnails",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE_TWITTER_HANDLE,
    creator: SITE_TWITTER_HANDLE,
    title: SITE_NAME + " — " + "thumbnails made easy",
    description: SITE_DESCRIPTION,
    images: [SITE_TWITTER_IMAGE],
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <head>
        <StructuredData />
        <OrganizationStructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="bottom-center" richColors />
        <Analytics />
      </body>
    </html>
  );
}
