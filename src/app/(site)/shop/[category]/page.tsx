import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ShopCatalog from "@/components/shop/ShopCatalog";
import ShopCTA from "@/components/shop/ShopCTA";
import { Shell } from "@/components/ui/page";
import {
  buildFacets,
  getStorefrontCategories,
  getStorefrontProducts,
} from "@/data/storefront";

/* A category page is just the shop scoped to one category. */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const match = (await getStorefrontCategories()).find(
    (entry) => entry.slug === category,
  );

  return {
    title: match?.name ?? "Shop",
    description:
      match?.description ??
      "Browse the Soul's Glory Cloth catalogue by category.",
  };
}

export default async function ShopCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const [categories, products] = await Promise.all([
    getStorefrontCategories(),
    getStorefrontProducts({ categorySlug: category }),
  ]);

  const match = categories.find((entry) => entry.slug === category);

  const title = match?.name ?? category.replace(/-/g, " ");
  const facets = buildFacets(products);

  return (
    <>
      <section className="border-b border-line-subtle py-10 sm:py-14">
        <Shell>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-faint transition-colors hover:text-ink"
          >
            <ArrowLeft size={13} />
            All pieces
          </Link>

          <h1 className="mt-3 text-3xl font-bold capitalize tracking-tight text-ink sm:text-4xl">
            {title}
          </h1>

          <p className="mt-2 max-w-[62ch] text-[13px] leading-6 text-muted">
            {match?.description ??
              "Every piece here can be bought as-is or stitched to your own measurements."}
          </p>

          {/* Sister categories */}
          {categories.length > 1 && (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {categories.map((entry) => (
                <Link
                  key={entry.id}
                  href={`/shop/${entry.slug}`}
                  className={`rounded-full border px-3 py-1.5 text-[11px] transition-colors ${
                    entry.slug === category
                      ? "border-primary bg-primary/12 font-semibold text-primary"
                      : "border-line bg-surface text-muted hover:text-ink"
                  }`}
                >
                  {entry.name}
                  <span className="ml-1.5 opacity-60">
                    {entry.productCount}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </Shell>
      </section>

      <section className="py-10 sm:py-14">
        <Shell>
          <ShopCatalog
            products={products}
            facets={facets}
            title={`${title} pieces`}
          />
        </Shell>
      </section>

      <ShopCTA />
    </>
  );
}
