import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostMeta from "@/components/content/PostMeta";
import BookBand from "@/components/sections/BookBand";
import Photo from "@/components/ui/Photo";
import { BOOK_HREF, BOOK_LABEL, BRAND, PACKAGES, SITE_URL } from "@/lib/constants";
import { car } from "@/lib/photos";
import { POSTS, post, type Block } from "@/lib/posts";
import { canonicalUrl, pageMeta } from "@/lib/seo";

// Only Jake's three posts exist. Any other slug is a 404, not a render.
export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = post(slug);
  if (!p) return {};
  return pageMeta({ title: `${p.title} | ${BRAND.name}`, description: p.excerpt, path: `/post/${p.slug}` });
}

/** Jake's text, block by block, exactly as written. */
function Body({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
        if (b.type === "h3") return <h3 key={i}>{b.text}</h3>;
        if (b.type === "ul")
          return (
            <ul key={i}>
              {b.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        return <p key={i}>{b.text}</p>;
      })}
    </>
  );
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = post(slug);
  if (!p) notFound();

  const others = POSTS.filter((o) => o.slug !== p.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.excerpt,
    datePublished: p.date,
    author: { "@type": "Person", name: p.author },
    publisher: { "@type": "Organization", name: BRAND.name, url: canonicalUrl("/") },
    image: `${SITE_URL}/photos/${p.photo}-w1280.webp`,
    mainEntityOfPage: canonicalUrl(`/post/${p.slug}`),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article>
        <header className="on-dark">
          <div className="wrap grid gap-10 pt-[calc(var(--nav-h)+clamp(40px,7vh,88px))] pb-[clamp(48px,6vw,88px)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16 xl:gap-24">
            <div>
              <Link href="/blog/" className="link">
                Journal
              </Link>
              <h1 className="d2 mt-6">{p.title}</h1>
              <span className="draw-line mt-8 block h-[3px] w-[132px] bg-blue" aria-hidden="true" />
              <PostMeta post={p} byline className="mt-7 text-[0.9375rem]" />
            </div>
            <Photo
              slug={p.photo}
              cut="w"
              alt={car(p.photo).alt}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/3]"
              priority
            />
          </div>
        </header>

        <div className="on-light section">
          <div className="wrap grid gap-16 lg:grid-cols-[minmax(0,66ch)_minmax(280px,380px)] lg:justify-between lg:gap-20">
            <div className="article">
              <Body blocks={p.body} />
            </div>

            {/* Beside the text on desktop, after it on a phone. */}
            <aside
              aria-labelledby="post-cta"
              className="rounded-[6px] bg-white p-7 md:p-9 lg:sticky lg:top-[calc(var(--nav-h)+32px)] lg:self-start"
            >
              <h2 id="post-cta" className="d3">
                Have Jake look after it.
              </h2>
              <p className="muted mt-3">Three details, priced in Canadian dollars.</p>
              <ul className="mt-7" style={{ borderTop: "1px solid var(--line)" }}>
                {PACKAGES.map((pkg) => (
                  <li key={pkg.id} style={{ borderBottom: "1px solid var(--line)" }}>
                    <Link href={pkg.slug} className="group flex items-baseline justify-between gap-6 py-4">
                      <span className="label transition-colors group-hover:text-blue">{pkg.name}</span>
                      <span className="d4">${pkg.price}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 grid gap-3">
                <Link href={BOOK_HREF} className="btn btn-primary">
                  {BOOK_LABEL}
                </Link>
                <a href={`tel:${BRAND.phoneTel}`} className="btn btn-ghost">
                  Call {BRAND.phone}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <section className="on-spruce section">
        <div className="wrap">
          <h2 className="d2">More from the journal.</h2>
          <ul className="mt-12 grid gap-x-3 gap-y-12 md:grid-cols-2 md:gap-x-10 lg:mt-16 xl:gap-x-16">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/post/${o.slug}/`} className="group block">
                  <Photo
                    slug={o.photo}
                    cut="w"
                    alt={car(o.photo).alt}
                    sizes="(min-width: 768px) 46vw, 100vw"
                    className="aspect-[4/3]"
                    imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <PostMeta post={o} className="mt-6" />
                  <h3 className="d3 mt-3 transition-colors group-hover:text-sky">{o.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BookBand />
    </>
  );
}
