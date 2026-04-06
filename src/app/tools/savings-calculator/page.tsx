"use client";

import { useState } from "react";
import Link from "next/link";

type TaskType = { id: string; label: string; hoursPerWeek: number; aiTool: string; aiCost: number; savingsPercent: number; link: string };

const taskTypes: TaskType[] = [
  { id: "writing", label: "Content Writing", hoursPerWeek: 10, aiTool: "Claude Pro", aiCost: 1860, savingsPercent: 50, link: "/review/claude" },
  { id: "coding", label: "Software Development", hoursPerWeek: 20, aiTool: "Cursor Pro", aiCost: 1860, savingsPercent: 30, link: "/review/cursor" },
  { id: "research", label: "Research & Analysis", hoursPerWeek: 8, aiTool: "Perplexity Pro", aiCost: 1860, savingsPercent: 60, link: "/review/perplexity" },
  { id: "design", label: "Graphic Design", hoursPerWeek: 8, aiTool: "Canva Pro", aiCost: 1116, savingsPercent: 40, link: "/review/canva-ai" },
  { id: "presentations", label: "Presentations", hoursPerWeek: 5, aiTool: "Gamma Plus", aiCost: 930, savingsPercent: 70, link: "/review/gamma" },
  { id: "email", label: "Email & Communication", hoursPerWeek: 6, aiTool: "Grammarly Pro", aiCost: 744, savingsPercent: 30, link: "/review/grammarly" },
  { id: "customer", label: "Customer Support", hoursPerWeek: 15, aiTool: "ChatGPT Plus", aiCost: 1860, savingsPercent: 40, link: "/review/chatgpt" },
  { id: "video", label: "Video Production", hoursPerWeek: 10, aiTool: "Runway Standard", aiCost: 1395, savingsPercent: 35, link: "/review/runway" },
];

export default function SavingsCalculator() {
  const [teamSize, setTeamSize] = useState(3);
  const [hourlyRate, setHourlyRate] = useState(500);
  const [selectedTasks, setSelectedTasks] = useState<string[]>(["writing", "research"]);

  const toggleTask = (id: string) => {
    setSelectedTasks((prev) => prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]);
  };

  const selected = taskTypes.filter((t) => selectedTasks.includes(t.id));
  const totalHoursSaved = selected.reduce((sum, t) => sum + (t.hoursPerWeek * t.savingsPercent) / 100, 0) * teamSize;
  const totalMonthlySavings = totalHoursSaved * 4.33 * hourlyRate;
  const totalAICost = selected.reduce((sum, t) => sum + t.aiCost, 0) * teamSize;
  const netSavings = totalMonthlySavings - totalAICost;
  const roi = totalAICost > 0 ? Math.round((netSavings / totalAICost) * 100) : 0;

  return (
    <div className="max-w-[800px] mx-auto px-5 md:px-10 py-8 pb-20">
      <div className="text-xs mb-6" style={{ color: "var(--text-light)" }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-1.5">›</span>
        <Link href="/tools" className="hover:underline">Tools</Link>
        <span className="mx-1.5">›</span>
        <span style={{ color: "var(--text-mid)" }}>Savings Calculator</span>
      </div>

      <h1 className="heading text-2xl md:text-3xl font-bold mb-2" style={{ letterSpacing: "-0.03em" }}>AI Tool Savings Calculator</h1>
      <p className="text-sm mb-6" style={{ color: "var(--text-mid)" }}>See how much your team could save by adopting AI tools. All costs in INR.</p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="card !py-4 !px-5">
          <label className="text-xs font-medium block mb-2" style={{ color: "var(--text-light)" }}>Team Size</label>
          <input type="range" min={1} max={50} value={teamSize} onChange={(e) => setTeamSize(Number(e.target.value))} className="w-full accent-[#2D3A28]" />
          <div className="text-xl font-bold mt-1">{teamSize} {teamSize === 1 ? "person" : "people"}</div>
        </div>
        <div className="card !py-4 !px-5">
          <label className="text-xs font-medium block mb-2" style={{ color: "var(--text-light)" }}>Avg. Hourly Rate (₹)</label>
          <input type="range" min={100} max={3000} step={50} value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))} className="w-full accent-[#2D3A28]" />
          <div className="text-xl font-bold mt-1">₹{hourlyRate.toLocaleString("en-IN")}/hr</div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="heading text-base font-semibold mb-3">What tasks does your team do?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {taskTypes.map((t) => (
            <button key={t.id} onClick={() => toggleTask(t.id)}
              className="card !py-3 !px-3 text-left cursor-pointer text-xs font-medium transition-all"
              style={{ background: selectedTasks.includes(t.id) ? "var(--sage-light)" : "var(--bg-elevated)", border: selectedTasks.includes(t.id) ? "1px solid var(--sage-dark)" : "0.5px solid var(--border)" }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {selected.length > 0 && (
        <>
          <div className="card !py-5 !px-6 mb-4" style={{ background: "var(--sage-light)" }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-xs mb-1" style={{ color: "var(--text-mid)" }}>Hours Saved/Week</div>
                <div className="text-2xl font-bold" style={{ color: "var(--sage-dark)" }}>{totalHoursSaved.toFixed(0)}</div>
              </div>
              <div>
                <div className="text-xs mb-1" style={{ color: "var(--text-mid)" }}>AI Tool Cost/Month</div>
                <div className="text-2xl font-bold">₹{totalAICost.toLocaleString("en-IN")}</div>
              </div>
              <div>
                <div className="text-xs mb-1" style={{ color: "var(--text-mid)" }}>Value of Time Saved</div>
                <div className="text-2xl font-bold" style={{ color: "#059669" }}>₹{Math.round(totalMonthlySavings).toLocaleString("en-IN")}</div>
              </div>
              <div>
                <div className="text-xs mb-1" style={{ color: "var(--text-mid)" }}>ROI</div>
                <div className="text-2xl font-bold" style={{ color: roi > 0 ? "#059669" : "#EF4444" }}>{roi > 0 ? "+" : ""}{roi}%</div>
              </div>
            </div>
          </div>

          <div className="card !py-4 !px-5 mb-6" style={{ background: netSavings > 0 ? "#F0FDF4" : "#FEF2F2" }}>
            <div className="text-center">
              <div className="text-sm" style={{ color: "var(--text-mid)" }}>Net Monthly Savings</div>
              <div className="text-3xl font-bold" style={{ color: netSavings > 0 ? "#059669" : "#EF4444" }}>
                {netSavings > 0 ? "+" : ""}₹{Math.round(Math.abs(netSavings)).toLocaleString("en-IN")}/mo
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--text-mid)" }}>
                {netSavings > 0 ? "Your team saves more than the tools cost" : "Consider starting with free tiers first"}
              </div>
            </div>
          </div>

          <h2 className="heading text-base font-semibold mb-3">Recommended AI Stack</h2>
          <div className="grid gap-2">
            {selected.map((t) => (
              <div key={t.id} className="card !py-3 !px-4 flex items-center justify-between">
                <div>
                  <Link href={t.link} className="text-sm font-medium hover:underline">{t.aiTool}</Link>
                  <span className="text-xs ml-2" style={{ color: "var(--text-light)" }}>for {t.label}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold mono">₹{(t.aiCost * teamSize).toLocaleString("en-IN")}/mo</div>
                  <div className="text-[10px]" style={{ color: "var(--text-light)" }}>₹{t.aiCost.toLocaleString("en-IN")} × {teamSize}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-8 text-xs" style={{ color: "var(--text-light)" }}>
        <p className="m-0">Savings estimates based on industry benchmarks. Actual results vary by team skill, task complexity, and tool adoption. Time savings percentages: Writing 50%, Coding 30%, Research 60%, Design 40%, Presentations 70%, Email 30%, Support 40%, Video 35%. All prices at ₹93/USD.</p>
      </div>
    </div>
  );
}
