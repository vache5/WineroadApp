/** When a tour has no title in the current language, show a short fallback (a11y + layout). */
export function tourDisplayName(title: string | undefined | null): string {
  const t = (title ?? "").trim();
  return t || "Tour";
}
