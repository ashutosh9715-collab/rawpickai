import { redirect } from "next/navigation";
import { getAllToolSlugs } from "@/data/tools";

export async function generateStaticParams() {
  return getAllToolSlugs().map((slug) => ({ slug }));
}

export default async function ToolRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/review/${slug}`);
}
