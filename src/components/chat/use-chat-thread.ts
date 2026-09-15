"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { ChatMessage } from "@/lib/chat";

/* =========================================================
   CHAT THREAD

   Polling transport: an open panel refreshes every 4s, a
   closed one every 25s just to keep the unread dot honest.
   Only messages after the highest known id come back, so the
   payload stays tiny.
========================================================= */

type Options = {
  guestKey?: string;
  guestName?: string;
  conversationId?: number;
  /* Poll faster while the panel is open. */
  active: boolean;
  enabled?: boolean;
};

export function useChatThread({
  guestKey,
  guestName,
  conversationId: initialConversationId,
  active,
  enabled = true,
}: Options) {
  const [conversationId, setConversationId] = useState<number | null>(
    initialConversationId ?? null,
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [atelierOnline, setAtelierOnline] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lastIdRef = useRef(0);
  const conversationRef = useRef<number | null>(
    initialConversationId ?? null,
  );

  const sync = useCallback(async () => {
    if (!enabled) {
      return;
    }

    try {
      const params = new URLSearchParams();

      if (conversationRef.current) {
        params.set("conversationId", String(conversationRef.current));
      }

      if (guestKey) {
        params.set("guestKey", guestKey);
      }

      if (guestName) {
        params.set("guestName", guestName);
      }

      if (lastIdRef.current) {
        params.set("after", String(lastIdRef.current));
      }

      const response = await fetch(`/api/chat/thread?${params.toString()}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Thread responded ${response.status}`);
      }

      const data = (await response.json()) as {
        conversationId: number;
        atelierOnline: boolean;
        messages: ChatMessage[];
      };

      conversationRef.current = data.conversationId;
      setConversationId(data.conversationId);
      setAtelierOnline(Boolean(data.atelierOnline));

      if (data.messages.length > 0) {
        lastIdRef.current = data.messages[data.messages.length - 1].id;

        setMessages((current) => {
          const seen = new Set(current.map((message) => message.id));
          const fresh = data.messages.filter(
            (message) => !seen.has(message.id),
          );

          return fresh.length ? [...current, ...fresh] : current;
        });
      }

      setError(null);
    } catch {
      setError("Connection lost. Retrying…");
    } finally {
      setLoading(false);
    }
  }, [enabled, guestKey, guestName]);

  /* Initial load + polling. */
  useEffect(() => {
    if (!enabled) {
      return;
    }

    void sync();

    const interval = window.setInterval(
      () => {
        if (document.visibilityState === "visible") {
          void sync();
        }
      },
      active ? 4000 : 25_000,
    );

    return () => window.clearInterval(interval);
  }, [sync, active, enabled]);

  /* =======================================================
     SEND
  ======================================================= */

  const send = useCallback(
    async (input: {
      body: string;
      productId?: number;
      metadata?: Record<string, unknown>;
    }) => {
      if (sending) {
        return false;
      }

      setSending(true);

      try {
        const response = await fetch("/api/chat/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...input,
            conversationId: conversationRef.current ?? undefined,
            guestKey,
            guestName,
          }),
        });

        if (!response.ok) {
          throw new Error(`Send responded ${response.status}`);
        }

        const data = (await response.json()) as {
          conversationId: number;
          message: ChatMessage;
        };

        conversationRef.current = data.conversationId;
        setConversationId(data.conversationId);

        lastIdRef.current = Math.max(lastIdRef.current, data.message.id);

        setMessages((current) =>
          current.some((message) => message.id === data.message.id)
            ? current
            : [...current, data.message],
        );

        setError(null);

        return true;
      } catch {
        setError("Message not sent. Check your connection and try again.");
        return false;
      } finally {
        setSending(false);
      }
    },
    [guestKey, guestName, sending],
  );

  return {
    conversationId,
    messages,
    atelierOnline,
    loading,
    sending,
    error,
    send,
    refresh: sync,
  };
}
