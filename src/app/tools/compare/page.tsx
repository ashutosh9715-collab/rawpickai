import type { Metadata } from "next";
import { getAllReviews } from "@/lib/content";
import CompareClient from "./Client";

export const metadata: Metadata = {
  title: "Compare AI Tools Side-by-Side — Pick Any 2 or 3 Tools",
  description: "Select any 2-3 AI tools and compare scores, pricing, strengths, and weaknesses side-by-side. Data from our hands-on reviews with USD + INR pricing.",
  alternates: { canonical: "https://rawpickai.com/tools/compare" },
};

export default async function Page() {
  const allReviews = await getAllReviews();
  const tools = allReviews
    .filter((r) => r.frontmatter.overallScore && r.frontmatter.scores)
    .map((r) => ({
      slug: r.slug,
      name: r.frontmatter.toolName || r.frontmatter.title.split(" Review")[0].split(":")[0].replace(/"/g, ""),
      category: r.frontmatter.category || "",
      overall: r.frontmatter.overallScore || 0,
      scores: {
        easeOfUse: r.frontmatter.scores?.easeOfUse || 0,
        outputQuality: r.frontmatter.scores?.outputQuality || 0,
        valueForMoney: r.frontmatter.scores?.valueForMoney || 0,
        featureDepth: r.frontmatter.scores?.featureDepth || 0,
        freeTier: r.frontmatter.scores?.freeTier || 0,
      },
      pricingUSD: (r.frontmatter as unknown as Record<string, unknown>).pricingUSD as string || "",
      pricingINR: (r.frontmatter as unknown as Record<string, unknown>).pricingINR as string || "",
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return <CompareClient tools={tools} />;
}
