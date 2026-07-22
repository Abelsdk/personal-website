import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export — works on Vercel and GitHub Pages
  output: "export",
  images: {
    unoptimized: true,
  },
  // Avoid picking a parent lockfile as the workspace root
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
