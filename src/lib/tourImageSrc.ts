/** Returns a trimmed non-empty URL, or undefined — never "". */
export function nonEmptyImageUrl(url?: string | null): string | undefined {
  const s = typeof url === "string" ? url.trim() : "";
  return s.length > 0 ? s : undefined;
}

/** Prefer main image, then API alias field. */
export function resolveTourImageSrc(
  mainImage?: string | null,
  imageUrl?: string | null
): string | undefined {
  return nonEmptyImageUrl(mainImage) ?? nonEmptyImageUrl(imageUrl);
}
