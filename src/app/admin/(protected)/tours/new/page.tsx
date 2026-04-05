"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  TourForm,
  emptyTourForm,
  formValuesToPayload,
  type TourFormValues,
} from "@/components/admin/TourForm";
import { adminJson } from "@/lib/api/adminClient";
import type { ApiTour } from "@/types/api";

export default function NewTourPage() {
  const router = useRouter();
  const [values, setValues] = useState<TourFormValues>(emptyTourForm);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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
      await adminJson<ApiTour>("/tours", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      router.replace("/admin/tours");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create tour");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-center gap-3 text-sm text-white/50">
        <Link href="/admin/tours" className="hover:text-[#D7B46A]">
          ← Tours
        </Link>
      </div>
      <div>
        <h1 className="text-2xl font-semibold text-white">New tour</h1>
        <p className="mt-1 text-sm text-white/50">Price, bookable dates, main image, and gallery images</p>
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
            {submitting ? "Creating…" : "Create tour"}
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
