import Link from "next/link";
import { CARS, car, photoSet } from "@/lib/photos";
import { cn } from "@/lib/utils";

const TILES = ["huracan", "audi-r8", "granturismo", "cybertruck", "bmw-m4", "corvette-c5", "defender", "bmw-e46", "audi-rs3"];

/** Nine of Jake's finished cars, the Huracán at double size. Captions name the car. */
export default function Lineup() {
  return (
    <section className="on-spruce section">
      <div className="wrap">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-[820px]">
            <h2 className="d2">From the daily driver to a Huracán.</h2>
            <p className="lede muted mt-6">
              A few of the cars Jake has detailed in Halifax.
            </p>
          </div>
          <Link href="/portfolio/" className="btn btn-ghost shrink-0 self-start lg:self-auto">
            See all {CARS.length} cars
          </Link>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-2 md:gap-3 lg:mt-16 lg:grid-cols-4">
          {TILES.map((slug, i) => {
            const c = car(slug);
            const set = photoSet(slug, "w");
            const big = i === 0;
            return (
              <li key={slug} className={cn("frame group aspect-[4/3]", big && "col-span-2 row-span-2")}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={set.src}
                  srcSet={set.srcSet}
                  sizes={big ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                  alt={c.alt}
                  width={set.width}
                  height={set.height}
                  loading="lazy"
                  decoding="async"
                  className="transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-3 pt-10 pb-2.5 md:px-4 md:pb-3.5">
                  <span className={cn("label block text-white", big ? "text-[1rem] md:text-[1.125rem]" : "text-[0.8125rem] md:text-[0.875rem]")}>{c.name}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
