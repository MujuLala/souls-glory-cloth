"use client";

import SupportChatWidget from "@/components/chat/SupportChatWidget";
import type { StorefrontProduct } from "@/types/catalog";

import HeaderV2 from "./HeaderV2";
import HeroV2 from "./HeroV2";
import FeatureStripV2 from "./FeatureStripV2";
import GlobalReachV2 from "./GlobalReachV2";
import ProcessV2 from "./ProcessV2";
import MeasurementsV2 from "./MeasurementsV2";
import StylistChatV2 from "./StylistChatV2";
import MilestonePaymentsV2 from "./MilestonePaymentsV2";
import PopularStylesV2 from "./PopularStylesV2";
import TestimonialsV2, { type TestimonialV2 } from "./TestimonialsV2";
import FinalCtaV2 from "./FinalCtaV2";
import FooterV2 from "./FooterV2";

/* =========================================================
   HOME V2

   The experimental landing page — composes every section in
   isolation from the rest of the app. Only the real chat
   widget, product data and internal routes are shared; the
   header, footer and every section here are V2-only and do
   not affect the live homepage.
========================================================= */

export default function HomeV2({
  products,
  testimonial,
}: {
  products: StorefrontProduct[];
  testimonial: TestimonialV2 | null;
}) {
  return (
    <div className="home-v2 min-h-screen">
      <HeaderV2 />

      <main>
        <HeroV2 />
        <FeatureStripV2 />
        <GlobalReachV2 />
        <ProcessV2 />
        <MeasurementsV2 />
        <StylistChatV2 />
        <MilestonePaymentsV2 />
        <PopularStylesV2 products={products} />
        <TestimonialsV2 testimonial={testimonial} />
        <FinalCtaV2 />
      </main>

      <FooterV2 />

      {/* The real storefront chat — "Start Chatting" dispatches
          the same event this widget listens for. */}
      <SupportChatWidget />
    </div>
  );
}
