import { Metadata } from "next";
import PageHero from "@/components/PageHero";
export const metadata: Metadata = { title: "Privacy Policy — RawPickAI", description: "What data we collect, how we use it, and your rights.", alternates: { canonical: "https://rawpickai.com/privacy" } };
export default function PrivacyPage() {
  return (
    <div className="max-w-[760px] mx-auto px-5 md:px-10 py-10 pb-20">
      <PageHero title="Privacy Policy" description="Effective April 1, 2026. We collect minimal data and never sell your personal information." breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} pills={[{ label: "Legal", variant: "dark" }, { label: "Updated Apr 2026" }]} />
      <div className="prose-content">
        <h2>Information we collect</h2>
        <p><strong>Analytics data.</strong> We use Google Analytics to understand how visitors use our site. This data is aggregated and anonymized.</p>
        <p><strong>Email address.</strong> If you subscribe to our newsletter, we collect your email address solely to send you our Tuesday newsletter.</p>
        <p><strong>Cookies.</strong> We use essential cookies and analytics cookies through Google Analytics.</p>
        <h2>Information we do not collect</h2>
        <p>We do not collect passwords, payment information, phone numbers, or any form of government identification.</p>
        <h2>Your rights</h2>
        <p>To unsubscribe from the newsletter, click &quot;Unsubscribe&quot; at the bottom of any email. To request data deletion, email <strong>hello@rawpickai.com</strong>.</p>
        <h2>Contact</h2>
        <p>Questions about this policy? Email <strong>hello@rawpickai.com</strong>.</p>
      </div>
    </div>
  );
}
