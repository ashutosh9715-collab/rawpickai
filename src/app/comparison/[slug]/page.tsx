import { Metadata } from "next";
import Link from "next/link";
import { getComparisonBySlug, getAllComparisonSlugs } from "@/lib/content";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getComparisonBySlug(slug);
  if (!p) return { title: "Not Found" };
  const fm = p.frontmatter;
  const ogUrl = `https://rawpickai.com/api/og?title=${encodeURIComponent(fm.title)}&type=Comparison&category=${encodeURIComponent(fm.category || "")}`;
  return { title: fm.title, description: fm.description || "", alternates: { canonical: `https://rawpickai.com/comparison/${slug}` }, openGraph: { title: fm.title, description: fm.description || "", url: `https://rawpickai.com/comparison/${slug}`, type: "article", images: [{ url: ogUrl, width: 1200, height: 630 }] }, twitter: { card: "summary_large_image", images: [ogUrl] } };
}

export async function generateStaticParams() {
  return getAllComparisonSlugs().map((slug) => ({ slug }));
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params;
  const page = await getComparisonBySlug(slug);
  if (!page) notFound();
  const fm = page.frontmatter;

  return (
    <div className="max-w-[760px] mx-auto px-5 md:px-10 py-10 pb-20">
      <PageHero
        title={fm.title}
        description={fm.description}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Compare", href: "/compare" }, { label: fm.toolC ? `${fm.toolA} vs ${fm.toolB} vs ${fm.toolC}` : `${fm.toolA} vs ${fm.toolB}` }]}
        pills={[{ label: "Comparison", variant: "dark" }, ...(fm.category ? [{ label: fm.category }] : [])]}
        author={fm.author || "Ash"}
      />

      {/* Quick facts */}
      <div className={`grid grid-cols-1 ${fm.toolC ? "sm:grid-cols-4" : "sm:grid-cols-3"} gap-0 rounded-xl overflow-hidden mb-8`} style={{ border: "0.5px solid var(--border)" }}>
        <div className="p-3.5" style={{ borderRight: "0.5px solid var(--border)" }}>
          <div className="text-[10px] mb-1" style={{ color: "var(--text-light)" }}>Tool A</div>
          <div className="text-[13px] font-medium">{fm.toolA || "—"}</div>
        </div>
        <div className="p-3.5" style={{ borderRight: "0.5px solid var(--border)" }}>
          <div className="text-[10px] mb-1" style={{ color: "var(--text-light)" }}>Tool B</div>
          <div className="text-[13px] font-medium">{fm.toolB || "—"}</div>
        </div>
        {fm.toolC && (
          <div className="p-3.5" style={{ borderRight: "0.5px solid var(--border)" }}>
            <div className="text-[10px] mb-1" style={{ color: "var(--text-light)" }}>Tool C</div>
            <div className="text-[13px] font-medium">{fm.toolC}</div>
          </div>
        )}
        <div className="p-3.5">
          <div className="text-[10px] mb-1" style={{ color: "var(--text-light)" }}>Winner</div>
          <div className="text-[13px] font-medium" style={{ color: "#22c55e" }}>{fm.winner || "See review"}</div>
        </div>
      </div>

      <div className="prose-content" dangerouslySetInnerHTML={{ __html: page.htmlContent }} />

      <div className="mt-12 pt-6 flex justify-between items-center" style={{ borderTop: "0.5px solid var(--border)" }}>
        <Link href="/compare" className="text-sm font-medium" style={{ color: "var(--sage-dark)" }}>← All comparisons</Link>
        <span className="text-xs mono" style={{ color: "var(--text-light)" }}>Last updated: {fm.lastUpdated}</span>
      </div>
    </div>
  );
}
