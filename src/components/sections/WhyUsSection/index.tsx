"use client";

export function WhyUsSection() {
  const testimonials = [
    {
      name: "Anna S.",
      review:
        "Amazing experience! Everything was organized perfectly and the wine tastings were unforgettable.",
      rating: 5,
    },
    {
      name: "Michael R.",
      review:
        "WineRoad tours give a true taste of Armenia. Friendly guides and beautiful vineyards.",
      rating: 5,
    },
    {
      name: "Sofia A.",
      review:
        "Loved every moment — the scenery, the wines, and the warm Armenian hospitality.",
      rating: 5,
    },
  ];

  return (
    <section className="bg-[#1C1311] px-6 py-20">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Section Header */}
        <div className="space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#D4AF78]">
            CUSTOMER SAYS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-[#F5F2EB]">
            What Our Guests Say
          </h2>
          <p className="mx-auto max-w-2xl text-base text-[#F5F2EB]/70">
            Real experiences from travelers who explored Armenia with WineRoad.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#2A1A17] border border-[#3A2520] rounded-xl p-6 md:p-8 shadow-[0_0_20px_rgba(212,175,120,0.15)] hover:shadow-[0_0_30px_rgba(212,175,120,0.25)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Customer Photo Placeholder */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF78]/20 to-[#D4AF78]/10 border border-[#D4AF78]/30 flex items-center justify-center">
                  <span className="text-[#D4AF78] font-semibold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-playfair font-semibold text-[#F5F2EB]">
                    {testimonial.name}
                  </h3>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-[#D4AF78]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-[#F5F2EB]/80 leading-relaxed">
                "{testimonial.review}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
