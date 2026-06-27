import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: {
    default: "RawPickAI — Independent AI Tool Reviews & Comparisons",
    template: "%s | RawPickAI",
  },
  description:
    "We test every AI tool ourselves and score them honestly. Independent reviews, comparisons, and pricing in USD + INR. No sponsored rankings.",
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
  authors: [{ name: "Ashutosh Khulbe", url: "https://rawpickai.com/about" }],
  creator: "Ashutosh Khulbe",
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
    locale: "en_US",
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

// Organization schema — helps Google rank for branded search + LLMs attribute citations
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RawPickAI",
  alternateName: ["RawPickAI - AI Tool Reviews", "Raw Pick AI"],
  url: "https://rawpickai.com",
  logo: {
    "@type": "ImageObject",
    url: "https://rawpickai.com/icon-192.png",
    width: "192",
    height: "192",
  },
  image: "https://rawpickai.com/icon-192.png",
  description:
    "RawPickAI is an independent AI tool review and comparison site. We test every AI tool ourselves, score them honestly on 5 criteria, and publish unbiased comparisons with pricing in USD and INR. No sponsored rankings, no affiliate bias.",
  foundingDate: "2025",
  founder: {
    "@type": "Person",
    name: "Ashutosh Khulbe",
    url: "https://rawpickai.com/about",
    sameAs: [
      "https://medium.com/@ashutoshkhulbe15",
      "https://www.linkedin.com/in/ashutosh-khulbe",
      "https://featured.com/p/ashutosh-k",
      "https://www.crunchbase.com/person/ashutosh-khulbe",
    ],
  },
  knowsAbout: [
    "Artificial Intelligence",
    "AI Tools",
    "AI Tool Reviews",
    "Large Language Models",
    "AI Code Assistants",
    "AI Image Generation",
    "AI Video Generation",
    "AI Tool Pricing",
    "Claude",
    "ChatGPT",
    "Gemini",
    "Cursor",
  ],
  sameAs: [
    "https://medium.com/@ashutoshkhulbe15",
    "https://www.linkedin.com/company/rawpickai",
    "https://featured.com/p/ashutosh-k",
    "https://www.crunchbase.com/person/ashutosh-khulbe",
    "https://www.producthunt.com/@rawpickai",
    "https://www.indiehackers.com/rawpickai",
    "https://www.quora.com/profile/Ashutosh-Khulbe-2",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@rawpickai.com",
    contactType: "Editorial",
    availableLanguage: ["English"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
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
        {/* Microsoft Clarity */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","wp4kbwjg3l");`,
          }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
