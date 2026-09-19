import { Metadata } from "next";
import Link from "next/link";
import { getStudyBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import TableOfContents from "@/components/TableOfContents";
import FeedbackWidget from "@/components/FeedbackWidget";
import { splitHtmlAtH2 } from "@/lib/htmlSplit";
import QuizCallout from "@/components/QuizCallout";
import InlineReadNext from "@/components/InlineReadNext";
import { getRelatedContent } from "@/lib/content";
import RelatedPosts from "@/components/RelatedPosts";

const canonical = "https://rawpickai.com/studies/2026-ai-tools-reality-check";
const ogImage = "https://rawpickai.com/images/studies/study-overview-hero.svg";

export const metadata: Metadata = {
  title: "The 2026 AI Tools Reality Check: 48 Tools Tested, Scored, and Compared",
  description:
    "I spent 6 months testing 48 AI tools. 79% hide pricing, the average score is 3.7/5, and only 4 tools scored above 4.5. Full data with downloadable CSV.",
  alternates: { canonical },
  openGraph: {
    title: "The 2026 AI Tools Reality Check",
    description:
      "48 AI tools tested. 79% hide enterprise pricing. Expensive tools score lower than mid-priced ones. Full methodology + downloadable data.",
    url: canonical,
    type: "article",
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: [ogImage] },
};

export default async function StudyPage() {
  const study = await getStudyBySlug("2026-ai-tools-reality-check");
  if (!study) return notFound();

  const fm = study.frontmatter;
  const related = getRelatedContent("2026-ai-tools-reality-check", "Research", "blog");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonical}#article`,
        headline: fm.title,
        description: fm.description,
        url: canonical,
        mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
        image: ogImage,
        author: { "@type": "Person", name: "Ash", url: "https://rawpickai.com/about" },
        publisher: { "@type": "Organization", name: "RawPickAI", url: "https://rawpickai.com", logo: { "@type": "ImageObject", url: "https://rawpickai.com/logo-512.png" } },
        datePublished: "2026-04-18",
        dateModified: fm.lastUpdated,
        articleSection: "Research",
      },
      {
        "@type": "Dataset",
        "@id": `${canonical}#dataset`,
        name: "RawPickAI 2026 AI Tools Study Dataset",
        description: "Pricing, scoring, category, and metadata for 48 AI tools tested between November 2025 and May 2026.",
        url: canonical,
        creator: { "@type": "Organization", name: "RawPickAI", url: "https://rawpickai.com" },
        datePublished: "2026-04-18",
        license: "https://creativecommons.org/licenses/by/4.0/",
        distribution: [{ "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: "https://rawpickai.com/data/rawpickai-2026-ai-tools-study.csv" }],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://rawpickai.com" },
          { "@type": "ListItem", position: 2, name: "Research", item: "https://rawpickai.com/studies" },
          { "@type": "ListItem", position: 3, name: "2026 AI Tools Reality Check" },
        ],
      },
    ],
  };

  const chunks = splitHtmlAtH2(study.htmlContent, [0.55, 0.78]);
  const relatedItem = related.length > 0 ? related[0] : undefined;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TableOfContents htmlContent={study.htmlContent} />
      <div className="max-w-[720px] mx-auto px-5 md:px-10 py-10">
        <nav className="text-xs mb-6 mono" style={{ color: "var(--text-light)" }}>
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-1.5">›</span>
          <Link href="/studies" className="hover:underline">Research</Link>
          <span className="mx-1.5">›</span>
          <span>2026 AI Tools Reality Check</span>
        </nav>
        <div className="mb-8 p-6 rounded-[16px]" style={{ background: "var(--sage-light)" }}>
          <div className="flex gap-2 mb-3">
            <span className="text-xs font-semibold px-3 py-0.5 rounded-full" style={{ background: "var(--sage-dark)", color: "white" }}>Research</span>
            <span className="text-xs font-semibold px-3 py-0.5 rounded-full" style={{ background: "var(--cream)", color: "var(--text-mid)", border: "1px solid var(--border)" }}>48 Tools</span>
          </div>
          <h1 className="heading" style={{ fontSize: "28px", lineHeight: "1.25", marginBottom: "12px" }}>{fm.title}</h1>
          <p style={{ color: "var(--text-mid)", fontSize: "15px", marginBottom: "12px" }}>{fm.description}</p>
          <div className="flex items-center gap-3 text-sm" style={{ color: "var(--text-light)" }}>
            <span>By Ash</span><span>·</span><span>Updated {fm.lastUpdated}</span>
          </div>
        </div>
        <div className="prose-counter-scope">
          {!chunks[1] && !chunks[2] ? (
            <div className="prose-content" dangerouslySetInnerHTML={{ __html: study.htmlContent }} />
          ) : (
            <>
              <div className="prose-content" dangerouslySetInnerHTML={{ __html: chunks[0] }} />
              <QuizCallout />
              <div className="prose-content" dangerouslySetInnerHTML={{ __html: chunks[1] }} />
              <InlineReadNext item={relatedItem} />
              <div className="prose-content" dangerouslySetInnerHTML={{ __html: chunks[2] }} />
            </>
          )}
        </div>
        <FeedbackWidget slug="2026-ai-tools-reality-check" contentType="page" />
        <div className="mt-6 pt-4 border-t text-sm" style={{ borderColor: "var(--border)", color: "var(--text-light)" }}>
          <Link href="/studies" className="hover:underline">← All research</Link>
          <span className="float-right mono">Published: {fm.lastUpdated}</span>
        </div>
        <RelatedPosts items={related} />
      </div>
    </>
  );
}
