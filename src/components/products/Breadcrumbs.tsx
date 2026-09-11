import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({
  items,
}: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-2 flex flex-wrap items-center text-[10px]"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={`${item.label}-${index}`}
            className="flex items-center"
          >
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-[#ff1638] transition hover:text-[#ff4260]"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={
                  isLast
                    ? "text-neutral-500"
                    : "text-[#ff1638]"
                }
              >
                {item.label}
              </span>
            )}

            {!isLast && (
              <span className="mx-2 text-neutral-800">
                /
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}