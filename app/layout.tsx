import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ReactLenis } from "lenis/react";
import {
  OrganizationSchema,
  WebsiteSchema,
} from "./components/seo/StrucrutedData";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trshpnda.ca"),

  title: {
    default: "TRSHPNDA — Premium Everyday Headwear",
    template: "%s | TRSHPNDA",
  },

  description:
    "Shop premium caps designed for everyday wear. Discover structured, washed, and minimalist headwear made with quality materials and designed for modern style.",

  keywords: [
    "caps",
    "caps online",
    "buy caps online",
    "premium caps",
    "premium headwear",
    "everyday caps",
    "fashion caps",
    "streetwear caps",
    "men's caps",
    "women's caps",
    "baseball caps",
    "cotton caps",
  ],

  authors: [
    {
      name: "TRSHPNDA",
    },
  ],

  creator: "TRSHPNDA",
  publisher: "TRSHPNDA",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "/",
    siteName: "TRSHPNDA",
    title: "TRSHPNDA — Premium Everyday Headwear",
    description:
      "Premium caps designed for everyday wear. Discover modern headwear built around quality, comfort, and effortless style.",
    images: [
      {
        url: "/trshpndajpeg.jpeg",
        width: 1200,
        height: 630,
        alt: "TRSHPNDA premium headwear",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "TRSHPNDA — Premium Everyday Headwear",
    description:
      "Premium caps designed for everyday wear.",
    images: ["/trshpndajpeg.jpeg"],
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA">
      <body className={`${geist.variable} antialiased`}>
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