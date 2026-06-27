import { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

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
      "48 AI tools tested January–April 2026. Pricing, quality scores, and the patterns nobody&apos;s writing about.",
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
    <div className="max-w-[860px] mx-auto px-5 md:px-10 py-10 pb-20">
      <PageHero
        title="Research & Studies"
        description="Original data studies of the AI tools market — pricing patterns, quality distributions, and the gap between vendor marketing and working software."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Studies" }]}
        pills={[{ label: "Research", variant: "dark" }]}
        author="Ash"
      />

      <div className="grid grid-cols-1 gap-5">
        {studies.map((s) => (
          <Link
            key={s.slug}
            href={`/studies/${s.slug}`}
            className="block rounded-[14px] p-6 md:p-8 hover:shadow-sm transition-shadow"
            style={{
              background: "var(--sage-light)",
              border: "1px solid var(--sage)",
            }}
          >
            <div
              className="text-[11px] font-semibold uppercase tracking-wider mb-2"
              style={{ color: "var(--sage-dark)" }}
            >
              Study · {s.badge}
            </div>
            <h2
              className="heading text-[22px] md:text-[26px] font-bold mb-2 leading-tight"
              style={{ color: "var(--sage-dark)" }}
            >
              {s.title}
            </h2>
            <p
              className="text-[15px] mb-4 leading-relaxed"
              style={{ color: "var(--text-mid)" }}
            >
              {s.subtitle.replace("&apos;", "'")}
            </p>
            <div
              className="flex flex-wrap gap-4 text-[12px]"
              style={{ color: "var(--sage-mid)" }}
            >
              {s.stats.map((stat) => (
                <span key={stat} className="flex items-center gap-1.5">
                  <span
                    className="inline-block w-1 h-1 rounded-full"
                    style={{ background: "var(--sage-mid)" }}
                  />
                  {stat}
                </span>
              ))}
              <span
                className="flex items-center gap-1.5"
                style={{ color: "var(--text-light)" }}
              >
                · Published {s.date}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div
        className="mt-10 pt-6 border-t text-sm italic"
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
