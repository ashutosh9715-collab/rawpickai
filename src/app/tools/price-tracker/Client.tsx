"use client";

import Link from "next/link";
import { useState } from "react";
import GuideContent from "@/components/GuideContent";
import { guideHtml } from "./guide";

type ToolPrice = {
  tool: string;
  category: string;
  free: string;
  priceUSD: number;
  priceINR: number;
  annual: string;
  change: "up" | "down" | "same";
  changeNote: string;
  lastChecked: string;
  link: string;
};

const RATE = 93;

const prices: ToolPrice[] = [
  { tool: "ChatGPT Plus", category: "AI Assistant", free: "GPT-5.4 (limited)", priceUSD: 20, priceINR: 20 * RATE, annual: "No discount", change: "same", changeNote: "Unchanged since launch", lastChecked: "Apr 2026", link: "/review/chatgpt" },
  { tool: "Claude Pro", category: "AI Assistant", free: "Sonnet 4.6 (generous)", priceUSD: 20, priceINR: 20 * RATE, annual: "No discount", change: "same", changeNote: "Unchanged since launch", lastChecked: "Apr 2026", link: "/review/claude" },
  { tool: "Gemini Advanced", category: "AI Assistant", free: "Gemini Pro (generous)", priceUSD: 20, priceINR: 20 * RATE, annual: "≈₹17,670/yr", change: "same", changeNote: "Includes 2TB Drive", lastChecked: "Apr 2026", link: "/review/google-gemini" },
  { tool: "Perplexity Pro", category: "Research", free: "5 Pro/day (unlimited search)", priceUSD: 20, priceINR: 20 * RATE, annual: "≈₹1,488/mo", change: "same", changeNote: "Annual discount available", lastChecked: "Apr 2026", link: "/review/perplexity" },
  { tool: "Cursor Pro", category: "Code Editor", free: "2,000 completions", priceUSD: 20, priceINR: 20 * RATE, annual: "≈₹1,488/mo", change: "same", changeNote: "Cursor 3 launched, same price", lastChecked: "Apr 2026", link: "/review/cursor" },
  { tool: "GitHub Copilot Pro", category: "Code Assistant", free: "2,000 completions/mo", priceUSD: 10, priceINR: 10 * RATE, annual: "Same", change: "same", changeNote: "Free for students", lastChecked: "Apr 2026", link: "/review/github-copilot" },
  { tool: "Windsurf Pro", category: "Code Editor", free: "Unlimited autocomplete", priceUSD: 15, priceINR: 15 * RATE, annual: "≈₹930/mo", change: "same", changeNote: "Best free tier in coding", lastChecked: "Apr 2026", link: "/review/windsurf" },
  { tool: "Midjourney Basic", category: "Image Gen", free: "None", priceUSD: 10, priceINR: 10 * RATE, annual: "≈₹744/mo", change: "same", changeNote: "Still no free tier", lastChecked: "Apr 2026", link: "/review/midjourney" },
  { tool: "Leonardo AI Apprentice", category: "Image Gen", free: "150 tokens/day", priceUSD: 12, priceINR: 12 * RATE, annual: "≈₹930/mo", change: "same", changeNote: "Best free image generator", lastChecked: "Apr 2026", link: "/review/leonardo-ai" },
  { tool: "ElevenLabs Starter", category: "Voice AI", free: "10,000 chars", priceUSD: 5, priceINR: 5 * RATE, annual: "≈₹388/mo", change: "same", changeNote: "Cheapest premium voice AI", lastChecked: "Apr 2026", link: "/review/elevenlabs" },
  { tool: "Runway Standard", category: "Video Gen", free: "125 credits", priceUSD: 15, priceINR: 15 * RATE, annual: "≈₹1,116/mo", change: "same", changeNote: "Gen-4 Turbo included", lastChecked: "Apr 2026", link: "/review/runway" },
  { tool: "Pika Standard", category: "Video Gen", free: "Daily credits", priceUSD: 10, priceINR: 10 * RATE, annual: "≈₹744/mo", change: "same", changeNote: "Budget alternative to Runway", lastChecked: "Apr 2026", link: "/review/pika" },
  { tool: "Gamma Plus", category: "Presentations", free: "10 AI credits", priceUSD: 10, priceINR: 10 * RATE, annual: "≈₹744/mo", change: "same", changeNote: "Best AI presentation tool", lastChecked: "Apr 2026", link: "/review/gamma" },
  { tool: "Grammarly Pro", category: "Writing", free: "Basic grammar", priceUSD: 12, priceINR: 12 * RATE, annual: "≈₹744/mo", change: "same", changeNote: "33% off annual", lastChecked: "Apr 2026", link: "/review/grammarly" },
  { tool: "Notion AI", category: "Productivity", free: "Limited AI", priceUSD: 10, priceINR: 10 * RATE, annual: "≈₹744/mo", change: "same", changeNote: "Free for students (.edu)", lastChecked: "Apr 2026", link: "/review/notion-ai" },
  { tool: "Canva Pro", category: "Design", free: "Limited AI (5/mo)", priceUSD: 13, priceINR: 13 * RATE, annual: "≈₹930/mo", change: "same", changeNote: "Free for education", lastChecked: "Apr 2026", link: "/review/canva-ai" },
  { tool: "Jasper Creator", category: "Marketing", free: "7-day trial only", priceUSD: 49, priceINR: 49 * RATE, annual: "≈₹3,720/mo", change: "same", changeNote: "Most expensive writing AI", lastChecked: "Apr 2026", link: "/review/jasper" },
  { tool: "Kling AI Standard", category: "Video Gen", free: "66 credits/mo", priceUSD: 5.99, priceINR: Math.round(5.99 * RATE), annual: "≈₹465/mo", change: "same", changeNote: "Cheapest paid video AI", lastChecked: "Apr 2026", link: "/review/kling-ai" },
];

const changeIcons: Record<string, { icon: string; color: string }> = {
  up: { icon: "↑", color: "#EF4444" },
  down: { icon: "↓", color: "#22C55E" },
  same: { icon: "—", color: "var(--text-light)" },
};

export default function PriceTracker() {
  const [sortBy, setSortBy] = useState<"price" | "name">("price");
  const sorted = [...prices].sort((a, b) => sortBy === "price" ? a.priceINR - b.priceINR : a.tool.localeCompare(b.tool));

  return (
    <>
    <div className="max-w-[960px] mx-auto px-5 md:px-10 py-8 pb-20">
      <div className="text-xs mb-6" style={{ color: "var(--text-light)" }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-1.5">›</span>
        <Link href="/tools" className="hover:underline">Tools</Link>
        <span className="mx-1.5">›</span>
        <span style={{ color: "var(--text-mid)" }}>Price Tracker</span>
      </div>

      <h1 className="heading text-2xl md:text-3xl font-bold mb-2" style={{ letterSpacing: "-0.03em" }}>AI Tool Price Tracker (INR)</h1>
      <p className="text-sm mb-1" style={{ color: "var(--text-mid)" }}>Current pricing for 18 AI tools. Updated weekly. Rate: ₹{RATE}/USD.</p>
      <p className="text-xs mb-6 mono" style={{ color: "var(--text-light)" }}>Last updated: April 2026</p>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setSortBy("price")} className="pill text-xs cursor-pointer" style={{ background: sortBy === "price" ? "var(--sage-dark)" : "var(--bg-elevated)", color: sortBy === "price" ? "#fff" : "var(--text-mid)", border: "0.5px solid var(--border)" }}>Sort by Price</button>
        <button onClick={() => setSortBy("name")} className="pill text-xs cursor-pointer" style={{ background: sortBy === "name" ? "var(--sage-dark)" : "var(--bg-elevated)", color: sortBy === "name" ? "#fff" : "var(--text-mid)", border: "0.5px solid var(--border)" }}>Sort A-Z</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th className="text-left py-2.5 px-2 text-xs font-semibold" style={{ color: "var(--text-light)" }}>Tool</th>
              <th className="text-left py-2.5 px-2 text-xs font-semibold hidden sm:table-cell" style={{ color: "var(--text-light)" }}>Free Tier</th>
              <th className="text-right py-2.5 px-2 text-xs font-semibold" style={{ color: "var(--text-light)" }}>USD/mo</th>
              <th className="text-right py-2.5 px-2 text-xs font-semibold" style={{ color: "var(--text-light)" }}>INR/mo</th>
              <th className="text-center py-2.5 px-2 text-xs font-semibold" style={{ color: "var(--text-light)" }}>Change</th>
              <th className="text-left py-2.5 px-2 text-xs font-semibold hidden md:table-cell" style={{ color: "var(--text-light)" }}>Note</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((t, i) => {
              const ch = changeIcons[t.change];
              return (
                <tr key={i} style={{ borderBottom: "0.5px solid var(--border)" }}>
                  <td className="py-2.5 px-2">
                    <Link href={t.link} className="text-sm font-medium hover:underline" style={{ color: "var(--text)" }}>{t.tool}</Link>
                    <div className="text-[10px] mono" style={{ color: "var(--text-light)" }}>{t.category}</div>
                  </td>
                  <td className="py-2.5 px-2 text-xs hidden sm:table-cell" style={{ color: "var(--text-mid)" }}>{t.free}</td>
                  <td className="py-2.5 px-2 text-sm text-right mono">${t.priceUSD}</td>
                  <td className="py-2.5 px-2 text-sm text-right mono font-semibold">₹{t.priceINR.toLocaleString("en-IN")}</td>
                  <td className="py-2.5 px-2 text-center">
                    <span style={{ color: ch.color, fontSize: "14px" }}>{ch.icon}</span>
                  </td>
                  <td className="py-2.5 px-2 text-xs hidden md:table-cell" style={{ color: "var(--text-mid)" }}>{t.changeNote}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-xs" style={{ color: "var(--text-light)" }}>
        <p className="m-0">Prices are for the first paid plan of each tool. ↑ = price increased, ↓ = price decreased, — = no change. INR converted at ₹{RATE}/USD.</p>
      </div>
    </div>
    <GuideContent html={guideHtml} />
    </>
  );
}
