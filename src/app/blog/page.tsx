import Link from "next/link";
import { getAllBlogPosts } from "@/lib/content";

const catColors: Record<string, { bg: string; text: string }> = {
  "AI Coding Tools": { bg: "#F0FDFA", text: "#0D9488" },
  "AI Models": { bg: "#EEF2FF", text: "#6366F1" },
  "AI Video": { bg: "#FEF9C3", text: "#A16207" },
  "News Roundup": { bg: "#FFF7ED", text: "#C2410C" },
};

export const metadata = {
  title: "Blog — AI Tool News, Updates & Analysis | RawPickAI",
  description: "Latest AI tool launches, updates, comparisons, and industry news. Stay ahead of the AI curve with weekly analysis.",
  alternates: { canonical: "https://rawpickai.com/blog" },
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="max-w-[900px] mx-auto px-5 md:px-10 py-8 pb-20">
      <div className="text-xs mb-6" style={{ color: "var(--text-light)" }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-1.5">›</span>
        <span style={{ color: "var(--text-mid)" }}>Blog</span>
      </div>

      <div className="mb-8">
        <h1 className="heading text-2xl md:text-4xl font-bold mb-2" style={{ letterSpacing: "-0.03em" }}>Blog</h1>
        <p className="text-lg" style={{ color: "var(--text-mid)" }}>
          AI tool launches, updates, and analysis. Updated weekly.
        </p>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => {
          const cat = post.frontmatter.category || "";
          const colors = catColors[cat] || { bg: "#F4F4F5", text: "var(--text-mid)" };

          return (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div className="card card-hover flex items-start gap-5 !py-5 !px-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                    <span className="heading text-base font-semibold">{post.frontmatter.title}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="pill text-[10px]" style={{ background: colors.bg, color: colors.text }}>{cat}</span>
                    <span className="text-[11px] mono" style={{ color: "var(--text-light)" }}>{post.frontmatter.lastUpdated}</span>
                  </div>
                  <p className="text-[13px] leading-relaxed m-0" style={{ color: "var(--text-mid)" }}>
                    {(post.frontmatter.description || "").length > 160
                      ? (post.frontmatter.description || "").slice(0, 160) + "..."
                      : post.frontmatter.description || ""}
                  </p>
                </div>
                <span className="text-sm font-semibold hidden sm:block flex-shrink-0 mt-1" style={{ color: "var(--sage-dark)" }}>Read →</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
