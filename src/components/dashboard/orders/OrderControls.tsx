"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { CheckCircle2, Scissors, Wallet } from "lucide-react";

import Button from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { useToast } from "@/components/ui/toast";
import { formatMoney } from "@/lib/format";
import { ORDER_STATUSES, PAYMENT_METHODS } from "@/lib/constants";
import {
  recordPayment,
  updateOrderStatus,
  updateOrderTailoring,
} from "@/actions/orders";

export default function OrderControls({
  order,
  tailors,
}: {
  order: {
    id: number;
    status: string;
    total: number;
    amountPaid: number;
    dueDate: string | null;
    assignedTailorId: string | null;
    internalNotes: string | null;
    hasCustom: boolean;
  };
  tailors: { id: string; name: string }[];
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();

  const [status, setStatus] = useState(order.status);
  const [statusNote, setStatusNote] = useState("");

  const balance = Math.max(0, order.total - order.amountPaid);

  const [amount, setAmount] = useState(String(balance || ""));
  const [method, setMethod] = useState<string>(PAYMENT_METHODS[0]);
  const [reference, setReference] = useState("");

  const [tailorId, setTailorId] = useState(order.assignedTailorId ?? "");
  const [dueDate, setDueDate] = useState(order.dueDate?.slice(0, 10) ?? "");
  const [internalNotes, setInternalNotes] = useState(
    order.internalNotes ?? "",
  );

  const run = (
    action: () => Promise<{ success: boolean; error?: string }>,
    message: string,
  ) =>
    startTransition(async () => {
      const result = await action();

      if (!result.success) {
        toast({
          tone: "error",
          title: "That didn't work",
          description: result.error,
        });
        return;
      }

      toast({ tone: "success", title: message });
      router.refresh();
    });

  return (
    <div className="space-y-4">
      {/* STATUS */}
      <Card>
        <CardHeader title="Order status" icon={<CheckCircle2 size={15} />} />

        <CardBody className="space-y-3">
          <Field label="Move to" htmlFor="order-status">
            <Select id="order-status" value={status} onChange={setStatus}>
              {ORDER_STATUSES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Note" htmlFor="order-status-note">
            <Input
              id="order-status-note"
              value={statusNote}
              onChange={setStatusNote}
              placeholder="Optional — shown in the timeline"
            />
          </Field>

          <Button
            fullWidth
            size="sm"
            loading={pending}
            disabled={status === order.status && !statusNote.trim()}
            onClick={() =>
              run(
                () => updateOrderStatus(order.id, status, statusNote),
                `Order moved to ${status}`,
              )
            }
          >
            Update status
          </Button>
        </CardBody>
      </Card>

      {/* PAYMENT */}
      <Card>
        <CardHeader
          title="Record a payment"
          description={
            balance > 0
              ? `${formatMoney(balance)} still outstanding.`
              : "This order is fully paid."
          }
          icon={<Wallet size={15} />}
        />

        <CardBody className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Amount" htmlFor="payment-amount">
              <Input
                id="payment-amount"
                type="number"
                min={0}
                value={amount}
                onChange={setAmount}
              />
            </Field>

            <Field label="Method" htmlFor="payment-method">
              <Select
                id="payment-method"
                value={method}
                onChange={setMethod}
              >
                {PAYMENT_METHODS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          <Field label="Reference" htmlFor="payment-reference">
            <Input
              id="payment-reference"
              value={reference}
              onChange={setReference}
              placeholder="Transaction id or receipt number"
            />
          </Field>

          <Button
            fullWidth
            size="sm"
            variant="secondary"
            loading={pending}
            disabled={!Number(amount)}
            onClick={() =>
              run(
                () =>
                  recordPayment({
                    orderId: order.id,
                    amount: Number(amount),
                    method,
                    reference,
                  }),
                "Payment recorded",
              )
            }
          >
            Record {Number(amount) ? formatMoney(Number(amount)) : "payment"}
          </Button>
        </CardBody>
      </Card>

      {/* TAILORING */}
      {order.hasCustom && (
        <Card>
          <CardHeader title="Tailoring" icon={<Scissors size={15} />} />

          <CardBody className="space-y-3">
            <Field label="Assigned tailor" htmlFor="order-tailor">
              <Select id="order-tailor" value={tailorId} onChange={setTailorId}>
                <option value="">Unassigned</option>

                {tailors.map((tailor) => (
                  <option key={tailor.id} value={tailor.id}>
                    {tailor.name}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Promised date" htmlFor="order-due">
              <Input
                id="order-due"
                type="date"
                value={dueDate}
                onChange={setDueDate}
              />
            </Field>

            <Field label="Internal notes" htmlFor="order-internal">
              <Textarea
                id="order-internal"
                value={internalNotes}
                onChange={setInternalNotes}
                rows={3}
                placeholder="Fabric issued, cutting notes, alterations…"
              />
            </Field>

            <Button
              fullWidth
              size="sm"
              variant="secondary"
              loading={pending}
              onClick={() =>
                run(
                  () =>
                    updateOrderTailoring({
                      orderId: order.id,
                      assignedTailorId: tailorId || null,
                      dueDate: dueDate || null,
                      internalNotes,
                    }),
                  "Tailoring details saved",
                )
              }
            >
              Save tailoring details
            </Button>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
