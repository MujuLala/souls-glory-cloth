import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

          <div>
            <Link
              href="/"
              className="text-lg font-bold text-zinc-950"
            >
              Tailor
            </Link>

            <p className="mt-1 text-sm text-zinc-400">
              Smart Tailoring Management
            </p>
          </div>

          <div className="flex gap-6 text-sm text-zinc-500">

            <Link
              href="/privacy"
              className="hover:text-zinc-950"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="hover:text-zinc-950"
            >
              Terms
            </Link>

            <Link
              href="/contact"
              className="hover:text-zinc-950"
            >
              Contact
            </Link>

          </div>

        </div>

        <div className="mt-8 border-t border-zinc-200 pt-6">

          <p className="text-sm text-zinc-400">
            © 2026 Tailor. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}