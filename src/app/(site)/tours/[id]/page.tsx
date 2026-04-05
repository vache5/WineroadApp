"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { publicJson } from "@/lib/api/adminClient";
import type { ApiTour } from "@/types/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { defaultLocale, locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { tourStrings } from "@/lib/tourLocale";
import { toBrowserImageSrc } from "@/lib/tourImageSrc";

const FORMSPREE_TOUR_ORDER_URL = "https://formspree.io/f/mvzvbwgn";

export default function TourDetailsPage() {
  const { t } = useTranslation("common");
  const params = useParams();
  const pathname = usePathname();
  const tourId = params?.id as string;
  const segments = pathname.split("/").filter(Boolean);
  const currentLocale: Locale = locales.includes(segments[0] as Locale)
    ? (segments[0] as Locale)
    : defaultLocale;
  const [tour, setTour] = useState<ApiTour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [peopleCount, setPeopleCount] = useState(1);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [bookingState, setBookingState] = useState<"idle" | "submitting" | "error">("idle");
  const [bookingMsg, setBookingMsg] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setError(null);
        const data = await publicJson<ApiTour>(`/tours/${tourId}`);
        if (!cancelled) setTour(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Tour not found");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [tourId]);

  const allImages = useMemo(() => {
    if (!tour) return [];
    const urls: string[] = [];
    const add = (u?: string | null) => {
      const s = toBrowserImageSrc(u);
      if (s && !urls.includes(s)) urls.push(s);
    };
    add(tour.mainImage);
    add(tour.imageUrl);
    for (const u of tour.galleryImages ?? []) add(u);
    return urls;
  }, [tour]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#151313] flex items-center justify-center">
        <p className="text-white/70">Loading tour...</p>
      </div>
    );
  }
  if (!tour) {
    return (
      <div className="min-h-screen bg-[#151313] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">{error ?? "Tour not found"}</p>
          <Link href={`/${currentLocale}/tours`} className="text-[#D1B06B] hover:underline">
            Back to Tours
          </Link>
        </div>
      </div>
    );
  }
  const copy = tourStrings(tour, currentLocale);
  const selectedImage = allImages[selectedImageIndex];
  const totalPrice = tour.pricePerPerson * peopleCount;

  const handlePreviousImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handleBookNow = async () => {
    if (!selectedDate) {
      setBookingState("error");
      setBookingMsg(t("tourDetail.errorSelectDate"));
      return;
    }
    if (!userName.trim() || !userEmail.trim()) {
      setBookingState("error");
      setBookingMsg(t("tourDetail.errorNameEmail"));
      return;
    }
    setBookingState("submitting");
    setBookingMsg("");
    try {
      const res = await fetch(FORMSPREE_TOUR_ORDER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: userName.trim(),
          email: userEmail.trim(),
          tour_id: tour.id,
          tour_name: copy.title,
          preferred_date: selectedDate,
          number_of_people: peopleCount,
          price_per_person_amd: tour.pricePerPerson,
          total_amd: totalPrice,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        throw new Error(data.error ?? t("tourDetail.bookingFailed"));
      }
      toast.success(t("tourDetail.bookingSuccess"));
      setSelectedDate("");
      setPeopleCount(1);
      setUserName("");
      setUserEmail("");
      setBookingState("idle");
      setBookingMsg("");
    } catch (e) {
      setBookingState("error");
      setBookingMsg(e instanceof Error ? e.message : t("tourDetail.bookingFailed"));
    }
  };

  return (
    <div className="min-h-screen bg-[#151313]">
      {/* Header */}
      <div className="bg-[#1A0F0F] text-white py-8">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Link
            href={`/${currentLocale}/tours`}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#D1B06B] transition-colors mb-4"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Tours
          </Link>
          <h1 className="text-3xl sm:text-4xl font-playfair text-white tracking-wide">
            {copy.title}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Image Carousel (70% on large screens) */}
          <div className="w-full lg:w-[70%] space-y-4">
            {/* Main Image */}
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#2B1D1A]">
              {selectedImage ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={selectedImage} alt={copy.title} className="h-full w-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white/35 text-sm">
                  No photos yet
                </div>
              )}

              {/* Navigation Arrows */}
              {allImages.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={handlePreviousImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                    aria-label="Previous image"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                    aria-label="Next image"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              ) : null}

              {/* Image Indicator */}
              {allImages.length > 1 ? (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {allImages.map((_, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === selectedImageIndex
                          ? "w-8 bg-[#D1B06B]"
                          : "w-2 bg-white/50 hover:bg-white/70"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              ) : null}
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    index === selectedImageIndex
                      ? "border-[#D1B06B]"
                      : "border-transparent hover:border-gray-500"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt={`${copy.title} - Image ${index + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            {/* Description Section */}
            <div className="bg-[#2B1D1A] p-6 rounded-lg space-y-6">
              <div>
                <h2 className="text-2xl font-playfair text-white mb-4">{t("tourDetail.overviewHeading")}</h2>
                <p className="text-gray-300 leading-relaxed">{copy.description}</p>
              </div>

              {/* Tour Info */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-700">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{t("tourDetail.durationLabel")}</p>
                  <p className="text-white font-medium">{copy.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{t("tourDetail.departureDateLabel")}</p>
                  <p className="text-white font-medium">{tour.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{t("tourDetail.priceLabel")}</p>
                  <p className="text-[#D1B06B] font-semibold">{tour.pricePerPerson.toLocaleString()}Դ</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Booking Box (30% on large screens) */}
          <div className="w-full lg:w-[30%] lg:flex-shrink-0">
            <div className="bg-[#2B1D1A] p-6 rounded-lg shadow-lg sticky top-24 space-y-6">
              <div>
                <h3 className="text-2xl font-playfair text-white mb-2">{t("tourDetail.bookThisTour")}</h3>
                <p className="text-gray-400 text-sm">{t("tourDetail.reserveSubtitle")}</p>
              </div>

              <div className="space-y-4">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-[#D1B06B] mb-2">
                    {t("tourDetail.selectDate")}
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-lg bg-[#3a2a27] border border-[#4a3a35] p-3 text-sm text-gray-200 focus:outline-none focus:border-[#D1B06B] transition-colors"
                  />
                </div>

                {/* People Count */}
                <div>
                  <label className="block text-sm font-medium text-[#D1B06B] mb-2">
                    {t("tourDetail.numberOfPeople")}
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}
                      className="w-10 h-10 rounded-lg bg-[#3a2a27] border border-[#4a3a35] text-white hover:bg-[#4a3a35] transition-colors flex items-center justify-center"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 12H4"
                        />
                      </svg>
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={50}
                      value={peopleCount}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 1;
                        setPeopleCount(Math.min(Math.max(1, value), 50));
                      }}
                      className="flex-1 rounded-lg bg-[#3a2a27] border border-[#4a3a35] p-3 text-sm text-gray-200 text-center focus:outline-none focus:border-[#D1B06B] transition-colors"
                    />
                    <button
                      onClick={() => setPeopleCount(Math.min(50, peopleCount + 1))}
                      className="w-10 h-10 rounded-lg bg-[#3a2a27] border border-[#4a3a35] text-white hover:bg-[#4a3a35] transition-colors flex items-center justify-center"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{t("tourDetail.maxPeopleHint")}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#D1B06B] mb-2">{t("tourDetail.yourName")}</label>
                  <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full rounded-lg bg-[#3a2a27] border border-[#4a3a35] p-3 text-sm text-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#D1B06B] mb-2">{t("tourDetail.yourEmail")}</label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full rounded-lg bg-[#3a2a27] border border-[#4a3a35] p-3 text-sm text-gray-200"
                  />
                </div>

                {/* Price Display */}
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">{t("tourDetail.pricePerPerson")}</span>
                    <span className="text-white font-medium">{tour.pricePerPerson.toLocaleString()}Դ</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-300">{t("tourDetail.people")}</span>
                    <span className="text-white font-medium">{t("tourDetail.peopleCountLine", { count: peopleCount })}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                    <span className="text-lg font-semibold text-white">{t("tourDetail.total")}</span>
                    <span className="text-2xl font-bold text-[#D1B06B]">
                      {totalPrice.toLocaleString()}Դ
                    </span>
                  </div>
                </div>

                {/* Book Button */}
                <button
                  onClick={handleBookNow}
                  disabled={!selectedDate || bookingState === "submitting"}
                  className="w-full rounded-lg bg-[#D1B06B] px-6 py-4 text-lg font-semibold text-[#1A0F0F] hover:bg-[#C1A05B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {bookingState === "submitting" ? t("tourDetail.bookingSubmitting") : t("tourDetail.bookNow")}
                </button>
                {bookingMsg && bookingState === "error" ? (
                  <p className="text-sm text-red-300">{bookingMsg}</p>
                ) : null}

                <p className="text-xs text-gray-400 text-center">{t("tourDetail.freeCancellation")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

