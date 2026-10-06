import { BRAND } from "@/lib/constants";
import { LEAD_REVIEW, REVIEWS, type Review } from "@/lib/reviews";

/**
 * What customers say about Jake himself. Three real Google reviews, quoted
 * word for word from lib/reviews.ts.
 */
export default function AboutVoices() {
  const byAuthor = (name: string) => REVIEWS.find((r) => r.author === name);
  const voices = [LEAD_REVIEW, byAuthor("Sam Humphreys"), byAuthor("Ty Perry")].filter((r): r is Review => Boolean(r));
  const { reviewCount, mapsUrl } = BRAND.google;

  return (
    <section className="on-dark section">
      <div className="wrap">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <h2 className="d2 max-w-[820px]">What customers say about Jake.</h2>
          <a href={mapsUrl} target="_blank" rel="noopener" className="link shrink-0 self-start lg:self-auto">
            Read all {reviewCount} reviews on Google
          </a>
        </div>

        <ul className="mt-12 grid gap-x-12 border-t border-white/14 lg:mt-16 lg:grid-cols-3 lg:border-t-0">
          {voices.map((r) => (
            <li key={r.author} className="border-b border-white/14 py-8 lg:border-t lg:border-b-0 lg:pb-0">
              <figure className="flex h-full flex-col">
                <blockquote className="d4 font-[520] leading-[1.42]">
                  <p>&ldquo;{r.text}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-6 lg:mt-auto lg:pt-8">
                  <span className="label block">{r.author}</span>
                  <span className="muted block text-[0.875rem]">Google review</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
