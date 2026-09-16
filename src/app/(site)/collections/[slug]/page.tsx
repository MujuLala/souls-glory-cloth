import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import ShopCatalog from "@/components/shop/ShopCatalog";
import ShopCTA from "@/components/shop/ShopCTA";
import { Shell } from "@/components/ui/page";
import {
  buildFacets,
  getStorefrontCollections,
  getStorefrontProducts,
} from "@/data/storefront";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const match = (await getStorefrontCollections()).find(
    (entry) => entry.slug === slug,
  );

  return {
    title: match?.name ?? "Collection",
    description:
      match?.description ??
      "Browse this collection from Soul's Glory Cloth.",
  };
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const collections = await getStorefrontCollections();
  const collection = collections.find((entry) => entry.slug === slug);

  if (!collection) {
    notFound();
  }

  const products = await getStorefrontProducts({ collectionSlug: slug });
  const facets = buildFacets(products);

  return (
    <>
      <section className="border-b border-line-subtle py-10 sm:py-14">
        <Shell>
          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-faint transition-colors hover:text-ink"
          >
            <ArrowLeft size={13} />
            All collections
          </Link>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {collection.name}
          </h1>

          {collection.description && (
            <p className="mt-2 max-w-[62ch] text-[13px] leading-6 text-muted">
              {collection.description}
            </p>
          )}
        </Shell>
      </section>

      <section className="py-10 sm:py-14">
        <Shell>
          {products.length === 0 ? (
            <p className="text-center text-[13px] text-faint">
              Nothing in this collection yet — check back soon.
            </p>
          ) : (
            <ShopCatalog
              products={products}
              facets={facets}
              title={`${collection.name} pieces`}
            />
          )}
        </Shell>
      </section>

      <ShopCTA />
    </>
  );
}
