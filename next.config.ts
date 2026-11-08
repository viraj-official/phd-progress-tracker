import type { NextConfig } from "next";

// Static export for GitHub Pages. The site lives at
// https://viraj-official.github.io/phd-progress-tracker/, so in production every
// path is prefixed with /phd-progress-tracker (set by NEXT_PUBLIC_BASE_PATH in the
// deploy workflow). Local `npm run dev` keeps the root path.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
