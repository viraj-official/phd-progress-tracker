import fs from "fs";
import path from "path";
import type { NextConfig } from "next";

// Static export for GitHub Pages. The site lives at
// https://viraj-official.github.io/phd-progress-tracker/, so in production every
// path is prefixed with /phd-progress-tracker (set by NEXT_PUBLIC_BASE_PATH in the
// deploy workflow). Local `npm run dev` keeps the root path.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// A unique id for every build. It is added to file links (?v=...) so browsers never
// reuse an old PDF/image, and written to public/build.txt so open pages can detect a
// newer deploy and reload themselves (see FreshnessCheck).
// Next loads this file in several processes; the id is created once and passed to the
// others through the environment, so every part of one build uses the same id.
if (!process.env.NEXT_PUBLIC_BUILD_ID) {
  process.env.NEXT_PUBLIC_BUILD_ID = process.env.GITHUB_SHA?.slice(0, 12) || Date.now().toString(36);
  fs.writeFileSync(path.join(process.cwd(), "public", "build.txt"), process.env.NEXT_PUBLIC_BUILD_ID);
}
const buildId = process.env.NEXT_PUBLIC_BUILD_ID;

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
  env: { NEXT_PUBLIC_BUILD_ID: buildId },
};

export default nextConfig;
