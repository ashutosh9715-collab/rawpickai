import Link from "next/link";
import { getAllNews } from "@/lib/content";

export const metadata = {
  title: "AI News — Tool Launches, Pricing, and Updates",
  description: "AI tool news: model launches, pricing changes, feature drops, and honest takes. For the latest, see our weekly roundup.",
  alternates: { canonical: "https://rawpickai.com/news" },
};

export default async function NewsIndexPage() {
  const posts = await getAllNews();

  return (
    <div className="max-w-[900px] mx-auto px-5 md:px-10 py-8 pb-20">
      <div className="text-xs mb-6" style={{ color: "var(--text-light)" }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-1.5">›</span>
        <span style={{ color: "var(--text-mid)" }}>News</span>
      </div>

      <div className="mb-8">
        <h1 className="heading text-2xl md:text-4xl font-bold mb-2" style={{ letterSpacing: "-0.03em" }}>AI News</h1>
        <p className="text-lg" style={{ color: "var(--text-mid)" }}>
          Briefs on AI tool launches, pricing changes, and model releases. Written by a working developer, not a news aggregator.
        </p>
      </div>

      <div className="card !py-4 !px-5 mb-6 flex items-center gap-3" style={{ background: "#FFF7ED", border: "1px solid #FED7AA" }}>
        <span className="text-lg">📰</span>
        <p className="text-[13px] m-0" style={{ color: "#92400E" }}>
          For the latest AI news and weekly roundups, see the{" "}
          <Link href="/blog" className="font-semibold underline underline-offset-2">
            Blog
          </Link>
          . This section is an archive of past briefs.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="card !py-10 text-center">
          <p className="text-[15px] mb-2" style={{ color: "var(--text-mid)" }}>
            Daily AI news briefs start Monday, May 4, 2026.
          </p>
          <p className="text-[13px]" style={{ color: "var(--text-light)" }}>
            Honest takes on model launches, pricing changes, and feature drops — one story per day, 300–500 words.
          </p>
          <Link href="/blog" className="inline-block mt-6 text-sm font-semibold" style={{ color: "var(--sage-dark)" }}>
            Read the weekly roundup →
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => {
            const cat = post.frontmatter.category || "";
            return (
              <Link key={post.slug} href={`/news/${post.slug}`}>
                <div className="card card-hover flex items-start gap-5 !py-5 !px-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="pill text-[10px]" style={{ background: "#FFF7ED", color: "#C2410C" }}>News</span>
                      {cat && <span className="pill text-[10px]" style={{ background: "#F4F4F5", color: "var(--text-mid)" }}>{cat}</span>}
                      <span className="text-[11px] mono" style={{ color: "var(--text-light)" }}>{post.frontmatter.lastUpdated}</span>
                    </div>
                    <div className="heading text-base md:text-lg font-semibold mb-2 leading-snug" style={{ color: "var(--text-dark)" }}>
                      {post.frontmatter.title}
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
      )}
    </div>
  );
}
