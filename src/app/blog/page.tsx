import type { Metadata } from "next";
import Link from "next/link";
import DarkHeader from "@/components/content/DarkHeader";
import PostMeta from "@/components/content/PostMeta";
import BookBand from "@/components/sections/BookBand";
import Photo from "@/components/ui/Photo";
import { BRAND } from "@/lib/constants";
import { car } from "@/lib/photos";
import { POSTS } from "@/lib/posts";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: `Journal | ${BRAND.name}`,
  description: `Short guides from ${BRAND.name} in ${BRAND.city}: winter detailing in ${BRAND.regionName}, and what separates a detail from a car wash.`,
  path: "/blog",
});

export default function BlogPage() {
  const [lead, ...rest] = POSTS;
  return (
    <>
      <DarkHeader
        title={["Journal."]}
        lede={
          <p>
            Three short guides from Jake on washing, detailing and getting a car through a {BRAND.regionName} winter.
          </p>
        }
      />

      <section className="on-spruce section">
        <div className="wrap">
          <article>
            <Link
              href={`/post/${lead.slug}/`}
              className="group grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16 xl:gap-20"
            >
              <Photo
                slug={lead.photo}
                cut="w"
                alt={car(lead.photo).alt}
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="aspect-[4/3]"
                imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div>
                <PostMeta post={lead} />
                <h2 className="d2 mt-5 text-[clamp(1.9rem,3.6vw,3.25rem)] leading-[1.02] transition-colors group-hover:text-sky">
                  {lead.title}
                </h2>
                <p className="lede muted mt-6">{lead.excerpt}</p>
                <span className="link mt-7 inline-block">Read the guide</span>
              </div>
            </Link>
          </article>

          <ul className="mt-16 grid gap-x-3 gap-y-14 border-t border-white/14 pt-16 md:grid-cols-2 md:gap-x-10 lg:mt-24 lg:pt-24 xl:gap-x-16">
            {rest.map((p) => (
              <li key={p.slug}>
                <article>
                  <Link href={`/post/${p.slug}/`} className="group block">
                    <Photo
                      slug={p.photo}
                      cut="w"
                      alt={car(p.photo).alt}
                      sizes="(min-width: 768px) 46vw, 100vw"
                      className="aspect-[4/3]"
                      imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <PostMeta post={p} className="mt-6" />
                    <h2 className="d3 mt-3 transition-colors group-hover:text-sky">{p.title}</h2>
                    <p className="muted mt-4 max-w-[52ch]">{p.excerpt}</p>
                    <span className="link mt-5 inline-block">Read the guide</span>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BookBand />
    </>
  );
}
