"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useToursApi } from "@/hooks/useToursApi";
import { defaultLocale, locales } from "@/i18n/config";
import { resolveTourImageSrc } from "@/lib/tourImageSrc";

export default function ToursPage() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const currentLocale = locales.includes(segments[0] as (typeof locales)[number])
    ? segments[0]
    : defaultLocale;

  const { tours, loading, error } = useToursApi(15000);
  const prices = tours.map((t) => t.pricePerPerson);
  const minBound = prices.length ? Math.floor(Math.min(...prices)) : 0;
  const maxBound = prices.length ? Math.ceil(Math.max(...prices)) : 1000;

  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      if (
        searchQuery &&
        !tour.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !tour.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      const [currentMin, currentMax] = priceRange;
      if (tour.pricePerPerson < currentMin || tour.pricePerPerson > currentMax) {
        return false;
      }
      return true;
    });
  }, [tours, searchQuery, priceRange]);

  const handlePriceChange = (type: "min" | "max", value: number) => {
    if (!Number.isFinite(value)) return;
    const clampedValue = Math.min(Math.max(value, minBound), maxBound);

    if (type === "min") {
      const newMin = Math.min(clampedValue, maxPrice);
      setMinPrice(newMin);
      setPriceRange([newMin, maxPrice]);
    } else {
      const newMax = Math.max(clampedValue, minPrice);
      setMaxPrice(newMax);
      setPriceRange([minPrice, newMax]);
    }
  };

  const handleReset = () => {
    setSearchQuery("");
    setPriceRange([minBound, maxBound]);
    setMinPrice(minBound);
    setMaxPrice(maxBound);
  };

  useEffect(() => {
    if (prices.length && (minPrice === 0 || maxPrice === 10000000)) {
      setMinPrice(minBound);
      setMaxPrice(maxBound);
      setPriceRange([minBound, maxBound]);
    }
  }, [prices.length, minBound, maxBound, minPrice, maxPrice]);

  return (
    <div className="min-h-screen bg-[#151313]">
      {/* Page Header */}
      <div className="bg-[#1A0F0F] text-white py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h1 className="text-4xl sm:text-5xl font-playfair text-white tracking-wide text-center">
            Discover Armenia Tours
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          <aside className="w-full lg:w-[320px] lg:flex-shrink-0 lg:mr-6 space-y-6">
            <div className="bg-[#2B1D1A] p-6 rounded-lg">
              <h2 className="text-xl font-playfair text-white mb-6">Filters</h2>

              {/* Search Tour */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#D1B06B] mb-2">
                  Search Tour
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Select or search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg bg-[#3a2a27] border border-[#4a3a35] p-3 text-sm text-gray-200 pr-10"
                  />
                  <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#D1B06B] mb-3">
                  Price
                </label>
                <div className="space-y-4">
                  <div className="relative">
                    <div className="h-2 bg-[#3a2a27] rounded-lg relative">
                      <div
                        className="absolute h-2 bg-[#D1B06B] rounded-lg"
                        style={{
                          // Ensure the active track stays within [0, 100]% to avoid overflow
                          left: `${((priceRange[0] - minBound) / Math.max(1, maxBound - minBound)) * 100}%`,
                          width: `${((priceRange[1] - priceRange[0]) / Math.max(1, maxBound - minBound)) * 100}%`,
                        }}
                      />
                    </div>
                    <input
                      type="range"
                      min={minBound}
                      max={maxBound}
                      step="1000"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange("min", parseInt(e.target.value))}
                      className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer z-10"
                      style={{
                        background: "transparent",
                      }}
                    />
                    <input
                      type="range"
                      min={minBound}
                      max={maxBound}
                      step="1000"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange("max", parseInt(e.target.value))}
                      className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer z-10"
                      style={{
                        background: "transparent",
                      }}
                    />
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) =>
                        handlePriceChange(
                          "min",
                          e.target.value === "" ? minBound : parseInt(e.target.value, 10)
                        )
                      }
                      className="w-full rounded-lg bg-[#3a2a27] border border-[#4a3a35] p-2 text-sm text-gray-200"
                    />
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) =>
                        handlePriceChange(
                          "max",
                          e.target.value === "" ? maxBound : parseInt(e.target.value, 10)
                        )
                      }
                      className="w-full rounded-lg bg-[#3a2a27] border border-[#4a3a35] p-2 text-sm text-gray-200"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{minPrice.toLocaleString()}Դ</span>
                    <span>{maxPrice.toLocaleString()}Դ</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 rounded-lg bg-[#3a2a27] px-4 py-2 text-sm font-medium text-gray-300 hover:bg-[#4a3a35] transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={() => {}}
                  className="flex-1 rounded-lg bg-[#D1B06B] px-4 py-2 text-sm font-semibold text-[#1A0F0F] hover:bg-[#C1A05B] transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </aside>

          {/* Right Content - Tour Cards */}
          <main className="flex-1 min-w-0">
            <div className="mb-6">
              {loading ? <p className="text-gray-400 text-sm">Loading tours...</p> : null}
              {error ? <p className="text-red-300 text-sm">{error}</p> : null}
              <p className="text-gray-400 text-sm">
                Showing {filteredTours.length} tour{filteredTours.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2">
              {filteredTours.map((tour) => {
                const cardImage = resolveTourImageSrc(tour.mainImage, tour.imageUrl);
                return (
                <Link
                  key={tour.id}
                  href={`/${currentLocale}/tours/${tour.id}`}
                  className="flex h-full min-h-0 flex-col overflow-hidden rounded-lg bg-[#2B1D1A] shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="relative h-48 w-full shrink-0 overflow-hidden bg-[#1f140f]">
                    {cardImage ? (
                      <Image
                        src={cardImage}
                        alt={tour.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover"
                        unoptimized
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-grow flex-col p-6">
                    <h3 className="text-xl font-playfair text-white line-clamp-2">
                      {tour.name}
                    </h3>
                    <p className="mt-2 flex-grow text-sm leading-relaxed text-gray-400 line-clamp-2">
                      {tour.description}
                    </p>
                    <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                      <div className="min-w-0">
                        <p className="text-lg font-semibold text-[#D1B06B]">
                          {tour.pricePerPerson.toLocaleString()}Դ
                        </p>
                        <p className="text-xs text-gray-500">per tour</p>
                      </div>
                      <span className="shrink-0 rounded-lg bg-[#D1B06B] px-5 py-2 text-sm font-semibold text-[#1A0F0F]">
                        Details
                      </span>
                    </div>
                  </div>
                </Link>
                );
              })}
            </div>
            {filteredTours.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No tours found matching your criteria.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

