import { Metadata } from "next";
import Link from "next/link";
import { getComparisonBySlug, getAllComparisonSlugs, getRelatedContent } from "@/lib/content";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import TableOfContents from "@/components/TableOfContents";
import RelatedPosts from "@/components/RelatedPosts";
import StickyBottomBar from "@/components/StickyBottomBar";
import FeedbackWidget from "@/components/FeedbackWidget";
import QuizCallout from "@/components/QuizCallout";
import InlineReadNext from "@/components/InlineReadNext";
import { splitHtmlAtH2 } from "@/lib/htmlSplit";

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

  const canonical = `https://rawpickai.com/comparison/${slug}`;
  const ogUrl = `https://rawpickai.com/api/og?title=${encodeURIComponent(fm.title)}&type=Comparison&category=${encodeURIComponent(fm.category || "")}`;
  const compareLabel = fm.toolC ? `${fm.toolA} vs ${fm.toolB} vs ${fm.toolC}` : `${fm.toolA} vs ${fm.toolB}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonical}#article`,
        headline: fm.title,
        description: fm.description || "",
        url: canonical,
        mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
        image: ogUrl,
        author: {
          "@type": "Person",
          name: fm.author || "Ash",
          url: "https://rawpickai.com/about",
        },
        publisher: {
          "@type": "Organization",
          name: "RawPickAI",
          url: "https://rawpickai.com",
          logo: { "@type": "ImageObject", url: "https://rawpickai.com/logo-512.png" },
        },
        datePublished: fm.lastUpdated,
        dateModified: fm.lastUpdated,
        ...(fm.category && { articleSection: fm.category }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://rawpickai.com" },
          { "@type": "ListItem", position: 2, name: "Compare", item: "https://rawpickai.com/compare" },
          { "@type": "ListItem", position: 3, name: compareLabel, item: canonical },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-[760px] mx-auto px-5 md:px-10 py-10 pb-20 prose-counter-scope">
      <PageHero
        title={fm.title}
        description={fm.description}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Compare", href: "/compare" }, { label: compareLabel }]}
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

      {(() => {
        const related = getRelatedContent(slug, fm.category || "", "comparison");
        const chunks = splitHtmlAtH2(page.htmlContent, [0.55, 0.78]);
        if (!chunks[1] && !chunks[2]) {
          return <div className="prose-content" dangerouslySetInnerHTML={{ __html: page.htmlContent }} />;
        }
        return (
          <>
            <div className="prose-content" dangerouslySetInnerHTML={{ __html: chunks[0] }} />
            <QuizCallout />
            <div className="prose-content" dangerouslySetInnerHTML={{ __html: chunks[1] }} />
            <InlineReadNext item={related[0]} />
            <div className="prose-content" dangerouslySetInnerHTML={{ __html: chunks[2] }} />
          </>
        );
      })()}

      <TableOfContents htmlContent={page.htmlContent} />

      {(() => {
        const related = getRelatedContent(slug, fm.category || "", "comparison").slice(1);
        return (
          <>
            <RelatedPosts items={related} />
            {related[0] ? <StickyBottomBar title={related[0].title} href={related[0].href} /> : null}
          </>
        );
      })()}

      <FeedbackWidget slug={slug} contentType="comparison" />

      {/* Compare CTA */}
      <div className="mt-8 rounded-xl p-5 flex items-center justify-between gap-4" style={{ background: "var(--sage-light)" }}>
        <div>
          <div className="heading text-sm font-semibold mb-1" style={{ color: "var(--sage-dark)" }}>Want a different matchup?</div>
          <div className="text-xs" style={{ color: "var(--text-mid)" }}>Pick any 2-3 tools and compare scores instantly</div>
        </div>
        <Link href="/tools/compare" className="text-sm font-semibold px-4 py-2 rounded-lg flex-shrink-0" style={{ background: "var(--sage-dark)", color: "var(--sage)" }}>
          Compare →
        </Link>
      </div>

      <div className="mt-12 pt-6 flex justify-between items-center" style={{ borderTop: "0.5px solid var(--border)" }}>
        <Link href="/compare" className="text-sm font-medium" style={{ color: "var(--sage-dark)" }}>← All comparisons</Link>
        <span className="text-xs mono" style={{ color: "var(--text-light)" }}>Last updated: {fm.lastUpdated}</span>
      </div>
    </div>
    </>
  );
}
