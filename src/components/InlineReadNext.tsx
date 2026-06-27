import Link from "next/link";
import type { RelatedItem } from "@/lib/content";

/**
 * Inline "Read next" card injected at ~75% scroll point of long-form content.
 * Surfaces the most relevant related post mid-article so readers don't have
 * to scroll all the way down to discover the next thing to click.
 */
export default function InlineReadNext({ item }: { item: RelatedItem | undefined }) {
  if (!item) return null;
  return (
    <div
      className="my-8 not-prose"
      style={{
        background: "#FFFFFF",
        border: "0.5px solid var(--border, rgba(0,0,0,0.12))",
        borderRadius: "10px",
        padding: "16px 18px",
      }}
    >
      <div
        style={{
          fontSize: "10px",
          fontWeight: 500,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--sage-dark, #6B8E5A)",
          marginBottom: "8px",
        }}
      >
        Read next
      </div>
      <Link
        href={item.href}
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "block",
        }}
      >
        <div
          style={{
            fontSize: "15px",
            fontWeight: 500,
            color: "var(--text-dark, #1A1A1A)",
            marginBottom: "10px",
            lineHeight: 1.4,
          }}
        >
          {item.title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "11px",
            color: "var(--text-light, #888)",
            fontFamily: "var(--font-mono, ui-monospace, monospace)",
          }}
        >
          <span>{item.type}</span>
          <span>·</span>
          <span>{item.date}</span>
          <span
            style={{
              marginLeft: "auto",
              color: "var(--sage-dark, #6B8E5A)",
              fontWeight: 500,
            }}
          >
            Continue →
          </span>
        </div>
      </Link>
    </div>
  );
}
