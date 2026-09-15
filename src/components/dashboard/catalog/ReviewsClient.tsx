"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { Check, MessageSquareQuote, Star, Trash2, X } from "lucide-react";

import { StatusBadge } from "@/components/ui/badge";
import Button, { IconButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/components/ui/cn";
import EmptyState from "@/components/ui/empty-state";
import { ConfirmDialog } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { formatDate } from "@/lib/format";
import { deleteReview, setReviewStatus } from "@/actions/catalog";

export type ReviewRow = {
  id: number;
  customerName: string;
  customerEmail: string;
  productName: string;
  rating: number;
  title: string;
  comment: string;
  status: string;
  createdAt: string;
};

const tabs = ["All", "Pending", "Approved", "Rejected"];

export default function ReviewsClient({ rows }: { rows: ReviewRow[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const { toast } = useToast();

  const [pending, startTransition] = useTransition();
  const [deleting, setDeleting] = useState<ReviewRow | null>(null);

  const activeTab = params.get("status") ?? "All";

  const filtered =
    activeTab === "All"
      ? rows
      : rows.filter((row) => row.status === activeTab);

  const setTab = (tab: string) => {
    const next = new URLSearchParams(params.toString());

    if (tab === "All") {
      next.delete("status");
    } else {
      next.set("status", tab);
    }

    router.push(`${pathname}?${next.toString()}`);
  };

  const moderate = (id: number, status: string) => {
    startTransition(async () => {
      const result = await setReviewStatus([id], status);

      if (!result.success) {
        toast({
          tone: "error",
          title: "Not updated",
          description: result.error,
        });
        return;
      }

      toast({ tone: "success", title: `Review ${status.toLowerCase()}` });
      router.refresh();
    });
  };

  return (
    <>
      <Card className="overflow-hidden">
        <div className="flex gap-1.5 overflow-x-auto scrollbar-none border-b border-line-subtle p-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setTab(tab)}
              className={cn(
                "shrink-0 rounded-lg px-3 py-2 text-[11px] font-semibold transition-colors",
                activeTab === tab
                  ? "bg-primary text-[var(--primary-contrast)]"
                  : "bg-surface text-muted hover:text-ink",
              )}
            >
              {tab}
              <span className="ml-1.5 opacity-70">
                {tab === "All"
                  ? rows.length
                  : rows.filter((row) => row.status === tab).length}
              </span>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={<MessageSquareQuote size={20} />}
            title="No reviews here"
            description="Customer reviews land here for moderation before they appear on the storefront."
          />
        ) : (
          <ul className="divide-y divide-line-subtle">
            {filtered.map((review) => (
              <li key={review.id} className="p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[13px] font-semibold text-ink">
                        {review.title}
                      </p>

                      <Stars rating={review.rating} />

                      <StatusBadge status={review.status} />
                    </div>

                    <p className="mt-1.5 text-[12px] leading-5 text-muted">
                      {review.comment}
                    </p>

                    <p className="mt-2 text-[11px] text-faint">
                      {review.customerName} · {review.productName} ·{" "}
                      {formatDate(review.createdAt)}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1.5">
                    {review.status !== "Approved" && (
                      <Button
                        size="sm"
                        variant="secondary"
                        disabled={pending}
                        onClick={() => moderate(review.id, "Approved")}
                      >
                        <Check size={14} />
                        Approve
                      </Button>
                    )}

                    {review.status !== "Rejected" && (
                      <Button
                        size="sm"
                        variant="secondary"
                        disabled={pending}
                        onClick={() => moderate(review.id, "Rejected")}
                      >
                        <X size={14} />
                        Reject
                      </Button>
                    )}

                    <IconButton
                      label="Delete review"
                      tone="danger"
                      onClick={() => setDeleting(review)}
                    >
                      <Trash2 size={15} />
                    </IconButton>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={() => {
          const target = deleting;

          if (!target) {
            return;
          }

          startTransition(async () => {
            const result = await deleteReview(target.id);

            setDeleting(null);

            if (!result.success) {
              toast({
                tone: "error",
                title: "Not deleted",
                description: result.error,
              });
              return;
            }

            toast({ tone: "success", title: "Review deleted" });
            router.refresh();
          });
        }}
        loading={pending}
        title="Delete this review?"
        message="The review is removed permanently. Rejecting it instead keeps it out of the storefront but preserves the record."
      />
    </>
  );
}

/* =========================================================
   STARS
========================================================= */

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          size={12}
          className={
            value <= rating ? "text-warning" : "text-faint opacity-40"
          }
          fill={value <= rating ? "currentColor" : "none"}
        />
      ))}
    </span>
  );
}
