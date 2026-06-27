import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: 'Which AI Tool Should I Use? Free Quiz',
  description: 'Answer 5 questions and get personalized AI tool recommendations. Free, no signup. Tested across writing, coding, image, video, and research tools.',
  alternates: { canonical: 'https://rawpickai.com/tools/quiz' },
};

export default function Page() {
  return <Client />;
}
