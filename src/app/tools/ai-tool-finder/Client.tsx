"use client";

import { useState } from "react";
import Link from "next/link";
import GuideContent from "@/components/GuideContent";
import { guideHtml } from "./guide";

type Step = "role" | "task" | "budget" | "language" | "result";

type Rec = { tool: string; why: string; price: string; link: string };

const roles = [
  { id: "writer", label: "Writer / Content Creator", icon: "✍️" },
  { id: "developer", label: "Developer / Engineer", icon: "💻" },
  { id: "student", label: "Student", icon: "📚" },
  { id: "designer", label: "Designer / Creative", icon: "🎨" },
  { id: "business", label: "Business / Marketing", icon: "📈" },
  { id: "researcher", label: "Researcher / Academic", icon: "🔬" },
];

const tasks = [
  { id: "writing", label: "Writing & Content" },
  { id: "coding", label: "Coding & Development" },
  { id: "research", label: "Research & Analysis" },
  { id: "images", label: "Image Generation" },
  { id: "video", label: "Video & Audio" },
  { id: "presentations", label: "Presentations" },
  { id: "general", label: "General AI Assistant" },
];

const budgets = [
  { id: "free", label: "₹0 — Free only" },
  { id: "low", label: "Under ₹1,000/mo" },
  { id: "mid", label: "₹1,000 – ₹2,000/mo" },
  { id: "high", label: "Over ₹2,000/mo" },
];

const languages = [
  { id: "english", label: "English only" },
  { id: "hindi", label: "Hindi or Hinglish" },
  { id: "both", label: "Both English & Hindi" },
];

function getRecommendations(role: string, task: string, budget: string, lang: string): { stack: Rec[]; totalCost: string } {
  const recs: Rec[] = [];

  if (task === "writing") {
    if (budget === "free") {
      recs.push({ tool: "Claude Free", why: "Best free writing quality", price: "₹0", link: "/review/claude" });
      recs.push({ tool: "Grammarly Free", why: "Grammar checking everywhere", price: "₹0", link: "/review/grammarly" });
    } else {
      recs.push({ tool: "Claude Pro", why: "Best writing AI — worth every rupee", price: "≈₹1,860/mo", link: "/review/claude" });
      recs.push({ tool: "Grammarly Free", why: "Catches errors in Gmail, Docs, LinkedIn", price: "₹0", link: "/review/grammarly" });
    }
  } else if (task === "coding") {
    if (budget === "free") {
      recs.push({ tool: "Windsurf Free", why: "Unlimited autocomplete, no credit cap", price: "₹0", link: "/review/windsurf" });
      recs.push({ tool: "Claude Free", why: "Best free reasoning for debugging", price: "₹0", link: "/review/claude" });
    } else if (budget === "low") {
      recs.push({ tool: "GitHub Copilot Pro", why: "Best value at ≈₹930/mo", price: "≈₹930/mo", link: "/review/github-copilot" });
      recs.push({ tool: "Windsurf Free", why: "Supplement with free autocomplete", price: "₹0", link: "/review/windsurf" });
    } else {
      recs.push({ tool: "Cursor Pro", why: "Best AI code editor — agent mode is game-changing", price: "≈₹1,860/mo", link: "/review/cursor" });
    }
    if (role === "student") {
      recs.length = 0;
      recs.push({ tool: "GitHub Copilot (Free via Education)", why: "Free for students with .edu email", price: "₹0", link: "/review/github-copilot" });
      recs.push({ tool: "Windsurf Free", why: "Unlimited backup autocomplete", price: "₹0", link: "/review/windsurf" });
    }
  } else if (task === "research") {
    recs.push({ tool: "Perplexity Free", why: "Every answer has clickable citations", price: "₹0", link: "/review/perplexity" });
    if (budget !== "free") {
      recs.push({ tool: "Perplexity Pro", why: "Unlimited Pro Search removes daily cap", price: "≈₹1,860/mo", link: "/review/perplexity" });
    }
    if (role === "student") {
      recs.push({ tool: "Google NotebookLM", why: "Upload textbooks, get AI study guides free", price: "₹0", link: "/review/google-notebooklm" });
    }
  } else if (task === "images") {
    if (budget === "free") {
      recs.push({ tool: "Leonardo AI Free", why: "150 tokens/day — ~10-15 images", price: "₹0", link: "/review/leonardo-ai" });
      recs.push({ tool: "Ideogram Free", why: "Best free text-in-image generation", price: "₹0", link: "/review/ideogram" });
    } else {
      recs.push({ tool: "Midjourney", why: "Highest quality AI images", price: "≈₹930/mo", link: "/review/midjourney" });
      recs.push({ tool: "Leonardo AI Free", why: "Free supplement for quick images", price: "₹0", link: "/review/leonardo-ai" });
    }
  } else if (task === "video") {
    if (budget === "free") {
      recs.push({ tool: "Pika Free", why: "Best free AI video with daily credits", price: "₹0", link: "/review/pika" });
    } else {
      recs.push({ tool: "Runway ML", why: "Highest quality AI video generation", price: "≈₹1,395/mo", link: "/review/runway" });
    }
    recs.push({ tool: "ElevenLabs Starter", why: "Best AI voice quality for narration", price: "≈₹465/mo", link: "/review/elevenlabs" });
  } else if (task === "presentations") {
    recs.push({ tool: "Gamma", why: "Generates complete decks in 90 seconds", price: budget === "free" ? "₹0 (10 credits)" : "≈₹930/mo", link: "/review/gamma" });
    if (budget === "free") {
      recs.push({ tool: "Google Slides + Gemini", why: "Completely free, exports to .pptx", price: "₹0", link: "/review/google-slides-gemini" });
    }
  } else {
    if (budget === "free") {
      recs.push({ tool: "Claude Free", why: "Best free writing and reasoning", price: "₹0", link: "/review/claude" });
      recs.push({ tool: "ChatGPT Free", why: "Most versatile — does everything", price: "₹0", link: "/review/chatgpt" });
    } else {
      recs.push({ tool: "ChatGPT Plus", why: "One tool for everything — writing, coding, images", price: "≈₹1,860/mo", link: "/review/chatgpt" });
    }
    if (lang === "hindi" || lang === "both") {
      recs.push({ tool: "Google Gemini", why: "Best Hindi support of any AI", price: budget === "free" ? "₹0" : "≈₹1,860/mo", link: "/review/google-gemini" });
    }
  }

  if ((lang === "hindi" || lang === "both") && !recs.some((r) => r.tool.includes("Gemini")) && task !== "coding" && task !== "images") {
    recs.push({ tool: "Google Gemini Free", why: "Strongest Hindi language support", price: "₹0", link: "/review/google-gemini" });
  }

  const total = recs.reduce((sum, r) => {
    const match = r.price.match(/₹([\d,]+)/);
    return sum + (match ? parseInt(match[1].replace(",", "")) : 0);
  }, 0);

  return { stack: recs, totalCost: total === 0 ? "₹0/month" : `≈₹${total.toLocaleString("en-IN")}/month` };
}

export default function AIToolFinder() {
  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState("");
  const [task, setTask] = useState("");
  const [budget, setBudget] = useState("");
  const [lang, setLang] = useState("");

  const { stack, totalCost } = role && task && budget && lang ? getRecommendations(role, task, budget, lang) : { stack: [], totalCost: "₹0" };

  const handleSelect = (type: string, value: string) => {
    if (type === "role") { setRole(value); setStep("task"); }
    else if (type === "task") { setTask(value); setStep("budget"); }
    else if (type === "budget") { setBudget(value); setStep("language"); }
    else if (type === "language") { setLang(value); setStep("result"); }
  };

  const reset = () => { setStep("role"); setRole(""); setTask(""); setBudget(""); setLang(""); };

  const stepNum = step === "role" ? 1 : step === "task" ? 2 : step === "budget" ? 3 : step === "language" ? 4 : 5;

  return (
    <>
    <div className="max-w-[700px] mx-auto px-5 md:px-10 py-8 pb-20">
      <div className="text-xs mb-6" style={{ color: "var(--text-light)" }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-1.5">›</span>
        <Link href="/tools" className="hover:underline">Tools</Link>
        <span className="mx-1.5">›</span>
        <span style={{ color: "var(--text-mid)" }}>AI Tool Finder</span>
      </div>

      <h1 className="heading text-2xl md:text-3xl font-bold mb-2" style={{ letterSpacing: "-0.03em" }}>Find Your Perfect AI Stack</h1>
      <p className="text-sm mb-6" style={{ color: "var(--text-mid)" }}>Answer 4 questions. Get a personalized AI tool recommendation with total cost in INR.</p>

      {step !== "result" && (
        <div className="flex gap-1 mb-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-1 flex-1 rounded-full" style={{ background: n <= stepNum ? "var(--sage-dark)" : "var(--border)" }} />
          ))}
        </div>
      )}

      {step === "role" && (
        <div>
          <h2 className="heading text-lg font-semibold mb-3">What best describes you?</h2>
          <div className="grid grid-cols-2 gap-2">
            {roles.map((r) => (
              <button key={r.id} onClick={() => handleSelect("role", r.id)} className="card card-hover !py-4 !px-4 text-left cursor-pointer">
                <span className="text-xl mb-1 block">{r.icon}</span>
                <span className="text-sm font-medium">{r.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "task" && (
        <div>
          <h2 className="heading text-lg font-semibold mb-3">What's your primary task?</h2>
          <div className="grid gap-2">
            {tasks.map((t) => (
              <button key={t.id} onClick={() => handleSelect("task", t.id)} className="card card-hover !py-3.5 !px-4 text-left cursor-pointer text-sm font-medium">{t.label}</button>
            ))}
          </div>
        </div>
      )}

      {step === "budget" && (
        <div>
          <h2 className="heading text-lg font-semibold mb-3">Monthly budget for AI tools?</h2>
          <div className="grid gap-2">
            {budgets.map((b) => (
              <button key={b.id} onClick={() => handleSelect("budget", b.id)} className="card card-hover !py-3.5 !px-4 text-left cursor-pointer text-sm font-medium">{b.label}</button>
            ))}
          </div>
        </div>
      )}

      {step === "language" && (
        <div>
          <h2 className="heading text-lg font-semibold mb-3">Which language do you work in?</h2>
          <div className="grid gap-2">
            {languages.map((l) => (
              <button key={l.id} onClick={() => handleSelect("language", l.id)} className="card card-hover !py-3.5 !px-4 text-left cursor-pointer text-sm font-medium">{l.label}</button>
            ))}
          </div>
        </div>
      )}

      {step === "result" && (
        <div>
          <div className="card !py-5 !px-6 mb-4" style={{ background: "var(--sage-light)" }}>
            <h2 className="heading text-lg font-semibold mb-1">Your AI Stack</h2>
            <p className="text-2xl font-bold m-0" style={{ color: "var(--sage-dark)" }}>{totalCost}</p>
          </div>

          <div className="grid gap-3 mb-6">
            {stack.map((rec, i) => (
              <div key={i} className="card !py-4 !px-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link href={rec.link} className="heading text-[15px] font-semibold hover:underline">{rec.tool}</Link>
                    <p className="text-[13px] m-0 mt-0.5" style={{ color: "var(--text-mid)" }}>{rec.why}</p>
                  </div>
                  <span className="text-sm font-semibold flex-shrink-0 mono" style={{ color: rec.price === "₹0" ? "#059669" : "var(--text)" }}>{rec.price}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={reset} className="pill text-xs font-medium cursor-pointer" style={{ background: "var(--bg-elevated)", border: "0.5px solid var(--border)" }}>Start Over</button>
            <Link href="/deals" className="pill text-xs font-medium" style={{ background: "var(--sage-dark)", color: "#fff" }}>View All Deals →</Link>
          </div>
        </div>
      )}
    </div>
    <GuideContent html={guideHtml} />
    </>
  );
}
