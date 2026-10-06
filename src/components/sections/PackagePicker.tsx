"use client";

import Link from "next/link";
import { useState } from "react";
import Seg from "@/components/ui/Seg";
import { BOOK_HREF, PACKAGES, type PackageId } from "@/lib/constants";
import { photoSet } from "@/lib/photos";

/**
 * The three priced details behind one control. Switching tabs swaps the price,
 * the time, what is included and the photograph in place.
 */
export default function PackagePicker() {
  const [id, setId] = useState<PackageId>("full");

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.78fr)] lg:gap-16 xl:gap-24">
      <div>
        <Seg
          label="Choose a detail"
          mode="tabs"
          idBase="pkg"
          options={PACKAGES.map((p) => ({ value: p.id, label: p.short }))}
          value={id}
          onChange={setId}
          className="max-w-[460px]"
        />

        <div className="stack mt-10">
          {PACKAGES.map((p) => {
            const on = p.id === id;
            return (
              <div
                key={p.id}
                id={`pkg-panel-${p.id}`}
                role="tabpanel"
                aria-labelledby={`pkg-tab-${p.id}`}
                data-on={on}
                inert={!on}
              >
                <h3 className="d3">{p.name}</h3>
                <div className="mt-6 flex items-end gap-6">
                  <p className="figure text-[clamp(4.5rem,9vw,7.5rem)]">
                    <span className="sr-only">Price: </span>${p.price}
                  </p>
                  <p className="muted pb-2 text-[0.9375rem] leading-snug">
                    Canadian dollars
                    <br />
                    About {p.duration}
                  </p>
                </div>
                <p className="mt-7 max-w-[52ch]">{p.body}</p>
                <ul className="mt-7 grid gap-x-8 sm:grid-cols-2" style={{ borderTop: "1px solid var(--line)" }}>
                  {p.includes.map((item) => (
                    <li key={item} className="label py-3.5" style={{ borderBottom: "1px solid var(--line)" }}>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                  <Link href={`${BOOK_HREF}?service=${p.id}`} className="btn btn-primary">
                    Book the {p.short === "Full detail" ? "full detail" : `${p.short.toLowerCase()} detail`}
                  </Link>
                  <Link href={p.slug} className="link">
                    How it works
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="stack order-first lg:order-none" aria-hidden="true">
        {PACKAGES.map((p) => {
          const set = photoSet(p.photo.slug, "t");
          return (
            <div key={p.id} className="frame aspect-[4/5] max-h-[72svh] lg:max-h-none" data-on={p.id === id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={set.src} srcSet={set.srcSet} sizes="(min-width: 1024px) 40vw, 100vw" alt="" width={set.width} height={set.height} loading="lazy" decoding="async" />
              {p.photo.credit ? (
                <span className="credit absolute right-3 bottom-3 rounded-[3px] bg-black/55 px-2 py-1 text-white/85">Photo: {p.photo.credit}</span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
