"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { AdminShell } from "@/components/admin/AdminShell";
import { AdminLoading } from "@/components/admin/AdminLoading";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isHydrated, isAuthenticated } = useAdminAuth();

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [isHydrated, isAuthenticated, router]);

  if (!isHydrated || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#151313]">
        <AdminLoading message="Checking session…" />
      </div>
    );
  }

  return <AdminShell>{children}</AdminShell>;
}
