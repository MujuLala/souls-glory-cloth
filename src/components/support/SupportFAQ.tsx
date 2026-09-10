"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  ["How can I track my order?", "After your order is shipped, tracking information is shared with you. If you cannot find it, send us your order number and we can help."],
  ["Can I change my measurements after ordering?", "If tailoring has not started, contact us as soon as possible. We will do our best to update your measurements before production."],
  ["How long does tailoring take?", "Tailoring time depends on the product and order details. The estimated timeline is shown during checkout and may vary by destination."],
  ["Can I return a custom-tailored item?", "Custom pieces may have different return conditions because they are made specifically for you. Please contact support before sending anything back."],
  ["What if my item arrives damaged?", "Contact us promptly with your order number and clear photos of the issue. Our team will review it and guide you through the next step."],
  ["Can I cancel my order?", "Cancellation may be possible before production or tailoring begins. Contact support as quickly as possible with your order details."],
];

export default function SupportFAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="support-faq" className="border-y border-white/[0.07] bg-[#080808]">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-[#ed1b2f]">
              Frequently asked
            </p>
            <h2 className="mt-3 text-4xl font-semibold leading-none tracking-[-.05em] sm:text-5xl">
              Quick answers.
              <br />
              <span className="text-white/25">No guesswork.</span>
            </h2>
            <p className="mt-5 max-w-sm text-xs leading-5 text-white/30">
              The questions our customers ask most. If yours is not here, our
              support team is one message away.
            </p>
            <div className="mt-7 inline-flex rounded-full border border-[#ed1b2f]/20 bg-[#ed1b2f]/5 px-3 py-1.5 text-[9px] text-white/40">
              Updated for your shopping experience
            </div>
          </div>

          <div className="divide-y divide-white/[0.08]">
            {faqs.map(([question, answer], index) => {
              const isOpen = open === index;
              return (
                <div key={question}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-5 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-4 text-sm font-medium">
                      <span className="text-[9px] text-[#ed1b2f]">
                        0{index + 1}
                      </span>
                      {question}
                    </span>
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 transition ${isOpen ? "rotate-45 border-[#ed1b2f]/40 text-[#ed1b2f]" : "text-white/30"}`}>
                      <Plus className="h-3.5 w-3.5" />
                    </span>
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-5 pl-8 text-xs leading-6 text-white/30">
                        {answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
