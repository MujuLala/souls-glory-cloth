import Hero from "@/components/home/hero";
import Collections, {
  type HomeCollectionItem,
} from "@/components/home/collections";
import ClientJourney from "@/components/home/client-journey";
import FeaturedProducts from "@/components/home/featured-products";
import DashboardPreview from "@/components/home/dashboard-preview";
import Testimonial from "@/components/home/testimnial";
import {
  getStorefrontCollections,
  getStorefrontProducts,
} from "@/data/storefront";

const fallbackImages = [
  "/images/collections/new-arrivals.jpg",
  "/images/collections/wedding.jpg",
  "/images/collections/premium.jpg",
];

export default async function Home() {
  const [featured, collections] = await Promise.all([
    getStorefrontProducts({ featured: true, limit: 8 }),
    getStorefrontCollections(),
  ]);

  /* The teaser grid always shows exactly three tiles — real
     collections first, padded with a link to the full shop
     if the store has fewer than three yet. */
  const collectionItems: HomeCollectionItem[] = collections
    .slice(0, 3)
    .map((collection, index) => ({
      title: collection.name,
      description:
        collection.description ??
        `${collection.productCount} piece${collection.productCount === 1 ? "" : "s"} in this edit.`,
      image: collection.image ?? fallbackImages[index] ?? fallbackImages[0],
      href: `/collections/${collection.slug}`,
      tag: index === 0 ? "Featured" : "Collection",
    }));

  while (collectionItems.length < 3) {
    collectionItems.push({
      title: "Shop everything",
      description: "Browse the full catalogue, ready-made and made to measure.",
      image: fallbackImages[collectionItems.length] ?? fallbackImages[0],
      href: "/shop",
      tag: "Shop",
    });
  }

  return (
    <>
      <Hero />
      <Collections collections={collectionItems} />
      <ClientJourney />
      <FeaturedProducts products={featured} />
      <DashboardPreview />
      <Testimonial />
    </>
  );
}
