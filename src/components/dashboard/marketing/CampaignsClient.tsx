"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Megaphone, Pencil, Plus, Trash2 } from "lucide-react";

import { StatusBadge } from "@/components/ui/badge";
import Button, { IconButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DataTable, { type Column } from "@/components/ui/data-table";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import Modal, { ConfirmDialog } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { formatMoney, formatNumber } from "@/lib/format";
import { deleteCampaign, saveCampaign } from "@/actions/marketing";

export type CampaignRow = {
  id: number;
  name: string;
  channel: string;
  status: string;
  audience: string | null;
  sent: number;
  opened: number;
  clicked: number;
  revenue: number;
};

export default function CampaignsClient({
  campaigns,
}: {
  campaigns: CampaignRow[];
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<CampaignRow | null>(null);
  const [deleting, setDeleting] = useState<CampaignRow | null>(null);

  const [name, setName] = useState("");
  const [channel, setChannel] = useState("Email");
  const [audience, setAudience] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Draft");
  const [error, setError] = useState<string | null>(null);

  const openForm = (campaign?: CampaignRow) => {
    setEditing(campaign ?? null);
    setName(campaign?.name ?? "");
    setChannel(campaign?.channel ?? "Email");
    setAudience(campaign?.audience ?? "");
    setDescription("");
    setStatus(campaign?.status ?? "Draft");
    setError(null);
    setFormOpen(true);
  };

  const submit = () => {
    startTransition(async () => {
      const result = await saveCampaign({
        id: editing?.id,
        name,
        channel,
        audience,
        description,
        status,
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      setFormOpen(false);
      toast({ tone: "success", title: editing ? "Campaign updated" : "Campaign created" });
      router.refresh();
    });
  };

  const columns: Column<CampaignRow>[] = [
    {
      key: "name",
      header: "Campaign",
      render: (row) => (
        <div className="min-w-0">
          <p className="truncate font-medium text-ink">{row.name}</p>
          <p className="mt-0.5 truncate text-[11px] text-faint">
            {row.channel} · {row.audience ?? "All customers"}
          </p>
        </div>
      ),
    },
    {
      key: "sent",
      header: "Sent",
      align: "right",
      render: (row) => <span className="text-muted">{formatNumber(row.sent)}</span>,
    },
    {
      key: "opened",
      header: "Opened",
      align: "right",
      render: (row) => (
        <span className="text-muted">
          {row.sent > 0 ? `${Math.round((row.opened / row.sent) * 100)}%` : "—"}
        </span>
      ),
    },
    {
      key: "revenue",
      header: "Revenue",
      align: "right",
      render: (row) => (
        <span className="font-semibold text-ink">{formatMoney(row.revenue)}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "actions",
      header: "",
      align: "right",
      width: "w-[90px]",
      hideOnMobile: true,
      render: (row) => (
        <div className="flex items-center justify-end gap-1">
          <IconButton label="Edit campaign" onClick={() => openForm(row)}>
            <Pencil size={14} />
          </IconButton>

          <IconButton
            label="Delete campaign"
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
            {campaigns.length} campaign{campaigns.length === 1 ? "" : "s"}
          </p>

          <Button size="sm" onClick={() => openForm()}>
            <Plus size={15} />
            New campaign
          </Button>
        </div>

        <DataTable
          columns={columns}
          rows={campaigns}
          rowKey={(row) => row.id}
          empty={{
            icon: <Megaphone size={20} />,
            title: "No campaigns yet",
            description: "Plan a seasonal push or a re-engagement email.",
            action: (
              <Button size="sm" onClick={() => openForm()}>
                New campaign
              </Button>
            ),
          }}
        />
      </Card>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? "Edit campaign" : "New campaign"}
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>

            <Button size="sm" loading={pending} onClick={submit}>
              {editing ? "Save changes" : "Create campaign"}
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" required htmlFor="campaign-name" className="sm:col-span-2">
            <Input id="campaign-name" value={name} onChange={setName} placeholder="Eid collection launch" />
          </Field>

          <Field label="Channel" htmlFor="campaign-channel">
            <Select id="campaign-channel" value={channel} onChange={setChannel}>
              <option value="Email">Email</option>
              <option value="SMS">SMS</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Social">Social</option>
            </Select>
          </Field>

          <Field label="Status" htmlFor="campaign-status">
            <Select id="campaign-status" value={status} onChange={setStatus}>
              <option value="Draft">Draft</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </Select>
          </Field>

          <Field label="Audience" htmlFor="campaign-audience" className="sm:col-span-2">
            <Input
              id="campaign-audience"
              value={audience}
              onChange={setAudience}
              placeholder="e.g. Repeat buyers, everyone"
            />
          </Field>

          <Field label="Notes" htmlFor="campaign-notes" className="sm:col-span-2">
            <Textarea
              id="campaign-notes"
              value={description}
              onChange={setDescription}
              rows={2}
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
            const result = await deleteCampaign(target.id);
            setDeleting(null);

            if (!result.success) {
              toast({ tone: "error", title: "Not deleted", description: result.error });
              return;
            }

            toast({ tone: "success", title: "Campaign deleted" });
            router.refresh();
          });
        }}
        loading={pending}
        title={`Delete ${deleting?.name ?? ""}?`}
        message="This removes the campaign record permanently."
      />
    </>
  );
}
