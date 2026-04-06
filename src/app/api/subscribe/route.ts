import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const LOOPS_API_KEY = process.env.LOOPS_API_KEY;

    if (!LOOPS_API_KEY) {
      // If no API key configured yet, just log and return success
      // This lets the form work during development
      console.log("Newsletter signup (no Loops key configured):", email);
      return NextResponse.json({ success: true, message: "Subscribed (dev mode)" });
    }

    const res = await fetch("https://app.loops.so/api/v1/contacts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOOPS_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        source: "rawpickai.com",
        subscribed: true,
      }),
    });

    const data = await res.json();

    if (res.ok || data.id) {
      return NextResponse.json({ success: true });
    }

    // Handle "already exists" as success
    if (data.message?.includes("already")) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: data.message || "Subscription failed" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
