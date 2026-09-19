import { Metadata } from "next";
import Link from "next/link";
import { categories, categorySlugMap } from "@/data/tools";
import { getAllReviews } from "@/lib/content";
import { notFound } from "next/navigation";
import { isReviewIndexable, NOINDEX_ROBOTS } from "@/lib/indexing";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = categories.find((item) => item.slug === slug);
  if (!cat) return { title: "Category Not Found" };
  return {
    title: `${cat.name} AI Tools`,
    description: cat.description,
    robots: NOINDEX_ROBOTS,
    alternates: { canonical: `https://rawpickai.com/category/${slug}` },
  };
}

export async function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = categories.find((item) => item.slug === slug);
  if (!cat) notFound();

  const reviews = (await getAllReviews())
    .filter((review) => isReviewIndexable(review.slug) && categorySlugMap[review.frontmatter.category || ""] === slug)
    .sort((a, b) => Number(b.frontmatter.scores?.overall || b.frontmatter.overallScore || 0) - Number(a.frontmatter.scores?.overall || a.frontmatter.overallScore || 0));

  return (
    <div className="directory-page">
      <div className="directory-kicker">{cat.icon} Tool category</div>
      <section className="directory-hero">
        <div><h1 className="directory-title">{cat.name}</h1><p className="directory-intro">{cat.description}</p></div>
        <aside className="directory-note"><strong>Current coverage</strong>{reviews.length} evidence-audited {reviews.length === 1 ? "review" : "reviews"}. More will return only after a fresh hands-on audit.</aside>
      </section>

      {cat.longDescription && <p className="max-w-[760px] mt-8 text-[15px] leading-7 text-[var(--text-mid)]">{cat.longDescription}</p>}
      <div className="directory-section-head"><h2>Audited field reports</h2><span>Hands-on evidence required</span></div>
      {reviews.length === 0 ? (
        <div className="py-12 border-y border-[var(--border)]">
          <p className="editorial-heading text-2xl mb-2">This shelf is being rebuilt.</p>
          <p className="text-sm text-[var(--text-mid)]">No review in this category currently meets the new evidence standard.</p>
          <Link href="/tools" className="editorial-link mt-5">Browse audited reviews</Link>
        </div>
      ) : (
        <div className="editorial-list">
          {reviews.map((review, index) => {
            const fm = review.frontmatter;
            const name = fm.toolName || fm.title.split(" Review")[0].split(":")[0].replace(/\"/g, "");
            const score = fm.scores?.overall || fm.overallScore;
            return (
              <Link href={`/review/${review.slug}`} className="editorial-row" key={review.slug}>
                <span className="editorial-number">{String(index + 1).padStart(2, "0")}</span><h3>{name}</h3><p>{fm.description}</p><span className="evidence-stamp">{score ? `${Number(score).toFixed(1)} / 5` : "Tested"}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
