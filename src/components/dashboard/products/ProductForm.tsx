"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ImagePlus,
  Loader2,
  Package,
  Plus,
  Save,
  Star,
  Trash2,
  X,
} from "lucide-react";

import Button, { IconButton } from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { cn } from "@/components/ui/cn";
import {
  Checkbox,
  Field,
  Input,
  Select,
  Textarea,
} from "@/components/ui/field";
import { useToast } from "@/components/ui/toast";
import { slugify } from "@/lib/format";
import { createProduct, updateProduct } from "@/actions/products";
import type { ProductFormValues } from "@/data/products";

/* =========================================================
   TYPES
========================================================= */

type Option = { id: number; name: string; slug: string; status?: string };

type Variant = {
  key: string;
  name: string;
  sku: string;
  price: string;
  stock: string;
};

const statuses = ["Active", "Draft", "Archived"];

const badges = ["", "New", "Bestseller", "Limited", "Sale", "Handmade"];

const defaultSizes = ["XS", "S", "M", "L", "XL", "XXL", "Custom"];

const defaultColors = [
  "Black",
  "White",
  "Ivory",
  "Navy",
  "Maroon",
  "Beige",
  "Olive",
  "Grey",
];

/* =========================================================
   PRODUCT FORM
   Handles both "add" and "edit" — the only difference is
   whether an existing product was passed in.
========================================================= */

export default function ProductForm({
  product,
  categories,
  collections,
  tags,
}: {
  product?: ProductFormValues;
  categories: Option[];
  collections: Option[];
  tags: Option[];
}) {
  const router = useRouter();
  const { toast } = useToast();

  const isEdit = Boolean(product);

  /* BASICS */
  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(product?.slug));
  const [sku, setSku] = useState(product?.sku ?? "");
  const [description, setDescription] = useState(product?.description ?? "");

  /* PRICING */
  const [price, setPrice] = useState(String(product?.price ?? ""));
  const [salePrice, setSalePrice] = useState(
    product?.salePrice ? String(product.salePrice) : "",
  );
  const [costPrice, setCostPrice] = useState(
    product?.costPrice ? String(product.costPrice) : "",
  );
  const [compareAtPrice, setCompareAtPrice] = useState(
    product?.compareAtPrice ? String(product.compareAtPrice) : "",
  );

  /* INVENTORY */
  const [stock, setStock] = useState(String(product?.stock ?? 0));
  const [lowStockThreshold, setLowStockThreshold] = useState(
    String(product?.lowStockThreshold ?? 10),
  );
  const [trackInventory, setTrackInventory] = useState(
    product?.trackInventory ?? true,
  );

  /* ORGANISATION */
  const [categoryId, setCategoryId] = useState(
    product?.categoryId ? String(product.categoryId) : "",
  );
  const [collectionId, setCollectionId] = useState(
    product?.collectionId ? String(product.collectionId) : "",
  );
  const [subcategory, setSubcategory] = useState(product?.subcategory ?? "");
  const [tagIds, setTagIds] = useState<number[]>(product?.tagIds ?? []);
  const [status, setStatus] = useState(product?.status ?? "Draft");
  const [badge, setBadge] = useState(product?.badge ?? "");
  const [featured, setFeatured] = useState(product?.featured ?? false);

  /* MEDIA */
  const [images, setImages] = useState(product?.images ?? []);
  const [uploading, setUploading] = useState(false);

  /* OPTIONS */
  const [sizes, setSizes] = useState<string[]>(product?.sizes ?? []);
  const [colors, setColors] = useState<string[]>(product?.colors ?? []);

  /* VARIANTS */
  const [variants, setVariants] = useState<Variant[]>(
    (product?.variants ?? []).map((variant, index) => ({
      key: `v${index}`,
      name: variant.name,
      sku: variant.sku,
      price: String(variant.price),
      stock: String(variant.stock),
    })),
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* Auto-slug from the name until the user edits it. */
  useEffect(() => {
    if (!slugTouched) {
      setSlug(slugify(name));
    }
  }, [name, slugTouched]);

  /* =======================================================
     IMAGE UPLOAD
  ======================================================= */

  const uploadFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) {
      return;
    }

    setUploading(true);

    try {
      for (const file of Array.from(files)) {
        const body = new FormData();
        body.append("file", file);

        const response = await fetch("/api/upload", { method: "POST", body });
        const data = (await response.json()) as {
          success: boolean;
          url?: string;
          error?: string;
        };

        if (!data.success || !data.url) {
          toast({
            tone: "error",
            title: "Upload failed",
            description: data.error ?? "Try a smaller JPG, PNG or WEBP.",
          });
          continue;
        }

        setImages((current) => [
          ...current,
          { imageUrl: data.url as string, isHover: current.length === 1 },
        ]);
      }
    } finally {
      setUploading(false);
    }
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const toNumberOrNull = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) {
      return null;
    }

    const parsed = Number(trimmed);

    return Number.isFinite(parsed) ? parsed : null;
  };

  const submit = async (nextStatus?: string) => {
    setError(null);

    if (!name.trim()) {
      setError("Give the product a name.");
      return;
    }

    if (!sku.trim()) {
      setError("Every product needs a SKU.");
      return;
    }

    const priceValue = toNumberOrNull(price);

    if (priceValue === null || priceValue < 0) {
      setError("Enter a valid price.");
      return;
    }

    setSaving(true);

    const payload = {
      name: name.trim(),
      slug: slug.trim() || slugify(name),
      sku: sku.trim(),
      description: description.trim(),

      price: priceValue,
      salePrice: toNumberOrNull(salePrice),
      costPrice: toNumberOrNull(costPrice),
      compareAtPrice: toNumberOrNull(compareAtPrice),

      stock: Number(stock) || 0,
      lowStockThreshold: Number(lowStockThreshold) || 0,
      trackInventory,

      status: nextStatus ?? status,
      badge,
      featured,

      categoryId: categoryId ? Number(categoryId) : null,
      collectionId: collectionId ? Number(collectionId) : null,
      subcategory: subcategory.trim(),

      images,
      variants: variants
        .filter((variant) => variant.name.trim() && variant.sku.trim())
        .map((variant) => ({
          name: variant.name.trim(),
          sku: variant.sku.trim(),
          price: Number(variant.price) || priceValue,
          stock: Number(variant.stock) || 0,
        })),

      sizes,
      colors,
      tagIds,
    };

    const result = product
      ? await updateProduct(product.id, payload)
      : await createProduct(payload);

    setSaving(false);

    if (!result.success) {
      setError(result.error);
      toast({ tone: "error", title: "Not saved", description: result.error });
      return;
    }

    toast({
      tone: "success",
      title: isEdit ? "Product updated" : "Product created",
      description: `${payload.name} is now ${payload.status.toLowerCase()}.`,
    });

    router.push("/products");
    router.refresh();
  };

  const toggleIn = (
    list: string[],
    value: string,
    setter: (next: string[]) => void,
  ) => {
    setter(
      list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value],
    );
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
      {/* ===================================================
          MAIN COLUMN
      =================================================== */}

      <div className="space-y-4">
        {/* BASICS */}
        <Card>
          <CardHeader
            title="Product details"
            description="What the shopper sees first."
            icon={<Package size={16} />}
          />

          <CardBody className="space-y-4">
            <Field label="Product name" required htmlFor="name">
              <Input
                id="name"
                value={name}
                onChange={setName}
                placeholder="e.g. Ivory Silk Sherwani"
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="URL slug"
                htmlFor="slug"
                hint="Used in the storefront address."
              >
                <Input
                  id="slug"
                  value={slug}
                  onChange={(value) => {
                    setSlugTouched(true);
                    setSlug(value);
                  }}
                  placeholder="ivory-silk-sherwani"
                />
              </Field>

              <Field label="SKU" required htmlFor="sku">
                <Input
                  id="sku"
                  value={sku}
                  onChange={setSku}
                  placeholder="SGC-SHR-001"
                />
              </Field>
            </div>

            <Field
              label="Description"
              htmlFor="description"
              hint="Fabric, fit, care instructions — anything a customer would ask."
            >
              <Textarea
                id="description"
                value={description}
                onChange={setDescription}
                rows={5}
                placeholder="Hand-finished sherwani in pure silk, lined with cotton…"
              />
            </Field>
          </CardBody>
        </Card>

        {/* MEDIA */}
        <Card>
          <CardHeader
            title="Media"
            description="The first image is the main one; mark a second as the hover image."
            icon={<ImagePlus size={16} />}
          />

          <CardBody>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {images.map((image, index) => (
                <div
                  key={`${image.imageUrl}-${index}`}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-line bg-surface"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.imageUrl}
                    alt=""
                    className="size-full object-cover"
                  />

                  <div className="absolute inset-x-1 bottom-1 flex items-center justify-between gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        setImages((current) =>
                          current.map((item, itemIndex) => ({
                            ...item,
                            isHover: itemIndex === index && !item.isHover,
                          })),
                        )
                      }
                      className={cn(
                        "rounded-md px-1.5 py-1 text-[9px] font-bold backdrop-blur",
                        image.isHover
                          ? "bg-primary text-[var(--primary-contrast)]"
                          : "bg-black/55 text-white",
                      )}
                    >
                      {index === 0 ? "Main" : image.isHover ? "Hover" : "Set hover"}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setImages((current) =>
                          current.filter(
                            (_, itemIndex) => itemIndex !== index,
                          ),
                        )
                      }
                      aria-label="Remove image"
                      className="grid size-6 place-items-center rounded-md bg-black/55 text-white"
                    >
                      <X size={12} />
                    </button>
                  </div>
                </div>
              ))}

              <label
                className={cn(
                  "flex aspect-square cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-line-strong text-faint transition-colors hover:border-primary/50 hover:text-ink",
                  uploading && "pointer-events-none opacity-60",
                )}
              >
                {uploading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <ImagePlus size={18} />
                )}

                <span className="text-[10px] font-semibold">
                  {uploading ? "Uploading…" : "Add image"}
                </span>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  className="hidden"
                  onChange={(event) => void uploadFiles(event.target.files)}
                />
              </label>
            </div>
          </CardBody>
        </Card>

        {/* PRICING */}
        <Card>
          <CardHeader title="Pricing" description="All amounts in PKR." />

          <CardBody className="grid gap-4 sm:grid-cols-2">
            <Field label="Price" required htmlFor="price">
              <Input
                id="price"
                type="number"
                min={0}
                value={price}
                onChange={setPrice}
                placeholder="0"
              />
            </Field>

            <Field
              label="Sale price"
              htmlFor="salePrice"
              hint="Leave empty when the piece isn't on sale."
            >
              <Input
                id="salePrice"
                type="number"
                min={0}
                value={salePrice}
                onChange={setSalePrice}
                placeholder="0"
              />
            </Field>

            <Field
              label="Cost price"
              htmlFor="costPrice"
              hint="Internal only — drives your margin reports."
            >
              <Input
                id="costPrice"
                type="number"
                min={0}
                value={costPrice}
                onChange={setCostPrice}
                placeholder="0"
              />
            </Field>

            <Field
              label="Compare at"
              htmlFor="compareAtPrice"
              hint="Shown struck through beside the price."
            >
              <Input
                id="compareAtPrice"
                type="number"
                min={0}
                value={compareAtPrice}
                onChange={setCompareAtPrice}
                placeholder="0"
              />
            </Field>
          </CardBody>
        </Card>

        {/* OPTIONS */}
        <Card>
          <CardHeader
            title="Sizes & colours"
            description="Offered on the product page and in the POS."
          />

          <CardBody className="space-y-4">
            <div>
              <p className="mb-2 text-[11px] font-semibold text-muted">Sizes</p>

              <div className="flex flex-wrap gap-1.5">
                {defaultSizes.map((size) => (
                  <Chip
                    key={size}
                    label={size}
                    active={sizes.includes(size)}
                    onClick={() => toggleIn(sizes, size, setSizes)}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-[11px] font-semibold text-muted">
                Colours
              </p>

              <div className="flex flex-wrap gap-1.5">
                {defaultColors.map((color) => (
                  <Chip
                    key={color}
                    label={color}
                    active={colors.includes(color)}
                    onClick={() => toggleIn(colors, color, setColors)}
                  />
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* VARIANTS */}
        <Card>
          <CardHeader
            title="Variants"
            description="Only needed when a size or colour has its own price or stock."
            actions={
              <Button
                size="sm"
                variant="secondary"
                onClick={() =>
                  setVariants((current) => [
                    ...current,
                    {
                      key: `v${Date.now()}`,
                      name: "",
                      sku: "",
                      price: price || "",
                      stock: "0",
                    },
                  ])
                }
              >
                <Plus size={14} />
                Add variant
              </Button>
            }
          />

          <CardBody className="space-y-3">
            {variants.length === 0 && (
              <p className="text-xs text-faint">
                No variants — the product is sold as a single item.
              </p>
            )}

            {variants.map((variant, index) => (
              <div
                key={variant.key}
                className="grid gap-2 rounded-xl border border-line-subtle bg-surface p-3 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_90px_80px_auto]"
              >
                <Input
                  value={variant.name}
                  onChange={(value) =>
                    setVariants((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, name: value } : item,
                      ),
                    )
                  }
                  placeholder="Medium / Navy"
                />

                <Input
                  value={variant.sku}
                  onChange={(value) =>
                    setVariants((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, sku: value } : item,
                      ),
                    )
                  }
                  placeholder="SKU"
                />

                <Input
                  type="number"
                  min={0}
                  value={variant.price}
                  onChange={(value) =>
                    setVariants((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, price: value } : item,
                      ),
                    )
                  }
                  placeholder="Price"
                />

                <Input
                  type="number"
                  min={0}
                  value={variant.stock}
                  onChange={(value) =>
                    setVariants((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, stock: value } : item,
                      ),
                    )
                  }
                  placeholder="Qty"
                />

                <IconButton
                  label="Remove variant"
                  tone="danger"
                  onClick={() =>
                    setVariants((current) =>
                      current.filter((_, itemIndex) => itemIndex !== index),
                    )
                  }
                  className="justify-self-end"
                >
                  <Trash2 size={15} />
                </IconButton>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      {/* ===================================================
          SIDE COLUMN
      =================================================== */}

      <div className="space-y-4">
        <Card>
          <CardHeader title="Publishing" />

          <CardBody className="space-y-4">
            <Field label="Status" htmlFor="status">
              <Select id="status" value={status} onChange={setStatus}>
                {statuses.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Badge" htmlFor="badge">
              <Select id="badge" value={badge} onChange={setBadge}>
                {badges.map((option) => (
                  <option key={option || "none"} value={option}>
                    {option || "No badge"}
                  </option>
                ))}
              </Select>
            </Field>

            <Checkbox
              checked={featured}
              onChange={setFeatured}
              label="Feature on the homepage"
              description="Featured pieces lead the storefront carousel."
            />

            {error && (
              <p className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-[11px] text-danger">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-2">
              <Button
                fullWidth
                loading={saving}
                onClick={() => void submit()}
              >
                <Save size={15} />
                {isEdit ? "Save changes" : "Create product"}
              </Button>

              {!isEdit && (
                <Button
                  fullWidth
                  variant="secondary"
                  disabled={saving}
                  onClick={() => void submit("Draft")}
                >
                  Save as draft
                </Button>
              )}

              <Button
                fullWidth
                variant="ghost"
                disabled={saving}
                onClick={() => router.push("/products")}
              >
                Cancel
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Organisation" />

          <CardBody className="space-y-4">
            <Field label="Category" htmlFor="category">
              <Select
                id="category"
                value={categoryId}
                onChange={setCategoryId}
              >
                <option value="">No category</option>

                {categories.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Collection" htmlFor="collection">
              <Select
                id="collection"
                value={collectionId}
                onChange={setCollectionId}
              >
                <option value="">No collection</option>

                {collections.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Subcategory" htmlFor="subcategory">
              <Input
                id="subcategory"
                value={subcategory}
                onChange={setSubcategory}
                placeholder="e.g. Wedding"
              />
            </Field>

            <div>
              <p className="mb-2 text-[11px] font-semibold text-muted">Tags</p>

              {tags.length === 0 ? (
                <p className="text-[11px] text-faint">
                  No tags yet — create them under Products → Tags.
                </p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <Chip
                      key={tag.id}
                      label={tag.name}
                      active={tagIds.includes(tag.id)}
                      onClick={() =>
                        setTagIds((current) =>
                          current.includes(tag.id)
                            ? current.filter((item) => item !== tag.id)
                            : [...current, tag.id],
                        )
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Inventory" icon={<Star size={15} />} />

          <CardBody className="space-y-4">
            <Field label="Stock on hand" htmlFor="stock">
              <Input
                id="stock"
                type="number"
                min={0}
                value={stock}
                onChange={setStock}
              />
            </Field>

            <Field
              label="Low stock alert at"
              htmlFor="lowStock"
              hint="The product is flagged once stock drops to this number."
            >
              <Input
                id="lowStock"
                type="number"
                min={0}
                value={lowStockThreshold}
                onChange={setLowStockThreshold}
              />
            </Field>

            <Checkbox
              checked={trackInventory}
              onChange={setTrackInventory}
              label="Track inventory"
              description="Stock drops automatically on every sale."
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

/* =========================================================
   CHIP
========================================================= */

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors",
        active
          ? "border-primary bg-primary/12 text-primary"
          : "border-line bg-surface text-muted hover:text-ink",
      )}
    >
      {label}
    </button>
  );
}
