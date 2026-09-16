import POSClient from "@/components/dashboard/pos/POSClient";
import { Shell } from "@/components/ui/page";
import { getOpenPosSession, getPosProducts, getRecentPosSales } from "@/data/pos";
import { requireStaff } from "@/lib/session";

export const metadata = { title: "Point of Sale" };
export const dynamic = "force-dynamic";

export default async function PosPage() {
  const staff = await requireStaff();

  const [products, session] = await Promise.all([
    getPosProducts(),
    getOpenPosSession(staff.id),
  ]);

  const recentSales = await getRecentPosSales(session?.id ?? null);

  return (
    <div className="py-4 sm:py-5">
      <Shell>
        <POSClient
          products={products}
          session={session}
          recentSales={recentSales}
          cashierName={staff.name ?? staff.email}
        />
      </Shell>
    </div>
  );
}
