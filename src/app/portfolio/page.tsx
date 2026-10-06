import type { Metadata } from "next";
import Link from "next/link";
import AtWork from "@/components/content/AtWork";
import WorkGallery from "@/components/content/WorkGallery";
import BookBand from "@/components/sections/BookBand";
import PageHero from "@/components/sections/PageHero";
import Reviews from "@/components/sections/Reviews";
import { GoogleRating } from "@/components/ui/Stars";
import { BOOK_HREF, BOOK_LABEL, BRAND } from "@/lib/constants";
import { CARS, car } from "@/lib/photos";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: `Our Work | ${BRAND.name}, ${BRAND.city} ${BRAND.region}`,
  description: `Photos of cars detailed by ${BRAND.name} in ${BRAND.city}, ${BRAND.regionName}, from daily drivers to a Lamborghini Huracán.`,
  path: "/portfolio",
});

export default function PortfolioPage() {
  const lead = car("granturismo");
  return (
    <>
      <PageHero
        title={["Cars Jake", "has detailed."]}
        lede={
          <p>
            From daily drivers to a Lamborghini Huracán. Every car on this page was detailed by Jake in {BRAND.city}.
          </p>
        }
        photo={{ slug: lead.slug, alt: lead.alt }}
        desktopCut="w"
        focus="50% 58%"
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

      <section className="on-spruce section">
        <div className="wrap">
          <div className="max-w-[820px]">
            <h2 className="d2">Every one detailed by Jake.</h2>
            <p className="lede muted mt-6">{CARS.length} cars, from a Chevrolet pickup to a Lamborghini.</p>
          </div>
          <div className="mt-12 lg:mt-16">
            <WorkGallery />
          </div>
        </div>
      </section>

      <AtWork />
      <Reviews />
      <BookBand title="Yours could be next." />
    </>
  );
}
