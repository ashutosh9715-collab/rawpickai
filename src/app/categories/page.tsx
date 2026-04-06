import Link from "next/link";
import { categories, categorySlugMap } from "@/data/tools";
import { getAllReviews } from "@/lib/content";

export const metadata = {
  title: "Browse AI Tools by Category — RawPickAI",
  description: "Explore AI tools organized by what they do. Writing, image generation, code assistants, video, productivity, and more.",
};

export default async function CategoriesPage() {
  const reviews = await getAllReviews();

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
    <div className="max-w-[900px] mx-auto px-5 md:px-10 py-8 pb-20">
      <div className="text-xs mb-6" style={{ color: "var(--text-light)" }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-1.5">›</span>
        <span style={{ color: "var(--text-mid)" }}>Categories</span>
      </div>

      <div className="mb-8">
        <h1 className="heading text-2xl md:text-4xl font-bold mb-2" style={{ letterSpacing: "-0.03em" }}>
          Browse by Category
        </h1>
        <p className="text-lg" style={{ color: "var(--text-mid)" }}>Explore AI tools organized by what they do</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((c) => {
          const count = catCounts[c.slug] || 0;
          return (
            <Link key={c.slug} href={`/category/${c.slug}`}>
              <div className="card card-hover !p-6">
                <span className="text-3xl mb-3 block">{c.icon}</span>
                <div className="heading font-semibold text-base mb-1">{c.name}</div>
                <p className="text-[13px] leading-relaxed mb-3" style={{ color: "var(--text-mid)" }}>{c.description}</p>
                <span className="text-xs font-semibold mono" style={{ color: "var(--sage-dark)" }}>{count} tools reviewed →</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
