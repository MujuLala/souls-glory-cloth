"use client";

import { useState, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

/* =========================================================
   AUTH INPUT

   Slightly taller than the CMS input and always icon-led, so
   the sign-in screens read as their own surface.
========================================================= */

export default function AuthInput({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  icon,
  autoComplete,
  disabled,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "password" | "tel";
  placeholder?: string;
  icon?: ReactNode;
  autoComplete?: string;
  disabled?: boolean;
  required?: boolean;
}) {
  const [revealed, setRevealed] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && revealed ? "text" : type;

  return (
    <label className="block" htmlFor={id}>
      <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
        {label}
        {required && <span className="ml-0.5 text-primary">*</span>}
      </span>

      <span className="relative block">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint">
            {icon}
          </span>
        )}

        <input
          id={id}
          type={inputType}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          required={required}
          className={`h-12 w-full rounded-xl border border-input-line bg-input text-[13px] text-ink outline-none transition-colors placeholder:text-faint hover:border-line-strong disabled:cursor-not-allowed disabled:opacity-60 ${
            icon ? "pl-10" : "pl-3.5"
          } ${isPassword ? "pr-11" : "pr-3.5"}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setRevealed((value) => !value)}
            aria-label={revealed ? "Hide password" : "Show password"}
            disabled={disabled}
            className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-faint transition-colors hover:bg-surface hover:text-ink"
          >
            {revealed ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </span>
    </label>
  );
}
