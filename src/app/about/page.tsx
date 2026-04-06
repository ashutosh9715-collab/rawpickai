import { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "About RawPickAI — Who We Are & Why We Exist", description: "RawPickAI is an independent AI tool review site built by Ash. We test every tool ourselves before reviewing it.", alternates: { canonical: "https://rawpickai.com/about" } };

export default function AboutPage() {
  return (
    <div className="max-w-[760px] mx-auto px-5 md:px-10 py-10 pb-20">
      <PageHero title="About RawPickAI" description="Independent AI tool reviews. Every tool tested by our team. No sponsored rankings, ever." breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]} pills={[{ label: "About Us", variant: "dark" }]} author="Ash" />
      <div className="prose-content">
        <h2>The short version</h2>
        <p>I&apos;m Ash, and I built RawPickAI because I was tired of Googling &quot;best AI writing tool&quot; and getting the same recycled listicles that clearly never tested anything. You know the ones — they rank tools they&apos;ve never opened, slap affiliate links everywhere, and call it a &quot;comprehensive review.&quot;</p>
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
        <p>RawPickAI is built for people globally who are navigating the overwhelming world of AI tools — freelancers choosing between writing assistants, developers evaluating code editors, students looking for free tools that actually work, and small business owners trying to figure out which AI will genuinely save them time.</p>
        <h2>Get in touch</h2>
        <p>Have a question? Want to suggest a tool for review? Reach out on our <Link href="/contact" className="text-[var(--sage-dark)] underline font-medium">contact page</Link> or drop me a line at <strong>hello@rawpickai.com</strong>.</p>
        <p>You can also join 2,400+ others who get our free <Link href="/newsletter" className="text-[var(--sage-dark)] underline font-medium">weekly newsletter</Link> every Tuesday.</p>
        <div className="mt-10 pt-6 border-t border-[var(--border)] text-sm italic" style={{ color: "var(--text-light)" }}>RawPickAI is independently operated from India. Every review reflects genuine testing and honest opinions.</div>
      </div>
    </div>
  );
}
