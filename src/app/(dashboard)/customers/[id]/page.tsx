import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageSquare, Package, Ruler, Users, Wallet } from "lucide-react";

import Badge, { StatusBadge } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { cn } from "@/components/ui/cn";
import EmptyState from "@/components/ui/empty-state";
import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import { StatGrid } from "@/components/ui/stat";
import MembersManager from "@/components/account/MembersManager";
import MeasurementsManager from "@/components/account/MeasurementsManager";
import ProfileForm from "@/components/account/ProfileForm";
import {
  getCustomerOrders,
  getMeasurements,
  getMeasurementTemplates,
  getMembers,
} from "@/data/account";
import { getCustomerDetail } from "@/data/customers";
import { prisma } from "@/lib/prisma";
import { formatDate, formatMoney, formatRelative } from "@/lib/format";
import { ensureMeasurementTemplates } from "@/lib/seed-templates";

export const metadata = { title: "Customer" };

const tabs = [
  { key: "overview", label: "Overview" },
  { key: "people", label: "People" },
  { key: "measurements", label: "Measurements" },
  { key: "orders", label: "Orders" },
];

export default async function CustomerDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string; member?: string }>;
}) {
  const { id } = await params;
  const { tab = "overview" } = await searchParams;

  const customerId = Number(id);

  if (!Number.isInteger(customerId)) {
    notFound();
  }

  const customer = await getCustomerDetail(customerId);

  if (!customer) {
    notFound();
  }

  await ensureMeasurementTemplates();

  const [members, measurements, templates, orders, conversation] =
    await Promise.all([
      getMembers(customerId),
      getMeasurements(customerId),
      getMeasurementTemplates(),
      getCustomerOrders(customerId, 20),
      prisma.conversation.findFirst({
        where: { customerId },
        orderBy: { lastMessageAt: "desc" },
        select: {
          id: true,
          status: true,
          lastMessageText: true,
          lastMessageAt: true,
          unreadForAdmin: true,
        },
      }),
    ]);

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Customers", href: "/customers" },
          { label: customer.fullName },
        ]}
      />

      <PageHeader
        title={customer.fullName}
        description={[
          customer.code,
          customer.phone,
          customer.city,
          `joined ${formatDate(customer.createdAt)}`,
        ]
          .filter(Boolean)
          .join(" · ")}
        actions={
          <>
            {conversation && (
              <Button
                href={`/inbox?conversation=${conversation.id}`}
                variant="secondary"
                size="sm"
              >
                <MessageSquare size={15} />
                Open chat
                {conversation.unreadForAdmin > 0 && (
                  <Badge tone="primary">{conversation.unreadForAdmin}</Badge>
                )}
              </Button>
            )}

            <Button href={`/pos?customer=${customer.id}`} size="sm">
              New sale
            </Button>
          </>
        }
      />

      <StatGrid
        className="mb-4"
        stats={[
          {
            label: "Orders",
            value: customer.totalOrders,
            icon: <Package size={15} />,
            hint: customer.lastOrderAt
              ? `last ${formatRelative(customer.lastOrderAt)}`
              : "none yet",
          },
          {
            label: "Lifetime spend",
            value: formatMoney(customer.totalSpent, { compact: true }),
            icon: <Wallet size={15} />,
          },
          {
            label: "People",
            value: members.length,
            icon: <Users size={15} />,
          },
          {
            label: "Measurements",
            value: measurements.length,
            icon: <Ruler size={15} />,
          },
        ]}
      />

      {/* TABS */}
      <nav className="mb-4 flex gap-1.5 overflow-x-auto scrollbar-none border-b border-line-subtle pb-2">
        {tabs.map((entry) => (
          <Link
            key={entry.key}
            href={`/customers/${customer.id}?tab=${entry.key}`}
            className={cn(
              "shrink-0 rounded-lg px-3 py-2 text-[12px] font-semibold transition-colors",
              tab === entry.key
                ? "bg-primary text-[var(--primary-contrast)]"
                : "text-muted hover:bg-surface hover:text-ink",
            )}
          >
            {entry.label}
          </Link>
        ))}
      </nav>

      {/* OVERVIEW */}
      {tab === "overview" && (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <ProfileForm
            customerId={customer.id}
            showNotes
            values={{
              fullName: customer.fullName,
              email: customer.email ?? "",
              phone: customer.phone ?? "",
              whatsapp: customer.whatsapp ?? "",
              gender: customer.gender ?? "",
              addressLine: customer.addressLine ?? "",
              city: customer.city ?? "",
              postalCode: customer.postalCode ?? "",
              notes: customer.notes ?? "",
            }}
          />

          <div className="space-y-4">
            <Card>
              <CardHeader title="Account" />

              <CardBody className="space-y-2.5 text-[12px]">
                <Row label="Status">
                  <StatusBadge status={customer.status} />
                </Row>

                <Row label="Source">{customer.source}</Row>

                <Row label="Group">{customer.groupName ?? "—"}</Row>

                <Row label="Storefront login">
                  {customer.hasLogin ? "Yes" : "Not registered"}
                </Row>

                <Row label="Last seen">
                  {customer.lastSeenAt
                    ? formatRelative(customer.lastSeenAt)
                    : "—"}
                </Row>
              </CardBody>
            </Card>

            {conversation && (
              <Card>
                <CardHeader
                  title="Latest message"
                  icon={<MessageSquare size={15} />}
                />

                <CardBody className="space-y-3">
                  <p className="text-[12px] leading-5 text-muted">
                    {conversation.lastMessageText ?? "No messages yet."}
                  </p>

                  <p className="text-[11px] text-faint">
                    {formatRelative(conversation.lastMessageAt)} ·{" "}
                    {conversation.status}
                  </p>

                  <Button
                    href={`/inbox?conversation=${conversation.id}`}
                    size="sm"
                    variant="secondary"
                    fullWidth
                  >
                    Reply in inbox
                  </Button>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* PEOPLE */}
      {tab === "people" && (
        <MembersManager
          members={members}
          customerId={customer.id}
          measureHref={`/customers/${customer.id}?tab=measurements`}
        />
      )}

      {/* MEASUREMENTS */}
      {tab === "measurements" && (
        <MeasurementsManager
          measurements={measurements}
          members={members}
          templates={templates}
          customerId={customer.id}
        />
      )}

      {/* ORDERS */}
      {tab === "orders" && (
        <Card className="overflow-hidden">
          <CardHeader title="Order history" icon={<Package size={16} />} />

          {orders.length === 0 ? (
            <EmptyState
              title="No orders yet"
              description="Orders placed online or through the POS will appear here."
            />
          ) : (
            <ul className="divide-y divide-line-subtle">
              {orders.map((order) => (
                <li key={order.id}>
                  <Link
                    href={`/orders/${order.id}`}
                    className="flex flex-col gap-2 p-4 transition-colors hover:bg-surface sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-2 text-[13px] font-semibold text-ink">
                        {order.orderNumber}
                        <StatusBadge status={order.status} />
                        <StatusBadge status={order.paymentStatus} />
                      </span>

                      <span className="mt-1 block text-[11px] text-faint">
                        {order.itemCount} item{order.itemCount === 1 ? "" : "s"}{" "}
                        · {formatDate(order.createdAt)}
                      </span>
                    </span>

                    <span className="text-[13px] font-bold text-ink">
                      {formatMoney(order.total)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}
    </PageShell>
  );
}

/* =========================================================
   ROW
========================================================= */

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-faint">{label}</span>
      <span className="text-right text-ink">{children}</span>
    </div>
  );
}
