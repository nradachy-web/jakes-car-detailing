import type { Metadata } from "next";
import Link from "next/link";
import AboutFacts from "@/components/content/AboutFacts";
import AboutVoices from "@/components/content/AboutVoices";
import ServiceRows from "@/components/content/ServiceRows";
import BookBand from "@/components/sections/BookBand";
import PageHero from "@/components/sections/PageHero";
import Photo from "@/components/ui/Photo";
import { GoogleRating } from "@/components/ui/Stars";
import { BOOK_HREF, BOOK_LABEL, BRAND } from "@/lib/constants";
import { PHOTO_CREDIT, WORKING } from "@/lib/photos";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: `About ${BRAND.name} | ${BRAND.city}, ${BRAND.region}`,
  description: `${BRAND.owner} runs ${BRAND.name} in ${BRAND.city}, ${BRAND.regionName}. Hand wash detailing, rated ${BRAND.google.rating.toFixed(1)} from ${BRAND.google.reviewCount} reviews on Google.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={["Driven by", "quality."]}
        lede={
          <p>
            {BRAND.owner} runs {BRAND.name} in {BRAND.city}, {BRAND.regionName}. Hand washes, interior deep cleans and
            full details, with paint correction and ceramic coating by quote.
          </p>
        }
        photo={{ slug: WORKING.dry.slug, alt: WORKING.dry.alt, credit: PHOTO_CREDIT }}
        desktopCut="f"
        focus="50% 46%"
      >
        <div className="grid gap-3 sm:flex sm:flex-wrap">
          <Link href={BOOK_HREF} className="btn btn-primary">
            {BOOK_LABEL}
          </Link>
          <a href={`tel:${BRAND.phoneTel}`} className="btn btn-ghost">
            Call {BRAND.phone}
          </a>
        </div>
        <GoogleRating className="mt-8 text-white transition-colors hover:text-sky" />
      </PageHero>

      {/* Jake's own words from his current site, edited for punctuation only. */}
      <section className="on-light section">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] lg:gap-20 xl:gap-28">
          <div>
            <h2 className="d2">Committed to excellence.</h2>
            <p className="lede mt-8">
              At Jake&rsquo;s Car Detailing, we provide premium detailing services designed to restore, protect, and
              enhance every vehicle we work on. Based in Halifax, we use professional techniques, high-quality products,
              and careful attention to detail to deliver top-quality results. Whether it&rsquo;s a daily driver, truck,
              SUV, or luxury vehicle, our goal is to keep your vehicle looking its absolute best.
            </p>

            <h3 className="d3 mt-14">Our reputation.</h3>
            <p className="prose-measure mt-5">
              At Jake&rsquo;s Car Detailing, customer satisfaction is one of our top priorities. We take pride in
              delivering professional service, high-quality results, and careful attention to detail with every vehicle
              we work on. Our goal is to provide an experience customers can trust while delivering results that keep
              their vehicles looking their absolute best.
            </p>

            <p className="mt-10">
              <span className="label block">{BRAND.owner}</span>
              <span className="muted block text-[0.875rem]">
                {BRAND.name}, {BRAND.city}
              </span>
            </p>
          </div>

          <div className="lg:sticky lg:top-[calc(var(--nav-h)+32px)] lg:self-start">
            <Photo
              slug={WORKING.wash.slug}
              cut="t"
              alt={WORKING.wash.alt}
              sizes="(min-width: 1024px) 36vw, 100vw"
              className="aspect-[4/5]"
            />
          </div>
        </div>
      </section>

      <AboutVoices />
      <AboutFacts />

      <section className="on-light section">
        <div className="wrap">
          <div className="max-w-[820px]">
            <h2 className="d2">What Jake does.</h2>
            <p className="lede muted mt-6">Three details at listed prices, and two services by free quote.</p>
          </div>
          <div className="mt-12 lg:mt-16">
            <ServiceRows />
          </div>
        </div>
      </section>

      <BookBand />
    </>
  );
}
