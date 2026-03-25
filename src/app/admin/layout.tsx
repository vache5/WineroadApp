import type { Metadata } from "next";

import { AdminAuthProvider } from "@/contexts/AdminAuthContext";

export const metadata: Metadata = {
  title: "Admin · Wineroad",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}
