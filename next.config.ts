import type { NextConfig } from "next";

/**
 * Jake's Car Detailing - static export.
 * Set NEXT_PUBLIC_BASE_PATH=/jakes-car-detailing to build for the GitHub Pages
 * preview (https://<user>.github.io/jakes-car-detailing/). Leave it unset to
 * serve at a domain root (jakesdetailing.ca via public/CNAME). The asset()
 * helper reads the same env var so image paths stay correct either way.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
  },
  // One request fewer before first paint: the stylesheet ships inside the HTML.
  experimental: {
    inlineCss: true,
  },
};

export default nextConfig;
