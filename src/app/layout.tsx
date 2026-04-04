import type { Metadata } from "next";

import "./globals.css";
import { ToastProvider } from "@/components/ToastProvider";

import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Wineroad",
  description: "Armenian wine tours and experiences.",
  manifest: "/images/site.webmanifest",
  icons: {
    icon: [
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/images/favicon.ico",
    apple: "/images/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: browser extensions often inject attrs (e.g. bis_*) before React hydrates.
    <html lang="en" className={playfair.className} suppressHydrationWarning>
      <body className="min-h-screen bg-white text-gray-900 antialiased" suppressHydrationWarning>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
