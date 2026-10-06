import { car, photoSet } from "@/lib/photos";
import { cn } from "@/lib/utils";

/**
 * One finished car in a frame, captioned with the car's name and nothing
 * else. Static: no link, no expand, no viewer.
 */
export default function CarTile({
  slug,
  cut,
  sizes,
  className,
  large,
}: {
  slug: string;
  cut: "w" | "t";
  sizes: string;
  className?: string;
  large?: boolean;
}) {
  const c = car(slug);
  const set = photoSet(slug, cut);
  return (
    <li className={cn("frame group", className)}>
      <picture>
        <source type="image/avif" srcSet={set.avifSrcSet} sizes={sizes} />
        <img
          src={set.src}
          srcSet={set.srcSet}
          sizes={sizes}
          alt={c.alt}
          width={set.width}
          height={set.height}
          loading="lazy"
          decoding="async"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.035]"
        />
      </picture>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-3 pt-10 pb-2.5 md:px-4 md:pb-3.5">
        <span className={cn("label block text-white", large ? "text-[1rem] md:text-[1.125rem]" : "text-[0.8125rem] md:text-[0.875rem]")}>
          {c.name}
        </span>
      </span>
    </li>
  );
}
