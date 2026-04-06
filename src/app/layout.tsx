import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: {
    default: "RawPickAI — Independent AI Tool Reviews & Comparisons",
    template: "%s | RawPickAI",
  },
  description:
    "Find the right AI tool for your workflow. We test every tool ourselves and score them honestly. Independent reviews, side-by-side comparisons, and pricing in INR. No sponsored rankings, ever.",
  metadataBase: new URL("https://rawpickai.com"),
  keywords: [
    "AI tools",
    "AI tool reviews",
    "best AI tools",
    "AI tool comparison",
    "ChatGPT alternatives",
    "AI tools India",
    "AI tool pricing INR",
  ],
  authors: [{ name: "RawPickAI Team" }],
  creator: "RawPickAI",
  publisher: "RawPickAI",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "RawPickAI",
    title: "RawPickAI — Independent AI Tool Reviews & Comparisons",
    description:
      "We test every AI tool ourselves. Honest scores, side-by-side comparisons, pricing in INR. No sponsored rankings.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "RawPickAI — Independent AI Tool Reviews" }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@rawpickai",
    images: ["/og-image.png"],
  },
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
  alternates: {
    canonical: "https://rawpickai.com",
  },
};

// JSON-LD structured data for the site
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "RawPickAI",
  url: "https://rawpickai.com",
  description:
    "Independent AI tool reviews and comparisons. Every tool tested by hand.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://rawpickai.com/tools?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-TN528FMYR7";

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {gaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`,
              }}
            />
          </>
        )}
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
