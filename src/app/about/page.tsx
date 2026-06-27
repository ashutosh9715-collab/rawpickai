import { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "About RawPickAI — Who We Are & Why We Exist", description: "RawPickAI is an independent AI tool review site built by Ashutosh Khulbe. We test every tool ourselves before reviewing it. As featured in The Epoch Times.", alternates: { canonical: "https://rawpickai.com/about" } };

// SEO FIX: Person schema for Ashutosh Khulbe — builds author entity for E-E-A-T and AI Overview attribution.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://rawpickai.com/about#ashutosh-khulbe",
  name: "Ashutosh Khulbe",
  alternateName: "Ash",
  url: "https://rawpickai.com/about",
  jobTitle: "Founder & Lead Reviewer",
  description: "Independent AI tool reviewer. Tests every tool hands-on before writing. Founder of RawPickAI. Featured in The Epoch Times, ZeroHedge, and Gulf Insider.",
  worksFor: { "@type": "Organization", name: "RawPickAI", url: "https://rawpickai.com" },
  sameAs: [
    "https://medium.com/@ashutoshkhulbe15",
    "https://www.linkedin.com/in/ashutosh-khulbe",
    "https://featured.com/p/ashutosh-k",
    "https://www.crunchbase.com/person/ashutosh-khulbe",
  ],
  knowsAbout: ["Artificial Intelligence", "AI Tools", "Large Language Models", "AI Code Assistants", "AI Image Generation", "Software Reviews"],
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <div className="max-w-[760px] mx-auto px-5 md:px-10 py-10 pb-20">
      <PageHero title="About RawPickAI" description="Independent AI tool reviews. Every tool tested by our team. No sponsored rankings, ever." breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]} pills={[{ label: "About Us", variant: "dark" }]} author="Ashutosh Khulbe" />
      <div className="prose-content">
        <h2>The short version</h2>
        <p>I&apos;m Ashutosh Khulbe (Ash), and I built RawPickAI because I was tired of Googling &quot;best AI writing tool&quot; and getting the same recycled listicles that clearly never tested anything. You know the ones — they rank tools they&apos;ve never opened, slap affiliate links everywhere, and call it a &quot;comprehensive review.&quot;</p>
        <p>RawPickAI is different. Every single tool on this site has been tested by me personally. I sign up, I use the free tier, I push it until something breaks, and then I write about what actually happened. If a tool is great, I&apos;ll tell you. If it&apos;s overpriced garbage with good marketing, I&apos;ll tell you that too.</p>
        <h2>Why I started this</h2>
        <p>Back in late 2025, I was helping a friend pick an AI image generator for his design agency. We spent three evenings comparing Midjourney, DALL-E 3, and Leonardo AI — testing the same prompts across all three, comparing output quality, checking pricing in rupees, figuring out which one actually worked for commercial use in India.</p>
        <p>By the end of it, I had a Google Doc full of notes, screenshots, and honest opinions that was more useful than anything I&apos;d found online. A friend saw it and said, &quot;You should make a website out of this.&quot; So I did.</p>
        <p>RawPickAI launched in April 2026 with one goal: become the most honest, practical AI tool review site for people who actually need to pick a tool and get work done.</p>
        <h2>What makes us different</h2>
        <p><strong>We test everything ourselves.</strong> No exceptions. I spend 15-20 minutes minimum with every tool before writing a single word. For major tools like ChatGPT or Cursor, I&apos;ve used them for weeks across real projects. Our <Link href="/methodology" className="text-[var(--sage-dark)] underline font-medium">methodology page</Link> explains exactly how we score and evaluate tools.</p>
        <p><strong>We show real pricing in USD and INR.</strong> Most review sites only show USD pricing. We show both, so you know exactly what you&apos;re paying wherever you are.</p>
        <p><strong>We have opinions.</strong> A review that says &quot;it depends on your needs&quot; for everything isn&apos;t a review — it&apos;s a cop-out. We make clear recommendations. We tell you who each tool is best for, and who should skip it entirely.</p>
        <p><strong>No sponsored rankings.</strong> Our scores are based on testing, not on who pays us the most. Some links on the site are affiliate links (we&apos;re transparent about this in our <Link href="/affiliate-disclosure" className="text-[var(--sage-dark)] underline font-medium">affiliate disclosure</Link>), but they never influence our scores or recommendations.</p>
        <h2>Who is this for?</h2>
        <p>RawPickAI is built for people globally who are navigating the overwhelming world of AI tools — freelancers choosing between writing assistants, developers evaluating code editors, students looking for free tools that actually work, and small business owners trying to figure out which AI will actually save them time.</p>
        <h2>Featured in</h2>
        <p>RawPickAI&apos;s research and reviews have been cited by major publications:</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", margin: "16px 0 24px" }}>
          {["The Epoch Times", "ZeroHedge", "Gulf Insider"].map((pub) => (
            <span key={pub} style={{ background: "var(--sage-light)", color: "var(--sage-dark)", padding: "8px 16px", borderRadius: "8px", fontSize: "14px", fontWeight: 600 }}>{pub}</span>
          ))}
        </div>
        <p>Our data on AI tool pricing transparency (79% of AI tools hide enterprise pricing) and the <Link href="/studies/2026-ai-tools-reality-check" className="text-[var(--sage-dark)] underline font-medium">2026 AI Tools Reality Check</Link> study has been referenced in articles about AI&apos;s impact on critical thinking and content quality.</p>

        <h2>By the numbers</h2>
        <p><strong>50+ AI tools tested</strong> with hands-on evaluation. <strong>21 head-to-head comparisons</strong> using identical prompts. <strong>9 best-of lists</strong> ranked by real benchmarks. <strong>1 original research study</strong> with downloadable dataset (CC BY 4.0). All pricing verified in both USD and INR at ≈₹93/USD.</p>

        <h2>Get in touch</h2>
        <p>Have a question? Want to suggest a tool for review? Reach out on our <Link href="/contact" className="text-[var(--sage-dark)] underline font-medium">contact page</Link> or drop me a line at <strong>hello@rawpickai.com</strong>.</p>
        <p>If you want new reviews delivered, subscribe to the <Link href="/newsletter" className="text-[var(--sage-dark)] underline font-medium">weekly email</Link> — one issue every Tuesday.</p>
        <div className="mt-10 pt-6 border-t border-[var(--border)] text-sm italic" style={{ color: "var(--text-light)" }}>RawPickAI is independently operated by Ashutosh Khulbe from India. Every review reflects hands-on testing and honest opinions. As featured in The Epoch Times, ZeroHedge, and Gulf Insider.</div>
      </div>
    </div>
    </>
  );
}
