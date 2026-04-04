"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useGalleryApi } from "@/hooks/useGalleryApi";
import { defaultLocale, locales } from "@/i18n/config";
import { nonEmptyImageUrl, toBrowserImageSrc } from "@/lib/tourImageSrc";

const PREVIEW_COUNT = 6;

export default function FeaturedTours() {
  const { t } = useTranslation("common");
  const pathname = usePathname();
  const { items, loading } = useGalleryApi(12000);
  const segments = pathname.split("/").filter(Boolean);
  const currentLocale = locales.includes(segments[0] as (typeof locales)[number])
    ? segments[0]
    : defaultLocale;

  const previewItems = useMemo(
    () =>
      items
        .filter((item) => nonEmptyImageUrl(item.imageUrl))
        .slice(0, PREVIEW_COUNT),
    [items],
  );

  return (
    <section className="relative py-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/home-bgg.png')",
          backgroundAttachment: "fixed",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 sm:px-6 md:px-8 lg:max-w-6xl xl:max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-[#F5E3C3] mb-4 tracking-wider uppercase">
            {t("homepage.featuredHeading")}
          </h2>
          <div className="w-24 h-0.5 bg-[#CFA56A] mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <svg
                  className="w-6 h-6 text-[#D6A85A] flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-[#F5E3C3] tracking-wide">
                  {t("homepage.overviewTitle")}
                </h3>
              </div>
              <div className="flex gap-1.5 mb-5">
                <div className="w-2 h-2 rounded-full bg-[#CFA56A]" />
                <div className="w-2 h-2 rounded-full bg-[#CFA56A]" />
                <div className="w-2 h-2 rounded-full bg-[#CFA56A]" />
              </div>
              <p className="text-[#D8D3CC] leading-relaxed text-base" style={{ lineHeight: "1.75" }}>
                {t("homepage.overviewText")}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <svg
                  className="w-6 h-6 text-[#D6A85A] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-[#F5E3C3] tracking-wide">
                  {t("homepage.includedTitle")}
                </h3>
              </div>
              <p className="text-[#D8D3CC] leading-relaxed text-base" style={{ lineHeight: "1.75" }}>
                {t("homepage.includedText")}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <svg
                  className="w-6 h-6 text-[#D6A85A] flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-[#F5E3C3] tracking-wide">
                  {t("homepage.reviewsTitle")}
                </h3>
              </div>
              <p className="text-[#D8D3CC] leading-relaxed text-base" style={{ lineHeight: "1.75" }}>
                {t("homepage.reviewsText")}
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="bg-[#1A0F0A] rounded-xl p-6 shadow-lg border border-[#CFA56A]/20 flex flex-col h-full">
              <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-[#F5E3C3] mb-2 text-center tracking-wide">
                {t("homepage.galleryPreviewTitle")}
              </h3>
              <p className="text-center text-sm text-[#D8D3CC]/80 mb-6">
                {t("homepage.galleryPreviewSubtitle")}
              </p>

              {loading && previewItems.length === 0 ? (
                <p className="text-[#D8D3CC]/70 text-sm text-center py-8">{t("gallery.loading")}</p>
              ) : null}

              {!loading && previewItems.length === 0 ? (
                <p className="text-[#D8D3CC]/80 text-sm text-center py-6 px-4">
                  {t("homepage.galleryPreviewEmpty")}
                </p>
              ) : null}

              {previewItems.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 flex-1">
                  {previewItems.map((item) => {
                    const src = toBrowserImageSrc(item.imageUrl)!;
                    const label = item.title.trim() || t("gallery.photoFallback");
                    return (
                      <div
                        key={item.id}
                        className="relative aspect-square overflow-hidden rounded-lg border border-[#CFA56A]/25 bg-[#140c0a]"
                      >
                        <Image
                          src={src}
                          alt={label}
                          fill
                          sizes="(max-width: 640px) 50vw, 33vw"
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    );
                  })}
                </div>
              ) : null}

              <Link
                href={`/${currentLocale}/gallery`}
                className="mt-6 block w-full rounded-lg border border-[#D6A85A] bg-[#D6A85A] py-3.5 text-center text-sm font-bold text-[#1A0F0A] shadow-md transition-colors hover:bg-[#CFA56A]"
              >
                {t("homepage.viewMoreGallery")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
