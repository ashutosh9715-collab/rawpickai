import { NextResponse } from "next/server";

/**
 * Feedback API — records thumbs up/down votes per content slug.
 *
 * Storage: Vercel KV (Upstash Redis under the hood). If KV env vars are not
 * configured, the route silently no-ops and returns synthetic counts so the
 * widget still works in dev or before KV is enabled in production.
 *
 * Keys (KV):
 *   feedback:<slug>:up    → integer counter
 *   feedback:<slug>:down  → integer counter
 *
 * Cookie-based dedup: a vote sets a 30-day cookie `rpai_v_<slug>` so the
 * same browser cannot vote twice on the same slug.
 *
 * GET  /api/feedback?slug=foo    → { up, down }
 * POST /api/feedback             → body: { slug, vote: "up" | "down" }
 *                                  → { up, down, alreadyVoted: bool }
 */

export const runtime = "edge";

type Counts = { up: number; down: number };

// Lazy KV import — if @vercel/kv is unavailable or env vars missing, fall back.
async function getKv(): Promise<typeof import("@vercel/kv").kv | null> {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return null;
  }
  try {
    const mod = await import("@vercel/kv");
    return mod.kv;
  } catch {
    return null;
  }
}

function sanitizeSlug(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  // Allow only alphanumerics, hyphens, underscores, and slashes (for "/review/foo" style)
  if (!/^[a-zA-Z0-9/_-]{1,200}$/.test(raw)) return null;
  return raw;
}

async function readCounts(slug: string): Promise<Counts> {
  const kv = await getKv();
  if (!kv) return { up: 0, down: 0 };
  try {
    const [up, down] = await Promise.all([
      kv.get<number>(`feedback:${slug}:up`),
      kv.get<number>(`feedback:${slug}:down`),
    ]);
    return { up: up ?? 0, down: down ?? 0 };
  } catch {
    return { up: 0, down: 0 };
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const slug = sanitizeSlug(url.searchParams.get("slug"));
  if (!slug) {
    return NextResponse.json({ error: "invalid slug" }, { status: 400 });
  }
  const counts = await readCounts(slug);
  return NextResponse.json(counts, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const b = body as { slug?: unknown; vote?: unknown };
  const slug = sanitizeSlug(b.slug);
  const vote = b.vote === "up" || b.vote === "down" ? b.vote : null;
  if (!slug || !vote) {
    return NextResponse.json({ error: "invalid slug or vote" }, { status: 400 });
  }

  // Cookie dedup — once per slug per browser per 30 days.
  const cookieHeader = req.headers.get("cookie") || "";
  const cookieName = `rpai_v_${slug.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
  const alreadyVoted = cookieHeader.split(";").some((c) => c.trim().startsWith(`${cookieName}=`));

  if (alreadyVoted) {
    const counts = await readCounts(slug);
    return NextResponse.json({ ...counts, alreadyVoted: true }, {
      headers: { "Cache-Control": "no-store" },
    });
  }

  const kv = await getKv();
  let counts: Counts = { up: 0, down: 0 };
  if (kv) {
    try {
      const newVal = await kv.incr(`feedback:${slug}:${vote}`);
      const otherKey = vote === "up" ? "down" : "up";
      const otherVal = (await kv.get<number>(`feedback:${slug}:${otherKey}`)) ?? 0;
      counts = vote === "up" ? { up: newVal, down: otherVal } : { up: otherVal, down: newVal };
    } catch {
      // KV failed — return zeros, widget will still show success
      counts = { up: 0, down: 0 };
    }
  }

  const res = NextResponse.json({ ...counts, alreadyVoted: false }, {
    headers: { "Cache-Control": "no-store" },
  });
  // 30-day vote-lock cookie
  res.headers.append(
    "Set-Cookie",
    `${cookieName}=${vote}; Path=/; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax; HttpOnly`
  );
  return res;
}
