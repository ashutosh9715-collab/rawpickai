import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: 'AI Tool Deals & Discounts — Verified Offers',
  description: 'Every verified AI tool discount, student offer, and free trial in one place. Updated weekly. Save on ChatGPT, Claude, Cursor, Midjourney, and more.',
  alternates: { canonical: 'https://rawpickai.com/deals' },
};

export default function Page() {
  return <Client />;
}
