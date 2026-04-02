import { getApiBaseUrl } from "@/lib/api/config";

/** Returns a trimmed non-empty URL, or undefined — never "". */
export function nonEmptyImageUrl(url?: string | null): string | undefined {
  const s = typeof url === "string" ? url.trim() : "";
  return s.length > 0 ? s : undefined;
}

/**
 * Image URLs for `<img>` / Next `Image`: align stored URLs with `NEXT_PUBLIC_API_URL`, map
 * stale `http://localhost:4000/uploads/...` to the configured API, and use same-origin
 * `/uploads/...` when it matches the API so Next can proxy (see `next.config` rewrites).
 */
export function toBrowserImageSrc(url?: string | null): string | undefined {
  const s = nonEmptyImageUrl(url);
  if (!s) return undefined;

  if (s.startsWith("/")) {
    return s;
  }

  let parsed: URL;
  try {
    parsed = new URL(s);
  } catch {
    return s;
  }

  if (!parsed.pathname.startsWith("/uploads/")) {
    return s;
  }

  let apiOrigin: string;
  try {
    apiOrigin = new URL(getApiBaseUrl()).origin;
  } catch {
    return s;
  }

  const pathAndQuery = `${parsed.pathname}${parsed.search}`;

  if (parsed.origin === apiOrigin) {
    return pathAndQuery;
  }

  const localApiOrigins = new Set(["http://localhost:4000", "http://127.0.0.1:4000"]);
  if (localApiOrigins.has(parsed.origin) && parsed.origin !== apiOrigin) {
    return `${apiOrigin}${pathAndQuery}`;
  }

  return s;
}

/** Prefer main image, then API alias field. */
export function resolveTourImageSrc(
  mainImage?: string | null,
  imageUrl?: string | null
): string | undefined {
  const raw = nonEmptyImageUrl(mainImage) ?? nonEmptyImageUrl(imageUrl);
  return raw ? toBrowserImageSrc(raw) : undefined;
}
