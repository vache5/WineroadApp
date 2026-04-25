"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useToursApi } from "@/hooks/useToursApi";
import { defaultLocale, locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { tourStrings } from "@/lib/tourLocale";
import { resolveTourImageSrc } from "@/lib/tourImageSrc";
import { GaleryLoaderAnimation } from "@/components/ui/GaleryLoaderAnimation";

export default function OurToursSection() {
  const { t } = useTranslation("common");
  const pathname = usePathname();
  const { tours, loading } = useToursApi(20000);
  const featuredTours = tours.slice(0, 3);
  const segments = pathname.split("/").filter(Boolean);
  const currentLocale: Locale = locales.includes(segments[0] as Locale)
    ? (segments[0] as Locale)
    : defaultLocale;

  return (
    <section className="bg-[#1A0F0F] py-10 md:py-20">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 md:px-8 lg:max-w-6xl xl:max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-[#FFFFFF] mb-4">
            {t("ourTours.title")}
          </h2>
          <p className="text-lg md:text-xl text-[#E2E2E2] max-w-2xl mx-auto leading-relaxed">
            {t("ourTours.subtitle")}
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {loading && featuredTours.length === 0 ? (
            <p className="text-white/70">{t("ourTours.loading")}</p>
          ) : null}
          {loading && featuredTours.length === 0 ? (
            <GaleryLoaderAnimation />
          ) : null}
          {featuredTours.map((tour) => {
            const cardSrc = resolveTourImageSrc(tour.mainImage, tour.imageUrl);
            const copy = tourStrings(tour, currentLocale);
            return (
            <Link
              key={tour.id}
              href={`/${currentLocale}/tours/${tour.id}`}
              className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border-2 border-transparent bg-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-[#D1B06B] hover:shadow-xl"
            >
              <div className="relative h-48 w-full shrink-0 overflow-hidden bg-gray-300">
                {cardSrc ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={cardSrc}
                    alt={copy.title}
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>

              <div className="flex flex-grow flex-col p-6">
                <p className="text-sm font-medium text-[#2b1d19]/60">{copy.duration}</p>
                <h3 className="mt-2 text-xl font-playfair font-bold leading-tight text-[#2b1d19] line-clamp-2">
                  {copy.title}
                </h3>
                <p className="mt-2 flex-grow text-sm leading-relaxed text-[#2b1d19]/70 line-clamp-2">
                  {copy.description}
                </p>

                <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                  <div className="min-w-0">
                    <p className="text-2xl font-bold text-[#2b1d19]">
                      {tour.pricePerPerson.toLocaleString()}Դ
                    </p>
                    <p className="text-xs text-[#2b1d19]/60">{t("ourTours.perTour")}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#D1B06B] px-5 py-2.5 text-center text-sm font-semibold text-[#1A0F0F] shadow-md transition-colors duration-200 hover:bg-[#C7A158]">
                    {t("ourTours.viewDetails")}
                  </span>
                </div>
              </div>
            </Link>
            );
          })}
        </div>

        {/* View All Tours Button */}
        <div className="text-center">
          <Link
            href={`/${currentLocale}/tours`}
            className="inline-block bg-[#D1B06B] hover:bg-[#C7A158] text-[#1A0F0F] font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {t("ourTours.viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
