import Link from "next/link";
import BookBand from "@/components/sections/BookBand";
import FaqSection from "@/components/sections/FaqSection";
import PageHero from "@/components/sections/PageHero";
import Photo from "@/components/ui/Photo";
import { GoogleRating, Stars } from "@/components/ui/Stars";
import {
  BOOK_HREF,
  BRAND,
  HOURS,
  METHOD,
  PACKAGES,
  QUOTED,
  SITE_URL,
  type DetailPackage,
  type PackageId,
} from "@/lib/constants";
import { CARS, PHOTO_CREDIT, WORKING, car, photoSet } from "@/lib/photos";
import { LEAD_REVIEW, REVIEWS, VALUE_REVIEW, type Review } from "@/lib/reviews";
import { canonicalUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";

/**
 * One template behind the three priced details. Prices, durations,
 * descriptions and inclusions all come from PACKAGES in constants.ts; this
 * file only decides how each page lays them out. The three pages share the
 * section order and differ in composition, so they read as siblings rather
 * than one card repeated.
 */

const pkgById = (id: PackageId): DetailPackage => {
  const found = PACKAGES.find((p) => p.id === id);
  if (!found) throw new Error(`Unknown package: ${id}`);
  return found;
};

/** "exterior detail", "interior detail", "full detail" */
const kindOf = (pkg: DetailPackage) => `${pkg.id} detail`;
const bookLabel = (pkg: DetailPackage) => `Book the ${kindOf(pkg)}`;
const bookHref = (pkg: DetailPackage) => `${BOOK_HREF}?service=${pkg.id}`;

/** "Snow foam pre-wash, two-bucket hand wash and microfiber hand dry" */
function inWords(items: string[]): string {
  const parts = items.map((item, i) => (i === 0 ? item : item.charAt(0).toLowerCase() + item.slice(1)));
  if (parts.length < 2) return parts.join("");
  return `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
}

const reviewBy = (author: string, fallback: number): Review => REVIEWS.find((r) => r.author === author) ?? REVIEWS[fallback];

interface PageCopy {
  title: string[];
  lede: string;
  hero: { slug: string; alt: string; credit?: string; cut: "w" | "f"; focus: string };
  heading: string;
  band: { title: string; cars: string[] };
  reviews: Review[];
}

function copyFor(pkg: DetailPackage): PageCopy {
  const priceLine = `$${pkg.price}, in about ${pkg.duration}.`;
  switch (pkg.id) {
    case "exterior":
      return {
        title: ["Exterior", "detailing."],
        lede: `A snow foam pre-wash, a safe two-bucket hand wash and a full exterior decontamination, dried by hand with microfiber towels. ${priceLine}`,
        hero: { ...WORKING.wash, cut: "f", focus: "50% 50%" },
        heading: "Five steps. One price.",
        band: { title: "A few of the cars Jake has detailed.", cars: ["bmw-e46", "audi-rs3", "bmw-m4"] },
        reviews: [reviewBy("colbY -_-", 0)],
      };
    case "interior":
      return {
        title: ["Interior", "detailing."],
        lede: `Vacuuming, upholstery cleaning and dashboard polishing. ${priceLine}`,
        hero: { slug: "granturismo", alt: car("granturismo").alt, cut: "w", focus: "50% 56%" },
        heading: "A deep clean for the cabin.",
        band: { title: "A few of the cars Jake has detailed.", cars: ["defender", "range-rover-sport"] },
        reviews: [reviewBy("Ty Perry", 1)],
      };
    default:
      return {
        title: ["The full", "detail."],
        lede: `A complete interior and exterior detail in one appointment. ${priceLine}`,
        hero: { ...WORKING.dry, credit: PHOTO_CREDIT, cut: "f", focus: "50% 58%" },
        heading: "Inside and out, in one appointment.",
        band: { title: "More of Jake’s work.", cars: ["huracan", "audi-r8", "granturismo"] },
        reviews: [VALUE_REVIEW, LEAD_REVIEW],
      };
  }
}

/* ---------- Shared pieces ---------- */

function PriceFigure({ pkg, className }: { pkg: DetailPackage; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-end gap-x-6 gap-y-2", className)}>
      <p className="figure text-[clamp(4.5rem,9vw,7.5rem)]">
        <span className="sr-only">Price: </span>${pkg.price}
      </p>
      <p className="muted pb-2 text-[0.9375rem] leading-snug">
        Canadian dollars
        <br />
        About {pkg.duration}
      </p>
    </div>
  );
}

function BookButton({ pkg }: { pkg: DetailPackage }) {
  return (
    <Link href={bookHref(pkg)} className="btn btn-primary">
      {bookLabel(pkg)}
    </Link>
  );
}

function Includes({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={className} style={{ borderTop: "1px solid var(--line)" }}>
      {items.map((item) => (
        <li key={item} className="label py-4" style={{ borderBottom: "1px solid var(--line)" }}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function Tile({ slug, sizes, big, className }: { slug: string; sizes: string; big?: boolean; className?: string }) {
  const c = car(slug);
  const set = photoSet(slug, "w");
  return (
    <li className={cn("frame aspect-[4/3]", className)}>
      <picture>
        <source type="image/avif" srcSet={set.avifSrcSet} sizes={sizes} />
        <img src={set.src} srcSet={set.srcSet} sizes={sizes} alt={c.alt} width={set.width} height={set.height} loading="lazy" decoding="async" />
      </picture>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-3 pt-10 pb-2.5 md:px-4 md:pb-3.5">
        <span className={cn("label block text-white", big ? "text-[1rem] md:text-[1.125rem]" : "text-[0.8125rem] md:text-[0.875rem]")}>{c.name}</span>
      </span>
    </li>
  );
}

/* ---------- Price section, one composition per package ---------- */

function ExteriorPrice({ pkg, heading }: { pkg: DetailPackage; heading: string }) {
  return (
    <section className="on-light section">
      <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20 xl:gap-28">
        <div className="lg:sticky lg:top-[calc(var(--nav-h)+32px)] lg:self-start">
          <h2 className="d2">{heading}</h2>
          <PriceFigure pkg={pkg} className="mt-9" />
          <p className="mt-7 max-w-[52ch]">{pkg.body}</p>
          <div className="mt-9">
            <BookButton pkg={pkg} />
          </div>
        </div>

        {/* Numbered because the order is the point: this is the wash, start to finish. */}
        <ol style={{ borderTop: "1px solid var(--line)" }}>
          {METHOD.map((step, i) => (
            <li
              key={step.name}
              className="grid grid-cols-[3.25rem_1fr] gap-x-4 py-7 md:grid-cols-[5rem_1fr]"
              style={{ borderBottom: "1px solid var(--line)" }}
            >
              <span className="d3 text-blue" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3 className="d3">{step.name}</h3>
                <p className="muted mt-2.5 max-w-[46ch]">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function InteriorPrice({ pkg, heading }: { pkg: DetailPackage; heading: string }) {
  return (
    <section className="on-light section">
      <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-start lg:gap-20 xl:gap-28">
        <div>
          <h2 className="d2">{heading}</h2>
          <PriceFigure pkg={pkg} className="mt-9" />
          <p className="mt-7 max-w-[52ch]">{pkg.body}</p>
          <Includes items={pkg.includes} className="mt-9 max-w-[560px]" />
          <div className="mt-9">
            <BookButton pkg={pkg} />
          </div>
        </div>

        {/* The source photo is 514px wide, so this frame never grows past 420. */}
        <figure className="w-full max-w-[420px] lg:order-first">
          <Photo slug={pkg.photo.slug} cut="t" alt={pkg.photo.alt} sizes="(min-width: 480px) 420px, 92vw" className="aspect-[4/5]" />
          <figcaption className="label mt-3">Maserati GranTurismo, interior</figcaption>
        </figure>
      </div>
    </section>
  );
}

function FullPrice({ pkg, heading }: { pkg: DetailPackage; heading: string }) {
  const parts: { pkg: DetailPackage; side: string }[] = [
    { pkg: pkgById("exterior"), side: "Outside" },
    { pkg: pkgById("interior"), side: "Inside" },
  ];
  return (
    <section className="on-light section">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-20">
          <div>
            <h2 className="d2 max-w-[15ch]">{heading}</h2>
            <p className="mt-7 max-w-[52ch]">{pkg.body}</p>
          </div>
          <PriceFigure pkg={pkg} />
        </div>

        <div className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2 lg:mt-20 xl:gap-x-24">
          {parts.map((part) => (
            <div key={part.pkg.id}>
              <h3 className="d3">{part.side}</h3>
              <Includes items={part.pkg.includes} className="mt-6" />
              <p className="muted mt-5 text-[0.9375rem]">
                ${part.pkg.price} on its own.{" "}
                <Link href={part.pkg.slug} className="link">
                  About the {kindOf(part.pkg)}
                </Link>
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5 lg:mt-16">
          <BookButton pkg={pkg} />
          <p className="muted max-w-[46ch] text-[0.9375rem]">
            On their own, the exterior detail is ${parts[0].pkg.price} and the interior detail is ${parts[1].pkg.price}.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Photo band, one composition per package ---------- */

function Band({ pkg, title, cars }: { pkg: DetailPackage; title: string; cars: string[] }) {
  const all = (
    <Link href="/portfolio/" className="btn btn-ghost shrink-0 self-start">
      See all {CARS.length} cars
    </Link>
  );

  if (pkg.id === "interior") {
    return (
      <section className="on-dark section">
        <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.6fr)] lg:items-end lg:gap-16">
          <div>
            <h2 className="d2">{title}</h2>
            <p className="lede muted mt-6">Some of the vehicles Jake has detailed in {BRAND.city}.</p>
            <div className="mt-8 flex">{all}</div>
          </div>
          <ul className="grid grid-cols-2 gap-2 md:gap-3">
            {cars.map((slug) => (
              <Tile key={slug} slug={slug} sizes="(min-width: 1024px) 32vw, 50vw" />
            ))}
          </ul>
        </div>
      </section>
    );
  }

  const [first, ...rest] = cars;
  return (
    <section className="on-dark section">
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <h2 className="d2 max-w-[18ch]">{title}</h2>
          <div className="flex md:pb-1">{all}</div>
        </div>
        {pkg.id === "full" ? (
          <ul className="mt-12 grid grid-cols-2 gap-2 md:gap-3 lg:mt-16 lg:grid-cols-3">
            <Tile slug={first} big sizes="(min-width: 1024px) 66vw, 100vw" className="col-span-2 lg:row-span-2" />
            {rest.map((slug) => (
              <Tile key={slug} slug={slug} sizes="(min-width: 1024px) 33vw, 50vw" />
            ))}
          </ul>
        ) : (
          <ul className="mt-12 grid gap-2 sm:grid-cols-3 md:gap-3 lg:mt-16">
            {cars.map((slug) => (
              <Tile key={slug} slug={slug} sizes="(min-width: 640px) 33vw, 100vw" />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/* ---------- Review pull quote ---------- */

function Quote({ reviews, flip }: { reviews: Review[]; flip?: boolean }) {
  const { rating, reviewCount, mapsUrl, asOf } = BRAND.google;
  const [lead, ...more] = reviews;
  const about = reviews.find((r) => r.about)?.about;
  return (
    <section className="on-light section">
      <div
        className={cn(
          "wrap grid gap-12 lg:gap-20",
          flip ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.42fr)]" : "lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)]",
        )}
      >
        <div className={cn(flip && "lg:order-last")}>
          <h2 className="label muted">What customers say</h2>
          <Stars className="mt-5 text-[#c98a00]" />
          <p className="mt-3">
            {rating.toFixed(1)} from {reviewCount} reviews on Google
            <span className="muted block text-[0.875rem]">As of {asOf}</span>
          </p>
          <a href={mapsUrl} target="_blank" rel="noopener" className="link mt-6 inline-block">
            Read them on Google
          </a>
        </div>

        <figure>
          <blockquote className="d3 max-w-[30ch] leading-[1.22] lg:text-[clamp(1.7rem,2.7vw,2.5rem)]">
            <p>&ldquo;{lead.text}&rdquo;</p>
          </blockquote>
          {more.map((r) => (
            <blockquote key={r.text} className="mt-8 max-w-[54ch] text-[1.125rem]">
              <p>&ldquo;{r.text}&rdquo;</p>
            </blockquote>
          ))}
          <figcaption className="mt-6">
            <span className="label">{lead.author}</span>
            <span className="muted block text-[0.875rem]">
              Google review{about ? `, ${about}` : ""}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ---------- Questions ---------- */

function faqFor(pkg: DetailPackage) {
  const kind = kindOf(pkg);
  const included =
    pkg.id === "full"
      ? `A complete interior and exterior detail. Outside: ${inWords(pkgById("exterior").includes).toLowerCase()}. Inside: ${inWords(pkgById("interior").includes).toLowerCase()}.`
      : `${inWords(pkg.includes)}.`;
  const hoursText = HOURS.map((h) => `${h.days}, ${h.hours}`).join(". ");

  return [
    {
      q: `How long does the ${kind} take, and what does it cost?`,
      text: `The ${kind} takes about ${pkg.duration} and costs $${pkg.price} in Canadian dollars.`,
      a: (
        <p>
          About {pkg.duration}, and ${pkg.price} in Canadian dollars.
        </p>
      ),
    },
    {
      q: `What is included in the ${kind}?`,
      text: included,
      a: <p>{included}</p>,
    },
    {
      q: "How do I book?",
      text: `Send a booking request on the booking page, or call or text Jake at ${BRAND.phone}.`,
      a: (
        <p>
          Send a{" "}
          <Link href={bookHref(pkg)} className="link">
            booking request
          </Link>
          , or call or text Jake at{" "}
          <a href={`tel:${BRAND.phoneTel}`} className="link">
            {BRAND.phone}
          </a>
          .
        </p>
      ),
    },
    {
      q: "Where are you, and when are you open?",
      text: `${BRAND.name} is in ${BRAND.city}, ${BRAND.regionName}. Hours: ${hoursText}.`,
      a: (
        <>
          <p>
            {BRAND.name} is in {BRAND.city}, {BRAND.regionName}.{" "}
            <a href={BRAND.google.mapsUrl} target="_blank" rel="noopener" className="link">
              Find us on Google Maps
            </a>
            .
          </p>
          <dl className="mt-4 grid gap-1.5">
            {HOURS.map((h) => (
              <div key={h.days} className="flex flex-wrap gap-x-3">
                <dt>{h.days}:</dt>
                <dd>{h.hours}</dd>
              </div>
            ))}
          </dl>
        </>
      ),
    },
  ];
}

/* ---------- Other services ---------- */

function Others({ pkg }: { pkg: DetailPackage }) {
  const links = [
    ...PACKAGES.filter((p) => p.id !== pkg.id).map((p) => ({ href: p.slug, name: p.name, meta: `$${p.price}`, line: p.line })),
    ...QUOTED.map((q) => ({ href: q.slug, name: q.name, meta: "Free quote", line: q.line })),
  ];
  return (
    <section className="on-spruce py-[clamp(60px,7.5vw,108px)]">
      <div className="wrap">
        <h2 className="d3">Other services</h2>
        <ul className="mt-8 grid border-t border-white/14 sm:grid-cols-2 lg:grid-cols-4 lg:border-t-0">
          {links.map((l) => (
            <li key={l.href} className="border-b border-white/14 lg:border-b-0 lg:border-l lg:first:border-l-0">
              <Link href={l.href} className="group block h-full py-6 sm:pr-6 lg:px-6 lg:py-1">
                <span className="label text-sky">{l.meta}</span>
                <span className="d4 mt-2 block transition-colors group-hover:text-sky">{l.name}</span>
                <span className="muted mt-2 block text-[0.9375rem]">{l.line}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- The page ---------- */

export default function PackagePage({ id }: { id: PackageId }) {
  const pkg = pkgById(id);
  const copy = copyFor(pkg);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: pkg.name,
    description: pkg.body,
    url: canonicalUrl(pkg.slug),
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: { "@type": "City", name: `${BRAND.city}, ${BRAND.regionName}` },
    offers: { "@type": "Offer", price: pkg.price, priceCurrency: "CAD", url: canonicalUrl(BOOK_HREF) },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        title={copy.title}
        lede={<p>{copy.lede}</p>}
        photo={{ slug: copy.hero.slug, alt: copy.hero.alt, credit: copy.hero.credit }}
        desktopCut={copy.hero.cut}
        focus={copy.hero.focus}
      >
        <div className="grid gap-3 sm:flex sm:flex-wrap">
          <BookButton pkg={pkg} />
          <a href={`tel:${BRAND.phoneTel}`} className="btn btn-ghost">
            Call {BRAND.phone}
          </a>
        </div>
        <GoogleRating className="mt-5 text-white transition-colors hover:text-sky" />
      </PageHero>

      {pkg.id === "exterior" ? <ExteriorPrice pkg={pkg} heading={copy.heading} /> : null}
      {pkg.id === "interior" ? <InteriorPrice pkg={pkg} heading={copy.heading} /> : null}
      {pkg.id === "full" ? <FullPrice pkg={pkg} heading={copy.heading} /> : null}

      <Band pkg={pkg} title={copy.band.title} cars={copy.band.cars} />

      <Quote reviews={copy.reviews} flip={pkg.id === "interior"} />

      <FaqSection title="Good to know." items={faqFor(pkg)} tone="on-dark" />

      <Others pkg={pkg} />

      <BookBand />
    </>
  );
}
