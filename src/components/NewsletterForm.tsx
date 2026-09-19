"use client";

import { useState } from "react";

export default function NewsletterForm({ variant = "default" }: { variant?: "default" | "inline" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("You're in! Check your inbox Tuesday.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Connection error. Try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-3">
        <div className="text-lg font-semibold heading" style={{ color: "var(--sage-dark)" }}>
          ✓ {message}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-0 max-w-[400px] mx-auto sm:rounded-full sm:p-[5px] sm:border" style={{ background: "transparent", borderColor: variant === "inline" ? "var(--border)" : "var(--sage)" }}>
      <input
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
        placeholder="your@email.com"
        required
        className="flex-1 border outline-none px-4 py-2.5 text-sm rounded-full bg-white"
        style={{ borderColor: "var(--sage)" }}
        disabled={status === "loading"}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary !rounded-full !py-2.5 !px-5 !text-sm whitespace-nowrap"
        style={{ opacity: status === "loading" ? 0.7 : 1 }}
      >
        {status === "loading" ? "..." : "Subscribe"}
      </button>
    </form>
  );
}
