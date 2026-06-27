import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: 'AI Tool Finder — Build Your AI Stack in 4 Questions',
  description: 'Answer 4 questions, get a personalized AI tool stack with total cost in USD and INR. Free, no signup. Updated weekly.',
  alternates: { canonical: 'https://rawpickai.com/tools/ai-tool-finder' },
};

export default function Page() {
  return <Client />;
}
