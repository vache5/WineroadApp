import { AdminProtectedLayout } from "@/components/admin/AdminProtectedLayout";

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return <AdminProtectedLayout>{children}</AdminProtectedLayout>;
}
