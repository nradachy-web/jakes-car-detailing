import type { Metadata } from "next";
import Link from "next/link";
import SwirlDemo from "@/components/fx/SwirlDemo";
import DoesDoesNot from "@/components/protection/DoesDoesNot";
import PullQuote from "@/components/protection/PullQuote";
import QuoteActions from "@/components/protection/QuoteActions";
import { StepRows } from "@/components/protection/Steps";
import BookBand from "@/components/sections/BookBand";
import FaqSection from "@/components/sections/FaqSection";
import PageHero from "@/components/sections/PageHero";
import { GoogleRating } from "@/components/ui/Stars";
import { BOOK_HREF, BRAND, QUOTE_LABEL, SITE_URL } from "@/lib/constants";
import { car } from "@/lib/photos";
import { CORRECTION_REVIEW, CORRECTION_REVIEW_MORE } from "@/lib/reviews";
import { canonicalUrl, pageMeta } from "@/lib/seo";

/**
 * Paint correction is a new service. Jake has not supplied prices, products,
 * stage counts or timings, so none appear here. Everything on this page is
 * either general detailing knowledge or the one real Google review that
 * mentions a correction (lib/reviews.ts). Keep it that way until he confirms
 * the details.
 */

const PATH = "/paint-correction/";
const QUOTE_HREF = `${BOOK_HREF}?service=correction`;

export const metadata: Metadata = pageMeta({
  title: "Paint Correction in Halifax, NS | Jake's Car Detailing",
  description:
    "Machine polishing that removes swirl marks and light scratches and brings back depth and gloss. Paint correction in Halifax by Jake's Car Detailing. Free quotes.",
  path: PATH,
});

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Paint correction",
  serviceType: "Paint correction",
  description:
    "Machine polishing that removes swirl marks and light scratches from a vehicle's clear coat and restores depth and gloss.",
  url: canonicalUrl(PATH),
  provider: { "@id": `${SITE_URL}/#business` },
  areaServed: { "@type": "City", name: `${BRAND.city}, ${BRAND.regionName}` },
};

// What the visitor is looking at in the swirl panel.
const READING = [
  {
    head: "The rings",
    body: "Swirl marks are fine scratches running in every direction. You only see the ones that cross the light, so they form circles around it and follow it as it moves.",
  },
  {
    head: "The haze",
    body: "Thousands of tiny scratches scatter the light. The reflection spreads into a glow, and the colour underneath looks flat.",
  },
  {
    head: "The clean point",
    body: "With the marks gone, the light comes back as one sharp point. That sharpness is what your eye reads as gloss.",
  },
];

const SIGNS = [
  "Rings or cobwebs around the sun's reflection",
  "Paint that looks grey or flat even when it is clean",
  "Fine straight scratches from brushes or drying towels",
  "Hazy patches that washing does not shift",
  "A dark car that only looks right when it is wet",
];

const PROCESS = [
  {
    name: "Inspect under a light",
    body: "The paint is checked panel by panel with an inspection light to see what is there: swirls, scratches, haze, and anything that will not polish out.",
  },
  {
    name: "Wash and decontaminate",
    body: "A hand wash and a full decontamination come before any polishing, so the polisher works on clean paint and nothing gets dragged across it.",
  },
  {
    name: "Machine polish",
    body: "A machine polisher and abrasive polish level a very thin layer of the clear coat, taking the marks with it. How much work that is depends on the paint.",
  },
  {
    name: "Inspect again",
    body: "Back under the light to check the marks are out of the paint, not just hidden.",
  },
  {
    name: "Protect",
    body: (
      <>
        Freshly corrected paint is bare paint. It is the best moment to put a{" "}
        <Link href="/ceramic-coating/" className="link">
          ceramic coating
        </Link>{" "}
        on it.
      </>
    ),
  },
];

const FAQ = [
  {
    q: "Will it remove every scratch?",
    a: (
      <p>
        No. Polishing removes marks that sit in the clear coat, which covers swirls, haze and most wash scratches. A
        scratch that goes through the clear coat cannot be polished out, though it can usually be made less obvious.
      </p>
    ),
    text: "No. Polishing removes marks that sit in the clear coat, which covers swirls, haze and most wash scratches. A scratch that goes through the clear coat cannot be polished out, though it can usually be made less obvious.",
  },
  {
    q: "How long does it take?",
    a: (
      <p>
        It depends on the size of the vehicle, the colour and how marked the paint is. Ask Jake when you get your free
        quote.
      </p>
    ),
    text: "It depends on the size of the vehicle, the colour and how marked the paint is. Ask Jake when you get your free quote.",
  },
  {
    q: "Do I need a ceramic coating after?",
    a: (
      <p>
        You do not have to, but corrected paint has nothing on it, so it is the best time to protect it. A{" "}
        <Link href="/ceramic-coating/" className="link">
          ceramic coating
        </Link>{" "}
        makes the car easier to wash, and gentle washing is what keeps swirls from coming back.
      </p>
    ),
    text: "You do not have to, but corrected paint has nothing on it, so it is the best time to protect it. A ceramic coating makes the car easier to wash, and gentle washing is what keeps swirls from coming back.",
  },
  {
    q: "How do I get a quote?",
    a: (
      <p>
        <Link href={QUOTE_HREF} className="link">
          Tell us about your vehicle
        </Link>{" "}
        or call or text {BRAND.phone}. Quotes are free and there is no pressure.
      </p>
    ),
    text: `Tell us about your vehicle on the booking page, or call or text ${BRAND.phone}. Quotes are free and there is no pressure.`,
  },
  {
    q: "Is a daily driver worth correcting?",
    a: (
      <p>
        Often it is the car that changes the most, because it has been through the most washes. If the paint looks dull
        or swirled in the sun, there is usually a lot to gain.
      </p>
    ),
    text: "Often it is the car that changes the most, because it has been through the most washes. If the paint looks dull or swirled in the sun, there is usually a lot to gain.",
  },
];

export default function PaintCorrectionPage() {
  const hero = car("audi-r8");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <PageHero
        title={["Paint", "correction."]}
        lede={
          <p>
            Machine polishing that takes out swirl marks and light scratches and brings the depth and gloss back. Tell us
            about your vehicle and get a free quote.
          </p>
        }
        photo={{ slug: hero.slug, alt: hero.alt }}
        desktopCut="w"
        focus="0% 55%"
      >
        <QuoteActions service="correction" />
        <GoogleRating className="mt-5 text-white transition-colors hover:text-sky" />
      </PageHero>

      {/* The centrepiece: the swirl panel, and how to read it. */}
      <section className="on-dark section">
        <div className="wrap">
          <div className="max-w-[900px]">
            <h2 className="d2">Put a light on it.</h2>
            <p className="lede muted mt-6">
              Paint that looks fine in the shade can look very different in the sun. Move the light across this panel,
              then step through the stages to see what machine polishing does to the marks.
            </p>
          </div>

          <SwirlDemo className="mt-12 lg:mt-16" />

          <dl className="mt-14 grid gap-x-10 border-t border-white/14 md:grid-cols-3 lg:mt-20">
            {READING.map((r) => (
              <div key={r.head} className="border-b border-white/14 py-7 md:border-b-0 md:pb-0">
                <dt className="d4">{r.head}</dt>
                <dd className="muted mt-3 max-w-[40ch] text-[0.9688rem]">{r.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* What it is, and how to tell a car needs it. */}
      <section className="on-light section">
        <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-24">
          <div>
            <h2 className="d2">What paint correction is.</h2>
            <div className="mt-8 grid max-w-[56ch] gap-5">
              <p className="lede">
                Your colour sits under a clear coat. Every swirl, wash scratch and patch of haze you can see is damage
                in the top of that clear layer.
              </p>
              <p className="muted">
                Correction is machine polishing: a polisher and an abrasive polish level a very thin layer of clear
                coat until the surface is flat again. A flat surface reflects light cleanly, and that is where depth
                and gloss come from.
              </p>
              <p className="muted">
                Because it removes a little clear coat each time, it is done carefully and only as far as the paint
                needs.
              </p>
            </div>
            <QuoteActions service="correction" className="mt-10" />
          </div>

          <div>
            <h3 className="d3">Signs you can see yourself</h3>
            <p className="muted mt-3">Look at the car in direct sun, or under a single bright light at night.</p>
            <ul className="mt-7" style={{ borderTop: "1px solid var(--line)" }}>
              {SIGNS.map((sign) => (
                <li key={sign} className="label py-4 text-[0.9688rem]" style={{ borderBottom: "1px solid var(--line)" }}>
                  {sign}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The process, in order. */}
      <section className="on-spruce section">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+32px)] lg:self-start">
            <h2 className="d2">How a correction usually goes.</h2>
            <p className="lede muted mt-6">
              The usual order. The details for your car come with your free quote.
            </p>
          </div>
          <StepRows steps={PROCESS} />
        </div>
      </section>

      <PullQuote review={CORRECTION_REVIEW} more={CORRECTION_REVIEW_MORE} />

      <DoesDoesNot
        title="Straight answers."
        intro="Polishing is what actually removes swirl marks. It also has limits, and it is better to know them before you book."
        does={[
          { head: "Removes swirl marks", body: "The rings and cobwebs that show around a light or the sun." },
          { head: "Takes out light wash scratches", body: "Marks from brushes, dirty mitts and drying towels." },
          { head: "Clears haze and dullness", body: "So the colour looks deep again and reflections come back sharp." },
          { head: "Prepares the paint for protection", body: "A coating bonds best to clean, corrected paint." },
        ]}
        doesNot={[
          {
            head: "Fix scratches through the clear coat",
            body: "If you can catch it with a fingernail, polishing can soften how it looks but will not remove it.",
          },
          { head: "Repair chips, dents or peeling clear coat", body: "Those need a body shop, not a polisher." },
          {
            head: "Keep new swirls away",
            body: "How the car is washed afterwards decides that. Hand washing keeps the finish. Brush tunnels undo it.",
          },
        ]}
      />

      <FaqSection title="Paint correction questions." items={FAQ} tone="on-spruce" />

      <BookBand title="Get your paint looked at." cta={{ label: QUOTE_LABEL, href: QUOTE_HREF }} />
    </>
  );
}
