import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="max-w-[1180px] mx-auto px-[18px] pt-12 pb-10 border-t border-[var(--border)]">
      {/* Newsletter signup */}
      <div className="mb-12 pb-12 text-center" style={{ borderBottom: "0.5px solid var(--border)" }}>
        <h3 className="heading text-xl md:text-2xl font-semibold mb-2" style={{ letterSpacing: "-0.02em" }}>
          Get AI tool updates weekly
        </h3>
        <p className="text-sm mb-5 max-w-[460px] mx-auto" style={{ color: "var(--text-mid)" }}>
          New reviews, price changes, and the AI tools worth your attention. No spam. Unsubscribe anytime.
        </p>
        <NewsletterForm variant="inline" />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-10">
        <div className="max-w-[260px]">
          <div className="editorial-heading text-[22px] font-bold tracking-[-0.04em] mb-2.5">RawPickAI<span className="text-[var(--accent-rust)]">.</span></div>
          <p className="text-[13px] text-[var(--text-light)] leading-relaxed mb-4">
            Independent AI tool reviews and practical comparison tools. No sponsored rankings. Pricing in USD + INR.
          </p>
          <p className="text-[13px] text-[var(--text-light)] leading-relaxed">
            Built by <Link href="/about" className="underline hover:text-[var(--text)]">Ash</Link> - because honest reviews shouldn&apos;t be this hard to find.
          </p>
        </div>
        {[
          {
            title: "Browse",
            links: [
              { label: "All Tools", href: "/tools" },
              { label: "Comparisons", href: "/compare" },
            ],
          },
          {
            title: "Interactive Tools",
            links: [
              { label: "Compare Side-by-Side", href: "/tools/compare" },
              { label: "Find Your AI Tool", href: "/tools/quiz" },
              { label: "Free Tier Comparison", href: "/tools/free-tier-comparison" },
              { label: "Transparency Index", href: "/tools/transparency-index" },
              { label: "AI Cost Calculator", href: "/tools/cost-calculator" },
              { label: "Price Tracker", href: "/tools/price-tracker" },
            ],
          },
          {
            title: "Resources",
            links: [
              { label: "How We Test", href: "/methodology" },
              { label: "Blog", href: "/blog" },
              { label: "Research", href: "/studies" },
              { label: "Newsletter", href: "/newsletter" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ],
          },
          {
            title: "Legal",
            links: [
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Use", href: "/terms" },
              { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
            ],
          },
        ].map((col) => (
          <div key={col.title}>
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--text)] mb-3">
              {col.title}
            </div>
            {col.links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="block text-sm text-[var(--text-mid)] mb-2 hover:text-[var(--text)] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-10 pt-5 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[var(--text-light)] mono">
        <span>&copy; 2026 RawPickAI. All rights reserved.</span>
        <span>Independent AI tool reviews · Made in India 🇮🇳</span>
      </div>
    </footer>
  );
}
