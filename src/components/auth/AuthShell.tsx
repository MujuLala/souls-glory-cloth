import type { ReactNode } from "react";

/* =========================================================
   AUTH SHELL

   The card every auth screen sits in. The page chrome (logo,
   theme toggle, footer) comes from the (auth) layout.
========================================================= */

export default function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
  width = "sm",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  width?: "sm" | "md";
}) {
  return (
    <div
      className={`w-full ${width === "md" ? "max-w-[620px]" : "max-w-[440px]"}`}
    >
      <div className="rounded-2xl border border-line bg-card p-5 shadow-panel sm:p-7">
        <div className="text-center">
          {eyebrow && (
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3 py-1.5">
              <span className="size-1.5 rounded-full bg-primary" />

              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-primary">
                {eyebrow}
              </span>
            </span>
          )}

          <h1 className="text-[24px] font-semibold leading-tight tracking-[-0.03em] text-ink sm:text-[28px]">
            {title}
          </h1>

          {subtitle && (
            <p className="mx-auto mt-2 max-w-[42ch] text-[12px] leading-5 text-muted">
              {subtitle}
            </p>
          )}
        </div>

        <div className="mt-6">{children}</div>
      </div>

      {footer && (
        <div className="mt-4 text-center text-[11.5px] text-muted">
          {footer}
        </div>
      )}
    </div>
  );
}
