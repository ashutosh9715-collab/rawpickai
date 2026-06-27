import { Metadata } from "next";
import Link from "next/link";
import { getNewsBySlug, getAllNewsSlugs, getAllNews } from "@/lib/content";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import FeedbackWidget from "@/components/FeedbackWidget";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  if (!post) return { title: "Not Found" };
  const fm = post.frontmatter;
  const ogUrl = `https://rawpickai.com/api/og?title=${encodeURIComponent(fm.title)}&type=News&category=${encodeURIComponent(fm.category || "AI")}`;
  return {
    title: fm.title,
    description: fm.description || "",
    alternates: { canonical: `https://rawpickai.com/news/${slug}` },
    openGraph: {
      title: fm.title,
      description: fm.description || "",
      url: `https://rawpickai.com/news/${slug}`,
      type: "article",
      publishedTime: fm.lastUpdated,
      modifiedTime: fm.lastUpdated,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", images: [ogUrl] },
    other: {
      "article:published_time": fm.lastUpdated,
      "article:modified_time": fm.lastUpdated,
      "article:section": fm.category || "AI",
    },
  };
}

export async function generateStaticParams() {
  return getAllNewsSlugs().map((slug) => ({ slug }));
}

export default async function NewsPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  if (!post) notFound();
  const fm = post.frontmatter;

  const ogUrl = `https://rawpickai.com/api/og?title=${encodeURIComponent(fm.title)}&type=News&category=${encodeURIComponent(fm.category || "AI")}`;
  const canonical = `https://rawpickai.com/news/${slug}`;

  // NewsArticle schema — critical for Google Discover eligibility
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        "@id": `${canonical}#article`,
        headline: fm.title,
        description: fm.description || "",
        url: canonical,
        mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
        image: [ogUrl],
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
        articleSection: fm.category || "AI",
        inLanguage: "en-US",
        isAccessibleForFree: true,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://rawpickai.com" },
          { "@type": "ListItem", position: 2, name: "News", item: "https://rawpickai.com/news" },
          { "@type": "ListItem", position: 3, name: fm.title, item: canonical },
        ],
      },
    ],
  };

  // Pull latest 3 other news posts (excluding current) for "More news" list
  const allNews = await getAllNews();
  const otherNews = allNews.filter((n) => n.slug !== slug).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-[760px] mx-auto px-5 md:px-10 py-8 md:py-10 pb-16 md:pb-20">
        <PageHero
          title={fm.title}
          description={fm.description || ""}
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "News", href: "/news" }, { label: fm.title.length > 40 ? fm.title.slice(0, 40) + "..." : fm.title }]}
          pills={[{ label: "News", variant: "dark" }, ...(fm.category ? [{ label: fm.category }] : [])]}
          author={fm.author || "Ash"}
          readTime={`${Math.max(2, Math.ceil((post.content.split(/\s+/).length) / 220))} min read`}
        />

        <div className="prose-content" dangerouslySetInnerHTML={{ __html: post.htmlContent }} />

        {otherNews.length > 0 && (
          <section className="mt-10 pt-8" style={{ borderTop: "0.5px solid var(--border)" }}>
            <h2 className="heading text-lg font-semibold mb-4" style={{ color: "var(--text-dark)" }}>More AI news</h2>
            <div className="grid gap-3">
              {otherNews.map((n) => (
                <Link key={n.slug} href={`/news/${n.slug}`} className="block card card-hover !py-4 !px-5">
                  <div className="text-[10px] mono mb-1" style={{ color: "var(--text-light)" }}>{n.frontmatter.lastUpdated}</div>
                  <div className="heading text-[15px] font-semibold leading-snug" style={{ color: "var(--text-dark)" }}>{n.frontmatter.title}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <FeedbackWidget slug={slug} contentType="news" />

        <div className="mt-8 pt-6 flex justify-between items-center" style={{ borderTop: "0.5px solid var(--border)" }}>
          <Link href="/news" className="text-sm font-medium" style={{ color: "var(--sage-dark)" }}>← All news</Link>
          <span className="text-xs mono" style={{ color: "var(--text-light)" }}>Published: {fm.lastUpdated}</span>
        </div>
      </div>
    </>
  );
}
