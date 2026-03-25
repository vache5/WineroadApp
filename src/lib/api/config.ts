/**
 * Base URL for the Wineroad API (no trailing slash).
 * Set `NEXT_PUBLIC_API_URL` in production, e.g. `https://api.wineroad.am`.
 * For an admin-only deployment on `admin.wineroad.am`, point this at the same API host.
 */
export function getApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (raw) {
    return raw.replace(/\/$/, "");
  }
  return "http://localhost:4000";
}
