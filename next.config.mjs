// Static export so the project can be hosted on GitHub Pages.
// NEXT_PUBLIC_BASE_PATH is set by the CI workflow (e.g. "/itzfizz-scroll-hero").
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
