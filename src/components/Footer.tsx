import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="max-w-[1140px] mx-auto px-5 md:px-10 pt-12 pb-10 border-t border-[var(--border)]">
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

      {/* Quick actions bar */}
      <div className="mb-12 pb-12 grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ borderBottom: "0.5px solid var(--border)" }}>
        <Link href="/tools/compare" className="rounded-xl p-5 text-center transition-colors hover:opacity-90" style={{ background: "var(--sage-light)" }}>
          <div className="text-xl mb-2">⚖</div>
          <div className="heading text-sm font-semibold mb-1" style={{ color: "var(--sage-dark)" }}>Compare Tools</div>
          <div className="text-xs" style={{ color: "var(--text-mid)" }}>Pick any 2-3 tools, see scores side-by-side</div>
        </Link>
        <Link href="/tools/quiz" className="rounded-xl p-5 text-center transition-colors hover:opacity-90" style={{ background: "var(--warm)" }}>
          <div className="text-xl mb-2">🎯</div>
          <div className="heading text-sm font-semibold mb-1" style={{ color: "#5D4037" }}>Find Your Tool</div>
          <div className="text-xs" style={{ color: "var(--text-mid)" }}>Answer 3 questions, get a recommendation</div>
        </Link>
        <Link href="/studies/2026-ai-tools-reality-check" className="rounded-xl p-5 text-center transition-colors hover:opacity-90" style={{ background: "var(--blue-soft)" }}>
          <div className="text-xl mb-2">📊</div>
          <div className="heading text-sm font-semibold mb-1" style={{ color: "#1A3052" }}>2026 AI Study</div>
          <div className="text-xs" style={{ color: "var(--text-mid)" }}>48 tools analyzed, downloadable dataset</div>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-10">
        <div className="max-w-[260px]">
          <div className="flex items-center gap-2 mb-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{ background: "var(--sage-dark)", color: "var(--sage)" }}
            >
              R
            </div>
            <span className="heading text-[15px] font-semibold">RawPickAI</span>
          </div>
          <p className="text-[13px] text-[var(--text-light)] leading-relaxed mb-4">
            Independent AI tool reviews. Every tool tested by our team. No sponsored rankings. Pricing in USD + INR.
          </p>
          <p className="text-[13px] text-[var(--text-light)] leading-relaxed">
            Built by <Link href="/about" className="underline hover:text-[var(--text)]">Ash</Link> — because honest reviews shouldn&apos;t be this hard to find.
          </p>
        </div>
        {[
          {
            title: "Browse",
            links: [
              { label: "All Tools", href: "/tools" },
              { label: "Categories", href: "/categories" },
              { label: "Comparisons", href: "/compare" },
              { label: "Best Of Lists", href: "/best" },
              { label: "News", href: "/news" },
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
