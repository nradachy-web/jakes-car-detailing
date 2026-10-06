import { PHOTO_CREDIT, WORKING, photoSet } from "@/lib/photos";

const SHOTS: { slug: string; alt: string; caption: string; credit?: string }[] = [
  { ...WORKING.rinse, caption: "Rinsing snow foam off a Lamborghini Huracán", credit: PHOTO_CREDIT },
  { ...WORKING.dry, caption: "Drying the Huracán by hand", credit: PHOTO_CREDIT },
  { ...WORKING.wash, caption: "Hand washing an Audi RS 3" },
];

/** The three photos of Jake working. The two professional frames are credited. */
export default function AtWork() {
  return (
    <section className="on-dark section">
      <div className="wrap">
        <div className="max-w-[820px]">
          <h2 className="d2">Jake at work.</h2>
          <p className="lede muted mt-6">Foam, a wash mitt and a microfiber towel. This is what the exterior detail looks like while it happens.</p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-2 gap-y-8 md:gap-x-3 lg:mt-16 lg:grid-cols-3">
          {SHOTS.map((shot, i) => {
            const set = photoSet(shot.slug, "t");
            return (
              <li key={shot.slug} className={i === 0 ? "col-span-2 lg:col-span-1" : undefined}>
                <figure>
                  <div className="frame aspect-[4/5]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={set.src}
                      srcSet={set.srcSet}
                      sizes={i === 0 ? "(min-width: 1024px) 33vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"}
                      alt={shot.alt}
                      width={set.width}
                      height={set.height}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <figcaption className="mt-3.5">
                    <span className="label block">{shot.caption}</span>
                    {shot.credit ? <span className="credit mt-1 block">Photo: {shot.credit}</span> : null}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
