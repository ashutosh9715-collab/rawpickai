import { MetadataRoute } from "next";
import { getAllReviewSlugs, getAllComparisonSlugs, getAllBestOfSlugs, getAllBlogSlugs, getAllNewsSlugs, getAllLearnSlugs, getReviewBySlug, getComparisonBySlug, getBestOfBySlug, getBlogBySlug, getNewsBySlug, getLearnBySlug } from "@/lib/content";
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
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${baseUrl}/learn`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/news`, lastModified: now, changeFrequency: "daily" as const, priority: 0.95 },
    { url: `${baseUrl}/deals`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/categories`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/methodology`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/studies`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.85 },
    { url: `${baseUrl}/studies/2026-ai-tools-reality-check`, lastModified: "2026-04-18", changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/newsletter`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/affiliate-disclosure`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.2 },
    // Interactive tools
    { url: `${baseUrl}/tools/ai-tool-finder`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/tools/cost-calculator`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/tools/pricing-calculator`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/tools/savings-calculator`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/tools/free-tier-comparison`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/tools/transparency-index`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.85 },
    { url: `${baseUrl}/tools/price-tracker`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/tools/quiz`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/tools/compare`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
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

  // Blog posts — use lastUpdated from frontmatter
  const blogSlugs = getAllBlogSlugs();
  const blogPages = await Promise.all(
    blogSlugs.map(async (slug) => {
      const page = await getBlogBySlug(slug);
      const lastmod = page?.frontmatter?.lastUpdated
        ? new Date(page.frontmatter.lastUpdated).toISOString()
        : now;
      return {
        url: `${baseUrl}/blog/${slug}`,
        lastModified: lastmod,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      };
    })
  );

  // News posts — daily changeFrequency, high priority for Discover freshness signal
  const newsSlugs = getAllNewsSlugs();
  const newsPages = await Promise.all(
    newsSlugs.map(async (slug) => {
      const page = await getNewsBySlug(slug);
      const lastmod = page?.frontmatter?.lastUpdated
        ? new Date(page.frontmatter.lastUpdated).toISOString()
        : now;
      return {
        url: `${baseUrl}/news/${slug}`,
        lastModified: lastmod,
        changeFrequency: "daily" as const,
        priority: 0.85,
      };
    })
  );

  // Learn posts — evergreen, monthly changeFrequency
  const learnSlugs = getAllLearnSlugs();
  const learnPages = await Promise.all(
    learnSlugs.map(async (slug) => {
      const page = await getLearnBySlug(slug);
      const lastmod = page?.frontmatter?.lastUpdated
        ? new Date(page.frontmatter.lastUpdated).toISOString()
        : now;
      return {
        url: `${baseUrl}/learn/${slug}`,
        lastModified: lastmod,
        changeFrequency: "monthly" as const,
        priority: 0.85,
      };
    })
  );

  return [...staticPages, ...reviewPages, ...comparisonPages, ...bestOfPages, ...categoryPages, ...blogPages, ...newsPages, ...learnPages];
}
