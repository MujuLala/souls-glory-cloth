
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Ruler,
  Shield,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";

import ProductCard from "@/components/shop/ProductCard";
import ProductPurchase from "@/components/shop/ProductPurchase";
import ProductGallery from "@/components/shop/ProductGallery";
import Badge from "@/components/ui/badge";
import { Shell } from "@/components/ui/page";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import {
  getStorefrontProduct,
  getStorefrontProducts,
} from "@/data/storefront";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getStorefrontProduct(slug);

  if (!product) {
    return {
      title: "Piece not found",
    };
  }

  return {
    title: product.name,
    description:
      product.description?.slice(0, 160) ??
      `${product.name} from Soul's Glory Cloth.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getStorefrontProduct(slug);

  if (!product) {
    notFound();
  }

  const [reviews, related] = await Promise.all([
    prisma.productReview.findMany({
      where: {
        productId: product.id,
        status: "Approved",
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),

    getStorefrontProducts({
      categorySlug: product.categorySlug ?? undefined,
      limit: 5,
    }),
  ]);

  const images = [product.image, product.hoverImage].filter(
    (url): url is string => Boolean(url),
  );

  const relatedProducts = related
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  const roundedRating = Math.round(product.rating);

  return (
    <>
      {/* =====================================================
          PRODUCT
      ====================================================== */}

      <section className="bg-transparent py-7 sm:py-12 lg:py-16">
        <Shell>
          {/* BACK LINK */}

          <Link
            href={
              product.categorySlug
                ? `/shop/${product.categorySlug}`
                : "/shop"
            }
            className="
              group
              inline-flex
              items-center
              gap-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-faint
              transition-all
              duration-300
              hover:text-ink
            "
          >
            <ArrowLeft
              size={13}
              className="
                transition-transform
                duration-300
                group-hover:-translate-x-1
              "
            />

            {product.category ?? "Shop"}
          </Link>

          {/* PRODUCT CONTENT */}

          <div
            className="
              mt-7
              grid
              gap-10
              lg:grid-cols-[1.08fr_0.92fr]
              lg:gap-16
              xl:gap-20
            "
          >
            {/* =================================================
                PRODUCT GALLERY
            ================================================== */}

            <div className="min-w-0">
              <ProductGallery
                images={images}
                name={product.name}
              />
            </div>

            {/* =================================================
                PRODUCT DETAILS
            ================================================== */}

            <div className="min-w-0 self-center bg-transparent">
              {/* BRAND INTRO */}

              <div className="mb-4 flex items-center gap-2">
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[var(--primary)]
                  "
                />

                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-faint
                  "
                >
                  Soul&apos;s Glory Cloth
                </span>
              </div>

              {/* BADGES */}

              <div className="flex flex-wrap items-center gap-2">
                {product.badge && (
                  <Badge tone="primary">
                    {product.badge}
                  </Badge>
                )}

                {product.collection && (
                  <Badge tone="neutral">
                    {product.collection}
                  </Badge>
                )}

                <Badge
                  tone={
                    product.inStock
                      ? "success"
                      : "danger"
                  }
                >
                  {product.inStock
                    ? `${product.stock} in stock`
                    : "Made to order only"}
                </Badge>
              </div>

              {/* PRODUCT TITLE */}

              <h1
                className="
                  mt-5
                  max-w-2xl
                  text-3xl
                  font-bold
                  leading-[1.08]
                  tracking-[-0.035em]
                  text-ink
                  sm:text-4xl
                  lg:text-[2.8rem]
                  xl:text-5xl
                "
              >
                {product.name}
              </h1>

              {/* RATING */}

              {product.reviewCount > 0 && (
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <div
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      border
                      border-line-subtle
                      px-3
                      py-1.5
                    "
                  >
                    <span className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <Star
                          key={value}
                          size={12}
                          className={
                            value <= roundedRating
                              ? "text-[var(--primary)]"
                              : "text-faint opacity-30"
                          }
                          fill={
                            value <= roundedRating
                              ? "currentColor"
                              : "none"
                          }
                        />
                      ))}
                    </span>

                    <span className="text-[11px] font-semibold text-ink">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>

                  <span className="text-[11px] text-faint">
                    {product.reviewCount} review
                    {product.reviewCount === 1 ? "" : "s"}
                  </span>
                </div>
              )}

              {/* DESCRIPTION */}

              {product.description && (
                <p
                  className="
                    mt-6
                    max-w-xl
                    whitespace-pre-wrap
                    text-[13px]
                    leading-7
                    text-muted
                    sm:text-[14px]
                  "
                >
                  {product.description}
                </p>
              )}

              {/* PURCHASE */}

              <div className="mt-8">
                <ProductPurchase product={product} />
              </div>

              {/* =================================================
                  ASSURANCE BOXES
              ================================================== */}

              <ul
                className="
                  mt-9
                  grid
                  gap-3
                  sm:grid-cols-3
                "
              >
                {[
                  {
                    icon: <Ruler size={16} />,
                    title: "Personal fit",
                    body: "Your measurements are saved for easy reorders.",
                  },
                  {
                    icon: <Truck size={16} />,
                    title: "Nationwide",
                    body: "Free delivery on orders above Rs 15,000.",
                  },
                  {
                    icon: <Shield size={16} />,
                    title: "Fit guarantee",
                    body: "One free alteration for the perfect fit.",
                  },
                ].map((item) => (
                  <li
                    key={item.title}
                    className="
                      hover-animate-stitching
                      group
                      relative
                      overflow-hidden
                      rounded-2xl
                      border
                      border-line-subtle
                      p-4
                      transition-all
                      duration-300
                      hover:-translate-y-1
                    "
                  >
                    <span
                      className="
                        mb-3
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-line-subtle
                        text-[var(--primary)]
                        transition-all
                        duration-300
                        group-hover:border-[var(--primary)]
                      "
                    >
                      {item.icon}
                    </span>

                    <span
                      className="
                        block
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-[0.08em]
                        text-ink
                      "
                    >
                      {item.title}
                    </span>

                    <span
                      className="
                        mt-1.5
                        block
                        text-[10px]
                        leading-5
                        text-faint
                      "
                    >
                      {item.body}
                    </span>
                  </li>
                ))}
              </ul>

              {/* TRUST LINE */}

              <div
                className="
                  mt-7
                  flex
                  items-center
                  gap-2
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.12em]
                  text-faint
                "
              >
                <Check
                  size={13}
                  className="text-[var(--primary)]"
                />

                Crafted with care by Soul&apos;s Glory Cloth
              </div>
            </div>
          </div>
        </Shell>
      </section>

      {/* =====================================================
          REVIEWS
      ====================================================== */}

      {reviews.length > 0 && (
        <section className="bg-transparent py-14 sm:py-20">
          <Shell>
            {/* REVIEW HEADER */}

            <div className="mb-9 flex flex-col gap-3 sm:mb-11">
              <div className="flex items-center gap-2">
                <Sparkles
                  size={13}
                  className="text-[var(--primary)]"
                />

                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-[var(--primary)]
                  "
                >
                  Customer feedback
                </span>
              </div>

              <h2
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                  text-ink
                  sm:text-3xl
                "
              >
                What customers say
              </h2>

              <p
                className="
                  max-w-xl
                  text-[13px]
                  leading-6
                  text-muted
                "
              >
                Real experiences from customers who chose
                Soul&apos;s Glory Cloth.
              </p>
            </div>

            {/* REVIEW CARDS */}

            <ul
              className="
                grid
                gap-4
                md:grid-cols-2
                lg:grid-cols-3
              "
            >
              {reviews.map((review) => (
                <li
                  key={review.id}
                  className="
                    hover-animate-stitching
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-line-subtle
                    bg-transparent
                    p-5
                    transition-all
                    duration-300
                    hover:-translate-y-1
                  "
                >
                  {/* STARS */}

                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Star
                        key={value}
                        size={11}
                        className={
                          value <= review.rating
                            ? "text-[var(--primary)]"
                            : "text-faint opacity-25"
                        }
                        fill={
                          value <= review.rating
                            ? "currentColor"
                            : "none"
                        }
                      />
                    ))}
                  </div>

                  {/* TITLE */}

                  {review.title && (
                    <h3
                      className="
                        mt-5
                        text-[13px]
                        font-semibold
                        text-ink
                      "
                    >
                      {review.title}
                    </h3>
                  )}

                  {/* COMMENT */}

                  {review.comment && (
                    <p
                      className="
                        mt-2
                        text-[12px]
                        leading-6
                        text-muted
                      "
                    >
                      {review.comment}
                    </p>
                  )}

                  {/* CUSTOMER */}

                  <div className="mt-5 flex items-center gap-2">
                    <span
                      className="
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-line-subtle
                        text-[10px]
                        font-semibold
                        text-[var(--primary)]
                      "
                    >
                      {review.customerName
                        ?.charAt(0)
                        .toUpperCase()}
                    </span>

                    <div>
                      <p
                        className="
                          text-[11px]
                          font-semibold
                          text-ink
                        "
                      >
                        {review.customerName}
                      </p>

                      <p className="mt-0.5 text-[9px] text-faint">
                        {formatDate(review.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* DECORATIVE QUOTE */}

                  <span
                    className="
                      pointer-events-none
                      absolute
                      bottom-1
                      right-4
                      font-serif
                      text-5xl
                      leading-none
                      text-[var(--primary)]
                      opacity-[0.07]
                    "
                  >
                    &quot;
                  </span>
                </li>
              ))}
            </ul>
          </Shell>
        </section>
      )}

      {/* =====================================================
          RELATED PRODUCTS
      ====================================================== */}

      {relatedProducts.length > 0 && (
        <section className="bg-transparent py-14 sm:py-20">
          <Shell>
            {/* RELATED HEADER */}

            <div
              className="
                mb-9
                flex
                items-end
                justify-between
                gap-6
                sm:mb-11
              "
            >
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-[var(--primary)]
                    "
                  />

                  <span
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.22em]
                      text-[var(--primary)]
                    "
                  >
                    Curated for you
                  </span>
                </div>

                <h2
                  className="
                    mt-2
                    text-2xl
                    font-bold
                    tracking-tight
                    text-ink
                    sm:text-3xl
                  "
                >
                  You might also like
                </h2>

                <p
                  className="
                    mt-2
                    max-w-xl
                    text-[13px]
                    leading-6
                    text-muted
                  "
                >
                  Discover more pieces selected to complement
                  your style.
                </p>
              </div>

              {/* DESKTOP VIEW ALL */}

              <Link
                href="/shop"
                className="
                  group
                  hidden
                  shrink-0
                  items-center
                  gap-2
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-ink
                  transition-colors
                  duration-300
                  hover:text-[var(--primary)]
                  sm:inline-flex
                "
              >
                View all

                <span
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  →
                </span>
              </Link>
            </div>

            {/* PRODUCT GRID */}

            <div
              className="
                grid
                grid-cols-2
                gap-x-4
                gap-y-9
                sm:gap-x-5
                lg:grid-cols-4
              "
            >
              {relatedProducts.map((item) => (
                <div
                  key={item.id}
                  className="
                    hover-animate-stitching
                    group
                    relative
                    rounded-2xl
                    transition-all
                    duration-300
                    hover:-translate-y-1
                  "
                >
                  <ProductCard product={item} />
                </div>
              ))}
            </div>

            {/* MOBILE VIEW ALL */}

            <Link
              href="/shop"
              className="
                group
                mt-9
                inline-flex
                items-center
                gap-2
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-ink
                transition-colors
                duration-300
                hover:text-[var(--primary)]
                sm:hidden
              "
            >
              View all products

              <span
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </Link>
          </Shell>
        </section>
      )}
    </>
  );
}
