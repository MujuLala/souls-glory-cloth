"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Package, Send } from "lucide-react";

import Button from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/components/ui/cn";
import { ChatBubble } from "@/components/chat/chat-parts";
import ProductPicker, {
  type PickerProduct,
} from "@/components/chat/ProductPicker";
import { useChatThread } from "@/components/chat/use-chat-thread";

/* =========================================================
   ACCOUNT CHAT

   The same conversation as the floating widget, given a full
   page so longer exchanges (and product questions) are
   comfortable to read on a phone.
========================================================= */

export default function AccountChat() {
  const [picking, setPicking] = useState(false);
  const [draft, setDraft] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, atelierOnline, loading, sending, error, send } =
    useChatThread({ active: true });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const submit = async () => {
    const body = draft.trim();

    if (!body || sending) {
      return;
    }

    setDraft("");

    const sent = await send({ body });

    if (!sent) {
      setDraft(body);
    }
  };

  const attach = async (product: PickerProduct) => {
    setPicking(false);

    await send({
      body: "I'd like to ask about this piece.",
      productId: product.id,
    });
  };

  return (
    <Card className="flex h-[calc(100vh-320px)] min-h-[440px] flex-col overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center justify-between gap-3 border-b border-line-subtle p-3.5">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-ink">
            Soul&apos;s Glory Atelier
          </h2>

          <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-faint">
            <span
              className={cn(
                "size-1.5 rounded-full",
                atelierOnline ? "bg-success" : "bg-warning",
              )}
            />
            {atelierOnline
              ? "Online — usually replies in minutes"
              : "Offline — we reply within a few hours"}
          </p>
        </div>

        <Button
          size="sm"
          variant="secondary"
          onClick={() => setPicking((value) => !value)}
        >
          <Package size={14} />
          {picking ? "Close" : "Attach product"}
        </Button>
      </div>

      {/* BODY */}
      {picking ? (
        <div className="min-h-0 flex-1">
          <ProductPicker onSelect={attach} />
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="min-h-0 flex-1 space-y-3 overflow-y-auto scrollbar-thin p-4"
        >
          {loading && messages.length === 0 ? (
            <div className="flex justify-center py-10 text-faint">
              <Loader2 size={18} className="animate-spin" />
            </div>
          ) : (
            messages.map((message) => (
              <ChatBubble
                key={message.id}
                message={message}
                mine={message.senderRole === "customer"}
              />
            ))
          )}
        </div>
      )}

      {error && (
        <p className="border-t border-line bg-warning/10 px-4 py-2 text-[11px] text-warning">
          {error}
        </p>
      )}

      {/* COMPOSER */}
      <div className="border-t border-line-subtle p-3">
        <div className="flex items-end gap-2">
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void submit();
              }
            }}
            rows={1}
            placeholder="Write a message…"
            className="max-h-28 min-h-11 flex-1 resize-none rounded-lg border border-line bg-input px-3 py-3 text-[13px] text-ink outline-none placeholder:text-faint focus-visible:border-primary/60"
          />

          <button
            type="button"
            onClick={() => void submit()}
            disabled={!draft.trim() || sending}
            aria-label="Send message"
            className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary text-[var(--primary-contrast)] transition-colors hover:bg-primary-hover disabled:opacity-50"
          >
            {sending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </button>
        </div>
      </div>
    </Card>
  );
}
