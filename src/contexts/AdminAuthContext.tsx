"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { getApiBaseUrl } from "@/lib/api/config";
import {
  ADMIN_TOKEN_STORAGE_KEY,
  getStoredAdminToken,
  setStoredAdminToken,
} from "@/lib/api/adminClient";
import type { AdminLoginResponse } from "@/types/api";
import { isAdminToken } from "@/lib/jwt";

type AdminAuthContextValue = {
  token: string | null;
  isHydrated: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setToken(getStoredAdminToken());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    function onUnauthorized() {
      setToken(null);
    }
    window.addEventListener("wineroad-admin-unauthorized", onUnauthorized);
    return () => window.removeEventListener("wineroad-admin-unauthorized", onUnauthorized);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const apiBase = getApiBaseUrl();
    /** Same-origin proxy → Express (see `app/api/admin/login/route.ts`). */
    const url = "/api/admin/login";
    let res: Response;
    try {
      res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
    } catch {
      throw new Error(
        "Cannot reach this app’s login API. Is Next.js running? Try again or check the dev server terminal."
      );
    }
    const text = await res.text();
    let data: (Partial<AdminLoginResponse> & { error?: string }) | null = null;
    if (text) {
      try {
        data = JSON.parse(text) as Partial<AdminLoginResponse> & { error?: string };
      } catch {
        throw new Error("Login failed");
      }
    }
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error(
          `Backend login route missing (404). Open ${apiBase}/admin/ping — you should see {"ok":true,"service":"wineroad-api"}. If not, start Wineroad-back and set NEXT_PUBLIC_API_URL or BACKEND_URL in .env.local, then restart Next (npm run dev).`
        );
      }
      throw new Error(data?.error ?? "Login failed");
    }
    if (!data?.token || data.role !== "admin") {
      throw new Error("Invalid server response");
    }
    setStoredAdminToken(data.token);
    setToken(data.token);
  }, []);

  const logout = useCallback(() => {
    setStoredAdminToken(null);
    setToken(null);
  }, []);

  const isAuthenticated = isHydrated && isAdminToken(token);

  const value = useMemo(
    () => ({
      token,
      isHydrated,
      isAuthenticated,
      login,
      logout,
    }),
    [token, isHydrated, isAuthenticated, login, logout]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuthContext(): AdminAuthContextValue {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminAuthContext must be used within AdminAuthProvider");
  }
  return ctx;
}
