import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={[
        "flex gap-5",
        centered
          ? "flex-col items-center text-center"
          : "items-end justify-between",
      ].join(" ")}
    >
      <div className={centered ? "max-w-[700px]" : "max-w-[650px]"}>

        {eyebrow && (
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-secondary)]">
              {eyebrow}
            </span>
          </div>
        )}

        <h2 className="text-[clamp(28px,2.8vw,46px)] font-bold leading-[1] tracking-[-0.055em] text-[var(--text)]">
          {title}
        </h2>

        {description && (
          <p className="mt-3 max-w-[560px] text-[13px] leading-[1.6] text-[var(--text-secondary)]">
            {description}
          </p>
        )}
      </div>

      {!centered && action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}