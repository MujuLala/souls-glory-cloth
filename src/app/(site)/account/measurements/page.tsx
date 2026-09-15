import { Suspense } from "react";

import MeasurementsManager from "@/components/account/MeasurementsManager";
import {
  getMeasurements,
  getMeasurementTemplates,
  getMembers,
} from "@/data/account";
import { ensureMeasurementTemplates } from "@/lib/seed-templates";
import { getOrCreateCustomer, requireUser } from "@/lib/session";

export const metadata = { title: "Measurements" };

export default async function AccountMeasurementsPage() {
  const user = await requireUser();
  const customerId = user.customerId ?? (await getOrCreateCustomer(user));

  /* A fresh workspace has no garment types yet. */
  await ensureMeasurementTemplates();

  const [measurements, members, templates] = await Promise.all([
    getMeasurements(customerId),
    getMembers(customerId),
    getMeasurementTemplates(),
  ]);

  return (
    <Suspense fallback={null}>
      <MeasurementsManager
        measurements={measurements}
        members={members}
        templates={templates}
      />
    </Suspense>
  );
}
