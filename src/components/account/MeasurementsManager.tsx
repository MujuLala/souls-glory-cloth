"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { Pencil, Plus, Ruler, Star, Trash2 } from "lucide-react";

import Badge from "@/components/ui/badge";
import Button, { IconButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/components/ui/cn";
import EmptyState from "@/components/ui/empty-state";
import { Checkbox, Field, Input, Select, Textarea } from "@/components/ui/field";
import Modal, { ConfirmDialog } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { formatDate } from "@/lib/format";
import { deleteMeasurement, saveMeasurement } from "@/actions/account";
import type {
  MeasurementSummary,
  MemberSummary,
  TemplateWithFields,
} from "@/data/account";

/* =========================================================
   MEASUREMENTS MANAGER

   One record per person per garment type. Values are stored
   against the template's field keys, so adding a field to a
   template never breaks an existing record.
========================================================= */

export default function MeasurementsManager({
  measurements,
  members,
  templates,
  customerId,
}: {
  measurements: MeasurementSummary[];
  members: MemberSummary[];
  templates: TemplateWithFields[];
  customerId?: number;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();

  const memberFilter = params.get("member");

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<MeasurementSummary | null>(null);
  const [deleting, setDeleting] = useState<MeasurementSummary | null>(null);

  const [memberId, setMemberId] = useState<string>(memberFilter ?? "");
  const [templateId, setTemplateId] = useState<string>("");
  const [title, setTitle] = useState("");
  const [unit, setUnit] = useState("in");
  const [values, setValues] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const template = useMemo(
    () => templates.find((entry) => String(entry.id) === templateId) ?? null,
    [templates, templateId],
  );

  const visible = memberFilter
    ? measurements.filter(
        (measurement) => String(measurement.memberId) === memberFilter,
      )
    : measurements;

  const openForm = (measurement?: MeasurementSummary) => {
    setEditing(measurement ?? null);
    setMemberId(
      measurement?.memberId
        ? String(measurement.memberId)
        : (memberFilter ?? String(members[0]?.id ?? "")),
    );
    setTemplateId(
      measurement?.templateId
        ? String(measurement.templateId)
        : String(templates[0]?.id ?? ""),
    );
    setTitle(measurement?.title ?? "");
    setUnit(measurement?.unit ?? "in");
    setValues(
      measurement
        ? Object.fromEntries(
            Object.entries(measurement.values).map(([key, value]) => [
              key,
              String(value),
            ]),
          )
        : {},
    );
    setNotes(measurement?.notes ?? "");
    setIsDefault(measurement?.isDefault ?? false);
    setError(null);
    setFormOpen(true);
  };

  const submit = () => {
    if (!templateId) {
      setError("Choose a garment type.");
      return;
    }

    startTransition(async () => {
      const result = await saveMeasurement({
        id: editing?.id,
        customerId,
        memberId: memberId ? Number(memberId) : null,
        templateId: Number(templateId),
        title: title.trim() || template?.name || "Measurement",
        unit,
        values,
        notes,
        isDefault,
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      setFormOpen(false);
      toast({
        tone: "success",
        title: editing ? "Measurement updated" : "Measurement saved",
      });
      router.refresh();
    });
  };

  const activeMember = members.find(
    (member) => String(member.id) === memberFilter,
  );

  return (
    <>
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-line-subtle p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
              <Ruler size={16} />
            </span>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-ink">
                {activeMember
                  ? `${activeMember.fullName}'s measurements`
                  : "Saved measurements"}
              </h2>

              <p className="mt-0.5 text-[11px] text-faint">
                {visible.length} record{visible.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {memberFilter && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => router.push(window.location.pathname)}
              >
                Show everyone
              </Button>
            )}

            <Button
              size="sm"
              onClick={() => openForm()}
              disabled={templates.length === 0}
            >
              <Plus size={15} />
              Add measurement
            </Button>
          </div>
        </div>

        {visible.length === 0 ? (
          <EmptyState
            icon={<Ruler size={20} />}
            title="No measurements saved"
            description="Record a set once and every future order uses it — no re-measuring."
            action={
              <Button
                size="sm"
                onClick={() => openForm()}
                disabled={templates.length === 0}
              >
                Add a measurement
              </Button>
            }
          />
        ) : (
          <ul className="divide-y divide-line-subtle">
            {visible.map((measurement) => {
              const fields =
                templates.find(
                  (entry) => entry.id === measurement.templateId,
                )?.fields ?? [];

              return (
                <li key={measurement.id} className="p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="flex flex-wrap items-center gap-2 text-[13px] font-semibold text-ink">
                        {measurement.title}

                        {measurement.isDefault && (
                          <Badge tone="primary">
                            <Star size={10} fill="currentColor" />
                            Default
                          </Badge>
                        )}
                      </p>

                      <p className="mt-0.5 text-[11px] text-faint">
                        {[
                          measurement.memberName ?? "Unassigned",
                          measurement.templateName,
                          `updated ${formatDate(measurement.updatedAt)}`,
                        ].join(" · ")}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-1">
                      <IconButton
                        label="Edit measurement"
                        onClick={() => openForm(measurement)}
                      >
                        <Pencil size={14} />
                      </IconButton>

                      <IconButton
                        label="Delete measurement"
                        tone="danger"
                        onClick={() => setDeleting(measurement)}
                      >
                        <Trash2 size={14} />
                      </IconButton>
                    </div>
                  </div>

                  {/* VALUES */}
                  <dl className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
                    {Object.entries(measurement.values).map(([key, value]) => {
                      const label =
                        fields.find((field) => field.key === key)?.label ?? key;

                      return (
                        <div
                          key={key}
                          className="rounded-lg border border-line-subtle bg-surface px-2.5 py-2"
                        >
                          <dt className="truncate text-[10px] text-faint">
                            {label}
                          </dt>

                          <dd className="mt-0.5 text-[13px] font-semibold text-ink">
                            {value}
                            <span className="ml-0.5 text-[10px] font-normal text-faint">
                              {measurement.unit}
                            </span>
                          </dd>
                        </div>
                      );
                    })}
                  </dl>

                  {measurement.notes && (
                    <p className="mt-2.5 text-[11px] leading-5 text-muted">
                      {measurement.notes}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      {/* ===================================================
          FORM
      =================================================== */}

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? "Edit measurement" : "New measurement"}
        description="Measure over a well-fitting garment, not over the body."
        size="lg"
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
              {editing ? "Save changes" : "Save measurement"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Person" htmlFor="measurement-member">
              <Select
                id="measurement-member"
                value={memberId}
                onChange={setMemberId}
              >
                <option value="">Not specified</option>

                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.fullName} · {member.relation}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Garment type" required htmlFor="measurement-template">
              <Select
                id="measurement-template"
                value={templateId}
                onChange={(value) => {
                  setTemplateId(value);
                  setValues({});
                }}
              >
                {templates.map((entry) => (
                  <option key={entry.id} value={entry.id}>
                    {entry.name}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Units" htmlFor="measurement-unit">
              <Select id="measurement-unit" value={unit} onChange={setUnit}>
                <option value="in">Inches</option>
                <option value="cm">Centimetres</option>
              </Select>
            </Field>
          </div>

          <Field
            label="Label"
            htmlFor="measurement-title"
            hint="Something you'll recognise later, e.g. “Hamza — winter kurta”."
          >
            <Input
              id="measurement-title"
              value={title}
              onChange={setTitle}
              placeholder={template?.name ?? "Measurement"}
            />
          </Field>

          {/* FIELDS */}
          {template && (
            <div>
              <p className="mb-2 text-[11px] font-semibold text-muted">
                {template.name} measurements ({unit})
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                {template.fields.map((field) => (
                  <Field
                    key={field.key}
                    label={field.label}
                    required={field.required}
                    hint={field.helpText ?? undefined}
                    htmlFor={`field-${field.key}`}
                  >
                    <Input
                      id={`field-${field.key}`}
                      type="number"
                      step="0.25"
                      min={0}
                      value={values[field.key] ?? ""}
                      onChange={(value) =>
                        setValues((current) => ({
                          ...current,
                          [field.key]: value,
                        }))
                      }
                      placeholder={field.placeholder ?? "0"}
                      className={cn(
                        field.required && !values[field.key] && "border-line",
                      )}
                    />
                  </Field>
                ))}
              </div>
            </div>
          )}

          <Field label="Notes" htmlFor="measurement-notes">
            <Textarea
              id="measurement-notes"
              value={notes}
              onChange={setNotes}
              rows={2}
              placeholder="Loose fit, extra length in sleeves…"
            />
          </Field>

          <Checkbox
            checked={isDefault}
            onChange={setIsDefault}
            label="Use as the default for this person"
            description="Picked automatically at checkout for made-to-measure orders."
          />

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
            const result = await deleteMeasurement({
              id: target.id,
              customerId,
            });

            setDeleting(null);

            if (!result.success) {
              toast({
                tone: "error",
                title: "Not deleted",
                description: result.error,
              });
              return;
            }

            toast({ tone: "success", title: "Measurement deleted" });
            router.refresh();
          });
        }}
        loading={pending}
        title="Delete this measurement?"
        message="Orders already placed keep the measurements they were made with."
      />
    </>
  );
}
