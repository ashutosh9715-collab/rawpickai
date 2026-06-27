"use client";

import { useEffect, useState } from "react";

/**
 * "Was this helpful?" thumbs up/down widget.
 * Shows live counts, optimistic UI, prevents double-voting via API cookie + localStorage.
 *
 * Drop at the end of any review/comparison/best-of/blog page:
 *   <FeedbackWidget slug={slug} contentType="review" />
 */

type Counts = { up: number; down: number };

export default function FeedbackWidget({
  slug,
  contentType = "page",
}: {
  slug: string;
  contentType?: "review" | "blog" | "comparison" | "best-of" | "news" | "page";
}) {
  const [counts, setCounts] = useState<Counts>({ up: 0, down: 0 });
  const [voted, setVoted] = useState<"up" | "down" | null>(null);
  const [loading, setLoading] = useState(false);

  // Storage key combines content type so the same slug across types stays separate
  const storageKey = `rpai_v_${contentType}_${slug}`;
  const apiSlug = `${contentType}_${slug}`;

  useEffect(() => {
    // Restore vote state from localStorage (cookie covers server, this covers UI)
    try {
      const prev = localStorage.getItem(storageKey);
      if (prev === "up" || prev === "down") setVoted(prev);
    } catch {}

    // Fetch current counts
    fetch(`/api/feedback?slug=${encodeURIComponent(apiSlug)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && typeof data.up === "number") setCounts(data);
      })
      .catch(() => {});
  }, [storageKey, apiSlug]);

  const submitVote = async (vote: "up" | "down") => {
    if (voted || loading) return;
    setLoading(true);

    // Optimistic update
    const optimistic = { ...counts, [vote]: counts[vote] + 1 };
    setCounts(optimistic);
    setVoted(vote);
    try {
      localStorage.setItem(storageKey, vote);
    } catch {}

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: apiSlug, vote }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data.up === "number") setCounts(data);
      }
    } catch {
      // Network failed — keep optimistic state
    } finally {
      setLoading(false);
    }
  };

  const total = counts.up + counts.down;
  const helpfulPct = total > 0 ? Math.round((counts.up / total) * 100) : null;

  const labelText = contentType === "review" ? "review" : contentType === "comparison" ? "comparison" : "post";

  return (
    <div
      className="not-prose"
      style={{
        borderTop: "0.5px solid var(--border, rgba(0,0,0,0.12))",
        paddingTop: "1.75rem",
        marginTop: "3rem",
        marginBottom: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div style={{ fontSize: "14px", color: "var(--text-dark, #3A3A3A)", fontWeight: 500 }}>
          {voted ? "Thanks for your feedback!" : `Was this ${labelText} helpful?`}
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => submitVote("up")}
            disabled={!!voted || loading}
            aria-label="Yes, helpful"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: voted === "up" ? "#F0F4EC" : "#FFFFFF",
              border: `0.5px solid ${voted === "up" ? "var(--sage-dark, #6B8E5A)" : "rgba(0,0,0,0.15)"}`,
              borderRadius: "8px",
              padding: "9px 18px",
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--text-dark, #3A3A3A)",
              cursor: voted ? "default" : "pointer",
              fontFamily: "inherit",
              opacity: voted && voted !== "up" ? 0.5 : 1,
              transition: "opacity 0.15s, background 0.15s",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={voted === "up" ? "#4A6B3A" : "#888"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 10v12"></path>
              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H7a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L14 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
            </svg>
            Yes
            {counts.up > 0 && (
              <span style={{ color: "#888", fontWeight: 400, marginLeft: "2px" }}>({counts.up})</span>
            )}
          </button>
          <button
            onClick={() => submitVote("down")}
            disabled={!!voted || loading}
            aria-label="No, not helpful"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: voted === "down" ? "#FCEBEB" : "#FFFFFF",
              border: `0.5px solid ${voted === "down" ? "#A32D2D" : "rgba(0,0,0,0.15)"}`,
              borderRadius: "8px",
              padding: "9px 18px",
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--text-dark, #3A3A3A)",
              cursor: voted ? "default" : "pointer",
              fontFamily: "inherit",
              opacity: voted && voted !== "down" ? 0.5 : 1,
              transition: "opacity 0.15s, background 0.15s",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={voted === "down" ? "#A32D2D" : "#888"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M17 14V2"></path>
              <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H17a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L10 22h0a3.13 3.13 0 0 1-3-3.88Z"></path>
            </svg>
            No
            {counts.down > 0 && (
              <span style={{ color: "#888", fontWeight: 400, marginLeft: "2px" }}>({counts.down})</span>
            )}
          </button>
        </div>
      </div>
      {total >= 5 && helpfulPct !== null && (
        <div style={{ fontSize: "11px", color: "var(--text-light, #888)", marginTop: "12px", fontFamily: "var(--font-mono, monospace)" }}>
          {helpfulPct}% of {total} readers found this helpful
        </div>
      )}
    </div>
  );
}
