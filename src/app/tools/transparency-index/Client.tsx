"use client";

import { useState } from "react";
import Link from "next/link";

type Tool = {
  tool: string;
  slug: string;
  category: string;
  transparencyScore: number;
  pricingVisible: boolean;
  hiddenCaps: boolean;
  freeTierHonest: boolean;
  creditCardRequired: boolean;
  pricingUSD: string;
  pricingINR: string;
  overallScore: number;
  grade: "A" | "B" | "C" | "D" | "F";
};

const tools: Tool[] = [
  { tool: "NotebookLM", slug: "google-notebooklm", category: "Research", transparencyScore: 98, pricingVisible: true, hiddenCaps: false, freeTierHonest: true, creditCardRequired: false, pricingUSD: "Free", pricingINR: "₹0", overallScore: 4.6, grade: "A" },
  { tool: "Meta AI", slug: "meta-ai", category: "Assistant", transparencyScore: 96, pricingVisible: true, hiddenCaps: false, freeTierHonest: true, creditCardRequired: false, pricingUSD: "Free ($0.99 Premium)", pricingINR: "₹0 (≈₹92 Premium)", overallScore: 3.0, grade: "A" },
  { tool: "Stable Diffusion", slug: "stable-diffusion", category: "Image Gen", transparencyScore: 95, pricingVisible: true, hiddenCaps: false, freeTierHonest: true, creditCardRequired: false, pricingUSD: "Free (open source)", pricingINR: "₹0 + GPU cost", overallScore: 3.8, grade: "A" },
  { tool: "Perplexity", slug: "perplexity", category: "Research", transparencyScore: 92, pricingVisible: true, hiddenCaps: false, freeTierHonest: true, creditCardRequired: false, pricingUSD: "Free, $20/mo", pricingINR: "₹0, ≈₹1,860/mo", overallScore: 4.4, grade: "A" },
  { tool: "Claude", slug: "claude", category: "Assistant", transparencyScore: 90, pricingVisible: true, hiddenCaps: false, freeTierHonest: true, creditCardRequired: false, pricingUSD: "Free, $20/mo, $100/mo", pricingINR: "₹0, ≈₹1,860, ≈₹9,300", overallScore: 4.4, grade: "A" },
  { tool: "ChatGPT", slug: "chatgpt", category: "Assistant", transparencyScore: 88, pricingVisible: true, hiddenCaps: false, freeTierHonest: true, creditCardRequired: false, pricingUSD: "$0-$200/mo", pricingINR: "₹0-≈₹18,600/mo", overallScore: 4.5, grade: "A" },
  { tool: "Gemini", slug: "google-gemini", category: "Assistant", transparencyScore: 88, pricingVisible: true, hiddenCaps: false, freeTierHonest: true, creditCardRequired: false, pricingUSD: "Free, $20/mo", pricingINR: "₹0, ≈₹1,860/mo", overallScore: 4.5, grade: "A" },
  { tool: "Windsurf", slug: "windsurf", category: "Code", transparencyScore: 87, pricingVisible: true, hiddenCaps: false, freeTierHonest: true, creditCardRequired: false, pricingUSD: "Free, $15/mo", pricingINR: "₹0, ≈₹1,395/mo", overallScore: 3.9, grade: "A" },
  { tool: "Ideogram", slug: "ideogram", category: "Image Gen", transparencyScore: 86, pricingVisible: true, hiddenCaps: false, freeTierHonest: true, creditCardRequired: false, pricingUSD: "Free, $15-20/mo", pricingINR: "₹0, ≈₹1,395-1,860", overallScore: 3.7, grade: "A" },
  { tool: "Leonardo AI", slug: "leonardo-ai", category: "Image Gen", transparencyScore: 85, pricingVisible: true, hiddenCaps: false, freeTierHonest: true, creditCardRequired: false, pricingUSD: "Free, $10-48/mo", pricingINR: "₹0, ≈₹930-4,464", overallScore: 4.0, grade: "A" },
  { tool: "Otter.ai", slug: "otter-ai", category: "Productivity", transparencyScore: 84, pricingVisible: true, hiddenCaps: false, freeTierHonest: true, creditCardRequired: false, pricingUSD: "Free, $8.33/mo", pricingINR: "₹0, ≈₹775/mo", overallScore: 3.9, grade: "A" },
  { tool: "Cursor", slug: "cursor", category: "Code", transparencyScore: 78, pricingVisible: true, hiddenCaps: true, freeTierHonest: false, creditCardRequired: false, pricingUSD: "Free, $20-200/mo", pricingINR: "₹0, ≈₹1,860-18,600", overallScore: 4.5, grade: "B" },
  { tool: "ElevenLabs", slug: "elevenlabs", category: "Voice", transparencyScore: 77, pricingVisible: true, hiddenCaps: true, freeTierHonest: true, creditCardRequired: false, pricingUSD: "$5-330/mo", pricingINR: "≈₹465-30,690/mo", overallScore: 4.3, grade: "B" },
  { tool: "DALL-E 3", slug: "dalle3", category: "Image Gen", transparencyScore: 76, pricingVisible: true, hiddenCaps: true, freeTierHonest: true, creditCardRequired: false, pricingUSD: "Free (via ChatGPT), $20/mo", pricingINR: "₹0, ≈₹1,860/mo", overallScore: 3.8, grade: "B" },
  { tool: "Descript", slug: "descript", category: "Video", transparencyScore: 75, pricingVisible: true, hiddenCaps: true, freeTierHonest: false, creditCardRequired: false, pricingUSD: "$16-50/mo", pricingINR: "≈₹1,488-4,650/mo", overallScore: 4.0, grade: "B" },
  { tool: "Gamma AI", slug: "gamma", category: "Presentation", transparencyScore: 74, pricingVisible: true, hiddenCaps: true, freeTierHonest: false, creditCardRequired: false, pricingUSD: "$10-20/mo", pricingINR: "≈₹930-1,860/mo", overallScore: 3.9, grade: "B" },
  { tool: "Pika", slug: "pika", category: "Video", transparencyScore: 73, pricingVisible: true, hiddenCaps: true, freeTierHonest: true, creditCardRequired: false, pricingUSD: "$10-95/mo", pricingINR: "≈₹930-8,835/mo", overallScore: 3.7, grade: "B" },
  { tool: "Runway", slug: "runway", category: "Video", transparencyScore: 70, pricingVisible: true, hiddenCaps: true, freeTierHonest: false, creditCardRequired: false, pricingUSD: "$15-95/mo", pricingINR: "≈₹1,395-8,835/mo", overallScore: 4.1, grade: "B" },
  { tool: "Adobe Firefly", slug: "adobe-firefly", category: "Image Gen", transparencyScore: 68, pricingVisible: true, hiddenCaps: true, freeTierHonest: false, creditCardRequired: false, pricingUSD: "Free, $9.99-29.99/mo", pricingINR: "₹0, ≈₹929-2,789", overallScore: 3.5, grade: "B" },
  { tool: "Mistral Le Chat", slug: "mistral-le-chat", category: "Assistant", transparencyScore: 72, pricingVisible: true, hiddenCaps: false, freeTierHonest: true, creditCardRequired: false, pricingUSD: "Free, $14.99/mo", pricingINR: "₹0, ≈₹1,394/mo", overallScore: 3.3, grade: "B" },
  { tool: "Microsoft Copilot", slug: "microsoft-copilot", category: "Assistant", transparencyScore: 65, pricingVisible: false, hiddenCaps: true, freeTierHonest: true, creditCardRequired: false, pricingUSD: "$20/mo", pricingINR: "≈₹1,860/mo", overallScore: 3.5, grade: "C" },
  { tool: "Amazon Q Developer", slug: "amazon-codewhisperer", category: "Code", transparencyScore: 64, pricingVisible: false, hiddenCaps: true, freeTierHonest: true, creditCardRequired: false, pricingUSD: "Free, $19/mo", pricingINR: "₹0, ≈₹1,767/mo", overallScore: 3.3, grade: "C" },
  { tool: "GitHub Copilot", slug: "github-copilot", category: "Code", transparencyScore: 62, pricingVisible: false, hiddenCaps: true, freeTierHonest: true, creditCardRequired: false, pricingUSD: "$0-39/user/mo", pricingINR: "₹0-≈₹3,627/mo", overallScore: 3.8, grade: "C" },
  { tool: "Grammarly", slug: "grammarly", category: "Writing", transparencyScore: 62, pricingVisible: true, hiddenCaps: true, freeTierHonest: false, creditCardRequired: false, pricingUSD: "$12/yr or $30/mo", pricingINR: "≈₹1,116/yr or ≈₹2,790/mo", overallScore: 3.8, grade: "C" },
  { tool: "HeyGen", slug: "heygen", category: "Video", transparencyScore: 60, pricingVisible: false, hiddenCaps: true, freeTierHonest: false, creditCardRequired: false, pricingUSD: "$29-149/mo", pricingINR: "≈₹2,697-13,857/mo", overallScore: 3.6, grade: "C" },
  { tool: "You.com", slug: "youcom", category: "Research", transparencyScore: 60, pricingVisible: true, hiddenCaps: true, freeTierHonest: false, creditCardRequired: false, pricingUSD: "Free, $15/mo", pricingINR: "₹0, ≈₹1,395/mo", overallScore: 3.3, grade: "C" },
  { tool: "Coda AI", slug: "coda-ai", category: "Productivity", transparencyScore: 58, pricingVisible: false, hiddenCaps: true, freeTierHonest: true, creditCardRequired: false, pricingUSD: "$10/mo", pricingINR: "≈₹930/mo", overallScore: 3.6, grade: "C" },
  { tool: "Claude Code", slug: "claude-code", category: "Code", transparencyScore: 55, pricingVisible: false, hiddenCaps: true, freeTierHonest: false, creditCardRequired: true, pricingUSD: "Usage-based", pricingINR: "Usage-based", overallScore: 4.3, grade: "C" },
  { tool: "Notion AI", slug: "notion-ai", category: "Productivity", transparencyScore: 55, pricingVisible: false, hiddenCaps: true, freeTierHonest: false, creditCardRequired: false, pricingUSD: "$10/mo add-on", pricingINR: "≈₹930/mo add-on", overallScore: 3.8, grade: "C" },
  { tool: "Figma AI", slug: "figma-ai", category: "Design", transparencyScore: 52, pricingVisible: false, hiddenCaps: true, freeTierHonest: false, creditCardRequired: false, pricingUSD: "$0-45/editor/mo", pricingINR: "₹0-≈₹4,185/mo", overallScore: 3.6, grade: "C" },
  { tool: "Writesonic", slug: "writesonic", category: "Writing", transparencyScore: 48, pricingVisible: false, hiddenCaps: true, freeTierHonest: false, creditCardRequired: true, pricingUSD: "$39/mo", pricingINR: "≈₹3,627/mo", overallScore: 3.4, grade: "D" },
  { tool: "Copy.ai", slug: "copyai", category: "Writing", transparencyScore: 45, pricingVisible: false, hiddenCaps: true, freeTierHonest: false, creditCardRequired: false, pricingUSD: "$49-249/mo", pricingINR: "≈₹4,557-23,157/mo", overallScore: 3.5, grade: "D" },
  { tool: "Murf AI", slug: "murf-ai", category: "Voice", transparencyScore: 45, pricingVisible: false, hiddenCaps: true, freeTierHonest: false, creditCardRequired: false, pricingUSD: "$19/mo", pricingINR: "≈₹1,767/mo", overallScore: 3.4, grade: "D" },
  { tool: "Luma Dream Machine", slug: "luma-dream-machine", category: "Video", transparencyScore: 42, pricingVisible: false, hiddenCaps: true, freeTierHonest: false, creditCardRequired: false, pricingUSD: "$29.99/mo", pricingINR: "≈₹2,789/mo", overallScore: 3.4, grade: "D" },
  { tool: "Looka", slug: "looka", category: "Design", transparencyScore: 40, pricingVisible: false, hiddenCaps: true, freeTierHonest: false, creditCardRequired: false, pricingUSD: "$20-96", pricingINR: "≈₹1,860-8,928", overallScore: 3.4, grade: "D" },
  { tool: "Rytr", slug: "rytr", category: "Writing", transparencyScore: 38, pricingVisible: true, hiddenCaps: true, freeTierHonest: false, creditCardRequired: true, pricingUSD: "$9-29/mo", pricingINR: "≈₹837-2,697/mo", overallScore: 2.9, grade: "D" },
  { tool: "Surfer SEO", slug: "surfer-seo", category: "SEO", transparencyScore: 35, pricingVisible: false, hiddenCaps: true, freeTierHonest: false, creditCardRequired: true, pricingUSD: "$79/mo", pricingINR: "≈₹7,347/mo", overallScore: 3.9, grade: "D" },
  { tool: "Semrush", slug: "semrush", category: "SEO", transparencyScore: 32, pricingVisible: false, hiddenCaps: true, freeTierHonest: false, creditCardRequired: true, pricingUSD: "$117-416+/mo", pricingINR: "≈₹10,881-38,688+", overallScore: 3.7, grade: "D" },
  { tool: "Jasper", slug: "jasper", category: "Writing", transparencyScore: 30, pricingVisible: false, hiddenCaps: true, freeTierHonest: false, creditCardRequired: true, pricingUSD: "$49-69/mo", pricingINR: "≈₹4,557-6,417/mo", overallScore: 3.6, grade: "F" },
  { tool: "Beautiful.ai", slug: "beautiful-ai", category: "Presentation", transparencyScore: 25, pricingVisible: false, hiddenCaps: true, freeTierHonest: false, creditCardRequired: true, pricingUSD: "$12-15/mo", pricingINR: "≈₹1,116-1,395/mo", overallScore: 3.5, grade: "F" },
  { tool: "Tabnine", slug: "tabnine", category: "Code", transparencyScore: 22, pricingVisible: false, hiddenCaps: true, freeTierHonest: false, creditCardRequired: true, pricingUSD: "$9-39/mo", pricingINR: "≈₹837-3,627/mo", overallScore: 3.2, grade: "F" },
  { tool: "MS PowerPoint + Copilot", slug: "powerpoint-copilot", category: "Presentation", transparencyScore: 20, pricingVisible: false, hiddenCaps: true, freeTierHonest: false, creditCardRequired: true, pricingUSD: "$52/user/mo", pricingINR: "≈₹4,836/mo", overallScore: 3.3, grade: "F" },
];

type SortKey = "tool" | "transparencyScore" | "overallScore" | "grade";

export default function TransparencyIndex() {
  const [sortBy, setSortBy] = useState<SortKey>("transparencyScore");
  const [filter, setFilter] = useState<string>("all");

  const gradeColor: Record<string, string> = { A: "#22c55e", B: "#6B7C5E", C: "#f59e0b", D: "#e97316", F: "#ef4444" };
  const categories = ["all", ...Array.from(new Set(tools.map((t) => t.category))).sort()];

  const filtered = tools
    .filter((t) => filter === "all" || t.category === filter)
    .sort((a, b) => {
      if (sortBy === "tool") return a.tool.localeCompare(b.tool);
      if (sortBy === "grade") return a.transparencyScore - b.transparencyScore;
      if (sortBy === "overallScore") return b.overallScore - a.overallScore;
      return b.transparencyScore - a.transparencyScore;
    });

  const avgScore = Math.round(tools.reduce((s, t) => s + t.transparencyScore, 0) / tools.length);
  const aCount = tools.filter((t) => t.grade === "A").length;
  const fCount = tools.filter((t) => t.grade === "F" || t.grade === "D").length;

  return (
    <>
    <div className="max-w-[960px] mx-auto px-5 md:px-10 py-8 md:py-10 pb-16 md:pb-20">
      <div className="text-xs mb-5" style={{ color: "var(--text-light)" }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-1.5">›</span>
        <Link href="/tools" className="hover:underline">Tools</Link>
        <span className="mx-1.5">›</span>
        <span style={{ color: "var(--text-mid)" }}>Transparency Index</span>
      </div>

      <div className="rounded-[16px] mb-6" style={{ background: "var(--sage-light)", padding: "28px 24px 20px" }}>
        <span className="text-[11px] font-medium px-3.5 py-1 rounded-full" style={{ background: "var(--sage-dark)", color: "var(--sage)" }}>Interactive Tool</span>
        <h1 className="heading font-medium leading-[1.15] mb-0 mt-4 text-[24px] md:text-[32px]" style={{ color: "var(--sage-dark)", letterSpacing: "-0.02em" }}>
          AI Tool Pricing Transparency Index
        </h1>
        <p className="text-[15px] leading-relaxed mt-3 mb-0" style={{ color: "var(--sage-mid)" }}>
          We rated {tools.length} AI tools on pricing clarity, hidden usage caps, free tier honesty, and whether they require a credit card to try. 79% hide enterprise pricing. See every score below.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="rounded-xl p-4 text-center" style={{ background: "white", border: "1px solid var(--border)" }}>
          <div className="text-2xl font-bold" style={{ color: "var(--sage-dark)" }}>{avgScore}</div>
          <div className="text-xs mt-1" style={{ color: "var(--text-light)" }}>Avg transparency score</div>
        </div>
        <div className="rounded-xl p-4 text-center" style={{ background: "white", border: "1px solid var(--border)" }}>
          <div className="text-2xl font-bold" style={{ color: "#22c55e" }}>{aCount}</div>
          <div className="text-xs mt-1" style={{ color: "var(--text-light)" }}>Grade A (80+)</div>
        </div>
        <div className="rounded-xl p-4 text-center" style={{ background: "white", border: "1px solid var(--border)" }}>
          <div className="text-2xl font-bold" style={{ color: "#ef4444" }}>{fCount}</div>
          <div className="text-xs mt-1" style={{ color: "var(--text-light)" }}>Grade D or F</div>
        </div>
        <div className="rounded-xl p-4 text-center" style={{ background: "white", border: "1px solid var(--border)" }}>
          <div className="text-2xl font-bold" style={{ color: "#f59e0b" }}>79%</div>
          <div className="text-xs mt-1" style={{ color: "var(--text-light)" }}>Hide enterprise pricing</div>
        </div>
      </div>

      {/* Methodology */}
      <div className="rounded-xl p-5 mb-6" style={{ background: "white", border: "1px solid var(--border)" }}>
        <h2 className="text-[15px] font-semibold mb-2" style={{ color: "var(--sage-dark)" }}>How we scored transparency</h2>
        <p className="text-[14px] leading-relaxed mb-3" style={{ color: "var(--text-mid)" }}>
          Each tool is scored 0-100 across four dimensions. Higher scores mean the tool is more upfront about what you pay and what you get.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[13px]">
          <div className="p-3 rounded-lg" style={{ background: "var(--sage-light)" }}>
            <div className="font-semibold mb-1" style={{ color: "var(--sage-dark)" }}>Pricing visible (40%)</div>
            <div style={{ color: "var(--text-light)" }}>Are all tiers shown publicly? No "Contact sales" gating.</div>
          </div>
          <div className="p-3 rounded-lg" style={{ background: "var(--sage-light)" }}>
            <div className="font-semibold mb-1" style={{ color: "var(--sage-dark)" }}>No hidden caps (25%)</div>
            <div style={{ color: "var(--text-light)" }}>Usage limits clearly stated on the pricing page, not buried in docs.</div>
          </div>
          <div className="p-3 rounded-lg" style={{ background: "var(--sage-light)" }}>
            <div className="font-semibold mb-1" style={{ color: "var(--sage-dark)" }}>Free tier honest (20%)</div>
            <div style={{ color: "var(--text-light)" }}>Is the free tier a real product or a 7-day trial disguised as free?</div>
          </div>
          <div className="p-3 rounded-lg" style={{ background: "var(--sage-light)" }}>
            <div className="font-semibold mb-1" style={{ color: "var(--sage-dark)" }}>No CC required (15%)</div>
            <div style={{ color: "var(--text-light)" }}>Can you try the tool without entering payment info?</div>
          </div>
        </div>
        <p className="text-[13px] mt-3 mb-0" style={{ color: "var(--text-light)" }}>
          Grades: A (80-100), B (65-79), C (50-64), D (30-49), F (below 30). Data from our <Link href="/studies/2026-ai-tools-reality-check" className="underline hover:no-underline" style={{ color: "var(--sage-dark)" }}>2026 AI Tools Reality Check</Link> study.
          All prices shown at ≈₹93/USD.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className="text-[13px] px-3 py-1.5 rounded-full transition-colors"
            style={{
              background: filter === c ? "var(--sage-dark)" : "white",
              color: filter === c ? "white" : "var(--text-mid)",
              border: `1px solid ${filter === c ? "var(--sage-dark)" : "var(--border)"}`,
            }}
          >
            {c === "all" ? "All categories" : c}
          </button>
        ))}
      </div>

      {/* Sort controls */}
      <div className="flex gap-2 mb-4 text-[12px]" style={{ color: "var(--text-light)" }}>
        <span className="py-1">Sort by:</span>
        {(["transparencyScore", "overallScore", "tool"] as SortKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setSortBy(key)}
            className="px-2.5 py-1 rounded-md"
            style={{
              background: sortBy === key ? "var(--sage-dark)" : "transparent",
              color: sortBy === key ? "white" : "var(--text-mid)",
            }}
          >
            {key === "transparencyScore" ? "Transparency" : key === "overallScore" ? "Overall score" : "Name"}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--border)" }}>
        <table className="w-full text-[13px]" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--sage-dark)" }}>
              <th className="text-left px-3 py-2.5 text-[12px] font-semibold" style={{ color: "white" }}>Tool</th>
              <th className="text-center px-3 py-2.5 text-[12px] font-semibold" style={{ color: "white" }}>Grade</th>
              <th className="text-center px-3 py-2.5 text-[12px] font-semibold hidden md:table-cell" style={{ color: "white" }}>Score</th>
              <th className="text-center px-3 py-2.5 text-[12px] font-semibold hidden md:table-cell" style={{ color: "white" }}>Pricing visible</th>
              <th className="text-center px-3 py-2.5 text-[12px] font-semibold hidden md:table-cell" style={{ color: "white" }}>Hidden caps</th>
              <th className="text-center px-3 py-2.5 text-[12px] font-semibold hidden md:table-cell" style={{ color: "white" }}>Free tier honest</th>
              <th className="text-center px-3 py-2.5 text-[12px] font-semibold hidden md:table-cell" style={{ color: "white" }}>CC required</th>
              <th className="text-left px-3 py-2.5 text-[12px] font-semibold" style={{ color: "white" }}>Price (USD / INR)</th>
              <th className="text-center px-3 py-2.5 text-[12px] font-semibold" style={{ color: "white" }}>Rating</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t, i) => (
              <tr key={t.slug} style={{ background: i % 2 === 0 ? "white" : "var(--sage-light)" }}>
                <td className="px-3 py-2.5">
                  <Link href={`/review/${t.slug}`} className="font-medium hover:underline" style={{ color: "var(--sage-dark)" }}>
                    {t.tool}
                  </Link>
                  <span className="text-[11px] ml-1.5 hidden md:inline" style={{ color: "var(--text-light)" }}>{t.category}</span>
                  <div className="md:hidden text-[11px]" style={{ color: "var(--text-light)" }}>{t.category} · {t.transparencyScore}/100</div>
                </td>
                <td className="text-center px-3 py-2.5">
                  <span className="inline-block w-7 h-7 rounded-full text-[13px] font-bold leading-7 text-center" style={{ background: `${gradeColor[t.grade]}15`, color: gradeColor[t.grade] }}>
                    {t.grade}
                  </span>
                </td>
                <td className="text-center px-3 py-2.5 font-semibold hidden md:table-cell" style={{ color: "var(--text-mid)" }}>{t.transparencyScore}</td>
                <td className="text-center px-3 py-2.5 hidden md:table-cell">{t.pricingVisible ? "✓" : "✗"}</td>
                <td className="text-center px-3 py-2.5 hidden md:table-cell" style={{ color: t.hiddenCaps ? "#ef4444" : "#22c55e" }}>{t.hiddenCaps ? "Yes" : "No"}</td>
                <td className="text-center px-3 py-2.5 hidden md:table-cell">{t.freeTierHonest ? "✓" : "✗"}</td>
                <td className="text-center px-3 py-2.5 hidden md:table-cell" style={{ color: t.creditCardRequired ? "#ef4444" : "#22c55e" }}>{t.creditCardRequired ? "Yes" : "No"}</td>
                <td className="px-3 py-2.5 text-[12px]" style={{ color: "var(--text-mid)" }}>
                  <div>{t.pricingUSD}</div>
                  <div style={{ color: "var(--text-light)" }}>{t.pricingINR}</div>
                </td>
                <td className="text-center px-3 py-2.5 font-bold" style={{ color: "var(--sage-dark)" }}>{t.overallScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[12px] mt-4 mb-6" style={{ color: "var(--text-light)" }}>
        Showing {filtered.length} of {tools.length} tools. Last updated May 19, 2026. Prices at ≈₹93/USD.
      </p>

      {/* Key findings */}
      <div className="rounded-xl p-5 mb-6" style={{ background: "white", border: "1px solid var(--border)" }}>
        <h2 className="text-[15px] font-semibold mb-3" style={{ color: "var(--sage-dark)" }}>Key findings</h2>
        <div className="text-[14px] leading-relaxed space-y-2" style={{ color: "var(--text-mid)" }}>
          <p><strong style={{ color: "var(--sage-dark)" }}>The most transparent tools are also the highest rated.</strong> The top 5 transparency scorers (NotebookLM, Meta AI, Stable Diffusion, Perplexity, Claude) average 4.0/5 overall. The bottom 5 average 3.4/5. Transparency and quality correlate.</p>
          <p><strong style={{ color: "var(--sage-dark)" }}>Writing tools are the least transparent category.</strong> Jasper, Copy.ai, Writesonic, and Rytr all score below 50. These tools raised hundreds of millions in funding but won't clearly tell you what you get for your money.</p>
          <p><strong style={{ color: "var(--sage-dark)" }}>Free tools requiring no credit card dominate the top.</strong> NotebookLM, Perplexity, Claude, ChatGPT, and Gemini all let you use the product without payment info. The tools that gate access behind credit cards tend to have weaker products.</p>
          <p><strong style={{ color: "var(--sage-dark)" }}>Enterprise pricing is the biggest transparency gap.</strong> 79% of tools hide enterprise pricing behind "Contact sales" pages. This makes budget planning impossible for teams evaluating multiple tools.</p>
        </div>
      </div>

      {/* Related */}
      <div className="rounded-xl p-5" style={{ background: "var(--sage-light)" }}>
        <h2 className="text-[15px] font-semibold mb-3" style={{ color: "var(--sage-dark)" }}>Related</h2>
        <div className="space-y-2 text-[14px]">
          <div><Link href="/studies/2026-ai-tools-reality-check" className="underline hover:no-underline" style={{ color: "var(--sage-dark)" }}>The 2026 AI Tools Reality Check: 48 Tools Tested</Link> <span style={{ color: "var(--text-light)" }}>Full study with methodology and downloadable CSV</span></div>
          <div><Link href="/tools/free-tier-comparison" className="underline hover:no-underline" style={{ color: "var(--sage-dark)" }}>Free Tier Comparison</Link> <span style={{ color: "var(--text-light)" }}>Every free plan ranked and rated</span></div>
          <div><Link href="/tools/pricing-calculator" className="underline hover:no-underline" style={{ color: "var(--sage-dark)" }}>AI Tool Pricing Calculator</Link> <span style={{ color: "var(--text-light)" }}>Estimate your monthly cost in USD and INR</span></div>
          <div><Link href="/tools/compare" className="underline hover:no-underline" style={{ color: "var(--sage-dark)" }}>Compare AI Tools</Link> <span style={{ color: "var(--text-light)" }}>Side-by-side comparison of any 2-3 tools</span></div>
        </div>
      </div>
    </div>
    </>
  );
}
