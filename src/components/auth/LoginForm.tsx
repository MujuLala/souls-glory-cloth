"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LockKeyhole, Mail, ShieldCheck } from "lucide-react";

import AuthInput from "./AuthInput";
import AuthShell from "./AuthShell";
import Button from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

/* =========================================================
   LOGIN

   `variant="admin"` is the same authentication with staff
   framing and a staff landing page — the role check itself
   happens server-side in the dashboard layout.
========================================================= */

export default function LoginForm({
  variant = "customer",
}: {
  variant?: "customer" | "admin";
}) {
  const router = useRouter();

  const isAdmin = variant === "admin";
  const destination = isAdmin ? "/dashboard" : "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      setError("Enter your email address and password.");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email: cleanEmail,
        password,
        rememberMe,
      });

      if (result.error) {
        setError(result.error.message || "Invalid email or password.");
        return;
      }

      router.push(destination);
      router.refresh();
    } catch (caught) {
      console.error("Login error:", caught);
      setError("Unable to sign in right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: destination,
      });
    } catch (caught) {
      console.error("Google login error:", caught);
      setError("Google sign in failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow={isAdmin ? "Staff access" : "Welcome back"}
      title={isAdmin ? "Sign in to the console" : "Sign in to your account"}
      subtitle={
        isAdmin
          ? "For admins, managers, tailors and cashiers. Customers should use the storefront sign in."
          : "Track orders, manage measurements for your family, and pick up your chat where you left off."
      }
      footer={
        isAdmin ? (
          <>
            Not staff?{" "}
            <Link href="/sign-in" className="font-semibold text-ink hover:text-primary">
              Customer sign in
            </Link>
          </>
        ) : (
          <>
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="font-semibold text-ink hover:text-primary">
              Create one
            </Link>
          </>
        )
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p
            role="alert"
            className="rounded-xl border border-danger/30 bg-danger/10 px-3.5 py-2.5 text-[11.5px] leading-4 text-danger"
          >
            {error}
          </p>
        )}

        <AuthInput
          id="email"
          label="Email address"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          icon={<Mail size={15} />}
          autoComplete="email"
          disabled={loading}
          required
        />

        <AuthInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Your password"
          icon={<LockKeyhole size={15} />}
          autoComplete="current-password"
          disabled={loading}
          required
        />

        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              disabled={loading}
              className="size-3.5 rounded border-line accent-[var(--primary)]"
            />

            <span className="text-[11px] text-muted">Keep me signed in</span>
          </label>

          <Link
            href="/forgot-password"
            className="text-[11px] font-semibold text-muted transition-colors hover:text-primary"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" fullWidth size="lg" loading={loading}>
          {isAdmin && <ShieldCheck size={16} />}
          Sign in
        </Button>

        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-[var(--border)]" />

          <span className="text-[9px] font-bold tracking-[0.18em] text-faint">
            OR
          </span>

          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>

        <Button
          type="button"
          variant="secondary"
          fullWidth
          size="lg"
          loading={googleLoading}
          disabled={loading}
          onClick={handleGoogle}
        >
          {!googleLoading && (
            <span className="grid size-5 place-items-center rounded-md border border-line bg-bg text-[10px] font-bold">
              G
            </span>
          )}
          Continue with Google
        </Button>
      </form>
    </AuthShell>
  );
}
