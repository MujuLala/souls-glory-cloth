import CollectionsHero from "@/components/collections/CollectionsHero";
import CollectionsFeatured from "@/components/collections/CollectionsFeatured";
import CollectionsGrid from "@/components/collections/CollectionsGrid";
import CollectionStory from "@/components/collections/CollectionStory";
import CollectionsCTA from "@/components/collections/CollectionsCTA";
import {
  getStorefrontCategories,
  getStorefrontCollections,
} from "@/data/storefront";

export const metadata = {
  title: "Collections",
  description: "Browse Soul's Glory Cloth by category and curated collection.",
};

export default async function CollectionsPage() {
  const [categories, collections] = await Promise.all([
    getStorefrontCategories(),
    getStorefrontCollections(),
  ]);

  const gridItems = [
    ...categories.map((category, index) => ({
      title: category.name,
      description:
        category.description ?? `Everything filed under ${category.name}.`,
      href: `/shop/${category.slug}`,
      count: String(index + 1).padStart(2, "0"),
    })),
    ...collections.map((collection, index) => ({
      title: collection.name,
      description:
        collection.description ?? `A curated edit — ${collection.name}.`,
      href: `/collections/${collection.slug}`,
      count: String(categories.length + index + 1).padStart(2, "0"),
    })),
  ];

  const featuredItems = collections.slice(0, 2).map((collection, index) => ({
    eyebrow: index === 0 ? "Signature" : "Seasonal",
    title: collection.name,
    description:
      collection.description ??
      `${collection.productCount} piece${collection.productCount === 1 ? "" : "s"} in this edit.`,
    href: `/collections/${collection.slug}`,
    image: collection.image ?? collection.previewImages[0] ?? null,
  }));

  return (
    <main>
      <CollectionsHero />

      <CollectionsFeatured items={featuredItems} />

      <CollectionsGrid items={gridItems} />

      <CollectionStory />

      <CollectionsCTA />
    </main>
  );
}
