import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all domains
      },
      {
        protocol: "http",
        hostname: "**", // allow http domains too
      },
    ],
  },
};

export default nextConfig;
