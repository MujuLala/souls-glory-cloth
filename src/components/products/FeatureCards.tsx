import { Check, FileText, Package, Settings2 } from "lucide-react";

const cards = [
  {
    title: "Key Features",
    icon: Package,
    items: [
      "Add / Edit / Delete Products",
      "Manage Categories & Collections",
      "Product Variants (Size, Color, etc.)",
      "Inventory & Stock Management",
      "Product Images & Media Gallery",
      "Pricing, Discounts & Sale Options",
    ],
  },
  {
    title: "Advanced Options",
    icon: Settings2,
    items: [
      "Product Tags & Attributes",
      "Collections / Featured Products",
      "Bulk Import / Export",
      "SEO (Meta Title, Description, Slug)",
      "Publish / Draft / Archive",
      "Custom Fields (Fabric Type, Stitch Type, etc.)",
    ],
  },
  {
    title: "Product Details Include",
    icon: FileText,
    items: [
      "Product Name",
      "SKU / Item Code",
      "Description (Short & Long)",
      "Price (Regular & Sale Price)",
      "Category",
      "Tags",
      "Stock Quantity",
      "Product Images / Videos",
      "Status (Active / Draft / Out of Stock)",
      "SEO Settings",
    ],
  },
];

export default function FeatureCards() {
  return (
    <section className="grid w-full grid-cols-1 gap-3 xl:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            key={card.title}
            className="rounded-xl border border-white/[0.09] bg-gradient-to-br from-[#0e0e0e] to-[#080808] p-4"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#270a0f] text-[#ff1638]">
                <Icon size={17} />
              </span>
              <h3 className="text-sm font-bold">{card.title}</h3>
            </div>

            <ul className="grid gap-2.5">
              {card.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[10px] leading-relaxed text-neutral-500">
                  <Check className="mt-0.5 shrink-0 text-[#ff1638]" size={13} />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </section>
  );
}
