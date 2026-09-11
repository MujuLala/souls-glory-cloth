import { AlertCircle, CheckCircle2, Package, ShoppingBag } from "lucide-react";

const stats = [
  { title: "Total Products", value: "128", note: "+12%", sub: "from last month", tone: "red", icon: Package },
  { title: "Active Products", value: "112", note: "87%", sub: "of total", tone: "green", icon: CheckCircle2 },
  { title: "Out of Stock", value: "6", note: "Need attention", sub: "", tone: "red", icon: AlertCircle },
  { title: "Low Stock", value: "10", note: "Below threshold", sub: "", tone: "gold", icon: ShoppingBag },
];

export default function Stats() {
  return (
    <section className="grid w-full grid-cols-2 gap-3 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article
            key={stat.title}
            className="relative min-h-[125px] overflow-hidden rounded-xl border border-white/[0.09] bg-gradient-to-br from-[#101010] to-[#090909] p-4"
          >
            <div
              className={[
                "mb-3 grid h-10 w-10 place-items-center rounded-lg",
                stat.tone === "green"
                  ? "bg-[#20d77b]/10 text-[#20d77b]"
                  : stat.tone === "gold"
                    ? "bg-[#ffad13]/10 text-[#ffad13]"
                    : "bg-[#ff1638]/10 text-[#ff1638]",
              ].join(" ")}
            >
              <Icon size={20} />
            </div>

            <span className="block text-[11px] text-neutral-500">{stat.title}</span>
            <strong className="mt-1 block text-2xl font-bold tracking-tight">{stat.value}</strong>
            <p
              className={[
                "mt-1 text-[10px]",
                stat.tone === "green"
                  ? "text-[#20d77b]"
                  : stat.tone === "gold"
                    ? "text-[#ffad13]"
                    : "text-[#ff1638]",
              ].join(" ")}
            >
              {stat.note} <small className="text-neutral-600">{stat.sub}</small>
            </p>

            <span
              className={[
                "absolute bottom-5 right-4 h-3 w-14 rotate-[-10deg] rounded-[50%] border-t-2",
                stat.tone === "green"
                  ? "border-[#20d77b]"
                  : stat.tone === "gold"
                    ? "border-[#ffad13]"
                    : "border-[#ff1638]",
              ].join(" ")}
            />
          </article>
        );
      })}
    </section>
  );
}
