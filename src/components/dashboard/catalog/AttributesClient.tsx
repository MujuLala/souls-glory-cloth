"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Pencil, Plus, SlidersHorizontal, Trash2, X } from "lucide-react";

import Badge from "@/components/ui/badge";
import Button, { IconButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DataTable, { type Column } from "@/components/ui/data-table";
import { Field, Input } from "@/components/ui/field";
import Modal, { ConfirmDialog } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { deleteAttribute, saveAttribute } from "@/actions/catalog";

export type AttributeRow = {
  id: number;
  name: string;
  slug: string;
  values: string[];
};

export default function AttributesClient({ rows }: { rows: AttributeRow[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AttributeRow | null>(null);
  const [deleting, setDeleting] = useState<AttributeRow | null>(null);

  const [name, setName] = useState("");
  const [values, setValues] = useState<string[]>([]);
  const [valueDraft, setValueDraft] = useState("");
  const [error, setError] = useState<string | null>(null);

  const openForm = (row?: AttributeRow) => {
    setEditing(row ?? null);
    setName(row?.name ?? "");
    setValues(row?.values ?? []);
    setValueDraft("");
    setError(null);
    setFormOpen(true);
  };

  const addValue = () => {
    const value = valueDraft.trim();

    if (!value || values.includes(value)) {
      setValueDraft("");
      return;
    }

    setValues((current) => [...current, value]);
    setValueDraft("");
  };

  const submit = () => {
    if (!name.trim()) {
      setError("Name the attribute first.");
      return;
    }

    if (values.length === 0) {
      setError("Add at least one value.");
      return;
    }

    startTransition(async () => {
      const result = await saveAttribute({
        id: editing?.id,
        name: name.trim(),
        values,
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      setFormOpen(false);
      toast({
        tone: "success",
        title: editing ? "Attribute updated" : "Attribute created",
      });
      router.refresh();
    });
  };

  const columns: Column<AttributeRow>[] = [
    {
      key: "name",
      header: "Attribute",
      render: (row) => (
        <div className="min-w-0">
          <p className="truncate font-medium text-ink">{row.name}</p>
          <p className="mt-0.5 truncate text-[11px] text-faint">/{row.slug}</p>
        </div>
      ),
    },
    {
      key: "values",
      header: "Values",
      render: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.values.slice(0, 6).map((value) => (
            <Badge key={value} tone="neutral">
              {value}
            </Badge>
          ))}

          {row.values.length > 6 && (
            <Badge tone="primary">+{row.values.length - 6}</Badge>
          )}

          {row.values.length === 0 && (
            <span className="text-[11px] text-faint">No values</span>
          )}
        </div>
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
          <IconButton label={`Edit ${row.name}`} onClick={() => openForm(row)}>
            <Pencil size={14} />
          </IconButton>

          <IconButton
            label={`Delete ${row.name}`}
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
            {rows.length} attribute{rows.length === 1 ? "" : "s"}
          </p>

          <Button size="sm" onClick={() => openForm()}>
            <Plus size={15} />
            Add attribute
          </Button>
        </div>

        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(row) => row.id}
          empty={{
            icon: <SlidersHorizontal size={20} />,
            title: "No attributes yet",
            description:
              "Attributes describe variations — fabric, fit, sleeve length, embroidery.",
            action: (
              <Button size="sm" onClick={() => openForm()}>
                Add attribute
              </Button>
            ),
          }}
          renderCard={(row) => (
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold text-ink">
                    {row.name}
                  </p>

                  <p className="mt-0.5 text-[11px] text-faint">
                    {row.values.length} value
                    {row.values.length === 1 ? "" : "s"}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <IconButton
                    label={`Edit ${row.name}`}
                    onClick={() => openForm(row)}
                  >
                    <Pencil size={15} />
                  </IconButton>

                  <IconButton
                    label={`Delete ${row.name}`}
                    tone="danger"
                    onClick={() => setDeleting(row)}
                  >
                    <Trash2 size={15} />
                  </IconButton>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap gap-1">
                {row.values.slice(0, 8).map((value) => (
                  <Badge key={value} tone="neutral">
                    {value}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        />
      </Card>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? "Edit attribute" : "New attribute"}
        description="Values become the options a customer picks from."
        footer={
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setFormOpen(false)}
            >
              Cancel
            </Button>

            <Button size="sm" loading={pending} onClick={submit}>
              {editing ? "Save changes" : "Create attribute"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Attribute name" required htmlFor="attribute-name">
            <Input
              id="attribute-name"
              value={name}
              onChange={setName}
              placeholder="e.g. Fabric"
            />
          </Field>

          <Field
            label="Values"
            htmlFor="attribute-value"
            hint="Press Enter after each value."
          >
            <div className="flex gap-2">
              <Input
                id="attribute-value"
                value={valueDraft}
                onChange={setValueDraft}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addValue();
                  }
                }}
                placeholder="e.g. Cotton"
              />

              <Button variant="secondary" onClick={addValue}>
                Add
              </Button>
            </div>
          </Field>

          {values.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {values.map((value) => (
                <span
                  key={value}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[11px] text-ink"
                >
                  {value}

                  <button
                    type="button"
                    onClick={() =>
                      setValues((current) =>
                        current.filter((item) => item !== value),
                      )
                    }
                    aria-label={`Remove ${value}`}
                    className="text-faint hover:text-danger"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}

          {error && (
            <p className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-[11px] text-danger">
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

          if (!target) {
            return;
          }

          startTransition(async () => {
            const result = await deleteAttribute(target.id);

            setDeleting(null);

            if (!result.success) {
              toast({
                tone: "error",
                title: "Not deleted",
                description: result.error,
              });
              return;
            }

            toast({ tone: "success", title: "Attribute deleted" });
            router.refresh();
          });
        }}
        loading={pending}
        title={`Delete ${deleting?.name ?? ""}?`}
        message="Products using this attribute lose the option. This cannot be undone."
      />
    </>
  );
}
