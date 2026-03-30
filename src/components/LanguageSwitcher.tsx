"use client";

import { usePathname, useRouter } from "next/navigation";

import { defaultLocale, locales } from "@/i18n/config";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const currentLocale = locales.includes(segments[0] as (typeof locales)[number])
    ? (segments[0] as (typeof locales)[number])
    : defaultLocale;

  const handleChange = (nextLocale: string) => {
    const nextSegments = [...segments];

    if (locales.includes(nextSegments[0] as (typeof locales)[number])) {
      nextSegments[0] = nextLocale;
    } else {
      nextSegments.unshift(nextLocale);
    }

    router.push(`/${nextSegments.join("/")}`);
  };

  return (
    <label className="inline-flex items-center gap-2 text-xs text-white/80 md:text-sm">
      <select
        value={currentLocale}
        onChange={(event) => handleChange(event.target.value)}
        className="rounded border border-[#D4A755] bg-[#1A0F0F] px-2 py-1 text-xs text-[#D4A755] focus:outline-none md:text-sm"
        aria-label="Language switcher"
      >
        <option value="en">English</option>
        <option value="ru">Русский</option>
        <option value="am">Հայերեն</option>
      </select>
    </label>
  );
}
