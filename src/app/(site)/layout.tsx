import AnnouncementBar from "@/components/layout/announcement-bar";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AmbientBackground from "@/components/ui/ambient-background";
import SupportChatWidget from "@/components/chat/SupportChatWidget";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AmbientBackground />

      <div className="relative z-10 flex min-h-screen flex-col">
        <AnnouncementBar />
        <Header />

        <main className="flex-1">{children}</main>

        <Footer />
      </div>

      {/* Live chat with the atelier — floats above every page. */}
      <SupportChatWidget />
    </>
  );
}
