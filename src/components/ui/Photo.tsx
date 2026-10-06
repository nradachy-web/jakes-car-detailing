import { photoSet } from "@/lib/photos";
import { cn } from "@/lib/utils";

interface PhotoProps {
  slug: string;
  /** w = 4:3 landscape, t = 4:5 portrait, f = full frame (working shots only) */
  cut: "w" | "t" | "f";
  alt: string;
  sizes: string;
  className?: string; // the frame: sizing and aspect
  imgClassName?: string;
  priority?: boolean;
}

/** One of Jake's photos in a 6px frame. Static export, so a plain <img>. */
export default function Photo({ slug, cut, alt, sizes, className, imgClassName, priority }: PhotoProps) {
  const set = photoSet(slug, cut);
  return (
    <div className={cn("frame", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={set.src}
        srcSet={set.srcSet}
        sizes={sizes}
        alt={alt}
        width={set.width}
        height={set.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        className={imgClassName}
      />
    </div>
  );
}
