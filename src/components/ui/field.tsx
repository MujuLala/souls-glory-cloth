"use client";

import type { ReactNode } from "react";

import { cn } from "./cn";

/* =========================================================
   SHARED CONTROL STYLES
========================================================= */

export const controlClasses =
  "w-full rounded-lg border border-input-line bg-input px-3 text-[13px] text-ink transition-colors placeholder:text-faint hover:border-line-strong disabled:cursor-not-allowed disabled:opacity-60";

/* =========================================================
   FIELD WRAPPER
========================================================= */

export function Field({
  label,
  hint,
  error,
  required = false,
  htmlFor,
  children,
  className,
}: {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="mb-1.5 block text-[11px] font-semibold text-muted"
        >
          {label}
          {required && <span className="ml-0.5 text-primary">*</span>}
        </label>
      )}

      {children}

      {error ? (
        <p className="mt-1.5 text-[11px] text-danger">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-[11px] leading-4 text-faint">{hint}</p>
      ) : null}
    </div>
  );
}

/* =========================================================
   INPUT
========================================================= */

type InputProps = {
  id?: string;
  name?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "date" | "search";
  disabled?: boolean;
  required?: boolean;
  min?: number;
  step?: string | number;
  className?: string;
  icon?: ReactNode;
  invalid?: boolean;
  autoComplete?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export function Input({
  id,
  name,
  value,
  defaultValue,
  onChange,
  placeholder,
  type = "text",
  disabled,
  required,
  min,
  step,
  className,
  icon,
  invalid,
  autoComplete,
  onKeyDown,
}: InputProps) {
  const input = (
    <input
      id={id}
      name={name}
      value={value}
      defaultValue={defaultValue}
      onChange={(event) => onChange?.(event.target.value)}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      required={required}
      min={min}
      step={step}
      autoComplete={autoComplete}
      onKeyDown={onKeyDown}
      aria-invalid={invalid || undefined}
      className={cn(
        controlClasses,
        "h-11",
        icon && "pl-9",
        invalid && "border-danger/60",
        className,
      )}
    />
  );

  if (!icon) {
    return input;
  }

  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint">
        {icon}
      </span>

      {input}
    </div>
  );
}

/* =========================================================
   TEXTAREA
========================================================= */

export function Textarea({
  id,
  name,
  value,
  defaultValue,
  onChange,
  placeholder,
  rows = 4,
  disabled,
  className,
}: {
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      defaultValue={defaultValue}
      onChange={(event) => onChange?.(event.target.value)}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      className={cn(controlClasses, "resize-y py-2.5 leading-6", className)}
    />
  );
}

/* =========================================================
   SELECT
========================================================= */

export function Select({
  id,
  name,
  value,
  defaultValue,
  onChange,
  disabled,
  className,
  children,
}: {
  id?: string;
  name?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      defaultValue={defaultValue}
      onChange={(event) => onChange?.(event.target.value)}
      disabled={disabled}
      className={cn(controlClasses, "h-11 cursor-pointer pr-8", className)}
    >
      {children}
    </select>
  );
}

/* =========================================================
   CHECKBOX / SWITCH
========================================================= */

export function Checkbox({
  checked,
  onChange,
  label,
  description,
  disabled,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-2.5",
        disabled && "cursor-not-allowed opacity-60",
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 size-4 shrink-0 rounded border-line accent-[var(--primary)]"
      />

      <span className="min-w-0">
        <span className="block text-[13px] text-ink">{label}</span>

        {description && (
          <span className="mt-0.5 block text-[11px] leading-4 text-faint">
            {description}
          </span>
        )}
      </span>
    </label>
  );
}

export function Switch({
  checked,
  onChange,
  label,
  disabled,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full border transition-colors disabled:opacity-50",
        checked
          ? "border-primary bg-primary"
          : "border-line bg-surface-strong",
      )}
    >
      <span
        className={cn(
          "absolute top-1/2 size-4 -translate-y-1/2 rounded-full bg-white shadow-sm transition-all",
          checked ? "left-[calc(100%-1.25rem)]" : "left-1",
        )}
      />
    </button>
  );
}
