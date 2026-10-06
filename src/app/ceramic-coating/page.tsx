import type { Metadata } from "next";
import Link from "next/link";
import BeadDemo from "@/components/fx/BeadDemo";
import CarBand from "@/components/protection/CarBand";
import DoesDoesNot from "@/components/protection/DoesDoesNot";
import QuoteActions from "@/components/protection/QuoteActions";
import { StepColumns } from "@/components/protection/Steps";
import BookBand from "@/components/sections/BookBand";
import FaqSection from "@/components/sections/FaqSection";
import PageHero from "@/components/sections/PageHero";
import { GoogleRating } from "@/components/ui/Stars";
import { BOOK_HREF, BRAND, QUOTE_LABEL, SITE_URL } from "@/lib/constants";
import { car } from "@/lib/photos";
import { canonicalUrl, pageMeta } from "@/lib/seo";

/**
 * Ceramic coating is a new service. Jake has not supplied a product, prices,
 * durability, cure times or warranty terms, so none appear here. The page is
 * general, accurate coating knowledge plus one sentence quoted from his own
 * winter article (lib/posts.ts). Add specifics only when he confirms them.
 */

const PATH = "/ceramic-coating/";
const QUOTE_HREF = `${BOOK_HREF}?service=ceramic`;
const WINTER_POST = "/post/why-winter-vehicle-detailing-is-essential-in-nova-scotia/";

export const metadata: Metadata = pageMeta({
  title: "Ceramic Coating in Halifax, NS | Jake's Car Detailing",
  description:
    "A ceramic coating makes water bead and makes salt and road film easier to wash off. Ceramic coating in Halifax by Jake's Car Detailing. Free quotes.",
  path: PATH,
});

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Ceramic coating",
  serviceType: "Ceramic coating",
  description:
    "A protective ceramic coating applied to clean, corrected paint so that water beads off and the vehicle is easier to wash.",
  url: canonicalUrl(PATH),
  provider: { "@id": `${SITE_URL}/#business` },
  areaServed: { "@type": "City", name: `${BRAND.city}, ${BRAND.regionName}` },
};

const PREP = [
  {
    name: "Wash",
    body: "A foam pre-wash and a two-bucket hand wash, the same steps as the exterior detail.",
  },
  {
    name: "Decontaminate",
    body: "Bonded dirt and road film come off the paint, so the surface is truly clean.",
  },
  {
    name: "Correct the paint",
    body: (
      <>
        Swirls and haze are polished out first with{" "}
        <Link href="/paint-correction/" className="link">
          paint correction
        </Link>
        . A coating seals in whatever is under it.
      </>
    ),
  },
  {
    name: "Apply the coating",
    body: "The coating goes on panel by panel, is levelled and wiped down by hand.",
  },
  {
    name: "Let it cure",
    body: "The coating needs time to harden once it is on.",
  },
];

const FAQ = [
  {
    q: "Does my car need paint correction first?",
    a: (
      <p>
        Usually some. A coating sits on top of whatever is there, so swirls and haze are polished out before it goes
        on. A new or well kept car may need very little.{" "}
        <Link href="/paint-correction/" className="link">
          Paint correction
        </Link>{" "}
        is checked and covered in the same free quote.
      </p>
    ),
    text: "Usually some. A coating sits on top of whatever is there, so swirls and haze are polished out before it goes on. A new or well kept car may need very little. Paint correction is checked and covered in the same free quote.",
  },
  {
    q: "How long does a ceramic coating last?",
    a: (
      <p>
        It depends on the coating and on how the car is washed and stored. Ask Jake when you get your free quote.
      </p>
    ),
    text: "It depends on the coating and on how the car is washed and stored. Ask Jake when you get your free quote.",
  },
  {
    q: "What does it cost?",
    a: (
      <p>
        Every coating starts with a free quote.{" "}
        <Link href={QUOTE_HREF} className="link">
          Tell us about your vehicle
        </Link>{" "}
        and Jake will get back to you. No pressure.
      </p>
    ),
    text: "Every coating starts with a free quote. Tell us about your vehicle and Jake will get back to you. No pressure.",
  },
  {
    q: "How do I wash a coated car?",
    a: (
      <p>
        By hand, with a gentle soap and a clean mitt. It takes less effort than before, because dirt has less to hold
        on to. Brush tunnels put swirls into any paint, coated or not.
      </p>
    ),
    text: "By hand, with a gentle soap and a clean mitt. It takes less effort than before, because dirt has less to hold on to. Brush tunnels put swirls into any paint, coated or not.",
  },
  {
    q: "Is it worth it on a daily driver?",
    a: (
      <p>
        A car that is out in the salt and the rain every day is the one that gets the most from being easy to clean. If
        you are not sure, ask Jake when you get your free quote.
      </p>
    ),
    text: "A car that is out in the salt and the rain every day is the one that gets the most from being easy to clean. If you are not sure, ask Jake when you get your free quote.",
  },
];

export default function CeramicCoatingPage() {
  const hero = car("huracan");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <PageHero
        title={["Ceramic", "coating."]}
        lede={
          <p>
            A hard, slick layer over corrected paint that sheds water and makes every wash easier. Tell us about your
            vehicle and get a free quote.
          </p>
        }
        photo={{ slug: hero.slug, alt: hero.alt }}
        desktopCut="w"
        focus="100% 50%"
      >
        <QuoteActions service="ceramic" />
        <GoogleRating className="mt-5 text-white transition-colors hover:text-sky" />
      </PageHero>

      {/* The centrepiece: water on bare paint against water on coated paint. */}
      <section className="on-dark section">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)] lg:items-end lg:gap-20">
            <h2 className="d2">Watch what water does.</h2>
            <p className="lede muted">
              On bare paint, water spreads out and sits. On coated paint it pulls into tight beads and rolls away.
            </p>
          </div>
          <BeadDemo className="mt-12 lg:mt-16" />
        </div>
      </section>

      {/* What it is, and why it matters here. */}
      <section className="on-light section">
        <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-24">
          <div>
            <h2 className="d2">What a ceramic coating is.</h2>
            <div className="mt-8 grid max-w-[56ch] gap-5">
              <p className="lede">
                A liquid that is wiped onto clean paint and cures into a thin, hard, very slick layer on top of the
                clear coat.
              </p>
              <p className="muted">
                Wax sits on the surface and washes away. A coating bonds to it. Once it has cured, water, salt and road
                film have much less to hold on to, so they rinse off instead of sticking.
              </p>
              <p className="muted">
                The paint underneath has to be right first. A coating does not hide anything. It keeps the finish it
                was given, which is why paint is usually corrected before it is coated.
              </p>
            </div>
            <QuoteActions service="ceramic" className="mt-10" />
          </div>

          <div className="lg:pt-3">
            <h3 className="d3">Why it matters in {BRAND.city}</h3>
            <p className="muted mt-4 max-w-[46ch]">
              Road salt, slush and coastal air sit on a car for months here. The easier they come off, the less time
              they spend on your paint.
            </p>
            <figure className="mt-9 pt-8" style={{ borderTop: "1px solid var(--line)" }}>
              <blockquote>
                <p className="d3 max-w-[24ch] !leading-[1.2]">
                  &ldquo;A properly protected vehicle is easier to clean and better prepared to handle winter driving
                  conditions.&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-6">
                <span className="label block">Jake, in his winter guide</span>
                <Link href={WINTER_POST} className="link mt-2 inline-block">
                  Read the guide
                </Link>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* The order it happens in. */}
      <section className="on-spruce section">
        <div className="wrap">
          <div className="max-w-[860px]">
            <h2 className="d2">The coating is the last step.</h2>
            <p className="lede muted mt-6">
              Most of the work in a coating is what happens before it. The paint is washed, cleaned and corrected, and
              only then protected.
            </p>
          </div>
          <div className="mt-12 lg:mt-16">
            <StepColumns steps={PREP} />
          </div>
        </div>
      </section>

      <DoesDoesNot
        tone="on-light"
        title="What a coating will and will not do."
        intro="A coating is real protection, and it is also oversold. Here is the plain version."
        does={[
          { head: "Makes water bead and run off", body: "Rain and rinse water leave the panel instead of sitting on it." },
          { head: "Makes washing easier", body: "Salt, dirt and road film have less to cling to, so they come off with less work." },
          { head: "Adds gloss and depth", body: "Over corrected paint, a coating gives a wet, glassy look." },
          { head: "Puts a layer over your clear coat", body: "The weather meets the coating first, and the paint second." },
        ]}
        doesNot={[
          { head: "Stop rock chips or dents", body: "It is a thin layer, not armour." },
          { head: "Prevent every scratch", body: "Careless washing will still mark a coated car." },
          { head: "Replace washing", body: "The car still gets dirty. It just cleans up faster." },
          { head: "Hide swirls", body: "Whatever is under the coating stays visible. The fix for swirls is paint correction." },
        ]}
      />

      <CarBand title="A few of the cars Jake has detailed." slugs={["bmw-3-series", "range-rover-sport", "acura-tlx", "mercedes-glc"]} />

      <FaqSection title="Ceramic coating questions." items={FAQ} tone="on-spruce" />

      <BookBand title="Get a coating quote." cta={{ label: QUOTE_LABEL, href: QUOTE_HREF }} />
    </>
  );
}
