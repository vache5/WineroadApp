"use client";

import { useCallback, useEffect, useState } from "react";
import { publicJson } from "@/lib/api/adminClient";
import type { ApiGalleryItem } from "@/types/api";

export function useGalleryApi(refreshMs?: number) {
  const [items, setItems] = useState<ApiGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadGallery = useCallback(async () => {
    try {
      setError(null);
      const data = await publicJson<ApiGalleryItem[]>("/gallery");
      setItems(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load gallery");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadGallery();
  }, [loadGallery]);

  useEffect(() => {
    if (!refreshMs) return;
    const id = window.setInterval(() => {
      void loadGallery();
    }, refreshMs);
    return () => window.clearInterval(id);
  }, [loadGallery, refreshMs]);

  return { items, loading, error, refetch: loadGallery };
}
