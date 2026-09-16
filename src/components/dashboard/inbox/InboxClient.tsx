"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, MessageSquareOff, Package, Search, Send } from "lucide-react";

import { cn } from "@/components/ui/cn";
import { Select } from "@/components/ui/field";
import { formatRelative, initials } from "@/lib/format";
import { ChatBubble } from "@/components/chat/chat-parts";
import ProductPicker, { type PickerProduct } from "@/components/chat/ProductPicker";
import { useChatThread } from "@/components/chat/use-chat-thread";
import { setConversationStatus } from "@/actions/chat";

type ConversationSummary = {
  id: number;
  subject: string | null;
  status: string;
  priority: string;
  name: string;
  customerId: number | null;
  customerCode: string | null;
  phone: string | null;
  lastMessageAt: string;
  lastMessageText: string | null;
  unread: number;
  assignedTo: string | null;
};

const statusFilters = ["All", "Open", "Pending", "Resolved", "Closed"];

export default function InboxClient() {
  const router = useRouter();
  const params = useSearchParams();

  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [mobileThreadOpen, setMobileThreadOpen] = useState(false);
  const [picking, setPicking] = useState(false);
  const [draft, setDraft] = useState("");

  const selectedId = params.get("conversation")
    ? Number(params.get("conversation"))
    : null;

  const scrollRef = useRef<HTMLDivElement>(null);

  /* Poll the conversation list. */
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const url = new URL("/api/chat/conversations", window.location.origin);
        if (statusFilter !== "All") url.searchParams.set("status", statusFilter);

        const response = await fetch(url.toString(), { cache: "no-store" });
        const data = (await response.json()) as { conversations: ConversationSummary[] };

        if (!cancelled) {
          setConversations(data.conversations ?? []);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") void load();
    }, 8000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [statusFilter]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return conversations;

    return conversations.filter((conversation) =>
      `${conversation.name} ${conversation.phone ?? ""} ${conversation.customerCode ?? ""}`
        .toLowerCase()
        .includes(term),
    );
  }, [conversations, search]);

  const selected = conversations.find((conversation) => conversation.id === selectedId);

  const { messages, loading: threadLoading, sending, send } = useChatThread({
    conversationId: selectedId ?? undefined,
    active: Boolean(selectedId),
    enabled: Boolean(selectedId),
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const selectConversation = (id: number) => {
    router.push(`/inbox?conversation=${id}`);
    setMobileThreadOpen(true);
  };

  const submitDraft = async () => {
    const body = draft.trim();
    if (!body || sending || !selectedId) return;

    setDraft("");
    const sent = await send({ body });

    if (!sent) setDraft(body);
  };

  const attach = async (product: PickerProduct) => {
    setPicking(false);
    if (!selectedId) return;

    await send({
      body: `Here's the piece we discussed.`,
      productId: product.id,
    });
  };

  return (
    <div className="grid h-[min(75vh,760px)] min-h-[480px] gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">
      {/* ===================================================
          CONVERSATION LIST
      =================================================== */}

      <div
        className={cn(
          "flex flex-col overflow-hidden rounded-2xl border border-line bg-card",
          mobileThreadOpen && "hidden lg:flex",
        )}
      >
        <div className="space-y-2.5 border-b border-line-subtle p-3">
          <div className="relative">
            <Search
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint"
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search conversations…"
              aria-label="Search conversations"
              className="h-9 w-full rounded-lg border border-line bg-input pl-8 pr-3 text-[12px] text-ink outline-none placeholder:text-faint focus-visible:border-primary/60"
            />
          </div>

          <div className="flex gap-1 overflow-x-auto scrollbar-none">
            {statusFilters.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={cn(
                  "shrink-0 rounded-md px-2.5 py-1.5 text-[10.5px] font-semibold transition-colors",
                  statusFilter === status
                    ? "bg-primary text-[var(--primary-contrast)]"
                    : "bg-surface text-muted hover:text-ink",
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin">
          {loading ? (
            <div className="flex justify-center py-8 text-faint">
              <Loader2 size={18} className="animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="p-6 text-center text-[12px] text-faint">
              No conversations here.
            </p>
          ) : (
            <ul className="divide-y divide-line-subtle">
              {filtered.map((conversation) => (
                <li key={conversation.id}>
                  <button
                    type="button"
                    onClick={() => selectConversation(conversation.id)}
                    className={cn(
                      "flex w-full items-start gap-2.5 p-3 text-left transition-colors hover:bg-surface",
                      selectedId === conversation.id && "bg-surface",
                    )}
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/12 text-[11px] font-bold text-primary">
                      {initials(conversation.name)}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate text-[12.5px] font-semibold text-ink">
                          {conversation.name}
                        </span>

                        <span className="shrink-0 text-[10px] text-faint">
                          {formatRelative(conversation.lastMessageAt)}
                        </span>
                      </span>

                      <span className="mt-0.5 flex items-center gap-1.5">
                        <span className="min-w-0 truncate text-[11px] text-faint">
                          {conversation.lastMessageText ?? "No messages yet"}
                        </span>

                        {conversation.unread > 0 && (
                          <span className="grid size-4 shrink-0 place-items-center rounded-full bg-primary text-[9px] font-bold text-[var(--primary-contrast)]">
                            {conversation.unread}
                          </span>
                        )}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ===================================================
          THREAD
      =================================================== */}

      <div
        className={cn(
          "flex flex-col overflow-hidden rounded-2xl border border-line bg-card",
          !mobileThreadOpen && "hidden lg:flex",
        )}
      >
        {!selected ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-faint">
            <MessageSquareOff size={28} />
            <p className="text-[12px]">Select a conversation</p>
          </div>
        ) : (
          <>
            {/* HEADER */}
            <div className="flex items-center gap-2.5 border-b border-line-subtle p-3">
              <button
                type="button"
                onClick={() => setMobileThreadOpen(false)}
                className="text-faint lg:hidden"
                aria-label="Back to list"
              >
                ←
              </button>

              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/12 text-[11px] font-bold text-primary">
                {initials(selected.name)}
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-ink">
                  {selected.name}
                </p>

                <p className="mt-0.5 truncate text-[10.5px] text-faint">
                  {selected.customerId ? (
                    <Link href={`/customers/${selected.customerId}`} className="hover:text-primary">
                      {selected.customerCode} · {selected.phone ?? "no phone"}
                    </Link>
                  ) : (
                    selected.phone ?? "Guest"
                  )}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                <Select
                  value={selected.status}
                  onChange={(value) =>
                    void setConversationStatus(selected.id, value).then(() => router.refresh())
                  }
                  className="h-8 w-[110px] text-[11px]"
                >
                  <option value="Open">Open</option>
                  <option value="Pending">Pending</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </Select>
              </div>
            </div>

            {/* MESSAGES */}
            {picking ? (
              <div className="min-h-0 flex-1">
                <ProductPicker onSelect={attach} />
              </div>
            ) : (
              <div ref={scrollRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto scrollbar-thin p-4">
                {threadLoading && messages.length === 0 ? (
                  <div className="flex justify-center py-8 text-faint">
                    <Loader2 size={18} className="animate-spin" />
                  </div>
                ) : (
                  messages.map((message) => (
                    <ChatBubble
                      key={message.id}
                      message={message}
                      mine={message.senderRole === "admin"}
                    />
                  ))
                )}
              </div>
            )}

            {/* COMPOSER */}
            {!picking && (
              <div className="border-t border-line-subtle p-2.5">
                <div className="flex items-end gap-2">
                  <button
                    type="button"
                    onClick={() => setPicking(true)}
                    aria-label="Attach product"
                    className="grid size-10 shrink-0 place-items-center rounded-lg border border-line bg-surface text-muted hover:border-primary/50 hover:text-ink"
                  >
                    <Package size={16} />
                  </button>

                  <textarea
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        void submitDraft();
                      }
                    }}
                    rows={1}
                    placeholder="Reply to the customer…"
                    className="max-h-24 min-h-10 flex-1 resize-none rounded-lg border border-line bg-input px-3 py-2.5 text-[12.5px] text-ink outline-none placeholder:text-faint focus-visible:border-primary/60"
                  />

                  <button
                    type="button"
                    onClick={() => void submitDraft()}
                    disabled={!draft.trim() || sending}
                    aria-label="Send"
                    className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary text-[var(--primary-contrast)] disabled:opacity-50"
                  >
                    {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
