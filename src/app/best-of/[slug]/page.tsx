import { Metadata } from "next";
import Link from "next/link";
import { getBestOfBySlug, getAllBestOfSlugs, getRelatedContent } from "@/lib/content";
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
  const p = await getBestOfBySlug(slug);
  if (!p) return { title: "Not Found" };
  const fm = p.frontmatter;
  const ogUrl = `https://rawpickai.com/api/og?title=${encodeURIComponent(fm.title)}&type=Best%20Of&category=${encodeURIComponent(fm.category || "")}`;
  return { title: fm.title, description: fm.description || "", alternates: { canonical: `https://rawpickai.com/best-of/${slug}` }, openGraph: { title: fm.title, description: fm.description || "", url: `https://rawpickai.com/best-of/${slug}`, type: "article", images: [{ url: ogUrl, width: 1200, height: 630 }] }, twitter: { card: "summary_large_image", images: [ogUrl] } };
}

export async function generateStaticParams() {
  return getAllBestOfSlugs().map((slug) => ({ slug }));
}

export default async function BestOfPage({ params }: Props) {
  const { slug } = await params;
  const page = await getBestOfBySlug(slug);
  if (!page) notFound();
  const fm = page.frontmatter;
  const toolCountMatch = fm.title.match(/^(\d+)\s/);
  const toolCount = toolCountMatch ? toolCountMatch[1] : "—";

  const canonical = `https://rawpickai.com/best-of/${slug}`;
  const ogUrl = `https://rawpickai.com/api/og?title=${encodeURIComponent(fm.title)}&type=Best%20Of&category=${encodeURIComponent(fm.category || "")}`;
  const shortLabel = fm.title.split(":")[0].split("(")[0].trim();

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
          { "@type": "ListItem", position: 2, name: "Best Of", item: "https://rawpickai.com/best" },
          { "@type": "ListItem", position: 3, name: shortLabel, item: canonical },
        ],
      },
      // ItemList schema — helps AI citations (ChatGPT, Perplexity, Google AI Overviews)
      // extract ranked tool lists as structured data for direct citation
      (() => {
        // Extract "## 1. Tool Name — description" style H2 headings from rendered HTML
        const itemRegex = /<h2[^>]*>(?:<[^>]+>)?(\d+)\.\s+([^—<]+?)(?:\s*—[^<]+)?(?:<[^>]+>)?<\/h2>/gi;
        const items: { position: number; name: string }[] = [];
        let match;
        while ((match = itemRegex.exec(page.htmlContent)) !== null) {
          const position = parseInt(match[1], 10);
          const name = match[2].trim();
          if (name && position > 0 && position <= 50) {
            items.push({ position, name });
          }
        }
        if (items.length < 2) return null;
        return {
          "@type": "ItemList",
          "@id": `${canonical}#itemlist`,
          name: fm.title,
          description: fm.description || "",
          numberOfItems: items.length,
          itemListOrder: "https://schema.org/ItemListOrderAscending",
          itemListElement: items.map((it) => ({
            "@type": "ListItem",
            position: it.position,
            name: it.name,
          })),
        };
      })(),
    ].filter(Boolean),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-[760px] mx-auto px-5 md:px-10 py-10 pb-20 prose-counter-scope">
      <PageHero
        title={fm.title}
        description={fm.description}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Best Of", href: "/best" }, { label: fm.title.split(":")[0].split("(")[0].trim() }]}
        pills={[{ label: "Best Of", variant: "dark" }, ...(fm.category ? [{ label: fm.category }] : [])]}
        author={fm.author || "Ash"}
      />

      {/* Quick facts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 rounded-xl overflow-hidden mb-8" style={{ border: "0.5px solid var(--border)" }}>
        <div className="p-3.5" style={{ borderRight: "0.5px solid var(--border)" }}>
          <div className="text-[10px] mb-1" style={{ color: "var(--text-light)" }}>Category</div>
          <div className="text-[13px] font-medium">{fm.category || "General"}</div>
        </div>
        <div className="p-3.5" style={{ borderRight: "0.5px solid var(--border)" }}>
          <div className="text-[10px] mb-1" style={{ color: "var(--text-light)" }}>Tools ranked</div>
          <div className="text-[13px] font-medium">{toolCount}</div>
        </div>
        <div className="p-3.5">
          <div className="text-[10px] mb-1" style={{ color: "var(--text-light)" }}>Last tested</div>
          <div className="text-[13px] font-medium">{fm.lastUpdated}</div>
        </div>
      </div>

      {(() => {
        const related = getRelatedContent(slug, fm.category || "", "best-of");
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
        const related = getRelatedContent(slug, fm.category || "", "best-of").slice(1);
        return (
          <>
            <RelatedPosts items={related} />
            {related[0] ? <StickyBottomBar title={related[0].title} href={related[0].href} /> : null}
          </>
        );
      })()}

      <FeedbackWidget slug={slug} contentType="best-of" />

      <div className="mt-12 pt-6 flex justify-between items-center" style={{ borderTop: "0.5px solid var(--border)" }}>
        <Link href="/best" className="text-sm font-medium" style={{ color: "var(--sage-dark)" }}>← All best-of lists</Link>
        <span className="text-xs mono" style={{ color: "var(--text-light)" }}>Last updated: {fm.lastUpdated}</span>
      </div>
    </div>
    </>
  );
}
