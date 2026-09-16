"use client";

import { ArrowUpRight, Clock3, Mail, MessageCircle, Phone } from "lucide-react";

const contactOptions = [
  {
    title: "Live chat",
    description: "Chat with our support team right now",
    value: "Open chat",
    icon: MessageCircle,
  },
] as const;

const linkOptions = [
  {
    title: "Email",
    description: "Send us your questions",
    value: "support@soulsglorycloth.com",
    href: "mailto:support@soulsglorycloth.com",
    icon: Mail,
  },
  {
    title: "Phone",
    description: "Speak directly with our team",
    value: "+92 300 0000000",
    href: "tel:+923000000000",
    icon: Phone,
  },
] as const;

export default function SupportContact() {
  const openChat = () => {
    /* The floating chat widget listens for this event —
       clicking here opens the same conversation. */
    window.dispatchEvent(new CustomEvent("sg:chat-open"));
  };

  return (
    <section id="support-contact" className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
      <div className="mb-10 grid gap-5 sm:grid-cols-[1fr_.6fr] sm:items-end">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-primary">
            Direct support
          </p>
          <h2 className="mt-2 text-4xl font-semibold leading-none tracking-[-.05em] text-ink sm:text-5xl">
            Still need <span className="text-primary">help?</span>
          </h2>
        </div>
        <p className="text-xs leading-5 text-faint">
          Sometimes you just want to speak with someone. Choose the channel
          that works best for you.
        </p>
      </div>

      <div className="grid gap-2 md:grid-cols-3">
        {contactOptions.map(({ title, description, value, icon: Icon }) => (
          <button
            key={title}
            type="button"
            onClick={openChat}
            className="group rounded-xl border border-line-subtle bg-card p-5 text-left transition duration-300 hover:-translate-y-0.5 hover:border-primary/30"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-line">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <ArrowUpRight className="h-3.5 w-3.5 text-faint group-hover:text-primary" />
            </div>
            <h3 className="mt-7 text-sm font-semibold text-ink">{title}</h3>
            <p className="mt-1 text-[10px] text-faint">{description}</p>
            <p className="mt-5 break-words text-xs text-muted">{value}</p>
          </button>
        ))}

        {linkOptions.map(({ title, description, value, href, icon: Icon }) => (
          <a
            key={title}
            href={href}
            className="group rounded-xl border border-line-subtle bg-card p-5 transition duration-300 hover:-translate-y-0.5 hover:border-primary/30"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-line">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <ArrowUpRight className="h-3.5 w-3.5 text-faint group-hover:text-primary" />
            </div>
            <h3 className="mt-7 text-sm font-semibold text-ink">{title}</h3>
            <p className="mt-1 text-[10px] text-faint">{description}</p>
            <p className="mt-5 break-words text-xs text-muted">{value}</p>
          </a>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[.16em] text-faint">
        <Clock3 className="h-3 w-3" />
        Monday — Saturday · 10:00 AM — 7:00 PM
      </div>

      <div className="mt-16 overflow-hidden rounded-xl border border-line-subtle bg-card">
        <div className="flex flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center sm:px-7">
          <div>
            <p className="text-[9px] uppercase tracking-[.2em] text-primary">
              Soul&apos;s Glory Cloth
            </p>
            <p className="mt-2 text-sm font-medium text-ink">
              Made around you. Supported all the way.
            </p>
          </div>
          <a
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-[9px] font-bold uppercase tracking-[.14em] text-[var(--primary-contrast)]"
          >
            Continue shopping
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
