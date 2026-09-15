import AnnouncementBar from "@/components/layout/announcement-bar";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AmbientBackground from "@/components/ui/ambient-background";
import CartDrawer from "@/components/shop/CartDrawer";
import SupportChatWidget from "@/components/chat/SupportChatWidget";
import { getStorefrontCategories } from "@/data/storefront";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* The shop menu mirrors the live categories rather than a
     hard-coded list, so a new category appears in the nav. */
  const categories = await getStorefrontCategories().catch(() => []);

  return (
    <>
      <AmbientBackground />

      <div className="relative z-10 flex min-h-screen flex-col">
        <AnnouncementBar />

        <Header
          categories={categories.map((category) => ({
            name: category.name,
            slug: category.slug,
          }))}
        />

        <main className="flex-1">{children}</main>

        <Footer />
      </div>

      <CartDrawer />

      {/* Live chat with the atelier — floats above every page. */}
      <SupportChatWidget />
    </>
  );
}
