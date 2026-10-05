"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Search from "./Search";
import ReadingProgressBar from "./ReadingProgressBar";

const sectionLinks = [
  { href: "/categories", label: "Categories" },
  { href: "/compare", label: "Compare" },
  { href: "/best", label: "Best Of" },
  { href: "/blog", label: "Blog" },
  { href: "/learn", label: "Learn" },
  { href: "/news", label: "News" },
  { href: "/studies", label: "Research" },
];

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
      <Link href="/" className="flex items-center shrink-0">
        <span className="editorial-heading text-[23px] font-bold tracking-[-0.04em]">
          RawPickAI<span className="inline-block w-2 h-2 ml-1 rounded-full bg-[var(--accent-rust)]" />
        </span>
      </Link>

      {/* Desktop nav */}
      <div className="hidden xl:flex items-center gap-4 ml-auto">
        {sectionLinks.map((link) => (
          <Link key={link.href} href={link.href} className="text-[15px] whitespace-nowrap text-[var(--text-mid)] hover:text-[var(--text)] transition-colors">
            {link.label}
          </Link>
        ))}
        <Search />
        <Link
          href="/tools"
          className="flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold px-3 py-2.5 border border-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)] transition-colors"
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
      <div className="xl:hidden ml-auto flex items-center gap-2">
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
          className="absolute top-full left-0 right-0 z-50 xl:hidden"
          style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)", padding: "16px 20px 20px" }}
        >
          <div className="flex flex-col gap-1">
            {[
              { href: "/tools", label: "Explore Tools" },
              ...sectionLinks,
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
