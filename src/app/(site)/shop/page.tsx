import ShopHero from "@/components/shop/ShopHero";
import ShopCatalog from "@/components/shop/ShopCatalog";
import ShopCTA from "@/components/shop/ShopCTA";
import { Shell } from "@/components/ui/page";
import { buildFacets, getStorefrontProducts } from "@/data/storefront";

export const metadata = {
  title: "Shop",
  description:
    "Browse ready-to-wear pieces and made-to-measure designs from Soul's Glory Cloth.",
};

export default async function ShopPage() {
  const products = await getStorefrontProducts();
  const facets = buildFacets(products);

  return (
    <>
      <ShopHero />

      <section id="products" className="border-t border-line-subtle py-10 sm:py-14">
        <Shell>
          <ShopCatalog products={products} facets={facets} />
        </Shell>
      </section>

      <ShopCTA />
    </>
  );
}
