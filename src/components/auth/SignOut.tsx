"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import AuthShell from "./AuthShell";
import Button from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function SignOut() {
  const router = useRouter();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        await authClient.signOut();

        if (!cancelled) {
          router.push("/");
          router.refresh();
        }
      } catch (error) {
        console.error("Sign out failed:", error);

        if (!cancelled) {
          setFailed(true);
        }
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <AuthShell
      title={failed ? "We couldn't sign you out" : "Signing you out"}
      subtitle={
        failed
          ? "Your session is still active. Try again, or close the browser to end it."
          : "One moment — ending your session."
      }
    >
      <div className="flex flex-col items-center gap-4 py-2">
        {failed ? (
          <Button onClick={() => window.location.reload()}>Try again</Button>
        ) : (
          <Loader2 size={22} className="animate-spin text-primary" />
        )}

        <Button href="/" variant="ghost" size="sm">
          Back to the store
        </Button>
      </div>
    </AuthShell>
  );
}
