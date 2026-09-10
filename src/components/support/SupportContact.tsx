import { ArrowUpRight, Clock3, Mail, MessageCircle, Phone } from "lucide-react";

const options = [
  ["WhatsApp", "Chat with our support team", "Start a conversation", "#", MessageCircle],
  ["Email", "Send us your questions", "support@soulsglorycloth.com", "mailto:support@soulsglorycloth.com", Mail],
  ["Phone", "Speak directly with our team", "+92 300 0000000", "tel:+923000000000", Phone],
] as const;

export default function SupportContact() {
  return (
    <section id="support-contact" className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
      <div className="mb-10 grid gap-5 sm:grid-cols-[1fr_.6fr] sm:items-end">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-[#ed1b2f]">
            Direct support
          </p>
          <h2 className="mt-2 text-4xl font-semibold leading-none tracking-[-.05em] sm:text-5xl">
            Still need <span className="text-[#ed1b2f]">help?</span>
          </h2>
        </div>
        <p className="text-xs leading-5 text-white/30">
          Sometimes you just want to speak with someone. Choose the channel
          that works best for you.
        </p>
      </div>

      <div className="grid gap-2 md:grid-cols-3">
        {options.map(([title, description, value, href, Icon]) => (
          <a
            key={title}
            href={href}
            className="group rounded-xl border border-white/[0.08] bg-[#090909] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[#ed1b2f]/30"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10">
                <Icon className="h-4 w-4 text-[#ed1b2f]" />
              </div>
              <ArrowUpRight className="h-3.5 w-3.5 text-white/20 group-hover:text-[#ed1b2f]" />
            </div>
            <h3 className="mt-7 text-sm font-semibold">{title}</h3>
            <p className="mt-1 text-[10px] text-white/25">{description}</p>
            <p className="mt-5 break-words text-xs text-white/60">{value}</p>
          </a>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[.16em] text-white/20">
        <Clock3 className="h-3 w-3" />
        Monday — Saturday · 10:00 AM — 7:00 PM
      </div>

      <div className="mt-16 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a0a0a]">
        <div className="flex flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center sm:px-7">
          <div>
            <p className="text-[9px] uppercase tracking-[.2em] text-[#ed1b2f]">
              Soul's Glory Cloth
            </p>
            <p className="mt-2 text-sm font-medium">
              Made around you. Supported all the way.
            </p>
          </div>
          <a
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ed1b2f] px-5 py-3 text-[9px] font-bold uppercase tracking-[.14em]"
          >
            Continue shopping
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
