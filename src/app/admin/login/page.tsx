"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AdminLoading } from "@/components/admin/AdminLoading";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isHydrated, isAuthenticated } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      router.replace("/admin");
    }
  }, [isHydrated, isAuthenticated, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      router.replace("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-[#151313]">
        <AdminLoading />
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#151313]">
        <AdminLoading message="Redirecting…" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#151313] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#1E1411] p-8 shadow-xl">
        <h1 className="text-center font-semibold text-2xl text-[#F2EDE8]">Admin sign in</h1>
        <p className="mt-1 text-center text-sm text-white/50">Wineroad control panel</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {error ? (
            <div
              className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200"
              role="alert"
            >
              {error}
            </div>
          ) : null}
          <div>
            <label htmlFor="admin-email" className="mb-1 block text-sm text-white/70">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              className="w-full rounded-lg border border-white/15 bg-[#151313] px-3 py-2.5 text-sm text-white outline-none ring-[#D7B46A] focus:ring-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={submitting}
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="mb-1 block text-sm text-white/70">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              className="w-full rounded-lg border border-white/15 bg-[#151313] px-3 py-2.5 text-sm text-white outline-none ring-[#D7B46A] focus:ring-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={submitting}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-[#D7B46A] py-3 text-sm font-semibold text-[#1E1411] transition-opacity disabled:opacity-60"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/40">
          <Link href="/" className="underline-offset-2 hover:text-white hover:underline">
            Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}
