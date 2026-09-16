import SupportHero from "@/components/support/SupportHero";
import SupportQuickLinks from "@/components/support/SupportQuickLinks";
import SupportFAQ from "@/components/support/SupportFAQ";
import SupportOrderHelp from "@/components/support/SupportOrderHelp";
import SupportTailoring from "@/components/support/SupportTailoring";
import SupportContact from "@/components/support/SupportContact";

export const metadata = {
  title: "Support",
  description: "Order help, measurement guidance and ways to reach our team.",
};

export default function SupportPage() {
  return (
    <main>
      <SupportHero />
      <SupportQuickLinks />
      <SupportFAQ />
      <SupportOrderHelp />
      <SupportTailoring />
      <SupportContact />
    </main>
  );
}
