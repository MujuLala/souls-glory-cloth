"use client";

import { useEffect } from "react";

export default function ZipperScrollbar() {
  useEffect(() => {
    const ID = "souls-glory-zipper";
    const HEADER_HEIGHT = 68;

    // Prevent duplicate instances
    const existing =
      document.getElementById(ID);

    if (existing) {
      existing.remove();
    }

    // =====================================================
    // TRACK
    // =====================================================

    const track =
      document.createElement("div");

    track.id = ID;

    Object.assign(track.style, {
      position: "fixed",
      top: `${HEADER_HEIGHT}px`,
      right: "0",
      width: "16px",
      height: `calc(100vh - ${HEADER_HEIGHT}px)`,
      zIndex: "99999",
      cursor: "pointer",
      userSelect: "none",
      touchAction: "none",
    });

    // =====================================================
    // TEETH
    // =====================================================

    const teeth =
      document.createElement("div");

    Object.assign(teeth.style, {
      position: "absolute",
      inset: "0",
      pointerEvents: "none",
    });

    const createTeeth = () => {
      teeth.innerHTML = "";

      const availableHeight =
        window.innerHeight -
        HEADER_HEIGHT;

      const count =
        Math.ceil(
          availableHeight / 9
        );

      for (
        let i = 0;
        i < count;
        i++
      ) {
        const tooth =
          document.createElement("div");

        Object.assign(tooth.style, {
          position: "absolute",
          top: `${i * 9}px`,
          left: "0",
          right: "0",
          height: "9px",
        });

        // LEFT ZIPPER TOOTH
        const left =
          document.createElement("span");

        Object.assign(left.style, {
          position: "absolute",
          left: "2px",
          top: "50%",
          width: "5px",
          height: "1px",
          backgroundColor:
            "var(--primary)",
          opacity: "0.7",
          borderRadius: "999px",
          transform:
            "translateY(-50%) rotate(-38deg)",
        });

        // RIGHT ZIPPER TOOTH
        const right =
          document.createElement("span");

        Object.assign(right.style, {
          position: "absolute",
          right: "2px",
          top: "50%",
          width: "5px",
          height: "1px",
          backgroundColor:
            "var(--primary)",
          opacity: "0.7",
          borderRadius: "999px",
          transform:
            "translateY(-50%) rotate(38deg)",
        });

        tooth.appendChild(left);
        tooth.appendChild(right);

        teeth.appendChild(tooth);
      }
    };

    track.appendChild(teeth);

    // =====================================================
    // ZIPPER PULL
    // =====================================================

    const pull =
      document.createElement("div");

    pull.setAttribute(
      "data-zipper-pull",
      "true"
    );

    Object.assign(pull.style, {
      position: "absolute",
      left: "50%",
      top: "0%",
      width: "20px",
      height: "34px",
      transform:
        "translate(-50%, -50%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "grab",
      zIndex: "50",
      touchAction: "none",
    });

    // =====================================================
    // PULL BODY
    // =====================================================

    const slider =
      document.createElement("div");

    Object.assign(slider.style, {
      position: "relative",
      width: "11px",
      height: "24px",
      border:
        "1px solid var(--primary)",
      borderRadius: "3px",
      backgroundColor:
        "var(--background)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
    });

    // Center hole
    const hole =
      document.createElement("span");

    Object.assign(hole.style, {
      width: "3px",
      height: "9px",
      borderRadius: "999px",
      backgroundColor:
        "var(--primary)",
    });

    slider.appendChild(hole);

    pull.appendChild(slider);
    track.appendChild(pull);

    document.body.appendChild(track);

    // =====================================================
    // UPDATE POSITION
    // =====================================================

    const updatePosition = () => {
      const maxScroll =
        document.documentElement
          .scrollHeight -
        window.innerHeight;

      const progress =
        maxScroll > 0
          ? window.scrollY /
            maxScroll
          : 0;

      pull.style.top =
        `${Math.max(
          0,
          Math.min(
            1,
            progress
          )
        ) * 100}%`;
    };

    updatePosition();

    // =====================================================
    // SCROLL
    // =====================================================

    window.addEventListener(
      "scroll",
      updatePosition,
      {
        passive: true,
      }
    );

    // =====================================================
    // CLICK
    // =====================================================

    const handleTrackClick = (
      event: MouseEvent
    ) => {
      const target =
        event.target as HTMLElement;

      if (
        target.closest(
          "[data-zipper-pull]"
        )
      ) {
        return;
      }

      const rect =
        track.getBoundingClientRect();

      const clickPosition =
        event.clientY -
        rect.top;

      const progress =
        clickPosition /
        rect.height;

      const maxScroll =
        document.documentElement
          .scrollHeight -
        window.innerHeight;

      window.scrollTo({
        top:
          Math.max(
            0,
            Math.min(
              1,
              progress
            )
          ) * maxScroll,
        behavior: "smooth",
      });
    };

    track.addEventListener(
      "click",
      handleTrackClick
    );

    // =====================================================
    // DRAG
    // =====================================================

    let dragging = false;

    const handlePointerDown = (
      event: PointerEvent
    ) => {
      dragging = true;

      pull.style.cursor =
        "grabbing";

      event.preventDefault();
      event.stopPropagation();

      try {
        pull.setPointerCapture(
          event.pointerId
        );
      } catch {}
    };

    const handlePointerMove = (
      event: PointerEvent
    ) => {
      if (!dragging) return;

      const rect =
        track.getBoundingClientRect();

      const position =
        event.clientY -
        rect.top;

      const progress =
        position /
        rect.height;

      const maxScroll =
        document.documentElement
          .scrollHeight -
        window.innerHeight;

      window.scrollTo({
        top:
          Math.max(
            0,
            Math.min(
              1,
              progress
            )
          ) * maxScroll,
        behavior: "auto",
      });
    };

    const handlePointerUp = () => {
      dragging = false;
      pull.style.cursor =
        "grab";
    };

    pull.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    pull.addEventListener(
      "pointermove",
      handlePointerMove
    );

    pull.addEventListener(
      "pointerup",
      handlePointerUp
    );

    pull.addEventListener(
      "pointercancel",
      handlePointerUp
    );

    // =====================================================
    // RESIZE
    // =====================================================

    const handleResize = () => {
      createTeeth();
      updatePosition();
    };

    createTeeth();

    window.addEventListener(
      "resize",
      handleResize
    );

    // =====================================================
    // CLEANUP
    // =====================================================

    return () => {
      window.removeEventListener(
        "scroll",
        updatePosition
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      track.removeEventListener(
        "click",
        handleTrackClick
      );

      pull.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      pull.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      pull.removeEventListener(
        "pointerup",
        handlePointerUp
      );

      pull.removeEventListener(
        "pointercancel",
        handlePointerUp
      );

      track.remove();
    };
  }, []);

  // React renders NOTHING.
  // This prevents hydration mismatch.
  return null;
}