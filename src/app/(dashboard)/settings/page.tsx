import Link from "next/link";
import {
  ArrowLeft,
  Settings as SettingsIcon,
  User,
  Store,
  Bell,
  Shield,
  CreditCard,
  Globe,
} from "lucide-react";

import CMSPageContainer from "@/components/products/CMSPageContainer";

export default function SettingsPage() {
  const settings = [
    {
      title: "General Settings",
      description: "Manage your store name, contact information and basic details.",
      icon: <Store size={18} />,
    },
    {
      title: "Account Settings",
      description: "Update your admin profile and account information.",
      icon: <User size={18} />,
    },
    {
      title: "Notifications",
      description: "Configure email and dashboard notification preferences.",
      icon: <Bell size={18} />,
    },
    {
      title: "Security",
      description: "Manage passwords, authentication and account security.",
      icon: <Shield size={18} />,
    },
    {
      title: "Payments",
      description: "Configure payment methods and transaction settings.",
      icon: <CreditCard size={18} />,
    },
    {
      title: "Localization",
      description: "Manage currency, timezone and language preferences.",
      icon: <Globe size={18} />,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#050505] text-[#f7f7f7]">
      <main className="w-full px-8">
        <CMSPageContainer>
          {/* Breadcrumb */}
          <div className="mb-5 flex items-center gap-2 text-xs text-neutral-600">
            <Link
              href="/dashboard"
              className="transition hover:text-white"
            >
              Dashboard
            </Link>

            <span>/</span>

            <span className="text-neutral-400">
              Settings
            </span>
          </div>

          {/* Header */}
          <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-start gap-3">
              <Link
                href="/dashboard"
                aria-label="Back to dashboard"
                className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-neutral-500 transition hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white"
              >
                <ArrowLeft size={16} />
              </Link>

              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Settings
                </h1>

                <p className="mt-2 text-xs text-neutral-500 sm:text-sm">
                  Manage your store and dashboard settings.
                </p>
              </div>
            </div>
          </section>

          {/* Settings Card */}
          <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]">
            <div className="border-b border-white/[0.07] p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff1638]/10 text-[#ff1638]">
                  <SettingsIcon size={18} />
                </div>

                <div>
                  <h2 className="text-sm font-semibold">
                    Store Settings
                  </h2>

                  <p className="mt-1 text-xs text-neutral-600">
                    Configure your store preferences.
                  </p>
                </div>
              </div>
            </div>

            {/* Settings Items */}
            <div className="grid grid-cols-1 divide-y divide-white/[0.06] sm:grid-cols-2 sm:divide-y-0">
              {settings.map((setting, index) => (
                <button
                  key={setting.title}
                  type="button"
                  className={[
                    "group flex w-full items-start gap-4 p-5 text-left transition hover:bg-white/[0.025]",
                    index % 2 === 0
                      ? "sm:border-r sm:border-white/[0.06]"
                      : "",
                    index >= 2
                      ? "sm:border-t sm:border-white/[0.06]"
                      : "",
                  ].join(" ")}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-neutral-500 transition group-hover:bg-[#ff1638]/10 group-hover:text-[#ff1638]">
                    {setting.icon}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-neutral-200 transition group-hover:text-white">
                      {setting.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-neutral-600">
                      {setting.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </CMSPageContainer>
      </main>
    </div>
  );
}