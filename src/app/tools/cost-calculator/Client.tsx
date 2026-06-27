"use client";

import { useState } from "react";
import Link from "next/link";
import GuideContent from "@/components/GuideContent";
import { guideHtml } from "./guide";

const RATE = 93;

type Tool = {
  name: string;
  slug: string;
  category: string;
  usdMonthly: number;
  score: number;
  oneLiner: string;
};

const tools: Tool[] = [
  { name: "Windsurf", slug: "windsurf", category: "Code", usdMonthly: 0, score: 3.8, oneLiner: "Unlimited free AI autocomplete" },
  { name: "Leonardo AI", slug: "leonardo-ai", category: "Images", usdMonthly: 0, score: 4.0, oneLiner: "150 free tokens/day for images" },
  { name: "Perplexity", slug: "perplexity", category: "Research", usdMonthly: 0, score: 4.4, oneLiner: "Free search with citations" },
  { name: "Grammarly", slug: "grammarly", category: "Writing", usdMonthly: 1, score: 4.0, oneLiner: "Grammar + tone correction everywhere" },
  { name: "ElevenLabs Starter", slug: "elevenlabs", category: "Voice", usdMonthly: 5, score: 4.3, oneLiner: "Best AI voice quality" },
  { name: "Ideogram Plus", slug: "ideogram", category: "Images", usdMonthly: 8, score: 3.7, oneLiner: "Best text rendering in images" },
  { name: "GitHub Copilot Pro", slug: "github-copilot", category: "Code", usdMonthly: 10, score: 4.2, oneLiner: "AI coding inside your editor" },
  { name: "Gamma Plus", slug: "gamma", category: "Presentations", usdMonthly: 10, score: 3.9, oneLiner: "AI-generated slide decks" },
  { name: "Notion Plus", slug: "notion-ai", category: "Productivity", usdMonthly: 10, score: 3.8, oneLiner: "AI inside your workspace" },
  { name: "Midjourney Basic", slug: "midjourney", category: "Images", usdMonthly: 10, score: 4.4, oneLiner: "Best image quality available" },
  { name: "Leonardo Apprentice", slug: "leonardo-ai", category: "Images", usdMonthly: 12, score: 4.0, oneLiner: "3x more image tokens" },
  { name: "Runway Standard", slug: "runway", category: "Video", usdMonthly: 15, score: 4.1, oneLiner: "Best AI video generator" },
  { name: "Windsurf Pro", slug: "windsurf", category: "Code", usdMonthly: 15, score: 3.8, oneLiner: "Cascade agent + better completions" },
  { name: "ChatGPT Plus", slug: "chatgpt", category: "Assistant", usdMonthly: 20, score: 4.5, oneLiner: "Most versatile AI assistant" },
  { name: "Claude Pro", slug: "claude", category: "Writing", usdMonthly: 20, score: 4.4, oneLiner: "Best writing quality" },
  { name: "Perplexity Pro", slug: "perplexity", category: "Research", usdMonthly: 20, score: 4.4, oneLiner: "Unlimited Pro searches + models" },
  { name: "Cursor Pro", slug: "cursor", category: "Code", usdMonthly: 20, score: 4.5, oneLiner: "Best AI code editor overall" },
  { name: "Descript Creator", slug: "descript", category: "Video", usdMonthly: 24, score: 4.0, oneLiner: "Edit video by editing text" },
  { name: "Midjourney Standard", slug: "midjourney", category: "Images", usdMonthly: 30, score: 4.4, oneLiner: "Unlimited relax mode images" },
  { name: "Runway Pro", slug: "runway", category: "Video", usdMonthly: 35, score: 4.1, oneLiner: "More credits for video production" },
  { name: "Jasper Creator", slug: "jasper", category: "Marketing", usdMonthly: 49, score: 3.6, oneLiner: "Marketing-focused AI writing" },
  { name: "Semrush Pro", slug: "semrush-ai", category: "SEO", usdMonthly: 117, score: 3.7, oneLiner: "Enterprise SEO intelligence" },
];

export default function CostCalculator() {
  const [budget, setBudget] = useState(20);
  const [currency, setCurrency] = useState<"usd" | "inr">("usd");
  const [catFilter, setCatFilter] = useState("all");

  const budgetUsd = currency === "usd" ? budget : Math.round(budget / RATE);
  const budgetInr = currency === "usd" ? budget * RATE : budget;

  const categories = ["all", ...Array.from(new Set(tools.map((t) => t.category)))];

  const affordable = tools
    .filter((t) => t.usdMonthly <= budgetUsd)
    .filter((t) => catFilter === "all" || t.category === catFilter)
    .sort((a, b) => b.score - a.score);

  return (
    <>
    <div className="max-w-[760px] mx-auto px-5 md:px-10 py-8 md:py-10 pb-16 md:pb-20">
      <div className="text-xs mb-5" style={{ color: "var(--text-light)" }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-1.5">›</span>
        <Link href="/tools" className="hover:underline">Tools</Link>
        <span className="mx-1.5">›</span>
        <span style={{ color: "var(--text-mid)" }}>Cost Calculator</span>
      </div>

      <div className="rounded-[16px] mb-6" style={{ background: "var(--sage-light)", padding: "28px 24px 20px" }}>
        <span className="text-[11px] font-medium px-3.5 py-1 rounded-full" style={{ background: "var(--sage-dark)", color: "var(--sage)" }}>Interactive Tool</span>
        <h1 className="heading font-medium leading-[1.15] mb-0 mt-4 text-[24px] md:text-[32px]" style={{ color: "var(--sage-dark)", letterSpacing: "-0.02em" }}>
          AI Tool Cost Calculator
        </h1>
        <p className="text-[15px] leading-relaxed mt-3 mb-0" style={{ color: "var(--sage-mid)" }}>
          Set your monthly budget and see which AI tools fit. Drag the slider to explore.
        </p>
      </div>

      {/* Budget slider */}
      <div className="rounded-xl p-6 md:p-8 mb-6" style={{ border: "0.5px solid var(--border)" }}>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-sm font-medium">Currency:</span>
          <button onClick={() => setCurrency("usd")} className="text-sm px-3 py-1 rounded-full" style={{ background: currency === "usd" ? "var(--sage-dark)" : "var(--cream)", color: currency === "usd" ? "var(--sage)" : "var(--text-mid)" }}>USD ($)</button>
          <button onClick={() => setCurrency("inr")} className="text-sm px-3 py-1 rounded-full" style={{ background: currency === "inr" ? "var(--sage-dark)" : "var(--cream)", color: currency === "inr" ? "var(--sage)" : "var(--text-mid)" }}>INR (₹)</button>
        </div>

        <div className="mb-2">
          <span className="text-sm" style={{ color: "var(--text-mid)" }}>Monthly budget:</span>
          <span className="heading text-3xl font-medium ml-3" style={{ color: "var(--sage-dark)" }}>
            {currency === "usd" ? `$${budget}` : `₹${budget.toLocaleString()}`}
          </span>
          <span className="text-sm ml-2" style={{ color: "var(--text-light)" }}>
            {currency === "usd" ? `(≈₹${budgetInr.toLocaleString()})` : `(~$${budgetUsd})`}
          </span>
        </div>

        <input
          type="range"
          min={currency === "usd" ? 0 : 0}
          max={currency === "usd" ? 200 : 17000}
          step={currency === "usd" ? 5 : 425}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-[11px] mono mt-1" style={{ color: "var(--text-light)" }}>
          <span>{currency === "usd" ? "$0" : "₹0"}</span>
          <span>{currency === "usd" ? "$200" : "₹17,000"}</span>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCatFilter(cat)}
            className="text-xs font-medium px-3.5 py-1.5 rounded-full"
            style={{ background: catFilter === cat ? "var(--sage-dark)" : "var(--cream)", color: catFilter === cat ? "var(--sage)" : "var(--text-mid)" }}
          >
            {cat === "all" ? "All categories" : cat}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="text-sm mb-4" style={{ color: "var(--text-mid)" }}>
        <strong style={{ color: "var(--text)" }}>{affordable.length}</strong> tools fit your {currency === "usd" ? `$${budget}` : `₹${budget.toLocaleString()}`}/mo budget
      </div>

      <div className="grid gap-2.5">
        {affordable.map((t) => (
          <Link key={`${t.slug}-${t.usdMonthly}`} href={`/review/${t.slug}`}>
            <div className="flex items-center gap-4 p-4 rounded-xl transition-all" style={{ border: "0.5px solid var(--border)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--sage-light)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-medium text-[15px]">{t.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--cream)", color: "var(--text-mid)" }}>{t.category}</span>
                </div>
                <p className="text-[13px] m-0" style={{ color: "var(--text-mid)" }}>{t.oneLiner}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-medium">{t.usdMonthly === 0 ? "Free" : `$${t.usdMonthly}/mo`}</div>
                {t.usdMonthly > 0 && <div className="text-[11px] mono" style={{ color: "var(--text-light)" }}>≈₹{(t.usdMonthly * RATE).toLocaleString()}</div>}
              </div>
              <div className="text-sm font-medium" style={{ color: "#B8860B" }}>★ {t.score}</div>
            </div>
          </Link>
        ))}
        {affordable.length === 0 && (
          <div className="text-center py-8 text-sm" style={{ color: "var(--text-light)" }}>
            No tools match this budget and category. Try increasing the budget or selecting &quot;All categories&quot;.
          </div>
        )}
      </div>
    </div>
    <GuideContent html={guideHtml} />
    </>
  );
}
