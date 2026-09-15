"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { UserPlus } from "lucide-react";

import Button from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { useToast } from "@/components/ui/toast";
import { createCustomer } from "@/actions/account";

export default function NewCustomerForm({
  groups,
}: {
  groups: { id: number; name: string }[];
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [groupId, setGroupId] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    setError(null);

    if (!fullName.trim()) {
      setError("Enter the customer's name.");
      return;
    }

    startTransition(async () => {
      const result = await createCustomer({
        fullName,
        phone,
        email,
        city,
        addressLine,
        groupId: groupId ? Number(groupId) : null,
        notes,
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      toast({
        tone: "success",
        title: `${fullName.trim()} added`,
        description: `Customer code ${result.data.code}.`,
      });

      router.push(`/customers/${result.data.id}?tab=people`);
      router.refresh();
    });
  };

  return (
    <Card className="max-w-[760px]">
      <CardHeader
        title="Customer details"
        description="A “Self” profile is created automatically so you can record measurements straight away."
        icon={<UserPlus size={16} />}
      />

      <CardBody className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" required htmlFor="new-name">
          <Input id="new-name" value={fullName} onChange={setFullName} />
        </Field>

        <Field label="Phone" htmlFor="new-phone">
          <Input
            id="new-phone"
            type="tel"
            value={phone}
            onChange={setPhone}
            placeholder="03xx xxxxxxx"
          />
        </Field>

        <Field label="Email" htmlFor="new-email">
          <Input
            id="new-email"
            type="email"
            value={email}
            onChange={setEmail}
          />
        </Field>

        <Field label="City" htmlFor="new-city">
          <Input id="new-city" value={city} onChange={setCity} />
        </Field>

        <Field label="Address" htmlFor="new-address" className="sm:col-span-2">
          <Textarea
            id="new-address"
            value={addressLine}
            onChange={setAddressLine}
            rows={2}
          />
        </Field>

        <Field label="Group" htmlFor="new-group">
          <Select id="new-group" value={groupId} onChange={setGroupId}>
            <option value="">No group</option>

            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label="Internal notes"
          htmlFor="new-notes"
          className="sm:col-span-2"
        >
          <Textarea
            id="new-notes"
            value={notes}
            onChange={setNotes}
            rows={3}
            placeholder="Preferred fabrics, fit notes, referral source…"
          />
        </Field>

        {error && (
          <p className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-[11px] text-danger sm:col-span-2">
            {error}
          </p>
        )}

        <div className="flex gap-2 sm:col-span-2">
          <Button loading={pending} onClick={submit}>
            Create customer
          </Button>

          <Button
            variant="secondary"
            onClick={() => router.push("/customers")}
            disabled={pending}
          >
            Cancel
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
