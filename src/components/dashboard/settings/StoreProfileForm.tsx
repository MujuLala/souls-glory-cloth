"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Save } from "lucide-react";

import Button from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/field";
import { useToast } from "@/components/ui/toast";
import { saveStoreProfile, type StoreProfile } from "@/actions/settings";

export default function StoreProfileForm({ profile }: { profile: StoreProfile }) {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();

  const [form, setForm] = useState(profile);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof StoreProfile) => (value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const submit = () => {
    setError(null);

    startTransition(async () => {
      const result = await saveStoreProfile(form);

      if (!result.success) {
        setError(result.error);
        return;
      }

      toast({ tone: "success", title: "Store profile saved" });
      router.refresh();
    });
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Store name" required htmlFor="store-name">
        <Input id="store-name" value={form.name} onChange={set("name")} />
      </Field>

      <Field label="Contact email" htmlFor="store-email">
        <Input id="store-email" type="email" value={form.email} onChange={set("email")} />
      </Field>

      <Field label="Contact phone" htmlFor="store-phone">
        <Input id="store-phone" type="tel" value={form.phone} onChange={set("phone")} />
      </Field>

      <Field
        label="Address"
        htmlFor="store-address"
        className="sm:col-span-2"
        hint="Printed on receipts and shown on the support page."
      >
        <Textarea id="store-address" value={form.address} onChange={set("address")} rows={2} />
      </Field>

      {error && (
        <p className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-[11px] text-danger sm:col-span-2">
          {error}
        </p>
      )}

      <div className="sm:col-span-2">
        <Button loading={pending} onClick={submit}>
          <Save size={15} />
          Save store profile
        </Button>
      </div>
    </div>
  );
}
