"use client";

import { useState } from "react";
import Link from "next/link";

const tools = [
  { slug: "deevid-ai", name: "DeeVid AI", cat: "AI Video", rating: 3.6, badge: "Audited", letter: "D", grad: "linear-gradient(135deg,#2563EB,#06B6D4)", desc: "Six original screenshots, four generation tests, tracked credit usage, and tested outputs." },
  { slug: "gumloop", name: "Gumloop", cat: "AI Automation", rating: 4.1, badge: "Audited", letter: "G", grad: "linear-gradient(135deg,#111827,#4B5563)", desc: "Nine original product screenshots documenting workflows, model selection, credits, and pricing." },
  { slug: "zapier", name: "Zapier", cat: "Automation", rating: 4.0, badge: "Audited", letter: "Z", grad: "linear-gradient(135deg,#FF4F00,#FF8A00)", desc: "Six original screenshots from hands-on Copilot, Agents, MCP, and Zap-editor testing." },
];

const faqs = [
  { q: "What is RawPickAI?", a: "RawPickAI is an independent AI tool review site focused on practical software decisions, transparent scoring, and pricing in USD and INR. We do not sell rankings." },
  { q: "How do you test and score tools?", a: "Our review standard records the tested plan, product version, tasks, outputs, and limitations. We score ease of use, output quality, value, feature depth, and the free tier when the evidence supports a score." },
  { q: "Do you accept payment for higher rankings?", a: "Never. Our scores are based entirely on testing. Some links are affiliate links (we disclose this), but affiliates have zero influence on our scores or rankings." },
  { q: "How often do you update reviews?", a: "Reviews are updated after a material product change and a new verification pass. A displayed update date should reflect a substantive editorial review, not an automatic freshness change." },
  { q: "Why do you show pricing in both USD and INR?", a: "We show USD pricing first (the global standard) with INR conversions alongside. Most review sites ignore Indian pricing entirely. We include both so you know exactly what you're paying, wherever you are." },
];

// Structured FAQ data mirrors the visible questions and answers below.
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
      {/* Structured data must remain identical to the visible FAQ content. */}
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
            {/* SEO FIX: Visible H1 with brand name + primary keyword for branded search ranking */}
            <div className="text-[13px] md:text-[14px] font-semibold tracking-wider mb-3" style={{ color: "var(--sage-dark)", opacity: 0.7 }}>
              RAWPICKAI
            </div>
            <h1
              className="heading font-bold leading-[1.06] mb-5 text-[22px] md:text-[32px] lg:text-[54px]"
              style={{ color: "var(--sage-dark)", letterSpacing: "-0.02em" }}
            >
              Independent AI Tool{" "}
              <span
                className="inline-block rounded-lg"
                style={{ background: "var(--sage-dark)", color: "var(--sage)", padding: "4px 16px", marginTop: "4px" }}
              >
                Reviews
              </span>{" "}
              &amp; Comparisons
            </h1>
            <p className="text-[17px] leading-relaxed mb-8 max-w-[440px]" style={{ color: "var(--sage-mid)" }}>
              RawPickAI publishes independent AI tool reviews, practical comparisons, and transparent pricing in USD and INR. Rankings are never sold.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/tools" className="btn-primary">Explore Tools <span className="text-[13px]">↗</span></Link>
              <Link href="/tools/quiz" className="btn-primary" style={{ background: "var(--sage-dark)" }}>Find Your AI Tool <span className="text-[13px]">→</span></Link>
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
                  rawpickai.com/review/deevid-ai
                </div>
              </div>
              {/* Mockup content */}
              <div className="flex gap-5">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-[10px] flex items-center justify-center text-white font-semibold" style={{ background: "linear-gradient(135deg,#2563EB,#06B6D4)" }}>D</div>
                    <div>
                      <div className="text-[17px] font-semibold">DeeVid AI</div>
                      <div className="text-xs text-[#999]">AI video · ★ 3.6</div>
                    </div>
                    <div className="ml-auto text-[11px] font-semibold px-3 py-1 rounded-md" style={{ background: "var(--green-soft)", color: "#2E7D32" }}>Review</div>
                  </div>
                  {[
                    { l: "Ease of use", v: 80, c: "#22c55e" },
                    { l: "Output quality", v: 72, c: "#f59e0b" },
                    { l: "Value for money", v: 58, c: "#ef4444" },
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
                  <div className="text-[11px] font-semibold uppercase mb-2.5" style={{ color: "#22c55e", letterSpacing: "0.06em" }}>Review covers</div>
                  {["Four generation tests", "Model comparisons", "Credit tracking"].map((p) => (
                    <div key={p} className="text-xs mb-1.5" style={{ color: "var(--text-mid)" }}>+ {p}</div>
                  ))}
                  <div className="text-[11px] font-semibold uppercase mt-3.5 mb-2.5" style={{ color: "#ef4444", letterSpacing: "0.06em" }}>Watch out for</div>
                  {["Credits drain quickly", "Lite limited to 720P"].map((c) => (
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
            { num: "3", label: "audited reviews" },
            { num: "5", label: "active comparisons" },
            { num: "8", label: "interactive tools" },
            { num: "1", label: "original study" },
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
        <div className="text-center max-w-[680px] mx-auto mb-12">
          <h2 className="heading text-[26px] md:text-[38px] font-bold mb-3 leading-[1.1]" style={{ letterSpacing: "-0.02em" }}>
            What makes RawPickAI different?{" "}
            <span className="rounded-md" style={{ background: "var(--sage)", padding: "2px 10px" }}>Honesty.</span>
          </h2>
          <p className="text-base leading-relaxed mb-3" style={{ color: "var(--text-mid)" }}>
            RawPickAI is an independent review site - ad-free, with no sponsored rankings and no affiliate influence on scores. Our standard is direct product use and documented testing, not rewritten press releases.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-mid)" }}>
            Our scoring framework covers ease of use, output quality, value for money, feature depth, and free tier. Each retained review should explain the evidence and limitations behind its score.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {[
            { icon: "🧪", title: "Documented testing", desc: "Retained reviews document the tested version, plan, tasks, outputs, and limitations.", bg: "var(--sage-light)" },
            { icon: "⚖", title: "No sponsored rankings", desc: "Scores are based on testing. Affiliate links exist but have zero influence on our ratings.", bg: "var(--warm)" },
            { icon: "💲", title: "USD + INR pricing", desc: "Prices are shown in USD with INR conversions and verification dates where available.", bg: "var(--blue-soft)" },
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

      {/* ======= FEATURED REVIEWS ======= */}
      <section className="max-w-[1140px] mx-auto px-5 md:px-10 pb-10 md:pb-[72px]">
        <div className="section-block rounded-[16px] md:rounded-[24px]" style={{ background: "var(--cream)" }}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="heading text-[22px] md:text-[34px] font-bold" style={{ letterSpacing: "-0.02em" }}>Featured reviews</h2>
            <Link href="/tools" className="flex items-center gap-1.5 text-sm font-semibold px-6 py-2.5 rounded-full border-[1.5px] border-[var(--text)]">
              View all reviews <span className="text-xs">↗</span>
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

      {/* ======= RECENTLY PUBLISHED ======= */}
      <section className="max-w-[1140px] mx-auto px-5 md:px-10 pb-10 md:pb-[72px]">
        <div className="section-block" style={{ background: "var(--sage-light)" }}>
          <div className="text-center mb-8">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-wider mb-2 px-3 py-1 rounded-full" style={{ background: "var(--sage)", color: "var(--sage-dark)" }}>Evidence-led content</span>
            <h2 className="heading text-[22px] md:text-[32px] font-bold mb-2" style={{ color: "var(--sage-dark)", letterSpacing: "-0.02em" }}>
              Reviews, research, and useful tools
            </h2>
            <p className="text-[15px] max-w-[480px] mx-auto" style={{ color: "var(--sage-mid)" }}>
              Start with a documented review, our original dataset, or a practical pricing tool.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/review/deevid-ai" className="block bg-white rounded-[12px] p-5 hover:shadow-sm transition-shadow" style={{ border: "0.5px solid var(--border)" }}>
              <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--sage-mid)" }}>Hands-on review</div>
              <div className="heading text-[16px] font-semibold mb-2 leading-snug" style={{ color: "var(--text-dark)" }}>DeeVid AI Review: Tested Outputs and Verdict</div>
              <div className="text-[13px] leading-relaxed" style={{ color: "var(--text-mid)" }}>A documented review with its testing setup, generated outputs, pricing, limitations, and verdict.</div>
            </Link>
            <Link href="/studies/2026-ai-tools-reality-check" className="block bg-white rounded-[12px] p-5 hover:shadow-sm transition-shadow" style={{ border: "0.5px solid var(--border)" }}>
              <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--sage-mid)" }}>Study · May 19</div>
              <div className="heading text-[16px] font-semibold mb-2 leading-snug" style={{ color: "var(--text-dark)" }}>The 2026 AI Tools Reality Check</div>
              <div className="text-[13px] leading-relaxed" style={{ color: "var(--text-mid)" }}>Original dataset and analysis covering AI tool pricing transparency and value.</div>
            </Link>
            <Link href="/tools/transparency-index" className="block bg-white rounded-[12px] p-5 hover:shadow-sm transition-shadow" style={{ border: "0.5px solid var(--border)" }}>
              <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--sage-mid)" }}>Tool · May 19</div>
              <div className="heading text-[16px] font-semibold mb-2 leading-snug" style={{ color: "var(--text-dark)" }}>AI Tool Pricing Transparency Index</div>
              <div className="text-[13px] leading-relaxed" style={{ color: "var(--text-mid)" }}>Sortable pricing-transparency data with source and methodology context.</div>
            </Link>
          </div>
          <div className="text-center mt-6">
            <Link href="/tools" className="inline-block text-[13px] font-semibold" style={{ color: "var(--sage-dark)", textDecoration: "underline" }}>
              Browse retained reviews →
            </Link>
          </div>
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
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/tools" className="btn-primary text-base px-9 py-4">
                Explore All Tools <span className="text-sm">↗</span>
              </Link>
              <Link href="/tools/quiz" className="text-base px-9 py-4 rounded-full font-semibold inline-flex items-center gap-2" style={{ background: "rgba(255,255,255,0.8)", color: "var(--sage-dark)" }}>
                Take the Quiz <span className="text-sm">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
