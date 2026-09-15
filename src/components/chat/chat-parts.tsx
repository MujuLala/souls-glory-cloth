"use client";

import Link from "next/link";
import { Bot, ShoppingBag } from "lucide-react";

import { cn } from "@/components/ui/cn";
import { formatMoney, formatTime } from "@/lib/format";
import type { ChatMessage } from "@/lib/chat";

/* =========================================================
   PRODUCT CARD (inside a message)
========================================================= */

export function ChatProductCard({
  product,
  href,
}: {
  product: NonNullable<ChatMessage["product"]>;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-2.5 rounded-lg border border-line bg-card p-2">
      <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-md bg-surface text-faint">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt=""
            className="size-full object-cover"
          />
        ) : (
          <ShoppingBag size={16} />
        )}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-[12px] font-semibold text-ink">
          {product.name}
        </span>

        <span className="mt-0.5 block text-[11px] font-bold text-primary">
          {formatMoney(product.price)}
        </span>
      </span>
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} className="block transition-opacity hover:opacity-90">
      {content}
    </Link>
  );
}

/* =========================================================
   MESSAGE BUBBLE
========================================================= */

export function ChatBubble({
  message,
  mine,
}: {
  message: ChatMessage;
  mine: boolean;
}) {
  const isSystem = message.senderRole === "system";

  if (isSystem) {
    return (
      <div className="flex items-start gap-2 px-1 py-1">
        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary/12 text-primary">
          <Bot size={13} />
        </span>

        <p className="max-w-[85%] rounded-xl rounded-tl-sm border border-line-subtle bg-surface px-3 py-2 text-[12px] leading-5 text-muted">
          {message.body}
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        mine ? "items-end" : "items-start",
      )}
    >
      {!mine && (
        <span className="px-1 text-[10px] font-semibold text-faint">
          {message.senderName}
        </span>
      )}

      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3 py-2 text-[12.5px] leading-5",
          mine
            ? "rounded-br-sm bg-primary text-[var(--primary-contrast)]"
            : "rounded-bl-sm border border-line bg-card text-ink",
        )}
      >
        {message.product && (
          <div className={cn("mb-2", mine && "[&_*]:text-ink")}>
            <ChatProductCard
              product={message.product}
              href={`/shop?product=${message.product.slug}`}
            />
          </div>
        )}

        {message.body && <p className="whitespace-pre-wrap">{message.body}</p>}

        {/* Answers captured from the guided questions. */}
        {isAnswerMetadata(message.metadata) && (
          <dl
            className={cn(
              "mt-2 space-y-1 border-t pt-2 text-[11px]",
              mine ? "border-white/25" : "border-line-subtle",
            )}
          >
            {message.metadata.answers.map((answer) => (
              <div key={answer.question} className="flex flex-col">
                <dt className="opacity-70">{answer.question}</dt>
                <dd className="font-semibold">{answer.answer}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      <span className="px-1 text-[9px] text-faint">
        {formatTime(message.createdAt)}
      </span>
    </div>
  );
}

/* =========================================================
   METADATA GUARD
========================================================= */

type AnswerMetadata = {
  answers: { question: string; answer: string }[];
};

function isAnswerMetadata(value: unknown): value is AnswerMetadata {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as AnswerMetadata).answers) &&
    (value as AnswerMetadata).answers.length > 0
  );
}
