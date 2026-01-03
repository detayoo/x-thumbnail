import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SITE_NAME, SITE_DESCRIPTION, SITE_OG_IMAGE } from "@/utils/constants";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME + " — " + "an all-round magazine",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    type: "website",
    title: SITE_NAME + " — " + "an all-round magazine",
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME + " — " + "an all-round magazine",
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
  keywords: [
    "magazine",
    "design",
    "art",
    "culture",
    "fashion",
    "technology",
    "science",
    "business",
    "entertainment",
    "news",
    "lifestyle",
    "travel",
    "food",
    "music",
    "film",
    "tv",
    "sports",
    "gaming",
    "technology",
    "science",
    "business",
    "entertainment",
    "news",
    "lifestyle",
    "travel",
    "food",
    "music",
    "film",
    "tv",
    "sports",
    "gaming",
    "tayo adedigba",
    "adedigba",
    "adedigggba",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  );
}
