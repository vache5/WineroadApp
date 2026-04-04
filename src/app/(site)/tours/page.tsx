"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

import { useToursApi } from "@/hooks/useToursApi";
import { defaultLocale, locales } from "@/i18n/config";
import { tourDisplayName } from "@/lib/tourDisplayName";
import { resolveTourImageSrc } from "@/lib/tourImageSrc";
import type { ApiTour } from "@/types/api";

type SortKey = "default" | "price-asc" | "price-desc" | "name";

function clamp(n: number, lo: number, hi: number) {
  return Math.min(Math.max(n, lo), hi);
}

const inputClassName =
  "w-full rounded-xl border border-[#4a3a35] bg-[#3a2a27] px-3 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 outline-none transition focus:border-[#D1B06B]/70 focus:ring-2 focus:ring-[#D1B06B]/25";
const labelClassName = "mb-2 block text-xs font-semibold uppercase tracking-wider text-[#D1B06B]/90";

export default function ToursPage() {
  const { t } = useTranslation("common");
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const currentLocale = locales.includes(segments[0] as (typeof locales)[number])
    ? segments[0]
    : defaultLocale;

  const { tours, loading, error } = useToursApi(15000);

  const stats = useMemo(() => {
    if (!tours.length) return { minPrice: 0, maxPrice: 0 };
    const prices = tours.map((x) => x.pricePerPerson);
    return { minPrice: Math.min(...prices), maxPrice: Math.max(...prices) };
  }, [tours]);

  const durationOptions = useMemo(() => {
    const set = new Set<string>();
    for (const tour of tours) {
      const d = tour.duration?.trim();
      if (d) set.add(d);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [tours]);

  const [searchQuery, setSearchQuery] = useState("");
  const [duration, setDuration] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("default");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!tours.length) return;
    if (!initialized.current) {
      initialized.current = true;
      setMinPrice(stats.minPrice);
      setMaxPrice(stats.maxPrice);
    }
  }, [tours.length, stats.minPrice, stats.maxPrice]);

  const filteredTours = useMemo(() => {
    if (!tours.length) return [];
    const q = searchQuery.trim().toLowerCase();
    const lo = minPrice ?? stats.minPrice;
    const hi = maxPrice ?? stats.maxPrice;
    const safeMin = Math.min(lo, hi);
    const safeMax = Math.max(lo, hi);

    const list = tours.filter((tour) => {
      if (q) {
        const name = tour.name.toLowerCase();
        const desc = tour.description.toLowerCase();
        if (!name.includes(q) && !desc.includes(q)) return false;
      }
      if (duration !== "all" && tour.duration.trim() !== duration) return false;
      if (tour.pricePerPerson < safeMin || tour.pricePerPerson > safeMax) return false;
      return true;
    });

    const next = [...list];
    switch (sort) {
      case "price-asc":
        next.sort((a, b) => a.pricePerPerson - b.pricePerPerson);
        break;
      case "price-desc":
        next.sort((a, b) => b.pricePerPerson - a.pricePerPerson);
        break;
      case "name":
        next.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return next;
  }, [tours, searchQuery, duration, sort, minPrice, maxPrice, stats.minPrice, stats.maxPrice]);

  const handleReset = () => {
    setSearchQuery("");
    setDuration("all");
    setSort("default");
    if (tours.length) {
      setMinPrice(stats.minPrice);
      setMaxPrice(stats.maxPrice);
    }
  };

  const syncMinMax = (nextMin: number, nextMax: number) => {
    const a = clamp(nextMin, stats.minPrice, stats.maxPrice);
    const b = clamp(nextMax, stats.minPrice, stats.maxPrice);
    if (a <= b) {
      setMinPrice(a);
      setMaxPrice(b);
    } else {
      setMinPrice(b);
      setMaxPrice(a);
    }
  };

  const currency = t("toursPage.currency");

  return (
    <div className="min-h-screen bg-[#151313]" suppressHydrationWarning>
      <div className="border-b border-[#D4A755]/20 bg-[#1A0F0F] py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h1 className="text-center font-playfair text-4xl tracking-wide sm:text-5xl">
            {t("toursPage.pageTitle")}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          <aside className="w-full shrink-0 lg:w-[300px] xl:w-[320px]">
            <div className="rounded-2xl border border-[#D4A755]/15 bg-[#2B1D1A] p-5 shadow-lg lg:sticky lg:top-24">
              <h2 className="mb-5 font-playfair text-lg text-white">{t("toursPage.filtersTitle")}</h2>

              <div className="space-y-5">
                <div>
                  <label className={labelClassName} htmlFor="tour-search">
                    {t("toursPage.searchLabel")}
                  </label>
                  <div className="relative">
                    <input
                      id="tour-search"
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t("toursPage.searchPlaceholder")}
                      className={`${inputClassName} pr-10`}
                      autoComplete="off"
                    />
                    <svg
                      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D1B06B]/70"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                <div>
                  <label className={labelClassName} htmlFor="tour-duration">
                    {t("toursPage.durationLabel")}
                  </label>
                  <select
                    id="tour-duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className={inputClassName}
                    disabled={!durationOptions.length}
                  >
                    <option value="all">{t("toursPage.durationAll")}</option>
                    {durationOptions.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClassName} htmlFor="tour-sort">
                    {t("toursPage.sortLabel")}
                  </label>
                  <select
                    id="tour-sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    className={inputClassName}
                  >
                    <option value="default">{t("toursPage.sortDefault")}</option>
                    <option value="price-asc">{t("toursPage.sortPriceAsc")}</option>
                    <option value="price-desc">{t("toursPage.sortPriceDesc")}</option>
                    <option value="name">{t("toursPage.sortName")}</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClassName} htmlFor="tour-min-price">
                      {t("toursPage.priceMin")}
                    </label>
                    <input
                      id="tour-min-price"
                      type="number"
                      inputMode="numeric"
                      min={stats.minPrice}
                      max={stats.maxPrice}
                      disabled={!tours.length}
                      value={minPrice ?? ""}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === "") return;
                        const n = Number(v);
                        if (!Number.isFinite(n)) return;
                        syncMinMax(n, maxPrice ?? stats.maxPrice);
                      }}
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label className={labelClassName} htmlFor="tour-max-price">
                      {t("toursPage.priceMax")}
                    </label>
                    <input
                      id="tour-max-price"
                      type="number"
                      inputMode="numeric"
                      min={stats.minPrice}
                      max={stats.maxPrice}
                      disabled={!tours.length}
                      value={maxPrice ?? ""}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === "") return;
                        const n = Number(v);
                        if (!Number.isFinite(n)) return;
                        syncMinMax(minPrice ?? stats.minPrice, n);
                      }}
                      className={inputClassName}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  disabled={!tours.length}
                  className="w-full rounded-xl border border-[#D4A755]/35 bg-[#3a2a27] px-4 py-2.5 text-sm font-medium text-gray-200 transition hover:border-[#D4A755]/55 hover:bg-[#4a3a35] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t("toursPage.reset")}
                </button>
              </div>
            </div>
          </aside>

          <main className="min-w-0 flex-1">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                {loading ? (
                  <p className="text-sm text-gray-400">{t("ourTours.loading")}</p>
                ) : null}
                {error ? <p className="text-sm text-red-300">{error}</p> : null}
                {!loading && !error ? (
                  <p className="text-sm text-gray-400">
                    {t("toursPage.showing", {
                      filtered: filteredTours.length,
                      total: tours.length,
                    })}
                  </p>
                ) : null}
              </div>
              {searchQuery.trim() ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="self-start text-sm font-medium text-[#D1B06B] underline-offset-4 hover:underline sm:self-center"
                >
                  {t("toursPage.clearSearch")}
                </button>
              ) : null}
            </div>

            <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2">
              {filteredTours.map((tour: ApiTour) => {
                const cardImage = resolveTourImageSrc(tour.mainImage, tour.imageUrl);
                return (
                  <Link
                    key={tour.id}
                    href={`/${currentLocale}/tours/${tour.id}`}
                    className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-white/5 bg-[#2B1D1A] shadow-lg transition hover:border-[#D4A755]/25 hover:shadow-xl"
                  >
                    <div className="relative h-48 w-full shrink-0 overflow-hidden bg-[#1f140f]">
                      {cardImage ? (
                        <Image
                          src={cardImage}
                          alt={tourDisplayName(tour.name)}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover"
                          unoptimized
                        />
                      ) : null}
                    </div>
                    <div className="flex flex-grow flex-col p-6">
                      <h3 className="line-clamp-2 font-playfair text-xl text-white">
                        {tourDisplayName(tour.name)}
                      </h3>
                      <p className="mt-2 line-clamp-2 flex-grow text-sm leading-relaxed text-gray-400">
                        {tour.description}
                      </p>
                      {tour.duration?.trim() ? (
                        <p className="mt-3 text-xs text-gray-500">{tour.duration}</p>
                      ) : null}
                      <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                        <div className="min-w-0">
                          <p className="text-lg font-semibold text-[#D1B06B]">
                            {tour.pricePerPerson.toLocaleString()}
                            {currency}
                          </p>
                          <p className="text-xs text-gray-500">{t("ourTours.perTour")}</p>
                        </div>
                        <span className="shrink-0 rounded-lg bg-[#D1B06B] px-5 py-2 text-sm font-semibold text-[#1A0F0F]">
                          {t("ourTours.viewDetails")}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {!loading && !error && filteredTours.length === 0 && tours.length > 0 ? (
              <div className="py-16 text-center">
                <p className="text-lg text-gray-400">{t("toursPage.noResults")}</p>
              </div>
            ) : null}
          </main>
        </div>
      </div>
    </div>
  );
}
