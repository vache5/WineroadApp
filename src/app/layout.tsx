import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import BookingModal from "@/components/BookingModal";
import { BookingModalProvider } from "@/contexts/BookingModalContext";

import "./globals.css";

import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export const metadata: Metadata = {
  title: "Landing Starter",
  description: "Minimal landing page skeleton for future projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={playfair.className}>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <BookingModalProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <BookingModal />
        </BookingModalProvider>
      </body>
    </html>
  );
}
