import Link from "next/link";
import { getAllLearnPosts } from "@/lib/content";

const catColors: Record<string, { bg: string; text: string }> = {
  "AI Concepts": { bg: "#F0F7E6", text: "#4A5942" },
  "AI Frameworks": { bg: "#FEF3E2", text: "#96845A" },
  "AI Skills": { bg: "#E8F0F7", text: "#3B5C6E" },
  "Research": { bg: "#F4E8F3", text: "#7B3F6E" },
};

const categoryOrder = ["AI Concepts", "AI Frameworks", "AI Skills", "Research"];

const categoryDescriptions: Record<string, string> = {
  "AI Concepts": "Plain-English explainers of the core ideas behind modern AI - LLMs, embeddings, RAG, agents, and the architecture that makes it all work.",
  "AI Frameworks": "Decision guides for choosing AI tools, calculating ROI, evaluating output quality, and building a sustainable AI stack.",
  "AI Skills": "Practical techniques for getting better results from any AI tool - prompts, document structure, debugging, and training.",
  "Research": "Original data and analysis on AI tool adoption, pricing, and the realities of using AI in production.",
};

export const metadata = {
  title: "Learn — AI Concepts, Frameworks & Skills",
  description: "Evergreen explainers and practical guides for AI tools. Concepts like RAG and LLMs, frameworks for choosing models, and skills like prompt engineering.",
  alternates: { canonical: "https://rawpickai.com/learn" },
};

export default async function LearnPage() {
  const posts = await getAllLearnPosts();

  // Group by category
  const byCategory: Record<string, typeof posts> = {};
  posts.forEach((post) => {
    const cat = post.frontmatter.category || "Other";
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(post);
  });

  return (
    <div className="max-w-[900px] mx-auto px-5 md:px-10 py-8 pb-20">
      <div className="text-xs mb-6" style={{ color: "var(--text-light)" }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-1.5">›</span>
        <span style={{ color: "var(--text-mid)" }}>Learn</span>
      </div>

      <div className="mb-10">
        <h1 className="heading text-2xl md:text-4xl font-bold mb-3" style={{ letterSpacing: "-0.03em" }}>
          Learn AI
        </h1>
        <p className="text-lg" style={{ color: "var(--text-mid)" }}>
          Plain-English guides to the concepts, frameworks, and skills you need to actually use AI well. No hype, no jargon dump, no version numbers that go stale.
        </p>
      </div>

      {categoryOrder.map((cat) => {
        const catPosts = byCategory[cat];
        if (!catPosts || catPosts.length === 0) return null;
        const colors = catColors[cat] || { bg: "#F4F4F5", text: "var(--text-mid)" };

        return (
          <div key={cat} className="mb-10">
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="heading text-xl md:text-2xl font-bold" style={{ letterSpacing: "-0.02em" }}>{cat}</h2>
                <span className="pill text-[10px]" style={{ background: colors.bg, color: colors.text }}>
                  {catPosts.length} {catPosts.length === 1 ? "article" : "articles"}
                </span>
              </div>
              <p className="text-sm" style={{ color: "var(--text-mid)" }}>
                {categoryDescriptions[cat]}
              </p>
            </div>

            <div className="grid gap-3">
              {catPosts.map((post) => (
                <Link key={post.slug} href={`/learn/${post.slug}`}>
                  <div className="card card-hover !py-4 !px-5">
                    <div className="heading text-base font-semibold mb-1.5">{post.frontmatter.title}</div>
                    <p className="text-[13px] leading-relaxed m-0" style={{ color: "var(--text-mid)" }}>
                      {(post.frontmatter.description || "").length > 180
                        ? (post.frontmatter.description || "").slice(0, 180) + "..."
                        : post.frontmatter.description || ""}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
