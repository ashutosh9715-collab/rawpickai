import Link from "next/link";

/**
 * Inline mid-article callout that nudges readers to the AI tool fit quiz.
 * Renders inside review and comparison pages between content sections.
 * Sage-green theme, no external deps, no JS state.
 */
export default function QuizCallout() {
  return (
    <div
      className="my-8 not-prose"
      style={{
        background: "#F0F4EC",
        borderLeft: "3px solid var(--sage-dark, #6B8E5A)",
        borderRadius: "0 8px 8px 0",
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: "36px",
          height: "36px",
          background: "var(--sage-dark, #6B8E5A)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-hidden="true"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#2D3D23",
            marginBottom: "2px",
            lineHeight: 1.4,
          }}
        >
          Not sure which AI tool fits your workflow?
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "#5F6B52",
            lineHeight: 1.5,
          }}
        >
          Answer 5 quick questions — we&apos;ll recommend the AI that matches how you actually work.
        </div>
      </div>
      <Link
        href="/tools/quiz"
        style={{
          flexShrink: 0,
          fontSize: "12px",
          fontWeight: 500,
          color: "#FFFFFF",
          background: "#4A6B3A",
          padding: "8px 14px",
          borderRadius: "6px",
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
      >
        Take quiz →
      </Link>
    </div>
  );
}
