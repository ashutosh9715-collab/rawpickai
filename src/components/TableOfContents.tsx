"use client";

import { useEffect, useState, useCallback, useRef } from "react";

type Heading = { id: string; text: string };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

export default function TableOfContents({ htmlContent }: { htmlContent: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [leftPos, setLeftPos] = useState(0);
  const [visible, setVisible] = useState(false);
  const headingEls = useRef<HTMLElement[]>([]);
  const scanned = useRef(false);

  useEffect(() => {
    const doScan = () => {
      const blocks = document.querySelectorAll(".prose-content");
      if (blocks.length === 0) return;
      const items: Heading[] = [];
      const els: HTMLElement[] = [];
      const usedIds = new Set<string>();

      blocks.forEach((block) => {
        block.querySelectorAll("h2").forEach((h) => {
          let id = slugify(h.textContent || "");
          // Ensure unique
          let finalId = id;
          let counter = 2;
          while (usedIds.has(finalId)) {
            finalId = `${id}-${counter}`;
            counter++;
          }
          usedIds.add(finalId);
          h.id = finalId; // Always overwrite to ensure consistency
          items.push({ id: finalId, text: h.textContent || "" });
          els.push(h as HTMLElement);
        });
      });

      if (items.length > 0) {
        setHeadings(items);
        headingEls.current = els;
        scanned.current = true;
      }
    };

    // Try immediately, then retry until we find headings
    doScan();
    const t1 = setTimeout(doScan, 300);
    const t2 = setTimeout(doScan, 800);
    const t3 = setTimeout(doScan, 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [htmlContent]);

  const onScroll = useCallback(() => {
    const els = headingEls.current;
    if (els.length === 0) return;

    // Find active: last heading whose top is at or above 140px
    let idx = 0;
    for (let i = els.length - 1; i >= 0; i--) {
      if (els[i].getBoundingClientRect().top <= 140) {
        idx = i;
        break;
      }
    }
    setActiveIdx(idx);

    // Visibility
    const wrapper = document.querySelector(".prose-counter-scope") || document.querySelector(".prose-content");
    if (!wrapper) return;
    const r = wrapper.getBoundingClientRect();
    const right = r.right + 40;

    if (window.innerWidth <= 1280 || window.innerWidth - right <= 160 || r.bottom < 200) {
      setVisible(false);
      return;
    }
    setLeftPos(right);
    setVisible(true);
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [headings, onScroll]);

  if (headings.length < 3 || !visible) return null;

  return (
    <>
      <style>{`
        .toc-item { font-size:12px; line-height:1.4; color:var(--text-light); font-weight:400; padding-left:10px; border-left:2px solid transparent; text-decoration:none; display:block; transition:color 0.15s; }
        .toc-active { color:var(--sage-dark) !important; font-weight:600 !important; border-left-color:var(--sage-dark) !important; }
      `}</style>
      <nav style={{
        position: "fixed", top: "120px", left: `${leftPos}px`,
        width: "180px", maxHeight: "calc(100vh - 160px)", overflowY: "auto", zIndex: 10,
      }}>
        <div style={{ fontSize: "10px", fontWeight: 600, color: "var(--text-light)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px" }}>On this page</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {headings.map((h, i) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              className={`toc-item${i === activeIdx ? " toc-active" : ""}`}
              onClick={(e) => { e.preventDefault(); document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
            >
              {h.text.length > 45 ? h.text.slice(0, 45) + "..." : h.text}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
