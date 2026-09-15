import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Package, Ruler, Truck } from "lucide-react";

import Badge, { StatusBadge } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Shell } from "@/components/ui/page";
import { prisma } from "@/lib/prisma";
import { formatDate, formatMoney, toNumber } from "@/lib/format";

export const metadata = { title: "Order confirmed" };
export const dynamic = "force-dynamic";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;

  const order = await prisma.order.findUnique({
    where: { orderNumber: number },
    include: {
      items: { include: { member: { select: { fullName: true } } } },
      events: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!order) {
    notFound();
  }

  const hasCustom = order.items.some((item) => item.isCustom);

  return (
    <section className="py-10 sm:py-14">
      <Shell className="max-w-[92vw] lg:max-w-[820px]">
        <div className="text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-success/12 text-success">
            <CheckCircle2 size={26} />
          </span>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Thank you — your order is in
          </h1>

          <p className="mt-2 text-[13px] text-muted">
            Order <strong className="text-ink">{order.orderNumber}</strong> ·
            placed {formatDate(order.createdAt)}
          </p>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <StatusBadge status={order.status} />
            <StatusBadge status={order.paymentStatus} />
            <Badge tone="neutral">{order.type}</Badge>
          </div>
        </div>

        <Card className="mt-6">
          <CardHeader title="What you ordered" icon={<Package size={16} />} />

          <CardBody>
            <ul className="divide-y divide-line-subtle">
              {order.items.map((item) => (
                <li key={item.id} className="flex gap-3 py-3 first:pt-0">
                  <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-lg bg-surface text-faint">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt=""
                        className="size-full object-cover"
                      />
                    ) : (
                      <Package size={15} />
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-ink">
                      {item.name}
                    </p>

                    <p className="mt-0.5 text-[11px] text-faint">
                      {[
                        `Qty ${item.quantity}`,
                        item.size,
                        item.color,
                        item.member?.fullName
                          ? `for ${item.member.fullName}`
                          : null,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>

                    {item.isCustom && (
                      <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                        <Ruler size={10} />
                        Made to measure
                      </span>
                    )}
                  </div>

                  <span className="shrink-0 text-[13px] font-bold text-ink">
                    {formatMoney(item.total)}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="mt-4 space-y-1.5 border-t border-line-subtle pt-3 text-[12px]">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="text-ink">{formatMoney(order.subtotal)}</dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-muted">Delivery</dt>
                <dd className="text-ink">
                  {toNumber(order.shippingTotal) === 0
                    ? "Free"
                    : formatMoney(order.shippingTotal)}
                </dd>
              </div>

              <div className="flex justify-between border-t border-line-subtle pt-2 text-[14px] font-bold">
                <dt className="text-ink">Total</dt>
                <dd className="text-ink">{formatMoney(order.total)}</dd>
              </div>
            </dl>
          </CardBody>
        </Card>

        <Card className="mt-4">
          <CardHeader title="What happens next" icon={<Truck size={16} />} />

          <CardBody>
            <ol className="space-y-3 text-[12.5px] leading-5 text-muted">
              <li>
                <strong className="text-ink">We confirm your order.</strong>{" "}
                You&apos;ll hear from us on {order.shippingPhone} — or right
                here in chat.
              </li>

              {hasCustom && (
                <li>
                  <strong className="text-ink">Measurements.</strong> For
                  made-to-measure pieces we confirm the fit before cutting
                  cloth. Saved measurements speed this up.
                </li>
              )}

              <li>
                <strong className="text-ink">
                  {hasCustom ? "Tailoring and delivery." : "Delivery."}
                </strong>{" "}
                {hasCustom
                  ? "Stitching takes 7–12 working days, then we ship."
                  : "Your parcel goes out within 48 hours."}
              </li>
            </ol>

            <div className="mt-5 flex flex-wrap gap-2">
              <Button href="/account/orders" size="sm">
                Track your orders
              </Button>

              <Button href="/shop" variant="secondary" size="sm">
                Keep shopping
              </Button>
            </div>
          </CardBody>
        </Card>

        <p className="mt-5 text-center text-[11px] text-faint">
          Questions? <Link href="/support" className="text-primary">Reach the atelier</Link>{" "}
          or use the chat in the corner.
        </p>
      </Shell>
    </section>
  );
}
