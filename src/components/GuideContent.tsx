type Props = { html: string };

export default function GuideContent({ html }: Props) {
  return (
    <div className="max-w-[800px] mx-auto px-5 md:px-10 mt-12 mb-8">
      <div
        className="prose-content tool-guide"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className="mt-8 pt-6 text-xs" style={{ borderTop: "0.5px solid var(--border)", color: "var(--text-light)" }}>
        Last updated April 2026 · Pricing at ₹93/USD
      </div>
    </div>
  );
}
