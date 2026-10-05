import Link from "next/link";
import { getAllComparisons } from "@/lib/content";

export const metadata = {
  title: "AI Tool Comparisons",
  description: "Browse AI tool comparisons covering features, workflows, pricing, and available testing evidence.",
  alternates: { canonical: "https://rawpickai.com/compare" },
};

export default async function ComparePage() {
  const comparisons = await getAllComparisons();

  return (
    <div className="directory-page">
      <div className="directory-kicker">AI tool comparisons</div>
      <section className="directory-hero">
        <div><h1 className="directory-title">Compare your options.</h1><p className="directory-intro">Browse the full comparison library. Each article explains its scope, product differences, and any available testing evidence.</p></div>
        <aside className="directory-note"><strong>How we compare</strong>We look beyond feature lists to output quality, friction, pricing, and who each tool is actually built for.</aside>
      </section>
      <div className="directory-section-head"><h2>Published comparisons</h2><span>{comparisons.length} comparisons available</span></div>
      <div className="editorial-list">
        {comparisons.map((c) => {
          const fm = c.frontmatter;
          return (
            <Link key={c.slug} href={`/comparison/${c.slug}`} className="editorial-row">
              <span className="editorial-number">VS</span>
              <h3>{fm.toolA || ""} vs {fm.toolB || ""}{fm.toolC ? ` vs ${fm.toolC}` : ""}</h3>
              <p>{fm.description.length > 150 ? fm.description.slice(0, 150) + "..." : fm.description}</p>
              <span className="evidence-stamp">Read comparison</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
