"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Search from "./Search";
import ReadingProgressBar from "./ReadingProgressBar";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
  }, []);

  function toggleTheme() {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("rawpickai-theme", next);
    setDark(!dark);
  }

  return (
    <>
    <div className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color:var(--bg)]/90 backdrop-blur-xl">
    <nav className="max-w-[1180px] mx-auto px-[18px] py-4 flex justify-between items-center relative">
      <Link href="/" className="flex items-center">
        <span className="editorial-heading text-[23px] font-bold tracking-[-0.04em]">
          RawPickAI<span className="inline-block w-2 h-2 ml-1 rounded-full bg-[var(--accent-rust)]" />
        </span>
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-7 ml-auto">
        <Link href="/compare" className="text-[15px] text-[var(--text-mid)] hover:text-[var(--text)] transition-colors">
          Compare
        </Link>
        <Link href="/blog" className="text-[15px] text-[var(--text-mid)] hover:text-[var(--text)] transition-colors">
          Blog
        </Link>
        <Link href="/studies" className="text-[15px] text-[var(--text-mid)] hover:text-[var(--text)] transition-colors">
          Research
        </Link>
        <Search />
        <Link
          href="/tools"
          className="flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 border border-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)] transition-colors"
        >
          Explore Tools <span className="text-xs">↗</span>
        </Link>
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--card)] grid place-items-center shadow-sm"
          aria-label={dark ? "Use light mode" : "Use dark mode"}
          title={dark ? "Use light mode" : "Use dark mode"}
        >
          <span aria-hidden="true">{dark ? "☀" : "◐"}</span>
        </button>
      </div>

      {/* Mobile hamburger */}
      <div className="md:hidden ml-auto flex items-center gap-2">
      <button
        onClick={toggleTheme}
        className="w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--card)] grid place-items-center"
        aria-label={dark ? "Use light mode" : "Use dark mode"}
      >
        <span aria-hidden="true">{dark ? "☀" : "◐"}</span>
      </button>
      <button
        className="flex flex-col gap-[5px] p-2"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span
          className="block w-5 h-[2px] rounded-full transition-transform"
          style={{ background: "var(--text)", transform: open ? "rotate(45deg) translateY(7px)" : "" }}
        />
        <span
          className="block w-5 h-[2px] rounded-full transition-opacity"
          style={{ background: "var(--text)", opacity: open ? 0 : 1 }}
        />
        <span
          className="block w-5 h-[2px] rounded-full transition-transform"
          style={{ background: "var(--text)", transform: open ? "rotate(-45deg) translateY(-7px)" : "" }}
        />
      </button>
      </div>

      {/* Mobile menu dropdown */}
      {open && (
        <div
          className="absolute top-full left-0 right-0 z-50 md:hidden"
          style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)", padding: "16px 20px 20px" }}
        >
          <div className="flex flex-col gap-1">
            {[
              { href: "/tools", label: "Explore Tools" },
              { href: "/compare", label: "Compare" },
              { href: "/blog", label: "Blog" },
              { href: "/studies", label: "Research" },
              { href: "/about", label: "About" },
              { href: "/newsletter", label: "Newsletter" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-[15px] font-medium transition-colors"
                style={{ color: "var(--text)", borderBottom: "0.5px solid var(--border)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
    </div>
    <ReadingProgressBar />
    </>
  );
}
