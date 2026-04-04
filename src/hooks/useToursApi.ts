"use client";

import { useCallback, useEffect, useState } from "react";
import { publicJson } from "@/lib/api/adminClient";
import type { ApiTour } from "@/types/api";

export function useToursApi(refreshMs?: number) {
  const [tours, setTours] = useState<ApiTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTours = useCallback(async () => {
    try {
      setError(null);
      const data = await publicJson<ApiTour[]>("/tours");
      setTours(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load tours");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadTours();
  }, [loadTours]);

  useEffect(() => {
    if (typeof refreshMs !== "number" || !Number.isFinite(refreshMs) || refreshMs <= 0) return;
    const id = window.setInterval(() => {
      void loadTours();
    }, refreshMs);
    return () => window.clearInterval(id);
  }, [loadTours, refreshMs]);

  return { tours, loading, error, refetch: loadTours };
}

