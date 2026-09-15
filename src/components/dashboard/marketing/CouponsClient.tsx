"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Copy, Percent, Pencil, Plus, Ticket, Trash2 } from "lucide-react";

import Badge, { StatusBadge } from "@/components/ui/badge";
import Button, { IconButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DataTable, { type Column } from "@/components/ui/data-table";
import { Field, Input, Select } from "@/components/ui/field";
import Modal, { ConfirmDialog } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { formatDate, formatMoney } from "@/lib/format";
import { deleteCoupon, saveCoupon, setCouponStatus } from "@/actions/marketing";

export type CouponRow = {
  id: number;
  code: string;
  description: string | null;
  type: string;
  value: number;
  minOrderTotal: number | null;
  usageLimit: number | null;
  usedCount: number;
  status: string;
  endsAt: string | null;
};

export default function CouponsClient({ coupons }: { coupons: CouponRow[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<CouponRow | null>(null);
  const [deleting, setDeleting] = useState<CouponRow | null>(null);

  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Percentage");
  const [value, setValue] = useState("");
  const [minOrderTotal, setMinOrderTotal] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [error, setError] = useState<string | null>(null);

  const openForm = (coupon?: CouponRow) => {
    setEditing(coupon ?? null);
    setCode(coupon?.code ?? "");
    setDescription(coupon?.description ?? "");
    setType(coupon?.type ?? "Percentage");
    setValue(coupon ? String(coupon.value) : "");
    setMinOrderTotal(coupon?.minOrderTotal ? String(coupon.minOrderTotal) : "");
    setUsageLimit(coupon?.usageLimit ? String(coupon.usageLimit) : "");
    setEndsAt(coupon?.endsAt?.slice(0, 10) ?? "");
    setError(null);
    setFormOpen(true);
  };

  const submit = () => {
    startTransition(async () => {
      const result = await saveCoupon({
        id: editing?.id,
        code,
        description,
        type,
        value: Number(value) || 0,
        minOrderTotal: minOrderTotal ? Number(minOrderTotal) : null,
        usageLimit: usageLimit ? Number(usageLimit) : null,
        endsAt: endsAt || null,
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      setFormOpen(false);
      toast({ tone: "success", title: editing ? "Coupon updated" : "Coupon created" });
      router.refresh();
    });
  };

  const copyCode = (value: string) => {
    void navigator.clipboard?.writeText(value);
    toast({ tone: "info", title: `Copied ${value}` });
  };

  const columns: Column<CouponRow>[] = [
    {
      key: "code",
      header: "Code",
      render: (row) => (
        <button
          type="button"
          onClick={() => copyCode(row.code)}
          className="flex items-center gap-1.5 font-mono text-[12px] font-semibold text-ink hover:text-primary"
        >
          {row.code}
          <Copy size={11} />
        </button>
      ),
    },
    {
      key: "value",
      header: "Discount",
      render: (row) => (
        <span className="text-muted">
          {row.type === "Percentage"
            ? `${row.value}%`
            : row.type === "Fixed"
              ? formatMoney(row.value)
              : "Free shipping"}
        </span>
      ),
    },
    {
      key: "usage",
      header: "Used",
      align: "right",
      render: (row) => (
        <span className="text-muted">
          {row.usedCount}
          {row.usageLimit ? ` / ${row.usageLimit}` : ""}
        </span>
      ),
    },
    {
      key: "expires",
      header: "Expires",
      render: (row) => (
        <span className="text-muted">
          {row.endsAt ? formatDate(row.endsAt) : "No expiry"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <button
          type="button"
          onClick={() =>
            startTransition(async () => {
              await setCouponStatus(
                row.id,
                row.status === "Active" ? "Inactive" : "Active",
              );
              router.refresh();
            })
          }
        >
          <StatusBadge status={row.status} />
        </button>
      ),
    },
    {
      key: "actions",
      header: "",
      align: "right",
      width: "w-[90px]",
      hideOnMobile: true,
      render: (row) => (
        <div className="flex items-center justify-end gap-1">
          <IconButton label="Edit coupon" onClick={() => openForm(row)}>
            <Pencil size={14} />
          </IconButton>

          <IconButton
            label="Delete coupon"
            tone="danger"
            onClick={() => setDeleting(row)}
          >
            <Trash2 size={14} />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <>
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between gap-2 border-b border-line-subtle p-3">
          <p className="text-xs text-faint">
            {coupons.length} coupon{coupons.length === 1 ? "" : "s"}
          </p>

          <Button size="sm" onClick={() => openForm()}>
            <Plus size={15} />
            New coupon
          </Button>
        </div>

        <DataTable
          columns={columns}
          rows={coupons}
          rowKey={(row) => row.id}
          empty={{
            icon: <Ticket size={20} />,
            title: "No coupons yet",
            description: "Create a code customers can enter at checkout.",
            action: (
              <Button size="sm" onClick={() => openForm()}>
                New coupon
              </Button>
            ),
          }}
        />
      </Card>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? "Edit coupon" : "New coupon"}
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>

            <Button size="sm" loading={pending} onClick={submit}>
              {editing ? "Save changes" : "Create coupon"}
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Code" required htmlFor="coupon-code" className="sm:col-span-2">
            <Input
              id="coupon-code"
              value={code}
              onChange={(value) => setCode(value.toUpperCase())}
              placeholder="EID25"
            />
          </Field>

          <Field label="Type" htmlFor="coupon-type">
            <Select id="coupon-type" value={type} onChange={setType}>
              <option value="Percentage">Percentage off</option>
              <option value="Fixed">Fixed amount off</option>
              <option value="Free Shipping">Free shipping</option>
            </Select>
          </Field>

          <Field
            label={type === "Percentage" ? "Percent off" : "Amount off"}
            htmlFor="coupon-value"
          >
            <Input
              id="coupon-value"
              type="number"
              min={0}
              value={value}
              onChange={setValue}
              icon={type === "Percentage" ? <Percent size={13} /> : undefined}
            />
          </Field>

          <Field label="Minimum order" htmlFor="coupon-min">
            <Input
              id="coupon-min"
              type="number"
              min={0}
              value={minOrderTotal}
              onChange={setMinOrderTotal}
              placeholder="No minimum"
            />
          </Field>

          <Field label="Usage limit" htmlFor="coupon-limit">
            <Input
              id="coupon-limit"
              type="number"
              min={0}
              value={usageLimit}
              onChange={setUsageLimit}
              placeholder="Unlimited"
            />
          </Field>

          <Field label="Expires" htmlFor="coupon-ends" className="sm:col-span-2">
            <Input
              id="coupon-ends"
              type="date"
              value={endsAt}
              onChange={setEndsAt}
            />
          </Field>

          <Field label="Description" htmlFor="coupon-description" className="sm:col-span-2">
            <Input
              id="coupon-description"
              value={description}
              onChange={setDescription}
              placeholder="Internal note"
            />
          </Field>

          {error && (
            <p className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-[11px] text-danger sm:col-span-2">
              {error}
            </p>
          )}
        </div>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={() => {
          const target = deleting;
          if (!target) return;

          startTransition(async () => {
            const result = await deleteCoupon(target.id);
            setDeleting(null);

            if (!result.success) {
              toast({ tone: "error", title: "Not deleted", description: result.error });
              return;
            }

            toast({ tone: "success", title: "Coupon deleted" });
            router.refresh();
          });
        }}
        loading={pending}
        title={`Delete ${deleting?.code ?? ""}?`}
        message="Customers will no longer be able to use this code."
      />
    </>
  );
}
