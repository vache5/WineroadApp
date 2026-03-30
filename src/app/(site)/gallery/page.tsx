"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useGalleryApi } from "@/hooks/useGalleryApi";
import { nonEmptyImageUrl } from "@/lib/tourImageSrc";

export default function GalleryPage() {
  const { t } = useTranslation("common");
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";
  const { items, loading, error } = useGalleryApi(12000);

  return (
    <div className="min-h-screen bg-[#151313]">
      <div className="border-b border-[#D4A755]/30 bg-[#1A0F0F]">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
          <Link
            href={`/${locale}`}
            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-[#D1B06B]"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t("gallery.backHome")}
          </Link>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D1B06B]">{t("gallery.eyebrow")}</p>
          <h1 className="mt-2 font-playfair text-4xl font-bold text-white sm:text-5xl">{t("gallery.title")}</h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-300">
            {t("gallery.subtitle")}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        {loading && items.length === 0 ? (
          <p className="text-center text-white/60">{t("gallery.loading")}</p>
        ) : null}
        {error ? (
          <p className="mb-8 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        ) : null}

        {!loading && items.length === 0 && !error ? (
          <div className="rounded-2xl border border-white/10 bg-[#1E1411] px-6 py-16 text-center">
            <p className="text-white/70">{t("gallery.empty")}</p>
          </div>
        ) : null}

        {items.length > 0 ? (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {items
              .filter((item) => nonEmptyImageUrl(item.imageUrl))
              .map((item) => {
                const src = nonEmptyImageUrl(item.imageUrl)!;
                const label = item.title.trim() || t("gallery.photoFallback");
                return (
                <article
                  key={item.id}
                  className="group relative mb-4 break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-[#1A0F0F] shadow-lg"
                >
                  <div className="relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={label}
                      className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95"
                      aria-hidden
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5">
                      {item.title.trim() ? (
                        <h2 className="font-playfair text-lg font-semibold text-white drop-shadow md:text-xl">
                          {item.title.trim()}
                        </h2>
                      ) : null}
                      {item.description.trim() ? (
                        <p className="mt-1 line-clamp-3 text-sm text-white/90 drop-shadow">
                          {item.description.trim()}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
              })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
