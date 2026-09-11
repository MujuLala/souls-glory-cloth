import { Bell, ChevronDown, Globe2, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center gap-3 border-b border-white/[0.08] bg-[#050505]/90 px-4 backdrop-blur-xl md:h-[72px] md:px-5">
      <div className="ml-12 flex h-9 w-full max-w-[520px] items-center gap-2 rounded-lg border border-white/10 bg-[#090909] px-3 text-neutral-600 md:ml-0">
        <Search size={17} />
        <input
          className="w-full bg-transparent text-xs text-neutral-300 outline-none placeholder:text-neutral-600"
          placeholder="Search products, orders, customers..."
        />
        <kbd className="hidden rounded border max-w-[520px] border-white/10 px-1.5 py-0.5 text-[9px] text-neutral-600 ">
          Ctrl K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button className="relative grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-[#0b0b0b] text-neutral-400">
          <Bell size={17} />
          <b className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-[#ff1638] text-[8px] text-white">
            3
          </b>
        </button>

        <button className="hidden h-9 w-9 place-items-center rounded-lg border border-white/10 bg-[#0b0b0b] text-neutral-400 sm:grid">
          <Globe2 size={17} />
        </button>

        <div className="flex items-center gap-2 border-l border-white/10 pl-2">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-neutral-800 text-[10px] font-bold">
            MH
          </div>
          <div className="hidden sm:block">
            <strong className="block text-[11px]">Mujahid Hussain</strong>
            <span className="block text-[9px] text-neutral-600">Admin</span>
          </div>
          <ChevronDown size={14} className="hidden text-neutral-600 sm:block" />
        </div>
      </div>
    </header>
  );
}
