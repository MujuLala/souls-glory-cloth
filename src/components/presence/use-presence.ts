"use client";

import { useEffect, useRef, useState } from "react";

/* =========================================================
   PRESENCE HEARTBEAT

   Vercel has no long-lived socket, so "who is online" is a
   short heartbeat instead: each client pings every 25s and
   anyone seen inside the last 70s counts as online. The same
   response carries the live counts, so one request does both
   jobs.
========================================================= */

const HEARTBEAT_MS = 25_000;

export type PresenceCounts = {
  total: number;
  staff: number;
  customers: number;
};

const emptyCounts: PresenceCounts = { total: 0, staff: 0, customers: 0 };

export function usePresence({
  id,
  name,
  role,
  enabled = true,
}: {
  id: string;
  name?: string;
  role?: string;
  enabled?: boolean;
}) {
  const [online, setOnline] = useState(true);
  const [counts, setCounts] = useState<PresenceCounts>(emptyCounts);

  /* Keep the latest identity without restarting the timer
     every time a prop changes identity-by-value. */
  const identity = useRef({ id, name, role });
  identity.current = { id, name, role };

  useEffect(() => {
    if (!enabled || !id) {
      return;
    }

    let cancelled = false;

    const beat = async (status: "online" | "offline" = "online") => {
      try {
        const response = await fetch("/api/presence", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...identity.current, status }),
          keepalive: status === "offline",
        });

        if (!response.ok) {
          throw new Error(`Presence responded ${response.status}`);
        }

        const data = (await response.json()) as PresenceCounts;

        if (!cancelled) {
          setCounts({
            total: data.total ?? 0,
            staff: data.staff ?? 0,
            customers: data.customers ?? 0,
          });
          setOnline(true);
        }
      } catch {
        if (!cancelled) {
          setOnline(false);
        }
      }
    };

    void beat();

    const timer = window.setInterval(() => {
      /* A backgrounded tab shouldn't claim to be present. */
      if (document.visibilityState === "visible") {
        void beat();
      }
    }, HEARTBEAT_MS);

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        void beat();
      }
    };

    const handleOffline = () => setOnline(false);
    const handleOnline = () => void beat();

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      void beat("offline");
    };
  }, [id, enabled]);

  return { online, counts };
}

/* =========================================================
   GUEST KEY

   Stable per-browser id so an anonymous shopper keeps the
   same chat thread and presence row across reloads.
========================================================= */

const GUEST_KEY_STORAGE = "sg-guest-key";

export function getGuestKey(): string {
  if (typeof window === "undefined") {
    return "";
  }

  try {
    const existing = localStorage.getItem(GUEST_KEY_STORAGE);

    if (existing) {
      return existing;
    }

    const created =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `g${Date.now()}${Math.random().toString(36).slice(2, 10)}`;

    localStorage.setItem(GUEST_KEY_STORAGE, created);

    return created;
  } catch {
    /* Private mode: fall back to a per-session key. */
    return `g${Date.now()}`;
  }
}
