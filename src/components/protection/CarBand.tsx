import Link from "next/link";
import CarTile from "@/components/content/CarTile";
import { CARS } from "@/lib/photos";

/**
 * A row of Jake's finished cars. Captions name the car and nothing else: none
 * of these photos is presented as a coating or correction job.
 */
export default function CarBand({ title, slugs }: { title: string; slugs: string[] }) {
  return (
    <section className="on-dark section">
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <h2 className="d2 max-w-[20ch]">{title}</h2>
          <Link href="/portfolio/" className="btn btn-ghost shrink-0 self-start md:self-auto">
            See all {CARS.length} cars
          </Link>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-2 md:gap-3 lg:mt-16 lg:grid-cols-4">
          {slugs.map((slug) => (
            <CarTile key={slug} slug={slug} cut="w" sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-[4/3]" />
          ))}
        </ul>
      </div>
    </section>
  );
}
