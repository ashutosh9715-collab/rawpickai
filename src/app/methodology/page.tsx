import { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
export const metadata: Metadata = { title: "How We Test AI Tools — Our Review Methodology", description: "Learn exactly how RawPickAI evaluates and scores AI tools.", alternates: { canonical: "https://rawpickai.com/methodology" } };
export default function MethodologyPage() {
  return (
    <div className="max-w-[760px] mx-auto px-5 md:px-10 py-10 pb-20">
      <PageHero title="How We Test AI Tools" description="Every review on RawPickAI follows the same rigorous process. Here's the framework behind every score we publish." breadcrumbs={[{ label: "Home", href: "/" }, { label: "How We Test" }]} pills={[{ label: "Methodology", variant: "dark" }]} author="Ash" />
      <div className="prose-content">
        <h2>Step 1: Discovery & setup</h2>
        <p>Before testing begins, we research the tool&apos;s background — who built it, when it launched, what problem it claims to solve, and who its competitors are. Then we sign up. Always through the regular signup flow, never through a press account or special reviewer access.</p>
        <p>We note the onboarding: How long does it take to go from signup to first useful output? Is there a learning curve? Do you need a tutorial, or is it intuitive enough to figure out on your own?</p>
        <h2>Step 2: Hands-on testing</h2>
        <p>For quick tools like AI writing assistants, we spend 15-20 minutes running specific test prompts — the same ones we use across competitors. For complex tools like code editors or video generators, we&apos;ll spend an hour or more working on a real task.</p>
        <p>For <strong>writing and content tools</strong>, we test with three standard prompts: a blog introduction, a product description, and a cold email.</p>
        <p>For <strong>image generation tools</strong>, we run five prompts ranging from simple to complex, including India-specific visual contexts.</p>
        <p>For <strong>code assistants</strong>, we test autocomplete accuracy on a real Python project, ask for a function refactoring, and try debugging a known issue.</p>
        <h2>Step 3: Pricing analysis</h2>
        <p>We break down every pricing tier, including free plans and trial periods. We show pricing in both USD and INR at current exchange rates.</p>
        <h2>Step 4: Scoring</h2>
        <p>Every tool is rated across five weighted dimensions, each scored from 0 to 100 based on hands-on testing. The weighted average becomes the overall score, which we display on each review in the familiar X/5 format (e.g., 4.5/5 = 90/100 overall).</p>
        <div className="rounded-[16px] p-6 my-6" style={{ background: "var(--sage-light)" }}>
          <div className="mb-4"><strong className="heading">Ease of use</strong> <span className="text-sm" style={{ color: "var(--text-light)" }}>(weight: 20%)</span><p className="mt-1 mb-0">How quickly can someone new get productive?</p></div>
          <div className="mb-4"><strong className="heading">Output quality</strong> <span className="text-sm" style={{ color: "var(--text-light)" }}>(weight: 30%)</span><p className="mt-1 mb-0">Does the tool produce results you&apos;d actually use?</p></div>
          <div className="mb-4"><strong className="heading">Value for money</strong> <span className="text-sm" style={{ color: "var(--text-light)" }}>(weight: 20%)</span><p className="mt-1 mb-0">What do you get relative to what you pay?</p></div>
          <div className="mb-4"><strong className="heading">Feature depth</strong> <span className="text-sm" style={{ color: "var(--text-light)" }}>(weight: 15%)</span><p className="mt-1 mb-0">Does the tool offer meaningful features beyond the basics?</p></div>
          <div><strong className="heading">Free tier</strong> <span className="text-sm" style={{ color: "var(--text-light)" }}>(weight: 15%)</span><p className="mt-1 mb-0">How usable is the free plan?</p></div>
        </div>
        <p><em>A note on precision:</em> scores are calibrated in bucket thinking (e.g., 70 = competent, 80 = strong, 90 = exceptional) rather than fine-grained absolute numbers. This mirrors how a single reviewer actually evaluates tools — you can tell the difference between a 70 and an 85, but not between an 85 and 87.</p>
        <h2>What we don&apos;t do</h2>
        <p><strong>We don&apos;t accept payment for reviews.</strong> Our affiliate relationships are separate from our editorial process.</p>
        <p><strong>We don&apos;t review tools we haven&apos;t used.</strong> If we can&apos;t sign up and test it ourselves, it doesn&apos;t get a review page.</p>
        <p><strong>We don&apos;t copy other reviews.</strong> Every observation comes from our own testing.</p>
        <h2>Questions?</h2>
        <p>Reach out at <strong>hello@rawpickai.com</strong> or through our <Link href="/contact" className="text-[var(--sage-dark)] underline font-medium">contact page</Link>.</p>
      </div>
    </div>
  );
}
