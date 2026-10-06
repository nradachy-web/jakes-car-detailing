import type { Metadata } from "next";
import PackagePage from "@/components/sections/PackagePage";
import { BRAND, PACKAGES } from "@/lib/constants";
import { pageMeta } from "@/lib/seo";

const pkg = PACKAGES.find((p) => p.id === "interior")!;

export const metadata: Metadata = pageMeta({
  title: `Interior Detailing in ${BRAND.city}, ${BRAND.region} | $${pkg.price} | ${BRAND.name}`,
  description: `Interior detailing in ${BRAND.city}, ${BRAND.regionName}: a deep clean with vacuuming, upholstery cleaning and dashboard polishing. $${pkg.price}, about ${pkg.duration}.`,
  path: pkg.slug,
});

export default function InteriorDetailingPage() {
  return <PackagePage id="interior" />;
}
