import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: 'AI Tool Cost Calculator — Find Tools That Fit Your Budget',
  description: 'Set your monthly budget in USD or INR and see exactly which AI tools fit. Compare pricing across 20+ tools instantly.',
  alternates: { canonical: 'https://rawpickai.com/tools/cost-calculator' },
};

export default function Page() {
  return <Client />;
}
