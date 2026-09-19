import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research & Studies",
  description:
    "Original research and data studies on the AI tools market from RawPickAI. Pricing, quality scores, and market patterns based on hands-on testing.",
  alternates: { canonical: "https://rawpickai.com/studies" },
};

const studies = [
  {
    slug: "2026-ai-tools-reality-check",
    badge: "Q1 2026",
    title: "The 2026 AI Tools Reality Check",
    subtitle:
      "48 AI tools tested January-April 2026. Pricing, quality scores, and the patterns few people are writing about.",
    stats: [
      "48 tools analyzed",
      "15 categories",
      "Downloadable CSV dataset",
    ],
    date: "April 18, 2026",
  },
];

export default function StudiesIndex() {
  return (
    <div className="directory-page">
      <div className="directory-kicker">Original RawPickAI research</div>
      <section className="directory-hero">
        <div><h1 className="directory-title">Numbers behind the claims.</h1><p className="directory-intro">Original studies of AI pricing, quality, and the gap between vendor marketing and working software.</p></div>
        <aside className="directory-note"><strong>Open research</strong>Methods are explained, source data is downloadable, and the work can be reused with attribution.</aside>
      </section>
      <div className="directory-section-head"><h2>Published studies</h2><span>Data - method - findings</span></div>
      <div className="editorial-list">
        {studies.map((s) => (
          <Link
            key={s.slug}
            href={`/studies/${s.slug}`}
            className="editorial-row"
          >
            <span className="editorial-number">{s.badge}</span><h3>{s.title}</h3><p>{s.subtitle.replace("&apos;", "'")}</p><span className="evidence-stamp">{s.stats[0]}</span>
          </Link>
        ))}
      </div>

      <div
        className="mt-10 pt-6 border-t text-sm"
        style={{ borderColor: "var(--border)", color: "var(--text-light)" }}
      >
        RawPickAI studies are published under CC BY 4.0. Use freely with
        attribution to{" "}
        <Link
          href="/"
          style={{ color: "var(--sage-dark)", textDecoration: "underline" }}
        >
          rawpickai.com
        </Link>
        .
      </div>
    </div>
  );
}
