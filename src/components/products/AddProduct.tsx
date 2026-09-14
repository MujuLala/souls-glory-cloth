"use client";

import { useEffect, useState } from "react";
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
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import Breadcrumbs from "./Breadcrumbs";
import { createProduct } from "@/actions/products";

type Variant = {
  id: number;
  name: string;
  sku: string;
  price: string;
  stock: string;
};

type ProductImage = {
  url: string;
  name: string;
};

const inputClass =
  "h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#ff1638]/50 focus:ring-1 focus:ring-[#ff1638]/20";

const selectClass =
  "h-11 w-full rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white outline-none focus:border-[#ff1638]/50";

export default function AddProduct() {
  /* =========================================
     BASIC PRODUCT DATA
  ========================================== */

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  /* =========================================
     PRICING
  ========================================== */

  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [compareAtPrice, setCompareAtPrice] = useState("");

  /* =========================================
     INVENTORY
  ========================================== */

  const [sku, setSku] = useState("");
  const [stock, setStock] = useState("0");
  const [lowStockThreshold, setLowStockThreshold] = useState("10");
  const [trackInventory, setTrackInventory] = useState(true);

  /* =========================================
     ORGANIZATION
  ========================================== */

  const [categoryId, setCategoryId] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  /* =========================================
     STATUS
  ========================================== */

  const [status, setStatus] = useState("Active");

  /* =========================================
     IMAGES
  ========================================== */

  const [images, setImages] = useState<ProductImage[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  /* =========================================
     VARIANTS
  ========================================== */

  const [variants, setVariants] = useState<Variant[]>([
    {
      id: 1,
      name: "",
      sku: "",
      price: "",
      stock: "",
    },
  ]);

  /* =========================================
     SAVE STATE
  ========================================== */

  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  /* =========================================
     AUTO SLUG
  ========================================== */

  useEffect(() => {
    if (!name.trim()) {
      setSlug("");
      return;
    }

    const generatedSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setSlug(generatedSlug);
  }, [name]);

  /* =========================================
     VARIANTS
  ========================================== */

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

  /* =========================================
     IMAGE UPLOAD
  ========================================== */

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");
    setUploadingImages(true);

    try {
      const uploadedImages: ProductImage[] = [];

      for (const file of Array.from(files)) {
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
          throw new Error(
            `${file.name}: Only JPG, PNG and WEBP images are allowed.`
          );
        }

        if (file.size > 10 * 1024 * 1024) {
          throw new Error(
            `${file.name}: Image must be smaller than 10MB.`
          );
        }

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok || !data.success || !data.url) {
          throw new Error(
            data.error || `Failed to upload ${file.name}`
          );
        }

        uploadedImages.push({
          url: data.url,
          name: file.name,
        });
      }

      setImages((prev) => [...prev, ...uploadedImages]);
    } catch (error) {
      console.error("Image upload error:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to upload image."
      );
    } finally {
      setUploadingImages(false);

      // Allow selecting the same file again.
      event.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) =>
      prev.filter((_, imageIndex) => imageIndex !== index)
    );
  };

  /* =========================================
     SAVE PRODUCT
  ========================================== */

  const handleSaveProduct = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    /* -----------------------------------------
       VALIDATION
    ------------------------------------------ */

    if (!name.trim()) {
      setErrorMessage("Product name is required.");
      return;
    }

    if (!slug.trim()) {
      setErrorMessage("Product slug is required.");
      return;
    }

    if (!sku.trim()) {
      setErrorMessage("Product SKU is required.");
      return;
    }

    if (!price.trim()) {
      setErrorMessage("Regular price is required.");
      return;
    }

    const parsedPrice = Number(price);

    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      setErrorMessage("Please enter a valid regular price.");
      return;
    }

    const parsedSalePrice =
      salePrice.trim() === ""
        ? undefined
        : Number(salePrice);

    const parsedCostPrice =
      costPrice.trim() === ""
        ? undefined
        : Number(costPrice);

    const parsedCompareAtPrice =
      compareAtPrice.trim() === ""
        ? undefined
        : Number(compareAtPrice);

    const parsedStock = Number(stock || 0);
    const parsedLowStockThreshold = Number(
      lowStockThreshold || 10
    );

    if (!Number.isFinite(parsedStock) || parsedStock < 0) {
      setErrorMessage("Please enter a valid stock quantity.");
      return;
    }

    if (
      !Number.isFinite(parsedLowStockThreshold) ||
      parsedLowStockThreshold < 0
    ) {
      setErrorMessage("Please enter a valid low stock threshold.");
      return;
    }

    if (
      parsedSalePrice !== undefined &&
      (!Number.isFinite(parsedSalePrice) || parsedSalePrice < 0)
    ) {
      setErrorMessage("Please enter a valid sale price.");
      return;
    }

    if (
      parsedCostPrice !== undefined &&
      (!Number.isFinite(parsedCostPrice) || parsedCostPrice < 0)
    ) {
      setErrorMessage("Please enter a valid cost price.");
      return;
    }

    if (
      parsedCompareAtPrice !== undefined &&
      (!Number.isFinite(parsedCompareAtPrice) ||
        parsedCompareAtPrice < 0)
    ) {
      setErrorMessage("Please enter a valid compare at price.");
      return;
    }

    if (uploadingImages) {
      setErrorMessage(
        "Please wait until image uploads are finished."
      );
      return;
    }

    /* -----------------------------------------
       VARIANTS
    ------------------------------------------ */

    const validVariants = variants
      .filter(
        (variant) =>
          variant.name.trim() ||
          variant.sku.trim() ||
          variant.price.trim() ||
          variant.stock.trim()
      )
      .map((variant) => ({
        name: variant.name.trim(),
        sku: variant.sku.trim(),
        price: Number(variant.price || price),
        stock: Number(variant.stock || 0),
      }));

    for (const variant of validVariants) {
      if (!variant.name) {
        setErrorMessage("Every variant needs a name.");
        return;
      }

      if (!variant.sku) {
        setErrorMessage(
          `Variant "${variant.name}" needs a SKU.`
        );
        return;
      }

      if (!Number.isFinite(variant.price) || variant.price < 0) {
        setErrorMessage(
          `Variant "${variant.name}" has an invalid price.`
        );
        return;
      }

      if (!Number.isFinite(variant.stock) || variant.stock < 0) {
        setErrorMessage(
          `Variant "${variant.name}" has an invalid stock quantity.`
        );
        return;
      }
    }

    /* -----------------------------------------
       TAGS

       Currently the Tags field accepts comma-separated
       names. Until the Tags management API is connected,
       we don't send tag IDs to Prisma.
    ------------------------------------------ */

    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    console.log("Product tags:", tags);

    /* -----------------------------------------
       SAVE
    ------------------------------------------ */

    setSaving(true);

    try {
      const result = await createProduct({
        name: name.trim(),
        slug: slug.trim(),
        sku: sku.trim(),
        description: description.trim() || undefined,

        price: parsedPrice,
        salePrice: parsedSalePrice,
        costPrice: parsedCostPrice,
        compareAtPrice: parsedCompareAtPrice,

        stock: parsedStock,
        lowStockThreshold: parsedLowStockThreshold,
        trackInventory,

        status,

        categoryId: categoryId
          ? Number(categoryId)
          : undefined,

        collectionId: collectionId
          ? Number(collectionId)
          : undefined,

        images: images.map((image) => ({
          imageUrl: image.url,
        })),

        variants: validVariants,

        sizes: [],
        colors: [],

        tagIds: [],
      });

      if (!result.success) {
        throw new Error(
          result.error || "Failed to create product."
        );
      }

      setSuccessMessage(
        "Product created successfully."
      );

      /* -----------------------------------------
         RESET FORM
      ------------------------------------------ */

      setName("");
      setSlug("");
      setDescription("");

      setPrice("");
      setSalePrice("");
      setCostPrice("");
      setCompareAtPrice("");

      setSku("");
      setStock("0");
      setLowStockThreshold("10");
      setTrackInventory(true);

      setCategoryId("");
      setCollectionId("");
      setTagsInput("");

      setStatus("Active");

      setImages([]);

      setVariants([
        {
          id: Date.now(),
          name: "",
          sku: "",
          price: "",
          stock: "",
        },
      ]);
    } catch (error) {
      console.error("Save product error:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to create product."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================
     PREVIEW
  ========================================== */

  const handlePreview = () => {
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage(
        "Enter a product name before previewing."
      );
      return;
    }

    window.open(
      `/shop/product/${slug}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-[#f7f7f7]">
      <main className="w-full pl-8 pr-8 md:w-[100%]">
        <div className="mx-auto w-full max-w-[92vw] px-0 py-5 sm:py-6">

          {/* =========================================
              BREADCRUMBS
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
                  Add New Product
                </h1>

                <p className="mt-2 text-xs text-neutral-500 sm:text-sm">
                  Create and manage a new product for your store.
                </p>
              </div>
            </div>

            <div className="flex w-full gap-2 sm:w-auto">
              <button
                type="button"
                onClick={handlePreview}
                disabled={saving}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-xs font-bold text-neutral-300 transition hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
              >
                <Eye size={17} />
                Preview
              </button>

              <button
                type="button"
                onClick={handleSaveProduct}
                disabled={saving || uploadingImages}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#ff1638] px-4 py-3 text-xs font-bold text-white shadow-lg shadow-[#ff1638]/10 transition hover:bg-[#ff2948] disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
              >
                {saving ? (
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                ) : (
                  <Save size={17} />
                )}

                {saving ? "Saving..." : "Save Product"}
              </button>
            </div>
          </section>

          {/* =========================================
              STATUS MESSAGES
          ========================================== */}

          {successMessage && (
            <div className="mb-4 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
              <CheckCircle2 size={18} />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              <AlertCircle size={18} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* =========================================
              MAIN CONTENT
          ========================================== */}

          <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">

            {/* =======================================
                LEFT
            ======================================== */}

            <div className="min-w-0 space-y-4">

              {/* BASIC INFORMATION */}

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
                    value={name}
                    onChange={setName}
                  />

                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/75">
                      Product Slug
                    </label>

                    <input
                      type="text"
                      value={slug}
                      onChange={(e) =>
                        setSlug(e.target.value)
                      }
                      placeholder="premium-custom-suit"
                      className={inputClass}
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
                      value={description}
                      onChange={(e) =>
                        setDescription(e.target.value)
                      }
                      placeholder="Write a detailed description of your product..."
                      className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#ff1638]/50 focus:ring-1 focus:ring-[#ff1638]/20"
                    />
                  </div>

                </div>
              </section>

              {/* PRODUCT IMAGES */}

              <section className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 sm:p-6">
                <SectionHeader
                  icon={<ImagePlus size={19} />}
                  title="Product Images"
                  description="Add product photos and thumbnails"
                />

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">

                  {images.map((image, index) => (
                    <div
                      key={`${image.url}-${index}`}
                      className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-black/30"
                    >
                      <img
                        src={image.url}
                        alt={`Product ${index + 1}`}
                        className="h-full w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeImage(index)
                        }
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

                    {uploadingImages ? (
                      <Loader2
                        size={22}
                        className="animate-spin text-[#ff1638]"
                      />
                    ) : (
                      <Upload size={22} />
                    )}

                    <span className="mt-2 text-xs font-medium">
                      {uploadingImages
                        ? "Uploading..."
                        : "Upload Image"}
                    </span>

                    <span className="mt-1 text-[10px] text-white/20">
                      PNG, JPG, WEBP
                    </span>

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      multiple
                      disabled={uploadingImages}
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>

                </div>
              </section>

              {/* PRICING */}

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
                    type="number"
                    value={price}
                    onChange={setPrice}
                  />

                  <InputField
                    label="Sale Price"
                    placeholder="0.00"
                    type="number"
                    value={salePrice}
                    onChange={setSalePrice}
                  />

                  <InputField
                    label="Cost Price"
                    placeholder="0.00"
                    type="number"
                    value={costPrice}
                    onChange={setCostPrice}
                  />

                  <InputField
                    label="Compare at Price"
                    placeholder="0.00"
                    type="number"
                    value={compareAtPrice}
                    onChange={setCompareAtPrice}
                  />

                </div>
              </section>

              {/* VARIANTS */}

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

              {/* PRODUCT STATUS */}

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
                  className={selectClass}
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

              {/* INVENTORY */}

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
                    value={sku}
                    onChange={setSku}
                  />

                  <InputField
                    label="Stock Quantity"
                    placeholder="0"
                    type="number"
                    value={stock}
                    onChange={setStock}
                  />

                  <InputField
                    label="Low Stock Threshold"
                    placeholder="10"
                    type="number"
                    value={lowStockThreshold}
                    onChange={setLowStockThreshold}
                  />

                  <label className="flex cursor-pointer items-center gap-3">

                    <input
                      type="checkbox"
                      checked={trackInventory}
                      onChange={(e) =>
                        setTrackInventory(
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 rounded border-white/20 bg-black accent-[#ff1638]"
                    />

                    <span className="text-xs text-neutral-500">
                      Track inventory
                    </span>

                  </label>

                </div>

              </section>

              {/* ORGANIZATION */}

              <section className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 sm:p-5">

                <SectionHeader
                  icon={<Layers3 size={17} />}
                  title="Organization"
                  description=""
                  small
                />

                <div className="space-y-4">

                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/75">
                      Category
                    </label>

                    <select
                      value={categoryId}
                      onChange={(e) =>
                        setCategoryId(e.target.value)
                      }
                      className={selectClass}
                    >
                      <option value="">
                        Select category
                      </option>

                      {/* Temporary IDs.
                          Replace with dynamic categories API
                          once Category management is connected. */}
                      <option value="1">
                        Suits
                      </option>

                      <option value="2">
                        Kurtas
                      </option>

                      <option value="3">
                        Dresses
                      </option>

                      <option value="4">
                        Shirts
                      </option>

                      <option value="5">
                        Kids
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/75">
                      Collection
                    </label>

                    <select
                      value={collectionId}
                      onChange={(e) =>
                        setCollectionId(e.target.value)
                      }
                      className={selectClass}
                    >
                      <option value="">
                        Select collection
                      </option>

                      <option value="1">
                        New Arrivals
                      </option>

                      <option value="2">
                        Premium Collection
                      </option>

                      <option value="3">
                        Formal
                      </option>

                      <option value="4">
                        Casual
                      </option>
                    </select>
                  </div>

                  <InputField
                    label="Tags"
                    placeholder="suit, premium, formal"
                    value={tagsInput}
                    onChange={setTagsInput}
                  />

                  <p className="text-[10px] text-neutral-600">
                    Separate tags with commas.
                  </p>

                </div>

              </section>

              {/* MOBILE SAVE */}

              <div className="sticky bottom-3 rounded-2xl border border-white/10 bg-[#0b0b0b]/95 p-3 backdrop-blur-xl xl:hidden">

                <button
                  type="button"
                  onClick={handleSaveProduct}
                  disabled={saving || uploadingImages}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#ff1638] text-sm font-bold transition hover:bg-[#ff2948] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                  ) : (
                    <Save size={17} />
                  )}

                  {saving
                    ? "Saving..."
                    : "Save Product"}
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
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number";
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white/75">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        min={type === "number" ? "0" : undefined}
        step={type === "number" ? "0.01" : undefined}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className={inputClass}
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
        type={
          label === "Price" || label === "Stock"
            ? "number"
            : "text"
        }
        value={value}
        placeholder={placeholder}
        min={
          label === "Price" || label === "Stock"
            ? "0"
            : undefined
        }
        step={
          label === "Price"
            ? "0.01"
            : undefined
        }
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="h-10 w-full rounded-lg border border-white/[0.08] bg-black/30 px-3 text-xs text-white outline-none placeholder:text-white/15 focus:border-[#ff1638]/40"
      />
    </div>
  );
}