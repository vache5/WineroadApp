"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { toursData, type Tour } from "@/data/tours";

export default function ToursPage() {
  // Clamp price controls to realistic tour prices
  const MIN_PRICE = 20000;
  const MAX_PRICE = 200000;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDuration, setSelectedDuration] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    MIN_PRICE,
    MAX_PRICE,
  ]);
  const [minPrice, setMinPrice] = useState(MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);

  const durationOptions = [
    { value: "all", label: "All" },
    { value: "upTo4", label: "Up to 4 hours" },
    { value: "upTo7", label: "Up to 7 hours" },
    { value: "9plus", label: "9 hours and more" },
  ];

  const filteredTours = useMemo(() => {
    return toursData.filter((tour) => {
      // Search filter
      if (searchQuery && !tour.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !tour.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Duration filter
      if (selectedDuration !== "all") {
        if (selectedDuration === "upTo4" && tour.duration > 4) return false;
        if (selectedDuration === "upTo7" && (tour.duration <= 4 || tour.duration > 7)) return false;
        if (selectedDuration === "9plus" && tour.duration < 9) return false;
      }

      // Price filter (clamped)
      const [currentMin, currentMax] = priceRange;
      if (tour.price < currentMin || tour.price > currentMax) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedDuration, priceRange]);

  const handlePriceChange = (type: "min" | "max", value: number) => {
    // Guard against NaN or undefined
    if (!Number.isFinite(value)) return;

    // Clamp incoming value to allowed bounds
    const clampedValue = Math.min(Math.max(value, MIN_PRICE), MAX_PRICE);

    if (type === "min") {
      // New min cannot exceed current max
      const newMin = Math.min(clampedValue, maxPrice);
      setMinPrice(newMin);
      setPriceRange([newMin, maxPrice]);
    } else {
      // New max cannot be below current min
      const newMax = Math.max(clampedValue, minPrice);
      setMaxPrice(newMax);
      setPriceRange([minPrice, newMax]);
    }
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedDuration("all");
    setPriceRange([MIN_PRICE, MAX_PRICE]);
    setMinPrice(MIN_PRICE);
    setMaxPrice(MAX_PRICE);
  };

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

              {/* Duration */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#D1B06B] mb-3">
                  Duration
                </label>
                <div className="flex flex-col gap-2">
                  {durationOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedDuration(option.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedDuration === option.value
                          ? "bg-[#D1B06B] text-[#1A0F0F]"
                          : "bg-[#3a2a27] text-gray-300 hover:bg-[#4a3a35]"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
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
                          left: `${((priceRange[0] - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
                          width: `${((priceRange[1] - priceRange[0]) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
                        }}
                      />
                    </div>
                    <input
                      type="range"
                      min={MIN_PRICE}
                      max={MAX_PRICE}
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
                      min={MIN_PRICE}
                      max={MAX_PRICE}
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
                          e.target.value === "" ? MIN_PRICE : parseInt(e.target.value, 10)
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
                          e.target.value === "" ? MAX_PRICE : parseInt(e.target.value, 10)
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
              <p className="text-gray-400 text-sm">
                Showing {filteredTours.length} tour{filteredTours.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {filteredTours.map((tour) => (
                <Link
                  key={tour.id}
                  href={`/tours/${tour.id}`}
                  className="bg-[#2B1D1A] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] block"
                >
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-playfair text-white mb-2 line-clamp-2">
                      {tour.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {tour.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#D1B06B] font-semibold text-lg">
                          {tour.price.toLocaleString()}Դ
                        </p>
                        <p className="text-gray-500 text-xs">per tour</p>
                      </div>
                      <div className="rounded-lg bg-[#D1B06B] px-6 py-2 text-sm font-semibold text-[#1A0F0F]">
                        Details
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
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

