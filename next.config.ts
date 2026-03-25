import type { NextConfig } from "next";

/**
 * Deploy notes: you can point `admin.wineroad.am` to this same Next.js app as the marketing site.
 * Set `NEXT_PUBLIC_API_URL` to your API origin and configure `CORS_ORIGINS` on the API to include
 * both `https://wineroad.am` and `https://admin.wineroad.am`.
 */
const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
