"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTourById } from "@/data/tours";

export default function TourDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const tourId = params?.id as string;
  const tour = getTourById(tourId);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [peopleCount, setPeopleCount] = useState(1);

  useEffect(() => {
    if (!tour) {
      router.push("/tours");
    }
  }, [tour, router]);

  if (!tour) {
    return (
      <div className="min-h-screen bg-[#151313] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Tour not found</p>
          <Link
            href="/tours"
            className="text-[#D1B06B] hover:underline"
          >
            Back to Tours
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [tour.image, ...tour.gallery];
  const selectedImage = allImages[selectedImageIndex];
  const totalPrice = tour.price * peopleCount;

  const handlePreviousImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handleBookNow = () => {
    // Handle booking logic here
    alert(`Booking ${tour.title} for ${peopleCount} people on ${selectedDate || "selected date"}`);
  };

  return (
    <div className="min-h-screen bg-[#151313]">
      {/* Header */}
      <div className="bg-[#1A0F0F] text-white py-8">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Link
            href="/tours"
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
            {tour.title}
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
              <Image
                src={selectedImage}
                alt={tour.title}
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover"
                priority
              />
              
              {/* Navigation Arrows */}
              <button
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

              {/* Image Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {allImages.map((_, index) => (
                  <button
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
                  <Image
                    src={image}
                    alt={`${tour.title} - Image ${index + 1}`}
                    fill
                    sizes="(max-width: 1024px) 25vw, 17.5vw"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Description Section */}
            <div className="bg-[#2B1D1A] p-6 rounded-lg space-y-6">
              <div>
                <h2 className="text-2xl font-playfair text-white mb-4">Overview</h2>
                <p className="text-gray-300 leading-relaxed">{tour.fullDescription}</p>
              </div>

              {/* Tour Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-700">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Duration</p>
                  <p className="text-white font-medium">{tour.duration} hours</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Location</p>
                  <p className="text-white font-medium">{tour.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Max People</p>
                  <p className="text-white font-medium">{tour.maxPeople}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Price</p>
                  <p className="text-[#D1B06B] font-semibold">{tour.price.toLocaleString()}Դ</p>
                </div>
              </div>
            </div>

            {/* Included / Excluded */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#2B1D1A] p-6 rounded-lg">
                <h3 className="text-xl font-playfair text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">✅</span>
                  What's Included
                </h3>
                <ul className="space-y-2">
                  {tour.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300">
                      <span className="text-[#D1B06B] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#2B1D1A] p-6 rounded-lg">
                <h3 className="text-xl font-playfair text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">❌</span>
                  Not Included
                </h3>
                <ul className="space-y-2">
                  {tour.excludes.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300">
                      <span className="text-gray-500 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Features Icons Row */}
            <div className="bg-[#2B1D1A] p-6 rounded-lg">
              <h3 className="text-xl font-playfair text-white mb-4">Tour Features</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                {tour.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg bg-[#3a2a27] hover:bg-[#4a3a35] transition-colors"
                  >
                    <span className="text-3xl">{feature.icon}</span>
                    <span className="text-xs text-gray-300 text-center">{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Booking Box (30% on large screens) */}
          <div className="w-full lg:w-[30%] lg:flex-shrink-0">
            <div className="bg-[#2B1D1A] p-6 rounded-lg shadow-lg sticky top-24 space-y-6">
              <div>
                <h3 className="text-2xl font-playfair text-white mb-2">Book This Tour</h3>
                <p className="text-gray-400 text-sm">Reserve your spot today</p>
              </div>

              <div className="space-y-4">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-[#D1B06B] mb-2">
                    Select Date
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
                    Number of People
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
                      max={tour.maxPeople}
                      value={peopleCount}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 1;
                        setPeopleCount(Math.min(Math.max(1, value), tour.maxPeople));
                      }}
                      className="flex-1 rounded-lg bg-[#3a2a27] border border-[#4a3a35] p-3 text-sm text-gray-200 text-center focus:outline-none focus:border-[#D1B06B] transition-colors"
                    />
                    <button
                      onClick={() => setPeopleCount(Math.min(tour.maxPeople, peopleCount + 1))}
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
                  <p className="text-xs text-gray-400 mt-1">
                    Maximum {tour.maxPeople} people
                  </p>
                </div>

                {/* Price Display */}
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Price per person</span>
                    <span className="text-white font-medium">{tour.price.toLocaleString()}Դ</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-300">People</span>
                    <span className="text-white font-medium">× {peopleCount}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                    <span className="text-lg font-semibold text-white">Total</span>
                    <span className="text-2xl font-bold text-[#D1B06B]">
                      {totalPrice.toLocaleString()}Դ
                    </span>
                  </div>
                </div>

                {/* Book Button */}
                <button
                  onClick={handleBookNow}
                  disabled={!selectedDate}
                  className="w-full rounded-lg bg-[#D1B06B] px-6 py-4 text-lg font-semibold text-[#1A0F0F] hover:bg-[#C1A05B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  Book Now
                </button>

                <p className="text-xs text-gray-400 text-center">
                  Free cancellation up to 24 hours before tour
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

