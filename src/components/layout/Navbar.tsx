"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";
import { BOOK_HREF, BOOK_LABEL, BRAND, NAV, PACKAGES, QUOTED } from "@/lib/constants";

/**
 * Fixed header. Clear over the hero, solid black once the page scrolls.
 * Jake's own logo artwork sits top left at a legible size on every page.
 */
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The open mobile menu owns the screen: lock the page behind it.
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setDropOpen(false);
      }
    };
    const onDown = (e: PointerEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  const solid = scrolled || menuOpen;
  // usePathname may or may not carry the trailing slash; compare without it.
  const here = (href: string) => (pathname || "/").replace(/\/$/, "") === href.replace(/\/$/, "");

  return (
    <header
      className={cn(
        "on-dark fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300",
        solid ? "border-white/14 bg-black" : "border-transparent bg-transparent",
      )}
      style={{ background: solid ? "#000" : "transparent" }}
    >
      <div className="wrap flex h-[var(--nav-h)] items-center justify-between gap-6">
        <Link href="/" aria-label={`${BRAND.name}, home`} className="relative z-[2] shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/brand/logo-lockup-480.webp")}
            alt={BRAND.name}
            width={480}
            height={113}
            className="h-[36px] w-auto lg:h-[44px]"
            fetchPriority="high"
          />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) =>
              item.children ? (
                <li key={item.label} ref={dropRef} className="relative">
                  <button
                    type="button"
                    aria-expanded={dropOpen}
                    aria-controls="nav-detailing"
                    onClick={() => setDropOpen((v) => !v)}
                    className="label flex cursor-pointer items-center gap-2 py-3 text-white/86 transition-colors hover:text-white"
                  >
                    {item.label}
                    <svg width="10" height="7" viewBox="0 0 10 7" fill="none" aria-hidden="true" className={cn("transition-transform duration-300", dropOpen && "rotate-180")}>
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  </button>
                  <div
                    id="nav-detailing"
                    onClick={() => setDropOpen(false)}
                    className={cn(
                      "absolute top-full left-[-20px] w-[340px] rounded-[6px] border border-white/14 bg-black p-2 transition-[opacity,transform,visibility] duration-200",
                      dropOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
                    )}
                  >
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="flex items-baseline justify-between gap-4 rounded-[4px] px-3 py-3 transition-colors hover:bg-white/8"
                      >
                        <span className="label">{c.label}</span>
                        <span className="label text-fog">{c.meta}</span>
                      </Link>
                    ))}
                  </div>
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={here(item.href) ? "page" : undefined}
                    className={cn(
                      "label py-3 transition-colors hover:text-white",
                      here(item.href) ? "text-white" : "text-white/86",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-3 lg:gap-5">
          <a href={`tel:${BRAND.phoneTel}`} className="label hidden whitespace-nowrap text-white transition-colors hover:text-sky md:block">
            {BRAND.phone}
          </a>
          <Link href={BOOK_HREF} className="btn btn-primary btn-sm hidden sm:inline-flex">
            {BOOK_LABEL}
          </Link>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative z-[2] -mr-2 flex h-11 w-11 cursor-pointer items-center justify-center xl:hidden"
          >
            <span className="relative block h-[14px] w-[24px]" aria-hidden="true">
              <span className={cn("absolute left-0 h-[2px] w-full bg-white transition-transform duration-300", menuOpen ? "top-[6px] rotate-45" : "top-0")} />
              <span className={cn("absolute left-0 h-[2px] w-full bg-white transition-transform duration-300", menuOpen ? "top-[6px] -rotate-45" : "top-[12px]")} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile and tablet menu */}
      {/* Any link inside closes the menu, including links to the page you are on. */}
      <div
        id="mobile-menu"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setMenuOpen(false);
        }}
        className={cn(
          "fixed inset-x-0 top-[var(--nav-h)] bottom-0 overflow-y-auto bg-black transition-[opacity,visibility] duration-300 xl:hidden",
          menuOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div className="wrap flex min-h-full flex-col pt-6 pb-10">
          <ul className="border-t border-white/14">
            {[...PACKAGES.map((p) => ({ label: p.name, href: p.slug, meta: `$${p.price}` })), ...QUOTED.map((q) => ({ label: q.name, href: q.slug, meta: "Free quote" }))].map((l) => (
              <li key={l.href} className="border-b border-white/14">
                <Link href={l.href} className="flex items-baseline justify-between gap-4 py-4">
                  <span className="d4">{l.label}</span>
                  <span className="label text-fog">{l.meta}</span>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-1">
            {[
              { label: "Our work", href: "/portfolio/" },
              { label: "About Jake", href: "/about/" },
              { label: "Journal", href: "/blog/" },
              { label: "Reviews", href: "/#reviews" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="label block py-3 text-white/86">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto grid gap-3 pt-8">
            <Link href={BOOK_HREF} className="btn btn-primary w-full">
              {BOOK_LABEL}
            </Link>
            <a href={`tel:${BRAND.phoneTel}`} className="btn btn-ghost w-full">
              Call {BRAND.phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
