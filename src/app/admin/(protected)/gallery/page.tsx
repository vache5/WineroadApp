"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ImagePlus, Upload, X } from "lucide-react";
import { AdminLoading } from "@/components/admin/AdminLoading";
import { adminFetch, adminJson, publicJson } from "@/lib/api/adminClient";
import { uploadAdminTourImage } from "@/lib/adminUploadImage";
import type { ApiGalleryItem } from "@/types/api";

type QueuedImage = {
  id: string;
  file: File;
  previewUrl: string;
};

export default function AdminGalleryPage() {
  const [items, setItems] = useState<ApiGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [batchNotice, setBatchNotice] = useState<string | null>(null);
  const [submittingUrl, setSubmittingUrl] = useState(false);
  const [uploadingBatch, setUploadingBatch] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [batchTitle, setBatchTitle] = useState("");
  const [batchDescription, setBatchDescription] = useState("");
  const [queue, setQueue] = useState<QueuedImage[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const data = await publicJson<ApiGalleryItem[]>("/gallery");
      setItems(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load gallery");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function addFilesToQueue(fileList: FileList | null) {
    if (!fileList?.length) return;
    const images = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (images.length === 0) {
      setError("Only image files are supported.");
      return;
    }
    setError(null);
    setBatchNotice(null);
    setQueue((prev) => [
      ...prev,
      ...images.map((file) => ({
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
      })),
    ]);
  }

  function removeFromQueue(id: string) {
    setQueue((prev) => {
      const item = prev.find((q) => q.id === id);
      if (item) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((q) => q.id !== id);
    });
  }

  function clearQueue() {
    setQueue((prev) => {
      prev.forEach((q) => URL.revokeObjectURL(q.previewUrl));
      return [];
    });
  }

  async function handleUploadQueue() {
    if (queue.length === 0) return;
    setError(null);
    setBatchNotice(null);
    setUploadingBatch(true);
    const optionalTitle = batchTitle.trim() || undefined;
    const optionalDesc = batchDescription.trim() || undefined;
    const errors: string[] = [];
    let ok = 0;
    try {
      for (let i = 0; i < queue.length; i++) {
        const q = queue[i];
        setUploadProgress(`Uploading ${i + 1} of ${queue.length}…`);
        try {
          const url = await uploadAdminTourImage(q.file);
          const fileStem = q.file.name
            .replace(/\.[^/.]+$/, "")
            .replace(/[-_]+/g, " ")
            .slice(0, 200);
          await adminJson<ApiGalleryItem>("/gallery", {
            method: "POST",
            body: JSON.stringify({
              imageUrl: url,
              title: optionalTitle ?? fileStem,
              ...(optionalDesc ? { description: optionalDesc } : {}),
            }),
          });
          ok += 1;
        } catch (e) {
          errors.push(`${q.file.name}: ${e instanceof Error ? e.message : "failed"}`);
        }
      }
      clearQueue();
      setBatchTitle("");
      setBatchDescription("");
      await load();
      if (errors.length) {
        setBatchNotice(`Added ${ok} image(s). ${errors.length} failed:\n${errors.slice(0, 5).join("\n")}${errors.length > 5 ? "\n…" : ""}`);
      } else {
        setBatchNotice(`Successfully added ${ok} image(s) to the gallery.`);
      }
    } finally {
      setUploadingBatch(false);
      setUploadProgress(null);
    }
  }

  async function handleAddByUrl(e: React.FormEvent) {
    e.preventDefault();
    const url = imageUrl.trim();
    if (!url) {
      setError("Image URL is required");
      return;
    }
    setError(null);
    setSubmittingUrl(true);
    try {
      await adminJson<ApiGalleryItem>("/gallery", {
        method: "POST",
        body: JSON.stringify({
          imageUrl: url,
          title: title.trim() || undefined,
          description: description.trim() || undefined,
        }),
      });
      setImageUrl("");
      setTitle("");
      setDescription("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add image");
    } finally {
      setSubmittingUrl(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Remove this gallery image?")) return;
    setError(null);
    setDeletingId(id);
    try {
      const res = await adminFetch(`/gallery/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const text = await res.text();
        let msg = res.statusText;
        try {
          const j = text ? (JSON.parse(text) as { error?: string }) : null;
          if (j?.error) msg = j.error;
        } catch {
          /* ignore */
        }
        throw new Error(msg);
      }
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading && items.length === 0) {
    return <AdminLoading message="Loading gallery…" />;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-white">Gallery</h1>
          <p className="mt-1 text-sm text-white/50">
            Drop in multiple photos or browse your computer—the public site picks them up on the next refresh or poll.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setLoading(true);
            void load();
          }}
          className="rounded-lg border border-white/15 px-3 py-2 text-xs text-white/80 hover:bg-white/5"
        >
          Refresh list
        </button>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200 whitespace-pre-wrap">
          {error}
        </div>
      ) : null}

      {batchNotice ? (
        <div
          className={`rounded-lg border px-3 py-2 text-sm whitespace-pre-wrap ${
            batchNotice.startsWith("Added") && batchNotice.includes("failed")
              ? "border-amber-500/40 bg-amber-500/10 text-amber-100"
              : "border-emerald-500/30 bg-emerald-500/10 text-emerald-100"
          }`}
        >
          {batchNotice}
          <button
            type="button"
            onClick={() => setBatchNotice(null)}
            className="ml-3 text-xs underline opacity-80 hover:opacity-100"
          >
            Dismiss
          </button>
        </div>
      ) : null}

      {/* Multi-upload */}
      <section className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#1E1411] to-[#181210] p-6 shadow-xl shadow-black/20">
        <div className="mb-4 flex items-center gap-2 text-[#D7B46A]">
          <Upload className="h-4 w-4" aria-hidden />
          <h2 className="text-sm font-semibold tracking-wide">Upload from computer</h2>
        </div>

        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragOver(true);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragOver(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setDragOver(false);
            }
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragOver(false);
            addFilesToQueue(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 transition-all ${
            dragOver
              ? "border-[#D7B46A] bg-[#D7B46A]/10"
              : "border-white/20 bg-[#151515]/80 hover:border-[#D7B46A]/50 hover:bg-white/[0.03]"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(e) => {
              addFilesToQueue(e.target.files);
              e.target.value = "";
            }}
          />
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D7B46A]/15 text-[#D7B46A]">
            <ImagePlus className="h-6 w-6" aria-hidden />
          </div>
          <p className="mt-4 text-center text-sm font-medium text-white">
            Drop images here or click to browse
          </p>
          <p className="mt-1 text-center text-xs text-white/45">JPEG, PNG, WebP — select many at once</p>
        </div>

        {queue.length > 0 ? (
          <div className="mt-6 space-y-4">
            <p className="text-xs font-medium uppercase tracking-wider text-white/40">
              Selected ({queue.length})
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {queue.map((q) => (
                <div
                  key={q.id}
                  className="group relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-black/30"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={q.previewUrl} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromQueue(q.id);
                    }}
                    disabled={uploadingBatch}
                    className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white opacity-90 ring-1 ring-white/20 transition hover:bg-red-900/90 disabled:opacity-40"
                    aria-label={`Remove ${q.file.name}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  <p className="absolute bottom-0 left-0 right-0 truncate bg-gradient-to-t from-black/90 to-transparent px-2 py-2 pt-6 text-[10px] text-white/80">
                    {q.file.name}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-white/50" htmlFor="batch-title">
                  Caption for all uploads (optional)
                </label>
                <input
                  id="batch-title"
                  value={batchTitle}
                  onChange={(e) => setBatchTitle(e.target.value)}
                  disabled={uploadingBatch}
                  placeholder="Uses file name if empty"
                  className="w-full rounded-lg border border-white/15 bg-[#151313] px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-[#D7B46A]/40"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-white/50" htmlFor="batch-desc">
                  Description for all (optional)
                </label>
                <textarea
                  id="batch-desc"
                  rows={2}
                  value={batchDescription}
                  onChange={(e) => setBatchDescription(e.target.value)}
                  disabled={uploadingBatch}
                  className="w-full rounded-lg border border-white/15 bg-[#151313] px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-[#D7B46A]/40"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => void handleUploadQueue()}
                disabled={uploadingBatch}
                className="rounded-lg bg-[#D7B46A] px-5 py-2.5 text-sm font-semibold text-[#1E1411] shadow-lg shadow-[#D7B46A]/10 transition hover:bg-[#c9a35c] disabled:opacity-50"
              >
                {uploadingBatch ? uploadProgress ?? "Working…" : `Add ${queue.length} to gallery`}
              </button>
              <button
                type="button"
                onClick={clearQueue}
                disabled={uploadingBatch}
                className="rounded-lg border border-white/15 px-4 py-2.5 text-sm text-white/70 hover:bg-white/5 disabled:opacity-50"
              >
                Clear selection
              </button>
            </div>
          </div>
        ) : null}
      </section>

      {/* URL fallback */}
      <form
        onSubmit={(e) => void handleAddByUrl(e)}
        className="space-y-4 rounded-xl border border-white/10 bg-[#1E1411]/80 p-6"
      >
        <h2 className="text-sm font-medium text-white/60">Or add by URL</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs text-white/60" htmlFor="g-url">
              Image URL
            </label>
            <input
              id="g-url"
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              disabled={submittingUrl}
              placeholder="https://…"
              className="w-full rounded-lg border border-white/15 bg-[#151313] px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-[#D7B46A]/40"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-white/60" htmlFor="g-title">
              Title (optional)
            </label>
            <input
              id="g-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={submittingUrl}
              className="w-full rounded-lg border border-white/15 bg-[#151313] px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-[#D7B46A]/40"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs text-white/60" htmlFor="g-desc">
              Description (optional)
            </label>
            <textarea
              id="g-desc"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={submittingUrl}
              className="w-full rounded-lg border border-white/15 bg-[#151313] px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-[#D7B46A]/40"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={submittingUrl}
          className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 disabled:opacity-50"
        >
          {submittingUrl ? "Adding…" : "Add URL to gallery"}
        </button>
      </form>

      <div>
        <h2 className="mb-3 text-sm font-medium text-white/80">Current items ({items.length})</h2>
        {items.length === 0 ? (
          <p className="rounded-lg border border-white/10 bg-[#1E1411] px-4 py-8 text-center text-sm text-white/50">
            No images yet.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-xl border border-white/10 bg-[#1E1411]"
              >
                <div className="relative aspect-[4/3] bg-black/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title || "Gallery"}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-2 p-3">
                  {item.title ? (
                    <p className="text-sm font-medium text-white">{item.title}</p>
                  ) : (
                    <p className="text-xs text-white/40">No title</p>
                  )}
                  {item.description ? (
                    <p className="line-clamp-2 text-xs text-white/60">{item.description}</p>
                  ) : null}
                  <p className="truncate text-[10px] text-white/35" title={item.imageUrl}>
                    {item.imageUrl}
                  </p>
                  <button
                    type="button"
                    disabled={deletingId === item.id}
                    onClick={() => void handleDelete(item.id)}
                    className="w-full rounded-md border border-red-500/40 py-1.5 text-xs text-red-200 hover:bg-red-500/10 disabled:opacity-50"
                  >
                    {deletingId === item.id ? "Removing…" : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-center text-xs text-white/40">
        <Link href="/gallery" className="text-[#D7B46A] hover:underline" target="_blank">
          Open public gallery
        </Link>
      </p>
    </div>
  );
}
