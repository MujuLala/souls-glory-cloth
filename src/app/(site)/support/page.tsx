import SupportHero from "@/components/support/SupportHero";
import SupportQuickLinks from "@/components/support/SupportQuickLinks";
import SupportFAQ from "@/components/support/SupportFAQ";
import SupportOrderHelp from "@/components/support/SupportOrderHelp";
import SupportTailoring from "@/components/support/SupportTailoring";
import SupportContact from "@/components/support/SupportContact";

export default function SupportPage() {
  return (
    <main className="sgc-support min-h-screen bg-[#050505] text-white">
      <SupportHero />
      <SupportQuickLinks />
      <SupportFAQ />
      <SupportOrderHelp />
      <SupportTailoring />
      <SupportContact />
    </main>
  );
}
