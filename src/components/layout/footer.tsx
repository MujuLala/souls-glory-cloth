import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-transparent">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10">
        {/* Main Footer */}
        <div
          className="
            flex
            flex-col
            gap-7
            py-8
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              aria-label="Soul's Glory Cloth home"
              className="
                group
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-transparent
                text-[11px]
                font-bold
                tracking-[-0.04em]
                text-[var(--foreground)]
                transition-all
                duration-300
                hover:-rotate-3
              "
            >
              <span className="relative">
                SG

                <span
                  className="
                    absolute
                    -bottom-1
                    left-0
                    h-px
                    w-0
                    bg-[var(--foreground)]
                    transition-all
                    duration-300
                    group-hover:w-full
                  "
                />
              </span>
            </Link>

            <div>
              <Link
                href="/"
                className="
                  text-[15px]
                  font-semibold
                  tracking-[-0.035em]
                  text-[var(--foreground)]
                "
              >
                Soul&apos;s Glory Cloth
              </Link>

              <p className="mt-0.5 text-[10px] text-[var(--muted-foreground)]">
                Crafted for modern tailoring.
              </p>
            </div>
          </div>

          {/* Center Navigation */}
          <nav
            className="
              flex
              flex-wrap
              items-center
              gap-x-5
              gap-y-2
              text-[11px]
              text-[var(--muted-foreground)]
            "
          >
            <Link
              href="/shop"
              className="transition-colors hover:text-[var(--foreground)]"
            >
              Shop
            </Link>

            <span className="h-1 w-1 rounded-full bg-[var(--border)]/50" />

            <Link
              href="/custom-studio"
              className="transition-colors hover:text-[var(--foreground)]"
            >
              Custom Studio
            </Link>

            <span className="h-1 w-1 rounded-full bg-[var(--border)]/50" />

            <Link
              href="/collections"
              className="transition-colors hover:text-[var(--foreground)]"
            >
              Collections
            </Link>

            <span className="h-1 w-1 rounded-full bg-[var(--border)]/50" />

            <Link
              href="/support"
              className="transition-colors hover:text-[var(--foreground)]"
            >
              Support
            </Link>
          </nav>

          {/* Social */}
          <div className="flex items-center gap-1">
            <Link
              href="#"
              aria-label="Instagram"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-transparent
                text-[9px]
                font-semibold
                text-[var(--muted-foreground)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[var(--surface)]
                hover:text-[var(--foreground)]
              "
            >
              IG
            </Link>

            <Link
              href="#"
              aria-label="Facebook"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-transparent
                text-[11px]
                font-bold
                text-[var(--muted-foreground)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[var(--surface)]
                hover:text-[var(--foreground)]
              "
            >
              f
            </Link>

            <Link
              href="#"
              aria-label="LinkedIn"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-transparent
                text-[9px]
                font-bold
                text-[var(--muted-foreground)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[var(--surface)]
                hover:text-[var(--foreground)]
              "
            >
              in
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="
            flex
            flex-col
            gap-3
            py-4
            text-[9px]
            uppercase
            tracking-[0.12em]
            text-[var(--muted-foreground)]
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p>© {new Date().getFullYear()} Soul&apos;s Glory Cloth</p>

          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="transition-colors hover:text-[var(--foreground)]"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-[var(--foreground)]"
            >
              Terms
            </Link>

            <span className="hidden h-2.5 w-px bg-[var(--border)] sm:block" />

            <span>Made with precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
