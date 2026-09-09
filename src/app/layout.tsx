import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import AnnouncementBar from "@/components/layout/announcement-bar";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Soul's Glory Cloth",
    template: "%s | Soul's Glory Cloth",
  },

  description:
    "Soul's Glory Cloth is a modern fashion and custom tailoring platform for ready-to-wear and made-to-measure clothing.",

  keywords: [
    "Soul's Glory Cloth",
    "custom tailoring",
    "custom clothing",
    "made to measure",
    "ready to wear",
    "fashion",
    "online tailoring",
  ],

  authors: [
    {
      name: "Soul's Glory Cloth",
    },
  ],

  creator: "Soul's Glory Cloth",

  robots: {
    index: true,
    follow: true,
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme="dark"
    >
      <body className={`${inter.variable} antialiased`}>

        {/* Global Announcement */}
        <AnnouncementBar />

        {/* Global Header */}
        <Header />

        {/* Main Application */}
        <main>{children}</main>

        {/* Global Footer */}
        <Footer />

      </body>
    </html>
  );
}