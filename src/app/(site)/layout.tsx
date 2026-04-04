import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import BookingModal from "@/components/BookingModal";
import LocaleProvider from "@/components/providers/LocaleProvider";
import { BookingModalProvider } from "@/contexts/BookingModalContext";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LocaleProvider locale="en">
      <BookingModalProvider>
        <div className="flex min-h-screen flex-col" suppressHydrationWarning>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <BookingModal />
      </BookingModalProvider>
    </LocaleProvider>
  );
}
