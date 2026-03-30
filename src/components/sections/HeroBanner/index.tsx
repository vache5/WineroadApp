"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

export function HeroBanner() {
  const { t } = useTranslation("common");

  return (
    <>
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/main2.jpeg"
            alt="Armenian Wine"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Centered Content */}
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white md:px-8">
          <div className="space-y-6">
            <h1 className="font-playfair text-4xl font-extrabold leading-tight md:text-6xl lg:text-7xl" style={{ fontWeight: 900 }}>
              {t("hero.titleLine1")}
              <br />
              {t("hero.titleLine2")}
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/90 md:text-lg lg:text-xl">
              {t("hero.subtitle")}
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
    </>
  );
}