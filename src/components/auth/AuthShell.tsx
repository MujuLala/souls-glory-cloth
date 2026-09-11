import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Scissors, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

type AuthShellProps = {
  mode: "login" | "signup";
  title: string;
  description: string;
  footerText: string;
  footerLink: string;
  footerLabel: string;
  children: ReactNode;
};

export default function AuthShell({
  mode,
  title,
  description,
  footerText,
  footerLink,
  footerLabel,
  children,
}: AuthShellProps) {
  const isLogin = mode === "login";

  return (
    <main
      className="min-h-screen bg-[var(--bg)] px-4 py-5 text-[var(--text)] transition-colors duration-300 sm:px-6 sm:py-8"
      style={{
        backgroundImage:
          "radial-gradient(circle at 15% 15%, color-mix(in srgb, var(--primary) 9%, transparent), transparent 28%), radial-gradient(circle at 90% 85%, color-mix(in srgb, var(--primary) 6%, transparent), transparent 30%)",
      }}
    >
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-[1180px] items-center justify-center sm:min-h-[calc(100vh-4rem)]">
        <div className="w-full overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] shadow-[0_30px_100px_rgba(0,0,0,0.18)] backdrop-blur-2xl">
          <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
            {/* Brand panel */}
            <section className="relative hidden min-h-[700px] overflow-hidden border-r border-[var(--border)] bg-[var(--bg-secondary)] p-9 lg:flex lg:flex-col">
              <div
                className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full opacity-20 blur-3xl"
                style={{ background: "var(--primary)" }}
              />
              <div
                className="pointer-events-none absolute -bottom-32 -left-28 size-80 rounded-full opacity-10 blur-3xl"
                style={{ background: "var(--primary)" }}
              />

              <div
                className="pointer-events-none absolute inset-0 opacity-[0.055]"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
                  backgroundSize: "42px 42px",
                }}
              />

              <Link
                href="/"
                className="relative z-10 inline-flex w-fit items-center gap-3"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-[var(--primary)] text-white shadow-[0_10px_30px_color-mix(in_srgb,var(--primary)_25%,transparent)]">
                  <Scissors className="size-[18px]" strokeWidth={2.2} />
                </span>
                <span>
                  <span className="block text-[13px] font-bold tracking-[0.12em]">
                    SOUL&apos;S GLORY
                  </span>
                  <span className="block text-[9px] font-medium tracking-[0.28em] text-[var(--text-secondary)]">
                    CLOTH
                  </span>
                </span>
              </Link>

              <div className="relative z-10 mt-auto">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-[11px] font-medium text-[var(--text-secondary)] backdrop-blur-xl">
                  <span className="size-1.5 rounded-full bg-[var(--primary)]" />
                  Tailoring management, simplified
                </div>

                <h2 className="max-w-[460px] text-[42px] font-semibold leading-[1.03] tracking-[-0.04em] xl:text-[52px]">
                  {isLogin ? (
                    <>
                      Welcome back
                      <span className="block text-[var(--text-secondary)]">
                        to your craft.
                      </span>
                    </>
                  ) : (
                    <>
                      Build your
                      <span className="block text-[var(--text-secondary)]">
                        tailoring story.
                      </span>
                    </>
                  )}
                </h2>

                <p className="mt-6 max-w-[410px] text-[14px] leading-7 text-[var(--text-secondary)]">
                  One elegant workspace for customers, measurements, orders,
                  appointments and the details that make every garment yours.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  {[
                    "Customer management",
                    "Smart measurements",
                    "Order tracking",
                    "Business workspace",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-[11px] text-[var(--text-secondary)]"
                    >
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                        <Check className="size-3" strokeWidth={2.5} />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 mt-8 flex items-center justify-between border-t border-[var(--border)] pt-5 text-[10px] uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                <span>Made for modern tailors</span>
                <span>© {new Date().getFullYear()}</span>
              </div>
            </section>

            {/* Form panel */}
            <section className="relative min-h-[700px] bg-[var(--bg-secondary)]/65 px-5 py-8 sm:px-10 sm:py-10 lg:px-14">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-tertiary)] transition hover:text-[var(--text)]"
                >
                  <ArrowLeft className="size-3.5" />
                  Home
                </Link>

                <span className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                  <Sparkles className="size-3.5 text-[var(--primary)]" />
                  Secure access
                </span>
              </div>

              <div className="mx-auto flex min-h-[600px] w-full max-w-[440px] flex-col justify-center py-12">
                <div className="mb-8">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/8 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                    {isLogin ? "Account login" : "New account"}
                  </div>

                  <h1 className="text-[34px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[40px]">
                    {title}
                  </h1>

                  <p className="mt-3 max-w-[390px] text-[13px] leading-6 text-[var(--text-secondary)]">
                    {description}
                  </p>
                </div>

                {children}

                <p className="mt-7 text-center text-[12px] text-[var(--text-tertiary)]">
                  {footerText}{" "}
                  <Link
                    href={footerLink}
                    className="font-semibold text-[var(--text)] underline decoration-[var(--primary)] decoration-1 underline-offset-4 transition hover:text-[var(--primary)]"
                  >
                    {footerLabel}
                  </Link>
                </p>

                <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-[var(--text-tertiary)]">
                  <span>Need help?</span>
                  <Link
                    href="/support"
                    className="inline-flex items-center gap-1 font-medium text-[var(--text-secondary)] hover:text-[var(--primary)]"
                  >
                    Visit support
                    <ArrowUpRight className="size-3" />
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
