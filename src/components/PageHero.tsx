import Link from "next/link";

interface PageHeroProps {
  title: string;
  description?: string;
  breadcrumbs: { label: string; href?: string }[];
  pills?: { label: string; variant?: "dark" | "light" }[];
  author?: string;
  readTime?: string;
}

export default function PageHero({ title, description, breadcrumbs, pills, author, readTime }: PageHeroProps) {
  return (
    <>
      {/* Breadcrumb */}
      <div className="text-xs mb-5" style={{ color: "var(--text-light)" }}>
        {breadcrumbs.map((b, i) => (
          <span key={i}>
            {i > 0 && <span className="mx-1.5">›</span>}
            {b.href ? (
              <Link href={b.href} className="hover:underline">{b.label}</Link>
            ) : (
              <span style={{ color: "var(--text-mid)" }}>{b.label}</span>
            )}
          </span>
        ))}
      </div>

      {/* Sage green hero banner */}
      <div
        className="rounded-[16px] mb-6"
        style={{ background: "var(--sage-light)", padding: "28px 24px 20px" }}
      >
        {pills && pills.length > 0 && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {pills.map((p, i) => (
              <span
                key={i}
                className="text-[11px] font-medium px-3.5 py-1 rounded-full"
                style={
                  p.variant === "dark"
                    ? { background: "var(--sage-dark)", color: "var(--sage)" }
                    : { background: "rgba(255,255,255,0.7)", color: "var(--sage-mid)" }
                }
              >
                {p.label}
              </span>
            ))}
          </div>
        )}

        <h1
          className="heading font-medium leading-[1.15] mb-0 text-[24px] md:text-[32px]"
          style={{ color: "var(--sage-dark)", letterSpacing: "-0.02em" }}
        >
          {title}
        </h1>

        {description && (
          <p className="text-[15px] leading-relaxed mt-3 mb-0 max-w-[560px]" style={{ color: "var(--sage-mid)" }}>
            {description}
          </p>
        )}

        {(author || readTime) && (
          <div className="flex items-center gap-2 mt-5 text-[13px]" style={{ color: "var(--sage-mid)" }}>
            {author && (
              <>
                <img
                  src="/authors/ash.jpg"
                  alt={author}
                  width={28}
                  height={28}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "1.5px solid var(--sage-dark)",
                    flexShrink: 0,
                  }}
                />
                <span>By</span>
                <span className="font-medium" style={{ color: "var(--sage-dark)" }}>{author}</span>
              </>
            )}
            {readTime && (
              <>
                <span className="ml-1.5">·</span>
                <span className="ml-1.5">{readTime}</span>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
