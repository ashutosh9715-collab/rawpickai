import { NextResponse } from "next/server";
import { getAllNewsSlugs, getNewsBySlug, getAllBlogSlugs, getBlogBySlug } from "@/lib/content";

export async function GET() {
  const baseUrl = "https://rawpickai.com";

  // Get all news briefs
  const newsSlugs = getAllNewsSlugs();
  const newsEntries = (await Promise.all(
    newsSlugs.map(async (slug) => {
      const page = await getNewsBySlug(slug);
      if (!page) return null;
      return {
        slug,
        url: `${baseUrl}/news/${slug}`,
        lastUpdated: page.frontmatter.lastUpdated,
        title: page.frontmatter.title,
      };
    })
  )).filter(Boolean) as { slug: string; url: string; lastUpdated: string; title: string }[];

  // Get blog posts that are news-related (roundups)
  const blogSlugs = getAllBlogSlugs();
  const blogEntries = (await Promise.all(
    blogSlugs
      .filter((s) => s.includes("news-roundup"))
      .map(async (slug) => {
        const page = await getBlogBySlug(slug);
        if (!page) return null;
        return {
          slug,
          url: `${baseUrl}/blog/${slug}`,
          lastUpdated: page.frontmatter.lastUpdated,
          title: page.frontmatter.title,
        };
      })
  )).filter(Boolean) as { slug: string; url: string; lastUpdated: string; title: string }[];

  const allEntries = [...newsEntries, ...blogEntries]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());

  // Google News sitemap spec: only include articles from the last 48 hours
  // Older articles should remain in the regular sitemap but not the news sitemap
  const now = new Date();
  const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);
  const recentEntries = allEntries.filter(
    (entry) => new Date(entry.lastUpdated).getTime() >= twoDaysAgo.getTime()
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${recentEntries.length === 0 ? "" : recentEntries
  .map(
    (entry) => `  <url>
    <loc>${entry.url}</loc>
    <news:news>
      <news:publication>
        <news:name>RawPickAI</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${entry.lastUpdated}</news:publication_date>
      <news:title>${entry.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")}</news:title>
    </news:news>
    <lastmod>${entry.lastUpdated}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
