import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: 'AI Tool Price Tracker (USD + INR) — Updated Weekly',
  description: 'Live pricing for 18+ AI tools in USD and INR. ChatGPT, Claude, Cursor, Midjourney, Perplexity, and more. Updated weekly.',
  alternates: { canonical: 'https://rawpickai.com/tools/price-tracker' },
};

export default function Page() {
  return <Client />;
}
