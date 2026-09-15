"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import Button from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import Modal from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { adjustStock } from "@/actions/products";

const types = ["Add", "Remove", "Recount", "Damaged", "Returned"] as const;

export default function StockAdjustModal({
  open,
  onClose,
  product,
}: {
  open: boolean;
  onClose: () => void;
  product: { id: number; name: string; stock: number } | null;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();

  const [type, setType] = useState<(typeof types)[number]>("Add");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!product) {
    return null;
  }

  const preview = (() => {
    const value = Number(quantity) || 0;

    if (type === "Recount") return value;
    if (type === "Add" || type === "Returned") return product.stock + value;
    return product.stock - value;
  })();

  const submit = () => {
    setError(null);

    startTransition(async () => {
      const result = await adjustStock({
        productId: product.id,
        type,
        quantity: Number(quantity) || 0,
        reason,
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      toast({
        tone: "success",
        title: "Stock updated",
        description: `${product.name}: ${product.stock} → ${preview}`,
      });
      onClose();
      router.refresh();
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Adjust stock — ${product.name}`}
      description={`Currently ${product.stock} in stock.`}
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>

          <Button
            size="sm"
            loading={pending}
            disabled={!quantity}
            onClick={submit}
          >
            Apply adjustment
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Type" htmlFor="adjust-type">
            <Select
              id="adjust-type"
              value={type}
              onChange={(value) => setType(value as (typeof types)[number])}
            >
              {types.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>

          <Field
            label={type === "Recount" ? "New stock count" : "Quantity"}
            htmlFor="adjust-quantity"
          >
            <Input
              id="adjust-quantity"
              type="number"
              min={0}
              value={quantity}
              onChange={setQuantity}
            />
          </Field>
        </div>

        {quantity && (
          <p className="rounded-lg border border-line-subtle bg-surface px-3 py-2 text-[12px] text-muted">
            New stock will be{" "}
            <strong className="text-ink">{Math.max(0, preview)}</strong>
          </p>
        )}

        <Field label="Reason" htmlFor="adjust-reason">
          <Textarea
            id="adjust-reason"
            value={reason}
            onChange={setReason}
            rows={2}
            placeholder="e.g. Damaged in transit, physical recount, customer return"
          />
        </Field>

        {error && (
          <p className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-[11px] text-danger">
            {error}
          </p>
        )}
      </div>
    </Modal>
  );
}
