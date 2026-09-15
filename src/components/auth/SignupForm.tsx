"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LockKeyhole, Mail, UserRound } from "lucide-react";

import AuthInput from "./AuthInput";
import AuthShell from "./AuthShell";
import Button from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function SignupForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [accepted, setAccepted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Tell us your name.");
      return;
    }

    if (!email.trim()) {
      setError("Enter your email address.");
      return;
    }

    if (password.length < 8) {
      setError("Use a password of at least 8 characters.");
      return;
    }

    if (password !== confirm) {
      setError("The two passwords don't match.");
      return;
    }

    if (!accepted) {
      setError("Please accept the terms to continue.");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (result.error) {
        setError(result.error.message || "Could not create your account.");
        return;
      }

      router.push("/account");
      router.refresh();
    } catch (caught) {
      console.error("Signup error:", caught);
      setError("Unable to create the account right now. Please try again.");
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
        callbackURL: "/account",
      });
    } catch (caught) {
      console.error("Google signup error:", caught);
      setError("Google sign up failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Create your account"
      title="Join Soul's Glory Cloth"
      subtitle="Save measurements for everyone you order for, follow tailoring progress, and talk to the atelier directly."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/sign-in" className="font-semibold text-ink hover:text-primary">
            Sign in
          </Link>
        </>
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
          id="name"
          label="Full name"
          value={name}
          onChange={setName}
          placeholder="Your name"
          icon={<UserRound size={15} />}
          autoComplete="name"
          disabled={loading}
          required
        />

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

        <div className="grid gap-4 sm:grid-cols-2">
          <AuthInput
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="At least 8 characters"
            icon={<LockKeyhole size={15} />}
            autoComplete="new-password"
            disabled={loading}
            required
          />

          <AuthInput
            id="confirm"
            label="Confirm password"
            type="password"
            value={confirm}
            onChange={setConfirm}
            placeholder="Repeat it"
            icon={<LockKeyhole size={15} />}
            autoComplete="new-password"
            disabled={loading}
            required
          />
        </div>

        <label className="flex cursor-pointer items-start gap-2">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(event) => setAccepted(event.target.checked)}
            disabled={loading}
            className="mt-0.5 size-3.5 rounded border-line accent-[var(--primary)]"
          />

          <span className="text-[11px] leading-4 text-muted">
            I agree to the terms of service and privacy policy.
          </span>
        </label>

        <Button type="submit" fullWidth size="lg" loading={loading}>
          Create account
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
