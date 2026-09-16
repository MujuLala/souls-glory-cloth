"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Search, UserPlus } from "lucide-react";

import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { Select } from "@/components/ui/field";
import { useToast } from "@/components/ui/toast";
import { initials } from "@/lib/format";
import { searchAppUsers } from "@/actions/team";
import { updateStaffRole } from "@/actions/settings";

type FoundUser = {
  id: string;
  name: string | null;
  email: string;
  role: string;
};

const roles = ["Admin", "Manager", "Tailor", "Cashier"];

export default function PromoteUser() {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FoundUser[]>([]);
  const [searched, setSearched] = useState(false);
  const [picks, setPicks] = useState<Record<string, string>>({});

  const search = () => {
    startTransition(async () => {
      const result = await searchAppUsers(query);
      setResults(result.users);
      setSearched(true);
    });
  };

  const promote = (user: FoundUser) => {
    const role = picks[user.id] ?? "Admin";

    startTransition(async () => {
      const result = await updateStaffRole(user.id, role);

      if (!result.success) {
        toast({ tone: "error", title: "Not updated", description: result.error });
        return;
      }

      toast({
        tone: "success",
        title: `${user.name ?? user.email} is now ${role}`,
      });

      setResults((current) => current.filter((entry) => entry.id !== user.id));
      router.refresh();
    });
  };

  return (
    <div>
      <p className="mb-3 text-[12px] leading-5 text-faint">
        Anyone who has signed up starts out as a regular customer. Search for
        their account by email or name, then give them a staff role.
      </p>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint"
          />

          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") search();
            }}
            placeholder="Search by email or name…"
            className="h-10 w-full rounded-lg border border-line bg-input pl-8 pr-3 text-[12px] text-ink outline-none placeholder:text-faint focus-visible:border-primary/60"
          />
        </div>

        <Button size="sm" onClick={search} loading={pending} disabled={query.trim().length < 2}>
          Search
        </Button>
      </div>

      {searched && (
        <div className="mt-3">
          {results.length === 0 ? (
            <p className="text-[12px] text-faint">
              No account found. They need to sign up first at{" "}
              <code className="text-ink">/sign-up</code> — then search again.
            </p>
          ) : (
            <ul className="space-y-2">
              {results.map((user) => (
                <li
                  key={user.id}
                  className="flex flex-wrap items-center gap-2 rounded-lg border border-line-subtle bg-surface p-2.5"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/12 text-[10px] font-bold text-primary">
                    {initials(user.name ?? user.email)}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="truncate text-[12.5px] font-medium text-ink">
                        {user.name ?? user.email.split("@")[0]}
                      </span>
                      <Badge tone={user.role === "Customer" ? "neutral" : "primary"}>
                        {user.role}
                      </Badge>
                    </span>
                    <span className="block truncate text-[11px] text-faint">
                      {user.email}
                    </span>
                  </span>

                  <Select
                    value={picks[user.id] ?? "Admin"}
                    onChange={(value) =>
                      setPicks((current) => ({ ...current, [user.id]: value }))
                    }
                    className="h-8 w-[110px] text-[11px]"
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </Select>

                  <Button size="sm" onClick={() => promote(user)} loading={pending}>
                    <UserPlus size={13} />
                    Make staff
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
