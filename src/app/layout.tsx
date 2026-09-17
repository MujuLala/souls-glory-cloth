import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

import ThemeProvider, {
  themeInitScript,
} from "@/components/theme/theme-provider";
import ToastProvider from "@/components/ui/toast";

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
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
    { media: "(prefers-color-scheme: light)", color: "#f6f6f4" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Sets [data-theme] before first paint — no flash.
            `next/script` with beforeInteractive is the
            supported way to inject a blocking inline script;
            a raw <script> tag triggers a React dev warning
            about scripts never executing on client renders. */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>

      <body className={`${inter.variable} antialiased`}>
        <SmoothScroll />
         <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
