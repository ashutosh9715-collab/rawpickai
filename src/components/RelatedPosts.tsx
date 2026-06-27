import Link from "next/link";

type RelatedItem = { title: string; href: string; type: string; date: string };

const typeColors: Record<string, { bg: string; text: string }> = {
  Blog: { bg: "#E1F5EE", text: "#0F6E56" },
  Comparison: { bg: "#EEEDFE", text: "#534AB7" },
  Review: { bg: "#FAECE7", text: "#993C1D" },
  "Best Of": { bg: "#FEF9C3", text: "#A16207" },
  News: { bg: "#E8F4F8", text: "#1A6B8A" },
};

export default function RelatedPosts({ items }: { items: RelatedItem[] }) {
  if (!items.length) return null;

  const primary = items[0];
  const rest = items.slice(1, 4);
  const pc = typeColors[primary.type] || typeColors.Blog;

  return (
    <div style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "0.5px solid var(--border)" }}>
      <h2 className="heading" style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>What to read next</h2>

      {/* Primary recommendation — larger card */}
      <Link href={primary.href}>
        <div
          className="card-hover"
          style={{
            background: "var(--sage-light)",
            borderRadius: "12px",
            padding: "20px 22px",
            marginBottom: "12px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <span style={{ fontSize: "10px", fontWeight: 600, color: pc.text, background: pc.bg, padding: "2px 8px", borderRadius: "20px" }}>{primary.type}</span>
              <p className="heading" style={{ fontSize: "16px", fontWeight: 600, margin: "10px 0 6px", lineHeight: "1.35" }}>{primary.title}</p>
              <p style={{ fontSize: "12px", color: "var(--text-light)", margin: 0 }} className="mono">{primary.date}</p>
            </div>
            <span style={{ fontSize: "14px", color: "var(--sage-dark)", fontWeight: 600, flexShrink: 0, marginLeft: "16px", marginTop: "8px" }}>Read →</span>
          </div>
        </div>
      </Link>

      {/* Secondary recommendations */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {rest.map((item) => {
            const c = typeColors[item.type] || typeColors.Blog;
            return (
              <Link key={item.href} href={item.href}>
                <div className="card card-hover !py-3.5 !px-4 h-full">
                  <span style={{ fontSize: "10px", fontWeight: 600, color: c.text, background: c.bg, padding: "2px 8px", borderRadius: "20px" }}>{item.type}</span>
                  <p style={{ fontSize: "13px", fontWeight: 500, margin: "8px 0 4px", lineHeight: "1.35" }}>{item.title}</p>
                  <p style={{ fontSize: "11px", color: "var(--text-light)", margin: 0 }} className="mono">{item.date}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Quick action CTAs */}
      <div style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap" }}>
        <Link href="/tools/compare" style={{ fontSize: "12px", color: "var(--sage-dark)", fontWeight: 500, textDecoration: "none", padding: "6px 14px", borderRadius: "8px", background: "var(--cream)", border: "1px solid var(--border)" }}>
          Compare tools →
        </Link>
        <Link href="/tools/quiz" style={{ fontSize: "12px", color: "var(--sage-dark)", fontWeight: 500, textDecoration: "none", padding: "6px 14px", borderRadius: "8px", background: "var(--cream)", border: "1px solid var(--border)" }}>
          Find your tool →
        </Link>
      </div>
    </div>
  );
}
