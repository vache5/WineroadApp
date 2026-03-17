export default function WhyChooseWineroad() {
  const values = [
    {
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Expert Local Guides",
      description:
        "Our knowledgeable guides share deep insights into Armenian wine culture and history, ensuring an authentic and educational experience.",
    },
    {
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
          />
        </svg>
      ),
      title: "Authentic Wine Experiences",
      description:
        "Discover traditional winemaking methods and taste premium Armenian wines directly from historic vineyards and family-owned cellars.",
    },
    {
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
      title: "Comfortable Transportation",
      description:
        "Travel in style with our modern, air-conditioned vehicles and professional drivers ensuring a safe and comfortable journey.",
    },
    {
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      title: "Safe & Reliable Service",
      description:
        "We prioritize your safety and satisfaction with secure online booking, comprehensive insurance, and 24/7 customer support.",
    },
  ];

  return (
    <section className="bg-[#1E1411] py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-[#F2EDE8] mb-4">
            Why Choose Wineroad
          </h2>
          <p className="text-lg text-[#F2EDE8]/80 max-w-2xl mx-auto mb-6">
            Experience the best of Armenian wine culture with our expertly curated tours and exceptional service
          </p>
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-[#D7B46A] rounded-full"></div>
          </div>
        </div>

        {/* Value Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-[#2A1C17] rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="text-[#D7B46A] mb-4">{value.icon}</div>
              <h3 className="text-xl font-playfair font-semibold text-[#F2EDE8] mb-3">
                {value.title}
              </h3>
              <p className="text-[#F2EDE8]/80 text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

