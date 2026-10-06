/**
 * Real Google reviews for Jake's Car Detailing, read from his Google Business
 * Profile through the Places API on 2026-10-05 (place id in constants.ts).
 *
 * Every `text` is a verbatim excerpt: whole sentences, nothing reworded.
 * `full` is false when the review on Google is longer than the excerpt.
 * Do not edit the wording. To refresh, pull the listing again and re-excerpt.
 * No aggregateRating goes in JSON-LD (Google does not allow self-serving
 * review markup for a local business).
 */
export interface Review {
  author: string;
  text: string;
  full: boolean;
  about?: string; // what the reviewer says they had done, in their words
}

export const LEAD_REVIEW: Review = {
  author: "Ashley Carter",
  text: "He’s professional, easy to talk to, and takes real pride in his work. You can tell he cares about the results and not just getting the job done quickly.",
  full: false,
  about: "Full inside-and-out detail",
};

export const REVIEWS: Review[] = [
  {
    author: "colbY -_-",
    text: "Jake detailed my C5, and I honestly couldn’t believe the difference when I picked it up. It looked cleaner than the day I bought it.",
    full: false,
    about: "Corvette C5",
  },
  {
    author: "Ty Perry",
    text: "He always gets every little nook and cranny even the ones that I don’t think about until I notice it’s clean.",
    full: false,
  },
  {
    author: "Sam Humphreys",
    text: "I messaged Jake at the last minute to see if he could fit my vehicle in for a detail, and he went above and beyond to make it happen.",
    full: false,
  },
  {
    author: "Scott",
    text: "Jake did an absolute amazing job detailing my car! Definitely recommend him. One of the best to do it!",
    full: true,
  },
];

/** Used on the paint correction page. */
export const CORRECTION_REVIEW: Review = {
  author: "Mya Gennette",
  text: "I took my Mini Cooper to Jake’s Car Detailing for a paint correction and clay bar treatment, and I honestly can’t believe the difference. The paint has never looked this good, not even when I first got the car.",
  full: false,
  about: "Paint correction and clay bar, Mini Cooper",
};

export const CORRECTION_REVIEW_MORE =
  "The swirls and imperfections were pretty bad, but now the finish is so smooth and glossy that it looks like the car has been repainted.";

/** Used on the full detail page. */
export const VALUE_REVIEW: Review = {
  author: "Ashley Carter",
  text: "For $200, the full inside-and-out detail is excellent value for the quality you get.",
  full: false,
};
