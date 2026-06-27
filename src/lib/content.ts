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
const newsDir = path.join(process.cwd(), "content/news");
const learnDir = path.join(process.cwd(), "content/learn");

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
  pricingUSD?: string;
  pricingINR?: string;
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

// Heuristic: derive an uppercase category label from an H2's plain-text content.
function deriveH2Label(raw: string): string {
  // Strip any inline HTML tags
  const text = raw.replace(/<[^>]+>/g, "").trim();
  const t = text.toLowerCase();

  // Keyword map — most specific first
  const map: Array<[RegExp, string]> = [
    [/\bfaq\b|frequently asked/, "FAQ"],
    [/bottom line|summary|\btl;?dr\b|wrap[- ]?up|in summary/, "SUMMARY"],
    [/verdict|final thought|conclusion|should you (use|buy|try)|honest (take|answer)/, "VERDICT"],
    [/ranking|\brank\b|top \d+|best \d+|tier \d+|tier ?list/, "RANKING"],
    [/pricing|\bcost\b|\bprice\b|how much|\bplans?\b|pricing tiers?/, "PRICING"],
    [/benchmark|performance|speed test|scores?\b|tested|test results/, "BENCHMARKS"],
    [/new feature|\bfeatures\b|what[' ]s new|capabilit/, "FEATURES"],
    [/pros? ?(and|&|\/) ?cons?/, "PROS & CONS"],
    [/don'?t like|drawback|downside|\bcons\b|limitation|problem|weakness|frustrat|issue|complaint/, "DOWNSIDES"],
    [/what i like|strength|highlight|love about/, "STRENGTHS"],
    [/who (should|is|'s)|audience|for (who|whom)|best for|ideal for|who.*(elsewhere|avoid|skip)/, "AUDIENCE"],
    [/alternative|competitor/, "ALTERNATIVES"],
    [/use cases?|what (can|it) (do|does)|real[- ]?world|applications?\b/, "USE CASES"],
    [/\bvs\b|versus|compared|comparison|head[- ]?to[- ]?head/, "COMPARISON"],
    [/how to|getting started|setup|install|quick start|onboarding/, "SETUP"],
    [/what (is|are|exactly) (an?|the)?|definition|explained|overview|introduction|understand/, "OVERVIEW"],
    [/quality|writing quality|output quality/, "QUALITY"],
    [/methodology|how (we|i) test|our method/, "METHOD"],
    [/examples?\b|\bdemos?\b|in practice/, "EXAMPLES"],
    [/tutorial|guide|walkthrough/, "GUIDE"],
    [/security|privacy|safe|data protection/, "SECURITY"],
    [/integration|plugin|extension|\bapi\b|mcp\b/, "INTEGRATIONS"],
    [/update|changelog|release|new in|changes/, "UPDATES"],
    [/honesty|ethics|ethical|responsible|detection|detect/, "ETHICS"],
    [/frameworks?\b|smaller (agent|tool|model)/, "FRAMEWORKS"],
    [/the (short|quick) (answer|version)|key (point|takeaway)/, "KEY POINTS"],
    [/confusion|mistake|misconception|myth/, "CLARITY"],
    [/safety|\bsafe\b|risk/, "SAFETY"],
  ];

  for (const [re, label] of map) {
    if (re.test(t)) return label;
  }

  // Fallback: last significant word before any em-dash/colon
  const head = text.split(/[—:\-]/)[0];
  const stop = /^(the|a|an|and|or|but|is|are|was|were|be|been|being|what|who|how|when|where|why|which|that|this|these|those|my|your|our|their|its|it|they|them|i|we|us|you|can|could|should|would|will|shall|do|does|did|have|has|had|not|no|yes|for|to|of|in|on|at|by|with|about|as|from|into|onto|upon|over|under|after|before|cursor|chatgpt|claude|gpt|openai|anthropic|google|ai|gpts|gen|gens|llms?|model|tool|tools|\d+)$/i;
  const words = head.split(/\s+/).filter((w) => w && !stop.test(w.replace(/[^a-zA-Z0-9]/g, "")));
  if (words.length) {
    return words[words.length - 1].replace(/[^a-zA-Z0-9]/g, "").toUpperCase() || "SECTION";
  }
  return "SECTION";
}

// Inject data-label attribute into every top-level <h2>...</h2> in rendered HTML.
function injectH2Labels(htmlStr: string): string {
  return htmlStr.replace(/<h2>([\s\S]*?)<\/h2>/g, (_m, inner) => {
    const label = deriveH2Label(inner);
    return `<h2 data-label="${label}">${inner}</h2>`;
  });
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
  // SEO FIX: Strip leading H1 from markdown — PageHero already renders the page H1.
  const contentWithoutH1 = content.replace(/^\s*#\s+.+\r?\n/, "");

  // Protect inline SVGs from remark parser. remark wraps SVG inner elements
  // (text, circle, etc.) in <p> tags because it doesn't recognize them as
  // SVG-context elements. We replace SVG blocks with placeholders, then restore.
  const svgs: string[] = [];
  const protectedContent = contentWithoutH1.replace(/<svg[\s\S]*?<\/svg>/g, (match) => {
    svgs.push(match);
    return `<!--SVG_PLACEHOLDER_${svgs.length - 1}-->`;
  });

  const processedContent = await remark().use(remarkGfm).use(html, { sanitize: false }).process(protectedContent);
  let htmlContent = injectH2Labels(processedContent.toString());

  // Restore SVGs
  htmlContent = htmlContent.replace(/<!--SVG_PLACEHOLDER_(\d+)-->/g, (_m, idx) => svgs[Number(idx)] || "");

  return {
    slug,
    frontmatter: frontmatter as ContentFrontmatter,
    content,
    htmlContent,
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

// ===== NEWS =====
// News briefs for Google Discover. NewsArticle schema, shorter form (300-500 words),
// daily publishing cadence. Kept separate from /blog to avoid keyword cannibalization.
export function getAllNewsSlugs(): string[] {
  if (!fs.existsSync(newsDir)) return [];
  return getSlugsFromDir(newsDir);
}

// ===== LEARN =====
// Evergreen explainers, frameworks, skills, research. Long-form (5000+ words).
// Different from /blog (news-driven) and /review (tool-driven).
export function getAllLearnSlugs(): string[] {
  if (!fs.existsSync(learnDir)) return [];
  return getSlugsFromDir(learnDir);
}

export async function getLearnBySlug(slug: string): Promise<ContentPage | null> {
  return getPageFromDir(learnDir, slug, [`${slug}.mdx`, `${slug}.md`]);
}

export async function getAllLearnPosts(): Promise<ContentPage[]> {
  const slugs = getAllLearnSlugs();
  const pages = await Promise.all(slugs.map((s) => getLearnBySlug(s)));
  const posts = pages.filter(Boolean) as ContentPage[];
  posts.sort((a, b) => (b.frontmatter.lastUpdated || "").localeCompare(a.frontmatter.lastUpdated || ""));
  return posts;
}

export async function getNewsBySlug(slug: string): Promise<ContentPage | null> {
  return getPageFromDir(newsDir, slug, [`${slug}.md`]);
}

export async function getAllNews(): Promise<ContentPage[]> {
  const slugs = getAllNewsSlugs();
  const pages = await Promise.all(slugs.map((s) => getNewsBySlug(s)));
  const posts = pages.filter(Boolean) as ContentPage[];
  posts.sort((a, b) => (b.frontmatter.lastUpdated || "").localeCompare(a.frontmatter.lastUpdated || ""));
  return posts;
}

// ===== RELATED CONTENT =====
// Mapping of tool slugs to their "what's new" blog post and related pages
export const whatsNewMap: Record<string, { text: string; href: string }> = {
  "cursor": { text: "Cursor 3 launched with Agents Window and Design Mode", href: "/blog/cursor-3-review" },
  "windsurf": { text: "Windsurf vs Cursor comparison updated for 2026", href: "/comparison/windsurf-vs-cursor" },
  "elevenlabs": { text: "ElevenLabs vs Murf AI comparison now live", href: "/comparison/elevenlabs-vs-murf-ai" },
  "claude": { text: "Claude vs ChatGPT vs Gemini — 3-way comparison", href: "/comparison/claude-vs-chatgpt-vs-gemini" },
  "chatgpt": { text: "Claude vs ChatGPT vs Gemini — 3-way comparison", href: "/comparison/claude-vs-chatgpt-vs-gemini" },
  "google-gemini": { text: "Gemini vs ChatGPT comparison now live", href: "/comparison/gemini-vs-chatgpt" },
  "midjourney": { text: "Sora vs Runway vs Pika — AI video comparison", href: "/blog/sora-vs-runway-vs-pika" },
  "perplexity": { text: "Perplexity vs ChatGPT comparison updated", href: "/comparison/perplexity-vs-chatgpt" },
  "github-copilot": { text: "Cursor vs GitHub Copilot — updated for 2026", href: "/comparison/cursor-vs-github-copilot" },
  "claude-code": { text: "Claude Code vs Cursor 3 comparison now live", href: "/blog/claude-code-vs-cursor-3" },
  "runway": { text: "Sora vs Runway vs Pika comparison", href: "/blog/sora-vs-runway-vs-pika" },
  "pika": { text: "Sora vs Runway vs Pika comparison", href: "/blog/sora-vs-runway-vs-pika" },
  "gamma": { text: "Best AI Tools for PPT — Gamma ranked #1", href: "/best-of/best-ai-tools-for-ppt" },
  "notion-ai": { text: "Notion AI vs Coda AI comparison live", href: "/comparison/notion-ai-vs-coda-ai" },
};

export type RelatedItem = { title: string; href: string; type: string; date: string };

export function getRelatedContent(slug: string, category: string, contentType: "review" | "blog" | "comparison" | "best-of"): RelatedItem[] {
  // Hardcoded related content map by category
  const categoryRelated: Record<string, RelatedItem[]> = {
    "Code Assistants": [
      { title: "Cursor 3 Review: What's New", href: "/blog/cursor-3-review", type: "Blog", date: "Apr 2026" },
      { title: "Claude Code vs Cursor 3", href: "/blog/claude-code-vs-cursor-3", type: "Blog", date: "Apr 2026" },
      { title: "Composer 2 vs Claude Sonnet 4.6", href: "/blog/composer-2-vs-claude-sonnet", type: "Blog", date: "Apr 2026" },
      { title: "Windsurf vs Cursor 2026", href: "/comparison/windsurf-vs-cursor", type: "Comparison", date: "Apr 2026" },
      { title: "Cursor vs GitHub Copilot", href: "/comparison/cursor-vs-github-copilot", type: "Comparison", date: "Apr 2026" },
      { title: "Best AI Coding Tools 2026", href: "/blog/best-ai-coding-tools-2026", type: "Blog", date: "Apr 2026" },
    ],
    "AI Assistants": [
      { title: "Claude vs ChatGPT vs Gemini", href: "/comparison/claude-vs-chatgpt-vs-gemini", type: "Comparison", date: "Apr 2026" },
      { title: "Gemini vs ChatGPT", href: "/comparison/gemini-vs-chatgpt", type: "Comparison", date: "Apr 2026" },
      { title: "Claude vs Perplexity", href: "/comparison/claude-vs-perplexity", type: "Comparison", date: "Apr 2026" },
      { title: "Best ChatGPT Alternatives", href: "/best-of/best-chatgpt-alternatives", type: "Best Of", date: "Apr 2026" },
    ],
    "Video & Audio": [
      { title: "Sora vs Runway vs Pika", href: "/blog/sora-vs-runway-vs-pika", type: "Blog", date: "Apr 2026" },
      { title: "Runway vs Pika", href: "/comparison/runway-vs-pika", type: "Comparison", date: "Apr 2026" },
      { title: "ElevenLabs vs Murf AI", href: "/comparison/elevenlabs-vs-murf-ai", type: "Comparison", date: "Apr 2026" },
      { title: "Best AI Video Generators", href: "/best-of/best-ai-video-generators", type: "Best Of", date: "Apr 2026" },
    ],
    "Image Generation": [
      { title: "Best AI Image Generators", href: "/best-of/best-ai-image-generators", type: "Best Of", date: "Apr 2026" },
      { title: "Midjourney vs DALL-E 3", href: "/comparison/midjourney-vs-dalle3", type: "Comparison", date: "Apr 2026" },
    ],
    "Writing & Content": [
      { title: "Best AI Writing Tools", href: "/best-of/best-ai-writing-tools", type: "Best Of", date: "Apr 2026" },
      { title: "Jasper vs Copy.ai", href: "/comparison/jasper-vs-copyai", type: "Comparison", date: "Apr 2026" },
    ],
    "Productivity & Presentations": [
      { title: "Best AI Tools for PPT", href: "/best-of/best-ai-tools-for-ppt", type: "Best Of", date: "Apr 2026" },
      { title: "Gamma vs Beautiful.ai", href: "/comparison/gamma-vs-beautiful-ai", type: "Comparison", date: "Apr 2026" },
      { title: "Gamma vs Canva AI", href: "/comparison/gamma-vs-canva-ai", type: "Comparison", date: "Apr 2026" },
    ],
    "Research & Education": [
      { title: "Perplexity vs ChatGPT", href: "/comparison/perplexity-vs-chatgpt", type: "Comparison", date: "Apr 2026" },
      { title: "Best AI Tools for Students", href: "/best-of/best-ai-tools-for-students", type: "Best Of", date: "Apr 2026" },
      { title: "Best Free AI Tools", href: "/best-of/best-free-ai-tools", type: "Best Of", date: "Apr 2026" },
    ],
    "AI Coding Tools": [
      { title: "Cursor 3 Review", href: "/blog/cursor-3-review", type: "Blog", date: "Apr 2026" },
      { title: "Claude Code vs Cursor 3", href: "/blog/claude-code-vs-cursor-3", type: "Blog", date: "Apr 2026" },
      { title: "Composer 2 vs Claude Sonnet 4.6", href: "/blog/composer-2-vs-claude-sonnet", type: "Blog", date: "Apr 2026" },
      { title: "Best AI Coding Tools 2026", href: "/blog/best-ai-coding-tools-2026", type: "Blog", date: "Apr 2026" },
      { title: "Windsurf vs Cursor", href: "/comparison/windsurf-vs-cursor", type: "Comparison", date: "Apr 2026" },
    ],
    "AI Voice & Audio": [
      { title: "ElevenLabs vs Murf AI", href: "/comparison/elevenlabs-vs-murf-ai", type: "Comparison", date: "May 2026" },
      { title: "Murf AI Review", href: "/review/murf-ai", type: "Review", date: "Apr 2026" },
      { title: "Descript Review", href: "/review/descript", type: "Review", date: "Apr 2026" },
      { title: "Best AI Video Generators", href: "/best-of/best-ai-video-generators", type: "Best Of", date: "Apr 2026" },
    ],
    "Video & Audio Editing": [
      { title: "ElevenLabs vs Murf AI", href: "/comparison/elevenlabs-vs-murf-ai", type: "Comparison", date: "May 2026" },
      { title: "Sora vs Runway vs Pika", href: "/blog/sora-vs-runway-vs-pika", type: "Blog", date: "Apr 2026" },
      { title: "Best AI Video Generators", href: "/best-of/best-ai-video-generators", type: "Best Of", date: "Apr 2026" },
    ],
    "AI Video Generators": [
      { title: "Sora vs Runway vs Pika", href: "/blog/sora-vs-runway-vs-pika", type: "Blog", date: "Apr 2026" },
      { title: "Best AI Video Generators", href: "/best-of/best-ai-video-generators", type: "Best Of", date: "Apr 2026" },
      { title: "ElevenLabs vs Murf AI", href: "/comparison/elevenlabs-vs-murf-ai", type: "Comparison", date: "May 2026" },
      { title: "Runway vs Pika", href: "/comparison/runway-vs-pika", type: "Comparison", date: "Apr 2026" },
    ],
    "AI Writing Tools": [
      { title: "Best AI Writing Tools", href: "/best-of/best-ai-writing-tools", type: "Best Of", date: "Apr 2026" },
      { title: "Jasper vs Copy.ai", href: "/comparison/jasper-vs-copyai", type: "Comparison", date: "Apr 2026" },
      { title: "Best ChatGPT Alternatives", href: "/best-of/best-chatgpt-alternatives", type: "Best Of", date: "Apr 2026" },
    ],
    "Writing Tools": [
      { title: "Best AI Writing Tools", href: "/best-of/best-ai-writing-tools", type: "Best Of", date: "Apr 2026" },
      { title: "Jasper vs Copy.ai", href: "/comparison/jasper-vs-copyai", type: "Comparison", date: "Apr 2026" },
    ],
    "AI Image Generation": [
      { title: "Best AI Image Generators", href: "/best-of/best-ai-image-generators", type: "Best Of", date: "Apr 2026" },
      { title: "Midjourney vs DALL-E 3", href: "/comparison/midjourney-vs-dalle3", type: "Comparison", date: "Apr 2026" },
      { title: "Stable Diffusion Review", href: "/review/stable-diffusion", type: "Review", date: "Apr 2026" },
    ],
    "Design & Creative": [
      { title: "Best AI Design Tools", href: "/best-of/best-ai-design-tools", type: "Best Of", date: "Apr 2026" },
      { title: "Canva AI Review", href: "/review/canva-ai", type: "Review", date: "Apr 2026" },
      { title: "Figma AI Review", href: "/review/figma-ai", type: "Review", date: "Apr 2026" },
      { title: "Looka Review", href: "/review/looka", type: "Review", date: "Apr 2026" },
    ],
    "Marketing & SEO": [
      { title: "Surfer SEO Review", href: "/review/surfer-seo", type: "Review", date: "Apr 2026" },
      { title: "Semrush AI Review", href: "/review/semrush-ai", type: "Review", date: "Apr 2026" },
      { title: "Best AI Writing Tools", href: "/best-of/best-ai-writing-tools", type: "Best Of", date: "Apr 2026" },
    ],
    "AI Logo & Brand Design": [
      { title: "Best AI Design Tools", href: "/best-of/best-ai-design-tools", type: "Best Of", date: "Apr 2026" },
      { title: "Canva AI Review", href: "/review/canva-ai", type: "Review", date: "Apr 2026" },
      { title: "Figma AI Review", href: "/review/figma-ai", type: "Review", date: "Apr 2026" },
    ],
    "AI Agents": [
      { title: "Best AI Agents 2026", href: "/blog/best-ai-agents-2026", type: "Blog", date: "Apr 2026" },
      { title: "Claude vs ChatGPT vs Gemini", href: "/comparison/claude-vs-chatgpt-vs-gemini", type: "Comparison", date: "Apr 2026" },
      { title: "Best ChatGPT Alternatives", href: "/best-of/best-chatgpt-alternatives", type: "Best Of", date: "Apr 2026" },
    ],
    "AI Search & Research": [
      { title: "Perplexity vs ChatGPT", href: "/comparison/perplexity-vs-chatgpt", type: "Comparison", date: "Apr 2026" },
      { title: "Best AI Tools for Students", href: "/best-of/best-ai-tools-for-students", type: "Best Of", date: "Apr 2026" },
      { title: "NotebookLM Review", href: "/review/google-notebooklm", type: "Review", date: "Apr 2026" },
    ],
    "Research": [
      { title: "Perplexity vs ChatGPT", href: "/comparison/perplexity-vs-chatgpt", type: "Comparison", date: "Apr 2026" },
      { title: "Best AI Tools for Students", href: "/best-of/best-ai-tools-for-students", type: "Best Of", date: "Apr 2026" },
      { title: "Best Free AI Tools", href: "/best-of/best-free-ai-tools", type: "Best Of", date: "Apr 2026" },
    ],
    "Productivity & AI": [
      { title: "Best AI Tools for PPT", href: "/best-of/best-ai-tools-for-ppt", type: "Best Of", date: "Apr 2026" },
      { title: "Gamma vs Beautiful.ai", href: "/comparison/gamma-vs-beautiful-ai", type: "Comparison", date: "Apr 2026" },
      { title: "Notion AI Review", href: "/review/notion-ai", type: "Review", date: "Apr 2026" },
    ],
    "AI Models": [
      { title: "Gemma 4 Review", href: "/blog/gemma-4-review", type: "Blog", date: "Apr 2026" },
      { title: "Microsoft MAI Models", href: "/blog/microsoft-mai-models-review", type: "Blog", date: "Apr 2026" },
      { title: "Claude vs ChatGPT vs Gemini", href: "/comparison/claude-vs-chatgpt-vs-gemini", type: "Comparison", date: "Apr 2026" },
    ],
    "AI News": [
      { title: "Claude Mythos Explained", href: "/blog/claude-mythos-explained-anthropic-unreleased-model", type: "Blog", date: "Apr 2026" },
      { title: "GLM-5.1 vs Claude Opus 4.6", href: "/blog/glm-5-1-vs-claude-opus-4-6-comparison", type: "Blog", date: "Apr 2026" },
      { title: "AI Tool News Roundup", href: "/blog/ai-tool-news-roundup-april-7-2026", type: "Blog", date: "Apr 2026" },
      { title: "Cursor 3 Review", href: "/blog/cursor-3-review", type: "Blog", date: "Apr 2026" },
      { title: "Gemma 4 Review", href: "/blog/gemma-4-review", type: "Blog", date: "Apr 2026" },
      { title: "Microsoft MAI Models", href: "/blog/microsoft-mai-models-review", type: "Blog", date: "Apr 2026" },
      { title: "Best AI Agents in 2026", href: "/blog/best-ai-agents-2026", type: "Blog", date: "Apr 2026" },
    ],
  };

  const items = categoryRelated[category] || categoryRelated["AI Assistants"];
  const currentHref = contentType === "review" ? `/review/${slug}` : contentType === "blog" ? `/blog/${slug}` : contentType === "comparison" ? `/comparison/${slug}` : `/best-of/${slug}`;
  return items.filter((item) => item.href !== currentHref).slice(0, 3);
}

// Studies
const studiesDir = path.join(process.cwd(), "content/studies");

export function getAllStudySlugs(): string[] {
  return getSlugsFromDir(studiesDir);
}

export async function getStudyBySlug(slug: string): Promise<ContentPage | null> {
  return getPageFromDir(studiesDir, slug, [`${slug}.md`]);
}
