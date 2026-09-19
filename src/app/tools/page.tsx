import Link from "next/link";
import { getAllReviews } from "@/lib/content";
import { isReviewIndexable } from "@/lib/indexing";

const interactiveTools = [
  { title: "AI tool finder", desc: "Describe the job, team, and budget. Get a short, explainable stack instead of a directory of logos.", href: "/tools/ai-tool-finder", label: "Start here - 4 questions", action: "Build my stack" },
  { title: "Savings calculator", desc: "Estimate time recovered, software cost, and practical payback for your team.", href: "/tools/savings-calculator", label: "Calculator", action: "Run the numbers" },
  { title: "Price tracker", desc: "Current plans for major AI products, shown in USD and INR.", href: "/tools/price-tracker", label: "Live reference", action: "Track 18 tools" },
  { title: "Free-tier index", desc: "What free really includes, ranked by actual usefulness.", href: "/tools/free-tier-comparison", label: "Comparison", action: "Compare access" },
  { title: "Transparency index", desc: "See who publishes clear pricing and who sends you to sales.", href: "/tools/transparency-index", label: "Research", action: "View the index" },
  { title: "Cost calculator", desc: "Set your monthly budget and see which combinations of AI tools fit.", href: "/tools/cost-calculator", label: "Budget tool", action: "Build a budget" },
];

export const metadata = {
  title: "AI Tools & Reviews",
  description: "Interactive AI tools, calculators, and honest reviews. Find the right AI tool for your workflow.",
  alternates: { canonical: "https://rawpickai.com/tools" },
};

function toolName(title: string, explicit?: string) {
  return explicit || title.split(" Review")[0].split(":")[0].replace(/\"/g, "");
}

export default async function ToolsPage() {
  const reviews = (await getAllReviews()).filter((review) => isReviewIndexable(review.slug));
  reviews.sort((a, b) => Number(b.frontmatter.scores?.overall || b.frontmatter.overallScore || 0) - Number(a.frontmatter.scores?.overall || a.frontmatter.overallScore || 0));
  const featured = reviews.find((review) => review.slug === "deevid-ai") || reviews[0];
  const remaining = reviews.filter((review) => review.slug !== featured?.slug);
  const featuredScore = featured?.frontmatter.scores?.overall || featured?.frontmatter.overallScore;

  return (
    <div className="directory-page">
      <div className="directory-kicker">Independent AI field notes</div>
      <section className="directory-hero">
        <div>
          <h1 className="directory-title">Choose with evidence, not hype.</h1>
          <p className="directory-intro">Free decision tools and a small library of software reviews that have passed our hands-on evidence audit.</p>
        </div>
        <aside className="directory-note"><strong>Our standard</strong>No paid rankings. Every published review is used hands-on, dated, and rechecked when the product changes.</aside>
      </section>

      <div className="directory-section-head"><h2>Decision instruments</h2><span>No signup - free to use</span></div>
      <section className="instrument-grid" aria-label="Interactive tools">
        {interactiveTools.map((tool, index) => (
          <Link className="instrument-card" href={tool.href} key={tool.href} data-mark={String(index + 1).padStart(2, "0")}>
            <span className="editorial-label">{tool.label}</span>
            <div><h3>{tool.title}</h3><p>{tool.desc}</p></div>
            <div className="instrument-foot"><span>{tool.action}</span><b>→</b></div>
          </Link>
        ))}
      </section>

      {featured && <>
        <div className="directory-section-head"><h2>From the test bench</h2><span>{reviews.length.toString().padStart(2, "0")} reviews currently audited</span></div>
        <Link href={`/review/${featured.slug}`} className="editorial-feature">
          <div className="editorial-feature-art"><div className="editorial-score">{typeof featuredScore === "number" ? featuredScore.toFixed(1) : featuredScore || "-"}<small>OUT OF 5</small></div></div>
          <div className="editorial-feature-copy">
            <div><span className="editorial-label">Featured audit - {featured.frontmatter.category}</span><h3>{toolName(featured.frontmatter.title, featured.frontmatter.toolName)} review</h3><p>{featured.frontmatter.description}</p></div>
            <div><div className="editorial-meta"><span>Hands-on tested</span><span>Evidence checked</span><span>Updated {featured.frontmatter.lastUpdated}</span></div><p className="editorial-link">Read the field report</p></div>
          </div>
        </Link>
      </>}

      {remaining.length > 0 && <>
        <div className="directory-section-head"><h2>More field reports</h2><span>Ordered by score</span></div>
        <div className="editorial-list">
          {remaining.map((review, index) => (
            <Link className="editorial-row" href={`/review/${review.slug}`} key={review.slug}>
              <span className="editorial-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{toolName(review.frontmatter.title, review.frontmatter.toolName)}</h3><p>{review.frontmatter.description}</p><span className="evidence-stamp">Hands-on ✓</span>
            </Link>
          ))}
        </div>
      </>}
    </div>
  );
}
