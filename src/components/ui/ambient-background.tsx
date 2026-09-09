export default function AmbientBackground() {
  return (
    <>
      {/* Ambient glow */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div
          className="
            absolute
            left-[-12vw]
            top-[-8vw]
            h-[32vw]
            w-[32vw]
            rounded-full
            bg-[var(--primary)]
            opacity-[0.08]
            blur-[9vw]
          "
        />

        <div
          className="
            absolute
            right-[-10vw]
            top-[4vw]
            h-[30vw]
            w-[30vw]
            rounded-full
            bg-red-950
            opacity-[0.12]
            blur-[8vw]
          "
        />

        <div
          className="
            absolute
            bottom-[-18vw]
            left-[35%]
            h-[28vw]
            w-[28vw]
            rounded-full
            bg-[var(--primary)]
            opacity-[0.055]
            blur-[10vw]
          "
        />

      </div>

      {/* Grid */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
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
    </>
  );
}