import Link from "next/link";
import SwirlDemo from "@/components/fx/SwirlDemo";
import { QUOTED, QUOTE_LABEL } from "@/lib/constants";

/** The two new services, introduced by the thing they fix: swirls under a light. */
export default function UnderTheLight() {
  return (
    <section className="on-dark section">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)] lg:items-end lg:gap-20">
          <h2 className="d2">See what the light sees.</h2>
          <p className="lede muted">
            Swirl marks hide in the shade and show up in the sun. Paint correction takes them out. A ceramic coating
            goes on after, so the finish stays easier to wash.
          </p>
        </div>

        <SwirlDemo className="mt-12 lg:mt-16" />

        <div className="mt-14 grid border-t border-white/14 md:grid-cols-2 lg:mt-20">
          {QUOTED.map((q, i) => (
            <Link
              key={q.id}
              href={q.slug}
              className={`group flex flex-col border-b border-white/14 py-9 md:border-b-0 md:py-10 ${i === 0 ? "md:pr-12" : "md:border-l md:border-white/14 md:pl-12"}`}
            >
              <span className="label text-sky">New at Jake&rsquo;s</span>
              <span className="d3 mt-4 transition-colors group-hover:text-sky">{q.name}</span>
              <span className="muted mt-3 max-w-[40ch]">{q.line}</span>
              <span className="link mt-8 self-start">{QUOTE_LABEL}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
