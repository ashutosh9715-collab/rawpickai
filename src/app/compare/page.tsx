import Link from "next/link";
import { getAllComparisons } from "@/lib/content";
import { isComparisonIndexable } from "@/lib/indexing";

export const metadata = {
  title: "AI Tool Comparisons",
  description: "Side-by-side AI tool comparisons tested with identical prompts. See where each product wins and what the differences mean in practice.",
  alternates: { canonical: "https://rawpickai.com/compare" },
};

export default async function ComparePage() {
  const comparisons = (await getAllComparisons()).filter((comparison) => isComparisonIndexable(comparison.slug));

  return (
    <div className="directory-page">
      <div className="directory-kicker">Controlled comparisons</div>
      <section className="directory-hero">
        <div><h1 className="directory-title">Same task. Different tools.</h1><p className="directory-intro">Head-to-head comparisons run with matching prompts, practical workflows, and the same scoring standard.</p></div>
        <aside className="directory-note"><strong>How we compare</strong>We look beyond feature lists to output quality, friction, pricing, and who each tool is actually built for.</aside>
      </section>
      <div className="directory-section-head"><h2>Published matchups</h2><span>{comparisons.length.toString().padStart(2, "0")} comparisons retained</span></div>
      <div className="editorial-list">
        {comparisons.map((c) => {
          const fm = c.frontmatter;
          return (
            <Link key={c.slug} href={`/comparison/${c.slug}`} className="editorial-row">
              <span className="editorial-number">VS</span>
              <h3>{fm.toolA || ""} vs {fm.toolB || ""}{fm.toolC ? ` vs ${fm.toolC}` : ""}</h3>
              <p>{fm.description.length > 150 ? fm.description.slice(0, 150) + "..." : fm.description}</p>
              <span className="evidence-stamp">{fm.winner ? `Winner: ${fm.winner}` : "Tested"}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
