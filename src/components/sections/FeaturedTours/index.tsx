"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useToursApi } from "@/hooks/useToursApi";
import { defaultLocale, locales } from "@/i18n/config";
import { resolveTourImageSrc } from "@/lib/tourImageSrc";

export default function FeaturedTours() {
  const { t } = useTranslation("common");
  const pathname = usePathname();
  const { tours } = useToursApi(20000);
  const [selectedTour, setSelectedTour] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const segments = pathname.split("/").filter(Boolean);
  const currentLocale = locales.includes(segments[0] as (typeof locales)[number])
    ? segments[0]
    : defaultLocale;

  const selectedTourData = tours.find((t) => t.id === selectedTour) ?? tours[0];
  const featuredTours = tours.slice(0, 2);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with Parallax Effect */}
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
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-[#F5E3C3] mb-4 tracking-wider uppercase">
            {t("homepage.featuredHeading")}
          </h2>
          <div className="w-24 h-0.5 bg-[#CFA56A] mx-auto" />
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT COLUMN */}
          <div className="flex flex-col space-y-12">
            {/* Overview Section */}
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

            {/* What's Included Section */}
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

            {/* Guest Reviews Section */}
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

          {/* RIGHT COLUMN */}
          <div className="flex flex-col space-y-8">
            {/* Booking Box Card */}
            <div className="bg-[#1A0F0A] rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-[#F5E3C3] mb-6 text-center tracking-wide">
                {t("homepage.bookingTitle")}
              </h3>
              <div className="space-y-5">
                {/* Tour Selection */}
                <div>
                  <label className="block text-sm text-[#D8D3CC] mb-2 font-medium">{t("homepage.tourLabel")}</label>
                  <select
                    value={selectedTour || selectedTourData?.id || ""}
                    onChange={(e) => setSelectedTour(e.target.value)}
                    className="w-full bg-[#1A0F0A] border border-[#CFA56A] rounded-lg px-4 py-3 text-[#F5E3C3] focus:outline-none focus:border-[#D6A85A] focus:ring-2 focus:ring-[#D6A85A]/30 transition-colors"
                  >
                    {tours.map((tour) => (
                      <option key={tour.id} value={tour.id} className="bg-[#1A0F0A] text-[#F5E3C3]">
                        {tour.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-sm text-[#D8D3CC] mb-2 font-medium">{t("homepage.dateLabel")}</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#1A0F0A] border border-[#CFA56A] rounded-lg px-4 py-3 text-[#F5E3C3] focus:outline-none focus:border-[#D6A85A] focus:ring-2 focus:ring-[#D6A85A]/30 transition-colors"
                  />
                </div>

                {/* Destination */}
                <div>
                  <label className="block text-sm text-[#D8D3CC] mb-2 font-medium">{t("homepage.destinationLabel")}</label>
                  <input
                    type="text"
                    value={selectedDestination || selectedTourData?.duration || ""}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    placeholder={t("homepage.destinationPlaceholder")}
                    className="w-full bg-[#1A0F0A] border border-[#CFA56A] rounded-lg px-4 py-3 text-[#F5E3C3] focus:outline-none focus:border-[#D6A85A] focus:ring-2 focus:ring-[#D6A85A]/30 placeholder:text-[#D8D3CC]/50 transition-colors"
                  />
                </div>

                {/* Price Display */}
                <div className="pt-4 border-t border-[#CFA56A]/30 flex justify-between items-center">
                  <span className="text-[#D8D3CC] text-sm font-medium">{t("homepage.priceFrom")}</span>
                  <span className="text-[#F5E3C3] font-bold text-lg">
                    {selectedTourData
                      ? `${selectedTourData.pricePerPerson.toLocaleString()}Դ ${t("homepage.perPerson")}`
                      : "—"}
                  </span>
                </div>
              </div>
            </div>

            {/* Photo Gallery Card */}
            <div className="bg-[#1A0F0A] rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-[#F5E3C3] mb-6 text-center tracking-wide">
                {t("homepage.photoGalleryTitle")}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {featuredTours.map((tour) => {
                  const gallerySrc = resolveTourImageSrc(tour.mainImage, tour.imageUrl);
                  return (
                  <div key={tour.id} className="space-y-3">
                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-md">
                      {gallerySrc ? (
                        <Image
                          src={gallerySrc}
                          alt={tour.name}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div
                          className="absolute inset-0 bg-[#2a1810]"
                          aria-hidden
                        />
                      )}
                    </div>
                    <p className="text-[#D8D3CC] text-sm leading-relaxed line-clamp-2" style={{ lineHeight: "1.6" }}>
                      {tour.description}
                    </p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-[#D6A85A]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <Link
                      href={`/${currentLocale}/tours/${tour.id}`}
                      className="block w-full bg-[#D6A85A] hover:bg-[#CFA56A] text-[#1A0F0A] font-bold py-2.5 px-4 rounded-lg text-center text-sm transition-colors shadow-md"
                    >
                      {t("homepage.viewTour")}
                    </Link>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
