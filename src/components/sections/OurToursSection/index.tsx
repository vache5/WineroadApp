"use client";

import Link from "next/link";
import Image from "next/image";
import { toursData } from "@/data/tours";

export default function OurToursSection() {
  // Get first 3 tours from toursData
  const featuredTours = toursData.slice(0, 3);

  return (
    <section className="bg-[#1A0F0F] py-10 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-[#FFFFFF] mb-4">
            Armenian Wine Tours
          </h2>
          <p className="text-lg md:text-xl text-[#E2E2E2] max-w-2xl mx-auto leading-relaxed">
            Discover the rich heritage of Armenian winemaking through our expertly curated tours
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredTours.map((tour) => (
            <Link
              key={tour.id}
              href={`/tours/${tour.id}`}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:scale-[1.02] hover:border-2 hover:border-[#D1B06B] border-2 border-transparent transition-all duration-300"
            >
              {/* Image */}
              <div className="relative w-full aspect-video bg-gray-300">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="p-6 space-y-4">
                {/* Location/Category */}
                <p className="text-sm text-[#2b1d19]/60 font-medium">
                  {tour.location}
                </p>

                {/* Title */}
                <h3 className="text-xl font-playfair font-bold text-[#2b1d19] leading-tight line-clamp-2">
                  {tour.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#2b1d19]/70 line-clamp-2">
                  {tour.description}
                </p>

                {/* Price and Button Row */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="text-2xl font-bold text-[#2b1d19]">
                      {tour.price.toLocaleString()}Դ
                    </p>
                    <p className="text-xs text-[#2b1d19]/60">per tour</p>
                  </div>
                  <button className="rounded-full bg-[#D1B06B] hover:bg-[#C7A158] text-[#1A0F0F] font-semibold px-6 py-2.5 text-sm transition-colors duration-200 shadow-md hover:shadow-lg">
                    View Details
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Tours Button */}
        <div className="text-center">
          <Link
            href="/tours"
            className="inline-block bg-[#D1B06B] hover:bg-[#C7A158] text-[#1A0F0F] font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            View All Tours
          </Link>
        </div>
      </div>
    </section>
  );
}
