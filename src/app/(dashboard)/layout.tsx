import Sidebar from "@/components/products/Sidebar";
import Topbar from "@/components/products/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Dashboard Area */}
      <div className="min-h-screen md:ml-[260px]">
        {/* Topbar */}
        <Topbar />

        {/* Page */}
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}