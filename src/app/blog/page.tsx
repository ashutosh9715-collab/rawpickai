import Link from "next/link";
import { getAllBlogPosts } from "@/lib/content";

export const metadata = {
  title: "Blog - AI Guides, Updates & Analysis",
  description: "Browse AI guides, workflow advice, product updates, and analysis from the RawPickAI article library.",
  alternates: { canonical: "https://rawpickai.com/blog" },
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  const lead = posts.find((post) => post.slug === "how-to-use-chatgpt-effectively") || posts[0];
  const remaining = posts.filter((post) => post.slug !== lead?.slug);

  return (
    <div className="directory-page">
      <div className="directory-kicker">Practical AI guides</div>
      <section className="directory-hero">
        <div>
          <h1 className="directory-title">Guides, updates and analysis.</h1>
          <p className="directory-intro">Browse practical AI guides and past product coverage. Check each article&apos;s date and testing notes when comparing it with today&apos;s software.</p>
        </div>
        <aside className="directory-note"><strong>Our editorial rule</strong>Publish only when we can add testing, evidence, or a genuinely useful explanation.</aside>
      </section>

      {lead && <>
        <div className="directory-section-head"><h2>Featured guide</h2><span>Updated {lead.frontmatter.lastUpdated}</span></div>
        <Link href={`/blog/${lead.slug}`} className="editorial-feature">
          <div className="editorial-feature-art"><div className="readable-guide-mark">GUIDE</div></div>
          <div className="editorial-feature-copy">
            <div><span className="editorial-tag">{lead.frontmatter.category}</span><h3>{lead.frontmatter.title}</h3><p>{lead.frontmatter.description}</p></div>
            <div><div className="editorial-meta"><span>Maintained guide</span><span>Updated {lead.frontmatter.lastUpdated}</span></div><p className="editorial-link">Read the guide</p></div>
          </div>
        </Link>
      </>}

      <div className="directory-section-head"><h2>More articles</h2><span>{remaining.length} articles</span></div>
      <div className="readable-post-grid">
        {remaining.map((post) => (
          <Link className="readable-post" href={`/blog/${post.slug}`} key={post.slug}>
            <div className="readable-post-visual">{post.frontmatter.category}</div>
            <h3>{post.frontmatter.title}</h3><p>{post.frontmatter.description}</p><span className="editorial-date">Updated {post.frontmatter.lastUpdated}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
