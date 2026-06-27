import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: 'AI Tool Free Tier Comparison — Every Free Plan Ranked',
  description: 'Every AI tool free tier ranked. Filter by category, sort by quality. ChatGPT, Claude, Gemini, Perplexity, Midjourney, and more.',
  alternates: { canonical: 'https://rawpickai.com/tools/free-tier-comparison' },
};

export default function Page() {
  return <Client />;
}
