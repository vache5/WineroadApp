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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={playfair.className}>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
