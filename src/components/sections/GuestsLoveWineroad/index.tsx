"use client";

import { useTranslation } from "react-i18next";

export default function GuestsLoveWineroad() {
  const { t } = useTranslation("common");

  const features = [
    {
      icon: (
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
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: t("guests.features.guides.title"),
      description: t("guests.features.guides.description"),
    },
    {
      icon: (
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
            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
          />
        </svg>
      ),
      title: t("guests.features.wine.title"),
      description: t("guests.features.wine.description"),
    },
    {
      icon: (
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
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
      title: t("guests.features.transport.title"),
      description: t("guests.features.transport.description"),
    },
    {
      icon: (
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
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      title: t("guests.features.service.title"),
      description: t("guests.features.service.description"),
    },
  ];

  return (
    <section className="bg-[#151313] py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Shared Heading Area */}
        <div className="text-center space-y-4 mb-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#D1B06B]">
            {t("guests.eyebrow")}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-white">
            {t("guests.title")}
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-300">
            {t("guests.subtitle")}
          </p>
          <div className="flex justify-center pt-2">
            <div className="w-24 h-0.5 bg-[#D1B06B]"></div>
          </div>
        </div>

        {/* Why Choose Wineroad Section */}
        <div className="mt-10">
          <div className="space-y-6">
            {/* 2x2 Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-[#21130F] border border-white/5 rounded-xl p-5 hover:translate-y-[-2px] hover:shadow-xl hover:border-[#D1B06B]/30 transition-all duration-300"
                >
                  {/* Icon in Circular Badge */}
                  <div className="w-12 h-12 rounded-full bg-[#D1B06B]/20 flex items-center justify-center mb-4">
                    <div className="text-[#D1B06B]">{feature.icon}</div>
                  </div>

                  {/* Title */}
                  <h4 className="text-lg font-playfair font-semibold text-white mb-2">
                    {feature.title}
                  </h4>

                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

