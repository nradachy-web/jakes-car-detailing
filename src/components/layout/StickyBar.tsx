"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { BOOK_HREF, BOOK_LABEL, BRAND } from "@/lib/constants";

/**
 * Phone and tablet only: call and book, always one thumb away. It waits until
 * the hero's own buttons have scrolled off, and stays out of the way on the
 * booking page, where the form is the point.
 */
export default function StickyBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/book-online") || pathname?.startsWith("/thank-you")) return null;

  return (
    <div
      className={cn(
        "on-dark fixed inset-x-0 bottom-0 z-40 border-t border-white/14 bg-black transition-transform duration-300 lg:hidden",
        show ? "translate-y-0" : "translate-y-full",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="wrap grid grid-cols-2 gap-3 py-3">
        <a href={`tel:${BRAND.phoneTel}`} className="btn btn-ghost btn-sm" tabIndex={show ? 0 : -1}>
          Call Jake
        </a>
        <Link href={BOOK_HREF} className="btn btn-primary btn-sm" tabIndex={show ? 0 : -1}>
          {BOOK_LABEL}
        </Link>
      </div>
    </div>
  );
}
