import { MetadataRoute } from "next";
import { getAllReviewSlugs, getAllComparisonSlugs, getAllBlogSlugs, getReviewBySlug, getComparisonBySlug, getBlogBySlug } from "@/lib/content";
import { isBlogIndexable, isComparisonIndexable, isReviewIndexable } from "@/lib/indexing";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://rawpickai.com";
  const staticPages = [
    { url: baseUrl, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/tools`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/compare`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/deals`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/about`, changeFrequency: "yearly" as const, priority: 0.5 },
    { url: `${baseUrl}/methodology`, changeFrequency: "yearly" as const, priority: 0.6 },
    { url: `${baseUrl}/studies`, changeFrequency: "monthly" as const, priority: 0.85 },
    { url: `${baseUrl}/studies/2026-ai-tools-reality-check`, lastModified: "2026-04-18", changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/newsletter`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/contact`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/affiliate-disclosure`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${baseUrl}/tools/ai-tool-finder`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/tools/cost-calculator`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/tools/pricing-calculator`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/tools/savings-calculator`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/tools/free-tier-comparison`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/tools/transparency-index`, changeFrequency: "monthly" as const, priority: 0.85 },
    { url: `${baseUrl}/tools/price-tracker`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/tools/quiz`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/tools/compare`, changeFrequency: "monthly" as const, priority: 0.8 },
  ];

  const reviewPages = await Promise.all(
    getAllReviewSlugs().filter(isReviewIndexable).map(async (slug) => {
      const page = await getReviewBySlug(slug);
      const lastModified = page?.frontmatter?.lastUpdated
        ? new Date(page.frontmatter.lastUpdated).toISOString()
        : undefined;
      return { url: `${baseUrl}/review/${slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.9 };
    })
  );

  const comparisonPages = await Promise.all(
    getAllComparisonSlugs().filter(isComparisonIndexable).map(async (slug) => {
      const page = await getComparisonBySlug(slug);
      const lastModified = page?.frontmatter?.lastUpdated
        ? new Date(page.frontmatter.lastUpdated).toISOString()
        : undefined;
      return { url: `${baseUrl}/comparison/${slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.85 };
    })
  );

  const blogPages = await Promise.all(
    getAllBlogSlugs().filter(isBlogIndexable).map(async (slug) => {
      const page = await getBlogBySlug(slug);
      const lastModified = page?.frontmatter?.lastUpdated
        ? new Date(page.frontmatter.lastUpdated).toISOString()
        : undefined;
      return { url: `${baseUrl}/blog/${slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.85 };
    })
  );

  return [...staticPages, ...reviewPages, ...comparisonPages, ...blogPages];
}
