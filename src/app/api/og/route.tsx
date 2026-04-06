import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "RawPickAI";
  const type = searchParams.get("type") || "Review";
  const score = searchParams.get("score") || "";
  const category = searchParams.get("category") || "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#2D3A28",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top bar: logo + type badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Crosshair logo */}
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "#D4E4C8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: 700,
                color: "#2D3A28",
              }}
            >
              ◎
            </div>
            <span style={{ fontSize: "24px", fontWeight: 600, color: "#D4E4C8" }}>RawPickAI</span>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            {type && (
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  padding: "6px 20px",
                  borderRadius: "100px",
                  backgroundColor: "rgba(212, 228, 200, 0.15)",
                  color: "#D4E4C8",
                }}
              >
                {type}
              </span>
            )}
            {category && (
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  padding: "6px 20px",
                  borderRadius: "100px",
                  backgroundColor: "rgba(212, 228, 200, 0.15)",
                  color: "#8AB47D",
                }}
              >
                {category}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 60 ? "42px" : "52px",
            fontWeight: 700,
            color: "#D4E4C8",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            flex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          {title}
        </div>

        {/* Bottom bar: score + tagline */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "18px", color: "#8AB47D" }}>Independent AI Tool Reviews · rawpickai.com</span>
          {score && (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "48px", fontWeight: 700, color: "#D4E4C8" }}>{score}</span>
              <span style={{ fontSize: "20px", color: "#8AB47D" }}>/5</span>
            </div>
          )}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
