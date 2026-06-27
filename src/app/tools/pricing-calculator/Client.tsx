"use client";

import { useState } from "react";
import Link from "next/link";
import GuideContent from "@/components/GuideContent";
import { guideHtml } from "./guide";

const RATE = 93;

const popularPlans = [
  { tool: "ChatGPT Plus", usd: 20, slug: "chatgpt" },
  { tool: "Claude Pro", usd: 20, slug: "claude" },
  { tool: "Cursor Pro", usd: 20, slug: "cursor" },
  { tool: "Perplexity Pro", usd: 20, slug: "perplexity" },
  { tool: "Midjourney Basic", usd: 10, slug: "midjourney" },
  { tool: "Midjourney Standard", usd: 30, slug: "midjourney" },
  { tool: "GitHub Copilot Pro", usd: 10, slug: "github-copilot" },
  { tool: "Jasper Creator", usd: 49, slug: "jasper" },
  { tool: "Runway Standard", usd: 15, slug: "runway" },
  { tool: "ElevenLabs Starter", usd: 5, slug: "elevenlabs" },
  { tool: "ElevenLabs Creator", usd: 22, slug: "elevenlabs" },
  { tool: "Gamma Plus", usd: 10, slug: "gamma" },
  { tool: "Notion Plus", usd: 10, slug: "notion-ai" },
  { tool: "Grammarly Pro", usd: 12, period: "year", slug: "grammarly" },
  { tool: "Semrush Pro", usd: 117, slug: "semrush-ai" },
  { tool: "ChatGPT Pro", usd: 200, slug: "chatgpt" },
];

export default function PricingCalculator() {
  const [usd, setUsd] = useState<string>("20");
  const [inr, setInr] = useState<string>(String(20 * RATE));
  const [direction, setDirection] = useState<"usd" | "inr">("usd");

  const handleUsd = (val: string) => {
    setUsd(val);
    setDirection("usd");
    const num = parseFloat(val);
    if (!isNaN(num)) setInr(String(Math.round(num * RATE)));
    else setInr("");
  };

  const handleInr = (val: string) => {
    setInr(val);
    setDirection("inr");
    const num = parseFloat(val);
    if (!isNaN(num)) setUsd(String(Math.round((num / RATE) * 100) / 100));
    else setUsd("");
  };

  return (
    <>
    <div className="max-w-[760px] mx-auto px-5 md:px-10 py-8 md:py-10 pb-16 md:pb-20">
      <div className="text-xs mb-5" style={{ color: "var(--text-light)" }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-1.5">›</span>
        <Link href="/tools" className="hover:underline">Tools</Link>
        <span className="mx-1.5">›</span>
        <span style={{ color: "var(--text-mid)" }}>Pricing Calculator</span>
      </div>

      <div className="rounded-[16px] mb-6" style={{ background: "var(--sage-light)", padding: "28px 24px 20px" }}>
        <span className="text-[11px] font-medium px-3.5 py-1 rounded-full" style={{ background: "var(--sage-dark)", color: "var(--sage)" }}>Interactive Tool</span>
        <h1 className="heading font-medium leading-[1.15] mb-0 mt-4 text-[24px] md:text-[32px]" style={{ color: "var(--sage-dark)", letterSpacing: "-0.02em" }}>
          AI Tool Pricing Calculator
        </h1>
        <p className="text-[15px] leading-relaxed mt-3 mb-0" style={{ color: "var(--sage-mid)" }}>
          Convert AI tool prices between USD and INR instantly. Rate: $1 = ₹{RATE}.
        </p>
      </div>

      {/* Calculator */}
      <div className="rounded-xl p-6 md:p-8 mb-8" style={{ border: "0.5px solid var(--border)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <label className="block text-sm font-medium mb-2">USD ($)</label>
            <input
              type="number"
              value={usd}
              onChange={(e) => handleUsd(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-2xl font-medium heading"
              style={{ border: "0.5px solid var(--border)", background: direction === "usd" ? "var(--sage-light)" : "var(--bg)" }}
              placeholder="20"
            />
            <div className="text-xs mt-1.5 mono" style={{ color: "var(--text-light)" }}>
              ${usd || "0"}/mo = ${Math.round(parseFloat(usd || "0") * 12)}/yr
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">INR (₹)</label>
            <input
              type="number"
              value={inr}
              onChange={(e) => handleInr(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-2xl font-medium heading"
              style={{ border: "0.5px solid var(--border)", background: direction === "inr" ? "var(--sage-light)" : "var(--bg)" }}
              placeholder="1700"
            />
            <div className="text-xs mt-1.5 mono" style={{ color: "var(--text-light)" }}>
              ₹{inr || "0"}/mo = ₹{Math.round(parseFloat(inr || "0") * 12).toLocaleString()}/yr
            </div>
          </div>
        </div>
      </div>

      {/* Popular plans table */}
      <h2 className="heading text-xl font-medium mb-4">Popular AI tool plans</h2>
      <div className="rounded-xl overflow-hidden" style={{ border: "0.5px solid var(--border)" }}>
        <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--cream)" }}>
              <th className="text-left p-3 font-medium text-[13px]">Tool</th>
              <th className="text-right p-3 font-medium text-[13px]">USD/mo</th>
              <th className="text-right p-3 font-medium text-[13px]">INR/mo</th>
              <th className="text-right p-3 font-medium text-[13px]">INR/yr</th>
            </tr>
          </thead>
          <tbody>
            {popularPlans.map((p, i) => (
              <tr key={i} style={{ borderTop: "0.5px solid var(--border)" }}>
                <td className="p-3">
                  <Link href={`/review/${p.slug}`} className="font-medium hover:underline" style={{ color: "var(--sage-dark)" }}>
                    {p.tool}
                  </Link>
                </td>
                <td className="p-3 text-right mono text-[13px]">${p.usd}{p.period === "year" ? "/yr" : "/mo"}</td>
                <td className="p-3 text-right mono text-[13px]">₹{(p.usd * RATE).toLocaleString()}{p.period === "year" ? "/yr" : "/mo"}</td>
                <td className="p-3 text-right mono text-[13px]">₹{(p.usd * RATE * (p.period === "year" ? 1 : 12)).toLocaleString()}/yr</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs mt-4 mono" style={{ color: "var(--text-light)" }}>
        Exchange rate: $1 = ₹{RATE}. Rates fluctuate — check xe.com for live rates. Last updated: April 2026.
      </p>
    </div>
    <GuideContent html={guideHtml} />
    </>
  );
}
