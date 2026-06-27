"use client";

import { useState } from "react";
import Link from "next/link";
import Search from "./Search";
import ReadingProgressBar from "./ReadingProgressBar";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
    <nav className="max-w-[1140px] mx-auto px-5 md:px-10 py-4 flex justify-between items-center relative">
      <Link href="/" className="flex items-center gap-2.5">
        <svg width="36" height="36" viewBox="0 0 80 80" className="flex-shrink-0">
          <rect x="0" y="0" width="80" height="80" rx="18" fill="#2D3A28"/>
          <circle cx="40" cy="40" r="16" fill="none" stroke="#D4E4C8" strokeWidth="2"/>
          <circle cx="40" cy="40" r="8" fill="none" stroke="#D4E4C8" strokeWidth="2"/>
          <circle cx="40" cy="40" r="3" fill="#8AB47D"/>
          <line x1="40" y1="18" x2="40" y2="28" stroke="#D4E4C8" strokeWidth="2" strokeLinecap="round"/>
          <line x1="40" y1="52" x2="40" y2="62" stroke="#D4E4C8" strokeWidth="2" strokeLinecap="round"/>
          <line x1="18" y1="40" x2="28" y2="40" stroke="#D4E4C8" strokeWidth="2" strokeLinecap="round"/>
          <line x1="52" y1="40" x2="62" y2="40" stroke="#D4E4C8" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span className="heading text-lg font-semibold" style={{ letterSpacing: "-0.02em" }}>
          RawPickAI
        </span>
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-8">
        <Link href="/categories" className="text-[15px] text-[var(--text-mid)] hover:text-[var(--text)] transition-colors">
          Categories
        </Link>
        <Link href="/compare" className="text-[15px] text-[var(--text-mid)] hover:text-[var(--text)] transition-colors">
          Compare
        </Link>
        <Link href="/best" className="text-[15px] text-[var(--text-mid)] hover:text-[var(--text)] transition-colors">
          Best Of
        </Link>
        <Link href="/blog" className="text-[15px] text-[var(--text-mid)] hover:text-[var(--text)] transition-colors">
          Blog
        </Link>
        <Link href="/learn" className="text-[15px] text-[var(--text-mid)] hover:text-[var(--text)] transition-colors">
          Learn
        </Link>
        <Link href="/news" className="text-[15px] text-[var(--text-mid)] hover:text-[var(--text)] transition-colors">
          News
        </Link>
        <Link href="/studies" className="text-[15px] text-[var(--text-mid)] hover:text-[var(--text)] transition-colors">
          Research
        </Link>
        <Search />
        <Link
          href="/tools"
          className="flex items-center gap-1.5 text-sm font-semibold px-6 py-2.5 rounded-full border-[1.5px] border-[var(--text)] hover:bg-[rgba(0,0,0,0.03)] transition-colors"
        >
          Explore Tools <span className="text-xs">↗</span>
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-[5px] p-2"
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

      {/* Mobile menu dropdown */}
      {open && (
        <div
          className="absolute top-full left-0 right-0 z-50 md:hidden"
          style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)", padding: "16px 20px 20px" }}
        >
          <div className="flex flex-col gap-1">
            {[
              { href: "/tools", label: "Explore Tools" },
              { href: "/categories", label: "Categories" },
              { href: "/compare", label: "Compare" },
              { href: "/best", label: "Best Of" },
              { href: "/blog", label: "Blog" },
              { href: "/learn", label: "Learn" },
              { href: "/news", label: "News" },
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
    <ReadingProgressBar />
    </>
  );
}
