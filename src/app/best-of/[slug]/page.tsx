import { Metadata } from "next";
import Link from "next/link";
import { getBestOfBySlug, getAllBestOfSlugs } from "@/lib/content";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";

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

  return (
    <div className="max-w-[760px] mx-auto px-5 md:px-10 py-10 pb-20">
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

      <div className="prose-content" dangerouslySetInnerHTML={{ __html: page.htmlContent }} />

      <div className="mt-12 pt-6 flex justify-between items-center" style={{ borderTop: "0.5px solid var(--border)" }}>
        <Link href="/best" className="text-sm font-medium" style={{ color: "var(--sage-dark)" }}>← All best-of lists</Link>
        <span className="text-xs mono" style={{ color: "var(--text-light)" }}>Last updated: {fm.lastUpdated}</span>
      </div>
    </div>
  );
}
