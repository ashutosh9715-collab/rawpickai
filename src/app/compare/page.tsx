import Link from "next/link";
import { getAllComparisons } from "@/lib/content";

export const metadata = {
  title: "AI Tool Comparisons",
  description: "Side-by-side AI tool comparisons tested with identical prompts. ChatGPT vs Claude, Cursor vs Copilot, Midjourney vs DALL-E 3, and more.",
  alternates: { canonical: "https://rawpickai.com/compare" },
};

export default async function ComparePage() {
  const comparisons = await getAllComparisons();

  return (
    <div className="max-w-[900px] mx-auto px-5 md:px-10 py-8 pb-20">
      <div className="text-xs mb-6" style={{ color: "var(--text-light)" }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-1.5">›</span>
        <span style={{ color: "var(--text-mid)" }}>Comparisons</span>
      </div>

      <div className="mb-8">
        <h1 className="heading text-2xl md:text-4xl font-bold mb-2" style={{ letterSpacing: "-0.03em" }}>AI Tool Comparisons</h1>
        <p className="text-lg" style={{ color: "var(--text-mid)" }}>
          {comparisons.length} head-to-head comparisons tested with identical prompts.
        </p>
      </div>

      <div className="grid gap-3">
        {comparisons.map((c) => {
          const fm = c.frontmatter;
          return (
            <Link key={c.slug} href={`/comparison/${c.slug}`}>
              <div className="card card-hover flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 !py-5 !px-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                    <span className="heading text-base font-semibold">{fm.toolA || ""} vs {fm.toolB || ""}{fm.toolC ? ` vs ${fm.toolC}` : ""}</span>
                    <span className="pill text-[10px]" style={{ background: "var(--blue-soft)", color: "#2563EB" }}>Comparison</span>
                  </div>
                  <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-mid)" }}>
                    {fm.description.length > 140 ? fm.description.slice(0, 140) + "..." : fm.description}
                  </p>
                </div>
                {fm.winner && (
                  <div className="flex-shrink-0 sm:text-right sm:max-w-[180px] sm:border-l sm:border-[var(--border)] sm:pl-5 border-t pt-3 sm:border-t-0 sm:pt-0" style={{ borderColor: "var(--border)" }}>
                    <div className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-light)" }}>Winner</div>
                    <div className="text-sm font-semibold heading leading-snug" style={{ color: "var(--sage-dark)" }}>{fm.winner}</div>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
