import Link from "next/link";
import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";

import { cn } from "./cn";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "subtle";

type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  title?: string;
  "aria-label"?: string;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-[var(--primary-contrast)] hover:bg-primary-hover active:bg-primary-active shadow-[0_8px_24px_color-mix(in_srgb,var(--primary)_22%,transparent)]",

  secondary:
    "border border-line bg-surface text-ink hover:border-primary/50 hover:bg-surface-hover",

  subtle: "bg-surface text-muted hover:bg-surface-hover hover:text-ink",

  ghost: "text-muted hover:bg-surface hover:text-ink",

  danger:
    "border border-danger/30 bg-danger/10 text-danger hover:bg-danger/18",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-xs",
  md: "h-11 px-4 text-[13px]",
  lg: "h-12 px-5 text-sm",
};

const base =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-200 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-55";

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  fullWidth = false,
  title,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  if (href && !disabled && !loading) {
    return (
      <Link
        href={href}
        className={classes}
        title={title}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      title={title}
      aria-label={ariaLabel}
    >
      {loading && <Loader2 size={15} className="animate-spin" />}
      {children}
    </button>
  );
}

/* =========================================================
   ICON BUTTON
   Square action button used in table rows and toolbars.
========================================================= */

export function IconButton({
  children,
  onClick,
  label,
  tone = "neutral",
  disabled = false,
  className,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  label: string;
  tone?: "neutral" | "danger";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        "grid h-8 w-8 shrink-0 place-items-center rounded-lg text-faint transition-colors disabled:pointer-events-none disabled:opacity-50",
        tone === "danger"
          ? "hover:bg-danger/12 hover:text-danger"
          : "hover:bg-surface hover:text-ink",
        className,
      )}
    >
      {children}
    </button>
  );
}
