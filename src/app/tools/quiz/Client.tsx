"use client";

import { useState } from "react";
import Link from "next/link";
import GuideContent from "@/components/GuideContent";
import { guideHtml } from "./guide";

const questions = [
  {
    q: "What do you primarily need AI for?",
    options: [
      { label: "Writing & content creation", tags: ["writing"] },
      { label: "Coding & development", tags: ["coding"] },
      { label: "Image generation & design", tags: ["image"] },
      { label: "Research & fact-finding", tags: ["research"] },
      { label: "Video & audio production", tags: ["video"] },
      { label: "Presentations & docs", tags: ["productivity"] },
    ],
  },
  {
    q: "What's your monthly budget?",
    options: [
      { label: "Free only — ₹0", tags: ["free"] },
      { label: "Under $10/mo (≈₹930)", tags: ["budget"] },
      { label: "$10-20/mo (≈₹930-1,860)", tags: ["mid"] },
      { label: "$20-50/mo (≈₹1,860-4,650)", tags: ["premium"] },
      { label: "Budget isn't a concern", tags: ["unlimited"] },
    ],
  },
  {
    q: "How important is a free tier?",
    options: [
      { label: "Essential — I won't pay without trying first", tags: ["free-important"] },
      { label: "Nice to have but not required", tags: ["free-neutral"] },
      { label: "Don't care — I'll pay for the best", tags: ["free-irrelevant"] },
    ],
  },
  {
    q: "What's your experience level?",
    options: [
      { label: "Beginner — I want the simplest tool", tags: ["beginner"] },
      { label: "Intermediate — comfortable with tech", tags: ["intermediate"] },
      { label: "Advanced — I want maximum control", tags: ["advanced"] },
    ],
  },
  {
    q: "Are you using this for work or personal projects?",
    options: [
      { label: "Professional / client work", tags: ["pro"] },
      { label: "Personal projects / learning", tags: ["personal"] },
      { label: "Student / academic", tags: ["student"] },
    ],
  },
];

interface Rec {
  name: string;
  slug: string;
  why: string;
  price: string;
  score: number;
  match: number;
}

function getRecommendations(answers: string[][]): Rec[] {
  const allTags = answers.flat();
  const tools: (Rec & { matchTags: string[] })[] = [
    { name: "Claude", slug: "claude", why: "Best writing quality of any AI tool. Natural prose, excellent long-form.", price: "$20/mo (≈₹1,860)", score: 4.4, match: 0, matchTags: ["writing", "mid", "premium", "unlimited", "intermediate", "advanced", "pro", "free-neutral", "free-irrelevant"] },
    { name: "ChatGPT", slug: "chatgpt", why: "Most versatile AI — writing, coding, images, voice, all in one.", price: "$20/mo (≈₹1,860)", score: 4.5, match: 0, matchTags: ["writing", "coding", "research", "mid", "premium", "unlimited", "beginner", "intermediate", "pro", "personal", "student", "free-neutral"] },
    { name: "Cursor", slug: "cursor", why: "Best AI code editor. Agent mode handles multi-file tasks autonomously.", price: "$20/mo (≈₹1,860)", score: 4.5, match: 0, matchTags: ["coding", "mid", "premium", "unlimited", "intermediate", "advanced", "pro", "free-irrelevant"] },
    { name: "GitHub Copilot", slug: "github-copilot", why: "Works inside your existing editor. Best value for coding assistance.", price: "$10/mo (≈₹930)", score: 4.2, match: 0, matchTags: ["coding", "budget", "mid", "beginner", "intermediate", "pro", "personal", "free-neutral"] },
    { name: "Windsurf", slug: "windsurf", why: "Best free AI coding assistant. Unlimited autocomplete at zero cost.", price: "Free", score: 3.8, match: 0, matchTags: ["coding", "free", "budget", "free-important", "beginner", "personal", "student"] },
    { name: "Midjourney", slug: "midjourney", why: "Highest image quality. Unmatched for artistic and photorealistic work.", price: "$10/mo (≈₹930)", score: 4.4, match: 0, matchTags: ["image", "budget", "mid", "premium", "unlimited", "intermediate", "advanced", "pro", "free-irrelevant"] },
    { name: "Leonardo AI", slug: "leonardo-ai", why: "Best free image generator. 150 tokens/day for 10-15 images free.", price: "Free / $12/mo", score: 4.0, match: 0, matchTags: ["image", "free", "budget", "free-important", "beginner", "personal", "student"] },
    { name: "Perplexity", slug: "perplexity", why: "Best AI research tool. Every answer comes with clickable citations.", price: "$20/mo (≈₹1,860)", score: 4.4, match: 0, matchTags: ["research", "free", "mid", "premium", "free-important", "beginner", "intermediate", "pro", "student"] },
    { name: "Runway ML", slug: "runway", why: "Best AI video quality. Gen-4 produces production-grade clips.", price: "$15/mo (≈₹1,395)", score: 4.1, match: 0, matchTags: ["video", "mid", "premium", "unlimited", "intermediate", "advanced", "pro", "free-neutral"] },
    { name: "Descript", slug: "descript", why: "Edit video by editing text. Best for podcasters and YouTubers.", price: "$24/mo (≈₹2,232)", score: 4.0, match: 0, matchTags: ["video", "mid", "premium", "beginner", "intermediate", "pro", "personal"] },
    { name: "ElevenLabs", slug: "elevenlabs", why: "Most realistic AI voices. Best for audiobooks and podcasts.", price: "$5/mo (≈₹465)", score: 4.3, match: 0, matchTags: ["video", "budget", "mid", "premium", "intermediate", "pro", "free-neutral"] },
    { name: "Gamma", slug: "gamma", why: "Generate entire presentations from a prompt in 90 seconds.", price: "$10/mo (≈₹930)", score: 3.9, match: 0, matchTags: ["productivity", "free", "budget", "mid", "free-important", "beginner", "pro", "personal", "student"] },
    { name: "Grammarly", slug: "grammarly", why: "Real-time writing correction inside Gmail, Slack, and everywhere.", price: "$12/yr (≈₹1,116/yr)", score: 4.0, match: 0, matchTags: ["writing", "free", "budget", "free-important", "beginner", "pro", "personal", "student"] },
    { name: "Notion AI", slug: "notion-ai", why: "AI built into your workspace. Best if you already use Notion.", price: "$10/mo (≈₹930)", score: 3.8, match: 0, matchTags: ["productivity", "budget", "mid", "intermediate", "pro", "free-neutral"] },
  ];

  // Score each tool
  for (const tool of tools) {
    tool.match = allTags.filter((t) => tool.matchTags.includes(t)).length;
  }

  return tools
    .sort((a, b) => b.match - a.match || b.score - a.score)
    .slice(0, 3)
    .map(({ matchTags, ...rest }) => rest);
}

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [results, setResults] = useState<Rec[] | null>(null);

  const handleAnswer = (tags: string[]) => {
    const newAnswers = [...answers, tags];
    setAnswers(newAnswers);

    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setResults(getRecommendations(newAnswers));
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers([]);
    setResults(null);
  };

  return (
    <>
    <div className="max-w-[760px] mx-auto px-5 md:px-10 py-8 md:py-10 pb-16 md:pb-20">
      <div className="text-xs mb-5" style={{ color: "var(--text-light)" }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-1.5">›</span>
        <Link href="/tools" className="hover:underline">Tools</Link>
        <span className="mx-1.5">›</span>
        <span style={{ color: "var(--text-mid)" }}>AI Tool Quiz</span>
      </div>

      <div className="rounded-[16px] mb-6" style={{ background: "var(--sage-light)", padding: "28px 24px 20px" }}>
        <span className="text-[11px] font-medium px-3.5 py-1 rounded-full" style={{ background: "var(--sage-dark)", color: "var(--sage)" }}>Interactive Tool</span>
        <h1 className="heading font-medium leading-[1.15] mb-0 mt-4 text-[24px] md:text-[32px]" style={{ color: "var(--sage-dark)", letterSpacing: "-0.02em" }}>
          Which AI tool should you use?
        </h1>
        <p className="text-[15px] leading-relaxed mt-3 mb-0" style={{ color: "var(--sage-mid)" }}>
          Answer 5 quick questions and we&apos;ll recommend the best AI tools for your specific needs.
        </p>
      </div>

      {!results ? (
        <div className="rounded-xl p-6 md:p-8" style={{ border: "0.5px solid var(--border)" }}>
          {/* Progress */}
          <div className="flex gap-1.5 mb-6">
            {questions.map((_, i) => (
              <div key={i} className="h-1 flex-1 rounded-full" style={{ background: i <= step ? "var(--sage-dark)" : "var(--border)" }} />
            ))}
          </div>

          <div className="text-xs mono mb-2" style={{ color: "var(--text-light)" }}>Question {step + 1} of {questions.length}</div>
          <h2 className="heading text-xl md:text-2xl font-medium mb-6" style={{ letterSpacing: "-0.01em" }}>{questions[step].q}</h2>

          <div className="grid gap-2.5">
            {questions[step].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt.tags)}
                className="text-left p-4 rounded-xl font-medium text-[15px] transition-all"
                style={{ border: "0.5px solid var(--border)", background: "var(--bg)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--sage-light)"; e.currentTarget.style.borderColor = "var(--sage-dark)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg)"; e.currentTarget.style.borderColor = "var(--border)"; }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="heading text-xl md:text-2xl font-medium mb-2" style={{ letterSpacing: "-0.01em" }}>Your top 3 recommendations</h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-mid)" }}>Based on your answers, these tools are the best fit for your needs.</p>

          <div className="grid gap-4 mb-8">
            {results.map((r, i) => (
              <Link key={r.slug} href={`/review/${r.slug}`}>
                <div className="rounded-xl p-5 md:p-6 transition-all" style={{ border: i === 0 ? "2px solid var(--sage-dark)" : "0.5px solid var(--border)", background: i === 0 ? "var(--sage-light)" : "var(--bg)" }}>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1">
                        <span className="text-sm font-medium" style={{ color: i === 0 ? "var(--sage-dark)" : "var(--text-light)" }}>#{i + 1}</span>
                        <span className="heading text-lg font-medium">{r.name}</span>
                        <span className="text-sm font-medium" style={{ color: "#B8860B" }}>★ {r.score}</span>
                      </div>
                      <p className="text-sm leading-relaxed m-0" style={{ color: "var(--text-mid)" }}>{r.why}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-[13px] font-medium">{r.price}</div>
                      <div className="text-xs mt-1" style={{ color: "var(--sage-dark)" }}>Read review →</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <button onClick={restart} className="btn-outline text-sm">Take the quiz again</button>
        </div>
      )}
    </div>
    <GuideContent html={guideHtml} />
    </>
  );
}
