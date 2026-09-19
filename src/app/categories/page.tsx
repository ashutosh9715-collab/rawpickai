import Link from "next/link";
import { categories, categorySlugMap } from "@/data/tools";
import { getAllReviews } from "@/lib/content";
import { isReviewIndexable, NOINDEX_ROBOTS } from "@/lib/indexing";

export const metadata = {
  title: "Browse AI Tools by Category",
  description: "Explore AI tools organized by what they do. Writing, image generation, code assistants, video, productivity, and more.",
  alternates: { canonical: "https://rawpickai.com/categories" },
  robots: NOINDEX_ROBOTS,
};

export default async function CategoriesPage() {
  const reviews = (await getAllReviews()).filter((review) => isReviewIndexable(review.slug));

  // Count actual reviews per category
  const catCounts: Record<string, number> = {};
  for (const r of reviews) {
    const rawCat = r.frontmatter.category || "";
    const slug = categorySlugMap[rawCat];
    if (slug) {
      catCounts[slug] = (catCounts[slug] || 0) + 1;
    }
  }

  return (
    <div className="directory-page">
      <div className="directory-kicker">Browse the test library</div>
      <section className="directory-hero">
        <div><h1 className="directory-title">Start with the job.</h1><p className="directory-intro">Explore AI software by what it helps you accomplish, not by whichever model is newest.</p></div>
        <aside className="directory-note"><strong>A smaller library</strong>Only evidence-audited reviews appear in category results while the archive is being rebuilt.</aside>
      </section>
      <div className="directory-section-head"><h2>All categories</h2><span>Organized by use case</span></div>
      <div className="instrument-grid">
        {categories.map((c, index) => {
          const count = catCounts[c.slug] || 0;
          return (
            <Link key={c.slug} href={`/category/${c.slug}`} className="instrument-card" data-mark={String(index + 1).padStart(2, "0")}>
              <span className="editorial-label">{c.icon} Category</span>
              <div><h3>{c.name}</h3><p>{c.description}</p></div>
              <div className="instrument-foot"><span>{count} tools reviewed</span><b>→</b></div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
