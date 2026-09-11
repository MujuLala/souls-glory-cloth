"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ImagePlus,
  Upload,
  X,
  Plus,
  Trash2,
  Save,
  Eye,
  Package,
  Tag,
  Layers3,
  DollarSign,
  Boxes,
} from "lucide-react";

import Breadcrumbs from "./Breadcrumbs";

type Variant = {
  id: number;
  name: string;
  sku: string;
  price: string;
  stock: string;
};

export default function AddProduct() {
  const [images, setImages] = useState<string[]>([]);

  const [variants, setVariants] = useState<Variant[]>([
    {
      id: 1,
      name: "",
      sku: "",
      price: "",
      stock: "",
    },
  ]);

  const [status, setStatus] = useState("Active");

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        sku: "",
        price: "",
        stock: "",
      },
    ]);
  };

  const removeVariant = (id: number) => {
    setVariants((prev) =>
      prev.filter((variant) => variant.id !== id)
    );
  };

  const updateVariant = (
    id: number,
    field: keyof Variant,
    value: string
  ) => {
    setVariants((prev) =>
      prev.map((variant) =>
        variant.id === id
          ? {
              ...variant,
              [field]: value,
            }
          : variant
      )
    );
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (!files) return;

    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] text-[#f7f7f7]">

      {/* EXACT SAME AS ProductDashboard */}
      <main className="w-full md:w-[100%] pl-8 pr-8">

        {/* EXACT SAME CONTAINER AS ProductDashboard */}
        <div className="mx-auto w-full max-w-[92vw] px-0 py-5 sm:py-6">

          {/* =========================================
              BREADCRUMBS
              EXACT SAME POSITION AS DASHBOARD
          ========================================== */}

          <Breadcrumbs
            items={[
              {
                label: "Products",
                href: "/products",
              },
              {
                label: "Add New Product",
              },
            ]}
          />

          {/* =========================================
              HEADER
          ========================================== */}

          <section className="mb-5 flex w-full flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            {/* Heading area */}
            <div className="flex items-start gap-3">

              {/* Back button - separate from breadcrumb */}
              <Link
                href="/products"
                aria-label="Back to products"
                className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-neutral-500 transition hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white"
              >
                <ArrowLeft size={16} />
              </Link>

              <div>
                {/* SAME HEADING SIZE AS DASHBOARD */}
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Add New Product
                </h1>

                {/* SAME DESCRIPTION SIZE AS DASHBOARD */}
                <p className="mt-2 text-xs text-neutral-500 sm:text-sm">
                  Create and manage a new product for your store.
                </p>
              </div>

            </div>

            {/* Actions */}
            <div className="flex w-full gap-2 sm:w-auto">

              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-xs font-bold text-neutral-300 transition hover:bg-white/[0.06] hover:text-white sm:flex-none"
              >
                <Eye size={17} />
                Preview
              </button>

              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#ff1638] px-4 py-3 text-xs font-bold text-white shadow-lg shadow-[#ff1638]/10 transition hover:bg-[#ff2948] sm:flex-none"
              >
                <Save size={17} />
                Save Product
              </button>

            </div>

          </section>

          {/* =========================================
              MAIN CONTENT
          ========================================== */}

          <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">

            {/* =======================================
                LEFT
            ======================================== */}

            <div className="min-w-0 space-y-4">

              {/* Basic Information */}
              <section className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 sm:p-6">

                <SectionHeader
                  icon={<Package size={19} />}
                  title="Basic Information"
                  description="Product name and general information"
                />

                <div className="space-y-5">

                  <InputField
                    label="Product Name"
                    placeholder="e.g. Premium Custom Suit"
                  />

                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/75">
                      Product Slug
                    </label>

                    <input
                      type="text"
                      placeholder="premium-custom-suit"
                      className="h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#ff1638]/50 focus:ring-1 focus:ring-[#ff1638]/20"
                    />

                    <p className="mt-2 text-xs text-neutral-600">
                      Used for the product URL.
                    </p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/75">
                      Description
                    </label>

                    <textarea
                      rows={6}
                      placeholder="Write a detailed description of your product..."
                      className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#ff1638]/50 focus:ring-1 focus:ring-[#ff1638]/20"
                    />
                  </div>

                </div>
              </section>

              {/* Product Images */}
              <section className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 sm:p-6">

                <SectionHeader
                  icon={<ImagePlus size={19} />}
                  title="Product Images"
                  description="Add product photos and thumbnails"
                />

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">

                  {images.map((image, index) => (
                    <div
                      key={image}
                      className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-black/30"
                    >
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="h-full w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-black/70 text-white transition hover:bg-[#ff1638]"
                      >
                        <X size={15} />
                      </button>

                      {index === 0 && (
                        <span className="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-1 text-[10px] font-medium">
                          Main image
                        </span>
                      )}
                    </div>
                  ))}

                  <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-black/20 text-white/35 transition hover:border-[#ff1638]/50 hover:bg-[#ff1638]/5 hover:text-white/70">

                    <Upload size={22} />

                    <span className="mt-2 text-xs font-medium">
                      Upload Image
                    </span>

                    <span className="mt-1 text-[10px] text-white/20">
                      PNG, JPG, WEBP
                    </span>

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />

                  </label>

                </div>
              </section>

              {/* Pricing */}
              <section className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 sm:p-6">

                <SectionHeader
                  icon={<DollarSign size={19} />}
                  title="Pricing"
                  description="Set your product pricing"
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <InputField
                    label="Regular Price"
                    placeholder="0.00"
                  />

                  <InputField
                    label="Sale Price"
                    placeholder="0.00"
                  />

                  <InputField
                    label="Cost Price"
                    placeholder="0.00"
                  />

                  <InputField
                    label="Compare at Price"
                    placeholder="0.00"
                  />

                </div>

              </section>

              {/* Variants */}
              <section className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 sm:p-6">

                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                  <SectionHeader
                    icon={<Layers3 size={19} />}
                    title="Product Variants"
                    description="Add sizes, colors or other options"
                    marginBottom={false}
                  />

                  <button
                    type="button"
                    onClick={addVariant}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-xs font-bold text-neutral-300 transition hover:bg-white/[0.06] hover:text-white sm:w-auto"
                  >
                    <Plus size={15} />
                    Add Variant
                  </button>

                </div>

                <div className="space-y-3">

                  {variants.map((variant, index) => (
                    <div
                      key={variant.id}
                      className="rounded-xl border border-white/[0.07] bg-black/20 p-3 sm:p-4"
                    >

                      <div className="mb-3 flex items-center justify-between">

                        <span className="text-xs font-medium text-neutral-500">
                          Variant {index + 1}
                        </span>

                        {variants.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              removeVariant(variant.id)
                            }
                            className="text-neutral-700 transition hover:text-[#ff1638]"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}

                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

                        <VariantInput
                          label="Name"
                          placeholder="e.g. Black / M"
                          value={variant.name}
                          onChange={(value) =>
                            updateVariant(
                              variant.id,
                              "name",
                              value
                            )
                          }
                        />

                        <VariantInput
                          label="SKU"
                          placeholder="SKU-001"
                          value={variant.sku}
                          onChange={(value) =>
                            updateVariant(
                              variant.id,
                              "sku",
                              value
                            )
                          }
                        />

                        <VariantInput
                          label="Price"
                          placeholder="0.00"
                          value={variant.price}
                          onChange={(value) =>
                            updateVariant(
                              variant.id,
                              "price",
                              value
                            )
                          }
                        />

                        <VariantInput
                          label="Stock"
                          placeholder="0"
                          value={variant.stock}
                          onChange={(value) =>
                            updateVariant(
                              variant.id,
                              "stock",
                              value
                            )
                          }
                        />

                      </div>
                    </div>
                  ))}

                </div>

              </section>

            </div>

            {/* =======================================
                RIGHT
            ======================================== */}

            <aside className="min-w-0 space-y-4">

              {/* Product Status */}
              <section className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 sm:p-5">

                <SectionHeader
                  icon={<Tag size={17} />}
                  title="Product Status"
                  description=""
                  small
                />

                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                  className="h-11 w-full rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white outline-none focus:border-[#ff1638]/50"
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Draft">
                    Draft
                  </option>

                  <option value="Archived">
                    Archived
                  </option>
                </select>

              </section>

              {/* Inventory */}
              <section className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 sm:p-5">

                <SectionHeader
                  icon={<Boxes size={17} />}
                  title="Inventory"
                  description=""
                  small
                />

                <div className="space-y-4">

                  <InputField
                    label="SKU"
                    placeholder="PROD-001"
                  />

                  <InputField
                    label="Stock Quantity"
                    placeholder="0"
                  />

                  <InputField
                    label="Low Stock Threshold"
                    placeholder="10"
                  />

                  <label className="flex cursor-pointer items-center gap-3">

                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-white/20 bg-black accent-[#ff1638]"
                    />

                    <span className="text-xs text-neutral-500">
                      Track inventory
                    </span>

                  </label>

                </div>

              </section>

              {/* Organization */}
              <section className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 sm:p-5">

                <SectionHeader
                  icon={<Layers3 size={17} />}
                  title="Organization"
                  description=""
                  small
                />

                <div className="space-y-4">

                  <SelectField
                    label="Category"
                    options={[
                      "Select category",
                      "Suits",
                      "Kurtas",
                      "Dresses",
                      "Shirts",
                      "Kids",
                    ]}
                  />

                  <SelectField
                    label="Collection"
                    options={[
                      "Select collection",
                      "New Arrivals",
                      "Premium Collection",
                      "Formal",
                      "Casual",
                    ]}
                  />

                  <InputField
                    label="Tags"
                    placeholder="suit, premium, formal"
                  />

                </div>

              </section>

              {/* Mobile Save */}
              <div className="sticky bottom-3 rounded-2xl border border-white/10 bg-[#0b0b0b]/95 p-3 backdrop-blur-xl xl:hidden">

                <button
                  type="button"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#ff1638] text-sm font-bold transition hover:bg-[#ff2948]"
                >
                  <Save size={17} />
                  Save Product
                </button>

              </div>

            </aside>

          </div>

        </div>

      </main>
    </div>
  );
}

/* =========================================
   SECTION HEADER
========================================= */

function SectionHeader({
  icon,
  title,
  description,
  marginBottom = true,
  small = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  marginBottom?: boolean;
  small?: boolean;
}) {
  return (
    <div
      className={[
        "flex items-center gap-3",
        marginBottom ? "mb-6" : "",
      ].join(" ")}
    >
      <div
        className={[
          "flex shrink-0 items-center justify-center rounded-xl bg-[#ff1638]/10 text-[#ff1638]",
          small
            ? "h-9 w-9 rounded-lg"
            : "h-10 w-10",
        ].join(" ")}
      >
        {icon}
      </div>

      <div>
        <h2
          className={
            small
              ? "text-sm font-bold"
              : "text-base font-semibold"
          }
        >
          {title}
        </h2>

        {description && (
          <p className="text-xs text-neutral-600">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

/* =========================================
   INPUT
========================================= */

function InputField({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white/75">
        {label}
      </label>

      <input
        type="text"
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#ff1638]/50 focus:ring-1 focus:ring-[#ff1638]/20"
      />
    </div>
  );
}

/* =========================================
   VARIANT INPUT
========================================= */

function VariantInput({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-medium text-neutral-600">
        {label}
      </label>

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="h-10 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-xs text-white outline-none transition placeholder:text-white/20 focus:border-[#ff1638]/50"
      />
    </div>
  );
}

/* =========================================
   SELECT
========================================= */

function SelectField({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-neutral-500">
        {label}
      </label>

      <select className="h-11 w-full rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white outline-none focus:border-[#ff1638]/50">
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}