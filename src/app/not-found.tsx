import Link from "next/link";
import { BOOK_HREF, BOOK_LABEL } from "@/lib/constants";

export const metadata = { title: "Page not found | Jake's Car Detailing", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="on-dark">
      <div className="wrap flex min-h-[80svh] flex-col justify-center pt-[calc(var(--nav-h)+48px)] pb-24">
        <h1 className="d2">That page isn&rsquo;t here.</h1>
        <p className="lede muted mt-6">The link may be old. The home page has everything, or you can book straight away.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-ghost">
            Go to the home page
          </Link>
          <Link href={BOOK_HREF} className="btn btn-primary">
            {BOOK_LABEL}
          </Link>
        </div>
      </div>
    </section>
  );
}
