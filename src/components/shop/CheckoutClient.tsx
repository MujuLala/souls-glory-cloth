"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Lock, Ruler, ShoppingBag } from "lucide-react";

import Button from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import EmptyState from "@/components/ui/empty-state";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { useToast } from "@/components/ui/toast";
import { formatMoney } from "@/lib/format";
import { shippingFor } from "@/lib/constants";
import { placeOrder } from "@/actions/orders";
import { cartTotals, useCart } from "@/store/cart";
import type { MeasurementSummary, MemberSummary } from "@/data/account";

const paymentMethods = [
  { value: "Cash on Delivery", label: "Cash on delivery" },
  { value: "Bank Transfer", label: "Bank transfer" },
  { value: "Easypaisa", label: "Easypaisa" },
  { value: "JazzCash", label: "JazzCash" },
];

export default function CheckoutClient({
  customer,
  members,
  measurements,
}: {
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  } | null;
  members: MemberSummary[];
  measurements: MeasurementSummary[];
}) {
  const router = useRouter();
  const { toast } = useToast();
  const { lines, clear, setQuantity } = useCart();

  const [mounted, setMounted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [fullName, setFullName] = useState(customer?.fullName ?? "");
  const [email, setEmail] = useState(customer?.email ?? "");
  const [phone, setPhone] = useState(customer?.phone ?? "");
  const [address, setAddress] = useState(customer?.address ?? "");
  const [city, setCity] = useState(customer?.city ?? "");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0].value);

  /* Which member / measurement each made-to-measure line is
     for, keyed by the cart line key. */
  const [assignments, setAssignments] = useState<
    Record<string, { memberId: string; measurementId: string }>
  >({});

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  if (lines.length === 0) {
    return (
      <Card>
        <EmptyState
          icon={<ShoppingBag size={20} />}
          title="Your bag is empty"
          description="Add a piece to your bag before checking out."
          action={
            <Button href="/shop" size="sm">
              Browse the collection
            </Button>
          }
        />
      </Card>
    );
  }

  const { subtotal } = cartTotals(lines);
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  const customLines = lines.filter((line) => line.isCustom);

  const submit = async () => {
    setError(null);
    setSaving(true);

    const result = await placeOrder({
      lines: lines.map((line) => ({
        productId: line.productId,
        quantity: line.quantity,
        size: line.size,
        color: line.color,
        isCustom: line.isCustom,
        memberId: assignments[line.key]?.memberId
          ? Number(assignments[line.key].memberId)
          : line.memberId,
        measurementId: assignments[line.key]?.measurementId
          ? Number(assignments[line.key].measurementId)
          : line.measurementId,
        notes: line.notes,
      })),
      fullName,
      email,
      phone,
      address,
      city,
      notes,
      paymentMethod,
    });

    setSaving(false);

    if (!result.success) {
      setError(result.error);
      toast({ tone: "error", title: "Order not placed", description: result.error });
      return;
    }

    clear();

    toast({
      tone: "success",
      title: "Order placed",
      description: `Your order ${result.data.orderNumber} is confirmed.`,
    });

    router.push(`/order/${result.data.orderNumber}`);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
      {/* ===================================================
          DETAILS
      =================================================== */}

      <div className="space-y-4">
        <Card>
          <CardHeader
            title="Delivery details"
            description="Where should we send the order?"
          />

          <CardBody className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" required htmlFor="name">
              <Input id="name" value={fullName} onChange={setFullName} />
            </Field>

            <Field label="Phone" required htmlFor="phone">
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={setPhone}
                placeholder="03xx xxxxxxx"
              />
            </Field>

            <Field label="Email" htmlFor="email" className="sm:col-span-2">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="you@example.com"
              />
            </Field>

            <Field
              label="Address"
              required
              htmlFor="address"
              className="sm:col-span-2"
            >
              <Textarea
                id="address"
                value={address}
                onChange={setAddress}
                rows={2}
                placeholder="House / street / area"
              />
            </Field>

            <Field label="City" required htmlFor="city">
              <Input id="city" value={city} onChange={setCity} />
            </Field>

            <Field label="Payment method" htmlFor="payment">
              <Select
                id="payment"
                value={paymentMethod}
                onChange={setPaymentMethod}
              >
                {paymentMethods.map((method) => (
                  <option key={method.value} value={method.value}>
                    {method.label}
                  </option>
                ))}
              </Select>
            </Field>

            <Field
              label="Order notes"
              htmlFor="notes"
              className="sm:col-span-2"
              hint="Anything the tailor should know."
            >
              <Textarea
                id="notes"
                value={notes}
                onChange={setNotes}
                rows={3}
              />
            </Field>
          </CardBody>
        </Card>

        {/* MADE TO MEASURE */}
        {customLines.length > 0 && (
          <Card>
            <CardHeader
              title="Made-to-measure details"
              description="Tell us who each stitched piece is for so we use the right measurements."
              icon={<Ruler size={16} />}
            />

            <CardBody className="space-y-4">
              {members.length === 0 ? (
                <p className="rounded-lg border border-info/30 bg-info/10 px-3 py-2.5 text-[12px] leading-5 text-info">
                  You haven&apos;t saved any measurements yet. Place the order
                  and our team will contact you to take them — or{" "}
                  <Link href="/account/measurements" className="underline">
                    add them now
                  </Link>
                  .
                </p>
              ) : (
                customLines.map((line) => {
                  const assignment = assignments[line.key] ?? {
                    memberId: "",
                    measurementId: "",
                  };

                  const memberMeasurements = measurements.filter(
                    (measurement) =>
                      !assignment.memberId ||
                      String(measurement.memberId) === assignment.memberId,
                  );

                  return (
                    <div
                      key={line.key}
                      className="rounded-xl border border-line-subtle bg-surface p-3"
                    >
                      <p className="text-[12px] font-semibold text-ink">
                        {line.name}
                      </p>

                      <div className="mt-2.5 grid gap-3 sm:grid-cols-2">
                        <Field label="Who is it for?">
                          <Select
                            value={assignment.memberId}
                            onChange={(value) =>
                              setAssignments((current) => ({
                                ...current,
                                [line.key]: {
                                  memberId: value,
                                  measurementId: "",
                                },
                              }))
                            }
                          >
                            <option value="">Select a person</option>

                            {members.map((member) => (
                              <option key={member.id} value={member.id}>
                                {member.fullName} · {member.relation}
                              </option>
                            ))}
                          </Select>
                        </Field>

                        <Field label="Measurement to use">
                          <Select
                            value={assignment.measurementId}
                            onChange={(value) =>
                              setAssignments((current) => ({
                                ...current,
                                [line.key]: {
                                  ...assignment,
                                  measurementId: value,
                                },
                              }))
                            }
                          >
                            <option value="">
                              {memberMeasurements.length === 0
                                ? "None saved — we'll take them"
                                : "Select a measurement"}
                            </option>

                            {memberMeasurements.map((measurement) => (
                              <option
                                key={measurement.id}
                                value={measurement.id}
                              >
                                {measurement.title} ·{" "}
                                {measurement.templateName}
                              </option>
                            ))}
                          </Select>
                        </Field>
                      </div>
                    </div>
                  );
                })
              )}
            </CardBody>
          </Card>
        )}
      </div>

      {/* ===================================================
          SUMMARY
      =================================================== */}

      <div>
        <Card className="lg:sticky lg:top-24">
          <CardHeader title="Order summary" />

          <CardBody className="space-y-4">
            <ul className="space-y-3">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-3">
                  <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-lg bg-surface text-faint">
                    {line.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={line.image}
                        alt=""
                        className="size-full object-cover"
                      />
                    ) : (
                      <ShoppingBag size={15} />
                    )}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12px] font-semibold text-ink">
                      {line.name}
                    </span>

                    <span className="mt-0.5 block truncate text-[11px] text-faint">
                      {[line.size, line.color].filter(Boolean).join(" · ") ||
                        line.sku}
                    </span>

                    <span className="mt-1 flex items-center gap-2">
                      <select
                        value={line.quantity}
                        onChange={(event) =>
                          setQuantity(line.key, Number(event.target.value))
                        }
                        aria-label={`Quantity for ${line.name}`}
                        className="h-7 rounded-md border border-line bg-input px-1.5 text-[11px] text-ink"
                      >
                        {Array.from({ length: 10 }, (_, index) => index + 1).map(
                          (value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ),
                        )}
                      </select>

                      <span className="text-[12px] font-bold text-ink">
                        {formatMoney(
                          (line.unitPrice + line.tailoringFee) * line.quantity,
                        )}
                      </span>
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <dl className="space-y-1.5 border-t border-line-subtle pt-3 text-[12px]">
              <div className="flex items-center justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="font-semibold text-ink">
                  {formatMoney(subtotal)}
                </dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-muted">Delivery</dt>
                <dd className="font-semibold text-ink">
                  {shipping === 0 ? "Free" : formatMoney(shipping)}
                </dd>
              </div>

              <div className="flex items-center justify-between border-t border-line-subtle pt-2 text-[14px]">
                <dt className="font-semibold text-ink">Total</dt>
                <dd className="font-bold text-ink">{formatMoney(total)}</dd>
              </div>
            </dl>

            {error && (
              <p className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-[11px] text-danger">
                {error}
              </p>
            )}

            <Button fullWidth size="lg" loading={saving} onClick={submit}>
              <Lock size={15} />
              Place order
            </Button>

            <p className="text-center text-[10.5px] leading-4 text-faint">
              You&apos;ll get an order number straight away. We confirm
              measurements and delivery over chat or phone.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
