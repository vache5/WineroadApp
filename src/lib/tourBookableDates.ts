import type { ApiTour } from "@/types/api";

/** ISO YYYY-MM-DD from API + legacy tours with only `date`. */
export function resolvedBookableDates(tour: ApiTour): string[] {
  const raw = tour.bookableDates?.length
    ? tour.bookableDates
    : tour.date
      ? [tour.date]
      : [];
  const set = new Set(raw.map((s) => s.trim()).filter(Boolean));
  return [...set].sort();
}

/** Today as YYYY-MM-DD in local timezone. */
export function todayIsoDate(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Dates on or after `minIso` (inclusive), sorted. */
export function upcomingBookableDates(tour: ApiTour, minIso: string = todayIsoDate()): string[] {
  return resolvedBookableDates(tour).filter((iso) => iso >= minIso);
}

export function formatIsoDateList(isoDates: string[], locale: string): string {
  if (!isoDates.length) return "";
  const fmt = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return isoDates
    .map((iso) => {
      const [y, m, d] = iso.split("-").map(Number);
      if (!y || !m || !d) return iso;
      return fmt.format(new Date(y, m - 1, d));
    })
    .join(", ");
}
