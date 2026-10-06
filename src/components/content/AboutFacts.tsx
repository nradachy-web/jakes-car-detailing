import { Stars } from "@/components/ui/Stars";
import { BRAND, HOURS } from "@/lib/constants";

/** Where, when and how to reach Jake. Every value comes from constants.ts. */
export default function AboutFacts() {
  const { rating, reviewCount, mapsUrl, asOf } = BRAND.google;
  return (
    <section className="on-spruce section">
      <div className="wrap">
        <h2 className="d2">Where and when.</h2>

        <dl className="mt-12 grid border-t border-white/14 md:grid-cols-2 lg:mt-16 lg:grid-cols-[1.15fr_1.15fr_1.5fr_1fr]">
          <div className="border-b border-white/14 py-7 md:pr-8 lg:border-b-0">
            <dt className="label muted">Based in</dt>
            <dd className="d3 mt-3">
              {BRAND.city}, <span className="whitespace-nowrap">{BRAND.regionName}</span>
            </dd>
            <dd className="mt-3">
              <a href={mapsUrl} target="_blank" rel="noopener" className="link">
                Find us on Google Maps
              </a>
            </dd>
          </div>
          <div className="border-b border-white/14 py-7 md:pr-8 lg:border-b-0 lg:border-l lg:pl-8">
            <dt className="label muted">Phone</dt>
            <dd className="d3 mt-3 whitespace-nowrap lg:text-[clamp(1.25rem,1.9vw,2.1rem)]">
              <a href={`tel:${BRAND.phoneTel}`} className="transition-colors hover:text-sky">
                {BRAND.phone}
              </a>
            </dd>
            <dd className="muted mt-3">Call or text</dd>
          </div>
          <div className="border-b border-white/14 py-7 md:pr-8 lg:border-b-0 lg:border-l lg:pl-8">
            <dt className="label muted">Email</dt>
            <dd className="d4 mt-4 [overflow-wrap:anywhere]">
              <a href={`mailto:${BRAND.email}`} className="transition-colors hover:text-sky">
                {BRAND.email}
              </a>
            </dd>
          </div>
          <div className="py-7 lg:border-l lg:border-white/14 lg:pl-8">
            <dt className="label muted">Google reviews</dt>
            <dd className="mt-3 flex items-center gap-3">
              <span className="d3">{rating.toFixed(1)}</span>
              <Stars className="text-[#f5b83d]" />
            </dd>
            <dd className="mt-3">
              <a href={mapsUrl} target="_blank" rel="noopener" className="link">
                From {reviewCount} reviews
              </a>
              <span className="muted block text-[0.875rem]">As of {asOf}</span>
            </dd>
          </div>
        </dl>

        <div className="border-t border-white/14 pt-7">
          <h3 className="label muted">Hours</h3>
          <dl className="mt-4 grid gap-x-10 gap-y-4 sm:grid-cols-3">
            {HOURS.map((h) => (
              <div key={h.days}>
                <dt className="d4">{h.days}</dt>
                <dd className="muted mt-1">{h.hours}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
