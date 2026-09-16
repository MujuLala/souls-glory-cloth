import Link from "next/link";
import { Clock, MapPin, Ruler, Truck } from "lucide-react";

import { Shell } from "@/components/ui/page";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT } from "@/lib/constants";
import { formatMoney } from "@/lib/format";

export const metadata = {
  title: "Shipping & Delivery",
  description: "Delivery times, charges and made-to-measure timelines.",
};

const points = [
  {
    icon: <Truck size={18} />,
    title: "Ready-to-wear",
    body: "Dispatched within 48 hours of your order being confirmed.",
  },
  {
    icon: <Ruler size={18} />,
    title: "Made to measure",
    body: "Cutting and stitching takes 7–12 working days, then it ships.",
  },
  {
    icon: <MapPin size={18} />,
    title: "Coverage",
    body: "We deliver nationwide across Pakistan through our courier partners.",
  },
  {
    icon: <Clock size={18} />,
    title: "Tracking",
    body: "You'll get updates in chat and on your Orders page as the order moves.",
  },
];

export default function ShippingPage() {
  return (
    <section className="py-10 sm:py-14">
      <Shell className="max-w-[92vw] lg:max-w-[820px]">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Shipping &amp; delivery
        </h1>

        <p className="mt-3 max-w-[60ch] text-[13px] leading-6 text-muted">
          A flat delivery charge of {formatMoney(SHIPPING_FLAT)} applies to
          every order, and it&apos;s free once your order total reaches{" "}
          {formatMoney(FREE_SHIPPING_THRESHOLD)}.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {points.map((point) => (
            <div key={point.title} className="rounded-2xl border border-line bg-card p-5">
              <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                {point.icon}
              </span>

              <h2 className="mt-4 text-[14px] font-semibold text-ink">
                {point.title}
              </h2>

              <p className="mt-1.5 text-[12px] leading-5 text-faint">
                {point.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-[12px] text-faint">
          Already placed an order?{" "}
          <Link href="/support" className="text-primary">
            Check its status
          </Link>{" "}
          on the Support page.
        </p>
      </Shell>
    </section>
  );
}
