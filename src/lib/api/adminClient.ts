import { getApiBaseUrl } from "./config";

export const ADMIN_TOKEN_STORAGE_KEY = "wineroad_admin_token";

export function getStoredAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
}

export function setStoredAdminToken(token: string | null): void {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token);
  } else {
    localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
  }
}

export async function adminFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const token = getStoredAdminToken();
  const base = getApiBaseUrl();
  const url =
    path.startsWith("http") ? path : `${base}${path.startsWith("/") ? path : `/${path}`}`;

  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(url, { ...init, headers });

  if (res.status === 401 && token) {
    setStoredAdminToken(null);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("wineroad-admin-unauthorized"));
    }
  }

  return res;
}

export async function adminJson<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await adminFetch(path, init);
  const text = await res.text();
  const data = text ? (JSON.parse(text) as unknown) : null;

  if (!res.ok) {
    const msg =
      data && typeof data === "object" && data !== null && "error" in data
        ? String((data as { error: unknown }).error)
        : res.statusText;
    throw new Error(msg || "Request failed");
  }

  return data as T;
}

/** Public GET (no admin token) — used for tour list on the marketing site if needed. */
export async function publicJson<T>(path: string, init: RequestInit = {}): Promise<T> {
  const base = getApiBaseUrl();
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...Object.fromEntries(new Headers(init.headers).entries()),
    },
  });
  const text = await res.text();
  const data = text ? (JSON.parse(text) as unknown) : null;
  if (!res.ok) {
    const msg =
      data && typeof data === "object" && data !== null && "error" in data
        ? String((data as { error: unknown }).error)
        : res.statusText;
    throw new Error(msg || "Request failed");
  }
  return data as T;
}
