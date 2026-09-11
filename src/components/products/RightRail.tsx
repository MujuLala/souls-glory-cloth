import {
  ArrowRight,
  CircleHelp,
  Package,
  ShoppingBag,
  Tags,
  Upload,
} from "lucide-react";

export default function RightRail() {
  return (
    <aside className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:flex xl:flex-col">
      <article className="overflow-hidden rounded-xl border border-white/[0.09] bg-gradient-to-br from-[#0f0f0f] to-[#080808] sm:col-span-2">
        <div
          className="h-56 w-full bg-cover bg-center sm:h-64 xl:h-40"
          style={{
            backgroundImage:
              "linear-gradient(180deg, transparent 10%, #0a0a0a 100%), url('https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80')",
          }}
        />

        <div className="p-4">
          <span className="text-[9px] font-extrabold tracking-[.2em] text-[#ff1638]">PRODUCT CMS</span>
          <h2 className="mt-2 text-xl font-bold leading-[1.05]">
            Manage Your
            <br />
            Products <em className="not-italic text-[#ff1638]">Effortlessly</em>
          </h2>
          <p className="mt-2 text-[10px] leading-relaxed text-neutral-500">
            Add, edit, organize and grow your catalog with powerful tools.
          </p>
          <button className="mt-3 flex items-center gap-2 rounded-md border border-white/20 bg-[#111] px-3 py-2 text-[10px] text-white">
            Learn More <ArrowRight size={13} />
          </button>
        </div>
      </article>

      <article className="rounded-xl border border-white/[0.09] bg-gradient-to-br from-[#0f0f0f] to-[#080808] p-4">
        <h3 className="mb-2 text-sm font-bold">Quick Actions</h3>
        <QuickAction icon={<Package />} title="Add New Product" text="Create a new product" />
        <QuickAction icon={<Tags />} title="Manage Categories" text="Organize your collections" />
        <QuickAction icon={<Upload />} title="Bulk Import" text="Import products via CSV" />
        <QuickAction icon={<CircleHelp />} title="Product Reviews" text="View and moderate reviews" />
      </article>

      <article className="rounded-xl border border-[#32171c] bg-gradient-to-br from-[#19090c] to-[#0c0708] p-4">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#ff1638] text-white">
          <ShoppingBag size={17} />
        </div>
        <h3 className="mt-3 text-sm font-bold">Grow Your Business</h3>
        <p className="mt-2 text-[10px] leading-relaxed text-neutral-500">
          A well-organized product catalog helps you showcase, sell and manage your products efficiently.
        </p>
        <div className="ml-auto mt-5 h-px w-1/2 rotate-[-8deg] bg-[#ff1638]" />
      </article>

      <blockquote className="px-2 py-2 text-center text-[9px] leading-relaxed text-neutral-600">
        “Great products build great brands.”
        <span className="mt-1 block text-neutral-500">— Soul&apos;s Glory Cloth</span>
      </blockquote>
    </aside>
  );
}

function QuickAction({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <button className="flex w-full items-center gap-3 border-t border-white/[0.07] py-3 text-left first:border-t-0">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#260a0f] text-[#ff1638]">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <strong className="block truncate text-[10px] text-neutral-200">{title}</strong>
        <small className="mt-0.5 block text-[9px] text-neutral-600">{text}</small>
      </span>
      <ArrowRight size={13} className="text-neutral-600" />
    </button>
  );
}
