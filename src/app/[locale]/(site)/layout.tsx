import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import BookingModal from "@/components/BookingModal";
import { BookingModalProvider } from "@/contexts/BookingModalContext";

export default function LocalizedSiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BookingModalProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <BookingModal />
    </BookingModalProvider>
  );
}
