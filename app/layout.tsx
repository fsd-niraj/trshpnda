import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { ReactLenis } from "lenis/react";
import "./globals.css";

import {
  OrganizationSchema,
  WebsiteSchema,
} from "./components/seo/StrucrutedData";
import { openGraphImageUrl, siteUrl } from "./data";
import { Oswald, DM_Sans } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: { icon: "/trshpnda_favicon.ico" },
  title: {
    default: "TRSHPNDA — Premium Everyday Headwear",
    template: "%s | TRSHPNDA",
  },
  description:
    "Shop premium caps designed for everyday wear. Discover structured, washed, and minimalist headwear made with quality materials and modern style.",
  keywords: [
    "premium caps",
    "streetwear caps",
    "baseball caps",
    "everyday headwear",
    "cotton caps",
    "washed caps",
  ],
  authors: [{ name: "TRSHPNDA" }],
  creator: "TRSHPNDA",
  publisher: "TRSHPNDA",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: siteUrl,
    siteName: "TRSHPNDA",
    title: "TRSHPNDA — Premium Everyday Headwear",
    description:
      "Discover premium caps designed for everyday wear. Explore the TRSHPNDA collection.",
    images: [
      {
        url: openGraphImageUrl,
        width: 1200,
        height: 630,
        alt: "TRSHPNDA premium streetwear caps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TRSHPNDA — Premium Everyday Headwear",
    description: "Discover premium caps designed for everyday wear.",
    images: [openGraphImageUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "fashion",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA">
      <body
        className={`m-0 bg-paper font-sans text-ink antialiased ${oswald.variable} ${dmSans.variable}`}
      >
        <OrganizationSchema />
        <WebsiteSchema />
        <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
          {children}
        </ReactLenis>
        <Analytics />
      </body>
    </html>
  );
}
