import HeroLight from "@/components/fx/HeroLight";
import { photoSet } from "@/lib/photos";

interface PageHeroProps {
  /** Each string is one line of the headline. */
  title: string[];
  lede: React.ReactNode;
  photo: { slug: string; alt: string; credit?: string };
  /** Cut used from 1024px up. Phones always get the 4:5 portrait. */
  desktopCut?: "w" | "f";
  /** object-position for the desktop cut, e.g. "50% 40%" */
  focus?: string;
  children?: React.ReactNode; // buttons, rating line
}

/**
 * The opening of every interior page: the same photograph-into-black frame as
 * the home page, a little shorter, with the same single load moment.
 */
export default function PageHero({ title, lede, photo, desktopCut = "w", focus, children }: PageHeroProps) {
  const wide = photoSet(photo.slug, desktopCut);
  const tall = photoSet(photo.slug, "t");
  return (
    <section className="hero hero--sub on-dark">
      <div className="hero-photo">
        <picture>
          <source media="(min-width: 1024px)" type="image/avif" srcSet={wide.avifSrcSet} sizes="58vw" />
          <source media="(min-width: 1024px)" srcSet={wide.srcSet} sizes="58vw" />
          <source type="image/avif" srcSet={tall.avifSrcSet} sizes="100vw" />
          <img
            src={tall.src}
            srcSet={tall.srcSet}
            sizes="100vw"
            alt={photo.alt}
            width={tall.width}
            height={tall.height}
            fetchPriority="high"
            decoding="async"
            style={focus ? { objectPosition: focus } : undefined}
          />
        </picture>
        <span className="hero-sweep" aria-hidden="true" />
        <HeroLight />
      </div>

      <div className="wrap hero-copy">
        <div className="hero-text">
          <h1 className="d1">
            {title.map((line, i) => (
              <span key={line} className="rise">
                <span style={{ "--i": i } as React.CSSProperties}>{line}</span>
              </span>
            ))}
          </h1>
          <div className="lede mt-7 text-white/90">{lede}</div>
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </div>

      {photo.credit ? (
        <p className="credit pointer-events-none absolute right-[max(var(--gutter),calc((100vw-1320px)/2))] top-[calc(var(--nav-h)+10px)] hidden text-white/60 lg:block">
          Photo: {photo.credit}
        </p>
      ) : null}
    </section>
  );
}
