import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        group
        flex
        items-center
        justify-between
        gap-3
        py-[0.45vw]
        text-[0.72vw]
        font-medium
        text-[var(--text-secondary)]
        transition-colors
        duration-200
        hover:text-[var(--text)]
        max-lg:text-[11px]
      "
    >
      <span>{children}</span>

      <ArrowUpRight
        size={13}
        strokeWidth={1.8}
        className="
          -translate-x-[0.2vw]
          opacity-0
          transition-all
          duration-200
          group-hover:translate-x-0
          group-hover:opacity-100
        "
      />
    </Link>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="
        hover-animate-stitching
        relative
        flex
        h-[2.8vw]
        w-[2.8vw]
        items-center
        justify-center
        overflow-hidden
        rounded-full
        bg-[var(--surface)]
        text-[var(--text-secondary)]
        transition-colors
        duration-200
        hover:text-[var(--text)]
        max-lg:h-10
        max-lg:w-10
      "
    >
      {children}
    </Link>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-[1vw] w-[1vw] max-lg:h-4 max-lg:w-4"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle
        cx="17.4"
        cy="6.7"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-[1vw] w-[1vw] max-lg:h-4 max-lg:w-4"
      aria-hidden="true"
    >
      <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V10H8v3h2.4v8h3.1Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-[1vw] w-[1vw] max-lg:h-4 max-lg:w-4"
      aria-hidden="true"
    >
      <path d="M5.2 3.5A2.2 2.2 0 1 1 5.2 8a2.2 2.2 0 0 1 0-4.5ZM3.4 9.7h3.6V21H3.4V9.7Zm5.8 0h3.4v1.55h.05c.47-.9 1.62-1.85 3.35-1.85 3.58 0 4.24 2.35 4.24 5.4V21h-3.55v-5.5c0-1.31-.02-3-1.83-3-1.84 0-2.12 1.43-2.12 2.9V21H9.2V9.7Z" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent">
      <div className="mx-auto w-full max-w-[92vw] px-[1vw]">

        {/* Main Footer */}
        <div
          className="
            relative
            grid
            grid-cols-[1.25fr_0.75fr_0.65fr]
            gap-[5vw]
            py-[4.5vw]
            max-lg:grid-cols-2
            max-lg:gap-10
            max-lg:py-14
            max-sm:grid-cols-1
            max-sm:gap-10
            max-sm:py-12
          "
        >

          {/* Brand */}
          <div className="max-w-[30vw] max-lg:max-w-[500px]">
            <Link
              href="/"
              className="
                group
                inline-flex
                items-center
                gap-[0.7vw]
                max-lg:gap-2.5
              "
            >
              <span
                className="
                  flex
                  h-[2.8vw]
                  w-[2.8vw]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-primary
                  text-[0.72vw]
                  font-bold
                  tracking-[-0.03em]
                  text-[var(--primary-contrast)]
                  max-lg:h-10
                  max-lg:w-10
                  max-lg:text-[10px]
                "
              >
                SG
              </span>

              <span
                className="
                  text-[1vw]
                  font-semibold
                  tracking-[-0.025em]
                  text-[var(--text)]
                  max-lg:text-base
                "
              >
                Soul's Glory Cloth
              </span>
            </Link>

            <p
              className="
                mt-[1.2vw]
                max-w-[27vw]
                text-[0.72vw]
                leading-[1.8]
                text-[var(--text-secondary)]
                max-lg:mt-4
                max-lg:max-w-[500px]
                max-lg:text-[12px]
                max-sm:text-[13px]
              "
            >
              A modern tailoring experience built around your measurements,
              your style and the way you want every piece to feel.
            </p>

            {/* Signature */}
            <div
              className="
                mt-[1.8vw]
                flex
                items-center
                gap-[0.6vw]
                max-lg:mt-5
                max-lg:gap-2
              "
            >
              <span className="h-px w-[2.5vw] bg-primary max-lg:w-8" />

              <span
                className="
                  text-[0.58vw]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-[var(--text-secondary)]
                  max-lg:text-[9px]
                "
              >
                Crafted around you
              </span>
            </div>
          </div>

          {/* Explore */}
          <div>
            <div
              className="
                mb-[1.1vw]
                flex
                items-center
                gap-[0.55vw]
                max-lg:mb-4
                max-lg:gap-2
              "
            >
              <span
                className="
                  flex
                  h-[1.45vw]
                  w-[1.45vw]
                  items-center
                  justify-center
                  rounded-full
                  bg-primary
                  text-[var(--primary-contrast)]
                  max-lg:h-6
                  max-lg:w-6
                "
              >
                <Sparkles
                  size={10}
                  strokeWidth={2}
                  className="max-lg:h-3 max-lg:w-3"
                />
              </span>

              <span
                className="
                  text-[0.58vw]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[var(--text-secondary)]
                  max-lg:text-[9px]
                "
              >
                Explore
              </span>
            </div>

            <nav className="flex flex-col">
              <FooterLink href="/shop">
                Shop
              </FooterLink>

              <FooterLink href="/custom-studio">
                Custom Studio
              </FooterLink>

              <FooterLink href="/collections">
                Collections
              </FooterLink>

              <FooterLink href="/support">
                Support
              </FooterLink>
            </nav>
          </div>

          {/* Connect */}
          <div>
            <div
              className="
                mb-[1.1vw]
                flex
                items-center
                gap-[0.55vw]
                max-lg:mb-4
                max-lg:gap-2
              "
            >
              <span
                className="
                  text-[0.58vw]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[var(--text-secondary)]
                  max-lg:text-[9px]
                "
              >
                Connect
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-[0.55vw] max-lg:gap-2">

              <SocialLink
                href="https://www.instagram.com/"
                label="Instagram"
              >
                <InstagramIcon />
              </SocialLink>

              <SocialLink
                href="https://www.facebook.com/"
                label="Facebook"
              >
                <FacebookIcon />
              </SocialLink>

              <SocialLink
                href="https://www.linkedin.com/"
                label="LinkedIn"
              >
                <LinkedinIcon />
              </SocialLink>

            </div>

            {/* Support CTA */}
            <Link
              href="/support"
              className="
                hover-animate-stitching
                mt-[1.5vw]
                flex
                items-center
                justify-between
                gap-4
                rounded-xl
                bg-[var(--surface)]
                px-[1vw]
                py-[0.9vw]
                text-[var(--text)]
                transition-colors
                duration-200
                max-lg:mt-5
                max-lg:px-4
                max-lg:py-3
              "
            >
              <div>
                <span
                  className="
                    block
                    text-[0.68vw]
                    font-semibold
                    max-lg:text-[11px]
                  "
                >
                  Need help?
                </span>

                <span
                  className="
                    mt-[0.15vw]
                    block
                    text-[0.55vw]
                    text-[var(--text-secondary)]
                    max-lg:mt-1
                    max-lg:text-[9px]
                  "
                >
                  We're here for you.
                </span>
              </div>

              <ArrowUpRight
                size={16}
                strokeWidth={1.8}
                className="shrink-0"
              />
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="
            flex
            items-center
            justify-between
            gap-5
            py-[1.2vw]
            max-lg:flex-col
            max-lg:items-start
            max-lg:py-5
            max-sm:gap-3
          "
        >
          <p
            className="
              text-[0.55vw]
              text-[var(--text-secondary)]
              max-lg:text-[9px]
              max-sm:text-[10px]
            "
          >
            © {currentYear} Soul's Glory Cloth. All rights reserved.
          </p>

          <div
            className="
              flex
              items-center
              gap-[1.2vw]
              max-lg:gap-5
            "
          >
            <Link
              href="/privacy"
              className="
                text-[0.55vw]
                text-[var(--text-secondary)]
                transition-colors
                duration-200
                hover:text-[var(--text)]
                max-lg:text-[9px]
                max-sm:text-[10px]
              "
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="
                text-[0.55vw]
                text-[var(--text-secondary)]
                transition-colors
                duration-200
                hover:text-[var(--text)]
                max-lg:text-[9px]
                max-sm:text-[10px]
              "
            >
              Terms
            </Link>

            <span
              className="
                text-[0.55vw]
                text-[var(--text-secondary)]
                max-lg:text-[9px]
                max-sm:text-[10px]
              "
            >
              Made with precision
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}