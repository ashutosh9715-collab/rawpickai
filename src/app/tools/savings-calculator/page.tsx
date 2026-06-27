import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: 'AI Savings Calculator — How Much Will Your Team Save?',
  description: 'Calculate how much time and money your team saves by adopting AI tools. Hours per week, dollars per month, ROI breakdown.',
  alternates: { canonical: 'https://rawpickai.com/tools/savings-calculator' },
};

export default function Page() {
  return <Client />;
}
