"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import { V2Shell } from "./v2-parts";

/* =========================================================
   FOOTER V2

   Every link points at a real route in the app — where the
   reference names a page this project doesn't have (About,
   Careers, Blog, a dedicated Size Guide), it falls back to
   the closest real destination (Support, or the account
   measurements page) rather than a dead link.
========================================================= */

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "New Arrivals", href: "/collections/new-arrivals" },
      { label: "Women", href: "/shop/womenswear" },
      { label: "Men", href: "/shop/menswear" },
      { label: "Kids", href: "/shop/kids" },
      { label: "Unstitched Fabrics", href: "/shop/fabric" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Track Order", href: "/support#support-order-help" },
      { label: "Size Guide", href: "/account/measurements" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Returns & Exchanges", href: "/terms" },
      { label: "FAQs", href: "/support#support-faq" },
      { label: "Contact Us", href: "/support#support-contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/support" },
      { label: "Our Story", href: "/support" },
      { label: "Careers", href: "/support" },
      { label: "Blog", href: "/support" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export default function FooterV2() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="border-t border-[var(--v2-border)] bg-white/70 pt-14">
      <V2Shell>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1fr_1.2fr]">
          <div>
            <p className="text-[19px] font-extrabold tracking-[-0.03em] text-[var(--v2-text)]">
              Soul&rsquo;s Glory
            </p>
            <p className="mt-2 max-w-[220px] text-[12.5px] leading-5 text-[var(--v2-text-faint)]">
              More Than Clothing — A Better You.
            </p>

            <div className="mt-5 flex items-center gap-2">
              {["f", "IG", "YT"].map((label) => (
                <a
                  key={label}
                  href="#top"
                  aria-label="Soul's Glory on social media"
                  className="grid size-8 place-items-center rounded-full border border-[var(--v2-border)] bg-white text-[10px] font-bold text-[var(--v2-text-secondary)] transition-colors hover:border-[var(--v2-primary)]/40 hover:text-[var(--v2-primary)]"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--v2-text)]">
                {column.title}
              </p>
              <ul className="mt-3.5 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[12.5px] text-[var(--v2-text-faint)] transition-colors hover:text-[var(--v2-primary)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--v2-text)]">
              Join Our Newsletter
            </p>
            <p className="mt-3.5 text-[12px] leading-5 text-[var(--v2-text-faint)]">
              Get updates on new arrivals and exclusive offers.
            </p>

            {subscribed ? (
              <p className="mt-3.5 flex items-center gap-1.5 text-[12.5px] font-semibold text-[var(--v2-success)]">
                <Check size={15} />
                You&rsquo;re on the list!
              </p>
            ) : (
              <form onSubmit={submit} className="mt-3.5 flex items-center gap-1.5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  aria-label="Email address"
                  className="h-11 min-w-0 flex-1 rounded-full border border-[var(--v2-border-strong)] bg-white px-4 text-[12.5px] text-[var(--v2-text)] outline-none placeholder:text-[var(--v2-text-faint)] focus-visible:border-[var(--v2-primary)]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="grid size-11 shrink-0 place-items-center rounded-full bg-[var(--v2-primary)] text-white transition-colors hover:bg-[var(--v2-primary-dark)]"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[var(--v2-border)] py-6 text-[11.5px] text-[var(--v2-text-faint)] sm:flex-row">
          <p>© {new Date().getFullYear()} Soul&rsquo;s Glory Cloth. All rights reserved.</p>
          <p>Stitched for a better, borderless world. ❤</p>
        </div>
      </V2Shell>
    </footer>
  );
}
