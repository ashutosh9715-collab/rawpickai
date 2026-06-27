import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: 'AI Tool Pricing Calculator — USD to INR Converter',
  description: "Convert any AI tool's pricing between USD and INR instantly. Live exchange rate, monthly and annual breakdowns.",
  alternates: { canonical: 'https://rawpickai.com/tools/pricing-calculator' },
};

export default function Page() {
  return <Client />;
}
