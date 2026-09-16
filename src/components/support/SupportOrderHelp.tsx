"use client";

import { useState } from "react";
import { ArrowRight, Loader2, PackageSearch } from "lucide-react";

import { StatusBadge } from "@/components/ui/badge";
import { lookupOrderForSupport, type OrderLookupResult } from "@/actions/support";

export default function SupportOrderHelp() {
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OrderLookupResult | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    const outcome = await lookupOrderForSupport({ orderNumber, phone });

    setLoading(false);

    if (!outcome.success) {
      setError(outcome.error);
      return;
    }

    setResult(outcome.data);
  };

  return (
    <section
      id="support-order-help"
      className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24"
    >
      <div className="relative overflow-hidden rounded-2xl border border-line-subtle bg-card p-6 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface">
              <PackageSearch className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-7 text-[9px] font-semibold uppercase tracking-[.2em] text-primary">
              Order assistance
            </p>
            <h2 className="mt-2 max-w-xl text-4xl font-semibold leading-none tracking-[-.05em] text-ink sm:text-5xl">
              Something about your
              <br />
              order <span className="text-primary">not right?</span>
            </h2>
            <p className="mt-5 max-w-md text-xs leading-6 text-faint">
              Enter your order number and the phone number you used at
              checkout — we&rsquo;ll pull up its current status.
            </p>
          </div>

          <form
            onSubmit={submit}
            className="rounded-xl border border-line-subtle bg-bg-secondary p-4"
          >
            <label className="mb-2 block text-[9px] uppercase tracking-[.16em] text-faint">
              Order number
            </label>
            <input
              value={orderNumber}
              onChange={(event) => setOrderNumber(event.target.value)}
              placeholder="SG-10245"
              className="h-11 w-full rounded-lg border border-line bg-card px-3 text-xs text-ink outline-none placeholder:text-faint focus:border-primary/50"
            />

            <label className="mb-2 mt-4 block text-[9px] uppercase tracking-[.16em] text-faint">
              Phone number used at checkout
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="03xx xxxxxxx"
              className="h-11 w-full rounded-lg border border-line bg-card px-3 text-xs text-ink outline-none placeholder:text-faint focus:border-primary/50"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-[9px] font-bold uppercase tracking-[.14em] text-[var(--primary-contrast)] transition hover:bg-primary-hover disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <>
                  Get order help
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>

            {error && (
              <p className="mt-3 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-[11px] leading-4 text-danger">
                {error}
              </p>
            )}

            {result && (
              <div className="mt-4 rounded-lg border border-line bg-card p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-ink">
                    {result.orderNumber}
                  </span>
                  <span className="flex gap-1.5">
                    <StatusBadge status={result.status} />
                    <StatusBadge status={result.paymentStatus} />
                  </span>
                </div>

                <dl className="mt-2.5 space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <dt className="text-faint">Placed on</dt>
                    <dd className="text-muted">{result.placedOn}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-faint">Items</dt>
                    <dd className="text-muted">{result.itemCount}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-faint">Total</dt>
                    <dd className="font-semibold text-ink">{result.total}</dd>
                  </div>
                  {result.dueDate && (
                    <div className="flex justify-between">
                      <dt className="text-faint">Expected</dt>
                      <dd className="text-muted">{result.dueDate}</dd>
                    </div>
                  )}
                </dl>

                <p className="mt-2.5 text-[10px] text-faint">
                  Need more detail?{" "}
                  <a href="#support-contact" className="text-primary">
                    Talk to our team
                  </a>
                  .
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
