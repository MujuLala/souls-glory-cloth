import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, MessageSquare, Package, Ruler, User } from "lucide-react";

import Badge, { StatusBadge } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Breadcrumbs, PageHeader, PageShell } from "@/components/ui/page";
import OrderControls from "@/components/dashboard/orders/OrderControls";
import { getOrderDetail } from "@/data/orders";
import { prisma } from "@/lib/prisma";
import { formatDateTime, formatMoney } from "@/lib/format";

export const metadata = { title: "Order" };

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const orderId = Number(id);

  if (!Number.isInteger(orderId)) {
    notFound();
  }

  const order = await getOrderDetail(orderId);

  if (!order) {
    notFound();
  }

  const tailors = await prisma.appUser.findMany({
    where: { role: { in: ["Tailor", "Manager", "Admin"] } },
    orderBy: { name: "asc" },
    select: { id: true, name: true, email: true },
  });

  const hasCustom = order.items.some((item) => item.isCustom);

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Orders", href: "/orders" },
          { label: order.orderNumber },
        ]}
      />

      <PageHeader
        title={order.orderNumber}
        description={`Placed ${formatDateTime(order.createdAt)} via ${order.channel}`}
        actions={
          <>
            <StatusBadge status={order.status} />
            <StatusBadge status={order.paymentStatus} />
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-4">
          {/* CUSTOMER */}
          <Card>
            <CardHeader title="Customer" icon={<User size={15} />} />

            <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-ink">
                  {order.customer?.fullName ?? order.shippingName ?? "Walk-in customer"}
                </p>

                <p className="mt-1 text-[11px] text-faint">
                  {[
                    order.customer?.code,
                    order.shippingPhone,
                    order.customer?.email,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>

                {order.shippingAddress && (
                  <p className="mt-1 text-[11px] text-faint">
                    {order.shippingAddress}, {order.shippingCity}
                  </p>
                )}
              </div>

              {order.customer && (
                <div className="flex shrink-0 gap-2">
                  <Button
                    href={`/customers/${order.customer.id}`}
                    size="sm"
                    variant="secondary"
                  >
                    View profile
                  </Button>

                  <Button href="/inbox" size="sm" variant="secondary">
                    <MessageSquare size={14} />
                    Chat
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>

          {/* ITEMS */}
          <Card>
            <CardHeader title="Items" icon={<Package size={15} />} />

            <ul className="divide-y divide-line-subtle">
              {order.items.map((item) => (
                <li key={item.id} className="p-4">
                  <div className="flex gap-3">
                    <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-lg bg-surface text-faint">
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.image}
                          alt=""
                          className="size-full object-cover"
                        />
                      ) : (
                        <Package size={16} />
                      )}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-semibold text-ink">
                        {item.name}
                      </p>

                      <p className="mt-0.5 text-[11px] text-faint">
                        {[
                          `SKU ${item.sku ?? "—"}`,
                          `Qty ${item.quantity}`,
                          item.size,
                          item.color,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>

                      {item.isCustom && (
                        <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                          <Ruler size={10} />
                          Made to measure
                          {item.memberName ? ` · ${item.memberName}` : ""}
                        </span>
                      )}

                      {item.customNotes && (
                        <p className="mt-1.5 text-[11px] italic text-muted">
                          &ldquo;{item.customNotes}&rdquo;
                        </p>
                      )}
                    </div>

                    <span className="shrink-0 text-right text-[13px] font-bold text-ink">
                      {formatMoney(item.total)}
                    </span>
                  </div>

                  {item.measurement && (
                    <div className="mt-3 rounded-lg border border-line-subtle bg-surface p-3">
                      <p className="mb-2 text-[11px] font-semibold text-ink">
                        {item.measurement.title} ·{" "}
                        {item.measurement.templateName}
                      </p>

                      <dl className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                        {Object.entries(item.measurement.values).map(
                          ([key, value]) => (
                            <div key={key}>
                              <dt className="text-[9px] uppercase tracking-wide text-faint">
                                {key}
                              </dt>
                              <dd className="text-[12px] font-semibold text-ink">
                                {value}
                                {item.measurement?.unit}
                              </dd>
                            </div>
                          ),
                        )}
                      </dl>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="border-t border-line-subtle p-4">
              <dl className="space-y-1.5 text-[12px]">
                <div className="flex justify-between">
                  <dt className="text-muted">Subtotal</dt>
                  <dd className="text-ink">{formatMoney(order.subtotal)}</dd>
                </div>

                {order.discountTotal > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-muted">Discount</dt>
                    <dd className="text-danger">
                      −{formatMoney(order.discountTotal)}
                    </dd>
                  </div>
                )}

                <div className="flex justify-between">
                  <dt className="text-muted">Delivery</dt>
                  <dd className="text-ink">
                    {order.shippingTotal === 0
                      ? "Free"
                      : formatMoney(order.shippingTotal)}
                  </dd>
                </div>

                <div className="flex justify-between border-t border-line-subtle pt-2 text-[14px] font-bold">
                  <dt className="text-ink">Total</dt>
                  <dd className="text-ink">{formatMoney(order.total)}</dd>
                </div>

                <div className="flex justify-between">
                  <dt className="text-muted">Paid</dt>
                  <dd className="text-success">
                    {formatMoney(order.amountPaid)}
                  </dd>
                </div>
              </dl>
            </div>
          </Card>

          {order.notes && (
            <Card>
              <CardHeader title="Customer notes" />
              <CardBody>
                <p className="text-[12.5px] leading-6 text-muted">
                  {order.notes}
                </p>
              </CardBody>
            </Card>
          )}

          {/* TIMELINE */}
          <Card>
            <CardHeader title="Timeline" icon={<Clock size={15} />} />

            <CardBody>
              {order.events.length === 0 ? (
                <p className="text-[12px] text-faint">No events recorded.</p>
              ) : (
                <ol className="space-y-3">
                  {order.events.map((event) => (
                    <li key={event.id} className="flex gap-3">
                      <span className="mt-1 size-2 shrink-0 rounded-full bg-primary" />

                      <div className="min-w-0">
                        <p className="text-[12.5px] font-semibold text-ink">
                          <Badge tone="neutral">{event.status}</Badge>
                        </p>

                        {event.note && (
                          <p className="mt-1 text-[12px] text-muted">
                            {event.note}
                          </p>
                        )}

                        <p className="mt-1 text-[10.5px] text-faint">
                          {formatDateTime(event.createdAt)}
                          {event.createdBy ? ` · ${event.createdBy}` : ""}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </CardBody>
          </Card>

          {order.payments.length > 0 && (
            <Card>
              <CardHeader title="Payments" />

              <ul className="divide-y divide-line-subtle">
                {order.payments.map((payment) => (
                  <li
                    key={payment.id}
                    className="flex items-center justify-between p-3.5 text-[12.5px]"
                  >
                    <span className="text-ink">
                      {payment.method}
                      {payment.reference ? ` · ${payment.reference}` : ""}
                    </span>

                    <span className="flex items-center gap-3">
                      <span className="font-semibold text-success">
                        {formatMoney(payment.amount)}
                      </span>

                      <span className="text-[10.5px] text-faint">
                        {formatDateTime(payment.createdAt)}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        {/* SIDE CONTROLS */}
        <OrderControls
          order={{
            id: order.id,
            status: order.status,
            total: order.total,
            amountPaid: order.amountPaid,
            dueDate: order.dueDate,
            assignedTailorId: order.assignedTailorId,
            internalNotes: order.internalNotes,
            hasCustom,
          }}
          tailors={tailors.map((tailor) => ({
            id: tailor.id,
            name: tailor.name ?? tailor.email,
          }))}
        />
      </div>
    </PageShell>
  );
}
