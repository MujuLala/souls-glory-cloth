"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Save } from "lucide-react";

import Button from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { useToast } from "@/components/ui/toast";
import { updateOwnProfile } from "@/actions/settings";

export default function AccountSettingsForm({
  name,
  phone,
}: {
  name: string;
  phone: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();

  const [form, setForm] = useState({ name, phone });
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    setError(null);

    startTransition(async () => {
      const result = await updateOwnProfile(form);

      if (!result.success) {
        setError(result.error);
        return;
      }

      toast({ tone: "success", title: "Details saved" });
      router.refresh();
    });
  };

  return (
    <div className="space-y-4">
      <Field label="Name" required htmlFor="staff-name">
        <Input
          id="staff-name"
          value={form.name}
          onChange={(value) => setForm((current) => ({ ...current, name: value }))}
        />
      </Field>

      <Field label="Phone" htmlFor="staff-phone">
        <Input
          id="staff-phone"
          type="tel"
          value={form.phone}
          onChange={(value) => setForm((current) => ({ ...current, phone: value }))}
        />
      </Field>

      {error && (
        <p className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-[11px] text-danger">
          {error}
        </p>
      )}

      <Button loading={pending} onClick={submit}>
        <Save size={15} />
        Save changes
      </Button>
    </div>
  );
}
