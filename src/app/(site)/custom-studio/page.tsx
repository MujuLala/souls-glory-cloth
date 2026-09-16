import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  Ruler,
  ShirtIcon,
  Truck,
  Users,
} from "lucide-react";

import Button from "@/components/ui/button";
import { Shell } from "@/components/ui/page";
import { TAILORING_FEE } from "@/lib/constants";
import { formatMoney } from "@/lib/format";
import { getStorefrontProducts } from "@/data/storefront";
import ProductCard from "@/components/shop/ProductCard";

export const metadata = {
  title: "Custom Studio",
  description:
    "Have any piece stitched to your own measurements — for you or anyone in your family.",
};

const steps = [
  {
    icon: <ShirtIcon size={18} />,
    title: "Pick a piece",
    body: "Browse the shop and choose “Made to measure” on any product page.",
  },
  {
    icon: <Users size={18} />,
    title: "Add who it's for",
    body: "Save a profile for yourself or any family member you order for.",
  },
  {
    icon: <Ruler size={18} />,
    title: "Save measurements",
    body: "Enter measurements once — every future order reuses them.",
  },
  {
    icon: <Truck size={18} />,
    title: "We stitch & deliver",
    body: "Cutting and stitching takes 7–12 working days, then it ships.",
  },
];

export default async function CustomStudioPage() {
  const products = await getStorefrontProducts({ limit: 8 });

  return (
    <>
      {/* HERO */}
      <section className="border-b border-line-subtle py-14 sm:py-20">
        <Shell className="max-w-[92vw] lg:max-w-[900px] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3 py-1.5">
            <span className="size-1.5 rounded-full bg-primary" />
            <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-primary">
              Custom Studio
            </span>
          </span>

          <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-ink sm:text-5xl">
            Any piece, cut for
            <span className="text-primary"> exactly you.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-[56ch] text-[14px] leading-6 text-muted">
            Every product in our shop can be ordered ready-to-wear or stitched
            to your own measurements — for {formatMoney(TAILORING_FEE)} extra.
            Save a profile for everyone in your family and never re-measure
            again.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <Button href="/shop" size="lg">
              Browse pieces to customize
              <ArrowRight size={16} />
            </Button>

            <Button href="/account/measurements" variant="secondary" size="lg">
              <Ruler size={16} />
              Add your measurements
            </Button>
          </div>
        </Shell>
      </section>

      {/* STEPS */}
      <section className="py-14 sm:py-20">
        <Shell>
          <h2 className="text-center text-2xl font-bold tracking-tight text-ink">
            How it works
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative rounded-2xl border border-line bg-card p-5"
              >
                <span className="absolute right-4 top-4 text-2xl font-bold text-line-strong">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  {step.icon}
                </span>

                <h3 className="mt-4 text-[14px] font-semibold text-ink">
                  {step.title}
                </h3>

                <p className="mt-1.5 text-[12px] leading-5 text-faint">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* PRODUCTS */}
      {products.length > 0 && (
        <section className="border-t border-line-subtle py-14 sm:py-20">
          <Shell>
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="text-2xl font-bold tracking-tight text-ink">
                Popular to customize
              </h2>

              <Link href="/shop" className="text-[12px] font-semibold text-primary">
                View all
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </Shell>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-line-subtle py-14 sm:py-16">
        <Shell className="max-w-[92vw] lg:max-w-[700px] text-center">
          <h2 className="text-2xl font-bold tracking-tight text-ink">
            Not sure about sizing?
          </h2>

          <p className="mx-auto mt-2 max-w-[50ch] text-[13px] leading-6 text-muted">
            Attach any product in chat and our team will walk you through
            fabric, fit and measurements before you order.
          </p>

          <Button href="/support" variant="secondary" size="lg" className="mt-5">
            <MessageCircle size={16} />
            Talk to the atelier
          </Button>
        </Shell>
      </section>
    </>
  );
}
