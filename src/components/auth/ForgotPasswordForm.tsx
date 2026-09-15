"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";

import AuthInput from "./AuthInput";
import AuthShell from "./AuthShell";
import Button from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Enter the email address on your account.");
      return;
    }

    setLoading(true);

    try {
      const client = authClient as unknown as {
        forgetPassword?: (input: {
          email: string;
          redirectTo?: string;
        }) => Promise<{ error?: { message?: string } }>;
      };

      /* Not every auth configuration exposes password reset;
         when it doesn't, we say so rather than pretending an
         email is on its way. */
      if (typeof client.forgetPassword !== "function") {
        setError(
          "Password reset isn't enabled for this store yet. Message the atelier and we'll help you back in.",
        );
        return;
      }

      const result = await client.forgetPassword({
        email: email.trim(),
        redirectTo: "/sign-in",
      });

      if (result?.error) {
        setError(result.error.message ?? "Could not send the reset email.");
        return;
      }

      setSent(true);
    } catch (caught) {
      console.error("Password reset error:", caught);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <AuthShell
        title="Check your inbox"
        subtitle={`If an account exists for ${email.trim()}, a reset link is on its way. The link expires in one hour.`}
        footer={
          <Link href="/sign-in" className="font-semibold text-ink hover:text-primary">
            Back to sign in
          </Link>
        }
      >
        <div className="flex flex-col items-center gap-3 py-2">
          <span className="grid size-12 place-items-center rounded-full bg-success/12 text-success">
            <CheckCircle2 size={24} />
          </span>

          <Button href="/sign-in" variant="secondary" size="sm">
            Back to sign in
          </Button>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      eyebrow="Account recovery"
      title="Reset your password"
      subtitle="Enter the email address on your account and we'll send you a link to set a new password."
      footer={
        <>
          Remembered it?{" "}
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

        <Button type="submit" fullWidth size="lg" loading={loading}>
          Send reset link
        </Button>
      </form>
    </AuthShell>
  );
}
