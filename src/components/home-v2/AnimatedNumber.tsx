"use client";

import { gsap, ScrollTrigger, useGsapScope } from "./gsap-utils";

/* =========================================================
   ANIMATED NUMBER

   Counts up from 0 to `value` once the element scrolls into
   view. Formats with `prefix`/`suffix` and optional decimal
   places (for things like "4.8"). Updates the DOM directly
   via GSAP rather than React state, so a fast count doesn't
   spam re-renders.
========================================================= */

export default function AnimatedNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const scopeRef = useGsapScope<HTMLSpanElement>((node) => {
    const counter = { val: 0 };

    ScrollTrigger.create({
      trigger: node,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          val: value,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            node.textContent = prefix + counter.val.toFixed(decimals) + suffix;
          },
        });
      },
    });
  }, [value, decimals, prefix, suffix, duration]);

  /* Rendered as one combined string, not separate
     prefix/number/suffix children — GSAP later overwrites
     `node.textContent` wholesale, and React must only ever
     see a single text node here or it can throw trying to
     reconcile children GSAP already removed. */
  return (
    <span ref={scopeRef} className={className}>
      {`${prefix}${(0).toFixed(decimals)}${suffix}`}
    </span>
  );
}
