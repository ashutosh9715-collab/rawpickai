"use client";

import { useState } from "react";
import Link from "next/link";

interface ToolData {
  slug: string;
  name: string;
  category: string;
  overall: number;
  scores: {
    easeOfUse: number;
    outputQuality: number;
    valueForMoney: number;
    featureDepth: number;
    freeTier: number;
  };
  pricingUSD: string;
  pricingINR: string;
}

const SCORE_LABELS: { key: keyof ToolData["scores"]; label: string; weight: string }[] = [
  { key: "easeOfUse", label: "Ease of Use", weight: "20%" },
  { key: "outputQuality", label: "Output Quality", weight: "30%" },
  { key: "valueForMoney", label: "Value for Money", weight: "20%" },
  { key: "featureDepth", label: "Feature Depth", weight: "15%" },
  { key: "freeTier", label: "Free Tier", weight: "15%" },
];

function ScoreBar({ score, isWinner }: { score: number; isWinner: boolean }) {
  const color = score >= 85 ? "#22c55e" : score >= 70 ? "#f59e0b" : "#ef4444";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-[6px] rounded-sm" style={{ background: "#f0efeb" }}>
        <div className="h-full rounded-sm transition-all" style={{ width: `${score}%`, background: color }} />
      </div>
      <span className={`text-xs mono w-8 text-right ${isWinner ? "font-bold" : ""}`} style={{ color: isWinner ? color : "var(--text-mid)" }}>
        {score}
      </span>
    </div>
  );
}

export default function CompareClient({ tools }: { tools: ToolData[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const filtered = tools.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedTools = selected.map((s) => tools.find((t) => t.slug === s)!).filter(Boolean);

  const toggleTool = (slug: string) => {
    if (selected.includes(slug)) {
      setSelected(selected.filter((s) => s !== slug));
    } else if (selected.length < 3) {
      setSelected([...selected, slug]);
    }
  };

  const getWinner = (key: keyof ToolData["scores"]) => {
    if (selectedTools.length < 2) return "";
    const max = Math.max(...selectedTools.map((t) => t.scores[key]));
    const winners = selectedTools.filter((t) => t.scores[key] === max);
    return winners.length === 1 ? winners[0].slug : "";
  };

  const overallWinner = selectedTools.length >= 2
    ? (() => {
        const max = Math.max(...selectedTools.map((t) => t.overall));
        const winners = selectedTools.filter((t) => t.overall === max);
        return winners.length === 1 ? winners[0].slug : "";
      })()
    : "";

  return (
    <div className="max-w-[900px] mx-auto px-5 md:px-10 py-8 pb-20">
      <div className="text-xs mb-6" style={{ color: "var(--text-light)" }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-1.5">›</span>
        <Link href="/tools" className="hover:underline">Tools</Link>
        <span className="mx-1.5">›</span>
        <span style={{ color: "var(--text-mid)" }}>Compare</span>
      </div>

      <h1 className="heading text-2xl md:text-4xl font-bold mb-2" style={{ letterSpacing: "-0.03em" }}>
        Compare AI Tools Side-by-Side
      </h1>
      <p className="text-base mb-8" style={{ color: "var(--text-mid)" }}>
        Pick 2 or 3 tools to see how they stack up. All scores from our hands-on testing.
      </p>

      {/* Tool selector */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm"
            style={{ background: "var(--cream)", border: "1px solid var(--border)", outline: "none" }}
          />
          <span className="text-xs mono" style={{ color: "var(--text-light)" }}>
            {selected.length}/3 selected
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {filtered.map((t) => {
            const isSelected = selected.includes(t.slug);
            return (
              <button
                key={t.slug}
                onClick={() => toggleTool(t.slug)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer"
                style={{
                  background: isSelected ? "var(--sage-dark)" : "var(--cream)",
                  color: isSelected ? "var(--sage)" : "var(--text-mid)",
                  border: isSelected ? "1px solid var(--sage-dark)" : "1px solid var(--border)",
                }}
              >
                {t.name}
                {isSelected && " ✕"}
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison table */}
      {selectedTools.length >= 2 && (
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
          {/* Header row */}
          <div className={`grid grid-cols-${selectedTools.length + 1}`} style={{ gridTemplateColumns: `180px repeat(${selectedTools.length}, 1fr)` }}>
            <div className="p-4" style={{ background: "var(--cream)", borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-light)" }}>Criteria</span>
            </div>
            {selectedTools.map((t) => (
              <div key={t.slug} className="p-4 text-center" style={{ background: "var(--cream)", borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
                <Link href={`/review/${t.slug}`} className="heading text-sm font-semibold hover:underline">{t.name}</Link>
                <div className="text-xs mono mt-1" style={{ color: "var(--text-light)" }}>{t.category}</div>
              </div>
            ))}
          </div>

          {/* Overall score row */}
          <div style={{ display: "grid", gridTemplateColumns: `180px repeat(${selectedTools.length}, 1fr)` }}>
            <div className="p-4 flex items-center" style={{ background: "var(--sage-light)", borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
              <span className="text-sm font-semibold" style={{ color: "var(--sage-dark)" }}>Overall Score</span>
            </div>
            {selectedTools.map((t) => (
              <div key={t.slug} className="p-4 text-center" style={{ background: "var(--sage-light)", borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
                <span className={`heading text-2xl font-bold ${overallWinner === t.slug ? "" : ""}`} style={{ color: overallWinner === t.slug ? "#22c55e" : "var(--text)" }}>
                  {t.overall.toFixed(1)}
                </span>
                <span className="text-xs" style={{ color: "var(--text-light)" }}>/5</span>
                {overallWinner === t.slug && (
                  <div className="text-[10px] font-semibold mt-1" style={{ color: "#22c55e" }}>WINNER</div>
                )}
              </div>
            ))}
          </div>

          {/* Score rows */}
          {SCORE_LABELS.map((s) => {
            const winner = getWinner(s.key);
            return (
              <div key={s.key} style={{ display: "grid", gridTemplateColumns: `180px repeat(${selectedTools.length}, 1fr)` }}>
                <div className="p-4" style={{ borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
                  <div className="text-sm" style={{ color: "var(--text-mid)" }}>{s.label}</div>
                  <div className="text-[10px] mono" style={{ color: "var(--text-light)" }}>Weight: {s.weight}</div>
                </div>
                {selectedTools.map((t) => (
                  <div key={t.slug} className="p-4" style={{ borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
                    <ScoreBar score={t.scores[s.key]} isWinner={winner === t.slug} />
                  </div>
                ))}
              </div>
            );
          })}

          {/* Pricing rows */}
          <div style={{ display: "grid", gridTemplateColumns: `180px repeat(${selectedTools.length}, 1fr)` }}>
            <div className="p-4" style={{ borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
              <div className="text-sm" style={{ color: "var(--text-mid)" }}>Pricing (USD)</div>
            </div>
            {selectedTools.map((t) => (
              <div key={t.slug} className="p-4" style={{ borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
                <div className="text-xs" style={{ color: "var(--text-mid)" }}>{t.pricingUSD || "—"}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: `180px repeat(${selectedTools.length}, 1fr)` }}>
            <div className="p-4" style={{ borderRight: "1px solid var(--border)" }}>
              <div className="text-sm" style={{ color: "var(--text-mid)" }}>Pricing (INR)</div>
            </div>
            {selectedTools.map((t) => (
              <div key={t.slug} className="p-4" style={{ borderRight: "1px solid var(--border)" }}>
                <div className="text-xs" style={{ color: "var(--text-mid)" }}>{t.pricingINR || "—"}</div>
              </div>
            ))}
          </div>

          {/* Links row */}
          <div style={{ display: "grid", gridTemplateColumns: `180px repeat(${selectedTools.length}, 1fr)`, background: "var(--cream)" }}>
            <div className="p-4">
              <span className="text-sm" style={{ color: "var(--text-light)" }}>Full review</span>
            </div>
            {selectedTools.map((t) => (
              <div key={t.slug} className="p-4 text-center">
                <Link href={`/review/${t.slug}`} className="text-sm font-semibold" style={{ color: "var(--sage-dark)" }}>
                  Read review →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTools.length < 2 && (
        <div className="card text-center py-16" style={{ color: "var(--text-light)" }}>
          Select at least 2 tools above to compare them side-by-side.
        </div>
      )}

      <div className="mt-10 text-center">
        <p className="text-sm mb-4" style={{ color: "var(--text-light)" }}>
          Want a curated recommendation instead?
        </p>
        <Link href="/tools/quiz" className="btn-primary">Take the AI Tool Quiz →</Link>
      </div>
    </div>
  );
}
