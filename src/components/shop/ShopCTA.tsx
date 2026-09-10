import Link from "next/link";
import Container from "@/components/ui/container";

export default function ShopCTA({ title = "Want it made just for you?", text = "Take your measurements, choose your details, and create a piece that feels uniquely yours." }: { title?: string; text?: string }) {
  return <section className="py-16 sm:py-24"><Container><div className="relative overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-7 sm:p-10 lg:p-14"><div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_80%_20%,var(--primary)_0,transparent_30%)]" /><div className="relative max-w-2xl"><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">Custom Studio</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--text)] sm:text-4xl">{title}</h2><p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{text}</p><Link href="/custom-studio" className="mt-7 inline-flex h-11 items-center rounded-[9px] bg-[var(--primary)] px-5 text-xs font-semibold text-white transition hover:opacity-90">Open Custom Studio</Link></div></div></Container></section>;
}
