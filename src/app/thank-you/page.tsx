import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Request sent | Jake's Car Detailing",
  description: "Your request is on its way to Jake.",
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <section className="on-dark">
      <div className="wrap flex min-h-[86svh] flex-col justify-center pt-[calc(var(--nav-h)+48px)] pb-24">
        <h1 className="d1 !text-[clamp(2.7rem,6.6vw,6rem)]">
          <span className="rise">
            <span>Request sent.</span>
          </span>
        </h1>
        <p className="lede mt-7 text-white/90">
          It is on its way to Jake, and he will be in touch to confirm your time. If it is urgent, call or text{" "}
          <a href={`tel:${BRAND.phoneTel}`} className="link">
            {BRAND.phone}
          </a>
          .
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/portfolio/" className="btn btn-primary">
            See Jake&rsquo;s work
          </Link>
          <Link href="/" className="btn btn-ghost">
            Back to the home page
          </Link>
        </div>
      </div>
    </section>
  );
}
