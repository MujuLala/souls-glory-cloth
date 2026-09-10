import StudioHero from "@/components/custom-studio/StudioHero";
import StudioIntro from "@/components/custom-studio/StudioIntro";
// import StudioPreview from "@/components/custom-studio/StudioPreview";
import StudioFeatures from "@/components/custom-studio/StudioFeatures";
// import StudioWorkflow from "@/components/custom-studio/StudioWorkflow";
// import DesignShowcase from "@/components/custom-studio/DesignShowcase";
// import StudioBenefits from "@/components/custom-studio/StudioBenefits";
// import StudioCTA from "@/components/custom-studio/StudioCTA";

export default function CustomStudioPage() {
  return (
    <main className="custom-studio-page">
      <StudioHero />
      <StudioIntro />
      <StudioFeatures />

      {/* <StudioIntro />

      <StudioPreview />

      <StudioFeatures />

      <StudioWorkflow />

      <DesignShowcase />

      <StudioBenefits />

      <StudioCTA /> */}
    </main>
  );
}