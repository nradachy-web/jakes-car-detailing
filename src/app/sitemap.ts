import type { MetadataRoute } from "next";
import { PACKAGES, QUOTED } from "@/lib/constants";
import { POSTS } from "@/lib/posts";
import { canonicalUrl } from "@/lib/seo";

export const dynamic = "force-static";

const LAST_MODIFIED = "2026-10-05";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; lastModified?: string }[] = [
    { path: "/", priority: 1.0 },
    ...PACKAGES.map((p) => ({ path: p.slug, priority: 0.9 })),
    ...QUOTED.map((q) => ({ path: q.slug, priority: 0.9 })),
    { path: "/book-online", priority: 0.9 },
    { path: "/portfolio", priority: 0.7 },
    { path: "/about", priority: 0.7 },
    { path: "/blog", priority: 0.6 },
    ...POSTS.map((p) => ({ path: `/post/${p.slug}`, priority: 0.5, lastModified: p.date })),
    { path: "/privacy", priority: 0.2 },
  ];

  return routes.map(({ path, priority, lastModified }) => ({
    url: canonicalUrl(path),
    lastModified: lastModified ?? LAST_MODIFIED,
    changeFrequency: "monthly",
    priority,
  }));
}
