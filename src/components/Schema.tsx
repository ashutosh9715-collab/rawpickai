import { Tool } from "@/lib/types";

export function ToolSchema({ tool }: { tool: Tool }) {
  const overall = Math.round(
    Object.values(tool.scores).reduce((a, b) => a + b) /
      Object.values(tool.scores).length
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // Product schema
      {
        "@type": "SoftwareApplication",
        name: tool.name,
        applicationCategory: "AI Tool",
        description: tool.tagline,
        url: tool.url,
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "INR",
          lowPrice: tool.pricing[0]?.price === "₹0" ? "0" : tool.pricing[0]?.price.replace("₹", "").replace(",", ""),
          offerCount: tool.pricing.length,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: tool.rating,
          bestRating: 5,
          worstRating: 1,
          ratingCount: 1,
        },
      },
      // Review schema
      {
        "@type": "Review",
        name: `${tool.name} Review`,
        reviewBody: tool.summary,
        author: {
          "@type": "Organization",
          name: "RawPickAI",
          url: "https://rawpickai.com",
        },
        publisher: {
          "@type": "Organization",
          name: "RawPickAI",
          url: "https://rawpickai.com",
        },
        datePublished: tool.lastUpdated,
        dateModified: tool.lastUpdated,
        itemReviewed: {
          "@type": "SoftwareApplication",
          name: tool.name,
          url: tool.url,
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: tool.rating,
          bestRating: 5,
          worstRating: 1,
        },
      },
      // FAQ schema
      {
        "@type": "FAQPage",
        mainEntity: tool.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      },
      // Breadcrumb schema
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://rawpickai.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: tool.category,
            item: `https://rawpickai.com/category/${tool.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: tool.name,
            item: `https://rawpickai.com/tool/${tool.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BestOfSchema({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    author: {
      "@type": "Organization",
      name: "RawPickAI",
      url: "https://rawpickai.com",
    },
    publisher: {
      "@type": "Organization",
      name: "RawPickAI",
      url: "https://rawpickai.com",
    },
    mainEntityOfPage: url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
