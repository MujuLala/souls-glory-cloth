import "@/styles/home-v2.css";

import HomeV2 from "@/components/home-v2/HomeV2";
import type { TestimonialV2 } from "@/components/home-v2/TestimonialsV2";
import { getStorefrontProducts } from "@/data/storefront";
import { prisma } from "@/lib/prisma";

/* =========================================================
   HOME V2 — EXPERIMENTAL LANDING PAGE

   Lives outside every route group ((site) / (dashboard) /
   (auth)), so it only inherits the root layout — no shared
   Header/Footer/AmbientBackground is applied here. This is a
   design-review page only; the live homepage at "/" is
   untouched.
========================================================= */

export const metadata = {
  title: "Home V2 (Preview)",
  description:
    "Experimental homepage redesign — internal design review only.",
};

export default async function HomeV2Page() {
  const [featured, review] = await Promise.all([
    getStorefrontProducts({ featured: true, limit: 8 }),
    prisma.productReview.findFirst({
      where: { status: "Approved" },
      orderBy: { createdAt: "desc" },
      select: { customerName: true, comment: true, rating: true },
    }),
  ]);

  const products =
    featured.length > 0 ? featured : await getStorefrontProducts({ limit: 8 });

  const testimonial: TestimonialV2 | null = review
    ? {
        name: review.customerName,
        location: "Verified Customer",
        quote: review.comment,
        rating: review.rating,
      }
    : null;

  return <HomeV2 products={products} testimonial={testimonial} />;
}
