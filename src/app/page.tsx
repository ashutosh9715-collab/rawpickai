"use client";

import { useState } from "react";
import Link from "next/link";
import { categories } from "@/data/tools";
import NewsletterForm from "@/components/NewsletterForm";

const tools = [
  { slug: "cursor", name: "Cursor", cat: "Code Editor", rating: 4.5, badge: "Editor's Pick", letter: "C", grad: "linear-gradient(135deg,#0EA5E9,#2DD4BF)", desc: "The AI-first code editor. Best-in-class completions we've ever tested." },
  { slug: "midjourney", name: "Midjourney", cat: "Image Gen", rating: 4.4, badge: "Top Rated", letter: "M", grad: "linear-gradient(135deg,#F43F5E,#FB923C)", desc: "Best image quality available. Nothing else comes close on aesthetics." },
  { slug: "perplexity", name: "Perplexity", cat: "AI Search", rating: 4.4, badge: "Top Rated", letter: "P", grad: "linear-gradient(135deg,#6366F1,#8B5CF6)", desc: "AI search with real citations. Our default research tool now." },
];

// SEO FIX: Year-agnostic slugs — URLs never go stale, no redirects needed each year
const bestOf = [
  { slug: "best-ai-writing-tools", title: "Best AI Writing Tools", count: 7 },
  { slug: "best-ai-code-assistants", title: "Best AI Code Assistants", count: 5 },
  { slug: "best-free-ai-tools", title: "Best Free AI Tools", count: 10 },
  { slug: "best-chatgpt-alternatives", title: "Best ChatGPT Alternatives", count: 7 },
  { slug: "best-ai-image-generators", title: "Best AI Image Generators", count: 6 },
  { slug: "best-ai-video-generators", title: "Best AI Video Generators", count: 5 },
  { slug: "best-ai-presentation-tools", title: "Best AI Presentation Tools", count: 5 },
  { slug: "best-ai-tools-for-students", title: "Best AI Tools for Students", count: 8 },
];

const faqs = [
  { q: "What is RawPickAI?", a: "RawPickAI is an independent AI tool review site. We test every tool ourselves, score them honestly, and help you pick the right one for your workflow. No sponsored rankings, no affiliate bias." },
  { q: "How do you test and score tools?", a: "We spend 20+ minutes using every tool before writing a review. We score on 5 criteria: Ease of Use, Output Quality, Value for Money, Feature Depth, and Free Tier — each rated 0-100 based on our hands-on experience." },
  { q: "Do you accept payment for higher rankings?", a: "Never. Our scores are based entirely on testing. Some links are affiliate links (we disclose this), but affiliates have zero influence on our scores or rankings." },
  { q: "How often do you update reviews?", a: "We refresh reviews monthly and whenever a tool ships a major update. Every review shows a 'Last updated' date so you know how current our information is." },
  { q: "Why do you show pricing in both USD and INR?", a: "We show USD pricing first (the global standard) with INR conversions alongside. Most review sites ignore Indian pricing entirely. We include both so you know exactly what you're paying, wherever you are." },
];

// SEO FIX: FAQ schema for homepage — enables expandable FAQ accordion in Google SERPs
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* SEO FIX: FAQ schema injected — Google can show accordion in search results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ======= HERO ======= */}
      <section className="max-w-[1140px] mx-auto px-5 md:px-10 pt-5">
        <div
          className="rounded-[16px] md:rounded-[24px] relative overflow-hidden p-8 pt-10 md:p-16 md:pt-[72px] md:pb-0"
          style={{ background: "var(--sage)", minHeight: "auto" }}
        >
          {/* Decorative circles */}
          <div className="absolute hidden md:block" style={{ top: "-80px", right: "-60px", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(255,255,255,0.25)" }} />
          <div className="absolute hidden md:block" style={{ top: "40px", right: "100px", width: "140px", height: "140px", borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />

          <div className="relative z-10 max-w-[600px]">
            {/* SEO FIX: Keyword-rich H1 for Google. Visually hidden — keeps the hero design intact */}
            <h1 className="sr-only">
              Independent AI Tool Reviews &amp; Comparisons — Tested by Hand, Scored Honestly
            </h1>
            <div
              aria-hidden="true"
              className="heading font-bold leading-[1.06] mb-5 text-[22px] md:text-[32px] md:text-[54px]"
              style={{ color: "var(--sage-dark)", letterSpacing: "-0.02em" }}
            >
              THE ONLY AI TOOL{" "}
              <span
                className="inline-block rounded-lg"
                style={{ background: "var(--sage-dark)", color: "var(--sage)", padding: "4px 16px", marginTop: "4px" }}
              >
                REVIEW
              </span>{" "}
              SITE YOU&apos;LL EVER NEED.
            </div>
            <p className="text-[17px] leading-relaxed mb-8 max-w-[420px]" style={{ color: "var(--sage-mid)" }}>
              Made by people who actually test every tool. Find unbiased, expert-crafted reviews that help you pick the right AI tool.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/tools" className="btn-primary">Explore Tools <span className="text-[13px]">↗</span></Link>
              <Link href="/methodology" className="btn-outline">How We Test <span className="text-[13px]">↗</span></Link>
            </div>
          </div>

          {/* Floating browser mockup - hidden on mobile */}
          <div className="relative z-[1] max-w-[720px] mx-auto mt-10 hidden md:block">
            <div
              className="bg-white rounded-t-[14px] border border-[#e2e0da] border-b-0"
              style={{ padding: "18px 22px 22px", boxShadow: "0 -8px 40px rgba(0,0,0,0.08)" }}
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-[7px] mb-[18px]">
                <div className="w-[11px] h-[11px] rounded-full bg-[#ff5f57]" />
                <div className="w-[11px] h-[11px] rounded-full bg-[#ffbd2e]" />
                <div className="w-[11px] h-[11px] rounded-full bg-[#28c840]" />
                <div className="flex-1 ml-3 rounded-lg py-[7px] px-4 text-xs mono" style={{ background: "#f5f4f0", color: "#999" }}>
                  rawpickai.com/review/cursor
                </div>
              </div>
              {/* Mockup content */}
              <div className="flex gap-5">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-[10px] flex items-center justify-center text-white font-semibold" style={{ background: "linear-gradient(135deg,#0EA5E9,#2DD4BF)" }}>C</div>
                    <div>
                      <div className="text-[17px] font-semibold">Cursor</div>
                      <div className="text-xs text-[#999]">Code assistant · ★ 4.5</div>
                    </div>
                    <div className="ml-auto text-[11px] font-semibold px-3 py-1 rounded-md" style={{ background: "var(--green-soft)", color: "#2E7D32" }}>Editor&apos;s Pick</div>
                  </div>
                  {[
                    { l: "Ease of use", v: 92, c: "#22c55e" },
                    { l: "Output quality", v: 93, c: "#22c55e" },
                    { l: "Value for money", v: 72, c: "#f59e0b" },
                  ].map((s) => (
                    <div key={s.l} className="mb-2.5">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-[#999]">{s.l}</span>
                        <span className="text-xs font-semibold mono">{s.v}</span>
                      </div>
                      <div className="h-[5px] rounded-sm" style={{ background: "#f0efeb" }}>
                        <div className="h-full rounded-sm" style={{ width: `${s.v}%`, background: s.c }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-px" style={{ background: "#eee" }} />
                <div className="w-[190px]">
                  <div className="text-[11px] font-semibold uppercase mb-2.5" style={{ color: "#22c55e", letterSpacing: "0.06em" }}>What we loved</div>
                  {["Best-in-class completions", "Natural language editing", "Full VS Code compat"].map((p) => (
                    <div key={p} className="text-xs mb-1.5" style={{ color: "var(--text-mid)" }}>+ {p}</div>
                  ))}
                  <div className="text-[11px] font-semibold uppercase mt-3.5 mb-2.5" style={{ color: "#ef4444", letterSpacing: "0.06em" }}>Watch out for</div>
                  {["Expensive pro plan", "Occasional latency"].map((c) => (
                    <div key={c} className="text-xs mb-1.5" style={{ color: "var(--text-mid)" }}>− {c}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======= STATS ======= */}
      <section className="max-w-[1140px] mx-auto px-5 md:px-10 py-10 md:py-16">
        <div className="flex flex-wrap justify-center gap-8 md:gap-14 items-center">
          {[
            { num: "47+", label: "tools tested" },
            { num: "10", label: "comparisons" },
            { num: "8", label: "best-of lists" },
            { num: "Weekly", label: "updates" },
          ].map((s, i) => (
            <div key={s.label} className="flex items-center gap-14">
              <div className="text-center">
                <div className="heading text-[28px] md:text-[40px] font-bold" style={{ letterSpacing: "-0.03em" }}>{s.num}</div>
                <div className="text-sm mt-1" style={{ color: "var(--text-light)" }}>{s.label}</div>
              </div>
              {i < 3 && <div className="w-px h-12 hidden md:block" style={{ background: "var(--border)" }} />}
            </div>
          ))}
        </div>
      </section>

      {/* ======= WHY TRUST US ======= */}
      <section className="max-w-[1140px] mx-auto px-5 md:px-10 pb-10 md:pb-[72px]">
        <div className="text-center max-w-[580px] mx-auto mb-12">
          <h2 className="heading text-[26px] md:text-[38px] font-bold mb-3 leading-[1.1]" style={{ letterSpacing: "-0.02em" }}>
            An AI review site that values{" "}
            <span className="rounded-md" style={{ background: "var(--sage)", padding: "2px 10px" }}>honesty</span>{" "}
            and delivers real answers.
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-mid)" }}>
            Every review is hands-on. Every score is earned. No one pays to rank higher.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {[
            { icon: "🧪", title: "Hands-on testing", desc: "We use every tool for 20+ minutes before writing a single word. Real experience, not spec sheets.", bg: "var(--sage-light)" },
            { icon: "⚖", title: "No sponsored rankings", desc: "Scores are based on testing. Affiliate links exist but have zero influence on our ratings.", bg: "var(--warm)" },
            { icon: "💲", title: "USD + INR pricing", desc: "Every tool priced in USD with INR conversions. No more guessing what $20/month means in rupees.", bg: "var(--blue-soft)" },
          ].map((c) => (
            <div key={c.title} className="rounded-[20px] p-8" style={{ background: c.bg }}>
              <div
                className="w-12 h-12 rounded-[14px] flex items-center justify-center text-[22px] mb-[18px]"
                style={{ background: "rgba(255,255,255,0.7)" }}
              >{c.icon}</div>
              <div className="heading text-[18px] font-semibold mb-2">{c.title}</div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ======= TOP RATED ======= */}
      <section className="max-w-[1140px] mx-auto px-5 md:px-10 pb-10 md:pb-[72px]">
        <div className="section-block rounded-[16px] md:rounded-[24px]" style={{ background: "var(--cream)" }}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="heading text-[22px] md:text-[34px] font-bold" style={{ letterSpacing: "-0.02em" }}>Top rated this month</h2>
            <Link href="/tools" className="flex items-center gap-1.5 text-sm font-semibold px-6 py-2.5 rounded-full border-[1.5px] border-[var(--text)]">
              View all 47+ tools <span className="text-xs">↗</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {tools.map((t) => (
              <Link key={t.slug} href={`/review/${t.slug}`}>
                <div className="card-tool">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-[46px] h-[46px] rounded-xl flex items-center justify-center text-white font-semibold text-lg" style={{ background: t.grad }}>{t.letter}</div>
                    <div>
                      <div className="heading text-[17px] font-semibold">{t.name}</div>
                      <div className="text-xs mono" style={{ color: "var(--text-light)" }}>{t.cat}</div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mb-[18px]" style={{ color: "var(--text-mid)" }}>{t.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold" style={{ color: "var(--amber)" }}>★ {t.rating}/5</span>
                    <span className="pill" style={{ background: "var(--green-soft)", color: "#2E7D32" }}>{t.badge}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======= CATEGORIES ======= */}
      <section className="max-w-[1140px] mx-auto px-5 md:px-10 pb-10 md:pb-[72px]">
        <div className="section-block rounded-[16px] md:rounded-[24px]" style={{ background: "var(--warm)" }}>
          <h2 className="heading text-[22px] md:text-[34px] font-bold mb-8" style={{ color: "#5D4037", letterSpacing: "-0.02em" }}>
            Browse by what you need
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {categories.slice(0, 6).map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`}>
                <div className="flex items-center gap-4 rounded-[16px] p-6 cursor-pointer transition-colors" style={{ background: "rgba(255,255,255,0.7)" }}>
                  <div className="w-[50px] h-[50px] rounded-[14px] flex items-center justify-center text-2xl" style={{ background: "rgba(255,255,255,0.8)" }}>{c.icon}</div>
                  <div className="flex-1">
                    <div className="heading text-base font-semibold" style={{ color: "#3E2723" }}>{c.name}</div>
                    <div className="text-[13px] mono" style={{ color: "#8D6E63" }}>{c.count} tools</div>
                  </div>
                  <div className="w-8 h-8 rounded-full border-[1.5px] flex items-center justify-center text-sm" style={{ borderColor: "#C9B99A", color: "#8D6E63" }}>↗</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/categories" className="text-sm font-semibold" style={{ color: "#5D4037" }}>
              View all 12 categories →
            </Link>
          </div>
        </div>
      </section>

      {/* ======= BEST OF ======= */}
      <section className="max-w-[1140px] mx-auto px-5 md:px-10 pb-10 md:pb-[72px]">
        <div className="section-block rounded-[16px] md:rounded-[24px]" style={{ background: "var(--blue-soft)" }}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="heading text-[22px] md:text-[34px] font-bold" style={{ color: "#1A3052", letterSpacing: "-0.02em" }}>Best of lists</h2>
            <Link href="/best" className="text-[13px] font-semibold" style={{ color: "#5B7BA3" }}>View all lists ↗</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {bestOf.map((b, i) => (
              <Link key={b.slug} href={`/best-of/${b.slug}`}>
                <div className="flex items-center gap-3.5 py-3.5 px-[18px] rounded-xl" style={{ background: "rgba(255,255,255,0.7)" }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-semibold" style={{ background: "#D4E2F4", color: "#1A3052" }}>{i + 1}</div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold" style={{ color: "#1A3052" }}>{b.title}</div>
                    <div className="text-[11px] mono" style={{ color: "#5B7BA3" }}>{b.count} tools · Mar 2026</div>
                  </div>
                  <span className="text-[13px]" style={{ color: "#5B7BA3" }}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======= FAQ ======= */}
      <section className="max-w-[1140px] mx-auto px-5 md:px-10 pb-10 md:pb-[72px]">
        <div className="max-w-[760px] mx-auto">
          <h2 className="heading text-[22px] md:text-[34px] font-bold text-center mb-10" style={{ letterSpacing: "-0.02em" }}>
            Frequently asked questions
          </h2>
          {faqs.map((f, i) => (
            <div key={i} className="border-b border-[var(--border)]">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex justify-between items-center bg-transparent border-none cursor-pointer text-left heading"
                style={{ padding: "22px 0", fontSize: "17px", fontWeight: 500, color: "var(--text)" }}
              >
                {f.q}
                <span
                  className="w-8 h-8 rounded-full border-[1.5px] flex items-center justify-center text-lg flex-shrink-0 ml-4 transition-all"
                  style={{
                    borderColor: openFaq === i ? "var(--sage-dark)" : "#C5C3BC",
                    background: openFaq === i ? "var(--sage-dark)" : "transparent",
                    color: openFaq === i ? "var(--sage)" : "var(--text-light)",
                    transform: openFaq === i ? "rotate(45deg)" : "",
                  }}
                >+</span>
              </button>
              <div
                className="overflow-hidden transition-all"
                style={{
                  maxHeight: openFaq === i ? "200px" : "0",
                  opacity: openFaq === i ? 1 : 0,
                  transition: "max-height 0.35s ease, opacity 0.3s",
                }}
              >
                <p className="text-[15px] leading-[1.7] pr-12 pb-[22px]" style={{ color: "var(--text-mid)" }}>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======= NEWSLETTER ======= */}
      <section className="max-w-[1140px] mx-auto px-5 md:px-10 pb-10 md:pb-[72px]">
        <div className="section-block text-center relative overflow-hidden" style={{ background: "var(--sage-light)" }}>
          <h2 className="heading text-[22px] md:text-[32px] font-bold mb-2" style={{ color: "var(--sage-dark)", letterSpacing: "-0.02em" }}>
            Stay ahead of the AI curve
          </h2>
          <p className="text-[15px] mb-6 max-w-[380px] mx-auto" style={{ color: "var(--sage-mid)" }}>
            Weekly picks, honest scores, new launches. Every Tuesday. Free forever.
          </p>
          <NewsletterForm />
          <p className="text-xs mt-3" style={{ color: "var(--text-light)" }}>Join 2,400+ readers · No spam</p>
        </div>
      </section>

      {/* ======= FINAL CTA ======= */}
      <section className="max-w-[1140px] mx-auto px-5 md:px-10 pb-10 md:pb-[72px]">
        <div className="section-block text-center relative overflow-hidden" style={{ background: "var(--sage)" }}>
          <div className="absolute" style={{ top: "-50px", left: "-50px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
          <div className="absolute" style={{ bottom: "-30px", right: "-30px", width: "160px", height: "160px", borderRadius: "50%", background: "rgba(255,255,255,0.12)" }} />
          <div className="relative z-10">
            <h2 className="heading text-[24px] md:text-[36px] font-bold mb-3 leading-[1.15]" style={{ color: "var(--sage-dark)", letterSpacing: "-0.02em" }}>
              The right AI tool for your workflow is just a click away
            </h2>
            <p className="text-base leading-relaxed mb-8 max-w-[420px] mx-auto" style={{ color: "var(--sage-mid)" }}>
              Stop guessing. Every moment with the wrong tool costs you more. Let&apos;s find the right one.
            </p>
            <Link href="/tools" className="btn-primary text-base px-9 py-4">
              Explore All Tools <span className="text-sm">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
