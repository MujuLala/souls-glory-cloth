import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Plus, Search, Pencil, Trash2 } from "lucide-react";
import CMSPageContainer from "@/components/products/CMSPageContainer";

type Item = { id: number; title: string; subtitle: string; status?: string; meta?: string };
type Props = { title: string; description: string; backHref: string; addLabel?: string; icon: ReactNode; stats?: {label:string;value:string|number}[]; items: Item[]; searchPlaceholder?: string };

const statusClasses: Record<string,string> = {
  Active:"bg-emerald-500/10 text-emerald-400", Completed:"bg-emerald-500/10 text-emerald-400",
  Processing:"bg-blue-500/10 text-blue-400", Pending:"bg-yellow-500/10 text-yellow-400",
  Cancelled:"bg-red-500/10 text-red-400", "Low Stock":"bg-yellow-500/10 text-yellow-400",
  "Out of Stock":"bg-red-500/10 text-red-400", Draft:"bg-white/[0.06] text-neutral-400",
};

export default function ManagementPage({title,description,backHref,addLabel="Add New",icon,stats=[],items,searchPlaceholder="Search..."}:Props){
  return <div className="min-h-screen w-full bg-[#050505] text-[#f7f7f7]"><main className="w-full px-8"><CMSPageContainer>
    <div className="mb-5 flex items-center gap-2 text-xs text-neutral-600"><Link href={backHref} className="hover:text-white">Dashboard</Link><span>/</span><span className="text-neutral-400">{title}</span></div>
    <section className="mb-5 flex w-full flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div className="flex items-start gap-3"><Link href={backHref} className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-neutral-500 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white"><ArrowLeft size={16}/></Link><div><h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1><p className="mt-2 text-xs text-neutral-500 sm:text-sm">{description}</p></div></div><button type="button" className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff1638] px-4 py-3 text-xs font-bold text-white shadow-lg shadow-[#ff1638]/10 hover:bg-[#ff2948] sm:w-auto"><Plus size={17}/>{addLabel}</button></section>
    {stats.length>0 && <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">{stats.map(s=><div key={s.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4"><p className="text-[11px] text-neutral-600">{s.label}</p><p className="mt-1 text-xl font-bold">{s.value}</p></div>)}</div>}
    <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]"><div className="flex flex-col gap-3 border-b border-white/[0.07] p-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-2"><span className="text-[#ff1638]">{icon}</span><div><h2 className="text-sm font-semibold">All {title}</h2><p className="mt-1 text-xs text-neutral-600">Manage your {title.toLowerCase()}.</p></div></div><div className="relative w-full sm:w-[280px]"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600"/><input placeholder={searchPlaceholder} className="h-10 w-full rounded-lg border border-white/10 bg-black/30 pl-9 pr-3 text-xs text-white outline-none placeholder:text-white/20 focus:border-[#ff1638]/50"/></div></div>
    <div className="divide-y divide-white/[0.06]">{items.map(item=><div key={item.id} className="flex flex-col gap-4 p-4 transition hover:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between sm:p-5"><div className="flex min-w-0 items-center gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff1638]/10 text-[#ff1638]">{icon}</div><div className="min-w-0"><h3 className="truncate text-sm font-semibold">{item.title}</h3><p className="mt-1 truncate text-[11px] text-neutral-600">{item.subtitle}</p></div></div><div className="flex items-center gap-3 sm:justify-end">{item.meta&&<span className="text-xs text-neutral-500">{item.meta}</span>}{item.status&&<span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusClasses[item.status]??"bg-white/[0.06] text-neutral-400"}`}>{item.status}</span>}<button className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-700 hover:bg-white/[0.05] hover:text-white"><Pencil size={14}/></button><button className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-700 hover:bg-[#ff1638]/10 hover:text-[#ff1638]"><Trash2 size={14}/></button></div></div>)}{items.length===0&&<div className="p-10 text-center text-sm text-neutral-600">No records found.</div>}</div></section>
  </CMSPageContainer></main></div>;
}
