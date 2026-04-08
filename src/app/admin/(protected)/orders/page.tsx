"use client";

import { useEffect, useState } from "react";

import { AdminLoading } from "@/components/admin/AdminLoading";
import { adminJson } from "@/lib/api/adminClient";
import type { ApiOrder } from "@/types/api";
import { tourStrings } from "@/lib/tourLocale";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await adminJson<ApiOrder[]>("/admin/orders");
        if (!cancelled) setOrders(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load orders");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function markCancelled(orderId: string) {
    if (!window.confirm("Mark this order as cancelled?")) return;
    setError(null);
    setUpdatingOrderId(orderId);
    try {
      const updated = await adminJson<ApiOrder>(`/admin/orders/${orderId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: "cancelled" }),
      });
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update order");
    } finally {
      setUpdatingOrderId(null);
    }
  }

  function statusBadgeClass(status: ApiOrder["status"]) {
    if (status === "confirmed") return "border border-emerald-500/40 bg-emerald-500/10 text-emerald-200";
    if (status === "cancelled") return "border border-red-500/40 bg-red-500/10 text-red-200";
    return "border border-amber-500/40 bg-amber-500/10 text-amber-200";
  }

  if (loading) {
    return <AdminLoading message="Loading orders…" />;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Orders</h1>
        <p className="mt-1 text-sm text-white/50">All bookings with status and tour details</p>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="min-w-full divide-y divide-white/10 text-left text-sm">
          <thead className="bg-[#1E1411] text-white/60">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Tour</th>
              <th className="px-4 py-3 font-medium">People</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Booked</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 bg-[#1A1310]">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-white/50">
                  No orders yet.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} className="align-top text-white/90">
                  <td className="px-4 py-3 font-mono text-xs text-white/50">#{o.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{o.userName}</p>
                    <a
                      href={`mailto:${o.userEmail}`}
                      className="text-xs text-[#D7B46A] underline-offset-2 hover:underline"
                    >
                      {o.userEmail}
                    </a>
                  </td>
                  <td className="max-w-[220px] px-4 py-3">
                    <p className="font-medium text-white">
                      {o.tour ? tourStrings(o.tour, "en").title : `Tour #${o.tourId}`}
                    </p>
                    <p className="text-xs text-white/45">
                      Departs {o.tour?.date ?? "—"} · {o.tour ? tourStrings(o.tour, "en").duration : "—"}
                    </p>
                    {o.tour?.imageUrl ? (
                      <p className="mt-1 truncate text-[10px] text-white/30" title={o.tour.imageUrl}>
                        {o.tour.imageUrl}
                      </p>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-white/70">{o.numberOfPeople}</td>
                  <td className="px-4 py-3 font-medium text-[#D7B46A]">
                    {o.totalPrice.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs ${statusBadgeClass(o.status)}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-white/50">
                    {formatDate(o.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {o.status !== "cancelled" ? (
                      <button
                        type="button"
                        disabled={updatingOrderId === o.id}
                        onClick={() => void markCancelled(o.id)}
                        className="rounded-md border border-red-500/40 px-2 py-1 text-xs text-red-200 hover:bg-red-500/10 disabled:opacity-50"
                      >
                        {updatingOrderId === o.id ? "…" : "Cancel"}
                      </button>
                    ) : (
                      <span className="text-xs text-white/40">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
