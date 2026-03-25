import { adminFetch } from "@/lib/api/adminClient";

export async function uploadAdminTourImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);
  const res = await adminFetch("/admin/upload-image", {
    method: "POST",
    body: formData,
  });
  const text = await res.text();
  const data = text ? (JSON.parse(text) as { url?: string; error?: string }) : {};
  if (!res.ok || !data.url) {
    throw new Error(data.error ?? "Upload failed");
  }
  return data.url;
}
