"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import { AdminLoading } from "@/components/admin/AdminLoading";
import { adminFetch, publicJson } from "@/lib/api/adminClient";
import type { ApiTour } from "@/types/api";
import { resolveTourImageSrc } from "@/lib/tourImageSrc";

export default function AdminToursPage() {
  const [tours, setTours] = useState<ApiTour[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const data = await publicJson<ApiTour[]>("/tours");
      setTours(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load tours");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Delete tour “${name}”? This cannot be undone.`)) return;
    setDeletingId(id);
    setError(null);
    try {
      const res = await adminFetch(`/tours/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const text = await res.text();
        let msg = res.statusText;
        try {
          const j = JSON.parse(text) as { error?: string };
          if (j.error) msg = j.error;
        } catch {
          /* ignore */
        }
        throw new Error(msg);
      }
      setTours((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return <AdminLoading message="Loading tours…" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Tours</h1>
          <p className="mt-1 text-sm text-white/50">Create, edit, and remove tours</p>
        </div>
        <Link
          href="/admin/tours/new"
          className="inline-flex items-center justify-center rounded-lg bg-[#D7B46A] px-4 py-2.5 text-sm font-semibold text-[#1E1411]"
        >
          New tour
        </Link>
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
              <th className="px-4 py-3 font-medium">Tour</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 bg-[#1A1310]">
            {tours.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-white/50">
                  No tours yet.{" "}
                  <Link href="/admin/tours/new" className="text-[#D7B46A] underline-offset-2 hover:underline">
                    Create one
                  </Link>
                </td>
              </tr>
            ) : (
              tours.map((t) => {
                const thumb = resolveTourImageSrc(t.mainImage, t.imageUrl);
                return (
                <tr key={t.id} className="text-white/90">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-md bg-black/40">
                        {thumb ? (
                          /* eslint-disable-next-line @next/next/no-img-element -- arbitrary tour image URLs */
                          <img
                            src={thumb}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                      </div>
                      <div>
                        <p className="font-medium text-white">{t.name}</p>
                        <p className="line-clamp-1 text-xs text-white/45">{t.duration}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white/70">{t.date}</td>
                  <td className="px-4 py-3 text-[#D7B46A]">{t.pricePerPerson.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/tours/${t.id}/edit`}
                        className="rounded-md border border-white/15 px-2 py-1 text-xs text-white/80 hover:bg-white/5"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        disabled={deletingId === t.id}
                        onClick={() => void handleDelete(t.id, t.name)}
                        className="rounded-md border border-red-500/40 px-2 py-1 text-xs text-red-200 hover:bg-red-500/10 disabled:opacity-50"
                      >
                        {deletingId === t.id ? "…" : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
