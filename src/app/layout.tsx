import type { Metadata, Viewport } from "next";
import { Zalando_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyBar from "@/components/layout/StickyBar";
import { BRAND, BUSINESS_DESCRIPTION, HOURS, PACKAGES, QUOTED, SEO, SITE_URL } from "@/lib/constants";
import { canonicalUrl } from "@/lib/seo";

// One family for the whole site. The width axis does the work: wide for
// display, normal for reading.
const zalando = Zalando_Sans({
  subsets: ["latin"],
  weight: "variable",
  axes: ["wdth"],
  style: ["normal"],
  variable: "--font-zalando",
  display: "swap",
});

// NEXT_PUBLIC_BASE_PATH is set only by the GitHub Pages preview build
// (deploy.yml). The preview must stay out of the index: jakesdetailing.ca
// still serves his current site. Dropping that variable at the domain cutover
// flips this to index: true with no code change. robots.ts mirrors it.
const isPreview = Boolean(process.env.NEXT_PUBLIC_BASE_PATH);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SEO.home.title, template: "%s" },
  description: SEO.home.description,
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE_URL,
    siteName: BRAND.name,
    title: SEO.home.title,
    description: SEO.home.description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: BRAND.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.home.title,
    description: SEO.home.description,
    images: ["/og-image.jpg"],
  },
  robots: { index: !isPreview, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

// No street address and no aggregateRating on purpose: his own site lists
// Halifax only, and Google does not allow self-serving review markup.
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoWash",
  "@id": `${SITE_URL}/#business`,
  name: BRAND.name,
  description: BUSINESS_DESCRIPTION,
  url: canonicalUrl("/"),
  telephone: BRAND.phoneTel,
  email: BRAND.email,
  image: `${SITE_URL}/og-image.jpg`,
  logo: `${SITE_URL}/brand/logo-full.png`,
  priceRange: "$$",
  currenciesAccepted: "CAD",
  address: {
    "@type": "PostalAddress",
    addressLocality: BRAND.city,
    addressRegion: BRAND.region,
    addressCountry: BRAND.country,
  },
  areaServed: { "@type": "City", name: `${BRAND.city}, ${BRAND.regionName}` },
  openingHoursSpecification: HOURS.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.schema,
    opens: h.opens,
    closes: h.closes,
  })),
  sameAs: [BRAND.google.mapsUrl],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Detailing services",
    itemListElement: [
      ...PACKAGES.map((p) => ({
        "@type": "Offer",
        price: p.price,
        priceCurrency: "CAD",
        itemOffered: { "@type": "Service", name: p.name, url: canonicalUrl(p.slug) },
      })),
      ...QUOTED.map((q) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: q.name, url: canonicalUrl(q.slug) },
      })),
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={zalando.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] focus:inline-flex focus:h-12 focus:items-center focus:rounded-[4px] focus:bg-blue focus:px-5 focus:text-[15px] focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <StickyBar />
      </body>
    </html>
  );
}
