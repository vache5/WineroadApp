"use client";

import { useState } from "react";
import type { ApiTour, TourLocales } from "@/types/api";
import { adminFetch } from "@/lib/api/adminClient";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";

const LOCALE_HEADINGS: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  am: "Հայերեն",
};

const emptyLocales = (): TourLocales => ({
  en: { title: "", description: "", duration: "" },
  ru: { title: "", description: "", duration: "" },
  am: { title: "", description: "", duration: "" },
});

export type TourFormValues = {
  locales: TourLocales;
  pricePerPerson: string;
  date: string;
  mainImage: string;
  galleryImages: string[];
};

export function tourToFormValues(tour: ApiTour): TourFormValues {
  return {
    locales: {
      en: { ...tour.locales.en },
      ru: { ...tour.locales.ru },
      am: { ...tour.locales.am },
    },
    pricePerPerson: String(tour.pricePerPerson),
    date: tour.date,
    mainImage: tour.mainImage ?? tour.imageUrl ?? "",
    galleryImages: tour.galleryImages ?? [],
  };
}

export const emptyTourForm: TourFormValues = {
  locales: emptyLocales(),
  pricePerPerson: "",
  date: "",
  mainImage: "",
  galleryImages: [""],
};

type TourFormProps = {
  values: TourFormValues;
  onChange: (values: TourFormValues) => void;
  disabled?: boolean;
};

export function TourForm({ values, onChange, disabled }: TourFormProps) {
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingGalleryIndex, setUploadingGalleryIndex] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  function patch<K extends keyof TourFormValues>(key: K, v: TourFormValues[K]) {
    onChange({ ...values, [key]: v });
  }

  function patchLocale(loc: Locale, field: keyof TourLocales["en"], v: string) {
    onChange({
      ...values,
      locales: {
        ...values.locales,
        [loc]: {
          ...values.locales[loc],
          [field]: v,
        },
      },
    });
  }

  async function uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("image", file);
    const res = await adminFetch("/admin/upload-image", {
      method: "POST",
      body: formData,
    });
    const text = await res.text();
    const data = text ? (JSON.parse(text) as { url?: string; error?: string }) : {};
    if (!res.ok || !data.url) {
      throw new Error(data.error ?? "Upload failed");
    }
    return data.url;
  }

  function setGalleryAt(index: number, value: string) {
    const next = [...values.galleryImages];
    next[index] = value;
    patch("galleryImages", next);
  }

  function addGalleryImage() {
    patch("galleryImages", [...values.galleryImages, ""]);
  }

  function removeGalleryImage(index: number) {
    const next = values.galleryImages.filter((_, i) => i !== index);
    patch("galleryImages", next.length ? next : [""]);
  }

  async function handleMainImageUpload(file: File | null) {
    if (!file) return;
    setUploadError(null);
    setUploadingMain(true);
    try {
      const url = await uploadImage(file);
      patch("mainImage", url);
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Main image upload failed");
    } finally {
      setUploadingMain(false);
    }
  }

  async function handleGalleryImageUpload(index: number, file: File | null) {
    if (!file) return;
    setUploadError(null);
    setUploadingGalleryIndex(index);
    try {
      const url = await uploadImage(file);
      setGalleryAt(index, url);
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Gallery image upload failed");
    } finally {
      setUploadingGalleryIndex(null);
    }
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {locales.map((loc) => (
        <div key={loc} className="md:col-span-2 space-y-4 rounded-lg border border-white/10 bg-black/20 p-4">
          <h3 className="text-sm font-semibold text-[#D7B46A]">{LOCALE_HEADINGS[loc]}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label
                className="mb-1.5 block text-sm font-medium text-white/80"
                htmlFor={`tour-title-${loc}`}
              >
                Title
              </label>
              <input
                id={`tour-title-${loc}`}
                className="w-full rounded-lg border border-white/15 bg-[#1E1411] px-3 py-2 text-sm text-white outline-none ring-[#D7B46A] focus:ring-2"
                value={values.locales[loc].title}
                onChange={(e) => patchLocale(loc, "title", e.target.value)}
                disabled={disabled}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label
                className="mb-1.5 block text-sm font-medium text-white/80"
                htmlFor={`tour-desc-${loc}`}
              >
                Description
              </label>
              <textarea
                id={`tour-desc-${loc}`}
                rows={4}
                className="w-full rounded-lg border border-white/15 bg-[#1E1411] px-3 py-2 text-sm text-white outline-none ring-[#D7B46A] focus:ring-2"
                value={values.locales[loc].description}
                onChange={(e) => patchLocale(loc, "description", e.target.value)}
                disabled={disabled}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label
                className="mb-1.5 block text-sm font-medium text-white/80"
                htmlFor={`tour-duration-${loc}`}
              >
                Duration
              </label>
              <input
                id={`tour-duration-${loc}`}
                placeholder="e.g. Full day"
                className="w-full rounded-lg border border-white/15 bg-[#1E1411] px-3 py-2 text-sm text-white outline-none ring-[#D7B46A] focus:ring-2"
                value={values.locales[loc].duration}
                onChange={(e) => patchLocale(loc, "duration", e.target.value)}
                disabled={disabled}
                required
              />
            </div>
          </div>
        </div>
      ))}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-white/80" htmlFor="tour-price">
          Price per person
        </label>
        <input
          id="tour-price"
          type="number"
          min={0}
          step="0.01"
          className="w-full rounded-lg border border-white/15 bg-[#1E1411] px-3 py-2 text-sm text-white outline-none ring-[#D7B46A] focus:ring-2"
          value={values.pricePerPerson}
          onChange={(e) => patch("pricePerPerson", e.target.value)}
          disabled={disabled}
          required
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-white/80" htmlFor="tour-date">
          Date (YYYY-MM-DD)
        </label>
        <input
          id="tour-date"
          type="date"
          className="w-full rounded-lg border border-white/15 bg-[#1E1411] px-3 py-2 text-sm text-white outline-none ring-[#D7B46A] focus:ring-2"
          value={values.date}
          onChange={(e) => patch("date", e.target.value)}
          disabled={disabled}
          required
        />
      </div>
      <div className="md:col-span-2">
        <label className="mb-1.5 block text-sm font-medium text-white/80" htmlFor="tour-main-image">
          Main image
        </label>
        <div className="space-y-2">
          <input
            id="tour-main-image"
            type="url"
            className="w-full rounded-lg border border-white/15 bg-[#1E1411] px-3 py-2 text-sm text-white outline-none ring-[#D7B46A] focus:ring-2"
            value={values.mainImage}
            onChange={(e) => patch("mainImage", e.target.value)}
            disabled={disabled || uploadingMain}
            required
          />
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => void handleMainImageUpload(e.target.files?.[0] ?? null)}
              disabled={disabled || uploadingMain}
              className="text-xs text-white/70 file:mr-3 file:rounded-md file:border-0 file:bg-[#D7B46A] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-[#1E1411]"
            />
            {uploadingMain ? <span className="text-xs text-[#D7B46A]">Uploading…</span> : null}
          </div>
        </div>
      </div>
      <div className="md:col-span-2 space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-white/80">Gallery images</label>
          <button
            type="button"
            onClick={addGalleryImage}
            disabled={disabled}
            className="rounded-md border border-white/20 px-2 py-1 text-xs text-white/80 hover:bg-white/5 disabled:opacity-50"
          >
            Add image
          </button>
        </div>
        {values.galleryImages.map((url, index) => (
          <div key={index} className="space-y-2 rounded-md border border-white/10 p-3">
            <div className="flex gap-2">
              <input
                type="url"
                value={url}
                onChange={(e) => setGalleryAt(index, e.target.value)}
                disabled={disabled || uploadingGalleryIndex === index}
                placeholder="https://..."
                className="w-full rounded-lg border border-white/15 bg-[#1E1411] px-3 py-2 text-sm text-white outline-none ring-[#D7B46A] focus:ring-2"
              />
              <button
                type="button"
                onClick={() => removeGalleryImage(index)}
                disabled={disabled}
                className="rounded-md border border-red-500/40 px-3 py-2 text-xs text-red-200 hover:bg-red-500/10 disabled:opacity-50"
              >
                Remove
              </button>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => void handleGalleryImageUpload(index, e.target.files?.[0] ?? null)}
                disabled={disabled || uploadingGalleryIndex === index}
                className="text-xs text-white/70 file:mr-3 file:rounded-md file:border-0 file:bg-[#D7B46A] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-[#1E1411]"
              />
              {uploadingGalleryIndex === index ? (
                <span className="text-xs text-[#D7B46A]">Uploading…</span>
              ) : null}
            </div>
          </div>
        ))}
        {uploadError ? (
          <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">
            {uploadError}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function trimLocales(locales: TourLocales): TourLocales {
  return {
    en: {
      title: locales.en.title.trim(),
      description: locales.en.description.trim(),
      duration: locales.en.duration.trim(),
    },
    ru: {
      title: locales.ru.title.trim(),
      description: locales.ru.description.trim(),
      duration: locales.ru.duration.trim(),
    },
    am: {
      title: locales.am.title.trim(),
      description: locales.am.description.trim(),
      duration: locales.am.duration.trim(),
    },
  };
}

export function formValuesToPayload(values: TourFormValues) {
  const pricePerPerson = Number(values.pricePerPerson);
  return {
    locales: trimLocales(values.locales),
    pricePerPerson,
    date: values.date.trim(),
    mainImage: values.mainImage.trim(),
    galleryImages: values.galleryImages.map((img) => img.trim()).filter(Boolean),
  };
}
