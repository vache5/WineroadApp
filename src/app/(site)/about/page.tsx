"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

import { defaultLocale, locales } from "@/i18n/config";

const VALUE_KEYS = ["authenticity", "curation", "atmosphere", "quality"] as const;

const VALUE_ICONS = [
  <path
    key="a"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    d="M12 3c2.5 4.5 8 7 8 12a8 8 0 11-16 0c0-5 5.5-7.5 8-12z"
  />,
  <path
    key="b"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"
  />,
  <path
    key="c"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
  />,
  <path
    key="d"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    d="M5 3v4M3 5h4M6 15v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
  />,
];

function WineLeafDecoration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M60 8C35 40 12 75 12 118c0 38 22 62 48 74M60 8c25 32 48 67 48 110 0 38-22 62-48 74"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.35"
      />
      <ellipse cx="60" cy="95" rx="28" ry="52" fill="currentColor" opacity="0.08" />
      <circle cx="42" cy="72" r="4" fill="currentColor" opacity="0.2" />
      <circle cx="78" cy="88" r="3.5" fill="currentColor" opacity="0.18" />
      <circle cx="52" cy="108" r="3" fill="currentColor" opacity="0.15" />
      <circle cx="68" cy="118" r="3.5" fill="currentColor" opacity="0.12" />
    </svg>
  );
}

export default function AboutPage() {
  const { t } = useTranslation("common");
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const currentLocale = locales.includes(segments[0] as (typeof locales)[number])
    ? segments[0]
    : defaultLocale;
  const localePrefix = `/${currentLocale}`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0D0A09] text-[#F5EBDD]">
      {/* Ambient orbs */}
      <div
        className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-[#6B2D1E]/25 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 top-[40%] h-80 w-80 rounded-full bg-[#D4A755]/12 blur-[90px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-40 left-1/3 h-64 w-64 rounded-full bg-[#3D1810]/40 blur-[80px]"
        aria-hidden
      />

      {/* Hero */}
      <section className="relative border-b border-[#D4A755]/15">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(212,167,85,0.15),transparent_55%)]" />
        <WineLeafDecoration className="pointer-events-none absolute -right-6 top-12 h-[17rem] w-[10.5rem] text-[#D4A755] opacity-[0.16] md:right-4 md:top-16 md:h-[22rem] md:w-[13.5rem]" />
        <WineLeafDecoration className="pointer-events-none absolute -left-10 bottom-4 h-[13rem] w-[8.5rem] -scale-x-100 text-[#D4A755] opacity-[0.14] md:bottom-6 md:left-0 md:h-[17rem] md:w-[11rem]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1fr_1.05fr] md:items-center md:gap-14 md:px-8 md:py-20 lg:py-24">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4A755]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#D4A755]">
                {t("about.hero.eyebrow")}
              </span>
              <span className="h-px flex-1 max-w-[4rem] bg-gradient-to-l from-transparent to-[#D4A755]/60" />
            </div>

            <p className="mb-3 font-playfair text-lg italic text-[#E5D4BC]/95 md:text-xl">
              {t("about.hero.tagline")}
            </p>

            <h1 className="font-playfair text-[2.5rem] font-bold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl">
              {t("about.hero.titleLine1")}
              <span className="block bg-gradient-to-r from-[#F8E5C4] via-[#D4A755] to-[#C9A227] bg-clip-text text-transparent">
                {t("about.hero.titleLine2")}
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-[15px] leading-[1.75] text-[#D4C4B0]/95 md:text-lg">
              {t("about.hero.intro")}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={`${localePrefix}/tours`}
                className="rounded-full border border-[#D4A755]/50 bg-[#D4A755]/10 px-6 py-3 text-sm font-semibold text-[#F8E5C4] backdrop-blur-sm transition hover:border-[#D4A755] hover:bg-[#D4A755]/20"
              >
                {t("about.hero.ctaTours")}
              </Link>
              <Link
                href={`${localePrefix}/contact`}
                className="text-sm font-medium text-[#D4C4B0] underline-offset-4 transition hover:text-[#D4A755] hover:underline"
              >
                {t("about.hero.ctaContact")}
              </Link>
            </div>
          </div>

          <div className="relative z-10 md:justify-self-end md:w-full md:max-w-xl lg:max-w-2xl">
            <div className="relative aspect-[4/5] min-h-[22rem] w-full max-h-[560px] overflow-hidden rounded-[2rem] border border-[#D4A755]/25 shadow-[0_24px_80px_rgba(0,0,0,0.45),inset_0_0_0_1px_rgba(255,255,255,0.06)] md:aspect-[3/4] md:min-h-[28rem] md:max-h-[680px] lg:max-h-[720px]">
              <Image
                src="/images/main2.jpeg"
                alt={t("about.hero.imageAlt")}
                fill
                className="scale-[1.03] object-cover object-[center_38%]"
                sizes="(max-width: 768px) 100vw, 42vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A09] via-[#0D0A09]/20 to-[#1A0F0F]/55" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4A755]/15 via-transparent to-[#0D0A09]/50" />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/20" />

              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-black/35 p-4 backdrop-blur-md md:bottom-8 md:left-8 md:right-8 md:p-5">
                <p className="font-playfair text-lg italic leading-snug text-white md:text-xl">
                  {t("about.hero.imageQuote")}
                </p>
                <div className="mt-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#D4A755]">
                  <span className="h-px w-8 bg-[#D4A755]" />
                  {t("about.hero.imageQuoteBrand")}
                </div>
              </div>
            </div>
            <div
              className="pointer-events-none absolute -right-3 -top-3 h-28 w-28 rounded-full border border-[#D4A755]/20 md:h-32 md:w-32"
              aria-hidden
            />
          </div>
        </div>
      </section>

      {/* Pull quote band */}
      <section className="relative border-y border-[#D4A755]/10 bg-gradient-to-r from-[#1A1210]/90 via-[#251a16] to-[#1A1210]/90 py-16 md:py-20">
        <div className="absolute left-1/2 top-0 h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#D4A755] to-transparent" />
        <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
          <p className="font-playfair text-2xl font-medium leading-relaxed text-[#F5EBDD] md:text-3xl lg:text-[2rem]">
            {t("about.quoteBand")}
          </p>
        </div>
      </section>

      {/* Story — bento */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="mb-12 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-playfair text-3xl font-bold text-white md:text-4xl">
              {t("about.story.title")}
            </h2>
            <p className="mt-2 max-w-md text-sm text-[#A89888]">{t("about.story.subtitle")}</p>
          </div>
          <div className="hidden h-px flex-1 max-w-md bg-gradient-to-r from-[#D4A755]/40 to-transparent md:block md:translate-y-[-0.5rem]" />
        </div>

        <div className="grid gap-5 md:grid-cols-12 md:gap-6">
          <article className="group relative overflow-hidden rounded-3xl border border-[#D4A755]/15 bg-[#16100E] p-7 shadow-xl transition hover:border-[#D4A755]/30 md:col-span-7 md:p-8">
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#D4A755]/5 blur-2xl transition group-hover:bg-[#D4A755]/10" />
            <span className="text-5xl font-playfair leading-none text-[#D4A755]/25">01</span>
            <p className="relative mt-4 text-[15px] leading-[1.8] text-[#E0D0C0] md:text-[17px]">
              {t("about.story.block1")}
            </p>
          </article>

          <article className="relative overflow-hidden rounded-3xl border border-[#D4A755]/20 bg-gradient-to-br from-[#2a1814] to-[#120d0b] p-7 shadow-xl md:col-span-5 md:p-8">
            <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,#D4A755_1px,transparent_0)] [background-size:20px_20px]" />
            <span className="relative text-5xl font-playfair leading-none text-[#D4A755]/35">02</span>
            <p className="relative mt-4 text-[15px] leading-[1.8] text-[#E8DCCD] md:text-[17px]">
              {t("about.story.block2")}
            </p>
          </article>

          <article className="rounded-3xl border border-white/5 bg-[#14100E] p-7 shadow-xl md:col-span-12 md:flex md:items-center md:gap-12 md:p-10">
            <div className="flex-1">
              <span className="text-5xl font-playfair leading-none text-[#D4A755]/25">03</span>
              <p className="mt-4 text-[15px] leading-[1.85] text-[#D4C4B0] md:text-[17px]">
                {t("about.story.block3Before")}
                <strong className="font-semibold text-[#F5EBDD]">{t("about.story.block3Emphasis")}</strong>
                {t("about.story.block3After")}
              </p>
            </div>
            <div className="mt-6 flex shrink-0 flex-col gap-2 border-t border-[#D4A755]/20 pt-6 md:mt-0 md:w-64 md:border-l md:border-t-0 md:pl-10 md:pt-0">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-playfair text-[#D4A755]">∞</span>
                <span className="text-sm uppercase tracking-wider text-[#9A8878]">
                  {t("about.story.routesLabel")}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-[#7A6B5E]">{t("about.story.routesCaption")}</p>
            </div>
          </article>
        </div>
      </section>

      {/* Mission */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0D0A09_0%,#1a120f_45%,#0D0A09_100%)]" />
        <div className="relative mx-auto max-w-5xl px-4 md:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-[#D4A755]/20 bg-[#181210] px-6 py-12 shadow-[0_0_0_1px_rgba(212,167,85,0.06),0_32px_64px_rgba(0,0,0,0.35)] md:px-14 md:py-16">
            <div className="mb-6 flex items-center gap-3">
              <span className="text-2xl" aria-hidden>
                🥂
              </span>
              <h2 className="font-playfair text-2xl font-bold text-[#F8EEDB] md:text-3xl">
                {t("about.mission.title")}
              </h2>
            </div>
            <p className="text-[15px] leading-[1.85] text-[#D4C4B0] md:text-lg">{t("about.mission.p1")}</p>
            <p className="mt-5 text-[15px] leading-[1.85] text-[#C4B4A4] md:text-lg">{t("about.mission.p2")}</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative mx-auto max-w-7xl px-4 pb-20 md:px-8 md:pb-28">
        <h2 className="mb-3 text-center font-playfair text-3xl font-bold text-white md:text-4xl">
          {t("about.values.title")}
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-sm text-[#9A8878]">
          {t("about.values.subtitle")}
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_KEYS.map((key, index) => (
              <article
                key={key}
                className="group relative overflow-hidden rounded-2xl border border-[#D4A755]/12 bg-gradient-to-b from-[#1A1411] to-[#120e0c] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#D4A755]/35 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D4A755]/25 bg-[#D4A755]/8 text-[#D4A755] transition group-hover:bg-[#D4A755]/15">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {VALUE_ICONS[index]}
                  </svg>
                </div>
                <h3 className="font-playfair text-lg font-semibold text-[#F4E7D2]">
                  {t(`about.values.items.${key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#B8A898]/95">
                  {t(`about.values.items.${key}.body`)}
                </p>
              </article>
            ))}
        </div>

        <div className="mt-10 rounded-3xl border border-[#D4A755]/25 bg-[linear-gradient(135deg,rgba(212,167,85,0.08),transparent_50%)] p-8 text-center md:p-10">
          <span className="text-2xl" aria-hidden>
            💎
          </span>
          <h3 className="mt-3 font-playfair text-xl font-semibold text-[#F8EEDB] md:text-2xl">
            {t("about.connection.title")}
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-[1.9] text-[#D4C4B0]">
            {t("about.connection.body")}
          </p>
        </div>
      </section>
    </div>
  );
}
