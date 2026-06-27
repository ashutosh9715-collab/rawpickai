import Link from "next/link";

type Props = { label: string; text: string; href: string };

export default function WhatsNewBanner({ label, text, href }: Props) {
  return (
    <Link href={href}>
      <div className="flex items-center justify-between gap-3 mb-6" style={{ background: "#E6F1FB", borderRadius: "8px", padding: "10px 16px" }}>
        <div className="flex items-center gap-2 min-w-0">
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#0C447C", background: "#B5D4F4", padding: "2px 8px", borderRadius: "20px", flexShrink: 0 }}>{label}</span>
          <span className="truncate" style={{ fontSize: "13px", color: "#0C447C" }}>{text}</span>
        </div>
        <span className="flex-shrink-0" style={{ fontSize: "12px", fontWeight: 600, color: "#185FA5" }}>Read →</span>
      </div>
    </Link>
  );
}
