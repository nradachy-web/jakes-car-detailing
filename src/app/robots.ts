import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

/**
 * NEXT_PUBLIC_BASE_PATH is set only by the GitHub Pages preview build
 * (deploy.yml). The preview stays out of the index with a blanket disallow and
 * no sitemap. The domain cutover drops that variable, which flips this to
 * allow everything.
 */
export default function robots(): MetadataRoute.Robots {
  const isPreview = Boolean(process.env.NEXT_PUBLIC_BASE_PATH);
  if (isPreview) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
