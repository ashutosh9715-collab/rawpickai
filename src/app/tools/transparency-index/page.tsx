import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "AI Tool Pricing Transparency Index: 50 Tools Rated on Honesty",
  description: "We rated 50 AI tools on pricing clarity, hidden caps, free tier honesty, and credit card requirements. 79% hide enterprise pricing. See every score.",
  alternates: { canonical: "https://rawpickai.com/tools/transparency-index" },
  openGraph: {
    title: "AI Tool Pricing Transparency Index",
    description: "50 AI tools rated on pricing honesty. 79% hide enterprise pricing. Full scores and methodology.",
    url: "https://rawpickai.com/tools/transparency-index",
    type: "website",
  },
};

export default function Page() {
  return <Client />;
}
