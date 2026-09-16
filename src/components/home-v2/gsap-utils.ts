"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

/* =========================================================
   GSAP SETUP

   Registered once, lazily, and only in the browser — this
   file is only ever imported by "use client" components, but
   guarding again here costs nothing and keeps it safe if that
   ever changes.
========================================================= */

let registered = false;

function ensureRegistered() {
  if (registered || typeof window === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  registered = true;
}

/* =========================================================
   SCOPED ANIMATION HOOK

   Wraps `gsap.context` so every tween/ScrollTrigger created
   inside `setup` is scoped to the returned ref and torn down
   automatically on unmount — no leaked ScrollTriggers, no
   animations still running against a removed node.
========================================================= */

export function useGsapScope<T extends HTMLElement>(
  setup: (scope: T) => void,
  deps: React.DependencyList = [],
): RefObject<T | null> {
  const scopeRef = useRef<T>(null);

  useEffect(() => {
    ensureRegistered();

    const node = scopeRef.current;

    if (!node) {
      return;
    }

    const ctx = gsap.context(() => setup(node), node);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}

/** Default scroll-triggered "reveal" — fade + rise, once. */
export const revealFrom = (
  target: gsap.TweenTarget,
  overrides: gsap.TweenVars = {},
): gsap.TweenVars => ({
  opacity: 0,
  y: 28,
  duration: 0.7,
  ease: "power3.out",
  ...overrides,
});

export { gsap, ScrollTrigger };
