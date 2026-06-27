import { Metadata } from "next";
import Link from "next/link";
import { getLearnBySlug, getAllLearnSlugs, getRelatedContent } from "@/lib/content";
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
  const post = await getLearnBySlug(slug);
  if (!post) return { title: "Not Found" };
  const fm = post.frontmatter;
  const ogUrl = `https://rawpickai.com/api/og?title=${encodeURIComponent(fm.title)}&type=Learn&category=${encodeURIComponent(fm.category || "")}`;
  return {
    title: fm.title,
    description: fm.description || "",
    alternates: { canonical: `https://rawpickai.com/learn/${slug}` },
    openGraph: { title: fm.title, description: fm.description || "", url: `https://rawpickai.com/learn/${slug}`, type: "article", images: [{ url: ogUrl, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", images: [ogUrl] },
  };
}

export async function generateStaticParams() {
  return getAllLearnSlugs().map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getLearnBySlug(slug);
  if (!post) notFound();
  const fm = post.frontmatter;

  const ogUrl = `https://rawpickai.com/api/og?title=${encodeURIComponent(fm.title)}&type=Learn&category=${encodeURIComponent(fm.category || "")}`;
  const canonical = `https://rawpickai.com/learn/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonical}#post`,
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
          { "@type": "ListItem", position: 2, name: "Learn", item: "https://rawpickai.com/learn" },
          { "@type": "ListItem", position: 3, name: fm.title, item: canonical },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-[760px] mx-auto px-5 md:px-10 py-8 md:py-10 pb-16 md:pb-20 prose-counter-scope">
        <PageHero
          title={fm.title}
          description={fm.description || ""}
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Learn", href: "/blog" }, { label: fm.title.length > 40 ? fm.title.slice(0, 40) + "..." : fm.title }]}
          pills={[{ label: "Learn", variant: "dark" }, ...(fm.category ? [{ label: fm.category }] : [])]}
          author={fm.author || "Ash"}
          readTime={`${Math.ceil((post.content.split(/\s+/).length) / 200)} min read`}
        />

        <TableOfContents htmlContent={post.htmlContent} />
        {(() => {
          const related = getRelatedContent(slug, fm.category || "", "blog");
          const chunks = splitHtmlAtH2(post.htmlContent, [0.55, 0.78]);
          // Fallback: if article too short to split, render as one block.
          if (!chunks[1] && !chunks[2]) {
            return <div className="prose-content" dangerouslySetInnerHTML={{ __html: post.htmlContent }} />;
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

        <RelatedPosts items={getRelatedContent(slug, fm.category || "", "blog").slice(1)} />

        <FeedbackWidget slug={slug} contentType="blog" />

        <div className="mt-8 pt-6 flex justify-between items-center" style={{ borderTop: "0.5px solid var(--border)" }}>
          <Link href="/blog" className="text-sm font-medium" style={{ color: "var(--sage-dark)" }}>← All blog posts</Link>
          <span className="text-xs mono" style={{ color: "var(--text-light)" }}>Published: {fm.lastUpdated}</span>
        </div>
      </div>

      {/* Sticky Bottom Bar — suggest related post */}
      {(() => {
        const related = getRelatedContent(slug, fm.category || "", "blog");
        return related[0] ? <StickyBottomBar title={related[0].title} href={related[0].href} /> : null;
      })()}
    </>
  );
}
