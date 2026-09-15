import CollectionsHero from "@/components/collections/CollectionsHero";
import CollectionsFeatured from "@/components/collections/CollectionsFeatured";
import CollectionsGrid from "@/components/collections/CollectionsGrid";
import CollectionStory from "@/components/collections/CollectionStory";
import CollectionsCTA from "@/components/collections/CollectionsCTA";

export default function CollectionsPage() {
  return (
    <main>
      <CollectionsHero />

      <CollectionsFeatured />

      <CollectionsGrid />

      <CollectionStory />

      <CollectionsCTA />
    </main>
  );
}