"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    let script: HTMLScriptElement | null = null;

    const loadSmoothScroll = async () => {
      if (document.getElementById("gblazex-smooth-scroll")) {
        return;
      }

      script = document.createElement("script");
      script.id = "gblazex-smooth-scroll";
      script.src =
        "https://cdn.jsdelivr.net/npm/smoothscroll-for-websites@1.5.1/SmoothScroll.js";
      script.async = true;

      document.body.appendChild(script);
    };

    loadSmoothScroll();

    return () => {
      // Don't remove the script during normal Next.js navigation.
      // The library attaches global scrolling handlers.
    };
  }, []);

  return null;
}