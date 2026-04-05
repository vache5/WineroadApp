import type { ApiTour, TourLocaleBlock } from "@/types/api";
import type { Locale } from "@/i18n/config";

const fallbackChain = (locale: Locale): Locale[] => {
  if (locale === "en") return ["en"];
  return [locale, "en"];
};

/** Resolves title, description, and duration for the UI locale, falling back to English. */
export function tourStrings(tour: ApiTour, locale: Locale): TourLocaleBlock {
  const blocks = tour.locales;
  const pick = (loc: Locale): TourLocaleBlock =>
    blocks[loc] ?? { title: "", description: "", duration: "" };

  let title = "";
  let description = "";
  let duration = "";
  for (const loc of fallbackChain(locale)) {
    const b = pick(loc);
    if (!title.trim() && b.title.trim()) title = b.title;
    if (!description.trim() && b.description.trim()) description = b.description;
    if (!duration.trim() && b.duration.trim()) duration = b.duration;
  }

  return {
    title: title.trim() || "Tour",
    description: description.trim(),
    duration: duration.trim(),
  };
}

/** Label for admin (English primary). */
export function adminTourTitle(tour: ApiTour): string {
  const t = tour.locales.en.title.trim();
  return t || tour.locales.ru.title.trim() || tour.locales.am.title.trim() || "Tour";
}
