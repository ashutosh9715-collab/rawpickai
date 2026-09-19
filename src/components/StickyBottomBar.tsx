"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Props = { title: string; href: string; label?: string };

export default function StickyBottomBar({ title, href, label }: Props) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setShow(scrollPct > 0.4);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed || !show) return null;

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
      background: "var(--bg)", borderTop: "0.5px solid var(--border)",
      boxShadow: "0 -2px 12px rgba(0,0,0,0.06)",
      padding: "10px 20px",
      transform: show ? "translateY(0)" : "translateY(100%)",
      transition: "transform 0.3s ease",
    }}>
      <div className="max-w-[760px] mx-auto flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p style={{ fontSize: "11px", color: "var(--text-light)", margin: 0 }}>{label || "You might also like"}</p>
          <p className="truncate" style={{ fontSize: "13px", fontWeight: 500, margin: 0 }}>{title}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link href={href} style={{ fontSize: "12px", fontWeight: 600, color: "#fff", background: "var(--sage-dark)", padding: "6px 14px", borderRadius: "20px", textDecoration: "none", whiteSpace: "nowrap" }}>Read →</Link>
          <button onClick={() => setDismissed(true)} style={{ fontSize: "16px", color: "var(--text-light)", background: "none", border: "none", cursor: "pointer", padding: "4px" }}>×</button>
        </div>
      </div>
    </div>
  );
}
