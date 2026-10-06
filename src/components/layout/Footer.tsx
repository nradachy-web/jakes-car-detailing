import Link from "next/link";
import { asset } from "@/lib/asset";
import { BOOK_HREF, BRAND, HOURS, PACKAGES, QUOTED } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="on-dark border-t border-white/14 pb-[96px] lg:pb-0">
      <div className="wrap grid gap-x-10 gap-y-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr] lg:py-20">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/brand/logo-full.png")}
            alt={`${BRAND.name}. ${BRAND.tagline}`}
            width={1244}
            height={435}
            loading="lazy"
            className="h-auto w-[230px]"
          />
          <p className="muted mt-6 max-w-[30ch] text-[0.9688rem]">
            Hand wash detailing in {BRAND.city}, {BRAND.regionName}.
          </p>
        </div>

        <nav aria-label="Services">
          <h2 className="label muted">Services</h2>
          <ul className="mt-4 grid gap-2.5">
            {PACKAGES.map((p) => (
              <li key={p.slug}>
                <Link href={p.slug} className="transition-colors hover:text-sky">
                  {p.name}
                </Link>
              </li>
            ))}
            {QUOTED.map((q) => (
              <li key={q.slug}>
                <Link href={q.slug} className="transition-colors hover:text-sky">
                  {q.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Explore">
          <h2 className="label muted">Explore</h2>
          <ul className="mt-4 grid gap-2.5">
            {[
              { label: "Our work", href: "/portfolio/" },
              { label: "About Jake", href: "/about/" },
              { label: "Journal", href: "/blog/" },
              { label: "Book a detail", href: BOOK_HREF },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-sky">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="label muted">Contact</h2>
          <ul className="mt-4 grid gap-2.5">
            <li>
              <a href={`tel:${BRAND.phoneTel}`} className="transition-colors hover:text-sky">
                {BRAND.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${BRAND.email}`} className="break-all transition-colors hover:text-sky">
                {BRAND.email}
              </a>
            </li>
            <li>
              <a href={BRAND.google.mapsUrl} target="_blank" rel="noopener" className="transition-colors hover:text-sky">
                {BRAND.city}, {BRAND.region} on Google Maps
              </a>
            </li>
          </ul>
          <dl className="muted mt-6 grid gap-1.5 text-[0.9063rem]">
            {HOURS.map((h) => (
              <div key={h.days} className="flex justify-between gap-x-4">
                <dt>
                  <abbr title={h.days} className="no-underline">
                    {h.short}
                  </abbr>
                </dt>
                <dd className="whitespace-nowrap">{h.hours}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="border-t border-white/14">
        <div className="wrap muted flex flex-col gap-3 py-6 text-[0.8438rem] md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND.name}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy/" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <a href="https://modernapexstrategies.com" target="_blank" rel="noopener" className="transition-colors hover:text-white">
              Website &amp; marketing by Modern Apex Strategies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
