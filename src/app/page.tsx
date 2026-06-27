import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: { absolute: 'RawPickAI — Independent AI Tool Reviews & Comparisons' },
  description: 'Find the right AI tool for your workflow. We test every tool ourselves and score them honestly. Independent reviews, side-by-side comparisons, and pricing in INR. No sponsored rankings, ever.',
  alternates: { canonical: 'https://rawpickai.com' },
};

export default function Page() {
  return <Client />;
}
