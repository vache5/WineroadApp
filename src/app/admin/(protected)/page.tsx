"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { AdminLoading } from "@/components/admin/AdminLoading";
import { adminJson } from "@/lib/api/adminClient";
import type { AdminStats } from "@/types/api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await adminJson<AdminStats>("/admin/stats");
        if (!cancelled) setStats(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load stats");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <AdminLoading message="Loading dashboard…" />;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
        {error}
      </div>
    );
  }

  const cards = [
    { label: "Tours", value: stats?.tourCount ?? 0, href: "/admin/tours" },
    { label: "Orders", value: stats?.orderCount ?? 0, href: "/admin/orders" },
    {
      label: "Revenue (confirmed)",
      value: stats?.revenueTotal != null ? stats.revenueTotal.toLocaleString() : "—",
      href: "/admin/orders",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-white/50">Summary of tours and orders</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-xl border border-white/10 bg-[#1E1411] p-5 transition-colors hover:border-[#D7B46A]/40"
          >
            <p className="text-sm text-white/50">{c.label}</p>
            <p className="mt-2 text-3xl font-semibold text-[#D7B46A]">{c.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
