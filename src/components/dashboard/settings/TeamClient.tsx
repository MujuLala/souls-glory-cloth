"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { ShieldCheck, UserX } from "lucide-react";

import Badge from "@/components/ui/badge";
import { Select } from "@/components/ui/field";
import { useToast } from "@/components/ui/toast";
import { initials } from "@/lib/format";
import { setStaffActive, updateStaffRole } from "@/actions/settings";

export type StaffRow = {
  id: string;
  name: string | null;
  email: string;
  role: string;
  isActive: boolean;
  lastSeenAt: string | null;
};

const roles = ["Admin", "Manager", "Tailor", "Cashier"];

export default function TeamClient({
  staff,
  currentUserId,
}: {
  staff: StaffRow[];
  currentUserId: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();

  return (
    <ul className="divide-y divide-line-subtle">
      {staff.map((member) => {
        const isSelf = member.id === currentUserId;

        return (
          <li key={member.id} className="flex items-center gap-3 p-4">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/12 text-[11px] font-bold text-primary">
              {initials(member.name ?? member.email)}
            </span>

            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 truncate text-[13px] font-semibold text-ink">
                {member.name ?? member.email.split("@")[0]}
                {isSelf && <Badge tone="primary">You</Badge>}
                {!member.isActive && <Badge tone="warning">Inactive</Badge>}
              </p>

              <p className="mt-0.5 truncate text-[11px] text-faint">
                {member.email}
              </p>
            </div>

            <Select
              value={member.role}
              disabled={pending || isSelf}
              onChange={(value) =>
                startTransition(async () => {
                  const result = await updateStaffRole(member.id, value);

                  if (!result.success) {
                    toast({ tone: "error", title: "Not updated", description: result.error });
                    return;
                  }

                  toast({ tone: "success", title: `${member.name ?? member.email} is now ${value}` });
                  router.refresh();
                })
              }
              className="h-9 w-[120px] text-[11px]"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </Select>

            <button
              type="button"
              disabled={pending || isSelf}
              onClick={() =>
                startTransition(async () => {
                  const result = await setStaffActive(member.id, !member.isActive);

                  if (!result.success) {
                    toast({ tone: "error", title: "Not updated", description: result.error });
                    return;
                  }

                  router.refresh();
                })
              }
              title={member.isActive ? "Deactivate" : "Reactivate"}
              className="grid size-9 shrink-0 place-items-center rounded-lg text-faint transition-colors hover:bg-surface hover:text-ink disabled:opacity-40"
            >
              {member.isActive ? <UserX size={15} /> : <ShieldCheck size={15} />}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
