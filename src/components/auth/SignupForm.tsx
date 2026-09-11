"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

export default function SignupForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (!cleanName) {
      setError("Please enter your full name.");
      return;
    }

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please create a password.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!acceptedTerms) {
      setError("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name: cleanName,
        email: cleanEmail,
        password,
      });

      if (result.error) {
        setError(
          result.error.message ||
            "Unable to create your account. Please try again."
        );
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error("Signup error:", err);
      setError("Unable to create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");

    setGoogleLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (err) {
      console.error("Google signup error:", err);
      setError("Google sign up failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-6 text-[var(--text)]">
      <div className="w-full max-w-[820px]">

        {/* MAIN CARD */}
        <div className="rounded-[20px] border border-[var(--border)] bg-[var(--bg-secondary)] px-5 py-7 shadow-[0_20px_70px_rgba(0,0,0,0.14)] sm:px-8 sm:py-8 lg:px-10">

          {/* Top navigation */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/"
              className="group inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--text-tertiary)] transition hover:text-[var(--text)]"
            >
              <ArrowLeft
                size={13}
                className="transition-transform group-hover:-translate-x-0.5"
              />
              Home
            </Link>

            <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
              Create account
            </span>
          </div>

          {/* HEADING */}
          <div className="mx-auto mb-7 max-w-[480px] text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/7 px-3 py-1.5">
              <span className="size-1.5 rounded-full bg-[var(--primary)]" />

              <span className="text-[8px] font-bold uppercase tracking-[0.17em] text-[var(--primary)]">
                New account
              </span>
            </div>

            <h1 className="text-[28px] font-semibold leading-tight tracking-[-0.04em] sm:text-[32px]">
              Create your account
            </h1>

            <p className="mx-auto mt-2 max-w-[400px] text-[11px] leading-5 text-[var(--text-secondary)]">
              Create your account and start managing your tailoring business
              with ease.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-[720px]"
          >

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="mb-4 rounded-[11px] border border-[var(--primary)]/20 bg-[var(--primary)]/8 px-4 py-3 text-[10px] leading-4 text-[var(--primary)]"
              >
                {error}
              </div>
            )}

            {/* 3 FIELDS */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

              {/* Full Name */}
              <label className="block">
                <span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                  Full name
                </span>

                <div className="relative">
                  <UserRound
                    size={15}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
                  />

                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your full name"
                    autoComplete="name"
                    disabled={loading}
                    className="h-[46px] w-full rounded-[11px] border border-[var(--border)] bg-[var(--surface)] pl-10 pr-3 text-[12px] text-[var(--text)] outline-none transition-all placeholder:text-[var(--text-tertiary)] hover:border-[var(--surface-hover)] focus:border-[var(--primary)]/60 focus:bg-[var(--surface-hover)] focus:ring-4 focus:ring-[var(--primary)]/6 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </label>

              {/* Email */}
              <label className="block">
                <span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                  Email address
                </span>

                <div className="relative">
                  <Mail
                    size={15}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={loading}
                    className="h-[46px] w-full rounded-[11px] border border-[var(--border)] bg-[var(--surface)] pl-10 pr-3 text-[12px] text-[var(--text)] outline-none transition-all placeholder:text-[var(--text-tertiary)] hover:border-[var(--surface-hover)] focus:border-[var(--primary)]/60 focus:bg-[var(--surface-hover)] focus:ring-4 focus:ring-[var(--primary)]/6 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </label>

              {/* Password */}
              <label className="block">
                <span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                  Password
                </span>

                <div className="relative">
                  <LockKeyhole
                    size={15}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Create password"
                    autoComplete="new-password"
                    disabled={loading}
                    className="h-[46px] w-full rounded-[11px] border border-[var(--border)] bg-[var(--surface)] pl-10 pr-10 text-[12px] text-[var(--text)] outline-none transition-all placeholder:text-[var(--text-tertiary)] hover:border-[var(--surface-hover)] focus:border-[var(--primary)]/60 focus:bg-[var(--surface-hover)] focus:ring-4 focus:ring-[var(--primary)]/6 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    disabled={loading}
                    className="absolute right-1.5 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-[var(--text-tertiary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text)] disabled:pointer-events-none disabled:opacity-50"
                  >
                    {showPassword ? (
                      <EyeOff size={15} />
                    ) : (
                      <Eye size={15} />
                    )}
                  </button>
                </div>
              </label>
            </div>

            {/* Terms */}
            <label className="mt-5 flex cursor-pointer items-start gap-2.5">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) =>
                  setAcceptedTerms(event.target.checked)
                }
                disabled={loading}
                className="mt-0.5 size-[14px] shrink-0 rounded border-[var(--border)] bg-[var(--surface)] accent-[var(--primary)]"
              />

              <span className="text-[10px] leading-4.5 text-[var(--text-secondary)]">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="font-semibold text-[var(--text)] underline decoration-[var(--primary)] underline-offset-2"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-[var(--text)] underline decoration-[var(--primary)] underline-offset-2"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            {/* Create Account */}
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="mt-5 flex h-[47px] w-full items-center justify-center gap-2 rounded-[11px] bg-[var(--primary)] text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-[var(--primary-hover)] hover:shadow-[0_10px_28px_color-mix(in_srgb,var(--primary)_23%,transparent)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 disabled:shadow-none"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>

            {/* Divider */}
            <div className="my-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-[var(--border)]" />

              <span className="text-[8px] font-bold tracking-[0.18em] text-[var(--text-tertiary)]">
                OR
              </span>

              <span className="h-px flex-1 bg-[var(--border)]" />
            </div>

            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={loading || googleLoading}
              className="flex h-[45px] w-full items-center justify-center gap-2.5 rounded-[11px] border border-[var(--border)] bg-[var(--surface)] text-[11px] font-semibold text-[var(--text)] transition hover:border-[var(--text-tertiary)] hover:bg-[var(--surface-hover)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {googleLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <span className="grid size-5 place-items-center rounded-md border border-[var(--border)] bg-[var(--bg)] text-[10px] font-bold">
                    G
                  </span>

                  Continue with Google
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-5 text-center">
            <p className="text-[10px] text-[var(--text-tertiary)]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[var(--text)] transition hover:text-[var(--primary)]"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom */}
        <p className="mt-3 text-center text-[8px] font-medium uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
          Soul&apos;s Glory Cloth
        </p>
      </div>
    </main>
  );
}