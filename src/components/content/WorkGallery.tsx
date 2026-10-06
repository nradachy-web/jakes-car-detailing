import CarTile from "@/components/content/CarTile";
import { CARS } from "@/lib/photos";

/**
 * Every car in the registry, laid out as a rhythm rather than a uniform grid:
 * a lead block (one large frame beside two small), a row of three portraits,
 * a mirrored lead block, a row of three landscapes, and round again.
 *
 * On phones every block reads the same way: one full-width frame and two
 * half-width frames.
 */
type Block =
  | { kind: "lead"; side: "left" | "right"; big: string; small: [string, string] }
  | { kind: "three"; cut: "w" | "t"; cars: string[] };

const LAYOUT: Block[] = [
  { kind: "lead", side: "left", big: "audi-r8", small: ["huracan", "cybertruck"] },
  { kind: "three", cut: "t", cars: ["corvette-c5", "defender", "bmw-m4"] },
  { kind: "lead", side: "right", big: "acura-tlx", small: ["bmw-e46", "audi-rs3"] },
  { kind: "three", cut: "w", cars: ["bmw-ix", "range-rover-sport", "mercedes-glc"] },
  { kind: "lead", side: "left", big: "bmw-3-series", small: ["granturismo", "jetta-gli"] },
  { kind: "three", cut: "t", cars: ["discovery-sport", "audi-a5-cabriolet", "chevy-ck"] },
];

const SMALL = "(min-width: 1024px) 33vw, 50vw";
const BIG = "(min-width: 1024px) 66vw, 100vw";
const FIRST = "(min-width: 1024px) 33vw, 100vw";

// A car added to the registry later still shows up: anything the layout above
// does not place is appended in rows of three.
function blocks(): Block[] {
  const placed = new Set(LAYOUT.flatMap((b) => (b.kind === "lead" ? [b.big, ...b.small] : b.cars)));
  const rest = CARS.map((c) => c.slug).filter((slug) => !placed.has(slug));
  const extra: Block[] = [];
  for (let i = 0; i < rest.length; i += 3) extra.push({ kind: "three", cut: "w", cars: rest.slice(i, i + 3) });
  return [...LAYOUT, ...extra];
}

export default function WorkGallery() {
  return (
    <ul className="grid grid-flow-dense grid-cols-2 gap-2 md:gap-3 lg:grid-cols-3">
      {blocks().map((block) => {
        if (block.kind === "lead") {
          const big = (
            <CarTile
              key={block.big}
              slug={block.big}
              cut="w"
              sizes={BIG}
              large
              className="col-span-2 aspect-[4/3] lg:row-span-2 lg:aspect-auto lg:h-full"
            />
          );
          const [a, b] = block.small.map((slug) => (
            <CarTile key={slug} slug={slug} cut="w" sizes={SMALL} className="aspect-[4/3]" />
          ));
          // Source order decides the side: the grid places the large frame
          // first for a left lead, between the two small ones for a right lead.
          return block.side === "left" ? [big, a, b] : [a, big, b];
        }
        return block.cars.map((slug, i) => (
          <CarTile
            key={slug}
            slug={slug}
            cut={block.cut}
            sizes={i === 0 ? FIRST : SMALL}
            className={`${block.cut === "t" ? "aspect-[4/5]" : "aspect-[4/3]"} ${i === 0 ? "col-span-2 lg:col-span-1" : ""}`}
          />
        ));
      })}
    </ul>
  );
}
