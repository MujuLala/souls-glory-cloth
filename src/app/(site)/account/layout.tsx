import { Shell } from "@/components/ui/page";
import AccountNav from "@/components/account/AccountNav";
import { getOrCreateCustomer, requireUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { initials } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  const customerId = user.customerId ?? (await getOrCreateCustomer(user));

  const [customer, counts] = await Promise.all([
    prisma.customer.findUnique({
      where: { id: customerId },
      select: { fullName: true, code: true, email: true },
    }),
    Promise.all([
      prisma.order.count({ where: { customerId } }),
      prisma.customerMember.count({ where: { customerId } }),
      prisma.measurement.count({ where: { customerId } }),
    ]),
  ]);

  const [orderCount, memberCount, measurementCount] = counts;

  const name = customer?.fullName ?? user.name ?? user.email;

  return (
    <section className="py-8 sm:py-10">
      <Shell>
        {/* HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3.5">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary/12 text-sm font-bold text-primary">
              {initials(name)}
            </span>

            <div className="min-w-0">
              <h1 className="truncate text-xl font-bold tracking-tight text-ink sm:text-2xl">
                {name}
              </h1>

              <p className="mt-0.5 truncate text-[11px] text-faint">
                {customer?.code} · {customer?.email ?? user.email}
              </p>
            </div>
          </div>

          <dl className="flex gap-4 text-center">
            {[
              { label: "Orders", value: orderCount },
              { label: "People", value: memberCount },
              { label: "Measurements", value: measurementCount },
            ].map((stat) => (
              <div
                key={stat.label}
                className="min-w-[72px] rounded-xl border border-line bg-card px-3 py-2"
              >
                <dd className="text-base font-bold text-ink">{stat.value}</dd>
                <dt className="mt-0.5 text-[10px] text-faint">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <AccountNav />

        <div className="mt-5">{children}</div>
      </Shell>
    </section>
  );
}
