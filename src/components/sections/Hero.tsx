import Link from "next/link";
import HeroLight from "@/components/fx/HeroLight";
import { GoogleRating } from "@/components/ui/Stars";
import { BOOK_HREF, BOOK_LABEL, BRAND, PACKAGES, QUOTED } from "@/lib/constants";
import { PHOTO_CREDIT, WORKING, photoSet } from "@/lib/photos";

/**
 * The opening frame: Jake rinsing foam off the Huracán, melting into black on
 * the left where his own tagline sits. Under it, the five services as a rail
 * of doors with their prices.
 */
export default function Hero() {
  const full = photoSet(WORKING.rinse.slug, "f");
  const tall = photoSet(WORKING.rinse.slug, "t");

  return (
    <section className="hero on-dark">
      <div className="hero-photo">
        <picture>
          <source media="(min-width: 1024px)" type="image/avif" srcSet={full.avifSrcSet} sizes="62vw" />
          <source media="(min-width: 1024px)" srcSet={full.srcSet} sizes="62vw" />
          <source type="image/avif" srcSet={tall.avifSrcSet} sizes="100vw" />
          <img
            src={tall.src}
            srcSet={tall.srcSet}
            sizes="100vw"
            alt={WORKING.rinse.alt}
            width={tall.width}
            height={tall.height}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <span className="hero-sweep" aria-hidden="true" />
        <HeroLight />
      </div>

      <div className="wrap hero-copy">
        <h1 className="d1">
          <span className="rise">
            <span style={{ "--i": 0 } as React.CSSProperties}>Detailing</span>
          </span>
          <span className="rise">
            <span style={{ "--i": 1 } as React.CSSProperties}>done right.</span>
          </span>
        </h1>
        <p className="lede mt-7 text-white/90 lg:mt-9">
          Foam pre-wash, a two-bucket hand wash and a careful microfiber dry, by Jake in {BRAND.city}. Book the outside,
          the inside or both.
        </p>
        <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
          <Link href={BOOK_HREF} className="btn btn-primary">
            {BOOK_LABEL}
          </Link>
          <a href={`tel:${BRAND.phoneTel}`} className="btn btn-ghost">
            Call {BRAND.phone}
          </a>
        </div>
        <GoogleRating className="mt-8 text-white transition-colors hover:text-sky" />
      </div>

      <nav aria-label="Services and prices" className="rail">
        <div className="wrap rail-grid">
          {PACKAGES.map((p) => (
            <Link key={p.id} href={p.slug} className="rail-item">
              <span className="rail-name label">{p.short === "Full detail" ? p.short : `${p.short} detail`}</span>
              <span className="flex items-baseline gap-3">
                <span className="d3">${p.price}</span>
                <span className="muted text-[0.875rem]">{p.duration}</span>
              </span>
            </Link>
          ))}
          {QUOTED.map((q) => (
            <Link key={q.id} href={q.slug} className="rail-item">
              <span className="rail-name label">{q.name}</span>
              <span className="flex items-baseline gap-3">
                <span className="d3">Free quote</span>
              </span>
            </Link>
          ))}
        </div>
      </nav>

      <p className="credit pointer-events-none absolute right-[var(--gutter)] top-[calc(var(--nav-h)+10px)] hidden text-white/60 lg:block">
        Photo: {PHOTO_CREDIT}
      </p>
    </section>
  );
}
