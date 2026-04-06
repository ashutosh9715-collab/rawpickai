"use client";

import { useState } from "react";
import Link from "next/link";

type FreeTier = {
  tool: string;
  slug: string;
  category: string;
  freeOffer: string;
  limits: string;
  score: number;
  verdict: "Excellent" | "Good" | "Limited" | "None";
};

const tiers: FreeTier[] = [
  { tool: "Leonardo AI", slug: "leonardo-ai", category: "Image Gen", freeOffer: "150 tokens/day (~10-15 images)", limits: "Daily reset, no banking", score: 5.0, verdict: "Excellent" },
  { tool: "Perplexity", slug: "perplexity", category: "Research", freeOffer: "Unlimited search + 5 Pro/day", limits: "Pro search limited to 5/day", score: 4.4, verdict: "Excellent" },
  { tool: "Windsurf", slug: "windsurf", category: "Code", freeOffer: "Unlimited autocomplete", limits: "No agent mode", score: 4.5, verdict: "Excellent" },
  { tool: "Grammarly", slug: "grammarly", category: "Writing", freeOffer: "Grammar + spelling + tone", limits: "No generative AI features", score: 4.3, verdict: "Excellent" },
  { tool: "Canva", slug: "canva-ai", category: "Design", freeOffer: "Design tools + limited AI", limits: "5 AI uses/month, watermarks", score: 4.2, verdict: "Excellent" },
  { tool: "Ideogram", slug: "ideogram", category: "Image Gen", freeOffer: "10 images/day", limits: "Resolution limits", score: 4.5, verdict: "Excellent" },
  { tool: "Otter.ai", slug: "otter-ai", category: "Productivity", freeOffer: "300 min/month transcription", limits: "30 min/conversation max", score: 4.5, verdict: "Excellent" },
  { tool: "Claude", slug: "claude", category: "Assistant", freeOffer: "Claude Sonnet 4.6", limits: "Rate limits on heavy use", score: 3.8, verdict: "Good" },
  { tool: "ChatGPT", slug: "chatgpt", category: "Assistant", freeOffer: "GPT-5.4 (limited) + DALL-E", limits: "Tight hourly rate limits", score: 3.6, verdict: "Good" },
  { tool: "Google Gemini", slug: "google-gemini", category: "Assistant", freeOffer: "Gemini Pro, generous limits", limits: "No workspace integration", score: 4.2, verdict: "Good" },
  { tool: "HeyGen", slug: "heygen", category: "Video", freeOffer: "3 videos, 1 min each", limits: "Very limited for real use", score: 3.8, verdict: "Good" },
  { tool: "Gamma", slug: "gamma", category: "Presentation", freeOffer: "10 AI credits", limits: "Watermark on exports", score: 3.0, verdict: "Good" },
  { tool: "DALL-E 3", slug: "dalle3", category: "Image Gen", freeOffer: "Via ChatGPT Free", limits: "Tight rate limits", score: 4.0, verdict: "Good" },
  { tool: "Notion AI", slug: "notion-ai", category: "Productivity", freeOffer: "Limited AI features", limits: "Very restrictive limits", score: 3.1, verdict: "Limited" },
  { tool: "Writesonic", slug: "writesonic", category: "Writing", freeOffer: "10-day trial", limits: "Not a real free tier", score: 3.5, verdict: "Limited" },
  { tool: "Descript", slug: "descript", category: "Video", freeOffer: "1 project, 10 min transcription", limits: "Extremely limited", score: 3.5, verdict: "Limited" },
  { tool: "Runway ML", slug: "runway", category: "Video", freeOffer: "125 credits", limits: "Barely enough for 2-3 clips", score: 3.0, verdict: "Limited" },
  { tool: "Cursor", slug: "cursor", category: "Code", freeOffer: "2,000 completions", limits: "Runs out in days", score: 3.4, verdict: "Limited" },
  { tool: "Figma AI", slug: "figma-ai", category: "Design", freeOffer: "Limited AI, 3 projects", limits: "Intentionally constrained", score: 3.5, verdict: "Limited" },
  { tool: "You.com", slug: "youcom", category: "Research", freeOffer: "Basic search + 1 model", limits: "Very basic", score: 3.8, verdict: "Limited" },
  { tool: "Midjourney", slug: "midjourney", category: "Image Gen", freeOffer: "None", limits: "Must pay to generate", score: 0, verdict: "None" },
  { tool: "Jasper", slug: "jasper", category: "Writing", freeOffer: "7-day trial only", limits: "Not a free tier", score: 3.0, verdict: "None" },
  { tool: "Beautiful.ai", slug: "beautiful-ai", category: "Presentation", freeOffer: "None (discontinued)", limits: "Must pay", score: 1.0, verdict: "None" },
  { tool: "Tabnine", slug: "tabnine", category: "Code", freeOffer: "None (discontinued)", limits: "Must pay", score: 1.0, verdict: "None" },
];

type SortKey = "tool" | "score" | "verdict";

export default function FreeTierComparison() {
  const [sortBy, setSortBy] = useState<SortKey>("score");
  const [filter, setFilter] = useState<string>("all");

  const verdictOrder = { Excellent: 4, Good: 3, Limited: 2, None: 1 };
  const verdictColor = { Excellent: "#22c55e", Good: "#22c55e", Limited: "#f59e0b", None: "#ef4444" };

  const categories = ["all", ...Array.from(new Set(tiers.map((t) => t.category)))];

  const filtered = tiers
    .filter((t) => filter === "all" || t.category === filter)
    .sort((a, b) => {
      if (sortBy === "tool") return a.tool.localeCompare(b.tool);
      if (sortBy === "verdict") return verdictOrder[b.verdict] - verdictOrder[a.verdict];
      return b.score - a.score;
    });

  return (
    <div className="max-w-[900px] mx-auto px-5 md:px-10 py-8 md:py-10 pb-16 md:pb-20">
      <div className="text-xs mb-5" style={{ color: "var(--text-light)" }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-1.5">›</span>
        <Link href="/tools" className="hover:underline">Tools</Link>
        <span className="mx-1.5">›</span>
        <span style={{ color: "var(--text-mid)" }}>Free Tier Comparison</span>
      </div>

      <div className="rounded-[16px] mb-6" style={{ background: "var(--sage-light)", padding: "28px 24px 20px" }}>
        <span className="text-[11px] font-medium px-3.5 py-1 rounded-full" style={{ background: "var(--sage-dark)", color: "var(--sage)" }}>Interactive Tool</span>
        <h1 className="heading font-medium leading-[1.15] mb-0 mt-4 text-[24px] md:text-[32px]" style={{ color: "var(--sage-dark)", letterSpacing: "-0.02em" }}>
          AI Tool Free Tier Comparison
        </h1>
        <p className="text-[15px] leading-relaxed mt-3 mb-0" style={{ color: "var(--sage-mid)" }}>
          Every free tier ranked honestly. Filter by category, sort by quality. {tiers.length} tools compared.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="text-xs font-medium px-3.5 py-1.5 rounded-full transition-all"
            style={{
              background: filter === cat ? "var(--sage-dark)" : "var(--cream)",
              color: filter === cat ? "var(--sage)" : "var(--text-mid)",
              border: "0.5px solid transparent",
            }}
          >
            {cat === "all" ? "All" : cat}
          </button>
        ))}
      </div>

      {/* Sort controls */}
      <div className="flex gap-4 mb-4 text-xs" style={{ color: "var(--text-light)" }}>
        <span>Sort by:</span>
        {(["score", "verdict", "tool"] as SortKey[]).map((key) => (
          <button key={key} onClick={() => setSortBy(key)} className="font-medium" style={{ color: sortBy === key ? "var(--sage-dark)" : "var(--text-light)", textDecoration: sortBy === key ? "underline" : "none" }}>
            {key === "score" ? "Score" : key === "verdict" ? "Rating" : "Name"}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-x-auto" style={{ border: "0.5px solid var(--border)" }}>
        <table className="w-full text-sm" style={{ borderCollapse: "collapse", minWidth: "600px" }}>
          <thead>
            <tr style={{ background: "var(--cream)" }}>
              <th className="text-left p-3 font-medium text-[13px]">Tool</th>
              <th className="text-left p-3 font-medium text-[13px]">Category</th>
              <th className="text-left p-3 font-medium text-[13px]">Free offer</th>
              <th className="text-left p-3 font-medium text-[13px]">Limits</th>
              <th className="text-center p-3 font-medium text-[13px]">Verdict</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.slug} style={{ borderTop: "0.5px solid var(--border)" }}>
                <td className="p-3">
                  <Link href={`/review/${t.slug}`} className="font-medium hover:underline" style={{ color: "var(--sage-dark)" }}>
                    {t.tool}
                  </Link>
                </td>
                <td className="p-3 text-[13px]" style={{ color: "var(--text-mid)" }}>{t.category}</td>
                <td className="p-3 text-[13px]">{t.freeOffer}</td>
                <td className="p-3 text-[13px]" style={{ color: "var(--text-mid)" }}>{t.limits}</td>
                <td className="p-3 text-center">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: `${verdictColor[t.verdict]}15`, color: verdictColor[t.verdict] }}>
                    {t.verdict}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
