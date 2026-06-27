"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type SearchItem = { title: string; href: string; type: string; description?: string };

const allItems: SearchItem[] = [
  // Reviews
  { title: "Cursor Review", href: "/review/cursor", type: "Review" },
  { title: "Claude Review", href: "/review/claude", type: "Review" },
  { title: "ChatGPT Review", href: "/review/chatgpt", type: "Review" },
  { title: "Google Gemini Review", href: "/review/google-gemini", type: "Review" },
  { title: "Perplexity Review", href: "/review/perplexity", type: "Review" },
  { title: "Midjourney Review", href: "/review/midjourney", type: "Review" },
  { title: "Windsurf Review", href: "/review/windsurf", type: "Review" },
  { title: "GitHub Copilot Review", href: "/review/github-copilot", type: "Review" },
  { title: "Claude Code Review", href: "/review/claude-code", type: "Review" },
  { title: "Notion AI Review", href: "/review/notion-ai", type: "Review" },
  { title: "Grammarly Review", href: "/review/grammarly", type: "Review" },
  { title: "Jasper Review", href: "/review/jasper", type: "Review" },
  { title: "Gamma Review", href: "/review/gamma", type: "Review" },
  { title: "Canva AI Review", href: "/review/canva-ai", type: "Review" },
  { title: "Leonardo AI Review", href: "/review/leonardo-ai", type: "Review" },
  { title: "Ideogram Review", href: "/review/ideogram", type: "Review" },
  { title: "ElevenLabs Review", href: "/review/elevenlabs", type: "Review" },
  { title: "Runway Review", href: "/review/runway", type: "Review" },
  { title: "Pika Review", href: "/review/pika", type: "Review" },
  { title: "Kling AI Review", href: "/review/kling-ai", type: "Review" },
  { title: "Google NotebookLM Review", href: "/review/google-notebooklm", type: "Review" },
  // Comparisons
  { title: "Cursor vs Windsurf", href: "/comparison/windsurf-vs-cursor", type: "Comparison" },
  { title: "Claude vs ChatGPT", href: "/comparison/claude-vs-chatgpt", type: "Comparison" },
  { title: "Claude vs ChatGPT vs Gemini", href: "/comparison/claude-vs-chatgpt-vs-gemini", type: "Comparison" },
  { title: "Gemini vs ChatGPT", href: "/comparison/gemini-vs-chatgpt", type: "Comparison" },
  { title: "Claude vs Perplexity", href: "/comparison/claude-vs-perplexity", type: "Comparison" },
  { title: "Cursor vs GitHub Copilot", href: "/comparison/cursor-vs-github-copilot", type: "Comparison" },
  { title: "Perplexity vs ChatGPT", href: "/comparison/perplexity-vs-chatgpt", type: "Comparison" },
  { title: "Midjourney vs DALL-E 3", href: "/comparison/midjourney-vs-dalle3", type: "Comparison" },
  { title: "Runway vs Pika", href: "/comparison/runway-vs-pika", type: "Comparison" },
  { title: "ElevenLabs vs Murf AI", href: "/comparison/elevenlabs-vs-murf-ai", type: "Comparison" },
  // Best Of
  { title: "Best AI Coding Tools", href: "/best-of/best-ai-code-assistants", type: "Best Of" },
  { title: "Best AI Writing Tools", href: "/best-of/best-ai-writing-tools", type: "Best Of" },
  { title: "Best Free AI Tools", href: "/best-of/best-free-ai-tools", type: "Best Of" },
  { title: "Best ChatGPT Alternatives", href: "/best-of/best-chatgpt-alternatives", type: "Best Of" },
  { title: "Best AI Tools for Students", href: "/best-of/best-ai-tools-for-students", type: "Best Of" },
  { title: "Best AI Image Generators", href: "/best-of/best-ai-image-generators", type: "Best Of" },
  { title: "Best AI Video Generators", href: "/best-of/best-ai-video-generators", type: "Best Of" },
  { title: "Best AI Tools for PPT", href: "/best-of/best-ai-tools-for-ppt", type: "Best Of" },
  // Blog
  { title: "Cursor 3 Review", href: "/blog/cursor-3-review", type: "Blog" },
  { title: "Composer 2 Review", href: "/blog/composer-2-review", type: "Blog" },
  { title: "Claude Code vs Cursor 3", href: "/blog/claude-code-vs-cursor-3", type: "Blog" },
  { title: "Composer 2 vs Claude Sonnet 4.6", href: "/blog/composer-2-vs-claude-sonnet", type: "Blog" },
  { title: "Sora vs Runway vs Pika", href: "/blog/sora-vs-runway-vs-pika", type: "Blog" },
  { title: "Gemma 4 Review", href: "/blog/gemma-4-review", type: "Blog" },
  { title: "Microsoft MAI Models Review", href: "/blog/microsoft-mai-models-review", type: "Blog" },
  { title: "Best AI Coding Tools 2026", href: "/blog/best-ai-coding-tools-2026", type: "Blog" },
  // Tools
  { title: "AI Tool Finder", href: "/tools/ai-tool-finder", type: "Tool" },
  { title: "AI Price Tracker", href: "/tools/price-tracker", type: "Tool" },
  { title: "AI Savings Calculator", href: "/tools/savings-calculator", type: "Tool" },
  { title: "AI Tool Quiz", href: "/tools/quiz", type: "Tool" },
  { title: "Free Tier Comparison", href: "/tools/free-tier-comparison", type: "Tool" },
  { title: "AI Tool Deals", href: "/deals", type: "Tool" },
];

const typeColors: Record<string, string> = {
  Review: "#993C1D",
  Comparison: "#534AB7",
  "Best Of": "#A16207",
  Blog: "#0F6E56",
  Tool: "#185FA5",
};

export default function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const results = query.length >= 2
    ? allItems.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
    : [];

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 50); }}
        className="flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-colors"
        style={{ background: "var(--cream)", border: "0.5px solid var(--border)", color: "var(--text-light)" }}
        aria-label="Search"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <span className="hidden md:inline">Search...</span>
      </button>

      {open && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 8px)",
          right: 0,
          width: "min(400px, calc(100vw - 40px))",
          background: "#fff",
          borderRadius: "12px",
          border: "0.5px solid var(--border)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
          zIndex: 100,
          overflow: "hidden",
        }}>
          <div className="px-3 py-2.5 border-b" style={{ borderColor: "var(--border)" }}>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search reviews, comparisons, blog..."
              className="w-full text-sm outline-none"
              style={{ background: "transparent" }}
            />
          </div>
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            {query.length < 2 && (
              <div className="px-4 py-6 text-center text-xs" style={{ color: "var(--text-light)" }}>
                Type at least 2 characters to search
              </div>
            )}
            {query.length >= 2 && results.length === 0 && (
              <div className="px-4 py-6 text-center text-xs" style={{ color: "var(--text-light)" }}>
                No results found
              </div>
            )}
            {results.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => { setOpen(false); setQuery(""); }}
                className="block px-4 py-2.5 hover:bg-[var(--cream)] transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[13px] font-medium truncate" style={{ color: "var(--text)" }}>{item.title}</span>
                  <span className="text-[10px] font-semibold flex-shrink-0" style={{ color: typeColors[item.type] }}>{item.type}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
