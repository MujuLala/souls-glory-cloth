import Link from "next/link";
import {
  ArrowRight,
  MessageSquare,
  Package,
  Ruler,
  Users,
} from "lucide-react";

import { StatusBadge } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import EmptyState from "@/components/ui/empty-state";
import { formatDate, formatMoney } from "@/lib/format";
import { getCustomerOrders, getMembers } from "@/data/account";
import { getOrCreateCustomer, requireUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Your account" };

export default async function AccountPage() {
  const user = await requireUser();
  const customerId = user.customerId ?? (await getOrCreateCustomer(user));

  const [orders, members, measurementCount, openChat] = await Promise.all([
    getCustomerOrders(customerId, 4),
    getMembers(customerId),
    prisma.measurement.count({ where: { customerId } }),
    prisma.conversation.findFirst({
      where: { customerId, status: { not: "Closed" } },
      select: { unreadForCustomer: true, lastMessageText: true },
    }),
  ]);

  const membersWithoutMeasurements = members.filter(
    (member) => member.measurementCount === 0,
  );

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
      {/* ===================================================
          ORDERS
      =================================================== */}

      <div className="space-y-4">
        <Card>
          <CardHeader
            title="Recent orders"
            icon={<Package size={16} />}
            actions={
              orders.length > 0 && (
                <Button href="/account/orders" size="sm" variant="secondary">
                  View all
                </Button>
              )
            }
          />

          {orders.length === 0 ? (
            <EmptyState
              icon={<Package size={20} />}
              title="No orders yet"
              description="Your first order will show up here with live tailoring status."
              action={
                <Button href="/shop" size="sm">
                  Browse the collection
                </Button>
              }
            />
          ) : (
            <ul className="divide-y divide-line-subtle">
              {orders.map((order) => (
                <li key={order.id}>
                  <Link
                    href={`/order/${order.orderNumber}`}
                    className="flex items-center gap-3 p-4 transition-colors hover:bg-surface"
                  >
                    <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-lg bg-surface text-faint">
                      {order.items[0]?.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={order.items[0].image}
                          alt=""
                          className="size-full object-cover"
                        />
                      ) : (
                        <Package size={15} />
                      )}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-semibold text-ink">
                        {order.orderNumber}
                      </span>

                      <span className="mt-0.5 block truncate text-[11px] text-faint">
                        {order.itemCount} item
                        {order.itemCount === 1 ? "" : "s"} ·{" "}
                        {formatDate(order.createdAt)}
                      </span>
                    </span>

                    <span className="shrink-0 text-right">
                      <span className="block text-[13px] font-bold text-ink">
                        {formatMoney(order.total)}
                      </span>

                      <span className="mt-1 block">
                        <StatusBadge status={order.status} />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* NUDGE */}
        {membersWithoutMeasurements.length > 0 && (
          <Card>
            <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-ink">
                  {membersWithoutMeasurements.length} profile
                  {membersWithoutMeasurements.length === 1 ? "" : "s"} without
                  measurements
                </p>

                <p className="mt-1 text-[11px] leading-5 text-faint">
                  {membersWithoutMeasurements
                    .map((member) => member.fullName)
                    .join(", ")}{" "}
                  — add a set once and every future order uses it.
                </p>
              </div>

              <Button href="/account/measurements" size="sm">
                Add measurements
              </Button>
            </CardBody>
          </Card>
        )}
      </div>

      {/* ===================================================
          SIDE
      =================================================== */}

      <div className="space-y-4">
        <Card>
          <CardHeader title="Your people" icon={<Users size={16} />} />

          <CardBody className="space-y-2.5">
            {members.length === 0 ? (
              <p className="text-[12px] leading-5 text-faint">
                Add the family members you order for so each garment goes out
                in the right fit.
              </p>
            ) : (
              members.slice(0, 5).map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between gap-2"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-[12px] font-medium text-ink">
                      {member.fullName}
                    </span>

                    <span className="block text-[10px] text-faint">
                      {member.relation}
                    </span>
                  </span>

                  <span className="shrink-0 text-[10px] text-faint">
                    {member.measurementCount} set
                    {member.measurementCount === 1 ? "" : "s"}
                  </span>
                </div>
              ))
            )}

            <Button
              href="/account/members"
              variant="secondary"
              size="sm"
              fullWidth
            >
              Manage people
              <ArrowRight size={14} />
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Measurements" icon={<Ruler size={16} />} />

          <CardBody className="space-y-3">
            <p className="text-[12px] leading-5 text-muted">
              {measurementCount === 0
                ? "Nothing saved yet."
                : `${measurementCount} set${measurementCount === 1 ? "" : "s"} saved across your profiles.`}
            </p>

            <Button
              href="/account/measurements"
              variant="secondary"
              size="sm"
              fullWidth
            >
              Open measurements
              <ArrowRight size={14} />
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Atelier chat" icon={<MessageSquare size={16} />} />

          <CardBody className="space-y-3">
            <p className="text-[12px] leading-5 text-muted">
              {openChat?.lastMessageText
                ? `“${openChat.lastMessageText}”`
                : "Ask about fabric, fit or delivery — we usually reply within the hour."}
            </p>

            <Button href="/account/chat" size="sm" fullWidth>
              {openChat && openChat.unreadForCustomer > 0
                ? `${openChat.unreadForCustomer} new message${
                    openChat.unreadForCustomer === 1 ? "" : "s"
                  }`
                : "Open chat"}
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
