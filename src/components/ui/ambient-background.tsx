export default function AmbientBackground() {
  return (
    <div
      className="
        pointer-events-none
        fixed
        inset-0
        z-0
        overflow-hidden
      "
    >
      {/* =====================================================
          RED AMBIENT GLOW — TOP LEFT
      ====================================================== */}

      <div
        className="
          absolute
          left-[-12vw]
          top-[-10vw]
          h-[38vw]
          w-[38vw]
          rounded-full
          bg-[var(--primary)]
          opacity-[0.075]
          blur-[10vw]
        "
      />

      {/* =====================================================
          BURGUNDY GLOW — TOP RIGHT
      ====================================================== */}

      <div
        className="
          absolute
          right-[-12vw]
          top-[8vw]
          h-[34vw]
          w-[34vw]
          rounded-full
          bg-red-950
          opacity-[0.11]
          blur-[9vw]
        "
      />

      {/* =====================================================
          CENTER GLOW
      ====================================================== */}

      <div
        className="
          absolute
          left-[38%]
          top-[28%]
          h-[30vw]
          w-[30vw]
          rounded-full
          bg-[var(--primary)]
          opacity-[0.025]
          blur-[10vw]
        "
      />

      {/* =====================================================
          BOTTOM GLOW
      ====================================================== */}

      <div
        className="
          absolute
          bottom-[-15vw]
          left-[15%]
          h-[35vw]
          w-[35vw]
          rounded-full
          bg-[var(--primary)]
          opacity-[0.045]
          blur-[11vw]
        "
      />

      {/* =====================================================
          GLOBAL GRID PATTERN
      ====================================================== */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.025]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              var(--text) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              var(--text) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "4vw 4vw",
        }}
      />

      {/* =====================================================
          VERY SUBTLE VIGNETTE
      ====================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_20%,var(--bg)_125%)]
          opacity-30
        "
      />
    </div>
  );
}