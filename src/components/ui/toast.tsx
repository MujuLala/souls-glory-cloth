"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

export type ToastTone = "success" | "error" | "info" | "warning";

type Toast = {
  id: number;
  tone: ToastTone;
  title: string;
  description?: string;
};

type ToastInput = {
  tone?: ToastTone;
  title: string;
  description?: string;
  /* Milliseconds on screen. 0 keeps it until dismissed. */
  duration?: number;
};

type ToastContextValue = {
  toast: (input: ToastInput) => void;
  dismiss: (id: number) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside <ToastProvider>.");
  }

  return context;
}

/* =========================================================
   TONE STYLES
========================================================= */

const toneConfig: Record<
  ToastTone,
  { icon: typeof CheckCircle2; className: string }
> = {
  success: {
    icon: CheckCircle2,
    className: "text-success border-success/30",
  },
  error: {
    icon: XCircle,
    className: "text-danger border-danger/30",
  },
  warning: {
    icon: AlertTriangle,
    className: "text-warning border-warning/30",
  },
  info: {
    icon: Info,
    className: "text-info border-info/30",
  },
};

/* =========================================================
   PROVIDER
========================================================= */

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback(
    ({ tone = "info", title, description, duration = 4000 }: ToastInput) => {
      const id = nextId.current++;

      setToasts((current) => [...current, { id, tone, title, description }]);

      if (duration > 0) {
        window.setTimeout(() => dismiss(id), duration);
      }
    },
    [dismiss],
  );

  const value = useMemo<ToastContextValue>(
    () => ({ toast, dismiss }),
    [toast, dismiss],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-3 bottom-3 z-[200] flex flex-col items-center gap-2 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:items-end"
      >
        {toasts.map((item) => {
          const { icon: Icon, className } = toneConfig[item.tone];

          return (
            <div
              key={item.id}
              role="status"
              className={[
                "pointer-events-auto flex w-full max-w-[380px] animate-fade-up items-start gap-3",
                "rounded-xl border bg-card-elevated p-3.5 shadow-float",
                className,
              ].join(" ")}
            >
              <Icon size={17} className="mt-0.5 shrink-0" />

              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">
                  {item.title}
                </p>

                {item.description && (
                  <p className="mt-0.5 text-xs leading-5 text-muted">
                    {item.description}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => dismiss(item.id)}
                aria-label="Dismiss notification"
                className="shrink-0 rounded-md p-1 text-faint transition-colors hover:bg-surface hover:text-ink"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
