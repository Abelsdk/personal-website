import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // API routes (Spotify) need a Node server — not compatible with `output: "export"`
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
