import Link from "next/link";
import {
  Bell,
  CreditCard,
  Globe,
  MessageSquare,
  Package,
  Ruler,
  Shield,
  Store,
  User,
  Users,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/format";
import { SHIPPING_FLAT, TAILORING_FEE } from "@/lib/constants";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const [staffCount, templateCount, productCount, openChats] =
    await Promise.all([
      prisma.appUser.count({ where: { role: { not: "Customer" } } }),
      prisma.measurementTemplate.count(),
      prisma.product.count(),
      prisma.conversation.count({ where: { status: "Open" } }),
    ]);

  const sections = [
    {
      title: "Team & roles",
      description: `${staffCount} staff account${staffCount === 1 ? "" : "s"} — admins, tailors and cashiers.`,
      icon: <Users size={18} />,
      href: "/settings/team",
    },
    {
      title: "Measurement types",
      description: `${templateCount} garment template${templateCount === 1 ? "" : "s"} used when recording measurements.`,
      icon: <Ruler size={18} />,
      href: "/tailoring/templates",
    },
    {
      title: "Catalogue",
      description: `${productCount} product${productCount === 1 ? "" : "s"}, plus categories, collections and tags.`,
      icon: <Package size={18} />,
      href: "/products",
    },
    {
      title: "Chat & questions",
      description: `${openChats} open conversation${openChats === 1 ? "" : "s"}. Configure the questions chat asks per product.`,
      icon: <MessageSquare size={18} />,
      href: "/tailoring/questions",
    },
    {
      title: "Pricing defaults",
      description: `Tailoring ${formatMoney(TAILORING_FEE)} · delivery ${formatMoney(SHIPPING_FLAT)} (free above Rs 15,000).`,
      icon: <CreditCard size={18} />,
      href: "/settings/commerce",
    },
    {
      title: "Store profile",
      description: "Name, contact details and the address printed on receipts.",
      icon: <Store size={18} />,
      href: "/settings/store",
    },
    {
      title: "Your account",
      description: "Name, email and password for your own login.",
      icon: <User size={18} />,
      href: "/settings/account",
    },
    {
      title: "Notifications",
      description: "Which events email you, and which stay in the dashboard.",
      icon: <Bell size={18} />,
      href: "/settings/notifications",
    },
    {
      title: "Security",
      description: "Sessions, admin access and audit of recent sign-ins.",
      icon: <Shield size={18} />,
      href: "/settings/security",
    },
    {
      title: "Localisation",
      description: "Currency (PKR), timezone and measurement units.",
      icon: <Globe size={18} />,
      href: "/settings/localisation",
    },
  ];

  return (
    <PageShell>
      <Breadcrumbs
        items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Settings" }]}
      />

      <PageHeader
        title="Settings"
        description="Everything that shapes how the workspace behaves — your team, your catalogue defaults, and how customers reach you."
      />

      <Card className="overflow-hidden">
        <div className="grid divide-y divide-line-subtle sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="group flex items-start gap-3.5 border-line-subtle p-5 transition-colors hover:bg-surface sm:border-b sm:[&:nth-child(2n)]:border-l lg:[&:nth-child(2n)]:border-l-0 lg:[&:not(:nth-child(3n+1))]:border-l"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface text-faint transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                {section.icon}
              </span>

              <span className="min-w-0">
                <span className="block text-[13px] font-semibold text-ink">
                  {section.title}
                </span>

                <span className="mt-1 block text-[11px] leading-5 text-faint">
                  {section.description}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Card>
    </PageShell>
  );
}
