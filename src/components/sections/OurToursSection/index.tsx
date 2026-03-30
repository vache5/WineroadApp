"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useToursApi } from "@/hooks/useToursApi";
import { defaultLocale, locales } from "@/i18n/config";
import { resolveTourImageSrc } from "@/lib/tourImageSrc";

export default function OurToursSection() {
  const { t } = useTranslation("common");
  const pathname = usePathname();
  const { tours, loading } = useToursApi(20000);
  const featuredTours = tours.slice(0, 3);
  const segments = pathname.split("/").filter(Boolean);
  const currentLocale = locales.includes(segments[0] as (typeof locales)[number])
    ? segments[0]
    : defaultLocale;

  return (
    <section className="bg-[#1A0F0F] py-10 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {loading && featuredTours.length === 0 ? (
            <p className="text-white/70">{t("ourTours.loading")}</p>
          ) : null}
          {featuredTours.map((tour) => {
            const cardSrc = resolveTourImageSrc(tour.mainImage, tour.imageUrl);
            return (
            <Link
              key={tour.id}
              href={`/${currentLocale}/tours/${tour.id}`}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:scale-[1.02] hover:border-2 hover:border-[#D1B06B] border-2 border-transparent transition-all duration-300"
            >
              {/* Image */}
              <div className="relative w-full aspect-video bg-gray-300">
                {cardSrc ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={cardSrc} alt={tour.name} className="h-full w-full object-cover" />
                ) : null}
              </div>

              {/* Card Content */}
              <div className="p-6 space-y-4">
                {/* Location/Category */}
                <p className="text-sm text-[#2b1d19]/60 font-medium">
                  {tour.duration}
                </p>

                {/* Title */}
                <h3 className="text-xl font-playfair font-bold text-[#2b1d19] leading-tight line-clamp-2">
                  {tour.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#2b1d19]/70 line-clamp-2">
                  {tour.description}
                </p>

                {/* Price and Button Row */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="text-2xl font-bold text-[#2b1d19]">
                      {tour.pricePerPerson.toLocaleString()}Դ
                    </p>
                    <p className="text-xs text-[#2b1d19]/60">{t("ourTours.perTour")}</p>
                  </div>
                  <button className="rounded-full bg-[#D1B06B] hover:bg-[#C7A158] text-[#1A0F0F] font-semibold px-6 py-2.5 text-sm transition-colors duration-200 shadow-md hover:shadow-lg">
                    {t("ourTours.viewDetails")}
                  </button>
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
