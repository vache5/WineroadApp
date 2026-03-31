/**
 * Base URL for the Wineroad API (no trailing slash).
 * - Browser: `NEXT_PUBLIC_API_URL` is inlined at build time — set it in `.env.local` (dev) and in your host’s env (production).
 * - Default: local Express (see Wineroad-back).
 */
export function getApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (raw) {
    return raw.replace(/\/$/, "");
  }
  return "http://localhost:4000";
}

/**
 * Origin for server-side `fetch` to Express (e.g. `/api/admin/login` proxy).
 * Prefer `BACKEND_URL` when it differs from the public URL (Docker / private network).
 * Otherwise falls back to `NEXT_PUBLIC_API_URL`, then local dev.
 */
export function getServerBackendOrigin(): string {
  const raw =
    process.env.BACKEND_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    "http://localhost:4000";
  return raw.replace(/\/$/, "");
}
