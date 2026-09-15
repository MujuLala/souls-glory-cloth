"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Pencil, Plus, Ruler, Trash2, X } from "lucide-react";

import Badge from "@/components/ui/badge";
import Button, { IconButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import EmptyState from "@/components/ui/empty-state";
import { Checkbox, Field, Input, Select } from "@/components/ui/field";
import Modal, { ConfirmDialog } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { slugify } from "@/lib/format";
import {
  deleteMeasurementTemplate,
  saveMeasurementTemplate,
  type TemplateFieldInput,
} from "@/actions/templates";
import type { TemplateWithFields } from "@/data/account";

export default function TemplatesClient({
  templates,
}: {
  templates: (TemplateWithFields & { measurementCount: number })[];
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<TemplateWithFields | null>(null);
  const [deleting, setDeleting] = useState<TemplateWithFields | null>(null);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("Unisex");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState<TemplateFieldInput[]>([]);
  const [error, setError] = useState<string | null>(null);

  const openForm = (template?: TemplateWithFields) => {
    setEditing(template ?? null);
    setName(template?.name ?? "");
    setGender(template?.gender ?? "Unisex");
    setDescription(template?.description ?? "");
    setFields(
      template?.fields.map((field) => ({
        key: field.key,
        label: field.label,
        unit: field.unit,
        helpText: field.helpText ?? "",
        required: field.required,
      })) ?? [{ key: "", label: "", unit: "in", required: true }],
    );
    setError(null);
    setFormOpen(true);
  };

  const addField = () =>
    setFields((current) => [
      ...current,
      { key: "", label: "", unit: "in", required: false },
    ]);

  const updateField = (index: number, patch: Partial<TemplateFieldInput>) =>
    setFields((current) =>
      current.map((field, i) => (i === index ? { ...field, ...patch } : field)),
    );

  const submit = () => {
    startTransition(async () => {
      const result = await saveMeasurementTemplate({
        id: editing?.id,
        name,
        gender,
        description,
        fields: fields.map((field) => ({
          ...field,
          key: field.key || slugify(field.label),
        })),
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      setFormOpen(false);
      toast({ tone: "success", title: editing ? "Garment type updated" : "Garment type created" });
      router.refresh();
    });
  };

  return (
    <>
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between gap-2 border-b border-line-subtle p-3">
          <p className="text-xs text-faint">
            {templates.length} garment type{templates.length === 1 ? "" : "s"}
          </p>

          <Button size="sm" onClick={() => openForm()}>
            <Plus size={15} />
            Add garment type
          </Button>
        </div>

        {templates.length === 0 ? (
          <EmptyState
            icon={<Ruler size={20} />}
            title="No garment types yet"
            description="Define what fields to collect for each type of garment you stitch."
            action={
              <Button size="sm" onClick={() => openForm()}>
                Add the first one
              </Button>
            }
          />
        ) : (
          <ul className="divide-y divide-line-subtle">
            {templates.map((template) => (
              <li key={template.id} className="flex items-start gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-2 text-[13px] font-semibold text-ink">
                    {template.name}
                    <Badge tone="neutral">{template.gender}</Badge>
                    {!template.isActive && <Badge tone="warning">Hidden</Badge>}
                  </p>

                  <p className="mt-1 text-[11px] text-faint">
                    {template.fields.length} field
                    {template.fields.length === 1 ? "" : "s"} ·{" "}
                    {template.measurementCount} in use
                  </p>

                  <div className="mt-2 flex flex-wrap gap-1">
                    {template.fields.slice(0, 8).map((field) => (
                      <Badge key={field.id} tone="neutral">
                        {field.label}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <IconButton
                    label={`Edit ${template.name}`}
                    onClick={() => openForm(template)}
                  >
                    <Pencil size={14} />
                  </IconButton>

                  <IconButton
                    label={`Delete ${template.name}`}
                    tone="danger"
                    onClick={() => setDeleting(template)}
                  >
                    <Trash2 size={14} />
                  </IconButton>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? `Edit ${editing.name}` : "New garment type"}
        size="lg"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>

            <Button size="sm" loading={pending} onClick={submit}>
              {editing ? "Save changes" : "Create garment type"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" required htmlFor="template-name">
              <Input id="template-name" value={name} onChange={setName} placeholder="e.g. Waistcoat" />
            </Field>

            <Field label="Gender" htmlFor="template-gender">
              <Select id="template-gender" value={gender} onChange={setGender}>
                <option value="Unisex">Unisex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Select>
            </Field>
          </div>

          <Field label="Description" htmlFor="template-description">
            <Input
              id="template-description"
              value={description}
              onChange={setDescription}
              placeholder="One line describing the garment"
            />
          </Field>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[11px] font-semibold text-muted">
                Measurement fields
              </p>

              <Button size="sm" variant="secondary" onClick={addField}>
                <Plus size={13} />
                Add field
              </Button>
            </div>

            <div className="space-y-2">
              {fields.map((field, index) => (
                <div
                  key={index}
                  className="grid gap-2 rounded-xl border border-line-subtle bg-surface p-3 sm:grid-cols-[minmax(0,1.3fr)_100px_auto_auto]"
                >
                  <Input
                    value={field.label}
                    onChange={(value) => updateField(index, { label: value })}
                    placeholder="Label, e.g. Chest"
                  />

                  <Select
                    value={field.unit}
                    onChange={(value) => updateField(index, { unit: value })}
                  >
                    <option value="in">inches</option>
                    <option value="cm">cm</option>
                  </Select>

                  <Checkbox
                    checked={field.required ?? false}
                    onChange={(checked) => updateField(index, { required: checked })}
                    label="Required"
                  />

                  <IconButton
                    label="Remove field"
                    tone="danger"
                    onClick={() =>
                      setFields((current) => current.filter((_, i) => i !== index))
                    }
                    className="justify-self-end"
                  >
                    <X size={15} />
                  </IconButton>
                </div>
              ))}
            </div>
          </div>

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
          if (!target) return;

          startTransition(async () => {
            const result = await deleteMeasurementTemplate(target.id);
            setDeleting(null);

            if (!result.success) {
              toast({ tone: "error", title: "Not deleted", description: result.error });
              return;
            }

            toast({ tone: "success", title: "Garment type deleted" });
            router.refresh();
          });
        }}
        loading={pending}
        title={`Delete ${deleting?.name ?? ""}?`}
        message="This only works if no measurements use this garment type yet."
      />
    </>
  );
}
