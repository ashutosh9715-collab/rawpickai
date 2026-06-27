import { Metadata } from "next";
import PageHero from "@/components/PageHero";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = { title: "RawPickAI Weekly Newsletter", description: "Get the weekly RawPickAI newsletter every Tuesday — honest AI tool picks, new launches, and pricing changes in your inbox.", alternates: { canonical: "https://rawpickai.com/newsletter" } };

export default function NewsletterPage() {
  return (
    <div className="max-w-[760px] mx-auto px-5 md:px-10 py-10 pb-20">
      <PageHero
        title="The RawPickAI Weekly Newsletter"
        description="Every Tuesday morning, one email with everything you need to stay sharp on AI tools — without the noise."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Newsletter" }]}
        pills={[{ label: "Newsletter", variant: "dark" }, { label: "Every Tuesday" }]}
        author="Ash"
      />

      <div className="prose-content">
        <h2>What you get each week</h2>
        <p><strong>Curated tool picks.</strong> We highlight 2-3 AI tools that stood out — brand new launches or existing tools that shipped game-changing updates.</p>
        <p><strong>New reviews & comparisons.</strong> A roundup of everything we published that week on RawPickAI.</p>
        <p><strong>Deals & pricing changes.</strong> When a tool drops its price or launches a new plan, we flag it.</p>
        <p><strong>One honest take.</strong> Each issue ends with a brief opinion piece — a trend we&apos;re watching, a tool that disappointed us, or a prediction about where AI tools are headed.</p>

        <h2>The details</h2>
        <p>The newsletter goes out <strong>every Tuesday</strong> at 9 AM IST. It&apos;s <strong>completely free</strong> and always will be. Every issue takes about 4 minutes to read.</p>

        <div className="rounded-[16px] p-8 my-10 text-center" style={{ background: "var(--sage-light)" }}>
          <h3 className="heading text-2xl font-medium mb-2" style={{ color: "var(--sage-dark)" }}>Subscribe to the weekly email</h3>
          <p className="text-sm mb-6" style={{ color: "var(--sage-mid)" }}>One email. Every Tuesday. Free forever.</p>
          <NewsletterForm />
          <p className="text-xs mt-3 italic" style={{ color: "var(--text-light)" }}>No spam. No selling your email. Just one useful email every Tuesday.</p>
        </div>
      </div>
    </div>
  );
}
