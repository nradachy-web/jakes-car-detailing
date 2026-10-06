/**
 * Single source of truth for every fact on the site.
 *
 * Where each fact comes from (checked 2026-10-05):
 *  - Name, phone, email, city, package names, prices, durations and package
 *    descriptions: Jake's own site, jakesdetailing.ca (home, /book-online,
 *    /service-page/*).
 *  - Hours, rating, review count, Maps link: his Google Business Profile
 *    (place id below), read through the Places API.
 *  - Owner name: the byline on his own blog posts.
 *  - Ceramic coating and paint correction: new services per Jake. No prices,
 *    product lines, durability figures or warranty terms have been supplied,
 *    so none appear anywhere. Both are quote only until he confirms them.
 *
 * Do not add a claim here that is not on one of those sources.
 */

export const SITE_URL = "https://www.jakesdetailing.ca";

/**
 * Where share images are fetched from. The GitHub Pages preview sets
 * NEXT_PUBLIC_SHARE_ORIGIN (deploy.yml) so a texted preview link still unfurls
 * with the photo; jakesdetailing.ca does not serve this build's files yet.
 */
export const SHARE_ORIGIN = process.env.NEXT_PUBLIC_SHARE_ORIGIN || SITE_URL;
export const OG_IMAGE_URL = `${SHARE_ORIGIN}/og-image.jpg`;

export const BRAND = {
  name: "Jake's Car Detailing",
  tagline: "Detailing done right.",
  owner: "Jake Jeffery",
  phone: "(782) 321-8823",
  phoneTel: "+17823218823",
  email: "jakescardetailing@gmail.com",
  city: "Halifax",
  region: "NS",
  regionName: "Nova Scotia",
  country: "CA",
  // Google Business Profile.
  google: {
    placeId: "ChIJPWt-TD82cEMR_8QWf5kzmak",
    mapsUrl: "https://maps.google.com/?cid=12220855798201763071",
    rating: 5.0,
    reviewCount: 52,
    asOf: "October 5, 2026",
  },
} as const;

/** Opening hours as listed on the Google Business Profile. */
export const HOURS: { days: string; short: string; hours: string; schema: string[]; opens: string; closes: string }[] = [
  { days: "Monday and Tuesday", short: "Mon, Tue", hours: "9:00 am to 8:00 pm", schema: ["Monday", "Tuesday"], opens: "09:00", closes: "20:00" },
  { days: "Wednesday and Thursday", short: "Wed, Thu", hours: "9:30 am to 8:00 pm", schema: ["Wednesday", "Thursday"], opens: "09:30", closes: "20:00" },
  { days: "Friday to Sunday", short: "Fri to Sun", hours: "9:00 am to 5:00 pm", schema: ["Friday", "Saturday", "Sunday"], opens: "09:00", closes: "17:00" },
];

export type PackageId = "exterior" | "interior" | "full";

export interface DetailPackage {
  id: PackageId;
  slug: string; // route, e.g. /exterior-detailing/
  short: string; // tab label
  name: string; // Jake's own package name
  price: number; // Canadian dollars
  duration: string;
  line: string; // one-line summary
  body: string; // his description, lightly edited
  includes: string[];
  photo: { slug: string; alt: string; credit?: string };
}

export const PACKAGES: DetailPackage[] = [
  {
    id: "exterior",
    slug: "/exterior-detailing/",
    short: "Exterior",
    name: "Premium Exterior Detailing",
    price: 100,
    duration: "1 hr 30 min",
    line: "A safe hand wash and a full decontamination, dried by hand.",
    body: "A full snow foam pre-wash, a safe two-bucket hand wash, wheel and tire cleaning, and a complete exterior decontamination to remove dirt and road grime. Then the vehicle is carefully dried with premium microfiber towels, leaving a clean, glossy finish.",
    includes: [
      "Snow foam pre-wash",
      "Two-bucket hand wash",
      "Wheel and tire cleaning",
      "Exterior decontamination",
      "Microfiber hand dry",
    ],
    photo: { slug: "bmw-e46", alt: "A grey BMW coupe on a wet driveway" },
  },
  {
    id: "interior",
    slug: "/interior-detailing/",
    short: "Interior",
    name: "Premium Interior Detailing",
    price: 150,
    duration: "1 hr",
    line: "A deep clean for the cabin, from the carpets to the dash.",
    body: "A deep clean for your vehicle's interior: vacuuming, upholstery cleaning and dashboard polishing, done with premium products.",
    includes: ["Interior vacuum", "Upholstery cleaning", "Dashboard polishing"],
    photo: { slug: "granturismo-interior", alt: "The red leather interior of a Maserati GranTurismo" },
  },
  {
    id: "full",
    slug: "/full-detail/",
    short: "Full detail",
    name: "Premium Full Detail",
    price: 200,
    duration: "3 hr",
    line: "Inside and out, in one appointment.",
    body: "A complete interior and exterior detail, leaving every part of your vehicle professionally cleaned and restored to a pristine finish.",
    includes: ["Complete exterior detail", "Complete interior detail"],
    photo: {
      slug: "jake-dry-huracan",
      alt: "Jake drying a blue Lamborghini Huracán with a towel",
      credit: "@breckenmutch",
    },
  },
];

export interface QuotedService {
  id: "ceramic" | "correction";
  slug: string;
  name: string;
  line: string;
}

/** New services. Quote only: no prices or product claims until Jake supplies them. */
export const QUOTED: QuotedService[] = [
  {
    id: "correction",
    slug: "/paint-correction/",
    name: "Paint correction",
    line: "Machine polishing that removes swirl marks and brings back depth and gloss.",
  },
  {
    id: "ceramic",
    slug: "/ceramic-coating/",
    name: "Ceramic coating",
    line: "A hard, slick layer over corrected paint that sheds water and makes every wash easier.",
  },
];

/** Options for the booking form's service select. */
export const SERVICE_OPTIONS: { value: string; label: string }[] = [
  ...PACKAGES.map((p) => ({ value: p.id, label: `${p.name} ($${p.price})` })),
  { value: "correction", label: "Paint correction (free quote)" },
  { value: "ceramic", label: "Ceramic coating (free quote)" },
  { value: "unsure", label: "Not sure yet" },
];

export const BOOK_HREF = "/book-online/";
export const BOOK_LABEL = "Book a detail";
export const QUOTE_LABEL = "Get a free quote";

export const NAV: { label: string; href: string; children?: { label: string; href: string; meta: string }[] }[] = [
  {
    label: "Detailing",
    href: "/#packages",
    children: PACKAGES.map((p) => ({ label: p.name, href: p.slug, meta: `$${p.price}` })),
  },
  { label: "Paint correction", href: "/paint-correction/" },
  { label: "Ceramic coating", href: "/ceramic-coating/" },
  { label: "Our work", href: "/portfolio/" },
  { label: "About", href: "/about/" },
];

/** The exterior wash, in the order it happens. From Jake's own service description. */
export const METHOD: { name: string; body: string }[] = [
  {
    name: "Snow foam pre-wash",
    body: "Foam goes on first and loosens the dirt, so less of it is on the paint when the wash starts.",
  },
  {
    name: "Two-bucket hand wash",
    body: "One bucket of soap, one to rinse the mitt, so less grit goes back on the paint.",
  },
  {
    name: "Wheels and tires",
    body: "Brake dust and road film are cleaned off the wheels and tires.",
  },
  {
    name: "Decontamination",
    body: "A full exterior decontamination lifts the bonded dirt and road grime a wash leaves behind.",
  },
  {
    name: "Microfiber hand dry",
    body: "Dried carefully with premium microfiber towels for a clean, glossy finish.",
  },
];

export const SEO = {
  home: {
    title: "Jake's Car Detailing | Car Detailing in Halifax, NS",
    description:
      "Hand wash detailing in Halifax, Nova Scotia. Exterior $100, interior $150, full detail $200. Free quotes on paint correction and ceramic coating. Rated 5.0 on Google.",
  },
} as const;

export const BUSINESS_DESCRIPTION =
  "Jake's Car Detailing is a car detailing business in Halifax, Nova Scotia offering exterior detailing, interior detailing, full details, paint correction and ceramic coating.";
