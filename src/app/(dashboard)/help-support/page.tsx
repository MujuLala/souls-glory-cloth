"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  FileText,
  LifeBuoy,
  Mail,
  MessageCircle,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  UserRound,
} from "lucide-react";

const supportOptions = [
  {
    icon: MessageCircle,
    title: "Chat with Support",
    description:
      "Get help from our support team with your account or store.",
    action: "Start Chat",
  },
  {
    icon: Mail,
    title: "Email Support",
    description:
      "Send us your question and our team will get back to you.",
    action: "Send Email",
  },
  {
    icon: BookOpen,
    title: "Help Center",
    description:
      "Browse guides and tutorials to learn how everything works.",
    action: "Browse Guides",
  },
];

const popularTopics = [
  {
    icon: ShoppingBag,
    title: "Products & Catalog",
    description:
      "Manage products, categories, collections and inventory.",
  },
  {
    icon: UserRound,
    title: "Customers",
    description:
      "Learn how to manage customers and their information.",
  },
  {
    icon: Settings,
    title: "Account & Settings",
    description:
      "Manage your store settings, account and preferences.",
  },
  {
    icon: ShieldCheck,
    title: "Security & Privacy",
    description:
      "Learn about account security and protecting your store.",
  },
];

const faqs = [
  "How do I add a new product?",
  "How can I update my store settings?",
  "How do I manage customer orders?",
  "How can I reset my account password?",
  "How do I contact support?",
];

export default function HelpSupportPage() {
  return (
    <main className="min-h-screen w-full bg-[#050505] text-white">
      <div className="w-full px-5 py-6 sm:px-6 md:px-8 lg:px-10">
        {/* Page Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-zinc-500">
            <LifeBuoy size={16} />
            <span>Support</span>
            <ChevronRight size={14} />
            <span className="text-zinc-400">Help & Support</span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Help & Support
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            Find answers, browse helpful guides, or contact our support
            team if you need assistance with your store.
          </p>
        </div>

        {/* Search */}
        <section className="mb-6 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-6">
          <div className="mx-auto max-w-3xl">
            <div className="mb-5 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e51e32]/10 text-[#e51e32]">
                <CircleHelp size={23} />
              </div>

              <h2 className="text-lg font-semibold">
                How can we help?
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Search our help center for answers and guides.
              </p>
            </div>

            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
              />

              <input
                type="search"
                placeholder="Search for help..."
                className="h-12 w-full rounded-xl border border-white/10 bg-[#080808] pl-11 pr-4 text-sm text-white outline-none placeholder:text-zinc-700 transition focus:border-[#e51e32]/50"
              />
            </div>
          </div>
        </section>

        {/* Support Options */}
        <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {supportOptions.map((option) => {
            const Icon = option.icon;

            return (
              <div
                key={option.title}
                className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition hover:border-[#e51e32]/30 hover:bg-white/[0.04]"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#e51e32]/10 text-[#e51e32]">
                  <Icon size={20} />
                </div>

                <h2 className="text-base font-semibold">
                  {option.title}
                </h2>

                <p className="mt-2 min-h-[48px] text-sm leading-6 text-zinc-500">
                  {option.description}
                </p>

                <button
                  type="button"
                  className="mt-5 flex items-center gap-2 text-sm font-medium text-[#e51e32] transition group-hover:gap-3"
                >
                  {option.action}
                  <ArrowRight size={15} />
                </button>
              </div>
            );
          })}
        </section>

        {/* Main Content */}
        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.4fr_1fr]">
          {/* Popular Topics */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025]">
            <div className="border-b border-white/[0.07] p-5 sm:p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">
                Knowledge Base
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                Popular Topics
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                Quickly find information about your store.
              </p>
            </div>

            <div className="divide-y divide-white/[0.05]">
              {popularTopics.map((topic) => {
                const Icon = topic.icon;

                return (
                  <button
                    key={topic.title}
                    type="button"
                    className="group flex w-full items-center gap-4 p-5 text-left transition hover:bg-white/[0.025]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-zinc-400 transition group-hover:bg-[#e51e32]/10 group-hover:text-[#e51e32]">
                      <Icon size={19} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-medium">
                        {topic.title}
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-zinc-600">
                        {topic.description}
                      </p>
                    </div>

                    <ArrowRight
                      size={16}
                      className="shrink-0 text-zinc-700 transition group-hover:translate-x-1 group-hover:text-[#e51e32]"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* FAQ */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025]">
            <div className="border-b border-white/[0.07] p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e51e32]/10 text-[#e51e32]">
                  <FileText size={19} />
                </div>

                <div>
                  <p className="text-xs text-zinc-600">
                    Frequently Asked
                  </p>

                  <h2 className="text-xl font-semibold">
                    Questions
                  </h2>
                </div>
              </div>
            </div>

            <div className="p-3">
              {faqs.map((faq) => (
                <button
                  key={faq}
                  type="button"
                  className="group flex w-full items-center justify-between gap-4 rounded-xl p-4 text-left transition hover:bg-white/[0.04]"
                >
                  <span className="text-sm text-zinc-400 transition group-hover:text-white">
                    {faq}
                  </span>

                  <ChevronRight
                    size={16}
                    className="shrink-0 text-zinc-700 transition group-hover:translate-x-1 group-hover:text-[#e51e32]"
                  />
                </button>
              ))}
            </div>

            <div className="border-t border-white/[0.07] p-5">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/[0.04] hover:text-white"
              >
                View All Articles
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="mt-5 rounded-2xl border border-[#e51e32]/20 bg-[#e51e32]/[0.04] p-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e51e32]/10 text-[#e51e32]">
                <LifeBuoy size={21} />
              </div>

              <div>
                <h2 className="text-base font-semibold">
                  Still need help?
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Our support team is here to help you with any
                  questions.
                </p>
              </div>
            </div>

            <Link
              href="/support"
              className="flex h-10 w-fit items-center gap-2 rounded-xl bg-[#e51e32] px-5 text-sm font-medium text-white transition hover:bg-[#c9182b]"
            >
              Contact Support
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        {/* Status */}
        <div className="flex items-center justify-center gap-2 py-8 text-xs text-zinc-700">
          <CheckCircle2 size={14} />
          <span>Support Center</span>
        </div>
      </div>
    </main>
  );
}