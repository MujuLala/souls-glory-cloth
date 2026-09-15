import CheckoutClient from "@/components/shop/CheckoutClient";
import { Shell } from "@/components/ui/page";
import { getMeasurements, getMembers } from "@/data/account";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export const metadata = { title: "Checkout" };
export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const user = await getCurrentUser();

  const customerRecord = user?.customerId
    ? await prisma.customer.findUnique({
        where: { id: user.customerId },
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
          addressLine: true,
          city: true,
        },
      })
    : null;

  const [members, measurements] = customerRecord
    ? await Promise.all([
        getMembers(customerRecord.id),
        getMeasurements(customerRecord.id),
      ])
    : [[], []];

  return (
    <section className="py-8 sm:py-12">
      <Shell>
        <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Checkout
        </h1>

        <p className="mt-2 max-w-[60ch] text-[13px] leading-6 text-muted">
          Ready-to-wear pieces ship as they are. Made-to-measure pieces go to
          the atelier once we have the measurements.
        </p>

        <div className="mt-6">
          <CheckoutClient
            customer={
              customerRecord
                ? {
                    fullName: customerRecord.fullName,
                    email: customerRecord.email ?? user?.email ?? "",
                    phone: customerRecord.phone ?? "",
                    address: customerRecord.addressLine ?? "",
                    city: customerRecord.city ?? "",
                  }
                : null
            }
            members={members}
            measurements={measurements}
          />
        </div>
      </Shell>
    </section>
  );
}
