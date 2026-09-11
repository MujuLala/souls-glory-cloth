import Sidebar from "@/components/products/Sidebar";
import Topbar from "@/components/products/Topbar";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#070707] text-white">
      <Sidebar />

      <main className="w-full md:ml-[260px] md:w-[calc(100%-260px)]">
        <Topbar />

        <div className="w-full">
          {children}
        </div>
      </main>
    </div>
  );
}