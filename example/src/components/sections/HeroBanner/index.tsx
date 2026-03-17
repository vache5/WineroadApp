"use client";

import Image from "next/image";
import { useState } from "react";

export function HeroBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const totalGuests = adults + children;
  const pricePerPerson = 180;
  const subtotal = totalGuests * pricePerPerson;

  // Calendar data for November 2024
  const calendarDays = [
    { day: null }, { day: null }, { day: null }, { day: null }, { day: 1 }, { day: 2 },
    { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 }, { day: 7 }, { day: 8 }, { day: 9 }, { day: 10 },
    { day: 11 }, { day: 12 }, { day: 13 }, { day: 14 }, { day: 15 }, { day: 16 },
    { day: 17 }, { day: 18 }, { day: 19 }, { day: 20 }, { day: 21 }, { day: 22 }, { day: 23 },
    { day: 24 }, { day: 25 }, { day: 26 }, { day: 27 }, { day: 28 }, { day: 29 }, { day: 30 }
  ];

  return (
    <>
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/armenian wine.jpg"
            alt="Armenian Wine"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Book Your Tour button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute right-4 top-20 z-20 rounded-md bg-amber-600 px-6 py-2 font-serif text-sm font-semibold text-[#1A0F0F] transition-all hover:bg-amber-500 md:right-8 md:top-24 md:px-8 md:py-3 md:text-base"
        >
          Book Your Tour
        </button>

        {/* Centered Content */}
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white md:px-8">
          <div className="space-y-6">
            <h1 className="font-serif text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Classic the Roots of Wine
              <br />
              Experience Armenia
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/90 md:text-lg lg:text-xl">
              Journeys into Ancient Vineyards, Cultural Treasures & Exquisite Tastes.
            </p>
          </div>
          <div className="mt-12 flex justify-center">
            <svg
              className="h-8 w-8 animate-bounce text-white md:h-10 md:w-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-2xl">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-2xl text-gray-500 hover:text-gray-700"
            >
              ×
            </button>

            <div className="p-8">
              <h2 className="mb-6 text-center font-serif text-2xl font-semibold text-gray-800">
                Select Your Tour
              </h2>

              <div className="mb-8 grid gap-6 md:grid-cols-2">
                {/* Left Column - Tour Selection */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-gray-700">Choose Your Tour</h3>
                  <div className="mb-4 flex items-center gap-3 rounded-lg border p-3">
                    <Image
                      src="/images/armenian wine.jpg"
                      alt="Tour"
                      width={50}
                      height={50}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">Classic Areni Valley Experience</span>
                  </div>

                  {/* Mini Calendar */}
                  <div className="grid grid-cols-7 gap-1 text-center text-xs">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                      <div key={day} className="font-semibold text-gray-500 py-1">
                        {day}
                      </div>
                    ))}
                    {calendarDays.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => item.day && setSelectedDate(item.day)}
                        className={`py-1.5 rounded ${
                          item.day
                            ? selectedDate === item.day
                              ? "bg-red-900 text-white"
                              : "hover:bg-gray-100"
                            : ""
                        } ${!item.day ? "invisible" : ""}`}
                        disabled={!item.day}
                      >
                        {item.day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Column - Guest Selection */}
                <div>
                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Adults Date
                    </label>
                    <input
                      type="number"
                      value={adults}
                      onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full rounded border px-3 py-2 text-center"
                      min="1"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Total Guests
                    </label>
                    <input
                      type="number"
                      value={totalGuests}
                      readOnly
                      className="w-full rounded border bg-gray-50 px-3 py-2 text-center"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Children •
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="rounded border px-3 py-1 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={children}
                        onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full rounded border px-3 py-2 text-center"
                        min="0"
                      />
                      <button
                        onClick={() => setChildren(children + 1)}
                        className="rounded border px-3 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="mb-6 rounded-lg border p-4">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-gray-600">Group Date</span>
                  <span className="text-gray-600">Group Size</span>
                </div>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm text-gray-600">Price per person: ${pricePerPerson}</span>
                  <span className="font-semibold">${pricePerPerson}</span>
                </div>
                <div className="flex items-center justify-between border-t pt-2">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-800">${subtotal}</span>
                    <div className="flex gap-1">
                      <div className="h-6 w-8 rounded bg-red-500"></div>
                      <div className="h-6 w-8 rounded bg-orange-400"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <h3 className="mb-4 text-center font-serif text-xl font-semibold text-gray-800">
                Total Price Secthord
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
                <input
                  type="text"
                  placeholder="Customer"
                  className="rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
                <input
                  type="text"
                  placeholder="Lorem Card"
                  className="rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>

              {/* Book Button */}
              <button className="mt-6 w-full rounded-md bg-[#4A1C1C] py-3 font-semibold text-white transition-colors hover:bg-[#5A2C2C]">
                Confirm & Book Now
              </button>

              {/* Footer */}
              <p className="mt-4 text-center text-xs text-gray-500">
                Secure Payment Guaranteed
                <br />
                © www.insidetourtravel.am issue forex issues. all sales properties issues.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}