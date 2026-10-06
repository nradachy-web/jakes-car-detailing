import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Five filled stars. Decorative: the rating is always written out beside it. */
export function Stars({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex gap-[3px]", className)} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 .8l2.2 4.6 5 .7-3.6 3.5.9 5L8 12.2 3.500 14.600l.9-5L.8 6.100l5-.7L8 .8z" />
        </svg>
      ))}
    </span>
  );
}

/** "5.0 from 52 Google reviews", linked to his Google listing. */
export function GoogleRating({ className }: { className?: string }) {
  const { rating, reviewCount, mapsUrl } = BRAND.google;
  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener"
      className={cn("group inline-flex min-h-11 flex-wrap items-center gap-x-3 gap-y-1", className)}
    >
      <Stars className="text-[#f5b83d]" />
      <span className="label">
        {rating.toFixed(1)} from {reviewCount} Google reviews
      </span>
    </a>
  );
}
