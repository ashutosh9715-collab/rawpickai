import { MetadataRoute } from "next";
import { getAllReviewSlugs, getAllComparisonSlugs, getAllBestOfSlugs, getReviewBySlug, getComparisonBySlug, getBestOfBySlug } from "@/lib/content";
import { categories } from "@/data/tools";

// SEO FIX: Real lastmod dates per page instead of build time for all
// This tells Google which pages were actually recently updated
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://rawpickai.com";
  const now = new Date().toISOString();

  const staticPages = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/tools`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/compare`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/best`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/categories`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/methodology`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/newsletter`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: "2026-04-01", changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/affiliate-disclosure`, lastModified: "2026-04-01", changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: "2026-04-01", changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${baseUrl}/terms`, lastModified: "2026-04-01", changeFrequency: "yearly" as const, priority: 0.2 },
  ];

  // Reviews — use lastUpdated from each file's frontmatter
  const reviewSlugs = getAllReviewSlugs();
  const reviewPages = await Promise.all(
    reviewSlugs.map(async (slug) => {
      const page = await getReviewBySlug(slug);
      const lastmod = page?.frontmatter?.lastUpdated
        ? new Date(page.frontmatter.lastUpdated).toISOString()
        : now;
      return {
        url: `${baseUrl}/review/${slug}`,
        lastModified: lastmod,
        changeFrequency: "monthly" as const,
        priority: 0.9,
      };
    })
  );

  // Comparisons — use lastUpdated from frontmatter
  const comparisonSlugs = getAllComparisonSlugs();
  const comparisonPages = await Promise.all(
    comparisonSlugs.map(async (slug) => {
      const page = await getComparisonBySlug(slug);
      const lastmod = page?.frontmatter?.lastUpdated
        ? new Date(page.frontmatter.lastUpdated).toISOString()
        : now;
      return {
        url: `${baseUrl}/comparison/${slug}`,
        lastModified: lastmod,
        changeFrequency: "monthly" as const,
        priority: 0.85,
      };
    })
  );

  // Best-of — use lastUpdated from frontmatter
  // NOTE: slugs are now year-agnostic (e.g. best-ai-writing-tools, not best-ai-writing-tools-2026)
  const bestOfSlugs = getAllBestOfSlugs();
  const bestOfPages = await Promise.all(
    bestOfSlugs.map(async (slug) => {
      const page = await getBestOfBySlug(slug);
      const lastmod = page?.frontmatter?.lastUpdated
        ? new Date(page.frontmatter.lastUpdated).toISOString()
        : now;
      return {
        url: `${baseUrl}/best-of/${slug}`,
        lastModified: lastmod,
        changeFrequency: "monthly" as const,
        priority: 0.85,
      };
    })
  );

  const categoryPages = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...reviewPages, ...comparisonPages, ...bestOfPages, ...categoryPages];
}
