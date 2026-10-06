import { Stars } from "@/components/ui/Stars";
import { BRAND } from "@/lib/constants";
import { LEAD_REVIEW, REVIEWS, type Review } from "@/lib/reviews";

/**
 * Real Google reviews, quoted word for word (see lib/reviews.ts). The rating
 * and count are his live Google numbers on the date shown.
 */
export default function Reviews({ lead = LEAD_REVIEW, rest = REVIEWS }: { lead?: Review; rest?: Review[] }) {
  const { rating, reviewCount, mapsUrl, asOf } = BRAND.google;
  return (
    <section id="reviews" className="on-light section">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <h2 className="label muted">What customers say</h2>
            <p className="figure mt-5 text-[clamp(5.5rem,11vw,9.5rem)]">{rating.toFixed(1)}</p>
            <Stars className="mt-5 text-[#c98a00]" />
            <p className="mt-3">
              From {reviewCount} reviews on Google
              <span className="muted block text-[0.875rem]">As of {asOf}</span>
            </p>
            <a href={mapsUrl} target="_blank" rel="noopener" className="link mt-6 inline-block">
              Read them on Google
            </a>
          </div>

          <div>
            <figure>
              <blockquote className="d3 max-w-[30ch] !leading-[1.22] lg:text-[clamp(1.7rem,2.7vw,2.5rem)]">
                <p>&ldquo;{lead.text}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-6">
                <span className="label">{lead.author}</span>
                <span className="muted block text-[0.875rem]">
                  Google review{lead.about ? `, ${lead.about}` : ""}
                </span>
              </figcaption>
            </figure>

            <ul className="mt-12 grid gap-x-12 sm:grid-cols-2 lg:mt-16" style={{ borderTop: "1px solid var(--line)" }}>
              {rest.map((r) => (
                <li key={r.author} className="py-7" style={{ borderBottom: "1px solid var(--line)" }}>
                  <figure>
                    <blockquote>
                      <p>&ldquo;{r.text}&rdquo;</p>
                    </blockquote>
                    <figcaption className="mt-4">
                      <span className="label">{r.author}</span>
                      <span className="muted block text-[0.875rem]">Google review{r.about ? `, ${r.about}` : ""}</span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
