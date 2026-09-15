import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Ruler, Shield, Star, Truck } from "lucide-react";

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
    return { title: "Piece not found" };
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
      where: { productId: product.id, status: "Approved" },
      orderBy: { createdAt: "desc" },
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

  return (
    <>
      <section className="py-6 sm:py-10">
        <Shell>
          <Link
            href={
              product.categorySlug ? `/shop/${product.categorySlug}` : "/shop"
            }
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-faint transition-colors hover:text-ink"
          >
            <ArrowLeft size={13} />
            {product.category ?? "Shop"}
          </Link>

          <div className="mt-5 grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* GALLERY */}
            <ProductGallery images={images} name={product.name} />

            {/* DETAILS */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                {product.badge && <Badge tone="primary">{product.badge}</Badge>}

                {product.collection && (
                  <Badge tone="neutral">{product.collection}</Badge>
                )}

                <Badge tone={product.inStock ? "success" : "danger"}>
                  {product.inStock
                    ? `${product.stock} in stock`
                    : "Made to order only"}
                </Badge>
              </div>

              <h1 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {product.name}
              </h1>

              {product.reviewCount > 0 && (
                <p className="mt-2 flex items-center gap-1.5 text-[12px] text-muted">
                  <span className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Star
                        key={value}
                        size={12}
                        className={
                          value <= Math.round(product.rating)
                            ? "text-warning"
                            : "text-faint opacity-40"
                        }
                        fill={
                          value <= Math.round(product.rating)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    ))}
                  </span>

                  {product.rating.toFixed(1)} · {product.reviewCount} review
                  {product.reviewCount === 1 ? "" : "s"}
                </p>
              )}

              {product.description && (
                <p className="mt-4 whitespace-pre-wrap text-[13px] leading-6 text-muted">
                  {product.description}
                </p>
              )}

              <div className="mt-6 border-t border-line-subtle pt-6">
                <ProductPurchase product={product} />
              </div>

              {/* ASSURANCES */}
              <ul className="mt-6 grid gap-3 border-t border-line-subtle pt-6 sm:grid-cols-3">
                {[
                  {
                    icon: <Ruler size={15} />,
                    title: "Your measurements",
                    body: "Saved to your profile for next time",
                  },
                  {
                    icon: <Truck size={15} />,
                    title: "Nationwide delivery",
                    body: "Free above Rs 15,000",
                  },
                  {
                    icon: <Shield size={15} />,
                    title: "Fit guarantee",
                    body: "One free alteration",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-2.5">
                    <span className="mt-0.5 shrink-0 text-primary">
                      {item.icon}
                    </span>

                    <span className="min-w-0">
                      <span className="block text-[12px] font-semibold text-ink">
                        {item.title}
                      </span>

                      <span className="mt-0.5 block text-[11px] leading-4 text-faint">
                        {item.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Shell>
      </section>

      {/* REVIEWS */}
      {reviews.length > 0 && (
        <section className="border-t border-line-subtle py-10">
          <Shell>
            <h2 className="text-lg font-semibold text-ink">
              What customers say
            </h2>

            <ul className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <li
                  key={review.id}
                  className="rounded-2xl border border-line bg-card p-4"
                >
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Star
                        key={value}
                        size={12}
                        className={
                          value <= review.rating
                            ? "text-warning"
                            : "text-faint opacity-40"
                        }
                        fill={value <= review.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>

                  <p className="mt-2 text-[13px] font-semibold text-ink">
                    {review.title}
                  </p>

                  <p className="mt-1.5 text-[12px] leading-5 text-muted">
                    {review.comment}
                  </p>

                  <p className="mt-2.5 text-[11px] text-faint">
                    {review.customerName} · {formatDate(review.createdAt)}
                  </p>
                </li>
              ))}
            </ul>
          </Shell>
        </section>
      )}

      {/* RELATED */}
      {related.filter((item) => item.id !== product.id).length > 0 && (
        <section className="border-t border-line-subtle py-10">
          <Shell>
            <h2 className="text-lg font-semibold text-ink">
              You might also like
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
              {related
                .filter((item) => item.id !== product.id)
                .slice(0, 4)
                .map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
            </div>
          </Shell>
        </section>
      )}
    </>
  );
}
