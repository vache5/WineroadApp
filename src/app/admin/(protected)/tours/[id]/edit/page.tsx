"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { AdminLoading } from "@/components/admin/AdminLoading";
import {
  TourForm,
  formValuesToPayload,
  tourToFormValues,
  type TourFormValues,
} from "@/components/admin/TourForm";
import { adminJson } from "@/lib/api/adminClient";
import type { ApiTour } from "@/types/api";

export default function EditTourPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string | undefined;
  const [values, setValues] = useState<TourFormValues | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    if (!id) return;
    setError(null);
    setLoading(true);
    try {
      const tour = await adminJson<ApiTour>(`/tours/${id}?includeHidden=1`);
      setValues(tourToFormValues(tour));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Tour not found");
      setValues(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id || !values) return;
    setError(null);
    setSubmitting(true);
    try {
      const payload = formValuesToPayload(values);
      if (!Number.isFinite(payload.pricePerPerson) || payload.pricePerPerson <= 0) {
        throw new Error("Price per person must be a positive number");
      }
      if (!payload.bookableDates.length) {
        throw new Error("Add at least one bookable date");
      }
      await adminJson<ApiTour>(`/tours/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      router.push("/admin/tours");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update tour");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <AdminLoading message="Loading tour…" />;
  }

  if (!values) {
    return (
      <div className="space-y-4">
        <p className="text-red-200">{error ?? "Tour not found"}</p>
        <Link href="/admin/tours" className="text-[#D7B46A] hover:underline">
          Back to tours
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-center gap-3 text-sm text-white/50">
        <Link href="/admin/tours" className="hover:text-[#D7B46A]">
          ← Tours
        </Link>
      </div>
      <div>
        <h1 className="text-2xl font-semibold text-white">Edit tour</h1>
        <p className="mt-1 text-sm text-white/50">Update price, bookable dates, main image, gallery, and copy</p>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-white/10 bg-[#1E1411] p-6">
        <TourForm values={values} onChange={setValues} disabled={submitting} />
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-[#D7B46A] px-5 py-2.5 text-sm font-semibold text-[#1E1411] disabled:opacity-60"
          >
            {submitting ? "Saving…" : "Save changes"}
          </button>
          <Link
            href="/admin/tours"
            className="rounded-lg border border-white/15 px-5 py-2.5 text-sm text-white/80 hover:bg-white/5"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
