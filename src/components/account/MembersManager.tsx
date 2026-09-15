"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Pencil, Plus, Ruler, Trash2, UserRound, Users } from "lucide-react";

import Badge from "@/components/ui/badge";
import Button, { IconButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import EmptyState from "@/components/ui/empty-state";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import Modal, { ConfirmDialog } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { initials } from "@/lib/format";
import { RELATIONS } from "@/lib/constants";
import { deleteMember, saveMember } from "@/actions/account";
import type { MemberSummary } from "@/data/account";

/* =========================================================
   MEMBERS MANAGER

   The people a customer orders for — themselves, their
   spouse, children, parents. Each one can carry its own set
   of measurements.
========================================================= */

export default function MembersManager({
  members,
  customerId,
  measureHref = "/account/measurements",
}: {
  members: MemberSummary[];
  /* Set by the CMS when staff edit someone else's profile. */
  customerId?: number;
  measureHref?: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<MemberSummary | null>(null);
  const [deleting, setDeleting] = useState<MemberSummary | null>(null);

  const [fullName, setFullName] = useState("");
  const [relation, setRelation] = useState<string>("Son");
  const [gender, setGender] = useState("");
  const [ageGroup, setAgeGroup] = useState("Adult");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  const openForm = (member?: MemberSummary) => {
    setEditing(member ?? null);
    setFullName(member?.fullName ?? "");
    setRelation(member?.relation ?? "Son");
    setGender(member?.gender ?? "");
    setAgeGroup(member?.ageGroup ?? "Adult");
    setPhone(member?.phone ?? "");
    setNotes(member?.notes ?? "");
    setError(null);
    setFormOpen(true);
  };

  const submit = () => {
    if (!fullName.trim()) {
      setError("Enter a name.");
      return;
    }

    startTransition(async () => {
      const result = await saveMember({
        id: editing?.id,
        customerId,
        fullName,
        relation,
        gender,
        ageGroup,
        phone,
        notes,
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      setFormOpen(false);
      toast({
        tone: "success",
        title: editing ? "Details updated" : `${fullName.trim()} added`,
      });
      router.refresh();
    });
  };

  return (
    <>
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between gap-2 border-b border-line-subtle p-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
              <Users size={16} />
            </span>

            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-ink">
                People you order for
              </h2>

              <p className="mt-0.5 text-[11px] text-faint">
                {members.length} profile{members.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          <Button size="sm" onClick={() => openForm()}>
            <Plus size={15} />
            Add person
          </Button>
        </div>

        {members.length === 0 ? (
          <EmptyState
            icon={<Users size={20} />}
            title="No one added yet"
            description="Add your family members so every order goes out in the right size."
            action={
              <Button size="sm" onClick={() => openForm()}>
                Add the first person
              </Button>
            }
          />
        ) : (
          <ul className="divide-y divide-line-subtle">
            {members.map((member) => (
              <li
                key={member.id}
                className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/12 text-[12px] font-bold text-primary">
                    {initials(member.fullName)}
                  </span>

                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2 text-[13px] font-semibold text-ink">
                      {member.fullName}

                      {member.isPrimary && <Badge tone="primary">You</Badge>}
                    </p>

                    <p className="mt-0.5 truncate text-[11px] text-faint">
                      {[
                        member.relation,
                        member.ageGroup,
                        member.gender,
                        member.phone,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:justify-end">
                  <Badge
                    tone={member.measurementCount > 0 ? "success" : "neutral"}
                  >
                    <Ruler size={11} />
                    {member.measurementCount} measurement
                    {member.measurementCount === 1 ? "" : "s"}
                  </Badge>

                  <Button
                    href={`${measureHref}?member=${member.id}`}
                    size="sm"
                    variant="secondary"
                  >
                    Measurements
                  </Button>

                  <IconButton
                    label={`Edit ${member.fullName}`}
                    onClick={() => openForm(member)}
                  >
                    <Pencil size={14} />
                  </IconButton>

                  {!member.isPrimary && (
                    <IconButton
                      label={`Remove ${member.fullName}`}
                      tone="danger"
                      onClick={() => setDeleting(member)}
                    >
                      <Trash2 size={14} />
                    </IconButton>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* ===================================================
          FORM
      =================================================== */}

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? `Edit ${editing.fullName}` : "Add a person"}
        description="Their measurements are stored against this profile."
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
              {editing ? "Save changes" : "Add person"}
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Full name"
            required
            htmlFor="member-name"
            className="sm:col-span-2"
          >
            <Input
              id="member-name"
              value={fullName}
              onChange={setFullName}
              icon={<UserRound size={14} />}
              placeholder="e.g. Hamza Ahmed"
            />
          </Field>

          <Field label="Relation" htmlFor="member-relation">
            <Select
              id="member-relation"
              value={relation}
              onChange={setRelation}
              disabled={editing?.isPrimary}
            >
              {RELATIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Age group" htmlFor="member-age">
            <Select id="member-age" value={ageGroup} onChange={setAgeGroup}>
              <option value="Adult">Adult</option>
              <option value="Teen">Teen</option>
              <option value="Child">Child</option>
              <option value="Infant">Infant</option>
            </Select>
          </Field>

          <Field label="Gender" htmlFor="member-gender">
            <Select id="member-gender" value={gender} onChange={setGender}>
              <option value="">Prefer not to say</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>
          </Field>

          <Field label="Phone" htmlFor="member-phone">
            <Input
              id="member-phone"
              type="tel"
              value={phone}
              onChange={setPhone}
              placeholder="Optional"
            />
          </Field>

          <Field
            label="Notes"
            htmlFor="member-notes"
            className="sm:col-span-2"
            hint="Fit preferences, fabric allergies, anything the tailor should remember."
          >
            <Textarea
              id="member-notes"
              value={notes}
              onChange={setNotes}
              rows={3}
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

          if (!target) {
            return;
          }

          startTransition(async () => {
            const result = await deleteMember({
              id: target.id,
              customerId,
            });

            setDeleting(null);

            if (!result.success) {
              toast({
                tone: "error",
                title: "Not removed",
                description: result.error,
              });
              return;
            }

            toast({ tone: "success", title: `${target.fullName} removed` });
            router.refresh();
          });
        }}
        loading={pending}
        title={`Remove ${deleting?.fullName ?? ""}?`}
        message={
          deleting && deleting.measurementCount > 0
            ? `Their ${deleting.measurementCount} saved measurement${
                deleting.measurementCount === 1 ? "" : "s"
              } will be removed too. Past orders keep their record.`
            : "This removes the profile. Past orders keep their record."
        }
        confirmLabel="Remove"
      />
    </>
  );
}
