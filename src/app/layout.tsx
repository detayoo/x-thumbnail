import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

import { site, structuredData } from "@/lib/site";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [...site.keywords],
  authors: [{ name: site.author.name, url: site.author.url }],
  creator: site.author.name,
  publisher: site.author.name,
  category: "design",
  alternates: { canonical: "/" },
  icons: "/icon.svg",
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_US",
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: "x-thumbnail, a share image designer" }],
  },
  twitter: {
    card: "summary_large_image",
    site: site.twitterHandle,
    creator: site.twitterHandle,
    title: site.title,
    description: site.description,
    images: [site.twitterImage],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  other: { "author-portfolio": site.author.url },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1e1e1e" },
    { media: "(prefers-color-scheme: light)", color: "#f2f2f2" },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem("x-thumbnail:theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}var d=document.documentElement;d.dataset.theme=t;d.classList.toggle("dark",t==="dark")}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="dark" className={`dark h-full ${fontVariables}`} suppressHydrationWarning>
      <body className="h-full">
        <Script id="theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
