"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Images, LayoutDashboard, LogOut, MapPin, Receipt } from "lucide-react";

import { useAdminAuth } from "@/hooks/useAdminAuth";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/tours", label: "Tours", icon: MapPin },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/orders", label: "Orders", icon: Receipt },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout } = useAdminAuth();

  return (
    <div className="flex min-h-screen bg-[#151313] text-[#F2EDE8]">
      <aside className="hidden w-56 shrink-0 flex-col border-r border-white/10 bg-[#1E1411] md:flex">
        <div className="border-b border-white/10 px-5 py-6">
          <p className="font-semibold tracking-wide text-[#D7B46A]">Wineroad</p>
          <p className="text-xs text-white/50">Admin</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#D7B46A]/15 text-[#D7B46A]"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-3">
          <button
            type="button"
            onClick={() => logout()}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-white/10 bg-[#1A1310] px-4 py-3 md:hidden">
          <p className="text-sm font-semibold text-[#D7B46A]">Wineroad Admin</p>
          <button
            type="button"
            onClick={() => logout()}
            className="text-xs text-white/60 underline-offset-2 hover:text-white hover:underline"
          >
            Sign out
          </button>
        </header>
        <div className="border-b border-white/10 bg-[#1A1310] px-2 py-2 md:hidden">
          <div className="flex gap-1 overflow-x-auto">
            {nav.map(({ href, label }) => {
              const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${
                    active ? "bg-[#D7B46A] text-[#1E1411]" : "bg-white/5 text-white/80"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
        <main className="flex-1 overflow-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
