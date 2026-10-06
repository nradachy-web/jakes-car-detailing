import { Stars } from "@/components/ui/Stars";
import { BRAND } from "@/lib/constants";
import type { Review } from "@/lib/reviews";

/**
 * One real Google review at headline size. `more` is a later sentence from the
 * same review, also word for word, set smaller underneath.
 */
export default function PullQuote({ review, more }: { review: Review; more?: string }) {
  return (
    <section className="on-light section">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <h2 className="label muted">From a customer</h2>
          <Stars className="mt-5 text-[#c98a00]" />
          <p className="mt-4">
            <span className="label block">{review.author}</span>
            <span className="muted block text-[0.875rem]">Google review{review.about ? `, ${review.about}` : ""}</span>
          </p>
          <a href={BRAND.google.mapsUrl} target="_blank" rel="noopener" className="link mt-6 inline-block">
            Read it on Google
          </a>
        </div>
        <figure>
          <blockquote>
            <p className="d3 max-w-[32ch] !leading-[1.22] lg:text-[clamp(1.7rem,2.7vw,2.5rem)]">&ldquo;{review.text}&rdquo;</p>
            {more ? <p className="lede muted mt-8">&ldquo;{more}&rdquo;</p> : null}
          </blockquote>
          <figcaption className="sr-only">
            {review.author}, Google review
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
