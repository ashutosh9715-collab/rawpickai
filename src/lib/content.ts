import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

const reviewsDir = path.join(process.cwd(), "content/reviews");
const comparisonsDir = path.join(process.cwd(), "content/comparisons");
const bestOfDir = path.join(process.cwd(), "content/best-of");
const blogDir = path.join(process.cwd(), "content/blog");

export interface ContentFrontmatter {
  title: string;
  description: string;
  slug: string;
  lastUpdated: string;
  author: string;
  schema: string;
  category: string;
  ogImage?: string;
  toolName?: string;
  toolA?: string;
  toolB?: string;
  toolC?: string;
  winner?: string;
  developer?: string;
  overallScore?: number;
  scores?: {
    overall?: number;
    easeOfUse?: number;
    outputQuality?: number;
    valueForMoney?: number;
    featureDepth?: number;
    freeTier?: number;
  };
  pricing?: {
    currency?: string[];
    plans?: { name: string; priceUSD: number | string; priceINR: number | string }[];
  };
}

export interface ContentPage {
  slug: string;
  frontmatter: ContentFrontmatter;
  content: string;
  htmlContent: string;
}

// Fix Date objects and return clean frontmatter
function cleanFrontmatter(data: Record<string, any>): Record<string, any> {
  const fm = { ...data };
  for (const key of Object.keys(fm)) {
    if (fm[key] instanceof Date) {
      fm[key] = fm[key].toISOString().split("T")[0];
    }
  }
  return fm;
}

// Generic: get all slugs from a directory
function getSlugsFromDir(dir: string, suffix: string = ""): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(suffix, "").replace(".md", ""));
}

// Generic: get content page by slug from a directory
async function getPageFromDir(dir: string, slug: string, filePatterns: string[]): Promise<ContentPage | null> {
  let filePath = "";
  for (const pattern of filePatterns) {
    const tryPath = path.join(dir, pattern);
    if (fs.existsSync(tryPath)) {
      filePath = tryPath;
      break;
    }
  }
  if (!filePath) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = cleanFrontmatter(data);
  const processedContent = await remark().use(remarkGfm).use(html).process(content);

  return {
    slug,
    frontmatter: frontmatter as ContentFrontmatter,
    content,
    htmlContent: processedContent.toString(),
  };
}

// ===== REVIEWS =====
export function getAllReviewSlugs(): string[] {
  return getSlugsFromDir(reviewsDir, "-review");
}

export async function getReviewBySlug(slug: string): Promise<ContentPage | null> {
  return getPageFromDir(reviewsDir, slug, [`${slug}-review.md`, `${slug}.md`]);
}

export async function getAllReviews(): Promise<ContentPage[]> {
  const slugs = getAllReviewSlugs();
  const pages = await Promise.all(slugs.map((s) => getReviewBySlug(s)));
  return pages.filter(Boolean) as ContentPage[];
}

// ===== COMPARISONS =====
export function getAllComparisonSlugs(): string[] {
  return getSlugsFromDir(comparisonsDir);
}

export async function getComparisonBySlug(slug: string): Promise<ContentPage | null> {
  return getPageFromDir(comparisonsDir, slug, [`${slug}.md`]);
}

export async function getAllComparisons(): Promise<ContentPage[]> {
  const slugs = getAllComparisonSlugs();
  const pages = await Promise.all(slugs.map((s) => getComparisonBySlug(s)));
  return pages.filter(Boolean) as ContentPage[];
}

// ===== BEST-OF =====
export function getAllBestOfSlugs(): string[] {
  return getSlugsFromDir(bestOfDir);
}

export async function getBestOfBySlug(slug: string): Promise<ContentPage | null> {
  return getPageFromDir(bestOfDir, slug, [`${slug}.md`]);
}

export async function getAllBestOf(): Promise<ContentPage[]> {
  const slugs = getAllBestOfSlugs();
  const pages = await Promise.all(slugs.map((s) => getBestOfBySlug(s)));
  return pages.filter(Boolean) as ContentPage[];
}

// ===== BLOG =====
export function getAllBlogSlugs(): string[] {
  return getSlugsFromDir(blogDir);
}

export async function getBlogBySlug(slug: string): Promise<ContentPage | null> {
  return getPageFromDir(blogDir, slug, [`${slug}.md`]);
}

export async function getAllBlogPosts(): Promise<ContentPage[]> {
  const slugs = getAllBlogSlugs();
  const pages = await Promise.all(slugs.map((s) => getBlogBySlug(s)));
  const posts = pages.filter(Boolean) as ContentPage[];
  // Sort by lastUpdated desc
  posts.sort((a, b) => (b.frontmatter.lastUpdated || "").localeCompare(a.frontmatter.lastUpdated || ""));
  return posts;
}
