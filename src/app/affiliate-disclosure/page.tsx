import { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
export const metadata: Metadata = { title: "Affiliate Disclosure — How RawPickAI Makes Money", description: "Full transparency about how RawPickAI earns revenue through affiliate links.", alternates: { canonical: "https://rawpickai.com/affiliate-disclosure" } };
export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-[760px] mx-auto px-5 md:px-10 py-10 pb-20">
      <PageHero title="Affiliate Disclosure" description="Full transparency about how RawPickAI earns revenue and why it never influences our reviews." breadcrumbs={[{ label: "Home", href: "/" }, { label: "Affiliate Disclosure" }]} pills={[{ label: "Transparency", variant: "dark" }]} />
      <div className="prose-content">
        <p>Some links on RawPickAI are affiliate links. When you click and sign up, we may earn a small commission at no extra cost to you.</p>
        <h2>What it doesn&apos;t mean</h2>
        <p><strong>Our scores are based on testing, not revenue.</strong> A tool that pays generous commissions but performs poorly will receive a low score.</p>
        <p><strong>We review tools without affiliate programs.</strong> Several tools on RawPickAI have no affiliate program at all.</p>
        <p><strong>Our &quot;Best Of&quot; rankings reflect testing, not commissions.</strong> The #1 pick earned that position through our <Link href="/methodology" className="text-[var(--sage-dark)] underline font-medium">scoring methodology</Link>.</p>
        <h2>Why we use affiliate links</h2>
        <p>Running an independent review site takes real time and money. Affiliate revenue allows us to keep RawPickAI free and ad-free.</p>
        <h2>Questions?</h2>
        <p>Reach out at <strong>hello@rawpickai.com</strong>.</p>
      </div>
    </div>
  );
}
