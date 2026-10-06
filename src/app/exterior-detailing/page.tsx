import type { Metadata } from "next";
import PackagePage from "@/components/sections/PackagePage";
import { BRAND, PACKAGES } from "@/lib/constants";
import { pageMeta } from "@/lib/seo";

const pkg = PACKAGES.find((p) => p.id === "exterior")!;

export const metadata: Metadata = pageMeta({
  title: `Exterior Detailing in ${BRAND.city}, ${BRAND.region} | $${pkg.price} | ${BRAND.name}`,
  description: `Exterior detailing in ${BRAND.city}, ${BRAND.regionName}: snow foam pre-wash, two-bucket hand wash, wheels and tires, decontamination and a microfiber hand dry. $${pkg.price}, about ${pkg.duration}.`,
  path: pkg.slug,
});

export default function ExteriorDetailingPage() {
  return <PackagePage id="exterior" />;
}
