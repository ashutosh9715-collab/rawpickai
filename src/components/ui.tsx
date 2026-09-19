"use client";

import React from "react";

// ---------- Pill Badge ----------
export function Pill({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "green" | "red" | "muted" | "primary";
}) {
  const styles: Record<string, { bg: string; color: string }> = {
    default: { bg: "var(--primary-soft)", color: "var(--primary)" },
    green: { bg: "var(--green-soft)", color: "var(--green)" },
    red: { bg: "var(--red-soft)", color: "var(--red)" },
    muted: { bg: "#F4F4F5", color: "var(--t2)" },
    primary: { bg: "var(--primary)", color: "#fff" },
  };
  const s = styles[variant] || styles.default;
  return (
    <span
      className="pill"
      style={{ background: s.bg, color: s.color, fontWeight: 700, fontSize: "11px" }}
    >
      {children}
    </span>
  );
}

// ---------- Star Rating ----------
export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-[var(--amber)] text-sm">★</span>
      <span className="font-bold text-sm">{rating}</span>
      <span className="text-xs text-[var(--t3)]">/5</span>
    </div>
  );
}

// ---------- Score Bar ----------
export function ScoreBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color?: string;
}) {
  const barColor =
    color || (value >= 80 ? "var(--green)" : value >= 60 ? "var(--amber)" : "var(--red)");
  return (
    <div className="mb-3.5">
      <div className="flex justify-between mb-1">
        <span className="text-[13px] text-[var(--t2)] mono">{label}</span>
        <span className="text-[13px] font-bold mono" style={{ color: barColor }}>
          {value}
        </span>
      </div>
      <div className="h-[6px] rounded-full bg-[#F4F4F5] overflow-hidden">
        <div
          className="h-full rounded-full score-fill"
          style={{ width: `${value}%`, background: barColor }}
        />
      </div>
    </div>
  );
}

// ---------- Strength Dot ----------
export function StrengthDot({ strength }: { strength: "strong" | "neutral" | "weak" }) {
  const colors = { strong: "#16a34a", neutral: "#d4d4d8", weak: "#dc2626" };
  return (
    <span
      className="inline-block w-2 h-2 rounded-full mr-1.5 flex-shrink-0"
      style={{ background: colors[strength] }}
    />
  );
}

// ---------- Card ----------
export function Card({
  children,
  className = "",
  hover = false,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`card ${hover ? "card-hover" : ""} ${className}`} style={style}>
      {children}
    </div>
  );
}

// ---------- Tab Button ----------
export function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-3 border-none text-sm font-semibold cursor-pointer transition-colors capitalize"
      style={{
        background: "none",
        color: active ? "var(--t1)" : "var(--t3)",
        fontFamily: "var(--font-sans)",
        borderBottom: active ? "3px solid var(--t1)" : "3px solid transparent",
        marginBottom: "-2px",
      }}
    >
      {children}
    </button>
  );
}
