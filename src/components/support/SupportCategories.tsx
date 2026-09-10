"use client";

import {
  ShoppingBag,
  Truck,
  RefreshCcw,
  Ruler,
  Sparkles,
  UserRound,
} from "lucide-react";

const categories = [
  {
    number: "01",
    title: "Orders & Payments",
    description:
      "Get help with placing orders, payment methods, cancellations, and order updates.",
    icon: ShoppingBag,
  },
  {
    number: "02",
    title: "Shipping & Delivery",
    description:
      "Find information about delivery times, tracking, shipping charges, and destinations.",
    icon: Truck,
  },
  {
    number: "03",
    title: "Returns & Exchanges",
    description:
      "Learn about our return policy, exchanges, damaged items, and refund process.",
    icon: RefreshCcw,
  },
  {
    number: "04",
    title: "Measurements & Tailoring",
    description:
      "Need help with measurements or getting the perfect fit? Start here.",
    icon: Ruler,
  },
  {
    number: "05",
    title: "Products & Fabrics",
    description:
      "Learn more about fabrics, sizing, care instructions, and product details.",
    icon: Sparkles,
  },
  {
    number: "06",
    title: "Account & General Help",
    description:
      "Need assistance with your account, profile, or anything else? We're here.",
    icon: UserRound,
  },
];

export default function SupportCategories() {
  return (
    <section
      id="support-categories"
      className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#BB9563]">
            Support Center
          </span>

          <h2 className="mt-3 max-w-xl font-serif text-4xl tracking-[-0.03em] sm:text-5xl">
            What can we help you
            <span className="italic text-[#BB9563]"> with?</span>
          </h2>
        </div>

        <p className="max-w-sm text-sm leading-6 text-[#1D4338]/55">
          Choose a category below to find quick answers to the most common
          questions from our customers.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <button
              key={category.number}
              className="group relative min-h-[250px] overflow-hidden rounded-2xl border border-[#1D4338]/10 bg-white p-7 text-left transition duration-500 hover:-translate-y-1 hover:border-[#BB9563]/40 hover:shadow-[0_20px_50px_rgba(29,67,56,0.08)]"
            >
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-bold tracking-widest text-[#BB9563]">
                  {category.number}
                </span>

                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1D4338]/10 transition duration-500 group-hover:border-[#BB9563]/40 group-hover:bg-[#BB9563] group-hover:text-white">
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div className="absolute bottom-7 left-7 right-7">
                <h3 className="font-serif text-2xl tracking-[-0.02em]">
                  {category.title}
                </h3>

                <p className="mt-2 max-w-xs text-xs leading-5 text-[#1D4338]/55">
                  {category.description}
                </p>
              </div>

              <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-[#BB9563]/5 transition duration-500 group-hover:scale-150" />
            </button>
          );
        })}
      </div>
    </section>
  );
}