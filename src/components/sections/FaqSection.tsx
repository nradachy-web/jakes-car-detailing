import Accordion, { type QA } from "@/components/ui/Accordion";

/** Questions and answers, with FAQPage structured data for the same items. */
export default function FaqSection({
  title = "Good to know.",
  items,
  tone = "on-dark",
}: {
  title?: string;
  /** `text` is the plain-text answer used for structured data. */
  items: (QA & { text: string })[];
  tone?: "on-dark" | "on-spruce" | "on-light";
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.text },
    })),
  };
  return (
    <section className={`${tone} section`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] lg:gap-20">
        <h2 className="d2">{title}</h2>
        <Accordion items={items} />
      </div>
    </section>
  );
}
