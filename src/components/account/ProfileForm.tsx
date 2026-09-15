"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Save } from "lucide-react";

import Button from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { useToast } from "@/components/ui/toast";
import { updateCustomerProfile } from "@/actions/account";

export type ProfileValues = {
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  gender: string;
  addressLine: string;
  city: string;
  postalCode: string;
  notes: string;
};

export default function ProfileForm({
  values,
  customerId,
  showNotes = false,
}: {
  values: ProfileValues;
  /* Set by the CMS when staff edit someone else's profile. */
  customerId?: number;
  showNotes?: boolean;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();

  const [form, setForm] = useState<ProfileValues>(values);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof ProfileValues) => (value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const submit = () => {
    setError(null);

    startTransition(async () => {
      const result = await updateCustomerProfile({ customerId, ...form });

      if (!result.success) {
        setError(result.error);
        return;
      }

      toast({ tone: "success", title: "Details saved" });
      router.refresh();
    });
  };

  return (
    <Card>
      <CardHeader
        title="Your details"
        description="Used for delivery, receipts and how we greet you."
      />

      <CardBody className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" required htmlFor="profile-name">
          <Input
            id="profile-name"
            value={form.fullName}
            onChange={set("fullName")}
          />
        </Field>

        <Field label="Email" htmlFor="profile-email">
          <Input
            id="profile-email"
            type="email"
            value={form.email}
            onChange={set("email")}
          />
        </Field>

        <Field label="Phone" htmlFor="profile-phone">
          <Input
            id="profile-phone"
            type="tel"
            value={form.phone}
            onChange={set("phone")}
            placeholder="03xx xxxxxxx"
          />
        </Field>

        <Field label="WhatsApp" htmlFor="profile-whatsapp">
          <Input
            id="profile-whatsapp"
            type="tel"
            value={form.whatsapp}
            onChange={set("whatsapp")}
            placeholder="Same as phone if blank"
          />
        </Field>

        <Field label="Gender" htmlFor="profile-gender">
          <Select
            id="profile-gender"
            value={form.gender}
            onChange={set("gender")}
          >
            <option value="">Prefer not to say</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
        </Field>

        <Field label="City" htmlFor="profile-city">
          <Input
            id="profile-city"
            value={form.city}
            onChange={set("city")}
          />
        </Field>

        <Field
          label="Address"
          htmlFor="profile-address"
          className="sm:col-span-2"
        >
          <Textarea
            id="profile-address"
            value={form.addressLine}
            onChange={set("addressLine")}
            rows={2}
          />
        </Field>

        <Field label="Postal code" htmlFor="profile-postal">
          <Input
            id="profile-postal"
            value={form.postalCode}
            onChange={set("postalCode")}
          />
        </Field>

        {showNotes && (
          <Field
            label="Internal notes"
            htmlFor="profile-notes"
            className="sm:col-span-2"
            hint="Staff only — never shown to the customer."
          >
            <Textarea
              id="profile-notes"
              value={form.notes}
              onChange={set("notes")}
              rows={3}
            />
          </Field>
        )}

        {error && (
          <p className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-[11px] text-danger sm:col-span-2">
            {error}
          </p>
        )}

        <div className="sm:col-span-2">
          <Button loading={pending} onClick={submit}>
            <Save size={15} />
            Save changes
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
