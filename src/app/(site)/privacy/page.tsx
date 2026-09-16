import { Shell } from "@/components/ui/page";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <section className="py-10 sm:py-14">
      <Shell className="max-w-[92vw] lg:max-w-[820px]">
        <h1 className="text-3xl font-bold tracking-tight text-ink">
          Privacy Policy
        </h1>

        <p className="mt-2 text-[12px] text-faint">Last updated {new Date().getFullYear()}</p>

        <div className="prose-none mt-6 space-y-6 text-[13px] leading-6 text-muted">
          <Section title="What we collect">
            When you create an account, place an order, or message our
            atelier, we collect your name, contact details, delivery address
            and — where you choose to save them — your measurements and
            those of the people you order for.
          </Section>

          <Section title="How we use it">
            Your information is used to process orders, tailor garments to
            the measurements you provide, communicate about your order or
            enquiry, and improve the pieces and sizes we offer. We do not
            sell your personal information.
          </Section>

          <Section title="Measurements">
            Measurements you save are visible only to you and to our
            tailoring staff, for the purpose of making your garments. You
            can edit or delete a saved measurement at any time from your
            account.
          </Section>

          <Section title="Payment information">
            We do not store full card numbers. Payments are processed by
            our payment partners, and cash-on-delivery orders are settled at
            the time of delivery.
          </Section>

          <Section title="Your rights">
            You can request a copy of the data we hold about you, ask us to
            correct it, or ask us to delete your account, by messaging us
            through the chat on this site.
          </Section>

          <Section title="Contact">
            Questions about this policy can be sent through the chat widget
            or the Support page.
          </Section>
        </div>
      </Shell>
    </section>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="mb-2 text-[15px] font-semibold text-ink">{title}</h2>
      <p>{children}</p>
    </div>
  );
}
