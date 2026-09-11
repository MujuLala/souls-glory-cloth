import type { ReactNode } from "react";

type AuthInputProps = {
  label: string;
  icon: ReactNode;
  type?: string;
  placeholder: string;
  autoComplete?: string;
  right?: ReactNode;
};

export default function AuthInput({
  label,
  icon,
  type = "text",
  placeholder,
  autoComplete,
  right,
}: AuthInputProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)]">
        {label}
      </span>
      <span className="relative block">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]">
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="h-[52px] w-full rounded-[14px] border border-[var(--border)] bg-[var(--surface)] pl-11 pr-12 text-[13px] text-[var(--text)] outline-none transition placeholder:text-[var(--text-tertiary)] hover:border-[var(--surface-hover)] focus:border-[var(--primary)]/60 focus:bg-[var(--surface-hover)] focus:ring-4 focus:ring-[var(--primary)]/8"
        />
        {right}
      </span>
    </label>
  );
}
