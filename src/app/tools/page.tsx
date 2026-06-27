import Link from "next/link";
import { getAllReviews } from "@/lib/content";

const catColors: Record<string, { bg: string; text: string }> = {
  "AI Assistants": { bg: "#EEF2FF", text: "#6366F1" },
  "Writing & Content": { bg: "#FFF7ED", text: "#C2410C" },
  "AI Writing Tools": { bg: "#FFF7ED", text: "#C2410C" },
  "Writing Tools": { bg: "#FFF7ED", text: "#C2410C" },
  "Image Generation": { bg: "#FDF2F8", text: "#BE185D" },
  "Code Assistants": { bg: "#F0FDFA", text: "#0D9488" },
  "Research & Education": { bg: "#EFF6FF", text: "#2563EB" },
  "AI Search & Research": { bg: "#EFF6FF", text: "#2563EB" },
  "Video & Audio": { bg: "#FEF9C3", text: "#A16207" },
  "Productivity & Presentations": { bg: "var(--sage-light)", text: "var(--sage-dark)" },
  "Design & Creative": { bg: "#F5F3FF", text: "#7C3AED" },
  "Marketing & SEO": { bg: "#ECFDF5", text: "#059669" },
};

const interactiveTools = [
  { title: "AI Tool Finder", desc: "Answer 4 questions, get a personalized AI stack with total cost in INR.", href: "/tools/ai-tool-finder", icon: "🧭", pill: "New" },
  { title: "AI Savings Calculator", desc: "Calculate how much your team saves by adopting AI tools.", href: "/tools/savings-calculator", icon: "💰", pill: "New" },
  { title: "AI Price Tracker", desc: "Current pricing for 18 AI tools in INR. Updated weekly.", href: "/tools/price-tracker", icon: "📈", pill: "Tracker" },
  { title: "AI Tool Deals", desc: "Every verified discount, student offer, and free tier.", href: "/deals", icon: "🏷️", pill: "Deals" },
  { title: "Which AI tool should I use?", desc: "Answer 5 questions, get personalized recommendations.", href: "/tools/quiz", icon: "🎯", pill: "Quiz" },
  { title: "AI Pricing Calculator", desc: "Convert AI tool prices between USD and INR instantly.", href: "/tools/pricing-calculator", icon: "💲", pill: "Calculator" },
  { title: "Free Tier Comparison", desc: "Every free tier ranked. Filter by category, sort by quality.", href: "/tools/free-tier-comparison", icon: "🆓", pill: "Comparison" },
  { title: "Transparency Index", desc: "50 AI tools rated on pricing honesty. 79% hide enterprise pricing.", href: "/tools/transparency-index", icon: "🔍", pill: "New" },
  { title: "AI Tool Cost Calculator", desc: "Set your budget, see which tools fit.", href: "/tools/cost-calculator", icon: "📊", pill: "Calculator" },
];

export const metadata = {
  title: "AI Tools & Reviews",
  description: "Interactive AI tools, calculators, and honest reviews. Find the right AI tool for your workflow.",
  alternates: { canonical: "https://rawpickai.com/tools" },
};

export default async function ToolsPage() {
  const reviews = await getAllReviews();

  reviews.sort((a, b) => {
    const scoreA = a.frontmatter.scores?.overall || a.frontmatter.overallScore || 0;
    const scoreB = b.frontmatter.scores?.overall || b.frontmatter.overallScore || 0;
    return (scoreB as number) - (scoreA as number);
  });

  return (
    <div className="max-w-[900px] mx-auto px-5 md:px-10 py-8 pb-20">
      <div className="text-xs mb-6" style={{ color: "var(--text-light)" }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-1.5">›</span>
        <span style={{ color: "var(--text-mid)" }}>Tools & Reviews</span>
      </div>

      <div className="mb-8">
        <h1 className="heading text-2xl md:text-4xl font-bold mb-2" style={{ letterSpacing: "-0.03em" }}>
          Tools & Reviews
        </h1>
        <p className="text-lg" style={{ color: "var(--text-mid)" }}>
          Interactive tools to help you choose, plus {reviews.length} in-depth reviews.
        </p>
      </div>

      {/* Interactive Tools Section */}
      <div className="mb-10">
        <h2 className="heading text-lg font-medium mb-4">Interactive tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {interactiveTools.map((t) => (
            <Link key={t.href} href={t.href}>
              <div className="card card-hover !p-5 flex gap-4 items-start">
                <span className="text-2xl">{t.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="heading text-[15px] font-semibold">{t.title}</span>
                    <span className="pill text-[10px]" style={{ background: "var(--sage-light)", color: "var(--sage-dark)" }}>{t.pill}</span>
                  </div>
                  <p className="text-[13px] m-0" style={{ color: "var(--text-mid)" }}>{t.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div>
        <h2 className="heading text-lg font-medium mb-4">All tool reviews <span className="text-sm font-normal" style={{ color: "var(--text-light)" }}>({reviews.length})</span></h2>
        <div className="grid gap-3">
          {reviews.map((review) => {
            const fm = review.frontmatter;
            const overall = fm.scores?.overall || fm.overallScore;
            const cat = fm.category || "";
            const colors = catColors[cat] || { bg: "#F4F4F5", text: "var(--text-mid)" };
            const toolName = fm.toolName || fm.title.split(" Review")[0].split(":")[0].replace(/"/g, "");

            return (
              <Link key={review.slug} href={`/review/${review.slug}`}>
                <div className="card card-hover flex items-center gap-5 !py-5 !px-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                      <span className="heading text-base font-semibold">{toolName}</span>
                      <span className="pill text-[10px]" style={{ background: colors.bg, color: colors.text }}>{cat}</span>
                    </div>
                    <p className="text-[13px] leading-relaxed m-0" style={{ color: "var(--text-mid)" }}>
                      {(fm.description || "").length > 140 ? (fm.description || "").slice(0, 140) + "..." : fm.description || ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    {overall && (
                      <div className="text-center">
                        <div className="text-xl font-bold heading" style={{ color: "#B8860B" }}>
                          {typeof overall === "number" ? overall.toFixed(1) : overall}
                        </div>
                        <div className="text-[10px]" style={{ color: "var(--text-light)" }}>out of 5</div>
                      </div>
                    )}
                    <span className="text-sm font-semibold hidden sm:block" style={{ color: "var(--sage-dark)" }}>Read →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
