import Link from "next/link";

import ProfileForm from "@/components/account/ProfileForm";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getOrCreateCustomer, requireUser } from "@/lib/session";

export const metadata = { title: "Profile" };

export default async function AccountProfilePage() {
  const user = await requireUser();
  const customerId = user.customerId ?? (await getOrCreateCustomer(user));

  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
    select: {
      fullName: true,
      email: true,
      phone: true,
      whatsapp: true,
      gender: true,
      addressLine: true,
      city: true,
      postalCode: true,
      code: true,
      createdAt: true,
    },
  });

  return (
    <div className="space-y-4">
      <ProfileForm
        values={{
          fullName: customer?.fullName ?? "",
          email: customer?.email ?? user.email,
          phone: customer?.phone ?? "",
          whatsapp: customer?.whatsapp ?? "",
          gender: customer?.gender ?? "",
          addressLine: customer?.addressLine ?? "",
          city: customer?.city ?? "",
          postalCode: customer?.postalCode ?? "",
          notes: "",
        }}
      />

      <Card>
        <CardHeader
          title="Sign in & security"
          description="Your login is managed by your email address."
        />

        <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-[12.5px] text-ink">{user.email}</p>

            <p className="mt-1 text-[11px] text-faint">
              Customer since{" "}
              {customer?.createdAt
                ? new Intl.DateTimeFormat("en-GB", {
                    month: "long",
                    year: "numeric",
                  }).format(customer.createdAt)
                : "—"}
            </p>
          </div>

          <Button href="/sign-out" variant="secondary" size="sm">
            Sign out
          </Button>
        </CardBody>
      </Card>

      <p className="text-center text-[11px] text-faint">
        Need something changed we don&apos;t cover here?{" "}
        <Link href="/account/chat" className="text-primary">
          Message the atelier
        </Link>
        .
      </p>
    </div>
  );
}
