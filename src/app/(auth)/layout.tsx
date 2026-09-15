import Link from "next/link";

import AmbientBackground from "@/components/ui/ambient-background";
import ThemeToggle from "@/components/theme/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AmbientBackground />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="mx-auto flex w-[92vw] max-w-[1400px] items-center justify-between py-4">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label="Soul's Glory Cloth home"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-primary text-sm font-black text-primary">
              S
            </span>

            <span className="text-sm font-bold leading-none text-ink">
              Soul&apos;s Glory
              <span className="ml-1 font-extrabold text-primary">Cloth</span>
            </span>
          </Link>

          <ThemeToggle />
        </header>

        <main className="flex flex-1 items-center justify-center px-[4vw] py-6">
          {children}
        </main>

        <footer className="mx-auto w-[92vw] max-w-[1400px] py-5 text-center text-[10px] text-faint">
          © {new Date().getFullYear()} Soul&apos;s Glory Cloth · Bespoke
          tailoring platform
        </footer>
      </div>
    </>
  );
}
