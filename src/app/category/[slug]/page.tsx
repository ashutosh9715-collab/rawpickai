import { Metadata } from "next";
import Link from "next/link";
import { categories, categorySlugMap } from "@/data/tools";
import { getAllReviews } from "@/lib/content";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return { title: "Category Not Found" };
  const title = `Best ${cat.name} AI Tools 2026`;
  // Truncate description at last complete sentence within 155 chars
  let desc = cat.description;
  if (cat.longDescription) {
    const sentences = cat.longDescription.split(". ");
    desc = "";
    for (const s of sentences) {
      if ((desc + s + ". ").length > 155) break;
      desc += s + ". ";
    }
    desc = desc.trim() || cat.description;
  }
  return {
    title,
    description: desc,
    alternates: { canonical: `https://rawpickai.com/category/${slug}` },
    openGraph: {
      title,
      description: desc,
      url: `https://rawpickai.com/category/${slug}`,
      type: "website",
      siteName: "RawPickAI",
    },
  };
}

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();

  const allReviews = await getAllReviews();

  // Filter reviews matching this category
  const reviews = allReviews.filter((r) => {
    const rawCat = r.frontmatter.category || "";
    return categorySlugMap[rawCat] === slug;
  });

  // Sort by score descending
  reviews.sort((a, b) => {
    const scoreA = a.frontmatter.scores?.overall || a.frontmatter.overallScore || 0;
    const scoreB = b.frontmatter.scores?.overall || b.frontmatter.overallScore || 0;
    return (scoreB as number) - (scoreA as number);
  });

  return (
    <div className="max-w-[900px] mx-auto px-5 md:px-10 py-8 pb-20">
      <div className="text-xs mb-6" style={{ color: "var(--text-light)" }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-1.5">›</span>
        <Link href="/categories" className="hover:underline">Categories</Link>
        <span className="mx-1.5">›</span>
        <span style={{ color: "var(--text-mid)" }}>{cat.name}</span>
      </div>

      <div className="mb-8">
        <span className="text-2xl md:text-4xl mb-4 block">{cat.icon}</span>
        <h1 className="heading text-2xl md:text-4xl font-bold mb-2" style={{ letterSpacing: "-0.03em" }}>
          {cat.name}
        </h1>
        <p className="text-lg" style={{ color: "var(--text-mid)" }}>{cat.description}</p>
        <p className="text-sm mono mt-2" style={{ color: "var(--text-light)" }}>{reviews.length} tools reviewed</p>
        {cat.longDescription && (
          <p className="text-sm mt-6 leading-relaxed" style={{ color: "var(--text-mid)", maxWidth: "680px" }}>{cat.longDescription}</p>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className="card text-center py-12" style={{ color: "var(--text-light)" }}>
          Reviews for this category are coming soon.
        </div>
      ) : (
        <>
          {/* Quick verdict boxes */}
          {(() => {
            const sorted = [...reviews].sort((a, b) => {
              const sa = a.frontmatter.scores?.overall || a.frontmatter.overallScore || 0;
              const sb = b.frontmatter.scores?.overall || b.frontmatter.overallScore || 0;
              return (sb as number) - (sa as number);
            });
            const bestOverall = sorted[0];
            const bestFree = sorted.find((r) => {
              const ft = r.frontmatter.scores?.freeTier || 0;
              return (ft as number) >= 70;
            });
            const bestValue = sorted.reduce((best, r) => {
              const v = r.frontmatter.scores?.valueForMoney || 0;
              const bv = best?.frontmatter.scores?.valueForMoney || 0;
              return (v as number) > (bv as number) ? r : best;
            }, sorted[0]);
            const getName = (r: typeof sorted[0]) => r.frontmatter.toolName || r.frontmatter.title.split(" Review")[0].split(":")[0].replace(/"/g, "");
            const getScore = (r: typeof sorted[0]) => r.frontmatter.scores?.overall || r.frontmatter.overallScore || 0;

            const verdicts = [
              { label: "Best Overall", tool: bestOverall, color: "#22c55e", bg: "var(--green-soft)" },
              ...(bestFree && bestFree !== bestOverall ? [{ label: "Best Free Tier", tool: bestFree, color: "#3b82f6", bg: "var(--blue-soft)" }] : []),
              ...(bestValue && bestValue !== bestOverall ? [{ label: "Best Value", tool: bestValue, color: "#f59e0b", bg: "var(--warm)" }] : []),
            ];

            return verdicts.length > 0 ? (
              <div className={`grid grid-cols-1 ${verdicts.length >= 3 ? "sm:grid-cols-3" : verdicts.length === 2 ? "sm:grid-cols-2" : ""} gap-3 mb-8`}>
                {verdicts.map((v) => (
                  <Link key={v.label} href={`/review/${v.tool.slug}`}>
                    <div className="rounded-xl p-5" style={{ background: v.bg }}>
                      <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: v.color }}>{v.label}</div>
                      <div className="heading text-base font-semibold mb-1">{getName(v.tool)}</div>
                      <div className="text-sm" style={{ color: "var(--text-mid)" }}>
                        {typeof getScore(v.tool) === "number" ? (getScore(v.tool) as number).toFixed(1) : getScore(v.tool)}/5
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null;
          })()}
        <div className="grid gap-3">
          {reviews.map((review) => {
            const fm = review.frontmatter;
            const overall = fm.scores?.overall || fm.overallScore;
            const toolName = fm.toolName || fm.title.split(" Review")[0].split(":")[0].replace(/"/g, "");

            return (
              <Link key={review.slug} href={`/review/${review.slug}`}>
                <div className="card card-hover flex items-center gap-5 !py-5 !px-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className="heading text-base font-semibold">{toolName}</span>
                    </div>
                    <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-mid)" }}>
                      {(fm.description || "").length > 140 ? (fm.description || "").slice(0, 140) + "..." : fm.description || ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    {overall && (
                      <div className="text-center">
                        <div className="text-xl font-bold heading" style={{ color: "#B8860B" }}>
                          {typeof overall === "number" ? overall.toFixed(1) : overall}
                        </div>
                        <div className="text-[10px]" style={{ color: "var(--text-light)" }}>out of 5</div>
                      </div>
                    )}
                    <span className="text-sm font-semibold" style={{ color: "var(--sage-dark)" }}>Read →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        </>
      )}
    </div>
  );
}
