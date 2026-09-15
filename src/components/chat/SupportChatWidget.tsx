"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  Loader2,
  MessageCircle,
  Package,
  Send,
  X,
} from "lucide-react";

import { cn } from "@/components/ui/cn";
import { getGuestKey, usePresence } from "@/components/presence/use-presence";
import { ChatBubble } from "./chat-parts";
import ProductPicker, { type PickerProduct } from "./ProductPicker";
import { useChatThread } from "./use-chat-thread";

type Question = {
  id: string;
  question: string;
  helpText: string | null;
  type: string;
  options: string[];
  required: boolean;
};

type QuestionFlow = {
  product: PickerProduct;
  questions: Question[];
  index: number;
  answers: { question: string; answer: string }[];
};

const STORAGE_OPEN = "sg-chat-open";

/* =========================================================
   SUPPORT CHAT WIDGET

   Floats on every storefront page. Shoppers can attach the
   product they're asking about; the atelier's saved
   questions for that product then run as a short guided
   flow, so the answer lands in the thread already complete.
========================================================= */

export default function SupportChatWidget() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [guestKey, setGuestKey] = useState("");

  const [view, setView] = useState<"chat" | "products">("chat");
  const [draft, setDraft] = useState("");
  const [flow, setFlow] = useState<QuestionFlow | null>(null);
  const [flowLoading, setFlowLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const seenCountRef = useRef(0);
  const [unread, setUnread] = useState(0);

  /* Identity + presence so the atelier can see shoppers. */
  useEffect(() => {
    setGuestKey(getGuestKey());
    setMounted(true);

    try {
      setOpen(sessionStorage.getItem(STORAGE_OPEN) === "1");
    } catch {
      /* Private mode — the panel just starts closed. */
    }
  }, []);

  usePresence({
    id: guestKey ? `guest:${guestKey}` : "",
    role: "Customer",
    name: "Shopper",
    enabled: Boolean(guestKey),
  });

  const { messages, atelierOnline, loading, sending, error, send } =
    useChatThread({
      guestKey,
      active: open,
      enabled: mounted && Boolean(guestKey),
    });

  /* Unread badge while the panel is closed. */
  useEffect(() => {
    const incoming = messages.filter(
      (message) => message.senderRole !== "customer",
    ).length;

    if (open) {
      seenCountRef.current = incoming;
      setUnread(0);
      return;
    }

    setUnread(Math.max(0, incoming - seenCountRef.current));
  }, [messages, open]);

  /* "Ask about this piece" on a product page opens the panel
     with that product already attached. */
  useEffect(() => {
    const handleAsk = (event: Event) => {
      const detail = (event as CustomEvent<{ productId: number }>).detail;

      if (!detail?.productId) {
        return;
      }

      togglePanel(true);
      setView("chat");

      void fetch(`/api/chat/products?id=${detail.productId}`, {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data: { products: PickerProduct[] }) => {
          const match = data.products[0];

          if (match) {
            void attachProduct(match);
          }
        })
        .catch(() => undefined);
    };

    window.addEventListener("sg:chat-product", handleAsk);

    return () => window.removeEventListener("sg:chat-product", handleAsk);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Keep the newest message in view. */
  useEffect(() => {
    if (open && view === "chat" && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, view, flow]);

  const togglePanel = (next: boolean) => {
    setOpen(next);

    try {
      sessionStorage.setItem(STORAGE_OPEN, next ? "1" : "0");
    } catch {
      /* Not critical. */
    }
  };

  /* =======================================================
     SEND A TYPED MESSAGE
  ======================================================= */

  const submitDraft = async () => {
    const body = draft.trim();

    if (!body || sending) {
      return;
    }

    setDraft("");

    const sent = await send({ body });

    if (!sent) {
      /* Put the text back so nothing is silently lost. */
      setDraft(body);
    }
  };

  /* =======================================================
     ATTACH A PRODUCT → START THE GUIDED FLOW
  ======================================================= */

  const attachProduct = async (product: PickerProduct) => {
    setView("chat");
    setFlowLoading(true);

    await send({
      body: `I'd like to ask about this piece.`,
      productId: product.id,
    });

    try {
      const response = await fetch(
        `/api/chat/questions?productId=${product.id}`,
        { cache: "no-store" },
      );

      const data = (await response.json()) as { questions: Question[] };

      if (data.questions?.length) {
        setFlow({
          product,
          questions: data.questions,
          index: 0,
          answers: [],
        });
      }
    } catch {
      /* Without questions the shopper can still type freely. */
    } finally {
      setFlowLoading(false);
    }
  };

  const answerCurrent = async (answer: string) => {
    if (!flow) {
      return;
    }

    const current = flow.questions[flow.index];

    const answers = [
      ...flow.answers,
      { question: current.question, answer },
    ];

    const isLast = flow.index >= flow.questions.length - 1;

    if (!isLast) {
      setFlow({ ...flow, index: flow.index + 1, answers });
      return;
    }

    setFlow(null);

    await send({
      body: `Here are my details for ${flow.product.name}.`,
      productId: flow.product.id,
      metadata: { answers },
    });
  };

  const skipFlow = async () => {
    if (!flow) {
      return;
    }

    const { answers, product } = flow;

    setFlow(null);

    if (answers.length > 0) {
      await send({
        body: `Here are my details for ${product.name}.`,
        productId: product.id,
        metadata: { answers },
      });
    }
  };

  const currentQuestion = useMemo(
    () => (flow ? flow.questions[flow.index] : null),
    [flow],
  );

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* =================================================
          LAUNCHER
      ================================================= */}

      {!open && (
        <button
          type="button"
          onClick={() => togglePanel(true)}
          aria-label="Chat with the atelier"
          className="fixed bottom-4 right-4 z-[120] flex items-center gap-2 rounded-full bg-primary px-4 py-3.5 text-[13px] font-bold text-[var(--primary-contrast)] shadow-float transition-transform hover:scale-[1.03] sm:bottom-5 sm:right-5"
        >
          <MessageCircle size={18} />

          <span className="hidden sm:inline">Chat with us</span>

          {unread > 0 && (
            <span className="grid size-5 place-items-center rounded-full bg-white text-[10px] font-bold text-primary">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </button>
      )}

      {/* =================================================
          PANEL
      ================================================= */}

      {open && (
        <div
          className={cn(
            "fixed inset-0 z-[120] flex flex-col border-line bg-bg-secondary",
            "sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[600px] sm:max-h-[80vh] sm:w-[380px] sm:rounded-2xl sm:border sm:shadow-float",
          )}
        >
          {/* HEADER */}
          <header className="flex shrink-0 items-center gap-2.5 border-b border-line p-3.5">
            {view === "products" ? (
              <button
                type="button"
                onClick={() => setView("chat")}
                aria-label="Back to conversation"
                className="grid size-8 place-items-center rounded-lg text-faint hover:bg-surface hover:text-ink"
              >
                <ChevronLeft size={17} />
              </button>
            ) : (
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/12 text-primary">
                <MessageCircle size={17} />
              </span>
            )}

            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-ink">
                {view === "products" ? "Attach a product" : "Soul's Glory Atelier"}
              </p>

              <p className="mt-0.5 flex items-center gap-1.5 text-[10.5px] text-faint">
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

            <button
              type="button"
              onClick={() => togglePanel(false)}
              aria-label="Close chat"
              className="grid size-8 shrink-0 place-items-center rounded-lg text-faint hover:bg-surface hover:text-ink"
            >
              <X size={17} />
            </button>
          </header>

          {/* BODY */}
          {view === "products" ? (
            <ProductPicker onSelect={attachProduct} />
          ) : (
            <>
              <div
                ref={scrollRef}
                className="min-h-0 flex-1 space-y-3 overflow-y-auto scrollbar-thin p-3.5"
              >
                {loading && messages.length === 0 ? (
                  <div className="flex justify-center py-8 text-faint">
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

                {flowLoading && (
                  <p className="text-center text-[11px] text-faint">
                    Loading a few quick questions…
                  </p>
                )}
              </div>

              {error && (
                <p className="shrink-0 border-t border-line bg-warning/10 px-3.5 py-2 text-[11px] text-warning">
                  {error}
                </p>
              )}

              {/* GUIDED QUESTIONS */}
              {currentQuestion ? (
                <div className="shrink-0 border-t border-line bg-card p-3.5">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <p className="text-[12px] font-semibold text-ink">
                      {currentQuestion.question}
                    </p>

                    <span className="shrink-0 text-[10px] text-faint">
                      {(flow?.index ?? 0) + 1}/{flow?.questions.length}
                    </span>
                  </div>

                  {currentQuestion.helpText && (
                    <p className="mb-2 text-[11px] leading-4 text-faint">
                      {currentQuestion.helpText}
                    </p>
                  )}

                  {currentQuestion.options.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {currentQuestion.options.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => void answerCurrent(option)}
                          className="rounded-full border border-line bg-surface px-3 py-1.5 text-[11px] text-ink transition-colors hover:border-primary/50 hover:bg-primary/10"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <FreeTextAnswer onSubmit={answerCurrent} />
                  )}

                  <button
                    type="button"
                    onClick={() => void skipFlow()}
                    className="mt-2.5 text-[11px] text-faint underline-offset-2 hover:text-ink hover:underline"
                  >
                    Skip the rest
                  </button>
                </div>
              ) : (
                /* COMPOSER */
                <div className="shrink-0 border-t border-line p-2.5">
                  <div className="flex items-end gap-2">
                    <button
                      type="button"
                      onClick={() => setView("products")}
                      aria-label="Attach a product"
                      title="Attach a product"
                      className="grid size-10 shrink-0 place-items-center rounded-lg border border-line bg-surface text-muted transition-colors hover:border-primary/50 hover:text-ink"
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
                      placeholder="Write a message…"
                      className="max-h-24 min-h-10 flex-1 resize-none rounded-lg border border-line bg-input px-3 py-2.5 text-[12.5px] text-ink outline-none placeholder:text-faint focus-visible:border-primary/60"
                    />

                    <button
                      type="button"
                      onClick={() => void submitDraft()}
                      disabled={!draft.trim() || sending}
                      aria-label="Send message"
                      className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary text-[var(--primary-contrast)] transition-colors hover:bg-primary-hover disabled:opacity-50"
                    >
                      {sending ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Send size={16} />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}

/* =========================================================
   FREE TEXT ANSWER
========================================================= */

function FreeTextAnswer({
  onSubmit,
}: {
  onSubmit: (answer: string) => void;
}) {
  const [value, setValue] = useState("");

  const submit = () => {
    const answer = value.trim();

    if (!answer) {
      return;
    }

    setValue("");
    onSubmit(answer);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            submit();
          }
        }}
        placeholder="Type your answer…"
        className="h-10 flex-1 rounded-lg border border-line bg-input px-3 text-[12px] text-ink outline-none placeholder:text-faint focus-visible:border-primary/60"
      />

      <button
        type="button"
        onClick={submit}
        disabled={!value.trim()}
        aria-label="Submit answer"
        className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary text-[var(--primary-contrast)] disabled:opacity-50"
      >
        <Send size={15} />
      </button>
    </div>
  );
}
