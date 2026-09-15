import Link from "next/link";
import { Package, Ruler } from "lucide-react";

import Badge, { StatusBadge } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import EmptyState from "@/components/ui/empty-state";
import { formatDate, formatMoney } from "@/lib/format";
import { getCustomerOrders } from "@/data/account";
import { getOrCreateCustomer, requireUser } from "@/lib/session";

export const metadata = { title: "Your orders" };

export default async function AccountOrdersPage() {
  const user = await requireUser();
  const customerId = user.customerId ?? (await getOrCreateCustomer(user));

  const orders = await getCustomerOrders(customerId);

  if (orders.length === 0) {
    return (
      <Card>
        <EmptyState
          icon={<Package size={20} />}
          title="No orders yet"
          description="Once you place an order you can follow its tailoring progress here."
          action={
            <Button href="/shop" size="sm">
              Browse the collection
            </Button>
          }
        />
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <Card key={order.id} className="overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-line-subtle p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="flex flex-wrap items-center gap-2 text-[13px] font-semibold text-ink">
                {order.orderNumber}
                <StatusBadge status={order.status} />
                <StatusBadge status={order.paymentStatus} />
              </p>

              <p className="mt-1 text-[11px] text-faint">
                Placed {formatDate(order.createdAt)}
                {order.dueDate
                  ? ` · due ${formatDate(order.dueDate)}`
                  : ""}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[14px] font-bold text-ink">
                {formatMoney(order.total)}
              </span>

              <Button
                href={`/order/${order.orderNumber}`}
                size="sm"
                variant="secondary"
              >
                Details
              </Button>
            </div>
          </div>

          <ul className="divide-y divide-line-subtle">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-center gap-3 p-4">
                <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-surface text-faint">
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

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[12.5px] font-medium text-ink">
                    {item.name}
                  </span>

                  <span className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[11px] text-faint">
                    Qty {item.quantity}
                    {item.size ? ` · ${item.size}` : ""}

                    {item.isCustom && (
                      <Badge tone="primary">
                        <Ruler size={10} />
                        {item.memberName ?? "Made to measure"}
                      </Badge>
                    )}
                  </span>
                </span>

                <span className="shrink-0 text-[12.5px] font-semibold text-ink">
                  {formatMoney(item.total)}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      ))}

      <p className="pt-1 text-center text-[11px] text-faint">
        Something look wrong?{" "}
        <Link href="/account/chat" className="text-primary">
          Message the atelier
        </Link>
        .
      </p>
    </div>
  );
}
