"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  CircleHelp,
  LifeBuoy,
  Mail,
  MessageCircle,
  Package,
  Search,
  Settings,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import Button from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";

const supportOptions = [
  {
    icon: MessageCircle,
    title: "Chat with a customer",
    description: "Jump into the storefront inbox and reply to shoppers.",
    href: "/inbox",
    action: "Open inbox",
  },
  {
    icon: Mail,
    title: "Email the team",
    description: "Send us a question about running your store.",
    href: "mailto:support@soulsglorycloth.com",
    action: "Send email",
  },
  {
    icon: BookOpen,
    title: "Customer support page",
    description: "See what shoppers see when they need help.",
    href: "/support",
    action: "View page",
  },
];

const popularTopics = [
  {
    icon: Package,
    title: "Products & catalogue",
    description: "Manage products, categories, collections and inventory.",
    href: "/products",
  },
  {
    icon: UserRound,
    title: "Customers & measurements",
    description: "Manage customer profiles, family members and fits.",
    href: "/customers",
  },
  {
    icon: Settings,
    title: "Store settings",
    description: "Team, pricing defaults and storefront preferences.",
    href: "/settings",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    description: "Sessions, admin access and account protection.",
    href: "/settings",
  },
];

const faqs = [
  {
    q: "How do I add a new product?",
    a: "Go to Products → Add product. Fill in pricing and images, then publish.",
  },
  {
    q: "How do I take an order over the phone?",
    a: "Use the POS from the top bar — search the product, add the customer by phone, and complete the sale.",
  },
  {
    q: "Where do customer measurements live?",
    a: "Open a customer's profile → Measurements tab, or Tailoring → Measurements for everyone.",
  },
  {
    q: "How do I change my password?",
    a: "Password resets go through the sign-in screen's \"Forgot password\" link.",
  },
  {
    q: "How do shoppers reach us?",
    a: "Through the chat widget on the storefront — replies land in your Inbox here in the CMS.",
  },
];

export default function HelpSupportPage() {
  const [search, setSearch] = useState("");

  const filteredFaqs = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return faqs;
    return faqs.filter((faq) => faq.q.toLowerCase().includes(term));
  }, [search]);

  return (
    <PageShell>
      <Breadcrumbs
        items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Help & Support" }]}
      />

      <PageHeader
        title="Help & Support"
        description="Find answers, jump to the right section of the CMS, or reach our team directly."
      />

      {/* SEARCH */}
      <Card className="mb-4 p-5 sm:p-6">
        <div className="mx-auto max-w-[640px] text-center">
          <span className="mx-auto mb-3 grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
            <CircleHelp size={22} />
          </span>

          <h2 className="text-lg font-semibold text-ink">How can we help?</h2>
          <p className="mt-1 text-[13px] text-faint">
            Search frequently asked questions below.
          </p>

          <div className="relative mt-4">
            <Search
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint"
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search for help…"
              className="h-12 w-full rounded-xl border border-line bg-input pl-11 pr-4 text-sm text-ink outline-none placeholder:text-faint focus-visible:border-primary/50"
            />
          </div>
        </div>
      </Card>

      {/* SUPPORT OPTIONS */}
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {supportOptions.map((option) => {
          const Icon = option.icon;

          return (
            <Card
              key={option.title}
              className="group p-5 transition-colors hover:border-primary/30"
            >
              <span className="mb-5 grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon size={20} />
              </span>

              <h2 className="text-[15px] font-semibold text-ink">{option.title}</h2>

              <p className="mt-2 min-h-[48px] text-[13px] leading-6 text-faint">
                {option.description}
              </p>

              <Button href={option.href} variant="ghost" size="sm" className="mt-3 px-0">
                {option.action}
                <ArrowRight size={15} />
              </Button>
            </Card>
          );
        })}
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.4fr_1fr]">
        {/* TOPICS */}
        <Card className="overflow-hidden">
          <CardHeader
            title="Popular topics"
            description="Quickly jump to the right part of the CMS."
          />

          <div className="divide-y divide-line-subtle">
            {popularTopics.map((topic) => {
              const Icon = topic.icon;

              return (
                <a
                  key={topic.title}
                  href={topic.href}
                  className="group flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-surface"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface text-faint transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                    <Icon size={19} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-medium text-ink">
                      {topic.title}
                    </span>

                    <span className="mt-1 block text-[11.5px] leading-5 text-faint">
                      {topic.description}
                    </span>
                  </span>

                  <ArrowRight
                    size={16}
                    className="shrink-0 text-faint transition-transform group-hover:translate-x-1 group-hover:text-primary"
                  />
                </a>
              );
            })}
          </div>
        </Card>

        {/* FAQ */}
        <Card className="overflow-hidden">
          <CardHeader title="Frequently asked" icon={<LifeBuoy size={16} />} />

          <div className="p-2">
            {filteredFaqs.length === 0 ? (
              <p className="p-4 text-center text-[12px] text-faint">
                No matching questions.
              </p>
            ) : (
              filteredFaqs.map((faq) => <FaqRow key={faq.q} {...faq} />)
            )}
          </div>
        </Card>
      </div>

      {/* CONTACT */}
      <Card className="mt-5 border-primary/20 bg-primary/5 p-6">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <LifeBuoy size={21} />
            </span>

            <div>
              <h2 className="text-[15px] font-semibold text-ink">Still need help?</h2>
              <p className="mt-1 text-[13px] text-faint">
                Reach the team directly and we&apos;ll get back to you.
              </p>
            </div>
          </div>

          <Button href="mailto:support@soulsglorycloth.com">
            Contact support
            <ArrowRight size={15} />
          </Button>
        </div>
      </Card>
    </PageShell>
  );
}

/* =========================================================
   FAQ ROW
========================================================= */

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-4 rounded-xl p-4 text-left transition-colors hover:bg-surface"
      >
        <span className="text-[13px] text-muted group-hover:text-ink">{q}</span>

        <ChevronRight
          size={16}
          className={`shrink-0 text-faint transition-transform group-hover:text-primary ${open ? "rotate-90" : ""}`}
        />
      </button>

      {open && (
        <p className="px-4 pb-4 text-[12px] leading-5 text-faint">{a}</p>
      )}
    </div>
  );
}
