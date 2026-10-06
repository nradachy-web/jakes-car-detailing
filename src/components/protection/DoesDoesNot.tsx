export interface Point {
  head: string;
  body?: string;
}

const rule = "1px solid var(--line)";

function Column({ heading, items, positive }: { heading: string; items: Point[]; positive?: boolean }) {
  return (
    <div>
      <h3 className="d3">{heading}</h3>
      <ul className="mt-7" style={{ borderTop: rule }}>
        {items.map((item) => (
          <li key={item.head} className="grid grid-cols-[1.75rem_1fr] gap-x-3 py-5" style={{ borderBottom: rule }}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
              className="mt-[0.3em]"
              style={{ color: positive ? "var(--accent)" : "var(--muted)" }}
            >
              {positive ? (
                <path d="M2.5 9.5l4.2 4.2L15.500 4.800" stroke="currentColor" strokeWidth="2.2" />
              ) : (
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="2.2" />
              )}
            </svg>
            <div>
              <p className="d4">{item.head}</p>
              {item.body ? <p className="muted mt-1.5 max-w-[44ch] text-[0.9688rem]">{item.body}</p> : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The honest block: what the service does, and what it will not do. */
export default function DoesDoesNot({
  title,
  intro,
  does,
  doesNot,
  tone = "on-dark",
}: {
  title: string;
  intro?: string;
  does: Point[];
  doesNot: Point[];
  tone?: "on-dark" | "on-spruce" | "on-light";
}) {
  return (
    <section className={`${tone} section`}>
      <div className="wrap">
        <div className="max-w-[860px]">
          <h2 className="d2">{title}</h2>
          {intro ? <p className="lede muted mt-6">{intro}</p> : null}
        </div>
        <div className="mt-12 grid gap-14 md:grid-cols-2 md:gap-10 lg:mt-16 lg:gap-20">
          <Column heading="What it does" items={does} positive />
          <Column heading="What it does not do" items={doesNot} />
        </div>
      </div>
    </section>
  );
}
