import Link from "next/link";
import PackagePicker from "@/components/sections/PackagePicker";
import { QUOTED, QUOTE_LABEL } from "@/lib/constants";

export default function Packages() {
  return (
    <section id="packages" className="on-light section">
      <div className="wrap">
        <div className="max-w-[860px]">
          <h2 className="d2">Three details. Three prices.</h2>
          <p className="lede muted mt-6">Pick the one your car needs and book a time.</p>
        </div>

        <div className="mt-12 lg:mt-16">
          <PackagePicker />
        </div>

        <div className="mt-16 lg:mt-24" style={{ borderTop: "1px solid var(--line)" }}>
          {QUOTED.map((q) => (
            <Link
              key={q.id}
              href={q.slug}
              className="group grid gap-3 py-7 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)_auto] md:items-center md:gap-10"
              style={{ borderBottom: "1px solid var(--line)" }}
            >
              <span className="flex flex-wrap items-center gap-3">
                <span className="d3 transition-colors group-hover:text-blue">{q.name}</span>
                <span className="label rounded-[3px] bg-ink px-2 py-1 text-[0.75rem] text-white">New</span>
              </span>
              <span className="muted">{q.line}</span>
              <span className="link">{QUOTE_LABEL}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
