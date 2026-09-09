import Collections from "@/components/home/collections";
import Hero from "@/components/home/hero";
// import Categories from "@/components/home/categories";
 import ClientJourney from "@/components/home/client-journey";
import FeaturedProducts from "@/components/home/featured-products";
import DashboardPreview from "@/components/home/dashboard-preview";
// import CustomStudio from "@/components/home/custom-studio";
// import Reviews from "@/components/home/reviews";
// import FinalCTA from "@/components/home/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Collections />
      <ClientJourney />
      <FeaturedProducts />
      <DashboardPreview />

      {/* <ClientJourney />

      <FeaturedProducts />

      <DashboardPreview />

      <CustomStudio />

      <Reviews />

      <FinalCTA /> */} 
    </>
  );
}