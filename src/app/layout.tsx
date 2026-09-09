import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import AnnouncementBar from "@/components/layout/announcement-bar";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AmbientBackground from "@/components/ui/ambient-background";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soul's Glory Cloth",
  description: "Custom clothing, made for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <AmbientBackground />

        <div className="relative z-10">
          <AnnouncementBar />

          <Header />

          <main>{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}