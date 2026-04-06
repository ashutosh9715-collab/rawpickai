import { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
export const metadata: Metadata = { title: "Terms of Use — RawPickAI", description: "Terms and conditions for using RawPickAI.", alternates: { canonical: "https://rawpickai.com/terms" } };
export default function TermsPage() {
  return (
    <div className="max-w-[760px] mx-auto px-5 md:px-10 py-10 pb-20">
      <PageHero title="Terms of Use" description="Effective April 1, 2026. By using RawPickAI, you agree to these terms." breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms of Use" }]} pills={[{ label: "Legal", variant: "dark" }, { label: "Updated Apr 2026" }]} />
      <div className="prose-content">
        <h2>Our content is opinion, not professional advice</h2>
        <p>All reviews and recommendations represent our editorial opinions based on hands-on testing. Always verify pricing and features directly with the tool provider.</p>
        <h2>Affiliate links</h2>
        <p>Some links are affiliate links. See our <Link href="/affiliate-disclosure" className="text-[var(--sage-dark)] underline font-medium">Affiliate Disclosure</Link> for details.</p>
        <h2>Intellectual property</h2>
        <p>All original content is protected by copyright. You may quote short excerpts with attribution and a link back.</p>
        <h2>Governing law</h2>
        <p>These terms are governed by the laws of India.</p>
        <h2>Contact</h2>
        <p>Questions? Email <strong>hello@rawpickai.com</strong>.</p>
      </div>
    </div>
  );
}
