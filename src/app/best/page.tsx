import Link from "next/link";
import { getAllBestOf } from "@/lib/content";

export const metadata = {
  title: "Best AI Tools Lists",
  description: "Curated best-of lists for AI tools across writing, image generation, coding, video, and more. Tested and ranked by our team.",
  alternates: { canonical: "https://rawpickai.com/best" },
};

export default async function BestPage() {
  const bestOf = await getAllBestOf();

  return (
    <div className="max-w-[900px] mx-auto px-5 md:px-10 py-8 pb-20">
      <div className="text-xs mb-6" style={{ color: "var(--text-light)" }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-1.5">›</span>
        <span style={{ color: "var(--text-mid)" }}>Best Of</span>
      </div>

      <div className="mb-8">
        <h1 className="heading text-2xl md:text-4xl font-bold mb-2" style={{ letterSpacing: "-0.03em" }}>Best AI Tools Lists</h1>
        <p className="text-lg" style={{ color: "var(--text-mid)" }}>
          {bestOf.length} curated rankings based on our hands-on testing.
        </p>
      </div>

      <div className="grid gap-3">
        {bestOf.map((b) => {
          const fm = b.frontmatter;
          return (
            <Link key={b.slug} href={`/best-of/${b.slug}`}>
              <div className="card card-hover flex items-center gap-5 !py-5 !px-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                    <span className="heading text-base font-semibold">{fm.title.split(":")[0].split("(")[0].trim()}</span>
                    {fm.category && (
                      <span className="pill text-[10px]" style={{ background: "var(--warm)", color: "#B8860B" }}>{fm.category}</span>
                    )}
                  </div>
                  <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-mid)" }}>
                    {fm.description.length > 140 ? fm.description.slice(0, 140) + "..." : fm.description}
                  </p>
                </div>
                <span className="text-sm font-semibold flex-shrink-0" style={{ color: "var(--sage-dark)" }}>Read →</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
