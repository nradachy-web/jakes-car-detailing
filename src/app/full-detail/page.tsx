import type { Metadata } from "next";
import PackagePage from "@/components/sections/PackagePage";
import { BRAND, PACKAGES } from "@/lib/constants";
import { pageMeta } from "@/lib/seo";

const pkg = PACKAGES.find((p) => p.id === "full")!;

export const metadata: Metadata = pageMeta({
  title: `Full Car Detail in ${BRAND.city}, ${BRAND.region} | $${pkg.price} | ${BRAND.name}`,
  description: `A complete interior and exterior detail in ${BRAND.city}, ${BRAND.regionName}, in one appointment. $${pkg.price}, about ${pkg.duration}.`,
  path: pkg.slug,
});

export default function FullDetailPage() {
  return <PackagePage id="full" />;
}
