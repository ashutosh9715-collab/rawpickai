import { Metadata } from "next";
import PageHero from "@/components/PageHero";
export const metadata: Metadata = { title: "Contact RawPickAI", description: "Have a question, tool suggestion, or business inquiry? Contact us.", alternates: { canonical: "https://rawpickai.com/contact" } };
export default function ContactPage() {
  return (
    <div className="max-w-[760px] mx-auto px-5 md:px-10 py-10 pb-20">
      <PageHero title="Contact Us" description="We read and respond to every message. Questions, tool suggestions, or business inquiries — we'd like to hear from you." breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]} pills={[{ label: "Contact", variant: "dark" }]} />
      <div className="prose-content">
        <h2>General inquiries</h2>
        <p>Email us at <strong>hello@rawpickai.com</strong>. We aim to respond within 48 hours on weekdays.</p>
        <h2>Business & partnerships</h2>
        <p>Reach out at <strong>hello@rawpickai.com</strong> with the subject line &quot;Business Inquiry.&quot; Submitting a tool for review does not guarantee a positive score.</p>
        <h2>Found an error?</h2>
        <p>Drop us a quick email with the page URL and what needs updating. We&apos;ll prioritize a refresh.</p>
      </div>
    </div>
  );
}
