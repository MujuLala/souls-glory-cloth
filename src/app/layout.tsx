import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import SmoothScroll from "@/components/SmoothScroll";
import ThemeProvider from "@/components/theme/theme-provider";
import ToastProvider from "@/components/ui/toast";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Soul's Glory Cloth — Bespoke Tailoring Platform",
    template: "%s · Soul's Glory Cloth",
  },
  description:
    "Bespoke tailoring, ready-to-wear commerce, measurements and point of sale — one platform for your whole atelier.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    {
      media: "(prefers-color-scheme: dark)",
      color: "#050505",
    },
    {
      media: "(prefers-color-scheme: light)",
      color: "#f6f6f4",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <SmoothScroll />

        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}