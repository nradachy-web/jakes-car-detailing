import Photo from "@/components/ui/Photo";
import { METHOD } from "@/lib/constants";
import { WORKING } from "@/lib/photos";

/** The exterior wash, step by step. Numbered because the order is the point. */
export default function Method() {
  return (
    <section className="on-dark section">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-20 xl:gap-28">
        <div className="lg:sticky lg:top-[calc(var(--nav-h)+32px)] lg:self-start">
          <Photo
            slug={WORKING.wash.slug}
            cut="f"
            alt={WORKING.wash.alt}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-[4/5] lg:aspect-[3/4]"
            imgClassName="object-[50%_52%]"
          />
        </div>

        <div>
          <h2 className="d2">Washed by hand.</h2>
          <p className="lede muted mt-6">
            No brushes and no drive-through tunnel. The exterior detail follows the same five steps, in the same order.
          </p>
          <ol className="mt-12 border-t border-white/14">
            {METHOD.map((step, i) => (
              <li key={step.name} className="grid grid-cols-[3.25rem_1fr] gap-x-4 border-b border-white/14 py-7 md:grid-cols-[5rem_1fr]">
                <span className="d3 text-sky" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3 className="d3">{step.name}</h3>
                  <p className="muted mt-2.5 max-w-[46ch]">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
