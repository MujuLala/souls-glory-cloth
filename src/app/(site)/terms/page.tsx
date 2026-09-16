import { Shell } from "@/components/ui/page";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <section className="py-10 sm:py-14">
      <Shell className="max-w-[92vw] lg:max-w-[820px]">
        <h1 className="text-3xl font-bold tracking-tight text-ink">
          Terms of Service
        </h1>

        <p className="mt-2 text-[12px] text-faint">Last updated {new Date().getFullYear()}</p>

        <div className="mt-6 space-y-6 text-[13px] leading-6 text-muted">
          <Section title="Orders">
            Placing an order is an offer to buy at the price shown at
            checkout. We confirm every order — by chat, phone or email —
            before starting work on a made-to-measure piece.
          </Section>

          <Section title="Made-to-measure pieces">
            Garments cut to your measurements are made specifically for you.
            Because of this, made-to-measure orders can be cancelled only
            before cutting begins; ready-to-wear pieces can be returned
            unworn within 7 days.
          </Section>

          <Section title="Pricing">
            Prices are shown in Pakistani Rupees (PKR) and include the
            tailoring fee where a piece is made to measure. Delivery is
            calculated at checkout and is free above the threshold shown in
            your cart.
          </Section>

          <Section title="Delivery">
            Ready-to-wear pieces are dispatched within 48 hours. Tailored
            pieces typically take 7–12 working days depending on the queue —
            we'll keep you updated through chat.
          </Section>

          <Section title="Accounts">
            You are responsible for keeping your account credentials
            private. Measurements and family profiles saved to your account
            are for your own use in placing orders.
          </Section>

          <Section title="Contact">
            For anything not covered here, reach us through the chat on this
            site or the Support page.
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
