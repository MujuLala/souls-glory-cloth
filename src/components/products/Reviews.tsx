"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Star,
  MessageSquare,
  Clock3,
  CheckCircle2,
  XCircle,
  Trash2,
  Eye,
} from "lucide-react";

import Breadcrumbs from "./Breadcrumbs";
import { products, reviews } from "./data";

export default function Reviews() {
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((total, review) => total + review.rating, 0) /
        reviews.length
      : 0;

  const pendingReviews = reviews.filter(
    (review) => review.status === "Pending"
  ).length;

  const approvedReviews = reviews.filter(
    (review) => review.status === "Approved"
  ).length;

  const getProduct = (productId: number) =>
    products.find((product) => product.id === productId);

  return (
    <div className="min-h-screen w-full bg-[#050505] text-[#f7f7f7]">
      <main className="w-full pl-8 pr-8 md:w-[100%]">
        <div className="mx-auto w-full max-w-[92vw] px-0 py-5 sm:py-6">

          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              {
                label: "Products",
                href: "/products",
              },
              {
                label: "Reviews",
              },
            ]}
          />

          {/* Header */}
          <section className="mb-5 flex w-full flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-start gap-3">

              <Link
                href="/products"
                aria-label="Back to products"
                className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-neutral-500 transition hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white"
              >
                <ArrowLeft size={16} />
              </Link>

              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Reviews
                </h1>

                <p className="mt-2 text-xs text-neutral-500 sm:text-sm">
                  Manage customer reviews and product feedback.
                </p>
              </div>

            </div>
          </section>

          {/* Stats */}
          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <StatCard
              icon={<MessageSquare size={18} />}
              label="Total Reviews"
              value={reviews.length}
            />

            <StatCard
              icon={<Star size={18} />}
              label="Average Rating"
              value={averageRating.toFixed(1)}
            />

            <StatCard
              icon={<Clock3 size={18} />}
              label="Pending Reviews"
              value={pendingReviews}
            />

            <StatCard
              icon={<CheckCircle2 size={18} />}
              label="Approved Reviews"
              value={approvedReviews}
            />

          </div>

          {/* Main */}
          <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]">

            {/* Toolbar */}
            <div className="flex flex-col gap-3 border-b border-white/[0.07] p-4 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <h2 className="text-sm font-semibold">
                  Customer Reviews
                </h2>

                <p className="mt-1 text-xs text-neutral-600">
                  Review and moderate customer feedback.
                </p>
              </div>

              <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">

                <div className="relative w-full sm:w-[260px]">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600"
                  />

                  <input
                    type="text"
                    placeholder="Search reviews..."
                    className="h-10 w-full rounded-lg border border-white/10 bg-black/30 pl-9 pr-3 text-xs text-white outline-none transition placeholder:text-white/20 focus:border-[#ff1638]/50"
                  />
                </div>

                <select
                  className="h-10 rounded-lg border border-white/10 bg-black/30 px-3 text-xs text-neutral-400 outline-none focus:border-[#ff1638]/50"
                  defaultValue="all"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>

                <select
                  className="h-10 rounded-lg border border-white/10 bg-black/30 px-3 text-xs text-neutral-400 outline-none focus:border-[#ff1638]/50"
                  defaultValue="all"
                >
                  <option value="all">All Status</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                </select>

              </div>
            </div>

            {/* Reviews */}
            <div className="divide-y divide-white/[0.06]">

              {reviews.map((review) => {
                const product = getProduct(review.productId);

                return (
                  <div
                    key={review.id}
                    className="p-4 transition hover:bg-white/[0.015] sm:p-5"
                  >

                    {/* Top */}
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

                      <div className="flex gap-3">

                        {/* Avatar */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff1638]/10 text-sm font-bold text-[#ff1638]">
                          {review.customerName
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div className="min-w-0">

                          <div className="flex flex-wrap items-center gap-2">

                            <h3 className="text-sm font-semibold">
                              {review.customerName}
                            </h3>

                            <span
                              className={[
                                "rounded-full px-2 py-1 text-[9px] font-semibold",
                                review.status === "Approved"
                                  ? "bg-emerald-500/10 text-emerald-400"
                                  : review.status === "Pending"
                                    ? "bg-yellow-500/10 text-yellow-400"
                                    : "bg-red-500/10 text-red-400",
                              ].join(" ")}
                            >
                              {review.status}
                            </span>

                          </div>

                          <p className="mt-1 text-[11px] text-neutral-600">
                            {review.customerEmail}
                          </p>

                        </div>

                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1">

                        <button
                          type="button"
                          aria-label="View review"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-700 transition hover:bg-white/[0.05] hover:text-white"
                        >
                          <Eye size={14} />
                        </button>

                        {review.status === "Pending" && (
                          <>
                            <button
                              type="button"
                              aria-label="Approve review"
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-700 transition hover:bg-emerald-500/10 hover:text-emerald-400"
                            >
                              <CheckCircle2 size={14} />
                            </button>

                            <button
                              type="button"
                              aria-label="Reject review"
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-700 transition hover:bg-yellow-500/10 hover:text-yellow-400"
                            >
                              <XCircle size={14} />
                            </button>
                          </>
                        )}

                        <button
                          type="button"
                          aria-label="Delete review"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-700 transition hover:bg-[#ff1638]/10 hover:text-[#ff1638]"
                        >
                          <Trash2 size={14} />
                        </button>

                      </div>

                    </div>

                    {/* Review Content */}
                    <div className="mt-4 pl-0 sm:pl-[52px]">

                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            size={14}
                            className={
                              index < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-neutral-700"
                            }
                          />
                        ))}

                        <span className="ml-1 text-[11px] text-neutral-600">
                          {review.rating}.0
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="mt-3 text-sm font-medium">
                        {review.title}
                      </h4>

                      {/* Comment */}
                      <p className="mt-2 max-w-3xl text-xs leading-5 text-neutral-500">
                        {review.comment}
                      </p>

                      {/* Meta */}
                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-neutral-600">

                        <span>
                          Product:{" "}
                          <span className="text-neutral-400">
                            {product?.name ?? "Unknown Product"}
                          </span>
                        </span>

                        <span>
                          {formatDate(review.date)}
                        </span>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          </section>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ff1638]/10 text-[#ff1638]">
          {icon}
        </div>

        <div>
          <p className="text-[11px] text-neutral-600">
            {label}
          </p>

          <p className="mt-1 text-xl font-bold">
            {value}
          </p>
        </div>

      </div>
    </div>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}