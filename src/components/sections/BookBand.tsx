import Link from "next/link";
import { BOOK_HREF, BOOK_LABEL, BRAND, HOURS } from "@/lib/constants";

/** Closing band in the Huracán blue: the phone number at headline size. */
export default function BookBand({
  title = "Book your detail.",
  cta,
}: {
  title?: string;
  /** Overrides the main button, e.g. "Get a free quote" on the quote-only services. */
  cta?: { label: string; href: string };
}) {
  return (
    <section className="on-blue section">
      <div className="wrap">
        <h2 className="d2">{title}</h2>
        <a
          href={`tel:${BRAND.phoneTel}`}
          className="figure mt-8 block w-fit whitespace-nowrap text-[clamp(2.1rem,8.3vw,8rem)] underline decoration-white/0 decoration-[3px] underline-offset-[0.12em] transition-[text-decoration-color] duration-300 hover:decoration-white"
        >
          {BRAND.phone}
        </a>
        <div className="mt-10 grid gap-10 border-t border-white/30 pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <dl className="grid gap-x-10 gap-y-2 sm:grid-cols-3">
            {HOURS.map((h) => (
              <div key={h.days}>
                <dt className="label">{h.days}</dt>
                <dd className="muted">{h.hours}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-3">
            <Link href={cta?.href ?? BOOK_HREF} className="btn btn-solid">
              {cta?.label ?? BOOK_LABEL}
            </Link>
            <a href={`sms:${BRAND.phoneTel}`} className="btn btn-ghost">
              Text Jake
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
