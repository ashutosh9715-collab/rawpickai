"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    // Reset on every navigation
    setProgress(0);

    const update = () => {
      const content = document.querySelector(".prose-counter-scope") || document.querySelector(".prose-content");
      if (!content) {
        setProgress(0);
        return;
      }
      const rect = content.getBoundingClientRect();
      const total = rect.height;
      const scrolled = -rect.top;
      const pct = Math.min(Math.max((scrolled / (total - window.innerHeight)) * 100, 0), 100);
      setProgress(pct);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);

  if (progress <= 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: "3px",
        background: "var(--sage-dark)",
        zIndex: 100,
        transition: "width 0.1s linear",
      }}
    />
  );
}
