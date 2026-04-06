import Link from "next/link";

export default function Footer() {
  return (
    <footer className="max-w-[1140px] mx-auto px-5 md:px-10 pt-12 pb-10 border-t border-[var(--border)]">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-10">
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{ background: "var(--sage-dark)", color: "var(--sage)" }}
            >
              R
            </div>
            <span className="heading text-[15px] font-semibold">RawPickAI</span>
          </div>
          <p className="text-[13px] text-[var(--text-light)] max-w-[240px] leading-relaxed">
            Independent AI tool reviews. Every tool tested by our team. No sponsored rankings.
          </p>
        </div>
        {[
          {
            title: "Browse",
            links: [
              { label: "All Tools", href: "/tools" },
              { label: "Categories", href: "/categories" },
              { label: "Compare", href: "/compare" },
              { label: "Best Of", href: "/best" },
            ],
          },
          {
            title: "Resources",
            links: [
              { label: "How We Test", href: "/methodology" },
              { label: "Newsletter", href: "/newsletter" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ],
          },
          {
            title: "Legal",
            links: [
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
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
      <div className="mt-10 pt-5 border-t border-[var(--border)] text-center text-xs text-[var(--text-light)] mono">
        2026 RawPickAI. All rights reserved · Made in India 🇮🇳
      </div>
    </footer>
  );
}
