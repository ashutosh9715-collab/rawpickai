import { Metadata } from "next";
import Link from "next/link";
import { getReviewBySlug, getAllReviewSlugs, whatsNewMap, getRelatedContent } from "@/lib/content";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import TableOfContents from "@/components/TableOfContents";
import RelatedPosts from "@/components/RelatedPosts";
import WhatsNewBanner from "@/components/WhatsNewBanner";
import StickyBottomBar from "@/components/StickyBottomBar";
import FeedbackWidget from "@/components/FeedbackWidget";
import QuizCallout from "@/components/QuizCallout";
import InlineReadNext from "@/components/InlineReadNext";
import { splitHtmlAtH2 } from "@/lib/htmlSplit";

type Props = { params: Promise<{ slug: string }> };

function getApplicationCategory(category: string): string {
  const map: Record<string, string> = {
    "Code Assistants": "DeveloperApplication",
    "Image Generation": "GraphicsApplication",
    "Writing & Content": "BusinessApplication",
    "Video & Audio": "MultimediaApplication",
    "Productivity & Presentations": "BusinessApplication",
    "AI Assistants": "WebApplication",
    "Design": "GraphicsApplication",
    "Marketing & SEO": "BusinessApplication",
    "Research": "WebApplication",
  };
  return map[category] || "WebApplication";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = await getReviewBySlug(slug);
  if (!r) return { title: "Review Not Found" };
  const fm = r.frontmatter;
  const overall = fm.scores?.overall || fm.overallScore || "";
  const ogUrl = `https://rawpickai.com/api/og?title=${encodeURIComponent(fm.title)}&type=Review&score=${overall}&category=${encodeURIComponent(fm.category || "")}`;
  return {
    title: fm.title,
    description: fm.description || "",
    alternates: { canonical: `https://rawpickai.com/review/${slug}` },
    openGraph: {
      title: fm.title,
      description: fm.description || "",
      url: `https://rawpickai.com/review/${slug}`,
      type: "article",
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", images: [ogUrl] },
  };
}

export async function generateStaticParams() {
  return getAllReviewSlugs().map((slug) => ({ slug }));
}

function Bar({ label, value }: { label: string; value: number }) {
  const pct = value <= 5 ? (value / 5) * 100 : value;
  const color = pct >= 80 ? "#22c55e" : pct >= 60 ? "#f59e0b" : "#ef4444";
  const display = value <= 5 ? value.toFixed(1) : Math.round(value);
  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "6px" }}>
        <span style={{ color: "var(--text-mid)" }}>{label}</span>
        <span style={{ fontWeight: 500, color }}>{display}</span>
      </div>
      <div style={{ height: "3px", background: "var(--border)", borderRadius: "2px" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: "2px" }} />
      </div>
    </div>
  );
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params;
  const review = await getReviewBySlug(slug);
  if (!review) notFound();

  const fm = review.frontmatter;
  const scores = fm.scores || {};
  const overall = scores.overall || fm.overallScore;
  const toolName = fm.toolName || fm.title.split(" Review")[0].split(":")[0].replace(/"/g, "");

  const pricingDisplay =
    fm.pricingUSD
      ? fm.pricingUSD
      : fm.pricing?.plans?.[1]
      ? `$${fm.pricing.plans[1].priceUSD}/mo (~₹${fm.pricing.plans[1].priceINR})`
      : "See review";

  const fts = scores.freeTier;
  const ftNorm = !fts ? 0 : fts <= 5 ? fts : fts / 20;
  const ftLabel = ftNorm >= 4 ? "Excellent" : ftNorm >= 3 ? "Good" : ftNorm >= 2 ? "Limited" : fts && fts > 40 ? "Poor" : fts ? "None (free credits)" : "N/A";
  const ftColor = ftLabel === "Excellent" || ftLabel === "Good" ? "#22c55e" : ftLabel === "Limited" ? "#f59e0b" : ftLabel === "Poor" ? "#ef4444" : ftLabel === "None (free credits)" ? "#ef4444" : "#6B6960";

  // Look for explicit verdict markers in the content body. Matches these patterns:
  //   **Bottom line:** ...
  //   **The verdict:** / **My verdict:** / **Verdict:** / **My recommendation:** / **My take:**
  //   **Final verdict:** ...
  // We strip leading markdown chars and capture the first sentence only.
  // We skip if the captured text starts with an image embed (![...).
  let verdict = "";
  const verdictPatterns = [
    /\*\*(?:Bottom line|The verdict|My verdict|Verdict|Final verdict|My recommendation|My take|My honest take):\*\*\s*([^\n]+?)(?:\.|$)/i,
  ];
  for (const pattern of verdictPatterns) {
    const match = review.content.match(pattern);
    if (match && match[1]) {
      const captured = match[1].replace(/^[\s*_>-]+/, "").trim();
      // Skip image embeds and very short captures
      if (captured.startsWith("![") || captured.startsWith("[") || captured.length < 30) continue;
      verdict = captured;
      // Add period if missing
      if (verdict && !verdict.match(/[.!?]$/)) verdict += ".";
      break;
    }
  }
  if (!verdict) verdict = "";

  const hasFree = fm.pricing?.plans?.[0]?.priceUSD === 0 || fm.pricing?.plans?.[0]?.priceUSD === "0";
  const priceUSD = fm.pricing?.plans?.[1]?.priceUSD;
  const priceINR = fm.pricing?.plans?.[1]?.priceINR;

  // SEO FIX 1: SoftwareApplication schema — enables Google star ratings in SERPs
  const reviewSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `https://rawpickai.com/review/${slug}#software`,
        name: toolName,
        applicationCategory: getApplicationCategory(fm.category || ""),
        operatingSystem: "Web",
        ...(overall && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: overall,
            bestRating: 5,
            worstRating: 1,
            ratingCount: 1,
            reviewCount: 1,
          },
        }),
        ...(priceUSD !== undefined && {
          offers: {
            "@type": "Offer",
            price: hasFree ? "0" : String(priceUSD),
            priceCurrency: "USD",
            description: pricingDisplay,
          },
        }),
      },
      {
        "@type": "Review",
        "@id": `https://rawpickai.com/review/${slug}#review`,
        name: fm.title,
        reviewBody: fm.description || "",
        itemReviewed: { "@id": `https://rawpickai.com/review/${slug}#software` },
        author: {
          "@type": "Person",
          name: "Ashutosh Khulbe",
          alternateName: "Ash",
          url: "https://rawpickai.com/about",
          "@id": "https://rawpickai.com/about#ashutosh-khulbe",
        },
        publisher: { "@type": "Organization", name: "RawPickAI", url: "https://rawpickai.com" },
        datePublished: fm.lastUpdated,
        dateModified: fm.lastUpdated,
        reviewRating: overall
          ? { "@type": "Rating", ratingValue: overall, bestRating: 5, worstRating: 1 }
          : undefined,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://rawpickai.com" },
          { "@type": "ListItem", position: 2, name: "Reviews", item: "https://rawpickai.com/tools" },
          { "@type": "ListItem", position: 3, name: toolName, item: `https://rawpickai.com/review/${slug}` },
        ],
      },
    ],
  };

  // SEO FIX 2: Per-tool FAQ schema — captures long-tail queries like "is X free?"
  const category = (fm.category as string) || "AI tool";
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Is ${toolName} free?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: hasFree
            ? `Yes, ${toolName} has a free plan. ${priceUSD ? `The paid plan starts at $${priceUSD}/month${priceINR ? ` (≈₹${priceINR}/month)` : ""}.` : "See our full review for current pricing."}`
            : `${toolName} does not have a permanently free plan. ${priceUSD ? `Plans start at $${priceUSD}/month${priceINR ? ` (≈₹${priceINR}/month)` : ""}.` : "See our full review for pricing."}`,
        },
      },
      {
        "@type": "Question",
        name: `Is ${toolName} worth it in ${new Date().getFullYear()}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `In our hands-on testing, ${toolName} scored ${overall}/5 overall. We evaluate on Ease of Use, Output Quality, Value for Money, Feature Depth, and Free Tier. Read our full review at rawpickai.com/review/${slug} for a complete breakdown.`,
        },
      },
      {
        "@type": "Question",
        name: `How much does ${toolName} cost in India?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: priceINR
            ? `${toolName}'s paid plan costs $${priceUSD}/month, approximately ₹${priceINR}/month at current exchange rates. ${hasFree ? "A free plan is also available." : ""}`
            : `${toolName}'s INR pricing varies with exchange rates. See our full review for the latest pricing in both USD and INR.`,
        },
      },
      {
        "@type": "Question",
        name: `What is ${toolName} used for?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${toolName} is an ${category} tool tested independently by RawPickAI. Read our full hands-on review at rawpickai.com/review/${slug} for detailed use cases, features, pricing in USD and INR, and an honest verdict on who should use it.`,
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="relative">
        <div className="max-w-[760px] mx-auto px-5 md:px-10 py-8 md:py-10 pb-0">
          <PageHero
            title={fm.title}
            description={fm.description || ""}
            breadcrumbs={[{ label: "Home", href: "/" }, { label: "Reviews", href: "/tools" }, { label: toolName }]}
            pills={[...(fm.category ? [{ label: fm.category, variant: "dark" as const }] : []), { label: `Updated ${fm.lastUpdated}` }]}
            author={fm.author || "Ash"}
          />

          <div className="flex flex-col md:flex-row gap-4 mb-8" style={{ alignItems: "stretch" }}>
            {(scores.easeOfUse || scores.outputQuality) && (
              <div className="flex-shrink-0 w-full md:w-[200px]" style={{ background: "var(--cream)", borderRadius: "12px", padding: "20px", border: "0.5px solid var(--border)" }}>
                <div style={{ textAlign: "center", marginBottom: "16px" }}>
                  {overall && <div className="heading" style={{ fontSize: "42px", fontWeight: 500, color: "#B8860B", lineHeight: 1 }}>{typeof overall === "number" ? overall.toFixed(1) : overall}</div>}
                  <div style={{ fontSize: "12px", color: "var(--text-light)", marginTop: "4px" }}>out of 5</div>
                </div>
                {scores.easeOfUse ? <Bar label="Ease of use" value={scores.easeOfUse} /> : null}
                {scores.outputQuality ? <Bar label="Output quality" value={scores.outputQuality} /> : null}
                {scores.valueForMoney ? <Bar label="Value" value={scores.valueForMoney} /> : null}
                {scores.featureDepth ? <Bar label="Features" value={scores.featureDepth} /> : null}
                {scores.freeTier ? <Bar label="Free tier" value={scores.freeTier} /> : null}
              </div>
            )}

            <div className="flex-1 flex flex-col gap-3">
              {verdict && (
                <div className="flex-1 rounded-xl" style={{ background: "var(--sage-light)", padding: "20px 24px", borderLeft: "4px solid var(--sage-dark)" }}>
                  <div className="text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: "var(--sage-mid)", letterSpacing: "0.06em" }}>Our verdict</div>
                  <p className="text-sm leading-relaxed m-0" style={{ color: "var(--sage-dark)" }}>{verdict}</p>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="rounded-[10px] p-3" style={{ background: "var(--cream)", border: "0.5px solid var(--border)" }}>
                  <div className="text-[10px] mb-0.5" style={{ color: "var(--text-light)" }}>Price</div>
                  <div className="text-[13px] font-medium">{pricingDisplay}</div>
                </div>
                <div className="rounded-[10px] p-3" style={{ background: "var(--cream)", border: "0.5px solid var(--border)" }}>
                  <div className="text-[10px] mb-0.5" style={{ color: "var(--text-light)" }}>Free tier</div>
                  <div className="text-[13px] font-medium" style={{ color: ftColor }}>{ftLabel}</div>
                </div>
              </div>
            </div>
          </div>

          {/* What's New Banner */}
          {whatsNewMap[slug] && (
            <WhatsNewBanner label="New" text={whatsNewMap[slug].text} href={whatsNewMap[slug].href} />
          )}
        </div>

        <div className="max-w-[760px] mx-auto px-5 md:px-10 pb-16 md:pb-20 prose-counter-scope">
          <TableOfContents htmlContent={review.htmlContent} />
          {(() => {
            const related = getRelatedContent(slug, fm.category || "", "review");
            const chunks = splitHtmlAtH2(review.htmlContent, [0.55, 0.78]);
            // Fallback: if article too short to split, render as one block.
            if (!chunks[1] && !chunks[2]) {
              return <div className="prose-content" dangerouslySetInnerHTML={{ __html: review.htmlContent }} />;
            }
            return (
              <>
                <div className="prose-content" dangerouslySetInnerHTML={{ __html: chunks[0] }} />
                <QuizCallout />
                <div className="prose-content" dangerouslySetInnerHTML={{ __html: chunks[1] }} />
                <InlineReadNext item={related[0]} />
                <div className="prose-content" dangerouslySetInnerHTML={{ __html: chunks[2] }} />
              </>
            );
          })()}

          {/* Related Posts */}
          <RelatedPosts items={getRelatedContent(slug, fm.category || "", "review").slice(1)} />

          <FeedbackWidget slug={slug} contentType="review" />

          {/* Compare CTA */}
          <div className="mt-8 rounded-xl p-5 flex items-center justify-between gap-4" style={{ background: "var(--sage-light)" }}>
            <div>
              <div className="heading text-sm font-semibold mb-1" style={{ color: "var(--sage-dark)" }}>How does {toolName} compare?</div>
              <div className="text-xs" style={{ color: "var(--text-mid)" }}>Pick another tool and see scores side-by-side</div>
            </div>
            <Link href="/tools/compare" className="text-sm font-semibold px-4 py-2 rounded-lg flex-shrink-0" style={{ background: "var(--sage-dark)", color: "var(--sage)" }}>
              Compare →
            </Link>
          </div>

          <div className="mt-8 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3" style={{ borderTop: "0.5px solid var(--border)" }}>
            <Link href="/tools" className="text-sm font-medium" style={{ color: "var(--sage-dark)" }}>← All reviews</Link>
            <div className="text-right">
              <span className="text-xs mono block" style={{ color: "var(--text-light)" }}>Tested and reviewed by Ash · Last updated: {fm.lastUpdated}</span>
              <span className="text-xs mono block mt-0.5" style={{ color: "var(--text-light)" }}>Pricing verified at ≈₹93/USD · Scores based on hands-on testing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      {whatsNewMap[slug] && (
        <StickyBottomBar title={whatsNewMap[slug].text} href={whatsNewMap[slug].href} />
      )}
    </>
  );
}
