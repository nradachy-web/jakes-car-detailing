import type { Metadata } from "next";
import BookingForm from "@/components/forms/BookingForm";
import FaqSection from "@/components/sections/FaqSection";
import { GoogleRating } from "@/components/ui/Stars";
import { BRAND, HOURS, PACKAGES, QUOTED } from "@/lib/constants";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Book a Detail in Halifax, NS | Jake's Car Detailing",
  description:
    "Book an exterior, interior or full detail with Jake's Car Detailing in Halifax, or ask for a free quote on paint correction and ceramic coating. Call or text (782) 321-8823.",
  path: "/book-online",
});

const hoursText = HOURS.map((h) => `${h.days}: ${h.hours}`).join(". ");

const FAQ = [
  {
    q: "How does booking work?",
    text: `Send the form with your vehicle and the day you would like, or call or text ${BRAND.phone}. Jake confirms the time with you directly.`,
    a: (
      <p>
        Send the form with your vehicle and the day you would like, or call or text{" "}
        <a href={`tel:${BRAND.phoneTel}`} className="link">
          {BRAND.phone}
        </a>
        . Jake confirms the time with you directly.
      </p>
    ),
  },
  {
    q: "How long does a detail take?",
    text: PACKAGES.map((p) => `${p.name}: about ${p.duration}`).join(". ") + ".",
    a: (
      <ul className="grid gap-1.5">
        {PACKAGES.map((p) => (
          <li key={p.id}>
            {p.name}: about {p.duration}
          </li>
        ))}
      </ul>
    ),
  },
  {
    q: "What does it cost?",
    text:
      PACKAGES.map((p) => `${p.name} is $${p.price}`).join(", ") +
      ", in Canadian dollars. Paint correction and ceramic coating are quoted for free once Jake knows the car.",
    a: (
      <p>
        {PACKAGES.map((p) => `${p.name} is $${p.price}`).join(", ")}, in Canadian dollars. Paint correction and ceramic
        coating are quoted for free once Jake knows the car.
      </p>
    ),
  },
  {
    q: "Where are you, and when are you open?",
    text: `${BRAND.name} is in ${BRAND.city}, ${BRAND.regionName}. ${hoursText}.`,
    a: (
      <>
        <p>
          {BRAND.name} is in {BRAND.city}, {BRAND.regionName}. The{" "}
          <a href={BRAND.google.mapsUrl} target="_blank" rel="noopener" className="link">
            Google listing
          </a>{" "}
          has the map.
        </p>
        <ul className="mt-3 grid gap-1.5">
          {HOURS.map((h) => (
            <li key={h.days}>
              {h.days}: {h.hours}
            </li>
          ))}
        </ul>
      </>
    ),
  },
];

export default function BookOnline() {
  return (
    <>
      <section className="on-dark">
        <div className="wrap pt-[calc(var(--nav-h)+clamp(40px,7vw,88px))] pb-[clamp(40px,6vw,72px)]">
          <h1 className="d1 !text-[clamp(2.7rem,6.6vw,6rem)]">
            <span className="rise">
              <span>Book a detail.</span>
            </span>
          </h1>
          <p className="lede mt-6 text-white/90">
            Tell Jake about your vehicle and when suits you. Paint correction and ceramic coating start with a free
            quote.
          </p>
          <GoogleRating className="mt-7 text-white transition-colors hover:text-sky" />
        </div>
      </section>

      <section className="on-light pt-[clamp(48px,6vw,88px)] pb-[clamp(72px,9vw,128px)]">
        <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] lg:gap-20 xl:gap-28">
          <div>
            <h2 className="d3">Your booking request</h2>
            <div className="mt-8">
              <BookingForm />
            </div>
          </div>

          <aside className="lg:pt-1">
            <h2 className="d3">Rather talk to Jake?</h2>
            <ul className="mt-6" style={{ borderTop: "1px solid var(--line)" }}>
              {[
                { label: "Call", value: BRAND.phone, href: `tel:${BRAND.phoneTel}` },
                { label: "Text", value: BRAND.phone, href: `sms:${BRAND.phoneTel}` },
                { label: "Email", value: BRAND.email, href: `mailto:${BRAND.email}` },
                { label: "Find us", value: `${BRAND.city}, ${BRAND.region} on Google Maps`, href: BRAND.google.mapsUrl, external: true },
              ].map((c) => (
                <li key={c.label} style={{ borderBottom: "1px solid var(--line)" }}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener" } : {})}
                    className="group flex items-baseline justify-between gap-6 py-4"
                  >
                    <span className="label muted">{c.label}</span>
                    <span className="label text-right break-all transition-colors group-hover:text-blue sm:break-normal">{c.value}</span>
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="label muted mt-10">Hours</h3>
            <dl className="mt-3 grid gap-1.5">
              {HOURS.map((h) => (
                <div key={h.days} className="flex justify-between gap-6">
                  <dt>{h.days}</dt>
                  <dd className="muted whitespace-nowrap">{h.hours}</dd>
                </div>
              ))}
            </dl>

            <h3 className="label muted mt-10">Prices</h3>
            <dl className="mt-3 grid gap-1.5">
              {PACKAGES.map((p) => (
                <div key={p.id} className="flex justify-between gap-6">
                  <dt>{p.name}</dt>
                  <dd className="label whitespace-nowrap">${p.price}</dd>
                </div>
              ))}
              {QUOTED.map((q) => (
                <div key={q.id} className="flex justify-between gap-6">
                  <dt>{q.name}</dt>
                  <dd className="muted whitespace-nowrap">Free quote</dd>
                </div>
              ))}
            </dl>
            <p className="muted mt-3 text-[0.875rem]">Prices in Canadian dollars.</p>
          </aside>
        </div>
      </section>

      <FaqSection title="Before you book." items={FAQ} tone="on-dark" />
    </>
  );
}
