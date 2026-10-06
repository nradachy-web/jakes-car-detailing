/**
 * Plain dark page header for pages that open on words, not a photograph
 * (journal index, privacy). The short blue rule is the underline from Jake's
 * logo, drawn once on load.
 */
export default function DarkHeader({
  title,
  lede,
  children,
}: {
  /** Each string is one line of the headline. */
  title: string[];
  lede?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="on-dark">
      <div className="wrap pt-[calc(var(--nav-h)+clamp(48px,9vh,112px))] pb-[clamp(52px,7vw,104px)]">
        <h1 className="d1 text-[clamp(2.7rem,6.6vw,6rem)] leading-[0.94]">
          {title.map((line, i) => (
            <span key={line} className="rise">
              <span style={{ "--i": i } as React.CSSProperties}>{line}</span>
            </span>
          ))}
        </h1>
        <span className="draw-line mt-8 block h-[3px] w-[132px] bg-blue" aria-hidden="true" />
        {lede ? <div className="lede mt-8 text-white/90">{lede}</div> : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
