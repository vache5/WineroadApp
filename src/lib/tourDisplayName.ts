/** When a tour has no title in the current language, show a short fallback (a11y + layout). */
export function tourDisplayName(name: string | undefined | null): string {
  const t = (name ?? "").trim();
  return t || "Tour";
}
