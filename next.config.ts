import type { NextConfig } from "next";

function backendOrigin(): string {
  const raw =
    process.env.BACKEND_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    "http://localhost:4000";
  return raw.replace(/\/$/, "");
}

/**
 * Deploy notes: you can point `admin.wineroad.am` to this same Next.js app as the marketing site.
 * Set `NEXT_PUBLIC_API_URL` to your API origin and configure `CORS_ORIGINS` on the API to include
 * both `https://wineroad.am` and `https://admin.wineroad.am`.
 *
 * `/uploads/*` is rewritten to the Express app so the browser can use same-origin `/uploads/...`
 * (see `toBrowserImageSrc`) instead of calling the API port directly in local dev.
 */
const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },
  async rewrites() {
    const origin = backendOrigin();
    return [
      {
        source: "/uploads/:path*",
        destination: `${origin}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
