import { Metadata } from "next";
import Link from "next/link";
import { getBlogBySlug, getAllBlogSlugs } from "@/lib/content";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return { title: "Not Found" };
  const fm = post.frontmatter;
  const ogUrl = `https://rawpickai.com/api/og?title=${encodeURIComponent(fm.title)}&type=Blog&category=${encodeURIComponent(fm.category || "")}`;
  return {
    title: fm.title,
    description: fm.description || "",
    alternates: { canonical: `https://rawpickai.com/blog/${slug}` },
    openGraph: { title: fm.title, description: fm.description || "", url: `https://rawpickai.com/blog/${slug}`, type: "article", images: [{ url: ogUrl, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", images: [ogUrl] },
  };
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();
  const fm = post.frontmatter;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: fm.title,
    description: fm.description || "",
    author: { "@type": "Person", name: fm.author || "Ash" },
    publisher: { "@type": "Organization", name: "RawPickAI", url: "https://rawpickai.com" },
    datePublished: fm.lastUpdated,
    dateModified: fm.lastUpdated,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-[760px] mx-auto px-5 md:px-10 py-8 md:py-10 pb-16 md:pb-20">
        <PageHero
          title={fm.title}
          description={fm.description || ""}
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: fm.title.length > 40 ? fm.title.slice(0, 40) + "..." : fm.title }]}
          pills={[{ label: "Blog", variant: "dark" }, ...(fm.category ? [{ label: fm.category }] : [])]}
          author={fm.author || "Ash"}
          readTime={`${Math.ceil((post.content.split(/\s+/).length) / 200)} min read`}
        />

        <div className="prose-content" dangerouslySetInnerHTML={{ __html: post.htmlContent }} />

        <div className="mt-12 pt-6 flex justify-between items-center" style={{ borderTop: "0.5px solid var(--border)" }}>
          <Link href="/blog" className="text-sm font-medium" style={{ color: "var(--sage-dark)" }}>← All blog posts</Link>
          <span className="text-xs mono" style={{ color: "var(--text-light)" }}>Published: {fm.lastUpdated}</span>
        </div>
      </div>
    </>
  );
}
