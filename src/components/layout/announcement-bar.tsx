
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  return (
    <div
      className={`
        relative
        z-[60]
        overflow-hidden
        border-b
        border-[var(--announcement-border)]
        bg-[var(--announcement-bg)]
        transition-[height,opacity,transform]
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${
          visible
            ? "h-[32px] translate-y-0 opacity-100"
            : "h-0 -translate-y-full opacity-0"
        }
      `}
    >
      <div className="mx-auto flex h-[32px] w-[92vw] max-w-[1440px] items-center justify-center px-8 sm:px-10">
        <div className="flex items-center justify-center gap-2 text-center">
          <span
            className="
              hidden
              h-1.5
              w-1.5
              shrink-0
              rounded-full
              bg-[var(--primary)]
              shadow-[0_0_10px_var(--primary)]
              sm:block
            "
          />

          <p className="text-[10px] font-medium leading-4 text-[var(--announcement-text)] sm:text-[11px]">
            Worldwide delivery is now available.
          </p>

          <Link
            href="/shipping"
            className="
              group
              inline-flex
              items-center
              gap-1
              text-[10px]
              font-semibold
              text-[var(--text)]
              transition-colors
              duration-300
              hover:text-[var(--primary)]
              sm:text-[11px]
            "
          >
            Explore shipping

            <ArrowUpRight
              size={11}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-[1px]
                group-hover:-translate-y-[1px]
              "
            />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Close announcement"
          className="
            absolute
            right-0
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            text-[var(--text-secondary)]
            transition-all
            duration-300
            hover:bg-[var(--surface-hover)]
            hover:text-[var(--text)]
          "
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
}
