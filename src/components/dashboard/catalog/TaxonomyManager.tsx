"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";

import Badge, { StatusBadge } from "@/components/ui/badge";
import Button, { IconButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DataTable, { type Column } from "@/components/ui/data-table";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import Modal, { ConfirmDialog } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { slugify } from "@/lib/format";

/* =========================================================
   TAXONOMY MANAGER

   Categories, collections and tags are the same screen with
   different labels, so they share one component instead of
   three near-identical copies.
========================================================= */

export type TaxonomyRow = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  status?: string | null;
  productCount: number;
};

type SaveInput = {
  id?: number;
  name: string;
  slug?: string;
  description?: string;
  status?: string;
};

type Result = { success: boolean; error?: string };

export default function TaxonomyManager({
  rows,
  singular,
  plural,
  emptyHint,
  withDescription = true,
  withStatus = true,
  onSave,
  onDelete,
}: {
  rows: TaxonomyRow[];
  singular: string;
  plural: string;
  emptyHint: string;
  withDescription?: boolean;
  withStatus?: boolean;
  onSave: (input: SaveInput) => Promise<Result>;
  onDelete: (id: number) => Promise<Result>;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();

  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<TaxonomyRow | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleting, setDeleting] = useState<TaxonomyRow | null>(null);

  /* Form state */
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [error, setError] = useState<string | null>(null);

  const openForm = (row?: TaxonomyRow) => {
    setEditing(row ?? null);
    setName(row?.name ?? "");
    setSlug(row?.slug ?? "");
    setDescription(row?.description ?? "");
    setStatus(row?.status ?? "Active");
    setError(null);
    setFormOpen(true);
  };

  const submit = () => {
    if (!name.trim()) {
      setError(`Give the ${singular.toLowerCase()} a name.`);
      return;
    }

    startTransition(async () => {
      const result = await onSave({
        id: editing?.id,
        name: name.trim(),
        slug: slug.trim() || slugify(name),
        description: withDescription ? description.trim() : undefined,
        status: withStatus ? status : undefined,
      });

      if (!result.success) {
        setError(result.error ?? "Could not save.");
        return;
      }

      setFormOpen(false);
      toast({
        tone: "success",
        title: editing ? `${singular} updated` : `${singular} created`,
      });
      router.refresh();
    });
  };

  const confirmDelete = () => {
    if (!deleting) {
      return;
    }

    const target = deleting;

    startTransition(async () => {
      const result = await onDelete(target.id);

      setDeleting(null);

      if (!result.success) {
        toast({
          tone: "error",
          title: "Not deleted",
          description: result.error,
        });
        return;
      }

      toast({ tone: "success", title: `${singular} deleted` });
      router.refresh();
    });
  };

  const term = search.trim().toLowerCase();

  const filtered = term
    ? rows.filter((row) =>
        `${row.name} ${row.slug}`.toLowerCase().includes(term),
      )
    : rows;

  const columns: Column<TaxonomyRow>[] = [
    {
      key: "name",
      header: singular,
      render: (row) => (
        <div className="min-w-0">
          <p className="truncate font-medium text-ink">{row.name}</p>
          <p className="mt-0.5 truncate text-[11px] text-faint">/{row.slug}</p>
        </div>
      ),
    },
    ...(withDescription
      ? [
          {
            key: "description",
            header: "Description",
            render: (row: TaxonomyRow) => (
              <span className="line-clamp-2 text-muted">
                {row.description || "—"}
              </span>
            ),
          } as Column<TaxonomyRow>,
        ]
      : []),
    {
      key: "products",
      header: "Products",
      align: "right",
      render: (row) => <Badge tone="neutral">{row.productCount}</Badge>,
    },
    ...(withStatus
      ? [
          {
            key: "status",
            header: "Status",
            render: (row: TaxonomyRow) => (
              <StatusBadge status={row.status ?? "Active"} />
            ),
          } as Column<TaxonomyRow>,
        ]
      : []),
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
        <div className="flex flex-col gap-2 border-b border-line-subtle p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative min-w-0 flex-1 sm:max-w-[320px]">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint"
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={`Search ${plural.toLowerCase()}…`}
              aria-label={`Search ${plural}`}
              className="h-10 w-full rounded-lg border border-line bg-input pl-9 pr-3 text-xs text-ink outline-none placeholder:text-faint focus-visible:border-primary/60"
            />
          </div>

          <Button size="sm" onClick={() => openForm()}>
            <Plus size={15} />
            Add {singular.toLowerCase()}
          </Button>
        </div>

        <DataTable
          columns={columns}
          rows={filtered}
          rowKey={(row) => row.id}
          empty={{
            title: `No ${plural.toLowerCase()} yet`,
            description: emptyHint,
            action: (
              <Button size="sm" onClick={() => openForm()}>
                Add {singular.toLowerCase()}
              </Button>
            ),
          }}
          renderCard={(row) => (
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-ink">
                  {row.name}
                </p>

                <p className="mt-0.5 truncate text-[11px] text-faint">
                  /{row.slug} · {row.productCount} product
                  {row.productCount === 1 ? "" : "s"}
                </p>

                {withStatus && (
                  <div className="mt-2">
                    <StatusBadge status={row.status ?? "Active"} />
                  </div>
                )}
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
          )}
        />
      </Card>

      {/* ===================================================
          FORM
      =================================================== */}

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? `Edit ${singular.toLowerCase()}` : `New ${singular.toLowerCase()}`}
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
              {editing ? "Save changes" : `Create ${singular.toLowerCase()}`}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Name" required htmlFor="taxonomy-name">
            <Input
              id="taxonomy-name"
              value={name}
              onChange={(value) => {
                setName(value);

                /* Keep the slug in step until it's edited. */
                if (!editing) {
                  setSlug(slugify(value));
                }
              }}
              placeholder={`${singular} name`}
            />
          </Field>

          <Field
            label="Slug"
            htmlFor="taxonomy-slug"
            hint="Used in storefront links."
          >
            <Input id="taxonomy-slug" value={slug} onChange={setSlug} />
          </Field>

          {withDescription && (
            <Field label="Description" htmlFor="taxonomy-description">
              <Textarea
                id="taxonomy-description"
                value={description}
                onChange={setDescription}
                rows={3}
              />
            </Field>
          )}

          {withStatus && (
            <Field label="Status" htmlFor="taxonomy-status">
              <Select
                id="taxonomy-status"
                value={status}
                onChange={setStatus}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Select>
            </Field>
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
        onConfirm={confirmDelete}
        loading={pending}
        title={`Delete ${deleting?.name ?? ""}?`}
        message={
          deleting && deleting.productCount > 0
            ? `${deleting.productCount} product${
                deleting.productCount === 1 ? " is" : "s are"
              } still linked. They stay in the catalogue but lose this ${singular.toLowerCase()}.`
            : `This removes the ${singular.toLowerCase()} permanently.`
        }
      />
    </>
  );
}
