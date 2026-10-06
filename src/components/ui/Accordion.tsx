"use client";

import { useId, useState } from "react";

export interface QA {
  q: string;
  a: React.ReactNode;
}

/** Questions that open in place. Answers stay in the page source either way. */
export default function Accordion({ items, defaultOpen = 0 }: { items: QA[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const id = useId();
  return (
    <div className="border-t" style={{ borderColor: "var(--line)" }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b" style={{ borderColor: "var(--line)" }}>
            <h3>
              <button
                type="button"
                id={`${id}-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="d4 flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
              >
                <span>{item.q}</span>
                <span className="acc-icon" aria-hidden="true" />
              </button>
            </h3>
            <div id={`${id}-a-${i}`} role="region" aria-labelledby={`${id}-q-${i}`} className="acc-panel" data-open={isOpen}>
              <div>
                <div className="muted prose-measure pb-7">{item.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
