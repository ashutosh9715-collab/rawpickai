import type { Metadata } from "next";

/**
 * Recovery allowlist for content that may remain in Google while the archive is
 * audited. Everything else stays available to editors and direct visitors but
 * receives noindex and is excluded from the sitemap.
 *
 * Reviews remain indexable only after an evidence audit confirms original
 * screenshots and a documented first-hand test session.
 */
export const INDEXABLE_REVIEW_SLUGS = new Set([
  "deevid-ai",
  "gumloop",
  "zapier",
]);

export const INDEXABLE_BLOG_SLUGS = new Set([
  "ai-agents-vs-agentic-ai",
  "claude-code-vs-cursor-vs-codex",
  "how-to-cancel-chatgpt-subscription",
  "how-to-use-chatgpt-effectively",
  "sora-vs-runway-vs-pika",
  "what-is-vibe-coding",
]);

export const INDEXABLE_COMPARISON_SLUGS = new Set([
  "chatgpt-vs-claude",
  "claude-vs-chatgpt-vs-gemini",
  "cursor-vs-github-copilot",
  "lovable-vs-v0-vs-bolt",
  "notion-ai-vs-coda-ai",
]);

export function isBlogIndexable(slug: string): boolean {
  return INDEXABLE_BLOG_SLUGS.has(slug);
}

export function isReviewIndexable(slug: string): boolean {
  return INDEXABLE_REVIEW_SLUGS.has(slug);
}

export function isComparisonIndexable(slug: string): boolean {
  return INDEXABLE_COMPARISON_SLUGS.has(slug);
}

export const NOINDEX_ROBOTS: NonNullable<Metadata["robots"]> = {
  index: false,
  follow: true,
  googleBot: { index: false, follow: true },
};
