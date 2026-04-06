"use client";

import Link from "next/link";
import { useState } from "react";

type Deal = {
  tool: string;
  type: "discount" | "free" | "student" | "annual";
  title: string;
  desc: string;
  saving: string;
  code?: string;
  link: string;
  reviewLink: string;
  expires?: string;
  verified: string;
};

const deals: Deal[] = [
  { tool: "GitHub Copilot", type: "student", title: "Free for Students", desc: "Copilot Pro completely free through GitHub Education. Verify with .edu email or university ID.", saving: "₹930/mo saved", link: "https://education.github.com", reviewLink: "/review/github-copilot", verified: "April 2026" },
  { tool: "Notion", type: "student", title: "Free Personal Pro for Students", desc: "Full Personal Pro plan with AI features free for students with .edu email.", saving: "₹930/mo saved", link: "https://notion.so/students", reviewLink: "/review/notion-ai", verified: "April 2026" },
  { tool: "Canva", type: "student", title: "Canva for Education — Free", desc: "Canva Pro free for teachers and students. Includes all AI features and premium templates.", saving: "₹1,116/mo saved", link: "https://canva.com/education", reviewLink: "/review/canva-ai", verified: "April 2026" },
  { tool: "Windsurf", type: "free", title: "Unlimited Free Autocomplete", desc: "No credit card, no limit, no trial. Unlimited AI autocomplete forever. Best free coding AI.", saving: "₹0 forever", link: "https://codeium.com", reviewLink: "/review/windsurf", verified: "April 2026" },
  { tool: "Google NotebookLM", type: "free", title: "Completely Free — No Limits", desc: "Full features, no trial, no credit card. Upload PDFs, get AI study guides and Audio Overviews.", saving: "₹0 forever", link: "https://notebooklm.google.com", reviewLink: "/review/google-notebooklm", verified: "April 2026" },
  { tool: "Leonardo AI", type: "free", title: "150 Free Image Tokens Daily", desc: "~10-15 free images every day. Resets daily. No credit card required.", saving: "₹0 forever", link: "https://leonardo.ai", reviewLink: "/review/leonardo-ai", verified: "April 2026" },
  { tool: "Gamma", type: "annual", title: "Save 37% with Annual Plan", desc: "Plus plan drops from $15/mo to $10/mo when billed annually. Best value AI presentation tool.", saving: "Save ₹465/mo", link: "https://gamma.app", reviewLink: "/review/gamma", verified: "April 2026" },
  { tool: "Midjourney", type: "annual", title: "Save 20% with Annual Plan", desc: "Basic drops from $10/mo to $8/mo billed annually. Still no free tier.", saving: "Save ₹186/mo", link: "https://midjourney.com", reviewLink: "/review/midjourney", verified: "April 2026" },
  { tool: "Gemini Advanced", type: "annual", title: "Includes 2TB Google Drive", desc: "₹1,860/mo includes Gemini AI + 2TB Drive storage (normally ₹650/mo separately). Best bundle value.", saving: "₹650/mo in storage value", link: "https://gemini.google.com", reviewLink: "/review/google-gemini", verified: "April 2026" },
  { tool: "Grammarly", type: "annual", title: "Save 33% with Annual Plan", desc: "Pro drops from $12/mo to $8/mo billed annually. Cheapest premium writing AI.", saving: "Save ₹372/mo", link: "https://grammarly.com", reviewLink: "/review/grammarly", verified: "April 2026" },
  { tool: "ElevenLabs", type: "annual", title: "Save 17% on Starter Plan", desc: "Starter drops from $5/mo to $4.17/mo billed annually.", saving: "Save ₹77/mo", link: "https://elevenlabs.io", reviewLink: "/review/elevenlabs", verified: "April 2026" },
  { tool: "Cursor", type: "annual", title: "Save 20% with Annual Plan", desc: "Pro drops from $20/mo to $16/mo billed annually.", saving: "Save ₹372/mo", link: "https://cursor.com", reviewLink: "/review/cursor", verified: "April 2026" },
];

const typeLabels: Record<string, { label: string; bg: string; text: string }> = {
  student: { label: "Student Offer", bg: "#EEF2FF", text: "#6366F1" },
  free: { label: "Free Forever", bg: "#ECFDF5", text: "#059669" },
  annual: { label: "Annual Savings", bg: "#FEF9C3", text: "#A16207" },
  discount: { label: "Discount", bg: "#FFF7ED", text: "#C2410C" },
};

export default function DealsPage() {
  const [filter, setFilter] = useState<string>("all");
  const filtered = filter === "all" ? deals : deals.filter((d) => d.type === filter);

  return (
    <div className="max-w-[900px] mx-auto px-5 md:px-10 py-8 pb-20">
      <div className="text-xs mb-6" style={{ color: "var(--text-light)" }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-1.5">›</span>
        <span style={{ color: "var(--text-mid)" }}>Deals</span>
      </div>

      <div className="mb-6">
        <h1 className="heading text-2xl md:text-4xl font-bold mb-2" style={{ letterSpacing: "-0.03em" }}>AI Tool Deals & Discounts</h1>
        <p className="text-base" style={{ color: "var(--text-mid)" }}>
          Every verified discount, student offer, and free tier worth knowing about. Updated weekly.
        </p>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {[{ key: "all", label: "All Deals" }, { key: "free", label: "Free Forever" }, { key: "student", label: "Student" }, { key: "annual", label: "Annual Savings" }].map((f) => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className="pill text-xs cursor-pointer transition-all"
            style={{ background: filter === f.key ? "var(--sage-dark)" : "var(--bg-elevated)", color: filter === f.key ? "#fff" : "var(--text-mid)", border: "0.5px solid var(--border)" }}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid gap-3">
        {filtered.map((deal, i) => {
          const t = typeLabels[deal.type];
          return (
            <div key={i} className="card !py-4 !px-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="heading text-[15px] font-semibold">{deal.tool}</span>
                    <span className="pill text-[10px]" style={{ background: t.bg, color: t.text }}>{t.label}</span>
                  </div>
                  <p className="text-sm font-medium mb-0.5" style={{ color: "var(--text)" }}>{deal.title}</p>
                  <p className="text-[13px] m-0 mb-1.5" style={{ color: "var(--text-mid)" }}>{deal.desc}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold" style={{ color: "#059669" }}>{deal.saving}</span>
                    <Link href={deal.reviewLink} className="text-[11px] hover:underline" style={{ color: "var(--sage-dark)" }}>Read review →</Link>
                    <span className="text-[10px] mono" style={{ color: "var(--text-light)" }}>Verified {deal.verified}</span>
                  </div>
                </div>
                <a href={deal.link} target="_blank" rel="noopener noreferrer" className="pill text-xs font-semibold flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity" style={{ background: "var(--sage-dark)", color: "#fff" }}>
                  Get Deal →
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 card !py-5 !px-6" style={{ background: "var(--sage-light)" }}>
        <h2 className="heading text-base font-semibold mb-1">Know a deal we missed?</h2>
        <p className="text-[13px] m-0" style={{ color: "var(--text-mid)" }}>
          Email us at hello@rawpickai.com. We verify every deal before adding it.
        </p>
      </div>
    </div>
  );
}
